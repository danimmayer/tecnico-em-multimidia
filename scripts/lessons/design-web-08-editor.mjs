// Aula 08 · Oficina de grade: every function below is also embedded in the offline editor.
export const formats = {
  page: {label: 'Página', width: 960, height: 720, cols: 12, margin: 48, gutter: 24},
  post: {label: 'Post quadrado', width: 720, height: 720, cols: 6, margin: 48, gutter: 24}
};
export const kinds = {
  text: {label: 'Texto', h: {page: 80, post: 80}, min: {page: 1, post: 1}},
  shape: {label: 'Forma', h: {page: 120, post: 120}, min: {page: 1, post: 1}},
  icon: {label: 'Ícone', h: {page: 80, post: 80}, min: {page: 1, post: 1}},
  image: {label: 'Imagem', h: {page: 160, post: 160}, min: {page: 1, post: 1}},
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
export function partHeight(fmt, part) {return part.h ?? kinds[part.kind].h[fmt];}
export function onGrid(fmt, part) {
  const f = formats[fmt], s = spanOf(f, part.w), c = Math.round((part.x - f.margin) / (colW(f) + f.gutter));
  return s >= 1 && c >= 0 && c + s <= f.cols && Math.abs(spanW(f, s) - part.w) < 0.5 && Math.abs(colX(f, c) - part.x) < 0.5;
}
export function checks(fmt, parts) {
  parts = parts.filter(p => !p.decorative);
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
    if (fmt === 'page') {
      const ordered = [...cards].sort((a, b) => a.x - b.x);
      const row = ordered.every(c => Math.abs(c.y - ordered[0].y) < 0.5);
      const adjacent = ordered.every((c, i) => i === 0 || Math.abs(c.x - (ordered[i - 1].x + ordered[i - 1].w + f.gutter)) < 0.5);
      list.push({ok: row && adjacent, text: row && adjacent ? 'Cartões lado a lado, com espaços iguais' : 'Alinhe os cartões na mesma linha, em colunas vizinhas'});
      if (cards.some(c => c.id === 'chess')) {
        const finalSpans = cards.length === 4 && cards.every(c => onGrid(fmt, c) && spanOf(f, c.w) === 3);
        list.push({ok: finalSpans, text: finalSpans ? 'Quatro cartões de 3 colunas' : 'Use quatro cartões de 3 colunas cada'});
      }
    }
  }
  return list;
}
export function textWidth(text, size, font) {
  if (typeof document !== 'undefined') {
    const canvas = textWidth.canvas || (textWidth.canvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    context.font = `700 ${size}px ${font}`;
    return context.measureText(text).width;
  }
  return [...text].length * size * .58;
}
export function fitLabel(text, size, width, font) {
  let result = text.replace(/\s+/g,' '), fitted = size;
  const measured = textWidth(result,size,font);
  if (measured > width) fitted = Math.max(10,size*width/measured);
  if (textWidth(result,fitted,font) > width) {
    while (result.length && textWidth(result+'…',fitted,font) > width) result=result.slice(0,-1);
    result+='…';
  }
  return {text:result,size:Math.round(fitted*10)/10};
}
export function wrapText(text, width, size, font) {
  const lines=[];
  for (const paragraph of text.split('\n')) {
    let line='';
    for (const word of paragraph.split(/\s+/)) {
      if (line && textWidth(line+' '+word,size,font)>width) {lines.push(line);line='';}
      line+=(line?' ':'')+word;
    }
    lines.push(line);
  }
  return lines;
}

export function renderPart(fmt, p) {
  const h = partHeight(fmt, p), w = p.w;
  const t = (x, y, size, text, fill, extra = '') => {
    const centered = extra.includes('middle'), end = extra.includes('end');
    let available = Math.max(8, centered ? w - 24 : end ? w * .46 : p.kind==='header' ? w*.48-x : w - x - 16);
    if (['left','center','right'].includes(p.align)) {
      const left = p.kind === 'text' ? 4 : p.kind === 'header' ? (end ? w * .54 : 56) : p.kind === 'brand' ? 54 : p.kind === 'footer' ? 0 : 20;
      const right = p.kind === 'text' ? w - 4 : p.kind === 'header' && !end ? w * .48 : p.kind === 'hero' && w >= 640 ? w - 112 : w - 20;
      available = Math.max(8, right - left);
      x = p.align === 'center' ? (left + right) / 2 : p.align === 'right' ? right : left;
      extra = extra.replace(/ text-anchor="[^"]*"/g, '') + ` text-anchor="${p.align === 'center' ? 'middle' : p.align === 'right' ? 'end' : 'start'}"`;
    }
    const requested = Math.round(size * (p.scale || 1));
    const fitted = fitLabel(String(text ?? ''), requested, available, p.font || 'Arial, sans-serif');
    return `<text x="${x}" y="${y}" font-family="${escapeXml(p.font || 'Arial, sans-serif')}" font-size="${fitted.size}" fill="${p.color || fill}"${extra}><title>${escapeXml(text ?? '')}</title>${escapeXml(fitted.text)}</text>`;
  };
  const pixel = (x, y, s) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#FF4F7B"/><rect x="${x + s}" y="${y}" width="${s}" height="${s}" fill="#FFD23F"/><rect x="${x}" y="${y + s}" width="${s}" height="${s}" fill="#8F75FF"/><rect x="${x + s}" y="${y + s}" width="${s}" height="${s}" fill="#FF4F7B"/>`;
  let body = '';
  if (p.kind === 'header') body = `<rect width="${w}" height="${h}" rx="8" fill="#1B1440"/>${pixel(20, 20, 12)}${t(56, 41, 24, p.title ?? 'ARENA PIXEL', '#FFFFFF', ' font-weight="700"')}${t(w - 24, 39, 16, p.sub ?? 'Campeonatos · Horários · Contato', '#D9D2FF', ' text-anchor="end"')}`;
  if (p.kind === 'brand') body = `${pixel(0, 8, 20)}${t(54, 40, 28, p.title ?? 'ARENA PIXEL', '#1B1440', ' font-weight="700"')}`;
  if (p.kind === 'hero') {
    const big = w >= 640, mid = h / 2;
    body = `<rect width="${w}" height="${h}" rx="12" fill="#2B1D6B"/>${big ? `${pixel(w - 92, 28, 16)}${pixel(w - 60, h - 64, 16)}` : ''}${t(28, mid - 4, big ? 40 : 32, p.title, '#FFFFFF', ' font-weight="700"')}${t(28, mid + 34, 20, p.sub, '#FFD23F')}`;
  }
  if (p.kind === 'card') body = `<rect width="${w}" height="${h}" rx="10" fill="#FFFFFF" stroke="#D9D2F0"/><rect x="0" y="0" width="${w}" height="10" rx="4" fill="#6C4CF5"/>${t(20, 44, 12, 'CAMPEONATO', '#6C4CF5', ' font-weight="700" letter-spacing="1.5"')}${t(20, 80, 22, p.title, '#1B1440', ' font-weight="700"')}${t(20, 114, 18, p.info, '#4A4370')}`;
  if (p.kind === 'button') body = `<rect width="${w}" height="${h}" rx="${h / 2}" fill="#FF4F7B"/>${t(w / 2, 35, 18, p.title ?? 'Quero participar', '#FFFFFF', ' font-weight="700" text-anchor="middle"')}`;
  if (p.kind === 'footer') body = t(0, 18, 16, p.title ?? 'Empresa fictícia · exercício de grade', '#6B6591');
  if (p.kind === 'text') {
    const size = 28 * (p.scale || 1), lineHeight = size * 1.25;
    const lines = wrapText(p.title ?? 'Seu texto', Math.max(8,w-8), size, p.font || 'Arial, sans-serif');
    body = lines.slice(0,Math.max(1,Math.floor(h/lineHeight))).map((line,i) => t(4,size+i*lineHeight,28,line,'#1B1440',' font-weight="700"')).join('');
  }
  if (p.kind === 'shape') body = p.shape === 'ellipse' ? `<ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${p.fill || '#6C4CF5'}"/>` : `<rect width="${w}" height="${h}" rx="${p.radius ?? 12}" fill="${p.fill || '#6C4CF5'}"/>`;
  if (p.kind === 'icon') body = `<svg width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="${p.color || '#6C4CF5'}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${iconPaths[p.icon] || iconPaths.star}"/></svg>`;
  if (p.kind === 'image') body = `<svg width="${w}" height="${h}" overflow="hidden"><image href="${escapeXml(p.src || '')}" width="${w}" height="${h}" preserveAspectRatio="${p.fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'}"/></svg>`;
  if (p.fill && !['text', 'icon', 'image'].includes(p.kind)) body = body.replace(/(<rect[^>]*?fill=")[^"]+/, '$1' + p.fill);
  if (p.radius !== undefined) body = body.replace(/rx="[^"]*"/g, `rx="${p.radius}"`);
  if (p.accent) body = body.replaceAll('#6C4CF5', p.accent).replaceAll('#FFD23F', p.accent).replaceAll('#FF4F7B', p.accent);
  const name = p.title || kinds[p.kind].label;
  return `<g data-part="${escapeXml(p.id)}" tabindex="0" role="button" aria-label="Mover ${escapeXml(name)}" transform="translate(${p.x} ${p.y})"><svg width="${w}" height="${h}" overflow="hidden"><g opacity="${p.opacity ?? 1}">${body}</g></svg><rect class="hit" width="${w}" height="${h}" fill="transparent"/></g>`;
}
export function renderSvg(fmt, parts, guides = false, background = '#F4F1FA') {
  const f = formats[fmt];
  const columns = guides ? `<g pointer-events="none">${Array.from({length: f.cols}, (_, c) => `<rect x="${colX(f, c)}" y="0" width="${colW(f)}" height="${f.height}" fill="#FF4F7B" fill-opacity="0.16"/>`).join('')}<rect x="${f.margin}" y="${f.margin}" width="${f.width - 2 * f.margin}" height="${f.height - 2 * f.margin}" fill="none" stroke="#C2185B" stroke-dasharray="8 8"/></g>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f.width} ${f.height}" width="${f.width}" height="${f.height}" role="img" aria-label="${f.label} da Arena Pixel"><rect width="${f.width}" height="${f.height}" fill="${background}"/>${parts.map(p => renderPart(fmt, p)).join('')}${columns}</svg>`;
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

export const iconPaths = {
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  camera: 'M3 6h4l2-3h6l2 3h4v15H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-7Z',
  trophy: 'M8 3h8v8a4 4 0 0 1-8 0ZM8 5H3v3a5 5 0 0 0 5 5m8-8h5v3a5 5 0 0 1-5 5m-4 2v6m-4 0h8',
  game: 'M7 7h10l4 4v8h-4l-3-3h-4l-3 3H3v-8ZM8 10v4m-2-2h4m6-1h.1m2 2h.1',
  arrow: 'M3 12h18m-7-7 7 7-7 7',
  check: 'm4 12 5 5L20 6',
  mail: 'M3 5h18v14H3Zm0 0 9 8 9-8',
  music: 'M9 18V5l12-3v13M9 7l12-3M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0m12-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0'
};
export function readProject(data) {
  if (![1, 2].includes(data.version)) throw new Error('version');
  const next = {background: {page: '#F4F1FA', post: '#F4F1FA'}};
  const color = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
  for (const key of ['page', 'post']) {
    const list = data[key], f = formats[key];
    if (!Array.isArray(list) || !list.length || list.length > 100) throw new Error('items');
    const ids = new Set();
    next[key] = list.map(p => {
      if (!p || !Object.hasOwn(kinds, p.kind) || !kinds[p.kind].h[key] || typeof p.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(p.id) || ids.has(p.id)) throw new Error('item');
      ids.add(p.id);
      const h = p.h ?? kinds[p.kind].h[key];
      if (![p.x,p.y,p.w,h].every(Number.isFinite) || p.x < 0 || p.y < 0 || p.w < 8 || h < 8 || p.x + p.w > f.width + .5 || p.y + h > f.height + .5) throw new Error('bounds');
      const out = {id:p.id,kind:p.kind,x:p.x,y:p.y,w:p.w,h};
      for (const prop of ['title','sub','info']) if (typeof p[prop] === 'string') out[prop] = p[prop].slice(0,500);
      for (const prop of ['fill','color','accent']) if (color(p[prop])) out[prop] = p[prop];
      if (['Arial, sans-serif','Georgia, serif','Verdana, sans-serif','Courier New, monospace','Trebuchet MS, sans-serif'].includes(p.font)) out.font = p.font;
      for (const [prop,min,max] of [['scale',.5,3],['radius',0,180],['opacity',.1,1]]) if (Number.isFinite(p[prop])) out[prop] = Math.max(min,Math.min(max,p[prop]));
      out.decorative = !!p.decorative;
      if (['left','center','right'].includes(p.align)) out.align = p.align;
      if (Object.hasOwn(iconPaths,p.icon)) out.icon = p.icon;
      out.shape = p.shape === 'ellipse' ? 'ellipse' : 'rect'; out.fit = p.fit === 'contain' ? 'contain' : 'cover';
      if (p.kind === 'image') {
        if (typeof p.src !== 'string' || p.src.length > 5000000 || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(p.src)) throw new Error('image');
        out.src = p.src;
      }
      return out;
    });
    if (color(data.background?.[key])) next.background[key] = data.background[key];
  }
  return next;
}

function startEditor() {
  const $ = id => document.getElementById(id);
  const copy = value => Array.isArray(value) ? value.map(copy) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([key,item]) => [key,copy(item)])) : value;
  const names = {page: ['pagina-v1', 'pagina-final', 'pagina-alternativa'], post: ['post-final', 'post-alternativa']};
  let state = {page: copy(pageStart), post: copy(postStart), background: {page:'#F4F1FA',post:'#F4F1FA'}}, fmt = 'page', selected = {page: 'header', post: 'brand'};
  let history = [], future = [], drag = null, dirty = false, drawFrame = 0;
  let draftDB = null, draftTimer = 0, lastEdit = null;
  const board = $('board'), status = $('status');
  const announce = text => {status.textContent = text;};
  const parts = () => state[fmt];
  const current = () => parts().find(p => p.id === selected[fmt]) || parts()[0];
  function snap(p) {
    const f = formats[fmt], min = kinds[p.kind].min[fmt];
    if (p.decorative || !$('snapping').checked) {p.w = Math.max(8, Math.min(f.width,p.w)); p.x = Math.max(0, Math.min(f.width-p.w,p.x)); p.y = Math.max(0,Math.min(f.height-partHeight(fmt,p),p.y)); return;}
    const s = Math.max(min, Math.min(f.cols, spanOf(f, p.w)));
    p.w = spanW(f, s);
    const c = Math.max(0, Math.min(f.cols - s, Math.round((p.x - f.margin) / (colW(f) + f.gutter))));
    p.x = colX(f, c);
    p.y = Math.max(0, Math.min(f.height - partHeight(fmt, p), Math.round(p.y / 8) * 8));
  }
  function draw() {
    const f = formats[fmt], part = current(); selected[fmt] = part.id;
    board.style.maxWidth = `min(960px, calc((100vh - 190px) * ${f.width / f.height}))`;
    board.innerHTML = renderSvg(fmt, parts(), $('guides').checked, state.background[fmt]);
    board.querySelectorAll('[data-part]').forEach(el => el.classList.toggle('selected', el.dataset.part === part.id));
    $('choice').innerHTML = parts().map(p => `<option value="${p.id}">${escapeXml(p.title || kinds[p.kind].label)}</option>`).join('');
    $('choice').value = part.id;
    const span = onGrid(fmt, part) ? spanOf(f, part.w) : null;
    $('span').textContent = part.decorative ? 'Movimento livre · fora da conferência' : span ? `${span} de ${f.cols} colunas` : 'fora da grade';
    $('narrow').disabled = span !== null && span <= kinds[part.kind].min[fmt];
    $('wide').disabled = span !== null && span >= f.cols;
    $('undo').disabled = !history.length; $('redo').disabled = !future.length; syncInspector();
    $('newcard').hidden = fmt !== 'page';
    $('newcard').disabled = state.page.some(p => p.id === 'chess');
    document.querySelectorAll('[data-format]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.format === fmt)));
    const keep = $('filename').value;
    $('filename').innerHTML = names[fmt].map(n => `<option value="${n}">${n}.png</option>`).join('');
    if (names[fmt].includes(keep)) $('filename').value = keep;
    $('checks').innerHTML = checks(fmt, parts()).map(c => `<li class="${c.ok ? 'ok' : 'todo'}"><span aria-hidden="true">${c.ok ? '✓' : '!'}</span> ${escapeXml(c.text)}</li>`).join('');
    $('gridinfo').textContent = `${f.width} × ${f.height} px · ${f.cols} colunas`;
    $('save-state').textContent = dirty ? 'Alterações não exportadas' : 'Projeto pronto';
    if (dirty && !drag) saveDraft();
  }
  function remember() {history.push(copy(state)); if (history.length > 40) history.shift(); future = []; dirty = true;}
  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = name; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function resize(delta) {
    const f = formats[fmt], p = current();
    remember();
    const s = spanOf(f, p.w) + delta;
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
    board.setPointerCapture(e.pointerId); draw(); e.preventDefault(); board.focus({preventScroll: true});
  });
  board.addEventListener('pointermove', e => {
    if (!drag) return;
    if (!drag.moved) {if (Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)<3) return; remember(); drag.moved=true;}
    const p = current();
    p.x = drag.x + (e.clientX - drag.startX) * drag.scale; p.y = drag.y + (e.clientY - drag.startY) * drag.scale; p.w = drag.w;
    snap(p); if (!drawFrame) drawFrame = requestAnimationFrame(() => {drawFrame=0; draw();});
  });
  const stop = () => {if (drag) {const moved=drag.moved; drag=null; if(drawFrame){cancelAnimationFrame(drawFrame);drawFrame=0;} draw(); if(moved)announce(!current().decorative && $('snapping').checked?'Item encaixado na grade.':'Item posicionado livremente.');}};
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
    e.preventDefault(); remember();
    const f = formats[fmt], p = current();
    const onGrid = !p.decorative && $('snapping').checked;
    p.x += move[0] * (onGrid ? colW(f) + f.gutter : e.shiftKey ? 10 : 1); p.y += move[1] * (onGrid ? e.shiftKey ? 40 : 8 : e.shiftKey ? 10 : 1);
    snap(p); draw(); board.focus({preventScroll: true});
  });
  $('undo').addEventListener('click', () => {
    if (!history.length) return;
    future.push(copy(state)); state = history.pop(); dirty = true; draw(); announce('Última alteração desfeita.');
  });
  $('newcard').addEventListener('click', () => {
    if (state.page.some(p => p.id === 'chess')) return;
    if (state.page.length>=100) {announce('Limite de 100 itens. Remova um elemento antes de incluir o campeonato.');return;}
    remember(); state.page.push(copy(newCard)); selected.page = 'chess'; draw();
    announce('Campeonato novo incluído. Agora são quatro cartões: reorganize a linha.');
  });
  $('save').addEventListener('click', () => {
    saveBlob(new Blob([JSON.stringify({version: 2, ...state})], {type: 'application/json'}), 'projeto.grade');
    dirty = false; $('save-state').textContent='Projeto exportado'; announce('Download solicitado: projeto.grade. Confira a pasta Downloads e guarde na pasta Aula-08.');
  });
  $('open').addEventListener('change', async e => {
    const file = e.target.files[0]; if (!file) return;
    try {
      if (file.size > 25000000) throw new Error('large');
      const next = readProject(JSON.parse(await file.text()));
      await Promise.all([...next.page,...next.post].filter(p=>p.kind==='image').map(p=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=reject;img.src=p.src;})));
      if (dirty && !confirm('Há alterações desde o último salvamento. Abrir outro projeto agora?')) return;
      remember(); state = next; dirty = false; draw();
      announce('Projeto reaberto. Confira a página e o post nas duas abas.');
    } catch {announce('Não foi possível abrir. Escolha um arquivo projeto.grade salvo nesta oficina. Seu trabalho foi preservado.');}
    finally {e.target.value = '';}
  });
  $('png').addEventListener('click', () => {
    const exportName=$('filename').value+'.png';
    const f = formats[fmt], image = new Image(), url = URL.createObjectURL(new Blob([renderSvg(fmt, parts(), false, state.background[fmt])], {type: 'image/svg+xml'}));
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
    saveBlob(new Blob([offlineSource], {type: 'text/html;charset=utf-8'}), 'oficina-aula-08.html');
    announce('Oficina baixada. Abra oficina-aula-08.html por duplo clique para trabalhar sem internet. O projeto é salvo separadamente.');
  });
  function syncInspector() {
    const p = current();
    const defaults = {header:'ARENA PIXEL',brand:'ARENA PIXEL',button:'Quero participar',footer:'Empresa fictícia · exercício de grade'};
    for (const prop of ['title','sub','info','font','align','scale','fill','color','accent','radius','opacity','x','y','w','h','fit','shape','icon']) {
      const el = $('edit-'+prop);
      const fallback = {title:defaults[p.kind] || '',sub:p.kind==='header'?'Campeonatos · Horários · Contato':'',info:'',font:'Arial, sans-serif',align:'auto',scale:1,fill:p.kind==='card'?'#FFFFFF':p.kind==='button'?'#FF4F7B':p.kind==='header'?'#1B1440':p.kind==='shape'?'#6C4CF5':'#2B1D6B',color:['hero','header','button'].includes(p.kind)?'#FFFFFF':'#1B1440',accent:'#6C4CF5',radius:p.kind==='header'?8:p.kind==='card'?10:p.kind==='button'?partHeight(fmt,p)/2:12,opacity:1,h:partHeight(fmt,p),fit:'cover',shape:'rect',icon:'star'};
      if (document.activeElement !== el) el.value = p[prop] ?? fallback[prop] ?? 0;
    }
    const textKinds = ['header','brand','hero','card','button','footer','text'];
    for (const prop of ['title','sub','info','font','align','scale','fill','color','accent','radius']) {
      let show = true;
      if (['title','font','align','scale'].includes(prop)) show = textKinds.includes(p.kind);
      if (prop==='sub') show = ['header','hero'].includes(p.kind);
      if (prop==='info') show = p.kind==='card';
      if (prop==='fill') show = ['header','hero','card','button','shape'].includes(p.kind);
      if (prop==='color') show = textKinds.includes(p.kind) || p.kind==='icon';
      if (prop==='accent') show = ['header','brand','hero','card'].includes(p.kind);
      if (prop==='radius') show = ['header','hero','card','button'].includes(p.kind) || p.kind==='shape' && p.shape!=='ellipse';
      $('edit-'+prop).closest('label').hidden = !show;
    }
    $('text-hint').hidden = !textKinds.includes(p.kind);
    $('edit-x').max = formats[fmt].width-p.w;
    $('edit-y').max = formats[fmt].height-partHeight(fmt,p);
    $('edit-w').max = formats[fmt].width;
    $('edit-h').max = formats[fmt].height;
    $('decorative').checked = !!p.decorative;
    $('background').value = state.background[fmt];
    $('image-options').hidden = p.kind !== 'image';
    $('icon-options').hidden = p.kind !== 'icon';
    $('shape-options').hidden = p.kind !== 'shape';
    $('remove').disabled = parts().length <= 1;
  }
  function add(kind, extra = {}) {
    if (JSON.stringify(state).length + JSON.stringify(extra).length > 24000000) {announce('Limite total de 24 MB. Use imagens menores.'); return;}
    if (parts().length >= 100) {announce('Limite de 100 itens por composição.'); return;}
    remember();
    const p = {id:'item-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),kind,x:48,y:160,w:198,...extra};
    parts().push(p); selected[fmt] = p.id; draw(); announce('Novo elemento: '+kinds[kind].label.toLowerCase()+'. Personalize no painel.');
  }
  document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click',() => add(b.dataset.add, {title:b.dataset.add==='text'?'Seu texto':'',decorative:true})));
  document.querySelectorAll('[data-prop]').forEach(el => {
    el.addEventListener('blur',()=>{lastEdit=null;});
    el.addEventListener(el.matches('textarea,input[type=color],input:not([type])') ? 'input' : 'change',() => {
    const p = current(), prop = el.dataset.prop, numeric = ['scale','radius','opacity','x','y','w','h'].includes(prop);
    let value = numeric ? Number(el.value) : el.value;
    if (numeric && (!Number.isFinite(value) || value < Number(el.min) || value > Number(el.max))) {announce('Use um valor dentro do intervalo indicado.'); syncInspector(); return;}
    if (lastEdit !== el) {remember();lastEdit=el;} p[prop] = value;
    const f = formats[fmt]; p.w = Math.min(p.w,f.width); p.h = Math.min(partHeight(fmt,p),f.height); p.x = Math.min(p.x,f.width-p.w); p.y = Math.min(p.y,f.height-p.h);
    draw(); announce('Item atualizado.');
  });});
  $('decorative').addEventListener('change',e => {remember(); current().decorative = e.target.checked; draw(); announce(e.target.checked ? 'Elemento livre: sem encaixe e fora da conferência.' : 'Elemento incluído na conferência. O encaixe volta no próximo movimento, se estiver ligado.');});
  $('background').addEventListener('change',e => {remember(); state.background[fmt]=e.target.value; draw();});
  $('redo').addEventListener('click',() => {if (!future.length) return; history.push(copy(state)); state=future.pop(); dirty=true; draw();});
  $('duplicate').addEventListener('click',() => {const p=copy(current()); delete p.id; delete p.kind; p.y=Math.min(formats[fmt].height-partHeight(fmt,current()),p.y+16); add(current().kind,p);});
  $('remove').addEventListener('click',() => {if(parts().length<2)return; remember(); state[fmt]=parts().filter(p=>p.id!==current().id); selected[fmt]=state[fmt][0].id; draw();});
  for (const dir of ['front','back']) $(dir).addEventListener('click',() => {remember(); const p=current(); state[fmt]=parts().filter(item=>item.id!==p.id); dir==='front'?parts().push(p):parts().unshift(p); draw();});
  $('upload').addEventListener('change',async e => {
    const files=Array.from(e.target.files); const targetFmt=fmt;
    e.target.disabled=true; announce('Preparando imagens…');
    for (const file of files) {
      if (!['image/png','image/jpeg','image/webp'].includes(file.type) || file.size>10000000) {announce('Use PNG, JPG ou WebP com até 10 MB por imagem.'); continue;}
      try {
        const bitmap=await createImageBitmap(file), canvas=document.createElement('canvas');
        const factor=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)); canvas.width=Math.round(bitmap.width*factor);canvas.height=Math.round(bitmap.height*factor);
        canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height); bitmap.close();
        const src=canvas.toDataURL(file.type==='image/jpeg'?'image/jpeg':'image/png',.88);
        if (src.length>5000000 || JSON.stringify(state).length+src.length>24000000) throw new Error('large');
        fmt=targetFmt; add('image',{title:file.name.slice(0,120),src,w:240,h:Math.max(16,Math.min(400,240*canvas.height/canvas.width)),decorative:true,fit:'contain'});
      } catch {announce('Não foi possível incluir a imagem. Tente um arquivo menor (limite total: 24 MB).');}
    }
    e.target.value=''; e.target.disabled=false;
  });
  $('example').addEventListener('click', () => {$('exampleDialog').showModal();});
  $('closeExample').addEventListener('click', () => {$('exampleDialog').close();});
  function saveDraft() {
    clearTimeout(draftTimer);
    if (!draftDB) return;
    draftTimer=setTimeout(() => {
      try {const tx=draftDB.transaction('drafts','readwrite');tx.objectStore('drafts').put({version:2,...copy(state)},'current');
        tx.oncomplete=()=>{$('draft-state').textContent='Rascunho protegido neste navegador';};
        tx.onerror=()=>{$('draft-state').textContent='Salve o projeto para guardar seu trabalho';};
      } catch {$('draft-state').textContent='Salve o projeto para guardar seu trabalho';}
    },600);
  }
  try {
    const request=indexedDB.open('oficina-grade-v2',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('drafts');
    request.onsuccess=()=>{
      draftDB=request.result;
      const get=draftDB.transaction('drafts').objectStore('drafts').get('current');
      get.onsuccess=()=>{
        if (!get.result) return;
        $('restore').hidden=false;
        $('restore').onclick=()=>{
          if(dirty&&!confirm('Restaurar o rascunho anterior? Salve seu projeto atual antes de continuar.'))return;
          try{const next=readProject(get.result);remember();state=next;draw();$('restore').hidden=true;announce('Rascunho restaurado.');}catch{announce('Rascunho indisponível. Abra uma cópia do projeto.');}
        };
      };
    };
  } catch {}
  document.addEventListener('keydown',e=>{
    const editing=e.target.matches('input,textarea,select');
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();$('save').click();}
    if(!editing&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'){e.preventDefault();$(e.shiftKey?'redo':'undo').click();}
  });
  window.addEventListener('beforeunload' , e => {if (dirty) {e.preventDefault(); e.returnValue = '';}});
  draw();
}

