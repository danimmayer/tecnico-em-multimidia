// Requires a local static server (WORKSHOP_URL) and local Chromium. It never uses an external service.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');

const url=process.env.WORKSHOP_URL||'http://127.0.0.1:8901/modelos/design-web/aula-12/';
const fill=async(locator,value)=>{await locator.fill(value); await locator.blur();};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
  const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(url,{waitUntil:'networkidle'});
  assert.match(await page.locator('h1').innerText(),/Plantão UX/);
  assert.equal(await page.locator('[data-phase]').count(),4);

  // Phase 1: all three deceptive flows and their evidence/rewrite fields remain usable.
  for(let i=0;i<3;i++) {
   await page.locator(`[data-case="${i}"]`).click();
   await fill(page.locator(`[data-field="cases.${i}.note"]`),`Evidência do caso ${i+1}`);
   await fill(page.locator(`[data-field="cases.${i}.rewrite"]`),`Reparo do caso ${i+1}`);
  }
  await page.locator('[data-go="2"]').click();

  // Phase 2: a dossier exposes only three questions, then preserves the revised hypothesis.
  for(let dossier=0;dossier<2;dossier++) {
   await page.locator(`[data-dossier="${dossier}"]`).click();
   await fill(page.locator(`[data-field="dossiers.${dossier}.hypothesis"]`),`Hipótese ${dossier+1}`);
   for(let question=0;question<3;question++) await page.locator(`[data-question="${question}"]`).click();
   assert.equal(await page.locator('[data-question]:disabled').count(),5,'limite de três perguntas por dossiê');
   await page.locator('#reveal').click();
   await page.locator(`[data-field="dossiers.${dossier}.evidence"]`).selectOption('0');
   await fill(page.locator(`[data-field="dossiers.${dossier}.revision"]`),`Necessidade revista ${dossier+1}`);
   await fill(page.locator(`[data-field="dossiers.${dossier}.next"]`),`Próxima pesquisa ${dossier+1}`);
  }
  await page.locator('[data-go="3"]').click();

  // Phase 3: Plan A is frozen before the six-credit cut; Plan B does not erase it.
  for(const id of ['schedule','route','stock','price']) await page.locator(`#fix-${id}`).check();
  await fill(page.locator('[data-field="budget.note"]'),'Plano A protege Ana e Ravi.');
  await fill(page.locator('[data-field="budget.measure"]'),'Observar se a pessoa localiza horário e rota.');
  await page.locator('#save-plan').click();
  assert.match(await page.locator('body').innerText(),/Plano A guardado · 9 créditos/);
  await page.locator('#shock').click();
  await page.locator('#fix-route').uncheck();
  await fill(page.locator('[data-field="budget.note"]'),'Plano B preserva horários e preço sob o corte.');
  await fill(page.locator('[data-field="budget.measure"]'),'Verificar se a visita pode ser planejada.');
  assert.match(await page.locator('body').innerText(),/Plano A guardado · 9 créditos/,'corte preserva Plano A');
  assert.match(await page.locator('.budget output').innerText(),/^6 \/ 6$/);
  await page.locator('[data-go="4"]').click();

  // Phase 4: preview, local persistence, and standalone HTML export.
  await fill(page.locator('[data-field="responses.0.title"]'),'Chuva: Virada no Galpão 2');
  await fill(page.locator('[data-field="responses.0.notice"]'),'A chuva mudou a Virada para o Galpão 2, Rua Norte, 80, às 20h. Entre pelo Portão Leste.');
  await fill(page.locator('[data-field="responses.0.cta"]'),'Ver rota do Galpão');
  await page.locator('[data-field="responses.0.action"]').selectOption('map');
  await page.locator('[data-field="responses.0.collect"]').selectOption('none');
  await fill(page.locator('[data-field="responses.0.help"]'),'Apoio na recepção do Galpão 2, das 19h às 21h.');
  await page.locator('#review').click();
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('[data-export]').click()]);
  const html=await fs.readFile(await download.path(),'utf8');
  for(const heading of ['Escolhas que enganam','O que as evidências mudaram','A capacidade mudou','Resposta ao imprevisto']) assert.match(html,new RegExp(heading));
  assert.ok(!/https?:\/\//.test(html),'exportação é autônoma');
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('[data-field="responses.0.title"]').inputValue(),'Chuva: Virada no Galpão 2','estado persiste localmente');
  await context.setOffline(true);
  await page.locator('[data-phase="1"]').click();
  assert.match(await page.locator('#workspace').innerText(),/Três casos curtos/,'oficina já carregada funciona offline');
  assert.deepEqual(errors,[]);
  console.log('Aula 12 browser: quatro fases, limite de perguntas, Plano A/B, exportação e persistência/offline validados.');
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exit(1)});
