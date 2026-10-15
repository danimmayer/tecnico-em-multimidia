// Fonte regenerável da Aula 12. Gerar com node scripts/build-audiovisual.mjs.
export const lesson = {
  title: 'Grafismos, textos e máscaras',
  description: 'Dar identidade a uma abertura no Shotcut com cenas prontas: título alinhado, faixa com nome, legenda legível, texto por trás do personagem e assinatura com créditos, tudo exportado no próprio computador.',
  objectives: ['Edição de vídeos e sons: criação de elementos gráficos, máscaras, composição com sequência de imagem.', 'Inovação: conceito, visão inovadora.'],
  technical: [
    'Identificar tipos e características de plataformas utilizados no processo de criação de elementos de gráficos para imagens, animações, áudio e vídeo.',
    'Selecionar elementos audiovisuais como: formas, imagens, grafismos, pictogramas, áudio, animações vídeos, textos para o desenvolvimento de animações gráficas.',
    'Aplicar procedimentos de proximidade e alinhamento para desenvolver projetos audiovisuais.'
  ],
  socioemotional: ['Aplicar os aspectos de inovação em suas atividades profissionais.', 'Reconhecer a pesquisa como fonte de inovação e formação de um espírito empreendedor.'],
  schedule: [
    {horario: '19:00 - 19:45', atividade: 'Comparar títulos soltos e alinhados, reconhecer a função de cada texto na tela e escolher onde ele cabe em cada cena. Abertura flexível: pode ceder lugar à preparação do Shotcut Portable. Com os postos prontos, antecipar a montagem.'},
    {horario: '20:05 - 21:00', atividade: 'Organizar a linha do tempo em camadas, criar um título alinhado à margem, uma faixa com o nome do personagem e uma legenda que não disputa espaço com outros textos.'},
    {horario: '21:00 - 21:40', atividade: 'Empilhar a mesma foto em duas trilhas e recortar a de cima com uma máscara elíptica para a palavra passar por trás do personagem; quem avançar faz a palavra atravessar a cena com keyframes.'},
    {horario: '21:40 - 22:10', atividade: 'Criar a assinatura final com pictograma e créditos, ocultar o guia, exportar em MP4, assistir, corrigir um ponto visível e mostrar a abertura na própria tela.'}
  ],
  methodology: 'A abertura antes do lanche é flexível: comparação de exemplos e leitura das cenas podem ser abreviadas ou inteiramente substituídas pela preparação do Shotcut Portable, se necessária. A prática essencial começa depois do lanche, do zero, com demonstrações breves seguidas de edição no próprio posto. A aprendizagem aparece na tela: posicionar, alinhar, agrupar, recortar e comparar. Cada estudante edita quando há computador disponível; em postos compartilhados, os integrantes alternam o mouse entre desafios. Quem termina avança para uma variação de movimento ou de identidade visual.',
  resources: 'Projetor, fones de ouvido, computadores, Shotcut Portable oficial para Windows 11 já extraído na pasta 01-SHOTCUT/Shotcut e pasta 02-ALUNO/Aula12 já pronta para copiar para Documentos no disco local. O Shotcut é gratuito e de código aberto. O kit contém três clipes e duas fotos de Caminandes 3: Llamigos, com créditos e licença CC BY 3.0, e cinco grafismos PNG com transparência: guia de margens, faixa inferior e três pictogramas. Se necessária, a preparação do Shotcut Portable pode ocupar o primeiro bloco, com apoio do laboratório. Guia-Aula12-Shotcut.pdf para consulta offline. Nenhuma ficha impressa, conta ou upload. Distribuir o programa Portable e o kit por pendrive ou rede local, preferencialmente antes da turma; não solicitar downloads simultâneos aos 20 a 30 alunos.',
  observation: 'Aula das 19:00 às 22:10; lanche das 19:45 às 20:05 e chamada no início de cada bloco. Os estudantes permanecem nos postos; somente o professor circula. Antes do lanche, comparação e leitura das cenas são opcionais: posso abreviar ou pular toda a abertura para copiar e testar o Shotcut Portable. Com os postos prontos, antecipo a prática. Levar Aula12-Pendrive com o Shotcut Portable já extraído; se o Shotcut da aula 11 ainda estiver em Documentos, basta copiar 02-ALUNO/Aula12. Preparar, se possível, um computador de demonstração com texto, máscara e exportação testados. Depois do lanche, demonstro desde a pasta do kit; nenhuma tarefa anterior é pré-requisito e não depender de arquivos das aulas anteriores, inclusive do trailer da aula 11. Se a preparação do Shotcut Portable avançar depois das 20:05, usar temporariamente os postos que já funcionam, com revezamento; manter título, faixa, máscara, um texto final com os créditos e a exportação, deixando legenda, pictograma e variações como extras. Copiar o kit uma vez para cada posto e editar no disco local. Não exigir caderno, fichas ou justificativas escritas. Observar o teste na tela enquanto circula. Um projeto .mlt e um MP4 bastam; manter ambos na pasta do kit, pois o .mlt referencia as mídias e os grafismos. Mostrar o resultado no próprio posto, sem upload coletivo. A assinatura final leva os créditos CC BY; manter CREDITOS.txt com o trabalho compartilhado. Chroma key e correção de cor ficam para a aula 13.'
};
const base = 'modelos/producao-audiovisual/aula-12/';
const checks = items => ({type: 'checks', items: items.map(([label, text]) => ({label, text}))});
const commands = (items, result) => ({type: 'commands', commands: items.map(([word, who, text]) => ({word, who, text})), tags: [{label: 'SHOTCUT', kind: 'good'}], result});
const teacher = (steps, watch, rescue) => ({steps, watch, rescue});
const media = clips => ({type: 'media', clips: clips.map(([file, label, text, poster]) => ({src: base + file, label, text, poster: base + poster}))});
const stills = images => ({type: 'stills', images: images.map(([file, label, text]) => ({src: base + file, label, text}))});

