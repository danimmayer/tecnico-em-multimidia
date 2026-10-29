// Fonte regenerável da Aula 14. Gerar com node scripts/build-audiovisual.mjs.
// A prática acontece na Mesa de som do kit: roda no navegador, sem internet, sem conta e sem instalação.
// Os pedidos do cliente aparecem um de cada vez; cada um tem critério de pronto e melhoria para quem termina antes.
export const lesson = {
  title: 'Áudio na pós-produção e buffering',
  description: 'Mixar voz, trilha, ambiência e efeitos de um trailer de 30 segundos: falas no mesmo volume, ruído tratado, música abaixo da voz e pico sob controle. Ver o buffering acontecer em rede e separá-lo de cache, proxy e render de trecho no editor.',
  objectives: ['Edição de vídeos e sons: manipulação, tratamento, buffering.'],
  technical: [
    'Identificar o processo de buffering para o processamento de dados no projeto.',
    'Aplicar edição de áudio, vídeo, texto e imagem para compor um produto audiovisual.'
  ],
  socioemotional: ['Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados.'],
  schedule: [
    {horario: '19:00 - 19:45', atividade: 'Escuta crítica de uma cena com e sem cada camada sonora, preparo da mesa de som, primeiro contato com a caneta da mesa digitalizadora e primeiro pedido do cliente: a voz na frente, sem estourar o medidor.'},
    {horario: '20:05 - 21:00', atividade: 'Falas no mesmo volume, ruído do ar-condicionado e da rua tratado com filtro passa-alta e corte dos vãos, volume da música desenhado com a caneta abaixo da voz, entrada e saída graduais e primeira exportação em WAV.'},
    {horario: '21:00 - 21:40', atividade: 'Provocar e resolver o buffering em um simulador de rede e diagnosticar travamentos no editor: resolução de preview, cache, proxy e render de trecho. Planejar o tempo de processamento da equipe.'},
    {horario: '21:40 - 22:10', atividade: 'Exportar a mixagem final e a versão sem voz, conferir em fone fora da mesa de som e fazer a escuta cruzada com o colega do lado.'}
  ],
  methodology: 'Oficina individual guiada por pedidos de um cliente fictício, revelados um de cada vez pelos slides. Escuta crítica antes da prática, demonstrações de até dois minutos, critério de pronto em cada pedido e melhorias para quem termina antes. A mesa de som é operada com a caneta da mesa digitalizadora, que também desenha a automação de volume, como nos editores profissionais. A turma permanece nos postos e faz a escuta cruzada com o colega do lado.',
  resources: 'Projetor com caixa de som, computadores com navegador, fones de ouvido e mesas digitalizadoras com caneta. Kit Aula14-Som.zip no disco local: cena de 30 segundos com imagens CC BY de Caminandes 3, quatro camadas de som, Mesa de som e Laboratório de espera, que funcionam sem internet e sem conta. Nenhum programa precisa ser instalado. Sem mesa digitalizadora no posto, o mouse faz as mesmas ações. Nenhuma ficha impressa.',
  observation: 'Aula das 19:00 às 22:10; lanche das 19:45 às 20:05 e chamada no início de cada bloco. Os estudantes permanecem nos postos; somente o professor circula. Pedidos um de cada vez: quem termina faz a melhoria do próprio slide e espera o próximo. Distribuir o Aula14-Som.zip antes da prática, por pendrive ou rede local; a mesa de som abre direto do disco. Antes da turma, conectar as mesas digitalizadoras e conferir no navegador que a caneta move a seta na tela principal; o driver já instalado no laboratório basta. Mesa digitalizadora e caneta voltam ao lugar no fim, caneta no suporte. Não depender de projetos anteriores: a cena e as camadas são do kit. Sem fone para todos, trabalhar em dupla com um fone por vez e alternar a operação a cada pedido. Os WAV, o diagnóstico e os créditos ficam no disco local; mostrar na própria tela, sem envio pela internet.'
};

const base = 'modelos/producao-audiovisual/aula-14/';
const help = section => [{href: `${base}AJUDA.html#${section}`, label: 'Abrir passos e soluções'}];
const checks = items => ({type: 'checks', items: items.map(([label, text]) => ({label, text}))});
const commands = (items, result) => ({type: 'commands', commands: items.map(([word, who, text]) => ({word, who, text})), tags: [{label: 'TERMINOU ANTES?', kind: 'good'}], result});
const teacher = (steps, watch, rescue) => ({steps, watch, rescue});
const stills = images => ({type: 'stills', images: images.map(([file, label, text]) => ({src: base + file, label, text}))});

