'use strict';

const quizAnswers = {
  cinema: {
    answer: 'dcp',
    feedback: 'A sala pediu um pacote DCP Flat 2K. A imagem Flat usa 1998×1080. O projetor do laboratório pode receber um MP4, mas esse pedido é para o servidor de uma sala de cinema.'
  },
  tv: {
    answer: 'mov',
    feedback: 'A emissora pediu o contêiner MOV e resolução Full HD (1920×1080). Antes da entrega real, confirme com a emissora o codec, o áudio e a taxa de quadros.'
  },
  redes: {
    answer: 'vertical',
    feedback: '1080×1920 é vertical, na proporção 9:16. Nesse pedido, o recorte preserva as partes importantes do comercial.'
  },
  web: {
    answer: 'hd',
    feedback: '1280×720 com bitrate moderado tende a gerar um arquivo mais leve. Assista para confirmar se a compressão ainda deixa os detalhes legíveis.'
  }
};

const quizForm = document.getElementById('quiz-form');
const quizStatus = document.getElementById('quiz-status');
let firstScore;

quizForm.addEventListener('submit', event => {
  event.preventDefault();
  let score = 0;

  for (const [destination, {answer, feedback}] of Object.entries(quizAnswers)) {
    const select = document.getElementById('quiz-' + destination);
    const result = document.getElementById('quiz-' + destination + '-feedback');
    const correct = select.value === answer;
    if (correct) score += 1;
    result.textContent = (correct ? 'Acertou. ' : 'Revise o pedido. ') + feedback;
    result.dataset.result = correct ? 'correct' : 'review';
    result.hidden = false;
  }

  firstScore ??= score;
  quizStatus.textContent = 'Nesta tentativa: ' + score + ' de 4. Primeiro placar: ' + firstScore + ' de 4.';
});

quizForm.addEventListener('change', event => {
  const result = document.getElementById(event.target.id + '-feedback');
  result.hidden = true;
  if (firstScore !== undefined) {
    quizStatus.textContent = 'Confira de novo para atualizar o placar. Primeiro placar: ' + firstScore + ' de 4.';
  }
});

const renders = {
  'projecao': {width: 1920, height: 1080, bytes: 18202627, bitsPerSecond: 12000623},
  '1080-compacto': {width: 1920, height: 1080, bytes: 1690274, bitsPerSecond: 992388},
  'web': {width: 1280, height: 720, bytes: 4681325, bitsPerSecond: 2986324},
  '720-compacto': {width: 1280, height: 720, bytes: 872263, bitsPerSecond: 446950}
};

const decimal = new Intl.NumberFormat('pt-BR', {maximumFractionDigits: 2});
function sizeLabel(bytes) {
  return bytes >= 1000000 ? decimal.format(bytes / 1000000) + ' MB' : decimal.format(bytes / 1000) + ' kB';
}

for (const select of document.querySelectorAll('[data-render]')) {
  const key = select.dataset.render;
  const video = document.getElementById('video-' + key);
  const info = document.getElementById('info-' + key);
  const download = document.getElementById('download-' + key);
  const showInfo = () => {
    const {width, height, bitsPerSecond, bytes} = renders[select.value];
    const bitrate = decimal.format(bitsPerSecond / 1000000) + ' Mb/s de vídeo';
    const size = decimal.format(bytes / 1000000) + ' MB';
    info.textContent = [width + '×' + height, bitrate, size].join(' · ');
  };
  select.addEventListener('change', () => {
    const path = 'trecho-' + select.value + '.mp4';
    video.src = path;
    download.href = path;
    video.load();
    showInfo();
  });
  video.addEventListener('error', () => {
    info.textContent += ' · Falha na reprodução. Tente abrir o MP4 no reprodutor do computador.';
  });
  showInfo();
}

document.getElementById('compare-frame').addEventListener('click', () => {
  for (const video of document.querySelectorAll('.render-card video')) {
    video.pause();
    if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
      video.preload = 'metadata';
      video.load();
    }
    video.currentTime = 4;
  }
});

