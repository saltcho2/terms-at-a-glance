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
if(process.argv.includes('--check')){
 if(fs.readFileSync(target,'utf8')!==output)throw Error('Catalog differs from canonical data. Run node scripts/build-catalog.mjs and review the diff.');
 console.log('Canonical catalog matches deployment data');
}else{fs.writeFileSync(target,output);console.log('Built '+fileURLToPath(target));}
