import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {lesson,planning,support} from './lessons/design-web-12.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const workshop=path.join(root,'modelos/design-web/aula-12');
const read=file=>fs.readFileSync(file,'utf8');
const json=value=>JSON.parse(JSON.stringify(value));
const context={window:{}};
vm.runInNewContext(read(path.join(root,'assets/course-data.js')),context);
vm.runInNewContext(read(path.join(root,'assets/course-support.js')),context);
const actualLesson=json(context.window.SENAI_COURSES['design-web'].lessons.find(item=>item.num==='12'));
assert.equal(actualLesson.num,'12'); delete actualLesson.num;
assert.deepEqual(actualLesson,json(lesson),'dados da Aula 12 fora de paridade');
assert.deepEqual(json(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['12']),json(support),'suporte da Aula 12 fora de paridade');

const parseTime=value=>{const [hour,minute]=value.split(':').map(Number);return hour*60+minute;};
const schedule=lesson.schedule.map(item=>item.horario.split(' - ').map(parseTime));
assert.deepEqual(schedule.map(([start,end])=>end-start),[25,30,30,35],'blocos precisam durar 25/30/30/35 minutos');
assert.equal(schedule[0][0],20*60+10);assert.equal(schedule.at(-1)[1],22*60+10);
for(let i=1;i<schedule.length;i++) assert.equal(schedule[i-1][1],schedule[i][0],'horários devem ser contínuos');
assert.equal(schedule.reduce((total,[start,end])=>total+end-start,0),120);
assert.equal(support.presentationSlides.length>0,true);
for(const item of support.presentationSlides) {
  assert.match(item.time,/^\d{2}:\d{2} - \d{2}:\d{2}$/,'slide sem horário válido');
  assert.equal(item.block>=1&&item.block<=4,true,'slide fora das quatro fases');
  if(item.resource) assert.equal(item.resource.href,`https://oficinas-design-web.vercel.app/aula-12/?fase=${item.block}`,'link da Vercel incorreto');
}
assert.match(support.say,/Vercel/);assert.match(support.say,/plataforma/);

const files=['index.html','desafio.html','laboratorio.css','laboratorio.js','LEIA-ME.txt'];
const index=read(path.join(workshop,'index.html'));
assert.equal(index,read(path.join(workshop,'desafio.html')),'index.html e desafio.html devem ser idênticos');
assert.match(index,/Plantão UX/);assert.match(index,/data-phase="1"/);assert.match(index,/data-phase="4"/);
assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(index),'oficina não pode depender de rede');
const js=read(path.join(workshop,'laboratorio.js'));
new Function(js); // syntax only, runtime uses DOM.
for(const fragment of ['picks.length<3','planA','shock','6 créditos','exportReport','localStorage']) assert.match(js,new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
const zip=path.join(workshop,'kit-aula-12.zip');
const listed=execFileSync('unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n').sort();
assert.deepEqual(listed,[...files].sort(),'ZIP deve conter exatamente os arquivos offline da turma');
const extracted=fs.mkdtempSync(path.join(os.tmpdir(),'design-web-12-validate-'));
try {
  execFileSync('unzip',['-qq',zip,'-d',extracted]);
  for(const file of files) assert.equal(read(path.join(workshop,file)),read(path.join(extracted,file)),`ZIP fora de sincronia: ${file}`);
} finally { fs.rmSync(extracted,{recursive:true,force:true}); }
for(const script of ['scripts/build-course-data.mjs','scripts/rebuild-design-web-no-code.mjs']) assert.match(read(path.join(root,script)),/\.\/lessons\/design-web-12\.mjs/,'gerador principal sem Aula 12');
assert.equal(fs.existsSync(path.join(root,'scripts/lessons/design-web-12-workshop')),false,'oficina roxa obsoleta ainda presente');
console.log('Aula 12: paridade, 120 min, links Vercel, kit offline, sintaxe e invariantes do Plantão UX conferidos.');
