// Orientação interativa para a rodada final. Não altera nem substitui o rascunho.
function initRemix() {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('prototype')) return;
    const root = document.querySelector('#remix');
    if (!root) return;
    const missions = [
      {title: 'Dê cara de aplicativo', time: '10 min', steps: ['Dê um nome ao serviço e escolha um dos três estilos.', 'Experimente os cantos dos botões. Compare as opções na prévia.', 'Confira no modo celular: título, campo e ação principal precisam caber.'], proof: 'Mostre a mesma tela com duas aparências e escolha a mais clara.'},
      {title: 'Faça um formulário funcionar', time: '15 min', steps: ['Selecione a tela Início. Crie um campo com rótulo e marque Obrigatório. Use um apelido fictício.', 'Tente continuar vazio: o erro precisa aparecer na própria tela. Depois preencha e siga.', 'Na revisão ou na conclusão, coloque {{resposta}} no texto. Confira se aparece o que você digitou; acrescente outro campo só se ele ajudar o percurso.'], proof: 'Vazio bloqueia o avanço e orienta; preenchido segue; a conclusão mostra a resposta digitada.'},
      {title: 'A rede caiu. E agora?', time: '15 min', steps: ['Se precisar, crie a tela 7, Erro, com o botão Tentar de novo voltando à Revisão. A tela 8 fica livre só se fizer falta.', 'Na Revisão, abra Carregamento e falha dos botões. No botão de confirmação, marque Aguardar, mantenha Vai para → Concluído e escolha Erro em Destino se falhar.', 'No Criador, ative Simular falha: confirme e cancele a espera; confirme de novo e aguarde chegar a Erro. Desligue a falha, use Tentar de novo → Revisão, confirme e conclua.'], proof: 'No Criador: carregamento → falha → retorno à Revisão → conclusão. No protótipo exportado, confira a espera e o caminho normal.'},
      {title: 'Speedrun de usabilidade', time: '5 min', steps: ['Use Recomeçar teste (não apaga as telas) e inicie uma rodada de 60 segundos.', 'Conclua um pedido em até 8 cliques, com revisão da escolha. Veja o contador e o percurso.', 'Se ficar travado, corrija o ponto e repita. Ao terminar, salve o rascunho e exporte.'], proof: 'Conclua, leia a resposta final e mostre o percurso. O relógio mede a rodada, não aprova o trabalho.'}
    ];
    let selected = 0, timer = null, deadline = 0;
    const $ = selector => root.querySelector(selector);
    function choose(index) {
      selected = index;
      for (const [id, step] of [['appearance-controls', 0], ['field-controls', 1], ['wait-controls', 2]]) { const detail = document.getElementById(id); if (detail) detail.open = index === step; }
      const mission = missions[index];
      $('#remix-title').textContent = mission.title;
      $('#remix-duration').textContent = mission.time;
      $('#remix-steps').replaceChildren(...mission.steps.map(text => {
        const li = document.createElement('li'); li.textContent = text; return li;
      }));
      $('#remix-proof').textContent = mission.proof;
      root.querySelectorAll('[data-mission]').forEach(button => {
        const active = Number(button.dataset.mission) === index;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      $('#remix-speed').hidden = index !== 3;
    }
    root.querySelectorAll('[data-mission]').forEach(button => button.addEventListener('click', () => choose(Number(button.dataset.mission))));
    const scenarios = [
      'Pessoa com pressa: conclua em até 8 cliques, passando pela revisão.',
      'Só teclado: percorra o caminho com Tab e Enter. O foco precisa ficar visível.',
      'Mudou de ideia: troque a opção na revisão e confirme a nova escolha.',
      'Conexão falhou: encontre uma saída, tente novamente e conclua.',
      'Toque repetido: durante a espera, tente confirmar de novo. Não pode duplicar a ação.',
      'Pedido incompleto: envie o campo vazio. Corrija seguindo somente a orientação da tela.'
    ];
    let previous = -1;
    $('#remix-draw').addEventListener('click', () => {
      let index = Math.floor(Math.random() * (scenarios.length - 1));
      if (index >= previous && previous >= 0) index++;
      previous = index;
      $('#remix-client').textContent = scenarios[index];
      $('#remix-client').hidden = false;
    });
    function stop() { clearInterval(timer); timer = null; $('#remix-run').disabled = false; }
    function tick() {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      const message = remaining ? remaining + ' s restantes' : 'Tempo encerrado. Confira onde chegou e o que precisa melhorar.';
      if ($('#remix-clock').textContent !== message) $('#remix-clock').textContent = message;
      if (!remaining) stop();
    }
    $('#remix-run').addEventListener('click', () => {
      stop(); deadline = Date.now() + 60000; $('#remix-run').disabled = true;
      tick(); timer = setInterval(tick, 250);
    });
    $('#remix-stop').addEventListener('click', () => {
      if (timer) { stop(); $('#remix-clock').textContent = 'Rodada encerrada. Confira os cliques e o percurso na prévia.'; }
      else $('#remix-clock').textContent = 'Inicie uma rodada para medir o percurso.';
    });
    choose(selected);
  });
}

