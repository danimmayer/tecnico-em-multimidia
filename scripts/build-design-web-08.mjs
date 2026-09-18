import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support} from './lessons/design-web-08.mjs';
import {editorHtml, illustrations} from './lessons/design-web-08-editor.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const [file, global, apply] of [
  ['assets/course-data.js','SENAI_COURSES',data=>Object.assign(data['design-web'].lessons.find(l=>l.num==='08'),lesson)],
  ['assets/course-support.js','SENAI_TEACHING_SUPPORT',data=>{data['design-web'].lessons['08']=support;}]
]) {
  const source=fs.readFileSync(root+file,'utf8'), context={window:{}};
  vm.runInNewContext(source,context); const data=context.window[global];apply(data);
  // Replace only Aula 08: other lessons have hand-formatted authored content.
  const isSupport = global === 'SENAI_TEACHING_SUPPORT';
  const start = source.indexOf(isSupport ? '      "08": {' : '      {\n        "num": "08"');
  const end = source.indexOf(isSupport ? '      "09": {' : '      {\n        "num": "09"', start);
  if(start < 0 || end < 0) throw new Error('Aula 08 boundaries not found in '+file);
  const value = isSupport ? support : data['design-web'].lessons.find(l=>l.num==='08');
  delete value.socio;
  const formatted = JSON.stringify(value,null,2).split('\n').map(line=>'      '+line).join('\n');
  const replacement = isSupport ? formatted.replace('      {','      "08": {') : formatted;
  fs.writeFileSync(root+file,source.slice(0,start)+replacement+',\n'+source.slice(end));
}
const dir = root+'modelos/design-web/aula-08/';
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(dir+'oficina.html',editorHtml());
for (const [name, svg] of Object.entries(illustrations())) fs.writeFileSync(dir+name+'.svg',svg);
console.log('Aula 08 de Design Web gerada: dados, slides, oficina offline e ilustrações.');
