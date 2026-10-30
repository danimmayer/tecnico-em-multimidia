import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {lesson,support,workshopUrl} from './lessons/design-web-14.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const workshop=path.join(root,'modelos/design-web/aula-14');
const read=file=>fs.readFileSync(file,'utf8');
const json=value=>JSON.parse(JSON.stringify(value));
const context={window:{}};
vm.runInNewContext(read(path.join(root,'assets/course-data.js')),context);
vm.runInNewContext(read(path.join(root,'assets/course-support.js')),context);
const actualLesson=json(context.window.SENAI_COURSES['design-web'].lessons.find(item=>item.num==='14'));
assert.equal(actualLesson.num,'14'); delete actualLesson.num;
assert.deepEqual(actualLesson,json(lesson),'dados da Aula 14 fora de paridade');
assert.deepEqual(json(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['14']),json(support),'suporte da Aula 14 fora de paridade');

// Planejamento original preservado: objetivos, capacidade técnica e socioemocional.
assert.deepEqual(lesson.objectives,['Desenvolvimento do Projeto: briefing, pesquisa, tendência.','Pesquisa: tipos, métodos.']);
assert.match(lesson.technical[0],/propriedade intelectual, acessibilidade, usabilidade e sustentabilidade/);
assert.deepEqual(lesson.socioemotional,['Reconhecer a pesquisa como fonte de inovação e formação de um espírito empreendedor.']);
for(const business of ['pizzaria','estúdio de tatuagem','petshop','escola de dança']) assert.match(lesson.schedule[1].atividade,new RegExp(business),`simulação sem ${business}`);

// Horário: 19:00–22:10 com intervalo 19:45–20:05, 45 + 45 + 45 + 35 minutos.
const clock=value=>{const [hour,minute]=value.split(':').map(Number);return hour*60+minute;};
const schedule=lesson.schedule.map(item=>item.horario.split(' - ').map(clock));
assert.deepEqual(schedule.map(([start,end])=>end-start),[45,45,45,35],'blocos precisam durar 45/45/45/35 minutos');
assert.equal(schedule[0][0],19*60);assert.equal(schedule.at(-1)[1],22*60+10);
assert.equal(schedule[1][0]-schedule[0][1],20,'intervalo de 20 minutos após o primeiro bloco');
for(let i=2;i<schedule.length;i++) assert.equal(schedule[i-1][1],schedule[i][0],'horários devem ser contínuos após o intervalo');

// Ritmo dos slides fecha cada bloco; links apontam para a parada certa.
const minutes=[0,0,0,0], cursor=schedule.map(([start])=>start);
for(const item of support.presentationSlides) {
  assert.ok(item.teacher.speech&&item.teacher.watch&&item.teacher.rescue,`notas incompletas: ${item.title}`);
  const [start,end]=item.time.split(' - ').map(clock), step=Number(item.teacher.steps[0].match(/^(\d+) min · /)?.[1]);
  assert.equal(end-start,step,`janela do slide difere dos minutos: ${item.title}`);
  if(item.pace==='break') { assert.equal(start,schedule[0][1]); continue; }
  assert.equal(start,cursor[item.block-1],`slide fora de sequência: ${item.title}`);
  cursor[item.block-1]=end; minutes[item.block-1]+=step;
  assert.ok(item.resource,`slide sem link da oficina: ${item.title}`);
  const url=new URL(item.resource.href);
  assert.equal(url.origin+url.pathname,workshopUrl,'link da Vercel incorreto');
  assert.equal(url.searchParams.get('fase'),String(item.block),'link aponta para outra parada');
}
assert.deepEqual(minutes,schedule.map(([start,end])=>end-start),'slides precisam fechar os minutos de cada bloco');
assert.equal(support.presentationSlides.filter(item=>item.pace==='break').length,1);
assert.deepEqual(support.presentationSlides.filter(item=>item.block===2&&item.resource).map(item=>new URL(item.resource.href).searchParams.get('rodada')),['1','1','2','3'],'rodadas da Parada 2 nos links');
const publicText=JSON.stringify([lesson,support]);
assert.ok(!/\b(?:Canva|Figma|Kahoot|Padlet|Mentimeter|Google Forms)\b/i.test(publicText),'aula não pode depender de ferramenta com login');
assert.match(lesson.methodology,/fictícios/);

// Oficina: offline, autocontida e sintaticamente válida.
const files=['index.html','oficina.css','oficina.js','LEIA-ME.txt'];
const index=read(path.join(workshop,'index.html'));
for(const phase of [1,2,3,4]) assert.match(index,new RegExp(`data-phase="${phase}"`));
assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(index),'oficina não pode depender de rede');
assert.match(index,/class="skip-link"/,'oficina precisa de atalho para o conteúdo');
const js=read(path.join(workshop,'oficina.js'));
new vm.Script(js);
for(const fragment of ['MIN_TOPICS = 6','MIN_REFS = 4','MIN_TRENDS = 4','localStorage','exportReport','briefing-data','normalize(']) assert.ok(js.includes(fragment),`oficina sem ${fragment}`);
assert.ok(!/https?:\/\/(?!www\.w3\.org\/2000\/svg)/.test(js),'oficina não pode carregar recursos externos');

// Dados da oficina: clientes completos e lacuna real entre os concorrentes.
const data=new vm.Script(`${js.slice(js.indexOf('const f = '),js.indexOf('const CLIENT_IDS'))}; ({CLIENTS});`).runInNewContext({});
assert.deepEqual(Object.keys(data.CLIENTS),['pizzaria','tatuagem','petshop','danca']);
for(const [id,client] of Object.entries(data.CLIENTS)) {
  assert.equal(Object.keys(client.topics).length,8,`${id}: oito temas`);
  assert.equal(client.pepitas.length,3,`${id}: três pepitas`);
  assert.equal(client.rivals.length,3,`${id}: três concorrentes`);
  assert.ok(client.rivals.every(rival=>rival.f[client.gap]===false),`${id}: a lacuna precisa faltar nos três concorrentes`);
  for(const key of Object.keys(client.rivals[0].f)) if(key!==client.gap) assert.ok(client.rivals.some(rival=>rival.f[key]),`${id}: só a lacuna pode faltar em todos (${key})`);
}

