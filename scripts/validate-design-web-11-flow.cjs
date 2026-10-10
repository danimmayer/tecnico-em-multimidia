#!/usr/bin/env node
/* Browser checks for the Aula 11 flow builder.  Run after the local preview is up. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const base = process.env.FLOW_URL || 'http://127.0.0.1:8923/modelos/design-web/aula-11/criador.html';
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dw11-flow-'));

const must = async (page, selector) => {
  const item = page.locator(selector);
  await assert.doesNotReject(item.first().waitFor({ state: 'visible', timeout: 4000 }), `faltou ${selector}`);
  return item;
};

const setValue = async (page, selector, value) => {
  const item = await must(page, selector);
  const tag = await item.evaluate(node => node.tagName);
  if (tag === 'SELECT') await item.selectOption({ label: value });
  else await item.fill(value);
};

const noOverflow = async page => {
  const metrics = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  assert.ok(metrics.scroll <= metrics.width + 1, `overflow horizontal: ${metrics.scroll}px em ${metrics.width}px`);
};

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') { const where = message.location(); if (!where.url.endsWith('/favicon.ico')) errors.push(`${message.text()} @ ${where.url || 'unknown'}`); } });
  try {
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.removeItem('senai-design-web-fluxo-v1'));
    await page.reload({ waitUntil: 'networkidle' });
    for (const selector of ['#brief', '#screen-nav [data-screen]', '#flow-title', '#flow-body', '#button-label-0', '#button-label-1', '#button-target-0', '#button-target-1', '#flow-preview', '#simulate-start', '#add-screen', '#client-change', '#save-flow', '#export-flow', '#check-flow', '#flow-status']) await must(page, selector);
    assert.equal(await page.locator('#open-flow').count(), 1, 'faltou o campo de abrir rascunho');
    assert.ok(await page.locator('#screen-nav [data-screen]').count() >= 5, 'o mapa precisa começar com telas suficientes para uma rota');
    await noOverflow(page);
    await page.screenshot({ path: '/tmp/dw11-flow-desktop.png', fullPage: true });

    // Incomplete work must be diagnosed in the interface, never silently accepted.
    await page.locator('#check-flow').click();
    await expectStatus(page, /complete|preencha|falta|pendente|revise|ainda|confira/i);

    // Change the entry screen, select another screen and prove that its contents persist.
    const firstScreen = page.locator('#screen-nav [data-screen]').first();
    await firstScreen.click();
    await setValue(page, '#flow-title', 'Inscricao da Liga de Jogos');
    await setValue(page, '#flow-body', 'Escolha um campeonato antes de continuar.');
    await setValue(page, '#button-label-0', 'Escolher campeonato');
    const firstTarget = await page.locator('#button-target-0').inputValue();
    const secondScreen = page.locator('#screen-nav [data-screen]').nth(1);
    await secondScreen.click();
    await setValue(page, '#flow-title', 'Escolha seu campeonato');
    await firstScreen.click();
    assert.equal(await page.locator('#flow-title').inputValue(), 'Inscricao da Liga de Jogos', 'a edicao da tela deve sobreviver a troca de tela');
    assert.equal(await page.locator('#button-target-0').inputValue(), firstTarget, 'o destino do botao deve sobreviver a troca de tela');

    // The new client request must create a sixth screen manually, with a recovery route.
    await page.locator('#client-change').click();
    await page.locator('#add-screen').click();
    const unavailableId = await page.locator('#screen-nav [data-screen]').last().getAttribute('data-screen');
    assert.ok(unavailableId, 'a nova tela precisa receber um identificador');
    await setValue(page, '#flow-title', 'Opção indisponível');
    await setValue(page, '#flow-body', 'Este horário esgotou. Escolha a outra opção para continuar.');
    await setValue(page, '#button-label-0', 'Ver outra opção');
    await page.locator('#button-target-0').selectOption({ label: 'Escolha' });
    await firstScreen.click();
    await page.locator('#button-target-0').selectOption('escolha');
    await setValue(page, '#button-label-1', 'Preciso de ajuda');
    await page.locator('#button-target-1').selectOption('ajuda');
    await secondScreen.click();
    await page.locator('#button-target-0').selectOption(unavailableId);
    await page.locator('#button-target-1').selectOption('revisao');
    await page.locator('#screen-nav [data-screen="revisao"]').click();
    await page.locator('#button-target-0').selectOption('concluido');
    const screenCount = await page.locator('#screen-nav [data-screen]').count();
    assert.ok(screenCount >= 6, 'o pedido novo deve permitir criar a sexta tela de indisponibilidade');
    let unavailable = false;
    for (let i = 0; i < screenCount; i++) {
      await page.locator('#screen-nav [data-screen]').nth(i).click();
      const text = `${await page.locator('#flow-title').inputValue()} ${await page.locator('#flow-body').inputValue()}`.toLowerCase();
      if (/indispon|esgot|fora do ar|nao dispon/.test(text)) {
        unavailable = true;
        assert.ok((await page.locator('#button-label-0').inputValue()).trim() || (await page.locator('#button-label-1').inputValue()).trim(), 'a tela indisponivel precisa oferecer uma alternativa');
        const targets = [await page.locator('#button-target-0').inputValue(), await page.locator('#button-target-1').inputValue()];
        assert.ok(targets.some(Boolean), 'a alternativa da tela indisponivel precisa ter destino');
      }
    }
    assert.ok(unavailable, 'faltou a tela de indisponibilidade pedida para o desafio');
    await page.locator('#check-flow').click();
    await expectStatus(page, /conferid/i);
    assert.match(await page.locator('#audit').innerText(), /caminho.*Concluído/i, 'a auditoria precisa reconhecer a rota concluída');

    // Preview follows both choices, including the unavailable recovery path, to a conclusion.
    await page.locator('#screen-nav [data-screen]').first().click();
    await page.locator('#simulate-start').click();
    await page.locator('#preview-buttons button').first().click();
    assert.match(await page.locator('#preview-title').innerText(), /campeonato/i, 'o primeiro clique deve chegar à escolha');
    await page.locator('#preview-buttons button').first().click();
    assert.match(await page.locator('#preview-title').innerText(), /indisponível/i, 'a primeira opção deve revelar a indisponibilidade');
    await page.locator('#preview-buttons button').first().click();
    await page.locator('#preview-buttons button').nth(1).click();
    assert.match(await page.locator('#preview-body').innerText(), /Quinta, 19h/, 'a revisão precisa carregar a segunda escolha');
    await page.locator('#preview-buttons button').first().click();
    assert.match(await page.locator('#preview-title').innerText(), /enviada/i, 'a rota precisa chegar à conclusão');
    await page.screenshot({ path: '/tmp/dw11-flow-complete.png', fullPage: true });
    await page.locator('#simulate-start').click();
    assert.equal(await page.locator('#preview-body').innerText(), 'Escolha um campeonato antes de continuar.', 'reiniciar precisa limpar a escolha anterior');

    // Save, reload and reopen the exported file in a clean browser context.
    const draftPromise = page.waitForEvent('download');
    await page.locator('#save-flow').click();
    const draft = await draftPromise;
    const draftPath = path.join(temp, 'meu-fluxo.fluxo');
    await draft.saveAs(draftPath);
    await expectStatus(page, /salv|rascunho|guard/i);
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('#flow-title').inputValue(), 'Inscricao da Liga de Jogos', 'o rascunho salvo deve voltar apos recarregar');
    const unsafePath = path.join(temp, 'texto-literal.fluxo');
    const unsafe = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
    unsafe.screens[0].title = 'Título <script>window.__dw11Pwned=1</script>';
    fs.writeFileSync(unsafePath, JSON.stringify(unsafe));
    await page.locator('#open-flow').setInputFiles(unsafePath);
    assert.equal(await page.locator('#flow-title').inputValue(), unsafe.screens[0].title, 'um texto de aluno deve voltar como texto');
    assert.equal(await page.evaluate(() => window.__dw11Pwned), undefined, 'abrir rascunho não pode executar o texto do aluno');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#export-flow').click();
    const download = await downloadPromise;
    const exportPath = path.join(temp, 'meu-prototipo.html');
    await download.saveAs(exportPath);
    assert.ok(fs.statSync(exportPath).size > 100, 'a exportacao ficou vazia');
    assert.match(fs.readFileSync(exportPath, 'utf8'), /Laboratório de fluxo/, 'a exportacao deve ser um prototipo HTML');

    const offline = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const offlineErrors = [];
    offline.on('pageerror', error => offlineErrors.push(error.message));
    await offline.goto(base, { waitUntil: 'networkidle' });
    await offline.locator('#open-flow').setInputFiles(draftPath);
    await expectStatus(offline, /abert|carreg|import/i);
    assert.equal(await offline.locator('#flow-title').inputValue(), 'Inscricao da Liga de Jogos', 'abrir o arquivo deve restaurar a tela editada');
    await offline.locator('#simulate-start').click();
    await offline.locator('#preview-buttons button').first().click();
    await offline.locator('#preview-buttons button').first().click();
    await offline.locator('#preview-buttons button').first().click();
    await offline.locator('#preview-buttons button').nth(1).click();
    await offline.locator('#preview-buttons button').first().click();
    assert.match(await offline.locator('#preview-title').innerText(), /enviada/i, 'o rascunho aberto precisa manter uma rota clicável até o fim');
    await noOverflow(offline);
    await offline.screenshot({ path: '/tmp/dw11-flow-mobile.png', fullPage: true });
    assert.deepEqual(offlineErrors, [], `erros no modo celular: ${offlineErrors.join(' | ')}`);
    await offline.close();
    const prototype = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const prototypeErrors = [];
    prototype.on('pageerror', error => prototypeErrors.push(error.message));
    fs.copyFileSync(exportPath, '/tmp/dw11-prototype-debug.html');
    await prototype.goto(`file://${exportPath}`, { waitUntil: 'load' });
    assert.equal(await prototype.locator('.author-only:visible').count(), 0, 'o prototipo nao deve expor os controles de autoria');
    await prototype.locator('#simulate-start').click();
    await must(prototype, '#flow-preview button');
    assert.equal(await prototype.evaluate(() => window.__dw11Pwned), undefined, 'o HTML exportado não pode executar o texto do aluno');
    try { await noOverflow(prototype); } catch (error) {
      console.error('overflow-debug', await prototype.evaluate(() => [...document.querySelectorAll('*')].filter(node => node.getBoundingClientRect().right > innerWidth + 1).slice(0, 8).map(node => ({ tag: node.tagName, id: node.id, class: node.className, width: Math.round(node.getBoundingClientRect().width), right: Math.round(node.getBoundingClientRect().right), display: getComputedStyle(node).display }))));
      throw error;
    }
    assert.deepEqual(prototypeErrors, [], `erros no prototipo offline: ${prototypeErrors.join(' | ')}`);
    await prototype.close();
    assert.deepEqual(errors, [], `erros de pagina: ${errors.join(' | ')}`);
    console.log('Aula 11 flow builder: browser checks passed.');
  } finally {
    await browser.close();
    fs.rmSync(temp, { recursive: true, force: true });
  }
})().catch(error => { console.error(error.stack || error); process.exitCode = 1; });

async function expectStatus(page, pattern) {
  await page.locator('#flow-status').waitFor({ state: 'visible', timeout: 2500 });
  await assert.doesNotReject(page.locator('#flow-status').filter({ hasText: pattern }).waitFor({ state: 'visible', timeout: 3000 }), `status deveria combinar ${pattern}`);
}
