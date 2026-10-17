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
  report(service,item){
    const evidence=item?.[7];
    return ['약관 한눈에 오류·수정 제보',`서비스: ${service.name} (${service.domain})`,item?`항목: ${item[2]}`:'항목: 서비스 자료 전반',`원문: ${item?.[6]||service.documents?.[0]?.url||'알고 있는 공식 원문 주소를 입력해 주세요.'}`,`대조 기록: ${evidence?.checkedAt||service.reviewStatus||'등록 기록 없음'}`,'','수정이 필요한 내용:','','확인한 공식 자료와 적용 지역:',''].join('\n');
  }
};
