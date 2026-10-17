import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
const html=read('index.html');
assert(html.includes('원문 조건 · 편집 요약</p><p>${esc(item[5])}</p>')); 
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.forEach(s=>new vm.Script(s));
globalThis.window={};vm.runInThisContext(read('review-ui.js'));vm.runInThisContext(read('service-catalog.js'));
const review=window.TermsReview,now=new Date('2026-10-17T12:00:00Z');
const tests=[];
for(const [label,input,want,days] of [
 ['当日','2026. 10. 17.','recent',0],['30일 이내','2026. 10. 1.','recent',16],
 ['정확히 30일','2026. 9. 17.','recent',30],['31일 경과','2026. 9. 16.','stale',31],
 ['대조일 없음',null,'unknown',undefined],['잘못된 날짜','2026. 2. 30.','unknown',undefined],
 ['미래 날짜','2026. 10. 18.','unknown',undefined]]){
 const got=review.freshness(input,now);assert.equal(got.state,want);assert.equal(got.ageDays,days);
 tests.push({label,input,result:got,pass:true});
}
assert.equal(review.freshness('2026. 9. 17.',new Date('2026-10-17T15:00:00Z')).state,'stale');
tests.push({label:'한국 자정 경계: 2026-10-17 15:00 UTC는 한국 18일',pass:true});
globalThis.escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
vm.runInThisContext(html.slice(html.indexOf('    function evidencePanel'),html.indexOf('    function reviewDetails')));
let count=0;for(const d of Object.values(window.serviceCatalog))for(const item of d.items){assert(!evidencePanel(item).includes('undefined'));assert(!review.report(d,item).includes('undefined'));count++;}
tests.push({label:'모든 표시 항목 evidence/report 렌더링 undefined 검사',items:count,pass:true});
for(const [label,partial] of [['catalog 누락',{}],['search 모듈 누락',{serviceCatalog:{x:{}}}],['review 모듈 누락',{serviceCatalog:{x:{}},TermsSearch:{}}]]){
 const alert={hidden:true};vm.runInNewContext(scripts.at(-1),{window:partial,document:{querySelector:s=>{assert.equal(s,'#dataLoadError');return alert;}}});assert.equal(alert.hidden,false);tests.push({label,scope:'Node VM에서 실제 배포 스크립트의 초기화 실패 분기 실행. 브라우저 네트워크 차단 테스트 아님.',pass:true});
}
const before=JSON.parse(fs.readFileSync(new URL('before.json',import.meta.url),'utf8'));
for(const [key,old]of Object.entries(before))old.items.forEach((item,i)=>{if(i!==0)assert.deepEqual(window.serviceCatalog[key].items[i],item);});
tests.push({label:'10개 표본 서비스의 선택하지 않은 항목은 원본과 동일',pass:true});
assert.equal(Object.keys(window.serviceCatalog).length,500);assert.equal(count,251);
const lum=hex=>hex.match(/../g).map(h=>parseInt(h,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
const ratio=contrast('ffffff','b93b17');assert(ratio>=4.5);
tests.push({label:'검색 버튼·강조 링크 대비',beforeSearchButton:contrast('ffffff','ff6338'),beforeLink:contrast('ffffff','d9431c'),after:ratio,scope:'색상 쌍 계산, 전체 접근성 적합 인증 아님',pass:true});
fs.writeFileSync(new URL('code-tests.json',import.meta.url),JSON.stringify({fixedTestTime:'2026-10-17T12:00:00Z',tests},null,2));
console.log(`${tests.length} checks passed; ${count} items preserved`);
