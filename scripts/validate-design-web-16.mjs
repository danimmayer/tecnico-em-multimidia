import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {lesson,support} from './lessons/design-web-16.mjs';
import {workshopPage} from './lessons/design-web-16-workshop.mjs';

const root=new URL('../',import.meta.url), context={window:{}};
const read=file=>fs.readFileSync(new URL(file,root),'utf8');
const plain=x=>JSON.parse(JSON.stringify(x));
for(const file of ['assets/course-data.js','assets/course-support.js'])vm.runInNewContext(read(file),context);
const actual=plain(context.window.SENAI_COURSES['design-web'].lessons.find(x=>x.num==='16'));
for(const [key,value] of Object.entries(lesson))assert.deepEqual(actual[key],value);
assert.deepEqual(plain(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['16']),support);
const active=[0,0,0,0];
for(const slide of support.presentationSlides){
  assert(slide.prompt&&slide.teacher.rescue);
  if(!['break','extra'].includes(slide.pace))active[slide.block-1]+=Number(slide.teacher.steps[0].match(/^(\d+) min/)[1]);
}
assert.deepEqual(active,[45,40,45,30],'Conteúdo e evidências devem terminar às 22h.');
assert.equal(support.appendDefaultClosing,false);
assert.equal(support.presentationSlides.filter(s=>s.pace==='break').length,1);
assert.equal(support.presentationSlides.find(s=>s.pace==='break').teacher.steps[0].match(/^\d+/)[0],'20');
for(const file of ['modelos/design-web/aula-16/index.html','modelos/design-web/aula-16/slides.html']){
  const html=read(file);
  if(file.endsWith('index.html'))assert.equal(html,workshopPage(),'Regenerar oficina a partir da fonte.');
  assert(!/(?:src|href)="https?:/.test(html),'Material offline não deve depender da rede.');
  for(const script of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(script[1],{filename:file});
}
assert.equal((workshopPage().match(/<section data-step=/g)||[]).length,6);
assert(read('assets/course-lesson.js').includes('window.renderDesignWeb16'));
for(const file of ['assets/design-web-16.js','assets/course-lesson.js'])new vm.Script(read(file),{filename:file});
console.log('Aula 16: paridade, scripts offline e 160 min + 20 de intervalo validados.');
