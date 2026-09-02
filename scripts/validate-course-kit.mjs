import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const fromRoot = (file) => path.join(projectRoot, file);
const minutesForRange = (range) => {
  const [start, end] = range.split('-').map((value) => value.trim());
  const asMinutes = (value) => {
    const [hours, minutes] = value.split(':').map(Number);
    return (hours * 60) + minutes;
  };
  return asMinutes(end) - asMinutes(start);
};

const requiredFiles = [
  'index.html',
  'uc-design-web.html',
  'uc-producao-audiovisual.html',
  'aula-kit.html',
  'assets/course-kit.css',
  'assets/course-data.js',
  'assets/course-support.js',
  'assets/course-hub.js',
  'assets/course-lesson.js',
  'GUIA_RAPIDO_DESIGN_WEB_E_AUDIOVISUAL.md',
  'modelos/design-web/site-base/index.html',
  'modelos/design-web/site-base/styles.css',
  'modelos/design-web/site-base/script.js',
  'modelos/design-web/materiais-de-aula/index.html',
  'modelos/producao-audiovisual/index.html'
];

const errors = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(fromRoot(file))) errors.push(`Arquivo ausente: ${file}`);
}

const context = { window: {} };
vm.createContext(context);

for (const file of ['assets/course-data.js', 'assets/course-support.js']) {
  vm.runInContext(fs.readFileSync(fromRoot(file), 'utf8'), context, { filename: file });
}

const expected = {
  'design-web': 29,
  'producao-audiovisual': 23
};

let totalLessons = 0;
let totalBlocks = 0;

