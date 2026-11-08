// Executável em arquivo local ou WORKSHOP_URL, sem servidor obrigatório.
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
async function completeFestival(page){
  const nav=i=>page.locator('.rail nav button').nth(i).click();
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('senai-dw15-arquitetura-v1')));
  const cafeRevision=(await saved()).revision;
  await nav(3);
  for(const [i,name]of ['Programação','Planeje sua visita','Durante o festival'].entries())await page.locator('#lab-menu-'+i).fill(name);
  const profiles={
    plan:{title:'Uma hora de imagens no seu sábado.',features:['exposicao','quando','entrada'],cta:'Ver a programação',target:'programacao',reason:'A exposição cabe no tempo disponível; horário e entrada ajudam a decidir a visita.'},
    arrival:{title:'Chegou na chuva? Encontre o acesso.',features:['acesso','chuva','ajuda'],cta:'Encontrar o acesso',target:'acesso',reason:'Quem está chegando precisa achar a entrada sem degraus e saber onde pedir ajuda.'}
  };
  for(const [id,p]of Object.entries(profiles)){
    await page.locator('#lab-'+id+'-title').fill(p.title);
    for(const [i,value]of p.features.entries())await page.locator('#lab-'+id+'-feature-'+i).selectOption(value);
    await page.locator('#lab-'+id+'-cta').fill(p.cta);await page.locator('#lab-'+id+'-target').selectOption(p.target);await page.locator('#lab-'+id+'-reason').fill(p.reason);
  }
  assert.equal(await page.locator('#lab-reveal-change').isEnabled(),false,'Os dois testes iniciais devem anteceder o novo recado.');
  async function visit(id,answer){
    await page.locator('[data-lab-test="'+id+'"]').click();
    assert(await page.locator('#challenge-lab').evaluate(el=>el.classList.contains('is-visiting')));
    await page.locator('#challenge-lab .lab-site-cta').click();
    await page.locator('[data-lab-exit]').click();
    await page.locator('#lab-test-'+id+'-route').selectOption('top');
    await page.locator('#lab-test-'+id+'-answer').fill(answer);
  }
  await visit('plan','Visito a exposição das 17h às 18h; não preciso retirar ingresso.');
  await visit('arrival','Entro pela lateral da Rua Cedro e peço ajuda à equipe do hall.');
  await page.locator('#lab-reveal-change').click();
  await page.locator('#lab-notice').fill('A oficina está lotada. A entrada principal fechou: use a lateral da Rua Cedro. A exposição e as outras atividades continuam.');
  await page.locator('#lab-notice-place').selectOption('top');
  await page.locator('#lab-button-decision').selectOption('keep');
  await page.locator('#lab-change-reason').fill('Os botões já levam à programação e ao acesso lateral, sem prometer vaga na oficina.');
  await visit('change','Uso a entrada lateral. A oficina lotou; posso visitar a exposição.');
  await page.locator('#lab-conclusion').fill('O perfil de chegada orientou o acesso sem ajuda. O aviso precisou aparecer antes do título para tornar a mudança perceptível.');
  await page.locator('#lab-check').click();assert.match(await page.locator('#lab-feedback').innerText(),/Registro do festival completo/);
  assert.equal((await saved()).revision,cafeRevision,'O festival não deve invalidar os testes do café.');
  const snapshot=(await saved()).lab.change.before;
  // Editar a versão atual só invalida o teste afetado após o novo recado.
  await page.locator('#lab-arrival-title').fill('Entre pela lateral e aproveite o festival.');
  await page.locator('#lab-check').click();assert.match(await page.locator('#lab-feedback').innerText(),/visita|teste|novamente|atualiz/i);
  await visit('change','A entrada lateral segue disponível, e posso escolher a exposição em vez da oficina lotada.');
  await page.locator('#lab-check').click();assert.match(await page.locator('#lab-feedback').innerText(),/Registro do festival completo/);
  assert.deepEqual((await saved()).lab.change.before,snapshot,'A referência anterior ao recado deve ser preservada.');
  await nav(5);await page.locator('#check-final').click();assert.match(await page.locator('#final-feedback').innerText(),/Projeto conferido/);
}
async function run(driver,workshopUrl){
  const {chromium}=driver||require(process.env.PLAYWRIGHT_MODULE||'playwright');
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  const workshop=workshopUrl||process.env.WORKSHOP_URL||pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-15/index.html')).href;
  try{
    const context=await browser.newContext({viewport:{width:1366,height:768}}),page=await context.newPage(),errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    await page.goto(workshop);
    const nav=i=>page.locator('.rail nav button').nth(i).click();
    const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('senai-dw15-arquitetura-v1')));
    await page.locator('[data-hunt="inspire"]').click();
    await page.locator('[data-hunt="back"]').click();
    for(const id of ['universo','historia','hora'])await page.locator(`[data-hunt="${id}"]`).click();
    assert.equal((await saved()).hunt.bad.clicks,5);
    await page.locator('#switch-hunt').click();await page.locator('[data-hunt="hora"]').click();
    assert.equal((await saved()).hunt.clear.clicks,1);
    await nav(1);
    const places={cappuccino:'a',pao:'a',bolo:'a',horario:'b',local:'b',retirada:'c',conta:'later',delivery:'later',video:'later'};
    for(const [id,group]of Object.entries(places))await page.locator('#place-'+id).selectOption(group);
    await page.locator('#check-sort').click();assert.match(await page.locator('#sort-feedback').innerText(),/Todos os cartões/);
    await nav(2);
    for(const [id,name]of Object.entries({a:'Cardápio',b:'Horários e local',c:'Retirada e pagamento'}))await page.locator('#name-'+id).fill(name);
    await page.locator('#new-request').click();
    await nav(1);assert.equal(await page.locator('.ticket').count(),11);
    await page.locator('#place-feriado').selectOption('b');await page.locator('#place-pagamento').selectOption('c');
    await nav(4);assert.equal(await page.locator('[data-task]').count(),5);
    await page.locator('#visitor').click();
    assert.equal(await page.locator('.rail').isVisible(),false);
    const taskTargets={preco:['a','cappuccino'],hora:['b','horario'],onde:['b','local'],retirar:['c','retirada'],feriado:['b','feriado']};
    async function testAll(){for(const [task,[group,card]]of Object.entries(taskTargets)){await page.locator(`[data-task="${task}"]`).click();await page.locator(`[data-go="${group}"]`).click();await page.locator(`[data-open="${card}"]`).click();}}
    await testAll();await page.locator('#visitor').click();
    await nav(5);await page.locator('#decision').selectOption('keep');await page.locator('#observation').fill('O visitante encontrou as cinco informações sem pedir ajuda.');await page.locator('#improvement').fill('Mantivemos os nomes porque cada caminho foi direto e o colega explicou o que encontrou.');
    await page.locator('#check-cafe').click();assert.match(await page.locator('#cafe-feedback').innerText(),/Café conferido/);
    await page.locator('#check-final').click();assert.match(await page.locator('#final-feedback').innerText(),/Festival/);
    await completeFestival(page);
    await page.reload();assert.equal(await page.locator('#decision').inputValue(),'keep');assert.equal((await saved()).tests.length,5);
    // Mudar logo após observar não impõe outra mudança burocrática depois das notas.
    await nav(2);await page.locator('#name-b').fill('Visita e horários');
    await nav(5);await page.locator('#decision').selectOption('adjust');await page.locator('#check-cafe').click();assert.match(await page.locator('#cafe-feedback').innerText(),/Teste com visitante na versão atual/);
    await nav(4);await page.locator('#visitor').click();await testAll();await page.locator('#visitor').click();await nav(5);await page.locator('#check-cafe').click();assert.match(await page.locator('#cafe-feedback').innerText(),/Café conferido/);
    assert.equal((await saved()).tests.length,10);
    // Arquivo inválido preserva exatamente o rascunho existente.
    const before=await saved();await page.locator('.storage-help summary').click();
    await page.locator('#restore').setInputFiles({name:'invalido.json',mimeType:'application/json',buffer:Buffer.from('{"version":1}')});await page.waitForFunction(()=>document.getElementById('action-status').textContent.includes('rascunho atual foi mantido'));assert.deepEqual(await saved(),before);
    page.once('dialog',dialog=>dialog.dismiss());await page.locator('#reset').click();assert.deepEqual(await saved(),before);
    // Reabertura válida mantém todos os registros após confirmação.
    page.once('dialog',dialog=>dialog.accept());await page.locator('#restore').setInputFiles({name:'cafe-aurora-aula15.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(before))});await page.waitForFunction(()=>document.getElementById('action-status').textContent.includes('Cópia reaberta'));assert.deepEqual(await saved(),before);
    // Móvel: todas as missões, sem rolagem horizontal.
    await page.setViewportSize({width:390,height:844});
    for(let i=0;i<6;i++){await nav(i);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow móvel missão '+i);}
    assert.deepEqual(errors,[]);
    await context.close();
    const blocked=await browser.newContext();await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('blocked');};});const blockedPage=await blocked.newPage();await blockedPage.goto(workshop);assert.match(await blockedPage.locator('#save-status').innerText(),/não conseguiu guardar/);assert.equal(await blockedPage.locator('.rail nav button').count(),6);await blocked.close();
    console.log('Aula 15 no navegador: café, projeto autoral do festival, visitas, mudança, versões, persistência, importação e móvel passaram.');
  }finally{await browser.close();}
}
module.exports=run;
if(require.main===module)run().catch(error=>{console.error(error);process.exitCode=1;});
