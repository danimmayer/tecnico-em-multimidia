import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lessonPatches, supportPatches } from './lessons/design-web-17-18-clarity.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'assets', 'course-data.js');
const supportPath = path.join(root, 'assets', 'course-support.js');

function objectRange(source, openingBrace) {
  let quote = false;
  let escaped = false;
  let depth = 0;
  for (let index = openingBrace; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quote = false;
      continue;
    }
    if (char === '"') quote = true;
    else if (char === '{') depth += 1;
    else if (char === '}' && --depth === 0) return [openingBrace, index + 1];
  }
  throw new Error('Objeto JSON sem fechamento.');
}

function courseScope(source, fileLabel) {
  const match = /"design-web"\s*:\s*\{/.exec(source);
  if (!match) throw new Error(`Não encontrei a UC Design Web em ${fileLabel}.`);
  return objectRange(source, match.index + match[0].lastIndexOf('{'));
}

function replaceObjectInCourse(source, matcher, patch, label, fileLabel) {
  const [scopeStart, scopeEnd] = courseScope(source, fileLabel);
  const course = source.slice(scopeStart, scopeEnd);
  matcher.lastIndex = 0;
  const match = matcher.exec(course);
  if (!match) throw new Error(`Não encontrei ${label}.`);
  const openingBrace = scopeStart + match.index + match[0].indexOf('{');
  const [start, end] = objectRange(source, openingBrace);
  const original = JSON.parse(source.slice(start, end));
  const replacement = JSON.stringify({ ...original, ...patch }, null, 2)
    .split('\n')
    .map((line, index) => index === 0 ? line : `      ${line}`)
    .join('\n');
  return `${source.slice(0, start)}${replacement}${source.slice(end)}`;
}

function patchCourseData(source) {
  let result = source;
  for (const lessonNumber of ['17', '18']) {
    result = replaceObjectInCourse(
      result,
      new RegExp(`\\{\\s*"num": "${lessonNumber}"`),
      lessonPatches[lessonNumber],
      `Aula ${lessonNumber} em course-data.js`,
      'course-data.js'
    );
  }
  return result;
}

function patchSupport(source) {
  let result = source;
  for (const lessonNumber of ['17', '18']) {
    result = replaceObjectInCourse(
      result,
      new RegExp(`"${lessonNumber}": \\{\\s*"teacherGoal":`),
      supportPatches[lessonNumber],
      `Aula ${lessonNumber} em course-support.js`,
      'course-support.js'
    );
  }
  return result;
}

const planned = [
  [dataPath, patchCourseData(fs.readFileSync(dataPath, 'utf8'))],
  [supportPath, patchSupport(fs.readFileSync(supportPath, 'utf8'))]
];
const changed = planned.filter(([file, content]) => fs.readFileSync(file, 'utf8') !== content);

if (process.argv.includes('--check')) {
  if (changed.length) throw new Error(`Fontes geradas desatualizadas: ${changed.map(([file]) => path.basename(file)).join(', ')}`);
  console.log('Aulas 17 e 18 já refletem os patches de clareza.');
} else {
  changed.forEach(([file, content]) => fs.writeFileSync(file, content));
  console.log(changed.length ? `Atualizados: ${changed.map(([file]) => path.basename(file)).join(', ')}` : 'Nenhuma alteração necessária.');
}
