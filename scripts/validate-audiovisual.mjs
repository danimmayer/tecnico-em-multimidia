import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import * as lesson09 from './lessons/audiovisual-09.mjs';
import * as lesson10 from './lessons/audiovisual-10.mjs';
import * as lesson11 from './lessons/audiovisual-11.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => fs.readFileSync(root + file, 'utf8');
const context = {window: {}};
vm.runInNewContext(read('assets/course-data.js'), context);
vm.runInNewContext(read('assets/course-support.js'), context);
// JSON round trip: objects created inside the vm context have their own prototypes.
const plain = (value) => JSON.parse(JSON.stringify(value));
const types = new Set(['day', 'flow', 'plans', 'table', 'sets', 'roles', 'checks', 'commands', 'slate', 'shoot', 'onair', 'folder', 'dailies', 'editor', 'tracks', 'media']);
const forbiddenWords = ['influencer', 'youtuber', 'tiktok', 'viral', 'meme', 'hype', 'trend', 'cringe', 'zoeira', 'mico', 'burro', 'fracasso', 'vergonha', 'bobo', 'lacrar', 'clima', 'dramátic', 'o professor fica', 'http', '—'];

// Rules shared by the lessons built on av-nine.css.
function checkLesson(num, {lesson, support}, {slideCount, resources, observation, minTypes, localKit = false}) {
  const label = `Aula ${num} AV`;
  const data = plain(context.window.SENAI_COURSES['producao-audiovisual'].lessons.find((item) => item.num === num));
  const published = plain(context.window.SENAI_TEACHING_SUPPORT['producao-audiovisual'].lessons[num]);
  // The generated data files must match the lesson module (run scripts/build-audiovisual.mjs after editing it).
  for (const [key, value] of Object.entries(lesson)) assert.deepEqual(data[key], value, `${label}: course-data.js diverge do módulo em ${key}`);
  assert.deepEqual(published, plain(support), `${label}: course-support.js diverge do módulo`);

  // Night: 19:00 to 22:10, fixed snack break, four blocks of 45 + 55 + 40 + 30 minutes.
  assert.deepEqual(lesson.schedule.map((block) => block.horario), ['19:00 - 19:45', '20:05 - 21:00', '21:00 - 21:40', '21:40 - 22:10']);
  const slides = support.presentationSlides;
  const minutes = {1: 0, 2: 0, 3: 0, 4: 0};
  for (const slide of slides) {
    const total = (slide.teacher?.steps || []).reduce((sum, step) => sum + Number(String(step).match(/^(\d+) min\b/)?.[1] || 0), 0);
    if (slide.pace === 'break') assert.equal(total, 20, `${label}: o lanche precisa durar 20 min`);
    else minutes[slide.block] += total;
  }
  assert.deepEqual(minutes, {1: 45, 2: 55, 3: 40, 4: 30}, `${label}: os passos do professor precisam fechar 45+55+40+30 min`);
  assert.equal(slides.filter((slide) => slide.pace === 'break').length, 1, `${label}: um único slide de lanche`);
  assert.equal(slides[slides.findIndex((slide) => slide.pace === 'break') + 1].block, 2, `${label}: o slide após o lanche abre o bloco 2`);
  assert.equal(support.appendDefaultClosing, false);
  assert.equal(slides.length, slideCount, `${label}: capa + ${slideCount} slides próprios`);

  // Earlier lessons use notebook templates; Aula 11 uses only ready local media.
  assert.ok(!support.studentSheet && (localKit || !slides.some((slide) => slide.resource || slide.resources)), `${label}: sem ficha, link ou material externo`);
  for (const required of ['Nenhuma ficha impressa', ...(localKit ? [] : ['Nenhum programa precisa ser instalado', 'grupos já estão formados']), ...resources]) {
    assert.ok(lesson.resources.includes(required), `${label}: recursos sem "${required}"`);
  }
  for (const required of ['22:10', '19:45', 'somente o professor circula', ...observation]) {
    assert.ok(lesson.observation.includes(required), `${label}: observação sem "${required}"`);
  }
  if (!localKit) assert.ok(slides.some((slide) => slide.kicker?.includes('copiar no caderno')), `${label}: ficha projetada para cópia no caderno`);

  // Public layer: plain, professional language, answers and timing only in the notes.
  const publicText = slides.map((slide) => JSON.stringify([slide.title, slide.kicker, slide.heading, slide.lede, slide.promptLabel, slide.prompt, slide.av9])).join('\n')
    + JSON.stringify([lesson.title, lesson.description, lesson.schedule, lesson.methodology]);
  const lower = publicText.toLocaleLowerCase('pt-BR');
  for (const forbidden of forbiddenWords) assert.ok(!lower.includes(forbidden), `${label}: camada da turma contém "${forbidden}"`);
  const nonMapText = slides.slice(1).map((slide) => JSON.stringify(slide.av9) + slide.lede + (slide.prompt || '')).join('\n');
  assert.ok(!/\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2}/.test(nonMapText), `${label}: faixas de horário ficam só na ordem do dia`);
  assert.ok(!/\d+\s*min\s*·/.test(publicText), `${label}: o slide da turma não cronometra a condução`);
  assert.ok(slides.every((slide) => !slide.prompt || slide.promptLabel), `${label}: prompt precisa de rótulo próprio`);

  // Varied, concrete visuals and at most four cards on the 5:4 projector.
  assert.equal(slides[0].av9?.type, 'day', `${label}: a ordem do dia abre a aula`);
  assert.ok(slides.every((slide) => types.has(slide.av9?.type)), `${label}: todo slide precisa de um visual conhecido`);
  assert.ok(new Set(slides.map((slide) => slide.av9.type)).size >= minTypes, `${label}: a aula precisa variar os formatos visuais`);
  assert.ok(slides.every((slide) => (slide.av9.items || slide.av9.roles || []).length <= 4), `${label}: no máximo quatro cartões por slide`);
  assert.ok(support.check.length >= 5, `${label}: conferência final insuficiente`);
  return slides;
}