const queueForm = document.getElementById('queue-form');
const queueStatus = document.getElementById('queue-status');
queueForm.addEventListener('submit', event => {
  event.preventDefault();
  const sample = document.getElementById('sample-length').valueAsNumber;
  const sampleRender = document.getElementById('sample-render').valueAsNumber;
  const project = document.getElementById('project-length').valueAsNumber;

  if (sample > project) {
    queueStatus.dataset.result = 'review';
    queueStatus.textContent = 'A duração do trecho precisa ser menor ou igual à duração do microcurta.';
    return;
  }

  const seconds = Math.ceil(sampleRender * project / sample);
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  const time = minutes ? decimal.format(minutes) + ' min ' + remaining + ' s' : seconds + ' s';
  queueStatus.dataset.result = '';
  queueStatus.textContent = 'Render estimado em ' + time + '. Acrescente tempo para esperar na fila e assistir à exportação.';
});
queueForm.addEventListener('input', () => {
  queueStatus.textContent = '';
});

const localFile = document.getElementById('local-file');
const localVideo = document.getElementById('local-video');
const localStatus = document.getElementById('local-status');
let localUrl;

localFile.addEventListener('change', () => {
  localVideo.hidden = true;
  localStatus.textContent = '';
  localStatus.dataset.result = '';
  if (localUrl) {
    localVideo.removeAttribute('src');
    localVideo.load();
    URL.revokeObjectURL(localUrl);
    localUrl = undefined;
  }

  const file = localFile.files[0];
  if (!file) return;
  localStatus.textContent = file.name + ' · ' + sizeLabel(file.size) + ' · Lendo o arquivo…';
  localUrl = URL.createObjectURL(file);
  localVideo.src = localUrl;
});

localVideo.addEventListener('loadedmetadata', () => {
  const file = localFile.files[0];
  if (!file || localVideo.currentSrc !== localUrl) return;
  if (!localVideo.videoWidth || !localVideo.videoHeight) {
    localStatus.dataset.result = 'review';
    localStatus.textContent = file.name + ' · ' + sizeLabel(file.size) + ' · Nenhuma imagem de vídeo reconhecida.';
    return;
  }

  const dimensions = localVideo.videoWidth + '×' + localVideo.videoHeight;
  const duration = Number.isFinite(localVideo.duration) ? decimal.format(localVideo.duration) + ' s' : 'duração indisponível';
  localStatus.textContent = [file.name, sizeLabel(file.size), dimensions, duration].join(' · ');
  localVideo.hidden = false;
});

localVideo.addEventListener('error', () => {
  const file = localFile.files[0];
  if (!file || localVideo.currentSrc !== localUrl) return;
  localVideo.hidden = true;
  localStatus.dataset.result = 'review';
  localStatus.textContent = file.name + ' · ' + sizeLabel(file.size) + ' · O navegador não conseguiu abrir. Teste no reprodutor do computador.';
});

const recordForm = document.getElementById('record-form');
const recordStatus = document.getElementById('record-status');
const recordFields = [
  ['Comparação de renders', document.getElementById('observation')],
  ['Ajuste de exportação e conferência', document.getElementById('decision')],
  ['Organização da estreia', document.getElementById('queue-decision')]
];

recordForm.addEventListener('submit', event => {
  event.preventDefault();
  for (const [, field] of recordFields) {
    field.value = field.value.trim();
  }
  if (!recordForm.reportValidity()) return;

  const lines = ['Produção Audiovisual · Aula 16', 'Render e estreia do microcurta', 'Registro individual'];
  for (const [label, field] of recordFields) {
    lines.push('', label, field.value);
  }
  const downloadUrl = URL.createObjectURL(new Blob([lines.join('\n') + '\n'], {type: 'text/plain;charset=utf-8'}));
  const download = document.createElement('a');
  download.href = downloadUrl;
  download.download = 'aula-16-registro-individual.txt';
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
  recordStatus.textContent = 'Confira o arquivo na pasta de downloads e guarde com os vídeos.';
});

recordForm.addEventListener('input', () => {
  recordStatus.textContent = '';
});
