import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import * as lesson09 from './lessons/audiovisual-09.mjs';
import * as lesson10 from './lessons/audiovisual-10.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const indent = (value, spaces) => JSON.stringify(value, null, 2).split('\n').map(line => ' '.repeat(spaces) + line).join('\n');
const nextNum = (num) => String(Number(num) + 1).padStart(2, '0');

// Replace only the given lesson of Produção Audiovisual: other lessons have hand-formatted authored content.
function replaceBlock(file, num, findStart, findEnd, replacement) {
  const source = fs.readFileSync(root + file, 'utf8');
  const courseStart = source.indexOf('  "producao-audiovisual": {');
  const start = findStart(source, courseStart);
  const end = findEnd(source, start);
  if (courseStart < 0 || start < courseStart || end <= start) throw new Error(`Aula ${num} boundaries not found in ${file}`);
  const next = source.slice(0, start) + replacement(source.slice(start, end)) + source.slice(end);
  vm.runInNewContext(next, {window: {}});
  fs.writeFileSync(root + file, next);
}

for (const [num, {lesson, support}] of [['09', lesson09], ['10', lesson10]]) {
  const dataContext = {window: {}};
  vm.runInNewContext(fs.readFileSync(root + 'assets/course-data.js', 'utf8'), dataContext);
  const merged = Object.assign(dataContext.window.SENAI_COURSES['producao-audiovisual'].lessons.find(item => item.num === num), lesson);
  replaceBlock('assets/course-data.js', num,
    (source, from) => source.indexOf(`      {\n        "num": "${num}"`, from),
    (source, from) => source.indexOf(`      {\n        "num": "${nextNum(num)}"`, from),
    () => indent(merged, 6) + ',\n');

  // In course-support.js the lesson is followed by another key or closes the lessons object.
  replaceBlock('assets/course-support.js', num,
    (source, from) => source.indexOf(`      "${num}": {`, from),
    (source, from) => {
      const nextKey = source.slice(from + 1).search(/\n {6}"\d\d": \{/);
      const close = source.indexOf('\n    }\n  }\n};', from);
      return nextKey >= 0 && from + 1 + nextKey < close ? from + 1 + nextKey + 1 : close + 1;
    },
    (old) => indent(support, 6).replace(/^ {6}\{/, `      "${num}": {`) + (old.trimEnd().endsWith(',') ? ',\n' : '\n'));
}

console.log('Aulas 09 e 10 de Produção Audiovisual geradas: dados públicos e slides.');
