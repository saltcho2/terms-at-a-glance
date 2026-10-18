throw new Error('Legacy generator disabled: its historical input is truncated. Edit data/catalog.json and run node scripts/build-catalog.mjs; preserve existing review records.');
import fs from 'node:fs';
import vm from 'node:vm';
const before=JSON.parse(fs.readFileSync('audit-original-catalog-20261009.json','utf8'));
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('reviewed-services.js','utf8'),ctx);
const reviewed=ctx.window.reviewedServices;
const date='2026. 10. 13. (한국 시간)';
const names={payment:'결제·구독',privacy:'개인정보',content:'콘텐츠 권리',cancel:'해지·환불',other:'기타 주의'};
function item(cat,title,text,url,document,clause,region,version,action,risk='high'){
 return [cat,names[cat],title,risk,text,text,url,{document,clause,region,version:version||null,checkedAt:date,action}];
}
function add(key,scope,items){const s=before.services[key];if(!s)throw Error(key);reviewed[key]={name:s.name,domain:s.domain,aliases:s.aliases||[],mark:s.mark,overall:'일부 항목 요약 제공',reviewStatus:`${date} · ${scope}`,reviewScope:scope,items};}
const english='국제 영문 약관 · 현지 강행법규 우선';
const dropbox='https://www.dropbox.com/terms';
add('dropbox','개인 이용약관의 결제·팀 관리·계정 종료 항목',[
 item('payment','유료 계정은 취소 전까지 반복 청구','유료 계정으로 전환한 날부터 주기적으로 결제됩니다. 일반 환불은 법이 요구하는 경우로 제한하며, 갱신 요금 변경은 최소 30일 전에 알립니다. 현지법의 취소 권리는 우선합니다.',dropbox,'Dropbox Terms of Service','Paid Accounts',english,'2025. 1. 7. 시행 · 2027년 개정 예고와 구분','다음 결제일과 취소 완료 상태를 확인하세요.'),
 item('privacy','팀 관리자가 파일 접근과 계정 이용을 통제','Dropbox Team에 들어가면 조직 관리자가 계정 정보에 접근·공개·제한·삭제하거나 계정 접근을 종료할 수 있습니다. 개인 계정을 팀에 편입한 뒤 다시 분리하는 것도 관리자가 막을 수 있습니다.',dropbox,'Dropbox Terms of Service','Dropbox Teams',english,'2025. 1. 7. 시행','개인 파일은 팀 계정과 분리하고 조직 가입 전 관리 권한을 확인하세요.'),
 item('other','무료 계정은 12개월 미접속 시 종료 대상','무료 계정으로 12개월 연속 접속하지 않으면 정지·종료 대상이 될 수 있습니다. 원칙적으로 이메일 안내와 자료 반출 기회를 제공하지만 중대한 위반·법적 사유 등은 예외입니다.',dropbox,'Dropbox Terms of Service','Termination',english,'2025. 1. 7. 시행','연락 이메일을 유지하고 중요한 파일은 별도로 백업하세요.')
]);
const airtable='https://www.airtable.com/company/tos';
add('airtable','이용약관의 요금·자동 갱신·환불 항목',[
 item('payment','정해진 사용량을 넘으면 추가 청구 가능','요금제에 포함된 사용량을 넘으면 추가 요금이 청구서에 반영되거나 등록 결제수단으로 자동 청구될 수 있습니다. 유료 구독은 취소하지 않으면 기존 계약과 같은 기간으로 갱신됩니다.',airtable,'Airtable Terms of Service','6.1 Subscription Plans / 6.3 Renewals',english,'2024. 5. 31. 개정','사용량 한도와 갱신일을 확인하고 구독 종료 전에 계정 설정에서 취소하세요.'),
 item('cancel','이용자가 취소할 때와 회사가 종료할 때의 환불이 다름','직접 취소하면 원칙적으로 현재 구독 기간 말까지 이용하고 이미 낸 요금은 환불하지 않습니다. 법정 예외는 남습니다. 회사가 종료하는 경우에는 이용자 위반·미납을 제외하고 미사용 기간을 비례 환불한다고 정합니다.',airtable,'Airtable Terms of Service','6.4 Cancellations and Terminations',english,'2024. 5. 31. 개정','해지 주체와 사유를 구분하고 환불 문의 시 결제일·남은 기간을 기록하세요.')
]);
const buffer='https://buffer.com/legal';
add('buffer','현행 이용약관의 구독과 피드백 권리 항목',[
 item('payment','다음 갱신 전에 취소가 접수되어야 함','구독은 같은 기간으로 자동 갱신되고 다음 기간 요금이 청구됩니다. 갱신을 막으려면 갱신일 전에 계정 결제 설정의 Cancel Plan 또는 고객지원으로 취소를 접수해야 합니다.',buffer,'Buffer Current Terms of Use','4.3 Subscription Service',english,null,'결제 설정에서 갱신일을 확인하고 취소 접수 기록을 보관하세요.'),
 item('content','제품 개선 의견에는 영구적인 이용권을 부여','기능·개선 제안 등 피드백에는 무상·영구·철회 불가의 이용권을 부여하며, 출처 표시나 보상 의무가 없다고 정합니다. 이 조항은 모든 일반 게시물에 대한 조항과 구분해야 합니다.',buffer,'Buffer Current Terms of Use','5.3 Feedback',english,null,'대가나 비밀유지가 필요한 제안은 일반 피드백으로 보내기 전에 별도 합의를 확인하세요.','mid')
]);
const calendly='https://calendly.com/legal/customer-terms-conditions';
add('calendly','계정 보유 고객 약관의 갱신·취소·관리 권한 항목',[
 item('payment','갱신 시 요금 인상 조건이 포함됨','같은 구독 기간으로 자동 갱신됩니다. 별도 요율을 미리 알리지 않으면 소비자물가지수(CPI)에 3%를 더한 갱신 가격 인상 조건이 포함될 수 있습니다.',calendly,'Calendly Customer Terms and Conditions','Term & Renewals',english,'2026. 6. 1. 법률 문서 체계','갱신 안내와 결제 화면의 실제 적용 요율을 확인하세요.'),
 item('cancel','청구서 결제·Enterprise는 종료 30일 전 통지','청구서로 결제하거나 Enterprise 요금제를 사용하면 구독 종료·좌석 수·요금제 변경을 기간 종료 30일 전에 서면으로 요청해야 합니다. 일반 유료 계정의 다운그레이드는 보통 현재 기간 말에 적용됩니다.',calendly,'Calendly Customer Terms and Conditions','Term & Renewals / Cancellation & Termination',english,null,'청구 방식과 요금제를 먼저 확인하고 해당하는 경우 서면 요청 기한을 지키세요.'),
 item('privacy','조직 계정은 사용 보고와 관리 대상','조직 고객의 승인 사용자이거나 조직을 대표하는 이메일로 등록한 개인 고객이면 해당 조직이 유료 계정의 사용을 관리·모니터링하고 보고를 받을 권리를 가집니다.',calendly,'Calendly Customer Terms and Conditions','Account Ownership/Management',english,null,'개인 일정을 조직 계정에 연결하기 전에 관리자 접근 범위를 확인하세요.')
]);
const ohouse='https://ohou.se/usepolicy';
add('ohouse','쇼핑 반품과 커뮤니티 게시물 조항',[
 item('cancel','반품 신청만 해 두면 효력이 사라질 수 있음','반품·교환 신청 후 14일이 지나도록 받은 상품을 반환하지 않거나 연락이 되지 않으면 신청이 효력을 잃는다고 정합니다. 단순 변심 배송비는 구매자, 하자·오배송은 판매자 부담입니다.',ohouse,'오늘의집 이용약관','제22조 제7항·제10항','한국',null,'반품 접수 뒤 회수 일정과 운송장까지 확인하고 연락 가능한 상태를 유지하세요.'),
 item('content','탈퇴만으로 게시물이 삭제되지 않음','탈퇴 전에 작성한 콘텐츠는 남으며, 탈퇴 후에는 작성자 확인이 어려워 편집·삭제가 불가능하다고 안내합니다. 공개한 사진과 글을 지우려면 회원 탈퇴 전에 먼저 처리해야 합니다.',ohouse,'오늘의집 이용약관','제29조 제5항','한국',null,'집 사진·후기·개인정보가 담긴 글을 먼저 삭제하고 탈퇴하세요.'),
 item('content','게시물이 제휴 서비스·SNS 홍보에 쓰일 수 있음','게시물 권리는 회원에게 있지만 검색 결과, 제휴 서비스 운영, 홍보·개선을 위한 편집과 SNS 활용을 허락하게 됩니다. 고객센터 등을 통해 삭제·비공개·이용중단을 요청할 수 있습니다.',ohouse,'오늘의집 이용약관','제28조 / 제29조 제1항·제4항','한국',null,'외부 홍보 사용을 원하지 않으면 고객센터에 이용중단을 요청하고 답변을 보관하세요.')
]);
const apple='https://www.apple.com/legal/internet-services/itunes/kr/terms.html';
add('applemusic','한국 Apple 미디어 서비스 약관의 결제·구독 항목',[
 item('payment','기본 카드가 실패하면 다른 등록 수단으로 청구','기본 결제수단이 만료되거나 잔액이 부족하면 계정에 등록된 다른 수단을 순서대로 청구할 수 있습니다.',apple,'한국 Apple 미디어 서비스 이용약관','B. 지불, 세금 및 환불','한국',null,'사용하지 않는 결제수단을 정리하고 구독 상태를 별도로 확인하세요.'),
 item('cancel','체험 요금을 피하려면 종료 최소 24시간 전 취소','무료 체험 요금 청구를 막으려면 최소 24시간 전에 취소해야 한다고 정합니다. Apple 구독 체험을 일찍 취소하면 다시 활성화할 수 없다는 조건도 있습니다.',apple,'한국 Apple 미디어 서비스 이용약관','I. 구독','한국',null,'무료 체험 종료일과 취소 이후 이용 가능 기간을 확인하세요.')
]);
add('appletv','한국 Apple 미디어 서비스 약관의 결제·이용권 항목',[
 item('payment','구독은 취소 전까지 자동 갱신','구독은 계정 설정에서 취소하지 않으면 갱신됩니다. 무료 체험 청구를 피하려면 종료 최소 24시간 전 취소 조건을 확인해야 합니다.',apple,'한국 Apple 미디어 서비스 이용약관','I. 구독','한국',null,'Apple 계정의 구독 관리에서 갱신일과 취소 상태를 확인하세요.'),
 item('content','콘텐츠 거래는 사용권 취득','구매·대여 등의 거래로 콘텐츠 사용권을 얻습니다. 일반 이용은 개인적·비영리적 목적으로 제한되며, 상업·홍보 목적의 권리를 자동으로 얻지는 않습니다.',apple,'한국 Apple 미디어 서비스 이용약관','B. 지불, 세금 및 환불 / F. 사용 규칙','한국',null,'매장·행사에서 상영하려면 별도 이용 허락을 확인하세요.','mid')
]);
const kakao='https://www.kakao.com/policy/terms?lang=ko';
add('kakaotalk','카카오계정 공통 약관만 확인 · 카카오톡 개별 약관은 보완 중',[
 item('cancel','카카오계정 탈퇴는 연결 서비스 데이터에도 영향','카카오계정 계약이 해지되면 법정 보관 등을 제외한 계정 정보와 연결된 개별 서비스 데이터가 삭제됩니다. 게시물 등 모든 자료의 삭제 조건은 각 서비스 약관을 별도로 따릅니다.',kakao,'카카오계정 약관','제15조 제3항','한국 · 카카오계정 이용에 한정',null,'카카오톡만 탈퇴하는 것과 카카오계정 탈퇴를 구분하고 연결 서비스를 확인하세요.')
]);
const superhuman='https://superhuman.com/legal/terms';
add('coda','Coda가 연결하는 Superhuman 공통 약관의 적용 범위와 갱신 항목',[
 item('payment','유료 구독은 같은 기간으로 갱신','Coda가 속한 Superhuman 공통 약관은 취소·갱신 거절이 없으면 최초 구독과 같은 기간으로 당시 요금에 자동 갱신된다고 정합니다.',superhuman,'Superhuman Terms of Service','서두 · Paid Subscription / 제8.8조 참조',english,'2025. 10. 29. 시행','기존 Coda 구독이 연결된 청구 계정과 갱신 해제 방법을 확인하세요.'),
 item('other','기업용 계약에는 다른 약관이 적용됨','기업 영업팀을 통해 조직이 구입한 Enterprise 제품에는 이 공통 약관 대신 Customer Business Agreement가 적용됩니다. 개인·일반 계정 설명을 기업 계약에 그대로 적용하면 안 됩니다.',superhuman,'Superhuman Terms of Service','서두 · Enterprise-Tier Services',english,'2025. 10. 29. 시행','계정의 구매 경로와 조직의 계약서를 먼저 확인하세요.','mid')
]);
reviewed.coda.name='Coda / Superhuman Docs';reviewed.coda.aliases=[...(reviewed.coda.aliases||[]),'슈퍼휴먼 닥스','Superhuman Docs'];
const colors={naver:'#03a85b',coupang:'#b9382c',youtube:'#d62620',netflix:'#bf1821',spotify:'#15803d',discord:'#5865f2',temu:'#c95100',google:'#3367d6',kakaotalk:'#665400',ohouse:'#087b93',dropbox:'#0061ff',airtable:'#ae5b00',buffer:'#20303e',calendly:'#0060d2',coda:'#c44d3b',applemusic:'#c83b62',appletv:'#212631'};
const catNames={social:'SNS·메신저',stream:'영상·음악',commerce:'쇼핑·배달',productivity:'업무·생산성',travel:'여행·이동',finance:'금융·결제',gaming:'게임',education:'교육',health:'운동·건강',developer:'개발',digital:'디지털 서비스'};
const profiles={youtube:'stream',netflix:'stream',temu:'commerce',instagram:'social',tiktok:'social',discord:'social',spotify:'stream',coupang:'commerce',naver:'digital',google:'digital'};
const errors=JSON.parse(fs.readFileSync('link-audit-20261009.json','utf8')).failedResults;
const catalog={};
for(const [key,s]of Object.entries(before.services)){
 const r=reviewed[key];const profile=s.profile||profiles[key]||'digital';
 catalog[key]={name:r?.name||s.name,domain:s.domain,aliases:r?.aliases||s.aliases||[],mark:s.mark||s.name[0],category:catNames[profile]||'기타 서비스',color:colors[key]||'#314b68',
 items:r?.items||[],reviewScope:r?.reviewScope||'공식 문서와 항목별 요약을 재확인해야 합니다.',reviewStatus:r?.reviewStatus||'자료 보완 중',
 status:r?'reviewed':'pending',overall:r?'원문 대조 항목 있음':'자료 보완 중',
 pendingReason:errors.some(e=>e.owners.some(o=>o.key===key))?'기존 문서 주소에서 접속 오류·시간 초과가 발생해 대체 공식 문서를 재확인해야 합니다.':'기존 공통 요약을 서비스별 공식 조항과 대조해야 합니다.',
 documents:r?[...new Map(r.items.map(it=>[it[6],{url:it[6],title:it[7].document,checkedAt:it[7].checkedAt,bodyChecked:true}])).values()]:[]};
}
// Link recovery is recorded separately from reading and summarizing the document body.
catalog.zigzag.documents=[{url:'https://cf.res.s.zigzag.kr/terms/user/service.html',title:'지그재그 이용약관',checkedAt:date,bodyChecked:false},{url:'https://cf.res.s.zigzag.kr/terms/user/privacy.html',title:'지그재그 개인정보처리방침',checkedAt:date,bodyChecked:false}];
catalog.zigzag.status='linked';catalog.zigzag.overall='공식 원문 연결';catalog.zigzag.pendingReason='현재 공식 홈페이지가 연결하는 약관 주소로 수정했습니다. 본문이 정상적으로 수집되지 않아 요약은 보완 중입니다.';
catalog.craft.documents=[{url:'https://www.craft.do/terms',title:'Craft Terms and Conditions',checkedAt:date,bodyChecked:false}];catalog.craft.status='linked';catalog.craft.overall='공식 원문 연결';catalog.craft.pendingReason='기존 주소의 공식 문서 검색 결과를 다시 확인했습니다. 전체 조항 대조는 보완 중입니다.';
const counts={total:Object.keys(catalog).length,reviewed:Object.values(catalog).filter(s=>s.status==='reviewed').length,linked:Object.values(catalog).filter(s=>s.status==='linked').length,pending:Object.values(catalog).filter(s=>s.status==='pending').length,items:Object.values(catalog).reduce((n,s)=>n+s.items.length,0)};
fs.writeFileSync('service-catalog.js','// Service visibility is independent of document verification. Never generate legal claims from categories.\nwindow.serviceCatalog='+JSON.stringify(catalog,null,2)+';\nwindow.catalogAudit='+JSON.stringify({checkedAt:date,...counts,complete:false},null,2)+';\n');
const changes=Object.entries(catalog).filter(([key,s])=>s.documents.length).map(([key,s])=>({key,name:s.name,status:s.status,oldSource:before.services[key].source,documents:s.documents}));
fs.writeFileSync('recovery-status.json',JSON.stringify({checkedAt:date,...counts,complete:false,changes,pendingServices:Object.entries(catalog).filter(([k,s])=>s.status==='pending').map(([key,s])=>({key,name:s.name,reason:s.pendingReason}))},null,2));
console.log(counts);
