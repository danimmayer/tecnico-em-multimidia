// Regressão de armazenamento: dados fictícios, contexto/Chrome isolado.
const assert = require('node:assert/strict');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

const KEY = 'senai-dw16-rafe-v2';
const blocks = (prefix) => [
  {type:'title',text:`${prefix} título`}, {type:'text',text:`${prefix} contexto`},
  {type:'image',text:`${prefix} destaque`}, {type:'cta',text:`${prefix} ação`}
];
// Formato v2 completo que alunos já podem ter no mesmo navegador: três iniciais
// e uma interna, ideias, conceito, teste e registros individuais.
const legacyV2 = () => ({
  v:2, step:5, problem:'Escolher atividade e entrada', priority:'Horário antes da imagem',
  ideas:['Agenda','Chegada','Atividade','Mapa','Horários','Acessibilidade'],
  selected:[0,2,4], reasons:{0:'Agenda resolve a escolha.',2:'Atividade orienta a pessoa.',4:'Horário permite decidir.'},
  rafes:[{blocks:blocks('Inicial A')},{blocks:blocks('Inicial B')},{blocks:blocks('Inicial C')}],
  active:2, chosenDirection:2, internal:blocks('Interna'),
  visitNote:'Visitante encontrou o horário e procurou a entrada lateral.',
  revision:'Mantive o horário e esclareci o acesso.', memberA:'Defendi a agenda pelo horário.',
  memberB:'Observei a busca pela entrada.', conceptName:'Próximo encontro',
  conceptWhy:'Horário e acesso ajudam antes de sair.',
  tests:[{at:1730000000000,direction:2,blocks:blocks('Teste inicial'),internal:blocks('Teste interna'),note:'Visitante abriu a programação.'}]
});

async function run(driver, workshopUrl) {
  const {chromium} = driver || require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const browser = await chromium.launch({channel:process.env.BROWSER_CHANNEL || 'chrome',headless:true});
  const url = workshopUrl || process.env.WORKSHOP_URL || pathToFileURL(path.resolve(__dirname,'../modelos/design-web/aula-16/index.html')).href;
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Uma primeira navegação estabelece a mesma origin; nenhum perfil do usuário é usado.
    await page.goto(url);
    const fixture = legacyV2();
    await page.evaluate(([key,value]) => localStorage.setItem(key, JSON.stringify(value)), [KEY, fixture]);
    await page.reload();
    const restored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), KEY);
    assert.deepEqual(restored, fixture, 'Um rascunho v2 completo deve sobreviver ao reload no mesmo origin e mesma chave.');
    assert.equal(await page.locator('[data-text="conceptName"]').inputValue(), fixture.conceptName, 'A interface reabre o conceito legado.');

    // Estado que parece legado, mas é inválido: não pode ser silenciosamente zerado e salvo por cima.
    const invalidRaw = JSON.stringify({...legacyV2(), tests:[{at:1730000000000,direction:2,blocks:blocks('Teste sem nota'),internal:blocks('Interna sem nota')}]});
    await page.evaluate(([key,raw]) => localStorage.setItem(key, raw), [KEY, invalidRaw]);
    await page.reload();
    const afterInvalidBoot = await page.evaluate(key => localStorage.getItem(key), KEY);
    assert.equal(afterInvalidBoot, invalidRaw, 'Falha ao ler legado não pode sobrescrever o raw; preserve-o ou faça backup recuperável antes de inicializar.');
    await context.close();
    console.log('Aula 16: armazenamento v2 completo persiste; legado inválido não é sobrescrito.');
  } finally { await browser.close(); }
}
if (require.main === module) run().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = {run, legacyV2, KEY};
