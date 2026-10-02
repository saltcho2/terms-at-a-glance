window.moreServices=(()=>{
  const profiles=window.serviceProfiles;
  profiles.gaming={
    overall:'결제·계정·가상 아이템 조건 확인 필요',
    items:(n,terms,privacy)=>[
      ['payment','결제·구독','가상 아이템과 구독 환불이 제한될 수 있음','high',`${n}의 게임, 구독, 재화와 아이템은 결제 경로·사용 여부·지역에 따라 청약철회와 환불 조건이 달라질 수 있습니다.`,`아이템을 사용하거나 앱스토어로 결제하면 일반 상품처럼 바로 환불받지 못할 수 있습니다.`,terms],
      ['privacy','개인정보','플레이·채팅·기기 기록이 처리됨','high',`${n}는 플레이 기록, 친구, 채팅·신고, 기기와 접속 정보를 운영, 부정행위 방지, 추천과 광고에 활용할 수 있습니다.`,`누구와 무엇을 플레이했고 어떤 기기로 접속했는지가 계정 활동 정보로 남을 수 있습니다.`,privacy],
      ['content','콘텐츠 권리','창작물과 방송에 이용 허락이 필요할 수 있음','mid',`${n}에 올린 맵, 캐릭터, 게시물과 영상은 서비스 운영·공유·홍보를 위해 플랫폼이 이용할 수 있는 권한이 부여될 수 있습니다.`,`직접 만든 콘텐츠라도 게임 안에서 배포하면 플랫폼이 표시하고 공유할 수 있도록 허락하는 구조일 수 있습니다.`,terms],
      ['cancel','해지·환불','계정 종료 시 구매 항목 접근을 잃을 수 있음','high',`계정이 종료되거나 서비스가 중단되면 구매한 디지털 게임, 아이템과 저장 기록에 대한 접근이 제한될 수 있고 현금 환급이 보장되지 않을 수 있습니다.`,`돈을 내고 산 디지털 항목도 계정을 잃으면 다시 이용하지 못할 수 있습니다.`,terms],
      ['other','기타 주의','규정 위반 판단으로 계정 제재 가능','high',`${n}는 부정행위, 계정 공유, 욕설이나 운영정책 위반이 의심되면 기능 제한, 아이템 회수 또는 계정 정지를 할 수 있습니다.`,`제재를 받으면 게임 접속뿐 아니라 구매 내역과 친구 목록에도 접근하지 못할 수 있습니다.`,terms]
    ]
  };
  profiles.learning={
    overall:'구독·학습 기록·수료 조건 확인 필요',
    items:(n,terms,privacy)=>[
      ['payment','결제·구독','체험 종료 뒤 구독료가 청구될 수 있음','high',`${n}의 무료 체험이나 유료 학습권은 종료 전에 취소하지 않으면 자동 갱신될 수 있고, 강좌별 환불 조건도 다를 수 있습니다.`,`체험 종료일을 놓치거나 강의를 시작하면 환불 가능한 금액이 줄어들 수 있습니다.`,terms],
      ['privacy','개인정보','학습 성과와 이용 기록이 처리됨','high',`${n}는 수강 과목, 진도, 시험 결과, 검색, 기기 정보를 학습 기능, 분석, 추천과 서비스 개선에 활용할 수 있습니다.`,`어떤 문제를 틀렸고 얼마나 공부했는지가 계정의 학습 기록으로 남을 수 있습니다.`,privacy],
      ['content','콘텐츠 권리','강의 자료의 복제·공유가 제한됨','mid',`${n}의 영상, 문제와 자료는 개인 학습용으로만 허용될 수 있으며 녹화, 재배포, 공동 계정 이용은 제한될 수 있습니다.`,`결제한 강의라도 파일을 소유한 것은 아니어서 다른 사람에게 보내거나 공개하면 문제가 될 수 있습니다.`,terms],
      ['cancel','해지·환불','진도와 구매 경로에 따라 환불액이 달라짐','high',`환불 가능 기간과 금액은 수강 시작 여부, 학습 진도, 묶음 상품과 앱스토어 결제 여부에 따라 달라질 수 있습니다.`,`강의를 많이 들었거나 앱에서 결제했다면 사이트에서 바로 전액 환불받지 못할 수 있습니다.`,terms],
      ['other','기타 주의','수료증과 콘텐츠 제공이 영구 보장되지 않음','mid',`${n}의 강좌, 강사, 시험과 수료 기준은 변경될 수 있고 계정 종료 뒤 수료증이나 학습 기록 접근이 제한될 수 있습니다.`,`수료증이나 필요한 자료는 계정을 정리하기 전에 미리 저장해 두는 편이 안전합니다.`,terms]
    ]
  };

  const catalog=[
    ['mastodon','Mastodon','mastodon.social',['마스토돈'],'M','social','https://mastodon.social/terms','https://mastodon.social/privacy-policy'],
    ['bluesky','Bluesky','bsky.app',['블루스카이'],'BS','social','https://bsky.social/about/support/tos','https://bsky.social/about/support/privacy-policy'],
    ['tumblr','Tumblr','tumblr.com',['텀블러'],'T','social','https://www.tumblr.com/policy/en/terms-of-service','https://www.tumblr.com/privacy/en'],
    ['quora','Quora','quora.com',['쿼라'],'Q','social','https://www.quora.com/about/tos','https://www.quora.com/about/privacy'],
    ['medium','Medium','medium.com',['미디엄'],'M','social','https://policy.medium.com/medium-terms-of-service-9db0094a1e0f','https://policy.medium.com/medium-privacy-policy-f03bf92035c9'],
    ['vimeo','Vimeo','vimeo.com',['비메오'],'V','social','https://vimeo.com/terms','https://vimeo.com/privacy'],
    ['flickr','Flickr','flickr.com',['플리커'],'F','social','https://www.flickr.com/help/terms','https://www.flickr.com/help/privacy'],
    ['weverse','Weverse','weverse.io',['위버스'],'W','social','https://weverse.io/policies/terms','https://weverse.io/policies/privacy'],
    ['band','NAVER BAND','band.us',['네이버 밴드','밴드'],'B','social','https://band.us/policy/terms','https://band.us/policy/privacy'],
    ['kakaostory','카카오스토리','story.kakao.com',['카스','kakao story'],'KS','social','https://www.kakao.com/policy/terms?lang=ko','https://www.kakao.com/policy/privacy?lang=ko'],
    ['signal','Signal','signal.org',['시그널'],'S','social','https://signal.org/legal/','https://signal.org/legal/'],
    ['nextdoor','Nextdoor','nextdoor.com',['넥스트도어'],'N','social','https://help.nextdoor.com/s/article/Terms-of-Service','https://help.nextdoor.com/s/article/Privacy-Policy'],
    ['clubhouse','Clubhouse','clubhouse.com',['클럽하우스'],'CH','social','https://www.clubhouse.com/terms','https://www.clubhouse.com/privacy'],
    ['behance','Behance','behance.net',['비핸스'],'Be','social','https://www.adobe.com/legal/terms.html','https://www.adobe.com/privacy/policy.html'],
    ['deviantart','DeviantArt','deviantart.com',['디비언트아트'],'DA','social','https://www.deviantart.com/about/policy/service','https://www.deviantart.com/about/policy/privacy'],

    ['hulu','Hulu','hulu.com',['훌루'],'H','stream','https://www.hulu.com/terms','https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/'],
    ['max','Max','max.com',['맥스','hbo max'],'M','stream','https://www.max.com/terms-of-use','https://www.warnermediaprivacy.com/policycenter/b2c/'],
    ['paramountplus','Paramount+','paramountplus.com',['파라마운트플러스'],'P+','stream','https://www.paramountplus.com/legal/terms-of-use/','https://privacy.paramount.com/policy'],
    ['peacock','Peacock','peacocktv.com',['피콕'],'P','stream','https://www.peacocktv.com/terms','https://www.nbcuniversal.com/privacy'],
    ['crunchyroll','Crunchyroll','crunchyroll.com',['크런치롤'],'CR','stream','https://www.crunchyroll.com/tos','https://www.crunchyroll.com/privacy'],
    ['viki','Rakuten Viki','viki.com',['비키'],'V','stream','https://www.viki.com/terms_of_use','https://www.viki.com/privacy'],
    ['deezer','Deezer','deezer.com',['디저'],'D','stream','https://www.deezer.com/legal/cgu','https://www.deezer.com/legal/personal-datas'],
    ['tidal','TIDAL','tidal.com',['타이달'],'T','stream','https://tidal.com/terms','https://tidal.com/privacy'],
    ['amazonmusic','Amazon Music','music.amazon.com',['아마존 뮤직'],'AM','stream','https://www.amazon.com/gp/help/customer/display.html?nodeId=201380010','https://www.amazon.com/privacy'],
    ['audible','Audible','audible.com',['오더블'],'Au','stream','https://www.audible.com/legal/conditions-of-use','https://www.audible.com/legal/privacy-notice'],
    ['bugs','벅스','bugs.co.kr',['bugs'],'B','stream','https://music.bugs.co.kr/rules/use','https://music.bugs.co.kr/rules/privacy'],
    ['genie','지니뮤직','genie.co.kr',['genie music','지니'],'G','stream','https://www.genie.co.kr/guide/userAgreement','https://www.genie.co.kr/guide/privacy'],
    ['flo','FLO','music-flo.com',['플로'],'F','stream','https://www.music-flo.com/policy/terms','https://www.music-flo.com/policy/privacy'],
    ['webtoon','WEBTOON','webtoons.com',['네이버웹툰','웹툰'],'WT','stream','https://www.webtoons.com/en/terms','https://www.webtoons.com/en/terms/privacyPolicy'],
    ['kakaopage','카카오페이지','page.kakao.com',['카페이지'],'KP','stream','https://policy.kakao.com/terms?type=service','https://www.kakao.com/policy/privacy?lang=ko'],

    ['amazon','Amazon','amazon.com',['아마존'],'A','commerce','https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM','https://www.amazon.com/privacy'],
    ['ebay','eBay','ebay.com',['이베이'],'eB','commerce','https://www.ebay.com/help/policies/member-behaviour-policies/user-agreement','https://www.ebay.com/help/policies/member-behaviour-policies/user-privacy-notice-privacy-policy'],
    ['etsy','Etsy','etsy.com',['엣시'],'E','commerce','https://www.etsy.com/legal/terms-of-use/','https://www.etsy.com/legal/privacy/'],
    ['walmart','Walmart','walmart.com',['월마트'],'W','commerce','https://www.walmart.com/help/article/walmart-com-terms-of-use/3b75080af40340d6bbd596f116fae5a0','https://corporate.walmart.com/privacy-security/walmart-privacy-notice'],
    ['target','Target','target.com',['타겟'],'T','commerce','https://www.target.com/c/terms-conditions/-/N-4sr7l','https://www.target.com/c/target-privacy-policy/-/N-4sr7p'],
    ['rakuten','Rakuten','rakuten.com',['라쿠텐'],'R','commerce','https://www.rakuten.com/help/article/terms-conditions-360002101688','https://www.rakuten.com/help/article/privacy-policy-360002101608'],
    ['qoo10','Qoo10','qoo10.com',['큐텐'],'Q','commerce','https://www.qoo10.com/gmkt.inc/Company/UserAgreement.aspx','https://www.qoo10.com/gmkt.inc/Company/PrivacyPolicy.aspx'],
    ['mercadolibre','Mercado Libre','mercadolibre.com',['메르카도 리브레'],'ML','commerce','https://www.mercadolibre.com/legal/terms-and-conditions','https://www.mercadolibre.com/legal/privacy'],
    ['poshmark','Poshmark','poshmark.com',['포시마크'],'P','commerce','https://poshmark.com/terms','https://poshmark.com/privacy'],
    ['depop','Depop','depop.com',['디팝'],'D','commerce','https://depophelp.zendesk.com/hc/en-gb/articles/360001773148-Terms-of-Service','https://depophelp.zendesk.com/hc/en-gb/articles/360001792007-Privacy-Policy'],
    ['stockx','StockX','stockx.com',['스탁엑스'],'SX','commerce','https://stockx.com/terms','https://stockx.com/privacy'],
    ['kream','KREAM','kream.co.kr',['크림'],'K','commerce','https://kream.co.kr/agreement','https://kream.co.kr/privacy'],
    ['navershopping','네이버쇼핑','shopping.naver.com',['naver shopping'],'NS','commerce','https://policy.naver.com/rules/service.html','https://policy.naver.com/policy/privacy.html'],
    ['kurly','마켓컬리','kurly.com',['컬리','market kurly'],'K','commerce','https://www.kurly.com/introduce/terms','https://www.kurly.com/introduce/privacy'],
    ['lotteon','롯데ON','lotteon.com',['롯데온'],'LO','commerce','https://www.lotteon.com/p/display/terms/terms','https://www.lotteon.com/p/display/terms/privacy'],
    ['homeplus','홈플러스','homeplus.co.kr',['homeplus'],'H','commerce','https://front.homeplus.co.kr/terms','https://front.homeplus.co.kr/privacy'],
    ['ikea','IKEA','ikea.com',['이케아'],'I','commerce','https://www.ikea.com/us/en/customer-service/terms-conditions/','https://www.ikea.com/us/en/customer-service/privacy-policy/'],
    ['sephora','Sephora','sephora.com',['세포라'],'S','commerce','https://www.sephora.com/beauty/terms-of-use','https://www.sephora.com/beauty/privacy-policy'],
    ['oliveyoung','올리브영','oliveyoung.co.kr',['cj 올리브영'],'OY','commerce','https://www.oliveyoung.co.kr/store/company/terms.do','https://www.oliveyoung.co.kr/store/company/privacy.do'],
    ['daiso','다이소몰','daisomall.co.kr',['다이소','daiso mall'],'D','commerce','https://www.daisomall.co.kr/terms/use','https://www.daisomall.co.kr/terms/privacy'],

    ['github','GitHub','github.com',['깃허브'],'GH','productivity','https://docs.github.com/site-policy/github-terms/github-terms-of-service','https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement'],
    ['gitlab','GitLab','gitlab.com',['깃랩'],'GL','productivity','https://about.gitlab.com/terms/','https://about.gitlab.com/privacy/'],
    ['atlassian','Atlassian','atlassian.com',['아틀라시안'],'At','productivity','https://www.atlassian.com/legal/cloud-terms-of-service','https://www.atlassian.com/legal/privacy-policy'],
    ['trello','Trello','trello.com',['트렐로'],'Tr','productivity','https://www.atlassian.com/legal/cloud-terms-of-service','https://www.atlassian.com/legal/privacy-policy'],
    ['asana','Asana','asana.com',['아사나'],'As','productivity','https://asana.com/terms','https://asana.com/terms#privacy-policy'],
    ['clickup','ClickUp','clickup.com',['클릭업'],'CU','productivity','https://clickup.com/terms','https://clickup.com/privacy'],
    ['monday','monday.com','monday.com',['먼데이닷컴'],'M','productivity','https://monday.com/l/terms-of-service/','https://monday.com/l/privacy/privacy-policy/'],
    ['figma','Figma','figma.com',['피그마'],'F','productivity','https://www.figma.com/legal/tos/','https://www.figma.com/legal/privacy/'],
    ['miro','Miro','miro.com',['미로'],'M','productivity','https://miro.com/legal/terms-of-service/','https://miro.com/legal/privacy-policy/'],
    ['evernote','Evernote','evernote.com',['에버노트'],'E','productivity','https://evernote.com/legal/terms-of-service','https://evernote.com/privacy/policy'],
    ['todoist','Todoist','todoist.com',['투두이스트'],'TD','productivity','https://doist.com/terms-of-service','https://doist.com/privacy'],
    ['box','Box','box.com',['박스'],'Bx','productivity','https://www.box.com/legal/termsofservice','https://www.box.com/legal/privacypolicy'],
    ['adobe','Adobe','adobe.com',['어도비'],'A','productivity','https://www.adobe.com/legal/terms.html','https://www.adobe.com/privacy/policy.html'],
    ['docusign','DocuSign','docusign.com',['도큐사인'],'DS','productivity','https://www.docusign.com/company/terms-and-conditions/web','https://www.docusign.com/privacy'],
    ['grammarly','Grammarly','grammarly.com',['그래머리'],'Gr','productivity','https://www.grammarly.com/terms','https://www.grammarly.com/privacy-policy'],
    ['calendly','Calendly','calendly.com',['캘린들리'],'C','productivity','https://calendly.com/legal/terms','https://calendly.com/legal/privacy-notice'],
    ['chatgpt','ChatGPT','chatgpt.com',['챗지피티','openai'],'AI','productivity','https://openai.com/policies/terms-of-use/','https://openai.com/policies/privacy-policy/'],
    ['claude','Claude','claude.ai',['클로드','anthropic'],'Cl','productivity','https://www.anthropic.com/legal/consumer-terms','https://www.anthropic.com/legal/privacy'],
    ['perplexity','Perplexity','perplexity.ai',['퍼플렉시티'],'Px','productivity','https://www.perplexity.ai/hub/legal/terms-of-service','https://www.perplexity.ai/hub/legal/privacy-policy'],
    ['gemini','Google Gemini','gemini.google.com',['제미나이','구글 제미나이'],'Ge','productivity','https://policies.google.com/terms','https://policies.google.com/privacy'],

    ['expedia','Expedia','expedia.com',['익스피디아'],'E','travel','https://www.expedia.com/lp/lg-terms','https://www.expedia.com/lp/lg-privacypolicy'],
    ['agoda','Agoda','agoda.com',['아고다'],'A','travel','https://www.agoda.com/info/termsofuse.html','https://www.agoda.com/info/privacy.html'],
    ['hotelscom','Hotels.com','hotels.com',['호텔스닷컴'],'H','travel','https://www.hotels.com/lp/b/terms-of-service','https://www.hotels.com/lp/b/privacy'],
    ['kayak','KAYAK','kayak.com',['카약'],'K','travel','https://www.kayak.com/terms-of-use','https://www.kayak.com/privacy'],
    ['skyscanner','Skyscanner','skyscanner.com',['스카이스캐너'],'S','travel','https://www.skyscanner.com/terms-of-service','https://www.skyscanner.com/privacy-policy'],
    ['tripadvisor','Tripadvisor','tripadvisor.com',['트립어드바이저'],'TA','travel','https://tripadvisor.mediaroom.com/terms-of-use','https://tripadvisor.mediaroom.com/privacy-policy'],
    ['lyft','Lyft','lyft.com',['리프트'],'L','travel','https://www.lyft.com/terms','https://www.lyft.com/privacy'],
    ['grab','Grab','grab.com',['그랩'],'G','travel','https://www.grab.com/terms-policies/terms/','https://www.grab.com/terms-policies/privacy-policy/'],
    ['bolt','Bolt','bolt.eu',['볼트'],'B','travel','https://bolt.eu/en/legal/terms-for-riders/','https://bolt.eu/en/legal/privacy-for-riders/'],
    ['turo','Turo','turo.com',['튜로'],'T','travel','https://turo.com/us/en/policies/terms','https://turo.com/us/en/policies/privacy'],
    ['klook','Klook','klook.com',['클룩'],'K','travel','https://www.klook.com/conditions/','https://www.klook.com/policy/'],
    ['myrealtrip','마이리얼트립','myrealtrip.com',['my real trip'],'MR','travel','https://www.myrealtrip.com/about/terms','https://www.myrealtrip.com/about/privacy'],
    ['yeogi','여기어때','yeogi.com',['여기 어때'],'Y','travel','https://www.yeogi.com/more/terms','https://www.yeogi.com/more/privacy'],
    ['yanolja','야놀자','yanolja.com',['yanolja'],'Y','travel','https://policy.yanolja.com/terms','https://policy.yanolja.com/privacy'],
    ['korail','코레일','letskorail.com',['korail','레츠코레일'],'KR','travel','https://www.letskorail.com/ebizcom/cs/guide/guide/guide11.do','https://www.letskorail.com/ebizcom/cs/guide/guide/guide12.do'],

    ['steam','Steam','steampowered.com',['스팀'],'St','gaming','https://store.steampowered.com/subscriber_agreement/','https://store.steampowered.com/privacy_agreement/'],
    ['epicgames','Epic Games','epicgames.com',['에픽게임즈'],'EG','gaming','https://www.epicgames.com/site/en-US/tos','https://www.epicgames.com/site/en-US/privacypolicy'],
    ['playstation','PlayStation','playstation.com',['플레이스테이션','psn'],'PS','gaming','https://www.playstation.com/legal/psn-terms-of-service/','https://www.playstation.com/legal/privacy-policy/'],
    ['xbox','Xbox','xbox.com',['엑스박스'],'XB','gaming','https://www.microsoft.com/servicesagreement','https://privacy.microsoft.com/privacystatement'],
    ['nintendo','Nintendo','nintendo.com',['닌텐도'],'N','gaming','https://www.nintendo.com/us/terms-of-use/','https://www.nintendo.com/us/privacy-policy/'],
    ['roblox','Roblox','roblox.com',['로블록스'],'R','gaming','https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use','https://en.help.roblox.com/hc/en-us/articles/115004630823-Roblox-Privacy-and-Cookie-Policy'],
    ['riotgames','Riot Games','riotgames.com',['라이엇게임즈','롤'],'RG','gaming','https://www.riotgames.com/en/terms-of-service','https://www.riotgames.com/en/privacy-notice'],
    ['battlenet','Battle.net','battle.net',['배틀넷','블리자드'],'BN','gaming','https://www.blizzard.com/legal/fba4d00f-c7e4-4883-b8b9-1b4500a402ea/blizzard-end-user-license-agreement','https://www.blizzard.com/legal/a8b9467d-1f22-4f2c-a3fc-35c511b16e7d/blizzard-entertainment-privacy-policy'],
    ['ea','Electronic Arts','ea.com',['이에이','ea games'],'EA','gaming','https://www.ea.com/legal/user-agreement','https://www.ea.com/legal/privacy-and-cookie-policy'],
    ['ubisoft','Ubisoft','ubisoft.com',['유비소프트'],'U','gaming','https://legal.ubi.com/termsofuse/en-US','https://legal.ubi.com/privacypolicy/en-US'],
    ['nexon','넥슨','nexon.com',['nexon'],'N','gaming','https://member.nexon.com/policy/stipulation.aspx','https://member.nexon.com/policy/privacy.aspx'],
    ['duolingo','Duolingo','duolingo.com',['듀오링고'],'D','learning','https://www.duolingo.com/terms','https://www.duolingo.com/privacy'],
    ['coursera','Coursera','coursera.org',['코세라'],'Co','learning','https://www.coursera.org/about/terms','https://www.coursera.org/about/privacy'],
    ['udemy','Udemy','udemy.com',['유데미'],'Ud','learning','https://www.udemy.com/terms/','https://www.udemy.com/terms/privacy/'],
    ['quizlet','Quizlet','quizlet.com',['퀴즐렛'],'Q','learning','https://quizlet.com/tos','https://quizlet.com/privacy']
  ];

  return Object.fromEntries(catalog.map(([key,name,domain,aliases,mark,profile,source,privacy])=>{
    const p=profiles[profile];
    return [key,{name,domain,aliases,mark,profile,overall:p.overall,source,items:p.items(name,source,privacy)}];
  }));
})();
