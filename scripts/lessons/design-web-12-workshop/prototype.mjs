// Shared by the editor preview and the exported standalone prototype.
export function escapeHTML(value='') {return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function mountPrototype(host,design,onFinish=()=>{}) {
  let screen='home',slot='',clicks=0,started=Date.now(),finished=false;
  const e=escapeHTML;
  function draw(focus=false) {
    host.dataset.theme=design.theme;
    const price=design.price?'<p class="cost">R$ 40 <small>/ 30 minutos</small></p>':'';
    let body='';
    if(screen==='home') body=`<span class="badge">Estúdio para ensaio</span><h2>Seu som merece espaço.</h2><p>Uma sala equipada para ensaiar e gravar ideias.</p>${price}<button class="primary" data-go="${design.direct?'choose':'gate'}">${e(design.cta)}</button>`;
    if(screen==='gate') body='<h2>Vamos começar?</h2><p>Continue para conhecer as opções.</p><button data-go="choose">Continuar</button>';
    if(screen==='choose') body=`<h2>Escolha seu horário</h2><p>Sábado · sessão de 30 minutos.</p>${price}<div class="row"><button data-slot="14:00" aria-pressed="${slot==='14:00'}">14h${design.soldOut?' · indisponível':''}</button><button data-slot="15:00" aria-pressed="${slot==='15:00'}">15h</button></div><p id="slot-message" role="status">${slot?'Escolhido: '+slot:'Escolha um horário para continuar.'}</p><button class="primary" data-go="review" ${!slot?'disabled':''}>${design.summary?'Revisar reserva':'Continuar'}</button> <button data-go="home">Voltar</button>`;
    if(screen==='unavailable') body='<h2>14h está indisponível</h2><p>Há uma sessão às 15h, com o mesmo valor e duração. Nenhuma reserva foi enviada.</p><button data-go="choose">Escolher outro horário</button>';
    if(screen==='review') body=`<h2>${design.summary?'Confira antes de reservar':'Confirme para continuar'}</h2>${design.summary?`<p>Sábado · ${e(slot)} · 30 minutos</p><p class="cost">R$ 40</p>`:'<p>Seu pedido está pronto.</p><p class="cost">R$ 40</p>'}<p>Atividade simulada. Nenhuma reserva real será enviada.</p><button class="primary" data-go="done">${design.summary?'Confirmar reserva':'Confirmar'}</button> <button data-go="choose">Corrigir horário</button> <button data-go="cancelled">Cancelar</button>`;
    if(screen==='done') body=`<div class="result"><strong>Reserva simulada confirmada</strong><p>Sábado · ${e(slot)} · 30 minutos · R$ 40.</p></div><p>Guarde o horário escolhido. Não houve pagamento ou envio de dados.</p><button data-restart>Fazer outro teste</button>`;
    if(screen==='cancelled') body='<h2>Reserva cancelada</h2><p>Nenhuma reserva foi enviada.</p><button data-restart>Voltar ao início</button>';
    host.innerHTML=`<div class="proto-head"><strong>${e(design.name)}</strong><small>Simulação</small></div><div class="proto-body">${body}</div><div class="metrics">${clicks} ações nesta tentativa · a contagem ajuda a comparar caminhos, não dá nota.</div>`;
    host.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{clicks++;screen=b.dataset.go;draw(true);if(['done','cancelled'].includes(screen)&&!finished){finished=true;onFinish({clicks,slot,outcome:screen==='done'?'confirmed':'cancelled',seconds:Math.min(86400,Math.round((Date.now()-started)/1000))});}}));
    host.querySelectorAll('[data-slot]').forEach(b=>b.addEventListener('click',()=>{clicks++;if(design.soldOut&&b.dataset.slot==='14:00'){screen='unavailable';slot='';}else slot=b.dataset.slot;draw();host.querySelector('[data-go="review"]')?.focus();}));
    host.querySelector('[data-restart]')?.addEventListener('click',()=>{screen='home';slot='';clicks=0;started=Date.now();finished=false;draw();host.querySelector('button')?.focus();});
    // After a navigation action, expose the new heading to keyboard and screen-reader users.
    const heading=host.querySelector('h2,.result');if(heading&&focus){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  }
  draw();
}
