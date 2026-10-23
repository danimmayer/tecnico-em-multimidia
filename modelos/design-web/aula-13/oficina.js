(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const norm = (text = '') => String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const KEY = 'senai-design-web-13-rota-v1';
  const MIN_FINDINGS = 5, MIN_FIXES = 3, WEIGHT_LIMIT = 1, BASE_WEIGHT = 0.1, SLOW_KBPS = 400;

  /* ---------- Cor: fórmula de luminância relativa das WCAG ---------- */
  const hexToRgb = hex => { const h = hex.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const parseColor = value => {
    if (!value) return null;
    if (value.startsWith('#')) return [...hexToRgb(value), 1];
    const match = value.match(/rgba?\(([^)]+)\)/);
    if (!match) return null;
    const parts = match[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
  };
  const channel = c => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  // Arredonda para baixo: 4,48 não pode aparecer como 4,5.
  const fmtRatio = r => `${(Math.floor(r * 10) / 10).toFixed(1).replace('.', ',')}:1`;
  const rgbToHsl = ([r, g, b]) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) return [0, 0, l * 100];
    const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s * 100, l * 100];
  };
  const hslToHex = (h, s, l) => {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = n => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return '#' + [f(0), f(8), f(4)].map(v => v.toString(16).padStart(2, '0')).join('');
  };
  const svg = markup => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" ${markup}</svg>`);

  /* ---------- Imagens da página fictícia ---------- */
  const IMG = {
    hero: svg('viewBox="0 0 640 260" width="640" height="260"><rect width="640" height="260" fill="#10213a"/><circle cx="540" cy="70" r="120" fill="#f2b705"/><path d="M0 210 Q160 150 320 205 T640 190 V260 H0Z" fill="#0057b8"/><text x="36" y="104" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="#ffffff">CRIAR PARA</text><text x="36" y="152" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="#ffffff">TODO MUNDO</text><text x="38" y="190" font-family="Arial,sans-serif" font-size="18" fill="#f2b705">SÁB 25/10 · 20H · GALPÃO 2</text>'),
    map: svg('viewBox="0 0 640 220" width="640" height="220"><rect width="640" height="220" fill="#f3efe3"/><rect x="0" y="92" width="640" height="34" fill="#d9d2bf"/><rect x="300" y="0" width="34" height="220" fill="#d9d2bf"/><rect x="360" y="20" width="200" height="62" fill="#10213a"/><text x="378" y="58" font-family="Arial,sans-serif" font-size="20" font-weight="700" fill="#ffffff">GALPÃO 2</text><path d="M60 170 H317 V100 H380" stroke="#0057b8" stroke-width="6" fill="none" stroke-dasharray="14 8"/><circle cx="60" cy="170" r="10" fill="#b42318"/><text x="24" y="206" font-family="Arial,sans-serif" font-size="15" fill="#10213a">Rua das Oficinas, 24 · até 20h</text><text x="350" y="160" font-family="Arial,sans-serif" font-size="15" fill="#10213a">Rua Norte, 80 · após 20h</text><text x="350" y="180" font-family="Arial,sans-serif" font-size="15" fill="#10213a">sem degraus · campainha</text>'),
    ornament: svg('viewBox="0 0 120 24" width="120" height="24"><path d="M2 12 Q17 0 32 12 T62 12 T92 12 T118 12" stroke="#f2b705" stroke-width="3" fill="none"/>'),
    ramp: svg('viewBox="0 0 320 200" width="320" height="200"><rect width="320" height="200" fill="#dfe8f2"/><rect x="0" y="150" width="320" height="50" fill="#9aa5b1"/><path d="M30 150 L230 96 L230 150Z" fill="#c4ccd4"/><path d="M30 132 L230 78" stroke="#10213a" stroke-width="5"/><rect x="230" y="40" width="80" height="110" fill="#10213a"/><rect x="250" y="70" width="40" height="80" fill="#f2b705"/><rect x="222" y="10" width="94" height="24" fill="#0057b8"/><text x="269" y="27" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#ffffff">SEM DEGRAUS</text>'),
    search: svg('viewBox="0 0 48 48" width="48" height="48"><circle cx="20" cy="20" r="12" stroke="#10213a" stroke-width="5" fill="none"/><path d="M29 29 L42 42" stroke="#10213a" stroke-width="6" stroke-linecap="round"/>')
  };

  /* ---------- Página de demonstração da Virada Criativa ---------- */
  const BAD_DOM = ['banner', 'header', 'form', 'hero', 'info', 'video', 'ornament', 'footer', 'route'];
  const VISUAL = ['banner', 'header', 'hero', 'info', 'video', 'route', 'form', 'ornament', 'footer'];
  const SECTION_NAMES = {banner:'Aviso no topo', header:'Cabeçalho e menu', hero:'Imagem de capa', info:'Título, data e local', video:'Vídeo da curadoria', route:'Como chegar', form:'Formulário de inscrição', ornament:'Ornamento', footer:'Rodapé'};
  const SCRIPT = ['Oi! Eu sou a Bia, da curadoria da Virada Criativa.', 'No sábado, às 20h, a conversa “Criar para todo mundo” acontece no Galpão 2.', 'A entrada é gratuita e tem intérprete de Libras.', 'Depois das 20h, entre pela Rua Norte, 80: a entrada é sem degraus.'];
  // Cores da página original: a estação de contraste mede exatamente estes pares.
  const PAGE = {info:'#a3a3a3', infoBg:'#ffffff', button:'#ffffff', buttonBg:'#f2b705', footer:'#6b7280', footerBg:'#1f2937', link:'#c2410c', linkBg:'#fff7ed'};
  const BAD = () => ({infoColor:PAGE.info, buttonText:PAGE.button, footerColor:PAGE.footer, realButtons:false, focus:'none', textSize:11, fluid:false, target:16,
    labels:false, required:false, errorText:false, captions:'', autoplay:true, order:null, altHero:'', altMap:'', ornamentDecorative:false, routeText:false,
    weight:{video:'full', hero:'original', map:'image', fonts:'web', carousel:'on'}});
  const COLOR_OPTIONS = {
    infoColor:[[PAGE.info, 'Cinza-claro original'], ['#767676', 'Cinza médio'], ['#3d4756', 'Grafite']],
    buttonText:[[PAGE.button, 'Branco original'], ['#10213a', 'Azul-escuro da marca']],
    footerColor:[[PAGE.footer, 'Cinza original'], ['#9aa3af', 'Cinza-claro'], ['#e5e7eb', 'Quase branco']]
  };
  const COLOR_BG = {infoColor:PAGE.infoBg, buttonText:PAGE.buttonBg, footerColor:PAGE.footerBg};

  function demoCSS(f, R) {
    const font = f.weight.fonts === 'web' ? '"Display Fantasia","Trebuchet MS",sans-serif' : 'system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif';
    const t = f.target, roomy = t >= 24;
    const focus = {none:'outline:none', thin:'outline:1px dotted #c8c8c8;outline-offset:1px', strong:'outline:3px solid #0057b8;outline-offset:3px;box-shadow:0 0 0 6px #ffffff'}[f.focus] || 'outline:none';
    const order = f.order ? '' : VISUAL.map((id, i) => `${R} [data-section="${id}"]{order:${i + 1}}`).join('');
    return `${R}{all:initial;display:block;font-family:${font};color:#1b1b1b;background:#ffffff;font-size:${f.textSize}px;line-height:${f.textSize >= 16 ? 1.5 : 1.2}}
${R} *{box-sizing:border-box}
${R} [hidden]{display:none!important}
${R} .vc-page{display:flex;flex-direction:column;gap:14px;padding:0 0 16px;overflow-x:hidden}
${R} p{margin:0}
${R} h1,${R} h2{margin:0;color:#10213a;line-height:1.15}
${R} h1{font-size:28px;font-weight:900}
${R} h2{font-size:20px;font-weight:800;margin-bottom:8px}
${R} a{color:#0057b8}
${R} button{font:inherit;cursor:pointer}
${R} .vc-banner{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:6px 14px;background:#10213a;color:#ffffff}
${R} .vc-close{display:inline-grid;place-items:center;flex:0 0 auto;width:${t}px;height:${t}px;padding:0;color:#ffffff;background:transparent;border:${roomy ? '1px solid #ffffff' : '0'};border-radius:4px;font-size:${Math.min(Math.round(t * 0.6), 20)}px;line-height:1;cursor:pointer}
${R} .vc-header{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:10px 14px;border-bottom:3px solid #f2b705}
${R} .vc-logo{font-size:18px;font-weight:900;letter-spacing:.08em;color:#10213a}
${R} .vc-nav{display:flex;flex-wrap:wrap;gap:${roomy ? 6 : 2}px}
${R} .vc-nav a{display:inline-flex;align-items:center;min-height:${t}px;padding:0 ${roomy ? 10 : 2}px}
${R} .vc-hero{margin:0;padding:0 14px}
${R} .vc-hero img,${R} .vc-route img{display:block;width:100%;height:auto;border-radius:6px}
${R} .vc-infobox{padding:0 14px}
${R} .vc-info{margin-top:6px;color:${f.infoColor};${f.fluid ? 'max-width:100%;white-space:normal' : 'width:520px;white-space:nowrap;overflow:hidden'}}
${R} .vc-videobox{padding:0 14px}
${R} .vc-video{position:relative;display:grid;place-items:center;min-height:150px;padding:18px;color:#ffffff;background:#10213a;border-radius:6px;text-align:center}
${R} .vc-play{min-height:${Math.max(t, 32)}px;padding:0 16px;color:#10213a;background:#f2b705;border:0;border-radius:4px;font-weight:800;display:inline-flex;align-items:center}
${R} .vc-cap{position:absolute;left:8%;right:8%;bottom:10px;padding:4px 8px;color:#ffffff;background:rgba(0,0,0,.85);font-size:${Math.max(14, f.textSize)}px;line-height:1.3}
${R} .vc-tr{margin-top:8px}
${R} .vc-tr summary{min-height:${Math.max(t, 24)}px;cursor:pointer;font-weight:700;color:#0057b8}
${R} .vc-transcript{padding:0 14px}
${R} .vc-route{padding:0 14px}
${R} .vc-routetext{margin:8px 0;padding:8px 10px;border-left:4px solid #0057b8;background:#eef4fb}
${R} .vc-maplink{display:inline-flex;align-items:center;min-height:${t}px;margin-top:6px;color:${PAGE.link};background:${PAGE.linkBg};padding:0 ${roomy ? 10 : 2}px}
${R} .vc-form{display:grid;gap:8px;margin:0 14px;padding:14px;background:#fff7e0;border-radius:6px}
${R} .vc-form label{font-weight:700;color:#10213a}
${R} .vc-form input{font:inherit;width:100%;min-height:${Math.max(t, 32)}px;padding:6px 8px;color:#1b1b1b;background:#ffffff;border:1px solid #c9c9c9;border-radius:4px}
${R} .vc-form input::placeholder{color:#9b9b9b}
${R} .vc-form input.is-error{border:2px solid #d92d20}
${R} .vc-error{color:#b42318;font-weight:700}
${R} .vc-submit{display:inline-flex;justify-content:center;align-items:center;justify-self:start;min-height:${Math.max(t, 32)}px;padding:0 18px;color:${f.buttonText};background:${PAGE.buttonBg};border:0;border-radius:4px;font-weight:800;cursor:pointer}
${R} .vc-msg{font-weight:700;color:#10213a}
${R} .vc-ornament{display:block;width:120px;height:auto;margin:0 auto}
${R} .vc-footer{display:grid;gap:4px;padding:12px 14px;color:${f.footerColor};background:${PAGE.footerBg};font-size:${Math.max(10, f.textSize - 1)}px}
${R} a:focus,${R} button:focus,${R} input:focus,${R} summary:focus,${R} [tabindex]:focus{${focus}}
${R}.is-zoom{zoom:2}
${R}.is-inspecting [data-part]{cursor:help}
${R} [data-part].is-hover{outline:3px dashed #b42318!important;outline-offset:2px}
${R} [data-part].is-picked{outline:4px solid #b42318!important;outline-offset:2px}
${order}`;
  }

  function demoHTML(f) {
    const control = (cls, part, label, name, type = 'button') => f.realButtons
      ? `<button type="${type}" class="${cls}" data-part="${part}"${name ? ` aria-label="${name}"` : ''}>${label}</button>`
      : `<span class="${cls}" data-part="${part}" data-fake="botão">${label}</span>`;
    const caps = f.captions.split('\n').map(line => line.trim()).filter(Boolean);
    const transcript = caps.map(esc).join('<br>');
    const alt = value => value.trim() ? ` alt="${esc(value.trim())}"` : '';
    const field = (id, part, label) => `${f.labels ? `<label for="vc-${id}">${label}${f.required ? ' (obrigatório)' : ''}</label>` : ''}<input id="vc-${id}" name="${id}" data-part="${part}" autocomplete="off"${f.labels ? '' : ` placeholder="${label}${f.required ? ' (obrigatório)' : '*'}"`}${f.errorText ? ` aria-describedby="vc-${id}-erro"` : ''}>${f.errorText ? `<p class="vc-error" id="vc-${id}-erro" hidden>⚠ Escreva ${id === 'nome' ? 'um nome' : 'um e-mail'} para continuar.</p>` : ''}`;
    const video = f.weight.video === 'removed'
      ? (caps.length ? `<section class="vc-transcript" data-section="video" data-part="video" data-media="transcricao"><h2>Convite da curadoria</h2><p>${transcript}</p></section>` : '<div data-section="video" hidden></div>')
      : `<section class="vc-videobox" data-section="video"><div class="vc-video" data-part="video" data-autoplay="${f.autoplay}" data-captions="${caps.length > 0}">${f.weight.video === 'click' ? control('vc-play', 'play', '▶ Assistir ao convite da curadoria · 0:24') : `<p class="vc-screen">${f.autoplay ? '▶ Reproduzindo automaticamente · convite da curadoria · 0:24' : '▶ Convite da curadoria · 0:24 · pausado'}</p>`}${caps.length ? `<p class="vc-cap" aria-hidden="true">${esc(caps[0])}</p>` : ''}</div>${caps.length ? `<details class="vc-tr"><summary>Transcrição do convite</summary><p>${transcript}</p></details>` : ''}</section>`;
    const sections = {
      banner: `<div class="vc-banner" data-section="banner"><p>Novidade: oficina extra de serigrafia no domingo!</p>${control('vc-close', 'close', '✕', 'Fechar aviso')}</div>`,
      header: `<header class="vc-header" data-section="header"><span class="vc-logo" data-part="logo">VIRADA CRIATIVA</span><nav class="vc-nav" data-part="nav" aria-label="Menu"><a href="#programacao">Programação</a><a href="#chegar">Como chegar</a><a href="#contato">Contato</a></nav></header>`,
      hero: f.weight.hero === 'removed' ? '<div data-section="hero" hidden></div>' : `<figure class="vc-hero" data-section="hero"><img data-part="hero" src="${IMG.hero}"${alt(f.altHero)} data-file="capa-virada-final2.jpg" width="640" height="260"></figure>`,
      info: `<div class="vc-infobox" data-section="info"><h1 class="vc-title" data-part="title">Criar para todo mundo</h1><p class="vc-info" data-part="info"><span>Sábado, 25/10</span> · <span>20h</span> · <span>Galpão 2</span> · <span>entrada gratuita</span> · <span>intérprete de Libras</span></p></div>`,
      video,
      route: `<section class="vc-route" data-section="route" data-part="route" id="chegar"><h2>Como chegar</h2>${f.weight.map === 'removed' ? '' : `<img src="${IMG.map}"${alt(f.altMap)} data-file="mapa-rota.png" width="640" height="220">`}${f.routeText ? '<p class="vc-routetext">Até 20h: entrada pela Rua das Oficinas, 24. Depois das 20h: Rua Norte, 80, entrada sem degraus, com campainha e equipe de apoio.</p>' : ''}<a href="#mapa" class="vc-maplink">Ver mapa</a></section>`,
      form: `<form class="vc-form" data-section="form" data-part="form" novalidate data-error="${f.errorText ? 'text' : 'color'}"><h2>Inscreva-se</h2>${field('nome', 'field-name', 'Nome')}${field('email', 'field-email', 'E-mail')}${control('vc-submit', 'submit', 'Inscrever', '', 'submit')}<p class="vc-msg" role="status"></p></form>`,
      ornament: `<img class="vc-ornament" data-section="ornament" data-part="ornament" src="${IMG.ornament}" alt="${f.ornamentDecorative ? '' : 'ornamento-final-v3.png'}" width="120" height="24">`,
      footer: `<footer class="vc-footer" data-section="footer" data-part="footer" id="contato"><p>Virada Criativa · organização fictícia para estudo · contato@virada.exemplo</p><p>${f.weight.carousel === 'on' ? 'Apoio: ◀ Coletivo Tinta ▶' : 'Apoio: Coletivo Tinta · Rádio Bairro · Ateliê Norte'}</p></footer>`
    };
    return `<div class="vc-page">${(f.order || BAD_DOM).map(id => sections[id]).join('')}</div>`;
  }

  /* ---------- Leitura linear: aproximação didática do que um leitor de tela anuncia ---------- */
  function linearRead(root) {
    const lines = [];
    const visible = el => !el.closest('[hidden]') && !el.closest('[aria-hidden="true"]') && (!el.closest('details:not([open])') || el.tagName === 'SUMMARY' || el.tagName === 'DETAILS');
    for (const el of root.querySelectorAll('*')) {
      if (!visible(el)) continue;
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      const tag = el.tagName;
      if (/^H[1-3]$/.test(tag)) lines.push({text:`Título nível ${tag[1]}: ${text}`});
      else if (tag === 'P' && !el.closest('label,button,summary,.vc-video') && !el.querySelector('img')) lines.push({text});
      else if (tag === 'A') lines.push({text:`Link: ${text}`});
      else if (tag === 'BUTTON') { const name = el.getAttribute('aria-label') || text; lines.push({text:`Botão: ${name}${name.length < 2 ? ' (sem nome claro)' : ''}`, warn:name.length < 2}); }
      else if (el.dataset.fake) lines.push({text:`Texto: “${text}” — parece ${el.dataset.fake}, mas não é anunciado como ${el.dataset.fake} nem alcançado por Tab`, warn:true});
      else if (tag === 'IMG') {
        const altText = el.getAttribute('alt');
        if (altText === null) lines.push({text:`Imagem sem descrição — o leitor pode anunciar só o arquivo “${el.dataset.file || 'imagem'}”`, warn:true});
        else if (altText === '') lines.push({text:'(imagem decorativa, ignorada pela leitura)', quiet:true});
        else if (/\.(png|jpe?g|svg|webp|gif)$/i.test(altText)) lines.push({text:`Imagem: ${altText} — nome de arquivo não descreve`, warn:true});
        else lines.push({text:`Imagem: ${altText}`});
      } else if (tag === 'INPUT') {
        const label = el.labels && el.labels[0] ? el.labels[0].textContent.trim() : '';
        lines.push(label ? {text:`Campo de edição: ${label}`} : {text:`Campo de edição sem rótulo — a dica “${el.placeholder}” some quando a pessoa digita`, warn:true});
      } else if (el.classList.contains('vc-video')) {
        const autoplay = el.dataset.autoplay === 'true', caps = el.dataset.captions === 'true';
        lines.push({text:`Vídeo: convite da curadoria, 24 segundos${autoplay ? ', começa sozinho' : ''}${caps ? ', com legendas' : ', sem legendas'}`, warn:autoplay || !caps});
      } else if (tag === 'SUMMARY') lines.push({text:`Botão expansível: ${text}`});
      else if (tag === 'NAV') lines.push({text:`Navegação: ${el.getAttribute('aria-label') || 'sem nome'}`, quiet:true});
      else if (tag === 'FORM') lines.push({text:'Formulário', quiet:true});
    }
    return lines;
  }
  const linearHTML = root => `<ol class="linear">${linearRead(root).map(line => `<li class="${line.warn ? 'warn' : line.quiet ? 'quiet' : ''}">${line.warn ? '<span class="tag">barreira</span> ' : ''}${esc(line.text)}</li>`).join('')}</ol><p class="fine">Aproximação didática: leitores de tela reais variam conforme o programa e as configurações.</p>`;

  /* ---------- Medições do inspetor ---------- */
  const CRITERIA = [
    ['foco', 'Foco e teclado'], ['contraste', 'Contraste'], ['texto', 'Tamanho do texto e ampliação'], ['toque', 'Área de toque'],
    ['rotulos', 'Rótulos e nomes'], ['legenda', 'Legenda e mídia'], ['ordem', 'Ordem de leitura'], ['alt', 'Texto alternativo'], ['cor', 'Cor como único meio']
  ];
  const critName = id => (CRITERIA.find(([key]) => key === id) || ['', id])[1];
  const PARTS = {
    close:{name:'Botão ✕ do aviso', facts:['size', 'focus', 'name']},
    logo:{name:'Logotipo em texto', facts:['contrast', 'font']},
    nav:{name:'Links do menu', facts:['contrast', 'font', 'size']},
    hero:{name:'Imagem de capa', facts:['alt']},
    title:{name:'Título da conversa', facts:['contrast', 'font']},
    info:{name:'Data, horário e local', facts:['contrast', 'font', 'reflow']},
    video:{name:'Vídeo da curadoria', facts:['media']},
    route:{name:'Seção Como chegar', facts:['alt', 'order', 'size']},
    form:{name:'Formulário de inscrição', facts:['order']},
    'field-name':{name:'Campo Nome', facts:['label', 'error']},
    'field-email':{name:'Campo E-mail', facts:['label', 'error']},
    submit:{name:'Botão Inscrever', facts:['contrast', 'focus', 'size']},
    ornament:{name:'Ornamento', facts:['alt']},
    footer:{name:'Rodapé', facts:['contrast', 'font']}
  };
  function background(el) {
    for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
      const color = parseColor(getComputedStyle(node).backgroundColor);
      if (color && color[3] > 0) return color;
    }
    return [255, 255, 255, 1];
  }
  let measuring = false;
  function measure(el, zoomed) {
    const part = el.dataset.part, facts = [];
    const textEl = part === 'nav' ? el.querySelector('a') : el;
    const targets = part === 'nav' ? [...el.querySelectorAll('a')] : part === 'route' ? [el.querySelector('.vc-maplink')] : [el];
    for (const kind of PARTS[part].facts) {
      if (kind === 'contrast') {
        const style = getComputedStyle(textEl), size = parseFloat(style.fontSize), bold = Number(style.fontWeight) >= 700;
        const large = size >= 24 || (size >= 18.66 && bold), min = large ? 3 : 4.5, r = contrast(parseColor(style.color), background(textEl));
        facts.push({crit:'contraste', pass:r >= min, text:`Contraste do texto: ${fmtRatio(r)} · mínimo ${large ? '3:1 para texto grande' : '4,5:1 para texto comum'}`});
      } else if (kind === 'font') {
        const size = parseFloat(getComputedStyle(textEl).fontSize);
        facts.push({crit:'texto', pass:size >= 16, text:`Tamanho da letra: ${Math.round(size)} px · referência para leitura confortável: 16 px`});
      } else if (kind === 'reflow') {
        const style = getComputedStyle(el), fixed = style.whiteSpace === 'nowrap';
        facts.push({crit:'texto', pass:!fixed, text:fixed ? `Largura fixa de ${Math.round(parseFloat(style.width))} px, sem quebra de linha: ao ampliar, o excedente é cortado` : 'Largura fluida: o texto quebra a linha ao ampliar'});
      } else if (kind === 'size') {
        if (zoomed) { facts.push({crit:'toque', pass:null, text:'Desligue o Zoom 200% para medir a área de toque.'}); continue; }
        const sizes = targets.filter(Boolean).map(target => target.getBoundingClientRect());
        const w = Math.round(Math.min(...sizes.map(r => r.width))), h = Math.round(Math.min(...sizes.map(r => r.height)));
        facts.push({crit:'toque', pass:Math.min(w, h) >= 24, text:`Área de toque${targets.length > 1 ? ' do menor link' : ''}: ${w} × ${h} px · mínimo 24 × 24 px (WCAG 2.2); recomendável 44 × 44 px`});
      } else if (kind === 'focus') {
        const focusable = el.matches('a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])');
        if (!focusable) { facts.push({crit:'foco', pass:false, text:'Não recebe foco pelo teclado: é um texto clicável, não um botão.'}); continue; }
        const previous = document.activeElement;
        measuring = true; el.focus({preventScroll:true});
        const style = getComputedStyle(el), width = parseFloat(style.outlineWidth) || 0, visibleRing = style.outlineStyle !== 'none' && width >= 2;
        el.blur(); previous && previous.focus && previous.focus({preventScroll:true}); measuring = false;
        facts.push({crit:'foco', pass:visibleRing, text:visibleRing ? `Ao receber foco: contorno ${style.outlineStyle} de ${width} px` : `Ao receber foco: ${style.outlineStyle === 'none' ? 'nenhum contorno' : `contorno de ${width} px, difícil de ver`}`});
      } else if (kind === 'name') {
        const name = (el.getAttribute('aria-label') || el.textContent).trim();
        facts.push({crit:'rotulos', pass:name.length > 2, text:`Nome anunciado: “${name}”${name.length > 2 ? '' : ' — não diz a função'}`});
      } else if (kind === 'alt') {
        const img = el.tagName === 'IMG' ? el : el.querySelector('img');
        if (!img) { facts.push({crit:'alt', pass:null, text:'Esta versão não tem imagem nesta seção.'}); continue; }
        const value = img.getAttribute('alt');
        if (value === null) facts.push({crit:'alt', pass:false, text:'Sem texto alternativo: o atributo alt está ausente'});
        else if (value === '') facts.push({crit:'alt', pass:null, text:'Texto alternativo vazio: a imagem é tratada como decorativa'});
        else if (/\.(png|jpe?g|svg|webp|gif)$/i.test(value)) facts.push({crit:'alt', pass:false, text:`Texto alternativo é um nome de arquivo: “${value}”`});
        else facts.push({crit:'alt', pass:true, text:`Texto alternativo: “${value}”`});
      } else if (kind === 'order') {
        const section = el.closest('[data-section]'), page = section.parentElement;
        const children = [...page.children].filter(child => !child.hidden);
        const dom = children.indexOf(section) + 1;
        const visual = [...children].sort((a, b) => (Number(getComputedStyle(a).order) - Number(getComputedStyle(b).order)) || (children.indexOf(a) - children.indexOf(b))).indexOf(section) + 1;
        facts.push({crit:'ordem', pass:dom === visual, text:`Posição na leitura: ${dom}ª · posição na tela: ${visual}ª`});
      } else if (kind === 'media') {
        const autoplay = el.dataset.autoplay === 'true', caps = el.dataset.captions === 'true';
        facts.push({crit:'legenda', pass:!autoplay && caps, text:`Começa sozinho: ${autoplay ? 'sim' : 'não'} · Legendas: ${caps ? 'sim' : 'não'} · Transcrição: ${caps ? 'sim' : 'não'}`});
      } else if (kind === 'label') {
        const label = el.labels && el.labels[0] ? el.labels[0].textContent.trim() : '';
        facts.push({crit:'rotulos', pass:!!label, text:label ? `Rótulo visível: “${label}”` : `Sem rótulo: só a dica “${el.placeholder}”, que some ao digitar`});
      } else if (kind === 'error') {
        const byColor = el.closest('form').dataset.error === 'color';
        facts.push({crit:'cor', pass:!byColor, text:byColor ? 'Erro de preenchimento indicado só pela cor da borda' : 'Erro de preenchimento em texto, com ícone, junto ao campo'});
      }
    }
    return facts;
  }
  const factIcon = pass => pass === true ? '<span class="mark ok">✓ atende</span>' : pass === false ? '<span class="mark no">✕ não atende</span>' : '<span class="mark na">○ conferir</span>';

  /* ---------- Conteúdo das estações, correções, teste e pacto ---------- */
  const PAIRS = [
    {name:'Data, horário e local', fg:PAGE.info, bg:PAGE.infoBg, sample:'Sábado, 25/10 · 20h · Galpão 2'},
    {name:'Botão Inscrever', fg:PAGE.button, bg:PAGE.buttonBg, sample:'Inscrever', bold:true},
    {name:'Rodapé', fg:PAGE.footer, bg:PAGE.footerBg, sample:'Virada Criativa · contato'},
    {name:'Link Ver mapa', fg:PAGE.link, bg:PAGE.linkBg, sample:'Ver mapa'}
  ];
  const ALT_ITEMS = [
    {name:'Mapa da rota', img:IMG.map, w:640, h:220, expected:'complexa', context:'Aparece em “Como chegar”, sem nenhum texto ao lado.'},
    {name:'Foto da entrada', img:IMG.ramp, w:320, h:200, expected:'informativa', context:'Ilustra a notícia “Galpão 2 ganha entrada sem degraus”.'},
    {name:'Ornamento', img:IMG.ornament, w:120, h:24, expected:'decorativa', context:'Linha ondulada entre o formulário e o rodapé.'},
    {name:'Ícone de lupa', img:IMG.search, w:48, h:48, expected:'funcional', context:'Único conteúdo do botão que abre a busca na programação.'}
  ];
  const ALT_FUNCTIONS = [['informativa', 'Informativa'], ['decorativa', 'Decorativa'], ['funcional', 'Funcional (botão ou link)'], ['complexa', 'Complexa (mapa, gráfico)']];
  const GROUPS = [
    {id:'contraste', title:'Contraste', crit:'contraste', applied:f => f.infoColor !== PAGE.info || f.buttonText !== PAGE.button || f.footerColor !== PAGE.footer},
    {id:'foco', title:'Foco e teclado', crit:'foco', applied:f => f.realButtons || f.focus !== 'none'},
    {id:'texto', title:'Texto e ampliação', crit:'texto', applied:f => f.textSize > 11 || f.fluid},
    {id:'toque', title:'Área de toque', crit:'toque', applied:f => f.target > 16},
    {id:'rotulos', title:'Rótulos dos campos', crit:'rotulos', applied:f => f.labels || f.required},
    {id:'cor', title:'Erro além da cor', crit:'cor', applied:f => f.errorText},
    {id:'legenda', title:'Legenda e reprodução', crit:'legenda', applied:f => f.captions.trim().length > 0 || !f.autoplay},
    {id:'ordem', title:'Ordem de leitura', crit:'ordem', applied:f => !!f.order},
    {id:'alt', title:'Imagens e rota em texto', crit:'alt', applied:f => !!(f.altHero.trim() || f.altMap.trim() || f.ornamentDecorative || f.routeText)}
  ];
  const WEIGHT = [
    {id:'video', label:'Vídeo da curadoria', options:[['full', 'Carregar junto com a página', 2.6], ['click', 'Carregar só ao tocar, com miniatura leve', 0.08], ['removed', 'Retirar o vídeo da página', 0]]},
    {id:'hero', label:'Imagem de capa', options:[['original', 'Original, com 3000 px de largura', 1.9], ['compressed', 'Redimensionar e comprimir', 0.25], ['removed', 'Retirar a capa', 0]]},
    {id:'map', label:'Mapa da rota', options:[['image', 'Imagem grande do mapa', 0.7], ['light', 'Mapa leve', 0.12], ['removed', 'Retirar o mapa', 0]]},
    {id:'fonts', label:'Fontes', options:[['web', 'Duas fontes decorativas baixadas', 0.4], ['system', 'Fonte do sistema', 0]]},
    {id:'carousel', label:'Apoiadores', options:[['on', 'Carrossel animado com script', 0.3], ['off', 'Lista simples de nomes', 0.01]]}
  ];
  const TASKS = [
    {title:'Encontre o horário e o local da conversa.', hint:'Leia a página sem ajuda de quem criou.'},
    {title:'Chegue ao botão Inscrever usando só o teclado.', hint:'Clique em “Começar pelo teclado” e use Tab.'},
    {title:'Com o Zoom 200% ligado, descubra por onde entrar sem degraus depois das 20h.', hint:'Ligue Zoom 200% acima da página.'},
    {title:'Envie o formulário vazio e diga o que precisa ser corrigido.', hint:'Acione Inscrever sem preencher os campos.'}
  ];
  const STATUS = [['sem-ajuda', 'Consegui sem ajuda'], ['hesitou', 'Consegui com hesitação'], ['nao', 'Não consegui']];
  const PACT = [
    ['contraste', 'Medir o contraste de textos e botões antes de entregar.'], ['teclado', 'Percorrer cada página só com o teclado.'],
    ['alt', 'Descrever imagens pela função que cumprem.'], ['cor', 'Nunca usar a cor como único aviso.'],
    ['rotulos', 'Dar rótulo visível a todo campo de formulário.'], ['midia', 'Legendar vídeos e oferecer transcrição.'],
    ['leve', 'Pensar em quem tem conexão lenta ou pacote de dados limitado.'], ['ouvir', 'Ouvir pessoas reais antes de decidir por elas.']
  ];

  /* ---------- Estado e normalização do que foi salvo ---------- */
  const initial = () => ({version:1, phase:1, team:'', station:1, view:'depois',
    audit:{findings:[], tools:{keyboard:false, zoom:false, gray:false, linear:false}},
    stations:{
      contrast:{pair:0, adjust:PAIRS.map(() => null), note:''},
      zoom:{level:100, fluid:false, cut200:null, note:''},
      keyboard:{variant:0, runs:[{tabs:0, done:false, tried:false}, {tabs:0, done:false, tried:false}], note:''},
      alt:{items:ALT_ITEMS.map(() => ({fn:'', text:''})), note:''}
    },
    fixes:BAD(), fixNotes:Object.fromEntries(GROUPS.map(group => [group.id, ''])),
    shock:{open:false, note:''}, compare:'',
    test:{tester:'', results:TASKS.map(() => ({status:'', note:''})), kbdReached:false, kbdTabs:0, errorSeen:'', adjust:''},
    pact:{picks:[], own:''}});
  const str = (value, fallback = '') => typeof value === 'string' ? value.slice(0, 2000) : fallback;
  const bool = (value, fallback = false) => typeof value === 'boolean' ? value : fallback;
  const int = (value, min, max, fallback) => Number.isInteger(value) && value >= min && value <= max ? value : fallback;
  const pick = (value, list, fallback) => list.includes(value) ? value : fallback;
  const obj = value => value && typeof value === 'object' ? value : {};
  function normalize(saved) {
    const clean = initial(), s = obj(saved);
    clean.phase = int(s.phase, 1, 4, 1); clean.team = str(s.team); clean.station = int(s.station, 1, 4, 1);
    clean.view = pick(s.view, ['antes', 'depois', 'lado'], 'depois');
    const audit = obj(s.audit), tools = obj(audit.tools);
    if (Array.isArray(audit.findings)) clean.audit.findings = audit.findings.filter(item => item && PARTS[item.part] && CRITERIA.some(([id]) => id === item.crit)).slice(0, 30).map(item => ({part:item.part, crit:item.crit, fact:str(item.fact), who:str(item.who)}));
    for (const key of Object.keys(clean.audit.tools)) clean.audit.tools[key] = bool(tools[key]);
    const st = obj(s.stations), c = obj(st.contrast), z = obj(st.zoom), k = obj(st.keyboard), a = obj(st.alt);
    clean.stations.contrast.pair = int(c.pair, 0, PAIRS.length - 1, 0); clean.stations.contrast.note = str(c.note);
    if (Array.isArray(c.adjust)) clean.stations.contrast.adjust = PAIRS.map((_, i) => { const item = obj(c.adjust[i]); return item.mode ? {mode:pick(item.mode, ['fg', 'bg'], 'fg'), light:Math.max(0, Math.min(100, Number(item.light) || 0))} : null; });
    clean.stations.zoom = {level:int(z.level, 100, 400, 100), fluid:bool(z.fluid), cut200:Array.isArray(z.cut200) ? z.cut200.filter(item => typeof item === 'string').slice(0, 8) : null, note:str(z.note)};
    clean.stations.keyboard.variant = int(k.variant, 0, 1, 0); clean.stations.keyboard.note = str(k.note);
    if (Array.isArray(k.runs)) clean.stations.keyboard.runs = [0, 1].map(i => { const run = obj(k.runs[i]); return {tabs:int(run.tabs, 0, 999, 0), done:bool(run.done), tried:bool(run.tried)}; });
    if (Array.isArray(a.items)) clean.stations.alt.items = ALT_ITEMS.map((_, i) => { const item = obj(a.items[i]); return {fn:pick(item.fn, ALT_FUNCTIONS.map(([id]) => id), ''), text:str(item.text)}; });
    clean.stations.alt.note = str(a.note);
    const f = obj(s.fixes), base = BAD(), w = obj(f.weight);
    clean.fixes = {
      infoColor:pick(f.infoColor, COLOR_OPTIONS.infoColor.map(([v]) => v), base.infoColor), buttonText:pick(f.buttonText, COLOR_OPTIONS.buttonText.map(([v]) => v), base.buttonText),
      footerColor:pick(f.footerColor, COLOR_OPTIONS.footerColor.map(([v]) => v), base.footerColor), realButtons:bool(f.realButtons), focus:pick(f.focus, ['none', 'thin', 'strong'], 'none'),
      textSize:pick(f.textSize, [11, 13, 16, 18], 11), fluid:bool(f.fluid), target:pick(f.target, [16, 24, 44], 16), labels:bool(f.labels), required:bool(f.required), errorText:bool(f.errorText),
      captions:str(f.captions), autoplay:bool(f.autoplay, true),
      order:Array.isArray(f.order) && f.order.length === VISUAL.length && VISUAL.every(id => f.order.includes(id)) ? [...f.order] : null,
      altHero:str(f.altHero), altMap:str(f.altMap), ornamentDecorative:bool(f.ornamentDecorative), routeText:bool(f.routeText),
      weight:Object.fromEntries(WEIGHT.map(item => [item.id, pick(w[item.id], item.options.map(([id]) => id), base.weight[item.id])]))
    };
    const notes = obj(s.fixNotes); for (const group of GROUPS) clean.fixNotes[group.id] = str(notes[group.id]);
    const shock = obj(s.shock); clean.shock = {open:bool(shock.open), note:str(shock.note)}; clean.compare = str(s.compare);
    const t = obj(s.test);
    clean.test = {tester:str(t.tester), results:TASKS.map((_, i) => { const item = obj(Array.isArray(t.results) ? t.results[i] : null); return {status:pick(item.status, STATUS.map(([id]) => id), ''), note:str(item.note)}; }),
      kbdReached:bool(t.kbdReached), kbdTabs:int(t.kbdTabs, 0, 999, 0), errorSeen:pick(t.errorSeen, ['text', 'color'], ''), adjust:str(t.adjust)};
    const pact = obj(s.pact);
    clean.pact = {picks:Array.isArray(pact.picks) ? [...new Set(pact.picks.filter(id => PACT.some(([key]) => key === id)))].slice(0, 3) : [], own:str(pact.own)};
    return clean;
  }
  let state = initial(), storageOK = true;
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.version === 1) state = normalize(saved); }
  catch { storageOK = false; }
  const params = new URLSearchParams(location.search);
  const phaseParam = Number(params.get('fase')), stationParam = Number(params.get('estacao'));
  if (phaseParam >= 1 && phaseParam <= 4) state.phase = phaseParam;
  if (stationParam >= 1 && stationParam <= 4) state.station = stationParam;
  // Ferramentas e rastros não são salvos: valem só para a tentativa aberta.
  const ui = {inspect:true, zoom:false, gray:false, linear:false, picked:null, trail:[], tabs:0, zoom3:false, linear3:false, zoom4:false, trail4:[], kbdTrail:[], kbdTabs:0, kbdMsg:''};

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch { storageOK = false; }
    $('save-status').textContent = storageOK ? 'Salvo neste navegador.' : 'Salvamento local bloqueado: exporte antes de fechar.';
  }

  /* ---------- Cálculos de progresso ---------- */
  const distinctFindings = () => new Set(state.audit.findings.map(item => `${item.part}|${item.crit}`)).size;
  const toolsUsed = () => Object.values(state.audit.tools).filter(Boolean).length;
  const stationDone = n => {
    const s = state.stations;
    if (n === 1) return s.contrast.adjust.some(Boolean) && s.contrast.note.trim().length > 0;
    if (n === 2) return s.zoom.cut200 !== null && s.zoom.note.trim().length > 0;
    if (n === 3) return s.keyboard.runs.some(run => run.tried) && s.keyboard.note.trim().length > 0;
    return s.alt.items.every(item => item.fn) && s.alt.note.trim().length > 0;
  };
  const appliedGroups = () => GROUPS.filter(group => group.applied(state.fixes) && state.fixNotes[group.id].trim());
  const weightTotal = f => BASE_WEIGHT + WEIGHT.reduce((sum, item) => sum + item.options.find(([id]) => id === f.weight[item.id])[2], 0);
  const fmtMB = value => `${value.toFixed(2).replace('.', ',')} MB`;
  const loadSeconds = value => Math.round(value * 8 * 1000 / SLOW_KBPS);
  function weightWarnings(f) {
    const warnings = [];
    if (f.weight.video === 'removed' && !f.captions.trim()) warnings.push('A fala da curadoria — horário, local, Libras e rota — sumiu da página. Escreva a transcrição em “Legenda e reprodução”.');
    if (f.weight.map === 'removed' && !f.routeText) warnings.push('A rota sem degraus sumiu da página. Ative “rota também em texto” em “Imagens e rota em texto”.');
    return warnings;
  }
  const weightOK = f => weightTotal(f) <= WEIGHT_LIMIT + 1e-9 && weightWarnings(f).length === 0;

  /* ---------- Montagem das páginas de demonstração (Shadow DOM isola estilos e foco) ---------- */
  function mountDemos() {
    for (const host of document.querySelectorAll('[data-demo]')) {
      const kind = host.dataset.demo, f = kind === 'audit' || kind === 'before' ? BAD() : state.fixes;
      const zoom = kind === 'audit' ? ui.zoom : kind === 'after' ? ui.zoom3 : kind === 'test' ? ui.zoom4 : false;
      const root = host.shadowRoot || host.attachShadow({mode:'open'});
      root.innerHTML = `<style>${demoCSS(f, '.vc')}</style><div class="vc${zoom ? ' is-zoom' : ''}${kind === 'audit' && ui.inspect ? ' is-inspecting' : ''}">${demoHTML(f)}</div>`;
      host.classList.toggle('is-gray', kind === 'audit' && ui.gray);
      if (!host.dataset.bound) { bindDemo(host, kind); host.dataset.bound = '1'; }
      if (kind === 'audit' && ui.picked) root.querySelector(`[data-part="${ui.picked}"]`)?.classList.add('is-picked');
    }
    const linear = $('linear-audit'); if (linear) linear.innerHTML = ui.linear ? linearHTML(document.querySelector('[data-demo="audit"]').shadowRoot) : '';
    const linear3 = $('linear-after'); if (linear3) linear3.innerHTML = ui.linear3 && document.querySelector('[data-demo="after"]') ? linearHTML(document.querySelector('[data-demo="after"]').shadowRoot) : '';
  }
  // Ferramentas mudam só classes e painéis: a página demonstrada mantém erros, textos digitados e banners fechados.
  function applyTools() {
    const zoomFor = {audit:ui.zoom, after:ui.zoom3, test:ui.zoom4};
    for (const host of document.querySelectorAll('[data-demo]')) {
      const kind = host.dataset.demo, page = host.shadowRoot && host.shadowRoot.querySelector('.vc'); if (!page) continue;
      page.classList.toggle('is-zoom', !!zoomFor[kind]);
      if (kind === 'audit') { page.classList.toggle('is-inspecting', ui.inspect); host.classList.toggle('is-gray', ui.gray); if (!ui.inspect) page.querySelectorAll('.is-hover').forEach(el => el.classList.remove('is-hover')); }
    }
    const audit = document.querySelector('[data-demo="audit"]'), after = document.querySelector('[data-demo="after"]');
    const linear = $('linear-audit'); if (linear) linear.innerHTML = ui.linear && audit ? linearHTML(audit.shadowRoot) : '';
    const linear3 = $('linear-after'); if (linear3) linear3.innerHTML = ui.linear3 && after ? linearHTML(after.shadowRoot) : '';
  }
  const describe = el => {
    if (!el) return '';
    if (el.dataset.start !== undefined || el.classList.contains('vc')) return 'Início da página';
    if (el.dataset.part && PARTS[el.dataset.part]) return PARTS[el.dataset.part].name;
    if (el.tagName === 'A') return `Link ${el.textContent.trim()}`;
    if (el.tagName === 'INPUT') return el.labels && el.labels[0] ? `Campo ${el.labels[0].textContent.trim()}` : 'Campo sem rótulo';
    if (el.tagName === 'SUMMARY') return 'Transcrição do convite';
    return el.getAttribute('aria-label') || el.textContent.trim().slice(0, 40);
  };
  function bindDemo(host, kind) {
    const root = host.shadowRoot;
    root.addEventListener('click', event => {
      const target = event.target;
      const link = target.closest('a');
      if (link) event.preventDefault();
      if (kind === 'audit' && ui.inspect) {
        const part = target.closest('[data-part]');
        event.preventDefault(); event.stopPropagation();
        if (part) pickPart(part.dataset.part);
        return;
      }
      const control = target.closest('[data-part="close"],[data-part="play"],[data-part="submit"]');
      if (!control) return;
      if (control.dataset.part === 'close') control.closest('[data-section]').hidden = true;
      if (control.dataset.part === 'play') control.outerHTML = '<p class="vc-screen">▶ Reproduzindo · convite da curadoria · 0:24</p>';
      if (control.dataset.part === 'submit') { event.preventDefault(); submitDemo(control.closest('form'), kind); }
    });
    root.addEventListener('submit', event => { event.preventDefault(); submitDemo(event.target, kind); });
    root.addEventListener('mouseover', event => {
      if (kind !== 'audit' || !ui.inspect) return;
      root.querySelectorAll('.is-hover').forEach(el => el.classList.remove('is-hover'));
      event.target.closest('[data-part]')?.classList.add('is-hover');
    });
    root.addEventListener('mouseleave', () => root.querySelectorAll('.is-hover').forEach(el => el.classList.remove('is-hover')), true);
    root.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      if (kind === 'audit') { ui.tabs++; if (!state.audit.tools.keyboard) { state.audit.tools.keyboard = true; save(); updateTools(); } }
      if (kind === 'test') { state.test.kbdTabs++; ui.lastTab = Date.now(); save(); }
    });
    root.addEventListener('focusin', event => {
      if (measuring) return;
      const name = describe(event.target);
      if (kind === 'audit') { ui.trail.push(name); renderTrail('trail-audit', ui.trail, ui.tabs); }
      if (kind === 'test') {
        ui.trail4.push(name); renderTrail('trail-test', ui.trail4, state.test.kbdTabs);
        if (event.target.dataset.part === 'submit' && Date.now() - (ui.lastTab || 0) < 600 && !state.test.kbdReached) { state.test.kbdReached = true; save(); updateEvidence(); }
      }
    });
  }
  function submitDemo(form, kind) {
    const inputs = [...form.querySelectorAll('input')], empty = inputs.filter(input => !input.value.trim()), byText = form.dataset.error === 'text';
    inputs.forEach(input => { const isEmpty = !input.value.trim(); input.classList.toggle('is-error', isEmpty); if (isEmpty) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); const msg = input.id && form.querySelector(`#${input.id}-erro`); if (msg) msg.hidden = !isEmpty; });
    form.querySelector('.vc-msg').textContent = empty.length ? (byText ? 'Revise os campos indicados.' : '') : 'Inscrição simulada registrada. Nada foi enviado.';
    if (kind === 'test' && empty.length) { state.test.errorSeen = byText ? 'text' : 'color'; save(); updateEvidence(); }
  }
  function renderTrail(id, trail, tabs) {
    const box = $(id); if (!box) return;
    box.innerHTML = trail.length ? `<p class="fine">${tabs} ${tabs === 1 ? 'Tab' : 'Tabs'} pressionados · últimos destinos do foco:</p><ol>${trail.slice(-10).map(item => `<li>${esc(item)}</li>`).join('')}</ol>` : '<p class="fine">Clique no topo da página de demonstração e pressione Tab. O rastro aparece aqui.</p>';
  }

  /* ---------- Componentes de interface ---------- */
  const field = (path, label, value, hint = '', rows = 3) => `<label class="field">${label}<textarea data-field="${path}" rows="${rows}" maxlength="1200">${esc(value)}</textarea>${hint ? `<span class="hint">${hint}</span>` : ''}</label>`;
  const top = (n, title, text, deliverable) => `<section class="stage-top"><div class="stage-copy"><p class="eyebrow">Parada ${n} de 4</p><h2 id="stage-title" tabindex="-1">${title}</h2><p>${text}</p></div><aside class="stage-meta"><strong>Entrega desta parada</strong><p>${deliverable}</p><small>Em dupla: alternem quem opera e quem confere.</small></aside></section>`;
  const nextStep = (text, phase, label) => `<div class="next"><p>${text}</p><button type="button" class="button primary" data-go="${phase}">${label}</button></div>`;
  const stretch = (title, text) => `<details class="stretch"><summary>Terminou com critério? ${title}</summary><p>${text}</p></details>`;
  const counter = (value, min, label) => `<p class="counter ${value >= min ? 'done' : ''}"><strong>${Math.min(value, 99)} de ${min}</strong> ${label}${value >= min ? ' <span class="mark ok">✓ mínimo atingido</span>' : ''}</p>`;
  const toolButton = (tool, label, pressed) => `<button type="button" class="tool" data-tool="${tool}" aria-pressed="${pressed}">${label}</button>`;

  /* ---------- Parada 1 · Auditoria ---------- */
  function renderAudit() {
    const findings = state.audit.findings;
    return top(1, 'Encontre as barreiras.', 'A página da conversa “Criar para todo mundo” foi publicada com barreiras de propósito. Inspecione os elementos, leia a medição e registre o que impede alguém de cumprir a tarefa. Barreira é do projeto, não da pessoa.', `${MIN_FINDINGS} barreiras diferentes, cada uma com critério, medição e pessoa afetada.`) +
      `<div class="split"><section class="desk" aria-labelledby="audit-demo-title"><p class="section-label" id="audit-demo-title">Página de demonstração · barreiras intencionais</p>
        <div class="toolbar" role="group" aria-label="Ferramentas do auditor">${toolButton('inspect', 'Inspecionar', ui.inspect)}${toolButton('zoom', 'Zoom 200%', ui.zoom)}${toolButton('gray', 'Sem cor', ui.gray)}${toolButton('linear', 'Leitura linear', ui.linear)}</div>
        <p class="fine" id="tool-help">${ui.inspect ? 'Inspecionar ligado: clicar escolhe um elemento para medir. Desligue para usar a página normalmente.' : 'Inspecionar desligado: a página funciona como para um visitante.'}</p>
        <div class="browser-frame"><div class="browser-bar"><span>virada.exemplo/conversa</span><span>Simulação</span></div><div class="demo-host" data-demo="audit"></div></div>
        <div class="tool-panels"><div id="trail-audit" class="trail" aria-live="polite"></div><button type="button" class="text-button" id="clear-trail">Limpar rastro do teclado</button><div id="linear-audit" class="linear-box"></div></div>
        <p class="fine">Ferramentas usadas: <strong id="tools-count">${toolsUsed()} de 4</strong>. Use pelo menos duas antes de fechar a auditoria.</p>
      </section>
      <section class="desk" aria-labelledby="audit-form-title"><p class="section-label" id="audit-form-title">Ficha de auditoria</p>
        <label class="field">Elemento inspecionado<select id="part-select"><option value="">Clique na página ou escolha aqui</option>${Object.entries(PARTS).map(([id, part]) => `<option value="${id}" ${ui.picked === id ? 'selected' : ''}>${part.name}</option>`).join('')}</select></label>
        <div id="inspector" class="inspector" aria-live="polite">${inspectorHTML()}</div>
        <label class="field">Critério da barreira<select id="crit-select"><option value="">Escolha o critério</option>${CRITERIA.map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}</select></label>
        <p id="crit-hint" class="hint" hidden></p>
        <label class="field">Quem pode ser afetado e em qual tarefa?<textarea id="who" rows="3" maxlength="600" placeholder="Ex.: quem tem baixa visão não consegue ler o horário da conversa."></textarea><span class="hint">Descreva a tarefa que fica difícil. Fale do produto, não de limitações da pessoa.</span></label>
        <button type="button" class="button primary" id="add-finding">Registrar barreira</button>
        <p id="finding-status" class="status-line" role="status"></p>
        ${counter(distinctFindings(), MIN_FINDINGS, 'barreiras registradas')}
        <ol class="findings">${findings.map((item, i) => `<li><strong>${esc(PARTS[item.part].name)} · ${esc(critName(item.crit))}</strong><span>${esc(item.fact)}</span><span>${esc(item.who)}</span><button type="button" class="text-button" data-remove-finding="${i}">Remover registro ${i + 1}</button></li>`).join('')}</ol>
      </section></div>` +
      stretch('Audite esta oficina.', 'Use Tab, o zoom do navegador (Ctrl e +) e a leitura dos rótulos nesta própria oficina. Ela tenta cumprir o que ensina. Encontrou uma barreira? Registre-a no caderno com a mesma estrutura: critério, evidência e quem é afetado.') +
      nextStep('Às 19:45, exporte uma cópia parcial. Na volta, as quatro estações começam juntas.', '2', 'Ir para as estações →');
  }
  function inspectorHTML() {
    if (!ui.picked) return '<p class="evidence-empty">Escolha um elemento para ver a medição.</p>';
    const host = document.querySelector('[data-demo="audit"]'), el = host && host.shadowRoot && host.shadowRoot.querySelector(`[data-part="${ui.picked}"]`);
    if (!el) return '<p class="evidence-empty">Elemento fora da página atual. Recarregue a parada.</p>';
    ui.facts = measure(el, ui.zoom);
    return `<p class="inspector-title">${esc(PARTS[ui.picked].name)}</p><ul class="facts">${ui.facts.map(fact => `<li>${factIcon(fact.pass)}<span>${esc(fact.text)}</span><small>${esc(critName(fact.crit))}</small></li>`).join('')}</ul>`;
  }
  function pickPart(part) {
    ui.picked = PARTS[part] ? part : null;
    const host = document.querySelector('[data-demo="audit"]');
    host?.shadowRoot.querySelectorAll('.is-picked').forEach(el => el.classList.remove('is-picked'));
    if (ui.picked) host?.shadowRoot.querySelector(`[data-part="${part}"]`)?.classList.add('is-picked');
    const select = $('part-select'); if (select) select.value = ui.picked || '';
    $('inspector').innerHTML = inspectorHTML(); updateCritHint();
  }
  function updateCritHint() {
    const hint = $('crit-hint'), crit = $('crit-select')?.value; if (!hint) return;
    if (!ui.picked || !crit) { hint.hidden = true; return; }
    const related = (ui.facts || []).filter(fact => fact.crit === crit);
    hint.hidden = false;
    hint.textContent = !related.length ? 'Nenhuma medição deste elemento trata desse critério. Se a barreira existe, descreva a evidência com as suas palavras.'
      : related.every(fact => fact.pass === true) ? 'A medição indica que este critério está atendido neste elemento. Confira outro critério ou outro elemento.'
      : 'A medição deste critério aparece na ficha e será guardada com o registro.';
  }
  function updateTools() { const count = $('tools-count'); if (count) count.textContent = `${toolsUsed()} de 4`; }

  /* ---------- Parada 2 · Estações ---------- */
  const STATION_NAMES = ['Contraste', 'Zoom 200%', 'Só teclado', 'Texto alternativo'];
  const stationLabel = n => `${n} · ${STATION_NAMES[n - 1]}${stationDone(n) ? ' <span class="mark ok">✓<span class="visually-hidden"> registrada</span></span>' : ''}`;
  function refreshStationTabs() { document.querySelectorAll('[data-station]').forEach(button => { button.innerHTML = stationLabel(Number(button.dataset.station)); }); }
  function renderStations() {
    const n = state.station;
    return top(2, 'Quatro estações, uma barreira em cada.', 'As estações rodam pelo relógio: 10 minutos cada. Meça, experimente uma alternativa e registre. Ao sinal, todas as duplas avançam juntas.', 'Um registro por estação: o que foi medido, quem é afetado e o que mudaria.') +
      `<div class="toolbar tabs" role="group" aria-label="Estações">${STATION_NAMES.map((_, i) => `<button type="button" data-station="${i + 1}" aria-pressed="${n === i + 1}">${stationLabel(i + 1)}</button>`).join('')}</div>` +
      [renderContrast, renderZoom, renderKeyboard, renderAlt][n - 1]() +
      nextStep(n < 4 ? 'Ao sinal, avancem para a próxima estação. Quem terminou antes faz a extensão desta estação.' : 'Às 20:50 começa a correção do protótipo.', n < 4 ? `station-${n + 1}` : '3', n < 4 ? `Ir para a estação ${n + 1} →` : 'Corrigir o protótipo →');
  }
  function pairColors(i) {
    const pair = PAIRS[i], adj = state.stations.contrast.adjust[i];
    if (!adj) return {fg:pair.fg, bg:pair.bg};
    const base = adj.mode === 'fg' ? pair.fg : pair.bg, [h, s] = rgbToHsl(hexToRgb(base)), color = hslToHex(h, s, adj.light);
    return adj.mode === 'fg' ? {fg:color, bg:pair.bg} : {fg:pair.fg, bg:color};
  }
  function contrastResult(i) {
    const pair = PAIRS[i], now = pairColors(i), before = contrast(hexToRgb(pair.fg), hexToRgb(pair.bg)), after = contrast(hexToRgb(now.fg), hexToRgb(now.bg));
    return {pair, now, before, after};
  }
  function renderContrast() {
    const c = state.stations.contrast, i = c.pair, adj = c.adjust[i] || {mode:'fg', light:rgbToHsl(hexToRgb(PAIRS[i].fg))[2]};
    return `<div class="split"><section class="desk"><p class="section-label">Estação 1 · contraste</p>
      <label class="field">Par de cores da página<select id="pair-select">${PAIRS.map((pair, n) => `<option value="${n}" ${n === i ? 'selected' : ''}>${pair.name}</option>`).join('')}</select></label>
      <fieldset class="choice"><legend>O que ajustar</legend><label><input type="radio" name="c-mode" value="fg" ${adj.mode === 'fg' ? 'checked' : ''}> Cor do texto</label><label><input type="radio" name="c-mode" value="bg" ${adj.mode === 'bg' ? 'checked' : ''}> Cor do fundo</label></fieldset>
      <label class="field">Luminosidade da cor escolhida<input type="range" id="light" min="0" max="100" step="1" value="${Math.round(adj.light)}"></label>
      <div id="contrast-out">${contrastOut(i)}</div></section>
      <section class="desk"><p class="section-label">Registro da estação</p>
      <p>A razão de contraste compara a luminância das duas cores, de 1:1 a 21:1. Texto comum precisa de pelo menos <strong>4,5:1</strong>; texto grande, de <strong>3:1</strong> (WCAG 2.2, nível AA).</p>
      <p class="hint">Dica de marca: o amarelo do botão pode continuar no fundo. Ajuste o texto.</p>
      <div class="evidence-form">${field('stations.contrast.note', 'Barreira registrada nesta estação', c.note, 'Par de cores, razão antes e depois e quem ganha com a mudança.')}</div></section></div>` +
      stretch('Mais um par.', 'Ajuste um segundo par sem trocar a identidade da marca. Compare: qual mudança foi mais discreta e qual foi mais eficaz?');
  }
  function contrastOut(i) {
    const {pair, now, before, after} = contrastResult(i), ok = after >= 4.5, large = after >= 3;
    return `<div class="contrast-sample" style="color:${now.fg};background:${now.bg}"><span style="font-weight:${pair.bold ? 800 : 400}">${esc(pair.sample)}</span></div>
      <dl class="ratio"><div><dt>Antes</dt><dd>${fmtRatio(before)}</dd></div><div><dt>Agora</dt><dd><output id="ratio-now">${fmtRatio(after)}</output></dd></div></dl>
      <ul class="checks"><li>${ok ? '<span class="mark ok">✓ atende</span>' : '<span class="mark no">✕ não atende</span>'} Texto comum (4,5:1)</li><li>${large ? '<span class="mark ok">✓ atende</span>' : '<span class="mark no">✕ não atende</span>'} Texto grande (3:1)</li></ul>
      <p class="fine">Texto ${now.fg.toUpperCase()} sobre fundo ${now.bg.toUpperCase()}.</p>`;
  }
  function renderZoom() {
    const z = state.stations.zoom;
    return `<div class="split"><section class="desk"><p class="section-label">Estação 2 · zoom e reorganização</p>
      <label class="field">Ampliação: <output id="zoom-label">${z.level}%</output><input type="range" id="zoom-level" min="100" max="400" step="50" value="${z.level}" aria-describedby="zoom-help"></label>
      <p class="fine" id="zoom-help">A janela abaixo representa a tela de quem amplia a página.</p>
      <label class="check"><input type="checkbox" id="zoom-fluid" ${z.fluid ? 'checked' : ''}> Layout fluido (sem largura fixa)</label>
      <div class="zoom-frame" id="zoom-frame"><div class="zoom-card ${z.fluid ? 'fluid' : 'fixed'}" style="zoom:${z.level / 100}"><strong>Criar para todo mundo</strong><p class="zoom-info"><span>Sábado, 25/10</span> · <span>20h</span> · <span>Galpão 2</span> · <span>entrada gratuita</span> · <span>intérprete de Libras</span></p></div></div>
      <p id="zoom-cut" class="status-line" role="status"></p></section>
      <section class="desk"><p class="section-label">Registro da estação</p>
      <p>Quem amplia a página, como Ravi com zoom de 200%, precisa que o texto se reorganize. Com largura fixa e sem quebra de linha, o que passa da borda é cortado.</p>
      <p class="fine">Medição a 200% com largura fixa: <strong id="cut200">${z.cut200 === null ? 'ainda não medida' : z.cut200.length ? esc(z.cut200.join(', ')) : 'nada cortado'}</strong></p>
      <div class="evidence-form">${field('stations.zoom.note', 'Barreira registrada nesta estação', z.note, 'O que ficou fora da tela com a largura fixa, quem perde essa informação e o que mudou com o layout fluido.')}</div></section></div>` +
      stretch('Vá até 400%.', 'Com 400%, a tela equivale a 320 px de largura, como num celular pequeno. Compare os dois layouts e anote qual informação aparece primeiro.');
  }
  function measureZoom() {
    const frame = $('zoom-frame'); if (!frame) return;
    const box = frame.getBoundingClientRect(), z = state.stations.zoom;
    const cut = [...frame.querySelectorAll('.zoom-info span')].filter(span => { const r = span.getBoundingClientRect(); return r.right > box.right + 1 || r.width === 0; }).map(span => span.textContent);
    $('zoom-cut').textContent = cut.length ? `Fora da tela: ${cut.join(', ')}.` : 'Todo o texto está visível nesta ampliação.';
    if (z.level === 200 && !z.fluid && JSON.stringify(z.cut200) !== JSON.stringify(cut)) { z.cut200 = cut; save(); const out = $('cut200'); if (out) out.textContent = cut.length ? cut.join(', ') : 'nada cortado'; }
  }
  const KBD_CSS = `.kb{all:initial;display:grid;gap:10px;padding:16px;font:15px/1.4 Arial,sans-serif;color:#1b1b1b;background:#ffffff}.kb *{box-sizing:border-box}.kb p,.kb h3{margin:0}.kb h3{font-size:18px;color:#10213a}.kb nav{display:flex;gap:10px;flex-wrap:wrap}.kb a{color:#0057b8}.kb .kb-brand{font-weight:900;letter-spacing:.08em;color:#b42318;font-size:12px}.kb .kb-check,.kb label{display:flex;gap:8px;align-items:center}.kb .kb-btn,.kb button{justify-self:start;min-height:40px;padding:0 16px;font:inherit;font-weight:800;color:#10213a;background:#f2b705;border:0;border-radius:4px;display:inline-flex;align-items:center;cursor:pointer}.kb .kb-msg{font-weight:700;color:#10213a}.kb.bad a:focus,.kb.bad [tabindex]:focus{outline:none}.kb.good a:focus,.kb.good button:focus,.kb.good input:focus,.kb.good [tabindex]:focus{outline:3px solid #0057b8;outline-offset:3px}.kb .skip{position:absolute;left:-999px}.kb .skip:focus{position:static}`;
  const kbdHTML = good => good
    ? `<div class="kb good" tabindex="-1" data-start><a class="skip" href="#inscricao">Pular para a inscrição</a><p class="kb-brand">VIRADA · INSCRIÇÃO RÁPIDA</p><nav aria-label="Menu"><a href="#a">Programação</a><a href="#b">Como chegar</a><a href="#c">Contato</a></nav><h3 id="inscricao" tabindex="-1">Conversa “Criar para todo mundo” · 20h</h3><label><input type="checkbox"> Quero receber a confirmação por e-mail</label><button type="button" data-confirm>Confirmar inscrição</button><a href="#d">Política de privacidade</a><p class="kb-msg" role="status"></p></div>`
    : `<div class="kb bad" tabindex="-1" data-start><p class="kb-brand">VIRADA · INSCRIÇÃO RÁPIDA</p><nav><a href="#a">Programação</a><a href="#b">Como chegar</a><a href="#c">Contato</a></nav><h3>Conversa “Criar para todo mundo” · 20h</h3><div class="kb-check" data-fake-check>☐ Quero receber a confirmação por e-mail</div><div class="kb-btn" data-fake-confirm>Confirmar inscrição</div><a href="#d">Política de privacidade</a><p class="kb-msg" role="status"></p></div>`;
  function renderKeyboard() {
    const k = state.stations.keyboard, v = k.variant;
    return `<div class="split"><section class="desk"><p class="section-label">Estação 3 · só teclado</p>
      <div class="toolbar tabs" role="group" aria-label="Versão da página">${['Versão original', 'Versão com botões reais'].map((label, i) => `<button type="button" data-kbd-variant="${i}" aria-pressed="${v === i}">${label}</button>`).join('')}</div>
      <p><strong>Tarefa:</strong> marque a confirmação por e-mail e confirme a inscrição. Tab avança, Shift+Tab volta, Espaço marca e Enter aciona.</p>
      <button type="button" class="button" id="kbd-start">Começar pelo teclado</button>
      <div class="browser-frame"><div class="browser-bar"><span>virada.exemplo/inscricao-rapida</span><span>${v ? 'Botões reais' : 'Original'}</span></div><div class="kbd-host" id="kbd-host"></div></div>
      <div id="kbd-trail" class="trail" aria-live="polite"></div></section>
      <section class="desk"><p class="section-label">Registro da estação</p>
      <dl class="ratio" id="kbd-summary">${k.runs.map((run, i) => `<div><dt>${i ? 'Botões reais' : 'Original'}</dt><dd>${run.tried ? `${run.tabs} Tabs · ${run.done ? 'concluiu' : 'não concluiu'}` : 'não testada'}</dd></div>`).join('')}</dl>
      <p>Muita gente navega por teclado ou por dispositivos que funcionam como ele. Um “botão” feito de caixa de texto não recebe foco; sem contorno de foco, ninguém sabe onde está.</p>
      <div class="evidence-form">${field('stations.keyboard.note', 'Barreira registrada nesta estação', k.note, 'Onde o teclado travou, quantos Tabs foram usados e o que resolveu.')}</div></section></div>` +
      stretch('Encurte o caminho.', 'Na versão com botões reais, use o link “Pular para a inscrição” logo no primeiro Tab. Quantos Tabs vocês economizaram?');
  }
  function mountKeyboard() {
    const host = $('kbd-host'); if (!host) return;
    const k = state.stations.keyboard, v = k.variant, root = host.shadowRoot || host.attachShadow({mode:'open'});
    root.innerHTML = `<style>${KBD_CSS}</style>${kbdHTML(v === 1)}`;
    renderTrail('kbd-trail', ui.kbdTrail, ui.kbdTabs);
    if (host.dataset.bound) return;
    host.dataset.bound = '1';
    const msg = () => root.querySelector('.kb-msg');
    const run = () => k.runs[k.variant];
    const finish = () => {
      if (!root.querySelector('input[type="checkbox"]').checked) { msg().textContent = 'Ainda falta marcar “Quero receber a confirmação por e-mail”. Volte com Shift+Tab e use Espaço.'; return; }
      if (!run().done) { run().done = true; run().tabs = ui.kbdTabs; save(); } msg().textContent = `Inscrição simulada confirmada pelo teclado em ${ui.kbdTabs} Tabs.`; refreshKeyboardSummary(); };
    root.addEventListener('keydown', event => {
      if (event.key === 'Tab') { ui.kbdTabs++; run().tried = true; if (!run().done) run().tabs = ui.kbdTabs; save(); refreshKeyboardSummary(); }
    });
    root.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (link) { event.preventDefault(); if (link.classList.contains('skip')) root.querySelector('#inscricao').focus(); return; }
      if (event.target.closest('[data-fake-confirm],[data-fake-check]')) { msg().textContent = 'Nesta estação, o mouse não vale. Tente chegar aqui só com o teclado.'; return; }
      if (event.target.closest('[data-confirm]')) { if (event.detail === 0) finish(); else msg().textContent = 'Clique com mouse não vale nesta estação. Use Tab e Enter.'; }
    });
    root.addEventListener('focusin', event => { ui.kbdTrail.push(describe(event.target) || 'Início da página'); renderTrail('kbd-trail', ui.kbdTrail, ui.kbdTabs); });
    root.addEventListener('focusout', event => {
      if (!event.relatedTarget || !root.contains(event.relatedTarget)) {
        if (run().tried && !run().done) msg().textContent = 'O foco saiu da página sem chegar ao botão Confirmar.';
        refreshKeyboardSummary();
      }
    });
  }
  function refreshKeyboardSummary() {
    const list = $('kbd-summary'); if (!list) return;
    list.innerHTML = state.stations.keyboard.runs.map((run, i) => `<div><dt>${i ? 'Botões reais' : 'Original'}</dt><dd>${run.tried ? `${run.tabs} Tabs · ${run.done ? 'concluiu' : 'não concluiu'}` : 'não testada'}</dd></div>`).join('');
  }
  function altHints(i) {
    const item = state.stations.alt.items[i], meta = ALT_ITEMS[i], text = item.text.trim(), hints = [];
    if (!item.fn) return ['Escolha primeiro a função da imagem.'];
    if (item.fn === 'decorativa' && text) hints.push('Imagem decorativa: deixe o texto vazio para não poluir a leitura.');
    if (item.fn !== 'decorativa' && !text) hints.push('Falta o texto alternativo.');
    if (/^(imagem|foto|figura|ilustra)/i.test(norm(text))) hints.push('Não precisa começar por “imagem de”: o leitor já anuncia que é imagem.');
    if (/\.(png|jpe?g|svg)/i.test(text)) hints.push('Nome de arquivo não descreve a imagem.');
    if (text.length > 150) hints.push('Texto longo: resuma aqui e coloque a informação completa em texto na página.');
    if (item.fn === 'complexa') hints.push('Imagem complexa: o texto alternativo resume; a rota completa precisa estar escrita na página.');
    if (item.fn !== meta.expected) hints.push(`Reveja a função: ${meta.context}`);
    return hints.length ? hints : ['Sem pistas de revisão. Leia em voz alta: o texto cumpre a função da imagem?'];
  }
  const altSay = i => { const item = state.stations.alt.items[i], text = item.text.trim(); return item.fn === 'decorativa' ? '(imagem ignorada pela leitura)' : text ? `${item.fn === 'funcional' ? 'Botão' : 'Imagem'}: ${text}` : 'Imagem sem descrição'; };
  function renderAlt() {
    const a = state.stations.alt;
    return `<div class="alt-grid">${ALT_ITEMS.map((meta, i) => `<article class="alt-card"><div class="alt-figure"><img src="${meta.img}" alt="" width="${meta.w}" height="${meta.h}"></div><h3>${i + 1} · ${meta.name}</h3><p class="fine">${meta.context}</p>
      <label class="field">Função<select data-alt-fn="${i}"><option value="">Escolha</option>${ALT_FUNCTIONS.map(([id, name]) => `<option value="${id}" ${a.items[i].fn === id ? 'selected' : ''}>${name}</option>`).join('')}</select></label>
      <label class="field">Texto alternativo<textarea data-alt-text="${i}" rows="2" maxlength="300">${esc(a.items[i].text)}</textarea></label>
      <p class="say" id="alt-say-${i}"><span>Leitura:</span> ${esc(altSay(i))}</p><ul class="alt-hints" id="alt-hints-${i}">${altHints(i).map(hint => `<li>${esc(hint)}</li>`).join('')}</ul></article>`).join('')}</div>
      <section class="desk"><p class="section-label">Registro da estação</p><div class="evidence-form">${field('stations.alt.note', 'Barreira registrada nesta estação', a.note, 'Qual imagem era mais difícil de descrever, por quê e quem dependia dela.')}</div></section>` +
      stretch('Descreva para outro contexto.', 'A mesma foto da entrada pode ter outro texto alternativo numa página sobre arquitetura. Escreva a versão alternativa e explique a diferença.');
  }

  /* ---------- Parada 3 · Correções ---------- */
  const ratioFor = key => fmtRatio(contrast(hexToRgb(state.fixes[key]), hexToRgb(COLOR_BG[key])));
  const select = (key, options, value) => `<select data-fix="${key}">${options.map(([v, label]) => `<option value="${v}" ${String(v) === String(value) ? 'selected' : ''}>${label}</option>`).join('')}</select>`;
  const check = (key, label) => `<label class="check"><input type="checkbox" data-fix="${key}" ${state.fixes[key] ? 'checked' : ''}> ${label}</label>`;
  function groupControls(id) {
    const f = state.fixes;
    if (id === 'contraste') return ['infoColor', 'buttonText', 'footerColor'].map(key => `<label class="field">${{infoColor:'Texto de data e local', buttonText:'Texto do botão Inscrever (fundo amarelo da marca)', footerColor:'Texto do rodapé'}[key]}${select(key, COLOR_OPTIONS[key].map(([v, label]) => [v, `${label} · ${fmtRatio(contrast(hexToRgb(v), hexToRgb(COLOR_BG[key])))}`]), f[key])}<span class="hint" data-ratio="${key}">Contraste atual: ${ratioFor(key)}</span></label>`).join('');
    if (id === 'foco') return check('realButtons', 'Trocar textos clicáveis por botões reais, alcançáveis por Tab') + `<label class="field">Estilo do foco${select('focus', [['none', 'Nenhum (original)'], ['thin', 'Pontilhado fino e claro'], ['strong', 'Contorno azul de 3 px com afastamento']], f.focus)}</label>`;
    if (id === 'texto') return `<label class="field">Tamanho do texto${select('textSize', [[11, '11 px (original)'], [13, '13 px'], [16, '16 px'], [18, '18 px']], f.textSize)}</label>` + check('fluid', 'Layout fluido: o texto quebra a linha ao ampliar');
    if (id === 'toque') return `<label class="field">Área mínima dos alvos${select('target', [[16, '16 × 16 px (original)'], [24, '24 × 24 px'], [44, '44 × 44 px']], f.target)}</label>`;
    if (id === 'rotulos') return check('labels', 'Rótulos visíveis acima dos campos') + check('required', 'Indicar “(obrigatório)” em texto');
    if (id === 'cor') return check('errorText', 'Mensagem de erro em texto, com ícone, junto ao campo');
    if (id === 'legenda') return `<div class="script"><strong>Fala da curadoria · roteiro</strong>${SCRIPT.map(line => `<p>${esc(line)}</p>`).join('')}</div><label class="field">Legendas · uma por linha<textarea data-fix="captions" rows="4" maxlength="800">${esc(f.captions)}</textarea><span class="hint" id="caption-hint">${captionHint()}</span></label>` + `<label class="check"><input type="checkbox" data-fix="autoplayOff" ${f.autoplay ? '' : 'checked'}> Sem reprodução automática</label>`;
    if (id === 'ordem') return f.order
      ? `<ol class="order-list">${f.order.map((section, i) => `<li><span>${SECTION_NAMES[section]}</span><span class="order-actions"><button type="button" class="mini" data-order="${section}:-1" ${i === 0 ? 'disabled' : ''} aria-label="Subir ${SECTION_NAMES[section]}">↑</button><button type="button" class="mini" data-order="${section}:1" ${i === f.order.length - 1 ? 'disabled' : ''} aria-label="Descer ${SECTION_NAMES[section]}">↓</button></span></li>`).join('')}</ol><button type="button" class="text-button" id="order-reset">Voltar à ordem original</button>`
      : `<p>Hoje a leitura começa pelo formulário, antes de saber qual é o evento, e “Como chegar” só aparece depois do rodapé.</p><button type="button" class="button" id="order-align">Alinhar a leitura com a ordem da tela</button>`;
    if (id === 'alt') return `<label class="field">Texto alternativo da capa<textarea data-fix="altHero" rows="2" maxlength="300">${esc(f.altHero)}</textarea></label><label class="field">Texto alternativo do mapa<textarea data-fix="altMap" rows="2" maxlength="300">${esc(f.altMap)}</textarea></label>${check('ornamentDecorative', 'Marcar o ornamento como decorativo (texto vazio)')}${check('routeText', 'Rota também em texto na página')}`;
    return '';
  }
  function captionHint() {
    const lines = state.fixes.captions.split('\n').map(line => line.trim()).filter(Boolean);
    if (!lines.length) return 'Divida a fala em trechos curtos. Até cerca de 40 caracteres por linha facilita a leitura.';
    const long = lines.filter(line => line.length > 42).length;
    return `${lines.length} ${lines.length === 1 ? 'legenda' : 'legendas'}${long ? ` · ${long} com mais de 42 caracteres: considere dividir` : ' · tamanho de linha confortável'}. A transcrição completa aparece abaixo do vídeo.`;
  }
  function groupStatus(group) {
    const applied = group.applied(state.fixes), noted = state.fixNotes[group.id].trim().length > 0;
    return applied && noted ? '<span class="mark ok">✓ correção aplicada e justificada</span>' : applied ? '<span class="mark na">○ falta a justificativa</span>' : '<span class="mark no">— não aplicada</span>';
  }
  function renderFixes() {
    const v = state.view, found = new Set(state.audit.findings.map(item => item.crit));
    return top(3, 'Protótipo para mais pessoas.', 'Corrija no editor visual, sem código. Comece pelo que impede a tarefa: horário, rota e inscrição. A marca pode continuar; a barreira, não.', `${MIN_FIXES} correções ou mais, cada uma com justificativa, comparadas antes e depois.`) +
      `<div class="split fixes-split"><section class="desk"><p class="section-label">Painéis de correção</p>
        <div id="fix-count" class="counter-wrap">${counter(appliedGroups().length, MIN_FIXES, 'correções justificadas')}</div>
        ${GROUPS.map(group => `<details class="fix" id="fix-${group.id}" ${found.has(group.crit) ? 'open' : ''}><summary><span>${group.title}</span>${found.has(group.crit) ? '<small>na sua auditoria</small>' : ''}<span class="fix-status" id="status-${group.id}">${groupStatus(group)}</span></summary><div class="fix-body">${groupControls(group.id)}${field(`fixNotes.${group.id}`, 'Quem ganha com esta correção, em qual tarefa?', state.fixNotes[group.id], '', 2)}</div></details>`).join('')}
        ${renderShock()}
        <div class="evidence-form">${field('compare', 'Em uma frase: qual mudança mais protege o visitante?', state.compare, 'Compare Antes e Depois. A exportação guarda as duas páginas.', 2)}</div>
      </section>
      <section class="desk preview-desk"><p class="section-label">Prévia</p>
        <div class="toolbar tabs" role="group" aria-label="Versão exibida">${[['antes', 'Antes'], ['depois', 'Depois'], ['lado', 'Lado a lado']].map(([id, label]) => `<button type="button" data-view="${id}" aria-pressed="${v === id}">${label}</button>`).join('')}</div>
        <div class="toolbar" role="group" aria-label="Conferência da versão Depois">${toolButton('zoom3', 'Zoom 200% no Depois', ui.zoom3)}${toolButton('linear3', 'Leitura linear do Depois', ui.linear3)}</div>
        <div class="compare ${v}">${v !== 'depois' ? '<figure><figcaption>Antes</figcaption><div class="browser-frame"><div class="demo-host" data-demo="before"></div></div></figure>' : ''}${v !== 'antes' ? '<figure><figcaption>Depois</figcaption><div class="browser-frame"><div class="demo-host" data-demo="after"></div></div></figure>' : ''}</div>
        <div id="linear-after" class="linear-box"></div>
      </section></div>` +
      stretch('Caiba em 0,6 MB.', 'Sem retirar informação, chegue a 0,6 MB ou menos no painel de conexão lenta. Explique qual troca economizou mais dados.') +
      nextStep('Às 21:35, troquem de posto com a dupla vizinha para o teste cruzado.', '4', 'Ir para o teste cruzado →');
  }
  function weightHTML() {
    const f = state.fixes, total = weightTotal(f), warnings = weightWarnings(f), ok = weightOK(f);
    return `<div class="weight ${total > WEIGHT_LIMIT ? 'over' : ''}" role="status"><output>${fmtMB(total)}</output><p>de ${fmtMB(WEIGHT_LIMIT)} permitido<br>≈ ${loadSeconds(total)} s para carregar a ${SLOW_KBPS} kbps</p></div>
      <div class="bar" aria-hidden="true"><span style="width:${Math.min(100, total / 6 * 100)}%"></span><i style="left:${WEIGHT_LIMIT / 6 * 100}%"></i></div>
      ${warnings.map(text => `<p class="result warn"><strong>Informação perdida.</strong> ${esc(text)}</p>`).join('')}
      ${f.weight.hero === 'removed' ? '<p class="fine">A capa repetia título, data e local, que continuam no texto da página.</p>' : ''}
      <p class="status-line">${ok ? '<span class="mark ok">✓ cabe no limite sem perder informação</span>' : '<span class="mark no">✕ ainda não cabe ou perde informação</span>'}</p>`;
  }
  function renderShock() {
    const f = state.fixes;
    if (!state.shock.open) return '<div class="shock-closed"><p><strong>Comunicado às 21:15.</strong> Recomendado depois de três correções.</p><button type="button" class="button" id="shock">Abrir comunicado: conexão lenta →</button></div>';
    return `<section class="shock" aria-labelledby="shock-title"><h3 id="shock-title">Choque · conexão lenta no ponto de ônibus</h3><p>Ana abre a página no celular, no ponto de ônibus, com o pacote de dados no fim. A página pesa ${fmtMB(weightTotal(BAD()))}. O novo limite é ${fmtMB(WEIGHT_LIMIT)}, sem tirar informação de quem visita.</p>
      ${WEIGHT.map(item => `<label class="field">${item.label}<select data-weight="${item.id}">${item.options.map(([id, label, mb]) => `<option value="${id}" ${f.weight[item.id] === id ? 'selected' : ''}>${label} · ${fmtMB(mb)}</option>`).join('')}</select></label>`).join('')}
      <p class="fine">HTML e estilos: ${fmtMB(BASE_WEIGHT)}. Estimativa didática para comparar decisões, não uma medição de rede.</p>
      <div id="weight-out">${weightHTML()}</div>
      ${field('shock.note', 'Por que esse plano? O que vocês trocaram e o que preservaram?', state.shock.note, 'Páginas leves alcançam quem tem pacote limitado e gastam menos energia.', 2)}</section>`;
  }
  function refreshFixes(rerenderGroup) {
    for (const group of GROUPS) { const el = $(`status-${group.id}`); if (el) el.innerHTML = groupStatus(group); }
    const count = $('fix-count'); if (count) count.innerHTML = counter(appliedGroups().length, MIN_FIXES, 'correções justificadas');
    for (const key of Object.keys(COLOR_BG)) { const el = document.querySelector(`[data-ratio="${key}"]`); if (el) el.textContent = `Contraste atual: ${ratioFor(key)}`; }
    const hint = $('caption-hint'); if (hint) hint.textContent = captionHint();
    const weight = $('weight-out'); if (weight) weight.innerHTML = weightHTML();
    if (rerenderGroup) { const body = document.querySelector(`#fix-${rerenderGroup} .fix-body`); if (body) body.innerHTML = groupControls(rerenderGroup) + field(`fixNotes.${rerenderGroup}`, 'Quem ganha com esta correção, em qual tarefa?', state.fixNotes[rerenderGroup], '', 2); }
    mountDemos();
  }

  /* ---------- Parada 4 · Teste cruzado e pacto ---------- */
  function evidenceHTML(i) {
    const t = state.test;
    if (i === 1) return t.kbdReached ? `Rastro: o foco chegou ao botão Inscrever pelo teclado (${t.kbdTabs} Tabs).` : `Rastro: o foco ainda não chegou ao botão Inscrever (${t.kbdTabs} Tabs).`;
    if (i === 3) return t.errorSeen === 'text' ? 'Registro: o erro apareceu em texto junto ao campo.' : t.errorSeen === 'color' ? 'Registro: o erro apareceu só pela cor da borda.' : 'Registro: o formulário vazio ainda não foi enviado.';
    return '';
  }
  function updateEvidence() { for (const i of [1, 3]) { const el = $(`evidence-${i}`); if (el) el.textContent = evidenceHTML(i); } }
  function renderTest() {
    const t = state.test, p = state.pact;
    return top(4, 'Teste cruzado e pacto.', 'Outra dupla usa a página corrigida, sem dicas. Quem criou observa em silêncio. Depois, ajuste um ponto observado e firme o pacto da turma.', 'Quatro tarefas testadas, um ajuste ligado ao teste e o pacto com três compromissos.') +
      `<div class="split"><section class="desk"><p class="section-label">Página corrigida · versão Depois</p>
        <div class="toolbar" role="group" aria-label="Ferramentas do teste">${toolButton('zoom4', 'Zoom 200%', ui.zoom4)}<button type="button" class="tool" id="test-start">Começar pelo teclado</button></div>
        <div class="browser-frame"><div class="browser-bar"><span>virada.exemplo/conversa</span><span>Versão corrigida</span></div><div class="demo-host" data-demo="test"></div></div>
        <div id="trail-test" class="trail" aria-live="polite"></div></section>
      <section class="desk"><p class="section-label">Ficha de quem testa</p>
        <label class="field">Apelido da dupla que testa<input type="text" data-field="test.tester" maxlength="65" value="${esc(t.tester)}" autocomplete="off"></label>
        <ol class="tasks">${TASKS.map((task, i) => `<li><fieldset><legend>${i + 1}. ${task.title}</legend><p class="fine">${task.hint}</p>${[1, 3].includes(i) ? `<p class="fine evidence" id="evidence-${i}">${evidenceHTML(i)}</p>` : ''}<div class="radios">${STATUS.map(([id, label]) => `<label><input type="radio" name="task-${i}" data-task="${i}" value="${id}" ${t.results[i].status === id ? 'checked' : ''}> ${label}</label>`).join('')}</div>${field(`test.results.${i}.note`, 'Observação de quem testou', t.results[i].note, '', 2)}</fieldset></li>`).join('')}</ol>
        <div class="evidence-form">${field('test.adjust', 'De volta ao posto: qual observação motivou o ajuste e o que vocês mudaram?', t.adjust, 'Se o teste não revelou problema, registre a evidência de sucesso em vez de inventar uma falha.')}<button type="button" class="button" data-go="3">Voltar às correções para ajustar</button></div>
      </section></div>
      <section class="pact" aria-labelledby="pact-title"><h3 id="pact-title">Pacto da turma</h3><p>Quem projeta decide quem consegue entrar. Escolham três compromissos para os próximos projetos.</p>
        <fieldset class="pact-grid"><legend class="visually-hidden">Compromissos, escolha três</legend>${PACT.map(([id, text]) => `<label class="pact-card"><input type="checkbox" data-pact="${id}" ${p.picks.includes(id) ? 'checked' : ''} ${!p.picks.includes(id) && p.picks.length >= 3 ? 'disabled' : ''}> <span>${text}</span></label>`).join('')}</fieldset>
        <p class="fine" id="pact-count" role="status">${p.picks.length} de 3 compromissos escolhidos.</p>
        ${field('pact.own', 'Frase da dupla para o pacto', p.own, 'Pense em públicos diversos e em conexões lentas. Uma ação concreta, na primeira pessoa do plural.', 2)}
      </section>` +
      stretch('Teste com outra configuração.', 'Repitam uma tarefa com o texto do navegador ampliado (Ctrl e +) em vez do Zoom 200% da oficina. O resultado foi o mesmo?') +
      '<div class="next"><p>Às 22:05, exportem. Abram o HTML baixado e confiram as quatro partes e as páginas antes e depois.</p><button type="button" class="button primary" data-export>Exportar entrega da noite ↗</button></div>';
  }

  /* ---------- Renderização geral e eventos ---------- */
  function render(focusId) {
    document.querySelectorAll('.phase-rail [data-phase]').forEach(button => button.dataset.phase === String(state.phase) ? button.setAttribute('aria-current', 'step') : button.removeAttribute('aria-current'));
    $('workspace').innerHTML = [renderAudit, renderStations, renderFixes, renderTest][state.phase - 1]();
    mountDemos();
    if (state.phase === 1) { renderTrail('trail-audit', ui.trail, ui.tabs); if (ui.picked) $('inspector').innerHTML = inspectorHTML(); }
    if (state.phase === 2 && state.station === 2) measureZoom();
    if (state.phase === 2 && state.station === 3) mountKeyboard();
    if (state.phase === 4) renderTrail('trail-test', ui.trail4, state.test.kbdTabs);
    if (focusId) $(focusId)?.focus();
  }
  function setUrl() {
    try { const url = new URL(location.href); url.searchParams.set('fase', String(state.phase)); if (state.phase === 2) url.searchParams.set('estacao', String(state.station)); else url.searchParams.delete('estacao'); history.replaceState(null, '', url); } catch { /* arquivo local sem histórico */ }
  }
  function go(phase) {
    state.phase = Number(phase); save(); render(); setUrl();
    $('stage-title')?.focus({preventScroll:true}); $('workspace').scrollIntoView({block:'start'});
  }
  function setField(target) {
    const path = target.dataset.field.split('.');
    let owner = state; for (const part of path.slice(0, -1)) owner = owner[part];
    owner[path.at(-1)] = target.value; save();
  }
  document.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('[data-field]')) { setField(target); if (target.dataset.field.startsWith('fixNotes.')) refreshFixes(); }
    if (state.phase === 2) queueMicrotask(refreshStationTabs);
    if (target.id === 'light') { const c = state.stations.contrast, mode = document.querySelector('[name="c-mode"]:checked').value; c.adjust[c.pair] = {mode, light:Number(target.value)}; save(); $('contrast-out').innerHTML = contrastOut(c.pair); }
    if (target.id === 'zoom-level') { state.stations.zoom.level = Number(target.value); save(); $('zoom-label').textContent = `${target.value}%`; document.querySelector('.zoom-card').style.zoom = target.value / 100; measureZoom(); }
    if (target.dataset.altText !== undefined) { const i = Number(target.dataset.altText); state.stations.alt.items[i].text = target.value; save(); $(`alt-say-${i}`).innerHTML = `<span>Leitura:</span> ${esc(altSay(i))}`; $(`alt-hints-${i}`).innerHTML = altHints(i).map(hint => `<li>${esc(hint)}</li>`).join(''); }
    if (target.matches('textarea[data-fix]')) { state.fixes[target.dataset.fix] = target.value; save(); refreshFixes(); }
  });
  document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('select[data-field]')) setField(target);
    if (target.id === 'part-select') pickPart(target.value);
    if (target.id === 'crit-select') updateCritHint();
    if (target.id === 'pair-select') { state.stations.contrast.pair = Number(target.value); save(); render('pair-select'); }
    if (target.name === 'c-mode') { const c = state.stations.contrast, pair = PAIRS[c.pair], base = target.value === 'fg' ? pair.fg : pair.bg; c.adjust[c.pair] = {mode:target.value, light:rgbToHsl(hexToRgb(base))[2]}; save(); $('light').value = Math.round(c.adjust[c.pair].light); $('contrast-out').innerHTML = contrastOut(c.pair); }
    if (target.id === 'zoom-fluid') { state.stations.zoom.fluid = target.checked; save(); document.querySelector('.zoom-card').className = `zoom-card ${target.checked ? 'fluid' : 'fixed'}`; measureZoom(); }
    if (state.phase === 2) queueMicrotask(refreshStationTabs);
    if (target.dataset.altFn !== undefined) { const i = Number(target.dataset.altFn); state.stations.alt.items[i].fn = target.value; save(); $(`alt-say-${i}`).innerHTML = `<span>Leitura:</span> ${esc(altSay(i))}`; $(`alt-hints-${i}`).innerHTML = altHints(i).map(hint => `<li>${esc(hint)}</li>`).join(''); }
    if (target.matches('select[data-fix]')) { const key = target.dataset.fix; state.fixes[key] = ['textSize', 'target'].includes(key) ? Number(target.value) : target.value; save(); refreshFixes(); }
    if (target.matches('input[type="checkbox"][data-fix]')) { const key = target.dataset.fix; if (key === 'autoplayOff') state.fixes.autoplay = !target.checked; else state.fixes[key] = target.checked; save(); refreshFixes(); }
    if (target.dataset.weight) { state.fixes.weight[target.dataset.weight] = target.value; save(); refreshFixes(); }
    if (target.dataset.task !== undefined) { state.test.results[Number(target.dataset.task)].status = target.value; save(); }
    if (target.dataset.pact) {
      const p = state.pact; p.picks = target.checked ? [...new Set([...p.picks, target.dataset.pact])].slice(0, 3) : p.picks.filter(id => id !== target.dataset.pact); save();
      document.querySelectorAll('[data-pact]').forEach(box => { box.disabled = !box.checked && p.picks.length >= 3; });
      $('pact-count').textContent = `${p.picks.length} de 3 compromissos escolhidos.`;
    }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.closest('.phase-rail') && button.dataset.phase) { go(button.dataset.phase); return; }
    if (button.dataset.go) { if (button.dataset.go.startsWith('station-')) { state.station = Number(button.dataset.go.slice(8)); save(); render(); setUrl(); $('stage-title')?.focus({preventScroll:true}); return; } go(button.dataset.go); return; }
    if (button.dataset.station) { state.station = Number(button.dataset.station); save(); render(); setUrl(); document.querySelector(`[data-station="${state.station}"]`)?.focus(); return; }
    if (button.dataset.tool) {
      const tool = button.dataset.tool; ui[tool] = !ui[tool];
      if (['zoom', 'gray', 'linear'].includes(tool) && ui[tool] && !state.audit.tools[tool]) { state.audit.tools[tool] = true; save(); }
      if (tool === 'inspect') { const help = $('tool-help'); if (help) help.textContent = ui.inspect ? 'Inspecionar ligado: clicar escolhe um elemento para medir. Desligue para usar a página normalmente.' : 'Inspecionar desligado: a página funciona como para um visitante.'; }
      button.setAttribute('aria-pressed', String(ui[tool])); applyTools(); updateTools();
      if (tool === 'zoom' && ui.picked) $('inspector').innerHTML = inspectorHTML();
      return;
    }
    if (button.id === 'clear-trail') { ui.trail = []; ui.tabs = 0; renderTrail('trail-audit', ui.trail, ui.tabs); return; }
    if (button.id === 'add-finding') {
      const crit = $('crit-select').value, who = $('who').value.trim(), status = $('finding-status');
      if (!ui.picked || !crit || who.length < 10) { status.textContent = 'Escolha o elemento, o critério e descreva quem é afetado e em qual tarefa.'; return; }
      const related = (ui.facts || []).filter(fact => fact.crit === crit), fact = (related.length ? related : ui.facts || []).map(item => item.text).join(' · ');
      const existing = state.audit.findings.findIndex(item => item.part === ui.picked && item.crit === crit), record = {part:ui.picked, crit, fact, who};
      if (existing >= 0) state.audit.findings[existing] = record; else state.audit.findings.push(record);
      save(); render('add-finding'); $('finding-status').textContent = existing >= 0 ? 'Registro atualizado.' : `Barreira registrada: ${PARTS[record.part].name} · ${critName(crit)}.`;
      return;
    }
    if (button.dataset.removeFinding !== undefined) { state.audit.findings.splice(Number(button.dataset.removeFinding), 1); save(); render(); $('finding-status').textContent = 'Registro removido.'; $('add-finding')?.focus(); return; }
    if (button.dataset.kbdVariant !== undefined) { state.stations.keyboard.variant = Number(button.dataset.kbdVariant); ui.kbdTrail = []; ui.kbdTabs = 0; save(); render(); document.querySelector(`[data-kbd-variant="${state.stations.keyboard.variant}"]`)?.focus(); return; }
    if (button.id === 'kbd-start') { ui.kbdTrail = []; ui.kbdTabs = 0; const run = state.stations.keyboard.runs[state.stations.keyboard.variant]; if (!run.done) { run.tabs = 0; run.tried = false; } save(); mountKeyboard(); $('kbd-host').shadowRoot.querySelector('[data-start]').focus(); return; }
    if (button.id === 'test-start') { ui.trail4 = []; ui.lastTab = 0; state.test.kbdTabs = 0; state.test.kbdReached = false; save(); const root = document.querySelector('[data-demo="test"]').shadowRoot; const first = root.querySelector('.vc'); first.tabIndex = -1; first.focus(); renderTrail('trail-test', ui.trail4, 0); updateEvidence(); return; }
    if (button.dataset.view) { state.view = button.dataset.view; save(); render(); document.querySelector(`[data-view="${state.view}"]`)?.focus(); return; }
    if (button.id === 'order-align') { state.fixes.order = [...VISUAL]; save(); refreshFixes('ordem'); document.querySelector('#fix-ordem .order-list button:not([disabled])')?.focus(); return; }
    if (button.id === 'order-reset') { state.fixes.order = null; save(); refreshFixes('ordem'); $('order-align')?.focus(); return; }
    if (button.dataset.order) {
      const [section, delta] = button.dataset.order.split(':'), list = state.fixes.order, i = list.indexOf(section), j = i + Number(delta);
      if (j < 0 || j >= list.length) return;
      [list[i], list[j]] = [list[j], list[i]]; save(); refreshFixes('ordem');
      document.querySelector(`[data-order="${section}:${delta}"]:not([disabled])`)?.focus() || document.querySelector(`[data-order^="${section}:"]`)?.focus();
      return;
    }
    if (button.id === 'shock') { state.shock.open = true; save(); render(); $('shock-title')?.setAttribute('tabindex', '-1'); $('shock-title')?.focus(); return; }
    if (button.id === 'export' || button.hasAttribute('data-export')) exportReport();
  });
  $('team').value = state.team;
  $('team').addEventListener('input', event => { state.team = event.target.value; save(); });

  /* ---------- Exportação: HTML autônomo, sem recursos de rede ---------- */
  function pending() {
    const list = [];
    if (distinctFindings() < MIN_FINDINGS) list.push(`auditoria com ${MIN_FINDINGS} barreiras (${distinctFindings()} registradas)`);
    const stations = [1, 2, 3, 4].filter(stationDone).length; if (stations < 4) list.push(`registros das estações (${stations} de 4)`);
    if (appliedGroups().length < MIN_FIXES) list.push(`${MIN_FIXES} correções justificadas (${appliedGroups().length} feitas)`);
    if (!state.shock.open || !weightOK(state.fixes) || !state.shock.note.trim()) list.push('plano para conexão lenta');
    const tasks = state.test.results.filter(item => item.status).length; if (tasks < 4) list.push(`tarefas do teste cruzado (${tasks} de 4)`);
    if (!state.test.adjust.trim()) list.push('ajuste após o teste');
    if (state.pact.picks.length < 3 || !state.pact.own.trim()) list.push('pacto da dupla');
    return list;
  }
  function exportReport() {
    const s = state, missing = pending(), team = s.team.trim(), dash = '<em>Não registrado.</em>';
    const text = value => value && value.trim() ? esc(value.trim()) : dash;
    const c = s.stations.contrast, adjusted = PAIRS.map((_, i) => i).filter(i => c.adjust[i]);
    const snapshot = (f, cls) => `<style>${demoCSS(f, `.${cls}`)}</style><div class="${cls}">${demoHTML(f)}</div>`;
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Entrega · Rota acessível · ${esc(team || 'Aula 13')}</title><style>
body{margin:0;background:#f7f5ef;color:#0b1f33;font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
.r-main{max-width:960px;margin:auto;padding:36px 24px 64px}.r-kicker{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#0057b8}
.r-h1{margin:6px 0 10px;font-size:52px;line-height:1}.r-h2{margin:48px 0 14px;padding-top:20px;font-size:30px;border-top:4px solid #0b1f33}.r-h3{margin:22px 0 8px;font-size:21px}
.r-note{padding:14px 16px;border-left:6px solid ${missing.length ? '#b42318' : '#0f7b3f'};background:#ffffff}.r-list{padding-left:22px}.r-list li{margin:8px 0}
.r-table{width:100%;border-collapse:collapse;background:#ffffff}.r-table th,.r-table td{padding:10px;border:1px solid #c9ccd1;text-align:left;vertical-align:top}.r-table th{background:#e8eef6}
.r-pair{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;align-items:start}.r-shot{border:2px solid #0b1f33;background:#ffffff;max-width:560px}.r-shot-title{margin:0;padding:6px 10px;color:#ffffff;background:#0b1f33;font-weight:800}
.r-small{font-size:14px;color:#4a5868}p{white-space:pre-line}@media print{.r-shot{break-inside:avoid}}</style></head><body><main class="r-main">
<p class="r-kicker">SENAI · Design Web · Aula 13</p><h1 class="r-h1">Rota acessível.</h1>
<p><strong>${esc(team || 'Identificação não preenchida')}</strong><br>Exportado em ${esc(new Date().toLocaleString('pt-BR'))}</p>
<p class="r-note">${missing.length ? `Registro parcial. Pendências: ${esc(missing.join('; '))}.` : 'Os registros essenciais estão preenchidos. A qualidade das decisões é avaliada pelos critérios da aula.'}</p>
<h2 class="r-h2">01 / Auditoria</h2>${s.audit.findings.length ? `<table class="r-table"><thead><tr><th>Elemento e critério</th><th>Medição</th><th>Quem é afetado e em qual tarefa</th></tr></thead><tbody>${s.audit.findings.map(item => `<tr><td><strong>${esc(PARTS[item.part].name)}</strong><br>${esc(critName(item.crit))}</td><td>${esc(item.fact)}</td><td>${esc(item.who)}</td></tr>`).join('')}</tbody></table>` : `<p>${dash}</p>`}
<p class="r-small">Ferramentas usadas: ${Object.entries(s.audit.tools).filter(([, used]) => used).map(([id]) => ({keyboard:'teclado', zoom:'zoom 200%', gray:'sem cor', linear:'leitura linear'}[id])).join(', ') || 'nenhuma registrada'}.</p>
<h2 class="r-h2">02 / Estações</h2>
<h3 class="r-h3">1 · Contraste</h3>${adjusted.length ? `<ul class="r-list">${adjusted.map(i => { const r = contrastResult(i); return `<li>${esc(r.pair.name)}: ${fmtRatio(r.before)} → ${fmtRatio(r.after)} (texto ${r.now.fg.toUpperCase()} sobre ${r.now.bg.toUpperCase()})</li>`; }).join('')}</ul>` : '<p>Nenhum par ajustado.</p>'}<p>${text(c.note)}</p>
<h3 class="r-h3">2 · Zoom 200%</h3><p>Cortado com largura fixa a 200%: ${s.stations.zoom.cut200 === null ? 'não medido' : s.stations.zoom.cut200.length ? esc(s.stations.zoom.cut200.join(', ')) : 'nada'}.</p><p>${text(s.stations.zoom.note)}</p>
<h3 class="r-h3">3 · Só teclado</h3><ul class="r-list">${s.stations.keyboard.runs.map((run, i) => `<li>${i ? 'Botões reais' : 'Original'}: ${run.tried ? `${run.tabs} Tabs, ${run.done ? 'concluiu a inscrição' : 'não concluiu'}` : 'não testada'}</li>`).join('')}</ul><p>${text(s.stations.keyboard.note)}</p>
<h3 class="r-h3">4 · Texto alternativo</h3><table class="r-table"><thead><tr><th>Imagem</th><th>Função</th><th>Texto alternativo</th></tr></thead><tbody>${ALT_ITEMS.map((meta, i) => `<tr><td>${esc(meta.name)}</td><td>${esc((ALT_FUNCTIONS.find(([id]) => id === s.stations.alt.items[i].fn) || ['', 'não escolhida'])[1])}</td><td>${s.stations.alt.items[i].fn === 'decorativa' ? '(vazio, decorativa)' : text(s.stations.alt.items[i].text)}</td></tr>`).join('')}</tbody></table><p>${text(s.stations.alt.note)}</p>
<h2 class="r-h2">03 / Correções</h2>${GROUPS.filter(group => group.applied(s.fixes) || s.fixNotes[group.id].trim()).map(group => `<h3 class="r-h3">${esc(group.title)}${group.applied(s.fixes) ? '' : ' · justificativa sem correção aplicada'}</h3><p>${text(s.fixNotes[group.id])}</p>`).join('') || `<p>${dash}</p>`}
<h3 class="r-h3">Conexão lenta</h3><p>Peso: ${fmtMB(weightTotal(BAD()))} → ${fmtMB(weightTotal(s.fixes))} (≈ ${loadSeconds(weightTotal(BAD()))} s → ${loadSeconds(weightTotal(s.fixes))} s a ${SLOW_KBPS} kbps). ${weightOK(s.fixes) ? 'Cabe no limite sem perder informação.' : 'Ainda não cabe ou perde informação.'}</p><ul class="r-list">${WEIGHT.map(item => `<li>${esc(item.label)}: ${esc(item.options.find(([id]) => id === s.fixes.weight[item.id])[1])}</li>`).join('')}</ul><p>${text(s.shock.note)}</p>
<h3 class="r-h3">Síntese</h3><p>${text(s.compare)}</p>
<div class="r-pair"><figure class="r-shot"><figcaption class="r-shot-title">Antes</figcaption>${snapshot(BAD(), 'snap-antes')}</figure><figure class="r-shot"><figcaption class="r-shot-title">Depois</figcaption>${snapshot(s.fixes, 'snap-depois')}</figure></div>
<h2 class="r-h2">04 / Teste cruzado e pacto</h2><p><strong>Dupla que testou:</strong> ${text(s.test.tester)}</p>
<table class="r-table"><thead><tr><th>Tarefa</th><th>Resultado</th><th>Observação</th></tr></thead><tbody>${TASKS.map((task, i) => `<tr><td>${esc(task.title)}${i === 1 || i === 3 ? `<br><span class="r-small">${esc(evidenceHTML(i))}</span>` : ''}</td><td>${esc((STATUS.find(([id]) => id === s.test.results[i].status) || ['', 'não marcado'])[1])}</td><td>${text(s.test.results[i].note)}</td></tr>`).join('')}</tbody></table>
<h3 class="r-h3">Ajuste após o teste</h3><p>${text(s.test.adjust)}</p>
<h3 class="r-h3">Pacto da dupla</h3><ul class="r-list">${s.pact.picks.map(id => `<li>${esc(PACT.find(([key]) => key === id)[1])}</li>`).join('') || '<li>Nenhum compromisso escolhido.</li>'}</ul><p>${text(s.pact.own)}</p>
<p class="r-small">Página, pessoas e dados fictícios. As medições comparam a página de demonstração com referências das WCAG 2.2; a leitura linear é uma aproximação didática. Este arquivo abre sem internet.</p></main></body></html>`;
    const blob = new Blob([html], {type:'text/html;charset=utf-8'}), url = URL.createObjectURL(blob), link = document.createElement('a');
    const slug = norm(team || 'dupla').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 45) || 'dupla';
    link.href = url; link.download = `aula-13-rota-acessivel-${slug}-${new Date().toTimeString().slice(0, 8).replace(/:/g, '')}.html`;
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('save-status').textContent = missing.length ? 'Entrega parcial exportada.' : 'Entrega exportada.';
  }

  render(); save(); setUrl();
})();
