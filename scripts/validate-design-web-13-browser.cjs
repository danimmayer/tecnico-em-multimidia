// Requires a local static server (WORKSHOP_URL) and local Chromium. It never uses an external service.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');

const url=process.env.WORKSHOP_URL||'http://127.0.0.1:8901/modelos/design-web/aula-13/';
const fill=async(locator,value)=>{await locator.fill(value); await locator.blur();};
const demo=(page,kind)=>page.locator(`[data-demo="${kind}"]`);
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
  const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(url,{waitUntil:'networkidle'});
  assert.match(await page.locator('.masthead h1').innerText(),/Rota acessível/);
  assert.equal(await page.locator('.phase-rail [data-phase]').count(),4);
  await fill(page.locator('#team'),'Lu + Caio');

  // Parada 1: the inspector measures the real demo DOM; five distinct barriers are recorded.
  await demo(page,'audit').locator('[data-part="info"]').click();
  const facts=await page.locator('#inspector').innerText();
  assert.match(facts,/Contraste do texto: 2,5:1/,'contraste medido na página de demonstração');
  assert.match(facts,/Tamanho da letra: 11 px/);
  const findings=[['info','contraste'],['submit','foco'],['field-name','rotulos'],['video','legenda'],['form','ordem'],['close','toque']];
  for(const [part,crit] of findings) {
   await page.locator('#part-select').selectOption(part);
   await page.locator('#crit-select').selectOption(crit);
   await fill(page.locator('#who'),`Quem visita perde a tarefa por causa de ${part}.`);
   await page.locator('#add-finding').click();
  }
  assert.match(await page.locator('.counter').innerText(),/6 de 5/);
  assert.match(await page.locator('.findings').innerText(),/Não recebe foco pelo teclado/,'medição de foco guardada com o registro');
  await page.locator('[data-tool="inspect"]').click();
  await page.locator('[data-tool="linear"]').click();
  assert.match(await page.locator('#linear-audit').innerText(),/Campo de edição sem rótulo/);
  const linear=await page.locator('#linear-audit li').allInnerTexts();
  assert.ok(linear.findIndex(t=>/Inscreva-se/.test(t))<linear.findIndex(t=>/Criar para todo mundo/.test(t)),'leitura começa pelo formulário na versão original');
  await demo(page,'audit').locator('.vc-nav a').first().focus();
  await page.keyboard.press('Tab');
  assert.match(await page.locator('#trail-audit').innerText(),/1 Tab/);
  assert.match(await page.locator('#tools-count').innerText(),/2 de 4/);

  // Parada 2: contrast formula, reflow measurement, keyboard-only completion and alt text.
  await page.locator('[data-go="2"]').click();
  await page.locator('[data-station="1"]').click();
  await page.locator('#pair-select').selectOption('3');
  assert.match(await page.locator('.ratio div').first().innerText(),/4,8:1/,'par do link mede as cores reais da página de demonstração');
  await page.locator('#pair-select').selectOption('1');
  await page.locator('#light').fill('10');
  assert.ok(parseFloat((await page.locator('#ratio-now').innerText()).replace(',','.'))>=4.5,'texto escuro sobre o amarelo passa de 4,5:1');
  await fill(page.locator('[data-field="stations.contrast.note"]'),'Botão: 1,8:1 para mais de 10:1 mantendo o amarelo.');
  await page.locator('[data-go="station-2"]').click();
  await page.locator('#zoom-level').fill('200');
  assert.match(await page.locator('#zoom-cut').innerText(),/Fora da tela: .*Libras/);
  assert.match(await page.locator('#cut200').innerText(),/Libras/);
  await page.locator('#zoom-fluid').check();
  assert.match(await page.locator('#zoom-cut').innerText(),/Todo o texto está visível/);
  await fill(page.locator('[data-field="stations.zoom.note"]'),'Largura fixa corta entrada gratuita e Libras.');
  await page.locator('[data-go="station-3"]').click();
  await page.locator('#kbd-start').click();
  for(let i=0;i<5;i++) await page.keyboard.press('Tab');
  assert.match(await page.locator('#kbd-summary').innerText(),/Original\s+5 Tabs · não concluiu/i);
  await page.locator('[data-kbd-variant="1"]').click();
  await page.locator('#kbd-start').click();
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  assert.match(await page.locator('#kbd-summary').innerText(),/Botões reais\s+\d+ Tabs · não concluiu/i,'confirmar sem marcar a caixa não conclui a tarefa');
  await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Space');
  await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
  assert.match(await page.locator('#kbd-summary').innerText(),/Botões reais\s+5 Tabs · concluiu/i,'atalho, caixa marcada e botão real permitem concluir só com teclado');
  await fill(page.locator('[data-field="stations.keyboard.note"]'),'Original não alcança o botão; com botões reais foram 3 Tabs.');
  await page.locator('[data-go="station-4"]').click();
  for(const [i,fn,text] of [[0,'complexa','Mapa da rota até o Galpão 2'],[1,'informativa','Rampa com corrimão na entrada sem degraus'],[2,'decorativa',''],[3,'funcional','Buscar na programação']]) {
   await page.locator(`[data-alt-fn="${i}"]`).selectOption(fn);
   await fill(page.locator(`[data-alt-text="${i}"]`),text);
  }
  assert.match(await page.locator('#alt-say-2').innerText(),/ignorada/);
  await fill(page.locator('[data-field="stations.alt.note"]'),'O mapa precisa de rota em texto.');
  assert.equal(await page.locator('[data-station] .mark.ok').count(),4,'quatro estações registradas');

  // Parada 3: corrections change the real "Depois" page; the slow-connection shock is enforced.
  await page.locator('[data-go="3"]').click();
  const open=async id=>{const d=page.locator(`#fix-${id}`); if(!(await d.evaluate(el=>el.open))) await d.locator('summary').click(); return d;};
  let d=await open('contraste');
  await d.locator('[data-fix="infoColor"]').selectOption('#3d4756');
  await d.locator('[data-fix="buttonText"]').selectOption('#10213a');
  await fill(d.locator('[data-field="fixNotes.contraste"]'),'Quem tem baixa visão lê horário e botão.');
  d=await open('foco');
  await d.locator('[data-fix="realButtons"]').check();
  await d.locator('[data-fix="focus"]').selectOption('strong');
  await fill(d.locator('[data-field="fixNotes.foco"]'),'Quem usa teclado chega ao Inscrever.');
  d=await open('texto');
  await d.locator('[data-fix="textSize"]').selectOption('16');
  await d.locator('[data-fix="fluid"]').check();
  await fill(d.locator('[data-field="fixNotes.texto"]'),'Ravi amplia sem perder o local.');
  d=await open('rotulos');
  await d.locator('[data-fix="labels"]').check();
  await fill(d.locator('[data-field="fixNotes.rotulos"]'),'Os campos dizem o que pedem.');
  d=await open('cor');
  await d.locator('[data-fix="errorText"]').check();
  await fill(d.locator('[data-field="fixNotes.cor"]'),'O erro não depende só da cor.');
  d=await open('legenda');
  await fill(d.locator('[data-fix="captions"]'),'Oi! Eu sou a Bia, da curadoria.\nSábado, 20h, no Galpão 2.\nEntrada gratuita, com Libras.');
  await d.locator('[data-fix="autoplayOff"]').check();
  await fill(d.locator('[data-field="fixNotes.legenda"]'),'Pessoas surdas acompanham a fala.');
  d=await open('ordem');
  await d.locator('#order-align').click();
  await fill(d.locator('[data-field="fixNotes.ordem"]'),'A leitura começa pelo evento.');
  d=await open('alt');
  await fill(d.locator('[data-fix="altMap"]'),'Mapa da rota até o Galpão 2');
  await d.locator('[data-fix="routeText"]').check();
  await d.locator('[data-fix="ornamentDecorative"]').check();
  await fill(d.locator('[data-field="fixNotes.alt"]'),'A rota sem degraus fica em texto.');
  assert.match(await page.locator('#fix-count').innerText(),/8 de 3/);
  const after=demo(page,'after');
  assert.equal(await after.locator('button[data-part="submit"]').count(),1,'Depois usa botão real');
  assert.equal(await after.locator('label[for="vc-nome"]').count(),1,'Depois tem rótulo visível');
  assert.match(await after.locator('.vc-routetext').innerText(),/Rua Norte, 80/);
  await page.locator('[data-tool="linear3"]').click();
  const linearAfter=await page.locator('#linear-after li').allInnerTexts();
  assert.ok(linearAfter.findIndex(t=>/Criar para todo mundo/.test(t))<linearAfter.findIndex(t=>/Inscreva-se/.test(t)),'ordem de leitura corrigida');
  await page.locator('#shock').click();
  assert.match(await page.locator('.weight output').innerText(),/6,00 MB/);
  await page.locator('[data-weight="video"]').selectOption('removed');
  await page.locator('[data-weight="hero"]').selectOption('compressed');
  await page.locator('[data-weight="map"]').selectOption('removed');
  await page.locator('[data-weight="fonts"]').selectOption('system');
  await page.locator('[data-weight="carousel"]').selectOption('off');
  assert.match(await page.locator('#weight-out').innerText(),/cabe no limite sem perder informação/,'transcrição e rota em texto preservam a informação');
  await page.locator('#fix-legenda summary').scrollIntoViewIfNeeded();
  await fill(page.locator('[data-fix="captions"]'),'');
  assert.match(await page.locator('#weight-out').innerText(),/Informação perdida/,'retirar vídeo sem transcrição perde informação');
  await fill(page.locator('[data-fix="captions"]'),'Sábado, 20h, no Galpão 2.\nEntrada gratuita, com Libras.\nDepois das 20h, entre pela Rua Norte, 80.');
  await fill(page.locator('[data-field="shock.note"]'),'Transcrição no lugar do vídeo e rota em texto no lugar do mapa.');
  await fill(page.locator('[data-field="compare"]'),'O botão real com foco visível permite a inscrição.');
  await page.locator('[data-view="lado"]').click();
  assert.equal(await page.locator('.compare.lado > figure').count(),2);

  // Parada 4: cross test evidence, pact limit and standalone export.
  await page.locator('[data-go="4"]').click();
  await fill(page.locator('[data-field="test.tester"]'),'Bia + Theo');
  await page.locator('#test-start').click();
  for(let i=0;i<12&&!(await page.locator('#evidence-1').innerText()).includes('chegou');i++) await page.keyboard.press('Tab');
  assert.match(await page.locator('#evidence-1').innerText(),/chegou ao botão Inscrever/);
  await demo(page,'test').locator('button[data-part="submit"]').click();
  assert.match(await page.locator('#evidence-3').innerText(),/texto junto ao campo/);
  for(let i=0;i<4;i++) { await page.locator(`[data-task="${i}"][value="sem-ajuda"]`).check(); await fill(page.locator(`[data-field="test.results.${i}.note"]`),`Observação ${i+1}`); }
  await fill(page.locator('[data-field="test.adjust"]'),'Aumentamos a área de toque do ✕ após a hesitação.');
  for(const id of ['contraste','teclado','leve']) await page.locator(`[data-pact="${id}"]`).check();
  assert.equal(await page.locator('[data-pact="alt"]').isDisabled(),true,'pacto limita a três compromissos');
  await fill(page.locator('[data-field="pact.own"]'),'Vamos testar com teclado e conexão lenta antes de publicar.');
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('[data-export]').click()]);
  const html=await fs.readFile(await download.path(),'utf8');
  for(const heading of ['01 / Auditoria','02 / Estações','03 / Correções','04 / Teste cruzado e pacto','Os registros essenciais estão preenchidos']) assert.match(html,new RegExp(heading));
  assert.match(html,/class="snap-antes"/); assert.match(html,/class="snap-depois"/);
  assert.ok(!/(?:src|href)="https?:|url\(https?:|https?:\/\//.test(html),'exportação é autônoma');
  assert.match(download.suggestedFilename(),/^aula-13-rota-acessivel-lu-caio-\d{6}\.html$/);

  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('[data-field="pact.own"]').inputValue(),'Vamos testar com teclado e conexão lenta antes de publicar.','estado persiste localmente');
  await context.setOffline(true);
  await page.locator('.phase-rail [data-phase="1"]').click();
  assert.match(await page.locator('#workspace').innerText(),/Encontre as barreiras/,'oficina já carregada funciona offline');

  // Narrow screens: no horizontal page scroll at 320 px.
  const phone=await browser.newPage({viewport:{width:320,height:740}});
  await phone.goto(url+'?fase=3',{waitUntil:'networkidle'});
  assert.ok(await phone.evaluate(()=>document.documentElement.scrollWidth<=322),'sem rolagem horizontal em 320 px');
  await phone.close();
  assert.deepEqual(errors,[]);
  console.log('Aula 13 browser: auditoria medida, quatro estações, correções no Depois, choque de dados, teste cruzado, pacto, exportação, persistência, offline e 320 px validados.');
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exit(1)});
