import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import * as lesson09 from './lessons/audiovisual-09.mjs';
import * as lesson10 from './lessons/audiovisual-10.mjs';
import * as lesson11 from './lessons/audiovisual-11.mjs';
import * as lesson12 from './lessons/audiovisual-12.mjs';
import * as lesson13 from './lessons/audiovisual-13.mjs';
import * as lesson14 from './lessons/audiovisual-14.mjs';
import {createHash} from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => fs.readFileSync(root + file, 'utf8');
const context = {window: {}};
vm.runInNewContext(read('assets/course-data.js'), context);
vm.runInNewContext(read('assets/course-support.js'), context);
// JSON round trip: objects created inside the vm context have their own prototypes.
const plain = (value) => JSON.parse(JSON.stringify(value));
const types = new Set(['day', 'flow', 'plans', 'table', 'sets', 'roles', 'checks', 'commands', 'slate', 'shoot', 'onair', 'folder', 'dailies', 'editor', 'tracks', 'media', 'stills']);
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

  // Earlier lessons use notebook templates; Aulas 11 e 12 use only ready local media.
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

const slides12 = checkLesson('12', lesson12, {
  slideCount: 19, localKit: true,
  resources: ['Canva', 'Aula12-Canva.zip', 'CC BY', 'Nenhum programa precisa ser instalado'],
  observation: ['um de cada vez', 'somente o professor circula', 'créditos'],
  minTypes: 6
});
const kit12 = 'modelos/producao-audiovisual/aula-12/';
for (const slide of slides12) {
  assert.ok(!/copiar no caderno|PA_A|meu-trailer|Shotcut/.test(JSON.stringify(slide)), 'Aula 12: sem fichas, sem trailer da aula 11 e sem Shotcut');
  const files = [slide.resource?.href, ...(slide.resources || []).map(resource => resource.href),
    ...(slide.av9.clips || []).flatMap(clip => [clip.src, clip.poster]), ...(slide.av9.images || []).map(image => image.src)];
  for (const file of files.filter(Boolean)) {
    assert.ok(file.startsWith(kit12) && !file.includes('..'), `Aula 12: recurso fora do kit local: ${file}`);
    assert.ok(fs.statSync(root + file).size > 0, `Aula 12: recurso vazio: ${file}`);
  }
}
// Client requests are revealed one per slide; each one says when it is done and what to improve while waiting.
const requests12 = slides12.filter(slide => /^Pedido \d/.test(slide.title));
assert.ok(requests12.length >= 6, 'Aula 12: a noite precisa de pedidos suficientes para ocupar os quatro blocos');
assert.deepEqual([...new Set(requests12.map(slide => slide.block))], [1, 2, 3, 4], 'Aula 12: há pedido em todos os blocos');
for (const slide of requests12) {
  assert.ok(slide.promptLabel === 'Pronto quando' && slide.prompt, `${slide.title}: precisa do critério de pronto`);
  assert.ok(/terminou antes/i.test(JSON.stringify(slide.av9)) || /terminou antes/i.test(slide.prompt), `${slide.title}: precisa de melhoria para quem termina antes`);
}
// Students never see plan or pricing talk; the free-account constraint lives only in the teacher notes.
const public12 = JSON.stringify([lesson12.lesson.title, lesson12.lesson.description, lesson12.lesson.schedule, lesson12.lesson.methodology, lesson12.lesson.resources, ...slides12.map(({teacher, ...slide}) => slide)]).toLowerCase();
for (const word of ['coroa', 'premium', 'pago', 'canva pro']) assert.ok(!public12.includes(word), `Aula 12: a camada da turma não fala em "${word}"`);
assert.ok(slides12.some(slide => slide.pace === 'extra'), 'Aula 12: banco de melhorias para quem concluir tudo');
assert.ok(slides12.some(slide => slide.av9.type === 'stills' && slide.av9.images.length === 2), 'Aula 12: comparação lado a lado');
for (const file of ['Aula12-Canva.zip', 'COMECE-AQUI.txt', 'exemplo-abertura.mp4', 'index.html']) {
  assert.ok(fs.statSync(root + kit12 + file).size > 0, `Kit da aula 12 sem ${file}`);
}
assert.ok(!fs.existsSync(root + kit12 + 'Aula12-Shotcut.zip') && !fs.existsSync(root + kit12 + 'Guia-Aula12-Shotcut.pdf'), 'Aula 12: o kit do Shotcut saiu desta aula');
assert.ok(read(kit12 + 'CREDITOS.txt').includes('creativecommons.org/licenses/by/3.0/'));
const manifest12 = JSON.parse(read(kit12 + 'kit-manifest.json'));
for (const file of manifest12.student_media) assert.ok(fs.statSync(root + kitRoot + 'media/' + file).size > 0, `Aula 12: mídia ausente no kit da aula 11: ${file}`);
// Reads the ZIP central directory: a light student kit with the scenes, credits and start note.
const zip12 = fs.readFileSync(root + kit12 + 'Aula12-Canva.zip');
assert.ok(zip12.length < 5 * 1024 * 1024, 'Aula 12: o kit precisa ser leve para o envio ao Canva');
const zipNames = new Set();
for (let offset = zip12.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06])), entries = zip12.readUInt16LE(offset + 10), cursor = zip12.readUInt32LE(offset + 16), index = 0; index < entries; index++) {
  const nameLength = zip12.readUInt16LE(cursor + 28);
  zipNames.add(zip12.toString('utf8', cursor + 46, cursor + 46 + nameLength));
  cursor += 46 + nameLength + zip12.readUInt16LE(cursor + 30) + zip12.readUInt16LE(cursor + 32);
}
for (const name of [...manifest12.student_media, 'COMECE-AQUI.txt', 'CREDITOS.txt']) {
  assert.ok(zipNames.has('Aula12-Canva/' + name), `ZIP da aula 12 sem ${name}`);
}

