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
      if (num <= 10) return 'CSS e publicação';
      if (num <= 13) return 'JavaScript, UX e acessibilidade';
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
              <h2 id="onlineLabTitle">Código no ar, entrega no computador</h2>
            </div>
            <p>O mural distribui avisos e trechos em tempo real; o laboratório executa HTML e CSS lado a lado. Ao final, a pasta local continua sendo a versão oficial do trabalho.</p>
          </div>

          <div class="lab-tool-grid">
            <a class="lab-tool-card" href="https://dontpad.com.br/" target="_blank" rel="noopener noreferrer">
              <span class="lab-tool-card__number">01</span>
              <span class="lab-tool-card__meta">Gratuito · sem login</span>
              <strong>DontPad BR</strong>
              <p>Mural da aula para textos, links e código com atualização em tempo real e edição protegida por PIN.</p>
              <span class="lab-tool-card__action">Abrir mural ↗</span>
            </a>
            <a class="lab-tool-card" href="https://livecodes.io/" target="_blank" rel="noopener noreferrer">
              <span class="lab-tool-card__number">02</span>
              <span class="lab-tool-card__meta">Gratuito · sem login</span>
              <strong>LiveCodes</strong>
              <p>HTML, CSS, JavaScript e resultado na mesma tela para acompanhar cada alteração imediatamente.</p>
              <span class="lab-tool-card__action">Abrir laboratório ↗</span>
            </a>
            <a class="lab-tool-card" href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer">
              <span class="lab-tool-card__number">03</span>
              <span class="lab-tool-card__meta">Gratuito · sem login</span>
              <strong>Netlify Drop</strong>
              <p>A pasta ou o arquivo ZIP vira um endereço público em poucos passos, sem criar conta.</p>
              <span class="lab-tool-card__action">Publicar a pasta ↗</span>
            </a>
            <a class="lab-tool-card lab-tool-card--local" href="modelos/design-web/site-base/index.html" target="_blank" rel="noopener">
              <span class="lab-tool-card__number">04</span>
              <span class="lab-tool-card__meta">Plano local · sem internet</span>
              <strong>Projeto inicial</strong>
              <p>Versão estável para copiar, editar no computador e continuar a aula quando a conexão falhar.</p>
              <span class="lab-tool-card__action">Abrir projeto →</span>
            </a>
          </div>

          <ol class="lab-flow" aria-label="Rotina do laboratório">
            <li><strong>Antes</strong><span>Link da aula no DontPad BR em modo somente leitura.</span></li>
            <li><strong>Demonstração</strong><span>Trecho executado no LiveCodes com HTML e CSS visíveis.</span></li>
            <li><strong>Prática</strong><span>Cada dupla testa uma mudança por vez e confere o resultado.</span></li>
            <li><strong>Fechamento</strong><span>Pasta local identificada; quando previsto, publicação pelo Netlify Drop.</span></li>
          </ol>

          <p class="lab-privacy"><strong>Regra de uso:</strong> entram apenas conteúdo fictício e código didático. Nomes completos, contatos, senhas, chaves, fotos pessoais e dados de avaliação ficam fora desses serviços.</p>
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
              ? '<div class="resource-links"><a class="back-link" href="modelos/design-web/site-base/index.html" target="_blank" rel="noopener">Projeto inicial →</a><a class="back-link" href="modelos/design-web/materiais-de-aula/index.html" target="_blank" rel="noopener">Fichas e avaliações →</a></div>'
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