export const support = {
  teacherGoal: 'Fazer a turma compor texto e grafismo sobre o vídeo com intenção: título alinhado à margem, nome perto de quem aparece, legenda legível, uma palavra recortada por máscara e uma assinatura com créditos, exportados localmente.',
  plainLanguage: 'Alinhar é fazer elementos compartilharem uma mesma borda. Agrupar por proximidade é deixar perto o que pertence junto. Uma máscara esconde parte de uma camada; o que fica escondido deixa aparecer a trilha de baixo.',
  say: 'Hoje o vídeo ganha nome e voz escrita. Cada texto tem um trabalho: apresentar, identificar, traduzir o som ou assinar. Vocês decidem onde ele fica e o que ele não pode cobrir.',
  demo: [
    'Levo programa Portable e kit já baixados. Antes do lanche, comparo exemplos se houver tempo; posso usar toda a abertura para preparar os postos. Depois, demonstro a prática desde o início.',
    'Mostro o título solto e o alinhado na mesma cena e pergunto qual se lê primeiro.',
    'Crio no Shotcut um texto, alinho à margem do guia e faço a entrada suave pelo canto do clipe.',
    'Empilho a mesma foto em duas trilhas, coloco a palavra no meio e recorto a foto de cima com a elipse.',
    'Oculto o guia, exporto e abro o MP4 no reprodutor local.'
  ],
  studentDeliverable: 'Uma abertura curta, como referência de 15 a 25 segundos, montada com as cenas do kit: título alinhado na paisagem, faixa com o nome de Oti, uma legenda, uma palavra por trás de Koro e uma assinatura com créditos. Salvar minha-abertura.mlt e minha-abertura.mp4 na pasta Aula12. Mostrar o resultado na própria tela; sem envio pela internet ou relatório.',
  check: [
    'O título está dentro da margem do texto e alinhado a uma borda do guia.',
    'Nome e descrição da faixa compartilham a mesma borda e ficam perto de Oti, sem cobrir rosto ou ação.',
    'A legenda está no centro inferior, com fundo ou contorno, e não aparece junto da faixa.',
    'A palavra passa por trás da cabeça de Koro: a foto de cima tem a máscara e a palavra está na trilha do meio.',
    'A assinatura final identifica quem fez e mantém os créditos de Caminandes 3 com a licença CC BY.',
    'O guia está oculto no MP4, que reproduz do começo ao fim; projeto e vídeo estão na pasta Aula12.'
  ],
  fallback: 'O Portable já extraído e o kit local evitam downloads simultâneos. Se houver bloqueio ao abrir o Shotcut, solicitar apoio do laboratório e compartilhar um posto funcional com revezamento enquanto isso. O kit independe de material antigo e da internet. Se o diálogo de texto da versão instalada for diferente, crio Abrir outro → Cor transparente e aplico o filtro Texto: simples ao clipe. Se a prévia travar, reduzo a resolução de prévia e confiro um trecho exportado. Não substituir a edição por preenchimento de fichas.',
  extension: 'Quem concluir um desafio recebe sua variação imediatamente: animar a palavra atravessando a cabeça com dois keyframes de posição, trocar o pictograma da assinatura, criar a faixa de Koro do lado oposto ou testar Texto: rico para dar tamanhos diferentes ao nome e à descrição. As variações acontecem no projeto atual; não exigem arquivos extras nem uploads.',
  commonProblems: [
    ['A preparação do Shotcut Portable ainda não terminou', 'Encurto ou pulo a comparação da abertura para preparar os postos. Depois do lanche, quem precisar compartilha temporariamente um posto funcional; solicito apoio do laboratório para permissões.'],
    ['O texto não aparece na prévia', 'Confiro se o clipe de texto está em uma trilha acima do vídeo e se o fundo do texto está transparente. A trilha de cima cobre a de baixo.'],
    ['O PNG apareceu com fundo preto', 'Confiro se arrastei o arquivo .png do kit, não uma captura de tela. Na trilha V1 não há nada embaixo; o grafismo vai para V2 ou acima.'],
    ['A faixa ou o guia some depois de 4 segundos', 'Imagens entram com duração padrão. Puxo a borda direita do clipe até o fim da cena.'],
    ['A palavra ficou na frente da cabeça', 'Confiro a ordem: foto em V1, palavra em V2 e a mesma foto com máscara em V3. A máscara vai na foto de cima, não na palavra.'],
    ['A máscara cortou um pedaço do céu sobre as letras', 'Diminuo a elipse ou giro a forma; uma forma simples não acompanha reentrâncias. Posso subir a palavra para que ela cruze só o alto da cabeça.'],
    ['O guia apareceu no vídeo exportado', 'Clico no olho da trilha V4 para ocultar e exporto de novo.'],
    ['Terminei antes', 'Entrego a próxima variação de identidade ou movimento enquanto acompanho os colegas; não encerro a prática no primeiro MP4.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia', kicker: 'Aula 12 · Shotcut', heading: 'Seu vídeo ganha nome, legenda e assinatura.',
      lede: 'Cenas prontas. Vocês decidem onde cada texto fica e o que ele não pode cobrir.', block: 1,
      av9: {type: 'day', rows: [
        {time: '19:00–19:45', minutes: 45, title: 'Ler textos na tela', text: 'Alinhamento, proximidade e espaço livre.'},
        {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Na volta, começa a montagem.', pause: true},
        {time: '20:05–21:00', minutes: 55, title: 'Título, faixa e legenda', text: 'Camadas e margens no Shotcut.'},
        {time: '21:00–21:40', minutes: 40, title: 'Texto por trás', text: 'Uma máscara recorta a camada de cima.'},
        {time: '21:40–22:10', minutes: 30, title: 'Assinar e exportar', text: 'Créditos, MP4 e mostra na tela.'}
      ]},
      teacher: teacher(['3 min · Faço a chamada e apresento o desafio; organizo o revezamento apenas nos postos compartilhados.'], 'A exigência está nas decisões de posição e de camada, não na quantidade de efeitos.', 'Mostro o exemplo pronto logo em seguida para tornar o resultado concreto.')
    },
    {
      title: 'Ver o resultado', kicker: 'Uma ideia do que vamos criar', heading: 'Quatro textos. Cada um com um trabalho.',
      lede: 'Assistam e contem quantos textos aparecem. Qual deles passa por trás de alguém?', block: 1,
      av9: media([['exemplo-abertura.mp4', 'ABERTURA', 'Título, faixa, legenda, texto por trás e assinatura.', 'telas/titulo-alinhado.jpg']]),
      promptLabel: 'Repare', prompt: 'Nenhum texto cobre um rosto. Onde o vídeo deixou espaço para as palavras?',
      teacher: teacher(['7 min · Janela flexível para reproduzir o exemplo duas vezes e ouvir o que a turma percebeu, enquanto acompanho a preparação dos postos.'], 'O exemplo é silencioso para concentrar a atenção nos textos. Posso encurtar ou pular este momento para preparar o Shotcut Portable.', 'Se os postos já funcionam, avanço para a montagem; não alongo a conversa para preencher o tempo.')
    },
    {
      title: 'Alinhar e agrupar', kicker: 'Mesma cena · mesmas palavras', heading: 'Qual título vocês leem primeiro?',
      lede: 'As palavras são idênticas. Mudaram apenas a posição e a distância entre elas.', block: 1,
      av9: stills([
        ['telas/titulo-solto.jpg', 'SOLTO', 'Cada linha começa em um lugar; a segunda se afasta e sai da margem.'],
        ['telas/titulo-alinhado.jpg', 'ALINHADO', 'As duas linhas começam na mesma borda e ficam juntas.']
      ]),
      promptLabel: 'Pensem', prompt: 'O que pertence junto fica perto. O que fica perto parece um bloco só.',
      teacher: teacher(['10 min · Janela flexível: comparo as duas versões, peço que a turma aponte a borda comum e a distância entre as linhas, e relaciono com faixas de telejornal e aberturas de série que eles conhecem.'], 'Proximidade agrupa; alinhamento cria uma borda invisível que o olho segue. A versão solta também corta o subtítulo na borda da tela.', 'Se a conversa travar, cubro uma das versões com a mão e peço que leiam a outra em voz alta.')
    },
    {
      title: 'Quatro textos, quatro funções', kicker: 'Antes de digitar', heading: 'Cada texto tem um lugar e um tempo',
      lede: 'Hoje vocês vão criar os quatro. Decidam a função antes do estilo.', block: 1,
      av9: {type: 'table', variant: 'data', columns: ['Texto', 'Trabalho', 'Lugar', 'Na tela'], rows: [
        ['Título', 'Apresentar o vídeo.', 'Área livre, dentro da margem.', 'Tempo de ler duas vezes.'],
        ['Faixa com nome', 'Identificar quem aparece.', 'Perto da pessoa, sem cobrir o rosto.', 'Enquanto ela está em cena.'],
        ['Legenda', 'Escrever o que se ouve.', 'Centro inferior, no máximo duas linhas.', 'Pelo menos dois segundos.'],
        ['Assinatura', 'Dizer quem fez e de onde vêm as imagens.', 'Centro, com espaço em volta.', 'No final.']
      ]},
      teacher: teacher(['8 min · Leio uma linha por vez e peço um exemplo de cada função em um vídeo que a turma conhece.'], 'Legenda acessível também descreve sons entre colchetes, como [vento forte] ou [risada]. A assinatura cumpre a licença CC BY das imagens.', 'Se o tempo apertar, fico apenas com título e faixa; legenda e assinatura retornam na prática.')
    },
    {
      title: 'O que há no pendrive', kicker: 'Pasta Aula12-Pendrive', heading: 'Cada coisa no seu lugar.',
      lede: 'O programa, a atividade e a projeção já estão separados.', block: 1,
      av9: checks([
        ['01-SHOTCUT', 'Pasta Shotcut com o programa Portable já extraído.'],
        ['02-ALUNO', 'Pasta Aula12: três clipes, duas fotos, grafismos, guia PDF e créditos.'],
        ['03-PROFESSOR', 'Slides offline e exemplos para projeção.']
      ]),
      resources: [{href: base + 'index.html', label: 'Ver o kit da aula'}, {href: base + 'Guia-Aula12-Shotcut.pdf', label: 'Abrir guia PDF'}],
      teacher: teacher(['10 min · Janela flexível para apresentar o kit e os grafismos PNG enquanto organizo os postos.'], 'Este panorama é dispensável. Copio o kit por pendrive ou rede local quando possível. Se o Shotcut da aula 11 ainda está em Documentos, basta copiar Aula12. O Shotcut é gratuito e de código aberto.', 'Se a preparação do Shotcut Portable ocupar o período, pulo este slide. Na volta, mostro a pasta e a importação desde o início.')
    },
    {
      title: 'Onde cabe o texto?', kicker: 'Ler as cenas do kit', heading: 'Procurem o espaço livre em cada imagem',
      lede: 'Céu, mar e neve lisa recebem texto. Rostos e ações precisam ficar livres.', block: 1,
      av9: stills([
        ['telas/cena-paisagem.jpg', 'PAISAGEM', 'Onde entra o título?'],
        ['telas/cena-encontro.jpg', 'ENCONTRO', 'Onde o nome de Oti fica perto dele?'],
        ['telas/cena-foto.jpg', 'FOTO', 'Que parte da cabeça pode passar na frente da palavra?']
      ]),
      teacher: teacher(['7 min · Janela flexível: a turma aponta as áreas livres de cada cena; antecipo a primeira montagem assim que os postos estiverem prontos.'], 'Não há resposta única. Na paisagem, o céu à esquerda; no encontro, a neve à direita de Oti; na foto, o céu acima da cabeça.', 'Se ninguém arriscar, aponto o céu da paisagem e peço que achem um espaço parecido nas outras duas.')
    },
    {
      title: 'Lanche', kicker: 'Intervalo', heading: 'Lanche até 20:05', lede: 'Na volta, vamos montar as camadas no Shotcut.', block: 1, pace: 'break',
      av9: checks([['Na volta', 'Vamos começar pela pasta Aula12 em Documentos.'], ['Se já começou', 'Salvar o projeto com Ctrl + S.']]),
      teacher: teacher(['20 min · Lanche das 19:45 às 20:05.'], 'Não pressupõe montagem feita antes do lanche.', 'Identifico os postos ainda sem editor; retomo depois do lanche em computadores funcionais, com revezamento quando necessário.')
    },
    {
      title: 'Copiar e abrir', kicker: 'Guia PDF · página 1', heading: 'Primeiro, copie para o computador.',
      lede: 'Abra Aula12-Pendrive. O trabalho será feito em Documentos.', block: 2,
      av9: commands([
        ['ATIVIDADE', '02-ALUNO', 'Copiar a pasta Aula12 inteira para Documentos.'],
        ['PROGRAMA', '01-SHOTCUT', 'Copiar a pasta Shotcut inteira, se o posto ainda não tem.'],
        ['ABRIR', 'Cópia em Documentos', 'Abrir Shotcut → shotcut.exe e Aula12 → Guia-Aula12-Shotcut.pdf.']
      ], 'Espere as cópias terminarem. Depois o pendrive pode seguir para o próximo posto.'),
      resource: {href: base + 'Guia-Aula12-Shotcut.pdf', label: 'Abrir guia PDF'},
      teacher: teacher(['2 min · Faço a chamada e localizo as pastas com a turma.', '4 min · Confiro a cópia local e mostro como abrir o programa e o guia.'], 'Se já fizemos isso antes do lanche, apenas confiro e uso o tempo na montagem. Preciso da pasta Shotcut completa, não apenas do executável.', 'Se o posto bloquear o programa, aciono o laboratório e organizo revezamento temporário. Não abro a atividade diretamente do pendrive.')
    },
    {
      title: 'Uma trilha para cada função', kicker: 'Mapa da linha do tempo', heading: 'O que está em cima cobre o que está embaixo',
      lede: 'O vídeo fica em V1. Grafismos e textos sobem para as trilhas de cima.', block: 2,
      av9: {type: 'tracks', tracks: [
        {label: 'V4 GUIA', clips: [{label: 'grade-guia.png', seconds: 16, kind: 'guide'}]},
        {label: 'V3', clips: [{seconds: 4, kind: 'empty'}, {label: 'Nome', seconds: 3, kind: 'graphic'}, {label: 'Legenda', seconds: 2, kind: 'graphic'}, {label: 'Foto + máscara', seconds: 4, kind: 'graphic'}, {label: 'Texto', seconds: 3, kind: 'graphic'}]},
        {label: 'V2', clips: [{label: 'Título', seconds: 4, kind: 'graphic'}, {label: 'Faixa', seconds: 3, kind: 'graphic'}, {seconds: 2, kind: 'empty'}, {label: 'Palavra', seconds: 4, kind: 'graphic'}, {label: 'Pictograma', seconds: 3, kind: 'graphic'}]},
        {label: 'V1 CENA', clips: [{label: 'Paisagem', seconds: 4}, {label: 'Encontro', seconds: 5}, {label: 'Foto', seconds: 4}, {label: 'Cor', seconds: 3}]}
      ], caption: 'Exemplo de organização. Os tempos podem ser diferentes.'},
      teacher: teacher(['4 min · Mostro o mapa e, no Shotcut, crio três trilhas de vídeo com Ctrl + I; a turma confere que V1 fica embaixo.'], 'O guia fica na trilha mais alta e será ocultado antes de exportar. Imagens PNG com transparência só mostram o desenho; o resto deixa ver as trilhas de baixo.', 'Se alguém criar trilha de áudio, desfaço com Ctrl + Z e uso o menu da linha do tempo → Adicionar trilha de vídeo.')
    },
    {
      title: 'Montar a base', kicker: 'Guia PDF · página 1', heading: 'Cenas em V1. Guia em V4.',
      lede: 'Comecem nesta ordem: 08-paisagem → 02-encontro → foto-fruta.jpg.', block: 2,
      av9: commands([
        ['IMPORTAR', 'Documentos → Aula12', 'Arrastar os dois MP4, foto-fruta.jpg e os PNG de grafismos para a Lista de reprodução.'],
        ['CENAS', 'Trilha V1', 'Colocar as três cenas lado a lado e aparar a foto para cerca de 4 segundos.'],
        ['GUIA', 'Trilha V4', 'Levar grade-guia.png e puxar sua borda até o fim da última cena.'],
        ['SALVAR', 'Arquivo → Salvar como', 'Guardar minha-abertura.mlt na pasta Aula12.']
      ], 'As linhas azuis do guia mostram a margem do texto em todas as cenas.'),
      teacher: teacher(['3 min · Demonstro a importação, a ordem das cenas e o guia esticado sobre tudo.', '7 min · A turma repete; confiro V1 completa e o guia na trilha mais alta.'], 'Defino modo de vídeo HD 720p, 24 fps no projeto de demonstração antes da importação. A imagem entra com duração padrão; o guia precisa ser esticado.', 'Se o guia ficar em V1 por engano, arrasto o clipe para V4. Quem começou antes testa outra ordem das cenas.')
    },
    {
      title: 'Criar o título', kicker: 'Guia PDF · página 2', heading: 'O título encosta na margem. Não no meio do nada.',
      lede: 'Criem um texto sobre a paisagem e alinhem sua borda esquerda à linha azul.', block: 2,
      av9: commands([
        ['TEXTO', 'Abrir outro → Texto', 'Escolher Simples, digitar o título e abrir. Arrastar a prévia para V2, sobre a paisagem.'],
        ['ESTILO', 'Filtros → Texto: simples', 'Fonte Arial Black, alinhamento à esquerda, contorno escuro fino.'],
        ['POSIÇÃO', 'Retângulo na prévia', 'Encostar a borda esquerda na margem do guia, no céu.'],
        ['ENTRADA', 'Canto superior do clipe', 'Puxar o círculo do canto para criar uma entrada suave.']
      ], 'Reproduzam desde o início. O título precisa ficar tempo suficiente para ser lido duas vezes.'),
      promptLabel: 'Já conseguiu?', prompt: 'Acrescentem uma segunda linha menor, começando na mesma borda e bem perto do título.',
      teacher: teacher(['4 min · Demonstro o texto, a fonte, o alinhamento e a borda encostada na linha azul.', '9 min · A turma cria o próprio título; circulo pedindo que apontem a borda comum.'], 'Os nomes variam com a versão: Abrir outro (Open Other), Texto (Text), Texto: simples (Text: Simple). A entrada suave usa a alça de fade do clipe; os keyframes da aula 11 também servem.', 'Se o diálogo for diferente, uso Abrir outro → Cor, transparente, e aplico Texto: simples. Se o texto sumir, confiro se está em V2, acima da cena.')
    },
    {
      title: 'Faixa com nome', kicker: 'Guia PDF · página 3', heading: 'O nome fica perto de quem aparece',
      lede: 'Sobre 02-encontro, a faixa apresenta Oti sem cobrir o rosto dele.', block: 2,
      av9: commands([
        ['FAIXA', 'grafismos → V2', 'Levar faixa-inferior.png para V2, sobre o encontro, por cerca de 3 segundos.'],
        ['NOME', 'Novo texto → V3', 'Digitar OTI, Enter, pinguim-de-magalhães. Arial, alinhado à esquerda.'],
        ['ALINHAR', 'Barra laranja', 'As duas linhas começam logo depois da barra, dentro da faixa.'],
        ['DURAÇÃO', 'Bordas dos clipes', 'Faixa e nome entram e saem juntos.']
      ], 'Confiram em tela cheia: o nome se lê sem disputar com o personagem.'),
      promptLabel: 'Já conseguiu?', prompt: 'Façam a faixa entrar suave pelo canto do clipe e confiram se o nome acompanha.',
      teacher: teacher(['4 min · Demonstro a faixa PNG em V2 e o nome em V3, com Enter entre as linhas.', '10 min · A turma posiciona; peço que mostrem a borda comum e a distância até Oti.'], 'Texto: simples usa um tamanho para todas as linhas; a hierarquia vem das maiúsculas no nome. Texto: rico permite tamanhos diferentes e fica como variação.', 'Se o nome ficar fora da faixa, reduzo o tamanho da fonte antes de mover o retângulo. Se a faixa cobrir a ação, encurto sua duração.')
    },
    {
      title: 'Legenda que se lê', kicker: 'Guia PDF · página 3', heading: 'Um texto de cada vez na parte de baixo',
      lede: 'Ouçam o encontro com fones. Escrevam entre colchetes o som principal, ou uma frase curta.', block: 2,
      av9: stills([
        ['telas/colisao.jpg', 'DISPUTA', 'Legenda e faixa no mesmo lugar, ao mesmo tempo.'],
        ['telas/legenda.jpg', 'LEGÍVEL', 'Centro inferior, fundo escuro, depois que a faixa sai.']
      ]),
      promptLabel: 'Na tela', prompt: 'Novo texto em V3, depois do nome. Centralizado, fundo escuro, no máximo duas linhas e pelo menos dois segundos.',
      teacher: teacher(['8 min · Mostro a disputa e a solução; a turma cria a legenda e confere se ela não encontra a faixa.'], 'A cor de fundo do Texto: simples aceita transparência; um preto semitransparente garante contraste na neve. Descrição de som entre colchetes é recurso de acessibilidade.', 'Se a legenda colidir com a faixa, separo no tempo: a legenda começa quando o nome sai.')
    },
    {
      title: 'Texto por trás', kicker: 'Máscara · ver antes de fazer', heading: 'A palavra está atrás da cabeça.',
      lede: 'Reproduzam o exemplo. Nada foi recortado à mão: há duas cópias da mesma foto.', block: 3,
      av9: media([['exemplo-mascara.mp4', 'LLAMIGOS', 'A palavra atravessa por trás de Koro.', 'telas/mascara-com.jpg']]),
      teacher: teacher(['2 min · Faço a chamada.', '3 min · Reproduzo o exemplo e pergunto como a palavra pode estar atrás de algo que está dentro da mesma foto.'], 'O exemplo mostra a variação com movimento; a prática essencial usa a palavra parada.', 'Pauso quando as letras somem atrás da cabeça para tornar o efeito visível.')
    },
    {
      title: 'Um sanduíche de camadas', kicker: 'Como o efeito funciona', heading: 'Foto, palavra e foto de novo',
      lede: 'A cópia de cima mostra só a cabeça. Fora da elipse, ela fica transparente.', block: 3,
      av9: {type: 'tracks', tracks: [
        {label: 'V3', clips: [{label: 'foto-fruta + máscara elíptica', seconds: 4, kind: 'graphic'}]},
        {label: 'V2', clips: [{label: 'Palavra grande', seconds: 4, kind: 'graphic'}]},
        {label: 'V1', clips: [{label: 'foto-fruta inteira', seconds: 4}]}
      ], caption: 'As três camadas começam e terminam no mesmo instante.'},
      teacher: teacher(['4 min · Explico as três camadas desenhando a ordem no ar com a mão e relaciono com recortar uma foto e colar por cima.'], 'Sem a máscara, a foto de cima cobriria tudo. Com a máscara, só a cabeça cobre a palavra.', 'Se a ideia não ficar clara, mostro mascara-sem.jpg e mascara-com.jpg no próximo passo.')
    },
    {
      title: 'Empilhar as camadas', kicker: 'Guia PDF · página 4', heading: 'A mesma foto, duas vezes',
      lede: 'A foto já está em V1. Agora a palavra e a cópia sobem para V2 e V3.', block: 3,
      av9: commands([
        ['PALAVRA', 'Novo texto → V2', 'Uma palavra curta em Arial Black, bem grande, no céu acima da cabeça.'],
        ['CÓPIA', 'foto-fruta.jpg → V3', 'Arrastar a mesma foto da Lista de reprodução para V3, acima da foto de V1.'],
        ['ALINHAR', 'Início e fim', 'As três camadas começam e terminam juntas.'],
        ['CONFERIR', 'Prévia', 'Agora a palavra some: a cópia cobre tudo.']
      ], 'Parece que deu errado, e está certo. O próximo passo recorta a cópia.'),
      teacher: teacher(['3 min · Demonstro a palavra em V2 e a cópia exata em V3, usando o ímã da linha do tempo.', '7 min · A turma empilha; confiro início e fim alinhados.'], 'A parte de baixo das letras deve cruzar o alto da cabeça. Uma palavra curta e grossa funciona melhor.', 'Se a palavra continuar visível, a cópia não está acima: confiro se está em V3 e cobre o mesmo intervalo.')
    },
    {
      title: 'Recortar com a máscara', kicker: 'Guia PDF · página 4', heading: 'A elipse escolhe o que fica na frente',
      lede: 'Selecionem a cópia em V3. Abram Filtros → + → Máscara: forma simples.', block: 3,
      av9: commands([
        ['FORMA', 'Máscara: forma simples', 'Escolher Elipse (Mask: Simple Shape → Ellipse).'],
        ['AJUSTAR', 'Retângulo na prévia', 'Mover e redimensionar até a elipse envolver a cabeça.'],
        ['GIRAR', 'Rotação', 'Inclinar a elipse para acompanhar a cabeça.'],
        ['SUAVIZAR', 'Suavidade', 'Um valor baixo esconde a borda do recorte.']
      ], 'A palavra aparece no céu e some atrás da cabeça.'),
      promptLabel: 'Já conseguiu?', prompt: 'Movam a palavra um pouco para cima ou para baixo e encontrem a altura em que o efeito fica mais claro.',
      teacher: teacher(['4 min · Demonstro o filtro, a elipse, a rotação e a suavidade.', '9 min · A turma ajusta; circulo pedindo que mostrem a prévia com a palavra cruzando a cabeça.'], 'Valores de referência no exemplo: elipse girada cerca de 18 graus, cobrindo da orelha ao focinho. Cada posto pode chegar a valores diferentes.', 'Se a elipse cortar o céu sobre as letras, diminuo a forma ou subo a palavra; uma forma simples não acompanha reentrâncias.')
    },
    {
      title: 'Conferir o recorte', kicker: 'Antes e depois da máscara', heading: 'A palavra está por trás ou por cima?',
      lede: 'Comparem com o exemplo. Depois confiram a borda da elipse em tela cheia.', block: 3,
      av9: stills([
        ['telas/mascara-sem.jpg', 'POR CIMA', 'Palavra cobre a cabeça: falta a cópia com máscara em V3.'],
        ['telas/mascara-com.jpg', 'POR TRÁS', 'A cópia recortada devolve a cabeça para a frente.']
      ]),
      promptLabel: 'Melhoria visível', prompt: 'Procurem uma faixa de céu cortando as letras. Ajustem a elipse até ela quase desaparecer.',
      teacher: teacher(['8 min · Cada posto compara com o exemplo e faz um ajuste fino; peço que liguem e desliguem o filtro para ver a diferença.'], 'Um pequeno corte perto da orelha é esperado com uma elipse. O critério é a leitura da palavra.', 'Se a palavra ficar ilegível, reduzo o trecho escondido: menos letras atrás da cabeça.')
    },
    {
      title: 'Próximo desafio', kicker: 'Para quem já conseguiu', heading: 'Agora a palavra atravessa a cena',
      lede: 'Usem keyframes de posição no texto de V2, como na aula 11.', block: 3, pace: 'extra',
      av9: {type: 'flow', steps: [
        {label: 'INÍCIO', text: 'Palavra à esquerda, já no céu.', mark: 'Keyframe 1'},
        {label: 'MEIO', text: 'Letras passam por trás da cabeça.', mark: 'Automático'},
        {label: 'FINAL', text: 'Palavra à direita, inteira.', mark: 'Keyframe 2'}
      ]},
      promptLabel: 'Outra possibilidade', prompt: 'Criem a faixa de Koro do lado oposto da tela e comparem as duas faixas.',
      teacher: teacher([], 'Ofereço durante a prática, assim que alguém termina; não espero toda a turma. A extensão não adiciona tempo ao cronograma.', 'Se o movimento ficar rápido, aumento a duração das três camadas e reposiciono os marcadores.')
    },
    {
      title: 'Assinatura final', kicker: 'Guia PDF · página 5', heading: 'Quem fez. De onde vêm as imagens.',
      lede: 'Uma tela de cor no fim, com pictograma, título e créditos agrupados no centro.', block: 4,
      av9: commands([
        ['FUNDO', 'Abrir outro → Cor', 'Azul-escuro, cerca de 4 segundos, no fim de V1.'],
        ['PICTOGRAMA', 'grafismos → V2', 'Escolher fruta, floco ou coração.'],
        ['CRÉDITOS', 'Novo texto → V3', 'Título, Remontagem: seu nome e Imagens: Caminandes 3 · CC BY.'],
        ['AGRUPAR', 'Centralizado', 'Pictograma, título e créditos formam um único bloco.']
      ], 'Os créditos são parte da licença das imagens. Eles não podem ficar de fora.'),
      resource: {href: base + 'telas/assinatura.jpg', label: 'Ver assinatura de exemplo'},
      teacher: teacher(['2 min · Faço a chamada e mostro a assinatura de exemplo.', '8 min · A turma cria a própria assinatura; confiro créditos e proximidade.'], 'Caminandes 3: Llamigos está sob CC BY 3.0: atribuição é obrigatória. A escolha de pictograma e cores é a parte autoral.', 'Se faltar tempo, mantenho só título e créditos; o pictograma vira variação.')
    },
    {
      title: 'Exportar', kicker: 'Guia PDF · página 5', heading: 'Ocultem o guia. Depois exportem.',
      lede: 'Cliquem no olho da trilha V4. Salvem o projeto e abram Exportar.', block: 4,
      av9: {type: 'table', variant: 'data', columns: ['No Shotcut', 'Usar'], rows: [
        ['Trilha V4', 'Oculta · o guia não aparece no vídeo'],
        ['Origem · From', 'Linha do tempo · Timeline'],
        ['Predefinição', 'H.264 High Profile · MP4 · 1280 × 720'],
        ['Arquivo', 'Aula12/minha-abertura.mp4']
      ]},
      promptLabel: 'Aguardar', prompt: 'O painel Trabalhos mostra o andamento. Abram o MP4 quando a exportação terminar.',
      teacher: teacher(['8 min · Demonstro o guia oculto e a exportação; a turma exporta no disco local enquanto acompanho o painel Trabalhos.'], 'Esquecer o guia é o erro mais comum. Confiro também se From está na linha do tempo inteira.', 'Se a exportação falhar com aceleração de hardware, uso exportação por software no posto validado.')
    },
    {
      title: 'Assistir e corrigir', kicker: 'Último ajuste', heading: 'Encontrem uma coisa que ainda pode melhorar',
      lede: 'Abram o MP4 no reprodutor do computador e assistam até o fim.', block: 4,
      av9: checks([
        ['Margem', 'Algum texto encosta na borda da tela?'],
        ['Proximidade', 'O nome está perto de Oti e a legenda longe da faixa?'],
        ['Máscara', 'A palavra passa por trás da cabeça?'],
        ['Créditos', 'A assinatura cita Caminandes 3 e a licença?']
      ]),
      promptLabel: 'Melhoria visível', prompt: 'Voltem ao Shotcut, ajustem um ponto e exportem novamente.',
      teacher: teacher(['6 min · Cada posto assiste, faz um ajuste necessário e confere a nova exportação.'], 'Se o resultado já estiver resolvido, proponho trocar a fonte ou o pictograma para comparar, sem obrigar a manter uma mudança pior.', 'Corrijo primeiro guia aparente, texto cortado ou créditos ausentes; evito recomeçar a abertura.')
    },
    {
      title: 'Mostrar a abertura', kicker: 'Resultado na tela', heading: 'Mostrem a decisão que mais mudou o resultado',
      lede: 'Reproduzam a abertura no próprio posto. Apontem uma margem, um grupo e a máscara.', block: 4,
      av9: checks([
        ['Vídeo', 'minha-abertura.mp4 pronto para assistir.'],
        ['Projeto', 'minha-abertura.mlt salvo junto das mídias.'],
        ['Pasta', 'Guardar Aula12 inteira, incluindo grafismos e créditos.']
      ]),
      promptLabel: 'Feito', prompt: 'Vocês alinharam, agruparam e recortaram camadas para dar identidade ao vídeo.',
      teacher: teacher(['6 min · Circulo pelos postos, vejo trechos e ouço uma observação breve de cada operador.'], 'Sem fila de apresentações nem uploads coletivos. Já observo o trabalho durante a prática para conseguir atender 20 a 30 estudantes.', 'Se o tempo apertar, peço a faixa e a máscara diretamente na linha do tempo; confiro o MP4 local sem pedir envio.')
    }
  ],
  appendDefaultClosing: false
};
