import fs from 'node:fs';
import vm from 'node:vm';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('casebook.js','utf8'),context);
const book=context.window.serviceCases;
const checkedAt='2026. 10. 14. (한국 시간)';
function add(key,serviceName,year,publishedAt,region,stage,title,text,url,scope,sources=[]){
  const record={year,publishedAt,region,stage,org:region.startsWith('유럽')?'아일랜드 개인정보보호위원회(DPC)':key==='discord'?'Discord 공식 발표':key==='adobe'?'미국 법무부':'미국 연방거래위원회(FTC)',title,text,url,serviceName,checkedAt,scope,sources};
  book[key]=[record,...(book[key]||[]).filter(c=>c.url!==url)].sort((a,b)=>(b.publishedAt||b.year).localeCompare(a.publishedAt||a.year));
}
add('amazon','Amazon','2026','2026-09','미국 · Amazon Prime','합의 후 환불 지급',
  '동의 없는 Prime 가입·복잡한 해지 절차와 추가 환불',
  'FTC는 Prime 가입·해지 관행에 관한 2025년 합의 후 2026년 9월까지 8억 4,500만 달러 이상의 환불이 지급됐다고 발표했습니다. 법원은 추가 자동 환불과 대상 확대를 승인했습니다. 미국 합의 대상의 지급 절차로, 모든 국가의 Prime 이용자에게 동일한 환불권이 생기는 것은 아닙니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2026/09/ftc-announces-additional-payments-consumers-stemming-ftcs-amazon-prime-settlement',
  '2026년 9월 FTC 후속 지급 발표 대조 · 미국 합의 대상 및 이후 지급 일정은 공식 안내 참고');
add('discord','Discord','2025','2025-10-09','전 세계 · 고객지원 이용자 일부','업체의 유출 사고 발표',
  '고객지원 위탁업체 침해로 신분증 사진 등 노출 가능',
  'Discord는 고객지원 위탁업체 5CA가 침해돼 지원 문의 정보가 노출됐다고 발표했습니다. 약 7만 명의 정부 발급 신분증 사진이 노출됐을 가능성을 확인했습니다. 일반 대화 전체·비밀번호·카드번호 전체가 유출됐다는 발표는 아니며, 고객지원에 제공한 정보 범위의 사고입니다.',
  'https://discord.com/press-releases/update-on-security-incident-involving-third-party-customer-service',
  '2025. 10. 9. 갱신된 Discord 공식 발표 대조 · 업체 발표에 따른 노출 범위');
add('adobe','Adobe','2026','2026-03-13','미국 · 구독 서비스','합의안·금지명령안 제출',
  '해지 비용 고지·복잡한 취소 절차 문제로 합의안 제출',
  '미국 법무부는 조기 해지 비용을 충분히 알리지 않고 취소 절차를 어렵게 했다는 주장과 관련해 합의안을 법원에 제출했습니다. 제안된 내용은 민사 벌금 7,500만 달러와 고객용 무료 서비스 7,500만 달러, 해지 비용 사전 고지·취소 절차 개선입니다. 고객에게 1억 5,000만 달러를 현금 환불한다는 뜻은 아닙니다.',
  'https://www.justice.gov/usao-ndca/pr/adobe-agrees-150-million-settlement-and-injunction-resolve-alleged-violations-restore',
  '2026. 3. 13. 법무부 발표는 법원 승인 전 제안 명령 단계 · 한국 해지 금액과 미국 분쟁을 구분');
add('betterhelp','BetterHelp','2025','2025-04','미국 · 지정 기간 유료 이용자','합의 후 2차 환불',
  '건강 설문·연락처의 광고 활용 문제와 2차 환불',
  'FTC는 BetterHelp가 비공개를 약속한 이메일·IP 주소·건강 설문 답변을 광고 목적으로 공유했다고 설명했습니다. 2023년 합의금 780만 달러를 바탕으로 환불했고, 2025년 4월에는 첫 지급을 받은 대상자에게 260만 달러 이상을 추가 지급했습니다. 신규 신청을 지금 받는다는 안내는 아닙니다.',
  'https://www.ftc.gov/enforcement/refunds/betterhelp-refunds',
  'FTC 2025년 4월 후속 환불 안내 대조 · 지급 대상은 안내된 과거 유료 이용 기간으로 한정');
add('xbox','Xbox','2023','2023-06','미국 · 아동 계정','혐의 해결을 위한 합의 발표',
  '부모 동의 없는 아동 정보 수집·보관 문제',
  'FTC는 Xbox 가입 과정에서 부모에게 충분히 알리거나 동의를 받지 않고 아동 정보를 수집·보관했다는 혐의를 발표했습니다. Microsoft는 2,000만 달러 지급과 아동 개인정보 보호 조치를 포함한 합의에 동의했습니다. 이 금액이 이용자 개인에게 자동 지급되는 보상금은 아닙니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2023/06/ftc-will-require-microsoft-pay-20-million-over-charges-it-illegally-collected-personal-information',
  '2023년 FTC 합의 발표 대조 · 해당 발표의 법원 승인 전 제안 명령 단계와 현재 약관을 구분');
