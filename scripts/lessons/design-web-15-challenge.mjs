// Laboratório autoral da aula 15. O módulo é incorporado ao HTML da oficina.
export const challengeMarkup = `
<style>
#challenge-lab{margin-top:34px;padding-top:30px;border-top:4px solid #144fbe;--lab-ink:#15384d;--lab-blue:#144fbe;--lab-line:#b9cadb}
#challenge-lab h2{font-size:30px;margin:0 0 14px}#challenge-lab h3{font-size:23px;margin:22px 0 12px}#challenge-lab h4{font-size:19px;margin:0 0 8px}
#challenge-lab .lab-intro{font-size:19px;color:#375675}#challenge-lab .lab-instructions{padding-left:24px}#challenge-lab .lab-instructions li{padding:4px 0}#challenge-lab .lab-source{background:#f0f5fc;padding:15px 20px}#challenge-lab .lab-source-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:14px}#challenge-lab .lab-source-item{border-top:1px solid #b9cadb;padding:12px 0;font-size:14px}#challenge-lab .lab-source-item strong{display:block;font-size:16px;margin-bottom:6px}
#challenge-lab .lab-menu-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}#challenge-lab .lab-menu-fields input{width:100%}#challenge-lab label{font-weight:650;display:block;margin:18px 0 8px}#challenge-lab label small{display:block;color:#506879;font-size:14px;font-weight:400;margin-top:5px}#challenge-lab input,#challenge-lab select,#challenge-lab textarea{width:100%;max-width:100%;background:white;color:#123354;font:inherit;border:1px solid #8ca3ba;border-radius:6px;min-height:44px;padding:10px 12px}#challenge-lab textarea{min-height:80px;resize:vertical}#challenge-lab button{font:inherit;min-height:44px;cursor:pointer}#challenge-lab button:disabled{cursor:default}
#challenge-lab .lab-profile{border-top:2px solid #b9cadb;margin-top:24px;padding-top:8px}#challenge-lab .lab-situation{background:#edf4fb;padding:14px 18px;border-left:3px solid #144fbe}#challenge-lab .lab-features{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}#challenge-lab .lab-cta-fields{display:grid;grid-template-columns:1fr 1fr;gap:16px}#challenge-lab .lab-change{background:#fff5dc;border-left:4px solid #a06a10;padding:18px 22px;margin:26px 0}#challenge-lab .lab-change p{margin-bottom:12px}#challenge-lab .lab-checkpoint{padding:14px 18px;background:#eef5ef;border-left:3px solid #387349;margin:18px 0}#challenge-lab .lab-preview-controls{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0 12px}#challenge-lab .lab-preview-controls button[aria-pressed="true"]{background:#123354;color:white}
#challenge-lab .lab-site{border:2px solid #8ca3ba;border-radius:10px;overflow:hidden;margin:14px 0 24px;color:#15384d;background:#fff}#challenge-lab .lab-site-header{padding:20px 24px;background:#183f49;color:white;display:flex;gap:16px;justify-content:space-between;align-items:center;flex-wrap:wrap}#challenge-lab .lab-brand{font:700 26px 'Trebuchet MS',system-ui,sans-serif}#challenge-lab .lab-site nav{display:flex;gap:8px;flex-wrap:wrap}#challenge-lab .lab-site nav button{color:white;background:transparent;border:1px solid #b1cbd0;padding:8px 12px;border-radius:6px}#challenge-lab .lab-site-hero{padding:28px 24px;background:#e9f3f1}#challenge-lab .lab-site-hero h3{font-size:32px;margin:0 0 16px;max-width:24ch;overflow-wrap:anywhere}#challenge-lab .lab-highlight-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:22px 0}#challenge-lab .lab-highlight{padding:14px;background:#fff;border-bottom:3px solid #79a6a1;min-width:0}#challenge-lab .lab-highlight p{font-size:15px;margin:8px 0 0}#challenge-lab .lab-highlight button{font-weight:700;text-align:left;background:transparent;border:0;padding:0;color:#15384d;text-decoration:underline;text-underline-offset:3px;min-height:32px}#challenge-lab .lab-site-cta{background:#144fbe;color:white;border:0;border-radius:6px;padding:12px 20px;font-weight:650}#challenge-lab .lab-site-section{padding:24px;border-top:1px solid #b9cadb;scroll-margin-top:18px}#challenge-lab .lab-site-section h3{margin:0 0 16px}#challenge-lab .lab-site-contents{display:grid;grid-template-columns:1fr 1fr;gap:18px}#challenge-lab .lab-site-content{border-top:1px solid #b9cadb;padding-top:12px;scroll-margin-top:18px}#challenge-lab .lab-site-content p{font-size:15px;margin:0}#challenge-lab .lab-alert{background:#fff0ca;color:#62420c;border-left:4px solid #a06a10;padding:16px 20px;margin:0 0 18px;font-weight:650;overflow-wrap:anywhere}#challenge-lab .lab-site-header+.lab-alert{margin:0;border-left:0;border-bottom:2px solid #a06a10}#challenge-lab .lab-placeholder{color:#63798b;font-style:italic}#challenge-lab .lab-preview-caption{font-size:14px;color:#506879}
#challenge-lab .lab-guest-task{padding:16px 20px;background:#edf4fb;border:2px solid #144fbe;margin:18px 0}#challenge-lab .lab-guest-task p{margin:0 0 10px}#challenge-lab .lab-test-row{border-top:1px solid #b9cadb;padding:18px 0}#challenge-lab .lab-test-row strong{display:block;font-size:18px}#challenge-lab .lab-test-row>p{margin:10px 0}#challenge-lab .lab-test-fields{display:grid;grid-template-columns:220px minmax(0,1fr);gap:18px;align-items:start}#challenge-lab .lab-test-fields label{margin:12px 0 6px}#challenge-lab #lab-feedback{margin-top:18px}#challenge-lab #lab-feedback ul{padding-left:24px}#challenge-lab .lab-summary-list{padding-left:22px}#challenge-lab .lab-summary-list li{padding:5px 0}#challenge-lab .lab-summary-table{width:100%;border-collapse:collapse}#challenge-lab .lab-summary-table td,#challenge-lab .lab-summary-table th{padding:12px;text-align:left;vertical-align:top;border-bottom:1px solid #b9cadb;overflow-wrap:anywhere}#challenge-lab .lab-summary-table th{width:24%}#challenge-lab .lab-local-status{font-size:14px;color:#375675;min-height:24px}#challenge-lab.is-visiting .lab-author,#challenge-lab.is-visiting .lab-guide{display:none!important}#challenge-lab.is-visiting .lab-preview-controls{display:none!important}#challenge-lab :focus-visible{outline:3px solid #b43137;outline-offset:3px}#challenge-lab [hidden]{display:none!important}
@media(max-width:800px){#challenge-lab .lab-source-grid,#challenge-lab .lab-features,#challenge-lab .lab-highlight-grid{grid-template-columns:1fr}#challenge-lab .lab-test-fields{grid-template-columns:1fr}#challenge-lab .lab-menu-fields{gap:8px}#challenge-lab .lab-menu-fields label{font-size:14px}#challenge-lab .lab-site-header{display:block}#challenge-lab .lab-site nav{margin-top:14px}}
@media(max-width:520px){#challenge-lab .lab-menu-fields,#challenge-lab .lab-cta-fields,#challenge-lab .lab-site-contents{grid-template-columns:1fr}#challenge-lab .lab-site-hero,#challenge-lab .lab-site-section,#challenge-lab .lab-site-header{padding:20px 16px}#challenge-lab .lab-summary-table th{width:32%}}
</style>
<div class="lab-guide"><h2>Festival Vira-Luz: duas primeiras telas</h2><p class="lab-intro">O mesmo festival. Duas pessoas com dúvidas diferentes. Sua dupla vai decidir o que aparece primeiro e testar se isso ajuda alguém a chegar e participar.</p><ol class="lab-instructions"><li>Leia os doze conteúdos. Eles já estão organizados; agora a decisão é o que priorizar.</li><li>Escreva três nomes de menu. Em <strong>Antes de sair</strong> e <strong>Já estou chegando</strong>, escreva um título, escolha três destaques e defina o botão principal e seu destino.</li><li>Outra dupla usa a prévia no mesmo computador nas duas primeiras situações. Encerre cada visita e registre como a pessoa encontrou e o que respondeu.</li><li>Receba a mudança do festival, escreva um aviso e decida o que fazer com o botão.</li><li>Teste a terceira situação na versão atual e escreva uma conclusão curta. Os dois testes anteriores continuam ligados à versão guardada antes do recado.</li></ol><details class="lab-source"><summary>Conteúdo do cliente: doze informações prontas</summary><p>Festival e dados fictícios. Os conteúdos abaixo são a fonte para sua criação; a página informa e orienta, sem inscrição ou pagamento online.</p><div id="lab-source" class="lab-source-grid"></div></details></div>
<div class="lab-author"><h3>Três entradas de menu</h3><p>Os conteúdos já estão em três seções. Troque os nomes por palavras que uma pessoa de fora reconheça.</p><div class="lab-menu-fields"><div><label for="lab-menu-0">Atividades</label><input id="lab-menu-0" data-lab-menu="0" maxlength="32" placeholder="Seu nome para a programação"></div><div><label for="lab-menu-1">Visita</label><input id="lab-menu-1" data-lab-menu="1" maxlength="32" placeholder="Seu nome para chegar e entrar"></div><div><label for="lab-menu-2">Apoio</label><input id="lab-menu-2" data-lab-menu="2" maxlength="32" placeholder="Seu nome para as informações de apoio"></div></div><div id="lab-profiles"></div>
<div class="lab-change"><button id="lab-reveal-change" type="button">Receber mudança do festival</button><p id="lab-change-hint">Primeiro, monte as duas primeiras telas. O recado será liberado quando títulos, destaques, botões e razões estiverem preenchidos.</p><div id="lab-change-fields" hidden><h3>O festival mudou. O visitante precisa perceber.</h3><p><strong>“As vagas da oficina de stop motion acabaram. A entrada principal foi fechada. O acesso lateral pela Rua Cedro continua aberto.”</strong></p><p>A prévia já recebeu os dados atualizados. A sua versão anterior ficou guardada para comparar.</p><label for="lab-notice">Escreva o aviso que a pessoa deve ler<small>Inclua o que mudou e o que ela pode fazer agora. Use os fatos do recado.</small></label><textarea id="lab-notice" data-lab-change="notice" maxlength="500"></textarea><label for="lab-notice-place">Onde o aviso deve aparecer?</label><select id="lab-notice-place" data-lab-change="placement"><option value="">Escolha a posição</option><option value="top">Antes do título, na primeira tela</option><option value="programacao">Junto da programação</option><option value="visita">Junto das informações de visita</option></select><label for="lab-button-decision">O que você decidiu sobre os botões principais?</label><select id="lab-button-decision" data-lab-change="buttonDecision"><option value="">Escolha uma decisão</option><option value="keep">Manter os botões e justificar</option><option value="edit">Alterar pelo menos um botão</option></select><label for="lab-change-reason">Por que sua decisão ajuda o visitante?<small>Se alterou, edite o texto ou o destino do botão no perfil correspondente. Se manteve, explique por que a promessa continua válida.</small></label><textarea id="lab-change-reason" data-lab-change="reason" maxlength="500"></textarea></div></div>
<details><summary>Preciso de uma pista para criar</summary><p><strong>Antes de sair:</strong> alguém quer escolher uma atividade, saber o horário e decidir se consegue participar. <strong>Já estou chegando:</strong> alguém precisa achar a entrada, entender a situação da chuva e encontrar ajuda.</p><p>“Veja tudo” é menos específico que “Ver a programação”. O botão deve levar a algo que existe na página. Um aviso sobre vagas esgotadas precisa permitir entender o que fazer em seguida.</p><p>Você pode manter um destaque nas duas versões, mas as prioridades precisam mudar em pelo menos um ponto. Não há uma única combinação correta.</p></details></div>
<div class="lab-preview-controls"><button type="button" data-lab-profile="plan" aria-pressed="true">Antes de sair</button><button type="button" data-lab-profile="arrival" aria-pressed="false">Já estou chegando</button><button type="button" data-lab-before hidden>Comparar com a versão anterior</button></div><div id="lab-guest-task" class="lab-guest-task" hidden></div><p id="lab-preview-caption" class="lab-preview-caption">Prévia de uma página real: o menu e o botão levam às seções ou informações abaixo.</p><div id="lab-preview"></div><p id="lab-local-status" class="lab-local-status" role="status"></p>
<div class="lab-author"><h3>Um colega testa. Você observa.</h3><p>Em cada situação, passe o teclado ao visitante e fique em silêncio. Encerre a visita para guardá-la. Depois registre por onde a pessoa encontrou a resposta e o que conseguiu explicar. Faça as duas primeiras situações antes de receber o recado; a terceira vem depois.</p><div id="lab-tests"></div><label for="lab-conclusion">O que você aprendeu comparando as telas e a mudança?<small>Uma ou duas frases: uma prioridade que ajudou e uma decisão que você manteria ou mudaria depois do teste.</small></label><textarea id="lab-conclusion" data-lab-conclusion maxlength="600"></textarea><button id="lab-check" type="button" class="primary">Conferir o desafio do festival</button><div id="lab-feedback" role="status"></div><p class="lab-checkpoint">Pronto quando: duas primeiras telas com prioridades diferentes, mudança do cliente tratada, três visitas registradas nas versões correspondentes e uma conclusão curta. A conferência automática aponta campos; vocês avaliam se os nomes e as escolhas ajudam de verdade.</p><p><a href="#free-studio" data-open-studio>Concluiu? Abra a continuação: sua dupla é a agência.</a></p></div>
`;