for (const [slug, expectedCount] of Object.entries(expected)) {
  const course = context.window.SENAI_COURSES?.[slug];
  const support = context.window.SENAI_TEACHING_SUPPORT?.[slug];

  if (!course) {
    errors.push(`UC ausente nos dados: ${slug}`);
    continue;
  }
  if (!support) {
    errors.push(`UC ausente no apoio docente: ${slug}`);
    continue;
  }
  if (course.lessons.length !== expectedCount) {
    errors.push(`${slug}: esperadas ${expectedCount} aulas, encontradas ${course.lessons.length}`);
  }

  if (slug === 'producao-audiovisual') {
    const phaseEntries = Object.values(support.courseTips?.phases || {});
    const phaseLessonNumbers = phaseEntries.flatMap((phase) => phase.lessons || []);
    const expectedLessonNumbers = course.lessons.map((lesson) => lesson.num);

    for (const phase of phaseEntries) {
      if ((phase.routine || []).length < 2) errors.push(`${slug}: fase sem rotina suficiente`);
      if ((phase.commonProblems || []).length < 3) errors.push(`${slug}: fase sem problemas e respostas suficientes`);
    }
    if (new Set(phaseLessonNumbers).size !== phaseLessonNumbers.length) {
      errors.push(`${slug}: uma aula aparece em mais de uma fase de apoio`);
    }
    if (
      phaseLessonNumbers.length !== expectedLessonNumbers.length
      || expectedLessonNumbers.some((lessonNumber) => !phaseLessonNumbers.includes(lessonNumber))
    ) {
      errors.push(`${slug}: as fases de apoio não cobrem as ${expectedLessonNumbers.length} aulas`);
    }

    const lesson01 = course.lessons.find((lesson) => lesson.num === '01');
    const lesson01Support = support.lessons?.['01'];
    if (lesson01Support?.blocks?.length !== lesson01?.schedule.length) {
      errors.push(`${slug}/01: os quatro blocos precisam de orientação específica`);
    }
    if (lesson01Support?.blocks?.some((block) => (block.studentSteps || []).length < 4)) {
      errors.push(`${slug}/01: bloco com instruções insuficientes para a turma`);
    }
    if (lesson01Support?.blocks?.some((block) => (block.teacherSteps || []).length < 4)) {
      errors.push(`${slug}/01: bloco sem condução docente detalhada`);
    }
    lesson01Support?.blocks?.forEach((block, index) => {
      const plannedMinutes = (block.teacherSteps || []).reduce((total, step) => {
        const match = step.match(/^(\d+) min\b/);
        return total + (match ? Number(match[1]) : 0);
      }, 0);
      const availableMinutes = minutesForRange(lesson01.schedule[index].horario);
      if (plannedMinutes !== availableMinutes) {
        errors.push(`${slug}/01: Bloco ${index + 1} planeja ${plannedMinutes} min para ${availableMinutes} min disponíveis`);
      }
    });
    if ((lesson01Support?.studentSheet?.sections || []).length < 3) {
      errors.push(`${slug}/01: ficha guiada incompleta`);
    }
    if (!lesson01Support?.review?.intro?.includes('Não formam nota')) {
      errors.push(`${slug}/01: conferência formativa sem limite explícito de pontuação`);
    }
    if ((lesson01Support?.check || []).length > 4) {
      errors.push(`${slug}/01: conferência final excessivamente rígida`);
    }
    if (!lesson01Support?.studentSheet?.href?.includes('#leitura-aula-01')) {
      errors.push(`${slug}/01: link para a ficha preenchível ausente`);
    }
    if (!lesson01?.observation?.includes('mesa digitalizadora')) {
      errors.push(`${slug}/01: margem técnica da mesa digitalizadora ausente`);
    }

    const lesson04 = course.lessons.find((lesson) => lesson.num === '04');
    const lesson04Support = support.lessons?.['04'];
    const lesson04Slides = lesson04Support?.presentationSlides || [];
    const lesson04ActivityTitles = [
      'Atividade 1 · Roteiro em seis linhas',
      'Atividade 2 · Storyboard em seis quadros',
      'Conferência do grupo',
      'Corrigir e mostrar'
    ];
    const lesson04Text = JSON.stringify({ lesson: lesson04, support: lesson04Support })
      .toLocaleLowerCase('pt-BR');

    if (lesson04Slides.length !== 9 || lesson04Support?.appendDefaultClosing !== false) {
      errors.push(`${slug}/04: a apresentação precisa ter exatamente 10 slides controlados (capa + 9 slides próprios)`);
    }
    if (lesson04Slides[4]?.title !== 'Atividade 1 · Roteiro em seis linhas') {
      errors.push(`${slug}/04: o slide 6 precisa iniciar a prática guiada de roteiro`);
    }
    if (lesson04Text.includes('discussão orientada')) {
      errors.push(`${slug}/04: a aula não pode depender de discussão orientada`);
    }
    if (lesson04Support?.studentSheet || lesson04Slides.some((item) => item.resource || item.resources)) {
      errors.push(`${slug}/04: a aula não pode exigir ficha, link ou material externo`);
    }
    if (!lesson04?.resources?.includes('caderno ou folhas em branco')) {
      errors.push(`${slug}/04: os únicos materiais discentes devem ser caderno ou folhas em branco`);
    }
    if (!lesson04?.resources?.includes('Nenhum arquivo, ficha preenchível')) {
      errors.push(`${slug}/04: a independência de arquivo ou ficha precisa estar explícita`);
    }
    for (const activityTitle of lesson04ActivityTitles) {
      const activitySlide = lesson04Slides.find((item) => item.title === activityTitle);
      if (!activitySlide || (activitySlide.cards || []).length < 4 || (activitySlide.bullets || []).length < 2) {
        errors.push(`${slug}/04: ${activityTitle} precisa trazer passos e critérios completos no próprio slide`);
      }
    }
    if ((lesson04Support?.check || []).length < 5) {
      errors.push(`${slug}/04: conferência final insuficiente`);
    }
    if (!fs.readFileSync(fromRoot('scripts/build-course-data.mjs'), 'utf8').includes('const audiovisualLesson04')) {
      errors.push(`${slug}/04: personalização regenerável ausente do gerador`);
    }

    const lesson05 = course.lessons.find((lesson) => lesson.num === '05');
    const lesson05Support = support.lessons?.['05'];
    const lesson05Slides = lesson05Support?.presentationSlides || [];
    const lesson05ActivityTitles = [
      'Atividade 1 · Ficha de autorização',
      'Atividade 2 · Autorização gravada',
      'Conferência do grupo',
      'Corrigir, nomear e devolver'
    ];

    if (lesson05Slides.length !== 11 || lesson05Support?.appendDefaultClosing !== false) {
      errors.push(`${slug}/05: a apresentação precisa ter exatamente 12 slides controlados (capa + 11 slides próprios)`);
    }
    if (lesson05Slides[6]?.title !== 'Atividade 1 · Ficha de autorização') {
      errors.push(`${slug}/05: o slide 8 precisa iniciar a prática guiada da ficha de autorização`);
    }
    if (!lesson05Slides.some((item) => item.pace === 'break')) {
      errors.push(`${slug}/05: o intervalo precisa de slide próprio para não acusar atraso no indicador de ritmo`);
    }
    if (lesson05Support?.studentSheet || lesson05Slides.some((item) => item.resource || item.resources)) {
      errors.push(`${slug}/05: a aula não pode exigir ficha impressa, link ou material externo`);
    }
    for (const activityTitle of lesson05ActivityTitles) {
      const activitySlide = lesson05Slides.find((item) => item.title === activityTitle);
      if (!activitySlide || (activitySlide.cards || []).length < 4 || (activitySlide.bullets || []).length < 2) {
        errors.push(`${slug}/05: ${activityTitle} precisa trazer passos e critérios completos no próprio slide`);
      }
    }
    if ((lesson05Support?.check || []).length < 5) {
      errors.push(`${slug}/05: conferência final insuficiente`);
    }
    if (!lesson05?.resources?.includes('7 câmeras') || !lesson05?.resources?.includes('7 ring lights')) {
      errors.push(`${slug}/05: a divisão em 7 grupos precisa acompanhar as 7 câmeras e as 7 ring lights`);
    }
    if (!lesson05?.observation?.includes('não substitui o modelo de autorização da escola')) {
      errors.push(`${slug}/05: o limite pedagógico da ficha precisa estar explícito`);
    }
    if (!lesson05?.observation?.includes('apague antes do fim da aula')) {
      errors.push(`${slug}/05: a tomada com rosto identificável precisa de prazo de guarda explícito`);
    }
    if (!lesson05?.observation?.includes('não formate o cartão')) {
      errors.push(`${slug}/05: o apagamento precisa poupar material de outras turmas no mesmo cartão`);
    }
    if (!fs.readFileSync(fromRoot('scripts/build-course-data.mjs'), 'utf8').includes('const audiovisualLesson05')) {
      errors.push(`${slug}/05: personalização regenerável ausente do gerador`);
    }

    const lesson06 = course.lessons.find((lesson) => lesson.num === '06');
    const lesson06Support = support.lessons?.['06'];
    const lesson06Slides = lesson06Support?.presentationSlides || [];
    const lesson06ActivityTitles = [
      'Atividade 1 · O plano que revela',
      'Quadro para copiar',
      'Atividade 2 · O teste do olho novo',
      'Conferência do grupo',
      'Devolver e fechar'
    ];
    const lesson06PublicSlideText = lesson06Slides.map((slide) => [
      slide.title,
      slide.kicker,
      slide.heading,
      slide.lede,
      slide.prompt,
      ...(slide.bullets || []),
      ...(slide.cards || []).flatMap((card) => [card.eyebrow, card.title, card.text])
    ].join('\n')).join('\n');
    const lesson06PublicText = `${JSON.stringify({
      description: lesson06?.description,
      schedule: lesson06?.schedule,
      methodology: lesson06?.methodology,
      resources: lesson06?.resources
    })}\n${lesson06PublicSlideText}`.toLocaleLowerCase('pt-BR');

    if (lesson06Slides.length !== 11 || lesson06Support?.appendDefaultClosing !== false) {
      errors.push(`${slug}/06: a apresentação precisa ter exatamente 12 slides controlados (capa + 11 slides próprios)`);
    }
    if (lesson06Slides[6]?.title !== 'Atividade 1 · O plano que revela') {
      errors.push(`${slug}/06: o slide da prática precisa iniciar as três tomadas no posto`);
    }
    if (!lesson06Slides.some((item) => item.pace === 'break')) {
      errors.push(`${slug}/06: o intervalo precisa de slide próprio para não acusar atraso no indicador de ritmo`);
    }
    if (lesson06Support?.studentSheet || lesson06Slides.some((item) => item.resource || item.resources)) {
      errors.push(`${slug}/06: a aula não pode exigir ficha impressa, link ou material externo`);
    }
    for (const activityTitle of lesson06ActivityTitles) {
      const activitySlide = lesson06Slides.find((item) => item.title === activityTitle);
      if (!activitySlide || (activitySlide.cards || []).length !== 4) {
        errors.push(`${slug}/06: ${activityTitle} precisa de quatro cartões no próprio slide`);
      }
    }
    for (const titled of ['Atividade 1 · O plano que revela', 'Atividade 2 · O teste do olho novo', 'Conferência do grupo']) {
      const activitySlide = lesson06Slides.find((item) => item.title === titled);
      if (!activitySlide || (activitySlide.bullets || []).length < 2) {
        errors.push(`${slug}/06: ${titled} precisa trazer o critério de conclusão no próprio slide`);
      }
    }
    if (lesson06Slides.some((slide) => (slide.cards || []).length > 4)) {
      errors.push(`${slug}/06: nenhum slide pode passar de quatro cartões no projetor 5:4`);
    }
    if ((lesson06Support?.check || []).length < 5) {
      errors.push(`${slug}/06: conferência final insuficiente`);
    }
    if (!lesson06?.resources?.includes('7 câmeras') || !lesson06?.resources?.includes('7 ring lights')) {
      errors.push(`${slug}/06: a divisão em 7 grupos precisa acompanhar as 7 câmeras e as 7 ring lights`);
    }
    if (!lesson06?.resources?.includes('Nenhum programa precisa ser instalado')) {
      errors.push(`${slug}/06: a aula não pode depender de instalação no Windows`);
    }
    if (!lesson06?.resources?.includes('Nenhuma ficha impressa')) {
      errors.push(`${slug}/06: a independência de impressão precisa estar explícita`);
    }
    if (!lesson06?.observation?.includes('22:10') || !lesson06?.observation?.includes('19:45')) {
      errors.push(`${slug}/06: o horário 19:00, lanche 19:45 e fim 22:10 precisa estar explícito`);
    }
    if (!lesson06?.observation?.includes('permanece na mesa')) {
      errors.push(`${slug}/06: o posto fixo precisa estar explícito`);
    }
    if (!lesson06?.observation?.includes('não formate o cartão')) {
      errors.push(`${slug}/06: o apagamento precisa poupar material de outras turmas no mesmo cartão`);
    }
    if (!lesson06?.observation?.includes('Visualizador de Fotos')) {
      errors.push(`${slug}/06: a alternativa sem editor online precisa estar explícita`);
    }
    for (const forbidden of ['plongée', 'contra-plongée', 'circuito', 'estações', 'cartões com planos']) {
      if (lesson06PublicText.includes(forbidden)) {
        errors.push(`${slug}/06: permaneceu "${forbidden}" na camada da turma`);
      }
    }
    if (/\b(pátio|quadra|estacionamento|rua|externa|fora da escola)\b/i.test(lesson06PublicText)) {
      errors.push(`${slug}/06: a noite inteira acontece no laboratório, sem ambiente fora da unidade`);
    }
    if (!lesson06PublicText.includes('olho novo')) {
      errors.push(`${slug}/06: o teste de leitura por quem não viu a gravação precisa aparecer para a turma`);
    }
    for (const required of ['foco', 'revelação', 'oito segundos']) {
      if (!lesson06PublicText.includes(required)) {
        errors.push(`${slug}/06: falta "${required}" na camada da turma`);
      }
    }
    if (!(lesson06Support?.check || []).some((item) => /olho novo|revelação/i.test(item))) {
      errors.push(`${slug}/06: a conferência final precisa cobrar o resultado da revelação`);
    }
    if (/\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2}/.test(lesson06PublicSlideText)) {
      errors.push(`${slug}/06: o slide da turma não pode carregar faixa de horário`);
    }
    if (/\d+\s*min\s*·/.test(lesson06PublicSlideText)) {
      errors.push(`${slug}/06: o slide da turma não pode cronometrar a condução`);
    }
    if (/deixe este slide parado/i.test(lesson06PublicSlideText)) {
      errors.push(`${slug}/06: o slide da turma não pode instruir o professor a manter a projeção`);
    }
    if (/\b(sou eu|abro a página|olho a parada|na minha mesa|me chamar)\b/i.test(lesson06PublicSlideText)) {
      errors.push(`${slug}/06: o slide da turma não pode falar na voz do professor`);
    }
    if (lesson06Slides.some((slide) => slide.prompt && !slide.promptLabel)) {
      errors.push(`${slug}/06: prompt da turma precisa de rótulo próprio, não o padrão do kit`);
    }
    const lesson06StepMinutes = (slide) => (slide.teacher?.steps || []).reduce((total, step) => {
      const match = String(step).match(/^(\d+) min\b/);
      return total + (match ? Number(match[1]) : 0);
    }, 0);
    const lesson06BlockMinutes = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const slide of lesson06Slides) {
      if (slide.pace === 'break') continue;
      lesson06BlockMinutes[slide.block] += lesson06StepMinutes(slide);
    }
    if (
      lesson06BlockMinutes[1] !== 45
      || lesson06BlockMinutes[2] !== 50
      || lesson06BlockMinutes[3] !== 45
      || lesson06BlockMinutes[4] !== 30
    ) {
      errors.push(`${slug}/06: os passos do professor precisam fechar 45+50+45+30 min, vieram ${lesson06BlockMinutes[1]}+${lesson06BlockMinutes[2]}+${lesson06BlockMinutes[3]}+${lesson06BlockMinutes[4]}`);
    }
    if (!fs.readFileSync(fromRoot('scripts/build-course-data.mjs'), 'utf8').includes('const audiovisualLesson06')) {
      errors.push(`${slug}/06: personalização regenerável ausente do gerador`);
    }
  }

  if (slug === 'design-web') {
    const onlineEntries = support.courseTips?.onlineRoutines || [];
    const onlineLessonNumbers = onlineEntries.flatMap((item) => item.lessons || []);
    const expectedLessonNumbers = course.lessons.map((lesson) => lesson.num);

    if (onlineEntries.some((item) => !item.text)) errors.push(`${slug}: rotina online sem texto`);
    if (new Set(onlineLessonNumbers).size !== onlineLessonNumbers.length) {
      errors.push(`${slug}: uma aula aparece em mais de uma rotina online`);
    }
    if (
      onlineLessonNumbers.length !== expectedLessonNumbers.length
      || expectedLessonNumbers.some((lessonNumber) => !onlineLessonNumbers.includes(lessonNumber))
    ) {
      errors.push(`${slug}: as rotinas online não cobrem as ${expectedLessonNumbers.length} aulas`);
    }
  }

  totalLessons += course.lessons.length;

  for (const lesson of course.lessons) {
    const lessonSupport = support.lessons?.[lesson.num];
    totalBlocks += lesson.schedule.length;

    if (lesson.schedule.length !== 4) {
      errors.push(`${slug}/${lesson.num}: esperados 4 blocos, encontrados ${lesson.schedule.length}`);
    }
    if (!lesson.objectives?.length) errors.push(`${slug}/${lesson.num}: objetivo de conhecimento ausente`);
    if (!lesson.technical?.length) errors.push(`${slug}/${lesson.num}: capacidade técnica ausente`);
    if (!lesson.socioemotional?.length) errors.push(`${slug}/${lesson.num}: capacidade socioemocional ausente`);
    if (lesson.schedule.some((block) => /^Chamada\./i.test(block.atividade))) {
      errors.push(`${slug}/${lesson.num}: marcador repetitivo "Chamada." permaneceu na camada pública`);
    }

    const teacherStagePatterns = [
      [/\bo professor\b/i, '"o professor"'],
      [/\bDemonstração ao vivo no projetor\b/i, '"Demonstração ao vivo no projetor"'],
      [/\bDemonstração curta no projetor\b/i, '"Demonstração curta no projetor"'],
      [/\bsem debate\b/i, '"sem debate"'],
      [/\bdevolutiva objetiva\b/i, '"devolutiva objetiva"'],
      [/\bcena clássica\b/i, '"cena clássica"'],
      [/\bsem material impresso\b/i, '"sem material impresso"'],
      [/\bjunto com a turma\b/i, '"junto com a turma"'],
      [/\b[Pp]reencher a ficha\b/, '"Preencher a ficha"'],
      [/\bficha digital da Aula 02\b/i, '"ficha digital da Aula 02"']
    ];
    lesson.schedule.forEach((block, index) => {
      for (const [pattern, label] of teacherStagePatterns) {
        if (pattern.test(block.atividade)) {
          errors.push(`${slug}/${lesson.num} bloco ${index + 1}: camada pública com instrução ao professor (${label}); reescreva na voz do estudante`);
        }
      }
    });

    if (!lessonSupport) {
      errors.push(`${slug}/${lesson.num}: apoio docente ausente`);
      continue;
    }

    for (const field of ['teacherGoal', 'plainLanguage', 'say', 'studentDeliverable', 'fallback']) {
      if (!lessonSupport[field]) errors.push(`${slug}/${lesson.num}: campo ${field} ausente`);
    }
    if (!lessonSupport.demo?.length) errors.push(`${slug}/${lesson.num}: demonstração ausente`);
    if (!lessonSupport.check?.length) errors.push(`${slug}/${lesson.num}: critérios ausentes`);
  }
}

