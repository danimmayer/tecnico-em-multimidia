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
// Produção Audiovisual: only the class kit is public. The mixed example and the manifest hold the reference mix.
const audiovisual={'aula-14':['index.html','mesa.html','sons.js','buffering.html','cena.mp4','AJUDA.html','COMECE-AQUI.txt','CREDITOS.txt','Aula14-Som.zip','trilhas','telas/voz-antes.jpg','telas/voz-depois.jpg']};
for(const [lesson,files] of Object.entries(audiovisual)){
 const source=path.join(root,'modelos/producao-audiovisual',lesson),dest=path.join(target,'audiovisual',lesson);
 fs.rmSync(dest,{recursive:true,force:true});
 for(const file of files){fs.mkdirSync(path.dirname(path.join(dest,file)),{recursive:true});fs.cpSync(path.join(source,file),path.join(dest,file),{recursive:true});}
 // The repository page returns to the slides; the public page returns to the list of workshops.
 const page=path.join(dest,'index.html'),html=fs.readFileSync(page,'utf8').replace(/<a href="\.\.\/\.\.\/\.\.\/aula-kit\.html[^"]*">Voltar à aula<\/a>/,'<a href="../../">Todas as oficinas</a>');
 if(html.includes('aula-kit.html'))throw Error('Link para os slides ficou na página pública de '+lesson+'.');
 fs.writeFileSync(page,html);
}
// The retained home preserves the live site's links and adds the Produção Audiovisual section.
fs.copyFileSync(path.join(root,'modelos/design-web/oficinas/index.html'),path.join(target,'index.html'));
const published=fs.readdirSync(target,{recursive:true}).map(file=>path.basename(String(file)));
if(published.includes('guia-docente.html'))throw Error('Guia docente não pode ir para a publicação.');
if(published.some(file=>['exemplo-mixado.mp4','kit-manifest.json'].includes(file)))throw Error('Mixagem de referência não pode ir para a publicação.');
// Keep existing project linkage and hosting settings in an already linked output directory.
console.log('Oficinas de Design Web e Produção Audiovisual preparadas em '+target+'. Publicar no projeto existente, preservando sua raiz e configuração.');
