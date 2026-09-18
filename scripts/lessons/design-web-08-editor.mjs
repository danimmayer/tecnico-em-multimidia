// Aula 08 · Oficina de grade: every function below is also embedded in the offline editor.
export const formats = {
  page: {label: 'Página', width: 960, height: 720, cols: 12, margin: 48, gutter: 24},
  post: {label: 'Post quadrado', width: 720, height: 720, cols: 6, margin: 48, gutter: 24}
};
export const kinds = {
  header: {label: 'Cabeçalho', h: {page: 64}, min: {page: 8}},
  brand: {label: 'Marca', h: {post: 56}, min: {post: 3}},
  hero: {label: 'Destaque', h: {page: 176, post: 240}, min: {page: 6, post: 4}},
  card: {label: 'Cartão', h: {page: 144, post: 144}, min: {page: 3, post: 3}},
  button: {label: 'Botão', h: {page: 56, post: 56}, min: {page: 3, post: 2}},
  footer: {label: 'Rodapé', h: {page: 24, post: 24}, min: {page: 5, post: 4}}
};
export const pageStart = [
  {id: 'header', kind: 'header', x: 30, y: 24, w: 900},
  {id: 'hero', kind: 'hero', title: 'Campeonatos na Arena', sub: 'Sexta e sábado · entrada gratuita', x: 110, y: 112, w: 560},
  {id: 'race', kind: 'card', title: 'Corrida', info: 'Sexta · 19h', x: 64, y: 322, w: 250},
  {id: 'soccer', kind: 'card', title: 'Futebol', info: 'Sexta · 20h', x: 344, y: 340, w: 190},
  {id: 'fight', kind: 'card', title: 'Luta', info: 'Sexta · 21h', x: 566, y: 306, w: 300},
  {id: 'button', kind: 'button', x: 690, y: 520, w: 210},
  {id: 'footer', kind: 'footer', x: 64, y: 664, w: 330}
];
export const newCard = {id: 'chess', kind: 'card', title: 'Xadrez rápido', info: 'Sábado · 15h', x: 560, y: 500, w: 230};
export const postStart = [
  {id: 'brand', kind: 'brand', x: 70, y: 30, w: 280},
  {id: 'hero', kind: 'hero', title: 'Campeonato novo', sub: 'Inscrições abertas na Arena', x: 40, y: 110, w: 600},
  {...newCard, x: 120, y: 380, w: 260},
  {id: 'button', kind: 'button', x: 420, y: 560, w: 220},
  {id: 'footer', kind: 'footer', x: 300, y: 660, w: 380}
];
const place = (parts, layout) => parts.map(part => ({...part, ...layout[part.id]}));
export const pageExample = place(pageStart, {
  header: {x: 48, y: 48, w: 864}, hero: {x: 48, y: 136, w: 864},
  race: {x: 48, y: 336, w: 272}, soccer: {x: 344, y: 336, w: 272}, fight: {x: 640, y: 336, w: 272},
  button: {x: 48, y: 512, w: 198}, footer: {x: 48, y: 648, w: 420}
});
export const pageFinalExample = place([...pageStart, newCard], {
  header: {x: 48, y: 48, w: 864}, hero: {x: 48, y: 136, w: 864},
  race: {x: 48, y: 336, w: 198}, soccer: {x: 270, y: 336, w: 198}, fight: {x: 492, y: 336, w: 198}, chess: {x: 714, y: 336, w: 198},
  button: {x: 48, y: 512, w: 198}, footer: {x: 48, y: 648, w: 420}
});
export const postExample = place(postStart, {
  brand: {x: 48, y: 48, w: 300}, hero: {x: 48, y: 128, w: 624},
  chess: {x: 48, y: 392, w: 300}, button: {x: 372, y: 392, w: 300}, footer: {x: 48, y: 648, w: 408}
});

