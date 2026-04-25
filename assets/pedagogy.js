/* =======================================================================
 * SENAI · PEDAGOGY ENGINE · v1.0
 * Motor reutilizável de experiência de aula.
 *
 * Pré-requisito: window.SENAI_PEDAGOGY exposto pelo pedagogy-data.js.
 * =======================================================================
 * APIs expostas em window.Pedagogy:
 *   Pedagogy.setDepth(1|2|3)   · alterna nível de profundidade
 *   Pedagogy.togglePresenter() · abre/fecha painel do professor
 *   Pedagogy.openReport()      · abre relatório
 *   Pedagogy.exportReport('pdf'|'json')
 *   Pedagogy.toggleContrast()  · alto contraste
 *   Pedagogy.bumpFont(delta)   · ajusta fonte
 *   Pedagogy.reset()
 *
 * Atalhos de teclado (além dos do host):
 *   1 / 2 / 3  → nível de profundidade
 *   P          → Presenter Mode
 *   R          → Relatório
 *   C          → Alto contraste
 *   +  /  -    → Aumentar / diminuir fonte
 *   S          → Análise semiótica (no slide atual, se houver)
 * ======================================================================= */
(function () {
  'use strict';

  const DATA = window.SENAI_PEDAGOGY;
  if (!DATA) { console.warn('[pedagogy] SENAI_PEDAGOGY não encontrado'); return; }

  /* ----------------------------------------------------------------- */
  /* UTILS                                                              */
  /* ----------------------------------------------------------------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const pad = (n) => String(n).padStart(2, '0');
  const nowStr = () => {
    const d = new Date();
    return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  };
  const hmToMin = (s) => {
    const [h, m] = s.split(':').map(Number); return h * 60 + m;
  };
  const minToHm = (m) => {
    m = Math.max(0, Math.floor(m));
    return pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  };
  const STORAGE_KEY = 'senai-pedagogy-v1';

  /* ----------------------------------------------------------------- */
  /* STATE                                                              */
  /* ----------------------------------------------------------------- */
  const state = {
    depth: 1,
    presenterOpen: false,
    reportOpen: false,
    qrOpen: false,
    hcOn: false,
    fontStep: 0,  // -1 / 0 / 1 / 2 (small / default / large / xlarge)
    slideIndex: 0,
    slideVisits: {},    // data-title → {enters: n, totalMs: n, lastEnter: ts}
    lastEnterTs: 0,
    lastSlideTitle: null,
    simClockOffsetMs: 0, // if we simulate starting at 19:00 for rehearsal
    simMode: false,
    responses: {},      // slideTitle → [{who, text, ts}]
    studentName: ''
  };

  /* ----------------------------------------------------------------- */
  /* HOST INTEGRATION — find slide container & hooks                    */
  /* ----------------------------------------------------------------- */
  function getSlides() { return $$('.slide'); }
  function getActiveSlide() { return $('.slide.active'); }
  function getSlideTitle(slide) { return slide ? (slide.getAttribute('data-title') || 'Slide') : ''; }
  function getActiveIndex() {
    const slides = getSlides();
    return slides.findIndex(s => s.classList.contains('active'));
  }

  /* ----------------------------------------------------------------- */
  /* DEPTH CONTROL (níveis 1 / 2 / 3)                                   */
  /* ----------------------------------------------------------------- */
  function setDepth(level) {
    level = Math.max(1, Math.min(3, level));
    state.depth = level;
    const root = document.documentElement;
    root.classList.remove('p-depth-1', 'p-depth-2', 'p-depth-3');
    root.classList.add('p-depth-' + level);
    updateDepthIndicator();
    persist();
  }

  function slideHasDepth(slide, level) {
    if (!slide) return false;
    if (slide.querySelector('[data-depth="' + level + '"]')) return true;
    // Conteúdo inline (sem sidepanel) também conta como nível 2.
    if (level === 2 && slide.querySelector('.q-answer')) return true;
    return false;
  }

  function updateDepthIndicator() {
    const active = getActiveSlide();
    const group = $('#pDepthGroup');
    if (!group) return;
    const has2 = !!(active && (
      active.querySelector('.p-deep-panel [data-depth="2"]') ||
      active.querySelector('.q-answer')
    ));
    const has3 = !!(active && active.querySelector('.p-deep-panel [data-depth="3"]'));
    group.classList.toggle('is-locked', !has2 && !has3);
    $$('.p-depth-btn', group).forEach(btn => {
      const lvl = Number(btn.dataset.level);
      const enabled = lvl === 1 || (lvl === 2 && has2) || (lvl === 3 && has3);
      btn.disabled = !enabled;
      btn.classList.toggle('is-active', lvl === state.depth && enabled);
    });
    // Hint: se tem conteúdo profundo e ainda está em nivel 1, mostra dica
    const hint = active && active.querySelector('.p-deep-hint');
    if (hint) {
      hint.style.display = (has2 || has3) ? '' : 'none';
    }
  }

  /* ----------------------------------------------------------------- */
  /* CLOCK & BLOCK LOGIC                                                */
  /* ----------------------------------------------------------------- */
  function getSimulatedTime() {
    if (!state.simMode) return new Date();
    return new Date(Date.now() + state.simClockOffsetMs);
  }

  function currentBlock() {
    const now = getSimulatedTime();
    const mins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    for (let i = 0; i < DATA.BLOCOS.length; i++) {
      const b = DATA.BLOCOS[i];
      const bi = hmToMin(b.inicio);
      const bf = hmToMin(b.fim);
      if (mins >= bi && mins < bf) return { block: b, progress: (mins - bi) / (bf - bi), idx: i, status: 'active' };
    }
    // Antes do 1º bloco?
    if (mins < hmToMin(DATA.BLOCOS[0].inicio)) {
      return { block: DATA.BLOCOS[0], progress: 0, idx: 0, status: 'before' };
    }
    // Entre blocos ou depois
    for (let i = 0; i < DATA.BLOCOS.length - 1; i++) {
      const bFim = hmToMin(DATA.BLOCOS[i].fim);
      const bNext = hmToMin(DATA.BLOCOS[i + 1].inicio);
      if (mins >= bFim && mins < bNext) {
        return { block: DATA.BLOCOS[i + 1], progress: (mins - bFim) / Math.max(1, bNext - bFim), idx: i + 1, status: 'break' };
      }
    }
    return { block: DATA.BLOCOS[DATA.BLOCOS.length - 1], progress: 1, idx: DATA.BLOCOS.length - 1, status: 'after' };
  }

  function blockHealth() {
    // Se todos os slides têm data-bloco, medimos ritmo:
    // um slide do bloco B "deveria" aparecer no intervalo desse bloco.
    const active = getActiveSlide();
    if (!active) return { level: 'ok', msg: '' };
    const slideBlock = Number(active.getAttribute('data-bloco') || '0');
    if (!slideBlock) return { level: 'ok', msg: '' };
    const nb = currentBlock();
    if (!nb) return { level: 'ok', msg: '' };
    if (nb.block.id < slideBlock) {
      return { level: 'warn', msg: 'Adiantado · slide é do ' + DATA.BLOCOS[slideBlock - 1].label };
    }
    if (nb.block.id > slideBlock) {
      return { level: 'err', msg: 'Atrasado · slide é do ' + DATA.BLOCOS[slideBlock - 1].label };
    }
    // Dentro do bloco, checar o ritmo interno
    const slidesInBlock = getSlides().filter(s => Number(s.getAttribute('data-bloco') || '0') === slideBlock);
    const myPos = slidesInBlock.indexOf(active);
    const expectedProgress = (myPos + 1) / slidesInBlock.length;
    const delta = expectedProgress - nb.progress;
    if (delta > 0.25) return { level: 'warn', msg: 'Adiantado no bloco · considere abrir o nível 2' };
    if (delta < -0.25) return { level: 'warn', msg: 'Atrasado no bloco · considere nível 1' };
    return { level: 'ok', msg: 'No ritmo' };
  }

  function renderTopBar() {
    const cb = currentBlock();
    const now = getSimulatedTime();
    const health = blockHealth();

    const clock = $('#pClockLabel');
    if (clock) clock.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());

    const blk = $('#pBlockLabel');
    if (blk) blk.textContent = cb ? (cb.status === 'break' ? 'Intervalo' : cb.block.label) : '—';

    const chip = $('#pClockChip');
    if (chip) {
      chip.classList.remove('is-ok', 'is-warn', 'is-err');
      chip.classList.add('is-' + health.level);
      chip.setAttribute('title', health.msg || 'No ritmo');
    }

    const comp = $('#pCompCount');
    if (comp) {
      const seen = countSeenCompetencies();
      const total = Object.keys(DATA.COMPETENCIAS).length;
      comp.textContent = seen + '/' + total;
    }
  }

  /* ----------------------------------------------------------------- */
  /* COMPETENCY TRACKING                                                */
  /* ----------------------------------------------------------------- */
  function slideCompetencies(slide) {
    if (!slide) return [];
    const raw = slide.getAttribute('data-competencias') || '';
    return raw.split(',').map(s => s.trim()).filter(Boolean);
  }
  function seenCompetencies() {
    const set = new Set();
    getSlides().forEach(s => {
      if ((state.slideVisits[getSlideTitle(s)] || {}).enters) {
        slideCompetencies(s).forEach(c => set.add(c));
      }
    });
    return Array.from(set);
  }
  function countSeenCompetencies() { return seenCompetencies().length; }

  /* ----------------------------------------------------------------- */
  /* PRESENTER PANEL                                                    */
  /* ----------------------------------------------------------------- */
  function togglePresenter(force) {
    state.presenterOpen = typeof force === 'boolean' ? force : !state.presenterOpen;
    const el = $('#pPresenter');
    if (el) el.classList.toggle('is-open', state.presenterOpen);
    if (state.presenterOpen) renderPresenter();
    persist();
  }

  function renderPresenter() {
    if (!state.presenterOpen) return;
    const active = getActiveSlide();
    const title = getSlideTitle(active);
    const notes = DATA.NOTES[title] || { fala: '—', dica: null };

    // Clock big
    const now = getSimulatedTime();
    $('#pClock').textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());

    const cb = currentBlock();
    const sub = $('#pClockSub');
    if (sub && cb) {
      if (cb.status === 'break') {
        sub.textContent = 'Intervalo · próximo bloco inicia às ' + cb.block.inicio;
      } else if (cb.status === 'before') {
        sub.textContent = 'Aula inicia às ' + cb.block.inicio;
      } else if (cb.status === 'after') {
        sub.textContent = 'Aula encerrada às ' + cb.block.fim;
      } else {
        const remainMin = hmToMin(cb.block.fim) - (now.getHours() * 60 + now.getMinutes());
        sub.textContent = cb.block.titulo + ' · ' + remainMin + ' min restantes';
      }
    }

    // Block bar
    const bar = $('#pBlockBar');
    if (bar) {
      bar.innerHTML = '';
      DATA.BLOCOS.forEach((b, i) => {
        const seg = document.createElement('div');
        seg.className = 'p-block-seg';
        if (cb && cb.idx > i) seg.classList.add('is-done');
        else if (cb && cb.idx === i && cb.status === 'active') seg.classList.add('is-current');
        const fill = document.createElement('div');
        fill.className = 'p-block-fill';
        if (cb && cb.idx === i && cb.status === 'active') {
          fill.style.width = (cb.progress * 100).toFixed(1) + '%';
        }
        seg.appendChild(fill);
        seg.title = b.label + ' · ' + b.inicio + '–' + b.fim + ' · ' + b.titulo;
        bar.appendChild(seg);
      });
    }

    // Labels
    const labels = $('#pBlockLabels');
    if (labels) {
      labels.innerHTML = '';
      DATA.BLOCOS.forEach(b => {
        const span = document.createElement('span'); span.textContent = b.inicio; labels.appendChild(span);
      });
    }

    // Fala
    $('#pFala').innerHTML = '<strong>Fala:</strong> ' + (notes.fala || '—');

    // Dica
    const dicaWrap = $('#pDica');
    if (notes.dica) {
      dicaWrap.style.display = '';
      dicaWrap.innerHTML = notes.dica;
    } else {
      dicaWrap.style.display = 'none';
    }

    // Health tip
    const health = blockHealth();
    const healthEl = $('#pHealth');
    if (healthEl) {
      if (health.level === 'ok') {
        healthEl.className = 'p-tip is-ok'; healthEl.textContent = '✓ ' + (health.msg || 'No ritmo');
      } else if (health.level === 'warn') {
        healthEl.className = 'p-tip'; healthEl.textContent = '⚠ ' + health.msg;
      } else {
        healthEl.className = 'p-tip is-err'; healthEl.textContent = '● ' + health.msg;
      }
    }

    // Next slide
    const slides = getSlides();
    const idx = getActiveIndex();
    const next = slides[idx + 1];
    const nextWrap = $('#pNextSlide');
    if (nextWrap) {
      if (next) {
        nextWrap.style.display = '';
        $('#pNextTitle').textContent = getSlideTitle(next);
      } else {
        nextWrap.style.display = 'none';
      }
    }

    // Competências do slide
    const compWrap = $('#pSlideComps');
    if (compWrap) {
      const codes = slideCompetencies(active);
      compWrap.innerHTML = codes.length
        ? codes.map(c => {
            const def = DATA.COMPETENCIAS[c];
            return '<span class="p-comp-pill" title="' + (def ? def.titulo : c) + '">' + c + '</span>';
          }).join('')
        : '<span style="font-size:12px;color:var(--p-muted);">Sem competências marcadas</span>';
    }

    // Slide progress + visits
    const visits = state.slideVisits[title] || { enters: 0, totalMs: 0 };
    const curMs = state.lastEnterTs ? (Date.now() - state.lastEnterTs) : 0;
    const tot = visits.totalMs + curMs;
    const tmr = $('#pSlideTimer');
    if (tmr) {
      tmr.innerHTML = '<strong>' + minToHm(tot / 60000) + '</strong> neste slide · ' +
        'visitado ' + (visits.enters || 1) + 'x · slide <strong>' + (idx + 1) + '</strong>/' + slides.length;
    }
  }

  /* ----------------------------------------------------------------- */
  /* ACCESSIBILITY                                                      */
  /* ----------------------------------------------------------------- */
  function toggleContrast(force) {
    state.hcOn = typeof force === 'boolean' ? force : !state.hcOn;
    document.documentElement.classList.toggle('p-hc-on', state.hcOn);
    const btn = $('#pBtnHC');
    if (btn) btn.classList.toggle('is-on', state.hcOn);
    persist();
  }

  function bumpFont(delta) {
    state.fontStep = Math.max(-1, Math.min(2, state.fontStep + delta));
    const root = document.documentElement;
    root.classList.remove('p-font-sm', 'p-font-lg', 'p-font-xl');
    if (state.fontStep === -1) root.classList.add('p-font-sm');
    else if (state.fontStep === 1) root.classList.add('p-font-lg');
    else if (state.fontStep === 2) root.classList.add('p-font-xl');
    persist();
  }

  /* ----------------------------------------------------------------- */
  /* REPORT                                                             */
  /* ----------------------------------------------------------------- */
  function openReport() {
    state.reportOpen = true;
    buildReport();
    $('#pReport').classList.add('is-open');
  }
  function closeReport() { state.reportOpen = false; $('#pReport').classList.remove('is-open'); }

  function buildReport() {
    const slides = getSlides();
    const now = new Date();

    let totalMs = 0, visitedCount = 0;
    Object.keys(state.slideVisits).forEach(k => {
      totalMs += state.slideVisits[k].totalMs || 0;
      if (state.slideVisits[k].enters > 0) visitedCount++;
    });
    // if current slide still open, add
    if (state.lastEnterTs) totalMs += (Date.now() - state.lastEnterTs);

    const seenComps = seenCompetencies();
    const totalComps = Object.keys(DATA.COMPETENCIAS).length;

    const totalResp = Object.values(state.responses).reduce((n, arr) => n + arr.length, 0);

    $('#pReportDate').textContent = now.toLocaleDateString('pt-BR') + ' · ' + pad(now.getHours()) + ':' + pad(now.getMinutes());

    $('#pReportStats').innerHTML = [
      stat(visitedCount + '/' + slides.length, 'Slides visitados'),
      stat(seenComps.length + '/' + totalComps, 'Competências cobertas'),
      stat(minToHm(totalMs / 60000), 'Tempo total de aula'),
      stat(totalResp, 'Respostas coletadas')
    ].join('');

    // Block table
    let bloTable = '<table><thead><tr><th>Bloco</th><th>Horário</th><th>Tema</th><th>Slides</th></tr></thead><tbody>';
    DATA.BLOCOS.forEach(b => {
      const mine = slides.filter(s => Number(s.getAttribute('data-bloco') || '0') === b.id);
      const visited = mine.filter(s => (state.slideVisits[getSlideTitle(s)] || {}).enters);
      bloTable += '<tr><td>' + b.label + '</td><td>' + b.inicio + '–' + b.fim + '</td><td>' + b.titulo + '</td>' +
        '<td>' + visited.length + '/' + mine.length + ' ' + (visited.length === mine.length && mine.length ? '<span class="p-check">✓</span>' : '') + '</td></tr>';
    });
    bloTable += '</tbody></table>';
    $('#pReportBlocks').innerHTML = bloTable;

    // Competency table
    let compTable = '<table><thead><tr><th>Código</th><th>Tipo</th><th>Descrição</th><th>Status</th></tr></thead><tbody>';
    Object.keys(DATA.COMPETENCIAS).forEach(code => {
      const c = DATA.COMPETENCIAS[code];
      const hit = seenComps.indexOf(code) >= 0;
      compTable += '<tr><td><strong>' + code + '</strong></td><td>' + c.tipo + '</td>' +
        '<td>' + c.titulo + '</td>' +
        '<td>' + (hit ? '<span class="p-check">✓ coberta</span>' : '<span class="p-minus">—</span>') + '</td></tr>';
    });
    compTable += '</tbody></table>';
    $('#pReportComps').innerHTML = compTable;

    // Responses table
    const respWrap = $('#pReportResponses');
    if (totalResp === 0) {
      respWrap.innerHTML = '<p style="font-size:13px;color:var(--p-muted);">Nenhuma resposta coletada nesta sessão.</p>';
    } else {
      let t = '<table><thead><tr><th>Slide</th><th>Aluno</th><th>Resposta</th><th>Horário</th></tr></thead><tbody>';
      Object.keys(state.responses).forEach(slideTitle => {
        state.responses[slideTitle].forEach(r => {
          const ts = new Date(r.ts);
          t += '<tr><td>' + escapeHtml(slideTitle) + '</td>' +
            '<td>' + escapeHtml(r.who || 'Anônimo') + '</td>' +
            '<td>' + escapeHtml(r.text) + '</td>' +
            '<td>' + pad(ts.getHours()) + ':' + pad(ts.getMinutes()) + '</td></tr>';
        });
      });
      t += '</tbody></table>';
      respWrap.innerHTML = t;
    }
  }
  function stat(n, l) { return '<div class="p-report-stat"><div class="p-num">' + n + '</div><div class="p-lbl">' + l + '</div></div>'; }
  function escapeHtml(s) { return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }

  function exportReport(fmt) {
    buildReport();
    if (fmt === 'json') {
      const blob = new Blob([JSON.stringify(serializeReport(), null, 2)], { type: 'application/json' });
      triggerDownload(blob, 'relatorio-aula-' + todayStamp() + '.json');
    } else {
      // PDF simples via window.print() com CSS de impressão do modal
      // Abre uma janela com o relatório como documento completo
      const html = buildPrintableHtml();
      const w = window.open('', '_blank');
      w.document.open(); w.document.write(html); w.document.close();
      setTimeout(() => { try { w.print(); } catch (e) {} }, 300);
    }
  }

  function serializeReport() {
    return {
      meta: DATA.META,
      generatedAt: new Date().toISOString(),
      slides: getSlides().map((s, i) => ({
        index: i + 1,
        title: getSlideTitle(s),
        bloco: Number(s.getAttribute('data-bloco') || '0'),
        competencias: slideCompetencies(s),
        visits: state.slideVisits[getSlideTitle(s)] || { enters: 0, totalMs: 0 }
      })),
      competencias: DATA.COMPETENCIAS,
      cobertas: seenCompetencies(),
      blocos: DATA.BLOCOS,
      respostas: state.responses
    };
  }

  function buildPrintableHtml() {
    const rep = $('#pReport .p-report-box');
    const baseHref = window.location.href.replace(/[^/]*$/, '');
    return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
      <title>Relatório · ${DATA.META.aula}</title>
      <base href="${baseHref}">
      <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; color: #222; max-width: 820px; margin: 30px auto; padding: 0 30px; }
        h1 { font-size: 22px; margin: 0 0 4px; }
        h2 { font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #8a7340; margin: 24px 0 10px; }
        .p-report-sub { color: #777; font-size: 13px; margin-bottom: 16px; }
        .p-report-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
        .p-report-stat { border: 1px solid #e5e0d5; border-radius: 6px; padding: 12px; text-align: center; background: #faf8f3; }
        .p-num { font-size: 1.6rem; font-weight: 700; color: #333; }
        .p-lbl { font-size: 11px; color: #888; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { text-align: left; padding: 6px 8px; background: #f3ecd8; color: #7a6328; letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px; }
        td { padding: 6px 8px; border-bottom: 1px solid #eee; }
        .p-check { color: #3c8256; font-weight: 600; }
        .p-minus { color: #aaa; }
        .p-report-actions { display: none; }
      </style></head><body>${rep.innerHTML.replace(/<div class="p-report-actions">[\s\S]*?<\/div>/, '')}</body></html>`;
  }

  function todayStamp() {
    const d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '-' + pad(d.getHours()) + pad(d.getMinutes());
  }
  function triggerDownload(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ----------------------------------------------------------------- */
  /* RESPONSE COLLECTION (QR)                                           */
  /* ----------------------------------------------------------------- */
  // Base URL que o QR aponta para os alunos responderem.
  // Prioridade:
  //   1. `window.PEDAGOGY_QR_URL` (configurável pelo host HTML)
  //   2. `<meta name="pedagogy-qr-url" content="...">`
  //   3. URL atual do deck (só funciona mesmo origem/dispositivo)
  // Em file:// `window.location.origin` é "null" — usamos `href` e
  // removemos qualquer hash anterior para não concatenar parâmetros.
  function getResponderBaseUrl() {
    if (typeof window.PEDAGOGY_QR_URL === 'string' && window.PEDAGOGY_QR_URL) {
      return window.PEDAGOGY_QR_URL;
    }
    const meta = document.querySelector('meta[name="pedagogy-qr-url"]');
    if (meta && meta.content) return meta.content;
    const origin = window.location.origin;
    if (origin && origin !== 'null') {
      return origin + window.location.pathname;
    }
    // file:// ou outro protocolo opaco: usa href sem hash/query
    return window.location.href.split('#')[0].split('?')[0];
  }

  function buildResponderUrl(title) {
    const base = getResponderBaseUrl();
    const hasCustomUrl = !!(window.PEDAGOGY_QR_URL ||
      document.querySelector('meta[name="pedagogy-qr-url"]'));
    if (hasCustomUrl) {
      // URL externa configurada (Google Forms/Typeform/webhook): anexa o
      // título como query param para o formulário saber de qual slide.
      const sep = base.indexOf('?') >= 0 ? '&' : '?';
      return base + sep + 'slide=' + encodeURIComponent(title);
    }
    // URL interna do deck: usa hash #responder= (modo demo same-device).
    return base + '#responder=' + encodeURIComponent(title);
  }

  function openQr(slide) {
    const title = getSlideTitle(slide);
    const url = buildResponderUrl(title);
    const qrCanvas = $('#pQrCanvas');
    qrCanvas.innerHTML = '';
    try {
      // Gerar QR leve em SVG (algoritmo Reed-Solomon simplificado via qr toData → fallback imagem via Google Chart)
      drawQR(qrCanvas, url);
    } catch (e) {
      console.warn('[pedagogy] QR local falhou, usando fallback', e);
      qrCanvas.innerHTML = '<img alt="QR code" src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodeURIComponent(url) + '" style="width:240px;height:240px;background:#fff;padding:8px;border-radius:6px;" />';
    }
    $('#pQrTitle').textContent = title;
    $('#pQrUrl').textContent = url;
    // Aviso sobre a limitação same-device quando não há URL externa
    const notice = $('#pQrNotice');
    const hasCustomUrl = !!(window.PEDAGOGY_QR_URL ||
      document.querySelector('meta[name="pedagogy-qr-url"]'));
    if (notice) {
      if (hasCustomUrl) {
        notice.style.display = 'none';
      } else {
        notice.style.display = 'block';
        notice.innerHTML = '⚠ <strong>Modo demo (mesmo dispositivo):</strong> as respostas são sincronizadas via <code>localStorage</code> + <code>BroadcastChannel</code>, que só funcionam entre abas do mesmo navegador. Para coleta real multi-dispositivo, configure <code>window.PEDAGOGY_QR_URL</code> ou <code>&lt;meta name="pedagogy-qr-url" content="…"&gt;</code> apontando para um Google Forms, Typeform ou webhook.';
      }
    }
    renderAnswers(title);
    $('#pQrModal').classList.add('is-open');
    state.qrOpen = true;
  }
  function closeQr() { $('#pQrModal').classList.remove('is-open'); state.qrOpen = false; }
  function renderAnswers(title) {
    const list = $('#pQrAnswers');
    const arr = state.responses[title] || [];
    if (!arr.length) {
      list.innerHTML = '<div style="color:var(--p-muted);font-size:12px;">Aguardando respostas…</div>';
      return;
    }
    list.innerHTML = arr.map(r => {
      const ts = new Date(r.ts);
      return '<div class="p-qr-answer"><div class="p-qr-who">' +
        escapeHtml(r.who || 'Anônimo') + ' · ' + pad(ts.getHours()) + ':' + pad(ts.getMinutes()) + '</div>' +
        escapeHtml(r.text) + '</div>';
    }).join('');
  }

  // QR drawing via simples module (usa kjua se disponível, senão fallback)
  function drawQR(container, text) {
    // Simples renderer: usa a API nativa de canvas com algoritmo local.
    // Para manter zero-deps, usamos um dataurl de qrserver.com (apenas fallback online).
    // Para uso puro offline, implementamos um QR básico em SVG usando qrcode-svg-like.
    const svg = generateQrSvg(text, 240);
    container.innerHTML = svg;
  }

  // ------ QR algorithm (MIT - tiny adapter based on kazuhikoarase/qrcode-generator style) ------
  // Implementação compacta inlined: produz QR mode byte level L para strings curtas.
  // IMPORTANTE: RS_BLOCK_TABLE abaixo só cobre versões 1-5. Textos que
  // demandariam versão > 5 lançam erro explícito para que `openQr()`
  // caia no fallback externo (api.qrserver.com) em vez de quebrar.
  function generateQrSvg(text, size) {
    // Capacidade byte-mode nível M por versão: v1≈14, v2≈26, v3≈42, v4≈62, v5≈84.
    const len = text.length;
    let typeNumber = 1;
    if (len > 14) typeNumber = 2;
    if (len > 26) typeNumber = 3;
    if (len > 42) typeNumber = 4;
    if (len > 62) typeNumber = 5;
    if (len > 84) {
      throw new Error('QR local: texto com ' + len + ' chars excede capacidade v5 (84). Use fallback.');
    }
    const qr = new QRCode(typeNumber, 'M');
    qr.addData(text);
    qr.make();
    const modules = qr.getModuleCount();
    const cell = Math.floor((size - 10) / modules);
    const off = Math.floor((size - cell * modules) / 2);
    let rects = '';
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        if (qr.isDark(r, c)) {
          rects += '<rect x="' + (off + c * cell) + '" y="' + (off + r * cell) + '" width="' + cell + '" height="' + cell + '" fill="#000"/>';
        }
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges" style="background:#fff;">' + rects + '</svg>';
  }

  // ===== Minimal QR encoder (byte mode, M) =====
  // Copyright (c) 2009 Kazuhiko Arase  (MIT) — adapted compact form.
  function QRCode(typeNumber, errorCorrectLevel) {
    const PAD0 = 0xEC, PAD1 = 0x11;
    const EC_LEVELS = { L: 1, M: 0, Q: 3, H: 2 };
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = EC_LEVELS[errorCorrectLevel];
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
    const self = this;

    this.addData = function (data) { this.dataList.push(new QR8bitByte(data)); this.dataCache = null; };
    this.isDark = function (row, col) { return this.modules[row][col]; };
    this.getModuleCount = function () { return this.moduleCount; };
    this.make = function () { makeImpl(false, getBestMaskPattern()); };

    function makeImpl(test, maskPattern) {
      self.moduleCount = self.typeNumber * 4 + 17;
      self.modules = [];
      for (let row = 0; row < self.moduleCount; row++) {
        self.modules[row] = [];
        for (let col = 0; col < self.moduleCount; col++) self.modules[row][col] = null;
      }
      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(self.moduleCount - 7, 0);
      setupPositionProbePattern(0, self.moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);
      if (self.typeNumber >= 7) setupTypeNumber(test);
      if (self.dataCache == null) self.dataCache = createData(self.typeNumber, self.errorCorrectLevel, self.dataList);
      mapData(self.dataCache, maskPattern);
    }
    function setupPositionProbePattern(row, col) {
      for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
        if (row + r < 0 || self.moduleCount <= row + r || col + c < 0 || self.moduleCount <= col + c) continue;
        self.modules[row + r][col + c] = (0 <= r && r <= 6 && (c === 0 || c === 6)) || (0 <= c && c <= 6 && (r === 0 || r === 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4);
      }
    }
    function setupPositionAdjustPattern() {
      const pos = getPatternPosition(self.typeNumber);
      for (let i = 0; i < pos.length; i++) for (let j = 0; j < pos.length; j++) {
        const row = pos[i], col = pos[j];
        if (self.modules[row][col] != null) continue;
        for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) {
          self.modules[row + r][col + c] = r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0);
        }
      }
    }
    function setupTimingPattern() {
      for (let r = 8; r < self.moduleCount - 8; r++) if (self.modules[r][6] == null) self.modules[r][6] = r % 2 === 0;
      for (let c = 8; c < self.moduleCount - 8; c++) if (self.modules[6][c] == null) self.modules[6][c] = c % 2 === 0;
    }
    function setupTypeNumber(test) {
      const bits = getBCHTypeNumber(self.typeNumber);
      for (let i = 0; i < 18; i++) {
        const mod = !test && ((bits >> i) & 1) === 1;
        self.modules[Math.floor(i / 3)][i % 3 + self.moduleCount - 8 - 3] = mod;
        self.modules[i % 3 + self.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    }
    function setupTypeInfo(test, maskPattern) {
      const data = (self.errorCorrectLevel << 3) | maskPattern;
      const bits = getBCHTypeInfo(data);
      for (let i = 0; i < 15; i++) {
        const mod = !test && ((bits >> i) & 1) === 1;
        if (i < 6) self.modules[i][8] = mod;
        else if (i < 8) self.modules[i + 1][8] = mod;
        else self.modules[self.moduleCount - 15 + i][8] = mod;
      }
      for (let i = 0; i < 15; i++) {
        const mod = !test && ((bits >> i) & 1) === 1;
        if (i < 8) self.modules[8][self.moduleCount - i - 1] = mod;
        else if (i < 9) self.modules[8][15 - i - 1 + 1] = mod;
        else self.modules[8][15 - i - 1] = mod;
      }
      self.modules[self.moduleCount - 8][8] = !test;
    }
    function mapData(data, maskPattern) {
      let inc = -1, row = self.moduleCount - 1, bitIndex = 7, byteIndex = 0;
      for (let col = self.moduleCount - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (self.modules[row][col - c] == null) {
              let dark = false;
              if (byteIndex < data.length) dark = ((data[byteIndex] >>> bitIndex) & 1) === 1;
              const mask = getMask(maskPattern, row, col - c);
              if (mask) dark = !dark;
              self.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex === -1) { byteIndex++; bitIndex = 7; }
            }
          }
          row += inc;
          if (row < 0 || self.moduleCount <= row) { row -= inc; inc = -inc; break; }
        }
      }
    }
    function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case 0: return (i + j) % 2 === 0;
        case 1: return i % 2 === 0;
        case 2: return j % 3 === 0;
        case 3: return (i + j) % 3 === 0;
        case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case 5: return (i * j) % 2 + (i * j) % 3 === 0;
        case 6: return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
        case 7: return ((i * j) % 3 + (i + j) % 2) % 2 === 0;
      }
      return false;
    }
    function getBestMaskPattern() {
      let minLost = 0, pattern = 0;
      for (let i = 0; i < 8; i++) {
        makeImpl(true, i);
        const l = getLostPoint();
        if (i === 0 || minLost > l) { minLost = l; pattern = i; }
      }
      return pattern;
    }
    function getLostPoint() {
      const moduleCount = self.moduleCount, modules = self.modules;
      let lostPoint = 0;
      for (let row = 0; row < moduleCount; row++) for (let col = 0; col < moduleCount; col++) {
        let sameCount = 0; const dark = modules[row][col];
        for (let r = -1; r <= 1; r++) {
          if (row + r < 0 || moduleCount <= row + r) continue;
          for (let c = -1; c <= 1; c++) {
            if (col + c < 0 || moduleCount <= col + c) continue;
            if (r === 0 && c === 0) continue;
            if (dark === modules[row + r][col + c]) sameCount++;
          }
        }
        if (sameCount > 5) lostPoint += 3 + sameCount - 5;
      }
      return lostPoint;
    }

    // Data encoding helpers
    function createData(typeNumber, errorCorrectLevel, dataList) {
      const rsBlocks = getRSBlocks(typeNumber, errorCorrectLevel);
      const buffer = new QRBitBuffer();
      for (let i = 0; i < dataList.length; i++) {
        const d = dataList[i];
        buffer.put(4, 4);  // byte mode
        buffer.put(d.getLength(), getLengthInBits(typeNumber));
        d.write(buffer);
      }
      let totalDataCount = 0;
      for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
      if (buffer.getLengthInBits() > totalDataCount * 8) throw new Error('code length overflow');
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) buffer.put(0, 4);
      while (buffer.getLengthInBits() % 8 !== 0) buffer.putBit(false);
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) break;
        buffer.put(PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) break;
        buffer.put(PAD1, 8);
      }
      return createBytes(buffer, rsBlocks);
    }
    function createBytes(buffer, rsBlocks) {
      let offset = 0, maxDcCount = 0, maxEcCount = 0;
      const dcdata = [], ecdata = [];
      for (let r = 0; r < rsBlocks.length; r++) {
        const dcCount = rsBlocks[r].dataCount, ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = []; for (let i = 0; i < dcCount; i++) dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        offset += dcCount;
        const rsPoly = getErrorCorrectPolynomial(ecCount);
        const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        const modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = [];
        for (let i = 0; i < rsPoly.getLength() - 1; i++) {
          const modIndex = i + modPoly.getLength() - (rsPoly.getLength() - 1);
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      let totalCodeCount = 0;
      for (let i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
      const data = new Array(totalCodeCount);
      let index = 0;
      for (let i = 0; i < maxDcCount; i++) for (let r = 0; r < rsBlocks.length; r++) if (i < dcdata[r].length) data[index++] = dcdata[r][i];
      for (let i = 0; i < maxEcCount; i++) for (let r = 0; r < rsBlocks.length; r++) if (i < ecdata[r].length) data[index++] = ecdata[r][i];
      return data;
    }
    function getLengthInBits(type) { return type < 10 ? 8 : type < 27 ? 16 : 16; }
    function getPatternPosition(t) {
      return [[], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]][t] || [];
    }
    function getBCHTypeInfo(data) {
      let d = data << 10;
      while (bchDigit(d) - bchDigit(G15) >= 0) d ^= G15 << (bchDigit(d) - bchDigit(G15));
      return ((data << 10) | d) ^ G15_MASK;
    }
    function getBCHTypeNumber(data) {
      let d = data << 12;
      while (bchDigit(d) - bchDigit(G18) >= 0) d ^= G18 << (bchDigit(d) - bchDigit(G18));
      return (data << 12) | d;
    }
    const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
    function bchDigit(data) { let d = 0; while (data !== 0) { d++; data >>>= 1; } return d; }

    function getRSBlocks(typeNumber, errorCorrectLevel) {
      const rs = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + errorCorrectLevel];
      const list = [];
      for (let i = 0; i < rs.length / 3; i++) {
        const count = rs[i * 3]; const totalCount = rs[i * 3 + 1]; const dataCount = rs[i * 3 + 2];
        for (let j = 0; j < count; j++) list.push({ totalCount: totalCount, dataCount: dataCount });
      }
      return list;
    }
    const RS_BLOCK_TABLE = [
      [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
      [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
      [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
      [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
      [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12]
    ];

    function QR8bitByte(data) {
      this.mode = 4; this.data = data; this.parsedData = [];
      for (let i = 0, l = this.data.length; i < l; i++) {
        const byteArray = [];
        const code = this.data.charCodeAt(i);
        if (code > 0x10000) { byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18); byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12); byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6); byteArray[3] = 0x80 | (code & 0x3F); }
        else if (code > 0x800) { byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12); byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6); byteArray[2] = 0x80 | (code & 0x3F); }
        else if (code > 0x80) { byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6); byteArray[1] = 0x80 | (code & 0x3F); }
        else byteArray[0] = code;
        this.parsedData.push.apply(this.parsedData, byteArray);
      }
      this.parsedData = Array.prototype.concat.call([], this.parsedData);
      if (this.parsedData.length !== this.data.length) this.parsedData.unshift(191, 187, 239);
      this.getLength = function () { return this.parsedData.length; };
      this.write = function (buffer) { for (let i = 0, l = this.parsedData.length; i < l; i++) buffer.put(this.parsedData[i], 8); };
    }

    function QRBitBuffer() {
      this.buffer = []; this.length = 0;
      this.get = function (i) { return ((this.buffer[Math.floor(i / 8)] >>> (7 - i % 8)) & 1) === 1; };
      this.put = function (num, length) { for (let i = 0; i < length; i++) this.putBit(((num >>> (length - i - 1)) & 1) === 1); };
      this.getLengthInBits = function () { return this.length; };
      this.putBit = function (bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) this.buffer.push(0);
        if (bit) this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
        this.length++;
      };
    }

    const QRMath = {
      glog: function (n) { if (n < 1) throw new Error('glog ' + n); return QRMath.LOG_TABLE[n]; },
      gexp: function (n) { while (n < 0) n += 255; while (n >= 256) n -= 255; return QRMath.EXP_TABLE[n]; },
      EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
    };
    for (let i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
    for (let i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    for (let i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

    function QRPolynomial(num, shift) {
      if (num.length == undefined) throw new Error(num.length + '/' + shift);
      let offset = 0; while (offset < num.length && num[offset] === 0) offset++;
      this.num = new Array(num.length - offset + shift);
      for (let i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
      this.getLength = function () { return this.num.length; };
      this.get = function (i) { return this.num[i]; };
      this.multiply = function (e) {
        const num = new Array(this.getLength() + e.getLength() - 1);
        for (let i = 0; i < this.getLength(); i++) for (let j = 0; j < e.getLength(); j++)
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        return new QRPolynomial(num, 0);
      };
      this.mod = function (e) {
        if (this.getLength() - e.getLength() < 0) return this;
        const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        const num = new Array(this.getLength());
        for (let i = 0; i < this.getLength(); i++) num[i] = this.get(i);
        for (let i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        return new QRPolynomial(num, 0).mod(e);
      };
    }

    function getErrorCorrectPolynomial(errorCorrectLength) {
      let a = new QRPolynomial([1], 0);
      for (let i = 0; i < errorCorrectLength; i++) a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      return a;
    }
  }
  // ===== End QR encoder =====

  /* ----------------------------------------------------------------- */
  /* STUDENT FORM (via hash)                                            */
  /* ----------------------------------------------------------------- */
  function maybeShowStudentForm() {
    const m = (window.location.hash || '').match(/^#responder=(.+)$/);
    if (!m) return;
    const title = decodeURIComponent(m[1]);
    state.studentName = localStorage.getItem('senai-student-name') || '';
    const form = $('#pStudentForm');
    if (!form) return;
    form.classList.add('is-open');
    $('#pSfSlide').textContent = title;
    $('#pSfName').value = state.studentName;
    // read local buffered responses for this slide
    const bucketKey = 'senai-responses-' + title;
    const prev = safeParseArray(localStorage.getItem(bucketKey), bucketKey);
    $('#pSfPrev').innerHTML = prev.length ? '<p style="font-size:12px;color:var(--p-muted);margin-top:8px;">Suas respostas anteriores: ' + prev.length + '</p>' : '';

    $('#pSfSubmit').onclick = function () {
      const name = $('#pSfName').value.trim();
      const text = $('#pSfText').value.trim();
      if (!text) return;
      const rec = { who: name || 'Anônimo', text: text, ts: Date.now(), slide: title };
      prev.push(rec);
      localStorage.setItem(bucketKey, JSON.stringify(prev));
      localStorage.setItem('senai-student-name', name);
      // Também enviar via BroadcastChannel para o host, se disponível
      try {
        const ch = new BroadcastChannel('senai-pedagogy');
        ch.postMessage({ type: 'response', record: rec });
        ch.close();
      } catch (e) {}
      $('#pSfForm').style.display = 'none';
      $('#pSfThanks').style.display = 'block';
    };
  }

  // Host side: listen for BroadcastChannel messages and merge to state
  function setupResponseListener() {
    try {
      const ch = new BroadcastChannel('senai-pedagogy');
      ch.onmessage = function (ev) {
        if (ev.data && ev.data.type === 'response') {
          const r = ev.data.record;
          if (!state.responses[r.slide]) state.responses[r.slide] = [];
          state.responses[r.slide].push(r);
          persist();
          if (state.qrOpen) renderAnswers($('#pQrTitle').textContent);
          // Update badge on current collect button
          const activeTitle = getSlideTitle(getActiveSlide());
          if (activeTitle === r.slide) updateCollectBadges();
        }
      };
    } catch (e) { /* older browsers */ }

    // Also pull any buffered responses from localStorage on each focus
    window.addEventListener('focus', pullBufferedResponses);
    pullBufferedResponses();
  }
  function pullBufferedResponses() {
    Object.keys(localStorage).forEach(k => {
      if (!k.indexOf('senai-responses-')) {
        const title = k.substring('senai-responses-'.length);
        // Try/catch por chave: entrada corrompida não deve impedir
        // que as demais respostas sejam mescladas no state.
        const arr = safeParseArray(localStorage.getItem(k), k);
        if (!state.responses[title]) state.responses[title] = [];
        arr.forEach(r => {
          if (!state.responses[title].some(x => x.ts === r.ts && x.text === r.text)) {
            state.responses[title].push(r);
          }
        });
      }
    });
    updateCollectBadges();
  }

  // Parse defensivo: retorna array vazio se o JSON estiver corrompido
  // e remove a chave inválida para não repetir o erro em cada refresh.
  function safeParseArray(raw, key) {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      try {
        console.warn('[pedagogy] entrada localStorage inválida, descartando:', key, err);
        localStorage.removeItem(key);
      } catch (e) { /* ignora */ }
      return [];
    }
  }
  function updateCollectBadges() {
    $$('.p-collect').forEach(el => {
      const slide = el.closest('.slide');
      const title = getSlideTitle(slide);
      const count = (state.responses[title] || []).length;
      const badge = el.querySelector('.p-collect-count');
      if (badge) badge.textContent = String(count);
    });
  }

  /* ----------------------------------------------------------------- */
  /* SEMIOTIC HOTSPOTS                                                  */
  /* ----------------------------------------------------------------- */
  function enableSemioticOnImage(wrapper, spotsKey) {
    const spots = DATA.SEMIOTIC[spotsKey];
    if (!spots) return;
    wrapper.classList.add('p-semiotic-wrapper');
    // toggle button
    const toggle = document.createElement('button');
    toggle.className = 'p-semiotic-toggle';
    toggle.textContent = 'Análise Semiótica';
    toggle.type = 'button';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const on = wrapper.classList.toggle('is-semio-on');
      toggle.classList.toggle('is-on', on);
      toggle.setAttribute('aria-pressed', String(on));
    });
    wrapper.appendChild(toggle);
    // hotspots
    spots.hotspots.forEach((h, i) => {
      const dot = document.createElement('button');
      dot.className = 'p-semiotic-hotspot';
      dot.type = 'button';
      dot.style.left = h.x + '%';
      dot.style.top = h.y + '%';
      dot.setAttribute('data-kind', h.kind);
      dot.textContent = h.label;
      dot.setAttribute('aria-label', h.kind + ': ' + h.texto);
      const pop = document.createElement('div');
      pop.className = 'p-semiotic-popup';
      pop.setAttribute('data-kind', h.kind);
      pop.innerHTML = '<span class="p-sp-tag">' + h.kind + '</span><div class="p-sp-text">' + escapeHtml(h.texto) + '</div>';
      // popup é position: fixed — posição é calculada em runtime para
      // garantir que caiba dentro do viewport, mesmo se o hotspot estiver
      // numa célula de grid estreita.
      function placePopup() {
        const dotRect = dot.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // força medição com o popup visível
        const prevDisplay = pop.style.display;
        pop.style.visibility = 'hidden';
        pop.style.display = 'block';
        const pw = pop.offsetWidth;
        const ph = pop.offsetHeight;
        pop.style.display = prevDisplay;
        pop.style.visibility = '';
        const gap = 10;
        // tenta à direita do hotspot; se estourar, vai pra esquerda
        let left = dotRect.right + gap;
        if (left + pw > vw - 8) left = dotRect.left - gap - pw;
        if (left < 8) left = Math.max(8, Math.min(vw - pw - 8, dotRect.left + (dotRect.width - pw) / 2));
        // vertical: alinha pelo topo do hotspot; se estourar embaixo, sobe
        let top = dotRect.top - 4;
        if (top + ph > vh - 8) top = Math.max(8, vh - ph - 8);
        if (top < 8) top = 8;
        pop.style.left = left + 'px';
        pop.style.top = top + 'px';
      }
      dot.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const was = pop.classList.contains('is-open');
        // fecha popups de qualquer wrapper (global), pois são position: fixed
        document.querySelectorAll('.p-semiotic-popup.is-open').forEach(p => p.classList.remove('is-open'));
        if (!was) {
          placePopup();
          pop.classList.add('is-open');
        }
      });
      // clique no próprio popup não deve fechá-lo
      pop.addEventListener('click', (ev) => ev.stopPropagation());
      wrapper.appendChild(dot);
      wrapper.appendChild(pop);
    });
    // legend
    const legend = document.createElement('div');
    legend.className = 'p-semiotic-legend';
    legend.innerHTML = '<span class="p-sl-icone">Ícone</span><span class="p-sl-indice">Índice</span><span class="p-sl-simbolo">Símbolo</span>';
    wrapper.appendChild(legend);
  }

  function initSemiotic() {
    $$('[data-semiotic]').forEach(el => enableSemioticOnImage(el, el.getAttribute('data-semiotic')));
    // fecha qualquer popup fixo ao clicar fora
    document.addEventListener('click', () => {
      document.querySelectorAll('.p-semiotic-popup.is-open').forEach(p => p.classList.remove('is-open'));
    });
    // repõe posição ao redimensionar / scrollar
    const reposition = () => {
      document.querySelectorAll('.p-semiotic-popup.is-open').forEach(p => p.classList.remove('is-open'));
    };
    window.addEventListener('resize', reposition);
  }

  /* ----------------------------------------------------------------- */
  /* COMPARE SLIDER                                                     */
  /* ----------------------------------------------------------------- */
  function initCompares() {
    $$('[data-compare]').forEach(el => {
      const key = el.getAttribute('data-compare');
      const pair = DATA.COMPARE[key];
      if (!pair) return;
      buildCompare(el, pair);
    });
  }
  function buildCompare(root, pair) {
    root.classList.add('p-compare');
    root.innerHTML = '<img class="p-cmp-right" src="' + pair.direita.src + '" alt="' + pair.direita.label + '">' +
      '<div class="p-cmp-top"><img src="' + pair.esquerda.src + '" alt="' + pair.esquerda.label + '"></div>' +
      '<div class="p-cmp-handle" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" tabindex="0"></div>' +
      '<div class="p-cmp-tag p-cmp-l">' + pair.esquerda.label + '</div>' +
      '<div class="p-cmp-tag p-cmp-r">' + pair.direita.label + '</div>';
    const top = root.querySelector('.p-cmp-top');
    const handle = root.querySelector('.p-cmp-handle');
    const topImg = top.querySelector('img');
    let active = false;
    function update(pct) {
      pct = Math.max(0, Math.min(100, pct));
      // Usa clip-path no próprio img para mantê-lo alinhado com o lado direito
      topImg.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    // Deixa o container top ocupar largura total; o recorte vem do clip-path da imagem
    top.style.width = '100%';
    update(50);
    function pctFrom(e) {
      const rect = root.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return (x / rect.width) * 100;
    }
    function start(e) { active = true; update(pctFrom(e)); e.preventDefault(); }
    function move(e) { if (active) update(pctFrom(e)); }
    function end() { active = false; }
    handle.addEventListener('mousedown', start); root.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
    handle.addEventListener('touchstart', start, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    handle.addEventListener('keydown', (e) => {
      const cur = parseFloat(handle.style.left);
      if (e.key === 'ArrowLeft') { update(cur - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { update(cur + 4); e.preventDefault(); }
    });
  }

  /* ----------------------------------------------------------------- */
  /* DEEP PANEL · move [data-depth] para painel lateral por slide       */
  /* ----------------------------------------------------------------- */
  function wrapDeepContent() {
    getSlides().forEach(slide => {
      const deepNodes = $$('[data-depth="2"], [data-depth="3"]', slide);
      const hasInlineAnswer = !!slide.querySelector('.q-answer');

      // Slides só com .q-answer (sem sidepanel): hint de "Pressione 2".
      if (!deepNodes.length) {
        if (hasInlineAnswer) {
          const hint = document.createElement('div');
          hint.className = 'p-deep-hint';
          hint.textContent = 'Pressione 2 para ver as respostas';
          slide.appendChild(hint);
        }
        return;
      }

      // Backdrop que escurece o conteúdo do slide quando o painel está aberto.
      const backdrop = document.createElement('div');
      backdrop.className = 'p-deep-backdrop';
      backdrop.addEventListener('click', () => setDepth(1));
      slide.appendChild(backdrop);

      const panel = document.createElement('aside');
      panel.className = 'p-deep-panel';
      panel.setAttribute('role', 'complementary');
      panel.setAttribute('aria-label', 'Conteúdo expandido');

      const header = document.createElement('div');
      header.className = 'p-deep-header';
      header.innerHTML = '<span class="p-deep-title">Aprofundamento</span>' +
        '<button class="p-deep-close" aria-label="Voltar ao essencial" title="Voltar (1)">✕</button>';
      header.querySelector('.p-deep-close').addEventListener('click', () => setDepth(1));
      panel.appendChild(header);

      // Move cada [data-depth] para dentro do painel preservando a ordem.
      deepNodes.forEach(n => panel.appendChild(n));
      slide.appendChild(panel);

      // Hint visual no slide para indicar que existe aprofundamento
      const hasTwo = deepNodes.some(n => n.getAttribute('data-depth') === '2') || hasInlineAnswer;
      const hasThree = deepNodes.some(n => n.getAttribute('data-depth') === '3');
      // Painel sem conteúdo de nível 2 só abre no nível 3
      if (!deepNodes.some(n => n.getAttribute('data-depth') === '2')) {
        panel.classList.add('p-deep-min-3');
        backdrop.classList.add('p-deep-min-3');
      }
      const hint = document.createElement('div');
      hint.className = 'p-deep-hint';
      hint.textContent = hasTwo && hasThree ? 'Pressione 2 / 3 para expandir'
        : hasThree ? 'Pressione 3 para bônus' : 'Pressione 2 para expandir';
      slide.appendChild(hint);
    });
  }

  /* ----------------------------------------------------------------- */
  /* INTERACTIVE TIMELINE                                               */
  /* ----------------------------------------------------------------- */
  function initTimelines() {
    $$('[data-timeline="master"]').forEach(el => {
      const start = DATA.TIMELINE[0].ano;
      const end = DATA.TIMELINE[DATA.TIMELINE.length - 1].ano;
      const span = end - start;
      const track = document.createElement('div'); track.className = 'p-tl-track';
      DATA.TIMELINE.forEach((item, i) => {
        const pct = ((item.ano - start) / span) * 100;
        const node = document.createElement('div');
        node.className = 'p-tl-node ' + (i % 2 === 0 ? 'tl-above' : 'tl-below');
        node.style.left = pct + '%';
        node.innerHTML = '<div class="p-tl-label">' + item.label + '</div>' +
          '<div class="p-tl-popup"><h4>' + escapeHtml(item.titulo) + '</h4><p>' + escapeHtml(item.texto) + '</p></div>';
        node.addEventListener('click', (e) => {
          e.stopPropagation();
          const was = node.classList.contains('is-open');
          track.querySelectorAll('.p-tl-node.is-open').forEach(n => n.classList.remove('is-open'));
          if (!was) node.classList.add('is-open');
        });
        track.appendChild(node);
      });
      el.classList.add('p-timeline');
      el.appendChild(track);
      document.addEventListener('click', () => {
        track.querySelectorAll('.p-tl-node.is-open').forEach(n => n.classList.remove('is-open'));
      });
    });
  }

  /* ----------------------------------------------------------------- */
  /* PERSIST                                                            */
  /* ----------------------------------------------------------------- */
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        depth: state.depth,
        hcOn: state.hcOn,
        fontStep: state.fontStep,
        slideVisits: state.slideVisits,
        responses: state.responses
      }));
    } catch (e) {}
  }
  function restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.depth) state.depth = s.depth;
      if (s.hcOn) state.hcOn = s.hcOn;
      if (s.fontStep) state.fontStep = s.fontStep;
      if (s.slideVisits) state.slideVisits = s.slideVisits;
      if (s.responses) state.responses = s.responses;
    } catch (e) {}
  }

  /* ----------------------------------------------------------------- */
  /* SLIDE CHANGE HOOKS                                                 */
  /* ----------------------------------------------------------------- */
  function hookSlideObserver() {
    // MutationObserver detects when .active class changes
    const slides = getSlides();
    const observer = new MutationObserver(() => onSlideChanged());
    slides.forEach(s => observer.observe(s, { attributes: true, attributeFilter: ['class'] }));
    onSlideChanged(true);
  }

  function onSlideChanged(initial) {
    const active = getActiveSlide();
    const title = getSlideTitle(active);
    const now = Date.now();

    if (state.lastSlideTitle && state.lastSlideTitle !== title && state.lastEnterTs) {
      const v = state.slideVisits[state.lastSlideTitle] || { enters: 0, totalMs: 0 };
      v.totalMs += now - state.lastEnterTs;
      state.slideVisits[state.lastSlideTitle] = v;
    }
    if (title) {
      const v = state.slideVisits[title] || { enters: 0, totalMs: 0 };
      v.enters = (v.enters || 0) + 1;
      state.slideVisits[title] = v;
      state.lastSlideTitle = title;
      state.lastEnterTs = now;
    }
    // Reset depth to 1 on slide change? decision: keep, but show indicator
    updateDepthIndicator();
    if (state.presenterOpen) renderPresenter();
    renderTopBar();
    updateCollectBadges();
    persist();
  }

  /* ----------------------------------------------------------------- */
  /* KEYBOARD                                                           */
  /* ----------------------------------------------------------------- */
  function handleKey(e) {
    // Evita quando digitando em inputs
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    // Nunca agir dentro de modais do host (modal de imagem ou grid)
    if (document.getElementById('imgModal')?.classList.contains('open')) return;
    if (document.getElementById('gridOverlay')?.classList.contains('open')) return;
    // Não interceptar atalhos com Cmd/Ctrl (deixar o browser tratar zoom, copiar etc.)
    if (e.metaKey || e.ctrlKey) return;

    if (e.key === '1' || e.key === '2' || e.key === '3') {
      const level = Number(e.key);
      const active = getActiveSlide();
      if (active && (slideHasDepth(active, 2) || slideHasDepth(active, 3))) {
        setDepth(level); e.preventDefault(); return;
      }
    }
    if (e.key === 'p' || e.key === 'P') { togglePresenter(); e.preventDefault(); return; }
    if (e.key === 'r' || e.key === 'R') { if (state.reportOpen) closeReport(); else openReport(); e.preventDefault(); return; }
    if (e.key === 'c' || e.key === 'C') { toggleContrast(); e.preventDefault(); return; }
    if (e.key === '+' || e.key === '=') { bumpFont(1); e.preventDefault(); return; }
    if (e.key === '-' || e.key === '_') { bumpFont(-1); e.preventDefault(); return; }
    if (e.key === 's' || e.key === 'S') {
      // Ativa/desativa a análise semiótica na 1ª imagem com hotspots do slide
      const wrap = getActiveSlide()?.querySelector('.p-semiotic-wrapper');
      if (wrap) { wrap.querySelector('.p-semiotic-toggle').click(); e.preventDefault(); }
      return;
    }
    if (e.key === 'Escape') {
      if (state.reportOpen) { closeReport(); e.preventDefault(); return; }
      if (state.qrOpen) { closeQr(); e.preventDefault(); return; }
      if (state.presenterOpen) { togglePresenter(false); e.preventDefault(); return; }
    }
  }

  /* ----------------------------------------------------------------- */
  /* TOP BAR INITIAL RENDER                                             */
  /* ----------------------------------------------------------------- */
  function mountUi() {
    // Hot edge (reveals TopBar on hover)
    const edge = document.createElement('div');
    edge.id = 'pTopBarEdge';
    edge.setAttribute('aria-hidden', 'true');
    document.body.appendChild(edge);

    // TopBar
    const bar = document.createElement('div');
    bar.id = 'pTopBar';
    bar.innerHTML = `
      <div class="p-cluster">
        <div class="p-chip" id="pClockChip" title="Cronômetro pedagógico">
          <span class="p-dot"></span>
          <span id="pClockLabel">--:--</span>
          <span id="pBlockLabel" style="margin-left:4px;">—</span>
        </div>
        <div class="p-depth-group is-locked" id="pDepthGroup" role="group" aria-label="Profundidade do conteúdo">
          <button class="p-depth-btn is-active" data-level="1" onclick="Pedagogy.setDepth(1)" title="Nível essencial (1)">Essencial</button>
          <button class="p-depth-btn" data-level="2" onclick="Pedagogy.setDepth(2)" title="Expandir (2)">Expandir</button>
          <button class="p-depth-btn" data-level="3" onclick="Pedagogy.setDepth(3)" title="Bônus (3)">Bônus</button>
        </div>
        <div class="p-chip p-cluster-wide" id="pCompChip" title="Competências cobertas · clique para abrir o relatório" onclick="Pedagogy.openReport()">
          <span style="color:var(--p-muted)">Comp.</span>
          <span id="pCompCount">0/0</span>
        </div>
        <div class="p-chip p-cluster-wide" id="pBtnPresenter" onclick="Pedagogy.togglePresenter()" title="Presenter Mode (P)">
          <span style="font-size:12px;line-height:1;">☰</span>
          <span>Presenter</span>
        </div>
      </div>
      <div class="p-cluster">
        <button class="p-mini-btn" id="pBtnHC" onclick="Pedagogy.toggleContrast()" title="Alto contraste (C)" aria-pressed="false">◐</button>
        <button class="p-mini-btn" onclick="Pedagogy.bumpFont(-1)" title="Diminuir fonte (-)">A–</button>
        <button class="p-mini-btn" onclick="Pedagogy.bumpFont(1)" title="Aumentar fonte (+)">A+</button>
        <button class="p-mini-btn" onclick="Pedagogy.openReport()" title="Relatório da aula (R)">⎙</button>
      </div>
    `;
    document.body.appendChild(bar);

    // Presenter panel
    const pres = document.createElement('div');
    pres.id = 'pPresenter';
    pres.setAttribute('role', 'complementary');
    pres.setAttribute('aria-label', 'Painel do Professor');
    pres.innerHTML = `
      <header>
        <h2>Presenter · Prof. Daniel</h2>
        <button class="p-close" onclick="Pedagogy.togglePresenter(false)" aria-label="Fechar">✕</button>
      </header>
      <div class="p-body">
        <div class="p-section">
          <div class="p-section-title">Cronômetro</div>
          <div id="pClock">--:--:--</div>
          <div id="pClockSub">—</div>
          <div class="p-block-bar" id="pBlockBar"></div>
          <div class="p-block-labels" id="pBlockLabels"></div>
          <div id="pHealth" class="p-tip is-ok"></div>
        </div>
        <div class="p-section">
          <div class="p-section-title">Próximo slide</div>
          <div class="p-next-slide" id="pNextSlide">
            <div class="p-ns-label">A seguir</div>
            <div class="p-ns-title" id="pNextTitle">—</div>
          </div>
        </div>
        <div class="p-section">
          <div class="p-section-title">Competências do slide</div>
          <div class="p-comp-list" id="pSlideComps"></div>
        </div>
        <div class="p-section">
          <div class="p-section-title">Nota de fala</div>
          <div class="p-notes-list"><p id="pFala">—</p></div>
          <div id="pDica" class="p-tip"></div>
        </div>
        <div class="p-section">
          <div class="p-section-title">Contagem</div>
          <div id="pSlideTimer" class="p-slide-timer"></div>
        </div>
        <div class="p-section">
          <div class="p-section-title">Ações</div>
          <button class="p-btn" onclick="Pedagogy.openReport()">Gerar Relatório</button>
          <button class="p-btn p-btn-ghost" onclick="Pedagogy.exportReport('json')" style="margin-top:8px;">Exportar JSON</button>
        </div>
      </div>
    `;
    document.body.appendChild(pres);

    // Report modal
    const rep = document.createElement('div');
    rep.id = 'pReport';
    rep.innerHTML = `
      <div class="p-report-box" role="document">
        <div class="p-report-header">
          <div>
            <h1>Relatório da Aula</h1>
            <div class="p-report-sub" id="pReportSubtitle">${escapeHtml(DATA.META.aula)} · ${escapeHtml(DATA.META.uc)} · ${escapeHtml(DATA.META.turma)}</div>
            <div class="p-report-sub" id="pReportDate"></div>
          </div>
          <button class="p-close" onclick="Pedagogy.closeReport()" aria-label="Fechar">✕</button>
        </div>
        <h2>Síntese</h2>
        <div class="p-report-grid" id="pReportStats"></div>
        <h2>Blocos executados</h2>
        <div id="pReportBlocks"></div>
        <h2>Competências cobertas</h2>
        <div id="pReportComps"></div>
        <h2>Respostas dos alunos</h2>
        <div id="pReportResponses"></div>
        <div class="p-report-actions">
          <button class="p-btn p-btn-ghost" onclick="Pedagogy.closeReport()">Fechar</button>
          <button class="p-btn p-btn-ghost" onclick="Pedagogy.exportReport('json')">Exportar JSON</button>
          <button class="p-btn" onclick="Pedagogy.exportReport('pdf')">Salvar em PDF</button>
        </div>
      </div>
    `;
    document.body.appendChild(rep);
    rep.addEventListener('click', (e) => { if (e.target === rep) closeReport(); });

    // QR modal
    const qr = document.createElement('div');
    qr.id = 'pQrModal';
    qr.innerHTML = `
      <div class="p-qr-box">
        <div class="p-qr-canvas" id="pQrCanvas"></div>
        <div>
          <h2>Coleta de respostas · ao vivo</h2>
          <h1 id="pQrTitle">—</h1>
          <p>Peça aos alunos para escanearem o QR ou abrirem o link a seguir. As respostas aparecem aqui em tempo real e entram no relatório.</p>
          <p style="font-family:var(--font-mono, monospace);font-size:11px;color:var(--p-muted);margin-top:10px;word-break:break-all;" id="pQrUrl"></p>
          <div id="pQrNotice" style="display:none;margin-top:10px;padding:8px 10px;background:rgba(196,168,108,0.08);border:1px solid rgba(196,168,108,0.3);border-radius:4px;font-size:11px;line-height:1.45;color:var(--p-cream-mut);"></div>
          <div class="p-section-title" style="margin-top:18px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--p-accent);">Respostas recebidas</div>
          <div class="p-qr-answers" id="pQrAnswers"></div>
          <div style="display:flex;gap:8px;margin-top:12px;justify-content:flex-end;">
            <button class="p-btn p-btn-ghost" onclick="Pedagogy.closeQr()">Fechar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(qr);
    qr.addEventListener('click', (e) => { if (e.target === qr) closeQr(); });

    // Student form (same document; exibido apenas se hash #responder=...)
    const sf = document.createElement('div');
    sf.id = 'pStudentForm';
    sf.innerHTML = `
      <div class="p-sf-box">
        <div id="pSfForm">
          <h1>Resposta do aluno</h1>
          <h2 id="pSfSlide">—</h2>
          <label for="pSfName">Seu nome (opcional)</label>
          <input id="pSfName" type="text" autocomplete="name" placeholder="ex: Ana Silva">
          <label for="pSfText">Sua resposta</label>
          <textarea id="pSfText" placeholder="Digite sua resposta…"></textarea>
          <div id="pSfPrev"></div>
          <button class="p-btn" id="pSfSubmit">Enviar</button>
        </div>
        <div class="p-sf-thanks" id="pSfThanks" style="display:none;">
          <h2>Obrigado!</h2>
          <p>Sua resposta foi registrada. Pode fechar esta aba.</p>
        </div>
      </div>
    `;
    document.body.appendChild(sf);

    // Inject collect buttons into research slides
    $$('.slide').forEach(slide => {
      const title = slide.getAttribute('data-title') || '';
      if (/^Pesquisa:|Discussão|Fotos Icônicas|Fotógrafos/i.test(title) ||
          slide.getAttribute('data-collect') === 'true') {
        injectCollect(slide);
      }
    });

    // Hook existing top-bar buttons layout so we don't overlap with host progressBar
  }

  function injectCollect(slide) {
    const wrap = document.createElement('div');
    wrap.className = 'p-collect';
    wrap.innerHTML =
      '<button class="p-collect-btn" title="Coleta de respostas via QR" aria-label="Abrir coleta de respostas">+</button>' +
      '<span class="p-collect-count" aria-live="polite">0</span>';
    wrap.querySelector('.p-collect-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openQr(slide);
    });
    // Posiciona dentro do slide-inner
    const inner = slide.querySelector('.slide-inner') || slide;
    inner.appendChild(wrap);
  }

  /* ----------------------------------------------------------------- */
  /* INIT                                                               */
  /* ----------------------------------------------------------------- */
  function init() {
    // Primeiro, verifica se é um aluno entrando pelo hash #responder=...
    if ((window.location.hash || '').indexOf('#responder=') === 0) {
      // Monta só a parte do formulário
      const sf = document.createElement('div');
      sf.id = 'pStudentForm';
      sf.innerHTML = `
        <div class="p-sf-box">
          <div id="pSfForm">
            <h1>Resposta do aluno</h1>
            <h2 id="pSfSlide">—</h2>
            <label for="pSfName">Seu nome (opcional)</label>
            <input id="pSfName" type="text" autocomplete="name" placeholder="ex: Ana Silva">
            <label for="pSfText">Sua resposta</label>
            <textarea id="pSfText" placeholder="Digite sua resposta…"></textarea>
            <div id="pSfPrev"></div>
            <button class="p-btn" id="pSfSubmit">Enviar</button>
          </div>
          <div class="p-sf-thanks" id="pSfThanks" style="display:none;">
            <h2>Obrigado!</h2>
            <p>Sua resposta foi registrada. Pode fechar esta aba.</p>
          </div>
        </div>
      `;
      document.body.appendChild(sf);
      // Esconde a apresentação
      $$('.slide').forEach(s => s.style.display = 'none');
      const bar = document.getElementById('bottomBar'); if (bar) bar.style.display = 'none';
      const prog = document.getElementById('progressBar'); if (prog) prog.style.display = 'none';
      maybeShowStudentForm();
      return;
    }

    restore();
    mountUi();
    // Move conteúdo [data-depth] para painel lateral ANTES de inicializar widgets
    // (timeline/compare precisam estar no DOM final para cálculos de layout)
    wrapDeepContent();
    // Apply depth state
    document.documentElement.classList.add('p-depth-1');
    setDepth(state.depth);
    if (state.hcOn) toggleContrast(true);
    if (state.fontStep) bumpFont(state.fontStep); // sets classes
    hookSlideObserver();
    setupResponseListener();
    document.addEventListener('keydown', handleKey);
    // Interval
    setInterval(() => {
      renderTopBar();
      if (state.presenterOpen) renderPresenter();
    }, 1000);
    // Camada 3 setup
    initSemiotic();
    initCompares();
    initTimelines();
    renderTopBar();
  }

  // Expose
  window.Pedagogy = {
    setDepth: setDepth,
    togglePresenter: togglePresenter,
    openReport: openReport,
    closeReport: closeReport,
    exportReport: exportReport,
    closeQr: closeQr,
    toggleContrast: toggleContrast,
    bumpFont: bumpFont,
    _state: state,
    _data: DATA
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
