// Prepare the complete static workshop tree; publishing is a separate authenticated operation.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const target=path.resolve(process.argv[2]||path.join(root,'tmp/oficinas-design-web'));
if(target===root||root.startsWith(target+path.sep)||target.startsWith(path.join(root,'modelos')+path.sep))throw Error('Escolha uma pasta de saída separada dos fontes.');
fs.mkdirSync(target,{recursive:true});
for(const entry of fs.readdirSync(path.join(root,'modelos/design-web'),{withFileTypes:true})){
 if(!entry.isDirectory()||!/^aula-\d+$/.test(entry.name))continue;
 const source=path.join(root,'modelos/design-web',entry.name),dest=path.join(target,entry.name);
 // Teacher guides hold answers and keywords: they stay in the repository, never on the public site.
 fs.cpSync(source,dest,{recursive:true,filter:file=>path.basename(file)!=='guia-docente.html'});
 // Earlier generators keep the classroom copy under a different filename.
 if(!fs.existsSync(path.join(dest,'index.html'))){const candidate=['oficina.html','editor.html'].find(p=>fs.existsSync(path.join(source,p)));if(candidate)fs.copyFileSync(path.join(source,candidate),path.join(dest,'index.html'));}
}
// The retained home preserves the live site's links and adds only Aula 12.
fs.copyFileSync(path.join(root,'modelos/design-web/oficinas/index.html'),path.join(target,'index.html'));
if(fs.readdirSync(target,{recursive:true}).some(file=>path.basename(String(file))==='guia-docente.html'))throw Error('Guia docente não pode ir para a publicação.');
// Keep existing project linkage and hosting settings in an already linked output directory.
console.log('Oficinas preparadas em '+target+'. Publicar no projeto existente, preservando sua raiz e configuração.');
