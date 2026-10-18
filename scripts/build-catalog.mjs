import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const catalog=JSON.parse(fs.readFileSync(new URL('data/catalog.json',root),'utf8'));
const audit=JSON.parse(fs.readFileSync(new URL('data/catalog-audit.json',root),'utf8'));
if(!Object.keys(catalog).length)throw Error('Empty catalog');
for(const [key,s] of Object.entries(catalog)){
 if(!s.name||!Array.isArray(s.items))throw Error('Invalid service: '+key);
 for(const item of s.items)if(!Array.isArray(item)||typeof item[5]!=='string'||!item[6]||!item[7]?.document||!item[7]?.clause||!item[7]?.region)throw Error('Incomplete source evidence: '+key);
}
const output='window.serviceCatalog='+JSON.stringify(catalog,null,2)+';\nwindow.catalogAudit='+JSON.stringify(audit,null,2)+';\n';
const target=new URL('service-catalog.js',root);
const htmlPath=new URL('index.html',root),html=fs.readFileSync(htmlPath,'utf8');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const previews=['netflix','naver','youtube'].map(key=>{const service=catalog[key],item=service.items[0];return `<article class="preview-card"><p class="home-case-meta">${esc(service.name)} · ${esc(item[1])}</p><h3>${esc(item[2])}</h3><p>${esc(item[5])}</p><small>${esc(item[7].checkedAt||'대조일 기록 없음')} 해당 항목 대조</small><a href="${esc(item[6])}" target="_blank" rel="noopener">공식 원문 확인 ↗</a><button type="button" data-preview="${key}" disabled>${esc(service.name)} 상세 요약 보기 →</button></article>`}).join('');
const pattern=/(<div class="preview-grid">)[\s\S]*?(<\/div><\/section>)/;
if(!pattern.test(html))throw Error('Preview container not found; no files generated');
const updatedHtml=html.replace(pattern,(_,start,end)=>start+previews+end);
if(process.argv.includes('--check')){
 if(fs.readFileSync(target,'utf8')!==output)throw Error('Catalog differs from canonical data. Run node scripts/build-catalog.mjs and review the diff.');
 if(html!==updatedHtml)throw Error('Home previews differ from canonical data. Run node scripts/build-catalog.mjs.');
 console.log('Canonical catalog and home previews match deployment data');
}else{fs.writeFileSync(target,output);fs.writeFileSync(htmlPath,updatedHtml);console.log('Built '+fileURLToPath(target));}
