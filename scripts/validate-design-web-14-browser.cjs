// Requires Playwright, local Chromium and a static server at WORKSHOP_URL.
const {chromium}=require('playwright');

const assert=require('node:assert/strict');

const path=require('node:path');

const fs=require('node:fs');

const tmp=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'dw14-browser-'));

(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,executablePath:process.env.CHROMIUM_PATH||undefined});
try{const page=await browser.newPage({viewport:{width:986,height:969}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.goto(process.env.WORKSHOP_URL||'http://127.0.0.1:8921/modelos/design-web/aula-14/');
await page.locator('[data-choice="menu"]').click();
await page.locator('#objective').fill('A página ajuda moradores a consultar o cardápio.');
await page.getByRole('button',{name:'2. Cliente',exact:true}).click();
await page.locator('#audience').fill('Moradores pelo celular.');
const downloadPromise=page.waitForEvent('download');
await page.locator('#save').click();
const download=await downloadPromise;
await download.saveAs(path.join(tmp,'briefing-dw14-test.json'));
const data=JSON.parse(require('node:fs').readFileSync(path.join(tmp,'briefing-dw14-test.json'),'utf8'));
assert.equal(data.answers.audience,'Moradores pelo celular.');
await page.reload();
assert.equal(await page.locator('#audience').inputValue(),'Moradores pelo celular.');
page.on('dialog',d=>d.accept());
await page.locator('#open').setInputFiles(path.join(tmp,'briefing-dw14-test.json'));
assert.equal(await page.locator('#objective').inputValue(),'A página ajuda moradores a consultar o cardápio.');
await page.locator('#open').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":9}')});
assert.match(await page.locator('#status').innerText(),/Não consegui/);
assert.equal(await page.locator('#audience').inputValue(),'Moradores pelo celular.');
await page.getByRole('button',{name:'6. Guardar',exact:true}).click();
assert.match(await page.locator('#checklist').innerText(),/Ainda faltam/);
const textPromise=page.waitForEvent('download');
await page.locator('#text').click();
await(await textPromise).saveAs(path.join(tmp,'briefing-dw14-test.txt'));
assert.match(require('node:fs').readFileSync(path.join(tmp,'briefing-dw14-test.txt'),'utf8'),/Moradores pelo celular/);
await page.getByRole('button',{name:'1. Objetivo',exact:true}).click();
await page.screenshot({path:path.join(tmp,'dw14-oficina.png')});
await page.setViewportSize({width:390,height:844});
for(const name of ['1. Objetivo','4. Referências','6. Guardar']){await page.getByRole('button',{name,exact:true}).click();
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow: '+name)}await page.goto(new URL('/aula-kit.html?uc=design-web&aula=14',page.url()).href);
await page.locator('#nextBtn').click();
await page.getByRole('heading',{name:'Seu cliente mandou mensagem.',exact:true}).waitFor();
await page.setViewportSize({width:986,height:969});
await page.screenshot({path:path.join(tmp,'dw14-aula.png')});
assert.deepEqual(errors,[]);
console.log('PASS: aula renderiza; escolhas, navegação, JSON, TXT, recuperação, importação inválida e largura móvel.')}
finally{await browser.close();
fs.rmSync(tmp,{recursive:true,force:true})}})().catch(e=>{console.error(e);
process.exitCode=1});
