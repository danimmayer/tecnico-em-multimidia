const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

async function run(driver, url) {
  const {chromium} = driver || require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  try {
    const context = await browser.newContext({viewport:{width:1366,height:768}});
    const page = await context.newPage(), errors=[];
    page.setDefaultTimeout(5000);
    page.on('pageerror',err=>errors.push(err.message));
    const workshop = url || process.env.WORKSHOP_URL || pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
    await page.goto(workshop);
    assert.equal(await page.locator('a[href*="slides"], iframe').count(),0,'A oficina não expõe apresentação docente.');
    const nav = i=>page.locator('#nav [data-go]').nth(i).click();
    const saved = ()=>page.evaluate(()=>JSON.parse(localStorage.getItem('senai-dw16-rafe-v2')));
    assert(await page.locator('.rubric').first().isVisible(),'Critérios antes da produção.');
    await page.locator('[data-text="problem"]').fill('Escolher a atividade e localizar a entrada sem ajuda.');
    await page.locator('[data-text="priority"]').fill('Horário e acesso lateral vêm primeiro para decidir a visita.');
    await nav(1);
    for(let i=0;i<6;i++)await page.locator('[data-idea="'+i+'"]').fill(['Agenda primeiro','Acesso primeiro','Atividade em destaque','Pergunta de escolha','Lista por horário','Resumo do festival'][i]);
    await nav(2);
    for(const i of [0,2,4])await page.locator('[data-pick="'+i+'"]').check();
    assert(await page.locator('[data-pick="1"]').isDisabled(),'Selecionar exatamente três.');
    for(const i of [0,2,4])await page.locator('[data-reason="'+i+'"]').fill('A prioridade '+i+' ajuda o público a encontrar uma atividade pelo horário.');
    await page.locator('[data-text="conceptName"]').fill('Seu próximo encontro');
    await page.locator('[data-text="conceptWhy"]').fill('Atividade e horário conduzem à entrada lateral sem distrações.');
    await nav(3);
    for(const i of [0,1,2,'internal']) {
      await page.locator('[data-tab="'+i+'"]').click();
      for(const [n,value] of ['Festival · direção '+i,'Exposição 17h, oficina 18h e música 19h. Acesso pela Rua Cedro.','Destaque da atividade','Ver horário e acesso'].entries())await page.locator('[data-block="'+n+'"]').fill(value);
    }
    await page.locator('[data-tab="2"]').click();
    const content=page.locator('[data-block="0"]');
    await content.fill('Título editável');await content.press('End');await content.pressSequentially(' sem perder foco');
    assert.equal(await content.inputValue(),'Título editável sem perder foco');
    await page.locator('[data-down="0"]').click();
    assert.equal((await saved()).rafes[2].blocks[1].text,'Título editável sem perder foco');
    await page.locator('#chosenDirection').selectOption('2');
    await page.locator('[data-tab="internal"]').click();
    await nav(4);await page.locator('#startVisit').click();
    assert(await page.locator('#nav').isHidden(),'Visitante vê apenas o projeto.');
    assert.equal((await saved()).tests[0].direction,2,'A direção escolhida independe do editor da interna.');
    const before=JSON.stringify((await saved()).tests[0].blocks);
    await page.locator('#visitContent [data-open="internal"]').first().click();
    assert(await page.locator('#visitContent .back').isVisible());
    await page.locator('#visitContent .back').click();
    assert(await page.locator('#visitContent [data-open="internal"]').first().isVisible());
    await page.locator('#endVisit').click();
    await page.locator('[data-text="visitNote"]').fill('Encontrou o horário, abriu o detalhe e procurou a entrada pela Rua Cedro.');
    await page.locator('[data-text="revision"]').fill('Mantive o horário no início e dei mais clareza ao acesso lateral.');
    for(const member of ['A','B'])await page.locator('[data-text="member'+member+'"]').fill('Defendo a prioridade do horário. A visita procurou a entrada. Vou destacar a Rua Cedro.');
    await nav(3);await page.locator('[data-tab="2"]').click();
    await page.locator('[data-block="0"]').fill('Versão revisada depois da visita');
    assert.equal(JSON.stringify((await saved()).tests[0].blocks),before,'Preservar a versão testada antes da revisão.');
    await nav(5);await page.locator('#check').click();
    assert.match(await page.locator('#checkOut').innerText(),/Os campos da atividade estão preenchidos/);
    assert.match(await page.locator('#checkOut').innerText(),/expliquem suas escolhas/);
    await page.reload();assert.equal((await saved()).conceptName,'Seu próximo encontro');
    const backupPromise=page.waitForEvent('download');await page.locator('#jsonEnd').click();const backup=await backupPromise;
    const backupData=JSON.parse(fs.readFileSync(await backup.path(),'utf8'));
    await page.locator('header summary').click();
    const reportPromise=page.waitForEvent('download');await page.locator('#html').click();const report=await reportPromise;
    const reportText=fs.readFileSync(await report.path(),'utf8');
    for(const text of ['Seu próximo encontro','Agenda primeiro','Página de informações','Rua Cedro','Versão revisada'])assert(reportText.includes(text));
    const baseline=await saved();
    for(const corrupt of [{...backupData,ideas:[null,1,2,3,4,5]},{...backupData,active:99},{...backupData,selected:[0,0,0]},{...backupData,problem:null},{...backupData,tests:[{}]}]) {
      await page.locator('#load').setInputFiles({name:'corrompido.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(corrupt))});
      await page.waitForFunction(()=>document.getElementById('save').textContent.includes('inválido'));
      assert.deepEqual(await saved(),baseline,'Cópia inválida preserva o trabalho atual.');
    }
    const restored={...backupData,problem:'Cópia restaurada com segurança'};
    page.once('dialog',d=>d.dismiss());
    await page.locator('#load').setInputFiles({name:'copia.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(restored))});
    await page.waitForTimeout(100);assert.deepEqual(await saved(),baseline,'Cancelar importação preserva trabalho.');
    page.once('dialog',d=>d.accept());
    await page.locator('#load').setInputFiles({name:'copia.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(restored))});
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('senai-dw16-rafe-v2')).problem==='Cópia restaurada com segurança');
    await page.setViewportSize({width:390,height:844});
    for(let i=0;i<6;i++){
      await nav(i);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Sem rolagem horizontal na missão '+i);
    }
    assert.deepEqual(errors,[]);
    console.log('Aula 16: criação, escolha, navegação visitante, revisão, cópia/importação, relatório, mobile e separação da apresentação passaram no Chrome.');
  } finally {await browser.close()}
}
if(require.main===module)run().catch(err=>{console.error(err);process.exitCode=1});
module.exports={run};