const publicFiles = [
  'README.md',
  'GUIA_RAPIDO_DESIGN_WEB_E_AUDIOVISUAL.md',
  'index.html',
  'aula-kit.html',
  'uc-design-web.html',
  'uc-producao-audiovisual.html',
  'assets/course-data.js',
  'assets/course-hub.js',
  'assets/course-lesson.js',
  'modelos/design-web/materiais-de-aula/index.html',
  'modelos/producao-audiovisual/index.html',
  'modelos/design-web/site-base/README.md',
  'modelos/design-web/site-base/index.html'
];

const forbiddenPublicPhrases = [
  'kit docente',
  'fala pronta',
  'fala sugerida',
  'modo professor',
  'promessa do modo professor',
  'aulas ministráveis',
  'objetivo docente',
  'você demonstra',
  'o que você precisa conseguir ensinar',
  'socorro rápido',
  'erros comuns e plano b'
];

for (const file of publicFiles) {
  const content = fs.readFileSync(fromRoot(file), 'utf8').toLocaleLowerCase('pt-BR');
  for (const phrase of forbiddenPublicPhrases) {
    if (content.includes(phrase)) errors.push(`${file}: expressão pública proibida "${phrase}"`);
  }
}

const designToolFiles = [
  'assets/course-hub.js',
  'GUIA_RAPIDO_DESIGN_WEB_E_AUDIOVISUAL.md'
];
const requiredDesignTools = [
  'https://www.photopea.com/'
];

