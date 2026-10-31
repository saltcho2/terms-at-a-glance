import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8'),html=read('index.html'),context={window:{}};
vm.createContext(context);vm.runInContext(read('review-ui.js'),context);
const escapeLine=html.split('\n').find(s=>s.includes('const escapeHtml='));
vm.runInContext(escapeLine+"\nconst labels={mid:'추가로 알아둘 조건',high:'가입 전에 확인할 조건'};",context);
for(const [start,end]of [['function actionFor(','function sourceInfo('],['function sourceInfo(','function evidencePanel('],['function evidencePanel(','function reviewDetails('],['function reviewDetails(','let reportContextName'],['function renderTermRow(','function render(){']])vm.runInContext(html.slice(html.indexOf(start),html.indexOf(end)),context);
const catalog=JSON.parse(read('data/catalog.json'));let rows=0;
assert(!html.includes('id="decisionGuide"'));assert(!html.includes('function renderDecisionGuide('));
for(const service of Object.values(catalog))for(const [index,item]of service.items.entries()){
 const row=context.renderTermRow(service,item,index);
 assert.equal((row.match(/class="term-row"/g)||[]).length,1);
 assert.equal((row.match(/class="term-copy"/g)||[]).length,1);
 assert.equal((row.match(/<details\b/g)||[]).length,1);
 assert(!/<details[^>]*\bopen\b/.test(row));
 assert(!row.includes('undefined'));assert(row.includes('<h3>'));assert(row.includes('href="'));
 rows++;
}
const hostile=['privacy','개인정보','<script>alert(1)</script>','high','','<img src=x onerror=alert(1)>','https://example.com',{document:'문서',clause:'조항',region:'KR',action:'<img src=x onerror=alert(2)>'}];
const rendered=context.renderTermRow({name:'test'},hostile,0);assert(!rendered.includes('<script>'));assert(!rendered.includes('<img'));assert(rendered.includes('&lt;img'));
console.log(`${rows} terms rendered once each; native disclosures closed; untrusted text escaped`);
