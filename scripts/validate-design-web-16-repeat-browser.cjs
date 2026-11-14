// Regressão de repetição da etapa 5: duas visitas fictícias no mesmo rascunho v2 isolado.
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {legacyV2,KEY}=require('./validate-design-web-16-storage-browser.cjs');

async function run(driver,url){
  const {chromium}=driver||require(process.env.PLAYWRIGHT_MODULE||'playwright');
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  const workshop=url||process.env.WORKSHOP_URL||pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
  try{
    const context=await browser.newContext({viewport:{width:1366,height:768}});
    const page=await context.newPage();page.setDefaultTimeout(5000);
    await page.goto(workshop);
    const fixture=legacyV2();fixture.tests=[];fixture.step=4;fixture.chosenDirection=0;
    await page.evaluate(([key,value])=>localStorage.setItem(key,JSON.stringify(value)),[KEY,fixture]);
    await page.reload();
    const saved=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),KEY);
    await page.locator('#startVisit').click();
    assert(await page.locator('#nav').isHidden(),'A primeira rodada entra em modo visitante.');
    assert(await page.locator('#visitToolbar').isVisible(),'A barra da visita deixa claro como reiniciar ou encerrar.');
    await page.locator('#visitContent [data-open="internal"]').click();
    assert.equal(await page.locator('#visitContent [data-open="internal"]').count(),0,'A visita saiu do início antes de testar o reinício.');
    assert(await page.locator('#visitContent [data-open="home"]').first().isVisible(),'A tela interna oferece retorno ao início.');
    await page.locator('#restartVisit').click();
    assert.equal((await saved()).tests.length,1,'Reiniciar a simulação volta ao início sem criar outra rodada.');
    assert(await page.locator('#visitContent [data-open="internal"]').isVisible(),'Reinício retorna à tela inicial da mesma direção.');
    await page.locator('#endVisit').click();
    await page.locator('[data-text="visitNote"]').fill('Rodada um: encontrou o horário.');
    assert.match(await page.locator('#startVisit').innerText(),/Iniciar nova visita/i,'Após uma rodada, o botão comunica que inicia outra visita.');
    assert(await page.locator('#repeatVisit').isVisible(),'A ação de repetir visita fica visível após encerrar.');
    await page.locator('#nav [data-go="3"]').click();
    await page.locator('#chosenDirection').selectOption('1');
    await page.locator('#nav [data-go="4"]').click();
    await page.locator('#repeatVisit').click();
    assert.equal((await saved()).tests.length,2,'Repetir visita cria a segunda rodada.');
    await page.locator('#endVisit').click();
    await page.locator('[data-text="visitNote"]').fill('Rodada dois: procurou a entrada.');
    assert.match(await page.locator('#visitHistory').innerText(),/Rodada um: encontrou o horário\./,'Histórico visível mantém a nota da rodada anterior.');
    const state=await saved();
    assert.equal(state.tests.at(-1).direction,1,'A segunda rodada preserva sua direção.');
    assert.equal(state.tests.at(-1).note,'Rodada dois: procurou a entrada.');
    await page.locator('#nav [data-go="5"]').click();
    await page.locator('#nav [data-go="4"]').click();
    assert(await page.locator('#startVisit').isVisible(),'Retornar de Registros para Teste mantém a possibilidade de outra rodada.');
    await page.reload();
    const reloaded=await saved();
    assert.deepEqual(reloaded.tests.map(t=>t.note),['Rodada um: encontrou o horário.','Rodada dois: procurou a entrada.']);
    console.log('Aula 16: rodadas repetidas, reinício, histórico, retorno 4→5 e reload preservam testes independentes.');
  }finally{await browser.close();}
}
if(require.main===module)run().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={run};