for (const toolUrl of requiredDesignTools) {
  if (!designToolFiles.some((file) => fs.readFileSync(fromRoot(file), 'utf8').includes(toolUrl))) {
    errors.push(`Ferramenta sem login ausente dos materiais: ${toolUrl}`);
  }
}

const courseDataText = fs.readFileSync(fromRoot('assets/course-data.js'), 'utf8');
for (const loginDependentSuggestion of ['Kahoot', 'Google Formulários', 'Figma', 'Canva', 'GitHub Pages', 'criação da conta']) {
  if (courseDataText.includes(loginDependentSuggestion)) {
    errors.push(`Sugestão dependente de conta permaneceu no planejamento: ${loginDependentSuggestion}`);
  }
}

const noCodeStudentPatterns = [
  /instalar (?:o )?(?:vs code|editor de código)/i,
  /(?:digite|escreva|copie|vamos escrever|vocês escreverão) (?:o |um |uma )?(?:código|html|css|javascript|sintaxe)/i,
  /criar (?:os? )?(?:arquivos? )?(?:index\.html|styles\.css|script\.js)/i,
  /(?:implementar|programar) (?:com |em )?(?:html|css|javascript)/i,
  /escreva uma media query/i,
  /(?:display:\s*grid|justify-content|addEventListener)/i
];

