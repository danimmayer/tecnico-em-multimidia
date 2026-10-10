#!/usr/bin/env node
/* Focused browser QA for the Aula 11 peer-test remix. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = process.env.FLOW_URL || 'http://127.0.0.1:8923/modelos/design-web/aula-11/criador.html';
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dw11-remix-'));
const visible = async (p, s) => p.locator(s).first().waitFor({ state: 'visible', timeout: 5000 });
const overflow = async p => assert.ok((await p.evaluate(() => document.documentElement.scrollWidth)) <= (await p.evaluate(() => innerWidth)) + 1, 'overflow horizontal');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.removeItem('senai-design-web-fluxo-v1'));
    await page.reload({ waitUntil: 'networkidle' });
    for (const selector of ['#appearance-controls', '#field-controls', '#wait-controls']) await page.locator(selector).evaluate(node => { node.open = true; });
    for (const selector of ['#appearance-name', '[data-theme]', '#roundness', '#simulate-failure', '#flow-trace', '#field-label', '#field-placeholder', '#field-required', '#button-wait-0', '#button-wait-1', '#button-error-0', '#button-error-1']) await visible(page, selector);
    await overflow(page);

    // Appearance is an authored decision and must survive refresh.
    await page.locator('#appearance-name').fill('Clube Aurora');
    await page.locator('#theme [data-theme="arcade"]').click();
    await page.locator('#roundness').fill('18');
    await page.reload({ waitUntil: 'networkidle' });
    for (const selector of ['#appearance-controls', '#field-controls', '#wait-controls']) await page.locator(selector).evaluate(node => { node.open = true; });
    assert.equal(await page.locator('#appearance-name').inputValue(), 'Clube Aurora');
    assert.equal(await page.locator('#roundness').inputValue(), '18');
    assert.equal(await page.locator('#theme [data-theme="arcade"]').getAttribute('aria-pressed'), 'true');

    // Build a real route in which the submitted response is used by the review screen.
    await page.locator('#button-target-0').selectOption('escolha');
    await page.locator('#button-label-1').fill('Preciso de ajuda');
    await page.locator('#button-target-1').selectOption('ajuda');
    await page.locator('#screen-nav [data-screen="escolha"]').click();
    await page.locator('#button-target-0').selectOption('revisao');
    await page.locator('#screen-nav [data-screen="revisao"]').click();
    await page.locator('#flow-body').fill('Revise o pedido de {{resposta}} antes de confirmar.');
    await page.locator('#screen-nav [data-screen="inicio"]').click();
    await page.locator('#field-controls').evaluate(node => { node.open = true; });

    // A required field blocks route progress, focuses the field and carries its response across routes.
    await page.locator('#field-label').fill('Seu nome');
    await page.locator('#field-placeholder').fill('Digite aqui');
    await page.locator('#field-required').check();
    await page.locator('#simulate-start').click();
    await visible(page, '#preview-field');
    const initialTitle = await page.locator('#preview-title').innerText();
    await page.locator('#preview-buttons button').first().click();
    assert.equal(await page.locator('#preview-field').evaluate(n => document.activeElement === n), true, 'campo obrigatório precisa receber foco');
    assert.equal(await page.locator('#preview-title').innerText(), initialTitle, 'campo vazio não pode navegar');
    await page.locator('#preview-field').fill('Ana');
    await page.locator('#preview-buttons button').first().click();
    await page.locator('#preview-buttons button').first().click();
    assert.match(await page.locator('#flow-preview').innerText(), /Ana/, 'resposta deve seguir no percurso');

    // Waiting disables only the clicked action, offers cancellation, and a simulated failure reaches recovery.
    await page.locator('#screen-nav [data-screen="inicio"]').click();
    await page.locator('#wait-controls').evaluate(node => { node.open = true; });
    await page.locator('#simulate-start').click();
    await page.locator('#preview-field').fill('Ana');
    const first = page.locator('#preview-buttons button').first();
    const second = page.locator('#preview-buttons button').nth(1);
    await page.locator('#button-wait-0').check();
    await page.locator('#button-error-0').selectOption('ajuda');
    await page.locator('#simulate-start').click();
    await page.locator('#preview-field').fill('Ana');
    await first.click();
    assert.equal(await page.locator('#flow-preview').getAttribute('aria-busy'), 'true');
    await visible(page, '#cancel-wait');
    await page.locator('#cancel-wait').click();
    assert.notEqual(await page.locator('#flow-preview').getAttribute('aria-busy'), 'true');
    await page.locator('#simulate-failure').check();
    await page.locator('#simulate-start').click();
    await page.locator('#preview-field').fill('Ana');
    await second.click();
    assert.match(await page.locator('#flow-preview').innerText(), /ajuda/i, 'falha simulada não pode afetar ação sem espera');
    await page.locator('#simulate-start').click();
    await page.locator('#preview-field').fill('Ana');
    await first.click();
    await page.waitForTimeout(1300);
    assert.match(await page.locator('#flow-preview').innerText(), /ajuda/i, 'falha simulada precisa abrir recuperação');
    assert.match(await page.locator('#flow-trace').innerText(), /Início.*Escolha|Início.*Ajuda/s, 'o rastro precisa registrar o percurso');

    // The richer flow has to survive save/open and offline export before legacy compatibility is exercised.
    const richSave = page.waitForEvent('download'); await page.locator('#save-flow').click(); const richSaved = await richSave; const richPath = path.join(dir, 'remix.fluxo'); await richSaved.saveAs(richPath);
    const rich = JSON.parse(fs.readFileSync(richPath, 'utf8'));
    assert.equal(rich.appearance.name, 'Clube Aurora');
    assert.equal(rich.appearance.theme, 'arcade');
    assert.equal(rich.appearance.roundness, 18);
    assert.equal(rich.screens.find(screen => screen.id === 'inicio').field.required, true);
    assert.equal(rich.screens.find(screen => screen.id === 'inicio').buttons[0].wait, true);
    const richExport = page.waitForEvent('download'); await page.locator('#export-flow').click(); const richHtml = await richExport; const richHtmlPath = path.join(dir, 'remix-prototipo.html'); await richHtml.saveAs(richHtmlPath);
    const richPhone = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const richPhoneErrors = []; richPhone.on('pageerror', e => richPhoneErrors.push(e.message));
    await richPhone.goto(`file://${richHtmlPath}`, { waitUntil: 'load' });
    assert.equal(await richPhone.locator('.author-only:visible').count(), 0);
    await richPhone.locator('#simulate-start').click(); await visible(richPhone, '#preview-field');
    await richPhone.locator('#preview-buttons button').first().click();
    assert.equal(await richPhone.locator('#preview-field').evaluate(n => document.activeElement === n), true);
    await richPhone.locator('#preview-field').fill('Ana');
    await richPhone.locator('#preview-buttons button').first().click(); await visible(richPhone, '#cancel-wait');
    await richPhone.locator('#cancel-wait').click();
    await richPhone.locator('#preview-buttons button').first().click(); await richPhone.waitForTimeout(1300);
    await richPhone.locator('#preview-buttons button').first().click();
    assert.match(await richPhone.locator('#flow-preview').innerText(), /Ana/);
    await overflow(richPhone);
    assert.deepEqual(richPhoneErrors, []); await richPhone.close();

    // Legacy files with no remix properties retain their authored text and routes.
    const legacy = { version: 1, brief: 'reserva', clientChange: false, screens: [
      { id: 'inicio', name: 'Início', title: 'Entrada antiga', body: 'Texto antigo', buttons: [{ label: 'Ir', target: 'escolha' }, { label: '', target: '' }] },
      { id: 'escolha', name: 'Escolha', title: 'Escolha antiga', body: 'Opções antigas', buttons: [{ label: 'A', target: 'revisao' }, { label: 'B', target: 'revisao' }] },
      { id: 'revisao', name: 'Revisão', title: 'Revise', body: 'Você escolheu {{escolha}}', buttons: [{ label: 'Confirmar', target: 'concluido' }, { label: '', target: '' }] },
      { id: 'concluido', name: 'Concluído', title: 'Fim antigo', body: 'Pronto', buttons: [{ label: 'Recomeçar', target: 'inicio' }, { label: '', target: '' }] },
      { id: 'ajuda', name: 'Ajuda', title: 'Ajuda antiga', body: 'Ajuda', buttons: [{ label: 'Voltar', target: 'inicio' }, { label: '', target: '' }] }
    ] };
    const legacyPath = path.join(dir, 'antigo.fluxo'); fs.writeFileSync(legacyPath, JSON.stringify(legacy));
    await page.locator('#open-flow').setInputFiles(legacyPath);
    assert.equal(await page.locator('#flow-title').inputValue(), 'Entrada antiga');
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('#flow-title').inputValue(), 'Entrada antiga', 'importação antiga não pode resetar o rascunho');

    const save = page.waitForEvent('download'); await page.locator('#save-flow').click(); const saved = await save; const savedPath = path.join(dir, 'novo.fluxo'); await saved.saveAs(savedPath);
    const data = JSON.parse(fs.readFileSync(savedPath, 'utf8'));
    assert.deepEqual(data.screens.map(screen => ({ id: screen.id, name: screen.name, title: screen.title, body: screen.body, buttons: screen.buttons.map(button => ({ label: button.label, target: button.target })) })), legacy.screens.map(screen => ({ id: screen.id, name: screen.name, title: screen.title, body: screen.body, buttons: screen.buttons.map(button => ({ label: button.label, target: button.target })) })), 'importação antiga deve preservar telas, textos, rótulos e rotas');
    assert.ok(data.appearance, 'salvamento novo deve incluir aparência');
    const download = page.waitForEvent('download'); await page.locator('#export-flow').click(); const html = await download; const htmlPath = path.join(dir, 'protótipo.html'); await html.saveAs(htmlPath);
    const phone = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const phoneErrors = []; phone.on('pageerror', e => phoneErrors.push(e.message));
    await phone.goto(`file://${htmlPath}`, { waitUntil: 'load' });
    assert.equal(await phone.locator('.author-only:visible').count(), 0);
    await phone.locator('#simulate-start').click(); await visible(phone, '#flow-preview'); await overflow(phone);
    assert.deepEqual(phoneErrors, []); await phone.close();
    assert.deepEqual(errors, []);
    console.log('Aula 11 remix browser checks passed.');
  } finally { await browser.close(); fs.rmSync(dir, { recursive: true, force: true }); }
})().catch(e => { console.error(e.stack || e); process.exitCode = 1; });
