import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson,support,releaseCodes} from './lessons/design-web-12.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=p=>fs.readFileSync(root+p,'utf8');
const context={window:{}};
vm.runInNewContext(read('assets/course-data.js'),context);vm.runInNewContext(read('assets/course-support.js'),context);
const actual=context.window.SENAI_COURSES['design-web'].lessons.find(l=>l.num==='12');
for(const key of Object.keys(lesson))assert.deepEqual(JSON.parse(JSON.stringify(actual[key])),lesson[key],key+': dados desatualizados');
assert.deepEqual(JSON.parse(JSON.stringify(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['12'])),support);
const minutes=[0,0,0,0];for(const slide of support.presentationSlides){if(slide.pace==='break')continue;const m=Number(slide.teacher.steps[0].match(/^(\d+) min/)[1]);minutes[slide.block-1]+=m;}
assert.deepEqual(minutes,[45,55,40,30]);assert.equal(support.presentationSlides.filter(s=>s.pace==='break').length,1);
const publicText=JSON.stringify(support.presentationSlides.map(({teacher,...rest})=>rest));for(const code of releaseCodes)assert.ok(!publicText.includes(code),'chave na projeção');
assert.equal(support.presentationSlides.filter(s=>releaseCodes.some(c=>JSON.stringify(s.teacher).includes(c))).length,5);
const html=read('modelos/design-web/aula-12/index.html');for(const code of releaseCodes)assert.ok(!html.includes(code),'chave em texto aberto na oficina');assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html),'oficina depende da rede');
const content=read('scripts/lessons/design-web-12-workshop/content.mjs').replace(/^export /gm,'');const state=read('scripts/lessons/design-web-12-workshop/state.mjs').replace(/^export /gm,'');const sandbox={};vm.createContext(sandbox);vm.runInContext(content+'\n'+state+'\nthis.api={initialState,validateProject,ready}',sandbox);
const api=sandbox.api;const project=api.initialState();assert.equal(project.unlocked,0);assert.equal(project.design.price,false,'própria versão começa com os problemas');assert.equal(api.ready(project,4),false);
for(const mutation of [s=>s.unlocked=99,s=>s.phase=-1,s=>s.design.theme='<script>',s=>s.journey=[],s=>s.runs=[{}]]){const bad=JSON.parse(JSON.stringify(project));mutation(bad);assert.throws(()=>api.validateProject(bad));}
const imported=api.validateProject({...JSON.parse(JSON.stringify(project)),unexpected:'discard me'});assert.equal(imported.unexpected,undefined);
for(const file of ['scripts/build-course-data.mjs','scripts/rebuild-design-web-no-code.mjs'])assert.ok(read(file).includes("./lessons/design-web-12.mjs"),'gerador sem aula 12');
console.log('Aula 12: paridade, 170 minutos, chaves só nas notas, oficina autônoma e validação de projetos conferidos.');
