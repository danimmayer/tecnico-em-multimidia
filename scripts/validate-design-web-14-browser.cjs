// Requires a local static server (WORKSHOP_URL) and local Chromium. It never uses an external service.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const path=require('node:path');
const vm=require('node:vm');

const url=process.env.WORKSHOP_URL||'http://127.0.0.1:8921/modelos/design-web/aula-14/';
const join=(base,query)=>base+(base.includes('?')?'&':'?')+query;
const fill=async(locator,value)=>{await locator.fill(value); await locator.blur();};
const mission=page=>page.locator('#mission').innerText();
(async()=>{
 // The answer data comes from the workshop source itself, so the test follows the random draw.
 const source=await fs.readFile(path.join(__dirname,'../modelos/design-web/aula-14/oficina.js'),'utf8');
 const {CLIENTS}=new vm.Script(`${source.slice(source.indexOf('const f = '),source.indexOf('const CLIENT_IDS'))}; ({CLIENTS});`).runInNewContext({});
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,headless:true,args:['--no-sandbox']});
 try {
  const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error') errors.push(message.text());});
  // Fora do horário da aula tudo fica aberto; o relógio é conferido numa página separada abaixo.
  const openUrl=join(url,'hora=15:00');
  await page.goto(openUrl,{waitUntil:'networkidle'});
  assert.match(await page.locator('.masthead h1').innerText(),/Estúdio de briefing/);
  assert.equal(await page.locator('#clockbar').isHidden(),true,'fora do horário não há faixa de relógio');
  await fill(page.locator('#team'),'Lu + Caio');

  // Aquecimento: oito cartões com retorno imediato.
  for(let i=0;i<8;i++) { await page.locator(`[data-warm="${i%2?'briefing':'vago'}"]`).click(); assert.match(await page.locator('.warm-result').innerText(),/Pedido vago|Parece briefing/); await page.locator('[data-warm-next]').click(); }
  assert.match(await page.locator('.warm-done').innerText(),/8 de 8 certos/,'cartões alternam vago e briefing');
  assert.match(await mission(page),/Aquecimento \(8\/8\)/);

  // Parada 1: um erro primeiro (perde a primeira tentativa), depois todas as partes certas.
  const parts=['cliente','problema','objetivo','publico','conteudo','referencias','prazo','restricoes','sucesso','restricoes'];
  await page.locator('[data-sentence="0"]').click();
  await page.locator('#part-select').selectOption('prazo');
  assert.match(await page.locator('#tag-status').innerText(),/Ainda não/);
  for(const [i,part] of parts.entries()) { await page.locator(`[data-sentence="${i}"]`).click(); await page.locator('#part-select').selectOption(part); assert.match(await page.locator('#tag-status').innerText(),/Certo/); }
  assert.match(await page.locator('.counter').innerText(),/10 de 10/);
  for(const [i,mark] of ['furo','furo','furo','claro','furo','furo','furo','furo'].entries()) await page.locator(`[data-weak="${i}"][value="${mark}"]`).check();
  assert.equal(await page.locator('.weak-item.is-right').count(),8);
  await fill(page.locator('[data-field="weak.questions"]'),'O que mais atrapalha o salão hoje?\nQuem mais procura o salão?\nPara quando o site precisa estar no ar?');
  assert.match(await mission(page),/Perguntas para fechar furos \(3\/3\)/);
  for(let i=0;i<4;i++) await page.locator('#stuck').click();
  assert.equal(await page.locator('.stuck-list li').count(),4); assert.equal(await page.locator('#stuck').count(),0,'depois de três dicas: perguntar à dupla do lado');
  assert.equal(await page.locator('.extra').count(),0,'desafio extra só com a missão cumprida');
  await Promise.all([page.waitForEvent('download'),page.locator('#export').click()]);
  assert.match(await page.locator('#mission .mission-count').innerText(),/5\/5/);
  assert.match(await page.locator('.extra').innerText(),/Olho de briefing[\s\S]*\(9\/10\)/,'primeira tentativa errada fica registrada');
  await page.locator('details.stretch summary').click();
  for(const [i,v] of ['fato','hipotese','pergunta','fato','hipotese','pergunta'].entries()) await page.locator(`[data-fhp="${i}"][value="${v}"]`).check();
  assert.match(await page.locator('.extra').innerText(),/Fato, hipótese ou pergunta \(6\/6\)/);
  await fill(page.locator('[data-field="weak.rewrite"]'),'O Salão Bela Vista precisa que clientes do bairro agendem cortes pelo celular, vendo horários e preços.');
  assert.match(await page.locator('.extra').innerText(),/Pedido do salão reescrito como briefing\s*\(feito\)/);

  // Parada 2: sorteio, ficha secreta e duas rodadas completas.
  await page.locator('[data-go="2"]').click();
  assert.match(page.url(),/fase=2&rodada=1/);
  await page.locator('#draw').click();
  const draw=await page.evaluate(()=>JSON.parse(localStorage.getItem('senai-design-web-14-briefing-v1')).interview.draw);
  assert.equal(draw.length,2); assert.notEqual(draw[0],draw[1],'dois clientes diferentes');
  for(const [i,id] of draw.entries()) {
   if(i===1) { await page.locator('[data-go="round-2"]').click(); assert.match(page.url(),/rodada=2/); }
   const client=CLIENTS[id];
   assert.match(await page.locator('.client-card h3').innerText(),new RegExp(client.name));
   assert.equal(await page.locator('#secret').count(),0,'ficha começa escondida');
   await page.locator('#secret-show').click();
   assert.match(await page.locator('#secret').innerText(),new RegExp(client.pepitas[0][2].slice(0,30).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
   await page.locator('#secret-hide').click();
   assert.equal(await page.locator('#secret').count(),0);
   for(const [topic,answer] of Object.entries(client.topics)) await fill(page.locator(`[data-field="interview.rounds.${i}.answers.${topic}"]`),answer);
   await page.locator(`[data-why="${i}:1"]`).click(); await page.locator(`[data-why="${i}:1"]`).click();
   assert.equal(await page.locator('.why-count').innerText(),'2');
   await page.locator(`[data-reveal="${i}"]`).click();
   for(let k=0;k<3;k++) await page.locator(`[data-pepita="${i}:${k}"]`).check();
   await fill(page.locator(`[data-field="interview.rounds.${i}.resumo"]`),`${client.person} precisa que o site resolva: ${client.topics.objetivo}`);
   await page.locator(`[data-confirm="${i}"]`).check();
   assert.match(await mission(page),new RegExp(`Rodada ${i+1} completa`));
  }
  await page.locator('[data-go="round-3"]').click();
  await page.locator('[name="chosen"][value="1"]').check();
  await fill(page.locator('[data-field="interview.motivo"]'),'Mais informação concreta e um problema claro de atendimento.');
  assert.match(await page.locator('#mission .mission-count').innerText(),/4\/4/);
  assert.match(await page.locator('.extra').innerText(),/Entrevista de ouro/);

  // Parada 3: métodos, concorrentes conferidos pelo dado real, referências, tendências e telefonema.
  await page.locator('[data-go="3"]').click();
  const chosen=CLIENTS[draw[0]];
  assert.match(await page.locator('#stage-title').evaluate(el=>el.closest('.stage-top').innerText),new RegExp(chosen.name));
  for(const [i,m] of ['entrevista','concorrentes','referencias','tendencias'].entries()) await page.locator(`[data-method="${i}"][value="${m}"]`).check();
  await page.locator('[data-mock="0:celular"]').click();
  assert.equal(await page.locator('.mock-frame.is-phone').count(),1,'visão de celular');
  for(const [i,rival] of chosen.rivals.entries()) for(const [h,v] of Object.entries(rival.f)) await page.locator(`[data-matrix="${i}-${h}"]`).selectOption(v?'sim':'nao');
  // Um erro proposital: a conferência diz quantas estão certas, não quais.
  const [h0,v0]=Object.entries(chosen.rivals[0].f)[0];
  await page.locator(`[data-matrix="0-${h0}"]`).selectOption(v0?'nao':'sim');
  await page.locator('#check-matrix').click();
  assert.match(await page.locator('#matrix-status').innerText(),/17 de 18 corretas\. Olhem de novo/);
  await page.locator(`[data-matrix="0-${h0}"]`).selectOption(v0?'sim':'nao');
  await page.locator('#check-matrix').click();
  assert.match(await page.locator('#matrix-status').innerText(),/18 de 18[\s\S]*perfeita/);
  await fill(page.locator('[data-field="research.opportunity"]'),'Nenhum concorrente resolve isso bem: é a nossa chance.');
  for(const id of ['precos','agenda','mensagem','topo']) { await page.locator(`[data-ref="${id}"]`).check(); await fill(page.locator(`[data-ref-note="${id}"]`),'Serve porque o público do cliente usa o celular.'); }
  for(const [id,v] of [['mensagem','usar'],['video','observar'],['leve','usar'],['escuro','observar']]) { await page.locator(`[data-trend="${id}"][value="${v}"]`).check(); await fill(page.locator(`[data-trend-why="${id}"]`),'Ajuda o público do cliente.'); }
  await page.locator('#call').click();
  assert.match(await page.locator('#call-title').innerText(),new RegExp(chosen.call.slice(0,20)));
  await fill(page.locator('[data-field="research.call.cut"]'),'Galeria completa\nDepoimentos\nBlog');
  await fill(page.locator('[data-field="research.call.change"]'),'O prazo e o escopo da primeira versão mudaram.');
  assert.match(await page.locator('#mission .mission-count').innerText(),/6\/6/);

  // Parada 4: o briefing chega preenchido com a entrevista; acessibilidade, validação e entrega.
  await page.locator('[data-go="4"]').click();
  assert.equal(await page.locator('[data-field="doc.publico"]').inputValue(),chosen.topics.publico,'entrevista preenche o briefing');
  assert.match(await page.locator('[data-field="doc.restricoes"]').inputValue(),/escopo da primeira versão/,'telefonema entra nas restrições');
  await fill(page.locator('[data-field="doc.falta"]'),'Fotos novas: o dono fotografa na segunda.');
  await fill(page.locator('[data-field="doc.objetivo"]'),'A pessoa consegue fazer o pedido pelo celular em poucos toques.');
  assert.match(await page.locator('#brief-preview').innerText(),/em poucos toques/,'prévia acompanha a escrita');
  for(const id of ['contraste','toque']) await page.locator(`[data-access="${id}"]`).check();
  await fill(page.locator('[data-field="review.peer"]'),'Bia + Theo');
  for(let i=0;i<6;i++) await page.locator(`[data-check="${i}"][value="${i===4?'quase':'sim'}"]`).check();
  await fill(page.locator('[data-field="review.suggestion"]'),'Colocar um número no critério de sucesso.');
  await fill(page.locator('[data-field="review.adjust"]'),'Sucesso agora tem número e prazo.');
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('[data-export]').click()]);
  const html=await fs.readFile(await download.path(),'utf8');
  for(const text of ['Briefing de uma página','01 / Decifrar','02 / Entrevistas','03 / Pesquisa','04 / Validação','Os registros essenciais estão preenchidos','✓ Parada 4']) assert.ok(html.includes(text),`exportação sem ${text}`);
  assert.ok(!/(?:src|href)="https?:|url\(https?:|https?:\/\//.test(html),'exportação é autônoma');
  const data=JSON.parse(html.match(/<script type="application\/json" id="briefing-data">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data.cliente,draw[0]); assert.equal(data.naoEntraAgora.length,3); assert.equal(data.acessibilidade.length,2); assert.equal(data.referencias.length,4);
  assert.match(download.suggestedFilename(),/^aula-14-briefing-lu-caio-\d{6}\.html$/);
  assert.match(await page.locator('#mission .mission-count').innerText(),/5\/5/,'entrega final fecha a missão');

  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('[data-field="review.adjust"]').inputValue(),'Sucesso agora tem número e prazo.','estado persiste localmente');
  await context.setOffline(true);
  await page.locator('.phase-rail [data-phase="1"]').click();
  assert.match(await page.locator('#workspace').innerText(),/O que um briefing precisa dizer/,'oficina já carregada funciona offline');
  await context.close();

  // Casos de borda: exportação vazia não fecha a Parada 4; trocar de projeto recomeça o que era do cliente anterior.
  const edgeContext=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});
  const edge=await edgeContext.newPage(); edge.on('pageerror',error=>errors.push(error.message));
  await edge.goto(join(openUrl,'fase=4'),{waitUntil:'networkidle'});
  const [empty]=await Promise.all([edge.waitForEvent('download'),edge.locator('#export').click()]);
  const emptyHtml=await fs.readFile(await empty.path(),'utf8');
  for(const item of ['aquecimento','perguntas para fechar os furos','métodos de pesquisa','oportunidade que ninguém aproveita']) assert.ok(emptyHtml.includes(item),`pendências sem ${item}`);
  assert.doesNotMatch(await edge.locator('#mission').innerText(),/Exportar a entrega final \(feito\)/,'exportação vazia não conta como entrega final');
  await edge.goto(join(openUrl,'fase=2&rodada=1'),{waitUntil:'networkidle'});
  await edge.locator('#draw').click();
  const pair=await edge.evaluate(()=>JSON.parse(localStorage.getItem('senai-design-web-14-briefing-v1')).interview.draw);
  for(const i of [0,1]) await edge.evaluate(([i,text])=>{const s=JSON.parse(localStorage.getItem('senai-design-web-14-briefing-v1'));s.interview.rounds[i].answers.publico=text;s.interview.chosen=1;s.research.matrix={'0-horario':'sim'};localStorage.setItem('senai-design-web-14-briefing-v1',JSON.stringify(s));},[i,`Público da rodada ${i+1}`]);
  await edge.goto(join(openUrl,'fase=4'),{waitUntil:'networkidle'});
  assert.equal(await edge.locator('[data-field="doc.publico"]').inputValue(),'Público da rodada 1');
  await edge.goto(join(openUrl,'fase=2&rodada=3'),{waitUntil:'networkidle'});
  edge.once('dialog',dialog=>dialog.dismiss());
  await edge.locator('[name="chosen"][value="2"]').click();
  assert.equal(await edge.locator('[name="chosen"][value="1"]').isChecked(),true,'cancelar mantém o projeto anterior');
  edge.once('dialog',dialog=>dialog.accept());
  await edge.locator('[name="chosen"][value="2"]').check();
  await edge.goto(join(openUrl,'fase=4'),{waitUntil:'networkidle'});
  assert.equal(await edge.locator('[data-field="doc.publico"]').inputValue(),'Público da rodada 2','briefing segue o novo projeto');
  assert.match(await edge.locator('.brief-sheet').innerText(),new RegExp(CLIENTS[pair[1]].name,'i'));
  assert.deepEqual(await edge.evaluate(()=>JSON.parse(localStorage.getItem('senai-design-web-14-briefing-v1')).research.matrix),{},'comparação do cliente anterior não conta para o novo');
  await edge.goto(join(openUrl,'fase=1'),{waitUntil:'networkidle'});
  await edge.locator('details.stretch summary').click();
  await edge.locator('[data-weak="0"][value="furo"]').check();
  assert.equal(await edge.locator('details.stretch').evaluate(el=>el.open),true,'desafio aberto continua aberto após nova renderização');
  await edgeContext.close();

  // Telas estreitas: sem rolagem horizontal em 320 px em nenhuma parada, com a ficha aberta na Parada 2.
  const phoneContext=await browser.newContext({viewport:{width:320,height:740}});
  const phone=await phoneContext.newPage(); phone.on('pageerror',error=>errors.push(error.message));
  for(const phase of [1,2,3,4]) {
   await phone.goto(join(openUrl,`fase=${phase}`),{waitUntil:'networkidle'});
   if(phase===2) { await phone.locator('#draw').click(); await phone.locator('#secret-show').click(); }
   if(phase===3) await phone.locator('[data-mock="0:celular"]').click();
   assert.ok(await phone.evaluate(()=>document.documentElement.scrollWidth<=322),`sem rolagem horizontal em 320 px (Parada ${phase})`);
  }
  await phoneContext.close();

  // Relógio da aula: paradas e rodadas abrem no horário; a palavra do professor libera se o relógio errar.
  const timedContext=await browser.newContext({viewport:{width:1366,height:900}});
  const timed=await timedContext.newPage(); timed.on('pageerror',error=>errors.push(error.message));
  await timed.goto(join(url,'hora=20:14&fase=2&rodada=2'),{waitUntil:'networkidle'});
  assert.match(await timed.locator('#clockbar').innerText(),/20:14[\s\S]*Rodada 1 · Entrevista[\s\S]*11 min/);
  assert.match(await timed.locator('.locked').innerText(),/Rodada 2[\s\S]*Abre às 20:25/,'Rodada 2 espera o horário');
  await timed.locator('[data-jump]').click();
  assert.equal(await timed.locator('#draw').count(),1,'“Ir para lá” leva à rodada da vez');
  assert.match(await timed.locator('.phase-rail [data-phase="3"]').innerText(),/abre às 20:50/);
  await timed.locator('.phase-rail [data-phase="4"]').click();
  assert.match(await timed.locator('.locked').innerText(),/Parada 4[\s\S]*21:35/);
  await timed.locator('#key-input').fill('farol?'); await timed.locator('#key-ok').click();
  assert.match(await timed.locator('#key-status').innerText(),/não reconhecida/);
  await timed.locator('#key-input').fill('Acordo'); await timed.locator('#key-input').press('Enter');
  assert.equal(await timed.locator('[data-field="doc.resumo"]').count(),1,'palavra do professor libera a parada');
  await timed.goto(join(url,'hora=19:00&fase=3'),{waitUntil:'networkidle'});
  assert.equal(await timed.locator('#call').count(),1,'palavra da Parada 4 também libera o telefonema');
  await timedContext.close();
  const keyContext=await browser.newContext({viewport:{width:1366,height:900}});
  const keyed=await keyContext.newPage(); keyed.on('pageerror',error=>errors.push(error.message));
  await keyed.goto(join(url,'hora=19:20&fase=2'),{waitUntil:'networkidle'});
  await keyed.locator('#key-input').fill('escuta'); await keyed.locator('#key-ok').click();
  await keyed.locator('[data-round="3"]').click();
  assert.equal(await keyed.locator('[name="chosen"], .choice-grid, #choice-title').count()>0,true,'palavra da Parada 2 abre todas as rodadas');
  await keyed.goto(join(url,'hora=19:50&fase=1'),{waitUntil:'networkidle'});
  assert.match(await keyed.locator('#clockbar').innerText(),/Intervalo/); assert.equal(await keyed.locator('[data-jump]').count(),0);
  await keyContext.close();

  // Telefonema toca sozinho às 21:20 para quem já está na Parada 3.
  const live=await browser.newPage({viewport:{width:1366,height:900}}); live.on('pageerror',error=>errors.push(error.message));
  const today=new Date(); today.setHours(21,19,30,0);
  await live.clock.install({time:today});
  await live.goto(join(url,'fase=3'),{waitUntil:'networkidle'});
  assert.match(await live.locator('.shock-closed.is-locked').innerText(),/21:20/);
  await fill(live.locator('[data-field="research.opportunity"]'),'Texto em andamento');
  await live.locator('[data-field="research.opportunity"]').focus();
  await live.clock.runFor(41000);
  assert.equal(await live.locator('#call').count(),1,'telefonema toca sem recarregar');
  assert.equal(await live.evaluate(()=>document.activeElement?.dataset?.field),'research.opportunity','telefonema não tira o foco de quem escreve');
  await live.close();
  assert.deepEqual(errors,[]);
  console.log('Aula 14 browser: aquecimento, briefing comentado, furos, sorteio e ficha secreta, duas entrevistas, escolha, concorrentes conferidos, referências, tendências, telefonema, briefing pré-preenchido, validação, exportação com dados, persistência, offline, 320 px e relógio validados.');
 } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exit(1)});