export function escapeXml(text) {return String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');}
export function colW(f) {return (f.width - 2 * f.margin - (f.cols - 1) * f.gutter) / f.cols;}
export function colX(f, c) {return f.margin + c * (colW(f) + f.gutter);}
export function spanW(f, s) {return s * colW(f) + (s - 1) * f.gutter;}
export function spanOf(f, w) {return Math.round((w + f.gutter) / (colW(f) + f.gutter));}
export function partHeight(fmt, part) {return kinds[part.kind].h[fmt];}
export function onGrid(fmt, part) {
  const f = formats[fmt], s = spanOf(f, part.w), c = Math.round((part.x - f.margin) / (colW(f) + f.gutter));
  return s >= 1 && c >= 0 && c + s <= f.cols && Math.abs(spanW(f, s) - part.w) < 0.5 && Math.abs(colX(f, c) - part.x) < 0.5;
}
export function checks(fmt, parts) {
  const f = formats[fmt], h = p => partHeight(fmt, p);
  const off = parts.filter(p => !onGrid(fmt, p)).length;
  const out = parts.filter(p => p.x < f.margin - 0.5 || p.y < f.margin - 0.5 || p.x + p.w > f.width - f.margin + 0.5 || p.y + h(p) > f.height - f.margin + 0.5).length;
  let overlap = 0;
  parts.forEach((a, i) => parts.slice(i + 1).forEach(b => {
    if (a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + h(b) && b.y < a.y + h(a)) overlap += 1;
  }));
  const list = [
    {ok: !off, text: off ? `${off} ${off === 1 ? 'item fora' : 'itens fora'} da grade` : 'Tudo na grade'},
    {ok: !out, text: out ? `${out} ${out === 1 ? 'item passa' : 'itens passam'} da margem` : 'Tudo dentro das margens'},
    {ok: !overlap, text: overlap ? `${overlap} ${overlap === 1 ? 'encontro' : 'encontros'} de itens sobrepostos` : 'Nada sobreposto'}
  ];
  const cards = parts.filter(p => p.kind === 'card');
  if (cards.length > 1) {
    const same = cards.every(c => Math.abs(c.w - cards[0].w) < 0.5);
    list.push({ok: same, text: same ? 'Cartões com a mesma largura' : 'Cartões com larguras diferentes'});
  }
  return list;
}
export function renderPart(fmt, p) {
  const h = partHeight(fmt, p), w = p.w, t = (x, y, size, text, fill, extra = '') => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" fill="${fill}"${extra}>${escapeXml(text)}</text>`;
  const pixel = (x, y, s) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#FF4F7B"/><rect x="${x + s}" y="${y}" width="${s}" height="${s}" fill="#FFD23F"/><rect x="${x}" y="${y + s}" width="${s}" height="${s}" fill="#8F75FF"/><rect x="${x + s}" y="${y + s}" width="${s}" height="${s}" fill="#FF4F7B"/>`;
  let body = '';
  if (p.kind === 'header') body = `<rect width="${w}" height="${h}" rx="8" fill="#1B1440"/>${pixel(20, 20, 12)}${t(56, 41, 24, 'ARENA PIXEL', '#FFFFFF', ' font-weight="700"')}${t(w - 24, 39, 16, 'Campeonatos · Horários · Contato', '#D9D2FF', ' text-anchor="end"')}`;
  if (p.kind === 'brand') body = `${pixel(0, 8, 20)}${t(54, 40, 28, 'ARENA PIXEL', '#1B1440', ' font-weight="700"')}`;
  if (p.kind === 'hero') {
    const big = w >= 640, mid = h / 2;
    body = `<rect width="${w}" height="${h}" rx="12" fill="#2B1D6B"/>${big ? `${pixel(w - 92, 28, 16)}${pixel(w - 60, h - 64, 16)}` : ''}${t(28, mid - 4, big ? 40 : 32, p.title, '#FFFFFF', ' font-weight="700"')}${t(28, mid + 34, 20, p.sub, '#FFD23F')}`;
  }
  if (p.kind === 'card') body = `<rect width="${w}" height="${h}" rx="10" fill="#FFFFFF" stroke="#D9D2F0"/><rect x="0" y="0" width="${w}" height="10" rx="4" fill="#6C4CF5"/>${t(20, 44, 12, 'CAMPEONATO', '#6C4CF5', ' font-weight="700" letter-spacing="1.5"')}${t(20, 80, 22, p.title, '#1B1440', ' font-weight="700"')}${t(20, 114, 18, p.info, '#4A4370')}`;
  if (p.kind === 'button') body = `<rect width="${w}" height="${h}" rx="${h / 2}" fill="#FF4F7B"/>${t(w / 2, 35, 18, 'Quero participar', '#FFFFFF', ' font-weight="700" text-anchor="middle"')}`;
  if (p.kind === 'footer') body = t(0, 18, 16, 'Empresa fictícia · exercício de grade', '#6B6591');
  const name = p.title || kinds[p.kind].label;
  return `<g data-part="${p.id}" tabindex="0" role="button" aria-label="Mover ${escapeXml(name)}" transform="translate(${p.x} ${p.y})">${body}<rect class="hit" width="${w}" height="${h}" fill="transparent"/></g>`;
}
export function renderSvg(fmt, parts, guides = false) {
  const f = formats[fmt];
  const columns = guides ? `<g pointer-events="none">${Array.from({length: f.cols}, (_, c) => `<rect x="${colX(f, c)}" y="0" width="${colW(f)}" height="${f.height}" fill="#FF4F7B" fill-opacity="0.16"/>`).join('')}<rect x="${f.margin}" y="${f.margin}" width="${f.width - 2 * f.margin}" height="${f.height - 2 * f.margin}" fill="none" stroke="#C2185B" stroke-dasharray="8 8"/></g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f.width} ${f.height}" width="${f.width}" height="${f.height}" role="img" aria-label="${f.label} da Arena Pixel"><rect width="${f.width}" height="${f.height}" fill="#F4F1FA"/>${parts.map(p => renderPart(fmt, p)).join('')}${columns}</svg>`;
}

// Slide illustrations: generic interfaces, no real brands.
export function renderScreens(guides = false) {
  const band = (x, y, w, h, cols, margin, gutter) => {
    const cw = (w - 2 * margin - (cols - 1) * gutter) / cols;
    return {x: c => x + margin + c * (cw + gutter), w: s => s * cw + (s - 1) * gutter, overlay: guides ? Array.from({length: cols}, (_, c) => `<rect x="${x + margin + c * (cw + gutter)}" y="${y}" width="${cw}" height="${h}" fill="#FF4F7B" fill-opacity="0.3"/>`).join('') : ''};
  };
  const a = band(20, 40, 440, 300, 12, 20, 10), b = band(490, 40, 440, 300, 12, 20, 10), c = band(972, 44, 196, 348, 4, 12, 8);
  const posters = ['#E05A47', '#F2B134', '#4AA3A2', '#7B5EA7', '#3F7CD8', '#D9587F'];
  const streaming = `<rect x="20" y="40" width="440" height="300" rx="10" fill="#101014"/><rect x="${a.x(0)}" y="56" width="${a.w(2)}" height="12" rx="3" fill="#E05A47"/><rect x="${a.x(0)}" y="84" width="${a.w(12)}" height="110" rx="6" fill="#3A2A6B"/><rect x="${a.x(0) + 16}" y="112" width="150" height="14" rx="3" fill="#FFFFFF"/><rect x="${a.x(0) + 16}" y="136" width="110" height="9" rx="3" fill="#B9B2D9"/><rect x="${a.x(0) + 16}" y="158" width="70" height="22" rx="11" fill="#FFFFFF"/><rect x="${a.x(0)}" y="208" width="70" height="9" rx="3" fill="#B9B2D9"/>${posters.map((color, i) => `<rect x="${a.x(i * 2)}" y="226" width="${a.w(2)}" height="96" rx="5" fill="${color}"/>`).join('')}`;
  const store = `<rect x="490" y="40" width="440" height="300" rx="10" fill="#FFFFFF" stroke="#D8D8D8"/><rect x="${b.x(0)}" y="54" width="${b.w(3)}" height="16" rx="3" fill="#1F8A5B"/><rect x="${b.x(3)}" y="54" width="${b.w(7)}" height="16" rx="8" fill="#EEEEEE"/><rect x="${b.x(11)}" y="54" width="${b.w(1)}" height="16" rx="3" fill="#1F8A5B"/><rect x="${b.x(0)}" y="84" width="${b.w(12)}" height="64" rx="6" fill="#FFE2B8"/><rect x="${b.x(0) + 14}" y="104" width="130" height="12" rx="3" fill="#8A4B12"/><rect x="${b.x(0) + 14}" y="124" width="80" height="8" rx="3" fill="#C98A4B"/>${[0, 3, 6, 9].map(col => `<rect x="${b.x(col)}" y="162" width="${b.w(3)}" height="160" rx="6" fill="#F6F6F6" stroke="#E2E2E2"/><rect x="${b.x(col) + 8}" y="170" width="${b.w(3) - 16}" height="84" rx="4" fill="#DDE7F3"/><rect x="${b.x(col) + 8}" y="264" width="${b.w(3) - 26}" height="8" rx="3" fill="#555555"/><rect x="${b.x(col) + 8}" y="280" width="40" height="10" rx="3" fill="#1F8A5B"/><rect x="${b.x(col) + 8}" y="298" width="${b.w(3) - 16}" height="16" rx="8" fill="#1F8A5B"/>`).join('')}`;
  const phone = `<rect x="960" y="30" width="220" height="376" rx="28" fill="#1D1D1F"/><rect x="972" y="44" width="196" height="348" rx="18" fill="#FFFFFF"/>${[0, 1, 2, 3].map(col => `<circle cx="${c.x(col) + c.w(1) / 2}" cy="78" r="${c.w(1) / 2 - 2}" fill="none" stroke="#D9587F" stroke-width="3"/>`).join('')}<circle cx="${c.x(0) + 10}" cy="124" r="10" fill="#7B5EA7"/><rect x="${c.x(0) + 26}" y="119" width="70" height="9" rx="3" fill="#555555"/><rect x="${c.x(0)}" y="142" width="${c.w(4)}" height="150" rx="4" fill="#4AA3A2"/><rect x="${c.x(0)}" y="302" width="${c.w(1)}" height="12" rx="3" fill="#D9587F"/><rect x="${c.x(0)}" y="324" width="${c.w(3)}" height="8" rx="3" fill="#999999"/><rect x="${c.x(0)}" y="340" width="${c.w(2)}" height="8" rx="3" fill="#999999"/><circle cx="${c.x(0) + 10}" cy="372" r="10" fill="#F2B134"/><rect x="${c.x(0) + 26}" y="367" width="60" height="9" rx="3" fill="#555555"/>`;
  const label = (x, text) => `<text x="${x}" y="432" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1B1440">${text}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 450" width="1200" height="450" role="img" aria-label="Esboços de streaming, loja online e rede social no celular${guides ? ' com as colunas marcadas' : ''}"><rect width="1200" height="450" rx="14" fill="#F4F1FA"/>${streaming}${a.overlay}${store}${b.overlay}${phone}${c.overlay}${label(240, guides ? 'Streaming · 12 colunas' : 'Streaming')}${label(710, guides ? 'Loja online · 12 colunas' : 'Loja online')}${label(1070, guides ? 'Celular · 4 colunas' : 'Rede social')}</svg>`;
}
export function renderTwelve() {
  const x0 = 250, w = 720, gutter = 8, cw = (w - 11 * gutter) / 12, cx = c => x0 + c * (cw + gutter), sw = s => s * cw + (s - 1) * gutter;
  const text = (x, y, size, value, fill, anchor = 'start', weight = 700) => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${value}</text>`;
  const top = Array.from({length: 12}, (_, c) => `<rect x="${cx(c)}" y="30" width="${cw}" height="56" rx="4" fill="#FF4F7B" fill-opacity="0.25"/>${text(cx(c) + cw / 2, 66, 18, c + 1, '#C2185B', 'middle')}`).join('');
  const rows = [[2, 6], [3, 4], [4, 3], [6, 2]].map(([n, s], r) => {
    const y = 118 + r * 78;
    return `${text(30, y + 36, 24, `${n} itens × ${s} colunas`, '#1B1440', 'start', 700)}${Array.from({length: n}, (_, i) => `<rect x="${cx(i * s)}" y="${y}" width="${sw(s)}" height="56" rx="6" fill="${i % 2 ? '#8F75FF' : '#6C4CF5'}"/>`).join('')}`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 440" width="1000" height="440" role="img" aria-label="Doze colunas divididas em 2, 3, 4 e 6 partes iguais"><rect width="1000" height="440" rx="14" fill="#F4F1FA"/>${text(30, 66, 24, '12 colunas', '#C2185B')}${top}${rows}</svg>`;
}

function startEditor() {
  const $ = id => document.getElementById(id);
  const copy = value => JSON.parse(JSON.stringify(value));
  const names = {page: ['pagina-v1', 'pagina-final', 'pagina-alternativa'], post: ['post-final', 'post-alternativa']};
  let state = {page: copy(pageStart), post: copy(postStart)}, fmt = 'page', selected = {page: 'header', post: 'brand'};
  let history = [], drag = null, dirty = false;
  const board = $('board'), status = $('status');
  const announce = text => {status.textContent = text;};
  const parts = () => state[fmt];
  const current = () => parts().find(p => p.id === selected[fmt]) || parts()[0];
  function snap(p) {
    const f = formats[fmt], min = kinds[p.kind].min[fmt];
    const s = Math.max(min, Math.min(f.cols, spanOf(f, p.w)));
    p.w = spanW(f, s);
    const c = Math.max(0, Math.min(f.cols - s, Math.round((p.x - f.margin) / (colW(f) + f.gutter))));
    p.x = colX(f, c);
    p.y = Math.max(0, Math.min(f.height - partHeight(fmt, p), Math.round(p.y / 8) * 8));
  }
  function draw() {
    const f = formats[fmt], part = current();
    board.style.maxWidth = `min(960px, calc((100vh - 190px) * ${f.width / f.height}))`;
    board.innerHTML = renderSvg(fmt, parts(), $('guides').checked);
    board.querySelectorAll('[data-part]').forEach(el => el.classList.toggle('selected', el.dataset.part === part.id));
    $('choice').innerHTML = parts().map(p => `<option value="${p.id}">${escapeXml(p.title && p.kind === 'card' ? 'Cartão · ' + p.title : kinds[p.kind].label)}</option>`).join('');
    $('choice').value = part.id;
    const span = onGrid(fmt, part) ? spanOf(f, part.w) : null;
    $('span').textContent = span ? `${span} de ${f.cols} colunas` : 'fora da grade';
    $('narrow').disabled = span !== null && span <= kinds[part.kind].min[fmt];
    $('wide').disabled = span !== null && span >= f.cols;
    $('undo').disabled = !history.length;
    $('newcard').hidden = fmt !== 'page';
    $('newcard').disabled = state.page.some(p => p.id === 'chess');
    document.querySelectorAll('[data-format]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.format === fmt)));
    const keep = $('filename').value;
    $('filename').innerHTML = names[fmt].map(n => `<option value="${n}">${n}.png</option>`).join('');
    if (names[fmt].includes(keep)) $('filename').value = keep;
    $('checks').innerHTML = checks(fmt, parts()).map(c => `<li class="${c.ok ? 'ok' : 'todo'}"><span aria-hidden="true">${c.ok ? '✓' : '!'}</span> ${escapeXml(c.text)}</li>`).join('');
    $('gridinfo').textContent = `${f.label}: grade de ${f.cols} colunas.`;
  }
  function remember() {history.push(copy(state)); if (history.length > 80) history.shift(); dirty = true;}
  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = name; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function resize(delta) {
    const f = formats[fmt], p = current();
    remember();
    const s = onGrid(fmt, p) ? spanOf(f, p.w) + delta : spanOf(f, p.w);
    p.w = spanW(f, Math.max(1, Math.min(f.cols, s)));
    snap(p); draw();
    announce(`${kinds[p.kind].label} ocupa ${spanOf(f, p.w)} colunas.`);
  }
  document.querySelectorAll('[data-format]').forEach(b => b.addEventListener('click', () => {
    fmt = b.dataset.format; draw();
    announce(fmt === 'post' ? 'Post quadrado: grade de 6 colunas. Mesmos componentes da página.' : 'Página: grade de 12 colunas.');
  }));
  $('choice').addEventListener('change', e => {selected[fmt] = e.target.value; draw();});
  $('narrow').addEventListener('click', () => resize(-1));
  $('wide').addEventListener('click', () => resize(1));
  $('guides').addEventListener('change', draw);
  board.addEventListener('pointerdown', e => {
    const item = e.target.closest('[data-part]'); if (!item) return;
    selected[fmt] = item.dataset.part;
    const p = current(), rect = board.querySelector('svg').getBoundingClientRect();
    drag = {startX: e.clientX, startY: e.clientY, x: p.x, y: p.y, w: p.w, scale: formats[fmt].width / rect.width};
    remember(); board.setPointerCapture(e.pointerId); draw(); e.preventDefault(); board.focus({preventScroll: true});
  });
  board.addEventListener('pointermove', e => {
    if (!drag) return;
    const p = current();
    p.x = drag.x + (e.clientX - drag.startX) * drag.scale; p.y = drag.y + (e.clientY - drag.startY) * drag.scale; p.w = drag.w;
    snap(p); draw();
  });
  const stop = () => {if (drag) {drag = null; announce('Item encaixado na coluna mais próxima.');}};
  board.addEventListener('pointerup', stop);
  board.addEventListener('pointercancel', stop);
  board.addEventListener('focusin', e => {
    const item = e.target.closest('[data-part]'); if (!item) return;
    selected[fmt] = item.dataset.part;
    board.querySelectorAll('[data-part]').forEach(el => el.classList.toggle('selected', el.dataset.part === selected[fmt]));
    $('choice').value = selected[fmt];
  });
  board.addEventListener('keydown', e => {
    const move = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]}[e.key];
    if (!move) return;
    e.preventDefault(); remember();
    const f = formats[fmt], p = current();
    p.x += move[0] * (colW(f) + f.gutter); p.y += move[1] * (e.shiftKey ? 40 : 8);
    snap(p); draw(); board.focus({preventScroll: true});
  });
  $('undo').addEventListener('click', () => {
    if (!history.length) return;
    state = history.pop(); dirty = true; draw(); announce('Última alteração desfeita.');
  });
  $('newcard').addEventListener('click', () => {
    if (state.page.some(p => p.id === 'chess')) return;
    remember(); state.page.push(copy(newCard)); selected.page = 'chess'; draw();
    announce('Campeonato novo incluído. Agora são quatro cartões: reorganize a linha.');
  });
  $('save').addEventListener('click', () => {
    saveBlob(new Blob([JSON.stringify({version: 1, page: state.page, post: state.post})], {type: 'application/json'}), 'projeto.grade');
    dirty = false; announce('Download solicitado: projeto.grade. Confira a pasta Downloads e guarde na pasta Aula-08.');
  });
  $('open').addEventListener('change', async e => {
    const file = e.target.files[0]; if (!file) return;
    try {
      if (file.size > 20000) throw new Error('large');
      const data = JSON.parse(await file.text());
      if (data.version !== 1 || !Array.isArray(data.page) || !Array.isArray(data.post)) throw new Error('format');
      const rebuild = (key, list, base, optional) => {
        const allowed = [...base, ...optional], ids = new Set(list.map(p => p && p.id));
        if (ids.size !== list.length || !base.every(p => ids.has(p.id)) || list.length > allowed.length) throw new Error('ids');
        const f = formats[key];
        return list.map(p => {
          const model = allowed.find(a => a.id === p.id);
          if (!model || ![p.x, p.y, p.w].every(Number.isFinite) || p.w < 40 || p.x < 0 || p.y < 0 || p.x + p.w > f.width || p.y + kinds[model.kind].h[key] > f.height) throw new Error('position');
          return {...model, x: p.x, y: p.y, w: p.w};
        });
      };
      const next = {page: rebuild('page', data.page, pageStart, [newCard]), post: rebuild('post', data.post, postStart, [])};
      if (dirty && !confirm('Há alterações desde o último salvamento. Abrir outro projeto agora?')) return;
      remember(); state = next; dirty = false; draw();
      announce('Projeto reaberto. Confira a página e o post nas duas abas.');
    } catch {announce('Não foi possível abrir. Escolha um arquivo projeto.grade salvo nesta oficina. Seu trabalho foi preservado.');}
    finally {e.target.value = '';}
  });
  $('png').addEventListener('click', () => {
    const f = formats[fmt], image = new Image(), url = URL.createObjectURL(new Blob([renderSvg(fmt, parts())], {type: 'image/svg+xml'}));
    image.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = f.width; canvas.height = f.height;
      canvas.getContext('2d').drawImage(image, 0, 0); URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        if (!blob) {announce('Falha ao exportar. Salve o projeto e tente novamente.'); return;}
        saveBlob(blob, $('filename').value + '.png'); announce('PNG exportado. Abra o arquivo na pasta Downloads para conferir.');
      }, 'image/png');
    };
    image.onerror = () => {URL.revokeObjectURL(url); announce('Falha ao exportar. Salve o projeto e tente novamente.');};
    image.src = url;
  });
  $('download').addEventListener('click', () => {
    // The static source is embedded at generation time, excluding any student state.
    saveBlob(new Blob([offlineSource], {type: 'text/html;charset=utf-8'}), 'oficina-aula-08.html');
    announce('Oficina baixada. Abra oficina-aula-08.html por duplo clique para trabalhar sem internet. O projeto é salvo separadamente.');
  });
  $('example').addEventListener('click', () => {$('exampleDialog').showModal();});
  $('closeExample').addEventListener('click', () => {$('exampleDialog').close();});
  window.addEventListener('beforeunload', e => {if (dirty) {e.preventDefault(); e.returnValue = '';}});
  draw();
}