const designCourse = context.window.SENAI_COURSES['design-web'];
const designLessonOne = designCourse.lessons.find((lesson) => lesson.num === '01');
const designLessonOneSupport = context.window.SENAI_TEACHING_SUPPORT['design-web']?.lessons?.['01'];
if (designLessonOne?.title !== 'Primeiro Contato com Design Web') {
  errors.push('Design Web Aula 01: título introdutório revisado ausente');
}
if (!Array.isArray(designLessonOneSupport?.presentationSlides) || designLessonOneSupport.presentationSlides.length < 12) {
  errors.push('Design Web Aula 01: sequência explicativa deve ter pelo menos 12 slides próprios');
}

const designLessonFive = designCourse.lessons.find((lesson) => lesson.num === '05');
const designLessonFiveSupport = context.window.SENAI_TEACHING_SUPPORT['design-web']?.lessons?.['05'];
const designLessonFiveSlides = designLessonFiveSupport?.presentationSlides || [];
const designLessonFiveActivityTitles = [
  'Atividade 1 · Escolher e anotar',
  'Atividade 2 · Texto da imagem',
  'Atividade 3 · Montar o painel',
  'Conferência da dupla'
];
const designLessonFiveText = JSON.stringify({
  lesson: designLessonFive,
  support: designLessonFiveSupport
}).toLocaleLowerCase('pt-BR');

