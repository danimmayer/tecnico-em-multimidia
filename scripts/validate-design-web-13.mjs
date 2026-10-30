import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {lesson,support,workshopUrl} from './lessons/design-web-13.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const workshop=path.join(root,'modelos/design-web/aula-13');
const read=file=>fs.readFileSync(file,'utf8');
const json=value=>JSON.parse(JSON.stringify(value));
const context={window:{}};
vm.runInNewContext(read(path.join(root,'assets/course-data.js')),context);
vm.runInNewContext(read(path.join(root,'assets/course-support.js')),context);
const actualLesson=json(context.window.SENAI_COURSES['design-web'].lessons.find(item=>item.num==='13'));
assert.equal(actualLesson.num,'13'); delete actualLesson.num;
assert.deepEqual(actualLesson,json(lesson),'dados da Aula 13 fora de paridade');
assert.deepEqual(json(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['13']),json(support),'suporte da Aula 13 fora de paridade');

// Schedule: 19:00–22:10 with the 19:45–20:05 break, 45 + 45 + 45 + 35 minutes.
const clock=value=>{const [hour,minute]=value.split(':').map(Number);return hour*60+minute;};
const schedule=lesson.schedule.map(item=>item.horario.split(' - ').map(clock));
assert.deepEqual(schedule.map(([start,end])=>end-start),[45,45,45,35],'blocos precisam durar 45/45/45/35 minutos');
assert.equal(schedule[0][0],19*60);assert.equal(schedule.at(-1)[1],22*60+10);
assert.equal(schedule[1][0]-schedule[0][1],20,'intervalo de 20 minutos após o primeiro bloco');
for(let i=2;i<schedule.length;i++) assert.equal(schedule[i-1][1],schedule[i][0],'horários devem ser contínuos após o intervalo');

// Slide pacing must close each block exactly and keep the printed slide windows consistent.
const minutes=[0,0,0,0], cursor=schedule.map(([start])=>start);
for(const item of support.presentationSlides) {
  assert.ok(item.teacher.speech&&item.teacher.watch&&item.teacher.rescue,`notas incompletas: ${item.title}`);
  const [start,end]=item.time.split(' - ').map(clock), step=Number(item.teacher.steps[0].match(/^(\d+) min · /)?.[1]);
  assert.equal(end-start,step,`janela do slide difere dos minutos: ${item.title}`);
  if(item.pace==='break') { assert.equal(start,schedule[0][1]); continue; }
  assert.equal(start,cursor[item.block-1],`slide fora de sequência: ${item.title}`);
  cursor[item.block-1]=end; minutes[item.block-1]+=step;
  if(item.resource) {
    const url=new URL(item.resource.href);
    assert.equal(url.origin+url.pathname,workshopUrl,'link da Vercel incorreto');
    assert.equal(url.searchParams.get('fase'),String(item.block),'link aponta para outra parada');
  }
}
assert.deepEqual(minutes,schedule.map(([start,end])=>end-start),'slides precisam fechar os minutos de cada bloco');
assert.equal(support.presentationSlides.filter(item=>item.pace==='break').length,1);
assert.deepEqual(support.presentationSlides.filter(item=>/Estação \d/.test(item.title)).map(item=>new URL(item.resource.href).searchParams.get('estacao')),['1','2','3','4']);
assert.ok(!/simul(?:e|ar) (?:uma )?defici|venda nos olhos/i.test(JSON.stringify(lesson.schedule)),'camada pública não pode propor simulação de deficiência');
assert.match(lesson.methodology,/ninguém simula uma deficiência/);

// Workshop files: offline, self-contained, syntax-valid and consistent with the planted barriers.
const files=['index.html','oficina.css','oficina.js','LEIA-ME.txt'];
const index=read(path.join(workshop,'index.html'));
for(const phase of [1,2,3,4]) assert.match(index,new RegExp(`data-phase="${phase}"`));
assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(index),'oficina não pode depender de rede');
assert.match(index,/class="skip-link"/,'oficina de acessibilidade precisa de atalho para o conteúdo');
const js=read(path.join(workshop,'oficina.js'));
new vm.Script(js);
for(const fragment of ['MIN_FINDINGS = 5','MIN_FIXES = 3','WEIGHT_LIMIT = 1','attachShadow','localStorage','exportReport','linearRead']) assert.ok(js.includes(fragment),`oficina sem ${fragment}`);
assert.ok(!/https?:\/\/(?!www\.w3\.org\/2000\/svg)/.test(js),'oficina não pode carregar recursos externos');

