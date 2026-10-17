(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const norm = (text = '') => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const key = 'senai-design-web-12-plantao-v1';
  const emptyResponse = () => ({title:'Uma noite para se inspirar.', notice:'Venha viver uma experiência inesquecível no Pátio Central. Garanta sua presença!', cta:'Quero participar', action:'signup', collect:'email', help:'Siga nossas redes.', reason:'', reviewed:false});
  const initial = () => ({version:1, phase:1, team:'', currentCase:0, currentDossier:0, responseIndex:0,
    cases:Array.from({length:3}, () => ({step:0, extra:true, subscribed:true, note:'', rewrite:''})),
    dossiers:Array.from({length:2}, () => ({picks:[], hypothesis:'', evidence:'', revision:'', next:'', revealed:false})),
    budget:{selected:[], note:'', measure:'', planA:null, shock:false}, responses:Array.from({length:3}, emptyResponse)});
  const fixIds = ['schedule','route','stock','price','captions','animation','qr','help','zoom'];
  const actions = ['signup','map','wait','details'];
  const collections = ['none','email'];
  const isString = value => typeof value === 'string';
  const index = (value, max, fallback = 0) => Number.isInteger(value) && value >= 0 && value <= max ? value : fallback;
  const selectedIds = value => Array.isArray(value) ? [...new Set(value.filter(id => fixIds.includes(id)))] : [];
  const text = (value, fallback = '') => isString(value) ? value : fallback;
  function normalize(saved) {
    const clean = initial();
    if (!saved || typeof saved !== 'object') return clean;
    clean.phase = index(Number(saved.phase) - 1, 3, clean.phase - 1) + 1;
    clean.team = text(saved.team);
    clean.currentCase = index(saved.currentCase, 2);
    clean.currentDossier = index(saved.currentDossier, 1);
    clean.responseIndex = index(saved.responseIndex, 2);
    if (Array.isArray(saved.cases)) saved.cases.slice(0, 3).forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      clean.cases[i] = {
        step: index(item.step, 2),
        extra: typeof item.extra === 'boolean' ? item.extra : clean.cases[i].extra,
        subscribed: typeof item.subscribed === 'boolean' ? item.subscribed : clean.cases[i].subscribed,
        note: text(item.note), rewrite: text(item.rewrite)
      };
    });
    if (Array.isArray(saved.dossiers)) saved.dossiers.slice(0, 2).forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      const picks = Array.isArray(item.picks) ? [...new Set(item.picks.filter(pick => Number.isInteger(pick) && pick >= 0 && pick <= 4))].slice(0, 3) : [];
      clean.dossiers[i] = {
        picks, hypothesis: text(item.hypothesis),
        evidence: item.evidence === '' || (Number.isInteger(Number(item.evidence)) && Number(item.evidence) >= 0 && Number(item.evidence) <= 4) ? String(item.evidence) : '',
        revision: text(item.revision), next: text(item.next),
        revealed: typeof item.revealed === 'boolean' ? item.revealed : false
      };
    });
    if (saved.budget && typeof saved.budget === 'object') {
      const budget = saved.budget;
      clean.budget.selected = selectedIds(budget.selected);
      clean.budget.note = text(budget.note);
      clean.budget.measure = text(budget.measure);
      clean.budget.shock = typeof budget.shock === 'boolean' ? budget.shock : false;
      if (budget.planA && typeof budget.planA === 'object') clean.budget.planA = {
        selected: selectedIds(budget.planA.selected), note: text(budget.planA.note), measure: text(budget.planA.measure)
      };
    }
    if (Array.isArray(saved.responses)) saved.responses.slice(0, 3).forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      clean.responses[i] = {
        title: text(item.title, clean.responses[i].title), notice: text(item.notice, clean.responses[i].notice),
        cta: text(item.cta, clean.responses[i].cta), action: actions.includes(item.action) ? item.action : clean.responses[i].action,
        collect: collections.includes(item.collect) ? item.collect : clean.responses[i].collect,
        help: text(item.help, clean.responses[i].help), reason: text(item.reason),
        reviewed: typeof item.reviewed === 'boolean' ? item.reviewed : false
      };
    });
    return clean;
  }
  let state = initial(), storageOK = true;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved?.version === 1) state = normalize(saved);
  } catch { storageOK = false; }
  const phaseParam = Number(new URLSearchParams(location.search).get('fase'));
  if (phaseParam >= 1 && phaseParam <= 4) state.phase = phaseParam;
  if (![1,2,3,4].includes(state.phase)) state.phase = 1;
  const cases = [
    {name:'O extra já veio marcado', task:'Reserve uma oficina de serigrafia, sem material extra, gastando no máximo R$ 20.', focus:'Que escolha da interface alterou o preço sem um pedido claro?', rewrite:'Reescreva a opção do material para que preço e escolha fiquem explícitos.'},
    {name:'Uma escolha constrangedora', task:'Consulte a programação de sexta-feira sem se inscrever em avisos semanais.', focus:'Qual frase ou controle confundiu consultar a agenda com aceitar mensagens?', rewrite:'Escreva duas opções claras e respeitosas: uma para aceitar avisos e outra para seguir sem eles.'},
    {name:'A pressa foi fabricada?', task:'Reserve um lugar. Depois confira se a informação de lotação sustenta a pressão para decidir.', focus:'Compare o aviso inicial com o painel de ocupação. Qual é a evidência da contradição?', rewrite:'Substitua a urgência por uma frase informativa que os dados realmente sustentam.'}
  ];
  const dossiers = [
    {name:'Ana, 24', context:'Trabalha no comércio e quer visitar a Virada Criativa. Ela abriu a página, mas não decidiu se vai.',
      questions:[
        ['Qual informação fez você desistir da última vez?', 'Li “abertura às 18h” e fechei. Saio do trabalho às 18h30. Achei que não podia entrar depois.'],
        ['Conte como seria sua ida e sua volta.', 'Vou de ônibus. O último de volta sai às 21h40. Preciso de 25 minutos para chegar ao ponto. Não sei quanto dura cada atividade.'],
        ['O que você precisaria saber antes de sair de casa?', 'Se há alguma atividade depois das 19h e se posso só visitar a exposição, sem fazer oficina.'],
        ['Qual cor combina mais com esse evento?', 'Eu gosto de roxo. Mas isso não me diz se consigo ir.'],
        ['Você achou a página bonita?', 'Achei bonita, sim. Só não sei se ela é para quem sai tarde do trabalho.']
      ], twist:'A organização não pode mudar a oficina das 18h. Mas a exposição permite entrada livre até as 21h e há uma conversa às 20h. A página mistura tudo em um único horário.',
      question:'Sua primeira hipótese ainda resolve o problema? Distinga uma limitação do evento de uma informação que a página omitiu.'},
    {name:'Ravi, 31', context:'Usa ampliação para ler e quer chegar à exposição por uma entrada sem degraus.',
      questions:[
        ['Mostre como você lê uma página no computador.', 'Uso zoom em 200%. Se o texto sai da tela, perco o começo da frase. Nem sempre uso leitor de tela.'],
        ['Conte uma dificuldade ao chegar a um evento.', 'O site mostrava só uma foto da escadaria. Havia rampa em outra rua, mas eu não sabia onde. Dei a volta sozinho.'],
        ['Como você usaria o QR code que aparece no convite?', 'Estou vendo no próprio celular. Preciso de um endereço escrito e de um link que eu consiga abrir, além do QR.'],
        ['Qual família de fonte você prefere?', 'Não sei o nome. Preciso conseguir ampliar e ler sem perder informação.'],
        ['Se eu aumentar o botão, resolve tudo?', 'Ajuda a localizar. Mas ainda não diz por qual rua eu entro.']
      ], twist:'A entrada da Rua das Oficinas, 24, fecha às 20h. Depois desse horário, a entrada sem degraus é pela Rua Norte, 80, com campainha e equipe de apoio.',
      question:'Agora a rota depende do horário. O que precisa ser verificado e comunicado, além de aumentar os elementos da tela?'}
  ];
  const improvements = [
    {id:'schedule', title:'Separar horários por atividade',cost:2, result:'Ana pode distinguir oficina, conversa e visitação.', risk:'O horário continua único: Ana pode desistir de uma atividade que conseguiria visitar.'},
    {id:'route', title:'Rota sem degraus em texto e mapa',cost:3, result:'Ravi encontra a entrada por rua e horário, sem depender da foto.',risk:'A foto da escadaria continua sendo a única orientação de chegada.'},
    {id:'stock', title:'Mostrar lotação e opção de espera',cost:2, result:'A pessoa distingue lugar disponível de pedido em espera.',risk:'Ainda é possível interpretar um pedido como lugar garantido.'},
    {id:'price', title:'Explicitar preço total e extras opcionais',cost:2, result:'Quem reserva identifica o custo e escolhe os adicionais.',risk:'O custo continua dependendo de uma opção marcada de início.'},
    {id:'captions', title:'Legendar o vídeo de apresentação',cost:3, result:'O conteúdo falado pode ser acompanhado sem ouvir o áudio.',risk:'O vídeo continua dependendo do áudio para transmitir seu conteúdo.'},
    {id:'animation', title:'Criar uma abertura com animação',cost:4, result:'A organização ganha o destaque visual que pediu. Isso, sozinho, não informa rota, preço ou horários.',risk:'A abertura fica estática; as informações continuam disponíveis como antes.'},
    {id:'qr', title:'Adicionar QR code ao cartaz',cost:1, result:'Cria mais um acesso ao site para quem consegue usar outro dispositivo.',risk:'O cartaz mantém o endereço escrito; não ganha o atalho por câmera.'},
    {id:'help', title:'Informar ponto de apoio e horário',cost:1, result:'A pessoa sabe onde pedir ajuda: recepção do Galpão 2, das 19h às 21h.',risk:'Quem precisar de ajuda ao chegar ainda não tem um ponto de referência.'},
    {id:'zoom', title:'Ajustar a leitura com zoom em 200%',cost:2, result:'O texto se reorganiza sem corte na ampliação. A rota ainda precisa de conteúdo correto.',risk:'Há risco de perder trechos do texto ao ampliar a página.'}
  ];
  const scenarios = [
    {name:'Chuva na abertura', tag:'Mudança de local', description:'Uma hora antes da abertura, a chuva inviabilizou o Pátio Central. Há visitantes a caminho.',
      facts:[['Evento','Virada Criativa · hoje, 16/10'],['Local','Galpão 2 · Rua Norte, 80'],['Horário','20h, sem alteração'],['Acesso','Portão Leste, sem degraus'],['Inscrição','Quem já se inscreveu não precisa repetir'],['Apoio','Recepção do Galpão 2 · 19h–21h']],
      required:['galpao 2','20','portao leste','80'], cause:'chuva', action:'map', collect:'none', feedback:'Rota do cenário: siga pela Rua Norte, 80. Entre pelo Portão Leste, sem degraus, e use a campainha para chamar a equipe. A equipe fica na recepção do Galpão 2, das 19h às 21h.'},
    {name:'A sessão lotou', tag:'Sem lugar garantido', description:'Os 40 lugares da conversa das 20h acabaram. A divulgação ainda promete entrada garantida.',
      facts:[['Evento','Virada Criativa · conversa de hoje'],['Sessão','20h · 40 lugares ocupados'],['Alternativa','Nova conversa às 21h30 · Galpão 2'],['Espera','Lista de espera para 20h, sem garantia'],['Contato','Pedir somente e-mail para retorno sobre a vaga'],['Apoio','Recepção do Galpão 2 · 19h–21h']],
      required:['20','21h30','sem garantia','galpao 2'], cause:'lot', action:'wait', collect:'email', feedback:'Simulação de lista de espera: o pedido de aviso foi registrado com um e-mail fictício. Não há lugar garantido para as 20h. A alternativa é a conversa das 21h30 no Galpão 2.'},
    {name:'A energia caiu', tag:'Evento adiado', description:'Uma falha de energia cancelou a abertura de hoje. Há pessoas com inscrições e deslocamento planejado.',
      facts:[['Evento','Virada Criativa · abertura adiada'],['Hoje','16/10 · não haverá abertura'],['Nova data','22/10, às 20h · Galpão 2'],['Inscrições','As inscrições existentes continuam válidas'],['Próximo passo','Consultar a nova data, sem refazer cadastro'],['Apoio','Balcão da organização no Galpão 2 · hoje até 21h']],
      required:['16/10','22/10','20','valid'], cause:'energia', action:'details', collect:'none', feedback:'Detalhes do cenário: a abertura de 16/10 foi adiada para 22/10, às 20h, no Galpão 2. As inscrições existentes continuam válidas. O balcão da organização atende hoje até as 21h.'}
  ];
  function save() {
    try { localStorage.setItem(key,JSON.stringify(state)); storageOK = true; }
    catch { storageOK = false; }
    $('save-status').textContent = storageOK ? 'Salvo neste navegador' : 'Exporte para guardar sua entrega';
  }
  function field(path, label, value, hint = '', rows = 3) {
    return `<label>${label}<textarea data-field="${path}" rows="${rows}" maxlength="1200">${escape(value)}</textarea>${hint ? `<span class="hint">${hint}</span>`:''}</label>`;
  }
  function top(level,title,text,deliverable) {
    return `<section class="stage-top"><div class="stage-copy"><div class="difficulty">Nível ${level} ${[1,2,3,4].map(n=>`<i class="${n<=level?'on':''}"></i>`).join('')}</div><h2>${title}</h2><p>${text}</p></div><aside class="stage-meta"><strong>Entrega desta etapa</strong><p>${deliverable}</p><small>Em dupla: alternem quem opera e quem questiona. Sem dupla: faça as duas funções.</small></aside></section>`;
  }
  function next(text,phase,label) {return `<div class="next"><p>${text}</p><button class="primary" data-go="${phase}">${label}</button></div>`;}
  function stretch(title,text) {return `<details class="stretch"><summary>Terminou com critério? ${title}</summary><p>${text}</p></details>`;}
  function caseScreen(index) {
    const c = state.cases[index];
    if(index===0) {
      if(c.step===0) return `<p class="sim-brand">VIRADA / OFICINAS</p><h3>Serigrafia para começar.</h3><p>Uma oficina prática de 60 minutos.</p><p class="price">R$ 20 <small>por pessoa</small></p><label class="inline-check"><input type="checkbox" id="case-extra" ${c.extra?'checked':''}><span>Quero a experiência completa.<small class="hint">Inclui suporte impresso adicional.</small></span></label><button class="primary full" data-case-action="checkout">Continuar a reserva</button><p class="fine">Exemplo fictício. Confira o resumo antes de concluir.</p>`;
      return `<p class="sim-brand">VIRADA / RESUMO</p><h3>${c.step===2?'Reserva registrada.':'Confira sua reserva.'}</h3><table class="receipt"><tbody><tr><td>Oficina</td><td>R$ 20</td></tr>${c.extra?'<tr><td>Suporte impresso adicional</td><td>R$ 8</td></tr>':''}<tr><td>Total</td><td>R$ ${c.extra?'28':'20'}</td></tr></tbody></table><button class="full" data-case-action="back">Voltar e rever opções</button>${c.step!==2?'<button class="primary full" data-case-action="finish">Concluir reserva fictícia</button>':'<p class="fine">Nenhuma cobrança foi realizada. A reserva é uma simulação.</p>'}`;
    }
    if(index===1) {
      if(c.step===0) return `<p class="sim-brand">VIRADA / PROGRAMAÇÃO</p><h3>Fique por dentro de tudo.</h3><p>Veja o que vai acontecer na sexta-feira.</p><label class="inline-check"><input type="checkbox" id="case-subscribe" ${c.subscribed?'checked':''}><span>Quero continuar por dentro.<small class="hint">Receba avisos semanais de novidades.</small></span></label><button class="primary full" data-case-action="checkout">Sim, quero continuar</button><button class="text-button" data-case-action="decline">Prefiro ficar por fora</button>`;
      return `<p class="sim-brand">VIRADA / SEXTA-FEIRA</p><h3>Sua programação.</h3><p>18h · Oficina de serigrafia<br>20h · Conversa com criadores<br>Até 21h · Exposição aberta</p><div class="result"><strong>Avisos semanais: ${c.subscribed?'ativados':'não ativados'}.</strong><p>${c.subscribed?'A ação de continuar também aceitou receber mensagens.':'Você consultou a mesma agenda sem receber mensagens.'}</p></div><button class="full" data-case-action="back">Rever a escolha</button>`;
    }
    if(c.step===0) return `<p class="sim-brand">VIRADA / CONVERSA</p><div class="sale-banner"><strong>Último lugar! Decida agora.</strong><br>Sua chance termina em 00:30.</div><h3>Conversas que abrem ideias.</h3><p>Hoje, 20h · auditório · entrada gratuita.</p><button class="primary full" data-case-action="checkout">Reservar lugar</button><p class="fine">O cronômetro faz parte do anúncio fictício. Observe o que acontece ao voltar.</p>`;
    return `<p class="sim-brand">VIRADA / BILHETERIA</p><h3>Seu lugar foi reservado.</h3><p>Este painel é a fonte de dados da simulação, atualizada após a sua reserva:</p><table class="receipt"><tbody><tr><td>Capacidade</td><td>40</td></tr><tr><td>Lugares ocupados</td><td>32</td></tr><tr><td>Lugares ainda disponíveis</td><td>8</td></tr></tbody></table><button class="full" data-case-action="back">Voltar ao anúncio</button><p class="fine">Voltar não faz outra reserva. Nenhuma inscrição real foi feita.</p>`;
  }
  function renderCases() {
    const i=state.currentCase, c=cases[i], answer=state.cases[i];
    return top(1,'O que a tela faz você escolher?','Três casos curtos. Use cada interface até o resultado, encontre uma evidência e devolva ao usuário uma escolha clara. Troquem o operador a cada caso.','Três evidências + três reparos de texto. Não basta escrever “está confuso”.')+
      `<div class="toolbar tabs" aria-label="Casos">${cases.map((item,n)=>`<button data-case="${n}" aria-pressed="${n===i}">${String(n+1).padStart(2,'0')} · ${['Preço','Consentimento','Urgência'][n]}</button>`).join('')}</div><div class="split"><section class="desk"><div class="case-task"><span class="eyebrow">Sua tarefa</span><p>${c.task}</p></div><div class="browser-frame"><div class="browser-bar"><span>virada.exemplo / caso ${i+1}</span><span>Simulação</span></div><div class="sim">${caseScreen(i)}</div></div></section><section class="desk"><p class="section-label">${c.name}</p><div class="evidence-form">${field(`cases.${i}.note`,'1. Evidência: o que aconteceu?',answer.note,c.focus)}${field(`cases.${i}.rewrite`,'2. Reparo: como você escreveria?',answer.rewrite,c.rewrite)}<p class="fine">O reparo deve preservar a possibilidade de escolher. Esconder o extra ou apagar a alternativa não resolve.</p></div><button data-case="${(i+1)%3}">${i<2?'Próximo caso →':'Rever primeiro caso'}</button></section></div>`+
      stretch('Inverta o interesse de quem vende.','Escolha um reparo e procure uma forma legítima de a organização divulgar o material ou os avisos, sem escolha automática nem constrangimento. Acrescente essa alternativa ao reparo. Depois, confira se os dois caminhos continuam compreensíveis.')+
      next('Às 20h35: confira os três registros e avance. Você pode exportar uma cópia a qualquer momento.','2','Ir para investigação →');
  }
  function renderDossiers() {
    const i=state.currentDossier, data=dossiers[i], d=state.dossiers[i];
    return top(2,'Você ainda não sabe o problema.','Primeiro registre uma hipótese. Depois escolha só três perguntas por pessoa. Uma boa pergunta traz uma situação concreta; concordar com a aparência não explica uma necessidade.','Duas hipóteses revistas, cada uma ligada a uma fala e a uma próxima verificação.')+
      `<div class="toolbar tabs">${dossiers.map((person,n)=>`<button data-dossier="${n}" aria-pressed="${n===i}">Dossiê ${n+1} · ${person.name}</button>`).join('')}</div><div class="split"><section class="desk"><div class="dossier-title"><h3>${data.name}</h3><span>0${i+1}</span></div><p>${data.context}</p>${field(`dossiers.${i}.hypothesis`,'Antes das perguntas: qual é sua hipótese?',d.hypothesis,'Escreva o que você supõe. Uma hipótese pode mudar.',2)}<p class="section-label" style="margin-top:25px">Perguntas disponíveis · ${3-d.picks.length} de 3 restantes</p><div class="questions">${data.questions.map((question,n)=>`<button class="question" data-question="${n}" aria-pressed="${d.picks.includes(n)}" ${d.picks.includes(n)||d.picks.length===3?'disabled':''}><span>${question[0]}</span><span>${d.picks.includes(n)?'Perguntada':'1 pergunta'}</span></button>`).join('')}</div><p class="fine">As respostas ficam abertas. Não há pontuação por escolher uma pergunta; importa o que ela permite descobrir.</p><div>${d.picks.length?d.picks.map(n=>`<article class="answer"><blockquote>“${data.questions[n][1]}”</blockquote><p class="quote-source">${data.name} · pergunta ${n+1}: ${data.questions[n][0]}</p></article>`).join(''):'<p class="evidence-empty">As falas aparecerão aqui após as perguntas.</p>'}</div></section><section class="desk"><p class="section-label">Do palpite à necessidade</p><div class="evidence-form"><label>Qual fala sustenta sua decisão?<select data-field="dossiers.${i}.evidence"><option value="">Escolha entre as falas que você ouviu</option>${d.picks.map(n=>`<option value="${n}" ${d.evidence===String(n)?'selected':''}>${escape(data.questions[n][1])}</option>`).join('')}</select></label><button class="primary" id="reveal" ${d.revealed?'disabled':''}>${d.revealed?'Nova informação aberta':'Abrir informação que complica o caso'}</button>${d.revealed?`<div class="result warn"><strong>O caso mudou.</strong><p>${data.twist}</p><p>${data.question}</p></div>`:'<p class="fine">Abra depois de ouvir três respostas e registrar uma hipótese. A oficina conserva seu palpite inicial.</p>'}<p id="dossier-status" class="status-line" role="status"></p>${field(`dossiers.${i}.revision`,'Agora descreva a necessidade real',d.revision,'Pessoa + o que precisa fazer + em qual situação. Cite a evidência e diga o que mudou na hipótese.')}${field(`dossiers.${i}.next`,'O que você verificaria antes de criar a solução?',d.next,'Escreva uma pergunta ou observação capaz de contrariar sua nova hipótese.',2)}</div>${i===0?'<button data-dossier="1" style="margin-top:20px">Trocar papéis e abrir Ravi →</button>':''}</section></div>`+
      stretch('O que você ainda não pode afirmar?','Escolha uma conclusão sua e registre qual dado faltou. Redija uma pergunta neutra para outra pessoa, sem oferecer a resposta no enunciado. Não transforme uma fala fictícia em regra sobre todas as pessoas.')+
      next('Conferência: as duas decisões usam uma evidência? A informação nova provocou revisão ou uma justificativa para manter a hipótese?','3','Abrir orçamento →');
  }
  const cost = (ids) => improvements.filter(item=>ids.includes(item.id)).reduce((sum,item)=>sum+item.cost,0);
  function renderBudget() {
    const b=state.budget, limit=b.shock?6:10, spent=cost(b.selected);
    return top(3,'Tudo parece importante. Cabe o quê?','A equipe tem capacidade limitada. Escolha melhorias, explique o que fica de fora e guarde um plano. Depois enfrente um corte sem apagar sua primeira decisão.','Plano A (10 créditos) + plano B (6 créditos) e o risco que você aceitou adiar.')+
      `<div class="split"><section class="desk"><p class="section-label">${b.shock?'Plano B · depois do corte':'Plano A · antes do corte'}</p><div class="budget ${spent>limit?'over':''}" role="status"><output>${spent} / ${limit}</output><p>créditos usados<br>${spent>limit?`Retire ${spent-limit} para caber.`:`Restam ${limit-spent}.`}</p></div>${b.shock?'<div class="result warn"><strong>Capacidade cortada para 6 créditos.</strong><p>O evento começa hoje. A entrada da Rua das Oficinas fecha às 20h. Há visitantes que usam ampliação e chegam depois desse horário. A coordenação ainda pede a abertura animada.</p><p>Replaneje. O plano A continua guardado.</p></div>':'<div class="case-task"><strong>Pedido da coordenação</strong><p>“Quero uma abertura animada e o QR no cartaz.” Ana e Ravi precisam conseguir planejar a visita. Você pode negociar o pedido com evidências.</p></div>'}<div class="improvements">${improvements.map(item=>`<label class="improvement"><input id="fix-${item.id}" type="checkbox" data-fix="${item.id}" ${b.selected.includes(item.id)?'checked':''}><span><strong>${item.title}</strong><small>${item.result}</small></span><span class="cost">${item.cost} cr.</span></label>`).join('')}</div><p class="fine">Créditos são uma restrição didática de esforço. Os efeitos abaixo são hipóteses do caso, não resultados de pesquisa nem notas.</p></section><section class="desk"><p class="section-label">Consequências da escolha</p><ul class="impact-list">${improvements.filter(item=>['schedule','route','price','stock','zoom','help'].includes(item.id)).map(item=>`<li><strong>${b.selected.includes(item.id)?'Incluído':'Em aberto'} · ${item.title}</strong>${b.selected.includes(item.id)?item.result:item.risk}</li>`).join('')}</ul><div class="evidence-form" style="margin-top:25px">${field('budget.note','Defenda a prioridade e o que você adiou',b.note,'Use uma fala de Ana ou Ravi. Nomeie um risco que seu plano ainda deixa em aberto.')}${field('budget.measure','Que tarefa permitiria verificar sua escolha?',b.measure,'Descreva uma ação observável e o que contaria como resultado. Não invente um percentual de sucesso.',2)}${!b.shock?'<button class="primary" id="save-plan">Guardar plano A</button>':''}<p id="budget-status" class="status-line" role="status"></p>${b.planA?`<div class="result"><strong>Plano A guardado · ${cost(b.planA.selected)} créditos</strong><p>${b.planA.selected.map(id=>improvements.find(item=>item.id===id)?.title).filter(Boolean).join(' · ')}</p><p>${escape(b.planA.note)}</p></div>${!b.shock?'<button id="shock">Abrir comunicado da coordenação →</button>':'<small>Seu plano B é salvo automaticamente conforme você altera as escolhas.</small>'}`:''}</div></section></div>`+
      stretch('Negocie em uma frase.','Redija uma resposta de até 30 segundos à coordenação: qual pedido você atende, qual adia e qual evidência justifica a troca? Depois tente uma combinação diferente que caiba nos mesmos 6 créditos e compare o risco.')+
      next('Para concluir: preserve os dois planos. Um orçamento que cabe ainda precisa de uma justificativa.','4','Assumir o plantão →');
  }
  function previewHTML(r) {
    return `<div class="browser-frame preview"><div class="browser-bar"><span>virada.exemplo / aviso</span><span>Sua página</span></div><div class="sim"><p class="sim-brand">VIRADA CRIATIVA</p><span class="event-tag">Informação ao visitante</span><h3 id="preview-title">${escape(r.title)}</h3><p class="notice" id="preview-notice">${escape(r.notice)}</p><div id="preview-collection">${r.collect==='email'?'<label>E-mail fictício<input value="visitante@exemplo.test" readonly aria-describedby="fiction-email"></label><p id="fiction-email" class="fine">Campo de demonstração, sem envio real.</p>':''}</div><button class="primary" id="preview-action">${escape(r.cta)||'Texto do botão'}</button><p class="help" id="preview-help">${escape(r.help)}</p><div id="preview-result" class="result" hidden role="status"></div></div></div>`;
  }
  function checks(r, s) {
    const text=norm(r.title+' '+r.notice), helper=norm(r.help);
    return [
      ['O aviso nomeia o motivo da mudança.',text.includes(s.cause)],
      ['Os fatos indispensáveis do cenário aparecem no aviso.',s.required.every(fragment=>text.includes(fragment))],
      ['O botão leva à ação compatível com o caso.',r.action===s.action && r.cta.trim().length>0],
      ['A coleta de contato acompanha a necessidade do caso.',r.collect===s.collect],
      ['Existe orientação concreta para pedir apoio.',helper.includes('galpao') && /21/.test(helper)]
    ];
  }
  function renderResponse() {
    const i=state.responseIndex,s=scenarios[i],r=state.responses[i];
    return top(4,'O evento mudou. A tela precisa responder.','Você recebeu uma página promocional desatualizada. Transforme-a em um aviso útil, com informações verificáveis e uma ação que cumpra o que promete. Uma única página.','Aviso final em funcionamento + justificativa. O relatório reúne as quatro etapas.')+
      `<div class="toolbar"><label style="flex:1;max-width:430px">Seu imprevisto<select id="scenario">${scenarios.map((scenario,n)=>`<option value="${n}" ${n===i?'selected':''}>${n+1} · ${scenario.name}</option>`).join('')}</select></label><span class="fine">Cada cenário conserva sua própria edição.</span></div><div class="split"><section class="desk"><p class="section-label">${s.tag}</p><p>${s.description}</p><div class="facts"><strong>Comunicado da organização · fonte do caso</strong><dl>${s.facts.map(([term,value])=>`<dt>${term}</dt><dd>${value}</dd>`).join('')}</dl></div><div class="evidence-form" style="margin-top:26px"><label>Título do aviso<input data-field="responses.${i}.title" maxlength="100" value="${escape(r.title)}"></label>${field(`responses.${i}.notice`,'Informação principal',r.notice,'Informe a mudança e o que a pessoa precisa fazer agora. Preserve os fatos do comunicado.',5)}<label>Texto do botão<input data-field="responses.${i}.cta" maxlength="70" value="${escape(r.cta)}"></label><label>O que o botão realmente faz<select data-field="responses.${i}.action"><option value="signup" ${r.action==='signup'?'selected':''}>Abrir nova inscrição</option><option value="map" ${r.action==='map'?'selected':''}>Mostrar a rota de chegada</option><option value="wait" ${r.action==='wait'?'selected':''}>Pedir aviso de vaga, sem garantia</option><option value="details" ${r.action==='details'?'selected':''}>Consultar detalhes da nova data</option></select></label><label>Dados solicitados<select data-field="responses.${i}.collect"><option value="none" ${r.collect==='none'?'selected':''}>Nenhum dado</option><option value="email" ${r.collect==='email'?'selected':''}>Somente e-mail para retorno</option></select></label>${field(`responses.${i}.help`,'Onde e quando encontrar apoio',r.help,'Dê uma referência utilizável. “Fale conosco” sozinho não localiza a ajuda.',2)}</div></section><section class="desk"><p class="section-label">Prévia · experimente o botão</p>${previewHTML(r)}<button id="review" style="margin-top:25px">Conferir com o comunicado</button><div id="review-result" ${r.reviewed?'':'hidden'}><ul class="review-list">${checks(r,s).map(([text,ok])=>`<li><span>${ok?'✓':'○'}</span>${text} ${ok?'':'(revisar)'}</li>`).join('')}</ul><p class="fine">Esta conferência procura palavras e opções. Leia o texto completo: ela não avalia clareza, promessa do botão nem contradições como “lotado e disponível”.</p></div><div class="evidence-form" style="margin-top:25px">${field(`responses.${i}.reason`,'Qual decisão mais protege o visitante?',r.reason,'Explique o que tirou, o que colocou e por quê. Depois leia só o botão: sua promessa corresponde à ação?')}</div></section></div>`+
      stretch('Mude de cenário sem copiar a solução.','Abra outro imprevisto. Antes de editar, diga por que a mesma ação e a mesma coleta de contato podem ser inadequadas. Produza uma segunda resposta. As edições do primeiro cenário permanecem guardadas.')+
      `<div class="next"><p>Às 22h04, exporte. Abra o HTML baixado e confira seus textos, os dois planos e a página final. A entrega pode ser aberta sem internet.</p><button class="primary" data-export>Exportar entrega da noite ↗</button></div>`;
  }
  function render(focusId) {
    document.querySelectorAll('[data-phase]').forEach(button=>{
      if(Number(button.dataset.phase)===state.phase) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    $('workspace').innerHTML = [renderCases,renderDossiers,renderBudget,renderResponse][state.phase-1]();
    if(focusId) $(focusId)?.focus();
  }
  function go(phase) {
    state.phase=Number(phase); save(); render();
    try { const url=new URL(location.href);url.searchParams.set('fase',String(state.phase));history.replaceState(null,'',url); } catch {}
    $('workspace').focus({preventScroll:true}); $('workspace').scrollIntoView({behavior:'instant',block:'start'});
  }
  function updatePreview() {
    if(state.phase!==4) return;
    const r=state.responses[state.responseIndex];
    $('preview-title').textContent=r.title; $('preview-notice').textContent=r.notice;
    $('preview-action').textContent=r.cta||'Texto do botão'; $('preview-help').textContent=r.help;
    $('preview-collection').innerHTML=r.collect==='email'?'<label>E-mail fictício<input value="visitante@exemplo.test" readonly aria-describedby="fiction-email"></label><p id="fiction-email" class="fine">Campo de demonstração, sem envio real.</p>':'';
    $('preview-result').hidden=true;
    if(r.reviewed) $('review-result').innerHTML=`<ul class="review-list">${checks(r,scenarios[state.responseIndex]).map(([text,ok])=>`<li><span>${ok?'✓':'○'}</span>${text} ${ok?'':'(revisar)'}</li>`).join('')}</ul><p class="fine">Conferência por palavras e opções. A clareza e a coerência ainda precisam da sua leitura.</p>`;
  }
  function setField(target) {
    const path=target.dataset.field?.split('.'); if(!path) return;
    let owner=state;for(const part of path.slice(0,-1)) owner=owner[part];owner[path.at(-1)]=target.value;
    save();if(path[0]==='responses')updatePreview();
  }
  document.addEventListener('input',event=>{if(event.target.matches('[data-field]'))setField(event.target);});
  document.addEventListener('change',event=>{
    const target=event.target;
    if(target.matches('select[data-field]'))setField(target);
    if(target.id==='case-extra'){state.cases[0].extra=target.checked;save();}
    if(target.id==='case-subscribe'){state.cases[1].subscribed=target.checked;save();}
    if(target.dataset.fix){const b=state.budget; b.selected=target.checked?[...new Set([...b.selected,target.dataset.fix])]:b.selected.filter(id=>id!==target.dataset.fix);save();render(target.id);}
    if(target.id==='scenario'){state.responseIndex=Number(target.value);save();render('scenario');}
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.phase){go(button.dataset.phase);return;}
    if(button.dataset.go){go(button.dataset.go);return;}
    if(button.dataset.case!==undefined){state.currentCase=Number(button.dataset.case);save();render();return;}
    if(button.dataset.dossier!==undefined){state.currentDossier=Number(button.dataset.dossier);save();render();return;}
    if(button.dataset.caseAction){const c=state.cases[state.currentCase];switch(button.dataset.caseAction){case'back':c.step=0;break;case'decline':c.subscribed=false;c.step=1;break;case'finish':c.step=2;break;default:c.step=1;}save();render();return;}
    if(button.dataset.question!==undefined){const d=state.dossiers[state.currentDossier],n=Number(button.dataset.question);if(d.picks.length<3&&!d.picks.includes(n)){d.picks.push(n);save();render();}return;}
    if(button.id==='reveal'){const d=state.dossiers[state.currentDossier];if(d.picks.length<3||!d.hypothesis.trim()){$('dossier-status').textContent='Registre sua hipótese e ouça três respostas antes de abrir a nova informação.';return;}d.revealed=true;save();render();return;}
    if(button.id==='save-plan'){const b=state.budget;if(!b.selected.length||cost(b.selected)>10||!b.note.trim()){$('budget-status').textContent='Escolha melhorias que caibam em 10 créditos e registre sua justificativa.';return;}b.planA={selected:[...b.selected],note:b.note,measure:b.measure};save();render();$('budget-status').textContent='Plano A guardado. Abra o comunicado para receber a nova restrição.';return;}
    if(button.id==='shock'){if(!state.budget.planA)return;state.budget.shock=true;state.budget.note='';state.budget.measure='';save();render();return;}
    if(button.id==='preview-action'){const r=state.responses[state.responseIndex],s=scenarios[state.responseIndex],result=$('preview-result');result.hidden=false;result.textContent=r.action===s.action?s.feedback:({signup:'Simulação: abriu uma nova inscrição. Esta ação é necessária para a pessoa neste cenário?',map:'Simulação: abriu a rota. Esta é a informação que a pessoa precisa agora?',wait:'Simulação: entrou em uma lista de espera, sem lugar garantido. Isso corresponde ao comunicado?',details:'Simulação: abriu detalhes de uma nova data. Existe nova data neste cenário?'})[r.action];return;}
    if(button.id==='review'){state.responses[state.responseIndex].reviewed=true;save();render('review');return;}
    if(button.id==='export'||button.hasAttribute('data-export'))exportReport();
  });
  $('team').value=state.team;
  $('team').addEventListener('input',event=>{state.team=event.target.value;save();});
  function responseReport(r,s) {
    return `<article><h3>${escape(s.name)}</h3><p class="source">Comunicado: ${s.facts.map(([k,v])=>escape(k+': '+v)).join(' · ')}</p><div class="final-page"><small>VIRADA CRIATIVA / AVISO AO VISITANTE</small><h3>${escape(r.title)}</h3><p>${escape(r.notice)}</p><p class="cta">${escape(r.cta)}</p><p>${escape(r.help)}</p></div><p><strong>Ação configurada:</strong> ${escape({signup:'Abrir nova inscrição',map:'Mostrar rota',wait:'Pedir aviso de vaga, sem garantia',details:'Consultar nova data'}[r.action])}. <strong>Contato:</strong> ${r.collect==='email'?'e-mail para retorno':'nenhum dado'}.</p><p><strong>Decisão:</strong> ${escape(r.reason)||'<em>Não registrada.</em>'}</p></article>`;
  }
  function exportReport() {
    const b=state.budget, active=state.responseIndex;
    const pending=[];
    if(state.cases.some(c=>!c.note.trim()||!c.rewrite.trim()))pending.push('evidências ou reparos dos casos');
    if(state.dossiers.some(d=>!d.revision.trim()||!d.next.trim()||!d.revealed))pending.push('conclusões dos dossiês');
    if(!b.planA||!b.shock||cost(b.selected)>6||!b.note.trim())pending.push('planos A/B e justificativa');
    if(!state.responses[active].reason.trim()||!state.responses[active].reviewed)pending.push('revisão e justificativa do aviso');
    const listIds=ids=>ids.map(id=>improvements.find(item=>item.id===id)).filter(Boolean).map(item=>`<li>${escape(item.title)} · ${item.cost} créditos</li>`).join('');
    const html=`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Entrega · Plantão UX · ${escape(state.team||'Aula 12')}</title><style>body{font-family:system-ui,sans-serif;background:#f6f3e9;color:#182b28;max-width:900px;margin:auto;padding:35px 24px;line-height:1.65}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:1.15}h1{font-size:54px}h2{font-size:32px;border-top:2px solid;padding-top:24px;margin-top:45px}h3{font-size:21px}article{margin-block:30px;border-bottom:1px solid #c6cbc0;padding-bottom:24px}p{white-space:pre-line}small,.source{font-size:13px;color:#53615a}.final-page{padding:30px;border:1px solid;background:#fffef9;max-width:480px}.final-page h3{font-family:Georgia,serif;font-size:32px;line-height:1.2}.cta{background:#182b28;color:white;padding:14px}.checkpoint{padding:15px;background:#e9ecdf}@media print{body{padding:0}article,.final-page{break-inside:avoid}}</style><main><small>SENAI · DESIGN WEB · AULA 12</small><h1>Plantão UX.</h1><p><strong>${escape(state.team||'Identificação não preenchida')}</strong><br>Exportado em ${escape(new Date().toLocaleString('pt-BR'))}</p><p class="checkpoint">${pending.length?'Registro parcial. Confira: '+pending.join('; ')+'.':'Os registros essenciais estão preenchidos. A qualidade das decisões deve ser avaliada pelos critérios da aula.'}</p><h2>01 / Escolhas que enganam</h2>${cases.map((c,i)=>`<article><h3>${c.name}</h3><p><strong>Tarefa:</strong> ${c.task}</p><p><strong>Evidência:</strong> ${escape(state.cases[i].note)||'<em>Não registrada.</em>'}</p><p><strong>Reparo:</strong> ${escape(state.cases[i].rewrite)||'<em>Não registrado.</em>'}</p></article>`).join('')}<h2>02 / O que as evidências mudaram</h2>${dossiers.map((person,i)=>{const d=state.dossiers[i];return `<article><h3>${person.name}</h3><p><strong>Hipótese inicial:</strong> ${escape(d.hypothesis)}</p>${d.picks.map(n=>`<p><strong>Pergunta:</strong> ${person.questions[n][0]}<br><strong>Resposta:</strong> “${person.questions[n][1]}”</p>`).join('')}<p><strong>Evidência escolhida:</strong> ${d.evidence!==''&&person.questions[Number(d.evidence)]?escape(person.questions[Number(d.evidence)][1]):'Não selecionada.'}</p>${d.revealed?`<p><strong>Informação nova:</strong> ${person.twist}</p>`:''}<p><strong>Necessidade revista:</strong> ${escape(d.revision)}</p><p><strong>Próxima verificação:</strong> ${escape(d.next)}</p></article>`;}).join('')}<h2>03 / A capacidade mudou</h2><h3>Plano A · limite de 10 créditos</h3>${b.planA?`<ul>${listIds(b.planA.selected)}</ul><p>Total: ${cost(b.planA.selected)} créditos.</p><p>${escape(b.planA.note)}</p><p><strong>Verificação:</strong> ${escape(b.planA.measure)}</p>`:'<p>Plano A não foi guardado.</p>'}<h3>${b.shock?'Plano B · limite de 6 créditos':'Seleção atual · corte ainda não aberto'}</h3><ul>${listIds(b.selected)}</ul><p>Total: ${cost(b.selected)} / ${b.shock?6:10} créditos.</p><p><strong>Prioridade e risco adiado:</strong> ${escape(b.note)}</p><p><strong>Verificação:</strong> ${escape(b.measure)}</p><h2>04 / Resposta ao imprevisto</h2>${responseReport(state.responses[active],scenarios[active])}${state.responses.map((r,i)=>i!==active&&(r.reason.trim()||r.reviewed)?responseReport(r,scenarios[i]):'').join('')}<p class="source">Casos e pessoas fictícios. Este arquivo registra decisões e hipóteses didáticas. Pode ser aberto sem internet.</p></main></html>`;
    const blob=new Blob([html],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');
    const team=norm(state.team||'dupla').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,45)||'dupla';
    link.href=url;link.download=`aula-12-plantao-ux-${team}-${new Date().toTimeString().slice(0,8).replace(/:/g,'')}.html`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('save-status').textContent=pending.length?'Entrega parcial exportada':'Entrega exportada';
  }
  render();save();
})();