add('zoom','Zoom','2020','2020-11','미국 · 회의 이용자','혐의 해결을 위한 합의 발표',
  '종단간 암호화 홍보와 실제 보안 수준의 차이',
  'FTC는 Zoom이 종단간 암호화와 녹화 보안을 실제보다 강하게 홍보해 이용자를 오도했다고 주장했습니다. Zoom은 보안 프로그램 구축·개인정보와 보안 표현 개선·독립 평가를 포함한 합의에 동의했습니다. 과거 조사 대상의 문제이며 현재 모든 회의의 암호화 상태를 판정하는 사례는 아닙니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2020/11/ftc-requires-zoom-enhance-its-security-practices-part-settlement',
  '2020년 FTC 합의 발표 대조 · 이용자 현금 배상을 발표한 자료가 아님');
add('linkedin','LinkedIn','2024','2024-10-24','유럽경제지역 · 회원 정보','행정 제재 · 이의 절차 중',
  '행동 분석·맞춤 광고의 적법성 문제로 3억 1,000만 유로 제재',
  'DPC는 LinkedIn 회원의 행동 분석과 맞춤 광고 처리에 적법성·공정성·투명성 문제가 있다고 판단해 총 3억 1,000만 유로의 과징금과 시정명령을 발표했습니다. 공식 과징금 목록에는 이의 절차 중으로 표시되어 있어 최종 확정·납부 완료로 설명하지 않습니다.',
  'https://www.dataprotection.ie/en/news-media/press-releases/irish-data-protection-commission-fines-linkedin-ireland-eu310-million',
  '2024년 결정 발표와 조회 시점의 공식 과징금 목록 대조',
  [{label:'공식 이의 절차 상태',url:'https://dataprotection.ie/en/dpc-guidance/decisions/fines'}]);
add('x','X','2022','2022-05','미국 · 당시 Twitter 이용자','혐의 해결을 위한 합의 발표',
  '보안용으로 받은 연락처를 맞춤 광고에 활용한 문제',
  'FTC는 당시 Twitter가 계정 보안을 위해 받은 전화번호·이메일을 맞춤 광고에도 썼다고 주장했습니다. 발표된 합의는 1억 5,000만 달러의 벌금과 해당 데이터 활용 제한 등을 포함합니다. 현재 X 약관의 조건과 과거 Twitter 사건은 구분해야 합니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2022/05/ftc-charges-twitter-deceptively-using-account-security-data-sell-targeted-ads',
  '2014~2019년 행위에 대한 2022년 FTC 발표 대조 · 제안 명령의 이후 절차 전체 검수 아님');
add('youtube','YouTube','2019','2019-09','미국 · 아동 대상 채널','아동 개인정보 혐의 합의',
  '아동 시청자의 식별자를 동의 없이 광고에 쓴 문제',
  'FTC와 뉴욕주 법무부는 YouTube가 아동 대상 채널 시청자의 지속 식별자를 부모 동의 없이 수집해 맞춤 광고에 활용했다고 주장했습니다. Google·YouTube는 총 1억 7,000만 달러 지급 합의에 동의했습니다. 모든 시청자에게 지급하는 환불금이 아니라 제재 관련 금액입니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2019/09/google-youtube-will-pay-record-170-million-alleged-violations-childrens-privacy-law',
  '2019년 FTC 합의 발표 대조 · 현재 아동용 콘텐츠 설정과 과거 조사 행위를 구분');
add('okcupid','OkCupid','2026','2026-03-30','미국 · OkCupid 이용자 정보','혐의 발표·합의 명령안 제출',
  '사진·위치 정보를 무관한 제3자에게 제공했다는 혐의',
  'FTC는 OkCupid가 개인정보 약속과 다르게 이용자의 사진 약 300만 장과 위치 등 정보를 무관한 제3자에게 제공했다고 주장했습니다. 제안된 합의는 개인정보 처리와 선택권에 관한 허위 설명을 금지하는 내용입니다. 이 발표만으로 개인별 피해액이나 현금 보상액을 확인할 수는 없습니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-takes-action-against-match-okcupid-deceiving-users-sharing-personal-data-third-party',
  '2026년 FTC 발표·사건 목록의 3월 30일 접수 기록 대조 · 법원 승인 이후 결론 전체 검수 아님');
