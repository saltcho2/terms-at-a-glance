import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8'),html=read('index.html'),tests=[];
function test(name,fn){fn();tests.push({name,pass:true});}
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
test('Inline JavaScript 문법',()=>scripts.forEach(s=>new vm.Script(s)));
globalThis.window={};for(const f of ['review-ui.js','service-catalog.js','casebook.js'])vm.runInThisContext(read(f));
const ui=window.TermsReview,now=new Date('2026-10-17T12:00:00Z'),catalog=window.serviceCatalog;
test('실제 데이터 집계',()=>assert.deepEqual(ui.catalogStats(catalog,now),{registered:500,summaryServices:154,items:251,compared:251,pendingServices:346,recheck:0}));
test('집계 metadata does not override actual catalog',()=>{const tiny={a:{name:'a',items:[]}};assert.equal(ui.catalogStats(tiny,now).registered,1);assert.equal(ui.catalogStats(tiny,now).compared,0);});
test('Malformed catalog is error, never count 0',()=>assert.throws(()=>ui.catalogStats({a:{name:'a',items:null}},now)));
test('Recheck includes stale and unknown dates',()=>{const item=date=>['privacy','','','','','text','https://example.com',{document:'doc',clause:'clause',region:'KR',checkedAt:date}];assert.equal(ui.catalogStats({a:{name:'a',items:[item('2026. 9. 16.'),item(null),item('2026. 10. 17.')]}},now).recheck,2);});
test('Cases actual 19',()=>assert.equal(ui.caseState(window.serviceCases).caption,'최근 사례 3건 · 전체 19건'));
test('Cases 0 distinguishes valid empty from failure',()=>assert.equal(ui.caseState({}).caption,'아직 등록된 사례가 없습니다.'));
for(const n of [1,2,3,4])test('Cases count '+n,()=>{const state=ui.caseState({x:Array.from({length:n},()=>({title:'case',url:'https://example.com'}))});assert.equal(state.total,n);assert.equal(state.caption,n>3?'최근 사례 3건 · 전체 4건':`등록된 사례 ${n}건`);});
for(const value of [undefined,null,[],{x:null},{x:[{}]}])test('Missing/malformed case data does not mean zero',()=>{assert.equal(ui.caseState(value).state,'failed');assert.equal(ui.caseState(value).total,null);});
for(const purpose of ['payment','content','cancel'])test('Journey '+purpose+' reorders without hiding items',()=>{const items=catalog.discord.items;const result=ui.journey(items,purpose);assert.equal(result.length,items.length);assert.equal(result[0][0],purpose);assert.deepEqual(new Set(result),new Set(items));assert.notEqual(result,items);});
test('Initial markup contains no YouTube five-item placeholder',()=>{assert(!html.includes('youtube.com · 5개 핵심 항목'));assert(html.includes('id="serviceName"></h2>'));assert(html.includes('id="resultSection" class="hidden" hidden'));assert(!html.includes('id="catalogTotal">500'));});
test('Data URLs resolve within project path',()=>{for(const m of html.matchAll(/<script src="([^"]+)"/g))assert(new URL(m[1],'https://saltcho2.github.io/terms-at-a-glance/').pathname.startsWith('/terms-at-a-glance/'));});
test('Purpose UI does not trigger category filtering',()=>{assert(!html.includes('button.dataset.journey+\'\"]\').click()'));assert(html.includes('activeJourney=button.dataset.journey;activeFilter=\'all\''));});
for(const [name,partial] of [['missing catalog',{}],['missing search',{serviceCatalog:{a:{name:'a',items:[]}},TermsReview:ui}],['missing review',{serviceCatalog:{a:{name:'a',items:[]}},TermsSearch:{}}]])test(name+' failure isolates search and keeps previews',()=>{
 const nodes=new Map(),document={documentElement:{dataset:{}},querySelector:s=>{if(!nodes.has(s))nodes.set(s,{hidden:true,textContent:'',classList:{add(){}}});return nodes.get(s);}};
 vm.runInNewContext(scripts.at(-1),{window:{termsAssetErrors:['service-catalog.js'],...partial},document});
 assert.equal(document.documentElement.dataset.appState,'failed');assert.equal(nodes.get('#dataLoadError').hidden,false);assert.equal(nodes.get('.search-panel').hidden,true);assert.equal(nodes.get('#homeStats').hidden,true);assert(nodes.get('#loadFailureDetail').textContent.includes('service-catalog.js'));
});
test('Source scope is explicit and review dates preserved',()=>{assert(catalog.netflix.items[0][7].applicability.includes('국가별'));assert(catalog.naver.items[0][7].applicability.includes('공통'));assert.equal(catalog.naver.items[1][7].checkedAt,'2026. 10. 9. (한국 시간)');});
fs.writeFileSync(new URL('phase2-code-tests.json',import.meta.url),JSON.stringify({tests,scope:'Node code tests; deployed UI tests are recorded separately'},null,2));console.log(tests.length+' checks passed');
