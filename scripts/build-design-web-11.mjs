import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-11.mjs';
import {workshopPage} from './lessons/design-web-11-editor.mjs';
import {flowWorkshopPage} from './lessons/design-web-11-flow.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [file, global] of [['assets/course-data.js', 'SENAI_COURSES'], ['assets/course-support.js', 'SENAI_TEACHING_SUPPORT']]) {
  const source = fs.readFileSync(root + file, 'utf8'), context = {window: {}};
  vm.runInNewContext(source, context);
  const data = context.window[global];
  if (global === 'SENAI_COURSES') Object.assign(data['design-web'].lessons.find(item => item.num === '11'), lesson);
  else data['design-web'].lessons['11'] = support;
  fs.writeFileSync(root + file, source.slice(0, source.indexOf('window.')) + 'window.' + global + ' = ' + JSON.stringify(data, null, 2) + ';\n');
}
const directory = root + 'modelos/design-web/aula-11/';
fs.mkdirSync(directory, {recursive: true});
fs.writeFileSync(directory + 'oficina.html', workshopPage());
fs.writeFileSync(directory + 'index.html', workshopPage({published: true}));
fs.writeFileSync(directory + 'criador.html', flowWorkshopPage({published: true}));
console.log('Aula 11 de Design Web gerada: roteiro, apresentação e oficinas local e pública.');
