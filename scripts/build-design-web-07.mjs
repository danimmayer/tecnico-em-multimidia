import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-07.mjs';
import {editorHtml, renderSvg, initialParts, organizedParts} from './lessons/design-web-07-editor.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [file, global, apply] of [
  ['assets/course-data.js','SENAI_COURSES',data=>Object.assign(data['design-web'].lessons.find(l=>l.num==='07'),lesson)],
  ['assets/course-support.js','SENAI_TEACHING_SUPPORT',data=>{data['design-web'].lessons['07']=support;}]
]) {
  const source=fs.readFileSync(root+file,'utf8'), context={window:{}};
  vm.runInNewContext(source,context); const data=context.window[global];apply(data);
  // Replace only Aula 07: other lessons have hand-formatted authored content.
  const isSupport = global === 'SENAI_TEACHING_SUPPORT';
  const start = source.indexOf(isSupport ? '      "07": {' : '      {\n        "num": "07"');
  const end = source.indexOf(isSupport ? '      "08": {' : '      {\n        "num": "08"', start);
  if(start < 0 || end < 0) throw new Error('Aula 07 boundaries not found in '+file);
  const value = isSupport ? support : data['design-web'].lessons.find(l=>l.num==='07');
  delete value.socio;
  const formatted = JSON.stringify(value,null,2).split('\n').map(line=>'      '+line).join('\n');
  const replacement = isSupport ? formatted.replace('      {','      "07": {') : formatted;
  fs.writeFileSync(root+file,source.slice(0,start)+replacement+',\n'+source.slice(end));
}
fs.mkdirSync(root+'modelos/design-web/aula-07',{recursive:true});
fs.writeFileSync(root+'modelos/design-web/aula-07/editor.html',editorHtml());
fs.writeFileSync(root+'modelos/design-web/aula-07/before.svg',renderSvg(initialParts));
fs.writeFileSync(root+'modelos/design-web/aula-07/after.svg',renderSvg(organizedParts));
console.log('Aula 07 de Design Web gerada: dados, slides, editor offline e exemplos.');
