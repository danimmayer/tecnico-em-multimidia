(function () {
  'use strict';

  const slug = document.body.dataset.course;
  const course = window.SENAI_COURSES && window.SENAI_COURSES[slug];
  const support = window.SENAI_TEACHING_SUPPORT && window.SENAI_TEACHING_SUPPORT[slug];

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  if (!course || !support) {
    console.error('UC não encontrada. Confira data-course e os arquivos de dados.');
    document.body.innerHTML = `
      <main class="error-screen">
        <div class="error-card">
          <p class="course-kicker">Planejamento de aulas</p>
          <h1>UC não encontrada</h1>
          <p>Não foi possível abrir esta Unidade Curricular.</p>
          <a class="back-link" href="index.html">← Voltar ao início</a>
        </div>
      </main>`;
    return;
  }

  document.body.dataset.theme = course.theme;
  document.title = `${course.title} · Técnico em Multimídia · SENAI`;

  const phaseFor = (lessonNumber) => {
    const num = Number(lessonNumber);
    if (slug === 'design-web') {
      if (num <= 5) return 'Fundamentos';
      if (num <= 10) return 'Identidade e responsividade';
      if (num <= 13) return 'Interação, UX e acessibilidade';
      if (num <= 20) return 'Projeto de interface';
      if (num <= 23) return 'Conteúdo e métricas';
      return 'Projeto integrador';
    }
    if (num <= 5) return 'Pré-produção';
    if (num <= 9) return 'Captação';
    if (num <= 16) return 'Pós-produção';
    if (num <= 18) return 'Documentário';
    return 'Projeto integrador';
  };

  const lessonUrl = (lesson) => `aula-kit.html?uc=${encodeURIComponent(slug)}&aula=${encodeURIComponent(lesson.num)}`;
  const onlineLab = slug === 'design-web'
    ? `
        <section class="classroom-lab" aria-labelledby="onlineLabTitle">
          <div class="classroom-lab__intro">
            <div>
              <p class="course-kicker">Fluxo de laboratório</p>
              <h2 id="onlineLabTitle">Design visível, prática em cada aula</h2>
            </div>
            <p>A turma analisa referências, monta soluções visuais, testa com colegas e registra o resultado. Os bastidores técnicos aparecem somente em demonstrações preparadas pelo professor.</p>
          </div>

          <div class="lab-tool-grid">
            <a class="lab-tool-card" href="modelos/design-web/materiais-de-aula/index.html" target="_blank" rel="noopener">
              <span class="lab-tool-card__number">01</span>
              <span class="lab-tool-card__meta">Local · sem internet</span>
              <strong>Caderno de materiais</strong>
              <p>Fichas, jogos, checklists, provas contextualizadas e recuperação por redesign.</p>
              <span class="lab-tool-card__action">Abrir caderno →</span>
            </a>
            <a class="lab-tool-card" href="https://www.photopea.com/" target="_blank" rel="noopener noreferrer">
              <span class="lab-tool-card__number">02</span>
              <span class="lab-tool-card__meta">Gratuito · sem login</span>
              <strong>Photopea</strong>
              <p>Edição visual de imagens e peças sociais; usar software instalado quando a internet não estiver disponível.</p>
              <span class="lab-tool-card__action">Abrir editor visual ↗</span>
            </a>
            <a class="lab-tool-card lab-tool-card--local" href="modelos/design-web/site-base/index.html" target="_blank" rel="noopener">
              <span class="lab-tool-card__number">03</span>
              <span class="lab-tool-card__meta">Demonstração docente</span>
              <strong>Modelo de presença digital</strong>
              <p>Exemplo pronto para observar estrutura, responsividade e interações sem editar arquivos técnicos.</p>
              <span class="lab-tool-card__action">Abrir modelo →</span>
            </a>
            <a class="lab-tool-card lab-tool-card--local" href="aula-kit.html?uc=design-web&amp;aula=24">
              <span class="lab-tool-card__number">04</span>
              <span class="lab-tool-card__meta">Projeto integrador</span>
              <strong>Presença Digital</strong>
              <p>Briefing, identidade, protótipo, post, story, audiovisual curto, teste e apresentação.</p>
              <span class="lab-tool-card__action">Abrir projeto →</span>
            </a>
          </div>

          <ol class="lab-flow" aria-label="Rotina do laboratório">
            <li><strong>Conceito</strong><span>Conversa guiada de 10 a 15 minutos com exemplo visível.</span></li>
            <li><strong>Demonstração</strong><span>O professor modela a decisão e mostra os critérios da entrega.</span></li>
            <li><strong>Prática</strong><span>Duplas ou equipes montam, comparam e testam uma solução visual.</span></li>
            <li><strong>Fechamento</strong><span>Entrega conferida por checklist, feedback entre pares e registro do processo.</span></li>
          </ol>

          <p class="lab-privacy"><strong>Regra de uso:</strong> entram apenas conteúdo, clientes e personas fictícios. Nomes completos, contatos, senhas, fotos pessoais e dados de avaliação ficam fora das ferramentas externas.</p>
        </section>`
    : '';

  document.getElementById('courseRoot').innerHTML = `
    <div class="course-shell">
      <header class="course-topbar">
        <a class="course-brand" href="index.html">
          <img src="imagens/Logo-novo-SENAI_-sem-slogan_755X325.png" alt="">
          <span>Técnico em Multimídia</span>
        </a>
        <a class="back-link" href="index.html">← Todas as UCs</a>
      </header>

      <main>
        <section class="course-hero" aria-labelledby="courseTitle">
          <div>
            <p class="course-kicker">${escapeHtml(course.module)} · ${escapeHtml(course.period)}</p>
            <h1 id="courseTitle">${escapeHtml(course.title)}</h1>
            <p class="course-lede">${escapeHtml(course.description)}</p>
          </div>
          <dl class="course-facts">
            <div>
              <dt>Carga horária</dt>
              <dd>${escapeHtml(course.workload)}</dd>
            </div>
            <div>
              <dt>Aulas</dt>
              <dd>${course.lessons.length} / ${course.lessonCount}</dd>
            </div>
            <div>
              <dt>Professor</dt>
              <dd>${escapeHtml(course.teacher)}</dd>
            </div>
            <div>
              <dt>Formato</dt>
              <dd>4 blocos</dd>
            </div>
          </dl>
        </section>

        <aside class="teacher-promise">
          <span class="promise-mark" aria-hidden="true">D</span>
          <div>
            <strong>Estratégia de aula</strong>
            <p>${escapeHtml(support.courseTips.promise)}</p>
            ${slug === 'design-web'
              ? '<div class="resource-links"><a class="back-link" href="modelos/design-web/site-base/index.html" target="_blank" rel="noopener">Modelo demonstrativo →</a><a class="back-link" href="modelos/design-web/materiais-de-aula/index.html" target="_blank" rel="noopener">Fichas e avaliações →</a></div>'
              : '<div class="resource-links"><a class="back-link" href="modelos/producao-audiovisual/index.html" target="_blank" rel="noopener">Fichas de produção →</a></div>'}
          </div>
        </aside>

        ${onlineLab}

        <section aria-labelledby="lessonsTitle">
          <div class="course-tools">
            <div>
              <p class="course-kicker">Sequência de aulas</p>
              <h2 id="lessonsTitle">${course.lessons.length} aulas</h2>
            </div>
            <label>
              <span class="sr-only">Buscar aula</span>
              <input class="lesson-search" id="lessonSearch" type="search" placeholder="Buscar por aula ou assunto…" autocomplete="off">
            </label>
          </div>
          <div class="lesson-grid" id="lessonGrid"></div>
        </section>
      </main>
    </div>`;

  const grid = document.getElementById('lessonGrid');
  const search = document.getElementById('lessonSearch');

  function renderLessons(query = '') {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    const lessons = course.lessons.filter((lesson) => {
      const haystack = [
        lesson.num,
        lesson.title,
        lesson.description,
        phaseFor(lesson.num),
        ...lesson.objectives,
        ...lesson.technical
      ].join(' ').toLocaleLowerCase('pt-BR');
      return !normalized || haystack.includes(normalized);
    });

    if (!lessons.length) {
      grid.innerHTML = '<div class="empty-state">Nenhuma aula corresponde a essa busca.</div>';
      return;
    }

    grid.innerHTML = lessons.map((lesson) => `
      <a class="lesson-card" href="${lessonUrl(lesson)}" aria-label="Abrir Aula ${escapeHtml(lesson.num)}: ${escapeHtml(lesson.title)}">
        <span class="lesson-card-num">Aula ${escapeHtml(lesson.num)} · ${escapeHtml(phaseFor(lesson.num))}</span>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p>${escapeHtml(lesson.description)}</p>
        <div class="lesson-card-footer">
          <span><strong>4 blocos</strong> · conceito · atividade · evidência</span>
          <span class="lesson-card-arrow" aria-hidden="true">→</span>
        </div>
      </a>`).join('');
  }

  search.addEventListener('input', () => renderLessons(search.value));

  document.addEventListener('keydown', (event) => {
    if ((event.key === 'h' || event.key === 'H') && document.activeElement !== search) {
      window.location.href = 'index.html';
    }
    if (event.key === '/' && document.activeElement !== search) {
      event.preventDefault();
      search.focus();
    }
  });

  renderLessons();
})();
