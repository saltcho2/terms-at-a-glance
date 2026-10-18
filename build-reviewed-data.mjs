throw new Error('Legacy generator disabled: its historical input is truncated. Edit data/catalog.json and run node scripts/build-catalog.mjs; preserve existing review records.');
import fs from 'node:fs';

const original=JSON.parse(fs.readFileSync('audit-original-catalog-20261009.json','utf8'));
const checkedAt='2026. 10. 9. (한국 시간)';
const categoryNames={payment:'결제·구독',privacy:'개인정보',content:'콘텐츠 권리',cancel:'해지·환불',other:'기타 주의'};
const card=(category,title,text,url,document,clause,region,version,action,risk='high')=>[
  category,categoryNames[category],title,risk,text,text,url,
  {document,clause,region,version:version||null,checkedAt,action}
];
const registry={};
function add(key,scope,items){
  const old=original.services[key];
  if(!old)throw new Error(`Unknown service ${key}`);
  registry[key]={name:old.name,domain:old.domain,aliases:old.aliases||[],mark:old.mark||old.name[0],
    overall:'일부 항목 원문 대조',reviewStatus:`${checkedAt} · ${scope}`,reviewScope:scope,items};
}
const spotify='https://www.spotify.com/kr-ko/legal/end-user-agreement/';
add('spotify','한국 이용약관 중 아래 4개 항목 확인',[
  card('payment','한국 무료 체험은 유료 유지에 별도 동의 필요','한국 약관은 체험 종료 전 30일 동안 유료 유지에 명시적으로 동의한 경우에만 체험 후 매달 청구한다고 정합니다. 동의하지 않거나 아무 조치도 하지 않으면 무료 버전으로 전환됩니다. 이미 시작한 반복 결제 구독은 해지 전까지 갱신됩니다.',spotify,'한국 이용약관','제3장 · 청구 및 취소 / 철회 권리','한국',null,'체험의 유료 유지 동의 여부와 현재 구독의 다음 결제일을 각각 확인하세요.'),
  card('cancel','청약철회 기간에도 이용하면 권리가 사라질 수 있음','체험 없이 처음 유료 구독을 구입하면 14일, 이후 매달 청구는 7일의 청약철회 기간을 정하지만 그 기간에 서비스를 이용하면 철회권을 잃는다고 명시합니다. 일반 해지는 현재 청구 기간 종료 후 적용되며, 약관상 예외 외에 부분 환불은 제공하지 않습니다.',spotify,'한국 이용약관','제3장 · 청구 및 취소 / 철회 권리','한국',null,'환불을 원하면 재생하기 전에 청구일과 청약철회 조건을 확인하고 고객지원에 문의하세요.'),
  card('content','저장한 음악도 파일 소유권을 산 것이 아님','서비스와 콘텐츠는 개인적·비상업적 이용권으로 제공됩니다. 앱에 설치·저장한 복사본도 소유권이 넘어오지 않으며, 권리자나 Spotify가 특정 콘텐츠를 통지 없이 내릴 수 있다고 정합니다.',spotify,'한국 이용약관','제2장 · 서비스 제한 / 제3장 · Spotify 서비스 이용 권리','한국',null,'오프라인 저장을 영구 보관으로 생각하지 말고 필요한 음악의 별도 구매 가능 여부를 확인하세요.','mid'),
  card('other','추천 배치에 상업적 고려가 영향을 줄 수 있음','콘텐츠의 선택과 배치는 취향뿐 아니라 Spotify와 제3자 사이의 계약을 포함한 상업적 고려의 영향을 받을 수 있다고 정합니다.',spotify,'한국 이용약관','제4장 · 콘텐츠 경험','한국',null,'추천 순서를 순수한 취향 일치도 순위로 해석하지 말고 여러 목록을 비교하세요.','mid')
]);
const naver='https://policy.naver.com/policy/service.html';
add('naver','2026년 10월 1일 시행 공통 이용약관 중 아래 3개 항목 확인',[
  card('content','게시물이 AI 연구 개발에 사용될 수 있음','게시물 권리는 이용자에게 남지만 네이버는 운영·홍보·개선 등의 목적에 기한·지역 제한 없는 무상 이용권을 받습니다. 네이버와 위탁받은 계열사의 AI 연구 개발에도 콘텐츠가 쓰일 수 있습니다. 삭제·비공개 이후에는 연구에 사용하지 않지만, 이미 기술적으로 구분하기 어렵게 처리된 자료는 예외입니다.',naver,'네이버 공통 이용약관','여러분이 제공한 콘텐츠를 소중히 다룰 것입니다','한국','2026. 10. 1. 시행','민감한 자료를 올리기 전에 공개 범위를 확인하고, 이미 연구용으로 처리된 자료의 회수가 가능한지 따로 확인하세요.'),
  card('cancel','탈퇴로 내 게시물과 계정 자료가 소멸할 수 있음','탈퇴하면 법령·개인정보처리방침에 따라 보관할 수 있는 정보를 제외한 계정 데이터와 부속 게시물이 소멸합니다. 다른 사람이 담아 간 게시물, 공유 공간이나 타인의 게시물에 붙인 댓글 등은 남을 수 있으므로 탈퇴 전에 삭제해야 한다고 안내합니다.',naver,'네이버 공통 이용약관','언제든지 네이버 서비스 이용계약을 해지하실 수 있습니다','한국','2026. 10. 1. 시행','메일·파일·게시물을 먼저 보관하고 공유 공간의 글과 댓글은 탈퇴 전에 직접 삭제하세요.'),
  card('other','이 공통 약관만으로 모든 네이버 서비스를 판단할 수 없음','네이버페이 등 일부 서비스에는 별도 약관과 운영정책이 적용되고, LINE·SNOW 같은 계열사 서비스는 운영 회사의 고유 약관을 따를 수 있습니다. 공통 약관의 포인트 설명을 모든 유료 포인트에 그대로 적용해서는 안 됩니다.',naver,'네이버 공통 이용약관','다양한 네이버 서비스를 즐겨보세요 / 다양한 포인트','한국','2026. 10. 1. 시행','실제로 가입·결제하는 서비스의 별도 약관도 확인하세요.','mid')
]);
const coupang='https://privacy.coupang.com/ko/center/coupang/';
add('coupang','개인정보처리방침 중 아래 3개 항목 확인 · 와우·환불 약관은 재검수 대기',[
  card('privacy','맞춤 서비스와 선택 광고 동의는 처리 근거가 다름','회원 식별 정보와 이용기록은 계약 이행 등의 근거로 맞춤 서비스에 사용됩니다. 별도로 이메일·휴대폰번호·이용기록·연령·성별을 맞춤 광고와 마케팅에 사용하는 선택 동의 항목이 있으며, 동의를 철회하면 해당 맞춤 광고를 차단한다고 명시합니다.',coupang,'쿠팡 개인정보처리방침','제1절 가·나 · 수집 항목 및 목적과 보유 기간','한국','2026. 5. 22. 시행','가입 때 선택 광고·마케팅 동의를 구분하고 철회 메뉴와 적용 범위를 확인하세요.'),
  card('cancel','탈퇴 후 회원 식별 정보는 90일 보관','이메일·이름·휴대폰번호·비밀번호 등 회원 식별 정보는 탈퇴 후 90일 보관한다고 정합니다. 부정행위가 탐지된 계정의 식별 정보·기록·CI는 탈퇴 후 1년 보관 대상입니다. 탈퇴가 모든 정보의 즉시 삭제를 뜻하지 않습니다.',coupang,'쿠팡 개인정보처리방침','제1절 가 · 회원관리 / 부정행위 방지','한국','2026. 5. 22. 시행','탈퇴 전 남겨야 할 거래 자료를 저장하고, 삭제 요청 시 정보 종류별 보관 근거를 문의하세요.'),
  card('privacy','거래 기록은 탈퇴와 별개로 수년간 남음','법정 보관 표는 결제·공급 및 계약·청약철회 기록 5년, 불만·분쟁 처리 기록 3년, 표시·광고 기록 6개월, 웹사이트·앱 방문 기록 3개월을 정합니다. 각 정보의 보관 기간은 서로 다릅니다.',coupang,'쿠팡 개인정보처리방침','제4절 · 개인정보의 파기 절차 및 방법','한국','2026. 5. 22. 시행','주문·환불 자료를 필요한 만큼 보관하고, 거래 기록과 회원 정보의 삭제 시점을 따로 확인하세요.','mid')
]);
const discord='https://discord.com/terms';
const discordPrivacy='https://discord.com/privacy';
add('discord','국제 영문 약관·개인정보처리방침 중 아래 4개 항목 확인 · 유료 약관은 미검수',[
  card('content','콘텐츠 이용권은 서비스 제공·개발·개선 목적','콘텐츠 소유권은 이용자에게 남지만 Discord에 전 세계적·무상·양도 및 재허락 가능한 이용권을 줍니다. 현재 약관은 그 목적을 법이 허용하는 서비스 제공·개발·개선으로 제한합니다. 피드백의 영구적 이용권 조항과 일반 콘텐츠 조항은 서로 다릅니다.',discord,'Discord Terms of Service','Content in Discord’s services · Your content','국제 영문 원문 · 현지법 예외 적용','2025. 9. 29. 발효','게시물과 서비스 개선 의견의 권리 조건을 구분하고 민감한 자료는 올리지 마세요.'),
  card('privacy','메시지 수집과 음성 통화 저장은 구분해야 함','메시지·게시물·초안·파일과 기기·이용 기록을 수집합니다. 반면 음성·영상 통화 내용과 화면 공유 스트림은 일반적으로 저장하지 않는다고 설명합니다. 직접 남긴 음성 메시지나 짧은 녹음은 별도 콘텐츠입니다.',discordPrivacy,'Discord Privacy Policy','The information we collect · Information you provide to us','국제 영문 원문 · 현지법 예외 적용','2025. 9. 29. 발효','공개 서버와 채널의 참여 범위를 확인하고 텍스트·파일·녹음에 민감한 정보를 남기지 마세요.'),
  card('cancel','계정 비활성화는 계약 종료가 아님','계정 비활성화는 개인정보 처리 일부를 제한하지만 약관상 계약을 종료하지 않습니다. 계약을 끝내려면 설정에서 계정을 삭제하고 서비스를 그만 이용해야 하며, 일부 조항은 종료 후에도 효력을 유지합니다.',discord,'Discord Terms of Service','Term & Termination · Your right to terminate','국제 영문 원문 · 현지법 예외 적용','2025. 9. 29. 발효','잠시 쉬는 비활성화와 계정 삭제를 구분하고 필요한 자료는 삭제 전에 보관하세요.'),
  card('other','2년 넘게 미사용하면 계정 종료 사유가 될 수 있음','약관 위반·위해 방지 등 외에 2년 넘게 비활성인 계정도 정지·종료 사유로 정합니다. 법이 요구하거나 합리적인 경우 사전 안내하고, 정지·삭제 등에 이의 신청할 경로를 제공합니다.',discord,'Discord Terms of Service','Term & Termination / Appeals','국제 영문 원문 · 현지법 예외 적용','2025. 9. 29. 발효','복구 연락처를 최신 상태로 유지하고 계정 제한 시 통지와 이의 신청 경로를 확인하세요.')
]);
const google='https://policies.google.com/privacy?hl=ko';
const activityText='시청·검색 활동은 기록 설정에 따라 계정에 저장되고 추천에 쓰입니다. 계정 설정에 따라 YouTube 시청 활동이 Google 광고 제품을 이용하는 다른 사이트의 광고에 반영될 수도 있습니다. 기록 저장과 맞춤 광고 설정을 각각 관리해야 합니다.';
add('youtube','한국 지역 이용약관·Google 개인정보처리방침 중 아래 3개 항목 확인 · 유료 약관은 미검수',[
  card('privacy','시청 기록 설정과 광고 설정은 따로 확인',activityText,google,'Google 개인정보처리방침','콘텐츠와 광고를 포함한 맞춤 서비스 제공 / 맞춤설정 및 활동 제어','한국어 원문','2026. 10. 1. 발효','YouTube 기록 설정과 내 광고 센터 설정을 각각 확인하세요.'),
  card('content','영상 이용권은 운영·홍보·개선 목적으로 부여','영상 권리는 이용자에게 남지만 서비스 운영·홍보·개선 목적의 전 세계적·무상·양도 및 재허락 가능한 이용권을 줍니다. 삭제하면 원칙적으로 이용권도 끝나지만, 기존 홍보 자료·허용된 오프라인 이용·법적 보관 등 예외가 있습니다.','https://www.youtube.com/static?template=terms&gl=KR&hl=ko','YouTube 한국 지역 이용약관 · 공식 영문 번역','Your Content and Conduct · Rights you Grant / Duration of License','한국 지역(KR) · 영문 번역','2022. 1. 5. 문서 표시일','영상 삭제만으로 이미 배포된 자료가 모두 회수된다고 생각하지 말고 공개할 자료를 신중히 고르세요.'),
  card('other','내 영상에 광고가 붙어도 수익 지급이 자동 보장되지 않음','한국 지역 약관은 YouTube가 콘텐츠로 수익을 창출할 권리를 받지만, 이 약관만으로 이용자에게 대가 지급 권리가 생기지는 않는다고 정합니다. 파트너 프로그램 등의 지급은 별도 계약에 따릅니다.','https://www.youtube.com/static?template=terms&gl=KR&hl=ko','YouTube 한국 지역 이용약관 · 공식 영문 번역','Your Content and Conduct · Right to Monetize','한국 지역(KR) · 영문 번역','2022. 1. 5. 문서 표시일','광고 표시 여부와 내 수익 창출 자격을 구분하고 파트너 프로그램 계약을 별도로 확인하세요.')
]);
add('google','개인정보처리방침 중 아래 2개 항목 확인 · 제품별 약관은 미검수',[
  card('privacy','활동 기록과 맞춤 광고 설정을 구분',activityText,google,'Google 개인정보처리방침','콘텐츠와 광고를 포함한 맞춤 서비스 제공 / 맞춤설정 및 활동 제어','한국어 원문','2026. 10. 1. 발효','Google 계정의 기록·맞춤설정 설정과 내 광고 센터를 각각 확인하세요.'),
  card('privacy','로그아웃해도 기기 식별자와 함께 정보 수집','계정에 로그인하지 않아도 브라우저·앱·기기에 연결된 고유 식별자와 함께 정보를 수집·저장할 수 있다고 설명합니다. 로그아웃만으로 Google의 정보 수집이 모두 멈추는 것은 아닙니다.',google,'Google 개인정보처리방침','Google에서 수집하는 정보','한국어 원문','2026. 10. 1. 발효','로그아웃 상태의 검색 맞춤설정, 광고 설정과 브라우저·기기 설정도 확인하세요.')
]);
add('netflix','한국어 공식 고객센터 중 해지·이용 목적 2개 항목 확인 · 전체 약관은 미검수',[
  card('cancel','앱 삭제나 로그아웃으로는 멤버십이 해지되지 않음','멤버십은 계정에서 해지 완료까지 진행해야 합니다. 해지하면 현재 결제 기간 말까지 이용할 수 있으며, 해지 버튼이 없으면 결제 파트너에게 해지해야 합니다. 앱을 지우거나 로그아웃해도 해지되지 않습니다.','https://help.netflix.com/ko/node/407','넷플릭스 한국어 공식 고객센터 · 멤버십 해지 방법','멤버십 해지 / 계정에 해지 옵션이 표시되지 않는 경우','한국어 공식 안내',null,'해지 완료 이메일과 계정의 종료일을 확인하고 파트너 결제라면 해당 업체에서 해지하세요.'),
  card('content','일반 멤버십은 공개 상영 허가를 뜻하지 않음','넷플릭스는 일반 계정으로 이용하는 콘텐츠를 개인적·비상업적 이용으로 제한한다고 안내합니다. 특정 교육용 일회성 상영 등 예외는 별도 조건을 따라야 하므로 가입만으로 단체 상영권이 생기지는 않습니다.','https://help.netflix.com/ko/node/633853347904100','넷플릭스 한국어 공식 고객센터 · 콘텐츠의 상업적 이용','콘텐츠의 상업적 이용','한국어 공식 안내',null,'학교·행사·가게에서 틀기 전에 해당 작품의 상영 허용 조건을 확인하세요.','mid')
]);
const temu='https://www.temu.com/kr/terms-of-use.html';
add('temu','한국 이용약관 중 아래 3개 항목 확인 · 개인정보·반품 세부 정책은 미검수',[
  card('content','후기는 운영·광고에 쓰일 수 있지만 영구 이용권으로 단정할 수 없음','후기·사진 등 제출물에 무상·전 세계적·양도 및 재허락 가능한 이용권을 주며 운영·마케팅·광고에 활용될 수 있습니다. 현재 한국 약관에는 계정 해지 시 서면 요청에 따라 제출물을 파기한다는 조건도 있으므로, 삭제 후 영구 사용한다고 단정하면 안 됩니다.',temu,'Temu 한국 이용약관','제6.1~6.3조 · 사용자 제출물','한국','2026. 8. 31. 발효','개인정보가 담긴 후기 사진은 피하고 탈퇴 시 제출물 파기를 원하면 서면으로 요청하세요.'),
  card('cancel','탈퇴하면 계정의 리워드가 취소됨','계정이 해지되면 관련 콘텐츠와 리워드가 몰수·취소되고, 해지 효력 발생 전에 남은 리워드를 사용해야 한다고 정합니다. 리워드별 사용처·현금 교환·별도 조건도 확인해야 합니다.',temu,'Temu 한국 이용약관','제12.1조 · 리워드 / 제13.2조 · 관계 종료','한국','2026. 8. 31. 발효','쿠폰·크레딧의 사용 기한과 탈퇴 시 소멸 여부를 확인하세요.'),
  card('other','판매 파트너와 플랫폼의 책임 범위를 구분','한국 약관은 Temu를 거래를 중개하는 플랫폼으로 설명하고 판매 파트너의 제품·거래조건에 대한 책임을 구분합니다. 다만 관련 법령상 책임이나 Temu의 고의·중과실까지 무조건 면제된다는 뜻은 아닙니다.',temu,'Temu 한국 이용약관','제14.1~14.4조 · 보증 성명','한국','2026. 8. 31. 발효','주문 전 실제 판매자와 반품 창구를 확인하고 문제가 생기면 판매자·플랫폼의 대응을 모두 기록하세요.')
]);
const cases={};
for(const key of ['coupang','disneyplus','tving','temu']){
  cases[key]=[structuredClone(original.cases[key][0])];
  cases[key][0].serviceName=original.services[key]?.name||key;
  cases[key][0].checkedAt=checkedAt;
  cases[key][0].scope='아래 사건의 출처와 요약 대조 · 이후 절차 전체 검수 아님';
}
cases.tving[0].text='2026년 9월 보도에 따르면 TVING은 개인정보 유출 사고에 대해 사과하고 보험금·포인트 지원 신청 절차를 안내했습니다. 당시 공지된 신청 기간은 9월 7~30일로, 이 보도만으로 현재도 신청할 수 있다고 해석하면 안 됩니다.';
cases.temu[0].org='Reuters 보도 · 유럽연합 집행위원회 조치';
cases.temu[0].text='2026년 5월 Reuters는 EU 집행위원회가 불법 상품의 위험 평가 미흡을 이유로 Temu에 2억 유로의 과징금을 부과했다고 보도했습니다. Temu는 결정에 이견을 표했습니다. 이후 이의 절차의 결론까지 확인한 사례는 아닙니다.';
const pending=Object.keys(original.services).filter(k=>!registry[k]);
const audit=JSON.parse(fs.readFileSync('link-audit-20261009.json','utf8'));
const auditMeta={checkedAt,inventoryCount:Object.keys(original.services).length,publishedServiceCount:Object.keys(registry).length,
  publishedItemCount:Object.values(registry).reduce((n,s)=>n+s.items.length,0),pendingServiceCount:pending.length,
  sourceCaseCount:Object.values(original.cases).flat().length,publishedCaseCount:Object.values(cases).flat().length,
  linkProbe:{total:audit.total,errorsOrTimeouts:audit.failed,otherResponses:audit.ok,note:'HTTP 접속 점검만 수행. 401·403·429 포함. 정상 약관·최신 버전·내용 검수 완료 건수가 아님.'},
  completed:false,note:'게시된 서비스도 표시된 항목만 원문과 대조했습니다. 전체 서비스·전체 조항·모든 사례의 최신 상태 검수는 미완료입니다.'};
fs.writeFileSync('reviewed-services.js','// Only source-compared items may be published. Do not fill with category templates.\nwindow.reviewedServices='+JSON.stringify(registry,null,2)+';\nwindow.reviewAudit='+JSON.stringify(auditMeta,null,2)+';\n');
fs.writeFileSync('casebook.js','window.serviceCases='+JSON.stringify(cases,null,2)+';\n');
fs.writeFileSync('audit-status.json',JSON.stringify({...auditMeta,services:Object.entries(original.services).map(([key,s])=>({key,name:s.name,domain:s.domain,status:registry[key]?'partial-items-reviewed':'pending-not-published',reviewScope:registry[key]?.reviewScope||null})),pendingCases:Object.entries(original.cases).flatMap(([key,cc])=>cc.slice(cases[key]?.length||0).map(c=>({service:key,title:c.title,year:c.year,status:'pending-not-published'})))},null,2)+'\n');
console.log(JSON.stringify(auditMeta));
