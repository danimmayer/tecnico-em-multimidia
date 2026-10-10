// Esta função é serializada no HTML; não pode depender de imports no navegador.
export function flowRuntime(AUTHOR, initial, validate) {
  const STORAGE = 'senai-design-web-fluxo-v1';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const briefs = {
    reserva: {inicio: ['Reserve seu horário', 'Escolha uma opção para começar sua reserva.'], escolha: ['Qual horário funciona para você?', 'Escolha uma opção. Sua escolha aparecerá na revisão.'], buttons: ['Terça, 14h', 'Quinta, 19h']},
    emprestimo: {inicio: ['Pegue um equipamento', 'Escolha o que você quer reservar para usar.'], escolha: ['O que você precisa?', 'A escolha aparecerá antes da confirmação.'], buttons: ['Câmera DSLR', 'Tripé com luz']},
    lanche: {inicio: ['Faça seu pedido', 'Escolha uma opção para o intervalo.'], escolha: ['O que você quer pedir?', 'Revise antes de confirmar o pedido.'], buttons: ['Sanduíche natural', 'Suco com pão de queijo']}
  };
  function safe(value) { try { return validate(value); } catch { return null; } }
  let stored = null;
  if (AUTHOR) try { stored = JSON.parse(localStorage.getItem(STORAGE) || 'null'); } catch {}
  let project = safe(window.__FLOW_SEED__) || safe(stored) || safe(initial);
  const answers = new Map();
  let active = 'inicio', preview = 'inicio', choice = '', response = '', clicks = 0, trace = ['inicio'], pending = null;
  function defaults() { project.appearance ||= {name: 'Meu app', theme: 'studio', roundness: 12}; }
  defaults();
  const byId = id => project.screens.find(screen => screen.id === id);
  const current = () => byId(active) || project.screens[0];
  function status(message, bad = false) {
    $('#flow-status').textContent = message;
    $('#flow-status').className = 'saved' + (bad ? ' bad' : '');
  }
  function persist(message) {
    if (AUTHOR) {
      const heading = document.createElement('h4'); heading.textContent = 'Conexões';
      const reminder = document.createElement('p'); reminder.textContent = 'Projeto alterado. Confira as conexões novamente.';
      $('#audit').replaceChildren(heading, reminder);
    }
    if (AUTHOR) try { localStorage.setItem(STORAGE, JSON.stringify(project)); } catch {
      status('O navegador não guardou o rascunho. Use Salvar rascunho para baixar seu trabalho.', true); return;
    }
    status(message || 'Alterações guardadas neste navegador. Use Salvar rascunho para baixar o arquivo.');
  }
  function note(message = '', kind = '') {
    $('#preview-note').textContent = message;
    $('#preview-note').className = 'notice' + (kind ? ' ' + kind : '');
  }
  function clearWait() {
    if (pending) { clearTimeout(pending.timer); note(); }
    pending = null;
    $('#flow-preview').setAttribute('aria-busy', 'false');
  }
  function text(value) {
    return String(value || '').replaceAll('{{escolha}}', choice || 'ainda não escolheu uma opção').replaceAll('{{resposta}}', response || 'ainda não respondeu');
  }
  function updateTrace() {
    $('#flow-trace').textContent = clicks + ' cliques · percurso: ' + trace.map(id => byId(id)?.name || id).join(' → ');
  }
  function options(select, value) {
    select.replaceChildren(new Option('Sem destino', ''), ...project.screens.map(screen => new Option(screen.name, screen.id)));
    select.value = value || '';
  }
  function renderNav() {
    $('#screen-nav').replaceChildren(...project.screens.map(screen => {
      const button = document.createElement('button'); button.type = 'button'; button.dataset.screen = screen.id;
      button.textContent = screen.name; button.className = screen.id === active ? 'active' : '';
      button.setAttribute('aria-pressed', String(screen.id === active));
      button.onclick = () => { clearWait(); active = preview = screen.id; clicks = 0; trace = [screen.id]; note(); renderEditor(); $('#screen-nav [data-screen="' + screen.id + '"]').focus({preventScroll: true}); };
      return button;
    }));
  }
  function syncWaitControls() {
    const screen = current();
    for (let index = 0; index < 2; index++) {
      const button = screen.buttons[index], hasLabel = Boolean(button.label.trim());
      $('#button-wait-label-' + index).textContent = hasLabel ? 'Aguardar ao clicar em “' + button.label + '”' : 'Botão ' + (index + 1) + ' · adicione o texto primeiro';
      $('#button-wait-' + index).disabled = !hasLabel;
      $('#button-error-' + index).disabled = !hasLabel || !button.wait;
    }
  }
  function renderEditor() {
    if (!AUTHOR) return;
    const screen = current();
    renderNav();
    $('#flow-title').value = screen.title; $('#flow-body').value = screen.body;
    for (let index = 0; index < 2; index++) {
      const button = screen.buttons[index];
      $('#button-label-' + index).value = button.label;
      options($('#button-target-' + index), button.target);
      $('#button-wait-' + index).checked = button.wait === true;
      options($('#button-error-' + index), button.errorTarget);
    }
    $('#field-label').value = screen.field?.label || '';
    $('#field-placeholder').value = screen.field?.placeholder || '';
    $('#field-required').checked = screen.field?.required === true;
    $('#appearance-name').value = project.appearance.name;
    $('#roundness').value = project.appearance.roundness;
    all('[data-theme]').forEach(button => {
      const selected = button.dataset.theme === project.appearance.theme;
      button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));
    });
    all('[data-brief]').forEach(button => {
      const selected = button.dataset.brief === project.brief;
      button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected));
    });
    $('#add-screen').disabled = project.screens.length >= 8;
    $('#screen-count').textContent = project.screens.length + ' de 8 telas. Início, Escolha, Revisão, Concluído e Ajuda são as cinco telas iniciais.';
    $('#editing-location').textContent = 'Tela em edição: ' + screen.name;
    syncWaitControls();
    $('#client-change').textContent = project.clientChange ? 'Exigência recebida' : 'Receber nova exigência';
    $('#client-change').disabled = project.clientChange;
    $('#client-request').hidden = !project.clientChange;
    $('#client-request').textContent = 'A primeira opção (' + (byId('escolha').buttons[0].label || 'opção 1') + ') ficou indisponível. Adicione uma sexta tela, explique o problema e ofereça outra opção. A segunda opção deve continuar chegando à conclusão.';
    renderPreview();
  }
  function renderPreview() {
    const screen = byId(preview) || project.screens[0], appearance = project.appearance;
    $('#flow-preview').dataset.theme = appearance.theme;
    $('#flow-preview').style.setProperty('--app-radius', appearance.roundness + 'px');
    $('#preview-kicker').textContent = appearance.name || 'Meu app';
    $('#preview-location').textContent = screen.name;
    $('#preview-title').textContent = screen.title || 'Esta tela ainda não tem título';
    $('#preview-body').textContent = text(screen.body) || 'Escreva o que a pessoa deve entender nesta tela.';
    const box = $('#preview-buttons'); box.replaceChildren();
    if (screen.field?.label.trim()) {
      const label = document.createElement('label'); label.htmlFor = 'preview-field';
      label.textContent = screen.field.label + (screen.field.required ? ' · obrigatório' : '');
      const input = document.createElement('input'); input.id = 'preview-field'; input.maxLength = 120;
      input.placeholder = screen.field.placeholder; input.value = answers.get(screen.id) || ''; input.required = screen.field.required;
      input.setAttribute('aria-describedby', 'preview-note'); input.disabled = Boolean(pending);
      input.oninput = () => { response = input.value; answers.set(screen.id, response); input.removeAttribute('aria-invalid'); $('#preview-body').textContent = text(screen.body); if (response.trim()) note(); };
      box.append(label, input);
    }
    screen.buttons.forEach(button => {
      if (!button.label.trim()) return;
      const control = document.createElement('button'); control.type = 'button'; control.textContent = button.label;
      control.disabled = Boolean(pending); control.setAttribute('aria-busy', String(Boolean(pending && pending.button === button))); control.onclick = () => follow(screen, button); box.append(control);
    });
    if (pending) {
      const cancel = document.createElement('button'); cancel.type = 'button'; cancel.id = 'cancel-wait'; cancel.textContent = 'Cancelar espera';
      cancel.onclick = () => { clicks++; clearWait(); note('Espera cancelada. Você continua nesta tela e pode tentar de novo.', 'ok'); renderPreview(); };
      box.append(cancel);
    }
    if (!box.children.length) { const empty = document.createElement('span'); empty.textContent = 'Sem ação disponível nesta tela.'; box.append(empty); }
    $('#flow-preview').setAttribute('aria-busy', String(Boolean(pending)));
    updateTrace();
  }
  function navigate(target, message = '', kind = '') {
    clearWait(); active = preview = target;
    if (target === 'inicio') { choice = ''; response = ''; answers.clear(); }
    trace.push(target); note(message, kind);
    if (AUTHOR) renderEditor(); else renderPreview();
    $('#preview-title').focus({preventScroll: true});
  }
  function follow(screen, button) {
    if (pending) return;
    clicks++; updateTrace();
    const input = $('#preview-field');
    if (input) { response = input.value; answers.set(screen.id, response); }
    if (input && screen.field.required && !response.trim()) {
      note('Preencha ' + screen.field.label + ' para continuar.', 'bad'); input.setAttribute('aria-invalid', 'true'); input.focus(); return;
    }
    if (!button.target || !byId(button.target)) {
      note('Esta escolha não leva a lugar nenhum ainda. Defina o destino dela no editor.', 'bad'); return;
    }
    const simulateFailure = AUTHOR && $('#simulate-failure').checked;
    const finish = () => {
      if (button.wait && simulateFailure) {
        if (button.errorTarget && byId(button.errorTarget)) navigate(button.errorTarget, 'Falha simulada: percorra sua rota de recuperação.', 'bad');
        else { clearWait(); note('A conexão falhou. Tente novamente ou configure uma tela de recuperação.', 'bad'); renderPreview(); }
        return;
      }
      if (screen.id === 'escolha') choice = button.label;
      navigate(button.target);
    };
    if (!button.wait) { finish(); return; }
    const token = {timer: null, button}; pending = token;
    note('Aguardando resposta da rede…'); renderPreview();
    token.timer = setTimeout(() => { if (pending !== token) return; clearWait(); finish(); }, 1200);
  }
  function restart() {
    clearWait(); active = preview = 'inicio'; choice = response = ''; answers.clear(); clicks = 0; trace = ['inicio'];
    note('Teste reiniciado. Suas telas e edições continuam guardadas.', 'ok'); if (AUTHOR) renderEditor(); else renderPreview();
    $('#preview-title').focus({preventScroll: true});
  }
  function audit() {
    const seen = new Set();
    const edges = screen => screen.buttons.filter(button => button.label.trim()).flatMap(button => [button.target, ...(button.wait && button.errorTarget ? [button.errorTarget] : [])]).filter(id => byId(id));
    const walk = id => { if (seen.has(id)) return; seen.add(id); edges(byId(id)).forEach(walk); }; walk('inicio');
    const reaches = new Set(['concluido']); let changed = true;
    while (changed) { changed = false; for (const screen of project.screens) if (!reaches.has(screen.id) && edges(screen).some(id => reaches.has(id))) { reaches.add(screen.id); changed = true; } }
    const missing = [];
    project.screens.forEach(screen => screen.buttons.forEach((button, index) => { if (button.label.trim() && !byId(button.target)) missing.push(screen.name + ' · botão ' + (index + 1)); }));
    const unreachable = project.screens.filter(screen => !seen.has(screen.id)).map(screen => screen.name);
    const dead = project.screens.filter(screen => seen.has(screen.id) && !reaches.has(screen.id)).map(screen => screen.name);
    const items = [];
    if (missing.length) items.push('Falta destino: ' + missing.join(', ') + '.');
    if (unreachable.length) items.push('Não dá para chegar em: ' + unreachable.join(', ') + '.');
    if (!seen.has('concluido')) items.push('Ainda não há caminho do início até Concluído.');
    if (dead.length) items.push('Beco sem saída: ' + dead.join(', ') + '.');
    const good = !items.length;
    if (good) items.push('Há um caminho até Concluído e todas as ações visíveis têm destino.');
    const heading = document.createElement('h4'); heading.textContent = 'Conexões';
    const list = document.createElement('ul'); items.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); });
    $('#audit').replaceChildren(heading, list);
    status(good ? 'Conexões conferidas. Agora percorra o fluxo no simulador.' : 'Confira os pontos indicados antes de testar.', !good);
  }
  function download(blob, name) {
    const link = document.createElement('a'), url = URL.createObjectURL(blob); link.href = url; link.download = name; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function bind() {
    if (!AUTHOR) return;
    const write = change => event => { clearWait(); change(event); persist(); syncWaitControls(); $('#editing-location').textContent = 'Tela em edição: ' + current().name; renderPreview(); };
    $('#flow-title').oninput = write(event => {
      const screen = current(); screen.title = event.target.value;
      if (screen.id.startsWith('tela-')) { screen.name = screen.title.trim().slice(0, 32) || 'Tela ' + screen.id.slice(5); renderNav(); for (let index = 0; index < 2; index++) { options($('#button-target-' + index), screen.buttons[index].target); options($('#button-error-' + index), screen.buttons[index].errorTarget); } }
    });
    $('#flow-body').oninput = write(event => current().body = event.target.value);
    for (let index = 0; index < 2; index++) {
      $('#button-label-' + index).oninput = write(event => current().buttons[index].label = event.target.value);
      $('#button-target-' + index).onchange = write(event => current().buttons[index].target = event.target.value);
      $('#button-wait-' + index).onchange = write(event => current().buttons[index].wait = event.target.checked);
      $('#button-error-' + index).onchange = write(event => current().buttons[index].errorTarget = event.target.value);
    }
    const field = () => current().field ||= {label: '', placeholder: '', required: false};
    $('#field-label').oninput = write(event => field().label = event.target.value);
    $('#field-placeholder').oninput = write(event => field().placeholder = event.target.value);
    $('#field-required').onchange = write(event => field().required = event.target.checked);
    $('#appearance-name').oninput = write(event => project.appearance.name = event.target.value);
    $('#roundness').oninput = write(event => project.appearance.roundness = Number(event.target.value));
    $('#theme').onclick = event => { const button = event.target.closest('[data-theme]'); if (!button) return; clearWait(); project.appearance.theme = button.dataset.theme; persist(); renderEditor(); };
    $('#preview-mobile').onclick = () => { const on = $('#flow-preview').classList.toggle('mobile-preview'); $('#preview-mobile').setAttribute('aria-pressed', String(on)); };
    $('#brief').onclick = event => {
      const button = event.target.closest('[data-brief]'); if (!button || button.dataset.brief === project.brief) return;
      clearWait(); const old = briefs[project.brief], next = briefs[button.dataset.brief];
      for (const id of ['inicio', 'escolha']) { const screen = byId(id); if (screen.title === old[id][0]) screen.title = next[id][0]; if (screen.body === old[id][1]) screen.body = next[id][1]; }
      byId('escolha').buttons.forEach((action, index) => { if (action.label === old.buttons[index]) action.label = next.buttons[index]; });
      project.brief = button.dataset.brief; persist('Contexto trocado. Seus textos personalizados foram preservados.'); renderEditor();
    };
    $('#add-screen').onclick = () => {
      if (project.screens.length >= 8) return; clearWait(); let number = project.screens.length + 1; while (byId('tela-' + number)) number++;
      const id = 'tela-' + number;
      project.screens.push({id, name: 'Tela ' + number, title: 'Nova etapa', body: 'Explique o que acontece aqui.', buttons: [{label: 'Continuar', target: '', wait: false, errorTarget: ''}, {label: '', target: '', wait: false, errorTarget: ''}]});
      active = preview = id; clicks = 0; trace = [id]; persist('Tela adicionada. Conecte alguém até ela e para fora dela.'); renderEditor();
    };
    $('#client-change').onclick = () => { project.clientChange = true; persist('Exigência recebida: crie uma tela de alternativa para a primeira opção.'); renderEditor(); };
    $('#check-flow').onclick = audit;
    $('#save-flow').onclick = () => { download(new Blob([JSON.stringify(project, null, 2)], {type: 'application/json'}), 'meu-fluxo.fluxo'); status('Arquivo salvo. Ele preserva as telas e conexões.'); };
    $('#open-flow-button').onclick = () => $('#open-flow').click();
    $('#open-flow').onchange = async event => {
      const file = event.target.files[0]; if (!file) return;
      try { const next = safe(JSON.parse(await file.text())); if (!next) throw Error(); clearWait(); project = next; defaults(); restart(); persist('Rascunho aberto.'); }
      catch { status('Não consegui abrir esse arquivo de fluxo. Seu projeto atual continua aberto.', true); }
      event.target.value = '';
    };
    $('#export-flow').onclick = () => {
      const seed = JSON.stringify(project).replace(/</g, () => String.fromCharCode(92) + 'u003c');
      const documentCopy = document.documentElement.cloneNode(true); documentCopy.querySelector('body').classList.add('prototype');
      let source = '<!doctype html>' + documentCopy.outerHTML.replace('const AUTHOR = true;', 'const AUTHOR = false;');
      source = source.replace('<script>const AUTHOR = false;', () => '<script>window.__FLOW_SEED__=' + seed + ';const AUTHOR = false;');
      download(new Blob([source], {type: 'text/html'}), 'meu-prototipo.html'); status('Protótipo exportado. Abra o HTML e teste sem o editor.');
    };
  }
  $('#simulate-start').onclick = restart;
  if (!AUTHOR) document.body.classList.add('prototype');
  bind(); if (AUTHOR) renderEditor(); else renderPreview();
}