if (designLessonFiveSlides.length !== 11 || designLessonFiveSupport?.appendDefaultClosing !== false) {
  errors.push('Design Web Aula 05: a apresentação precisa ter exatamente 12 slides controlados (capa + 11 slides próprios)');
}
if (!designLessonFiveSlides.some((item) => item.pace === 'break')) {
  errors.push('Design Web Aula 05: o intervalo precisa de slide próprio');
}
if (designLessonFiveSupport?.studentSheet || designLessonFiveSlides.some((item) => item.resource || item.resources)) {
  errors.push('Design Web Aula 05: a aula não pode exigir ficha, link ou material externo');
}
if (!designLessonFive?.resources?.includes('caderno e caneta')) {
  errors.push('Design Web Aula 05: o material discente precisa ser caderno e caneta');
}
if (!designLessonFive?.resources?.includes('Sem impressão')) {
  errors.push('Design Web Aula 05: a independência de impressão precisa estar explícita');
}
for (const activityTitle of designLessonFiveActivityTitles) {
  const activitySlide = designLessonFiveSlides.find((item) => item.title === activityTitle);
  if (!activitySlide || (activitySlide.cards || []).length < 4 || (activitySlide.bullets || []).length < 2) {
    errors.push(`Design Web Aula 05: ${activityTitle} precisa trazer passos e critérios completos no próprio slide`);
  }
}
if ((designLessonFiveSupport?.check || []).length < 5) {
  errors.push('Design Web Aula 05: conferência final insuficiente');
}
if (designLessonFiveText.includes('ficha impressa') || designLessonFiveText.includes('photopea') || designLessonFiveText.includes('http')) {
  errors.push('Design Web Aula 05: permaneceu dependência de ficha impressa, Photopea ou link externo');
}
if (!fs.readFileSync(fromRoot('scripts/rebuild-design-web-no-code.mjs'), 'utf8').includes("support['design-web'].lessons['05'] =")) {
  errors.push('Design Web Aula 05: personalização regenerável ausente do rebuild');
}