export function remixPanel() {
  return `<style>
.remix{margin:0 0 20px;padding:16px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.remix summary{font-weight:700;font-size:19px;cursor:pointer}.remix summary small{font-weight:400;font-size:14px;color:var(--muted);margin-left:8px}.remix-tabs{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0}.remix-tabs button{font-size:14px}.remix-tabs button.active{background:var(--ink);color:var(--paper)}.remix-heading{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}.remix-heading h3{margin:0;font-size:18px}.remix-duration{font-size:13px;color:var(--muted)}.remix ol{margin:8px 0 10px;padding-left:22px;max-width:86ch}.remix li{margin:4px 0}.remix-proof{font-weight:700;margin:8px 0;max-width:86ch}.remix-tools{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.remix-client{margin:8px 0 0;font-weight:700;color:var(--ink)}.remix-speed{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:12px 0}.remix-speed[hidden],.remix-client[hidden]{display:none}.remix-clock{font-variant-numeric:tabular-nums}.remix button:disabled{opacity:.55;cursor:default;transform:none;box-shadow:none}@media(max-width:780px){.remix summary small{display:block;margin:5px 0 0}.remix-tabs{display:grid;grid-template-columns:1fr 1fr}.remix-tabs button{text-align:left}.remix{padding:14px 0}.remix ol{font-size:15px}}
</style><details id="remix" class="remix author-only" open><summary>21:20 · Transforme seu fluxo em aplicativo <small>Continue no seu projeto atual.</small></summary><nav class="remix-tabs" aria-label="Missões da rodada final"><button type="button" data-mission="0">1. Aparência</button><button type="button" data-mission="1">2. Formulário</button><button type="button" data-mission="2">3. Rede caiu</button><button type="button" data-mission="3">4. Speedrun</button></nav><div class="remix-heading"><h3 id="remix-title"></h3><span id="remix-duration" class="remix-duration"></span></div><ol id="remix-steps"></ol><p id="remix-proof" class="remix-proof"></p><div id="remix-speed" class="remix-speed" hidden><button id="remix-run" type="button" class="primary">Iniciar rodada de 60 s</button><button id="remix-stop" type="button">Encerrar rodada</button><span id="remix-clock" class="remix-clock" aria-live="polite">Use Recomeçar teste antes de iniciar.</span></div><div class="remix-tools"><button id="remix-draw" class="ghost" type="button">Sortear pessoa para o teste</button><span>Depois das quatro missões, resolva um imprevisto.</span></div><p id="remix-client" class="remix-client" aria-live="polite" hidden></p></details><script>(${initRemix.toString()})();</script>`;
}
