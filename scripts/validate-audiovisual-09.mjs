import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {lesson, support, briefings, plans} from './lessons/audiovisual-09.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => fs.readFileSync(root + file, 'utf8');
const context = {window: {}};
vm.runInNewContext(read('assets/course-data.js'), context);
vm.runInNewContext(read('assets/course-support.js'), context);
// JSON round trip: objects created inside the vm context have their own prototypes.
const plain = (value) => JSON.parse(JSON.stringify(value));
const data = plain(context.window.SENAI_COURSES['producao-audiovisual'].lessons.find((item) => item.num === '09'));
const published = plain(context.window.SENAI_TEACHING_SUPPORT['producao-audiovisual'].lessons['09']);

// The generated data files must match the lesson module (run scripts/build-audiovisual-09.mjs after editing it).
for (const [key, value] of Object.entries(lesson)) assert.deepEqual(data[key], value, `course-data.js diverge do módulo em ${key}`);
assert.deepEqual(published, plain(support), 'course-support.js diverge do módulo da aula 09');

// Night: 19:00 to 22:10, fixed snack break, four blocks of 45 + 55 + 40 + 30 minutes.
assert.deepEqual(lesson.schedule.map((block) => block.horario), ['19:00 - 19:45', '20:05 - 21:00', '21:00 - 21:40', '21:40 - 22:10']);
const slides = support.presentationSlides;
const minutes = {1: 0, 2: 0, 3: 0, 4: 0};
for (const slide of slides) {
  const total = (slide.teacher?.steps || []).reduce((sum, step) => sum + Number(String(step).match(/^(\d+) min\b/)?.[1] || 0), 0);
  if (slide.pace === 'break') assert.equal(total, 20, 'o lanche precisa durar 20 min');
  else minutes[slide.block] += total;
}
assert.deepEqual(minutes, {1: 45, 2: 55, 3: 40, 4: 30}, 'os passos do professor precisam fechar 45+55+40+30 min');
assert.equal(slides.filter((slide) => slide.pace === 'break').length, 1, 'um único slide de lanche');
assert.equal(slides[slides.findIndex((slide) => slide.pace === 'break') + 1].block, 2, 'o slide após o lanche abre o bloco 2');
assert.equal(support.appendDefaultClosing, false);
assert.equal(slides.length, 18, 'capa + 18 slides próprios');

// No printing, no fillable forms, no links, nothing to install.
assert.ok(!support.studentSheet && !slides.some((slide) => slide.resource || slide.resources), 'a aula não pode depender de ficha, link ou material externo');
for (const required of ['Nenhuma ficha impressa', 'Nenhum programa precisa ser instalado', '7 câmeras', '7 ring lights', 'já separados', 'grupos já estão formados']) {
  assert.ok(lesson.resources.includes(required), `recursos sem "${required}"`);
}
for (const required of ['22:10', '19:45', 'permanece no próprio posto', 'não formatar cartão', 'voluntário']) {
  assert.ok(lesson.observation.includes(required), `observação sem "${required}"`);
}
assert.ok(slides.filter((slide) => slide.kicker?.includes('copiar no caderno')).length >= 2, 'roteiro e boletim são projetados para cópia no caderno');

// Public layer: plain, professional language, answers and timing only in the notes.
const publicText = slides.map((slide) => JSON.stringify([slide.title, slide.kicker, slide.heading, slide.lede, slide.promptLabel, slide.prompt, slide.av9])).join('\n')
  + JSON.stringify([lesson.title, lesson.description, lesson.schedule, lesson.methodology]);
const lower = publicText.toLocaleLowerCase('pt-BR');
for (const forbidden of ['influencer', 'youtuber', 'tiktok', 'viral', 'meme', 'hype', 'trend', 'cringe', 'zoeira', 'mico', 'burro', 'fracasso', 'vergonha', 'bobo', 'lacrar', 'clima', 'dramátic', 'o professor fica', 'http', '—']) {
  assert.ok(!lower.includes(forbidden), `camada da turma contém "${forbidden}"`);
}
const nonMapText = slides.filter((slide) => slide.title !== 'Ordem do dia').map((slide) => JSON.stringify(slide.av9) + slide.lede + (slide.prompt || '')).join('\n');
assert.ok(!/\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2}/.test(nonMapText), 'faixas de horário ficam só na ordem do dia');
assert.ok(!/\d+\s*min\s*·/.test(publicText), 'o slide da turma não cronometra a condução');
assert.ok(slides.every((slide) => !slide.prompt || slide.promptLabel), 'prompt precisa de rótulo próprio');

// Varied, concrete visuals: every slide has one, many kinds across the night.
const types = new Set(['day', 'flow', 'plans', 'table', 'sets', 'roles', 'checks', 'commands', 'slate', 'shoot', 'onair', 'folder', 'dailies']);
assert.ok(slides.every((slide) => types.has(slide.av9?.type)), 'todo slide precisa de um visual conhecido');
assert.ok(new Set(slides.map((slide) => slide.av9.type)).size >= 10, 'a aula precisa variar os formatos visuais');
assert.ok(slides.every((slide) => (slide.av9.items || slide.av9.roles || []).length <= 4), 'no máximo quatro cartões por slide no projetor 5:4');

// Content consistency.
assert.deepEqual(briefings.map(([team]) => team), ['EQ01', 'EQ02', 'EQ03', 'EQ04', 'EQ05', 'EQ06', 'EQ07']);
assert.equal(new Set(briefings.map((row) => row[2])).size, 7, 'uma marca fictícia por equipe');
assert.equal(plans.reduce((sum, plan) => sum + plan.seconds, 0), 30, 'os cinco planos somam 30 segundos');
const onair = slides.find((slide) => slide.av9.type === 'onair');
assert.deepEqual(onair.av9.teams, briefings.map(([team]) => team));
assert.ok(support.check.length >= 5, 'conferência final insuficiente');

// Renderer, stylesheet and generator are wired.
assert.ok(read('assets/course-lesson.js').includes("course.slug === 'producao-audiovisual' && lesson.num === '09'"));
assert.ok(read('aula-kit.html').includes('assets/av-nine.css'), 'aula-kit.html sem o CSS da aula 09');
assert.ok(read('assets/av-nine.css').includes('@media (max-height: 880px)'), 'CSS sem ajuste de altura');
assert.ok(read('scripts/build-course-data.mjs').includes('./lessons/audiovisual-09.mjs'), 'gerador geral sem a aula 09');

console.log('Aula 09 AV: paridade dos dados, 170 minutos (45 + 55 + 40 + 30), lanche, fichas só projetadas, sem impressão, links ou instalação, linguagem e visuais validados.');