const designLessonFiveStepMinutes = (slide) => (slide.teacher?.steps || []).reduce((total, step) => {
  const match = String(step).match(/^(\d+) min\b/);
  return total + (match ? Number(match[1]) : 0);
}, 0);
const designLessonFiveBlockMinutes = { 1: 0, 2: 0, 3: 0, 4: 0 };
for (const slide of designLessonFiveSlides) {
  if (slide.pace === 'break') continue;
  designLessonFiveBlockMinutes[slide.block] += designLessonFiveStepMinutes(slide);
}
if (designLessonFiveBlockMinutes[1] !== 45 || designLessonFiveBlockMinutes[2] !== 45 || designLessonFiveBlockMinutes[3] !== 40 || designLessonFiveBlockMinutes[4] !== 37) {
  errors.push(`Design Web Aula 05: os passos do professor precisam fechar 45+45+40+37 min, vieram ${designLessonFiveBlockMinutes[1]}+${designLessonFiveBlockMinutes[2]}+${designLessonFiveBlockMinutes[3]}+${designLessonFiveBlockMinutes[4]}`);
}
if (!designLessonFive?.observation?.includes('19:00') || !designLessonFive?.observation?.includes('19:45') || !designLessonFive?.observation?.includes('22:07')) {
  errors.push('Design Web Aula 05: o horário 19:00, lanche 19:45 e fim 22:07 precisa estar explícito');
}
if (designLessonFiveSlides.some((slide) => /gabarito rápido/i.test(JSON.stringify(slide.cards || []) + JSON.stringify(slide.bullets || []) + (slide.lede || '') + (slide.prompt || '')))) {
  errors.push('Design Web Aula 05: o gabarito não pode aparecer no slide da turma');
}
if (/\bring lights?\b|autorização falada|ficha de autorização/.test(designLessonFiveText)) {
  errors.push('Design Web Aula 05: material de Produção Audiovisual não pode entrar nesta aula');
}

