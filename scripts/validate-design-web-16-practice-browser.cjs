// Prática livre: dados fictícios e perfil isolado, sem tocar no rascunho avaliável.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {legacyV2,KEY} = require('./validate-design-web-16-storage-browser.cjs');

async function run(driver, url) {
  const {chromium} = driver || require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const workshop = url || process.env.WORKSHOP_URL || pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
  try {
    const page = await browser.newPage({viewport:{width:1366,height:768},acceptDownloads:true});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.clock.install({time:new Date('2026-11-15T01:10:00Z')}); // 22h10 em São Paulo.
    await page.goto(workshop);
    const fixture=legacyV2();
    fixture.rafes[2].blocks[3].target='internal';
    fixture.internal[3].target='home';
    const raw=JSON.stringify(fixture,null,2);
    await page.evaluate(([key,value])=>localStorage.setItem(key,value),[KEY,raw]);
    await page.reload();
    const saved=()=>page.evaluate(key=>localStorage.getItem(key),KEY);
    assert.equal(await saved(),raw,'Abrir a versão nova preserva o raw anterior byte a byte.');
    assert.equal(await page.locator('[data-practice-card]').count(),6);
    for(const [count,minutes] of [[2,30],[4,60],[6,90]]) {
      await page.locator('[data-practice-route="'+count+'"]').click();
      assert.equal(await page.locator('[data-practice-card][open]').count(),count,'Rota de '+minutes+' minutos abre a sequência sugerida.');
    }
    for(let i=0;i<6;i++) {
      const before=await page.locator('#practiceSituation'+i).innerText();
      await page.locator('[data-practice-variation="'+i+'"]').click();
      assert.notEqual(await page.locator('#practiceSituation'+i).innerText(),before,'Cada desafio oferece outra situação.');
    }
    await page.locator('[data-practice-start="0"]').click();
    assert(await page.locator('#practiceWorkspace').isVisible(),'A prática continua disponível após 22h.');
    await page.locator('[data-practice-text="0"]').fill('Ensaio temporário');
    assert.match(await page.locator('#practicePhone').innerText(),/Ensaio temporário/);
    await page.locator('[data-practice-down="0"]').click();
    assert.equal(await page.locator('[data-practice-text="1"]').inputValue(),'Ensaio temporário');
    await page.locator('#practicePhone [data-open="internal"]').click();
    assert.match(await page.locator('#practicePhone').innerText(),/Interna título/);
    await page.locator('#practicePhone .back').click();
    assert.match(await page.locator('#practicePhone').innerText(),/Ensaio temporário/);
    await page.locator('[data-practice-page="internal"]').click();
    await page.locator('[data-practice-text="0"]').fill('Informação somente no ensaio');
    await page.locator('#practiceRestart').click();
    await page.locator('#practicePhone [data-open="internal"]').click();
    assert.match(await page.locator('#practicePhone').innerText(),/Informação somente no ensaio/);
    await page.locator('[data-practice-slot="1"]').click();
    await page.locator('[data-practice-text="0"]').fill('Alternativa da Cópia B');
    await page.locator('[data-practice-slot="0"]').click();
    assert.equal(await page.locator('[data-practice-text="1"]').inputValue(),'Ensaio temporário','Alternar cópias preserva a ordem e o texto da Cópia A.');
    await page.locator('[data-practice-start="5"]').click();
    assert.equal(await page.locator('[data-practice-text="1"]').inputValue(),'Ensaio temporário','Trocar de desafio não apaga o ensaio.');
    await page.locator('#practiceCompare').click();
    assert.match(await page.locator('#practiceCompareA').innerText(),/Ensaio temporário/);
    assert.match(await page.locator('#practiceCompareB').innerText(),/Alternativa da Cópia B/);
    await page.locator('#practiceCompareA [data-open="internal"]').click();
    assert.match(await page.locator('#practiceCompareA').innerText(),/Informação somente no ensaio/);
    assert.match(await page.locator('#practiceCompareB').innerText(),/Alternativa da Cópia B/,'Cada prévia mantém sua própria navegação.');
    await page.locator('[data-practice-slot="1"]').click();
    await page.locator('#practiceVersion').selectOption('0');
    await page.locator('#practiceCopy').click();
    assert.doesNotMatch(await page.locator('#practicePhone').innerText(),/Alternativa da Cópia B/);
    await page.locator('[data-practice-slot="0"]').click();
    assert.equal(await page.locator('[data-practice-text="1"]').inputValue(),'Ensaio temporário','Substituir B preserva A.');
    assert.equal(await saved(),raw,'Rotas, variações, edição, ordem e navegação da cópia não alteram o rascunho.');

    await page.locator('header summary').click();
    const pending=page.waitForEvent('download');await page.locator('#json').click();
    const exported=JSON.parse(fs.readFileSync(await (await pending).path(),'utf8'));
    assert.deepEqual(exported,fixture,'O JSON exportado contém só a entrega, sem ensaio temporário.');
    await page.reload();
    assert.equal(await saved(),raw);
    assert(await page.locator('#practiceWorkspace').isHidden(),'A cópia temporária desaparece ao recarregar, como informado.');
    await page.setViewportSize({width:390,height:844});
    await page.locator('[data-practice-card="0"] summary').click();
    await page.locator('[data-practice-start="0"]').click();
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'A prática cabe na tela móvel.');
    if(process.env.PRACTICE_SCREENSHOT) await page.screenshot({path:process.env.PRACTICE_SCREENSHOT,fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('Aula 16: desafios progressivos, duas cópias independentes e comparação navegável após 22h; rascunho e exportação preservados.');
  } finally {await browser.close();}
}
if(require.main===module) run().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={run};
