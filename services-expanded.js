(() => {
  const groups = {
    digital: [
      ['grok','Grok','x.ai','그록'],['midjourney','Midjourney','midjourney.com','미드저니'],['runway','Runway','runwayml.com','런웨이'],['leonardoai','Leonardo AI','leonardo.ai','레오나르도 AI'],['stabilityai','Stability AI','stability.ai','스태빌리티 AI'],
      ['huggingface','Hugging Face','huggingface.co','허깅페이스'],['replicate','Replicate','replicate.com','레플리케이트'],['poe','Poe','poe.com','포'],['characterai','Character.AI','character.ai','캐릭터 AI'],['civitai','Civitai','civitai.com','시비타이'],
      ['cursor','Cursor','cursor.com','커서'],['windsurf','Windsurf','windsurf.com','윈드서프'],['lovable','Lovable','lovable.dev','러버블'],['boltnew','Bolt.new','bolt.new','볼트'],['v0','v0','v0.dev','브이제로'],
      ['stackoverflow','Stack Overflow','stackoverflow.com','스택오버플로'],['npm','npm','npmjs.com','엔피엠'],['pypi','PyPI','pypi.org','파이피아이'],['dockerhub','Docker Hub','hub.docker.com','도커 허브'],
      ['docker','Docker','docker.com','도커'],['jetbrains','JetBrains','jetbrains.com','젯브레인즈'],['vscode_market','Visual Studio Marketplace','marketplace.visualstudio.com','비주얼 스튜디오 마켓플레이스'],['unity','Unity','unity.com','유니티'],['unrealengine','Unreal Engine','unrealengine.com','언리얼 엔진'],
      ['sentry','Sentry','sentry.io','센트리'],['datadog','Datadog','datadoghq.com','데이터독'],['newrelic','New Relic','newrelic.com','뉴렐릭'],['grafana','Grafana Cloud','grafana.com','그라파나'],['mongodb','MongoDB Atlas','mongodb.com','몽고DB'],
      ['supabase','Supabase','supabase.com','수파베이스'],['firebase','Firebase','firebase.google.com','파이어베이스'],['rendercloud','Render','render.com','렌더'],['railway','Railway','railway.app','레일웨이'],['flyio','Fly.io','fly.io','플라이닷아이오'],
      ['heroku','Heroku','heroku.com','헤로쿠'],['linode','Linode','linode.com','리노드'],['vultr','Vultr','vultr.com','벌처'],['ovhcloud','OVHcloud','ovhcloud.com','OVH클라우드'],['namecheap','Namecheap','namecheap.com','네임칩'],
      ['godaddy','GoDaddy','godaddy.com','고대디'],['squarespace','Squarespace','squarespace.com','스퀘어스페이스'],['wix','Wix','wix.com','윅스'],['shopify','Shopify','shopify.com','쇼피파이'],['woocommerce','WooCommerce','woocommerce.com','우커머스'],
      ['bigcommerce','BigCommerce','bigcommerce.com','빅커머스'],['webflow','Webflow','webflow.com','웹플로우'],['framer','Framer','framer.com','프레이머'],['cloudinary','Cloudinary','cloudinary.com','클라우디너리'],['postman','Postman','postman.com','포스트맨']
    ],
    productivity: [
      ['dropboxsign','Dropbox Sign','sign.dropbox.com','드롭박스 사인'],['pandadoc','PandaDoc','pandadoc.com','판다독'],['notability','Notability','notability.com','노타빌리티'],['goodnotes','Goodnotes','goodnotes.com','굿노트'],['bearnotes','Bear','bear.app','베어'],
      ['craft','Craft','craft.do','크래프트'],['coda','Coda','coda.io','코다'],['roam','Roam Research','roamresearch.com','롬 리서치'],['tana','Tana','tana.inc','타나'],['anytype','Anytype','anytype.io','애니타입'],
      ['ticktick','TickTick','ticktick.com','틱틱'],['things','Things','culturedcode.com','띵스'],['sunsama','Sunsama','sunsama.com','선사마'],['motion','Motion','usemotion.com','모션'],['akiflow','Akiflow','akiflow.com','아키플로우'],
      ['fantastical','Fantastical','flexibits.com','판타스티컬'],['onepassword','1Password','1password.com','원패스워드'],['bitwarden','Bitwarden','bitwarden.com','비트워든'],['lastpass','LastPass','lastpass.com','라스트패스'],['dashlane','Dashlane','dashlane.com','대시레인'],
      ['nordpass','NordPass','nordpass.com','노드패스'],['nordvpn','NordVPN','nordvpn.com','노드VPN'],['expressvpn','ExpressVPN','expressvpn.com','익스프레스VPN'],['surfshark','Surfshark','surfshark.com','서프샤크'],['mullvad','Mullvad','mullvad.net','멀바드'],
      ['protonvpn','Proton VPN','protonvpn.com','프로톤VPN'],['zapier','Zapier','zapier.com','재피어'],['make','Make','make.com','메이크'],['ifttt','IFTTT','ifttt.com','아이에프티티티'],['n8n','n8n','n8n.io','엔에잇엔'],
      ['buffer','Buffer','buffer.com','버퍼'],['hootsuite','Hootsuite','hootsuite.com','훗스위트'],['later','Later','later.com','레이터'],['sproutsocial','Sprout Social','sproutsocial.com','스프라우트 소셜'],['klaviyo','Klaviyo','klaviyo.com','클라비요'],
      ['constantcontact','Constant Contact','constantcontact.com','콘스탄트 콘택트'],['brevo','Brevo','brevo.com','브레보'],['kit','Kit','kit.com','킷'],['ghost','Ghost','ghost.org','고스트'],['freshworks','Freshworks','freshworks.com','프레시웍스'],
      ['pipedrive','Pipedrive','pipedrive.com','파이프드라이브'],['copper','Copper','copper.com','코퍼'],['odoo','Odoo','odoo.com','오두'],['sap','SAP','sap.com','에스에이피'],['oracle','Oracle Cloud','oracle.com','오라클 클라우드'],
      ['workday','Workday','workday.com','워크데이'],['deel','Deel','deel.com','딜'],['rippling','Rippling','rippling.com','리플링'],['gusto','Gusto','gusto.com','구스토'],['canvawebsites','Canva Websites','canva.site','캔바 웹사이트']
    ],
    content: [
      ['nebula','Nebula','nebula.tv','네뷸라'],['curiositystream','Curiosity Stream','curiositystream.com','큐리오시티 스트림'],['britbox','BritBox','britbox.com','브릿박스'],['shudder','Shudder','shudder.com','셔더'],['acorntv','Acorn TV','acorn.tv','에이콘 TV'],
      ['viu','Viu','viu.com','뷰'],['iqiyi','iQIYI','iq.com','아이치이'],['wetv','WeTV','wetv.vip','위티비'],['bilibili','Bilibili','bilibili.com','빌리빌리'],['niconico','Niconico','nicovideo.jp','니코니코'],
      ['dailymotion','Dailymotion','dailymotion.com','데일리모션'],['rumble','Rumble','rumble.com','럼블'],['wattpad','Wattpad','wattpad.com','왓패드'],['ao3','Archive of Our Own','archiveofourown.org','AO3'],['goodreads','Goodreads','goodreads.com','굿리즈'],
      ['scribdbooks','Scribd','scribd.com','스크리브드'],['kobo','Kobo','kobo.com','코보'],['googleplaybooks','Google Play Books','play.google.com','구글 플레이 북스'],['applebooks','Apple Books','books.apple.com','애플 북스'],['feedly','Feedly','feedly.com','피들리'],
      ['flipboard','Flipboard','flipboard.com','플립보드'],['inoreader','Inoreader','inoreader.com','이노리더'],['newsbreak','NewsBreak','newsbreak.com','뉴스브레이크'],['groundnews','Ground News','ground.news','그라운드 뉴스'],['nytimes','The New York Times','nytimes.com','뉴욕타임스'],
      ['washingtonpost','The Washington Post','washingtonpost.com','워싱턴포스트'],['guardian','The Guardian','theguardian.com','가디언'],['financialtimes','Financial Times','ft.com','파이낸셜타임스'],['bloomberg','Bloomberg','bloomberg.com','블룸버그'],['ted','TED','ted.com','테드'],
      ['masterclass','MasterClass','masterclass.com','마스터클래스'],['brilliant','Brilliant','brilliant.org','브릴리언트'],['domestika','Domestika','domestika.org','도메스티카'],['teachable','Teachable','teachable.com','티처블'],['thinkific','Thinkific','thinkific.com','씽키픽'],
      ['podia','Podia','podia.com','포디아'],['kajabi','Kajabi','kajabi.com','카자비'],['gumroad','Gumroad','gumroad.com','검로드'],['lemonsqueezy','Lemon Squeezy','lemonsqueezy.com','레몬 스퀴지'],['kickstarter','Kickstarter','kickstarter.com','킥스타터']
    ],
    commerce: [
      ['naversmartstore','네이버 스마트스토어','smartstore.naver.com','스마트스토어'],['kakaoshopping','카카오 쇼핑','shoppinghow.kakao.com','카카오쇼핑'],['ohouse','오늘의집','ohou.se','오하우스'],['wconcept','W Concept','wconcept.co.kr','더블유컨셉'],['twentyninecm','29CM','29cm.co.kr','이십구센티미터'],
      ['eql','EQL','eqlstore.com','이큐엘'],['lfmall','LFmall','lfmall.co.kr','엘에프몰'],['lottehomeshopping','롯데홈쇼핑','lotteimall.com','롯데아이몰'],['gsshop','GS SHOP','gsshop.com','지에스샵'],['cjonstyle','CJ온스타일','cjonstyle.com','씨제이온스타일'],
      ['nsmall','NS홈쇼핑','nsmall.com','엔에스몰'],['akmall','AK몰','akmall.com','에이케이몰'],['hmall','현대Hmall','hmall.com','현대홈쇼핑'],['interparkshopping','인터파크 쇼핑','shopping.interpark.com','인터파크'],['tenbyten','텐바이텐','10x10.co.kr','10x10'],
      ['idus','아이디어스','idus.com','아이디어스'],['mercari','Mercari','mercari.com','메루카리'],['carousell','Carousell','carousell.com','캐러셀'],['offerup','OfferUp','offerup.com','오퍼업'],['vinted','Vinted','vinted.com','빈티드'],
      ['grailed','Grailed','grailed.com','그레일드'],['goat','GOAT','goat.com','고트'],['therealreal','The RealReal','therealreal.com','더리얼리얼'],['vestiaire','Vestiaire Collective','vestiairecollective.com','베스티에르'],['newegg','Newegg','newegg.com','뉴에그'],
      ['bhphoto','B&H Photo','bhphotovideo.com','비앤에이치'],['microcenter','Micro Center','microcenter.com','마이크로센터'],['lowes','Lowe’s','lowes.com','로우스'],['acehardware','Ace Hardware','acehardware.com','에이스 하드웨어'],['walgreens','Walgreens','walgreens.com','월그린'],
      ['cvs','CVS','cvs.com','씨브이에스'],['boots','Boots','boots.com','부츠'],['zalora','Zalora','zalora.com','잘로라'],['lazada','Lazada','lazada.com','라자다'],['shopee','Shopee','shopee.com','쇼피'],
      ['jd','JD.com','jd.com','징둥'],['tmall','Tmall','tmall.com','티몰'],['taobao','Taobao','taobao.com','타오바오'],['pinduoduo','Pinduoduo','pinduoduo.com','핀둬둬'],['chewy','Chewy','chewy.com','츄이'],
      ['petco','Petco','petco.com','펫코'],['redbubble','Redbubble','redbubble.com','레드버블'],['society6','Society6','society6.com','소사이어티6'],['threadless','Threadless','threadless.com','스레드리스'],['zazzle','Zazzle','zazzle.com','재즐']
    ],
    finance: [
      ['stripe','Stripe','stripe.com','스트라이프'],['square','Square','squareup.com','스퀘어'],['adyen','Adyen','adyen.com','아디옌'],['klarna','Klarna','klarna.com','클라르나'],['afterpay','Afterpay','afterpay.com','애프터페이'],
      ['affirm','Affirm','affirm.com','어펌'],['remitly','Remitly','remitly.com','레미틀리'],['westernunion','Western Union','westernunion.com','웨스턴유니온'],['moneygram','MoneyGram','moneygram.com','머니그램'],['skrill','Skrill','skrill.com','스크릴'],
      ['neteller','Neteller','neteller.com','네텔러'],['payoneer','Payoneer','payoneer.com','페이오니아'],['kakaopay','카카오페이','kakaopay.com','Kakao Pay'],['naverpay','네이버페이','pay.naver.com','Naver Pay'],['toss','토스','toss.im','Toss'],
      ['samsungpay','Samsung Wallet','samsungwallet.com','삼성월렛'],['googlepay','Google Pay','pay.google.com','구글페이'],['applepay','Apple Pay','apple.com','애플페이'],['sofi','SoFi','sofi.com','소파이'],['wealthfront','Wealthfront','wealthfront.com','웰스프론트']
    ],
    lifestyle: [
      ['alltrails','AllTrails','alltrails.com','올트레일스'],['komoot','Komoot','komoot.com','코무트'],['wikiloc','Wikiloc','wikiloc.com','위키록'],['classpass','ClassPass','classpass.com','클래스패스'],['headspace','Headspace','headspace.com','헤드스페이스'],
      ['betterhelp','BetterHelp','betterhelp.com','베터헬프'],['noom','Noom','noom.com','눔'],['flohealth','Flo','flo.health','플로 건강'],['sleepcycle','Sleep Cycle','sleepcycle.com','슬립사이클'],['garminconnect','Garmin Connect','connect.garmin.com','가민 커넥트'],
      ['peloton','Peloton','onepeloton.com','펠로톤'],['nikeclub','Nike Run Club','nike.com','나이키 런 클럽'],['adidasrunning','adidas Running','adidas.com','아디다스 러닝'],['lululemon','lululemon','lululemon.com','룰루레몬'],['choiceprivileges','Choice Privileges','choicehotels.com','초이스 프리빌리지'],
      ['hilton','Hilton Honors','hilton.com','힐튼'],['marriott','Marriott Bonvoy','marriott.com','메리어트'],['hyatt','World of Hyatt','hyatt.com','하얏트'],['ihg','IHG One Rewards','ihg.com','IHG'],['accor','ALL Accor','all.accor.com','아코르'],
      ['airasia','AirAsia','airasia.com','에어아시아'],['ryanair','Ryanair','ryanair.com','라이언에어'],['easyjet','easyJet','easyjet.com','이지젯'],['emirates','Emirates','emirates.com','에미레이트'],['qatarairways','Qatar Airways','qatarairways.com','카타르항공']
    ]
  };

  const quotas = { digital: 44, productivity: 40, content: 35, commerce: 35, finance: 20, lifestyle: 25 };
  const selected = Object.entries(groups).flatMap(([category, rows]) => rows.slice(0, quotas[category]).map(row => ({ category, row })));
  const categoryOther = {
    digital: '계정 제한, 저장 용량, 외부 연동과 서비스 종료 시 데이터 이전 방법을 확인하세요.',
    productivity: '팀 권한, 공유 링크, 외부 앱 연동과 관리자 접근 범위를 확인하세요.',
    content: '연령·지역 제한, 추천 기준과 콘텐츠 제공 중단 가능성을 확인하세요.',
    commerce: '판매자 책임, 배송·통관 비용과 분쟁 처리 창구를 확인하세요.',
    finance: '수수료, 환율, 거래 한도와 계정 제한 시 이의 제기 절차를 확인하세요.',
    lifestyle: '위치·건강 정보의 처리 범위와 국가별 서비스 조건을 확인하세요.'
  };

  window.expandedServices = Object.fromEntries(selected.map(({ category, row }) => {
    const [key, name, domain, alias] = row;
    const source = `https://${domain}`;
    return [key, {
      name,
      domain,
      aliases: [alias].filter(Boolean),
      mark: name.replace(/[^A-Za-z0-9가-힣]/g, '').slice(0, 2).toUpperCase(),
      overall: '상세 약관 검수 전',
      preliminary: true,
      reviewStatus: '기본 정보 등록 · 상세 약관 검수 전',
      sourceLabel: '공식 사이트에서 약관 확인',
      source,
      items: [
        ['payment','결제·구독','결제와 자동 갱신 조건 확인','mid',`${name}의 결제 주기, 무료 체험, 자동 갱신과 추가 비용은 요금제와 가입 경로에 따라 달라질 수 있습니다.`,`${name}에 가입하기 전에 다음 결제일과 자동 갱신 여부를 공식 결제 화면에서 확인하세요.`,source],
        ['privacy','개인정보','수집·활용 범위 확인','high',`${name}가 처리하는 계정·기기·활동 정보와 맞춤 추천·광고, 제3자 제공 여부를 확인해야 합니다.`,`${name} 가입 전에 필수 수집 정보와 선택 동의, 개인정보 설정 위치를 확인하세요.`,source],
        ['content','콘텐츠 권리','게시물과 파일의 이용 권한 확인','mid',`${name}에 올린 글·사진·영상·파일의 공개 범위와 서비스 운영에 필요한 이용 권한을 확인해야 합니다.`,`${name}에 공개되면 곤란한 정보나 원본 파일을 올리기 전에 공유 범위부터 확인하세요.`,source],
        ['cancel','해지·환불','해지와 데이터 삭제 절차 확인','high',`${name}의 구독 해지, 계정 삭제, 환불 가능 기간과 삭제 뒤 보관되는 정보가 서로 다를 수 있습니다.`,`${name}를 그만둘 때 결제 해지와 계정 삭제를 각각 해야 하는지 확인하세요.`,source],
        ['other','기타 주의','서비스별 예외 조건 확인','mid',categoryOther[category],`${name}의 국가·연령·기기별 제한과 고객지원·이의 제기 방법을 공식 사이트에서 확인하세요.`,source]
      ]
    }];
  }));

  window.expandedServices.naver = {
    name: '네이버',
    domain: 'naver.com',
    aliases: ['NAVER', '네이버 검색', '네이버 포털'],
    mark: 'N',
    overall: '개인정보·게시물·계정 해지 확인 필요',
    reviewStatus: '공식 문서 요약 · 2026. 10. 7. 점검',
    source: 'https://policy.naver.com/policy/service.html',
    items: [
      ['payment','결제·구독','유료 서비스는 별도 결제 조건 적용','mid','네이버의 유료 서비스와 포인트는 각 서비스의 별도 이용약관과 결제·환불 기준이 함께 적용될 수 있습니다.','네이버 안에서 유료 서비스를 이용할 때는 결제 직전에 자동 갱신 여부와 환불 기준을 따로 확인해야 합니다.','https://policy.naver.com/policy/service.html'],
      ['privacy','개인정보','검색·접속·위치정보 처리 범위 확인','high','서비스 이용 과정에서 계정·기기·접속 기록과 서비스에 따라 위치정보가 처리될 수 있으며 자세한 내용은 개인정보처리방침에서 정합니다.','네이버를 이용하면 로그인 정보뿐 아니라 접속 기록과 이용한 기능에 따른 정보도 처리될 수 있습니다.','https://policy.naver.com/policy/privacy.html'],
      ['content','콘텐츠 권리','게시물 공개 범위와 삭제 기준 확인','high','이용자가 올린 게시물은 설정한 공개 범위에 따라 노출되며 약관·운영정책이나 법령을 위반하면 비공개 또는 삭제될 수 있습니다.','블로그·카페 등에 올린 글과 사진은 공개 설정에 따라 다른 사람이 볼 수 있고 운영정책 위반 판단을 받으면 내려갈 수 있습니다.','https://policy.naver.com/policy/service.html'],
      ['cancel','해지·환불','탈퇴 뒤 데이터 복구가 어려울 수 있음','high','이용계약을 해지하면 법령이나 개인정보처리방침에 따라 보관해야 하는 정보를 제외한 계정 데이터가 삭제되고 복구가 어려울 수 있습니다.','네이버 탈퇴 전에 메일·게시물·파일 등 필요한 자료를 먼저 내려받아야 합니다.','https://policy.naver.com/policy/service.html'],
      ['other','기타 주의','약관 위반 시 서비스 이용 제한 가능','mid','관련 법령과 약관·운영정책을 위반하면 게시물 제한이나 서비스 이용 제한이 적용될 수 있으며 중요한 변경은 정해진 방식으로 안내됩니다.','운영정책 위반 판단을 받으면 일부 기능이나 계정 이용이 제한될 수 있으니 이의 제기 절차도 확인해야 합니다.','https://policy.naver.com/policy/service.html']
    ]
  };

  window.expandedServiceCount = selected.length + 1;
})();