export function editorHtml() {
  const embedded = [escapeXml, colW, colX, spanW, spanOf, partHeight, onGrid, checks, renderPart, renderSvg, readProject, textWidth, fitLabel, wrapText].map(fn => fn.toString()).join('\n');
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Oficina de grade · Aula 08</title><link rel="icon" href="data:,"><style>
  *{box-sizing:border-box}body{margin:0;background:#E9E6F1;color:#1B1440;font:16px/1.4 Arial,sans-serif}header{padding:18px 24px;background:#1B1440;color:white;display:flex;align-items:center;gap:24px;justify-content:space-between}h1{font-size:23px;margin:0}header p{margin:4px 0 0;font-size:15px;color:#D9D2FF}button,select,input,.file{font:inherit;border:1px solid #9C94BF;border-radius:5px;padding:9px;background:white;color:#1B1440}button,.file{cursor:pointer}button:hover,.file:hover{background:#EFEBFA}button:disabled{opacity:.45;cursor:default}:focus-visible{outline:3px solid #FF4F7B;outline-offset:3px}.workspace{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:20px;padding:20px 24px;max-width:1500px;margin:auto}.tabs{display:flex;gap:8px;margin-bottom:12px}.tabs button{font-weight:700}.tabs button[aria-pressed=true]{background:#1B1440;color:white;border-color:#1B1440}#board{line-height:0;box-shadow:0 8px 25px #1B144018;touch-action:none;max-width:960px}#board svg{width:100%;height:auto;display:block}#board [data-part]{cursor:move}#board text{pointer-events:none}#board .selected .hit{stroke:#C2185B;stroke-width:3;stroke-dasharray:6 4}.panel{display:flex;flex-direction:column;gap:12px;align-items:stretch}.panel label{display:flex;flex-direction:column;gap:5px;font-size:14px}.panel .toggle{flex-direction:row;align-items:center}.panel h2{font-size:18px;margin:0}.panel h3{font-size:15px;margin:6px 0 0}.panel p{font-size:14px;margin:0}.width{display:grid;grid-template-columns:1fr 1fr;gap:8px}.width output{grid-column:1/-1;font-weight:700;font-size:17px}#checks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}#checks li{padding:8px 10px;border-radius:5px;font-size:14px;font-weight:700}#checks .ok{background:#E3F4EA;color:#1D5C3A}#checks .todo{background:#FFE8EE;color:#9C1745}.file input{max-width:100%;font-size:13px}.tools{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}.tools label{display:flex;align-items:center;gap:8px}#status{min-height:46px;margin:12px 0;font-size:16px;font-weight:600}details{padding:12px 0;border-top:1px solid #C9C2DE}summary{cursor:pointer;font-weight:600}li{margin:6px 0}dialog{max-width:900px;width:92vw;border:0;border-radius:8px;padding:24px}dialog::backdrop{background:#1B1440b3}dialog svg{width:100%;height:auto;max-height:62vh}dialog h2{margin:0 0 12px}dialog p{margin:10px 0}#download{white-space:nowrap}@media(max-width:860px){header{align-items:flex-start;flex-wrap:wrap}.workspace{grid-template-columns:1fr;padding:12px}}
  .panel{background:#fff;border:1px solid #d7d0e6;padding:18px;border-radius:12px;max-height:calc(100vh - 130px);overflow:auto}.panel details{padding:12px 0}.panel details>label,.panel details>.control-grid{margin-top:10px}.control-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.control-grid>*{min-width:0}.panel input,.panel select,.panel textarea{width:100%;min-width:0}.panel input[type=checkbox]{width:auto}.panel input[type=color]{height:40px;padding:4px}.panel textarea{font:inherit;border:1px solid #9c94bf;border-radius:5px;padding:8px;resize:vertical}.workspace>section{min-width:0}.panel [hidden]{display:none} @media(max-width:860px){.panel{max-height:none}}

  .exercise-hint{font-size:12px;color:#756f82;margin:0 0 14px}.exercise-hint strong{color:#514367;font-weight:600}
  :root{--ink:#251e3d;--muted:#756f82;--line:#e4e0ea;--accent:#6141ce}body{background:#f3f1f6;color:var(--ink);font-family:Arial,sans-serif}header{background:#fff;color:var(--ink);padding:18px 28px;border-bottom:1px solid var(--line);gap:16px}header h1{font-size:21px;letter-spacing:-.6px}header p{font-size:12px;color:var(--muted);margin-top:5px}.header-dot{padding:0 7px}.header-actions{display:flex;gap:8px;align-items:center}.header-actions button,.header-actions .file{font-size:13px;font-weight:600;white-space:nowrap}button,select,input,.file{border-color:#d7d1e1;border-radius:7px}button{transition:background .15s,color .15s}button.primary{background:var(--accent);border-color:var(--accent);color:#fff}button.primary:hover{background:#4d30ad}.workspace{max-width:1680px;gap:24px;padding:24px 28px}.tabs{margin-bottom:14px}.tabs button{font-size:13px;padding:9px 18px}.tabs button[aria-pressed=true]{background:#29213d;border-color:#29213d}.canvas-meta{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:10px}.canvas-meta #save-state{color:#514367;font-weight:600}.canvas-stage{min-height:300px;display:flex;align-items:flex-start;justify-content:center;padding:24px;background:#e7e3ec;border:1px solid #ded8e6;border-radius:10px;overflow:hidden}#board{width:100%;box-shadow:0 4px 18px #251e3d14}.panel{max-height:calc(100vh - 132px);position:sticky;top:24px;scrollbar-width:thin;scrollbar-color:#c9c1d6 transparent;border-color:var(--line);gap:12px;padding:20px;border-radius:10px;overscroll-behavior:contain}.panel h2{font-size:17px;letter-spacing:-.3px}.panel #gridinfo{font-size:12px;color:var(--muted)}.panel label{font-size:12px;font-weight:600;color:#554d65;gap:6px}.panel p{font-size:11px;line-height:1.55;color:var(--muted);margin-top:8px}.panel select,.panel input,.panel textarea{font-size:13px;padding:8px}.panel summary{font-size:13px;color:var(--ink)}.panel details{border-color:var(--line)}.panel button{font-size:12px;font-weight:600;min-height:36px}.width output{font-size:13px;color:var(--muted);font-weight:400}.file{position:relative;display:flex;align-items:center;justify-content:center}.file input[type=file]{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}.file:focus-within{outline:3px solid #a991eb;outline-offset:2px}.image-upload{border:1px dashed #b2a3cb;background:#f8f6fc;padding:14px}.tools{align-items:center;gap:8px}.tools button,.tools label,.tools select{font-size:12px}.tools label{color:var(--muted)}#png{background:#29213d;color:white;border-color:#29213d}#status{font-size:13px;line-height:1.5;font-weight:400;color:#635b72;min-height:24px}.panel .toggle{font-weight:400;font-size:12px}.panel input[type=checkbox]{accent-color:var(--accent)}#checks{margin-top:10px}#checks li{font-size:12px;font-weight:400}.workspace>section>details{font-size:13px;color:#665e74}#remove{color:#a52e45;border-color:#e8c5cd;margin-top:12px;width:100%}#restore{font-size:11px;padding:5px 8px}[hidden]{display:none!important}button:focus-visible,select:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid #a991eb;outline-offset:2px}
  @media(max-width:1000px){.workspace{gap:16px;padding:18px;grid-template-columns:minmax(0,1fr) 290px}.canvas-stage{padding:12px}}
  @media(max-width:860px){header{padding:16px;gap:12px}.header-actions{flex-wrap:wrap}.workspace{grid-template-columns:1fr;padding:14px}.panel{position:static;max-height:none}.canvas-stage{min-height:0}.tools{gap:8px}.tools label{flex-wrap:wrap}.canvas-meta{font-size:10px}#download{white-space:normal}}
  @media(prefers-reduced-motion:reduce){button{transition:none}}
  </style></head><body><header><div><h1>Oficina de grade</h1><p>Design Web / Aula 08 <span class="header-dot">·</span> Estúdio de composição</p></div><div class="header-actions"><label class="file open-project">Abrir projeto<input id="open" type="file" accept=".grade,application/json"></label><button id="save" class="primary">Salvar projeto</button><button id="download">Baixar oficina</button></div></header><main class="workspace"><section aria-label="Composição"><div class="tabs" role="group" aria-label="Formato"><button data-format="page" aria-pressed="true">Página</button><button data-format="post" aria-pressed="false">Post quadrado</button></div><p class="exercise-hint"><strong>Desafio inicial</strong> · Organize os blocos na grade. Depois, personalize a composição.</p><div class="canvas-meta"><span id="save-state">Projeto pronto</span><span id="draft-state">Seus arquivos ficam neste dispositivo</span><button id="restore" hidden>Restaurar rascunho</button></div><div class="canvas-stage"><div id="board" tabindex="0" aria-label="Área de composição. Selecione um item e use as setas para mover de coluna em coluna."></div></div><div class="tools"><label>Nome da imagem <select id="filename"></select></label><button id="png">Exportar PNG</button><button id="example">Ver exemplo da página</button></div><p id="status" role="status" aria-live="polite">Arraste um item: ele gruda na coluna mais próxima.</p><details><summary>Como trabalhar e conferir</summary><ol><li>Crie uma pasta Aula-08 para guardar tudo de hoje.</li><li>Selecione um item na página ou na lista. Arraste com o mouse; as setas mudam de coluna ou sobem e descem.</li><li>Use Mais estreito e Mais largo para escolher quantas colunas o item ocupa.</li><li>O quadro Conferência mostra o que ainda falta: grade, margens, sobreposição e cartões iguais na mesma linha.</li><li>Quando a aula pedir, clique em Incluir campeonato novo. Depois monte o post na aba Post quadrado.</li><li>Escolha o nome da imagem antes de exportar. Salve também projeto.grade e teste a reabertura.</li></ol><p>O botão “Quero participar” faz parte do estudo visual; não envia nada. Empresa e conteúdo fictícios. Os arquivos ficam no computador, sem envio a um servidor.</p></details></section><aside class="panel"><h2>Composição</h2><p id="gridinfo"></p><label>Item selecionado<select id="choice"></select></label><div class="width"><output id="span" aria-live="polite"></output><button id="narrow">− Mais estreito</button><button id="wide">+ Mais largo</button></div><label class="toggle"><input id="guides" type="checkbox" checked> Mostrar colunas</label><label class="toggle"><input id="snapping" type="checkbox" checked> Encaixar na grade ao arrastar</label><div class="control-grid"><button id="undo">Desfazer</button><button id="redo">Refazer</button></div><details open class="add-section"><summary>Adicionar elementos</summary><div class="control-grid"><button data-add="text">+ Texto</button><button data-add="shape">+ Forma</button><button data-add="icon">+ Ícone</button><button id="duplicate">Duplicar item</button></div><label class="file image-upload">+ Carregar imagens<input id="upload" type="file" accept="image/png,image/jpeg,image/webp" multiple></label><p>PNG, JPG ou WebP · até 10 MB cada. As imagens acompanham o projeto salvo.</p></details>
<details open><summary>Personalizar item</summary><label>Texto principal<textarea id="edit-title" data-prop="title" maxlength="500" rows="2"></textarea></label><label>Subtítulo<input id="edit-sub" data-prop="sub" maxlength="500"></label><label>Informação do cartão<input id="edit-info" data-prop="info" maxlength="500"></label><label>Alinhamento do texto<select id="edit-align" data-prop="align"><option value="auto">Original do componente</option><option value="left">À esquerda</option><option value="center">Centralizado</option><option value="right">À direita</option></select></label><label>Fonte<select id="edit-font" data-prop="font"><option>Arial, sans-serif</option><option>Georgia, serif</option><option>Verdana, sans-serif</option><option>Courier New, monospace</option><option>Trebuchet MS, sans-serif</option></select></label><div class="control-grid"><label>Escala do texto<input id="edit-scale" data-prop="scale" type="number" min="0.5" max="3" step="0.1"></label><label>Cantos (px)<input id="edit-radius" data-prop="radius" type="number" min="0" max="180"></label><label>Fundo do item<input id="edit-fill" data-prop="fill" type="color"></label><label>Texto / ícone<input id="edit-color" data-prop="color" type="color"></label><label>Destaques<input id="edit-accent" data-prop="accent" type="color"></label><label>Opacidade<input id="edit-opacity" data-prop="opacity" type="number" min="0.1" max="1" step="0.1"></label></div><label id="icon-options">Ícone<select id="edit-icon" data-prop="icon"><option value="star">Estrela</option><option value="heart">Coração</option><option value="camera">Câmera</option><option value="bolt">Raio</option><option value="trophy">Troféu</option><option value="game">Controle</option><option value="arrow">Seta</option><option value="check">Check</option><option value="mail">Envelope</option><option value="music">Música</option></select></label><label id="shape-options">Forma<select id="edit-shape" data-prop="shape"><option value="rect">Retângulo</option><option value="ellipse">Elipse / círculo</option></select></label><label id="image-options">Enquadramento<select id="edit-fit" data-prop="fit"><option value="contain">Mostrar imagem inteira</option><option value="cover">Preencher e recortar</option></select></label><p id="text-hint">Os blocos ajustam o texto ao espaço disponível. Em textos livres, aumente a altura para mostrar mais linhas.</p></details>
<details><summary>Posição, tamanho e camadas</summary><div class="control-grid"><label>X<input id="edit-x" data-prop="x" type="number" min="0" max="960" step="1"></label><label>Y<input id="edit-y" data-prop="y" type="number" min="0" max="720" step="1"></label><label>Largura<input id="edit-w" data-prop="w" type="number" min="8" max="960" step="1"></label><label>Altura<input id="edit-h" data-prop="h" type="number" min="8" max="720" step="1"></label><button id="front">Trazer à frente</button><button id="back">Enviar ao fundo</button></div><label class="toggle"><input id="decorative" type="checkbox">Elemento decorativo</label><p>Elementos decorativos se movem livremente, mesmo com o encaixe ligado, e ficam fora da conferência. Setas movem 1 px; Shift + seta move 10 px. Podem se sobrepor dentro da prancheta.</p><button id="remove">Excluir item</button></details><label>Cor da prancheta<input id="background" type="color"></label><button id="newcard">Incluir campeonato novo</button><details><summary>Conferência do exercício</summary><p>Organize os blocos da atividade na grade. Os elementos decorativos ficam fora desta conferência.</p><ul id="checks"></ul></details><p>Salvar baixa uma cópia. Confira a pasta Downloads e guarde a versão mais recente como projeto.grade.</p></aside></main><dialog id="exampleDialog"><h2>Uma organização possível</h2>${renderSvg('page', pageExample, true)}<p>Mesmos textos, cores e letras. Cada item começa e termina numa coluna, e os três cartões têm a mesma largura. A sua página pode ter outra organização que passe na conferência.</p><button id="closeExample">Voltar ao projeto</button></dialog><script>
const iconPaths=${JSON.stringify(iconPaths)};
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
