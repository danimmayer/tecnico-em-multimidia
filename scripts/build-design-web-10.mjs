import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-10.mjs';
import {arenaPage, hubPage} from './lessons/design-web-10-site.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
// Both data files are plain JSON.stringify output, so replacing Aula 10 and re-serializing keeps every other lesson byte-identical.
for (const [file, global] of [['assets/course-data.js', 'SENAI_COURSES'], ['assets/course-support.js', 'SENAI_TEACHING_SUPPORT']]) {
  const source = fs.readFileSync(root + file, 'utf8'), context = {window: {}};
  vm.runInNewContext(source, context);
  const data = context.window[global];
  if (global === 'SENAI_COURSES') Object.assign(data['design-web'].lessons.find(l => l.num === '10'), lesson);
  else data['design-web'].lessons['10'] = support;
  const next = source.slice(0, source.indexOf('window.')) + 'window.' + global + ' = ' + JSON.stringify(data, null, 2) + ';\n';
  vm.runInNewContext(next, {window: {}});
  fs.writeFileSync(root + file, next);
}
const dir = root + 'modelos/design-web/aula-10/';
for (const sub of ['teste', 'corrigida']) fs.mkdirSync(dir + sub, {recursive: true});
fs.writeFileSync(dir + 'index.html', hubPage());
fs.writeFileSync(dir + 'teste/index.html', arenaPage({fixed: false}));
fs.writeFileSync(dir + 'corrigida/index.html', arenaPage({fixed: true}));
console.log('Aula 10 de Design Web gerada: dados, slides, entrada da noite e páginas da Arena Pixel (teste e corrigida).');
