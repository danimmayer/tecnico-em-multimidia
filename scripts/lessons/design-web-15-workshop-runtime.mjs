export function workshopRuntime() {
  'use strict';
  const $=id=>document.getElementById(id);
  const e=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const key='senai-dw15-arquitetura-v1';
  const challenge=window.SENAI_DW15_CHALLENGE;
  const studio=window.SENAI_DW15_STUDIO;
  const cards=[
    {id:'cappuccino',name:'Cappuccino',text:'Xícara de 180 ml · R$ 12.',useful:true},
    {id:'pao',name:'Pão de queijo',text:'Unidade de 70 g · R$ 6.',useful:true},
    {id:'bolo',name:'Bolo de cenoura',text:'Fatia de 100 g · R$ 9.',useful:true},
    {id:'horario',name:'Horário habitual',text:'De terça a domingo, das 14h às 20h. No feriado, há horário especial.',useful:true},
    {id:'local',name:'Endereço do café',text:'Rua das Andorinhas, 85, Vila do Sol. Endereço fictício.',useful:true},
    {id:'retirada',name:'Retirada no balcão',text:'Escolha e pague no balcão. Preparamos para consumir ou levar. Sem delivery.',useful:true},
    {id:'conta',name:'Criar conta de usuário',text:'Pedido para uma versão futura; fora do combinado desta página.',useful:false},
    {id:'delivery',name:'Delivery',text:'O café não oferece entrega. Não prometa esse serviço.',useful:false},
    {id:'video',name:'Vídeo automático na abertura',text:'Não é necessário para a consulta rápida no celular.',useful:false},
    {id:'feriado',name:'Horário no feriado',text:'No feriado de aniversário da cidade, das 16h às 19h. Nos demais dias, vale o horário habitual.',useful:true,extra:true},
    {id:'pagamento',name:'Pagamento no balcão',text:'Dinheiro, cartão ou Pix na hora da compra. A página não recebe pagamentos.',useful:true,extra:true}
  ];
  const tasks=[{id:'preco',label:'Quanto custa o cappuccino de 180 ml?',target:'cappuccino'}, {id:'hora',label:'Até que horas funciona em um dia habitual?',target:'horario'}, {id:'onde',label:'Aonde preciso ir para visitar o café?',target:'local'}, {id:'retirar',label:'Posso receber em casa ou preciso ir ao balcão?',target:'retirada'}, {id:'feriado',label:'Às 19h30 no feriado, ainda estará aberto?',target:'feriado',extra:true}];
  const names=['Encontre','Agrupe','Nomeie','Crie duas telas','Teste o café','Entrega e estúdio'];
  const initial=()=>({format:'senai-dw15',version:1,step:0,revision:0,groups:[{id:'a',name:'Descubra'},{id:'b',name:'Nosso universo'},{id:'c',name:'Mais'}],order:['a','b','c'],places:Object.fromEntries(cards.map(c=>[c.id,''])),hunt:{bad:null,clear:null},tests:[],observation:'',improvement:'',decision:'',newRequest:false,baseline:null,lab:challenge.initial(),studio:studio.initial()});
  let state=initial(),previous=null,visitor=false,active=null,previewPlace='',previewCard='',huntMode='bad',huntNode='',huntPath=[],huntClicks=0,storageOk=true;
  function validate(p){
    const string=(v,max)=>typeof v==='string'&&v.length<=max;
    if(p?.format==='senai-dw15'&&p.version===1){p={...p,places:{feriado:'',pagamento:'',...p.places},decision:p.decision??'',newRequest:p.newRequest??false,lab:p.lab??challenge.initial(),studio:p.studio??studio.initial()};}
    if(!p||p.format!=='senai-dw15'||p.version!==1||!Number.isInteger(p.step)||p.step<0||p.step>5||!Number.isInteger(p.revision)||p.revision<0||p.revision>100000)throw Error('invalid');
    if(!Array.isArray(p.groups)||p.groups.length!==3||p.groups.some((g,i)=>g.id!==['a','b','c'][i]||!string(g.name,32)))throw Error('groups');
    if(!Array.isArray(p.order)||p.order.length!==3||[...p.order].sort().join('')!=='abc')throw Error('order');
    if(!p.places||cards.some(c=>!['','a','b','c','later'].includes(p.places[c.id])))throw Error('places');
    if(!p.hunt||['bad','clear'].some(k=>p.hunt[k]!==null&&(!Number.isInteger(p.hunt[k].clicks)||p.hunt[k].clicks<1||p.hunt[k].clicks>1000||!string(p.hunt[k].path,4000))))throw Error('hunt');
    if(!string(p.observation,600)||!string(p.improvement,600)||(p.baseline!==null&&(!Number.isInteger(p.baseline)||p.baseline<0||p.baseline>p.revision)))throw Error('notes');
    if(!['','adjust','keep'].includes(p.decision)||typeof p.newRequest!=='boolean')throw Error('review');
    if(!Array.isArray(p.tests)||p.tests.length>100||p.tests.some(t=>!tasks.some(task=>task.id===t.task)||!Number.isInteger(t.revision)||t.revision<0||t.revision>p.revision||!Number.isInteger(t.clicks)||t.clicks<0||t.clicks>1000||typeof t.success!=='boolean'||typeof t.visitor!=='boolean'||!string(t.path,4000)))throw Error('tests');
    p.lab=challenge.validate(p.lab);
    p.studio=studio.validate(p.studio);
    return JSON.parse(JSON.stringify(p));
  }
  function status(text){$('action-status').textContent=state.step===4?'':text;$('test-feedback').textContent=state.step===4?text:'';}
  function persist(){
    try{localStorage.setItem(key,JSON.stringify(state));storageOk=true;$('save-status').textContent='Rascunho salvo neste navegador. Não é enviado nem sincronizado entre aparelhos.';}
    catch{storageOk=false;$('save-status').textContent='Este navegador não conseguiu guardar o rascunho. Mantenha a aba aberta; use Meu trabalho para baixar uma cópia antes de sair.';}
    $('save-status').classList.toggle('warning',!storageOk);
  }
  function group(id){return state.groups.find(g=>g.id===id);}
  function groupName(id){return group(id)?.name.trim()||'Grupo sem nome';}
  const currentCards=()=>cards.filter(c=>!c.extra||state.newRequest);
  const currentTasks=()=>tasks.filter(t=>!t.extra||state.newRequest);
  function items(id){return currentCards().filter(c=>state.places[c.id]===id);}
  function sortIssues(){
    const issues=[];
    const pending=currentCards().filter(c=>!state.places[c.id]);
    if(pending.length)issues.push('Escolha um destino para: '+pending.map(c=>c.name).join(', ')+'.');
    const wrong=currentCards().filter(c=>c.useful?state.places[c.id]==='later':state.places[c.id]&&state.places[c.id]!=='later');
    if(wrong.length)issues.push('Reveja o combinado para: '+wrong.map(c=>c.name).join(', ')+'. Os conteúdos de consulta entram; conta, delivery e vídeo ficam para depois.');
    for(const id of state.order)if(!items(id).some(c=>c.useful))issues.push('O grupo “'+groupName(id)+'” precisa de conteúdo útil.');
    return issues;
  }
  function labelIssues(){
    const issues=[],normalized=state.groups.map(g=>g.name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase());
    if(normalized.some(n=>n.length<3))issues.push('Dê a cada grupo um nome com pelo menos três letras.');
    if(new Set(normalized).size!==3)issues.push('Use três nomes diferentes.');
    if(normalized.some(n=>['descubra','nosso universo','mais','outros','explore','grupo'].includes(n)))issues.push('Troque os nomes vagos por nomes que antecipem o conteúdo.');
    return issues;
  }
  function showIssues(id,issues,success){$(id).textContent=issues.length?issues.join(' '):success;}
  function snapshot(){return {groups:structuredClone(state.groups),order:[...state.order],places:{...state.places},newRequest:state.newRequest};}
  function endAttempt(success=false){
    if(!active)return;
    state.tests.push({task:active.task,revision:active.revision,clicks:active.clicks,path:active.path.join(' → ').slice(0,4000),success,visitor:active.visitor});
    state.tests=state.tests.slice(-100);active=null;persist();
  }
  function changed(mutator){
    previous=snapshot();endAttempt(false);mutator();state.revision++;previewPlace='';previewCard='';$('undo').disabled=false;persist();renderDerived();
    $('sort-feedback').textContent='';$('label-feedback').textContent='';$('final-feedback').textContent='';
  }
  function renderSort(){
    $('sort').innerHTML=currentCards().map(c=>`<article class="ticket"><div><strong>${e(c.name)}${c.extra?' · novo':''}</strong><p>${e(c.text)}</p></div><label for="place-${c.id}">Colocar em<select id="place-${c.id}" data-card="${c.id}"><option value="">Escolha um destino</option>${state.order.map(id=>`<option value="${id}" ${state.places[c.id]===id?'selected':''}>${e(groupName(id))}</option>`).join('')}<option value="later" ${state.places[c.id]==='later'?'selected':''}>Fica para depois</option></select></label></article>`).join('');
  }
  function renderLabels(){
    $('labels').innerHTML=state.order.map((id,i)=>`<div class="label-row"><div><label for="name-${id}">Nome da seção ${i+1}</label><input id="name-${id}" data-group="${id}" maxlength="32" value="${e(group(id).name)}"><small>${items(id).map(c=>e(c.name)).join(' · ')||'Sem cartões. Volte à missão 2 para distribuir.'}</small></div><div class="reorder"><button data-move="${id}" data-delta="-1" ${i===0?'disabled':''} aria-label="Subir seção ${i+1}">Subir</button><button data-move="${id}" data-delta="1" ${i===2?'disabled':''} aria-label="Descer seção ${i+1}">Descer</button></div></div>`).join('');
  }
  function mapHtml(){return `<div class="map-root">Café Aurora · página única</div><div class="map-branches">${state.order.map(id=>`<article class="map-branch"><h3>${e(groupName(id))}</h3><ul>${items(id).map(c=>`<li>${e(c.name)}</li>`).join('')||'<li>Sem conteúdo</li>'}</ul></article>`).join('')}</div><p class="later"><strong>Fica para depois:</strong> ${items('later').map(c=>e(c.name)).join(', ')||'nenhum cartão separado.'}</p>`;}
  function renderTasks(){
    $('test-tasks').innerHTML=`<div class="tasks">${currentTasks().map(t=>`<button data-task="${t.id}" aria-pressed="${active?.task===t.id}">${e(t.label)}</button>`).join('')}</div><p class="task-state" role="status">${active?'Tarefa: '+e(tasks.find(t=>t.id===active.task).label)+' '+active.clicks+' clique(s).': 'Escolha uma tarefa para começar do Início.'}</p>`;
  }
  function renderPreview(){
    const content=previewCard?cards.find(c=>c.id===previewCard):null;
    $('preview').innerHTML=`<div class="preview"><div class="minihead"><strong>Café Aurora</strong><span>Teste de organização · conteúdo fictício</span></div><nav class="preview-nav" aria-label="Grupos do teste"><button data-go="home">Início</button>${state.order.map(id=>`<button data-go="${id}" ${previewPlace===id?'aria-current="location"':''}>${e(groupName(id))}</button>`).join('')}</nav><div class="preview-content" tabindex="-1">${content?`<h2>${e(content.name)}</h2><p class="info">${e(content.text)}</p><button data-go="${previewPlace}">Voltar ao grupo</button>`:previewPlace?`<h2>${e(groupName(previewPlace))}</h2>${items(previewPlace).map(c=>`<button data-open="${c.id}">${e(c.name)}</button>`).join('')||'<p>O grupo está vazio. O autor precisa organizar os cartões.</p>'}`:`<h2>Onde você procuraria?</h2><p>Escolha um grupo e depois a informação. Este teste de árvore verifica os nomes e a organização; não representa a aparência nem a quantidade de telas da página final.</p>`}</div></div>`;
    renderTasks();
  }
  function renderHistory(){
    $('history').innerHTML=state.tests.length?[...state.tests].reverse().map(t=>`<div class="history-item ${t.revision!==state.revision?'old':''}"><strong>${e(tasks.find(x=>x.id===t.task).label)} ${t.success?'Encontrou':'Interrompida'} · ${t.clicks} clique(s).</strong><small>${t.visitor?'Visitante':'Autor'} · versão ${t.revision}${t.revision!==state.revision?' · mapa mudou; repita na versão atual':''}</small><p class="trail">${e(t.path)}</p></div>`).join(''):'<p>Ainda não há tentativas. Escolha uma tarefa acima.</p>';
  }
  function currentTest(t){return [...state.tests].reverse().find(x=>x.task===t.id&&x.revision===state.revision&&x.visitor&&x.success);}
  function finalIssues(includeLab=true){
    const issues=[...sortIssues(),...labelIssues()];
    if(!state.hunt.bad||!state.hunt.clear)issues.push('Conclua os dois menus da missão 1.');
    if(!state.newRequest)issues.push('Abra o novo recado na missão 3 e organize os dois conteúdos novos.');
    for(const t of currentTasks())if(!currentTest(t))issues.push('Teste com visitante na versão atual: '+t.label);
    if(!state.observation.trim())issues.push('Registre o que aconteceu no teste com o colega.');
    if(!state.improvement.trim())issues.push('Registre a decisão e seu motivo.');
    if(!state.decision)issues.push('Escolha entre ajustar e manter a organização após o teste.');
    if(state.decision==='adjust'&&(state.baseline===null||state.revision<=state.baseline))issues.push('Aplique o ajuste em Grupos ou Nomes e repita as tarefas. Se o teste justificou manter a solução, selecione Manter.');
    if(includeLab)for(const issue of labController.issues())issues.push('Festival · missão 4: '+issue);
    if(includeLab)for(const issue of studioController.issues())issues.push('Estúdio autoral: '+issue);
    return issues;
  }
  function renderSummary(){
    $('revision-note').textContent='Mapa na versão '+state.revision+'. '+(state.baseline===null?'O primeiro teste de visitante será a referência automática para a revisão.':'Primeira visita registrada na versão '+state.baseline+'. Se mudou o mapa, repita as tarefas. Se manteve, justifique com o que observou.');
    $('summary').innerHTML=`<h2>Projeto 1 · Café Aurora</h2>${mapHtml()}<table class="summary-table"><tbody><tr><th>Objetivo</th><td>Consultar cardápio, preços, horários, local e atendimento no balcão. A página não vende nem faz delivery.</td></tr>${currentTasks().map(t=>{const test=currentTest(t);return `<tr><th>${e(t.label)}</th><td>${test?e(test.path)+' · '+test.clicks+' clique(s), visitante, versão atual.'+(test.clicks>3?' Houve voltas: confira o motivo na observação.':''):'Falta teste de visitante concluído na versão atual.'}</td></tr>`}).join('')}<tr><th>Observação</th><td>${e(state.observation)||'A preencher'}</td></tr><tr><th>${state.decision==='keep'?'Manter':state.decision==='adjust'?'Ajustar':'Decisão'}</th><td>${e(state.improvement)||'A preencher'}</td></tr></tbody></table><h2>Projeto autoral · Festival Vira-Luz</h2>${labController.summaryHtml()}${studioController.summaryHtml()}`;
  }
  function renderRequest(){$('new-request').disabled=state.newRequest;$('new-request').textContent=state.newRequest?'Recado recebido: dois cartões novos na missão 2':'Receber novo recado do cliente';$('request-message').hidden=!state.newRequest;}
  function renderDerived(){studioController.render();labController.render();renderSort();renderLabels();renderRequest();$('map').innerHTML=mapHtml();renderPreview();renderHistory();renderSummary();}
  function show(i,focus=true){
    if(visitor)return;
    if(state.step===4&&i!==4)endAttempt(false);
    state.step=Math.max(0,Math.min(5,i));
    document.querySelectorAll('section[data-step]').forEach((el,j)=>el.hidden=j!==state.step);
    document.querySelectorAll('.rail nav button').forEach((b,j)=>{if(j===state.step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    $('prev').disabled=state.step===0;$('next').disabled=state.step===5;$('progress').textContent='Missão '+(state.step+1)+' de 6';
    renderDerived();persist();
    if(focus){const heading=document.querySelector('section:not([hidden]) h1');heading.tabIndex=-1;heading.focus();}
  }
  function renderHunt(){
    const nodes=huntMode==='bad'?{'':[['universo','Nosso universo'],['inspire','Inspire-se'],['mais','Mais']],universo:[['historia','Nossa história'],['equipe','Equipe']],historia:[['hora','Horários'],['origem','Como tudo começou']]}:{'':[['programacao','Atividades'],['hora','Horários e local'],['inscricoes','Inscrições']]};
    const options=nodes[huntNode]||[];
    $('hunt').innerHTML=`<div class="hunt-box"><div class="minihead"><strong>Estação Girassol</strong><span>${huntMode==='bad'?'Menu confuso':'Menu claro'} · ${huntClicks} clique(s)</span></div><div class="hunt-content" tabindex="-1"><p>Encontre o horário da oficina de cerâmica.</p>${huntNode==='hora'?'<h2>Oficina de cerâmica</h2><p class="info">Sábados, das 15h às 17h.</p><p>Horário encontrado. O caminho ficou registrado abaixo.</p>':options.length?options.map(([id,label])=>`<button data-hunt="${id}">${label}</button>`).join(''):'<p>Aqui há informações sobre outro assunto. Tente voltar e procurar outro caminho.</p>'}${huntNode&&huntNode!=='hora'?'<button data-hunt="back">Voltar ao menu inicial</button>':''}</div></div>`;
    $('hunt-results').innerHTML=['bad','clear'].map(k=>state.hunt[k]?`<div class="result"><strong>${k==='bad'?'Menu confuso':'Menu claro'}: encontrou em ${state.hunt[k].clicks} clique(s).</strong><p class="trail">${e(state.hunt[k].path)}</p></div>`:'').join('')+(state.hunt.bad?`<button id="switch-hunt">${huntMode==='bad'?'Comparar com o menu claro':'Tentar o menu confuso de novo'}</button>`:'');
  }
  names.forEach((name,i)=>{const b=document.createElement('button');b.textContent=(i+1)+'. '+name;b.onclick=()=>show(i);document.querySelector('.rail nav').append(b);});
  $('hunt').onclick=event=>{
    const button=event.target.closest('[data-hunt]');if(!button)return;
    if(huntClicks>=999){status('Recomece a busca para registrar um novo caminho.');return;}
    huntClicks++;huntPath.push(button.textContent);huntNode=button.dataset.hunt==='back'?'':button.dataset.hunt;
    if(huntNode==='hora'){state.hunt[huntMode]={clicks:huntClicks,path:['Início',...huntPath].join(' → ').slice(0,4000)};persist();}
    renderHunt();$('hunt').querySelector('.hunt-content').focus();
  };
  $('hunt-results').onclick=event=>{if(event.target.id!=='switch-hunt')return;huntMode=huntMode==='bad'?'clear':'bad';huntNode='';huntClicks=0;huntPath=[];renderHunt();$('hunt').querySelector('.hunt-content').focus();};
  $('sort').onchange=event=>{const id=event.target.dataset.card;if(!id)return;const value=event.target.value;changed(()=>state.places[id]=value);$('place-'+id).focus();status('Cartão movido. O mapa e o teste foram atualizados.');};
  $('labels').addEventListener('focusin',event=>{if(event.target.dataset.group)previous=snapshot();});
  $('labels').oninput=event=>{const id=event.target.dataset.group;if(!id)return;const value=event.target.value;endAttempt(false);group(id).name=value;state.revision++;$('undo').disabled=false;persist();renderSort();$('map').innerHTML=mapHtml();renderPreview();renderHistory();renderSummary();$('label-feedback').textContent='';$('final-feedback').textContent='';};
  $('labels').onclick=event=>{const b=event.target.closest('[data-move]');if(!b)return;const index=state.order.indexOf(b.dataset.move),next=index+Number(b.dataset.delta);if(next<0||next>2)return;changed(()=>{[state.order[index],state.order[next]]=[state.order[next],state.order[index]];});$('name-'+b.dataset.move).focus();status('Ordem do menu atualizada.');};
  $('undo').onclick=()=>{if(!previous)return;endAttempt(false);Object.assign(state,previous);previous=null;state.revision++;$('undo').disabled=true;previewPlace='';previewCard='';persist();renderDerived();status('Última mudança desfeita. Repita os testes na versão atual.');};
  $('check-sort').onclick=()=>showIssues('sort-feedback',sortIssues(),'Todos os cartões têm destino dentro do combinado. Agora confira se os conteúdos de cada grupo fazem sentido juntos.');
  $('check-labels').onclick=()=>showIssues('label-feedback',labelIssues(),'Nomes diferentes e específicos. Peça ao colega para prever o conteúdo só lendo o menu; esta conferência não substitui esse teste.');
  $('new-request').onclick=()=>{if(state.newRequest)return;changed(()=>state.newRequest=true);status('O cliente trouxe dois conteúdos novos. Volte à missão 2 para agrupá-los e confira os nomes.');};
  $('test-tasks').onclick=event=>{
    const b=event.target.closest('[data-task]');if(!b)return;endAttempt(false);
    if(visitor&&state.baseline===null)state.baseline=state.revision;
    active={task:b.dataset.task,revision:state.revision,clicks:0,path:['Início'],visitor};previewPlace='';previewCard='';renderPreview();persist();renderHistory();status('Teste iniciado. Escolha um grupo.');$('preview').querySelector('.preview-content').focus();
  };
  $('preview').onclick=event=>{
    const b=event.target.closest('[data-go],[data-open]');if(!b)return;
    if(!active){status('Escolha uma tarefa acima antes de clicar nos grupos.');$('test-tasks').querySelector('button')?.focus();return;}
    if(active.clicks>=999){endAttempt(false);status('Tentativa encerrada. Escolha uma tarefa e tente um caminho mais direto.');renderPreview();renderHistory();return;}
    active.clicks++;
    if(b.dataset.go){previewPlace=b.dataset.go==='home'?'':b.dataset.go;previewCard='';active.path.push(previewPlace?groupName(previewPlace):'Início');}
    else{previewCard=b.dataset.open;active.path.push(cards.find(c=>c.id===previewCard).name);}
    if(previewCard===tasks.find(t=>t.id===active.task).target){const clicks=active.clicks;endAttempt(true);status('Informação encontrada em '+clicks+' clique(s). '+(clicks>3?'Observe por que houve voltas. Você pode rever o caminho.':'Escolha a próxima tarefa.'));}
    renderPreview();renderHistory();renderSummary();$('preview').querySelector('.preview-content').focus();
  };
  $('visitor').onclick=()=>{
    endAttempt(false);visitor=!visitor;document.body.classList.toggle('visitor-mode',visitor);$('visitor').textContent=visitor?'Encerrar visita e voltar ao painel':'Ativar Modo visitante';previewPlace='';previewCard='';renderPreview();renderHistory();renderSummary();status(visitor?'Passe o teclado ao visitante. Os autores observam sem explicar.':'Visita encerrada. Registre a observação na missão 6.');
  };
  for(const id of ['observation','improvement'])$(id).oninput=()=>{state[id]=$(id).value;persist();renderSummary();$('final-feedback').textContent='';};
  $('decision').onchange=()=>{state.decision=$('decision').value;persist();renderSummary();$('final-feedback').textContent='';};
  $('check-cafe').onclick=()=>{const issues=finalIssues(false);showIssues('cafe-feedback',issues,'Café conferido. Volte à missão 4 para criar as duas primeiras telas do Festival Vira-Luz.');};
  $('check-final').onclick=()=>{const issues=finalIssues();$('final-feedback').innerHTML=issues.length?`<p>Falta conferir:</p><ul class="checklist">${issues.map(x=>`<li>${e(x)}</li>`).join('')}</ul>`:'<div class="result"><strong>Projeto conferido.</strong><p>Mostre o painel ao professor neste computador. O registro continua na própria oficina.</p></div>';renderSummary();};
  $('prev').onclick=()=>show(state.step-1);$('next').onclick=()=>show(state.step+1);
  $('backup').onclick=()=>{endAttempt(false);const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='projetos-design-web-aula15.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Cópia preparada. Confira seus downloads. Nada foi enviado.');};
  $('restore').onchange=async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>2000000)throw Error('large');const candidate=validate(JSON.parse(await file.text()));if(!confirm('Reabrir esta cópia substitui o rascunho atual. Continuar?'))return;state=candidate;previous=null;active=null;$('undo').disabled=true;$('observation').value=state.observation;$('improvement').value=state.improvement;$('decision').value=state.decision;huntMode='bad';huntNode='';huntPath=[];huntClicks=0;renderHunt();show(state.step);status('Cópia reaberta. Grupos, nomes e testes recuperados.');}catch{status('Não foi possível abrir. Escolha um JSON criado nesta oficina. Seu rascunho atual foi mantido.');}finally{event.target.value='';}};
  $('reset').onclick=()=>{if(!confirm('Começar outro rascunho apaga os dois projetos e registros atuais deste navegador. Continuar?'))return;state=initial();previous=null;active=null;$('undo').disabled=true;$('observation').value='';$('improvement').value='';$('decision').value='';huntMode='bad';huntNode='';huntClicks=0;huntPath=[];renderHunt();show(0);status('Novo rascunho iniciado.');};
  const studioController=studio.mount({host:$('free-studio'),getState:()=>state.studio,onChange:()=>{persist();renderSummary();$('final-feedback').textContent='';}});
  const labController=challenge.mount({host:$('challenge-lab'),getState:()=>state.lab,onChange:()=>{persist();renderSummary();$('final-feedback').textContent='';}});
  let recoveryError=false;
  try{const raw=localStorage.getItem(key);if(raw)state=validate(JSON.parse(raw));}catch{recoveryError=true;}
  $('observation').value=state.observation;$('improvement').value=state.improvement;$('decision').value=state.decision;
  renderHunt();
  if(recoveryError){renderDerived();$('save-status').textContent='O rascunho anterior não pôde ser recuperado. Ele será substituído quando você começar a editar. Se tiver uma cópia, reabra em Meu trabalho.';$('save-status').classList.add('warning');document.querySelector('.rail nav button').setAttribute('aria-current','step');$('prev').disabled=true;$('progress').textContent='Missão 1 de 6';}
  else show(state.step,false);
  function openStudio(){if(visitor)$('visitor').click();show(5,false);requestAnimationFrame(()=>{$('free-studio').tabIndex=-1;$('free-studio').focus();$('free-studio').scrollIntoView({block:'start',behavior:'auto'});});}
  document.querySelectorAll('[data-open-studio]').forEach(a=>a.addEventListener('click',()=>openStudio()));
  window.addEventListener('hashchange',()=>{if(location.hash==='#free-studio')openStudio();});
  if(location.hash==='#free-studio')openStudio();
}
