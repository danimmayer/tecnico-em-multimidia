export const VERSION = 1;
export const storageKey = 'senai-design-web-12-v1';
export const initialState = () => ({version:VERSION,unlocked:0,phase:0,completed:[],testedDesign:"",runs:[],frictions:[],journey:Array.from({length:5},()=>({action:'',doubt:'',feeling:''})),hypothesis:{problem:'',change:'',prediction:''},design:{...defaultDesign,cta:"Continuar",price:false,direct:false,summary:false},test:{result:'',observation:'',revision:''}});
export function validateProject(value) {
  const obj = x => x && typeof x === 'object' && !Array.isArray(x);
  const text = (x,max=300) => typeof x === 'string' && x.length <= max;
  const choice = (x,values) => values.includes(x);
  if (!obj(value)||value.version!==VERSION||!Number.isInteger(value.unlocked)||value.unlocked<0||value.unlocked>5||!Number.isInteger(value.phase)||value.phase<0||value.phase>value.unlocked) throw Error('Arquivo de aula incompatível.');
  const d=value.design,h=value.hypothesis,t=value.test;
  if(!text(value.testedDesign,500)) throw Error('Registro de teste inválido.');
  if(!obj(d)||!text(d.name,40)||!text(d.cta,40)||!choice(d.theme,['violet','teal','orange'])||!['price','direct','summary','soldOut'].every(k=>typeof d[k]==='boolean')) throw Error('Decisões de interface inválidas.');
  if(!Array.isArray(value.journey)||value.journey.length!==5||!value.journey.every((v,i)=>obj(v)&&choice(v.action,['',...journey[i].action])&&choice(v.doubt,['',...journey[i].doubt])&&choice(v.feeling,['','Confiante','Em dúvida','Frustrada']))) throw Error('Jornada inválida.');
  if(!Array.isArray(value.frictions)||value.frictions.length>4||new Set(value.frictions).size!==value.frictions.length||!value.frictions.every(k=>frictions.some(f=>f[0]===k))) throw Error('Observações inválidas.');
  if(!obj(h)||!choice(h.problem,['',...frictions.map(f=>f[0])])||!choice(h.change,['','action','price','route','summary'])||!text(h.prediction)) throw Error('Hipótese inválida.');
  if(!obj(t)||!choice(t.result,['','Conseguiu sem ajuda','Conseguiu com ajuda','Não concluiu'])||!text(t.observation)||!text(t.revision)) throw Error('Teste inválido.');
  if(!Array.isArray(value.completed)||!value.completed.every(n=>Number.isInteger(n)&&n>=0&&n<=value.unlocked)||new Set(value.completed).size!==value.completed.length) throw Error('Etapas inválidas.');
  if(!Array.isArray(value.runs)||value.runs.length>100||!value.runs.every(r=>obj(r)&&choice(r.variant,['initial','reference','mine'])&&Number.isInteger(r.clicks)&&r.clicks>=0&&r.clicks<=1000&&text(r.slot,5)&&choice(r.outcome,['confirmed','cancelled'])&&Number.isFinite(r.seconds)&&r.seconds>=0&&r.seconds<=86400)) throw Error('Tentativas inválidas.');
  // Whitelist: discard unknown properties rather than storing imported objects wholesale.
  return {version:VERSION,unlocked:value.unlocked,phase:value.phase,completed:[...value.completed],testedDesign:value.testedDesign,runs:value.runs.map(({variant,clicks,slot,outcome,seconds})=>({variant,clicks,slot,outcome,seconds})),frictions:[...value.frictions],journey:value.journey.map(({action,doubt,feeling})=>({action,doubt,feeling})),hypothesis:{problem:h.problem,change:h.change,prediction:h.prediction},design:{name:d.name,cta:d.cta,price:d.price,direct:d.direct,summary:d.summary,theme:d.theme,soldOut:d.soldOut},test:{result:t.result,observation:t.observation,revision:t.revision}};
}
export function ready(state,phase) {
  if(phase===0) return ['initial','reference'].every(v=>state.runs.some(r=>r.variant===v&&r.outcome==='confirmed'));
  if(phase===1) return state.frictions.length>=2;
  if(phase===2) return state.journey.every(j=>j.action&&j.doubt&&j.feeling);
  if(phase===3) return Boolean(state.hypothesis.problem&&state.hypothesis.change&&state.hypothesis.prediction.trim());
  if(phase>=4&&(!state.design.name.trim()||!state.design.cta.trim())) return false;
  if(phase===4) return Boolean((state.design.cta.trim()!=='Continuar'||state.design.price||state.design.direct||state.design.summary)&&state.design.name.trim()&&state.design.cta.trim()&&state.testedDesign===JSON.stringify(state.design)&&state.runs.some(r=>r.variant==='mine'&&r.outcome==='confirmed'));
  return Boolean(state.test.result&&state.test.observation.trim()&&state.test.revision.trim()&&state.testedDesign===JSON.stringify(state.design)&&state.runs.some(r=>r.variant==='mine'&&r.outcome==='confirmed'));
}
