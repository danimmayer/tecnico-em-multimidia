const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
async function run(driver,url){
  const {chromium}=driver||require(process.env.PLAYWRIGHT_MODULE||'playwright');
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const target=url||pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-15/index.html')).href+'#free-studio';
    await page.goto(target);
    const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('senai-dw15-arquitetura-v1')));
    assert(await page.locator('#free-studio').isVisible(),'A continuação abre sem etapas anteriores.');
    // Um rascunho da versão anterior continua intacto na migração.
    await page.evaluate(()=>{const k='senai-dw15-arquitetura-v1',p=JSON.parse(localStorage.getItem(k));delete p.studio;p.groups[0].name='Rótulo anterior';p.lab.profiles.plan.title='Projeto anterior salvo';localStorage.setItem(k,JSON.stringify(p));});
    await page.reload();assert.equal((await saved()).groups[0].name,'Rótulo anterior');assert.equal((await saved()).lab.profiles.plan.title,'Projeto anterior salvo');
    for(const [id,text]of Object.entries({'studio-client-name':'Linha Clara','studio-client-audience':'Estudantes procurando roupas de segunda mão','studio-client-goal':'Escolher tamanho, entender a troca e planejar uma visita.','studio-need-0':'Ver peças e tamanhos','studio-need-1':'Entender a política de troca','studio-need-2':'Saber onde e quando visitar'}))await page.locator('#'+id).fill(text);
    const pages={home:{menu:'Início',title:'Roupas para uma segunda história.',intro:'Consulte as peças e planeje uma visita à Linha Clara.',cta:'Conhecer as peças',target:'info'},info:{menu:'Peças e tamanhos',title:'Encontre o seu tamanho.',intro:'Camisetas P, M e G, jaquetas M e G.',cta:'Planejar minha visita',target:'visit'},visit:{menu:'Visita e troca',title:'Venha sábado, das 14h às 18h.',intro:'Rua das Cores, 75. Endereço fictício. Troca em sete dias com etiqueta.',cta:'Voltar ao início',target:'home'}};
    for(const [id,p]of Object.entries(pages)){
      await page.locator('[data-st-editor="'+id+'"]').click();
      for(const f of ['menu','title','intro','cta'])await page.locator('#studio-'+id+'-'+f).fill(p[f]);
      for(let i=0;i<2;i++){await page.locator('#studio-'+id+'-block-'+i+'-title').fill(i?'Informação para decidir':'O que você encontra');await page.locator('#studio-'+id+'-block-'+i+'-text').fill(i?'Consulte as condições e confira as informações antes de visitar.':'Peças e informações escolhidas para o público do projeto.');}
      await page.locator('#studio-'+id+'-target').selectOption(p.target);
    }
    await page.locator('#studio-task').fill('Descubra se há camiseta M e quando posso visitar.');await page.locator('#studio-start-visit').click();
    assert(await page.locator('#free-studio').evaluate(el=>el.classList.contains('is-visiting')));
    await page.locator('#studio-preview .st-site-cta').click();assert.match(await page.locator('#studio-preview h3').innerText(),/Encontre/);
    await page.locator('#studio-preview .st-site-cta').click();assert.match(await page.locator('#studio-preview h3').innerText(),/sábado/);
    await page.locator('#studio-end-visit').click();await page.locator('#studio-test-note').fill('O cliente encontrou camiseta M e o horário sem explicação da agência.');
    assert.deepEqual((await saved()).studio.test.path.map(x=>x.page),['home','info','visit']);
    await page.locator('#studio-demand').fill('No sábado a loja abrirá apenas às 15h. O visitante precisa perceber.');await page.locator('#studio-receive-change').click();
    await page.locator('[data-st-editor="visit"]').click();await page.locator('#studio-visit-title').fill('Sábado, abertura especial às 15h.');await page.locator('#studio-adjustment').fill('Atualizamos o título da visita para antecipar a informação do horário.');await page.locator('#studio-conclusion').fill('O caminho permitiu decidir a visita. Manteremos os nomes e daremos destaque às mudanças de horário.');
    await page.locator('#studio-check').click();assert.match(await page.locator('#studio-feedback').innerText(),/Projeto registrado/);
    assert.equal((await saved()).studio.revision.before.pages.visit.title,pages.visit.title,'A versão anterior é preservada.');
    await page.reload();assert.equal((await saved()).studio.pages.visit.title,'Sábado, abertura especial às 15h.');assert.equal((await saved()).groups[0].name,'Rótulo anterior');assert.equal((await saved()).lab.profiles.plan.title,'Projeto anterior salvo');
    await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Sem overflow móvel.');assert.deepEqual(errors,[]);
    console.log('Estúdio: acesso direto, migração sem perda, três páginas, navegação, trilha, revisão, persistência e móvel passaram.');
  }finally{await browser.close();}
}
module.exports=run;
if(require.main===module)run().catch(e=>{console.error(e);process.exitCode=1;});
