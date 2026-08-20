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
