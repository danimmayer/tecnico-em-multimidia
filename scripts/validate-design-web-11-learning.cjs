// Exercise the six warm-up interactions, persistence and portable prototype.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const {pathToFileURL}=require('node:url');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'dw11-learning-'));
const projectPath=path.join(temp,'projeto.interacao');
const prototypePath=path.join(temp,'prototipo.html');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{const c=await b.newContext({acceptDownloads:true,viewport:{width:1280,height:1024}});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(process.env.WORKSHOP_URL||'http://127.0.0.1:8923/modelos/design-web/aula-11/oficina.html');
const state=s=>p.waitForFunction(s=>document.querySelector('#interaction').dataset.state===s,s,{timeout:6000});
const click=t=>p.getByRole('button',{name:t,exact:true}).click();
async function mission(key){await p.locator('#challenge-menu > summary').click();await p.locator(`[data-mission="${key}"]`).click();}
const status=()=>p.locator('#mission-progress').innerText();
assert.equal(await p.locator('#first-guide').isVisible(),true);assert.equal(await p.locator('#writing-controls').isVisible(),false);
await click('Continuar');await state('empty');assert.equal(await p.locator('#writing-controls').isVisible(),true);
await p.locator('#edit-empty').fill('Escolha um campeonato para continuar.');assert.match(await status(),/1 de 6 mensagens escritas · 0 de 6 caminhos/);
await p.locator('#see-before').click();await p.locator('#championship').selectOption('Corrida virtual');await click('Continuar');await state('success');assert.match(await status(),/0 de 6 caminhos/,'Original comparison must not earn progress');
await p.locator('#see-mine').click();await p.locator('#championship').selectOption('Xadrez rápido');await click('Continuar');await state('success');assert.match(await status(),/1 de 6 caminhos/);
const texts={loading:'Enviando sua inscrição. Aguarde a confirmação.',error:'A conexão falhou. Sua escolha está mantida; tente novamente.',success:'Sua inscrição está confirmada.',confirm:'Cancelar a inscrição neste campeonato?',cancelled:'Inscrição cancelada. Comece outra em Nova inscrição.'};
for(const [key,text] of Object.entries(texts)){
 await mission(key);await p.locator('#edit-'+key).fill(text);await p.locator('#see-mine').click();
 if(key==='loading')await state('success');
 if(key==='error'){await state('error');assert.match(await status(),/2 de 6 caminhos/);await click('Tentar novamente');await state('success');assert.match(await p.locator('#interaction').innerText(),/Xadrez rápido/);}
 if(key==='success'){await state('success');await click('Cancelar inscrição');}
 if(key==='confirm'){await click('Manter inscrição');await click('Cancelar inscrição');await click('Confirmar cancelamento');}
 if(key==='cancelled'){await click('Nova inscrição');assert.equal(await p.locator('#championship').inputValue(),'');await p.locator('#championship').selectOption('Corrida virtual');await click('Continuar');await state('success');}
 assert.equal(await p.locator('#practice-result').getAttribute('data-complete'),'true',key);
}
assert.match(await status(),/6 de 6 mensagens escritas · 6 de 6 caminhos executados/);
await p.reload();assert.match(await status(),/6 de 6 caminhos/);assert.equal(await p.locator('#first-guide').isVisible(),false);
await mission('error');await p.locator('#edit-error').fill('Não conseguimos enviar. Tente de novo.');assert.match(await status(),/5 de 6 caminhos/);await p.locator('#see-mine').click();await state('error');await click('Tentar novamente');await state('success');assert.match(await status(),/6 de 6 caminhos/);
await mission('cancelled');await p.locator('.peer > summary').click();await p.locator('#review-task1').fill('Conseguiu se inscrever sem ajuda.');await p.locator('#review-task2').fill('Manteve e cancelou sem ajuda.');
await p.locator('summary').filter({hasText:'Salvar e conferir a entrega'}).click();
async function download(id,path){const event=p.waitForEvent('download');await p.locator(id).click();await(await event).saveAs(path);}
await download('#save',projectPath);await download('#export',prototypePath);
const saved=JSON.parse(fs.readFileSync(projectPath,'utf8'));assert.equal(Object.keys(saved.practice).length,6);
await p.locator('#open').setInputFiles(projectPath);assert.match(await status(),/6 de 6 caminhos/);
const q=await c.newPage();q.on('pageerror',e=>errors.push(e.message));await c.setOffline(true);await q.goto(pathToFileURL(prototypePath).href);await q.locator('#championship').selectOption('Xadrez rápido');await q.getByRole('button',{name:'Continuar',exact:true}).click();await q.getByRole('button',{name:'Cancelar inscrição',exact:true}).waitFor();assert.equal(await q.locator('#goal-steps').isVisible(),false);assert.deepEqual(errors,[]);
await c.setOffline(false);const legacy=structuredClone(saved);delete legacy.practice;legacy.review.diagnosis='Observação do projeto anterior.';await p.locator('#open').setInputFiles({name:'anterior.interacao',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(legacy))});assert.equal(await p.locator('#edit-empty').inputValue(),legacy.messages.empty);assert.equal(await p.locator('#review-diagnosis').inputValue(),legacy.review.diagnosis);assert.match(await status(),/0 de 6 caminhos/);
console.log('PASS: first guided action, six real tasks, original excluded, edit invalidation, progress restored, export/import, legacy drafts and offline prototype');
}finally{await b.close();fs.rmSync(temp,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exitCode=1});
