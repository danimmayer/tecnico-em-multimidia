// Regressão de fluxo multipágina: usa somente um perfil Chrome novo e fixture v2 fictícia.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {legacyV2, KEY} = require('./validate-design-web-16-storage-browser.cjs');

async function run(driver, url) {
  const {chromium} = driver || require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome', headless:true});
  const workshop = url || process.env.WORKSHOP_URL || pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
  try {
    const context = await browser.newContext({viewport:{width:1366,height:768},acceptDownloads:true});
    const page = await context.newPage();
    page.setDefaultTimeout(5000);
    await page.goto(workshop);
    const fixture = legacyV2();
    // Fixture de alunos que já tinham a versão v2: não pode perder campo algum ao migrar.
    await page.evaluate(([key,value])=>localStorage.setItem(key,JSON.stringify(value)),[KEY,fixture]);
    await page.reload();
    assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY),fixture,'O rascunho v2 legado sobrevive ao reload antes da extensão opcional.');
    const saved = () => page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);

    await page.locator('#nav [data-go="3"]').click();
    await page.getByText('Páginas extras (opcional)',{exact:true}).click();
    await page.locator('#pageTitle').fill('Como chegar');
    await page.locator('#addPage').click();
    const afterAdd = await saved();
    assert.equal(afterAdd.extraPages.length,1,'Página complementar é opcional e adicionada sem alterar os quatro esboços existentes.');
    const extra = afterAdd.extraPages[0];
    const extraTab = page.locator('[data-tab^="extra:"]');
    assert.equal(await extraTab.count(),1,'A página complementar tem uma aba editável própria.');
    await extraTab.click();
    for(const [i,text] of ['Como chegar','Entrada lateral pela Rua Cedro','Mapa esquemático','Voltar ao início'].entries()) await page.locator('[data-block="'+i+'"]').fill(text);
    await page.locator('[data-target="3"]').selectOption('home');

    // O CTA padrão da Direção 2 abre a principal; a principal abre a página complementar.
    await page.locator('[data-tab="internal"]').click();
    await page.locator('[data-target="3"]').selectOption('extra:'+extra.id);
    await page.locator('[data-tab="1"]').click();
    await page.locator('#addBlock').click();
    const directionBlocks = await page.locator('[data-block]').count();
    const finishIndex = directionBlocks-1;
    await page.locator('[data-type="'+finishIndex+'"]').selectOption('cta');
    await page.locator('[data-block="'+finishIndex+'"]').fill('Concluir simulação');
    await page.locator('[data-target="'+finishIndex+'"]').selectOption('finish');
    await page.locator('#chosenDirection').selectOption('1');

    const beforeVisit = await saved();
    assert.equal(beforeVisit.extraPages[0].title,'Como chegar');
    await page.locator('#nav [data-go="4"]').click();
    await page.locator('#startVisit').click();
    assert(await page.locator('#nav').isHidden(),'Visita abre somente a experiência, não o editor.');
    await page.locator('#visitContent [data-open="internal"]').first().click();
    await page.locator('#visitContent [data-open="extra:'+extra.id+'"]').click();
    await page.locator('#visitContent [data-open="home"]').first().click();
    assert(await page.locator('#visitContent [data-open="finish"]').isVisible(),'CTA alternativo mantém destino próprio, sem colapsar na página principal.');
    await page.locator('#visitContent [data-open="finish"]').click();
    assert.match(await page.locator('#visitContent').innerText(),/conclu|simula/i,'Destino concluir mostra confirmação.');
    const duringVisit = await saved();
    assert.equal(duringVisit.tests.length,fixture.tests.length+1);
    assert.deepEqual(duringVisit.tests.at(-1).extraPages,duringVisit.extraPages,'Snapshot preserva as páginas extras testadas antes de revisão.');
    await page.locator('#endVisit').click();

    await page.locator('header summary').click();
    const reportPromise = page.waitForEvent('download'); await page.locator('#html').click();
    const reportText = fs.readFileSync(await (await reportPromise).path(),'utf8');
    assert(reportText.includes('Como chegar')&&reportText.includes('Rua Cedro'),'Relatório HTML inclui a página complementar.');
    await page.reload();
    const reloaded = await saved();
    assert.equal(reloaded.problem,fixture.problem,'Campos v2 antigos continuam após reload.');
    assert.equal(reloaded.extraPages[0].title,'Como chegar','Página complementar persiste após reload.');
    assert.equal(reloaded.extraPages[0].blocks[1].text,'Entrada lateral pela Rua Cedro');
    assert.equal(reloaded.internal[3].target,'extra:'+extra.id,'Destino editável da principal persiste após reload.');
    console.log('Aula 16: legado v2, páginas opcionais, destinos, snapshot, exportação e reload passaram.');
  } finally { await browser.close(); }
}
if(require.main===module) run().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={run};