// WCAG contrast formula: the planted pairs fail and the offered fixes pass.
const channel=c=>{const v=c/255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;};
const lum=hex=>{const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return 0.2126*channel(r)+0.7152*channel(g)+0.0722*channel(b);};
const ratio=(a,b)=>{const [hi,lo]=[lum(a),lum(b)].sort((x,y)=>y-x);return (hi+0.05)/(lo+0.05);};
assert.ok(ratio('#a3a3a3','#ffffff')<3,'texto de data e local precisa falhar');
assert.ok(ratio('#ffffff','#f2b705')<3,'botão original precisa falhar');
assert.ok(ratio('#6b7280','#1f2937')<4.5,'rodapé original precisa falhar');
for(const [fg,bg] of [['#3d4756','#ffffff'],['#10213a','#f2b705'],['#e5e7eb','#1f2937']]) assert.ok(ratio(fg,bg)>=4.5,`correção oferecida não passa: ${fg} sobre ${bg}`);
const css=read(path.join(workshop,'oficina.css'));
const token=name=>css.match(new RegExp(`--${name}:(#[0-9a-f]{6})`))[1];
for(const [fg,bg] of [['ink','paper'],['muted','paper'],['route','chalk'],['alert','chalk'],['ok','chalk'],['ink','signal']]) assert.ok(ratio(token(fg),token(bg))>=4.5,`a própria oficina falha em contraste: ${fg} sobre ${bg}`);

// Paradas abrem no horário do planejamento e as palavras do professor estão nas notas.
const keys=Object.fromEntries([...js.match(/const KEYS = \{([^}]+)\}/)[1].matchAll(/(\d):'([a-z]+)'/g)].map(m=>[m[1],m[2]]));
assert.deepEqual(Object.keys(keys),['2','3','4'],'uma palavra para cada parada fechada');
const notes=JSON.stringify(support);
for(const [phase,word] of Object.entries(keys)) {
  assert.match(notes,new RegExp(word.toUpperCase()),`palavra da Parada ${phase} ausente das notas`);
  const opener=support.presentationSlides.find(item=>item.block===Number(phase)&&item.pace!=='break');
  assert.match(opener.teacher.speech,new RegExp(word.toUpperCase()),`palavra da Parada ${phase} fora do primeiro slide da parada`);
}
const opens=js.match(/phase:\{2:at\((\d+), (\d+)\), 3:at\((\d+), (\d+)\), 4:at\((\d+), (\d+)\)\}/).slice(1).map(Number);
assert.deepEqual([[opens[0],opens[1]],[opens[2],opens[3]],[opens[4],opens[5]]].map(([h,m])=>h*60+m),schedule.slice(1).map(([start])=>start),'aberturas das paradas iguais ao planejamento');
for(const label of ['Missão','Estou travado','Palavra do professor','Desafio','Aquecimento']) assert.ok(js.includes(label)||js.includes(label.toLowerCase()),`oficina sem ${label}`);
const zip=path.join(workshop,'kit-aula-13.zip');
const listed=execFileSync('unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n').sort();
assert.deepEqual(listed,[...files].sort(),'ZIP deve conter exatamente os arquivos offline');
const extracted=fs.mkdtempSync(path.join(os.tmpdir(),'design-web-13-validate-'));
try {
  execFileSync('unzip',['-qq',zip,'-d',extracted]);
  for(const file of files) assert.equal(read(path.join(workshop,file)),read(path.join(extracted,file)),`ZIP fora de sincronia: ${file}`);
} finally { fs.rmSync(extracted,{recursive:true,force:true}); }

// Guias docentes ficam fora do que a turma alcança: links, kits e publicação.
for(const page of ['aula-12/index.html','aula-12/desafio.html','aula-13/index.html']) assert.ok(!/guia-docente/.test(read(path.join(root,'modelos/design-web',page))),`${page} não pode apontar para o guia docente`);
for(const kit of ['aula-12/kit-aula-12.zip','aula-13/kit-aula-13.zip']) assert.ok(!/guia-docente/.test(execFileSync('unzip',['-Z1',path.join(root,'modelos/design-web',kit)],{encoding:'utf8'})),`${kit} não pode levar o guia docente`);
const published=fs.mkdtempSync(path.join(os.tmpdir(),'design-web-deploy-'));
try {
  execFileSync('node',[path.join(root,'scripts/prepare-design-web-deploy.mjs'),published]);
  assert.ok(fs.existsSync(path.join(published,'aula-13/index.html')),'publicação sem a oficina da Aula 13');
  assert.ok(!fs.readdirSync(published,{recursive:true}).some(file=>/guia-docente/.test(String(file))),'guia docente não pode ser publicado');
} finally { fs.rmSync(published,{recursive:true,force:true}); }
for(const script of ['scripts/build-course-data.mjs','scripts/rebuild-design-web-no-code.mjs']) assert.match(read(path.join(root,script)),/\.\/lessons\/design-web-13\.mjs/,'gerador principal sem Aula 13');
assert.match(read(path.join(root,'assets/course-lesson.js')),/'12', '13'(, '14')?\]\.includes\(lesson\.num\)/,'Aula 13 precisa usar o layout e o ritmo por slide');
assert.match(read(path.join(root,'modelos/design-web/oficinas/index.html')),/href="aula-13\/"/,'página inicial das oficinas sem Aula 13');
console.log('Aula 13: paridade, 170 min com intervalo, ritmo dos slides, links Vercel, contraste, kit offline e sintaxe da Rota acessível conferidos.');