for (const lesson of designCourse.lessons) {
  const studentFacingText = JSON.stringify({
    title: lesson.title,
    description: lesson.description,
    schedule: lesson.schedule,
    methodology: lesson.methodology,
    resources: lesson.resources
  });
  for (const pattern of noCodeStudentPatterns) {
    if (pattern.test(studentFacingText)) {
      errors.push(`Design Web Aula ${lesson.num}: prática de programação permaneceu (${pattern})`);
    }
  }
}

const designWorkbookText = fs.readFileSync(
  fromRoot('modelos/design-web/materiais-de-aula/index.html'),
  'utf8'
);
if (!designWorkbookText.includes('id="aula-01-introducao"')) {
  errors.push('Design Web Aula 01: ficha introdutória preenchível ausente');
}
for (const staleMarker of [
  'Escreva uma media query',
  'HTML semântico',
  'CSS e responsividade',
  'id="delivery-html"',
  'id="delivery-css"'
]) {
  if (designWorkbookText.includes(staleMarker)) {
    errors.push(`Design Web: avaliação antiga orientada a código permaneceu (${staleMarker})`);
  }
}

const audiovisualWorkbookText = fs.readFileSync(
  fromRoot('modelos/producao-audiovisual/index.html'),
  'utf8'
);
for (const marker of [
  'id="leitura-aula-01"',
  'value="aula-01"',
  'PA_A01_EQ##_FORMATO_01.mp4'
]) {
  if (!audiovisualWorkbookText.includes(marker)) {
    errors.push(`Produção Audiovisual Aula 01: material ausente (${marker})`);
  }
}

const assessmentWorkbooks = [
  {
    label: 'Design Web',
    file: 'modelos/design-web/materiais-de-aula/index.html',
    markers: ['id="prova-a"', 'id="prova-b"', 'id="gabarito"', 'id="recuperacao"'],
    groupPattern: /name="exam-[ab]-q\d+"/g
  },
  {
    label: 'Produção Audiovisual',
    file: 'modelos/producao-audiovisual/index.html',
    markers: ['id="prova-a"', 'id="prova-b"', 'id="gabarito-a"', 'id="gabarito-b"', 'id="recuperacao"'],
    groupPattern: /name="prova-[ab]-q\d+"/g
  }
];

for (const workbook of assessmentWorkbooks) {
  const content = fs.readFileSync(fromRoot(workbook.file), 'utf8');
  for (const marker of workbook.markers) {
    if (!content.includes(marker)) errors.push(`${workbook.label}: instrumento ausente (${marker})`);
  }

  const groupNames = content.match(workbook.groupPattern) || [];
  const uniqueGroups = new Set(groupNames);
  if (uniqueGroups.size !== 20) {
    errors.push(`${workbook.label}: esperados 20 grupos de questões, encontrados ${uniqueGroups.size}`);
  }
  if (groupNames.length !== 80) {
    errors.push(`${workbook.label}: esperadas 80 alternativas, encontradas ${groupNames.length}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Planejamento válido: ${totalLessons} aulas, ${totalBlocks} blocos, capacidades, ferramentas sem login, provas e materiais conferidos.`);
