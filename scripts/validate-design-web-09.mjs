import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-09.mjs';
import {editorHtml, illustrations, checks, readProject, renderScreen, desktopStart, tabletStart, phoneStart, tabletExample, phoneExample} from './lessons/design-web-09-editor.mjs';
import {pageStart, postStart, pageFinalExample} from './lessons/design-web-08-editor.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const context = {window: {}};
for (const file of ['assets/course-data.js', 'assets/course-support.js']) vm.runInNewContext(fs.readFileSync(root + file, 'utf8'), context);
const plain = value => JSON.parse(JSON.stringify(value));

// Generated data match the lesson module.
const actual = plain(context.window.SENAI_COURSES['design-web'].lessons.find(l => l.num === '09'));
for (const [key, value] of Object.entries(lesson)) assert.deepEqual(actual[key], value, 'course-data.js diverge em ' + key);
assert.deepEqual(plain(context.window.SENAI_TEACHING_SUPPORT['design-web'].lessons['09']), plain(support));

// 19:00 to 22:10, fixed snack break, 45 + 55 + 40 + 30 minutes of teacher steps.
assert.deepEqual(lesson.schedule.map(s => s.horario), ['19:00 - 19:45', '20:05 - 21:00', '21:00 - 21:40', '21:40 - 22:10']);
const minutes = [0, 0, 0, 0];
for (const s of support.presentationSlides) {
  if (s.pace === 'break') continue;
  assert.ok(s.teacher?.speech && s.teacher?.watch && s.teacher?.rescue, s.title + ' lacks teacher support');
  for (const step of s.teacher.steps) {const m = step.match(/^(\d+) min · /); assert.ok(m, 'Unscheduled step: ' + step); minutes[s.block - 1] += Number(m[1]);}
}
assert.deepEqual(minutes, [45, 55, 40, 30]);
assert.equal(support.presentationSlides.filter(s => s.pace === 'break').length, 1);
assert.equal(support.studentSheet, undefined);
assert.equal(support.appendDefaultClosing, false);

// Public slides: student-facing, code-free, no printing and no lesson numbers.
const publicCopy = support.presentationSlides.map(({teacher, ...s}) => JSON.stringify(s)).join('\n');
assert.ok(!/bagunça|meme|\bhtml\b|\bcss\b|javascript|código|programa[çr]|ficha|impress|professor|docente|aula \d|aula anterior/i.test(publicCopy.replaceAll('oficina.html', 'oficina')), 'Public slides must stay student-facing, code-free and self-contained');
assert.ok(!/—/.test(JSON.stringify({lesson, support})), 'No em dash in teaching copy');
for (const name of ['tablet.png', 'celular.png', 'projeto-responsivo.grade']) assert.ok(publicCopy.includes(name), name);
for (const s of support.presentationSlides.filter(s => /Desafio rápido|Pense rápido/.test(s.promptLabel || ''))) {
  assert.ok(/colunas|cabeçalho, destaque e botão/.test(s.teacher.steps.join(' ')), s.title + ' needs the answer in the notes');
}

// Oficina and illustrations match the generator; the oficina is self-contained.
const dir = root + 'modelos/design-web/aula-09/';
const html = fs.readFileSync(dir + 'oficina.html', 'utf8');
assert.equal(html, editorHtml());
assert.ok(!/<(?:script|link|img)[^>]*(?:src|href)="https?:/i.test(html), 'Oficina must be self-contained');
const code = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
new Function(code);
const drawings = illustrations();
for (const [name, svg] of Object.entries(drawings)) assert.equal(fs.readFileSync(dir + name + '.svg', 'utf8'), svg, name);
for (const s of support.presentationSlides.filter(s => s.visual)) for (const name of [s.visual].flat()) assert.ok(drawings[name], 'Missing illustration ' + name);

// Responsive checks: examples pass, the shrunk starting screens need work, and each rule bites.
const allOk = (fmt, parts) => checks(fmt, parts, desktopStart).every(c => c.ok);
assert.ok(allOk('desktop', desktopStart) && allOk('tablet', tabletExample) && allOk('phone', phoneExample), 'Examples must pass the oficina checks');
assert.ok(!allOk('tablet', tabletStart) && !allOk('phone', phoneStart), 'Shrunk screens must need work');
const lowButton = structuredClone(phoneExample); lowButton.find(p => p.id === 'button').y = 1016; lowButton.find(p => p.id === 'footer').y = 304;
assert.ok(!allOk('phone', lowButton), 'Button below the first screen must not pass');
const longMenu = structuredClone(phoneExample); delete longMenu.find(p => p.id === 'header').sub;
assert.ok(!allOk('phone', longMenu), 'Desktop menu must not fit the phone header');
assert.ok(!allOk('phone', phoneExample.filter(p => p.id !== 'chess')), 'Every championship must stay on the phone');

// Projects: Aula 08 files open as the computer screen; version 3 round-trips; bad input is refused.
const from08 = readProject({version: 2, page: pageFinalExample, post: postStart});
assert.equal(from08.desktop.length, pageFinalExample.length);
assert.ok(from08.tablet.length === from08.desktop.length && from08.phone.length === from08.desktop.length);
assert.equal(readProject({version: 1, page: pageStart, post: postStart}).desktop.length, pageStart.length);
const saved = {version: 3, desktop: desktopStart, tablet: tabletExample, phone: phoneExample, background: {desktop: '#112233', tablet: '#FFFFFF', phone: '#F4F1FA'}};
const reopened = readProject(plain(saved));
assert.ok(allOk('phone', reopened.phone) && allOk('tablet', reopened.tablet));
assert.equal(reopened.background.desktop, '#112233');
assert.throws(() => readProject({...saved, phone: [{...phoneExample[0], x: 400}]}));
assert.throws(() => readProject({...saved, version: 9}));
assert.throws(() => readProject({...saved, tablet: []}));
assert.ok(!renderScreen('phone', [{...phoneExample[0], sub: '<script>x</script>'}]).includes('<script>'));

// The Aula 08 oficina is untouched by this lesson.
assert.equal(fs.readFileSync(root + 'modelos/design-web/aula-08/oficina.html', 'utf8').includes('Oficina de grade · Aula 08'), true);

console.log('Aula 09: source parity, 170 minutes, answers only in notes, no print/code tasks, responsive oficina, Aula 08 import and illustrations validated.');
