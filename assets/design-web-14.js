(function () {
  'use strict';
  const e = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const reveal = (label, answer) => `<details class="f14-reveal"><summary>${e(label)}</summary><p>${e(answer)}</p></details>`;
  const rows = items => items.map(([label,text])=>`<div class="f14-row"><b>${e(label)}</b><span>${e(text)}</span></div>`).join('');
  function visual(v) {
    switch(v.type) {
      case 'chat': return `<div class="f14-chat"><span>FATIA · cliente</span><blockquote>${e(v.message)}</blockquote></div><p class="f14-caption">${e(v.caption)}</p>`;
      case 'choices': return `<div class="f14-choices">${v.items.map(([label,text])=>reveal(label,text)).join('')}</div><p class="f14-note">Escolha primeiro. Abra para conferir.</p>`;
      case 'sentence': return `<div class="f14-sentence"><s>${e(v.before)}</s><div>${v.parts.map((part,i)=>i%2?`<mark>${e(part)}</mark>`:`<span>${e(part)}</span>`).join(' ')}</div><p>${e(v.example)}</p></div>`;
      case 'evidence': return `<div class="f14-evidence">${rows(v.items)}</div>${reveal(v.question,v.answer)}`;
      case 'pause': return `<div class="f14-pause"><strong>${e(v.time)}</strong><span>hora de voltar</span></div><p class="f14-caption">${e(v.caption)}</p>`;
      case 'scope': return `<div class="f14-scope">${v.items.map((x,i)=>`<span><i>${String(i+1).padStart(2,'0')}</i>${e(x)}</span>`).join('')}</div>${reveal('Compare com uma seleção possível',v.answer)}`;
      case 'wireframe': return `<figure class="f14-wire"><div class="f14-sketch"><span class="f14-sketch-title">NOME + O QUE OFERECE</span><div class="f14-sketch-blocks"><span>Informação 1</span><span>Informação 2</span><span>Informação 3</span></div><span class="f14-sketch-action">VERBO + AÇÃO →</span></div><figcaption>Estrutura para começar.<br>O conteúdo é escolha sua.</figcaption></figure>`;
      case 'timer': return `<div class="f14-timer"><div><strong>${e(v.time)}</strong><span>${e(v.caption)}</span></div><ol>${v.questions.map(q=>`<li>${e(q)}</li>`).join('')}</ol></div>`;
      case 'references': return `<div class="f14-refs"><article><span>A · CONSULTA DIRETA</span><h3>Fatia · cardápio</h3><p>Margherita R$ 32<br>Calabresa R$ 34</p><p>Ter–dom · 18h–23h<br>Retirada no balcão</p><b>Ver todos os sabores →</b></article><article class="f14-ref-b"><span>B · APARÊNCIA PRIMEIRO</span><h3>Viva uma experiência única.</h3><p>Uma história de encontros e sabores.</p><b>Descubra →</b><small>Cardápio e horário no fim da página.</small></article><article><span>C · ESCOLHA POR GRUPOS</span><h3>Qual sabor você procura?</h3><p>Tradicionais<br>Vegetarianas<br>Doces</p><b>Consultar cardápio →</b><small>Nome e preço juntos, em cada grupo.</small></article></div><p class="f14-note">Exemplos didáticos fictícios · preços ilustrativos.</p>`;
      case 'reason': return `<div class="f14-reason">${v.parts.map(([label,text],i)=>`<div><span>${e(label)}</span><p>${e(text)}</p>${i<2?'<b aria-hidden="true">↓</b>':''}</div>`).join('')}</div>`;
      case 'buttons': return `<div class="f14-buttons"><div><span>Vago</span><b class="f14-vague">${e(v.before)}</b></div><div><span>Específico</span><b class="f14-clear">${e(v.after)} →</b></div></div><p class="f14-caption">${e(v.caption)}</p><p class="f14-note">${e(v.rule)}</p>`;
      case 'brief': return `<div class="f14-brief"><span>FATIA / PLANO DA PÁGINA</span>${rows(v.items)}</div>`;
      case 'handoff': return `<div class="f14-handoff">${rows(v.items)}</div>`;
      case 'files': return `<div class="f14-files">${v.items.map(([name,text])=>`<div><span aria-hidden="true">↓</span><b>${e(name)}</b><p>${e(text)}</p></div>`).join('')}</div><p class="f14-caption">${e(v.caption)}</p>`;
      case 'exit': return `<ol class="f14-exit">${v.items.map(x=>`<li>${e(x)}</li>`).join('')}</ol><p class="f14-caption">${e(v.caption)}</p>`;
      default: return '';
    }
  }
  window.renderDesignWeb14Cover = () => `<p class="slide-kicker">Design Web · Aula 14 · 19:00—22:10</p><div class="f14-cover-title"><span class="f14-stamp">FATIA<br><small>PIZZARIA / CLIENTE FICTÍCIO</small></span><h1>Do pedido<br>ao plano.</h1></div><p class="slide-lede">Um cliente. Seis missões. Uma página que começa a fazer sentido.</p><ol class="f14-route"><li>Entender o pedido</li><li>Escolher o que cabe</li><li>Comparar e desenhar</li><li>Testar e guardar</li></ol><p class="f14-caption">Uma ficha por dupla. Um rascunho por pessoa.</p>`;
  window.renderDesignWeb14 = item => `<p class="slide-kicker">${e(item.kicker)}</p><h2>${e(item.title)}</h2><p class="slide-lede">${e(item.lede)}</p><div class="f14-visual">${visual(item.dw14)}</div><aside class="f14-task"><span>NA OFICINA</span><strong>${e(item.prompt)}</strong></aside>${item.resources?.length?`<div class="student-resource-links">${item.resources.map(r=>`<a class="student-resource-link" href="${e(r.href)}" target="_blank" rel="noopener">${e(r.label)} →</a>`).join('')}</div>`:''}`;
})();
