"""Public-document change monitor. Retrieval/hash checks NEVER certify a summary."""
import argparse
import concurrent.futures
import datetime as dt
import hashlib
import json
import re
import threading
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAX_BYTES = 4_000_000


def catalog_from_js(text):
    return json.loads(text.split('window.serviceCatalog=', 1)[1].split(';\nwindow.catalogAudit=', 1)[0])


class DocumentText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.main = 0
        self.parts = []
        self.main_parts = []

    def handle_starttag(self, tag, attrs):
        if tag in {'script', 'style', 'noscript', 'svg', 'nav', 'header', 'footer'}:
            self.skip += 1
        if tag in {'main', 'article'}:
            self.main += 1

    def handle_endtag(self, tag):
        if tag in {'script', 'style', 'noscript', 'svg', 'nav', 'header', 'footer'}:
            self.skip = max(0, self.skip - 1)
        if tag in {'main', 'article'}:
            self.main = max(0, self.main - 1)

    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)
            if self.main:
                self.main_parts.append(data)

    def text(self):
        main = re.sub(r'\s+', ' ', ' '.join(self.main_parts)).strip()
        return main if len(main) > 500 else re.sub(r'\s+', ' ', ' '.join(self.parts)).strip()


def transition(previous, digest, timestamp, error=None):
    """Keep an observed change pending until an explicit source review acknowledges it."""
    old = dict(previous or {})
    if error:
        return {**old, 'state': 'unavailable', 'lastCheckedAt': timestamp, 'reason': error}
    baseline = old.get('baselineHash')
    changed = bool(old.get('changeDetectedAt')) or bool(baseline and baseline != digest)
    return {
        **old,
        'state': 'changed' if changed else 'same' if baseline else 'baseline',
        'baselineHash': baseline or digest,
        'baselineAt': old.get('baselineAt') or timestamp,
        'observedHash': digest,
        'lastCheckedAt': timestamp,
        'changeDetectedAt': old.get('changeDetectedAt') or (timestamp if changed else None),
        'reason': '원문 스냅샷 차이 감지 · 요약 재대조 필요' if changed else '저장한 기준과 같은 스냅샷 · 요약 정확성 검수 아님' if baseline else '변경 비교 기준 생성 · 요약 검수 아님',
    }


def sources(catalog):
    owners = {}
    for key, service in catalog.items():
        refs = [(i[6], idx) for idx, i in enumerate(service.get('items', [])) if len(i) > 6 and i[6]]
        refs += [(d['url'], None) for d in service.get('documents', []) if d.get('url')]
        for url, idx in refs:
            entry = owners.setdefault(url, {'services': [], 'items': []})
            if key not in entry['services']:
                entry['services'].append(key)
            if idx is not None and [key, idx] not in entry['items']:
                entry['items'].append([key, idx])
    return owners


