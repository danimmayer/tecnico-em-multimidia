import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-07.mjs';
import {editorHtml,renderSvg,initialParts,organizedParts} from './lessons/design-web-07-editor.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const context={window:{}};
for(const file of ['assets/course-data.js','assets/course-support.js']) vm.runInNewContext(fs.readFileSync(root+file,'utf8'),context);
const actualLesson=context.window.SENAI_COURSES['design-web'].lessons.find(l=>l.num==='07');
assert.deepEqual(JSON.parse(JSON.stringify(actualLesson)),{num:'07',...lesson});
assert.deepEqual(JSON.parse(JSON.stringify(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['07'])),support);
const minutes=[0,0,0,0];
for(const s of support.presentationSlides){
  if(s.pace==='break')continue;
  assert.ok(s.teacher?.speech && s.teacher?.watch && s.teacher?.rescue, s.title+' lacks teacher support');
  for(const step of s.teacher.steps){const m=step.match(/^(\d+) min · /);assert.ok(m,'Unscheduled step: '+step);minutes[s.block-1]+=Number(m[1]);}
}
assert.deepEqual(minutes,[45,45,40,40]);
assert.equal(support.presentationSlides.filter(s=>s.pace==='break').length,1);
assert.equal(support.studentSheet,undefined);
assert.equal(support.appendDefaultClosing,false);
const publicCopy = support.presentationSlides.map(({teacher,...s})=>JSON.stringify(s)).join('\n');
assert.ok(!/bagunça|meme|\bhtml\b|\bcss\b|javascript|ficha impressa|peças impressas|professor|docente/i.test(publicCopy.replaceAll('editor.html','editor')));
for(const name of ['layout-inicial.png','layout-v1.png','layout-final.png','projeto.layout'])assert.ok(publicCopy.includes(name),name);
const html=fs.readFileSync(root+'modelos/design-web/aula-07/editor.html','utf8');
assert.equal(html,editorHtml());
assert.ok(!/<(?:script|link|img)[^>]*(?:src|href)="https?:/i.test(html),'Editor must be self-contained');
const code=html.match(/<script>([\s\S]*)<\/script>/)[1];
new vm.Script(code);
for(const [name,parts] of [['before',initialParts],['after',organizedParts]])assert.equal(fs.readFileSync(root+`modelos/design-web/aula-07/${name}.svg`,'utf8'),renderSvg(parts));
console.log('Aula 07: source parity, 170 minutes, no print/code tasks, offline editor syntax and visual assets validated.');

vm.runInNewContext(fs.readFileSync(root+'assets/course-pace.js','utf8'),context);
const pace = options => context.window.SENAI_SLIDE_PACE({lessonStart:1140,lessonEnd:1330,start:1205,end:1220,...options});
assert.match(pace({now:1100}).message,/19:00/);
assert.match(pace({now:1210}).message,/No ritmo/);
assert.match(pace({now:1190}).message,/Adiantado 15 min/);
assert.match(pace({now:1225}).message,/Atrasado 5 min/);
assert.match(pace({now:1190,start:1185,end:1205,isBreak:true}).message,/Intervalo/);
assert.match(pace({now:1330,isLast:true}).message,/Encerramento/);
assert.equal(pace({now:1330}).level,'err');
console.log('Indicador: antes da aula, no ritmo, adiantado, atrasado, intervalo e encerramento validados.');
