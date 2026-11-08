(function(){
  'use strict';
  const e=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const list=items=>`<ol class="w15-route">${items.map(x=>`<li>${e(x)}</li>`).join('')}</ol>`;
  const map=()=>`<div class="w15-root">Café Aurora · uma página</div><div class="w15-branches"><div><b>Cardápio</b><span>Cappuccino<br>Pão de queijo<br>Bolo de cenoura</span></div><div><b>Horários e local</b><span>Horário habitual<br>Horário no feriado<br>Endereço</span></div><div><b>Como retirar</b><span>Retirada no balcão<br>Pagamento no balcão</span></div></div>`;
  function visual(v){switch(v.type){
    case 'menu':return `<div class="w15-menu">${v.items.map(x=>`<span>${e(x)}</span>`).join('')}</div><p class="w15-caption">${e(v.caption)}</p>`;
    case 'compare':return `<div class="w15-compare"><div>${list(v.left)}</div><div>${list(v.right)}</div></div><p class="w15-caption">${e(v.caption)}</p>`;
    case 'brief':return `<dl class="w15-facts">${v.items.map(([a,b])=>`<div><dt>${e(a)}</dt><dd>${e(b)}</dd></div>`).join('')}</dl>`;
    case 'sort':return `<div class="w15-sort">${v.groups.map(([name,...items])=>`<div><b>${e(name)}</b>${items.map(x=>`<span>${e(x)}</span>`).join('')}</div>`).join('')}</div><p class="w15-caption">${e(v.caption)}</p>`;
    case 'scope':return `<div class="w15-later"><b>Fica para depois</b>${v.items.map(x=>`<span>${e(x)}</span>`).join('')}</div><p class="w15-caption">${e(v.caption)}</p>`;
    case 'pause':return `<div class="w15-pause">${e(v.time)}<span>hora de voltar</span></div>`;
    case 'questions':return `<ul class="w15-questions">${v.items.map(x=>`<li>${e(x)}</li>`).join('')}</ul>`;
    case 'labels':return `<div class="w15-labels">${v.pairs.map(([a,b])=>`<div><s>${e(a)}</s><span aria-hidden="true">→</span><b>${e(b)}</b></div>`).join('')}</div>`;
    case 'map':return map()+`<p class="w15-caption">${e(v.caption)}</p>`;
    case 'route':return list(v.items)+`<p class="w15-caption">${e(v.caption)}</p>`;
    case 'roles':return `<dl class="w15-facts">${v.items.map(([a,b])=>`<div><dt>${e(a)}</dt><dd>${e(b)}</dd></div>`).join('')}</dl>`;
    case 'festival':return `<div class="w15-festival"><article><span>Antes de sair</span><h3>Uma hora para viver o festival.</h3><ul><li>Quando acontece</li><li>O que cabe no meu tempo</li><li>Como chegar</li></ul><b>Ver a programação</b></article><article><span>Já estou chegando</span><h3>Chegou? Encontre a entrada.</h3><ul><li>Acesso pela lateral</li><li>Proteção da chuva</li><li>Onde pedir ajuda</li></ul><b>Encontrar o acesso</b></article></div><p class="w15-caption">${e(v.caption||'O mesmo conteúdo. Prioridades diferentes para cada situação.')}</p>`;
    case 'check':return `<ul class="w15-questions">${v.items.map(x=>`<li>${e(x)}</li>`).join('')}</ul>`;
    case 'exit':return map()+`<p class="w15-caption">${e(v.caption)}</p>`;
    default:return '';
  }}
  window.renderDesignWeb15Cover=()=>`<p class="slide-kicker">Design Web · Aula 15 · Arquitetura da informação</p><h1>Onde eu<br>encontro isso?</h1><div class="w15-cover-menu"><span>Cardápio</span><span>Horários e local</span><span>Como retirar</span></div><p class="slide-lede">Organize os conteúdos. Dê nomes claros.<br>Deixe outra pessoa testar os caminhos.</p><p class="w15-caption">Seis missões na própria oficina. Sem documentos extras.</p>`;
  window.renderDesignWeb15=item=>`<h2>${e(item.title)}</h2><p class="slide-lede">${e(item.lede)}</p><div class="w15-visual">${visual(item.dw15||{})}</div><aside class="w15-task"><span>Na oficina</span><strong>${e(item.prompt)}</strong></aside>${item.resources?.length?`<div class="student-resource-links">${item.resources.map(r=>`<a class="student-resource-link" href="${e(r.href)}" target="_blank" rel="noopener">${e(r.label)}</a>`).join('')}</div>`:''}`;
})();