checkLesson('09', lesson09, {
  slideCount: 18,
  resources: ['7 câmeras', '7 ring lights', 'já separados'],
  observation: ['não formatar cartão', 'voluntário'],
  minTypes: 10
});
const {briefings, plans} = lesson09;
assert.deepEqual(briefings.map(([team]) => team), ['EQ01', 'EQ02', 'EQ03', 'EQ04', 'EQ05', 'EQ06', 'EQ07']);
assert.equal(new Set(briefings.map((row) => row[2])).size, 7, 'Aula 09 AV: uma marca fictícia por equipe');
assert.equal(plans.reduce((sum, plan) => sum + plan.seconds, 0), 30, 'Aula 09 AV: os cinco planos somam 30 segundos');
const onair = lesson09.support.presentationSlides.find((slide) => slide.av9.type === 'onair');
assert.deepEqual(onair.av9.teams, briefings.map(([team]) => team));

const slides10 = checkLesson('10', lesson10, {
  slideCount: 16,
  resources: ['editor online gratuito', 'fones de ouvido'],
  observation: ['sair da conta', 'nada é apagado', 'aula 11'],
  minTypes: 8
});
const cutTrack = slides10.find((slide) => slide.title === 'Monte o corte bruto').av9.tracks[0].clips;
assert.equal(cutTrack.reduce((sum, clip) => sum + clip.seconds, 0), 30, 'Aula 10 AV: o corte de referência soma 30 segundos');
const locTracks = slides10.find((slide) => slide.title === 'Locução na trilha de áudio').av9.tracks;
assert.equal(locTracks[1].clips.reduce((sum, clip) => sum + clip.seconds, 0), 30, 'Aula 10 AV: a trilha de áudio acompanha os 30 segundos');
assert.equal(locTracks[1].clips.at(-1).seconds, plans.at(-1).seconds, 'Aula 10 AV: a locução ocupa o plano 5');
assert.ok(lesson10.lesson.observation.includes('lista de corte'), 'Aula 10 AV: plano B sem editor precisa estar explícito');

const slides11 = checkLesson('11', lesson11, {
  slideCount: 20, localKit: true,
  resources: ['Shotcut', 'disco local', 'oito clipes', 'duas fotos', 'código aberto'],
  observation: ['Não depender de arquivos das aulas anteriores', 'sem upload coletivo'],
  minTypes: 7
});
const kitRoot = 'modelos/producao-audiovisual/aula-11/';
for (const slide of slides11) {
  assert.ok(!/copiar no caderno|PA_A0[89]|PA_A10/.test(JSON.stringify(slide)), 'Aula 11: sem fichas nem dependência de mídias antigas');
  for (const file of [slide.resource?.href, ...(slide.resources || []).map(resource => resource.href), ...(slide.av9.clips || []).flatMap(clip => [clip.src, clip.poster])].filter(Boolean)) {
    assert.ok(file.startsWith(kitRoot) && !file.includes('..'), `Aula 11: recurso fora do kit local: ${file}`);
    assert.ok(fs.statSync(root + file).size > 0, `Aula 11: recurso vazio: ${file}`);
  }
}
const manifest = JSON.parse(read(kitRoot + 'media-manifest.json'));
assert.equal(manifest.clips.length, 8);
assert.equal(new Set(manifest.clips.map(clip => clip.file)).size, 8);
for (const clip of manifest.clips) {
  assert.equal(clip.duration, 7);
  assert.ok(fs.statSync(root + kitRoot + clip.file).size > 0);
}
for (const file of ['Aula11-Shotcut.zip', 'media/foto-fruta.jpg', 'media/foto-cesta.jpg', 'COMECE-AQUI.txt', 'Guia-Aula11-Shotcut.pdf']) {
  assert.ok(fs.statSync(root + kitRoot + file).size > 0, `Kit da aula 11 sem ${file}`);
}
assert.ok(read(kitRoot + 'CREDITOS.txt').includes('creativecommons.org/licenses/by/3.0/'));
assert.ok(slides11.some(slide => slide.pace === 'extra'), 'Aula 11: variação para quem avançar');

// Renderer, stylesheet and generators are wired.
assert.ok(read('assets/course-lesson.js').includes("course.slug === 'producao-audiovisual' && ['09', '10', '11'].includes(lesson.num)"));
assert.ok(read('aula-kit.html').includes('assets/av-nine.css'), 'aula-kit.html sem o CSS das aulas 09 e 10');
assert.ok(read('assets/av-nine.css').includes('@media (max-height: 880px)'), 'CSS sem ajuste de altura');
for (const module of ['./lessons/audiovisual-09.mjs', './lessons/audiovisual-10.mjs', './lessons/audiovisual-11.mjs']) {
  assert.ok(read('scripts/build-course-data.mjs').includes(module), `gerador geral sem ${module}`);
}

console.log('Aulas 09 a 11 AV: paridade dos dados, 170 minutos (45 + 55 + 40 + 30), lanche, sem impressão, kit local da aula 11, linguagem e visuais validados.');
