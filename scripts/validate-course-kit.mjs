import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const fromRoot = (file) => path.join(projectRoot, file);

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
  'https://dontpad.com.br/',
  'https://livecodes.io/',
  'https://app.netlify.com/drop',
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
