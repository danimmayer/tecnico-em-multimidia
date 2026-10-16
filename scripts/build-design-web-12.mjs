import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {lesson,support,releaseCodes} from './lessons/design-web-12.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const dir=root+'scripts/lessons/design-web-12-workshop/';
const read=p=>fs.readFileSync(p,'utf8');
const strip=s=>s.replace(/^export /gm,'');
const css=read(dir+'styles.css');
const prototype=strip(read(dir+'prototype.mjs'));
const scriptJSON=value=>JSON.stringify(value).replaceAll('<','\\u003c');
const template=(title,body,script)=>`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Uma oficina visual de UX com uma reserva fictícia de estúdio."><meta name="color-scheme" content="light"><title>${title}</title><link rel="icon" href="data:,"><style>${css}</style></head><body>${body}<script>${script.replaceAll('</script','<\\/script')}</script></body></html>`;
function prototypeDocument(design){return template('Reserva fictícia · Meu protótipo UX','<header><strong class="brand">Meu protótipo <span>UX</span></strong><span class="small">Aula 12 · Design Web</span></header><main><p class="note">Esta interface é uma simulação. Nenhuma reserva, pagamento ou informação é enviada.</p><div class="prototype" id="prototype"></div></main>',prototype+'\nmountPrototype(document.getElementById("prototype"),'+scriptJSON(design)+');');}
// Keep the export factory self-contained: no project data or release keys in the resulting HTML.
const exportFactory='const prototypeDocument = '+prototypeDocument.toString()+';\nconst template = '+template.toString()+';\nconst css = '+scriptJSON(css)+';\nconst prototype = '+scriptJSON(prototype)+';\nconst scriptJSON = '+scriptJSON.toString()+';';
const script=strip(read(dir+'content.mjs'))+'\n'+strip(read(dir+'state.mjs'))+'\n'+prototype+'\nconst unlockHashes='+JSON.stringify(releaseCodes.map(c=>createHash('sha256').update(c).digest('hex')))+';\n'+exportFactory+'\n'+read(dir+'runtime.mjs');
const body=`<header><div><div class="brand">Oficina<span> / UX</span></div><div class="small">Design Web · Aula 12</div></div><span class="badge">Um pedido de cada vez</span></header><main><div class="toolbar"><button id="save-project">Salvar projeto .ux</button><button id="open-project">Abrir projeto</button><input id="file-input" type="file" accept=".ux,application/json" hidden><span class="saved" id="save-status" role="status"></span></div><p class="eyebrow" id="phase-tag"></p><h1 id="phase-title" tabindex="-1"></h1><p class="intro" id="phase-intro"></p><nav id="phase-nav" class="steps" aria-label="Etapas da oficina"></nav><p class="note" id="task"></p><div class="layout"><div><section class="card" id="activity" aria-label="Atividade atual"></section><section class="card"><h2>Seu ponto de conferência</h2><p id="criteria"></p><button id="complete" class="primary">Registrar esta etapa</button><details><summary>Terminei esta etapa</summary><p id="extra"></p></details></section><section class="gate" id="gate"><h2>A próxima etapa chega com o professor</h2><p>Continue na melhoria desta etapa. Concluir não abre o próximo pedido.</p><form id="unlock-form"><label><span id="gate-label"></span><input id="unlock-code" type="text" maxlength="32" autocomplete="off" autocapitalize="characters" spellcheck="false"></label><button type="submit">Liberar próxima etapa</button></form></section></div><aside class="preview"><h2 id="preview-title"></h2><div class="prototype" id="prototype"></div><details><summary>Minhas últimas tentativas</summary><div id="history" class="small"></div></details><p class="small">Tarefa fictícia: Lia quer 30 minutos de estúdio no sábado às 14h. Precisa saber o valor antes de confirmar.</p></aside></div><p id="notice" role="status" aria-live="polite"></p><details><summary>Começar outro projeto</summary><p>Baixe o atual antes de apagar o rascunho.</p><button id="reset">Apagar este rascunho</button></details></main><footer>Prof. Daniel Marcos Mayer · SENAI · Dados e marca fictícios. Sem login ou envio de informações. Salve seus arquivos antes de sair.</footer>`;
for(const [file,global] of [['assets/course-data.js','SENAI_COURSES'],['assets/course-support.js','SENAI_TEACHING_SUPPORT']]){
 const source=read(root+file),context={window:{}};vm.runInNewContext(source,context);const data=context.window[global];
 if(global==='SENAI_COURSES')Object.assign(data['design-web'].lessons.find(l=>l.num==='12'),lesson);else data['design-web'].lessons['12']=support;
 fs.writeFileSync(root+file,source.slice(0,source.indexOf('window.'))+'window.'+global+' = '+JSON.stringify(data,null,2)+';\n');
}
const output=root+'modelos/design-web/aula-12/';fs.mkdirSync(output,{recursive:true});
fs.writeFileSync(output+'index.html',template('Oficina de UX · Aula 12',body,script));
console.log('Aula 12 gerada: apresentação e oficina autônoma com seis etapas.');
