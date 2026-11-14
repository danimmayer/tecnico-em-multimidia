/* Oficina local: conteúdo discente separado do roteiro docente pelo compilador. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clone = value => JSON.parse(JSON.stringify(value));
  function uid() {
    if(typeof globalThis.crypto?.randomUUID==='function')return globalThis.crypto.randomUUID();
    const bytes=new Uint8Array(16);
    if(typeof globalThis.crypto?.getRandomValues==='function')globalThis.crypto.getRandomValues(bytes);
    else {let stamp=Date.now();for(let i=0;i<bytes.length;i++){bytes[i]=(Math.random()*256+stamp)%256;stamp=Math.floor(stamp/256);}}
    bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
    const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
  let importing=false;
  const isTeacher = document.documentElement.dataset.role === 'teacher';
  const main = $('#main');
  let courses = [], course, lesson, project, selected = '', pane = 'start', noticeTimer;
  const key = () => `senai-reuso:1:${course.slug}:${lesson.id}`;
  const activeItems = () => project.versions[project.active].items;
  const safeColor = c => /^#[0-9a-f]{6}$/i.test(c || '') ? c : '#41694d';
  const resourceURL = path => (document.documentElement.dataset.resourceRoot || '/recursos/') + String(path).split('/').map(encodeURIComponent).join('/');
  function notify(message) { $('#notice').textContent = message; clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { $('#notice').textContent = ''; }, 6500); }
  function save() {
    project.updated = new Date().toISOString();
    try {
      localStorage.setItem(key(), JSON.stringify(project));
      const el = $('#save-state'); if (el) el.textContent = 'Salvo neste navegador · ' + new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
      return true;
    } catch (error) {
      const el = $('#save-state'); if (el) el.textContent = 'Salvamento indisponível. Exporte seu projeto agora.';
      notify('O navegador não conseguiu guardar a mudança. Use Exportar projeto para preservar o trabalho.');
      return false;
    }
  }
  function newProject() { return {schema:1,slug:course.slug,lesson:lesson.id,active:'A',versions:{A:{items:clone(lesson.workspace.items)},B:{items:[]}},notes:{},runs:[],mediaStudio:{},updated:null}; }
  const linksFor=item=>Array.isArray(item.links)?item.links:item.target?[{target:item.target,label:item.linkLabel||''}]:[];
  function validItem(item) { return item && typeof item.id==='string' && typeof item.title==='string' && typeof item.text==='string' && (!item.target || typeof item.target==='string') && (!item.links || (Array.isArray(item.links)&&item.links.length<=3&&item.links.every(l=>typeof l.target==='string'&&typeof l.label==='string'))) && (!item.media || (typeof item.media.id==='string' && /^(image|audio|video)\//.test(item.media.type))); }
  function validProject(p,slug=course.slug,lessonId=lesson.id) {
    return p && p.schema===1 && p.slug===slug && p.lesson===lessonId && ['A','B'].includes(p.active) && p.versions && ['A','B'].every(v => Array.isArray(p.versions[v]?.items) && p.versions[v].items.length<=80 && p.versions[v].items.every(validItem) && new Set(p.versions[v].items.map(x=>x.id)).size===p.versions[v].items.length) && p.notes && typeof p.notes==='object' && !Array.isArray(p.notes) && Object.values(p.notes).every(x=>typeof x==='string') && (!p.runs || (Array.isArray(p.runs) && p.runs.every(x=>Number.isInteger(x.index)&&typeof x.at==='string'))) && (!p.mediaStudio || (typeof p.mediaStudio==='object' && !Array.isArray(p.mediaStudio) && (!p.mediaStudio.clips || (Array.isArray(p.mediaStudio.clips)&&p.mediaStudio.clips.length<=80&&p.mediaStudio.clips.every(c=>typeof c.mediaId==='string'&&typeof c.name==='string'&&Number.isFinite(c.inTime)&&Number.isFinite(c.outTime)&&c.inTime>=0&&c.outTime>c.inTime))) && (!p.mediaStudio.settings || (typeof p.mediaStudio.settings==='object'&&!Array.isArray(p.mediaStudio.settings)))));
  }
  function openProject() {
    let raw;
    try { raw = localStorage.getItem(key()); if (raw) { const parsed=JSON.parse(raw); if (validProject(parsed)) return parsed; } }
    catch (error) { notify('Não foi possível ler o projeto guardado. O arquivo antigo não será apagado. Importe sua cópia exportada.'); }
    if (raw) {
      try { localStorage.setItem(key()+':copia-incompativel:'+Date.now(),raw); } catch (_) { /* O projeto anterior permanece na chave original. */ }
      notify('Foi preservada uma cópia do projeto anterior. Use Importar projeto para recuperar um arquivo compatível.');
    }
    return newProject();
  }
  const dbReady = new Promise(resolve => {
    if (!window.indexedDB) return resolve(null);
    const request=indexedDB.open('senai-reuso-media',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('files');
    request.onsuccess=()=>resolve(request.result); request.onerror=()=>resolve(null);
  });
  async function mediaGet(id) { const db=await dbReady; if(!db)return null; return new Promise(resolve=>{ const r=db.transaction('files').objectStore('files').get(id);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>resolve(null); }); }
  async function mediaPut(id,blob) { const db=await dbReady;if(!db)throw Error('Este navegador não oferece armazenamento de mídia.');return new Promise((resolve,reject)=>{const tx=db.transaction('files','readwrite');tx.objectStore('files').put(blob,id);tx.oncomplete=resolve;tx.onerror=()=>reject(Error('Sem espaço para guardar a mídia.'));}); }
  const objectURLs = new Map();
  async function hydrateMedia(root=document) { for(const el of $$('[data-media-id]',root)){const id=el.dataset.mediaId;if(!objectURLs.has(id)){const blob=await mediaGet(id);if(blob)objectURLs.set(id,URL.createObjectURL(blob));}if(objectURLs.has(id))el.src=objectURLs.get(id);else el.replaceWith(Object.assign(document.createElement('p'),{textContent:'Mídia não encontrada neste navegador. Importe o projeto com as mídias.'}));} }
  function download(blob,name) { const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
  async function exportProject() {
    try {
      const copy=clone(project),filename=`${course.slug}-aula-${lesson.id}-projeto.json`;copy.files={};
      const ids=new Set(Object.values(copy.versions).flatMap(v=>v.items.map(x=>x.media?.id)).filter(Boolean));
      for(const id of (copy.mediaStudio?.clips || []).map(x=>x.mediaId))if(id)ids.add(id);
      if(copy.mediaStudio?.settings?.backgroundMedia)ids.add(copy.mediaStudio.settings.backgroundMedia);
      for(const id of ids) {
        const blob=await mediaGet(id);
        if(!blob)throw Error('Uma mídia do projeto não foi encontrada. Restaure essa mídia antes de exportar.');
        copy.files[id]=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=r.onabort=()=>reject(Error('Não foi possível ler uma mídia.'));r.readAsDataURL(blob);});
      }
      const backup=new Blob([JSON.stringify(copy,null,2)],{type:'application/json'});
      download(backup,filename);
      notify('Arquivo do projeto gerado com todas as mídias. Confira o download e guarde esse arquivo.');
    } catch(error) {notify('Backup não gerado: '+error.message+' Se o projeto for grande, feche outras abas e tente novamente.');}
  }
  async function importProject(file) {
    if(!file)return;
    if(importing)return notify('Aguarde a importação em andamento antes de importar outro projeto.');
    const target={slug:course.slug,lessonId:lesson.id,key:key(),project};
    if(!confirm('Importar substituirá o projeto aberto desta aula. Exporte o trabalho atual se quiser mantê-lo. Continuar?'))return;
    importing=true;
    try {
      const imported=JSON.parse(await file.text());
      if(!validProject(imported,target.slug,target.lessonId))throw Error('Este arquivo não corresponde à UC e à aula abertas, ou tem formato inválido.');
      const pendingFiles=[],mediaIds=new Map();
      const importedMediaId=id=>{if(!mediaIds.has(id))mediaIds.set(id,uid());return mediaIds.get(id);};
      for(const [id,value] of Object.entries(imported.files || {})) {
        if(typeof value!=='string' || !/^data:(?:image|audio|video)\/[\w.+-]+;base64,[A-Za-z0-9+/=\s]+$/.test(value))throw Error('O arquivo contém uma mídia inválida.');
        const comma=value.indexOf(','),type=value.slice(5,value.indexOf(';')),bytes=Uint8Array.from(atob(value.slice(comma+1)),c=>c.charCodeAt(0));
        pendingFiles.push([importedMediaId(id),new Blob([bytes],{type})]);
      }
      // Imports own fresh IDs so even a later project-save failure preserves existing media.
      for(const version of Object.values(imported.versions))for(const item of version.items)if(item.media)item.media.id=importedMediaId(item.media.id);
      for(const clip of imported.mediaStudio?.clips || [])clip.mediaId=importedMediaId(clip.mediaId);
      if(imported.mediaStudio?.settings?.backgroundMedia)imported.mediaStudio.settings.backgroundMedia=importedMediaId(imported.mediaStudio.settings.backgroundMedia);
      if(pendingFiles.length) {
        const db=await dbReady;if(!db)throw Error('Este navegador não oferece armazenamento de mídia.');
        await new Promise((resolve,reject)=>{
          const tx=db.transaction('files','readwrite');
          tx.oncomplete=resolve;
          tx.onabort=tx.onerror=()=>reject(Error('Não foi possível guardar todas as mídias.'));
          try {const store=tx.objectStore('files');for(const [id,blob] of pendingFiles)store.put(blob,id);}
          catch(error) {tx.abort();reject(error);}
        });
      }
      delete imported.files;imported.updated=new Date().toISOString();
      localStorage.setItem(target.key,JSON.stringify(imported));
      if(project!==target.project || course?.slug!==target.slug || lesson?.id!==target.lessonId) {
        notify(`Projeto importado e guardado na aula ${target.lessonId}. Abra essa aula novamente para vê-lo.`);return;
      }
      for(const url of objectURLs.values())URL.revokeObjectURL(url);
      objectURLs.clear();
      project=imported; selected=activeItems()[0]?.id || '';renderLesson();notify('Projeto importado. As versões foram restauradas.');
    } catch(error) {notify('Importação recusada: '+error.message+' O projeto anterior foi preservado. Se o arquivo for grande, feche outras abas e tente novamente.');}
    finally {importing=false;}
  }
  async function attachMedia(file) {
    if(!file)return;
    if(!/^(image|audio|video)\//.test(file.type))return notify('Escolha uma imagem, um áudio ou um vídeo.');
    if(file.size>35*1024*1024)return notify('Use uma mídia de até 35 MB. Para vídeos, recorte um trecho curto.');
    const id=uid(),item=activeItems().find(x=>x.id===selected);if(!item)return;
    try {await mediaPut(id,file);item.media={id,type:file.type,name:file.name};save();renderEditor();notify('Mídia guardada neste computador.');}catch(error){notify(error.message+' O projeto anterior continua guardado.');}
  }
  function previewItem(item,index,items) {
    const media=item.media ? `<${item.media.type.startsWith('image/')?'img':item.media.type.startsWith('audio/')?'audio':'video'} data-media-id="${escape(item.media.id)}" ${item.media.type.startsWith('image/')?`alt="${escape(item.text || item.title)}"`:'controls preload="metadata"'}></${item.media.type.startsWith('image/')?'img':item.media.type.startsWith('audio/')?'audio':'video'}>` : '';
    const destinations=linksFor(item).map(link=>{const destination=items.find(x=>x.id===link.target);return destination?`<button class="destination" type="button" data-destination="${escape(destination.id)}">${escape(link.label||'Ir para '+destination.title)}</button>`:'<p>Destino removido. Revise a ligação.</p>';}).join('');
    return `<article class="preview-piece ${item.wide?'wide':''} ${item.emphasis?'emphasis':''}" id="preview-${escape(item.id)}" style="--piece-color:${safeColor(item.color)};--piece-ink:${safeColor(item.ink||item.textColor||'#15241c')};--piece-bg:${safeColor(item.background||item.backgroundColor||'#fffdf6')}"><small>${index+1}${['sequence','storyboard','sound'].includes(lesson.workspace.type)?` · ${Number(item.duration)||5}s`:''}</small>${media}<h3>${escape(item.title)}</h3><p>${escape(item.text)}</p>${destinations}</article>`;
  }
  function boardHTML(items=activeItems()) {return `<div class="preview-grid type-${escape(lesson.workspace.type)}">${items.map((item,i)=>previewItem(item,i,items)).join('') || '<p>Adicione uma peça para começar.</p>'}</div>`;}
  const courseName = c => ({'design-web':'Design Web','producao-audiovisual':'Produção Audiovisual','fotografia':'Fotografia e Semiótica'}[c.slug] || c.title);
  const presentationURL = (c,l) => `/visuais/${c.slug}-${l.id}.html`;
  function renderHome() {
    lesson=null;course=null;document.documentElement.removeAttribute('data-uc');document.title='Aulas · Técnico em Multimídia';
    document.body.classList.remove('information-view');document.body.classList.add('catalog-view');
    let saved;try{saved=localStorage.getItem('senai:catalog-uc');}catch(_){}
    const requested=new URLSearchParams(location.search).get('uc');
    let filter=courses.find(c=>c.slug===requested)?.slug || courses.find(c=>c.slug===saved)?.slug || courses[0].slug;
    main.innerHTML=`<section class="catalog-heading"><h1>Aulas</h1><label class="catalog-search" for="search"><span>Buscar aula</span><input id="search" type="search" placeholder="Número ou assunto" autocomplete="off"></label></section><div class="course-tabs" role="tablist" aria-label="Unidade curricular">${courses.map(c=>`<button type="button" role="tab" data-filter="${escape(c.slug)}" aria-selected="${c.slug===filter}">${escape(courseName(c))}<span>${c.lessons.length} aulas</span></button>`).join('')}</div><div id="lesson-list" class="lesson-catalog" role="tabpanel" aria-label="Aulas da unidade curricular"></div>${isTeacher?'':tutoriasHTML()}`;
    const renderRows=()=>{
      const c=courses.find(c=>c.slug===filter),query=$('#search').value.trim().toLocaleLowerCase('pt-BR');
      const matches=l=>/^\d+$/.test(query)?Number(l.id)===Number(query):`${l.title} ${l.mission}`.toLocaleLowerCase('pt-BR').includes(query);
      document.documentElement.dataset.uc=filter;
      $('#lesson-list').innerHTML=c.lessons.filter(matches).map(l=>`<div class="catalog-entry"><a class="catalog-lesson" aria-label="Aula ${Number(l.id)}: ${escape(l.title)}" href="${isTeacher?presentationURL(c,l):`?uc=${encodeURIComponent(c.slug)}&aula=${l.id}`}"><span class="lesson-number" aria-hidden="true">${Number(l.id)}</span><strong>${escape(l.title)}</strong></a>${isTeacher?`<a class="catalog-info" href="?uc=${encodeURIComponent(c.slug)}&aula=${l.id}&info=1" aria-label="Informações da aula ${Number(l.id)}" title="Informações do professor">ⓘ</a>`:''}</div>`).join('') || '<p class="empty">Nenhuma aula encontrada.</p>';
    };
    $('#search').addEventListener('input',renderRows);
    const courseTabs=$$('[data-filter]');
    courseTabs.forEach((button,index)=>{
      button.id='course-'+button.dataset.filter;button.setAttribute('aria-controls','lesson-list');button.tabIndex=button.getAttribute('aria-selected')==='true'?0:-1;
      button.addEventListener('click',()=>{filter=button.dataset.filter;try{localStorage.setItem('senai:catalog-uc',filter);}catch(_){}const url=new URL(location);url.searchParams.set('uc',filter);history.replaceState({},'',url);courseTabs.forEach(x=>{x.setAttribute('aria-selected',String(x===button));x.tabIndex=x===button?0:-1;});$('#lesson-list').setAttribute('aria-labelledby',button.id);renderRows();});
      button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%courseTabs.length;if(event.key==='ArrowLeft')next=(index+courseTabs.length-1)%courseTabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=courseTabs.length-1;if(next!==undefined){event.preventDefault();courseTabs[next].click();courseTabs[next].focus();}});
    });
    $('#lesson-list').setAttribute('aria-labelledby','course-'+filter);renderRows();
  }
  function conceptsHTML() {return `<div class="two-col">${lesson.concepts.map(c=>`<div class="prose-box"><h3>${escape(c.term)}</h3><p>${escape(c.meaning)}</p><p><strong>Exemplo:</strong> ${escape(c.example)}</p></div>`).join('')}</div>`;}
  function exercisesHTML() {
    const cases=lesson.cases||[],assessment=lesson.assessment;
    const instructions=assessment?`<h2>${escape(assessment.title)}</h2><p>${escape(assessment.instructions)}</p>`:cases.length?'<h2>Situações para decidir</h2>':'';
    return instructions+[...(assessment?.items||[]),...cases].map((item,index)=>`<article class="resource"><h3>${escape(item.id||item.title||String(index+1))}${item.context||item.question?' · '+escape(item.context||item.question):''}</h3>${item.context?`<p>${escape(item.question)}</p>`:''}${item.text?`<p>${escape(item.text)}</p>`:''}${item.options?`<ol class="answer-options">${item.options.map(option=>`<li>${escape(typeof option==='string'?option:option.id+' · '+option.text)}</li>`).join('')}</ol>`:''}${item.instruction?`<p>${escape(item.instruction)}</p>`:''}${item.options?`<label for="answer-${escape(item.id)}">Sua resposta e o motivo</label><textarea id="answer-${escape(item.id)}" data-note="answer-${escape(item.id)}">${escape(project.notes['answer-'+item.id]||'')}</textarea>`:''}</article>`).join('');
  }
  function tutoriasHTML(){
    const entries=courses.flatMap(c=>(c.tutorias||[]).map(t=>({...t,course:c.title,slug:c.slug})));
    if(!entries.length)return '';
    return `<section class="tutorias"><h2>Tutorias de Produção Audiovisual</h2><p>Propostas para os momentos não presenciais da UC. Siga as datas e orientações confirmadas pelo professor no ambiente institucional.</p>${entries.map(t=>`<details class="resource"><summary>${escape(t.id)} · ${escape(t.title)} · após aula ${escape(t.afterLesson)}</summary><p>${escape(t.distribution)}</p><p><strong>Faça:</strong> ${escape(t.action)}</p><p><strong>Revise:</strong> ${escape(t.review)}</p><p><strong>Guarde:</strong> ${escape(t.deliverable)}</p><p><strong>Confira:</strong> ${escape(t.check)}</p><p><strong>Cada pessoa:</strong> ${escape(t.individualEvidence)}</p><p>${escape(t.access)}</p><a class="button" href="?uc=${escape(t.slug)}&aula=${escape(t.afterLesson)}">Abrir a aula de referência</a></details>`).join('')}</section>`;
  }
  function teacherInstruments(t){
    const keys=t.assessmentKey||t.caseFeedback||[];
    let html=keys.length?`<h3>Referência privada de correção</h3><ul>${keys.map(k=>`<li><strong>${escape(k.id)} · ${escape(k.answer)}</strong> — ${escape(k.reason)}</li>`).join('')}</ul>`:'';
    if(t.assessment)html+=`<h3>Instrumento previsto</h3><p>${escape(typeof t.assessment==='string'?t.assessment:t.assessment.instructions||t.assessment.status||'Consultar instrumento institucional indicado na fonte.')}</p>`;
    const rubric=t.integratorRubric;
    if(rubric)html+=`<h3>Critérios do projeto integrador</h3><p>${escape(rubric.status)}</p>${rubric.capacities.map(c=>`<h4>${escape(c.capacity)}</h4><div class="criteria">${c.criteria.map(r=>`<article class="criterion"><span class="criterion-id">${escape(r.id)}</span><div><h4>${escape(r.label)}</h4><p><strong>Atende:</strong> ${escape(r.sufficient)}</p><p><strong>Precisa melhorar:</strong> ${escape(r.insufficient)}</p><p><strong>Evidência:</strong> ${escape(r.evidence)}</p></div></article>`).join('')}</div>`).join('')}`;
    return html;
  }
  function criteriaHTML() {return `<div class="criteria">${lesson.criteria.map(c=>`<article class="criterion"><span class="criterion-id">${escape(c.id)}</span><div><h3>${escape(c.label)}</h3><p><strong>Atende quando:</strong> ${escape(c.sufficient)}</p><p class="contrast"><strong>Ainda precisa melhorar:</strong> ${escape(c.insufficient)}</p><p class="muted"><strong>Onde isso aparece:</strong> ${escape(c.evidence)}</p></div></article>`).join('')}</div>`;}
  function galleryHTML() {const gallery=lesson.gallery||[];return gallery.length?`<h2>Imagens para observar</h2><div class="gallery">${gallery.map(g=>`<figure><a href="${resourceURL(g.path)}" target="_blank" rel="noopener"><img class="matte-${escape(g.matte||'clear')}" src="${resourceURL(g.path)}" alt="${escape(g.caption || g.title)}" loading="lazy"></a><figcaption><strong>${escape(g.title)}</strong><br>${escape(g.caption)}${g.credit?`<br><small>${escape(g.credit)}</small>`:''}</figcaption></figure>`).join('')}</div>`:'';}
  function renderLesson() {
    document.documentElement.dataset.uc=course.slug;document.title=`Aula ${lesson.id} · ${lesson.title}`;
    if(!selected || !activeItems().some(x=>x.id===selected))selected=activeItems()[0]?.id || '';
    const gallery=lesson.gallery||[];
    const hero=course.slug==='fotografia'&&gallery.length?`<figure><img class="matte-${escape(gallery[0].matte||'clear')}" src="${resourceURL(gallery[0].path)}" alt="${escape(gallery[0].caption||gallery[0].title)}"><figcaption>${escape(gallery[0].title)}${gallery[0].credit?' · '+escape(gallery[0].credit):''}</figcaption></figure>`:'';
    main.innerHTML=`<p class="eyebrow">${escape(courseName(course))} / Aula ${lesson.id}</p><section class="${hero?'photo-hero':'lesson-heading'}"><div><h1>${escape(lesson.title)}</h1><p>${escape(lesson.context)}</p></div>${hero || `<div class="mission"><strong>O desafio</strong><p>${escape(lesson.mission)}</p><strong>O que entregar</strong><p>${escape(lesson.deliverable)}</p></div>`}</section>${hero?`<div class="mission"><strong>O desafio</strong><p>${escape(lesson.mission)}</p><strong>O que entregar</strong><p>${escape(lesson.deliverable)}</p></div>`:''}<div class="toolbar"><button id="export-project" type="button">Exportar projeto</button><button id="import-project" type="button">Importar projeto</button><input id="import-file" type="file" accept=".json,application/json" hidden><span class="save-state" id="save-state">${project.updated?'Projeto recuperado deste navegador':'Seu projeto será salvo ao fazer uma mudança'}</span></div><div class="tabs" role="tablist" aria-label="Percurso da aula">${[['start','Começar'],['steps','Passos'],['create',lesson.deliveryMode==='slides'?'Apoio opcional':'Criar'],['check','Conferir'],['extend','Continuar'],['resources','Recursos'],...(isTeacher?[['teacher','Informações do professor']]:[])].map(([id,label])=>`<button role="tab" id="tab-${id}" aria-controls="pane-${id}" aria-selected="${id===pane}" tabindex="${id===pane?0:-1}" data-pane="${id}" type="button">${label}</button>`).join('')}</div><section id="pane-start" class="pane" role="tabpanel" aria-labelledby="tab-start" ${pane==='start'?'':'hidden'}><h2>Antes de criar</h2><p><strong>Hoje você vai:</strong> ${escape(lesson.objective)}</p><p><strong>Como trabalhar:</strong> ${escape(lesson.grouping)}</p><p>${escape(lesson.previous)}</p>${lesson.deliveryMode==='slides'?'<p class="example">Nesta UC, a atividade pode ser feita com os slides projetados, seu caderno e seus arquivos. O editor desta página é um apoio opcional.</p>':''}${conceptsHTML()}<div class="example"><h3>${escape(lesson.starter.title)}</h3><p>${escape(lesson.starter.instruction)}</p></div><h2>Como conferir a qualidade</h2>${criteriaHTML()}${exercisesHTML()}${galleryHTML()}</section><section id="pane-steps" class="pane" role="tabpanel" aria-labelledby="tab-steps" ${pane==='steps'?'':'hidden'}><h2>Um passo de cada vez</h2><div class="stage-list">${lesson.stages.map((s,i)=>`<article class="stage"><span class="step">${i+1}</span><div><h3>${escape(s.title)}</h3><p><strong>Faça:</strong> ${escape(s.action)}</p><p><strong>Onde:</strong> ${escape(s.where)}</p><p><strong>Confira:</strong> ${escape(s.check)}</p><p class="muted"><strong>Resultado:</strong> ${escape(s.output)}</p></div></article>${i===2 && lesson.durationMinutes!==60?'<p class="break-note">Faça o intervalo combinado com o professor. Guarde seu trabalho antes de sair.</p>':''}`).join('')}</div></section><section id="pane-create" class="pane" role="tabpanel" aria-labelledby="tab-create" ${pane==='create'?'':'hidden'}><h2>${escape(lesson.workspace.title)}</h2><p>${escape(lesson.workspace.prompt)}</p><p class="muted">Edite as peças, use a Prévia para experimentar e compare uma segunda versão. Os critérios estão em Conferir. ${course.slug==='producao-audiovisual'&&['storyboard','sequence','sound'].includes(lesson.workspace.type)?'A sequência de peças organiza o roteiro; a Montagem local abaixo produz um vídeo simples.':''}</p><div id="editor"></div>${course.slug==='producao-audiovisual'?'<div id="media-studio"></div>':''}</section><section id="pane-check" class="pane" role="tabpanel" aria-labelledby="tab-check" ${pane==='check'?'':'hidden'}><h2>Teste, observe e melhore</h2>${criteriaHTML()}<p><strong>Sua contribuição individual:</strong> ${escape(lesson.individualEvidence)}</p><button class="primary" type="button" id="check-file">Conferir o arquivo</button><div id="check-result" aria-live="polite"></div><div class="notes-grid">${[['test','O que aconteceu no teste?'],['change','O que você mudou depois do teste?'],['individual','Qual parte você consegue explicar e demonstrar?'],['feedback','Qual devolutiva recebeu e como respondeu?']].map(([id,label])=>`<div><label for="note-${id}">${label}</label><textarea id="note-${id}" data-note="${id}">${escape(project.notes[id]||'')}</textarea></div>`).join('')}</div><div class="example"><h3>Uma ajuda para retomar</h3><p>${escape(lesson.recovery.action)}</p><p><strong>Confira:</strong> ${escape(lesson.recovery.check)}</p></div></section><section id="pane-extend" class="pane" role="tabpanel" aria-labelledby="tab-extend" ${pane==='extend'?'':'hidden'}><h2>Concluiu? Escolha uma nova rodada.</h2><div class="extensions-head"><p>Guarde a entrega principal. Escolha uma rodada de 10–15 minutos, compare o resultado e repita mudando o público, a restrição ou o exemplo indicado.</p><p>Até 22h, siga o ritmo combinado com o professor. Depois das 22h, use estas propostas apenas para consolidar o que já foi trabalhado: sem conteúdo, nota ou entrega novos. Sair nesse período não prejudica a atividade essencial.</p></div>${lesson.extensions.map((x,i)=>`<article class="extension"><p class="eyebrow">Rodada ${i+1} / 10–15 min</p><h3>${escape(x.title)}</h3><p>${escape(x.action)}</p><p><strong>Resultado:</strong> ${escape(x.output)}</p><p><strong>Confira:</strong> ${escape(x.check)}</p><button type="button" data-run="${i}">Registrar rodada feita</button></article>`).join('')}<p id="run-count" aria-live="polite">${(project.runs||[]).length} rodadas registradas neste projeto.</p></section><section id="pane-resources" class="pane" role="tabpanel" aria-labelledby="tab-resources" ${pane==='resources'?'':'hidden'}><h2>Recursos e alternativas</h2>${lesson.resources.map(r=>`<article class="resource"><h3>${escape(r.item)}</h3><p>${escape(r.use)}</p><p class="muted">${escape(r.access)}</p>${r.path?`<a class="button" href="${resourceURL(r.path)}" target="_blank" rel="noopener">Abrir ${escape(r.item)}</a>`:''}<p><strong>Alternativa:</strong> ${escape(r.fallback)}</p></article>`).join('')}<div class="example"><h3>Sem internet</h3><p>${escape(lesson.fallback.offline)}</p><h3>Sem dupla</h3><p>${escape(lesson.fallback.solo)}</p><h3>Sem o equipamento previsto</h3><p>${escape(lesson.fallback.equipment)}</p></div>${galleryHTML()}</section>${isTeacher?'<section id="pane-teacher" class="pane" role="tabpanel" aria-labelledby="tab-teacher" '+(pane==='teacher'?'':'hidden')+'></section>':''}`;
    $$('[data-pane]').forEach(button=>{button.addEventListener('click',()=>switchPane(button.dataset.pane));button.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=$$('[data-pane]'),idx=tabs.indexOf(button),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(idx+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].click();tabs[next].focus();});});
    $('#export-project').onclick=exportProject;$('#import-project').onclick=()=>$('#import-file').click();$('#import-file').onchange=e=>importProject(e.target.files[0]);
    $$('[data-note]').forEach(input=>input.addEventListener('input',()=>{project.notes[input.dataset.note]=input.value;save();}));
    $('#check-file').onclick=()=>{const items=activeItems(),missing=items.filter(x=>!x.title.trim()).length,ids=new Set(items.map(x=>x.id)),broken=items.flatMap(linksFor).filter(l=>!ids.has(l.target)).length;$('#check-result').innerHTML=`<div class="check-result"><strong>Conferência do arquivo — versão ${project.active}</strong><p>${items.length} peças; ${missing} sem título; ${broken} ligações sem destino.</p><p>${items.length < lesson.workspace.minItems?'A proposta pede ao menos '+lesson.workspace.minItems+' peças. Você pode continuar testando enquanto cria.':'A quantidade prevista de peças foi alcançada.'}</p><p>Essa contagem não avalia a qualidade. Compare o produto com cada critério e mostre sua contribuição ao professor.</p></div>`;save();};
    $$('[data-run]').forEach(button=>button.onclick=()=>{project.runs=project.runs||[];project.runs.push({index:Number(button.dataset.run),at:new Date().toISOString()});save();$('#run-count').textContent=project.runs.length+' rodadas registradas neste projeto.';});
    renderEditor();if(isTeacher)renderTeacher();if(course.slug==='producao-audiovisual')window.SenaiMedia?.mount($('#media-studio'),{project,save,mediaGet,mediaPut,download,notify,lesson,resourceURL,uid});
  }
  function switchPane(id){pane=id;$$('[data-pane]').forEach(button=>{const active=button.dataset.pane===id;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});$$('.pane').forEach(el=>el.hidden=el.id!=='pane-'+id);}
  function renderEditor() {
    const items=activeItems(),item=items.find(x=>x.id===selected);
    $('#editor').innerHTML=`<div class="toolbar"><button type="button" data-version="A" aria-pressed="${project.active==='A'}">Versão A</button><button type="button" data-version="B" aria-pressed="${project.active==='B'}">Versão B</button><button type="button" id="copy-b">Copiar A para B</button><button type="button" id="compare">Comparar A e B</button><button type="button" id="preview-button" class="primary">Prévia</button><button type="button" id="export-artifact">Baixar artefato HTML</button></div><div class="editor-layout"><aside><h3>Peças</h3><div class="piece-list">${items.map((x,i)=>`<button type="button" class="piece ${selected===x.id?'is-selected':''}" data-piece="${escape(x.id)}"><span class="swatch" style="background:${safeColor(x.color)}"></span><span><strong>${i+1}. ${escape(x.title||'Peça sem título')}</strong><small>${escape((x.text||'').slice(0,65))}</small></span></button>`).join('')}</div><button id="add-piece" type="button">Adicionar peça</button>${item?`<div class="editor-fields"><h3>Editar peça</h3><label for="piece-title">Título da peça</label><input id="piece-title" value="${escape(item.title)}" maxlength="180"><label for="piece-text">Texto ou legenda</label><textarea id="piece-text" maxlength="3000">${escape(item.text)}</textarea><div class="two-col"><div><label for="piece-color">Cor de destaque</label><input type="color" id="piece-color" value="${safeColor(item.color)}"></div><div><label for="piece-duration">Duração (segundos)</label><input id="piece-duration" type="number" min="1" max="120" value="${Number(item.duration)||5}"></div></div><div class="two-col"><div><label for="piece-ink">Cor do texto</label><input id="piece-ink" type="color" value="${safeColor(item.ink||item.textColor||'#15241c')}"></div><div><label for="piece-background">Cor do fundo</label><input id="piece-background" type="color" value="${safeColor(item.background||item.backgroundColor||'#fffdf6')}"></div></div>${[0,1,2].map(i=>`<label for="piece-target-${i}">${i===0?'Ligação para outra peça':'Ligação adicional '+(i+1)}</label><select id="piece-target-${i}"><option value="">Sem ligação</option>${items.filter(x=>x.id!==item.id).map(x=>`<option value="${escape(x.id)}" ${x.id===linksFor(item)[i]?.target?'selected':''}>${escape(x.title)}</option>`).join('')}</select><label for="piece-label-${i}">${i===0?'Texto da ligação':'Texto da ligação '+(i+1)}</label><input id="piece-label-${i}" maxlength="80" placeholder="Ex.: Ver horários" value="${escape(linksFor(item)[i]?.label||'')}">`).join('')}<label><input id="piece-wide" type="checkbox" ${item.wide?'checked':''}> Ocupar a largura</label><label><input id="piece-emphasis" type="checkbox" ${item.emphasis?'checked':''}> Destacar o título</label><label for="piece-media">Imagem, áudio ou vídeo local</label><input type="file" id="piece-media" accept="image/*,audio/*,video/*">${item.media?`<p class="muted">${escape(item.media.name)} <button type="button" id="remove-media">Retirar mídia</button></p>`:''}<div class="toolbar"><button type="button" id="move-up" aria-label="Mover peça para cima">↑</button><button type="button" id="move-down" aria-label="Mover peça para baixo">↓</button><button type="button" id="duplicate-piece">Duplicar</button><button type="button" id="remove-piece" class="danger">Remover</button></div></div>`:''}</aside><div><div class="toolbar"><span class="tag">Prévia ao vivo · versão ${project.active}</span><button type="button" id="viewport-mobile" aria-pressed="false">Celular</button><button type="button" id="viewport-desktop" aria-pressed="true">Tela larga</button></div><div id="live-preview" class="live-frame desktop">${boardHTML()}</div></div></div>`;
    $$('[data-piece]').forEach(b=>b.onclick=()=>{selected=b.dataset.piece;renderEditor();});
    $$('[data-version]').forEach(b=>b.onclick=()=>{project.active=b.dataset.version;if(!activeItems().length && project.active==='B')notify('A versão B está vazia. Copie A para B ou adicione uma peça.');selected=activeItems()[0]?.id||'';save();renderEditor();});
    $('#copy-b').onclick=()=>{if(project.versions.B.items.length&&!confirm('Substituir a versão B por uma cópia da versão A?'))return;project.versions.B=clone(project.versions.A);project.active='B';selected=activeItems()[0]?.id||'';save();renderEditor();notify('Versão B criada. A versão A continua guardada.');};
    $('#add-piece').onclick=()=>{if(items.length>=80)return notify('O limite do editor é 80 peças.');const x={id:uid(),title:'Nova peça',text:'',color:'#41694d',duration:5};items.push(x);selected=x.id;save();renderEditor();$('#piece-title').focus();};
    $('#preview-button').onclick=()=>showPreview(false);$('#compare').onclick=()=>showPreview(true);
    $('#export-artifact').onclick=()=>exportArtifact();
    $('#viewport-mobile').onclick=()=>setViewport(true);$('#viewport-desktop').onclick=()=>setViewport(false);
    if(item){
      const update=(field,value)=>{item[field]=value;save();$('#live-preview').innerHTML=boardHTML();bindDestinations($('#live-preview'));hydrateMedia($('#live-preview'));const title=$(`[data-piece="${CSS.escape(item.id)}"] strong`);if(title)title.textContent=(items.indexOf(item)+1)+'. '+(item.title||'Peça sem título');};
      for(const [id,field] of [['piece-title','title'],['piece-text','text'],['piece-color','color'],['piece-ink','ink'],['piece-background','background']])$('#'+id).oninput=e=>update(field,e.target.value);
      const updateLinks=()=>{item.links=[0,1,2].map(i=>({target:$('#piece-target-'+i).value,label:$('#piece-label-'+i).value})).filter(l=>l.target);delete item.target;update('links',item.links);};
      for(let i=0;i<3;i++){ $('#piece-target-'+i).onchange=updateLinks;$('#piece-label-'+i).oninput=updateLinks;}
      $('#piece-duration').oninput=e=>update('duration',Math.min(120,Math.max(1,Number(e.target.value)||1)));
      for(const [id,field] of [['piece-wide','wide'],['piece-emphasis','emphasis']])$('#'+id).onchange=e=>update(field,e.target.checked);
      $('#piece-media').onchange=e=>attachMedia(e.target.files[0]);
      if($('#remove-media'))$('#remove-media').onclick=()=>{delete item.media;save();renderEditor();};
      const move=delta=>{const i=items.indexOf(item),j=i+delta;if(j<0||j>=items.length)return;[items[i],items[j]]=[items[j],items[i]];save();renderEditor();};
      $('#move-up').onclick=()=>move(-1);$('#move-down').onclick=()=>move(1);
      $('#duplicate-piece').onclick=()=>{if(items.length>=80)return notify('Limite de 80 peças.');const x=clone(item);x.id=uid();x.title+=' · cópia';items.splice(items.indexOf(item)+1,0,x);selected=x.id;save();renderEditor();};
      $('#remove-piece').onclick=()=>{items.splice(items.indexOf(item),1);selected=items[0]?.id||'';save();renderEditor();};
    }
    bindDestinations($('#live-preview'));hydrateMedia($('#live-preview'));
  }
  function setViewport(mobile){$('#live-preview').className='live-frame '+(mobile?'mobile':'desktop');$('#viewport-mobile').setAttribute('aria-pressed',String(mobile));$('#viewport-desktop').setAttribute('aria-pressed',String(!mobile));}
  function bindDestinations(root){$$('[data-destination]',root).forEach(b=>b.onclick=()=>{const scope=b.closest('.preview-grid')||root,target=$('#preview-'+CSS.escape(b.dataset.destination),scope);if(target){target.scrollIntoView({block:'nearest',behavior:'smooth'});target.tabIndex=-1;target.focus();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)target.animate([{outline:'4px solid #345e2b'},{outline:'0 solid transparent'}],{duration:1200});}});}
  function showPreview(compare){$('#preview-title').textContent=compare?'Comparar A e B':'Prévia · versão '+project.active;$('#preview-content').innerHTML=compare?`<div class="comparison">${['A','B'].map(v=>`<section><h3>Versão ${v}</h3><div class="live-frame">${boardHTML(project.versions[v].items)}</div></section>`).join('')}</div>`:`<div class="live-frame">${boardHTML()}</div>`;bindDestinations($('#preview-content'));hydrateMedia($('#preview-content'));$('#preview').showModal();}
  async function exportArtifact(){const root=document.createElement('div');root.innerHTML=boardHTML();for(const el of $$('[data-media-id]',root)){const blob=await mediaGet(el.dataset.mediaId);if(blob)el.src=await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.readAsDataURL(blob);});el.removeAttribute('data-media-id');}$$('button',root).forEach(b=>{const a=document.createElement('a');a.href='#preview-'+b.dataset.destination;a.textContent=b.textContent;b.replaceWith(a);});const html=`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(lesson.workspace.title)}</title><style>body{font:18px/1.5 system-ui,sans-serif;background:#eeeae0;color:#182319;padding:3vw;max-width:1100px;margin:auto}.preview-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.preview-piece{background:var(--piece-bg,#fff);color:var(--piece-ink,#15241c);padding:22px;border-top:8px solid var(--piece-color);overflow-wrap:anywhere}.wide{grid-column:1/-1}.emphasis h3{font-size:2em}img,video{width:100%;max-height:65vh;object-fit:contain}audio{width:100%}p{white-space:pre-wrap}a{color:#254c28}@media(max-width:600px){.preview-grid{grid-template-columns:1fr}}</style><h1>${escape(lesson.workspace.title)}</h1><p>${escape(lesson.deliverable)}</p>${root.innerHTML}</html>`;download(new Blob([html],{type:'text/html'}),`${course.slug}-aula-${lesson.id}-versao-${project.active}.html`);notify('Artefato HTML baixado. Ele abre localmente no navegador; isso não é publicação online.');}
  function clockHTML(){let minute=19*60;const hhmm=m=>String(Math.floor(m/60)).padStart(2,'0')+'h'+(m%60?String(m%60).padStart(2,'0'):'');return lesson.stages.map((stage,i)=>{const from=minute;minute+=stage.minutes;const text=hhmm(from)+'–'+hhmm(minute)+': '+stage.title+'.';if(i===2&&lesson.durationMinutes!==60){const start=minute;minute+=20;return text+' '+hhmm(start)+'–'+hhmm(minute)+': intervalo.';}return text;}).join(' ');}
  function renderTeacher(){
    const t=lesson.teacher;if(!t){$('#pane-teacher').textContent='Roteiro docente não incluído neste pacote.';return;}
    $('#pane-teacher').innerHTML=`<div class="teacher-only"><p class="eyebrow">Informações do professor</p><h2>Condução da aula ${lesson.id}</h2><p><strong>Título institucional:</strong> ${escape(lesson.officialTitle||'Consultar fonte indicada')}</p><p><strong>Fonte:</strong> ${escape(t.source)}</p><p><strong>Capacidade:</strong> ${escape(t.capacity)}</p><p><strong>Cobertura e limites:</strong> ${escape(t.coverage)}</p><p><strong>Estratégias e recursos previstos:</strong> ${escape(t.planResources)}</p><p><strong>Observar individualmente:</strong> ${escape(t.observe)}</p><p><strong>Checkpoints:</strong> ${escape(t.checkpoint)}</p><p><strong>Fechamento:</strong> ${escape(t.closing)}</p><p><strong>Próxima aula:</strong> ${escape(t.next)}</p><h3>Perguntas para mediar</h3><ul>${(t.questions||[]).map(q=>`<li>${escape(q)}</li>`).join('')}</ul>${teacherInstruments(t)}<h3>Tempo de referência</h3><p>${clockHTML()} ${lesson.durationMinutes===60?'Aula de 60 minutos, sem conteúdo novo.':lesson.durationMinutes===180?'Aula de 3h: encerramento às 22h.':lesson.durationMinutes===200?'PEA de 3h20: até 22h20 apenas consolidação opcional.':'Até 22h30 apenas consolidação opcional.'}</p><p class="muted">Esta edição prepara o material para nova utilização. Não altera PEA, calendário, presença ou nota no SGN e não atesta execução anterior. Recursos precisam de conferência física antes da aula.</p></div><div class="toolbar"><a class="button primary" href="${presentationURL(course,lesson)}">Abrir apresentação</a><a class="button" href="?uc=${encodeURIComponent(course.slug)}&aula=${lesson.id}&oficina=1">Abrir oficina</a><button type="button" id="print-script">Imprimir roteiro</button></div>`;
    $('#print-script').onclick=()=>window.print();
  }
  function route(){const params=new URLSearchParams(location.search),slug=params.get('uc'),id=params.get('aula');course=courses.find(c=>c.slug===slug);lesson=course?.lessons.find(l=>l.id===String(id).padStart(2,'0'));pane='start';if(!lesson)return renderHome();document.body.classList.remove('catalog-view');if(isTeacher&&!params.has('info')&&!params.has('oficina')){location.replace(presentationURL(course,lesson));return;}if(isTeacher&&params.has('info'))pane='teacher';project=openProject();selected=activeItems()[0]?.id||'';renderLesson();if(pane==='teacher')document.body.classList.add('information-view');else document.body.classList.remove('information-view');}
  document.addEventListener('click',event=>{const link=event.target.closest('a[href^="?uc="]');if(link){event.preventDefault();window.SenaiMedia?.unmount?.();history.pushState({},'',link.getAttribute('href'));route();scrollTo(0,0);}});
  window.addEventListener('popstate',()=>{window.SenaiMedia?.unmount?.();route();});
  $('#help').onclick=()=>$('#help-dialog').showModal();$('#close-help').onclick=()=>$('#help-dialog').close();$('#close-preview').onclick=()=>$('#preview').close();

  fetch('data/catalog.json').then(r=>{if(!r.ok)throw Error('Catálogo indisponível.');return r.json();}).then(async catalog=>{courses=await Promise.all(catalog.courses.map(async c=>{const r=await fetch('data/'+c.slug+'.json');if(!r.ok)throw Error('Não foi possível abrir '+c.title);return r.json();}));route();}).catch(error=>{main.innerHTML=`<h1>Não foi possível abrir as aulas.</h1><p>${escape(error.message)}</p><p>Inicie o pacote pelo arquivo iniciar.command. Abrir o HTML diretamente não permite carregar os dados.</p>`;});
  window.SenaiWorkshop={getProject:()=>clone(project),getLesson:()=>lesson,save,mediaGet,mediaPut,download,resourceURL,uid};
})();
