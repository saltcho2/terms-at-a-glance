// Editorial reading order, not a legal or safety rating.
window.TermsReview={
  priority(item){
    const category=item[0],text=item[2]+' '+item[5];
    const rules={payment:'다음 결제·갱신과 비용 부담에 관한 조건을 먼저 확인하도록 분류합니다.',privacy:'정보 수집·제공·보관 또는 접근 권한에 관한 조건을 먼저 확인하도록 분류합니다.',cancel:'해지 절차·시점과 환불에 관한 조건을 먼저 확인하도록 분류합니다.'};
    if(rules[category])return {level:'high',reason:rules[category]};
    if(category==='content'&&/영구|철회 불가|삭제.*(?:남|예외|보관|회수)|종료.*(?:남|예외)/.test(text))return {level:'high',reason:'자료를 삭제하거나 이용을 끝낸 뒤에도 권한·사본이 남을 수 있는 조건을 먼저 확인하도록 분류합니다.'};
    return {level:'mid',reason:'콘텐츠 이용 범위 또는 그 밖의 서비스 이용 조건을 함께 확인하도록 분류합니다.'};
  },
  reviewDate(text){
    const m=String(text||'').match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
    if(!m)return null;
    const day=new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));
    if(day.getUTCFullYear()!==+m[1]||day.getUTCMonth()!==+m[2]-1||day.getUTCDate()!==+m[3])return null;
    day.setUTCDate(day.getUTCDate()+30);
    return `${day.getUTCFullYear()}. ${day.getUTCMonth()+1}. ${day.getUTCDate()}.`;
  },
  freshness(text,now=new Date()){
    const deadline=this.reviewDate(text);
    if(!deadline)return {state:'unknown',label:'최신성 판단 자료 없음'};
    const m=String(text).match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
    const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(p=>[p.type,p.value]));
    const today=Date.UTC(+parts.year,+parts.month-1,+parts.day),checked=Date.UTC(+m[1],+m[2]-1,+m[3]);
    if(checked>today)return {state:'unknown',label:'대조일 기록 재확인 필요'};
    const ageDays=(today-checked)/86400000;
    return {state:ageDays>30?'stale':'recent',ageDays,label:ageDays>30?'최신성 재확인 필요':'대조일로부터 30일 이내 · 이후 변경 여부는 미확인'};
  },
  catalogStats(catalog,now=new Date()){
    if(!catalog||typeof catalog!=='object'||Array.isArray(catalog)||!Object.keys(catalog).length)throw new Error('서비스 자료가 비어 있거나 형식이 올바르지 않습니다.');
    const services=Object.values(catalog);
    if(services.some(s=>!s||!s.name||!Array.isArray(s.items)))throw new Error('서비스 항목 형식을 확인하지 못했습니다.');
    const items=services.flatMap(s=>s.items);
    if(items.some(i=>!Array.isArray(i)||typeof i[5]!=='string'))throw new Error('요약 항목 형식을 확인하지 못했습니다.');
    const compared=items.filter(i=>i[6]&&i[7]?.document&&i[7]?.clause&&i[7]?.region&&i[7]?.checkedAt);
    const summaryServices=services.filter(s=>s.items.length).length;
    return {registered:services.length,summaryServices,items:items.length,compared:compared.length,pendingServices:services.length-summaryServices,recheck:items.filter(i=>this.freshness(i[7]?.checkedAt,now).state!=='recent'||['changed','unavailable'].includes(this.sourceState(i).state)).length};
  },
  sourceState(item,report=window.policySourceStatus){
    const r=report?.documents?.[item[6]];
    if(!r)return {state:'unknown',label:'원문 스냅샷 비교 기록 없음'};
    const labels={baseline:'변경 비교 기준 생성 · 요약 검수 아님',same:'저장 기준과 같은 스냅샷 · 조항 검수 아님',changed:'원문 스냅샷 차이 감지 · 요약 재대조 필요',unavailable:'원문 수집 실패 · 최신성 확인 필요'};
    return {state:r.state,label:labels[r.state]||'비교 상태 확인 필요',checkedAt:r.lastCheckedAt,reason:r.reason};
  },
  caseDate(record){
    const value=record?.publishedAt||record?.year;
    if(typeof value!=='string'||!/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(value))return null;
    const [year,month=1,day=1]=value.split('-').map(Number),date=new Date(Date.UTC(year,month-1,day));
    return date.getUTCFullYear()===year&&date.getUTCMonth()===month-1&&date.getUTCDate()===day?date.getTime():null;
  },
  caseState(book){
    if(!book||typeof book!=='object'||Array.isArray(book)||Object.values(book).some(list=>!Array.isArray(list)||list.some(c=>!c||['title','url','text','org','checkedAt'].some(k=>typeof c[k]!=='string'||!c[k].trim())||this.caseDate(c)===null)))return {state:'failed',total:null,items:[],caption:'사례 목록을 불러오지 못했습니다. 사례 자료의 형식을 확인해야 합니다.'};
    const items=Object.entries(book).flatMap(([key,list])=>list.map(c=>({key,...c})));
    return {state:items.length?'ready':'empty',total:items.length,items,caption:items.length>3?`최근 사례 3건 · 전체 ${items.length}건`:items.length?`등록된 사례 ${items.length}건`:'아직 등록된 사례가 없습니다.'};
  },
  journey(items,purpose){
    const orders={payment:['payment','cancel','privacy','content','other'],content:['content','privacy','cancel','payment','other'],cancel:['cancel','payment','privacy','content','other']};
    if(!orders[purpose])return [...items];
    return items.map((item,index)=>({item,index})).sort((a,b)=>orders[purpose].indexOf(a.item[0])-orders[purpose].indexOf(b.item[0])||a.index-b.index).map(x=>x.item);
  },
  distinctImpact(item){
    const impact=item[7]?.impact;
    return typeof impact==='string'&&impact.trim()&&impact.trim()!==String(item[5]||'').trim()?impact:null;
  },
  report(service,item){
    const evidence=item?.[7];
    return ['약관 한눈에 오류·수정 제보',`서비스: ${service.name} (${service.domain})`,item?`항목: ${item[2]}`:'항목: 서비스 자료 전반',`원문: ${item?.[6]||service.documents?.[0]?.url||'알고 있는 공식 원문 주소를 입력해 주세요.'}`,`대조 기록: ${evidence?.checkedAt||service.reviewStatus||'등록 기록 없음'}`,'','수정이 필요한 내용:','','확인한 공식 자료와 적용 지역:',''].join('\n');
  }
};