export function editorHtml() {
  const embedded = [escapeXml, colW, colX, spanW, spanOf, partHeight, onGrid, checks, renderPart, renderSvg].map(fn => fn.toString()).join('\n');
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Oficina de grade · Aula 08</title><link rel="icon" href="data:,"><style>
  *{box-sizing:border-box}body{margin:0;background:#E9E6F1;color:#1B1440;font:16px/1.4 Arial,sans-serif}header{padding:18px 24px;background:#1B1440;color:white;display:flex;align-items:center;gap:24px;justify-content:space-between}h1{font-size:23px;margin:0}header p{margin:4px 0 0;font-size:15px;color:#D9D2FF}button,select,input,.file{font:inherit;border:1px solid #9C94BF;border-radius:5px;padding:9px;background:white;color:#1B1440}button,.file{cursor:pointer}button:hover,.file:hover{background:#EFEBFA}button:disabled{opacity:.45;cursor:default}:focus-visible{outline:3px solid #FF4F7B;outline-offset:3px}.workspace{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:20px;padding:20px 24px;max-width:1500px;margin:auto}.tabs{display:flex;gap:8px;margin-bottom:12px}.tabs button{font-weight:700}.tabs button[aria-pressed=true]{background:#1B1440;color:white;border-color:#1B1440}#board{line-height:0;box-shadow:0 8px 25px #1B144018;touch-action:none;max-width:960px}#board svg{width:100%;height:auto;display:block}#board [data-part]{cursor:move}#board text{pointer-events:none}#board .selected .hit{stroke:#C2185B;stroke-width:3;stroke-dasharray:6 4}.panel{display:flex;flex-direction:column;gap:12px;align-items:stretch}.panel label{display:flex;flex-direction:column;gap:5px;font-size:14px}.panel .toggle{flex-direction:row;align-items:center}.panel h2{font-size:18px;margin:0}.panel h3{font-size:15px;margin:6px 0 0}.panel p{font-size:14px;margin:0}.width{display:grid;grid-template-columns:1fr 1fr;gap:8px}.width output{grid-column:1/-1;font-weight:700;font-size:17px}#checks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}#checks li{padding:8px 10px;border-radius:5px;font-size:14px;font-weight:700}#checks .ok{background:#E3F4EA;color:#1D5C3A}#checks .todo{background:#FFE8EE;color:#9C1745}.file input{max-width:100%;font-size:13px}.tools{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.tools label{display:flex;align-items:center;gap:8px}#status{min-height:46px;margin:12px 0;font-size:16px;font-weight:600}details{padding:12px 0;border-top:1px solid #C9C2DE}summary{cursor:pointer;font-weight:600}li{margin:6px 0}dialog{max-width:900px;width:92vw;border:0;border-radius:8px;padding:24px}dialog::backdrop{background:#1B1440b3}dialog svg{width:100%;height:auto;max-height:62vh}dialog h2{margin:0 0 12px}dialog p{margin:10px 0}#download{white-space:nowrap}@media(max-width:860px){header{align-items:flex-start;flex-wrap:wrap}.workspace{grid-template-columns:1fr;padding:12px}}
  </style></head><body><header><div><h1>Oficina de grade</h1><p>Design Web · Aula 08 · grades e sistemas visuais</p></div><button id="download">Baixar oficina para uso sem internet</button></header><main class="workspace"><section aria-label="Composição"><div class="tabs" role="group" aria-label="Formato"><button data-format="page" aria-pressed="true">Página</button><button data-format="post" aria-pressed="false">Post quadrado</button></div><div id="board" tabindex="0" aria-label="Área de composição. Selecione um item e use as setas para mover de coluna em coluna."></div><div class="tools"><label>Nome da imagem <select id="filename"></select></label><button id="png">Exportar PNG</button><button id="example">Ver exemplo da página</button></div><p id="status" role="status" aria-live="polite">Arraste um item: ele gruda na coluna mais próxima.</p><details><summary>Como trabalhar e conferir</summary><ol><li>Crie uma pasta Aula-08 para guardar tudo de hoje.</li><li>Selecione um item na página ou na lista. Arraste com o mouse; as setas mudam de coluna ou sobem e descem.</li><li>Use Mais estreito e Mais largo para escolher quantas colunas o item ocupa.</li><li>O quadro Conferência mostra o que ainda falta: grade, margens, sobreposição e cartões iguais.</li><li>Quando a aula pedir, clique em Incluir campeonato novo. Depois monte o post na aba Post quadrado.</li><li>Escolha o nome da imagem antes de exportar. Salve também projeto.grade e teste a reabertura.</li></ol><p>O botão “Quero participar” faz parte do estudo visual; não envia nada. Empresa e conteúdo fictícios. Os arquivos ficam no computador, sem envio a um servidor.</p></details></section><aside class="panel"><h2>Organizar na grade</h2><p id="gridinfo"></p><label>Item selecionado<select id="choice"></select></label><div class="width"><output id="span" aria-live="polite"></output><button id="narrow">− Mais estreito</button><button id="wide">+ Mais largo</button></div><label class="toggle"><input id="guides" type="checkbox" checked> Mostrar colunas</label><button id="undo">Desfazer</button><button id="newcard">Incluir campeonato novo</button><h3>Conferência</h3><ul id="checks"></ul><button id="save">Salvar projeto</button><label class="file">Abrir projeto<input id="open" type="file" accept=".grade,application/json"></label><p>Salvar baixa uma cópia. Confira a pasta Downloads e guarde a versão mais recente como projeto.grade.</p></aside></main><dialog id="exampleDialog"><h2>Uma organização possível</h2>${renderSvg('page', pageExample, true)}<p>Mesmos textos, cores e letras. Cada item começa e termina numa coluna, e os três cartões têm a mesma largura. A sua página pode ter outra organização que passe na conferência.</p><button id="closeExample">Voltar ao projeto</button></dialog><script>
const formats=${JSON.stringify(formats)};
const kinds=${JSON.stringify(kinds)};
const pageStart=${JSON.stringify(pageStart)};
const postStart=${JSON.stringify(postStart)};
const newCard=${JSON.stringify(newCard)};
${embedded}
const offlineSource=OFFLINE_SOURCE;
(${startEditor.toString()})();
</script></body></html>`;
  // Build the downloadable source without recursively embedding itself.
  const standalone = html.replace('const offlineSource=OFFLINE_SOURCE;', 'const offlineSource="<!doctype html>"+document.documentElement.outerHTML;');
  return html.replace('OFFLINE_SOURCE', JSON.stringify(standalone).replaceAll('</script', '<\\/script'));
}
export function illustrations() {
  return {
    telas: renderScreens(false),
    'telas-grade': renderScreens(true),
    doze: renderTwelve(),
    'pagina-inicial': renderSvg('page', pageStart),
    'pagina-final-exemplo': renderSvg('page', pageFinalExample),
    'post-exemplo': renderSvg('post', postExample)
  };
}
