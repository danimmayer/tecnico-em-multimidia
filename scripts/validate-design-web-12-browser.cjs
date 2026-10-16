// Chromium available locally; no browser download or external service required.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const {releaseCodes}=await import('./lessons/design-web-12.mjs');
  const ctx=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});const page=await ctx.newPage();const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const url=process.env.WORKSHOP_URL||'http://127.0.0.1:8901/modelos/design-web/aula-12/';
  await page.goto(url);
  assert.equal(await page.locator('[data-phase]:disabled').count(),5);
  assert.equal(await page.locator('#complete').isDisabled(),true);
  await page.locator('#unlock-code').fill(releaseCodes[2]);await page.locator('#unlock-form button').click();
  assert.equal(await page.locator('[data-phase]:disabled').count(),5,'a future key must not skip stages');
  const prototype=page.locator('#prototype');
  async function reserve({direct=false,slot='14:00'}={}){
   await prototype.locator('[data-go]').first().click();if(!direct)await prototype.locator('[data-go="choose"]').click();
   assert.equal(await prototype.locator('[data-go="review"]').isDisabled(),true);
   await prototype.locator(`[data-slot="${slot}"]`).click();await prototype.locator('[data-go="review"]').click();
   await prototype.locator('[data-go="done"]').click();assert.match(await prototype.innerText(),/confirmada/);
  }
  await reserve();await page.locator('[data-variant="reference"]').click();await reserve({direct:true});
  await page.locator('#complete').click();assert.equal(await page.locator('[data-phase]:disabled').count(),5,'completion does not release next stage');
  async function unlock(index){await page.locator('#unlock-code').fill(releaseCodes[index]);await page.locator('#unlock-form button').click();await page.waitForFunction(n=>document.querySelector('[aria-current="step"]').dataset.phase===String(n),index+1);}
  await unlock(0);await page.locator('[data-friction="price"]').check();await page.locator('[data-friction="summary"]').check();await page.locator('#complete').click();
  await unlock(1);for(let i=0;i<5;i++){for(const k of ['action','doubt','feeling'])await page.locator(`[data-field="journey.${i}.${k}"]`).selectOption({index:1});}await page.locator('#complete').click();
  await unlock(2);await page.locator('[data-field="hypothesis.problem"]').selectOption('price');await page.locator('[data-field="hypothesis.change"]').selectOption('price');await page.locator('[data-field="hypothesis.prediction"]').fill('Com o valor no início, Lia decide antes de escolher o horário.');await page.locator('#complete').click();
  await unlock(3);await page.locator('[data-design="price"]').check();await page.locator('[data-design="summary"]').check();
  await page.locator('[data-field="design.cta"]').fill('Reservar sem dúvida');assert.equal(await page.locator('[data-field="design.cta"]').inputValue(),'Reservar sem dúvida','preview updates must not steal editor focus');
  await reserve();await page.locator('#complete').click();
  // A changed interface must be tested again instead of retaining a stale completion flag.
  await page.locator('[data-design="direct"]').check();assert.equal(await page.locator('#complete').isDisabled(),true);
  await page.getByText('Pedido extra desta etapa',{exact:true}).click();await page.locator('[data-design="soldOut"]').check();
  await prototype.locator('[data-go="choose"]').click();await prototype.locator('[data-slot="14:00"]').click();assert.match(await prototype.innerText(),/indisponível/);
  await prototype.locator('[data-go="choose"]').click();await prototype.locator('[data-slot="15:00"]').click();await prototype.locator('[data-go="review"]').click();
  await prototype.locator('[data-go="choose"]').click();assert.match(await prototype.locator('#slot-message').innerText(),/15:00/,'back navigation preserves the choice');
  await prototype.locator('[data-go="review"]').click();await prototype.locator('[data-go="done"]').click();await page.locator('#complete').click();
  await unlock(4);await page.locator('[data-field="test.result"]').selectOption('Conseguiu sem ajuda');await page.locator('[data-field="test.observation"]').fill('O colega leu o preço e escolheu 15h sem dica.');await page.locator('[data-field="test.revision"]').fill('Mantive o resumo porque ele conferiu o horário.');
  await page.locator('#complete').click();
  // Real file round-trip and a standalone prototype that makes no network requests.
  const [project]=await Promise.all([page.waitForEvent('download'),page.locator('#save-project').click()]);const raw=await fs.readFile(await project.path(),'utf8');const parsed=JSON.parse(raw);assert.equal(parsed.unlocked,5);assert.equal(parsed.journey.length,5);
  await page.reload();assert.match(await page.locator('#phase-title').innerText(),/Testar e revisar/);
  const [prototypeDownload]=await Promise.all([page.waitForEvent('download'),page.locator('#export-prototype').click()]);const html=await fs.readFile(await prototypeDownload.path(),'utf8');assert.ok(!html.includes('unlockHashes'),'export excludes pacing state');assert.ok(!html.includes('Com o valor no início'),'export excludes private working notes');
  await fs.mkdir('tmp',{recursive:true});const output=path.join('tmp','ux-export-'+process.pid+'.html');await fs.writeFile(output,html);const exported=await ctx.newPage();let external=[];exported.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});await exported.goto('http://127.0.0.1:8901/'+output);external=[];await ctx.setOffline(true);await exported.locator('[data-go="choose"]').click();await exported.locator('[data-slot="15:00"]').click();await exported.locator('[data-go="review"]').click();await exported.locator('[data-go="done"]').click();assert.match(await exported.locator('#prototype').innerText(),/confirmada/);assert.deepEqual(external,[]);
  page.on('dialog',dialog=>dialog.accept());await ctx.setOffline(false);await page.locator('#file-input').setInputFiles({name:'roundtrip.ux',mimeType:'application/json',buffer:Buffer.from(raw)});await page.waitForFunction(()=>document.querySelector('#notice').textContent.includes('reaberto'));
  await page.locator('#file-input').setInputFiles({name:'bad.ux',mimeType:'application/json',buffer:Buffer.from('{"version":999}')});await page.waitForFunction(()=>document.querySelector('#notice').textContent.includes('Não foi possível'));assert.equal(await page.locator('[data-phase]:disabled').count(),0,'invalid import must preserve current project');
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal mobile overflow');await page.screenshot({path:'/tmp/ux-mobile.png',fullPage:true});
  const offlineContext=await browser.newContext();const offline=await offlineContext.newPage();await offline.goto(url);await offlineContext.setOffline(true);await offline.locator('#unlock-code').fill(releaseCodes[0]);await offline.locator('#unlock-form button').click();assert.match(await offline.locator('#phase-title').innerText(),/Encontrar/,'unlock works with network offline');
  assert.deepEqual(errors,[]);console.log('Aula 12: liberação sequencial, fluxo, indisponibilidade, revisão, persistência, importação, exportação offline e celular validados.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