// Contraste WCAG da própria oficina e das cores dos clientes com texto branco.
const channel=c=>{const v=c/255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4;};
const lum=hex=>{const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));return 0.2126*channel(r)+0.7152*channel(g)+0.0722*channel(b);};
const ratio=(a,b)=>{const [hi,lo]=[lum(a),lum(b)].sort((x,y)=>y-x);return (hi+0.05)/(lo+0.05);};
const css=read(path.join(workshop,'oficina.css'));
const token=name=>css.match(new RegExp(`--${name}:(#[0-9a-f]{6})`))[1];
for(const [fg,bg] of [['ink','paper'],['muted','paper'],['route','chalk'],['alert','chalk'],['ok','chalk'],['ink','signal']]) assert.ok(ratio(token(fg),token(bg))>=4.5,`a oficina falha em contraste: ${fg} sobre ${bg}`);
for(const client of Object.values(data.CLIENTS)) assert.ok(ratio('#ffffff',client.color)>=4.5,`cor de ${client.name} sem contraste com branco`);

// Paradas abrem no horário do planejamento e as palavras do professor estão nas notas.
const keys=Object.fromEntries([...js.match(/const KEYS = \{([^}]+)\}/)[1].matchAll(/(\d):'([a-z]+)'/g)].map(m=>[m[1],m[2]]));
assert.deepEqual(Object.keys(keys),['2','3','4'],'uma palavra para cada parada fechada');
for(const [phase,word] of Object.entries(keys)) {
  const opener=support.presentationSlides.find(item=>item.block===Number(phase)&&item.pace!=='break');
  assert.match(opener.teacher.speech,new RegExp(word.toUpperCase()),`palavra da Parada ${phase} fora do primeiro slide da parada`);
}
const opens=js.match(/phase:\{2:at\((\d+), (\d+)\), 3:at\((\d+), (\d+)\), 4:at\((\d+), (\d+)\)\}/).slice(1).map(Number);
assert.deepEqual([[opens[0],opens[1]],[opens[2],opens[3]],[opens[4],opens[5]]].map(([h,m])=>h*60+m),schedule.slice(1).map(([start])=>start),'aberturas das paradas iguais ao planejamento');
const rounds=js.match(/round:\{1:at\((\d+), (\d+)\), 2:at\((\d+), (\d+)\), 3:at\((\d+), (\d+)\)\}, call:at\((\d+), (\d+)\)/).slice(1).map(Number);
const slideStart=title=>clock(support.presentationSlides.find(item=>item.title.startsWith(title)).time.split(' - ')[0]);
assert.equal(rounds[2]*60+rounds[3],slideStart('Rodada 2'),'Rodada 2 abre com o slide');
assert.equal(rounds[4]*60+rounds[5],slideStart('Pepitas e escolha'),'Escolha abre com o slide');
assert.equal(rounds[6]*60+rounds[7],slideStart('Tendências e o telefonema'),'telefonema toca com o slide');
for(const label of ['Missão','Estou travado','Palavra do professor','Desafio','Aquecimento']) assert.ok(js.includes(label)||js.includes(label.toLowerCase()),`oficina sem ${label}`);

// Kit offline idêntico às fontes e sem material do professor.
const zip=path.join(workshop,'kit-aula-14.zip');
const listed=execFileSync('unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n').sort();
assert.deepEqual(listed,[...files].sort(),'ZIP deve conter exatamente os arquivos offline');
const extracted=fs.mkdtempSync(path.join(os.tmpdir(),'design-web-14-validate-'));
try {
  execFileSync('unzip',['-qq',zip,'-d',extracted]);
  for(const file of files) assert.equal(read(path.join(workshop,file)),read(path.join(extracted,file)),`ZIP fora de sincronia: ${file}`);
} finally { fs.rmSync(extracted,{recursive:true,force:true}); }
assert.ok(!/guia-docente/.test(index),'oficina não pode apontar para o guia docente');
const published=fs.mkdtempSync(path.join(os.tmpdir(),'design-web-deploy-'));
try {
  execFileSync('node',[path.join(root,'scripts/prepare-design-web-deploy.mjs'),published]);
  assert.ok(fs.existsSync(path.join(published,'aula-14/index.html')),'publicação sem a oficina da Aula 14');
  assert.ok(!fs.readdirSync(published,{recursive:true}).some(file=>/guia-docente/.test(String(file))),'guia docente não pode ser publicado');
} finally { fs.rmSync(published,{recursive:true,force:true}); }
for(const script of ['scripts/build-course-data.mjs','scripts/rebuild-design-web-no-code.mjs']) assert.match(read(path.join(root,script)),/\.\/lessons\/design-web-14\.mjs/,'gerador principal sem Aula 14');
assert.match(read(path.join(root,'assets/course-lesson.js')),/'13', '14'\]\.includes\(lesson\.num\)/,'Aula 14 precisa usar o layout e o ritmo por slide');
assert.match(read(path.join(root,'modelos/design-web/oficinas/index.html')),/href="aula-14\/"/,'página inicial das oficinas sem Aula 14');
console.log('Aula 14: paridade, 170 min com intervalo, ritmo dos slides, links Vercel, clientes e concorrentes, contraste, kit offline e sintaxe do Estúdio de briefing conferidos.');
