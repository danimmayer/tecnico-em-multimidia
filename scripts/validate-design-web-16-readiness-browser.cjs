// Prontidão: experimentar não certifica qualidade nem exige um tipo de bloco específico.
const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {legacyV2,KEY}=require('./validate-design-web-16-storage-browser.cjs');
const simple=prefix=>[{type:'text',text:prefix+' escolha uma atividade e horário'},{type:'image',text:prefix+' mapa/ilustração'},{type:'cta',text:'Abrir detalhes'}];
const empty=()=>[{type:'text',text:''},{type:'image',text:'Imagem ou destaque'},{type:'cta',text:''}];

async function run(driver,url){
  const {chromium}=driver||require(process.env.PLAYWRIGHT_MODULE||'playwright');
  const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
  const workshop=url||process.env.WORKSHOP_URL||pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
  try{
    const context=await browser.newContext({viewport:{width:1366,height:768}});
    const page=await context.newPage();page.setDefaultTimeout(5000);
    await page.clock.install({time:new Date('2026-11-13T23:00:00Z')}); // 20h São Paulo
    await page.goto(workshop);
    const boot=async state=>{await page.evaluate(([key,value])=>localStorage.setItem(key,JSON.stringify(value)),[KEY,state]);await page.reload();};

    const partial=legacyV2();partial.step=4;partial.chosenDirection=2;
    partial.rafes=[{blocks:simple('A')},{blocks:empty()},{blocks:simple('C')}];partial.internal=simple('Interna');
    await boot(partial);await page.locator('#startVisit').click();
    assert(await page.locator('#nav').isHidden(),'Uma direção alternativa vazia não bloqueia a visita da direção escolhida.');
    await page.locator('#endVisit').click();

    const noTitle=legacyV2();noTitle.step=5;noTitle.chosenDirection=2;
    noTitle.rafes=[{blocks:simple('A')},{blocks:simple('B')},{blocks:simple('C')}];noTitle.internal=simple('Interna');
    await boot(noTitle);await page.locator('#openExtension').click();
    await page.locator('#extensionDirection').selectOption('0');await page.locator('#startComparison').click();
    assert(await page.locator('#compareA .phone').isVisible(),'A/B abre com conteúdo navegável mesmo sem bloco do tipo título.');
    assert(await page.locator('#compareB .phone').isVisible());
    await page.locator('#nav [data-go="5"]').click();await page.locator('#check').click();
    assert.match(await page.locator('#checkOut').innerText(),/Registros presentes/,'Checklist não cria falsa pendência pelo tipo título.');

    const withEmpty=legacyV2();withEmpty.step=5;withEmpty.rafes[1].blocks=empty();
    await boot(withEmpty);await page.locator('#check').click();
    const emptyCheck=await page.locator('#checkOut').innerText();
    assert.match(emptyCheck,/Direção 2/,'Checklist identifica concretamente o esboço sem conteúdo.');
    assert.doesNotMatch(emptyCheck,/qualidade|bom|ruim/i,'Checklist informa registro ausente, sem certificar qualidade.');

    const incomplete=legacyV2();incomplete.step=4;incomplete.problem='';incomplete.priority='';incomplete.conceptName='';incomplete.conceptWhy='';incomplete.selected=[];incomplete.reasons={};
    await boot(incomplete);await page.locator('#startVisit').click();
    assert(await page.locator('#nav').isHidden(),'Contexto incompleto não bloqueia um teste exploratório.');
    console.log('Aula 16: visita e A/B aceitam experimentação; checklist aponta apenas registros concretamente vazios.');
  }finally{await browser.close();}
}
if(require.main===module)run().catch(error=>{console.error(error);process.exitCode=1;});
module.exports={run};
