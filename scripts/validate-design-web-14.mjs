import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {lesson,support} from './lessons/design-web-14.mjs';
const root=new URL('../',import.meta.url),context={window:{}};
for(const f of ['assets/course-data.js','assets/course-support.js']) vm.runInNewContext(fs.readFileSync(new URL(f,root),'utf8'),context);
const plain=x=>JSON.parse(JSON.stringify(x));
const actual=plain(context.window.SENAI_COURSES['design-web'].lessons.find(x=>x.num==='14'));
for(const [key,value] of Object.entries(lesson))assert.deepEqual(actual[key],value);
assert.deepEqual(plain(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['14']),support);
const minutes=[0,0,0,0];
for(const slide of support.presentationSlides){assert(slide.prompt);assert(slide.teacher.rescue);if(slide.pace==='break')continue;minutes[slide.block-1]+=Number(slide.teacher.steps[0].match(/^([0-9]+) min/)[1]);}
assert.deepEqual(minutes,[45,40,45,40]);
assert.equal(minutes.reduce((a,b)=>a+b),170);
const html=fs.readFileSync(new URL('modelos/design-web/aula-14/index.html',root),'utf8');
for(const script of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
assert(!/(?:src|href)="https?:/.test(html),'A oficina deve funcionar offline.');
assert.equal((html.match(/<section data-step=/g)||[]).length,6);
console.log('Aula 14: paridade, seis missões offline, sintaxe e 170 minutos + intervalo validados.');

// The renderer and downloadable copy are part of the same classroom delivery.
for (const file of ['assets/design-web-14.js','assets/course-lesson.js'])
  new vm.Script(fs.readFileSync(new URL(file,root),'utf8'));
const zip=new URL('modelos/design-web/aula-14/kit-aula-14.zip',root);
assert.deepEqual(execFileSync('unzip',['-Z1',zip.pathname],{encoding:'utf8'}).trim().split('\n').sort(),['LEIA-ME.txt','index.html']);
for(const file of ['LEIA-ME.txt','index.html'])
  assert.equal(execFileSync('unzip',['-p',zip.pathname,file],{encoding:'utf8'}),fs.readFileSync(new URL('modelos/design-web/aula-14/'+file,root),'utf8'));
const clock=value=>{const [h,m]=value.split(':').map(Number);return h*60+m;};
assert.deepEqual(lesson.schedule.map(item=>{const [a,b]=item.horario.split(' - ').map(clock);return b-a;}),minutes);
assert.equal(support.presentationSlides.filter(item=>item.pace==='break').length,1);
assert(!/escola de dança|Pedal Leve/.test(JSON.stringify([lesson,support])+html),'Slides e oficina precisam usar o mesmo cliente.');
assert.match(fs.readFileSync(new URL('modelos/design-web/oficinas/index.html',root),'utf8'),/href="aula-14\/"[^>]*><span[^>]*>Aula 14<\/span><strong>Do pedido ao plano/);
console.log('Aula 14: renderer, horários e ZIP offline sincronizados.');
