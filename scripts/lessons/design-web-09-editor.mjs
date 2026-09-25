// Aula 09 · Oficina responsiva: the same Arena Pixel page in three screens.
// Drawing and grid functions come unchanged from the Aula 08 oficina; they are bound
// here to the three screen formats, exactly as they are embedded in the offline editor.
import vm from 'node:vm';
import * as base from './design-web-08-editor.mjs';

export const formats = {
  desktop: {label: 'Computador', width: 960, height: 720, cols: 12, margin: 48, gutter: 24},
  tablet: {label: 'Tablet', width: 768, height: 1024, cols: 8, margin: 40, gutter: 24},
  phone: {label: 'Celular', width: 360, height: 1120, cols: 4, margin: 16, gutter: 16, fold: 720}
};
const all = (value) => ({desktop: value, tablet: value, phone: value});
export const kinds = {
  text: {label: 'Texto', h: all(80), min: all(1)},
  shape: {label: 'Forma', h: all(120), min: all(1)},
  icon: {label: 'Ícone', h: all(80), min: all(1)},
  image: {label: 'Imagem', h: all(160), min: all(1)},
  header: {label: 'Cabeçalho', h: {desktop: 64, tablet: 64, phone: 56}, min: {desktop: 8, tablet: 8, phone: 4}},
  hero: {label: 'Destaque', h: {desktop: 176, tablet: 200, phone: 200}, min: {desktop: 6, tablet: 6, phone: 4}},
  card: {label: 'Cartão', h: all(144), min: {desktop: 3, tablet: 4, phone: 4}},
  button: {label: 'Botão', h: all(56), min: {desktop: 3, tablet: 3, phone: 4}},
  footer: {label: 'Rodapé', h: all(24), min: {desktop: 5, tablet: 4, phone: 4}}
};
export const iconPaths = base.iconPaths;

const shared = [base.escapeXml, base.colW, base.colX, base.spanW, base.spanOf, base.partHeight, base.onGrid, base.checks, base.renderPart, base.renderSvg, base.textWidth, base.fitLabel, base.wrapText];
const scope = vm.runInNewContext(`${shared.map(fn => fn.toString()).join('\n')}\n({${shared.map(fn => fn.name).join(',')}})`, {formats, kinds, iconPaths});
export const {escapeXml, colW, colX, spanW, spanOf, partHeight, onGrid, textWidth, fitLabel} = scope;
const baseChecks = scope.checks, baseRender = scope.renderSvg;

// The phone board is a long page; the dashed line marks what fits before scrolling.
export function renderScreen(fmt, parts, guides = false, background = '#F4F1FA') {
  const f = formats[fmt], svg = baseRender(fmt, parts, guides, background);
  if (!f.fold || !guides) return svg;
  const fold = `<g pointer-events="none"><line x1="0" y1="${f.fold}" x2="${f.width}" y2="${f.fold}" stroke="#C2185B" stroke-width="3" stroke-dasharray="10 8"/><rect x="${f.width - 150}" y="${f.fold - 26}" width="146" height="22" rx="4" fill="#C2185B"/><text x="${f.width - 77}" y="${f.fold - 10}" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">fim da primeira tela</text></g>`;
  return svg.slice(0, svg.lastIndexOf('</svg>')) + fold + '</svg>';
}

// Starting point for tablet and phone: the computer page only shrunk, as a browser would do without design decisions.
export function shrink(parts, fmt) {
  const ratio = formats[fmt].width / formats.desktop.width;
  return parts.map((part) => {
    const next = {...part, x: Math.round(part.x * ratio), w: Math.max(8, Math.round(part.w * ratio))};
    if (part.decorative) next.h = Math.max(8, Math.round((part.h ?? kinds[part.kind].h.desktop) * ratio));
    else delete next.h;
    return next;
  });
}

export const desktopStart = base.pageFinalExample.map(({...part}) => part);
export const tabletShrunk = shrink(desktopStart, 'tablet');
export const phoneShrunk = shrink(desktopStart, 'phone');
// Tablet and phone start empty: every piece comes from the library built from the computer page.
export const tabletStart = [];
export const phoneStart = [];
const gridKinds = ['header', 'hero', 'card', 'button', 'footer'];

// Places a copy of a computer-page item on another screen: full width for header and hero,
// the narrowest allowed span for the rest, in the first free grid spot or at the drop point.
export function placeFromLibrary(fmt, source, parts, at) {
  const f = formats[fmt], p = {...source}, onGridKind = gridKinds.includes(p.kind) && !p.decorative;
  let span = 0;
  if (onGridKind) {
    delete p.h;
    span = ['header', 'hero'].includes(p.kind) ? f.cols : kinds[p.kind].min[fmt];
    p.w = spanW(f, span);
  } else {
    p.w = Math.min(p.w, f.width - 2 * f.margin);
    p.h = Math.min(partHeight('desktop', source), f.height - 2 * f.margin);
  }
  const h = partHeight(fmt, p);
  if (at) {
    p.x = Math.max(0, Math.min(f.width - p.w, at.x - p.w / 2));
    p.y = Math.max(0, Math.min(f.height - h, at.y - h / 2));
    return p;
  }
  const free = (x, y) => y + h <= f.height - f.margin && parts.every(q => x + p.w + f.gutter <= q.x || q.x + q.w + f.gutter <= x || y + h + f.gutter <= q.y || q.y + partHeight(fmt, q) + f.gutter <= y);
  const rows = [...new Set([f.margin, ...parts.map(q => Math.ceil((q.y + partHeight(fmt, q) + f.gutter) / 8) * 8), ...parts.map(q => q.y)])].sort((a, b) => a - b);
  const columns = onGridKind ? Array.from({length: f.cols - span + 1}, (_, c) => colX(f, c)) : [f.margin];
  for (const y of rows) for (const x of columns) if (free(x, y)) {p.x = x; p.y = y; return p;}
  // No free spot left: place it at the margin, at the bottom, for the student to reorganize.
  p.x = f.margin; p.y = Math.max(0, f.height - f.margin - h);
  return p;
}