def scan(catalog, previous, workers=8, text_dir=None, progress_path=None):
    owners = sources(catalog)
    now = dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds')
    locks, blocked, lock = {}, set(), threading.Lock()

    def inspect(pair):
        url, owner = pair
        host = urllib.parse.urlsplit(url).netloc
        with lock:
            domain_lock = locks.setdefault(host, threading.Lock())
        with domain_lock:
            old = previous.get('documents', {}).get(url, {})
            if host in blocked:
                result = transition(old, None, now, '이 호스트가 자동 요청을 제한하여 후속 요청을 중단했습니다.')
                return url, {**result, **owner, 'requestAttempted': False}
            result = {**old, **owner, 'requestAttempted': True}
            try:
                request = urllib.request.Request(url, headers={'User-Agent': 'TermsAtAGlance-PolicyMonitor/1.0 (+https://saltcho2.github.io/terms-at-a-glance/)'})
                with urllib.request.urlopen(request, timeout=16) as response:
                    data = response.read(MAX_BYTES + 1)
                    result.update(httpStatus=response.status, finalUrl=response.url, contentType=response.headers.get('Content-Type', ''))
                    if len(data) > MAX_BYTES:
                        raise ValueError('응답 크기 제한 초과: 일부 본문만으로 변경 여부를 판정하지 않음')
                    if 'pdf' in result['contentType']:
                        raise ValueError('PDF 본문 별도 검수 필요: HTML 비교 대상에서 제외')
                    if 'html' not in result['contentType'] and 'text/' not in result['contentType']:
                        raise ValueError('지원하지 않는 원문 형식')
                    parser = DocumentText()
                    parser.feed(data.decode(response.headers.get_content_charset() or 'utf-8', errors='replace'))
                    text = parser.text()
                    if re.search(r'verify (?:that )?you are human|checking your browser|just a moment|access denied|request blocked|unusual traffic', text[:2500], re.I):
                        blocked.add(host)
                        raise ValueError('사이트 접근 제한 화면: 우회하지 않고 중단')
                    if len(text) < 500:
                        raise ValueError('원문 본문 부족: JavaScript 렌더링 또는 별도 열람 필요')
                    if re.search(r'404 not found|page (?:was )?not found|페이지를 찾을 수 없', text[:1500], re.I):
                        raise ValueError('문서 대신 찾을 수 없음 안내가 응답됨')
                    digest = hashlib.sha256(text.encode()).hexdigest()
                    result.update(transition(old, digest, now), textLength=len(text), httpStatus=response.status, finalUrl=response.url, contentType=response.headers.get('Content-Type', ''))
                    if text_dir:
                        text_dir.mkdir(parents=True, exist_ok=True)
                        (text_dir / (hashlib.sha256(url.encode()).hexdigest()[:16] + '.txt')).write_text(text)
            except urllib.error.HTTPError as error:
                result.update(transition(old, None, now, 'HTTP ' + str(error.code)), httpStatus=error.code)
                if error.code in {403, 429}:
                    blocked.add(host)
            except Exception as error:
                result.update(transition(old, None, now, str(error)[:200]), httpStatus=None)
            result.update(owner)
            return url, result

    documents = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(inspect, pair) for pair in owners.items()]
        for future in concurrent.futures.as_completed(futures):
            url, record = future.result()
            documents[url] = record
            if len(documents) % 20 == 0 or len(documents) == len(owners):
                print('Source retrieval:', len(documents), '/', len(owners), flush=True)
                if progress_path:
                    progress_path.write_text(json.dumps({'complete': False, 'checkedAt': now, 'processed': len(documents), 'total': len(owners), 'documents': documents}, ensure_ascii=False))
    return {'checkedAt': now, 'scope': '현재 공개한 요약·공식 문서 링크의 본문 스냅샷 비교. 조항 해석·법률 검수 아님.', 'documents': dict(sorted(documents.items())), 'counts': dict(Counter(r['state'] for r in documents.values())), 'serviceCoverage': {'registered': len(catalog), 'withSource': len({k for r in owners.values() for k in r['services']}), 'withoutSource': sorted(set(catalog) - {k for r in owners.values() for k in r['services']})}}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', default=str(ROOT / 'source-monitor.json'))
    parser.add_argument('--js-output', default=str(ROOT / 'source-status.js'))
    parser.add_argument('--texts')
    args = parser.parse_args()
    catalog = catalog_from_js((ROOT / 'service-catalog.js').read_text())
    output = Path(args.output)
    previous = json.loads(output.read_text()) if output.exists() else {}
    report = scan(catalog, previous, text_dir=Path(args.texts) if args.texts else None)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    public = {k: v for k, v in report.items() if k != 'serviceCoverage'}
    Path(args.js_output).write_text('window.policySourceStatus=' + json.dumps(public, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print(json.dumps({'counts': report['counts'], 'servicesWithSource': report['serviceCoverage']['withSource'], 'servicesWithoutSource': len(report['serviceCoverage']['withoutSource'])}, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
