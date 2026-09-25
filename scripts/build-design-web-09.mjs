import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-09.mjs';
import {editorHtml, illustrations} from './lessons/design-web-09-editor.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [file, global] of [['assets/course-data.js', 'SENAI_COURSES'], ['assets/course-support.js', 'SENAI_TEACHING_SUPPORT']]) {
  const source = fs.readFileSync(root + file, 'utf8'), context = {window: {}};
  vm.runInNewContext(source, context);
  // Replace only Aula 09 of Design Web: other lessons have hand-formatted authored content.
  const isSupport = global === 'SENAI_TEACHING_SUPPORT';
  // In course-support.js, Aula 09 is the last Design Web key: it ends where Produção Audiovisual begins.
  const courseEnd = source.indexOf('\n  "producao-audiovisual": {');
  const start = source.indexOf(isSupport ? '      "09": {' : '      {\n        "num": "09"');
  const end = isSupport ? source.lastIndexOf('\n    }\n  },', courseEnd) + 1 : source.indexOf('      {\n        "num": "10"', start);
  if (start < 0 || end <= start || start > courseEnd) throw new Error('Aula 09 boundaries not found in ' + file);
  const value = isSupport ? support : {...context.window.SENAI_COURSES['design-web'].lessons.find(l => l.num === '09'), ...lesson};
  const formatted = JSON.stringify(value, null, 2).split('\n').map(line => '      ' + line).join('\n');
  const replacement = isSupport ? formatted.replace('      {', '      "09": {') : formatted;
  const next = source.slice(0, start) + replacement + (isSupport ? '\n' : ',\n') + source.slice(end);
  vm.runInNewContext(next, {window: {}});
  fs.writeFileSync(root + file, next);
}
const dir = root + 'modelos/design-web/aula-09/';
fs.mkdirSync(dir, {recursive: true});
fs.writeFileSync(dir + 'oficina.html', editorHtml());
for (const [name, svg] of Object.entries(illustrations())) fs.writeFileSync(dir + name + '.svg', svg);
console.log('Aula 09 de Design Web gerada: dados, slides, oficina responsiva e ilustrações.');