// Client sketch for the tablet: order and grouping in grey blocks, without colours or measures.
export function renderWireframe() {
  const f = formats.tablet, labels = {header: 'MARCA · MENU', hero: 'DESTAQUE', card: 'CAMPEONATO', button: 'BOTÃO', footer: 'RODAPÉ'};
  const blocks = tabletExample.map(p => {
    const h = partHeight('tablet', p);
    return `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${h}" rx="10" fill="${p.kind === 'button' ? '#9D98AE' : '#D8D5E0'}" stroke="#8C8799" stroke-width="3"/><text x="${p.x + p.w / 2}" y="${p.y + h / 2 + 12}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${p.kind === 'footer' ? 20 : 34}" font-weight="700" fill="#4B4659">${labels[p.kind]}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f.width} ${f.height}" width="${f.width}" height="${f.height}" role="img" aria-label="Rascunho do cliente para o tablet: marca e menu, destaque, quatro campeonatos em duas linhas de dois, botão e rodapé"><rect width="${f.width}" height="${f.height}" fill="#F7F6FA" stroke="#8C8799" stroke-width="4" stroke-dasharray="14 10"/>${blocks}</svg>`;
}

const place = (layout) => desktopStart.map((part) => ({...part, ...layout[part.id]}));
export const tabletExample = place({
  header: {x: 40, y: 40, w: 688}, hero: {x: 40, y: 120, w: 688},
  race: {x: 40, y: 336, w: 332}, soccer: {x: 396, y: 336, w: 332}, fight: {x: 40, y: 496, w: 332}, chess: {x: 396, y: 496, w: 332},
  button: {x: 40, y: 656, w: 243}, footer: {x: 40, y: 944, w: 421}
});
export const phoneExample = place({
  header: {x: 16, y: 16, w: 328, sub: 'Menu'}, hero: {x: 16, y: 88, w: 328}, button: {x: 16, y: 304, w: 328},
  race: {x: 16, y: 376, w: 328}, soccer: {x: 16, y: 536, w: 328}, fight: {x: 16, y: 696, w: 328}, chess: {x: 16, y: 856, w: 328},
  footer: {x: 16, y: 1016, w: 328}
});

// Responsive checks on top of the Aula 08 checks (grid, margins, overlap and equal cards).
export function checks(fmt, parts, reference = parts) {
  const list = baseChecks(fmt, parts);
  const f = formats[fmt], items = parts.filter(p => !p.decorative), h = p => partHeight(fmt, p);
  const cards = items.filter(p => p.kind === 'card');
  if (fmt !== 'desktop') {
    const missing = reference.filter(p => !p.decorative && !parts.some(q => q.id === p.id)).length;
    list.push({ok: !missing, text: missing ? `${missing === 1 ? 'Falta 1 componente' : `Faltam ${missing} componentes`} da biblioteca` : 'Todos os componentes da biblioteca na tela'});
    // Page order: brand on top, footer at the end; on the tablet the client sketch puts the button after the championships.
    const header = items.find(p => p.kind === 'header'), footer = items.find(p => p.kind === 'footer'), button = items.find(p => p.kind === 'button');
    if (header) {const top = items.every(p => p === header || p.y >= header.y + h(header)); list.push({ok: top, text: top ? 'Cabeçalho no topo' : 'Leve o cabeçalho para o topo da tela'});}
    if (footer) {const end = items.every(p => p === footer || p.y + h(p) <= footer.y); list.push({ok: end, text: end ? 'Rodapé no fim da página' : 'Leve o rodapé para o fim da página'});}
    if (fmt === 'tablet' && button && cards.length) {const after = cards.every(c => c.y + h(c) <= button.y); list.push({ok: after, text: after ? 'Botão depois dos campeonatos, como no rascunho' : 'Siga o rascunho: botão depois dos campeonatos'});}
  }
  if (fmt === 'desktop' && cards.length > 1) {
    const ordered = [...cards].sort((a, b) => a.x - b.x);
    const row = ordered.every(c => Math.abs(c.y - ordered[0].y) < 0.5 && c.x >= 0);
    list.push({ok: row, text: row ? 'Cartões lado a lado na mesma linha' : 'No computador, deixe os cartões na mesma linha'});
  }
  if (fmt === 'phone') {
    const hero = items.find(p => p.kind === 'hero'), button = items.find(p => p.kind === 'button');
    const first = !!hero && !!button && hero.y + h(hero) <= f.fold && button.y + h(button) <= f.fold;
    list.push({ok: first, text: first ? 'Destaque e botão na primeira tela' : 'Leve o destaque e o botão para a primeira tela'});
    const header = items.find(p => p.kind === 'header');
    if (header) {
      const menu = textWidth(header.sub ?? 'Campeonatos · Horários · Contato', 16, header.font || 'Arial, sans-serif') <= header.w * .46;
      list.push({ok: menu, text: menu ? 'Menu legível no cabeçalho' : 'Encurte o menu do cabeçalho: ele não cabe no celular'});
    }
  }
  return list;
}

const screenKeys = ['desktop', 'tablet', 'phone'];
// Accepts this oficina's project (version 3) or a projeto.grade from Aula 08, whose page becomes the computer screen.
export function readProject(data) {
  if (![1, 2, 3].includes(data?.version)) throw new Error('version');
  const color = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
  const readList = (list, key, allowEmpty = false) => {
    const f = formats[key], ids = new Set();
    if (!Array.isArray(list) || !list.length && !allowEmpty || list.length > 100) throw new Error('items');
    return list.map(p => {
      if (!p || !Object.hasOwn(kinds, p.kind) || typeof p.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(p.id) || ids.has(p.id)) throw new Error('item');
      ids.add(p.id);
      const h = p.h ?? kinds[p.kind].h[key];
      if (![p.x, p.y, p.w, h].every(Number.isFinite) || p.x < 0 || p.y < 0 || p.w < 8 || h < 8 || p.x + p.w > f.width + .5 || p.y + h > f.height + .5) throw new Error('bounds');
      const out = {id: p.id, kind: p.kind, x: p.x, y: p.y, w: p.w};
      if (p.decorative || p.h !== undefined && !['header', 'hero', 'card', 'button', 'footer'].includes(p.kind)) out.h = h;
      for (const prop of ['title', 'sub', 'info']) if (typeof p[prop] === 'string') out[prop] = p[prop].slice(0, 500);
      for (const prop of ['fill', 'color', 'accent']) if (color(p[prop])) out[prop] = p[prop];
      if (['Arial, sans-serif', 'Georgia, serif', 'Verdana, sans-serif', 'Courier New, monospace', 'Trebuchet MS, sans-serif'].includes(p.font)) out.font = p.font;
      for (const [prop, min, max] of [['scale', .5, 3], ['radius', 0, 180], ['opacity', .1, 1]]) if (Number.isFinite(p[prop])) out[prop] = Math.max(min, Math.min(max, p[prop]));
      out.decorative = !!p.decorative;
      if (['left', 'center', 'right'].includes(p.align)) out.align = p.align;
      if (Object.hasOwn(iconPaths, p.icon)) out.icon = p.icon;
      out.shape = p.shape === 'ellipse' ? 'ellipse' : 'rect'; out.fit = p.fit === 'contain' ? 'contain' : 'cover';
      if (p.kind === 'image') {
        if (typeof p.src !== 'string' || p.src.length > 5000000 || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(p.src)) throw new Error('image');
        out.src = p.src;
      }
      return out;
    });
  };
  const next = {background: {desktop: '#F4F1FA', tablet: '#F4F1FA', phone: '#F4F1FA'}};
  if (data.version === 3) {
    for (const key of screenKeys) {
      next[key] = readList(data[key], key, key !== 'desktop');
      if (color(data.background?.[key])) next.background[key] = data.background[key];
    }
  } else {
    next.desktop = readList(data.page, 'desktop');
    next.tablet = [];
    next.phone = [];
    if (color(data.background?.page)) for (const key of screenKeys) next.background[key] = data.background.page;
  }
  return next;
}

// Composite illustrations for the slides: the three screens side by side at the same scale.
export function renderTrio(screens, guides = false) {
  const gap = 48, scale = 0.5, top = 20, labelY = 36;
  let x = 24, body = '';
  for (const [fmt, parts, label] of screens) {
    // Each screen sits centered in a slot at least as wide as its label.
    const f = formats[fmt], w = f.width * scale, h = f.height * scale, slot = Math.max(w, 280), left = x + (slot - w) / 2;
    const svg = renderScreen(fmt, parts, guides).replace(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="([^"]+)" width="[^"]+" height="[^"]+"/, `<svg x="${left}" y="${top + labelY + 8}" width="${w}" height="${h}" viewBox="$1"`);
    body += `<text x="${x + slot / 2}" y="${top + labelY - 6}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1B1440">${escapeXml(label || `${f.label} · ${f.cols} colunas`)}</text><rect x="${left - 1}" y="${top + labelY + 7}" width="${w + 2}" height="${h + 2}" fill="none" stroke="#1B1440" stroke-opacity=".25"/>${svg}`;
    x += slot + gap;
  }
  const width = x - gap + 24, height = top + labelY + 8 + Math.max(...screens.map(([fmt]) => formats[fmt].height * scale)) + 24;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="A página da Arena Pixel no computador, no tablet e no celular${guides ? ', com as colunas marcadas' : ''}"><rect width="${width}" height="${height}" rx="14" fill="#FFFFFF"/>${body}</svg>`;
}

export function illustrations() {
  return {
    'tres-telas': renderTrio([['desktop', desktopStart], ['tablet', tabletExample], ['phone', phoneExample]]),
    'tres-telas-grade': renderTrio([['desktop', desktopStart], ['tablet', tabletExample], ['phone', phoneExample]], true),
    'so-encolher': renderTrio([['phone', phoneShrunk, 'Só encolhida'], ['phone', phoneExample, 'Organizada para o celular']], true).replace('A página da Arena Pixel no computador, no tablet e no celular', 'A página do computador apenas encolhida no celular, ao lado da versão organizada para o celular'),
    'tablet-exemplo': renderScreen('tablet', tabletExample, true),
    'celular-exemplo': renderScreen('phone', phoneExample, true)
  };
}

function startEditor() {
  const $ = id => document.getElementById(id);
  const copy = value => Array.isArray(value) ? value.map(copy) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, copy(item)])) : value;
  const names = {desktop: ['computador'], tablet: ['tablet', 'tablet-alternativa'], phone: ['celular', 'celular-alternativa']};
  const tips = {
    desktop: 'Computador: grade de 12 colunas. É a página da aula 08, já organizada.',
    tablet: 'Tablet: grade de 8 colunas. Arraste os componentes da biblioteca e siga o rascunho do cliente.',
    phone: 'Celular: grade de 4 colunas. Monte seguindo as regras; a linha tracejada marca o fim da primeira tela.'
  };
  let state = {desktop: copy(desktopStart), tablet: copy(tabletStart), phone: copy(phoneStart), background: {desktop: '#F4F1FA', tablet: '#F4F1FA', phone: '#F4F1FA'}}, fmt = 'tablet', selected = {desktop: 'header', tablet: null, phone: null};
  let history = [], future = [], drag = null, dirty = false, drawFrame = 0;
  let draftDB = null, draftTimer = 0, lastEdit = null;
  const board = $('board'), status = $('status');
  const announce = text => {status.textContent = text;};
  const parts = () => state[fmt];
  const current = () => parts().find(p => p.id === selected[fmt]) || parts()[0] || null;
  function snap(p) {
    const f = formats[fmt], min = kinds[p.kind].min[fmt];
    if (p.decorative || !$('snapping').checked) {p.w = Math.max(8, Math.min(f.width, p.w)); p.x = Math.max(0, Math.min(f.width - p.w, p.x)); p.y = Math.max(0, Math.min(f.height - partHeight(fmt, p), p.y)); return;}
    const s = Math.max(min, Math.min(f.cols, spanOf(f, p.w)));
    p.w = spanW(f, s);
    const c = Math.max(0, Math.min(f.cols - s, Math.round((p.x - f.margin) / (colW(f) + f.gutter))));
    p.x = colX(f, c);
    p.y = Math.max(0, Math.min(f.height - partHeight(fmt, p), Math.round(p.y / 8) * 8));
  }
  function draw() {
    const f = formats[fmt], part = current(); selected[fmt] = part ? part.id : null;
    board.style.maxWidth = `min(${f.width}px, calc((100vh - 300px) * ${f.width / f.height}))`;
    board.innerHTML = renderScreen(fmt, parts(), $('guides').checked, state.background[fmt]);
    board.querySelectorAll('[data-part]').forEach(el => el.classList.toggle('selected', !!part && el.dataset.part === part.id));
    $('choice').innerHTML = parts().length ? parts().map(p => `<option value="${p.id}">${escapeXml(p.title || kinds[p.kind].label)}</option>`).join('') : '<option value="">Tela vazia: use a biblioteca</option>';
    $('choice').value = part ? part.id : '';
    const span = part && onGrid(fmt, part) ? spanOf(f, part.w) : null;
    $('span').textContent = !part ? 'Nenhum item nesta tela' : part.decorative ? 'Movimento livre · fora da conferência' : span ? `${span} de ${f.cols} colunas` : 'fora da grade';
    $('narrow').disabled = !part || span !== null && span <= kinds[part.kind].min[fmt];
    $('wide').disabled = !part || span !== null && span >= f.cols;
    $('undo').disabled = !history.length; $('redo').disabled = !future.length; syncInspector();
    $('clearscreen').hidden = fmt === 'desktop'; $('clearscreen').disabled = !parts().length;
    drawLibrary();
    document.querySelectorAll('[data-format]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.format === fmt)));
    const keep = $('filename').value;
    $('filename').innerHTML = names[fmt].map(n => `<option value="${n}">${n}.png</option>`).join('');
    if (names[fmt].includes(keep)) $('filename').value = keep;
    $('checks').innerHTML = checks(fmt, parts(), state.desktop).map(c => `<li class="${c.ok ? 'ok' : 'todo'}"><span aria-hidden="true">${c.ok ? '✓' : '!'}</span> ${escapeXml(c.text)}</li>`).join('');
    $('gridinfo').textContent = `${f.label} · ${f.width} × ${f.height} px · ${f.cols} colunas`;
    $('save-state').textContent = dirty ? 'Alterações não exportadas' : 'Projeto pronto';
    if (dirty && !drag) saveDraft();
  }
  function remember() {history.push(copy(state)); if (history.length > 40) history.shift(); future = []; dirty = true;}
  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = name; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function thumb(p) {
    const h = partHeight('desktop', p);
    const g = renderPart('desktop', {...p, x: 0, y: 0}).replace(/ data-part="[^"]*" tabindex="0" role="button" aria-label="[^"]*"/, '');
    return `<svg viewBox="0 0 ${p.w} ${h}" aria-hidden="true" focusable="false">${g}</svg>`;
  }
  function drawLibrary() {
    const lib = $('library'), used = new Set(parts().map(p => p.id));
    if (fmt === 'desktop') {
      $('libHint').textContent = 'A tela do computador já está pronta. Ela abastece a biblioteca do tablet e do celular.';
      $('reference').innerHTML = ''; lib.innerHTML = ''; return;
    }
    const missing = state.desktop.filter(p => !p.decorative && !used.has(p.id)).length;
    $('libHint').textContent = missing ? `Arraste para a tela ou clique. ${missing === 1 ? 'Falta 1' : `Faltam ${missing}`}.` : 'Todos os componentes estão na tela.';
    $('reference').innerHTML = fmt === 'tablet'
      ? `<figure class="sketch"><figcaption>Rascunho do cliente · ordem e agrupamento, sem medidas</figcaption>${renderWireframe()}</figure>`
      : '<div class="rules"><strong>Regras do celular</strong><ol><li>Tudo empilhado nas 4 colunas.</li><li>Destaque e botão antes da linha tracejada.</li><li>Menu curto no cabeçalho.</li><li>Todos os campeonatos continuam na página.</li></ol></div>';
    lib.innerHTML = state.desktop.map(p => {
      const on = used.has(p.id), name = kinds[p.kind].label + (p.kind === 'card' || p.kind === 'text' || p.kind === 'image' ? ' · ' + (p.title || '') : '');
      return `<button type="button" class="lib-item${on ? ' is-used' : ''}${p.decorative ? ' is-extra' : ''}" data-lib="${escapeXml(p.id)}" draggable="${on ? 'false' : 'true'}"${on ? ' aria-disabled="true"' : ''} title="${escapeXml(name)}">${thumb(p)}<span>${escapeXml(name)}</span><small>${on ? '✓ na tela' : p.decorative ? 'extra' : 'colocar'}</small></button>`;
    }).join('');
  }
  function addFromLibrary(id, at) {
    const source = state.desktop.find(p => p.id === id);
    if (!source || parts().some(p => p.id === id)) return;
    if (parts().length >= 100) {announce('Limite de 100 itens por tela.'); return;}
    remember();
    const p = placeFromLibrary(fmt, copy(source), parts(), at);
    parts().push(p); snap(p); selected[fmt] = p.id; draw();
    announce(`${kinds[p.kind].label} colocado na tela. Ajuste a posição e a largura na grade de ${formats[fmt].cols} colunas.`);
  }
  $('library').addEventListener('click', e => {const item = e.target.closest('[data-lib]'); if (item && item.getAttribute('aria-disabled') !== 'true') addFromLibrary(item.dataset.lib);});
  $('library').addEventListener('dragstart', e => {const item = e.target.closest('[data-lib]'); if (!item || item.getAttribute('aria-disabled') === 'true') {e.preventDefault(); return;} e.dataTransfer.setData('text/plain', item.dataset.lib); e.dataTransfer.effectAllowed = 'copy';});
  board.addEventListener('dragover', e => {if (fmt !== 'desktop') {e.preventDefault(); e.dataTransfer.dropEffect = 'copy';}});
  board.addEventListener('drop', e => {
    e.preventDefault(); if (fmt === 'desktop') return;
    const rect = board.querySelector('svg').getBoundingClientRect(), scale = formats[fmt].width / rect.width;
    addFromLibrary(e.dataTransfer.getData('text/plain'), {x: (e.clientX - rect.left) * scale, y: (e.clientY - rect.top) * scale});
  });
  $('clearscreen').addEventListener('click', () => {
    if (!parts().length || !confirm(`Esvaziar a tela ${formats[fmt].label}? Os componentes voltam para a biblioteca. Dá para desfazer.`)) return;
    remember(); state[fmt] = []; selected[fmt] = null; draw(); announce('Tela vazia. Os componentes voltaram para a biblioteca.');
  });
  function resize(delta) {
    const f = formats[fmt], p = current(); if (!p) return;
    remember();
    const s = spanOf(f, p.w) + delta;
    p.w = spanW(f, Math.max(1, Math.min(f.cols, s)));
    snap(p); draw();
    announce(`${kinds[p.kind].label} ocupa ${spanOf(f, p.w)} colunas.`);
  }
  document.querySelectorAll('[data-format]').forEach(b => b.addEventListener('click', () => {fmt = b.dataset.format; draw(); announce(tips[fmt]);}));
  $('choice').addEventListener('change', e => {selected[fmt] = e.target.value; draw();});
  $('narrow').addEventListener('click', () => resize(-1));
  $('wide').addEventListener('click', () => resize(1));
  $('guides').addEventListener('change', draw);
  board.addEventListener('pointerdown', e => {
    const item = e.target.closest('[data-part]'); if (!item) return;
    selected[fmt] = item.dataset.part;
    const p = current(), rect = board.querySelector('svg').getBoundingClientRect();
    drag = {startX: e.clientX, startY: e.clientY, x: p.x, y: p.y, w: p.w, scale: formats[fmt].width / rect.width};
    board.setPointerCapture(e.pointerId); draw(); e.preventDefault(); board.focus({preventScroll: true});
  });
  board.addEventListener('pointermove', e => {
    if (!drag) return;
    if (!drag.moved) {if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 3) return; remember(); drag.moved = true;}
    const p = current();
    p.x = drag.x + (e.clientX - drag.startX) * drag.scale; p.y = drag.y + (e.clientY - drag.startY) * drag.scale; p.w = drag.w;
    snap(p); if (!drawFrame) drawFrame = requestAnimationFrame(() => {drawFrame = 0; draw();});
  });
  const stop = () => {if (drag) {const moved = drag.moved; drag = null; if (drawFrame) {cancelAnimationFrame(drawFrame); drawFrame = 0;} draw(); if (moved) announce(!current().decorative && $('snapping').checked ? 'Item encaixado na grade.' : 'Item posicionado livremente.');}};
  board.addEventListener('pointerup', stop);
  board.addEventListener('pointercancel', stop);
  board.addEventListener('focusin', e => {
    const item = e.target.closest('[data-part]'); if (!item) return;
    selected[fmt] = item.dataset.part;
    board.querySelectorAll('[data-part]').forEach(el => el.classList.toggle('selected', el.dataset.part === selected[fmt]));
    $('choice').value = selected[fmt]; syncInspector();
  });
  board.addEventListener('keydown', e => {
    const move = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]}[e.key];
    if (!move) return;
    const f = formats[fmt], p = current(); if (!p) return;
    e.preventDefault(); remember();
    const grid = !p.decorative && $('snapping').checked;
    p.x += move[0] * (grid ? colW(f) + f.gutter : e.shiftKey ? 10 : 1); p.y += move[1] * (grid ? e.shiftKey ? 40 : 8 : e.shiftKey ? 10 : 1);
    snap(p); draw(); board.focus({preventScroll: true});
  });
  $('undo').addEventListener('click', () => {
    if (!history.length) return;
    future.push(copy(state)); state = history.pop(); dirty = true; draw(); announce('Última alteração desfeita.');
  });
  $('save').addEventListener('click', () => {
    saveBlob(new Blob([JSON.stringify({version: 3, ...state})], {type: 'application/json'}), 'projeto-responsivo.grade');
    dirty = false; $('save-state').textContent = 'Projeto exportado'; announce('Download solicitado: projeto-responsivo.grade. Confira a pasta Downloads e guarde na pasta Aula-09.');
  });
  $('open').addEventListener('change', async e => {
    const file = e.target.files[0]; if (!file) return;
    try {
      if (file.size > 25000000) throw new Error('large');
      const data = JSON.parse(await file.text()), next = readProject(data);
      await Promise.all([...next.desktop, ...next.tablet, ...next.phone].filter(p => p.kind === 'image').map(p => new Promise((resolve, reject) => {const img = new Image(); img.onload = resolve; img.onerror = reject; img.src = p.src;})));
      if (dirty && !confirm('Há alterações desde o último salvamento. Abrir outro projeto agora?')) return;
      remember(); state = next; dirty = false; draw();
      announce(data.version === 3 ? 'Projeto reaberto. Confira as três telas.' : 'Projeto da aula 08 aberto: a sua página virou a tela do computador. Tablet e celular começam encolhidos.');
    } catch {announce('Não foi possível abrir. Escolha um projeto salvo nesta oficina ou o projeto.grade da aula 08. Seu trabalho foi preservado.');}
    finally {e.target.value = '';}
  });
  $('png').addEventListener('click', () => {
    const exportName = $('filename').value + '.png';
    const f = formats[fmt], image = new Image(), url = URL.createObjectURL(new Blob([renderScreen(fmt, parts(), false, state.background[fmt])], {type: 'image/svg+xml'}));
    image.onload = () => {
      const canvas = document.createElement('canvas'); canvas.width = f.width; canvas.height = f.height;
      canvas.getContext('2d').drawImage(image, 0, 0); URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        if (!blob) {announce('Falha ao exportar. Salve o projeto e tente novamente.'); return;}
        saveBlob(blob, exportName); announce('PNG exportado. Abra o arquivo na pasta Downloads para conferir.');
      }, 'image/png');
    };
    image.onerror = () => {URL.revokeObjectURL(url); announce('Falha ao exportar. Salve o projeto e tente novamente.');};
    image.src = url;
  });
  $('download').addEventListener('click', () => {
    // The static source is embedded at generation time, excluding any student state.
    saveBlob(new Blob([offlineSource], {type: 'text/html;charset=utf-8'}), 'oficina-aula-09.html');
    announce('Oficina baixada. Abra oficina-aula-09.html por duplo clique para trabalhar sem internet. O projeto é salvo separadamente.');
  });
  function syncInspector() {
    const p = current();
    // With an empty screen there is nothing to edit: hide the item controls until a piece is placed.
    for (const id of ['personalize', 'layers', 'duplicate']) $(id).toggleAttribute('hidden', !p);
    $('background').value = state.background[fmt];
    if (!p) return;
    const defaults = {header: 'ARENA PIXEL', button: 'Quero participar', footer: 'Empresa fictícia · exercício de grade'};
    for (const prop of ['title', 'sub', 'info', 'font', 'align', 'scale', 'fill', 'color', 'accent', 'radius', 'opacity', 'x', 'y', 'w', 'h', 'fit', 'shape', 'icon']) {
      const el = $('edit-' + prop);
      const fallback = {title: defaults[p.kind] || '', sub: p.kind === 'header' ? 'Campeonatos · Horários · Contato' : '', info: '', font: 'Arial, sans-serif', align: 'auto', scale: 1, fill: p.kind === 'card' ? '#FFFFFF' : p.kind === 'button' ? '#FF4F7B' : p.kind === 'header' ? '#1B1440' : p.kind === 'shape' ? '#6C4CF5' : '#2B1D6B', color: ['hero', 'header', 'button'].includes(p.kind) ? '#FFFFFF' : '#1B1440', accent: '#6C4CF5', radius: p.kind === 'header' ? 8 : p.kind === 'card' ? 10 : p.kind === 'button' ? partHeight(fmt, p) / 2 : 12, opacity: 1, h: partHeight(fmt, p), fit: 'cover', shape: 'rect', icon: 'star'};
      if (document.activeElement !== el) el.value = p[prop] ?? fallback[prop] ?? 0;
    }
    const textKinds = ['header', 'hero', 'card', 'button', 'footer', 'text'];
    for (const prop of ['title', 'sub', 'info', 'font', 'align', 'scale', 'fill', 'color', 'accent', 'radius']) {
      let show = true;
      if (['title', 'font', 'align', 'scale'].includes(prop)) show = textKinds.includes(p.kind);
      if (prop === 'sub') show = ['header', 'hero'].includes(p.kind);
      if (prop === 'info') show = p.kind === 'card';
      if (prop === 'fill') show = ['header', 'hero', 'card', 'button', 'shape'].includes(p.kind);
      if (prop === 'color') show = textKinds.includes(p.kind) || p.kind === 'icon';
      if (prop === 'accent') show = ['header', 'hero', 'card'].includes(p.kind);
      if (prop === 'radius') show = ['header', 'hero', 'card', 'button'].includes(p.kind) || p.kind === 'shape' && p.shape !== 'ellipse';
      $('edit-' + prop).closest('label').hidden = !show;
    }
    $('text-hint').hidden = !textKinds.includes(p.kind);
    $('edit-x').max = formats[fmt].width - p.w;
    $('edit-y').max = formats[fmt].height - partHeight(fmt, p);
    $('edit-w').max = formats[fmt].width;
    $('edit-h').max = formats[fmt].height;
    $('decorative').checked = !!p.decorative;
    $('background').value = state.background[fmt];
    $('image-options').hidden = p.kind !== 'image';
    $('icon-options').hidden = p.kind !== 'icon';
    $('shape-options').hidden = p.kind !== 'shape';
    $('remove').disabled = fmt === 'desktop' && parts().length <= 1;
  }
  function add(kind, extra = {}) {
    if (JSON.stringify(state).length + JSON.stringify(extra).length > 24000000) {announce('Limite total de 24 MB. Use imagens menores.'); return;}
    if (parts().length >= 100) {announce('Limite de 100 itens por tela.'); return;}
    remember();
    const f = formats[fmt], p = {id: 'item-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7), kind, x: f.margin, y: 160, w: Math.min(198, f.width - 2 * f.margin), ...extra};
    parts().push(p); selected[fmt] = p.id; draw(); announce('Novo elemento: ' + kinds[kind].label.toLowerCase() + '. Personalize no painel.');
  }
  document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => add(b.dataset.add, {title: b.dataset.add === 'text' ? 'Seu texto' : '', decorative: true})));
  document.querySelectorAll('[data-prop]').forEach(el => {
    el.addEventListener('blur', () => {lastEdit = null;});
    el.addEventListener(el.matches('textarea,input[type=color],input:not([type])') ? 'input' : 'change', () => {
      const p = current(); if (!p) return;
      const prop = el.dataset.prop, numeric = ['scale', 'radius', 'opacity', 'x', 'y', 'w', 'h'].includes(prop);
      const value = numeric ? Number(el.value) : el.value;
      if (numeric && (!Number.isFinite(value) || value < Number(el.min) || value > Number(el.max))) {announce('Use um valor dentro do intervalo indicado.'); syncInspector(); return;}
      if (lastEdit !== el) {remember(); lastEdit = el;} p[prop] = value;
      const f = formats[fmt]; p.w = Math.min(p.w, f.width);
      if (prop === 'h' || p.decorative) p.h = Math.min(partHeight(fmt, p), f.height);
      p.x = Math.min(p.x, f.width - p.w); p.y = Math.min(p.y, f.height - partHeight(fmt, p));
      draw(); announce('Item atualizado.');
    });
  });
  $('decorative').addEventListener('change', e => {if (!current()) return; remember(); current().decorative = e.target.checked; draw(); announce(e.target.checked ? 'Elemento livre: sem encaixe e fora da conferência.' : 'Elemento incluído na conferência. O encaixe volta no próximo movimento, se estiver ligado.');});
  $('background').addEventListener('change', e => {remember(); state.background[fmt] = e.target.value; draw();});
  $('redo').addEventListener('click', () => {if (!future.length) return; history.push(copy(state)); state = future.pop(); dirty = true; draw();});
  $('duplicate').addEventListener('click', () => {if (!current()) return; const p = copy(current()); delete p.id; delete p.kind; p.y = Math.min(formats[fmt].height - partHeight(fmt, current()), p.y + 16); add(current().kind, p);});
  $('remove').addEventListener('click', () => {const p = current(); if (!p || fmt === 'desktop' && parts().length < 2) return; remember(); state[fmt] = parts().filter(item => item.id !== p.id); selected[fmt] = state[fmt][0]?.id ?? null; draw(); announce(fmt === 'desktop' ? 'Item excluído.' : 'Item retirado da tela. Ele voltou para a biblioteca.');});
  for (const dir of ['front', 'back']) $(dir).addEventListener('click', () => {const p = current(); if (!p) return; remember(); state[fmt] = parts().filter(item => item.id !== p.id); dir === 'front' ? parts().push(p) : parts().unshift(p); draw();});
  $('upload').addEventListener('change', async e => {
    const files = Array.from(e.target.files), targetFmt = fmt;
    e.target.disabled = true; announce('Preparando imagens…');
    for (const file of files) {
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 10000000) {announce('Use PNG, JPG ou WebP com até 10 MB por imagem.'); continue;}
      try {
        const bitmap = await createImageBitmap(file), canvas = document.createElement('canvas');
        const factor = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height)); canvas.width = Math.round(bitmap.width * factor); canvas.height = Math.round(bitmap.height * factor);
        canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
        const src = canvas.toDataURL(file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png', .88);
        if (src.length > 5000000 || JSON.stringify(state).length + src.length > 24000000) throw new Error('large');
        const w = Math.min(240, formats[targetFmt].width - 2 * formats[targetFmt].margin);
        fmt = targetFmt; add('image', {title: file.name.slice(0, 120), src, w, h: Math.max(16, Math.min(400, w * canvas.height / canvas.width)), decorative: true, fit: 'contain'});
      } catch {announce('Não foi possível incluir a imagem. Tente um arquivo menor (limite total: 24 MB).');}
    }
    e.target.value = ''; e.target.disabled = false;
  });
  function showCompare(title, screens, text) {
    $('compareTitle').textContent = title;
    $('compareScreens').innerHTML = screens.map(([key, list, bg]) => `<figure><figcaption>${escapeXml(formats[key].label)} · ${formats[key].cols} colunas</figcaption>${renderScreen(key, list, false, bg)}</figure>`).join('');
    $('compareText').textContent = text;
    $('compareDialog').showModal();
  }
  $('compare').addEventListener('click', () => showCompare('Suas três telas', [['desktop', state.desktop, state.background.desktop], ['tablet', state.tablet, state.background.tablet], ['phone', state.phone, state.background.phone]], 'Mesma marca, mesmos campeonatos, mesmo botão. Muda só a organização.'));
  $('closeCompare').addEventListener('click', () => {$('compareDialog').close();});
  function saveDraft() {
    clearTimeout(draftTimer);
    if (!draftDB) return;
    draftTimer = setTimeout(() => {
      try {const tx = draftDB.transaction('drafts', 'readwrite'); tx.objectStore('drafts').put({version: 3, ...copy(state)}, 'current');
        tx.oncomplete = () => {$('draft-state').textContent = 'Rascunho protegido neste navegador';};
        tx.onerror = () => {$('draft-state').textContent = 'Salve o projeto para guardar seu trabalho';};
      } catch {$('draft-state').textContent = 'Salve o projeto para guardar seu trabalho';}
    }, 600);
  }
  try {
    const request = indexedDB.open('oficina-responsiva-v2', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('drafts');
    request.onsuccess = () => {
      draftDB = request.result;
      const get = draftDB.transaction('drafts').objectStore('drafts').get('current');
      get.onsuccess = () => {
        if (!get.result) return;
        $('restore').hidden = false;
        $('restore').onclick = () => {
          if (dirty && !confirm('Restaurar o rascunho anterior? Salve seu projeto atual antes de continuar.')) return;
          try {const next = readProject(get.result); remember(); state = next; draw(); $('restore').hidden = true; announce('Rascunho restaurado.');} catch {announce('Rascunho indisponível. Abra uma cópia do projeto.');}
        };
      };
    };
  } catch {}
  document.addEventListener('keydown', e => {
    const editing = e.target.matches('input,textarea,select');
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {e.preventDefault(); $('save').click();}
    if (!editing && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {e.preventDefault(); $(e.shiftKey ? 'redo' : 'undo').click();}
  });
  window.addEventListener('beforeunload', e => {if (dirty) {e.preventDefault(); e.returnValue = '';}});
  draw(); announce(tips[fmt]);
}

// Same interface as the Aula 08 oficina; only the header, tabs, buttons and dialog change.
export function editorHtml() {
  const source = base.editorHtml();
  const style = source.slice(source.indexOf('<style>'), source.indexOf('</style>') + 8)
    .replace('</style>', '.tabs button small{font-weight:400;opacity:.75;margin-left:6px}#compareScreens{display:flex;gap:24px;align-items:flex-start;justify-content:center;flex-wrap:wrap}#compareScreens figure{margin:0;display:flex;flex-direction:column;gap:8px}#compareScreens figcaption{font-weight:700;font-size:14px}#compareScreens svg{height:min(58vh,560px);width:auto;max-width:100%;box-shadow:0 2px 10px #251e3d24}dialog{max-width:1180px}.library{display:flex;flex-direction:column;gap:10px;padding-bottom:14px;border-bottom:1px solid var(--line)}.library-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.lib-item{display:flex;flex-direction:column;align-items:stretch;gap:4px;padding:8px;text-align:left;cursor:grab;background:#fff}.lib-item svg{display:block;width:100%;height:38px;background:#f4f1fa;border-radius:4px}.lib-item span{font-size:12px;font-weight:700;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lib-item small{font-size:11px;color:var(--accent);font-weight:600}.lib-item.is-used{opacity:.45;cursor:default;background:#f4f1fa}.lib-item.is-used small{color:#1d5c3a}.lib-item.is-extra small{color:var(--muted)}.sketch{margin:0;display:flex;flex-direction:column;gap:6px}.sketch figcaption{font-size:11px;color:var(--muted);font-weight:600}.sketch svg{width:100%;max-width:150px;height:auto;align-self:center}.rules{background:#fff4f7;border:1px solid #f1c6d3;border-radius:8px;padding:10px 12px;font-size:12px}.rules ol{margin:6px 0 0;padding-left:18px}.rules li{margin:3px 0}</style>');
  const panelStart = source.indexOf('<aside class="panel">'), panelEnd = source.indexOf('</aside>') + 8;
  const panel = source.slice(panelStart, panelEnd)
    .replace('<aside class="panel">', '<aside class="panel"><section class="library" aria-labelledby="libTitle"><h2 id="libTitle">Biblioteca</h2><p id="libHint"></p><div id="reference"></div><div id="library" class="library-grid"></div></section>')
    .replace('<button id="newcard">Incluir campeonato novo</button>', '<button id="clearscreen">Esvaziar esta tela</button>')
    .replace('<details open><summary>Personalizar item</summary>', '<details open id="personalize"><summary>Personalizar item</summary>')
    .replace('<details><summary>Posição, tamanho e camadas</summary>', '<details id="layers"><summary>Posição, tamanho e camadas</summary>')
    .replace('Salvar baixa uma cópia. Confira a pasta Downloads e guarde a versão mais recente como projeto.grade.', 'Salvar baixa uma cópia. Confira a pasta Downloads e guarde a versão mais recente como projeto-responsivo.grade.');
  const embedded = [escapeXml, colW, colX, spanW, spanOf, partHeight, onGrid, base.checks, base.renderPart, base.renderSvg, textWidth, fitLabel, base.wrapText].map(fn => fn.toString()).join('\n')
    .replace('function checks(', 'function baseChecks(').replace('function renderSvg(', 'function baseRender(');
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Oficina responsiva · Aula 09</title><link rel="icon" href="data:,">${style}</head><body><header><div><h1>Oficina responsiva</h1><p>Design Web / Aula 09 <span class="header-dot">·</span> Uma página, três telas</p></div><div class="header-actions"><label class="file open-project">Abrir projeto<input id="open" type="file" accept=".grade,application/json"></label><button id="save" class="primary">Salvar projeto</button><button id="download">Baixar oficina</button></div></header><main class="workspace"><section aria-label="Composição"><div class="tabs" role="group" aria-label="Tela"><button data-format="desktop" aria-pressed="false">Computador<small>12</small></button><button data-format="tablet" aria-pressed="true">Tablet<small>8</small></button><button data-format="phone" aria-pressed="false">Celular<small>4</small></button></div><p class="exercise-hint"><strong>Desafio</strong> · A página do computador já está pronta. Monte o tablet e o celular com os componentes da biblioteca.</p><div class="canvas-meta"><span id="save-state">Projeto pronto</span><span id="draft-state">Seus arquivos ficam neste dispositivo</span><button id="restore" hidden>Restaurar rascunho</button></div><div class="canvas-stage"><div id="board" tabindex="0" aria-label="Área de composição. Selecione um item e use as setas para mover de coluna em coluna."></div></div><div class="tools"><label>Nome da imagem <select id="filename"></select></label><button id="png">Exportar PNG</button><button id="compare">Comparar as três telas</button></div><p id="status" role="status" aria-live="polite"></p><details><summary>Como trabalhar e conferir</summary><ol><li>Crie uma pasta Aula-09 para guardar tudo de hoje.</li><li>Para usar a sua página da aula 08, clique em Abrir projeto e escolha o projeto.grade. Ela vira a tela do computador.</li><li>Escolha a aba Tablet ou Celular. A tela começa vazia: arraste os componentes da biblioteca, na lateral, ou clique neles.</li><li>No tablet, siga o rascunho do cliente; no celular, siga as regras.</li><li>Na tela, arraste os itens; as setas mudam de coluna ou sobem e descem. Mais estreito e Mais largo mudam quantas colunas o item ocupa.</li><li>No celular, a linha tracejada marca o fim da primeira tela, o que aparece antes de rolar.</li><li>O quadro Conferência mostra o que falta. Escolha o nome da imagem antes de exportar e salve o projeto.</li></ol><p>O botão “Quero participar” faz parte do estudo visual; não envia nada. Empresa e conteúdo fictícios. Os arquivos ficam no computador, sem envio a um servidor.</p></details></section>${panel}</main><dialog id="compareDialog" aria-labelledby="compareTitle"><h2 id="compareTitle"></h2><div id="compareScreens"></div><p id="compareText"></p><button id="closeCompare">Voltar ao projeto</button></dialog><script>
const iconPaths=${JSON.stringify(iconPaths)};
const formats=${JSON.stringify(formats)};
const kinds=${JSON.stringify(kinds)};
const desktopStart=${JSON.stringify(desktopStart)};
const tabletStart=${JSON.stringify(tabletStart)};
const phoneStart=${JSON.stringify(phoneStart)};
const tabletExample=${JSON.stringify(tabletExample)};
const phoneExample=${JSON.stringify(phoneExample)};
${embedded}
${renderScreen.toString()}
${shrink.toString()}
${placeFromLibrary.toString()}
${renderWireframe.toString()}
const gridKinds=${JSON.stringify(gridKinds)};
${checks.toString()}
${readProject.toString()}
const screenKeys=${JSON.stringify(screenKeys)};
const offlineSource=OFFLINE_SOURCE;
(${startEditor.toString()})();
</script></body></html>`;
  // Build the downloadable source without recursively embedding itself.
  const standalone = html.replace('const offlineSource=OFFLINE_SOURCE;', 'const offlineSource="<!doctype html>"+document.documentElement.outerHTML;');
  return html.replace('OFFLINE_SOURCE', JSON.stringify(standalone).replaceAll('</script', '<\\/script'));
}
