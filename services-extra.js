window.extraServices=(()=>{
  const profiles={
    social:{
      overall:'개인정보·게시물 권한 확인 필요',
      items:(n,terms,privacy)=>[
        ['payment','결제·구독','유료 기능은 자동 갱신될 수 있음','mid',`${n}의 유료 구독이나 앱 내 결제는 사용자가 취소할 때까지 갱신될 수 있고, 앱스토어로 결제했다면 해지·환불도 해당 스토어 규칙을 따를 수 있습니다.`,`유료 기능을 한 번 신청한 뒤 잊으면 다음 결제일에 다시 돈이 나갈 수 있습니다.`,terms],
        ['privacy','개인정보','활동·관계·기기 정보가 함께 활용됨','high',`${n}는 게시물 반응, 검색, 팔로우·친구 관계, 접속 기기와 위치 관련 정보 등을 추천·광고·보안 기능에 활용할 수 있습니다.`,`무엇을 보고 누구와 연결됐는지가 다음 추천과 광고를 고르는 자료가 될 수 있습니다.`,privacy],
        ['content','콘텐츠 권리','게시물에 플랫폼 이용권을 부여함','high',`게시물 소유권은 이용자에게 남더라도 ${n}가 서비스 운영·배포·추천을 위해 저장, 복제, 표시할 수 있는 이용권을 받습니다.`,`내 글과 사진이어도 플랫폼이 다른 이용자에게 보여 주고 서비스에 맞게 처리할 수 있도록 허락하는 셈입니다.`,terms],
        ['cancel','해지·환불','계정 삭제와 데이터 삭제가 동시에 끝나지 않음','mid',`계정 삭제 뒤에도 백업, 법적 의무, 분쟁·보안 대응이나 다른 이용자의 공유본 때문에 일부 정보가 일정 기간 남을 수 있습니다.`,`삭제 버튼을 눌러도 모든 사본이 즉시 없어지는 것은 아닐 수 있으니 필요한 자료는 먼저 내려받아야 합니다.`,privacy],
        ['other','기타 주의','정책 판단으로 게시물·계정이 제한될 수 있음','high',`${n}는 약관이나 운영정책 위반이 의심되면 게시물 노출을 줄이거나 삭제하고 계정 기능을 제한·정지할 수 있습니다.`,`플랫폼의 정책 판단에 따라 글이 사라지거나 계정을 쓰지 못할 수 있으므로 중요한 자료는 별도로 보관해야 합니다.`,terms]
      ]
    },
    stream:{
      overall:'자동결제·콘텐츠 이용 조건 확인 필요',
      items:(n,terms,privacy)=>[
        ['payment','결제·구독','무료 체험 뒤 자동 결제될 수 있음','high',`${n}의 체험 또는 유료 구독은 종료 전에 취소하지 않으면 유료 전환되거나 다음 결제 주기에 자동 갱신될 수 있습니다.`,`체험 종료일이나 다음 결제일을 놓치면 등록한 결제수단에서 요금이 나갈 수 있습니다.`,terms],
        ['privacy','개인정보','재생·검색·기기 기록이 추천에 활용됨','high',`${n}는 시청·청취·검색 기록, 재생 위치, 기기·네트워크 정보 등을 추천, 서비스 분석과 광고에 활용할 수 있습니다.`,`무엇을 끝까지 보고 무엇을 건너뛰었는지가 다음 추천과 광고에 영향을 줄 수 있습니다.`,privacy],
        ['content','콘텐츠 권리','저장해도 영구 소유가 아님','mid',`${n}의 콘텐츠는 제한된 이용권으로 제공되며 계약, 지역, 기기, 구독 상태에 따라 작품이 내려가거나 오프라인 저장이 만료될 수 있습니다.`,`내려받은 작품도 파일을 산 것과 달라서 구독 종료나 제공 중단 뒤에는 재생하지 못할 수 있습니다.`,terms],
        ['cancel','해지·환불','중도 해지의 부분 환불이 보장되지 않음','high',`해지는 보통 현재 결제 기간이 끝날 때 적용되며, 법이나 별도 환불정책이 요구하지 않으면 남은 기간의 부분 환불이 제한될 수 있습니다.`,`결제 직후 해지해도 다음 결제만 막히고 이번 기간 요금은 돌려받지 못할 수 있습니다.`,terms],
        ['other','기타 주의','지역·요금제에 따라 이용 범위가 달라짐','mid',`${n}는 국가, 광고 포함 여부, 동시 재생 수, 지원 기기와 라이선스에 따라 제공 작품과 기능을 다르게 운영할 수 있습니다.`,`같은 계정이어도 여행지나 요금제가 바뀌면 보던 작품이나 기능을 이용하지 못할 수 있습니다.`,terms]
      ]
    },
    commerce:{
      overall:'판매자·반품·개인정보 확인 필요',
      items:(n,terms,privacy)=>[
        ['payment','결제·구독','최종 결제액과 반복 결제를 확인해야 함','high',`${n}에서는 배송비, 세금, 해외 결제 비용, 쿠폰 조건 또는 멤버십 자동 갱신 때문에 처음 본 가격과 실제 지출이 달라질 수 있습니다.`,`상품 가격만 보고 결제하면 추가 비용이나 다음 달 멤버십 요금이 붙을 수 있습니다.`,terms],
        ['privacy','개인정보','검색·구매·배송 정보가 함께 처리됨','high',`${n}는 검색, 장바구니, 구매·환불, 배송지, 기기와 광고 반응 정보를 주문 처리, 추천, 분석과 광고에 활용할 수 있습니다.`,`사지 않고 구경한 상품과 주문·반품 기록도 이후 추천이나 광고에 영향을 줄 수 있습니다.`,privacy],
        ['content','콘텐츠 권리','후기와 사진은 공개·활용될 수 있음','mid',`${n}에 올린 후기·사진은 다른 이용자에게 공개되고 서비스 운영·홍보에 활용될 수 있으므로 개인 정보나 타인의 저작물을 올리면 안 됩니다.`,`후기 사진에 얼굴이나 송장이 찍혀 있으면 모르는 사람에게 보이거나 홍보 화면에 쓰일 수 있습니다.`,terms],
        ['cancel','해지·환불','반품 조건이 상품과 판매자마다 다름','high',`반품 가능 기간과 비용은 상품 종류, 개봉·사용 여부, 주문제작 여부와 판매자 책임에 따라 달라지고 결제수단별 환불 시점도 다를 수 있습니다.`,`포장을 뜯거나 사용한 뒤에는 단순 변심 반품이 거절되거나 반품비를 부담할 수 있습니다.`,terms],
        ['other','기타 주의','플랫폼과 실제 판매자가 다를 수 있음','high',`${n}의 일부 거래는 제3자 판매자·가게가 계약 당사자이므로 상품, 배송, 교환 책임과 고객센터 창구를 주문 전에 확인해야 합니다.`,`같은 화면에서 주문해도 실제 판매자와 문제를 해결할 상대가 서비스마다 다를 수 있습니다.`,terms]
      ]
    },
    productivity:{
      overall:'데이터 보관·구독 조건 확인 필요',
      items:(n,terms,privacy)=>[
        ['payment','결제·구독','요금제와 인원 수에 따라 반복 청구됨','high',`${n}의 유료 요금제는 취소 전까지 갱신될 수 있고, 저장 용량·좌석 수·결제 주기 변경에 따라 다음 청구액이 달라질 수 있습니다.`,`팀원을 추가하거나 요금제를 바꾼 뒤 예상보다 큰 금액이 다음 결제일에 청구될 수 있습니다.`,terms],
        ['privacy','개인정보','파일·사용 기록과 관리 권한을 확인해야 함','high',`${n}는 계정, 기기, 기능 사용 기록을 처리하며 조직 계정에서는 관리자가 계정이나 업무 데이터에 접근·관리할 수 있습니다.`,`학교나 회사 계정에 저장한 자료는 내 개인 계정과 달리 조직 관리자가 보거나 회수할 수 있습니다.`,privacy],
        ['content','콘텐츠 권리','서비스 제공에 필요한 데이터 처리 권한을 부여함','mid',`자료 소유권은 이용자에게 남더라도 ${n}가 저장, 전송, 변환과 미리보기 등 서비스를 제공하는 데 필요한 범위에서 데이터를 처리합니다.`,`파일은 내 것이지만 동기화와 공유를 위해 서비스가 복사·변환할 수 있도록 허락하는 구조입니다.`,terms],
        ['cancel','해지·환불','해지 전에 자료를 내보내야 함','high',`구독이나 계정이 종료되면 저장공간 축소, 편집 제한 또는 데이터 삭제가 생길 수 있고 복구 기간도 보장되지 않을 수 있습니다.`,`결제를 끊기 전에 파일을 내려받지 않으면 나중에 열거나 복구하지 못할 수 있습니다.`,terms],
        ['other','기타 주의','연동 앱과 공유 설정이 별도 위험이 됨','mid',`${n}에 연결한 제3자 앱은 별도 약관에 따라 데이터에 접근할 수 있고, 공개 링크나 잘못된 공유 권한은 자료를 예상보다 넓게 노출할 수 있습니다.`,`링크 하나를 잘못 공개하거나 연동 앱 권한을 오래 두면 원치 않는 사람이 자료를 볼 수 있습니다.`,terms]
      ]
    },
    travel:{
      overall:'취소 수수료·사업자 책임 확인 필요',
      items:(n,terms,privacy)=>[
        ['payment','결제·구독','표시 가격과 최종 결제액이 다를 수 있음','high',`${n}의 예약에는 세금, 서비스 수수료, 환율, 보증금이나 현지 추가 요금이 붙을 수 있어 결제 직전 총액을 확인해야 합니다.`,`검색 화면의 가격만 보고 예약하면 결제 단계나 현장에서 비용이 더 붙을 수 있습니다.`,terms],
        ['privacy','개인정보','신원·위치·여행 정보가 처리됨','high',`${n}는 예약, 결제, 신원 확인, 위치, 이동 경로와 기기 정보를 거래 처리, 안전, 분석과 맞춤 서비스에 활용할 수 있습니다.`,`어디서 언제 이동하거나 머물렀는지 같은 정보가 계정과 예약 기록에 연결될 수 있습니다.`,privacy],
        ['content','콘텐츠 권리','후기와 사진이 공개·재사용될 수 있음','mid',`${n}에 제출한 후기와 사진은 공개되고 서비스 운영·홍보를 위해 복제·번역·표시될 수 있으므로 개인 정보가 포함되지 않게 해야 합니다.`,`여행 후기에 올린 사진과 글이 여러 국가의 서비스 화면에 계속 보일 수 있습니다.`,terms],
        ['cancel','해지·환불','취소 규정이 예약마다 다름','high',`환불 가능 시점과 취소 수수료는 숙소·항공·차량·운행 사업자와 예약 상품별 조건에 따라 달라지며, 노쇼는 전액 환불 불가일 수 있습니다.`,`같은 서비스에서 예약해도 상품마다 무료 취소 마감과 환불액이 다르므로 결제 전에 확인해야 합니다.`,terms],
        ['other','기타 주의','플랫폼과 실제 서비스 제공자가 다름','high',`${n}가 중개 플랫폼인 경우 실제 숙박·운송·예약 이행 책임은 별도 사업자에게 있을 수 있어 분쟁 창구와 책임 범위를 확인해야 합니다.`,`문제가 생기면 플랫폼이 아니라 숙소나 운송업체와 직접 해결해야 하는 경우가 있습니다.`,terms]
      ]
    }
  };

  const catalog=[
    ['facebook','Facebook','facebook.com',['페이스북'],'f','social','https://www.facebook.com/legal/terms','https://www.facebook.com/privacy/policy/'],
    ['threads','Threads','threads.net',['스레드','스레즈'],'Th','social','https://help.instagram.com/769983657850450','https://privacycenter.instagram.com/policy/'],
    ['x','X','x.com',['트위터','twitter'],'X','social','https://x.com/en/tos','https://x.com/en/privacy'],
    ['linkedin','LinkedIn','linkedin.com',['링크드인'],'in','social','https://www.linkedin.com/legal/user-agreement','https://www.linkedin.com/legal/privacy-policy'],
    ['reddit','Reddit','reddit.com',['레딧'],'R','social','https://redditinc.com/policies/user-agreement','https://redditinc.com/policies/privacy-policy'],
    ['pinterest','Pinterest','pinterest.com',['핀터레스트'],'P','social','https://policy.pinterest.com/en/terms-of-service','https://policy.pinterest.com/en/privacy-policy'],
    ['snapchat','Snapchat','snapchat.com',['스냅챗'],'S','social','https://www.snap.com/terms','https://values.snap.com/privacy/privacy-policy'],
    ['kakaotalk','카카오톡','kakao.com',['카톡','kakao talk'],'K','social','https://www.kakao.com/policy/terms?lang=ko','https://www.kakao.com/policy/privacy?lang=ko'],
    ['line','LINE','line.me',['라인'],'L','social','https://terms.line.me/line_terms?lang=ko','https://terms.line.me/line_rules?lang=ko'],
    ['telegram','Telegram','telegram.org',['텔레그램'],'T','social','https://telegram.org/tos','https://telegram.org/privacy'],
    ['twitch','Twitch','twitch.tv',['트위치'],'Tw','social','https://www.twitch.tv/p/en/legal/terms-of-service/','https://www.twitch.tv/p/en/legal/privacy-notice/'],
    ['disneyplus','Disney+','disneyplus.com',['디즈니플러스','디즈니+'],'D+','stream','https://www.disneyplus.com/legal/subscriber-agreement','https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/'],
    ['watcha','왓챠','watcha.com',['watcha'],'W','stream','https://watcha.com/terms','https://watcha.com/privacy'],
    ['tving','TVING','tving.com',['티빙'],'TV','stream','https://www.tving.com/policy/terms','https://www.tving.com/policy/privacy'],
    ['wavve','Wavve','wavve.com',['웨이브'],'W','stream','https://www.wavve.com/customer/agreement/terms','https://www.wavve.com/customer/agreement/privacy'],
    ['appletv','Apple TV+','tv.apple.com',['애플티비','애플tv'],'AT','stream','https://www.apple.com/legal/internet-services/itunes/ww/','https://www.apple.com/legal/privacy/'],
    ['primevideo','Prime Video','primevideo.com',['프라임비디오','아마존 프라임 비디오'],'PV','stream','https://www.primevideo.com/help?nodeId=202095490','https://www.amazon.com/privacy'],
    ['applemusic','Apple Music','music.apple.com',['애플뮤직'],'AM','stream','https://www.apple.com/legal/internet-services/itunes/ww/','https://www.apple.com/legal/privacy/'],
    ['melon','멜론','melon.com',['melon'],'M','stream','https://info.melon.com/terms/web/terms1_1.html','https://info.melon.com/terms/web/terms3.html'],
    ['soundcloud','SoundCloud','soundcloud.com',['사운드클라우드'],'SC','stream','https://soundcloud.com/terms-of-use','https://soundcloud.com/pages/privacy'],
    ['aliexpress','AliExpress','aliexpress.com',['알리익스프레스','알리'],'AE','commerce','https://terms.alicdn.com/legal-agreement/terms/suit_bu1_aliexpress/suit_bu1_aliexpress202109291856_35940.html','https://terms.alicdn.com/legal-agreement/terms/suit_bu1_aliexpress/suit_bu1_aliexpress202102181141_56155.html'],
    ['shein','SHEIN','shein.com',['쉬인'],'SH','commerce','https://www.shein.com/Terms-and-Conditions-a-399.html','https://www.shein.com/Privacy-Security-Policy-a-282.html'],
    ['musinsa','무신사','musinsa.com',['musinsa'],'M','commerce','https://www.musinsa.com/app/company/terms?termsNo=1','https://www.musinsa.com/app/company/terms?termsNo=2'],
    ['zigzag','지그재그','zigzag.kr',['zigzag'],'Z','commerce','https://zigzag.kr/terms/user-terms','https://zigzag.kr/terms/privacy-policy'],
    ['elevenst','11번가','11st.co.kr',['십일번가','11st'],'11','commerce','https://www.11st.co.kr/browsing/MallshopInfo.tmall?method=terms','https://privacy.11st.co.kr/'],
    ['gmarket','G마켓','gmarket.co.kr',['지마켓','gmarket'],'G','commerce','https://member2.gmarket.co.kr/TermsPolicy/BuyerTermsPolicy','https://member2.gmarket.co.kr/TermsPolicy/PrivacyPolicy'],
    ['ssg','SSG.COM','ssg.com',['쓱닷컴','쓱'],'SS','commerce','https://www.ssg.com/customer/policies/terms.ssg','https://www.ssg.com/customer/policies/privacy.ssg'],
    ['baemin','배달의민족','baemin.com',['배민'],'B','commerce','https://www.baemin.com/service-policy/terms','https://www.baemin.com/service-policy/privacy'],
    ['yogiyo','요기요','yogiyo.co.kr',['yogiyo'],'Y','commerce','https://www.yogiyo.co.kr/mobile/#/policy/terms','https://www.yogiyo.co.kr/mobile/#/policy/privacy'],
    ['google','Google','google.com',['구글'],'G','productivity','https://policies.google.com/terms','https://policies.google.com/privacy'],
    ['microsoft','Microsoft','microsoft.com',['마이크로소프트','ms'],'MS','productivity','https://www.microsoft.com/servicesagreement','https://privacy.microsoft.com/privacystatement'],
    ['apple','Apple iCloud','icloud.com',['애플','아이클라우드','icloud'],'iC','productivity','https://www.apple.com/legal/internet-services/icloud/en/terms.html','https://www.apple.com/legal/privacy/'],
    ['dropbox','Dropbox','dropbox.com',['드롭박스'],'DB','productivity','https://www.dropbox.com/terms','https://www.dropbox.com/privacy'],
    ['notion','Notion','notion.so',['노션'],'N','productivity','https://www.notion.so/terms','https://www.notion.so/privacy'],
    ['slack','Slack','slack.com',['슬랙'],'S','productivity','https://slack.com/terms-of-service','https://slack.com/trust/privacy/privacy-policy'],
    ['zoom','Zoom','zoom.us',['줌'],'Z','productivity','https://www.zoom.com/en/trust/terms/','https://www.zoom.com/en/trust/privacy/privacy-statement/'],
    ['canva','Canva','canva.com',['캔바'],'C','productivity','https://www.canva.com/policies/terms-of-use/','https://www.canva.com/policies/privacy-policy/'],
    ['airbnb','Airbnb','airbnb.com',['에어비앤비'],'A','travel','https://www.airbnb.com/help/article/2908','https://www.airbnb.com/help/article/2855'],
    ['booking','Booking.com','booking.com',['부킹닷컴','부킹'],'B','travel','https://www.booking.com/content/terms.html','https://www.booking.com/content/privacy.html'],
    ['tripcom','Trip.com','trip.com',['트립닷컴'],'T','travel','https://www.trip.com/contents/service-guideline/terms.html','https://www.trip.com/contents/service-guideline/privacy-policy.html'],
    ['uber','Uber','uber.com',['우버'],'U','travel','https://www.uber.com/legal/terms/kr/','https://www.uber.com/legal/privacy/users/kr/'],
    ['kakaot','카카오 T','kakaomobility.com',['카카오택시','카카오티'],'KT','travel','https://service.kakaomobility.com/terms?type=service','https://service.kakaomobility.com/terms?type=privacy']
  ];

  window.serviceProfiles=profiles;
  return Object.fromEntries(catalog.map(([key,name,domain,aliases,mark,profile,source,privacy])=>{
    const p=profiles[profile];
    return [key,{name,domain,aliases,mark,profile,overall:p.overall,source,items:p.items(name,source,privacy)}];
  }));
})();