add('epicgames','Epic Games','2025','2025-06-25','미국 · Fortnite 구매 이용자','합의 후 환불 지급',
  '원치 않은 게임 내 결제에 1억 2,600만 달러 환불',
  'FTC는 Fortnite의 원치 않은 구매 관련 합의에 따라 2025년 6월 약 97만 건, 총 1억 2,600만 달러 이상의 환불을 발송했습니다. 2024년 지급분과 합해 당시 약 2억 달러를 돌려줬다고 설명했습니다. 공식 안내에서 신규 신청은 종료됐다고 표시합니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2025/06/ftc-sends-126-million-refunds-fortnite-players-who-were-charged-unwanted-items-reopens-claims',
  'FTC 지급 발표와 환불 프로그램의 신규 신청 종료 안내 대조',
  [{label:'공식 환불 진행 안내',url:'https://www.ftc.gov/enforcement/refunds/fortnite-refunds'}]);
add('epicgames','Epic Games','2022','2022-12','미국 · Fortnite 아동·청소년','아동 개인정보 혐의 합의',
  '아동 정보 수집·기본 공개 채팅 설정 문제',
  'FTC는 부모 동의 없는 아동 정보 수집과 기본으로 켜진 음성·텍스트 채팅이 아동·청소년을 괴롭힘 위험에 노출시켰다고 주장했습니다. 별도 개인정보 합의는 2억 7,500만 달러의 벌금과 더 강한 기본 보호 설정을 포함합니다. 원치 않은 결제의 환불 합의와는 다른 사건입니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations',
  '2022년 FTC 발표의 개인정보 사건 부분 대조 · 벌금을 이용자 환불금으로 표시하지 않음');
add('tiktok','TikTok','2025','2025-04-30','유럽경제지역 · 중국으로의 정보 이전','행정 제재 · 이의 절차 중',
  '중국 원격 접근·해외 이전 고지 문제로 5억 3,000만 유로 제재',
  'DPC는 중국에 있는 인력의 EEA 이용자 정보 원격 접근과 해외 이전 보호·고지 문제를 판단했습니다. 총 5억 3,000만 유로 과징금과 시정 조치를 결정했습니다. 공식 목록에는 이의 절차 중으로 표시되어 있으며 한국 이용자에게 그대로 적용되는 보상 판정은 아닙니다.',
  'https://www.dataprotection.ie/en/dpc-guidance/decisions/inquiry-tiktok-technology-limited',
  '2025년 DPC 결정과 조회 시점의 공식 과징금 목록 대조',
  [{label:'공식 이의 절차 상태',url:'https://dataprotection.ie/en/dpc-guidance/decisions/fines'}]);
add('tiktok','TikTok','2024','2024-08','미국 · 아동 계정','규제기관의 소송 제기',
  '아동 정보 수집·삭제 절차 위반 혐의로 소송',
  '미국 법무부는 FTC를 대신해 TikTok과 ByteDance가 13세 미만 아동의 정보를 부모 동의 없이 수집·사용하고 삭제 요청을 어렵게 했다는 혐의로 소송을 냈습니다. 소장에 기재된 주장으로, 이 발표를 확정 판결이나 지급 완료된 배상금으로 표시하지 않습니다.',
  'https://www.ftc.gov/news-events/news/press-releases/2024/08/ftc-investigation-leads-lawsuit-against-tiktok-bytedance-flagrantly-violating-childrens-privacy-law',
  '2024년 FTC 소송 발표 대조 · 이후 재판의 최종 결론은 이 기록에 포함하지 않음');
add('google','Google','2026','2026-09-21','유럽경제지역 · 위치 데이터','행정 제재 · 후속 절차 확인 필요',
  '위치 기록의 적법성·보관 문제로 4억 300만 유로 제재',
  'DPC는 2018~2020년 웹·앱 활동, 위치 기록, 위치 정확도 관련 처리의 적법성·투명성·보관 문제를 판단했습니다. 2026년 9월 21일 총 4억 300만 유로의 과징금과 6개월 내 시정명령을 발표했습니다. 공식 목록의 상태는 Not Confirmed로, 확정·납부 완료로 설명하지 않습니다.',
  'https://www.dataprotection.ie/en/news-media/latest-news/data-protection-commission-fines-google-eu403-million-following-inquiry-googles-processing-location',
  '2026년 DPC 발표와 공식 과징금 목록 대조 · 과거 처리 기간과 현재 설정을 구분',
  [{label:'공식 후속 절차 상태',url:'https://dataprotection.ie/en/dpc-guidance/decisions/fines'}]);
fs.writeFileSync('casebook.js','window.serviceCases='+JSON.stringify(book,null,2)+';\n');
console.log({services:Object.keys(book).length,cases:Object.values(book).reduce((n,c)=>n+c.length,0)});
