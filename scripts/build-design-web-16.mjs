import fs from 'node:fs';
import vm from 'node:vm';
import {lesson,support} from './lessons/design-web-16.mjs';
import {workshopPage} from './lessons/design-web-16-workshop.mjs';

const root = new URL('../',import.meta.url);
const read = file => fs.readFileSync(new URL(file,root),'utf8');
const context = {window:{}};
for (const [file,global] of [['assets/course-data.js','SENAI_COURSES'],['assets/course-support.js','SENAI_TEACHING_SUPPORT']]) {
  const source = read(file);
  vm.runInNewContext(source,context);
  const data = context.window[global];
  if (global === 'SENAI_COURSES') {
    const target = data['design-web'].lessons.find(x => x.num === '16');
    if (!target) throw new Error('Aula 16 não encontrada.');
    Object.assign(target,lesson);
  } else data['design-web'].lessons['16'] = support;
  fs.writeFileSync(new URL(file,root),source.slice(0,source.indexOf('window.'))+'window.'+global+' = '+JSON.stringify(data,null,2)+';\n');
}
const directory = new URL('modelos/design-web/aula-16/',root);
fs.mkdirSync(directory,{recursive:true});
fs.writeFileSync(new URL('index.html',directory),workshopPage());
const course = context.window.SENAI_COURSES['design-web'];
const onlyLesson = {...course,lessons:course.lessons.filter(x => x.num === '16')};
const onlySupport = JSON.parse(JSON.stringify({...context.window.SENAI_TEACHING_SUPPORT['design-web'],lessons:{'16':support}}));
for (const slide of onlySupport.lessons['16'].presentationSlides) {
  if (slide.resources) slide.resources = [{href:'index.html',label:'Abrir Criar e testar páginas'}];
}
const script = value => '<script>'+value.replace(/<\/script/gi,'<\\/script')+'</script>';
const runtime = read('assets/course-lesson.js')
  .replace("const courseSlug = params.get('uc') || '';","const courseSlug = params.get('uc') || 'design-web';")
  .replace("String(params.get('aula') || '')","String(params.get('aula') || '16')")
  .replaceAll('uc-${courseSlug}.html','index.html')
  .replaceAll('Voltar às aulas','Voltar à oficina')
  .replace('<span class="back-text">Aulas</span>','<span class="back-text">Oficina</span>');
fs.writeFileSync(new URL('slides.html',directory),'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aula 16 · Criar e testar páginas</title><link rel="icon" href="data:,"><style>'+read('assets/course-kit.css')+'\n'+read('assets/design-web-16.css')+'</style></head><body class="lesson-page"><div id="lessonRoot"></div><div class="toast" id="toast" role="status" aria-live="polite"></div>'+script('window.SENAI_COURSES='+JSON.stringify({'design-web':onlyLesson})+';window.SENAI_TEACHING_SUPPORT='+JSON.stringify({'design-web':onlySupport})+';')+script(read('assets/course-pace.js'))+script(read('assets/design-web-16.js'))+script(runtime)+'</body></html>');
console.log('Aula 16 gerada: oficina, slides offline e integração no curso.');
