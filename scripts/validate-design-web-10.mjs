import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-10.mjs';
import {arenaPage, hubPage, problems} from './lessons/design-web-10-site.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const context = {window: {}};
for (const file of ['assets/course-data.js', 'assets/course-support.js']) vm.runInNewContext(fs.readFileSync(root + file, 'utf8'), context);
const plain = value => JSON.parse(JSON.stringify(value));

// Generated data match the lesson module.
const actual = plain(context.window.SENAI_COURSES['design-web'].lessons.find(l => l.num === '10'));
for (const [key, value] of Object.entries(lesson)) assert.deepEqual(actual[key], value, 'course-data.js diverge em ' + key);
assert.deepEqual(plain(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['10']), plain(support));

// 19:00 to 22:10, fixed snack break, 45 + 55 + 40 + 30 minutes of teacher steps.
assert.deepEqual(lesson.schedule.map(s => s.horario), ['19:00 - 19:45', '20:05 - 21:00', '21:00 - 21:40', '21:40 - 22:10']);
const minutes = [0, 0, 0, 0];
for (const s of support.presentationSlides) {
  if (s.pace === 'break') continue;
  if (s.pace === 'extra') {assert.ok(s.teacher?.speech && s.teacher?.watch && s.teacher?.rescue && /^Desafio extra/.test(s.title), s.title + ' must be a labelled optional challenge'); continue;}
  assert.ok(s.teacher?.speech && s.teacher?.watch && s.teacher?.rescue, s.title + ' lacks teacher support');
  for (const step of s.teacher.steps) {const m = step.match(/^(\d+) min · /); assert.ok(m, 'Unscheduled step: ' + step); minutes[s.block - 1] += Number(m[1]);}
}
assert.deepEqual(minutes, [45, 55, 40, 30]);
assert.equal(support.presentationSlides.filter(s => s.pace === 'break').length, 1);
assert.equal(support.appendDefaultClosing, false);

// Public slides: student-facing, code-free, no printing and no lesson numbers.
const publicCopy = support.presentationSlides.map(({teacher, ...s}) => JSON.stringify(s)).join('\n');
assert.ok(!/\bhtml\b|\bcss\b|javascript|código|programa[çr]|ficha|impress|professor|docente|aula \d|aula anterior/i.test(publicCopy.replaceAll('oficina.html', 'oficina')), 'Public slides must stay student-facing, code-free and self-contained');
assert.ok(!/—/.test(JSON.stringify({lesson, support})), 'No em dash in teaching copy');
assert.ok(!/código|programa[çr]|\bhtml\b|\bcss\b|javascript/i.test(lesson.description + lesson.schedule.map(s => s.atividade).join(' ')), 'Lesson plan copy must be code-free');
for (const name of ['computador.png', 'tablet.png', 'celular.png', 'projeto-responsivo.grade', 'post-final.png', 'projeto.grade', 'Aula-10']) assert.ok(publicCopy.includes(name), name);
for (const s of support.presentationSlides.filter(s => /Desafio rápido|Pense rápido|Missão/.test(s.promptLabel || ''))) assert.ok(s.teacher.steps.some(step => /Conferir/.test(step)) || /Revisor|Revise/.test(s.title), s.title + ' needs the answer in the notes');
assert.equal(problems.length, 5);

// Published pages match the generator; the test page has the five problems and the fixed one none.
const dir = root + 'modelos/design-web/aula-10/';
assert.equal(fs.readFileSync(dir + 'index.html', 'utf8'), hubPage());
for (const href of ['../aula-08/', '../aula-09/', 'teste/', 'corrigida/']) assert.ok(hubPage().includes(`href="${href}"`), href);
const test = fs.readFileSync(dir + 'teste/index.html', 'utf8'), fixed = fs.readFileSync(dir + 'corrigida/index.html', 'utf8');
assert.equal(test, arenaPage({fixed: false}));
assert.equal(fixed, arenaPage({fixed: true}));
for (const page of [test, fixed]) assert.ok(!/<(?:script|link|img)[^>]*(?:src|href)="https?:/i.test(page) && !/<script/i.test(page), 'Pages must be self-contained and script-free');
for (const marker of ['Xadres', '90000-0000', '#pagina-que-nao-existe', 'foto-arena-final2.jpg']) {assert.ok(test.includes(marker), marker); assert.ok(!fixed.includes(marker), marker);}
assert.ok(fixed.includes('grid-template-columns:1fr') && !test.includes('.cards{grid-template-columns:1fr}'), 'Only the fixed page stacks the cards on the phone');
console.log('Aula 10 de Design Web validada.');
