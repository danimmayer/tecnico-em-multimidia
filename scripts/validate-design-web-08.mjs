import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-08.mjs';
import {editorHtml, illustrations, checks, pageStart, pageExample, pageFinalExample, postExample} from './lessons/design-web-08-editor.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const context={window:{}};
for(const file of ['assets/course-data.js','assets/course-support.js']) vm.runInNewContext(fs.readFileSync(root+file,'utf8'),context);
const actualLesson=context.window.SENAI_COURSES['design-web'].lessons.find(l=>l.num==='08');
assert.deepEqual(JSON.parse(JSON.stringify(actualLesson)),{num:'08',...lesson});
assert.deepEqual(JSON.parse(JSON.stringify(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['08'])),JSON.parse(JSON.stringify(support)));
const minutes=[0,0,0,0];
for(const s of support.presentationSlides){
  if(s.pace==='break')continue;
  assert.ok(s.teacher?.speech && s.teacher?.watch && s.teacher?.rescue, s.title+' lacks teacher support');
  for(const step of s.teacher.steps){const m=step.match(/^(\d+) min · /);assert.ok(m,'Unscheduled step: '+step);minutes[s.block-1]+=Number(m[1]);}
}
assert.deepEqual(minutes,[45,45,40,40]);
assert.deepEqual(lesson.schedule.map(s=>s.horario),['19:00 - 19:45','20:05 - 20:50','20:50 - 21:30','21:30 - 22:10']);
assert.equal(support.presentationSlides.filter(s=>s.pace==='break').length,1);
assert.equal(support.studentSheet,undefined);
assert.equal(support.appendDefaultClosing,false);
const publicCopy = support.presentationSlides.map(({teacher,...s})=>JSON.stringify(s)).join('\n');
assert.ok(!/bagunça|meme|\bhtml\b|\bcss\b|javascript|código|programa[çr]|ficha|impress|professor|docente|aula \d|aula anterior/i.test(publicCopy.replaceAll('oficina.html','oficina')),'Public slides must stay student-facing, code-free and self-contained');
assert.ok(!/—/.test(JSON.stringify({lesson,support})),'No em dash in teaching copy');
for(const name of ['pagina-v1.png','pagina-final.png','post-final.png','projeto.grade'])assert.ok(publicCopy.includes(name),name);
// Answers to the counting games stay in the private notes only.
for(const s of support.presentationSlides.filter(s=>/Desafio rápido|Pense rápido|Pedido do cliente/.test(s.promptLabel||''))){
  assert.ok(/\d colunas/.test(s.teacher.steps.join(' ')), s.title+' needs the answer in the notes');
}
const dir=root+'modelos/design-web/aula-08/';
const html=fs.readFileSync(dir+'oficina.html','utf8');
assert.equal(html,editorHtml());
assert.ok(!/<(?:script|link|img)[^>]*(?:src|href)="https?:/i.test(html),'Oficina must be self-contained');
new vm.Script(html.match(/<script>([\s\S]*)<\/script>/)[1]);
const drawings=illustrations();
for(const [name,svg] of Object.entries(drawings))assert.equal(fs.readFileSync(dir+name+'.svg','utf8'),svg,name);
for(const s of support.presentationSlides.filter(s=>s.visual)){
  const names=[s.visual].flat();
  assert.equal(s.visualAlt.length,names.length,s.title);
  for(const name of names)assert.ok(drawings[name],'Missing illustration '+name);
}
const allOk=(fmt,parts)=>checks(fmt,parts).every(c=>c.ok);
assert.ok(allOk('page',pageExample)&&allOk('page',pageFinalExample)&&allOk('post',postExample),'Examples must pass the oficina checks');
assert.ok(!allOk('page',pageStart),'Starting page must need work');
console.log('Aula 08: source parity, 170 minutes, answers only in notes, no print/code tasks, offline oficina and illustrations validated.');
