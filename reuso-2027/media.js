/* Montagem curta no navegador. O formato de saída é o formato real do gravador. */
(() => {
  'use strict';
  let cleanup;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function mount(root,api) {
    cleanup?.();if(!root)return;
    const {project,save,mediaGet,mediaPut,download,notify,lesson,resourceURL,uid}=api;
    const state=project.mediaStudio ||= {};
    state.clips ||= [];state.settings ||= {text:'',brightness:100,saturation:100,chroma:false,keyColor:'#00ff00',tolerance:85,mask:false,x0:10,y0:85,x1:70,y1:85};
    let selected=0,playing=false,recording=false,startingRecording=false,recordingFailed=false,started=0,raf=0,currentMedia=null,urls=[],recorder=null,audioContext=null,audioSource=null,audioDestination=null,disposed=false,loadGeneration=0;
    const video=document.createElement('video');video.playsInline=true;video.preload='auto';video.crossOrigin='anonymous';
    const image=new Image(),backgroundImage=new Image();let imageReady=false,backgroundReady=false;
    root.className='media-studio';
    root.innerHTML=`<p class="eyebrow">Ferramenta local / vídeo curto</p><h2>Montagem local</h2><p>Organize imagens e clipes, recorte trechos e compare os efeitos. A gravação acontece em tempo real e gera um vídeo WebM quando o navegador oferece esse formato. Guarde também o projeto para editar depois.</p><div class="toolbar"><button type="button" id="clip-add">Adicionar clipe</button><input type="file" id="clip-file" accept="image/*,video/*,audio/*" multiple hidden><button type="button" id="clip-up">Mover antes</button><button type="button" id="clip-down">Mover depois</button><button type="button" id="clip-remove">Retirar clipe</button></div><label for="clip-select">Sequência</label><select id="clip-select"></select><div class="media-controls"><div><label for="clip-in">Início do trecho (s)</label><input id="clip-in" type="number" min="0" step=".1" value="0"></div><div><label for="clip-out">Fim do trecho (s)</label><input id="clip-out" type="number" min=".2" step=".1" value="5"></div><div><label for="studio-text">Texto sobre a imagem</label><input id="studio-text" maxlength="120"></div><div><label for="studio-brightness">Brilho (%)</label><input id="studio-brightness" type="range" min="40" max="170" value="100"></div><div><label for="studio-saturation">Saturação (%)</label><input id="studio-saturation" type="range" min="0" max="200" value="100"></div><div><label><input id="studio-mask" type="checkbox"> Máscara circular</label><label><input id="studio-chroma" type="checkbox"> Chroma key</label></div><div><label for="studio-keyColor">Cor do chroma key</label><input id="studio-keyColor" type="color" value="#00ff00"></div><div><label for="studio-tolerance">Tolerância do chroma (0–220)</label><input id="studio-tolerance" type="range" min="0" max="220" value="85"></div><div><label for="studio-background">Fundo da composição</label><input id="studio-background" type="color" value="${/^#[0-9a-f]{6}$/i.test(state.settings.background||'')?state.settings.background:'#243c50'}"></div><div><label for="studio-x0">Posição início · X (%)</label><input id="studio-x0" type="range" min="0" max="85" value="10"></div><div><label for="studio-y0">Posição início · Y (%)</label><input id="studio-y0" type="range" min="10" max="95" value="85"></div><div><label for="studio-x1">Posição fim · X (%)</label><input id="studio-x1" type="range" min="0" max="85" value="70"></div><div><label for="studio-y1">Posição fim · Y (%)</label><input id="studio-y1" type="range" min="10" max="95" value="85"></div></div><p class="muted">As posições início/fim são dois pontos de movimento do texto. A máscara circular recorta a imagem; o chroma troca a cor escolhida pelo fundo. O recorte temporal usa Início/Fim de cada clipe. Mantenha cada trecho curto.</p><canvas id="studio-canvas" width="960" height="540" aria-label="Prévia da montagem de vídeo"></canvas><div class="toolbar"><button id="studio-play" type="button">Prévia da montagem</button><button id="studio-pause" type="button">Parar prévia</button><button id="studio-record" type="button" class="primary">Gravar WebM</button><button id="studio-stop-record" type="button" disabled>Finalizar gravação</button><button id="studio-save" type="button">Baixar projeto</button></div><p class="media-status" id="studio-status" role="status">Adicione imagens ou clipes locais para montar a sequência.</p><p class="muted">Para restaurar a montagem, use Importar projeto no topo da aula. A gravação não cria MP4 por renomeação. Se uma entrega exigir outro formato ou edição avançada, use o editor previsto que estiver disponível no laboratório.</p>`;
    const $=s=>root.querySelector(s),canvas=$('#studio-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    const status=text=>{$('#studio-status').textContent=text;};
    const bgControls=document.createElement('div');
    bgControls.className='toolbar';
    bgControls.innerHTML='<label for="studio-background-file">Fundo com imagem (opcional)</label><input id="studio-background-file" type="file" accept="image/*"><button type="button" id="studio-background-clear">Retirar imagem de fundo</button>';
    $('#studio-canvas').before(bgControls);
    async function loadBackground(){backgroundReady=false;if(!state.settings.backgroundMedia)return;const blob=await mediaGet(state.settings.backgroundMedia);if(!blob||disposed)return;const url=URL.createObjectURL(blob);urls.push(url);await new Promise(resolve=>{backgroundImage.onload=()=>{backgroundReady=true;resolve();};backgroundImage.onerror=resolve;backgroundImage.src=url;});if(!playing)draw(0);}
    $('#studio-background-file').onchange=async event=>{const file=event.target.files[0];if(!file)return;if(!file.type.startsWith('image/')||file.size>35*1024*1024)return notify('Escolha uma imagem de até 35 MB.');try{const id=uid();await mediaPut(id,file);state.settings.backgroundMedia=id;store();await loadBackground();status('Imagem de fundo guardada. Ative Chroma key para ver a composição.');}catch(error){notify(error.message);}};
    $('#studio-background-clear').onclick=()=>{delete state.settings.backgroundMedia;backgroundReady=false;store();draw(0);};
    const ratioControls=document.createElement('div');ratioControls.innerHTML='<label for="studio-ratio">Proporção do vídeo</label><select id="studio-ratio"><option value="landscape">Horizontal ·16:9</option><option value="portrait">Vertical ·9:16</option></select>';bgControls.before(ratioControls);
    $('#studio-ratio').value=state.settings.ratio==='portrait'?'portrait':'landscape';
    function setRatio(){const portrait=state.settings.ratio==='portrait';canvas.width=portrait?540:960;canvas.height=portrait?960:540;canvas.style.aspectRatio=portrait?'9 /16':'16 /9';}
    $('#studio-ratio').onchange=e=>{if(playing)stopPreview();state.settings.ratio=e.target.value;setRatio();store();draw(0);};setRatio();
    const store=()=>{save();};
    function lockRecording(locked){root.querySelectorAll('button,input,select').forEach(el=>{if(el.id!=='studio-stop-record')el.disabled=locked;});$('#studio-stop-record').disabled=!locked;}

    const duration=clip=>Math.max(.2,Math.min(120,Number(clip?.outTime||5)-Number(clip?.inTime||0)));
    function options(){const select=$('#clip-select');select.innerHTML=state.clips.length?state.clips.map((c,i)=>`<option value="${i}">${i+1}. ${esc(c.name)} · ${duration(c).toFixed(1)}s</option>`).join(''):'<option value="">Nenhum clipe</option>';selected=Math.max(0,Math.min(selected,state.clips.length-1));select.value=String(selected);const c=state.clips[selected];$('#clip-in').value=c?.inTime||0;$('#clip-out').value=c?.outTime||5;}
    async function loadClip() {
      const generation=++loadGeneration;video.pause();imageReady=false;currentMedia=null;
      const clip=state.clips[selected];if(!clip){draw(0);return true;}
      try{
        const blob=await mediaGet(clip.mediaId);if(disposed||generation!==loadGeneration)return false;
        if(!blob)throw Error('Mídia não encontrada. Importe o projeto com os arquivos ou substitua este clipe.');
        const url=URL.createObjectURL(blob);urls.push(url);
        const waitForMedia=(element,ready,begin)=>new Promise((resolve,reject)=>{
          const timer=setTimeout(()=>finish(Error('O navegador não conseguiu abrir este clipe a tempo. Confira o arquivo original e substitua-o.')),15000);
          const finish=error=>{clearTimeout(timer);element.removeEventListener(ready,onReady);element.removeEventListener('error',onError);error?reject(error):resolve();};
          const onReady=()=>finish(),onError=()=>finish(Error('Este navegador não conseguiu abrir o clipe. Confira o arquivo original e substitua-o por uma mídia compatível.'));
          element.addEventListener(ready,onReady,{once:true});element.addEventListener('error',onError,{once:true});begin();
        });
        if(blob.type.startsWith('image/')){
          await waitForMedia(image,'load',()=>{image.src=url;});
          if(disposed||generation!==loadGeneration)return false;
          imageReady=true;currentMedia=image;
        }else{
          await waitForMedia(video,'loadeddata',()=>{video.src=url;video.load();});
          if(disposed||generation!==loadGeneration)return false;
          currentMedia=video;
          if(Number.isFinite(video.duration)){
            clip.inTime=Math.min(Math.max(0,Number(clip.inTime)||0),Math.max(0,video.duration-.2));clip.outTime=Math.max(clip.inTime+.2,Math.min(video.duration,Number(clip.outTime)||5));options();store();
            if(Math.abs(video.currentTime-clip.inTime)>.04)await new Promise(resolve=>{const finish=()=>{video.removeEventListener('seeked',finish);clearTimeout(timer);resolve();};const timer=setTimeout(finish,1500);video.addEventListener('seeked',finish,{once:true});video.currentTime=clip.inTime;});
          }
        }
        if(disposed||generation!==loadGeneration)return false;
        draw(0);return true;
      }catch(error){if(disposed||generation!==loadGeneration)return false;currentMedia=null;imageReady=false;draw(0);throw error;}
    }
    function reportClipError(error){
      if(disposed)return;
      if(recording){recordingFailed=true;finishRecording();}else stopPreview();
      status(error.message+' Seu projeto continua guardado.');
    }
    async function showClip(){try{return await loadClip();}catch(error){reportClipError(error);return false;}}
    function draw(progress) {
      const settings=state.settings,W=canvas.width,H=canvas.height;ctx.fillStyle=settings.background||'#243c50';ctx.fillRect(0,0,W,H);
      if(backgroundReady)ctx.drawImage(backgroundImage,0,0,W,H);
      const backgroundPixels=settings.chroma?ctx.getImageData(0,0,W,H).data:null;
      if(currentMedia && (currentMedia===image?imageReady:video.readyState>=2)){
        const w=currentMedia===image?image.naturalWidth:video.videoWidth,h=currentMedia===image?image.naturalHeight:video.videoHeight;
        if(w&&h){
          const ratio=Math.min(W/w,H/h),dw=w*ratio,dh=h*ratio;
          ctx.save();if(settings.mask){ctx.beginPath();ctx.arc(W/2,H/2,Math.min(W,H)*.46,0,Math.PI*2);ctx.clip();}
          ctx.filter=`brightness(${Number(settings.brightness)||100}%) saturate(${Number(settings.saturation)||0}%)`;
          ctx.drawImage(currentMedia,(W-dw)/2,(H-dh)/2,dw,dh);ctx.restore();
          if(settings.chroma){try{const pixels=ctx.getImageData(0,0,W,H),d=pixels.data,color=settings.keyColor||'#00ff00',rgb=[parseInt(color.slice(1,3),16),parseInt(color.slice(3,5),16),parseInt(color.slice(5,7),16)];for(let i=0;i<d.length;i+=4){const distance=Math.hypot(d[i]-rgb[0],d[i+1]-rgb[1],d[i+2]-rgb[2]);if(distance<Number(settings.tolerance)){d[i]=backgroundPixels[i];d[i+1]=backgroundPixels[i+1];d[i+2]=backgroundPixels[i+2];}}ctx.putImageData(pixels,0,0);}catch(error){status('Não foi possível aplicar chroma nesta mídia. Use um arquivo local.');}}
        }
      }
      if(!currentMedia){ctx.fillStyle='#e9eee7';ctx.font='28px system-ui';ctx.fillText('Sua montagem aparece aqui',30,H/2);}
      if(settings.text){const x=(Number(settings.x0)+(Number(settings.x1)-Number(settings.x0))*progress)*W/100,y=(Number(settings.y0)+(Number(settings.y1)-Number(settings.y0))*progress)*H/100;ctx.font='bold 34px system-ui';ctx.strokeStyle='#101710';ctx.lineWidth=7;ctx.strokeText(settings.text,x,y,W-30-x);ctx.fillStyle='#fffdf1';ctx.fillText(settings.text,x,y,W-30-x);}
    }
    async function ensureAudio(){if(!window.AudioContext&&!window.webkitAudioContext)return;audioContext ||= new (window.AudioContext||window.webkitAudioContext)();audioDestination ||= audioContext.createMediaStreamDestination();if(!audioSource){audioSource=audioContext.createMediaElementSource(video);audioSource.connect(audioContext.destination);audioSource.connect(audioDestination);}await audioContext.resume();}
    async function startPreview(fromBeginning=true){
      if(!state.clips.length)return status('Adicione ao menos um clipe.');
      if(playing||startingRecording)return;
      if(fromBeginning)selected=0;
      playing=true;
      try{options();await ensureAudio();if(!recording&&!(await loadClip()))return;if(disposed||!playing){stopPreview();return;}started=performance.now();if(currentMedia===video)await video.play();raf=requestAnimationFrame(tick);status(recording?'Gravando em tempo real. Aguarde ou finalize para guardar um trecho.':'Prévia em andamento.');}
      catch(error){reportClipError(error);}
    }
    async function tick(now){
      if(!playing||disposed)return;
      try{
        const clip=state.clips[selected],p=Math.min(1,(now-started)/(duration(clip)*1000));draw(p);
        if(p>=1){
          video.pause();selected++;
          if(selected>=state.clips.length){playing=false;selected=Math.max(0,state.clips.length-1);options();if(recording)finishRecording();else status('Prévia concluída. Você pode assistir novamente.');return;}
          options();if(!(await loadClip()))return;
          if(!playing||disposed)return;
          started=performance.now();if(currentMedia===video)await video.play();
        }
        raf=requestAnimationFrame(tick);
      }catch(error){
        reportClipError(error);
      }
    }
    function stopPreview(){playing=false;cancelAnimationFrame(raf);video.pause();if(!recording)status('Prévia parada. Seu projeto continua guardado.');}
    function finishRecording(){stopPreview();if(recorder?.state==='recording')recorder.stop();recording=false;lockRecording(false);}
    $('#clip-add').onclick=()=>$('#clip-file').click();
    $('#clip-file').onchange=async event=>{for(const file of event.target.files){if(state.clips.length>=80){notify('O limite da montagem é 80 clipes.');break;}if(!/^(image|audio|video)\//.test(file.type)){notify('Arquivo ignorado: use imagem, áudio ou vídeo.');continue;}if(file.size>35*1024*1024){notify('Use clipes de até 35 MB.');continue;}try{const id=uid();await mediaPut(id,file);if(state.clips.length>=80){notify('O limite da montagem é 80 clipes.');break;}state.clips.push({mediaId:id,name:file.name,type:file.type,inTime:0,outTime:5});}catch(error){notify(error.message);}}selected=state.clips.length-1;store();options();if(await showClip())status('Clipe guardado. Ajuste início/fim e veja a prévia.');};
    $('#clip-select').onchange=async e=>{stopPreview();selected=Number(e.target.value)||0;options();await showClip();};
    for(const [selector,property]of[['#clip-in','inTime'],['#clip-out','outTime']])$(selector).onchange=e=>{const clip=state.clips[selected];if(!clip)return;const value=Math.max(0,Math.min(600,Number(e.target.value)||0));clip[property]=value;if(clip.outTime<=clip.inTime)clip.outTime=clip.inTime+.2;store();options();showClip();};
    for(const [selector,delta]of[['#clip-up',-1],['#clip-down',1]])$(selector).onclick=()=>{if(playing)return status('Pare a prévia para mudar a sequência.');const next=selected+delta;if(next<0||next>=state.clips.length)return;[state.clips[selected],state.clips[next]]=[state.clips[next],state.clips[selected]];selected=next;store();options();};
    $('#clip-remove').onclick=()=>{stopPreview();state.clips.splice(selected,1);store();options();showClip();};
    for(const field of['text','brightness','saturation','keyColor','tolerance','x0','y0','x1','y1','background']){const input=$('#studio-'+field);if(state.settings[field]!==undefined)input.value=state.settings[field];input.oninput=e=>{state.settings[field]=['text','keyColor','background'].includes(field)?e.target.value:Number(e.target.value);store();if(!playing)draw(0);};}
    for(const field of['mask','chroma']){const input=$('#studio-'+field);input.checked=!!state.settings[field];input.onchange=e=>{state.settings[field]=e.target.checked;store();draw(0);};}
    $('#studio-play').onclick=()=>startPreview();$('#studio-pause').onclick=()=>{if(recording)return status('Use Finalizar gravação para guardar o vídeo.');stopPreview();};
    $('#studio-record').onclick=async()=>{
      if(recording||startingRecording)return;
      if(!state.clips.length)return status('Adicione ao menos um clipe antes de gravar.');
      const total=state.clips.reduce((s,c)=>s+duration(c),0);if(total>180)return status('A montagem local grava até 180 segundos por vez. Reduza os trechos ou divida em partes.');
      if(!window.MediaRecorder||!canvas.captureStream)return status('Este navegador não grava vídeo. Abra no Chrome atualizado do laboratório ou use o editor previsto disponível.');
      startingRecording=true;recordingFailed=false;lockRecording(true);let capture;
      try{
        const type=['video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(t=>MediaRecorder.isTypeSupported(t));
        if(!type)throw Error('O navegador não oferece formato de gravação compatível.');
        stopPreview();selected=0;options();await ensureAudio();if(!(await loadClip()))return;
        if(disposed)return;
        capture=canvas.captureStream(25);if(audioDestination)for(const track of audioDestination.stream.getAudioTracks())capture.addTrack(track);
        recorder=new MediaRecorder(capture,{mimeType:type});const recordingChunks=[];
        recorder.ondataavailable=e=>{if(e.data.size)recordingChunks.push(e.data);};
        recorder.onstop=()=>{if(recordingChunks.length){const extension=type.includes('mp4')?'mp4':'webm';download(new Blob(recordingChunks,{type}),`montagem-aula-${lesson.id}.${extension}`);if(!recordingFailed)status('Vídeo guardado. Abra o arquivo para conferir imagem, som e duração.');}capture.getVideoTracks().forEach(t=>t.stop());};
        recorder.start(300);recording=true;startingRecording=false;await startPreview();
      }catch(error){stopPreview();if(recorder?.state==='recording')recorder.stop();capture?.getVideoTracks().forEach(t=>t.stop());recording=false;status('Não foi possível gravar: '+error.message);}
      finally{startingRecording=false;if(!recording)lockRecording(false);}
    };
    $('#studio-stop-record').onclick=finishRecording;
    $('#studio-save').onclick=()=>document.querySelector('#export-project').click();
    const available=(lesson.media||[]).filter(m=>/\.(mp4|webm|mp3|wav|ogg|png|jpe?g|webp)$/i.test(m.path||''));
    if(available.length){const div=document.createElement('div');div.innerHTML=`<label for="studio-source">Mídias preparadas para esta aula</label><select id="studio-source">${available.map((m,i)=>`<option value="${i}">${esc(m.title||m.path.split('/').pop())}</option>`).join('')}</select><button type="button" id="studio-use-source">Usar mídia preparada</button>`;root.append(div);$('#studio-use-source').onclick=async()=>{if(state.clips.length>=80)return notify('O limite da montagem é 80 clipes.');const m=available[Number($('#studio-source').value)];try{const url=resourceURL(m.path),response=await fetch(url);if(!response.ok)throw Error('Arquivo não encontrado no pacote.');const blob=await response.blob(),id=uid();if(state.clips.length>=80)return notify('O limite da montagem é 80 clipes.');await mediaPut(id,blob);if(state.clips.length>=80)return notify('O limite da montagem é 80 clipes.');state.clips.push({mediaId:id,name:m.title||m.path.split('/').pop(),type:blob.type,inTime:0,outTime:5});selected=state.clips.length-1;store();options();await showClip();}catch(error){notify(error.message);}};}
    options();loadBackground().catch(reportClipError);showClip();
    cleanup=()=>{disposed=true;if(recording)finishRecording();else stopPreview();video.pause();video.removeAttribute('src');video.load();urls.forEach(URL.revokeObjectURL);audioContext?.close().catch(()=>{});cancelAnimationFrame(raf);};
  }
  window.SenaiMedia={mount,unmount(){cleanup?.();cleanup=null;}};
})();
