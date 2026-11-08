import fs from 'node:fs';
import vm from 'node:vm';
import {lesson,support} from './lessons/design-web-15.mjs';
import {workshopPage} from './lessons/design-web-15-workshop.mjs';
const root=new URL('../',import.meta.url);
for(const [file,global] of [['assets/course-data.js','SENAI_COURSES'],['assets/course-support.js','SENAI_TEACHING_SUPPORT']]) {
  const source=fs.readFileSync(new URL(file,root),'utf8'),context={window:{}};
  vm.runInNewContext(source,context);
  const data=context.window[global];
  if(global==='SENAI_COURSES')Object.assign(data['design-web'].lessons.find(x=>x.num==='15'),lesson);
  else data['design-web'].lessons['15']=support;
  fs.writeFileSync(new URL(file,root),source.slice(0,source.indexOf('window.'))+'window.'+global+' = '+JSON.stringify(data,null,2)+';\n');
}
const directory=new URL('modelos/design-web/aula-15/',root);
fs.mkdirSync(directory,{recursive:true});
fs.writeFileSync(new URL('index.html',directory),workshopPage());
// Cópia de projeção autossuficiente, servida junto da oficina sem outras aulas.
const context={window:{}};
for(const file of ['assets/course-data.js','assets/course-support.js'])vm.runInNewContext(fs.readFileSync(new URL(file,root),'utf8'),context);
const course=context.window.SENAI_COURSES['design-web'];
const teaching=context.window.SENAI_TEACHING_SUPPORT['design-web'];
const onlyLesson={...course,lessons:course.lessons.filter(x=>x.num==='15')};
const onlyTeaching={...teaching,lessons:{'15':teaching.lessons['15']}};
for(const slide of onlyTeaching.lessons['15'].presentationSlides)if(slide.resources)slide.resources=[{href:'index.html',label:'Abrir a oficina da aula 15'}];
const read=file=>fs.readFileSync(new URL(file,root),'utf8');
const script=text=>'<script>'+text.replace(/<\/script/gi,'<\\/script')+'</script>';
const publishedRuntime=read('assets/course-lesson.js')
  .replace("const courseSlug = params.get('uc') || '';","const courseSlug = params.get('uc') || 'design-web';")
  .replace("String(params.get('aula') || '')","String(params.get('aula') || '15')")
  .replaceAll('uc-${courseSlug}.html','index.html')
  .replaceAll('Voltar às aulas','Voltar à oficina')
  .replace('<span class="back-text">Aulas</span>','<span class="back-text">Oficina</span>');
fs.writeFileSync(new URL('slides.html',directory),'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Aula 15 · Design Web</title><link rel="icon" href="data:,"><style>'+read('assets/course-kit.css')+'\n'+read('assets/design-web-15.css')+'</style></head><body class="lesson-page"><div id="lessonRoot"></div><div class="toast" id="toast" role="status" aria-live="polite"></div>'+script('window.SENAI_COURSES='+JSON.stringify({'design-web':onlyLesson})+';window.SENAI_TEACHING_SUPPORT='+JSON.stringify({'design-web':onlyTeaching})+';')+script(read('assets/course-pace.js'))+script(read('assets/design-web-15.js'))+script(publishedRuntime)+'</body></html>');
console.log('Aula 15 gerada: roteiro, apoio, oficina e slides autossuficientes.');