// Renderer, stylesheet and generators are wired.
assert.ok(read('assets/course-lesson.js').includes("course.slug === 'producao-audiovisual' && ['09', '10', '11', '12', '13', '14'].includes(lesson.num)"));
assert.ok(read('assets/course-lesson.js').includes("visual.type === 'stills'"), 'renderizador sem quadros parados');
assert.ok(read('assets/av-nine.css').includes('.av9-clip.is-graphic'), 'CSS sem camada de grafismo');
assert.ok(read('aula-kit.html').includes('assets/av-nine.css'), 'aula-kit.html sem o CSS das aulas 09 e 10');
assert.ok(read('assets/av-nine.css').includes('@media (max-height: 880px)'), 'CSS sem ajuste de altura');
for (const module of ['./lessons/audiovisual-09.mjs', './lessons/audiovisual-10.mjs', './lessons/audiovisual-11.mjs', './lessons/audiovisual-12.mjs', './lessons/audiovisual-13.mjs', './lessons/audiovisual-14.mjs']) {
  assert.ok(read('scripts/build-course-data.mjs').includes(module), `gerador geral sem ${module}`);
}

const slides13 = checkLesson('13', lesson13, {
  slideCount: 21, localKit: true,
  resources: ['Canva', 'Photopea sem login', 'Aula13-Canva-Free.zip', 'CC BY', 'disco local'],
  observation: ['um de cada vez', 'créditos', 'Não depender de projetos anteriores'],
  minTypes: 5
});
const kit13 = 'modelos/producao-audiovisual/aula-13/';
for (const slide of slides13) {
  for (const file of [slide.resource?.href, ...(slide.resources || []).map(item => item.href), ...(slide.av9.images || []).map(item => item.src)].filter(Boolean)) {
    assert.ok(file.startsWith(kit13) && !file.includes('..'), `Aula 13: recurso fora do kit: ${file}`);
    assert.ok(fs.statSync(root + file.split('#')[0]).size > 0, `Aula 13: recurso ausente: ${file}`);
    if (file.includes('#')) assert.ok(read(file.split('#')[0]).includes(`id="${file.split('#')[1]}"`), `Aula 13: destino de ajuda ausente: ${file}`);
  }
}
for (const slide of slides13.filter(slide => /^Pedido \d/.test(slide.title))) {
  assert.equal(slide.promptLabel, 'Pronto quando');
  assert.ok(slide.av9.result && slide.av9.tags.some(tag => tag.label === 'TERMINOU ANTES?'));
  assert.ok(slide.resources.some(item => item.href.includes('AJUDA.html#')), `${slide.title}: precisa de ajuda acessível ao estudante`);
}
assert.ok(slides13.findIndex(slide => slide.title === 'Primeira transformação') < slides13.findIndex(slide => slide.pace === 'break'), 'Aula 13: a primeira composição deve acontecer antes do lanche');
const help13 = read(kit13 + 'AJUDA.html');
assert.ok(!/src="(?:https?:|\/\/)/.test(help13), 'Aula 13: ajuda sem dependências remotas');
assert.ok(help13.includes('https://www.photopea.com/') && help13.includes('https://www.canva.com/'));
assert.ok(!/Shotcut|\.mlt|Distance|White Balance/.test(JSON.stringify(lesson13)), 'Aula 13: sem instruções do editor anterior');
assert.ok(lesson13.lesson.observation.includes('imagem estática') && lesson13.lesson.observation.includes('O Canva exige conta'));
assert.ok(help13.includes('Magic Wand') && help13.includes('Contiguous') && help13.includes('Export As → PNG'));
assert.ok(!fs.existsSync(root + kit13 + 'Aula13-Shotcut.zip'), 'Aula 13: não distribuir kit antigo');
for (const section of ['preparo', 'camadas', 'recorte', 'compor', 'cor', 'estilo', 'exportar']) {
  assert.ok(help13.includes(`id="${section}"`));
}
const manifest13 = JSON.parse(read(kit13 + 'kit-manifest.json'));
assert.deepEqual(manifest13.files.map(item => item.name).sort(), ['COMECE-AQUI.txt', 'AJUDA.html', 'CREDITOS.txt', 'personagem-verde.mp4', 'personagem-cracha.mp4', 'cenario-estudio.png', 'cenario-noite.png', 'cor-referencia.mp4', 'cor-alterada.mp4', 'personagem-verde.png', 'personagem-cracha.png', 'personagem-recortado.png', 'telas/cor-referencia.jpg', 'telas/cor-alterada.jpg'].sort());
const zip13 = fs.readFileSync(root + kit13 + manifest13.zip);
assert.equal(zip13.length, manifest13.bytes);
assert.ok(zip13.length < 5 * 1024 * 1024, 'Aula 13: kit excessivamente grande');
// Read the actual stored ZIP entries and compare payloads, not just the manifest.
const entries13 = new Map();
for (let cursor = 0; zip13.readUInt32LE(cursor) === 0x04034b50;) {
  assert.equal(zip13.readUInt16LE(cursor + 8), 0, 'Aula 13: ZIP deve usar armazenamento sem compressão');
  const size = zip13.readUInt32LE(cursor + 18);
  const nameLength = zip13.readUInt16LE(cursor + 26);
  const start = cursor + 30 + nameLength + zip13.readUInt16LE(cursor + 28);
  const name = zip13.toString('utf8', cursor + 30, cursor + 30 + nameLength);
  entries13.set(name, zip13.subarray(start, start + size));
  cursor = start + size;
}
assert.equal(entries13.size, 14);
for (const item of manifest13.files) {
  const data = fs.readFileSync(root + kit13 + item.name);
  assert.equal(data.length, item.bytes);
  assert.equal(createHash('sha256').update(data).digest('hex'), item.sha256);
  assert.deepEqual(entries13.get('Aula13-Canva-Free/' + item.name), data, `Aula 13: ZIP diverge da mídia ${item.name}`);
  if (item.name.endsWith('.mp4')) {
    assert.equal(item.duration, 6);
    assert.equal(item.fps, '24/1');
    assert.equal(item.width, 1280);
    assert.equal(item.height, 720);
  }
}
assert.ok(read(kit13 + 'CREDITOS.txt').includes('creativecommons.org/licenses/by/3.0/'));
assert.ok(read(kit13 + 'index.html').includes('Aula13-Canva-Free.zip'));

// Aula 14: mixing on the kit's offline mesa, buffering only for network playback.
const slides14 = checkLesson('14', lesson14, {
  slideCount: 23, localKit: true,
  resources: ['Aula14-Som.zip', 'fones de ouvido', 'mesas digitalizadoras com caneta', 'o mouse faz as mesmas ações', 'sem internet e sem conta', 'CC BY', 'Nenhum programa precisa ser instalado'],
  observation: ['um de cada vez', 'Não depender de projetos anteriores', 'disco local', 'mesas digitalizadoras', 'caneta no suporte'],
  minTypes: 8
});
const kit14 = 'modelos/producao-audiovisual/aula-14/';
for (const slide of slides14) {
  const files = [...(slide.resources || []).map(item => item.href), ...(slide.av9.clips || []).flatMap(clip => [clip.src, clip.poster]), ...(slide.av9.images || []).map(item => item.src)];
  for (const file of files.filter(Boolean)) {
    assert.ok(file.startsWith(kit14) && !file.includes('..'), `Aula 14: recurso fora do kit: ${file}`);
    assert.ok(fs.statSync(root + file.split('#')[0]).size > 0, `Aula 14: recurso ausente: ${file}`);
    if (file.includes('#')) assert.ok(read(file.split('#')[0]).includes(`id="${file.split('#')[1]}"`), `Aula 14: destino de ajuda ausente: ${file}`);
  }
  assert.ok(!/copiar no caderno|Canva|Photopea|Shotcut|PA_A/.test(JSON.stringify(slide)), `${slide.title}: a aula 14 não depende de conta, ficha ou editor anterior`);
}
const requests14 = slides14.filter(slide => /^Pedido \d/.test(slide.title));
assert.equal(requests14.length, 7, 'Aula 14: sete pedidos do cliente');
assert.deepEqual([...new Set(requests14.map(slide => slide.block))], [1, 2, 3, 4], 'Aula 14: há pedido em todos os blocos');
for (const slide of requests14) {
  assert.equal(slide.promptLabel, 'Pronto quando', `${slide.title}: precisa do critério de pronto`);
  assert.ok(slide.av9.result && slide.av9.tags.some(tag => tag.label === 'TERMINOU ANTES?'), `${slide.title}: precisa de melhoria para quem termina antes`);
  assert.ok(slide.resources.some(item => item.href.includes('AJUDA.html#')), `${slide.title}: precisa de ajuda acessível ao estudante`);
}
assert.ok(slides14.findIndex(slide => slide.title.startsWith('Pedido 1')) < slides14.findIndex(slide => slide.pace === 'break'), 'Aula 14: a primeira mixagem acontece antes do lanche');
assert.ok(slides14.some(slide => slide.pace === 'extra'), 'Aula 14: banco de melhorias');
// Mesas digitalizadoras: familiarization before the first request, then the pen draws the music automation.
const pen14 = slides14.findIndex(slide => slide.title === 'Caneta na mão');
assert.ok(pen14 > 0 && pen14 < slides14.findIndex(slide => slide.title.startsWith('Pedido 1')) && slides14[pen14].block === 1, 'Aula 14: familiarização com a caneta antes do pedido 1');
const draw14 = slides14.find(slide => slide.title.startsWith('Pedido 4'));
assert.ok(/caneta/i.test(draw14.lede) && draw14.av9.commands.some(command => command.who === 'Usar o volume desenhado'), 'Aula 14: o pedido 4 é desenhado com a caneta');
assert.ok(/abaixamento automático/.test(draw14.av9.result) && /mouse/.test(draw14.teacher.rescue), 'Aula 14: alternativa sem caneta no pedido 4');
// "Mesa" alone is ambiguous with tablets in the room: the public layer names mesa de som or mesa digitalizadora.
const mesa14 = JSON.stringify(slides14.map(({teacher, ...slide}) => slide)).match(/\bmesa\b(?! de som| digitalizadora| inicial|\.html)/gi);
assert.equal(mesa14, null, 'Aula 14: "mesa" sem complemento na camada da turma');
for (const file of ['AJUDA.html', 'COMECE-AQUI.txt', 'index.html']) {
  const text = read('modelos/producao-audiovisual/aula-14/' + file).replace(/<[^>]+>/g, ' ');
  assert.equal(text.match(/\bmesa\b(?! de som| digitalizadora| inicial|\.html)/gi), null, `Aula 14: "mesa" sem complemento em ${file}`);
}
// Escuta crítica: the four layers on one 30 s timeline.
const layers14 = slides14.find(slide => slide.av9.type === 'tracks').av9.tracks;
assert.deepEqual(layers14.map(track => track.label), ['VOZ', 'TRILHA', 'AMBIÊNCIA', 'EFEITOS']);
for (const track of layers14) {
  assert.equal(track.clips.reduce((sum, clip) => sum + clip.seconds, 0), 30, `Aula 14: a trilha ${track.label} precisa somar 30 s`);
  // The renderer prints seconds as given: whole numbers avoid "3.5 s" on the projector.
  assert.ok(track.clips.every(clip => Number.isInteger(clip.seconds) && (!clip.label || clip.seconds >= 3)), `Aula 14: ${track.label} com duração fracionada ou cartão estreito`);
}
// Buffering names network playback; editor tools are named separately.
const editorTable14 = slides14.find(slide => slide.title === 'No editor não é buffering').av9.rows.map(row => row[0]);
assert.deepEqual(editorTable14, ['Resolução de preview', 'Cache', 'Proxy', 'Render de trecho']);
assert.ok(/rede/.test(lesson14.support.plainLanguage) && lesson14.support.check.some(item => item.includes('buffering só para reprodução em rede')));

const manifest14 = JSON.parse(read(kit14 + 'kit-manifest.json'));
assert.deepEqual(manifest14.files.map(item => item.name).sort(), ['AJUDA.html', 'COMECE-AQUI.txt', 'CREDITOS.txt', 'buffering.html', 'cena.mp4', 'mesa.html', 'sons.js', 'trilhas/ambiencia.mp3', 'trilhas/efeitos.mp3', 'trilhas/trilha.mp3', 'trilhas/voz.mp3'].sort());
const zip14 = fs.readFileSync(root + kit14 + manifest14.zip);
assert.equal(zip14.length, manifest14.bytes, 'Aula 14: ZIP diverge do manifesto; rode scripts/build-audiovisual-14-kit.py');
assert.ok(zip14.length < 10 * 1024 * 1024, 'Aula 14: kit excessivamente grande');
const entries14 = new Map();
for (let cursor = 0; zip14.readUInt32LE(cursor) === 0x04034b50;) {
  assert.equal(zip14.readUInt16LE(cursor + 8), 0, 'Aula 14: ZIP deve usar armazenamento sem compressão');
  const size = zip14.readUInt32LE(cursor + 18);
  const nameLength = zip14.readUInt16LE(cursor + 26);
  const start = cursor + 30 + nameLength + zip14.readUInt16LE(cursor + 28);
  entries14.set(zip14.toString('utf8', cursor + 30, cursor + 30 + nameLength), zip14.subarray(start, start + size));
  cursor = start + size;
}
assert.equal(entries14.size, manifest14.files.length);
for (const item of manifest14.files) {
  const data = fs.readFileSync(root + kit14 + item.name);
  assert.equal(createHash('sha256').update(data).digest('hex'), item.sha256, `Aula 14: ${item.name} mudou depois do ZIP; rode scripts/build-audiovisual-14-kit.py`);
  assert.deepEqual(entries14.get('Aula14-Som/' + item.name), data, `Aula 14: ZIP diverge de ${item.name}`);
  if (item.duration) assert.ok(Math.abs(item.duration - 30) < 0.1, `Aula 14: ${item.name} precisa durar 30 s`);
}
// The mesa reads every layer from sons.js, so it opens straight from the extracted folder.
const sounds14 = {window: {}};
vm.runInNewContext(read(kit14 + 'sons.js'), sounds14);
const data14 = sounds14.window.AULA14_SONS;
assert.deepEqual(Object.keys(data14.stems), ['voz', 'trilha', 'ambiencia', 'efeitos']);
for (const [name, url] of Object.entries(data14.stems)) {
  assert.ok(Buffer.from(url.split(',')[1], 'base64').equals(fs.readFileSync(root + kit14 + `trilhas/${name}.mp3`)), `Aula 14: sons.js diverge de trilhas/${name}.mp3`);
}
assert.deepEqual(plain(data14.falas), manifest14.falas);
assert.equal(data14.falas.length, 4);
assert.ok(data14.falas.every((fala, index) => fala.end > fala.start && (index === 0 || fala.start > data14.falas[index - 1].end) && fala.end < 30));
assert.equal(data14.clips.at(-1).end, 30);
for (const page of ['mesa.html', 'buffering.html', 'AJUDA.html', 'index.html']) {
  const html = read(kit14 + page);
  assert.ok(!/(?:src|href)="(?:https?:)?\/\//.test(html.replace(/href="https:\/\/(?:github\.com|creativecommons\.org)[^"]*"/g, '')), `Aula 14: ${page} sem dependências remotas`);
}
assert.ok(read(kit14 + 'mesa.html').includes('<script src="sons.js"></script>') && read(kit14 + 'mesa.html').includes('OfflineAudioContext'));
assert.ok(/touch-action: none/.test(read(kit14 + 'mesa.html')) && read(kit14 + 'mesa.html').includes('getCoalescedEvents'), 'Aula 14: área de desenho pronta para caneta');
const help14 = read(kit14 + 'AJUDA.html');
for (const section of ['preparo', 'caneta', 'mesa', 'medidor', 'falas', 'ruido', 'espaco', 'exportar', 'versoes', 'buffering', 'editor', 'tempo']) {
  assert.ok(help14.includes(`id="${section}"`), `Aula 14: ajuda sem a seção ${section}`);
}
const credits14 = read(kit14 + 'CREDITOS.txt');
assert.ok(credits14.includes('creativecommons.org/licenses/by/3.0/') && credits14.includes('Piper') && credits14.includes('CC0'));
assert.ok(read(kit14 + 'index.html').includes('Aula14-Som.zip'));
for (const file of ['exemplo-mixado.mp4', 'telas/voz-antes.jpg', 'telas/voz-depois.jpg', 'telas/cena.jpg']) assert.ok(fs.statSync(root + kit14 + file).size > 0, `Aula 14: ${file} ausente`);
assert.equal(manifest14.referencia.passa_alta, 120);

console.log('Aulas 09 a 14 AV: paridade dos dados, 170 minutos (45 + 55 + 40 + 30), lanche, kits locais, integridade dos ZIP das aulas 13 e 14, pedidos, linguagem e visuais validados.');