export function challengeRuntime(){
  'use strict';
  const groupIds=['programacao','visita','apoio'];
  const profileIds=['plan','arrival'];
  const testIds=['plan','arrival','change'];
  const source=[
    {id:'quando',group:'visita',title:'Quando acontece',text:'Sábado, das 17h às 22h.'},
    {id:'entrada',group:'visita',title:'Entrada gratuita',text:'Recepção e entrada abertas às 16h30. Entrada gratuita, sem retirada de ingresso. As atividades começam às 17h; a oficina tem limite próprio de vagas.'},
    {id:'oficina',group:'programacao',title:'Oficina de stop motion',text:'Às 17h, duração de 45 minutos. São 12 vagas; inscrição no balcão até 16h50.'},
    {id:'curtas',group:'programacao',title:'Sessão de curtas',text:'Às 19h, duração de 35 minutos. Classificação livre.'},
    {id:'show',group:'programacao',title:'Show de encerramento',text:'Às 20h30, duração de 40 minutos.'},
    {id:'exposicao',group:'programacao',title:'Exposição fotográfica',text:'Visitação contínua, das 17h às 22h, no foyer.'},
    {id:'local',group:'visita',title:'Onde acontece',text:'Galpão 3, Praça Horizonte, 125. Endereço fictício.'},
    {id:'acesso',group:'visita',title:'Acesso sem degraus',text:'Entrada lateral, pela Rua Cedro.'},
    {id:'chuva',group:'visita',title:'E se chover?',text:'As atividades acontecem dentro do galpão, mesmo com chuva.'},
    {id:'alimentacao',group:'apoio',title:'Cantina',text:'Aberta das 17h às 21h. Pagamento no balcão.'},
    {id:'capacidade',group:'apoio',title:'Capacidade do espaço',text:'Até 80 pessoas ao mesmo tempo. A equipe orienta a entrada.'},
    {id:'ajuda',group:'apoio',title:'Onde pedir ajuda',text:'Procure a equipe identificada no hall de entrada.'}
  ];
  const testInfo={
    plan:{title:'Escolher antes de sair',profile:'plan',question:'Consigo chegar às 17h e preciso sair às 18h. O que consigo fazer nesse tempo?'},
    arrival:{title:'Chegar com chuva',profile:'arrival',question:'Está chovendo. Por onde entro sem degraus e onde posso pedir ajuda?'},
    change:{title:'Entender a mudança',profile:'arrival',question:'A oficina lotou e a entrada principal fechou. Qual entrada uso e que outra atividade posso escolher?'}
  };
  const profileInfo={plan:{title:'Antes de sair',description:'Uma pessoa tem uma hora livre e precisa decidir quando ir e o que consegue fazer.'},arrival:{title:'Já estou chegando',description:'Uma pessoa está na chuva e quer saber por onde entrar e onde encontrar ajuda.'}};
  const emptyProfile=()=>({title:'',features:['','',''],ctaLabel:'',ctaTarget:'',reason:''});
  function initial(){return {api:1,menus:['','',''],profiles:{plan:emptyProfile(),arrival:emptyProfile()},change:{revealed:false,before:null,notice:'',placement:'',buttonDecision:'',reason:''},tests:{plan:{route:'',answer:'',signature:''},arrival:{route:'',answer:'',signature:''},change:{route:'',answer:'',signature:''}},conclusion:''};}
  const isObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  function validate(value){
    if(!isObject(value)||value.api!==1)throw Error('Festival: formato inválido.');
    const text=(v,max)=>{if(typeof v!=='string'||v.length>max)throw Error('Festival: texto inválido.');return v;};
    const choice=(v,values)=>{if(!values.includes(v))throw Error('Festival: opção inválida.');return v;};
    const menu=v=>{if(!Array.isArray(v)||v.length!==3)throw Error('Festival: menu inválido.');return v.map(x=>text(x,32));};
    const profile=v=>{if(!isObject(v)||!Array.isArray(v.features)||v.features.length!==3)throw Error('Festival: perfil inválido.');return {title:text(v.title,90),features:v.features.map(x=>choice(x,['',...source.map(c=>c.id)])),ctaLabel:text(v.ctaLabel,48),ctaTarget:choice(v.ctaTarget,['',...groupIds,...source.map(c=>c.id)]),reason:text(v.reason,500)};};
    const profiles=v=>{if(!isObject(v))throw Error('Festival: perfis ausentes.');return {plan:profile(v.plan),arrival:profile(v.arrival)};};
    if(!isObject(value.change)||typeof value.change.revealed!=='boolean'||!isObject(value.tests))throw Error('Festival: registros inválidos.');
    const c=value.change;
    let before=null;
    if(c.before!==null){if(!isObject(c.before))throw Error('Festival: versão anterior inválida.');before={menus:menu(c.before.menus),profiles:profiles(c.before.profiles)};}
    if(c.revealed&&!before)throw Error('Festival: referência anterior ausente.');
    const tests={};
    for(const id of testIds){if(!isObject(value.tests[id]))throw Error('Festival: teste ausente.');tests[id]={route:choice(value.tests[id].route,['','top','menu','help']),answer:text(value.tests[id].answer,400),signature:text(value.tests[id].signature??'',12000)};}
    return {api:1,menus:menu(value.menus),profiles:profiles(value.profiles),change:{revealed:c.revealed,before,notice:text(c.notice,500),placement:choice(c.placement,['','top','programacao','visita']),buttonDecision:choice(c.buttonDecision,['','keep','edit']),reason:text(c.reason,500)},tests,conclusion:text(value.conclusion??'',600)};
  }
  function mount({host,getState,onChange}){
    if(!host||typeof getState!=='function'||typeof onChange!=='function')throw Error('Festival: integração incompleta.');
    const $=id=>host.querySelector('#'+id);
    const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
    let previewProfile='plan',showBefore=false,visiting=false,activeTest='',activeSignature='';
    const groupName=(lab,id)=>lab.menus[groupIds.indexOf(id)].trim()||['Programação','Visita','Apoio'][groupIds.indexOf(id)];
    const changed=(update,refresh=true)=>{update(getState());onChange();if(refresh)renderPreview();refreshStage();$('lab-feedback').textContent='';};
    const say=message=>{$('lab-local-status').textContent=message;};
    const options=()=>'<option value="">Escolha um conteúdo</option>'+source.map(c=>`<option value="${c.id}">${esc(c.title)}</option>`).join('');
    const destinations=()=>'<option value="">Escolha o destino</option>'+groupIds.map((id,i)=>`<option value="${id}">Seção: ${['Programação','Visita','Apoio'][i]}</option>`).join('')+source.map(c=>`<option value="${c.id}">Informação: ${esc(c.title)}</option>`).join('');
    $('lab-source').innerHTML=source.map(c=>`<div class="lab-source-item"><strong>${esc(c.title)}</strong>${esc(c.text)}</div>`).join('');
    $('lab-profiles').innerHTML=profileIds.map(id=>`<section class="lab-profile"><h3>${profileInfo[id].title}</h3><p class="lab-situation">${profileInfo[id].description}</p><label for="lab-${id}-title">Título que a pessoa deve ler primeiro<small>Escreva uma frase que ajude a situação, usando o conteúdo do cliente.</small></label><input id="lab-${id}-title" data-lab-profile-field="title" data-lab-profile-id="${id}" maxlength="90"><div class="lab-features">${[0,1,2].map(i=>`<div><label for="lab-${id}-feature-${i}">Destaque ${i+1}</label><select id="lab-${id}-feature-${i}" data-lab-feature="${i}" data-lab-profile-id="${id}">${options()}</select></div>`).join('')}</div><div class="lab-cta-fields"><div><label for="lab-${id}-cta">Texto do botão principal</label><input id="lab-${id}-cta" data-lab-profile-field="ctaLabel" data-lab-profile-id="${id}" maxlength="48" placeholder="Um verbo e uma ação clara"></div><div><label for="lab-${id}-target">Para onde o botão leva?</label><select id="lab-${id}-target" data-lab-profile-field="ctaTarget" data-lab-profile-id="${id}">${destinations()}</select></div></div><label for="lab-${id}-reason">Por que essas prioridades ajudam essa pessoa?<small>Relacione pelo menos um destaque e o botão à situação do visitante.</small></label><textarea id="lab-${id}-reason" data-lab-profile-field="reason" data-lab-profile-id="${id}" maxlength="500"></textarea></section>`).join('');
    $('lab-tests').innerHTML=testIds.map(id=>`<div class="lab-test-row"><strong>${esc(testInfo[id].title)}</strong><p>${esc(testInfo[id].question)}</p><button type="button" data-lab-test="${id}">Testar esta situação</button><p id="lab-test-${id}-state" class="lab-test-state"></p><div class="lab-test-fields"><div><label for="lab-test-${id}-route">Por onde encontrou?</label><select id="lab-test-${id}-route" data-lab-test-id="${id}" data-lab-test-field="route"><option value="">Registre o observado</option><option value="top">Destaque da primeira tela</option><option value="menu">Menu ou conteúdo abaixo</option><option value="help">Precisou de ajuda</option></select></div><div><label for="lab-test-${id}-answer">O que o visitante respondeu?<small>Uma frase. Se não encontrou, registre a dúvida; depois ajuste e teste novamente.</small></label><textarea id="lab-test-${id}-answer" data-lab-test-id="${id}" data-lab-test-field="answer" maxlength="400"></textarea></div></div></div>`).join('');
    function productionIssues(lab){
      const problems=[];
      if(lab.menus.some(x=>!x.trim()))problems.push('Escreva os três nomes de menu.');
      if(new Set(lab.menus.map(x=>x.trim().toLocaleLowerCase('pt-BR'))).size!==3)problems.push('Dê nomes diferentes às três entradas do menu.');
      for(const id of profileIds){const p=lab.profiles[id],label=profileInfo[id].title;if(!p.title.trim())problems.push(label+': escreva o título.');if(p.features.some(x=>!x)||new Set(p.features).size!==3)problems.push(label+': escolha três destaques diferentes.');if(!p.ctaLabel.trim()||!p.ctaTarget)problems.push(label+': defina o texto e o destino do botão.');if(!p.reason.trim())problems.push(label+': explique a prioridade.');}
      const a=lab.profiles.plan,b=lab.profiles.arrival;
      if(a.features.every((x,i)=>x===b.features[i])&&a.ctaLabel.trim()===b.ctaLabel.trim()&&a.ctaTarget===b.ctaTarget)problems.push('Mude pelo menos um destaque ou o botão entre as duas situações; só trocar o título não muda a prioridade.');
      return problems;
    }
    function testSignature(id,lab){
      const view=id!=='change'&&lab.change.revealed?lab.change.before:lab;
      const profile=view.profiles[testInfo[id].profile];
      return JSON.stringify({menus:view.menus,profile:{title:profile.title,features:profile.features,ctaLabel:profile.ctaLabel,ctaTarget:profile.ctaTarget},stage:id==='change'?{notice:lab.change.notice,placement:lab.change.placement}:'before'});
    }
    function visitIssues(id,lab){
      const test=lab.tests[id],problems=[],label=testInfo[id].title;
      if(!test.signature)problems.push('Faça a visita e use Encerrar visita: '+label+'.');
      else if(test.signature!==testSignature(id,lab))problems.push('A versão usada mudou. Repita a visita: '+label+'.');
      if(!test.route||!test.answer.trim())problems.push('Registre o caminho observado e a resposta: '+label+'.');
      return problems;
    }
    function issues(){
      const lab=getState(),problems=productionIssues(lab),c=lab.change;
      if(!c.revealed)problems.push('Receba a mudança do festival depois de criar as duas telas.');
      else{
        if(!c.notice.trim())problems.push('Escreva o aviso sobre a mudança.');
        if(!c.placement)problems.push('Escolha onde o aviso aparece.');
        if(!c.buttonDecision||!c.reason.trim())problems.push('Registre a decisão sobre os botões e seu motivo.');
        if(c.buttonDecision==='edit'&&!profileIds.some(id=>lab.profiles[id].ctaLabel!==c.before.profiles[id].ctaLabel||lab.profiles[id].ctaTarget!==c.before.profiles[id].ctaTarget))problems.push('Você escolheu alterar um botão: edite o texto ou o destino de pelo menos um perfil. Se decidiu manter, selecione essa opção.');
      }
      for(const id of testIds)problems.push(...visitIssues(id,lab));
      if(!lab.conclusion.trim())problems.push('Escreva a conclusão curta sobre as prioridades e o teste.');
      return problems;
    }
    function contentText(card,updated){
      if(updated&&card.id==='oficina')return 'Às 17h, duração de 45 minutos. As 12 vagas já foram preenchidas; não há novas inscrições. Consulte as outras atividades.';
      if(updated&&card.id==='local')return 'Galpão 3, Praça Horizonte, 125. A entrada principal está fechada; use o acesso lateral pela Rua Cedro. Endereço fictício.';
      return card.text;
    }
    function renderPreview(){
      const lab=getState(),view=showBefore&&lab.change.before?lab.change.before:lab,p=view.profiles[previewProfile],updated=lab.change.revealed&&!showBefore;
      const notice=updated&&lab.change.notice.trim()?`<div class="lab-alert">${esc(lab.change.notice)}</div>`:'';
      const highlight=id=>{const card=source.find(c=>c.id===id);return card?`<article class="lab-highlight"><button type="button" data-lab-go="${card.id}">${esc(card.title)}</button><p>${esc(contentText(card,updated))}</p></article>`:'<div class="lab-highlight lab-placeholder">Escolha um destaque no editor.</div>';};
      $('lab-preview').innerHTML=`<div class="lab-site"><div class="lab-site-header"><span class="lab-brand">Festival Vira-Luz</span><nav aria-label="Menu do Festival Vira-Luz">${groupIds.map(id=>`<button type="button" data-lab-go="${id}">${esc(groupName(view,id))}</button>`).join('')}</nav></div>${notice&&lab.change.placement==='top'?notice:''}<div class="lab-site-hero"><h3>${esc(p.title.trim())||'<span class="lab-placeholder">Seu título aparece aqui.</span>'}</h3><div class="lab-highlight-grid">${p.features.map(highlight).join('')}</div><button type="button" class="lab-site-cta" data-lab-go="${esc(p.ctaTarget)}" ${!p.ctaTarget?'disabled':''}>${esc(p.ctaLabel.trim())||'Defina o botão principal'}</button></div>${groupIds.map(id=>`<section class="lab-site-section" id="lab-section-${id}" tabindex="-1"><h3>${esc(groupName(view,id))}</h3>${notice&&lab.change.placement===id?notice:''}<div class="lab-site-contents">${source.filter(c=>c.group===id).map(c=>`<article class="lab-site-content" id="lab-content-${c.id}" tabindex="-1"><h4>${esc(c.title)}</h4><p>${esc(contentText(c,updated))}</p></article>`).join('')}</div></section>`).join('')}</div>`;
      host.querySelectorAll('[data-lab-profile]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.labProfile===previewProfile)));
      const before=host.querySelector('[data-lab-before]');before.hidden=!lab.change.revealed;before.textContent=showBefore?'Voltar à versão atual':'Comparar com a versão anterior';
      $('lab-preview-caption').textContent=(showBefore?'Versão guardada antes do recado. ':'Versão atual. ')+profileInfo[previewProfile].title+'. O menu e o botão levam às informações desta mesma página.';
    }
    function refreshStage(){
      const lab=getState(),pending=[...productionIssues(lab),...visitIssues('plan',lab),...visitIssues('arrival',lab)],ready=pending.length===0;
      $('lab-reveal-change').disabled=lab.change.revealed||!ready;
      $('lab-reveal-change').textContent=lab.change.revealed?'Mudança recebida; versão anterior guardada':'Receber mudança do festival';
      $('lab-change-hint').hidden=lab.change.revealed;$('lab-change-hint').textContent=ready?'As duas primeiras visitas estão registradas. Você já pode receber o novo recado.':'Para liberar o recado: '+pending.join(' ');$('lab-change-fields').hidden=!lab.change.revealed;
      const changeTest=host.querySelector('[data-lab-test="change"]');changeTest.disabled=!lab.change.revealed;changeTest.title=lab.change.revealed?'':'Receba a mudança do festival antes desta situação.';
      for(const id of testIds){const test=lab.tests[id];$('lab-test-'+id+'-state').textContent=!test.signature?'Visita ainda não registrada.':test.signature!==testSignature(id,lab)?'A versão foi alterada. Repita esta visita; seu registro anterior foi mantido.':'Visita registrada. '+(id==='change'?'Versão atual com a mudança.':'Versão anterior ao recado.');}
    }
    function render(){
      const lab=getState();
      const set=(element,value)=>{if(element&&element!==document.activeElement&&element.value!==value)element.value=value;};
      lab.menus.forEach((value,i)=>set($('lab-menu-'+i),value));
      for(const id of profileIds){const p=lab.profiles[id];set($('lab-'+id+'-title'),p.title);set($('lab-'+id+'-cta'),p.ctaLabel);set($('lab-'+id+'-target'),p.ctaTarget);set($('lab-'+id+'-reason'),p.reason);p.features.forEach((value,i)=>set($('lab-'+id+'-feature-'+i),value));}
      set($('lab-notice'),lab.change.notice);set($('lab-notice-place'),lab.change.placement);set($('lab-button-decision'),lab.change.buttonDecision);set($('lab-change-reason'),lab.change.reason);
      for(const id of testIds){set($('lab-test-'+id+'-route'),lab.tests[id].route);set($('lab-test-'+id+'-answer'),lab.tests[id].answer);}
      set($('lab-conclusion'),lab.conclusion);
      if(!lab.change.revealed)showBefore=false;
      refreshStage();renderPreview();
    }
    function summaryHtml(){
      const lab=getState(),c=lab.change,routeNames={top:'Destaque da primeira tela',menu:'Menu ou conteúdo abaixo',help:'Precisou de ajuda'};
      return `<h3>Festival Vira-Luz</h3><p><strong>Menu:</strong> ${lab.menus.map(x=>esc(x)||'(a preencher)').join(' / ')}</p>${profileIds.map(id=>{const p=lab.profiles[id];return `<p><strong>${profileInfo[id].title}:</strong> ${esc(p.title)||'(título a preencher)'}</p><ul class="lab-summary-list"><li>Destaques: ${p.features.map(x=>esc(source.find(c=>c.id===x)?.title||'(a escolher)')).join(', ')}.</li><li>Botão: ${esc(p.ctaLabel)||'(a preencher)'}; destino: ${esc(source.find(s=>s.id===p.ctaTarget)?.title||(groupIds.includes(p.ctaTarget)?groupName(lab,p.ctaTarget):'(a escolher)'))}.</li><li>Razão: ${esc(p.reason)||'(a preencher)'}</li></ul>`;}).join('')}<p><strong>Recado:</strong> ${c.revealed?'Recebido; versão anterior preservada.':'Ainda não recebido.'}</p><p><strong>Aviso:</strong> ${esc(c.notice)||'(a preencher)'}</p><p><strong>Decisão sobre botões:</strong> ${c.buttonDecision==='edit'?'Alterar':c.buttonDecision==='keep'?'Manter':'(a escolher)'}. ${esc(c.reason)}</p><table class="lab-summary-table"><tbody>${testIds.map(id=>`<tr><th>${esc(testInfo[id].title)}</th><td>${esc(routeNames[lab.tests[id].route]||'(caminho a registrar)')}<br>${esc(lab.tests[id].answer)||'(resposta a registrar)'}</td></tr>`).join('')}</tbody></table><p><strong>Conclusão:</strong> ${esc(lab.conclusion)||'(a preencher)'}</p>`;
    }
    function handleField(event){
      const target=event.target;
      if(target.hasAttribute('data-lab-conclusion')){changed(lab=>lab.conclusion=target.value,false);return;}
      if(target.dataset.labMenu!==undefined){changed(lab=>lab.menus[Number(target.dataset.labMenu)]=target.value);return;}
      if(target.dataset.labFeature!==undefined){changed(lab=>lab.profiles[target.dataset.labProfileId].features[Number(target.dataset.labFeature)]=target.value);return;}
      if(target.dataset.labProfileField){changed(lab=>lab.profiles[target.dataset.labProfileId][target.dataset.labProfileField]=target.value);return;}
      if(target.dataset.labChange){changed(lab=>lab.change[target.dataset.labChange]=target.value);return;}
      if(target.dataset.labTestField){changed(lab=>lab.tests[target.dataset.labTestId][target.dataset.labTestField]=target.value,false);}
    }
    host.addEventListener('input',event=>{if(event.target.tagName!=='SELECT')handleField(event);});
    host.addEventListener('change',event=>{if(event.target.tagName==='SELECT')handleField(event);});
    host.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button||!host.contains(button))return;
      if(button.id==='lab-reveal-change'){
        const lab=getState();if(lab.change.revealed||productionIssues(lab).length||visitIssues('plan',lab).length||visitIssues('arrival',lab).length)return;
        changed(value=>{value.change.before=JSON.parse(JSON.stringify({menus:value.menus,profiles:value.profiles}));value.change.revealed=true;});
        say('Recado recebido. Escreva o aviso, escolha a posição e reveja a promessa dos botões.');$('lab-notice').focus();return;
      }
      if(button.dataset.labProfile){previewProfile=button.dataset.labProfile;renderPreview();return;}
      if(button.hasAttribute('data-lab-before')){showBefore=!showBefore;renderPreview();return;}
      if(button.dataset.labGo!==undefined){
        const id=button.dataset.labGo;if(!id)return;
        const destination=$(groupIds.includes(id)?'lab-section-'+id:'lab-content-'+id);
        if(destination){destination.scrollIntoView({block:'start',behavior:'auto'});destination.focus();say('Destino: '+(source.find(c=>c.id===id)?.title||groupName(getState(),id))+'.');}return;
      }
      if(button.dataset.labTest){
        const id=button.dataset.labTest;if(id==='change'&&!getState().change.revealed)return;
        activeTest=id;previewProfile=testInfo[id].profile;showBefore=id!=='change'&&getState().change.revealed;activeSignature=testSignature(id,getState());visiting=true;host.classList.add('is-visiting');
        $('lab-guest-task').hidden=false;$('lab-guest-task').innerHTML=`<p><strong>${esc(testInfo[id].title)} · ${id==='change'?'versão atual com a mudança':'antes do recado'}</strong></p><p>${esc(testInfo[id].question)}</p><p>O visitante usa a página. O autor observa sem explicar.</p><button type="button" data-lab-exit>Encerrar visita e registrar</button>`;
        renderPreview();$('lab-guest-task').tabIndex=-1;$('lab-guest-task').focus();$('lab-guest-task').scrollIntoView({block:'start',behavior:'auto'});return;
      }
      if(button.hasAttribute('data-lab-exit')){
        visiting=false;host.classList.remove('is-visiting');$('lab-guest-task').hidden=true;
        changed(lab=>lab.tests[activeTest].signature=activeSignature,false);
        const field=$('lab-test-'+activeTest+'-route');field.focus();field.scrollIntoView({block:'center',behavior:'auto'});say('Registre por onde a pessoa encontrou e a resposta que deu.');return;
      }
      if(button.id==='lab-check'){
        const problems=issues();$('lab-feedback').innerHTML=problems.length?`<p>Falta conferir:</p><ul>${problems.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<div class="lab-checkpoint"><strong>Registro do festival completo.</strong><p>Compare o que a pessoa encontrou com o objetivo de cada tela. Campos completos não garantem escolhas claras.</p></div>';
      }
    });
    return {render,issues,summaryHtml};
  }
  window.SENAI_DW15_CHALLENGE={initial,validate,mount};
}
