import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {lesson,support} from './lessons/design-web-14.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.join(root,'modelos/design-web/aula-14');
const assets=['index.html','LEIA-ME.txt'];
const read=file=>fs.readFileSync(file,'utf8');

function updateGlobal(file, global, mutate) {
  const source=read(file);
  const context={window:{}};
  vm.runInNewContext(source,context,{filename:file});
  const value=context.window[global];
  mutate(value);
  const marker=`window.${global}`;
  const start=source.indexOf(marker);
  if(start<0) throw new Error(`Não encontrei ${marker} em ${file}`);
  fs.writeFileSync(file,`${source.slice(0,start)}${marker} = ${JSON.stringify(value,null,2)};\n`);
}

updateGlobal(path.join(root,'assets/course-data.js'),'SENAI_COURSES',data=>{
  const current=data['design-web']?.lessons?.find(item=>item.num==='14');
  if(!current) throw new Error('Aula 14 de Design Web não encontrada nos dados do curso.');
  Object.assign(current,lesson);
});
updateGlobal(path.join(root,'assets/course-support.js'),'SENAI_TEACHING_SUPPORT',data=>{
  if(!data['design-web']?.lessons) throw new Error('Suporte de Design Web não encontrado.');
  data['design-web'].lessons['14']=support;
});

for(const asset of assets) {
  if(!fs.existsSync(path.join(output,asset))) throw new Error(`Arquivo da oficina ausente: ${asset}`);
}

// Fixed timestamps keep the offline kit byte-stable between builds.
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'design-web-14-'));
try {
  for(const asset of assets) {
    const destination=path.join(tmp,asset);
    fs.copyFileSync(path.join(output,asset),destination);
    fs.utimesSync(destination,new Date('2026-10-30T19:00:00Z'),new Date('2026-10-30T19:00:00Z'));
  }
  fs.rmSync(path.join(output,'kit-aula-14.zip'),{force:true});
  execFileSync('zip',['-X','-q',path.join(output,'kit-aula-14.zip'),...assets],{cwd:tmp});
} finally {
  fs.rmSync(tmp,{recursive:true,force:true});
}
console.log('Aula 14 atualizada: Do pedido ao plano em seis etapas, dados da plataforma e kit offline sincronizados.');