export const support = {
  teacherGoal: 'Cada estudante entrega até 22:10 a mixagem do trailer em dois arquivos (final e sem voz), com falas niveladas, ruído tratado, trilha abaixo da voz e pico até −1 dBFS, e um diagnóstico que separa buffering de resolução de preview, cache, proxy e render de trecho.',
  plainLanguage: 'Mixar é decidir quem fica na frente. A voz é a referência; música, ambiência e efeitos entram em volta dela. Buffering é a espera para carregar uma reprodução que vem pela rede; dentro do editor, travamentos de pré-visualização se resolvem com resolução de preview, cache, proxy ou render de trecho.',
  say: 'Hoje vocês são o estúdio de som e eu sou o cliente. O trailer está pronto na imagem, mas ninguém entende a locução. Os pedidos chegam um de cada vez.',
  demo: [
    'Toco a cena na mesa de som e uso solo em cada canal: voz, trilha, ambiência e efeitos.',
    'Opero a mesa de som com a caneta da mesa digitalizadora no projetor: apontar sem encostar, encostar para clicar e arrastar um volume.',
    'Mostro o medidor no vermelho e baixo a trilha até a voz ficar clara e o pico sair do vermelho.',
    'Subo a fala 3 e mostro que o ruído sobe junto; ligo Tirar o ronco grave em Médio (120 Hz) e corto os vãos.',
    'Ligo o volume desenhado e, com a caneta, desenho a linha da trilha: baixa sob cada fala, alta nos intervalos. Mostro Apagar desenho (e a borracha, se a caneta tiver) e comparo com o abaixamento automático.',
    'Exporto um WAV e abro no player do computador.',
    'No Laboratório de espera, provoco travadas com 1 Mbps em 1080p e resolvo com qualidade automática.'
  ],
  studentDeliverable: 'mix-v1.wav, mix-final.wav e sem-voz.wav exportados pela Mesa de som, com pico em −1 dBFS ou abaixo, e diagnostico-aula14.txt baixado do Laboratório de espera, com testes de rede e as oito situações do editor. Tudo na pasta Aula14-Som, mostrado na própria tela.',
  check: [
    'As quatro falas se entendem sem esforço e parecem gravadas na mesma distância do microfone.',
    'O zumbido grave some entre as falas e diminui durante elas, sem deixar a voz fina.',
    'A linha de volume da trilha, desenhada com a caneta ou com o abaixamento automático, desce durante a voz, volta nos intervalos e começa e termina de forma gradual.',
    'O pico do arquivo exportado fica em −1 dBFS ou abaixo e o medidor não acende Estourou.',
    'A versão sem voz mantém trilha, ambiência e efeitos com o mesmo equilíbrio.',
    'O registro de rede mostra uma configuração com travadas e outra sem travadas.',
    'O diagnóstico usa buffering só para reprodução em rede e escolhe resolução de preview, cache, proxy ou render de trecho para o editor.'
  ],
  fallback: 'Sem fones para todos, trabalho em duplas com um fone por vez e alternância a cada pedido. Sem mesa digitalizadora para todos, a caneta passa de mão a cada pedido e o outro estudante usa o mouse; o abaixamento automático cumpre o pedido 4 para quem não puder desenhar. Se algum computador não abrir a mesa, a dupla do lado opera e o estudante decide e registra os valores no caderno. Se a caixa de som do projetor falhar, faço a escuta crítica com a turma usando os próprios fones, um canal em solo por vez.',
  extension: 'Cada pedido traz no slide uma melhoria para quem termina antes. Quem conclui tudo usa o banco de melhorias: comparar o passa-alta de 80 e 160 Hz, testar o abaixamento de −18 dB, exportar uma versão só com voz e ambiência ou testar rede instável no laboratório.',
  commonProblems: [
    ['A mesa de som fica em Carregando', 'Confiro se o ZIP foi extraído e se mesa.html, sons.js e cena.mp4 estão na mesma pasta. Atualizo a página.'],
    ['A caneta não move a seta ou a seta vai para outro monitor', 'Confiro o cabo da mesa digitalizadora e, no painel do driver, mapeio a área para a tela principal. Se não resolver, o posto segue no mouse.'],
    ['O traço da caneta sai torto ou atrasado', 'Peço o punho apoiado na mesa digitalizadora e um traço lento; para corrigir, desenho por cima, uso a borracha da caneta se houver ou Apagar desenho.'],
    ['Não sai som', 'Confiro fone, volume do computador e se algum canal ficou em M ou outro em S.'],
    ['A turma sobe o volume do computador em vez de mexer na mesa de som', 'Peço volume do computador confortável e fixo; todos os ajustes acontecem na mesa de som, para o arquivo exportado sair certo.'],
    ['O pico continua vermelho', 'Baixo primeiro a trilha, que é a camada mais forte; só depois mexo na saída. Zero o pico e ouço a cena inteira.'],
    ['A voz ficou fina', 'O ronco grave está em Forte (160 Hz). Volto para Médio (120 Hz) ou Leve (80 Hz) e comparo em solo.'],
    ['A música sumiu', 'A linha desenhada ficou no fundo da faixa ou o abaixamento automático está em Muito (−18 dB) com a trilha já baixa. Redesenho acima ou subo o volume do canal da trilha.'],
    ['O WAV não aparece', 'Procuro na pasta Downloads e movo para a pasta Aula14-Som.'],
    ['Confundem buffering com travamento do editor', 'Pergunto de onde vem o vídeo: se vem pela rede, é buffering; se o computador está processando, é preview, cache, proxy ou render.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia', kicker: 'Aula 14 · Som na pós-produção', heading: 'A imagem está pronta. O som, ainda não.',
      lede: 'Hoje vocês são o estúdio de som. Os pedidos do cliente chegam um de cada vez.', block: 1,
      av9: {type: 'day', rows: [
        {time: '19:00–19:45', minutes: 45, title: 'Escutar e equilibrar', text: 'Quatro camadas, caneta na mão e a voz na frente.'},
        {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Ajustes guardados na mesa de som.', pause: true},
        {time: '20:05–21:00', minutes: 55, title: 'Tratar o som', text: 'Falas, ruído e volume desenhado.'},
        {time: '21:00–21:40', minutes: 40, title: 'Esperas', text: 'Buffering na rede e prévia no editor.'},
        {time: '21:40–22:10', minutes: 30, title: 'Entregar', text: 'Mixagem final e versão sem voz.'}
      ]},
      promptLabel: 'Regra da noite', prompt: 'Terminou antes? Faça a melhoria do slide. O próximo pedido só chega pelo slide.',
      teacher: teacher(['3 min · Faço a chamada, apresento o cliente e a regra dos pedidos.'], 'A turma entende que a imagem não muda hoje: todo o trabalho é de som.', 'Se alguém perguntar o que vem depois, respondo que o cliente ainda não pediu.')
    },
    {
      title: 'Quatro camadas', kicker: 'Escuta crítica', heading: 'Uma cena, quatro camadas de som',
      lede: 'Escutem com e sem cada camada. O que muda na história quando uma delas some?', block: 1,
      promptLabel: 'Jogo rápido', prompt: 'Olhos fechados. Uma camada vai sumir: qual foi?',
      av9: {type: 'tracks', tracks: [
        {label: 'VOZ', clips: [{kind: 'empty', seconds: 1}, {kind: 'audio', label: 'F1', seconds: 4}, {kind: 'empty', seconds: 3}, {kind: 'audio', label: 'F2', seconds: 3}, {kind: 'empty', seconds: 3}, {kind: 'audio', label: 'F3', seconds: 3}, {kind: 'empty', seconds: 9}, {kind: 'audio', label: 'F4', seconds: 4}]},
        {label: 'TRILHA', clips: [{kind: 'graphic', label: 'Música', seconds: 30}]},
        {label: 'AMBIÊNCIA', clips: [{kind: 'guide', label: 'Mar', seconds: 8}, {kind: 'guide', label: 'Vento na neve', seconds: 22}]},
        {label: 'EFEITOS', clips: [{kind: 'empty', seconds: 7}, {kind: 'video', label: 'Passos', seconds: 4}, {kind: 'empty', seconds: 1}, {kind: 'video', label: 'Surpresa', seconds: 3}, {kind: 'empty', seconds: 4}, {kind: 'video', label: 'Perseguição', seconds: 6}, {kind: 'video', label: 'Impacto', seconds: 5}]}
      ], caption: 'A última fruta: trailer de', total: true},
      resources: [{href: `${base}mesa.html`, label: 'Abrir a mesa de som'}],
      teacher: teacher(['7 min · Toco a cena inteira na mesa de som e depois cada canal em solo. No jogo, toco tudo menos um canal, sem mostrar a tela; a turma, de olhos fechados, adivinha qual sumiu. Três rodadas.'], 'Busco quatro funções: a voz conta, a trilha dá ritmo e emoção, a ambiência diz onde estamos, os efeitos confirmam as ações.', 'Se a caixa do projetor estiver fraca, peço os fones e indico o canal em solo para todos ouvirem juntos.')
    },
    {
      title: 'Cada camada tem um trabalho', kicker: 'Antes de mexer', heading: 'Cada camada tem um trabalho',
      lede: 'Na mixagem, a voz é a referência. As outras camadas entram em volta dela.', block: 1,
      av9: {type: 'table', variant: 'data', columns: ['Camada', 'Trabalho', 'Na cena', 'Se faltar'], rows: [
        ['Voz', 'Contar a história.', 'Quatro falas do narrador.', 'Ninguém entende o trailer.'],
        ['Trilha', 'Dar ritmo e emoção.', 'Música do começo ao fim.', 'A cena fica parada.'],
        ['Ambiência', 'Dizer onde estamos.', 'Mar distante e vento na neve.', 'O lugar parece vazio.'],
        ['Efeitos', 'Confirmar as ações.', 'Passos, surpresa e impacto.', 'A ação perde força.']
      ]},
      teacher: teacher(['4 min · Leio uma linha por vez e peço um exemplo de cada camada em filmes que a turma conhece.'], 'Ambiência é diferente de ruído: é escolhida e combina com o lugar; ruído é o que entrou sem querer.', 'Se o tempo apertar, fico só na voz e na trilha; ambiência e efeitos aparecem nos pedidos.')
    },
    {
      title: 'O ponto de chegada', kicker: 'Uma ideia do que vamos criar', heading: 'A mesma cena, mixada',
      lede: 'Escutem: em algum momento a música disputa com a voz?', block: 1,
      av9: {type: 'media', clips: [{src: `${base}exemplo-mixado.mp4`, label: 'EXEMPLO', text: 'Voz clara, música atrás dela, começo e fim graduais.', poster: `${base}telas/cena.jpg`}]},
      promptLabel: 'Repare', prompt: 'A música desce sozinha quando alguém fala e volta nos intervalos.',
      teacher: teacher(['3 min · Toco o exemplo uma vez e comparo com a mesa inicial que acabamos de ouvir.'], 'Não detalho os valores: cada estudante encontra os seus ao longo dos pedidos.', 'Se o vídeo não tocar, uso a mesa de som no estado inicial e conto o que vai mudar.')
    },
    {
      title: 'Preparar a mesa de som', kicker: 'Antes do primeiro pedido', heading: 'A mesa de som abre direto do disco',
      lede: 'Sem internet, sem conta e sem instalar nada.', block: 1,
      av9: {type: 'commands', commands: [
        {word: 'EXTRAIR', who: 'Aula14-Som.zip', text: 'Extrair no disco local, não abrir de dentro do ZIP.'},
        {word: 'ABRIR', who: 'mesa.html', text: 'Dois cliques; Chrome, Edge ou Firefox.'},
        {word: 'FONE', who: 'Volume do computador', text: 'Confortável e fixo. Daqui em diante, quem ajusta é a mesa de som.'},
        {word: 'TOCAR', who: 'Espaço ou botão Tocar', text: 'Usar M e S para ouvir cada canal.'}
      ], tags: [{label: 'PRONTO', kind: 'good'}], result: 'A cena toca com som e o medidor da saída se mexe.'},
      resources: [{href: `${base}index.html`, label: 'Ver o kit da aula'}, ...help('preparo')],
      teacher: teacher(['6 min · Mostro onde está o kit e abro a mesa de som direto da pasta; atendo primeiro quem ainda não ouviu som.'], 'Volume do computador fixo é condição para comparar ajustes; quem mexe nele mascara o problema.', 'Se um posto não abrir, a dupla do lado opera e o estudante decide os ajustes.')
    },
    {
      title: 'Caneta na mão', kicker: 'Mesa digitalizadora', heading: 'A caneta substitui o mouse',
      lede: 'Hoje a mesa de som é operada com a caneta. A área da mesa digitalizadora corresponde à tela inteira.', block: 1,
      av9: {type: 'commands', commands: [
        {word: 'APONTAR', who: 'Caneta perto, sem encostar', text: 'A seta acompanha a ponta. Nada é clicado.'},
        {word: 'ENCOSTAR', who: 'Encostar e levantar', text: 'É o clique: no botão Tocar, iniciar e pausar a cena.'},
        {word: 'ARRASTAR', who: 'Encostar e mover', text: 'Levar o volume da AMBIÊNCIA até o fim e voltar ao normal com dois toques no controle.'},
        {word: 'ONDE ESTOU?', who: 'Canto da superfície = canto da tela', text: 'Apontar, sem encostar, nos quatro cantos e ver a seta saltar.'}
      ], tags: [{label: 'POSTURA', kind: 'good'}], result: 'Segurar como um lápis, punho apoiado na superfície. Sem mesa digitalizadora no posto, o mouse faz o mesmo.'},
      promptLabel: 'Diferença do mouse', prompt: 'O mouse anda a partir de onde está. A caneta salta para o ponto da tela que corresponde ao lugar tocado.',
      resources: help('caneta'),
      teacher: teacher(['4 min · Demonstro no projetor apontar, encostar e arrastar; a turma repete com a própria caneta e aponta, sem encostar, os quatro cantos.'], 'Posição absoluta é a diferença principal para quem só usou mouse. Peço punho apoiado: mão no ar cansa e treme o traço. Nos cantos, só apontar: encostar ali pode fechar o navegador ou abrir o menu Iniciar.', 'Se a seta for para outro monitor, mapeio a mesa digitalizadora para a tela principal no painel do driver; se ainda falhar, o posto segue no mouse e a caneta volta no pedido 4.')
    },
    {
      title: 'Ler o medidor', kicker: 'Saída da mesa de som', heading: 'O vermelho avisa distorção',
      lede: 'O medidor mostra o volume que sai da mesa de som. Ele tem um teto: passar dele estraga o som.', block: 1,
      av9: checks([
        ['Verde', 'Tranquilo: sobra espaço.'],
        ['Amarelo', 'Forte, sem distorcer. Os trechos mais altos ficam aqui.'],
        ['Vermelho', 'Passou do limite: o som pode distorcer no arquivo.'],
        ['Estourou', 'A soma das camadas passou do teto. Baixar, clicar em Zerar pico e ouvir de novo.']
      ]),
      teacher: teacher(['3 min · Toco a mesa inicial até acender Estourou e explico que a soma das camadas passou do teto.'], 'Mais alto não é melhor: acima do teto o som se deforma e não há como recuperar no arquivo. Pico (dBFS) não é sensação de volume (LUFS): um estalo curto pode ter pico alto e soar baixo.', 'Se ninguém viu o vermelho, toco o trecho da perseguição, onde a soma é maior.')
    },
    {
      title: 'Pedido 1 · A voz na frente', kicker: 'Pedido do cliente', heading: 'Ninguém entende o narrador',
      lede: 'Equilibrar os quatro canais com o volume de cada um. A voz é a referência.', block: 1,
      av9: commands([
        ['OUVIR', 'S na VOZ', 'Entender o que o narrador diz, sem música.'],
        ['ABAIXAR', 'Volume da TRILHA', 'Descer até cada palavra se entender com tudo tocando.'],
        ['DOSAR', 'AMBIÊNCIA e EFEITOS', 'Presentes, sem chamar mais atenção que a voz.'],
        ['CONFERIR', 'Zerar pico', 'Tocar a cena inteira e olhar o pico máximo.']
      ], 'Use A/B para comparar com a mesa inicial e descreva em uma frase o que mudou.'),
      promptLabel: 'Pronto quando', prompt: 'As falas 1, 2 e 4 se entendem com tudo tocando e o pico máximo não fica vermelho.',
      resources: help('medidor'),
      teacher: teacher(['2 min · Demonstro com a caneta o solo na voz e a descida da trilha, sem dizer um valor.', '13 min · A turma equilibra os canais com a caneta; circulo conferindo o pico máximo e a postura com a caneta.'], 'A fala 3 continua fraca: é o próximo pedido. Não deixo ninguém resolver isso subindo o canal inteiro da voz.', 'Se alguém só abaixa a saída, peço que olhe a fala no desenho: ela continua escondida atrás da música.')
    },
    {
      title: 'Lanche', kicker: 'Aula 14 · Som na pós-produção', heading: 'Lanche até 20:05',
      lede: 'O navegador guarda os ajustes da mesa de som. Voltem ao mesmo computador.', block: 1,
      av9: checks([
        ['Guardar', 'Deixar a mesa de som aberta ou anotar os volumes no caderno.'],
        ['Voltar', 'Mesmo posto, mesmo fone. Caneta no suporte da mesa digitalizadora.']
      ]),
      pace: 'break',
      teacher: teacher(['20 min · Lanche. Confiro que nenhuma mesa de som ficou em solo esquecido e que as canetas estão nos suportes.'], 'Os ajustes ficam no armazenamento do navegador; o que vale como entrega é o WAV exportado.', 'Se algum computador reiniciar, o estudante refaz o pedido 1 com os valores anotados.')
    },
    {
      title: 'Pedido 2 · Falas no mesmo volume', kicker: 'Pedido do cliente', heading: 'A fala 3 parece vir de longe',
      lede: 'Ela foi gravada longe do microfone. Igualar as quatro falas no volume de cada fala.', block: 2,
      av9: commands([
        ['COMPARAR', 'Clique em F2 e depois em F3', 'Ouvir uma em seguida da outra.'],
        ['SUBIR', 'Volume de cada fala · F3', 'De 2 em 2 dB, até parecer a mesma distância.'],
        ['VER', 'Forma de onda da VOZ', 'Comparar a altura de F3 com as outras falas.'],
        ['OUVIR', 'Fundo da fala 3', 'O que mais subiu junto com ela?']
      ], 'Ajuste F1, F2 e F4 em até 1 dB para soarem ainda mais iguais.'),
      promptLabel: 'Pronto quando', prompt: 'Na forma de onda, F3 fica da altura das outras falas, e no fone nenhuma assusta ou some.',
      resources: help('falas'),
      teacher: teacher(['2 min · Mostro F2 e F3 em sequência e subo F3 até soar parecida.', '10 min · Prática; circulo perguntando o que subiu junto com a fala 3.'], 'Ao subir F3, o ronco do carro e o zumbido sobem juntos. Uso isso para abrir o próximo slide.', 'Quem chegar a +12 dB e ainda não ouvir bem provavelmente está com a trilha alta: volto ao pedido 1.')
    },
    {
      title: 'Onde está o ruído', kicker: 'Espectrograma da voz', heading: 'O ruído aparece no espectrograma',
      lede: 'O tempo corre para a direita; o grave fica embaixo. Quanto mais claro, mais forte.', block: 2,
      av9: stills([
        ['telas/voz-antes.jpg', 'ANTES', 'Faixa grave do começo ao fim: zumbido do ar-condicionado e ronco da rua, também entre as falas.'],
        ['telas/voz-depois.jpg', 'DEPOIS', 'Grave filtrado e silêncio entre as falas. A voz continua inteira.']
      ]),
      promptLabel: 'Pensem', prompt: 'Qual parte do ruído só existe porque ninguém fechou a janela na gravação?',
      teacher: teacher(['6 min · Aponto a faixa grave contínua e os vãos entre as falas, onde só havia ruído.'], 'O que a edição faz bem: tirar grave e silenciar vãos. O que não faz: limpar chiado misturado à fala. Retomo a aula 8: som limpo se resolve na gravação.', 'Se a imagem parecer abstrata, toco a voz em solo e aponto o trecho no espectrograma ao mesmo tempo.')
    },
    {
      title: 'Pedido 3 · Limpar a voz', kicker: 'Pedido do cliente', heading: 'Tirem o ar-condicionado e a rua',
      lede: 'Tratar só o canal da VOZ, em solo, e depois conferir com tudo tocando.', block: 2,
      av9: commands([
        ['FILTRAR', 'Tirar o ronco grave', 'Comparar Leve, Médio e Forte. Escolher o mais fraco que tira o ronco.'],
        ['CORTAR', 'Cortar os vãos', 'Silenciar a voz entre as falas.'],
        ['REALÇAR', 'Voz mais nítida', 'Um pouco já basta para as consoantes ficarem claras.'],
        ['CONFERIR', 'Tirar o solo', 'Ouvir a cena inteira com todos os canais.']
      ], 'Em solo, compare Um pouco e Muito na voz mais nítida e explique quando a voz fica áspera.'),
      promptLabel: 'Pronto quando', prompt: 'Entre as falas a forma de onda da VOZ fica vazia e a voz não ficou fina nem áspera.',
      resources: help('ruido'),
      teacher: teacher(['2 min · Demonstro Tirar o ronco grave em Leve, Médio e Forte (80, 120 e 160 Hz), em solo, e o corte dos vãos. Apresento o nome técnico, filtro passa-alta, uma vez só.', '13 min · Prática; circulo pedindo que cada um justifique a posição escolhida.'], '120 Hz é o meio-termo para esta voz. 160 Hz já afina o narrador; 80 Hz deixa parte do ronco do carro.', 'Se alguém não ouvir diferença, peço volume confortável mais alto no fone, toco a fala 3 em solo e alterno Desligado e 120 Hz.')
    },
    {
      title: 'Pedido 4 · Desenhar o volume da trilha', kicker: 'Pedido do cliente', heading: 'Quero a música forte, mas atrás da voz',
      lede: 'Com a caneta, desenhar na faixa TRILHA a linha de volume da música, como o lápis de automação dos editores.', block: 2,
      av9: commands([
        ['ATIVAR', 'Usar o volume desenhado', 'A faixa TRILHA cresce e vira área de desenho; a linha tracejada é o volume normal.'],
        ['DESENHAR', 'Caneta na faixa TRILHA', 'Linha baixa sob cada fala, alta nos intervalos e na perseguição.'],
        ['OUVIR', 'Tocar a cena', 'Redesenhar por cima onde a música ainda cobre a voz. Apagar desenho recomeça.'],
        ['SUAVIZAR', 'Entrada e saída graduais', 'A música veio cortada: ligar as duas para não começar nem terminar de repente.']
      ], 'Desligue o desenho, ligue o abaixamento automático Médio e compare. Fique com o que soar melhor.'),
      promptLabel: 'Pronto quando', prompt: 'A música desce em cada fala, volta nos intervalos e começa e termina sem susto.',
      resources: help('espaco'),
      teacher: teacher(['2 min · Demonstro com a caneta no projetor: desenho baixo sob F1, subo no intervalo, mostro Apagar desenho e a borracha, se a caneta tiver.', '12 min · Prática com a caneta; circulo conferindo o pico máximo de novo, porque a perseguição pode ter subido demais.'], 'O lápis de automação existe nos editores profissionais como keyframes de volume; o abaixamento automático se chama ducking. O desenho substitui o automático enquanto estiver ligado.', 'Sem caneta ou com dificuldade motora, o mouse desenha igual, e o abaixamento automático de −12 dB cumpre o pedido. Se o pico voltar ao vermelho, desço a linha da perseguição.')
    },
    {
      title: 'Exportar a primeira versão', kicker: 'Antes de seguir', heading: 'mix-v1.wav no disco',
      lede: 'A mesa de som processa os 30 segundos sem tocar e baixa um WAV.', block: 2,
      av9: checks([
        ['Nome', 'Exportar a mixagem como mix-v1.wav.'],
        ['Conferir', 'A linha do resultado precisa aparecer em verde.'],
        ['Ouvir', 'Abrir o WAV no player do computador, com fone, até o final.'],
        ['Guardar', 'Mover o arquivo de Downloads para a pasta Aula14-Som.']
      ]),
      resources: help('exportar'),
      teacher: teacher(['8 min · Demonstro a exportação e a leitura do resultado; a turma exporta e confere fora da mesa de som.'], 'Reparo no tempo de processamento mostrado pela mesa de som: 30 s de som em poucos segundos. Uso isso para abrir o bloco das esperas.', 'Se o resultado vier vermelho, baixo a saída em 2 dB, apago o arquivo anterior em Downloads e exporto de novo; senão o navegador salva mix-v1 (1).wav.')
    },
    {
      title: 'Buffering', kicker: 'Vídeo pela rede', heading: 'O vídeo para quando a reserva acaba',
      lede: 'O player baixa alguns segundos antes de mostrar. Essa reserva é o buffer.', block: 3,
      av9: {type: 'flow', steps: [
        {label: 'SERVIDOR', text: 'Guarda o vídeo publicado.', mark: 'Origem'},
        {label: 'REDE', text: 'Entrega uma quantidade de dados por segundo.', mark: 'Mbps'},
        {label: 'RESERVA', text: 'Segundos baixados antes de mostrar.', mark: 'Buffer'},
        {label: 'REPRODUÇÃO', text: 'Consome a reserva. Se ela zera, o vídeo para.', mark: 'Carregando'}
      ]},
      promptLabel: 'Pensem', prompt: 'Se o vídeo consome mais dados por segundo do que a rede entrega, o que acontece com a reserva?',
      teacher: teacher(['5 min · Explico o fluxo com o exemplo de um vídeo da mostra assistido no celular, longe do roteador.'], 'Buffering é a espera de uma reprodução em rede. Não uso a palavra para travamentos dentro do editor.', 'Se a turma confundir com a velocidade do computador, pergunto de onde o vídeo está vindo.')
    },
    {
      title: 'Pedido 5 · Provocar e resolver', kicker: 'Pedido do cliente', heading: 'O trailer trava no celular do cliente',
      lede: 'No Laboratório de espera, provocar o problema e depois resolvê-lo com a mesma rede.', block: 3,
      av9: commands([
        ['ABRIR', 'buffering.html', 'Na mesma pasta do kit, sem internet.'],
        ['PROVOCAR', '3 Mbps e 1080p', 'Assistir do início e contar as travadas.'],
        ['RESOLVER', 'Mesma rede, outra qualidade', 'Testar 720p e depois Automática.'],
        ['REGISTRAR', 'Testes que você fez', 'Dois testes na lista: com e sem travada.']
      ], 'Ligue Rede instável e descubra com qual qualidade dá para assistir sem travar.'),
      promptLabel: 'Pronto quando', prompt: 'A lista mostra um teste com travadas e outro sem, na mesma conexão.',
      resources: [{href: `${base}buffering.html`, label: 'Abrir o laboratório de espera'}, ...help('buffering')],
      teacher: teacher(['2 min · Mostro 1 Mbps em 1080p travando, com a simulação 4× ligada.', '10 min · Prática; circulo pedindo a regra com as palavras de cada um.'], 'Regra que busco: a qualidade precisa consumir menos Mbps do que a rede entrega. A automática deixa 20% de folga: a 3 Mbps escolhe 360p, embora 720p (2,5 Mbps) passe sem travar numa rede estável. A folga protege contra a rede instável.', 'Se a espera cansar, lembro o Simular 4× mais rápido e o Parar e registrar.')
    },
    {
      title: 'No editor não é buffering', kicker: 'Pré-visualização', heading: 'Travou no editor? Quatro saídas',
      lede: 'No editor, o vídeo não vem pela rede: o computador processa cada quadro.', block: 3,
      av9: {type: 'table', variant: 'data', columns: ['Recurso', 'O que faz', 'Quando usar'], rows: [
        ['Resolução de preview', 'Mostra a prévia menor, em 1/2 ou 1/4.', 'Conferir ritmo, não detalhe.'],
        ['Cache', 'Guarda no disco o que já foi processado.', 'Trecho que roda liso na segunda vez.'],
        ['Proxy', 'Cópia leve do original para editar.', 'Arquivos pesados, como 4K.'],
        ['Render de trecho', 'Processa antes só o trecho pesado.', 'Trecho com muitos efeitos.']
      ]},
      teacher: teacher(['6 min · Leio cada linha e relaciono com a mesa de som: o WAV foi processado sem tocar, como um render.'], 'Nenhuma dessas ferramentas muda o arquivo final; elas só aliviam a prévia. Proxy e cache ocupam disco.', 'Se faltar tempo, fico em proxy e render de trecho, que aparecem mais nos editores do laboratório.')
    },
    {
      title: 'Pedido 6 · Diagnóstico', kicker: 'Pedido do cliente', heading: 'A equipe perdeu a noite esperando',
      lede: 'Responder às oito situações do Laboratório de espera e baixar o diagnóstico.', block: 3,
      av9: commands([
        ['LER', 'Situação', 'De onde vem o vídeo: rede ou computador?'],
        ['ESCOLHER', 'Uma das cinco respostas', 'Buffering, resolução de preview, cache, proxy ou render de trecho.'],
        ['CONFERIR', 'Explicação', 'Errou? Releia as definições e tente outra.'],
        ['BAIXAR', 'Diagnóstico (TXT)', 'Guardar diagnostico-aula14.txt na pasta do kit.']
      ], 'Escreva no caderno uma situação nova e peça ao colega do lado para resolver.'),
      promptLabel: 'Pronto quando', prompt: 'As oito situações respondidas e o diagnóstico salvo na pasta.',
      resources: help('editor'),
      teacher: teacher(['2 min · Resolvo a primeira situação em voz alta, perguntando de onde vem o vídeo.', '10 min · Prática; circulo olhando o placar de primeira tentativa.'], 'O placar conta só a primeira resposta: serve para eu ver quem ainda confunde, não para nota.', 'Quem errar mais da metade refaz comigo as situações 1 e 2, que separam rede e computador.')
    },
    {
      title: 'Planejar a espera', kicker: 'Tempo de trabalho', heading: 'Esperar faz parte. Esperar à toa, não.',
      lede: 'Exportar, gerar proxy e renderizar levam tempo. A equipe planeja o que fazer enquanto isso.', block: 3,
      av9: checks([
        ['Antes', 'Ouvir a cena inteira uma vez. Exportar o mesmo erro duas vezes gasta tempo.'],
        ['Durante', 'Conferir nomes de arquivo, créditos e a próxima tarefa da fila.'],
        ['Depois', 'Ouvir o arquivo exportado fora do editor, até o final.'],
        ['Na equipe', 'Proxy e render pesado começam cedo, enquanto alguém revisa outra parte.']
      ]),
      teacher: teacher(['5 min · Pergunto quanto tempo a turma acha que leva para exportar o microcurta em 1080p e monto a fila de tarefas no quadro.'], 'Ligo com a aula 16, de render: quem planeja a fila não perde a estreia esperando a barra de progresso.', 'Se o bloco atrasar, faço só a pergunta do Antes e sigo.')
    },
    {
      title: 'Pedido 7 · Duas entregas', kicker: 'Pedido do cliente', heading: 'Vamos dublar o trailer em outro idioma',
      lede: 'O cliente quer a mixagem final e uma versão sem voz, com o mesmo equilíbrio.', block: 4,
      av9: commands([
        ['REVISAR', 'Cena inteira', 'Uma última escuta antes de exportar.'],
        ['FINAL', 'mix-final.wav', 'Nenhum M ou S ligado; resultado em verde.'],
        ['SEM VOZ', 'M na VOZ, nenhum S ligado', 'Exportar sem-voz.wav e depois desligar o M.'],
        ['OUVIR', 'Player do computador', 'Os dois arquivos até o final, com fone.']
      ], 'Explique por que separar as camadas facilita uma versão em outro idioma.'),
      promptLabel: 'Pronto quando', prompt: 'mix-final.wav e sem-voz.wav na pasta Aula14-Som, ouvidos até o final.',
      resources: help('versoes'),
      teacher: teacher(['2 min · Mostro que a versão sem voz é só um M antes de exportar.', '10 min · Prática e conferência dos dois arquivos no player do computador.'], 'Versão sem voz, com música e efeitos, é entrega comum em produções que serão dubladas.', 'Se faltar tempo, priorizo mix-final.wav; a versão sem voz entra no banco de melhorias.')
    },
    {
      title: 'Escuta cruzada', kicker: 'Com o colega do lado', heading: 'Teste às cegas: troquem de fone, não de lugar',
      lede: 'Toquem mix-v1.wav e mix-final.wav para o colega, em ordem sorteada. Ele acerta qual é a versão final?', block: 4,
      av9: checks([
        ['Às cegas', 'O colega diz qual é a final e por quê.'],
        ['Voz', 'Todas as palavras se entendem?'],
        ['Música', 'Ela cobre alguma fala ou some demais?'],
        ['Começo e fim', 'Algo começa ou termina de repente?']
      ]),
      teacher: teacher(['8 min · Teste às cegas em duplas: cada um toca as duas versões em ordem sorteada e o colega aponta a final e um ponto verificável; quem receber um apontamento corrige, apaga o arquivo anterior em Downloads e exporta de novo com o mesmo nome.'], 'Peço apontamentos verificáveis, com o momento da cena: “na fala 3 a música cobre a palavra amigo”.', 'Se o fone não puder ser trocado, o colega ouve pelo computador do vizinho, sem trocar de posto.')
    },
    {
      title: 'Banco de melhorias', kicker: 'Para quem concluiu tudo', heading: 'Um teste a mais, sem perder a entrega',
      lede: 'Os arquivos finais continuam guardados. Testem e comparem.', block: 4,
      av9: checks([
        ['Voz', 'Comparar Leve e Forte no ronco grave e explicar a diferença.'],
        ['Trilha', 'Desenhar uma subida da música na perseguição e comparar com o abaixamento automático.'],
        ['Versão', 'Exportar só voz e ambiência como teste.wav, como um podcast da cena.'],
        ['Rede', 'Rede instável a 3 Mbps: com qual qualidade dá para assistir sem travar?']
      ]),
      pace: 'extra',
      teacher: teacher([], 'Ofereço assim que alguém termina o pedido 7; não espero a turma.', 'Se a melhoria piorar o som, A/B mostra a mesa inicial e Voltar à mesa inicial recomeça; os WAV entregues não mudam.')
    },
    {
      title: 'Encerramento', kicker: 'Aula 14 · Som na pós-produção', heading: 'O trailer agora se ouve',
      lede: 'Na pasta Aula14-Som: três WAV, o diagnóstico e os créditos. Caneta no suporte da mesa digitalizadora.', block: 4,
      av9: checks([
        ['Mixagem', 'mix-v1.wav, mix-final.wav e sem-voz.wav, com resultado em verde.'],
        ['Diagnóstico', 'diagnostico-aula14.txt com testes de rede e as oito situações.'],
        ['Explicar', 'Por que a voz é a referência da mixagem?'],
        ['Próxima aula', 'Organizar a composição em blocos: o som entra como bloco também.']
      ]),
      teacher: teacher(['10 min · Confiro nas telas os arquivos e o pico; três estudantes respondem por que a voz é a referência e qual a diferença entre buffering e proxy. Confiro canetas nos suportes e mesas digitalizadoras no lugar.'], 'Encerro ligando com as aulas 15 e 16: blocagem e render da mostra.', 'Quem não terminou guarda os ajustes da mesa de som e exporta o que tiver; o diagnóstico pode ser concluído no começo da próxima aula.')
    }
  ],
  appendDefaultClosing: false
};
