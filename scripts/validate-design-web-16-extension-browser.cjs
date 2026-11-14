// Extensão opcional da etapa 6: somente dados fictícios em perfil Chrome isolado.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {legacyV2, KEY} = require('./validate-design-web-16-storage-browser.cjs');

async function run(driver, url) {
  const {chromium} = driver || require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  const workshop = url || process.env.WORKSHOP_URL || pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
  try {
    const context = await browser.newContext({viewport:{width:1366,height:768},acceptDownloads:true});
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    await page.clock.install({time:new Date('2026-11-13T23:00:00Z')}); // 20h em São Paulo: extensão ainda permitida.
    await page.goto(workshop);
    const legacy = legacyV2();
    legacy.chosenDirection = 2;
    await page.evaluate(([key,value])=>localStorage.setItem(key,JSON.stringify(value)),[KEY,legacy]);
    await page.reload();
    const saved=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
    assert.deepEqual(await saved(),legacy,'O legado v2 fica idêntico antes de a extensão opcional ser aberta.');

    await page.locator('#nav [data-go="5"]').click();
    await page.locator('#check').click();
    assert.match(await page.locator('#checkOut').innerText(),/Registros presentes/,'A entrega normal não exige a extensão.');
    await page.locator('#openExtension').click();
    assert(await page.locator('#extensionPanel').isVisible(),'A extensão abre por escolha explícita na etapa 6.');
    await page.locator('#extensionTask').selectOption('activity');
    await page.locator('#extensionDirection').selectOption('0');
    assert.notEqual(await page.locator('#extensionDirection').inputValue(),String(legacy.chosenDirection),'A comparação usa uma direção diferente da escolhida para o teste principal.');
    await page.locator('#startComparison').click();
    assert(await page.locator('#compareA .phone').isVisible());
    assert(await page.locator('#compareB .phone').isVisible());
    assert.equal(await page.locator('#compareA [data-open]').count(),1,'Direção 3 tem um destino de CTA no fixture.');
    assert.equal(await page.locator('#compareB [data-open]').count(),1,'Direção 1 tem um destino de CTA no fixture.');
    await page.locator('#compareA [data-open]').click();
    assert(await page.locator('#compareA .back').isVisible(),'Prévia A é navegável, não apenas uma imagem.');
    await page.locator('#compareB [data-open]').click();
    assert(await page.locator('#compareB .back').isVisible(),'Prévia B é navegável, não apenas uma imagem.');

    const snap=await saved();
    assert(snap.extension&&snap.extension.snapshot,'Iniciar comparação registra um snapshot opcional.');
    assert.deepEqual(
      [snap.extension.snapshot.directionA,snap.extension.snapshot.directionB].sort((a,b)=>a-b),[0,2],
      'Snapshot compara a direção escolhida (3) e a alternativa (1).'
    );
    assert.equal(snap.extension.snapshot.task,'activity');
    await page.locator('[data-extra="observationA"]').fill('A direção escolhida destacou o horário.');
    await page.locator('[data-extra="observationB"]').fill('A alternativa priorizou a chegada.');
    await page.locator('[data-extra="decision"]').fill('A atividade é mais clara para esta tarefa.');

    await page.locator('#nav [data-go="3"]').click();
    await page.locator('[data-tab="2"]').click();
    await page.locator('[data-block="0"]').fill('Título alterado depois da comparação');
    const afterEdit=await saved();
    assert.notEqual(afterEdit.rafes[2].blocks[0].text,afterEdit.extension.snapshot.blocksA[0].text,'Editar o esboço não altera o snapshot da comparação.');
    await page.reload();
    const reloaded=await saved();
    assert.equal(reloaded.extension.observationA,'A direção escolhida destacou o horário.');
    assert.equal(reloaded.extension.observationB,'A alternativa priorizou a chegada.');
    assert.equal(reloaded.extension.decision,'A atividade é mais clara para esta tarefa.');
    assert.equal(reloaded.problem,legacy.problem,'Campos legados continuam após a extensão e recarga.');

    await page.locator('header summary').click();
    const jsonDownload=page.waitForEvent('download'); await page.locator('#json').click();
    const json=JSON.parse(fs.readFileSync(await (await jsonDownload).path(),'utf8'));
    assert.equal(json.extension.snapshot.task,'activity','JSON inclui a extensão quando ela foi usada.');
    const reportDownload=page.waitForEvent('download'); await page.locator('#html').click();
    const report=fs.readFileSync(await (await reportDownload).path(),'utf8');
    for(const text of ['Comparação opcional','A direção escolhida destacou o horário.','A atividade é mais clara para esta tarefa.']) assert(report.includes(text),'Relatório HTML inclui os registros da extensão.');

    await page.setViewportSize({width:390,height:844});
    await page.locator('#nav [data-go="5"]').click();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Etapa 6 e extensão não criam rolagem horizontal no celular.');
    await page.clock.setFixedTime(new Date('2026-11-14T01:00:00Z')); // 22h em São Paulo: somente consulta e salvamento.
    await page.locator('#openExtension').click(); // fecha uma rodada já existente
    await page.locator('#openExtension').click(); // reabre somente para consulta
    assert(await page.locator('#extensionTimeNotice').isVisible(),'O aviso de encerramento aparece após 22h.');
    for(const selector of ['#extensionTask','#extensionDirection','#startComparison','#extensionEdit','[data-extra="observationA"]','[data-extra="observationB"]','[data-extra="decision"]']) assert(await page.locator(selector).isDisabled(),'Após 22h, '+selector+' fica somente para consulta.');
    console.log('Aula 16: extensão opcional, snapshot, navegação, exportação, reload e mobile passaram.');
  } finally { await browser.close(); }
}
if(require.main===module)run().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={run};
