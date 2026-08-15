(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const courseSlug = params.get('uc') || '';
  const lessonNumber = String(params.get('aula') || '').padStart(2, '0');
  const course = window.SENAI_COURSES && window.SENAI_COURSES[courseSlug];
  const courseSupport = window.SENAI_TEACHING_SUPPORT && window.SENAI_TEACHING_SUPPORT[courseSlug];
  const lesson = course && course.lessons.find((item) => item.num === lessonNumber);
  const support = courseSupport && courseSupport.lessons[lessonNumber];

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const listHtml = (items, className = '') => `
    <ul class="${className}">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>`;

  const timeToMinutes = (value) => {
    const [hours, minutes] = String(value).trim().split(':').map(Number);
    return hours * 60 + minutes;
  };

  const timeRange = (range) => String(range)
    .split(/\s*[-–—]\s*/)
    .map((value) => value.trim());

  const minutesBetween = (range) => {
    const [start, end] = timeRange(range);
    return Math.max(1, timeToMinutes(end) - timeToMinutes(start));
  };

  const firstPersonVerbs = {
    abandone: 'abandono',
    aceite: 'aceito',
    adapte: 'adapto',
    adicione: 'adiciono',
    agrupe: 'agrupo',
    ajude: 'ajudo',
    ajuste: 'ajusto',
    altere: 'altero',
    antecipe: 'antecipo',
    aplique: 'aplico',
    anote: 'anoto',
    anime: 'animo',
    abra: 'abro',
    apresente: 'apresento',
    aproxime: 'aproximo',
    assista: 'assisto',
    ative: 'ativo',
    atualize: 'atualizo',
    aumente: 'aumento',
    avalie: 'avalio',
    abaixe: 'abaixo',
    baixe: 'baixo',
    bloqueie: 'bloqueio',
    capte: 'capto',
    carregue: 'carrego',
    circule: 'circulo',
    classifique: 'classifico',
    combine: 'combino',
    comece: 'começo',
    compare: 'comparo',
    confirme: 'confirmo',
    confira: 'confiro',
    configure: 'configuro',
    conecte: 'conecto',
    construa: 'construo',
    conte: 'conto',
    conduza: 'conduzo',
    congele: 'congelo',
    controle: 'controlo',
    converta: 'converto',
    copie: 'copio',
    corrija: 'corrijo',
    crie: 'crio',
    cronometre: 'cronometro',
    decida: 'decido',
    defina: 'defino',
    dê: 'dou',
    deixe: 'deixo',
    dependa: 'dependo',
    desative: 'desativo',
    desenhe: 'desenho',
    descreva: 'descrevo',
    destaque: 'destaco',
    diga: 'digo',
    digite: 'digito',
    distribua: 'distribuo',
    dobre: 'dobro',
    duplique: 'duplico',
    edite: 'edito',
    empilhe: 'empilho',
    ensaie: 'ensaio',
    ensine: 'ensino',
    entregue: 'entrego',
    escolha: 'escolho',
    escreva: 'escrevo',
    escute: 'escuto',
    estruture: 'estruturo',
    evite: 'evito',
    execute: 'executo',
    exiba: 'exibo',
    explique: 'explico',
    exporte: 'exporto',
    faça: 'faço',
    feche: 'fecho',
    finalize: 'finalizo',
    foque: 'foco',
    forneça: 'forneço',
    grave: 'gravo',
    identifique: 'identifico',
    implemente: 'implemento',
    imponha: 'imponho',
    improvise: 'improviso',
    inclua: 'incluo',
    insira: 'insiro',
    integre: 'integro',
    interrompa: 'interrompo',
    leia: 'leio',
    leve: 'levo',
    limpe: 'limpo',
    limite: 'limito',
    liste: 'listo',
    mantenha: 'mantenho',
    marque: 'marco',
    misture: 'misturo',
    modele: 'modelo',
    monte: 'monto',
    mostre: 'mostro',
    mova: 'movo',
    mude: 'mudo',
    navegue: 'navego',
    nomeie: 'nomeio',
    normalize: 'normalizo',
    observe: 'observo',
    organize: 'organizo',
    oriente: 'oriento',
    ordene: 'ordeno',
    ouça: 'ouço',
    pare: 'paro',
    passe: 'passo',
    peça: 'peço',
    percorra: 'percorro',
    pergunte: 'pergunto',
    permita: 'permito',
    pesquise: 'pesquiso',
    pense: 'penso',
    planeje: 'planejo',
    pontue: 'pontuo',
    prefira: 'prefiro',
    prepare: 'preparo',
    pressione: 'pressiono',
    priorize: 'priorizo',
    proíba: 'proíbo',
    procure: 'procuro',
    projete: 'projeto',
    publique: 'publico',
    quebre: 'quebro',
    rebata: 'rebato',
    recorte: 'recorto',
    redimensione: 'redimensiono',
    reduza: 'reduzo',
    refaça: 'refaço',
    registre: 'registro',
    relacione: 'relaciono',
    remova: 'removo',
    renomeie: 'renomeio',
    renderize: 'renderizo',
    reorganize: 'reorganizo',
    repita: 'repito',
    reproduza: 'reproduzo',
    resolva: 'resolvo',
    restaure: 'restauro',
    retome: 'retomo',
    reutilize: 'reutilizo',
    reveja: 'revejo',
    revise: 'reviso',
    rode: 'rodo',
    salve: 'salvo',
    selecione: 'seleciono',
    separe: 'separo',
    simplifique: 'simplifico',
    simule: 'simulo',
    suavize: 'suavizo',
    substitua: 'substituo',
    teste: 'testo',
    tente: 'tento',
    trace: 'traço',
    trabalhe: 'trabalho',
    trate: 'trato',
    transforme: 'transformo',
    trave: 'travo',
    treine: 'treino',
    troque: 'troco',
    use: 'uso',
    valide: 'valido',
    verifique: 'verifico',
    vincule: 'vinculo',
    volte: 'volto'
  };

  const ownVoice = (value = '') => {
    let text = String(value)
      .trim()
      .replace(/\bO professor fica\b/g, 'Fico')
      .replace(/\bo professor fica\b/g, 'fico');

    const ambiguousNouns = new Set(['controle', 'destaque', 'escolha', 'limite', 'peça', 'recorte', 'teste']);
    const sources = Object.keys(firstPersonVerbs).join('|');
    const coordinatedSources = Object.keys(firstPersonVerbs)
      .filter((verb) => !ambiguousNouns.has(verb))
      .join('|');
    const replaceVerb = (match) => {
      const replacement = firstPersonVerbs[match.toLocaleLowerCase('pt-BR')];
      return match[0] === match[0].toLocaleUpperCase('pt-BR')
        ? replacement[0].toLocaleUpperCase('pt-BR') + replacement.slice(1)
        : replacement;
    };
    const replaceInContext = (pattern) => {
      text = text.replace(pattern, (...parts) => {
        const verb = parts.at(-3);
        return parts.slice(1, -3).join('') + replaceVerb(verb);
      });
    };

    replaceInContext(new RegExp(`^(\\s*)(${sources})(?![\\p{L}\\p{N}_])`, 'iu'));
    replaceInContext(new RegExp(`([.;:!?—–]\\s+)([“"'(]?\\s*)(${sources})(?![\\p{L}\\p{N}_])`, 'giu'));
    replaceInContext(new RegExp(
      `^((?:Sem|Se|No|Na|Nos|Nas|Dentro|Antes|Após|Primeiro|Em|Ao|Para)\\b[^,;.!?]{0,120},\\s*)(${sources})(?![\\p{L}\\p{N}_])`,
      'iu'
    ));
    replaceInContext(new RegExp(`(\\s+e\\s+)(${coordinatedSources})(?![\\p{L}\\p{N}_])`, 'giu'));
    replaceInContext(new RegExp(`(,\\s+)(${coordinatedSources})(?![\\p{L}\\p{N}_])`, 'giu'));
    text = text
      .replace(/\be destaque (?=(?:o|a|os|as|um|uma|entregáveis)\b)/giu, 'e destaco ')
      .replace(/\be peça (?=(?:que|confirmação|pensamento)\b)/giu, 'e peço ')
      .replace(/\be teste (?=(?:novamente|em|no|na|com|o|a)\b)/giu, 'e testo ');

    return text;
  };

  const activityVoice = (value = '') => String(value)
    .replace(/^Chamada\.\s*/i, '')
    .replace(/\bfala do professor:/gi, 'síntese de encerramento:')
    .replace(/\bdevolutivas individuais do professor\b/gi, 'minhas devolutivas individuais')
    .replace(/\bfeedback respeitoso da turma e do professor\b/gi, 'feedback respeitoso da turma e minha devolutiva')
    .replace(/\bpara o professor e a turma\b/gi, 'para mim e para a turma')
    .replace(/\bvalidação do professor\b/gi, 'minha validação')
    .replace(/\bmediação do professor\b/gi, 'minha mediação')
    .replace(/\batendimento individualizado do professor\b/gi, 'meu atendimento individualizado')
    .replace(/\bao professor\b/gi, 'para mim')
    .replace(/\bpelo professor\b/gi, 'por mim')
    .replace(/\bO professor\b/g, 'Eu')
    .replace(/\bo professor\b/g, 'eu')
    .replace(/\bProfessor\b/g, 'Eu')
    .trim();

  const modeForBlock = (activity, override = '') => {
    if (override) return override;
    const value = activity.toLocaleLowerCase('pt-BR');
    if (/^prova\b|^recuperação:.*\bprova\b|avaliação individual|recuperação individual/.test(value)) return 'assessment';
    if (/^rodada \d (?:de testes|com papéis invertidos)|^teste rápido de usabilidade|teste cruzado|validação entre grupos|validação cruzada/.test(value)) return 'testing';
    if (
      /^pitch\b|\bdefesa\b|^apresentações (?:finais|da)\b|^mostra (?:dos minidocumentários|final)\b|\bexibição (?:no projetor|dos (?:resultados|microcurtas|projetos))\b|\bapresenta(?:r|m)\s+(?:em|sua|o|a)\b|\bapresentação de \d|\bensaio (?:geral|cronometrado)\b|\bfestival\b|\bsocialização dos cronogramas\b/.test(value)
    ) return 'presentation';
    if (/grava|captação|filmagem|set|edição|montagem|implementação|construção|prática|exercício|oficina|produção/.test(value)) return 'production';
    return 'orientation';
  };

  const blockModes = {
    orientation: {
      label: 'Discussão orientada',
      evidence: 'Síntese do bloco registrada.'
    },
    assessment: {
      label: 'Avaliação individual',
      evidence: 'Atividade identificada e entregue.'
    },
    testing: {
      label: 'Teste e observação',
      evidence: 'Evidências registradas antes das correções.'
    },
    presentation: {
      label: 'Apresentação e devolutiva',
      evidence: 'Apresentação concluída no tempo e devolutiva registrada.'
    },
    production: {
      label: 'Prática da turma',
      evidence: 'Arquivo ou registro do bloco salvo e conferido.'
    }
  };

  if (!course || !courseSupport || !lesson || !support) {
    document.getElementById('lessonRoot').innerHTML = `
      <main class="error-screen">
        <div class="error-card">
          <p class="course-kicker">Planejamento de aulas</p>
          <h1>Aula não encontrada</h1>
          <p>Não foi possível abrir esta aula. Retorne à página da Unidade Curricular e selecione-a novamente.</p>
          <a class="back-link" href="index.html">← Voltar ao início</a>
        </div>
      </main>`;
    return;
  }

  document.body.dataset.theme = course.theme;
  document.title = `Aula ${lesson.num} · ${lesson.title} · ${course.title}`;

  const teacherPanel = ({ speech, steps = [], watch = '', rescue = '' }) => `
    <aside class="teacher-panel" aria-label="Minhas anotações de aula">
      <div class="teacher-panel-head">
        <span class="teacher-label">Minhas anotações</span>
        <span class="tag-chip">P oculta as notas</span>
      </div>
      ${speech ? `
        <h3>Abertura</h3>
        <p class="teacher-note is-speech">${escapeHtml(speech)}</p>` : ''}
      ${steps.length ? `
        <h3>Sequência prevista</h3>
        <div class="teacher-note">${listHtml(steps)}</div>` : ''}
      ${watch ? `
        <h3>Evidências</h3>
        <p class="teacher-note">${escapeHtml(watch)}</p>` : ''}
      ${rescue ? `
        <h3>Alternativa</h3>
        <p class="teacher-note">${escapeHtml(rescue)}</p>` : ''}
    </aside>`;

  const slide = ({ title, main, teacher, block = 1, className = '', pace = '' }) => ({
    title,
    html: `
      <section class="kit-slide${className ? ` ${escapeHtml(className)}` : ''}" data-title="${escapeHtml(title)}" data-block="${block}" data-pace="${escapeHtml(pace)}" aria-label="${escapeHtml(title)}">
        <div class="kit-slide-main">${main}</div>
        ${teacherPanel(teacher)}
      </section>`
  });

  const presentationSlide = (item, index) => {
    const cards = Array.isArray(item.cards) ? item.cards : [];
    const bullets = Array.isArray(item.bullets) ? item.bullets : [];
    const teacher = item.teacher && typeof item.teacher === 'object' ? item.teacher : {};
    const resource = item.resource && typeof item.resource === 'object' ? item.resource : {};
    const resources = Array.isArray(item.resources)
      ? item.resources.filter((entry) => entry && typeof entry === 'object' && entry.href)
      : (resource.href ? [resource] : []);
    const block = Number.isFinite(Number(item.block)) ? Math.max(1, Number(item.block)) : 1;
    const title = item.title || item.heading || `Conteúdo ${index + 1}`;
    const denseCards = item.layout === 'dense-cards';

    return slide({
      title,
      block,
      pace: item.pace === 'break' ? 'break' : '',
      className: denseCards ? 'is-dense-cards' : '',
      main: `
        ${item.kicker ? `<p class="slide-kicker">${escapeHtml(item.kicker)}</p>` : ''}
        <h2>${escapeHtml(item.heading || title)}</h2>
        ${item.lede ? `<p class="slide-lede">${escapeHtml(item.lede)}</p>` : ''}
        ${cards.length ? `
          <div class="presentation-card-grid${denseCards ? ' is-dense' : ''}">
            ${cards.map((card) => `
              <article class="content-card presentation-card">
                ${card.eyebrow ? `<span class="card-index">${escapeHtml(card.eyebrow)}</span>` : ''}
                ${card.title ? `<strong>${escapeHtml(card.title)}</strong>` : ''}
                ${card.text ? `<p>${escapeHtml(card.text)}</p>` : ''}
              </article>`).join('')}
          </div>` : ''}
        ${bullets.length ? listHtml(bullets, 'presentation-bullets') : ''}
        ${item.prompt ? `
          <aside class="presentation-prompt">
            <span class="card-index">${escapeHtml(item.promptLabel || 'Pergunta para a turma')}</span>
            <strong>${escapeHtml(item.prompt)}</strong>
          </aside>` : ''}
        ${resources.length ? `
          <div class="student-resource-links">
            ${resources.map((entry) => `
              <a class="student-resource-link" href="${escapeHtml(entry.href)}" target="_blank" rel="noopener">
                ${escapeHtml(entry.label || 'Abrir material da aula')} →
              </a>`).join('')}
          </div>` : ''}`,
      teacher: {
        speech: teacher.speech || '',
        steps: Array.isArray(teacher.steps) ? teacher.steps : [],
        watch: teacher.watch || '',
        rescue: teacher.rescue || ''
      }
    });
  };

  const phaseSupport = Object.values(courseSupport.courseTips.phases || {})
    .find((phase) => phase.lessons && phase.lessons.includes(lesson.num));
  const generalRoutine = (phaseSupport?.routine || courseSupport.courseTips.routine).map(ownVoice);
  const onlineSupport = (courseSupport.courseTips.onlineRoutines || [])
    .find((item) => item.lessons && item.lessons.includes(lesson.num));
  const onlineRoutine = onlineSupport?.text
    ? ownVoice(onlineSupport.text)
    : '';
  const coreObjectives = [...lesson.objectives, ...lesson.technical].filter(Boolean).slice(0, 6);
  const commonProblems = support.commonProblems && support.commonProblems.length
    ? support.commonProblems
    : phaseSupport?.commonProblems && phaseSupport.commonProblems.length
      ? phaseSupport.commonProblems
    : courseSupport.courseTips.commonProblems || [
        ['A equipe não consegue iniciar', 'Reduza a atividade ao primeiro passo demonstrado e confira uma evidência antes de avançar.'],
        ['Equipamento, software ou arquivo falhou', support.fallback],
        ['O tempo ficou curto', 'Preserve a capacidade central, simplifique o acabamento e salve uma versão utilizável.']
      ];
  const nextLesson = course.lessons[course.lessons.findIndex((item) => item.num === lesson.num) + 1];
  const previousLesson = support.previousLessonNumber
    ? course.lessons.find((item) => item.num === support.previousLessonNumber)
    : course.lessons[course.lessons.findIndex((item) => item.num === lesson.num) - 1];

  const slides = [];

  slides.push(slide({
    title: `Aula ${lesson.num} · ${lesson.title}`,
    block: 1,
    main: `
      <p class="slide-kicker">${escapeHtml(course.title)} · Aula ${lesson.num}</p>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p class="slide-lede">${escapeHtml(lesson.description)}</p>
      <div class="title-rule"></div>
      <div class="cover-meta">
        <span class="meta-chip"><strong>4 blocos</strong> · conceito · atividade · evidência</span>
        <span class="meta-chip"><strong>${escapeHtml(course.workload)}</strong> na UC</span>
        <span class="meta-chip"><strong>Prof. ${escapeHtml(course.teacher)}</strong></span>
      </div>`,
    teacher: {
      steps: [
        `Recursos separados: ${lesson.resources || 'computador, projetor e materiais indicados no planejamento.'}`,
        ...generalRoutine.slice(0, 2),
        ...(onlineRoutine ? [onlineRoutine] : []),
        `Entrega prevista: ${support.studentDeliverable}`
      ],
      watch: support.teacherGoal,
      rescue: ownVoice(courseSupport.courseTips.rescue)
    }
  }));

  const presentationSlides = Array.isArray(support.presentationSlides)
    ? support.presentationSlides.filter((item) => item && typeof item === 'object')
    : [];

  if (presentationSlides.length) {
    presentationSlides.forEach((item, index) => slides.push(presentationSlide(item, index)));
  } else {

  slides.push(slide({
    title: 'Mapa da noite',
    block: 1,
    main: `
      <p class="slide-kicker">Ritmo da aula</p>
      <h2>Quatro blocos, um produto</h2>
      <div class="cards-4">
        ${lesson.schedule.map((block, index) => `
          <article class="content-card schedule-card">
            <span class="card-index">Bloco ${index + 1}</span>
            <time>${escapeHtml(block.horario)}</time>
            <p>${escapeHtml(activityVoice(block.atividade))}</p>
          </article>`).join('')}
      </div>`,
    teacher: {
      steps: lesson.schedule.map((block, index) => `Bloco ${index + 1} · ${block.horario}`),
      watch: 'Faço a chamada no início de cada bloco, conforme o planejamento.',
      rescue: 'Com atraso, preservo a atividade central e reduzo apenas o acabamento.'
    }
  }));

  slides.push(slide({
    title: 'Objetivo da aula',
    block: 1,
    main: `
      <p class="slide-kicker">Conceito central</p>
      <h2>Objetivo da aula</h2>
      <p class="slide-lede">${escapeHtml(support.plainLanguage)}</p>
      <div class="cards-2">
        <article class="content-card">
          <span class="card-index">Objetivo de aprendizagem</span>
          <strong>Capacidade trabalhada</strong>
          <p>${escapeHtml(lesson.technical[0] || lesson.objectives[0] || support.teacherGoal)}</p>
        </article>
        <article class="content-card">
          <span class="card-index">Entrega da turma</span>
          <strong>Registro previsto</strong>
          <p>${escapeHtml(support.studentDeliverable)}</p>
        </article>
      </div>`,
    teacher: {
      speech: support.say,
      steps: [
        'Apresento o conceito em linguagem direta.',
        'Relaciono o tema a um exemplo concreto da turma.',
        'Confirmo a compreensão antes de avançar.'
      ],
      watch: coreObjectives[0] || support.teacherGoal,
      rescue: 'Se a explicação não funcionar, volto ao exemplo concreto e retomo o termo técnico depois.'
    }
  }));

  if (support.studentSheet) {
    const sheetSections = support.studentSheet.sections || [];
    slides.push(slide({
      title: support.studentSheet.title || 'Ficha da aula',
      block: 1,
      main: `
        <p class="slide-kicker">Material da dupla</p>
        <h2 class="student-sheet-title">${escapeHtml(support.studentSheet.title || 'Ficha da aula')}</h2>
        <p class="slide-lede">${escapeHtml(support.studentSheet.intro || 'Siga os campos na ordem e registre evidências observáveis.')}</p>
        <div class="student-sheet-grid">
          ${sheetSections.map((section) => `
            <section class="student-sheet-section">
              <span class="card-index">${escapeHtml(section.title)}</span>
              ${listHtml(section.items || [], 'student-sheet-list')}
            </section>`).join('')}
        </div>
        ${support.studentSheet.href ? `
          <a class="student-resource-link" href="${escapeHtml(support.studentSheet.href)}" target="_blank" rel="noopener">
            ${escapeHtml(support.studentSheet.linkLabel || 'Abrir material preenchível')} →
          </a>` : ''}
        ${support.extension ? `
          <p class="extension-callout"><strong>Terminou antes?</strong> ${escapeHtml(support.extension)}</p>` : ''}`,
      teacher: {
        steps: [
          'Entrego ou abro uma ficha por dupla.',
          'Preencho o primeiro item no projetor sem completar a atividade pela turma.',
          'Aponto onde ficará o arquivo ou a folha ao fim da aula.',
          'Confirmo que respostas curtas precisam trazer evidência.'
        ],
        watch: 'A dupla sabe qual trecho analisa, o que deve registrar e onde entregará o arquivo.',
        rescue: ownVoice(support.fallback)
      }
    }));
  }

  lesson.schedule.forEach((block, index) => {
    const duration = minutesBetween(block.horario);
    const introMinutes = duration <= 40 ? 5 : 10;
    const demoMinutes = duration <= 40 ? 8 : 15;
    const closeMinutes = 5;
    const practiceMinutes = Math.max(8, duration - introMinutes - demoMinutes - closeMinutes);
    const blockPlan = support.blocks && support.blocks[index] ? support.blocks[index] : {};
    const activity = activityVoice(block.atividade);
    const mode = modeForBlock(activity, blockPlan.mode);
    const modeDetails = blockModes[mode];
    const blockLabel = blockPlan.label || modeDetails.label;
    const studentSteps = Array.isArray(blockPlan.studentSteps) ? blockPlan.studentSteps : [];
    const blockExtension = blockPlan.extension || '';
    const action = blockPlan.action
      || ownVoice(support.demo[index] || 'Retomo o procedimento previsto no roteiro e acompanho a primeira execução.');
    const evidence = blockPlan.evidence || modeDetails.evidence;
    const objective = blockPlan.focus || coreObjectives[index] || coreObjectives[0] || support.teacherGoal;
    let sequence;
    if (mode === 'assessment') {
      sequence = [
        `${introMinutes} min · Organizo a entrada, a chamada e as orientações.`,
        `${duration - introMinutes - closeMinutes} min · Acompanho a avaliação sem interferir nas respostas.`,
        `${closeMinutes} min · Confiro a identificação e recolho as atividades.`
      ];
    } else if (mode === 'presentation') {
      sequence = [
        `${introMinutes} min · Organizo a ordem, o tempo e os critérios de devolutiva.`,
        `${duration - introMinutes - closeMinutes} min · ${action}`,
        `${closeMinutes} min · Registro a evidência e anuncio a próxima equipe ou etapa.`
      ];
    } else if (mode === 'testing') {
      sequence = [
        `${introMinutes} min · Organizo participantes, tarefas e registros de observação.`,
        `${demoMinutes} min · ${action}`,
        `${practiceMinutes} min · As equipes executam os testes; observo sem conduzir as respostas.`,
        `${closeMinutes} min · Interrompo antes das correções e confiro as evidências registradas.`
      ];
    } else if (mode === 'orientation') {
      sequence = [
        `${introMinutes} min · Faço a chamada e apresento a pergunta central do bloco.`,
        `${demoMinutes} min · ${action}`,
        `${practiceMinutes} min · A turma analisa, compara ou registra a síntese prevista.`,
        `${closeMinutes} min · Retomo a pergunta central e confiro uma evidência.`
      ];
    } else {
      sequence = [
        `${introMinutes} min · Faço a chamada e retomo o foco do bloco.`,
        `${demoMinutes} min · ${action}`,
        `${practiceMinutes} min · A turma produz; acompanho quem ainda não iniciou e confiro o salvamento.`,
        `${closeMinutes} min · Interrompo, salvamos o registro e confiro uma evidência.`
      ];
    }
    if (Array.isArray(blockPlan.teacherSteps) && blockPlan.teacherSteps.length) {
      sequence = blockPlan.teacherSteps.map(ownVoice);
    }

    slides.push(slide({
      title: `Bloco ${index + 1} · ${block.horario}`,
      block: index + 1,
      main: `
        <p class="slide-kicker">Bloco ${index + 1} · ${escapeHtml(block.horario)}</p>
        <h2${blockPlan.label ? ' class="block-title"' : ''}>${escapeHtml(blockLabel)}</h2>
        <div class="block-focus">
          <div class="block-time">${duration} min</div>
          <p class="block-activity${studentSteps.length ? ' is-compact' : ''}">${escapeHtml(activity)}</p>
        </div>
        ${studentSteps.length ? `
          <div class="block-directions">
            <span class="card-index">Faça nesta ordem</span>
            ${listHtml(studentSteps, 'block-step-list')}
          </div>` : ''}
        <div class="cards-2">
          <article class="content-card">
            <span class="card-index">Foco do bloco</span>
            <strong>Capacidade em desenvolvimento</strong>
            <p>${escapeHtml(objective)}</p>
          </article>
          <article class="content-card">
            <span class="card-index">Registro do bloco</span>
            <strong>${escapeHtml(evidence)}</strong>
            <p>O registro compõe a entrega prevista para a aula.</p>
          </article>
        </div>
        ${blockExtension ? `
          <p class="extension-callout"><strong>Se sobrar tempo:</strong> ${escapeHtml(blockExtension)}</p>` : ''}`,
      teacher: {
        steps: sequence,
        watch: blockPlan.evidence || support.check[index] || evidence,
        rescue: ownVoice(blockPlan.rescue || support.fallback)
      }
    }));
  });

  slides.push(slide({
    title: 'Procedimento em etapas',
    block: lesson.schedule.length,
    main: `
      <p class="slide-kicker">Demonstração</p>
      <h2>Procedimento em etapas</h2>
      ${listHtml(support.demo.map(ownVoice), 'step-list')}`,
    teacher: {
      steps: [
        'Apresento o resultado de referência antes dos passos.',
        'Executo uma etapa de cada vez e explico o que confiro.',
        'Reservo a segunda passagem para a turma repetir.',
        'Avanço apenas depois de verificar o ponto comum.'
      ],
      watch: 'Evito resolver silenciosamente no computador do estudante; explico o diagnóstico em voz alta.',
      rescue: ownVoice(support.fallback)
    }
  }));

  if (support.code && support.code.length) {
    slides.push(slide({
      title: 'Exemplo de código',
      block: lesson.schedule.length,
      main: `
        <p class="slide-kicker">Design Web · referência da aula</p>
        <h2>Exemplo de código</h2>
        <div class="code-stack">
          ${support.code.map((snippet, index) => `
            <article class="code-card">
              <div class="code-card-head">
                <span>${escapeHtml(snippet.label)} · ${escapeHtml(snippet.language)}</span>
                <button class="copy-btn" type="button" data-copy="${index}">Copiar</button>
              </div>
              <pre><code>${escapeHtml(snippet.content)}</code></pre>
            </article>`).join('')}
        </div>`,
      teacher: {
        steps: [
          'Parto do bloco completo para manter a explicação no conceito.',
          'Mostro o arquivo e o ponto exato em que o trecho entra.',
          'Salvo, atualizo e confiro o resultado.',
          'Altero uma linha e recolho previsões antes de atualizar.'
        ],
        watch: 'A turma localiza o arquivo, salva a mudança e explica o efeito sem depender de memorização.',
        rescue: 'Retomo o projeto inicial da UC e reaplico somente a alteração central.'
      }
    }));
  }

  const review = support.review || {};
  const reviewTitle = review.title || 'Entrega e critérios de avaliação';
  slides.push(slide({
    title: reviewTitle,
    block: lesson.schedule.length,
    main: `
      <p class="slide-kicker">${escapeHtml(review.kicker || 'Como saber se funcionou')}</p>
      <h2${review.title ? ' class="review-title"' : ''}>${escapeHtml(reviewTitle)}</h2>
      ${review.intro ? `<p class="slide-lede">${escapeHtml(review.intro)}</p>` : ''}
      ${review.title
        ? `<p class="review-deliverable"><strong>Entrega:</strong> ${escapeHtml(support.studentDeliverable)}</p>`
        : `<p class="slide-lede"><strong>${escapeHtml(support.studentDeliverable)}</strong></p>`}
      ${listHtml(support.check, review.title ? 'check-list formative-check-list' : 'check-list')}`,
    teacher: {
      steps: review.teacherSteps || [
        'Projeto os critérios antes do fim da atividade.',
        'Reservo uma autoavaliação breve.',
        'Confiro o arquivo, o registro ou a demonstração correspondente.',
        'Anoto as retomadas necessárias para a aula seguinte.',
        ...commonProblems.slice(0, 3).map(([problem, fix]) => `${problem}: ${ownVoice(fix)}`)
      ],
      watch: support.check[0] || support.studentDeliverable,
      rescue: ownVoice(support.fallback)
    }
  }));

  }

  if (support.appendDefaultClosing !== false) slides.push(slide({
    title: 'Fechamento da aula',
    block: lesson.schedule.length,
    main: `
      <p class="slide-kicker">Bilhete de saída</p>
      <h2>O que ficou pronto hoje?</h2>
      <p class="slide-lede">${escapeHtml(support.studentDeliverable)}</p>
      <div class="cards-2">
        <article class="content-card">
          <span class="card-index">Responda em uma frase</span>
          <strong>O que você aprendeu a fazer?</strong>
          <p>Use um verbo: criar, analisar, aplicar, testar, publicar, gravar ou editar.</p>
        </article>
        <article class="content-card">
          <span class="card-index">${nextLesson ? 'Próxima aula' : 'Encerramento da UC'}</span>
          <strong>${escapeHtml(nextLesson ? `Aula ${nextLesson.num} · ${nextLesson.title}` : 'Mostra, reflexão e próximos passos')}</strong>
          <p>${escapeHtml(nextLesson ? nextLesson.description : 'Guarde as evidências e registre o que faria em uma próxima versão.')}</p>
        </article>
      </div>`,
    teacher: {
      steps: [
        'Interrompo a atividade cinco minutos antes do final.',
        'Confiro o salvamento e a cópia da entrega.',
        'Ouço duas ou três respostas.',
        nextLesson ? `Anteciparei apenas o material necessário para a Aula ${nextLesson.num}.` : 'Conduzo uma retrospectiva breve da UC.'
      ],
      watch: support.check.at(-1) || support.studentDeliverable,
      rescue: 'Sem tempo para socialização oral, recolho a frase em papel ou formulário.'
    }
  }));

  const root = document.getElementById('lessonRoot');
  root.innerHTML = `
    <div class="lesson-app projection-mode" id="lessonApp">
      <header class="lesson-topbar">
        <div class="lesson-ident">
          <a class="back-link" href="uc-${courseSlug}.html" aria-label="Voltar às aulas de ${escapeHtml(course.title)}" title="Voltar às aulas (H)">← <span class="back-text">Aulas</span></a>
          <span class="uc-short">${escapeHtml(course.title)}</span>
          <span class="lesson-short">Aula ${lesson.num} · ${escapeHtml(lesson.title)}</span>
        </div>
        <div class="top-actions">
          <button class="tool-btn mode-btn" id="modeBtn" type="button" aria-pressed="false" title="Mostrar minhas anotações (P)">
            <span aria-hidden="true">▣</span><span class="button-label">Notas</span><span class="key">P</span>
          </button>
          <button class="tool-btn" id="gridBtn" type="button" title="Ver todos os slides (G)">
            <span aria-hidden="true">▦</span><span class="button-label">Grade</span><span class="key">G</span>
          </button>
          <button class="tool-btn" id="printBtn" type="button" title="Imprimir guia completo (D)">
            <span aria-hidden="true">↓</span><span class="button-label">PDF</span><span class="key">D</span>
          </button>
          <button class="tool-btn" id="fullscreenBtn" type="button" title="Tela cheia (F)">
            <span aria-hidden="true">⛶</span><span class="button-label">Tela cheia</span><span class="key">F</span>
          </button>
        </div>
      </header>

      <main class="deck-stage">
        <div class="deck-track">${slides.map((item) => item.html).join('')}</div>
      </main>

      <footer class="deck-bottombar">
        <div class="deck-progress" id="deckProgress"></div>
        <div class="deck-actions">
          <button class="deck-btn" id="prevBtn" type="button"><span aria-hidden="true">←</span><span class="button-label">Anterior</span></button>
          ${previousLesson ? `<a class="deck-btn" href="aula-kit.html?uc=${encodeURIComponent(courseSlug)}&aula=${previousLesson.num}" title="Aula anterior">Aula ${previousLesson.num}</a>` : ''}
        </div>
        <div class="deck-center">
          <span
            class="course-pace-dot is-ok"
            id="coursePaceDot"
            role="status"
            aria-live="polite"
            aria-label="Ritmo da aula: No ritmo"
            title="No ritmo"
          ></span>
          <div class="deck-counter" id="deckCounter" aria-live="polite"></div>
        </div>
        <div class="deck-actions">
          ${nextLesson ? `<a class="deck-btn" href="aula-kit.html?uc=${encodeURIComponent(courseSlug)}&aula=${nextLesson.num}" title="Próxima aula">Aula ${nextLesson.num}</a>` : ''}
          <button class="deck-btn" id="nextBtn" type="button"><span class="button-label">Próximo</span><span aria-hidden="true">→</span></button>
        </div>
      </footer>
    </div>

    <div class="slide-overview" id="slideOverview" role="dialog" aria-modal="true" aria-labelledby="overviewTitle" aria-hidden="true" inert>
      <div class="overview-head">
        <h2 id="overviewTitle">Mapa da aula</h2>
        <button class="tool-btn" id="closeOverview" type="button">Fechar · Esc</button>
      </div>
      <div class="overview-grid">
        ${slides.map((item, index) => `
          <button class="overview-card" type="button" data-go="${index}">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${escapeHtml(item.title)}</strong>
          </button>`).join('')}
      </div>
    </div>`;

  const app = document.getElementById('lessonApp');
  const slideElements = [...document.querySelectorAll('.kit-slide')];
  const overview = document.getElementById('slideOverview');
  const counter = document.getElementById('deckCounter');
  const progress = document.getElementById('deckProgress');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  const modeButton = document.getElementById('modeBtn');
  const paceDot = document.getElementById('coursePaceDot');
  const toast = document.getElementById('toast');
  const scheduleWindows = lesson.schedule.map((block, index) => {
    const [start, end] = timeRange(block.horario);
    return {
      number: index + 1,
      label: `Bloco ${index + 1}`,
      start: timeToMinutes(start),
      end: timeToMinutes(end)
    };
  });
  let currentIndex = 0;
  let toastTimer;
  let overviewTrigger = null;

  function currentScheduleWindow(now = new Date()) {
    const minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    const active = scheduleWindows.find((block) => minutes >= block.start && minutes < block.end);
    if (active) {
      return {
        block: active,
        progress: (minutes - active.start) / (active.end - active.start),
        status: 'active'
      };
    }
    if (minutes < scheduleWindows[0].start) {
      return { block: scheduleWindows[0], progress: 0, status: 'before' };
    }
    for (let index = 0; index < scheduleWindows.length - 1; index += 1) {
      const current = scheduleWindows[index];
      const next = scheduleWindows[index + 1];
      if (minutes >= current.end && minutes < next.start) {
        return {
          block: next,
          progress: (minutes - current.end) / Math.max(1, next.start - current.end),
          status: 'break'
        };
      }
    }
    return {
      block: scheduleWindows.at(-1),
      progress: 1,
      status: 'after'
    };
  }

  function paceHealth() {
    const activeSlide = slideElements[currentIndex];
    const slideBlock = Number(activeSlide?.dataset.block || 0);
    const expected = currentScheduleWindow();
    if (!slideBlock || !expected) return { level: 'ok', message: 'No ritmo' };
    if (activeSlide?.dataset.pace === 'break' && expected.status === 'break') {
      return { level: 'ok', message: 'Intervalo no horário' };
    }
    if (expected.block.number < slideBlock) {
      return { level: 'warn', message: `Adiantado · slide é do Bloco ${slideBlock}` };
    }
    if (expected.block.number > slideBlock) {
      return { level: 'err', message: `Atrasado · slide é do Bloco ${slideBlock}` };
    }

    const slidesInBlock = slideElements.filter((element) => Number(element.dataset.block) === slideBlock);
    if (slidesInBlock.length <= 1) return { level: 'ok', message: 'No ritmo' };
    const position = slidesInBlock.indexOf(activeSlide);
    const expectedProgress = (position + 1) / slidesInBlock.length;
    const delta = expectedProgress - expected.progress;
    if (delta > 0.25) {
      return { level: 'warn', message: 'Adiantado no bloco · há tempo para aprofundar' };
    }
    if (delta < -0.25) {
      return { level: 'warn', message: 'Atrasado no bloco · priorize o essencial' };
    }
    return { level: 'ok', message: 'No ritmo' };
  }

  function renderPace() {
    if (!paceDot) return;
    const health = paceHealth();
    paceDot.classList.remove('is-ok', 'is-warn', 'is-err');
    paceDot.classList.add(`is-${health.level}`);
    paceDot.title = health.message;
    paceDot.setAttribute('aria-label', `Ritmo da aula: ${health.message}`);
    paceDot.dataset.state = health.level;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1600);
  }

  function renderCurrent() {
    slideElements.forEach((element, index) => {
      element.classList.toggle('is-active', index === currentIndex);
      element.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
      element.inert = index !== currentIndex;
    });
    document.querySelectorAll('.overview-card').forEach((element, index) => {
      element.classList.toggle('is-current', index === currentIndex);
    });
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(slideElements.length).padStart(2, '0')}`;
    progress.style.width = `${((currentIndex + 1) / slideElements.length) * 100}%`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slideElements.length - 1;
    document.title = `${slides[currentIndex].title} · ${course.title}`;
    renderPace();
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(slideElements.length - 1, index));
    renderCurrent();
  }

  function toggleProjection(force) {
    const on = typeof force === 'boolean' ? force : !app.classList.contains('projection-mode');
    app.classList.toggle('projection-mode', on);
    modeButton.classList.toggle('is-active', !on);
    modeButton.setAttribute('aria-pressed', String(!on));
    modeButton.querySelector('.button-label').textContent = on ? 'Notas' : 'Projetar';
    modeButton.title = on ? 'Mostrar minhas anotações (P)' : 'Ocultar anotações e projetar (P)';
    showToast(on ? 'Projeção: anotações ocultas' : 'Minhas anotações estão visíveis');
  }

  function toggleOverview(force) {
    const on = typeof force === 'boolean' ? force : !overview.classList.contains('is-open');
    if (on) overviewTrigger = document.activeElement;
    overview.classList.toggle('is-open', on);
    overview.setAttribute('aria-hidden', String(!on));
    overview.inert = !on;
    app.inert = on;
    if (on) {
      const current = overview.querySelector('.overview-card.is-current') || overview.querySelector('.overview-card');
      current.focus();
    } else if (overviewTrigger instanceof HTMLElement) {
      overviewTrigger.focus();
    }
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      showToast('Tela cheia não disponível neste navegador');
    }
  }

  prevButton.addEventListener('click', () => goTo(currentIndex - 1));
  nextButton.addEventListener('click', () => goTo(currentIndex + 1));
  modeButton.addEventListener('click', () => toggleProjection());
  document.getElementById('gridBtn').addEventListener('click', () => toggleOverview());
  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
  document.getElementById('closeOverview').addEventListener('click', () => toggleOverview(false));

  overview.addEventListener('click', (event) => {
    if (event.target === overview) toggleOverview(false);
    const button = event.target.closest('[data-go]');
    if (!button) return;
    goTo(Number(button.dataset.go));
    toggleOverview(false);
  });

  overview.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...overview.querySelectorAll('button:not([disabled]), a[href]')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    const snippet = support.code && support.code[Number(button.dataset.copy)];
    if (!snippet) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(snippet.content);
      } else {
        const helper = document.createElement('textarea');
        helper.value = snippet.content;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        const copied = document.execCommand('copy');
        helper.remove();
        if (!copied) throw new Error('copy unavailable');
      }
      button.textContent = 'Copiado';
      showToast('Código copiado');
      setTimeout(() => { button.textContent = 'Copiar'; }, 1200);
    } catch {
      showToast('Selecione o código e copie manualmente');
    }
  });

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;

    if (event.key === 'Escape' && overview.classList.contains('is-open')) {
      event.preventDefault();
      toggleOverview(false);
      return;
    }

    if (overview.classList.contains('is-open')) return;

    if (event.key === 'ArrowRight' || event.key === 'PageDown' || (event.key === ' ' && target === document.body)) {
      event.preventDefault();
      goTo(currentIndex + 1);
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp' || event.key === 'Backspace') {
      event.preventDefault();
      goTo(currentIndex - 1);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
      return;
    }
    if (event.key === 'End') {
      event.preventDefault();
      goTo(slideElements.length - 1);
      return;
    }
    if (event.key === 'p' || event.key === 'P') {
      event.preventDefault();
      toggleProjection();
      return;
    }
    if (event.key === 'g' || event.key === 'G') {
      event.preventDefault();
      toggleOverview();
      return;
    }
    if (event.key === 'd' || event.key === 'D') {
      event.preventDefault();
      window.print();
      return;
    }
    if (event.key === 'f' || event.key === 'F') {
      event.preventDefault();
      toggleFullscreen();
      return;
    }
    if (event.key === 'h' || event.key === 'H') {
      event.preventDefault();
      window.location.href = `uc-${courseSlug}.html`;
    }
  });

  renderCurrent();
  window.setInterval(renderPace, 1000);
})();
