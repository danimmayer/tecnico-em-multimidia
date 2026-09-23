import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/audiovisual-09.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const indent = (value, spaces) => JSON.stringify(value, null, 2).split('\n').map(line => ' '.repeat(spaces) + line).join('\n');

// Replace only Aula 09 of Produção Audiovisual: other lessons have hand-formatted authored content.
function replaceBlock(file, findStart, findEnd, replacement) {
  const source = fs.readFileSync(root + file, 'utf8');
  const courseStart = source.indexOf('  "producao-audiovisual": {');
  const start = findStart(source, courseStart);
  const end = findEnd(source, start);
  if (courseStart < 0 || start < courseStart || end <= start) throw new Error('Aula 09 boundaries not found in ' + file);
  const next = source.slice(0, start) + replacement + source.slice(end);
  vm.runInNewContext(next, {window: {}});
  fs.writeFileSync(root + file, next);
}

const dataSource = fs.readFileSync(root + 'assets/course-data.js', 'utf8');
const dataContext = {window: {}};
vm.runInNewContext(dataSource, dataContext);
const merged = Object.assign(dataContext.window.SENAI_COURSES['producao-audiovisual'].lessons.find(item => item.num === '09'), lesson);

replaceBlock(
  'assets/course-data.js',
  (source, from) => source.indexOf('      {\n        "num": "09"', from),
  (source, from) => source.indexOf('      {\n        "num": "10"', from),
  indent(merged, 6) + ',\n'
);

const supportSource = fs.readFileSync(root + 'assets/course-support.js', 'utf8');
const supportStart = supportSource.indexOf('      "09": {', supportSource.indexOf('  "producao-audiovisual": {'));
const hasNextKey = /\n {6}"\d\d": \{/.test(supportSource.slice(supportStart + 1).split('\n    }\n  }\n};')[0]);
replaceBlock(
  'assets/course-support.js',
  (source, from) => source.indexOf('      "09": {', from),
  (source, from) => {
    const rest = source.slice(from + 1);
    const nextKey = rest.search(/\n {6}"\d\d": \{/);
    return hasNextKey ? from + 1 + nextKey + 1 : source.indexOf('\n    }\n  }\n};', from) + 1;
  },
  indent(support, 6).replace(/^ {6}\{/, '      "09": {') + (hasNextKey ? ',\n' : '\n')
);

console.log('Aula 09 de Produção Audiovisual gerada: dados públicos e slides.');
