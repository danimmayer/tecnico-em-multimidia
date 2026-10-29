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
    {horario: '19:00 - 19:45', atividade: 'Escuta crítica de uma cena com e sem cada camada sonora, preparo da mesa de som e primeiro pedido do cliente: a voz na frente, sem estourar o medidor.'},
    {horario: '20:05 - 21:00', atividade: 'Falas no mesmo volume, ruído do ar-condicionado e da rua tratado com filtro passa-alta e corte dos vãos, música abaixo da voz com entrada e saída graduais e primeira exportação em WAV.'},
    {horario: '21:00 - 21:40', atividade: 'Provocar e resolver o buffering em um simulador de rede e diagnosticar travamentos no editor: resolução de preview, cache, proxy e render de trecho. Planejar o tempo de processamento da equipe.'},
    {horario: '21:40 - 22:10', atividade: 'Exportar a mixagem final e a versão sem voz, conferir em fone fora da mesa e fazer a escuta cruzada com o colega do lado.'}
  ],
  methodology: 'Oficina individual guiada por pedidos de um cliente fictício, revelados um de cada vez pelos slides. Escuta crítica antes da prática, demonstrações de até dois minutos, critério de pronto em cada pedido e melhorias para quem termina antes. A turma permanece nos postos e faz a escuta cruzada com o colega do lado.',
  resources: 'Projetor com caixa de som, computadores com navegador e fones de ouvido. Kit Aula14-Som.zip no disco local: cena de 30 segundos com imagens CC BY de Caminandes 3, quatro camadas de som, Mesa de som e Laboratório de espera, que funcionam sem internet e sem conta. Nenhum programa precisa ser instalado. Nenhuma ficha impressa.',
  observation: 'Aula das 19:00 às 22:10; lanche das 19:45 às 20:05 e chamada no início de cada bloco. Os estudantes permanecem nos postos; somente o professor circula. Pedidos um de cada vez: quem termina faz a melhoria do próprio slide e espera o próximo. Distribuir o Aula14-Som.zip antes da prática, por pendrive ou rede local; a mesa abre direto do disco. Não depender de projetos anteriores: a cena e as camadas são do kit. Sem fone para todos, trabalhar em dupla com um fone por vez e alternar a operação a cada pedido. Os WAV, o diagnóstico e os créditos ficam no disco local; mostrar na própria tela, sem envio pela internet.'
};

const base = 'modelos/producao-audiovisual/aula-14/';
const help = section => [{href: `${base}AJUDA.html#${section}`, label: 'Abrir passos e soluções'}];
const checks = items => ({type: 'checks', items: items.map(([label, text]) => ({label, text}))});
const commands = (items, result) => ({type: 'commands', commands: items.map(([word, who, text]) => ({word, who, text})), tags: [{label: 'TERMINOU ANTES?', kind: 'good'}], result});
const teacher = (steps, watch, rescue) => ({steps, watch, rescue});
const stills = images => ({type: 'stills', images: images.map(([file, label, text]) => ({src: base + file, label, text}))});

export const support = {
  teacherGoal: 'Cada estudante entrega até 22:10 a mixagem do trailer em dois arquivos (final e sem voz), com falas niveladas, ruído tratado, trilha abaixo da voz e pico até −1 dBFS, e um diagnóstico que separa buffering de resolução de preview, cache, proxy e render de trecho.',
  plainLanguage: 'Mixar é decidir quem fala primeiro. A voz é a referência; música, ambiência e efeitos entram em volta dela. Buffering é a espera para carregar uma reprodução que vem pela rede; dentro do editor, travamentos de pré-visualização se resolvem com resolução de preview, cache, proxy ou render de trecho.',
  say: 'Hoje vocês são o estúdio de som e eu sou o cliente. O trailer está pronto na imagem, mas ninguém entende a locução. Os pedidos chegam um de cada vez.',
  demo: [
    'Toco a cena na mesa e uso solo em cada canal: voz, trilha, ambiência e efeitos.',
    'Mostro o medidor no vermelho e baixo a trilha até a voz ficar clara e o pico sair do vermelho.',
    'Subo a fala 3 e mostro que o ruído sobe junto; ligo o passa-alta em 120 Hz e corto os vãos.',
    'Ligo o abaixamento da trilha durante a voz e as entradas e saídas graduais; mostro a mudança no desenho da linha do tempo.',
    'Exporto um WAV e abro no player do computador.',
    'No Laboratório de espera, provoco travadas com 1 Mbps em 1080p e resolvo com qualidade automática.'
  ],
  studentDeliverable: 'mix-v1.wav, mix-final.wav e sem-voz.wav exportados pela Mesa de som, com pico em −1 dBFS ou abaixo, e diagnostico-aula14.txt baixado do Laboratório de espera, com testes de rede e as oito situações do editor. Tudo na pasta Aula14-Som, mostrado na própria tela.',
  check: [
    'As quatro falas se entendem sem esforço e parecem gravadas na mesma distância do microfone.',
    'O zumbido grave some entre as falas e diminui durante elas, sem deixar a voz fina.',
    'A trilha abaixa durante a voz, volta nos intervalos e começa e termina de forma gradual.',
    'O pico do arquivo exportado fica em −1 dBFS ou abaixo e o medidor não acende Estourou.',
    'A versão sem voz mantém trilha, ambiência e efeitos com o mesmo equilíbrio.',
    'O registro de rede mostra uma configuração com travadas e outra sem travadas.',
    'O diagnóstico usa buffering só para reprodução em rede e escolhe resolução de preview, cache, proxy ou render de trecho para o editor.'
  ],
  fallback: 'Sem fones para todos, trabalho em duplas com um fone por vez e alternância a cada pedido. Se algum computador não abrir a mesa, a dupla do lado opera e o estudante decide e registra os valores no caderno. Se a caixa de som do projetor falhar, faço a escuta crítica com a turma usando os próprios fones, um canal em solo por vez.',
  extension: 'Cada pedido traz no slide uma melhoria para quem termina antes. Quem conclui tudo usa o banco de melhorias: comparar o passa-alta de 80 e 160 Hz, testar o abaixamento de −18 dB, exportar uma versão só com voz e ambiência ou testar rede instável no laboratório.',
  commonProblems: [
    ['A mesa fica em Carregando', 'Confiro se o ZIP foi extraído e se mesa.html, sons.js e cena.mp4 estão na mesma pasta. Atualizo a página.'],
    ['Não sai som', 'Confiro fone, volume do computador e se algum canal ficou em M ou outro em S.'],
    ['A turma sobe o volume do computador em vez de mexer na mesa', 'Peço volume do computador confortável e fixo; todos os ajustes acontecem na mesa, para o arquivo exportado sair certo.'],
    ['O pico continua vermelho', 'Baixo primeiro a trilha, que é a camada mais forte; só depois mexo na saída. Zero o pico e ouço a cena inteira.'],
    ['A voz ficou fina', 'O passa-alta está em 160 Hz. Volto para 120 ou 80 Hz e comparo em solo.'],
    ['A música sumiu', 'O abaixamento está em −18 dB com a trilha já baixa. Subo o volume do canal da trilha e uso −12 dB.'],
    ['O WAV não aparece', 'Procuro na pasta Downloads e movo para a pasta Aula14-Som.'],
    ['Confundem buffering com travamento do editor', 'Pergunto de onde vem o vídeo: se vem pela rede, é buffering; se o computador está processando, é preview, cache, proxy ou render.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia', kicker: 'Aula 14 · Som na pós-produção', heading: 'A imagem está pronta. O som, ainda não.',
      lede: 'Hoje vocês são o estúdio de som. Os pedidos do cliente chegam um de cada vez.', block: 1,
      av9: {type: 'day', rows: [
        {time: '19:00–19:45', minutes: 45, title: 'Escutar e equilibrar', text: 'Quatro camadas e a voz na frente.'},
        {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Ajustes guardados na mesa.', pause: true},
        {time: '20:05–21:00', minutes: 55, title: 'Tratar o som', text: 'Falas, ruído e espaço para a voz.'},
        {time: '21:00–21:40', minutes: 40, title: 'Esperas', text: 'Buffering na rede e prévia no editor.'},
        {time: '21:40–22:10', minutes: 30, title: 'Entregar', text: 'Mixagem final e versão sem voz.'}
      ]},
      promptLabel: 'Regra da noite', prompt: 'Terminou antes? Faça a melhoria do slide. O próximo pedido só chega pelo slide.',
      teacher: teacher(['3 min · Faço a chamada, apresento o cliente e a regra dos pedidos.'], 'A turma entende que a imagem não muda hoje: todo o trabalho é de som.', 'Se alguém perguntar o que vem depois, respondo que o cliente ainda não pediu.')
    },
    {
      title: 'Quatro camadas', kicker: 'Escuta crítica', heading: 'Uma cena, quatro camadas de som',
      lede: 'Escutem com e sem cada camada. O que muda na história quando uma delas some?', block: 1,
      av9: {type: 'tracks', tracks: [
        {label: 'VOZ', clips: [{kind: 'empty', seconds: 1}, {kind: 'audio', label: 'F1', seconds: 4}, {kind: 'empty', seconds: 3}, {kind: 'audio', label: 'F2', seconds: 3}, {kind: 'empty', seconds: 3}, {kind: 'audio', label: 'F3', seconds: 3}, {kind: 'empty', seconds: 9}, {kind: 'audio', label: 'F4', seconds: 4}]},
        {label: 'TRILHA', clips: [{kind: 'graphic', label: 'Música', seconds: 30}]},
        {label: 'AMBIÊNCIA', clips: [{kind: 'guide', label: 'Mar', seconds: 8}, {kind: 'guide', label: 'Vento na neve', seconds: 22}]},
        {label: 'EFEITOS', clips: [{kind: 'empty', seconds: 7}, {kind: 'video', label: 'Passos', seconds: 4}, {kind: 'empty', seconds: 1}, {kind: 'video', label: 'Surpresa', seconds: 3}, {kind: 'empty', seconds: 4}, {kind: 'video', label: 'Perseguição', seconds: 6}, {kind: 'video', label: 'Impacto', seconds: 5}]}
      ], caption: 'A última fruta: trailer de', total: true},
      resources: [{href: `${base}mesa.html`, label: 'Abrir a mesa de som'}],
      teacher: teacher(['8 min · Toco a cena inteira na mesa, depois cada canal em solo e, por fim, tudo menos um canal. A turma diz o que perdeu a cada vez.'], 'Busco quatro funções: a voz conta, a trilha dá ritmo e emoção, a ambiência diz onde estamos, os efeitos confirmam as ações.', 'Se a caixa do projetor estiver fraca, peço os fones e indico o canal em solo para todos ouvirem juntos.')
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
      teacher: teacher(['5 min · Leio uma linha por vez e peço um exemplo de cada camada em filmes que a turma conhece.'], 'Ambiência é diferente de ruído: é escolhida e combina com o lugar; ruído é o que entrou sem querer.', 'Se o tempo apertar, fico só na voz e na trilha; ambiência e efeitos aparecem nos pedidos.')
    },
    {
      title: 'O ponto de chegada', kicker: 'Uma ideia do que vamos criar', heading: 'A mesma cena, mixada',
      lede: 'Escutem: em algum momento a música disputa com a voz?', block: 1,
      av9: {type: 'media', clips: [{src: `${base}exemplo-mixado.mp4`, label: 'EXEMPLO', text: 'Voz clara, música atrás dela, começo e fim graduais.', poster: `${base}telas/cena.jpg`}]},
      promptLabel: 'Repare', prompt: 'A música desce sozinha quando alguém fala e volta nos intervalos.',
      teacher: teacher(['3 min · Toco o exemplo uma vez e comparo com a mesa inicial que acabamos de ouvir.'], 'Não detalho os valores: cada estudante encontra os seus ao longo dos pedidos.', 'Se o vídeo não tocar, uso a mesa no estado inicial e conto o que vai mudar.')
    },
    {
      title: 'Preparar a mesa', kicker: 'Antes do primeiro pedido', heading: 'A mesa abre direto do disco',
      lede: 'Sem internet, sem conta e sem instalar nada.', block: 1,
      av9: {type: 'commands', commands: [
        {word: 'EXTRAIR', who: 'Aula14-Som.zip', text: 'Extrair no disco local, não abrir de dentro do ZIP.'},
        {word: 'ABRIR', who: 'mesa.html', text: 'Dois cliques; Chrome, Edge ou Firefox.'},
        {word: 'FONE', who: 'Volume do computador', text: 'Confortável e fixo. Daqui em diante, quem ajusta é a mesa.'},
        {word: 'TOCAR', who: 'Espaço ou botão Tocar', text: 'Usar M e S para ouvir cada canal.'}
      ], tags: [{label: 'PRONTO', kind: 'good'}], result: 'A cena toca com som e o medidor da saída se mexe.'},
      resources: [{href: `${base}index.html`, label: 'Ver o kit da aula'}, ...help('preparo')],
      teacher: teacher(['6 min · Mostro onde está o kit e abro a mesa direto da pasta; atendo primeiro quem ainda não ouviu som.'], 'Volume do computador fixo é condição para comparar ajustes; quem mexe nele mascara o problema.', 'Se um posto não abrir, a dupla do lado opera e o estudante decide os ajustes.')
    },
    {
      title: 'Ler o medidor', kicker: 'Saída da mesa', heading: 'O vermelho avisa distorção',
      lede: 'O medidor mostra o pico do som que sai da mesa, em dBFS. Zero é o teto do arquivo.', block: 1,
      av9: checks([
        ['Verde', 'Abaixo de −6 dBFS: há folga.'],
        ['Amarelo', 'Entre −6 e −1 dBFS: forte, sem distorcer. Lugar dos trechos mais altos.'],
        ['Vermelho', 'Acima de −1 dBFS: risco de distorção no arquivo.'],
        ['Estourou', 'Acende quando a soma passa do teto. Zerar o pico e ouvir de novo.']
      ]),
      teacher: teacher(['4 min · Toco a mesa inicial até acender Estourou e explico que a soma das camadas passou do teto.'], 'Mais alto não é melhor: acima do teto o som se deforma e não há como recuperar no arquivo.', 'Se ninguém viu o vermelho, toco o trecho da perseguição, onde a soma é maior.')
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
      promptLabel: 'Pronto quando', prompt: 'As falas 1, 2 e 4 se entendem com tudo tocando e o pico máximo fica abaixo de −1 dBFS.',
      resources: help('medidor'),
      teacher: teacher(['2 min · Demonstro o solo na voz e a descida da trilha, sem dizer um valor.', '14 min · A turma equilibra os canais; circulo conferindo o pico máximo e peço que salvem antes do lanche.'], 'A fala 3 continua fraca: é o próximo pedido. Não deixo ninguém resolver isso subindo o canal inteiro da voz.', 'Se alguém só abaixa a saída, peço que olhe a fala no desenho: ela continua escondida atrás da música.')
    },
    {
      title: 'Lanche', kicker: 'Aula 14 · Som na pós-produção', heading: 'Lanche até 20:05',
      lede: 'A mesa guarda os ajustes neste navegador. Não fechem a pasta do kit.', block: 1,
      av9: checks([
        ['Guardar', 'Deixar a mesa aberta ou anotar os volumes no caderno.'],
        ['Voltar', 'Mesmo posto, mesma mesa, mesmo fone.']
      ]),
      pace: 'break',
      teacher: teacher(['20 min · Lanche. Confiro que nenhuma mesa ficou em solo esquecido.'], 'Os ajustes ficam no armazenamento do navegador; o que vale como entrega é o WAV exportado.', 'Se algum computador reiniciar, o estudante refaz o pedido 1 com os valores anotados.')
    },
    {
      title: 'Pedido 2 · Falas no mesmo volume', kicker: 'Pedido do cliente', heading: 'A fala 3 parece vir de longe',
      lede: 'Ela foi gravada longe do microfone. Igualar as quatro falas no volume de cada fala.', block: 2,
      av9: commands([
        ['COMPARAR', 'Clique em F2 e depois em F3', 'Ouvir uma em seguida da outra.'],
        ['SUBIR', 'Volume de cada fala · F3', 'De 2 em 2 dB, até parecer a mesma distância.'],
        ['VER', 'Desenho da voz', 'Comparar a altura de F3 com as outras falas.'],
        ['OUVIR', 'Fundo da fala 3', 'O que mais subiu junto com ela?']
      ], 'Ajuste F1, F2 e F4 em até 1 dB para soarem ainda mais iguais.'),
      promptLabel: 'Pronto quando', prompt: 'As quatro falas parecem ditas na mesma distância e nenhuma assusta ou some.',
      resources: help('falas'),
      teacher: teacher(['2 min · Mostro F2 e F3 em sequência e subo F3 até soar parecida.', '10 min · Prática; circulo perguntando o que subiu junto com a fala 3.'], 'Ao subir F3, o ronco do carro e o zumbido sobem juntos. Uso isso para abrir o próximo slide.', 'Quem passar de +12 dB e ainda não ouvir bem provavelmente está com a trilha alta: volto ao pedido 1.')
    },
    {
      title: 'Onde está o ruído', kicker: 'Espectrograma da voz', heading: 'O ruído aparece no desenho',
      lede: 'O tempo corre para a direita; o grave fica embaixo. Quanto mais claro, mais forte.', block: 2,
      av9: stills([
        ['telas/voz-antes.jpg', 'ANTES', 'Faixa grave do começo ao fim: zumbido do ar-condicionado e ronco da rua, também entre as falas.'],
        ['telas/voz-depois.jpg', 'DEPOIS', 'Grave filtrado e silêncio entre as falas. A voz continua inteira.']
      ]),
      promptLabel: 'Pensem', prompt: 'Qual parte do ruído só existe porque ninguém fechou a janela na gravação?',
      teacher: teacher(['6 min · Aponto a faixa grave contínua, os vãos e o reforço durante a fala 3, onde passa o carro.'], 'O que a edição faz bem: tirar grave e silenciar vãos. O que não faz: limpar chiado misturado à fala. Retomo a aula 8: som limpo se resolve na gravação.', 'Se a imagem parecer abstrata, toco a voz em solo e aponto o trecho no espectrograma ao mesmo tempo.')
    },
    {
      title: 'Pedido 3 · Limpar a voz', kicker: 'Pedido do cliente', heading: 'Tirem o ar-condicionado e a rua',
      lede: 'Tratar só o canal da VOZ, em solo, e depois conferir com tudo tocando.', block: 2,
      av9: commands([
        ['FILTRAR', 'Passa-alta', 'Comparar 80, 120 e 160 Hz. Escolher o menor que tira o ronco.'],
        ['CORTAR', 'Cortar os vãos', 'Silenciar a voz entre as falas.'],
        ['REALÇAR', 'Presença da voz', '+3 dB para as consoantes ficarem nítidas.'],
        ['CONFERIR', 'Tirar o solo', 'Ouvir a cena inteira com todos os canais.']
      ], 'Em solo, compare +3 e +6 dB de presença e explique quando a voz fica áspera.'),
      promptLabel: 'Pronto quando', prompt: 'Entre as falas não há zumbido e a voz não ficou fina nem áspera.',
      resources: help('ruido'),
      teacher: teacher(['2 min · Demonstro o passa-alta nas três posições, em solo, e o corte dos vãos.', '13 min · Prática; circulo pedindo que cada um justifique a frequência escolhida.'], '120 Hz é o meio-termo para esta voz. 160 Hz já afina o narrador; 80 Hz deixa parte do ronco do carro.', 'Se alguém não ouvir diferença, peço volume confortável mais alto no fone, toco a fala 3 em solo e alterno Desligado e 120 Hz.')
    },
    {
      title: 'Pedido 4 · Espaço para a voz', kicker: 'Pedido do cliente', heading: 'Quero a música forte, mas atrás da voz',
      lede: 'A trilha veio cortada de uma música maior: começa e termina de repente.', block: 2,
      av9: commands([
        ['ABAIXAR', 'Abaixar a trilha durante a voz', 'Comparar −6, −12 e −18 dB.'],
        ['SUBIR', 'Volume da TRILHA', 'Agora a música pode voltar a crescer nos intervalos.'],
        ['ENTRAR', 'Entrada gradual (2 s)', 'A música nasce em vez de começar no meio.'],
        ['SAIR', 'Saída gradual (3 s)', 'Termina junto com a assinatura.']
      ], 'Veja o desenho da trilha descer em cada fala e conte quantas vezes a música respira.'),
      promptLabel: 'Pronto quando', prompt: 'A música desce em cada fala, volta nos intervalos e começa e termina sem susto.',
      resources: help('espaco'),
      teacher: teacher(['2 min · Ligo o abaixamento em −12 dB e mostro o desenho da trilha mudando; ligo as duas transições.', '12 min · Prática; circulo conferindo pico máximo de novo, porque a trilha pode ter subido.'], 'Esse abaixamento automático se chama ducking nos editores; aqui ele segue as falas já marcadas.', 'Se o pico voltar ao vermelho, a trilha subiu demais: desço o canal até sair do vermelho.')
    },
    {
      title: 'Exportar a primeira versão', kicker: 'Antes de seguir', heading: 'mix-v1.wav no disco',
      lede: 'A mesa processa os 30 segundos sem tocar e baixa um WAV.', block: 2,
      av9: checks([
        ['Nome', 'Exportar a mixagem como mix-v1.wav.'],
        ['Pico', 'O resultado precisa mostrar −1 dBFS ou abaixo.'],
        ['Ouvir', 'Abrir o WAV no player do computador, com fone, até o final.'],
        ['Guardar', 'Mover o arquivo de Downloads para a pasta Aula14-Som.']
      ]),
      resources: help('exportar'),
      teacher: teacher(['8 min · Demonstro a exportação e a leitura do resultado; a turma exporta e confere fora da mesa.'], 'Reparo no tempo de processamento mostrado pela mesa: 30 s de som em poucos segundos. Uso isso para abrir o bloco das esperas.', 'Se o resultado vier vermelho, baixo a saída em 2 dB e exporto de novo com o mesmo nome.')
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
      ], 'Ligue Rede instável e descubra qual qualidade ainda assiste sem travar.'),
      promptLabel: 'Pronto quando', prompt: 'A lista mostra um teste com travadas e outro sem, na mesma conexão.',
      resources: [{href: `${base}buffering.html`, label: 'Abrir o laboratório de espera'}, ...help('buffering')],
      teacher: teacher(['2 min · Mostro 1 Mbps em 1080p travando, com a simulação 4× ligada.', '10 min · Prática; circulo pedindo a regra com as palavras de cada um.'], 'Regra que busco: a qualidade precisa consumir menos Mbps do que a rede entrega. A automática escolhe por isso.', 'Se a espera cansar, lembro o Simular 4× mais rápido e o Parar e registrar.')
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
      teacher: teacher(['6 min · Leio cada linha e relaciono com a mesa: o WAV foi processado sem tocar, como um render.'], 'Nenhuma dessas ferramentas muda o arquivo final; elas só aliviam a prévia. Proxy e cache ocupam disco.', 'Se faltar tempo, fico em proxy e render de trecho, que aparecem mais nos editores do laboratório.')
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
        ['FINAL', 'mix-final.wav', 'Todas as camadas, pico em −1 dBFS ou abaixo.'],
        ['SEM VOZ', 'M na VOZ', 'Exportar sem-voz.wav e depois desligar o M.'],
        ['OUVIR', 'Player do computador', 'Os dois arquivos até o final, com fone.']
      ], 'Explique por que separar as camadas facilita uma versão em outro idioma.'),
      promptLabel: 'Pronto quando', prompt: 'mix-final.wav e sem-voz.wav na pasta Aula14-Som, ouvidos até o final.',
      resources: help('versoes'),
      teacher: teacher(['2 min · Mostro que a versão sem voz é só um M antes de exportar.', '10 min · Prática e conferência dos dois arquivos no player do computador.'], 'Versão sem voz, com música e efeitos, é entrega comum em produções que serão dubladas.', 'Se faltar tempo, priorizo mix-final.wav; a versão sem voz entra no banco de melhorias.')
    },
    {
      title: 'Escuta cruzada', kicker: 'Com o colega do lado', heading: 'Troquem de fone, não de lugar',
      lede: 'Cada um ouve o mix-final.wav do colega e aponta um ponto verificável.', block: 4,
      av9: checks([
        ['Voz', 'Todas as palavras se entendem?'],
        ['Ruído', 'Há zumbido entre as falas?'],
        ['Música', 'Ela cobre alguma fala ou some demais?'],
        ['Começo e fim', 'Algo começa ou termina de repente?']
      ]),
      teacher: teacher(['8 min · Escuta cruzada em duplas; quem receber um apontamento corrige e exporta de novo com o mesmo nome.'], 'Peço apontamentos verificáveis, com o momento da cena: “na fala 3 a música cobre a palavra amigo”.', 'Se o fone não puder ser trocado, o colega ouve pela mesa do vizinho, sem trocar de posto.')
    },
    {
      title: 'Banco de melhorias', kicker: 'Para quem concluiu tudo', heading: 'Um teste a mais, sem perder a entrega',
      lede: 'Os arquivos finais continuam guardados. Testem e comparem.', block: 4,
      av9: checks([
        ['Voz', 'Comparar passa-alta em 80 e 160 Hz e explicar a diferença.'],
        ['Trilha', 'Testar abaixamento de −18 dB e decidir se a música ainda conta algo.'],
        ['Versão', 'Exportar só voz e ambiência, como um podcast da cena.'],
        ['Rede', 'Rede instável a 3 Mbps: qual qualidade assiste sem travar?']
      ]),
      pace: 'extra',
      teacher: teacher([], 'Ofereço assim que alguém termina o pedido 7; não espero a turma.', 'Se a melhoria piorar o som, A/B mostra a mesa inicial e Voltar à mesa inicial recomeça; os WAV entregues não mudam.')
    },
    {
      title: 'Encerramento', kicker: 'Aula 14 · Som na pós-produção', heading: 'O trailer agora se ouve',
      lede: 'Na pasta Aula14-Som: três WAV, o diagnóstico e os créditos.', block: 4,
      av9: checks([
        ['Mixagem', 'mix-v1.wav, mix-final.wav e sem-voz.wav, pico em −1 dBFS ou abaixo.'],
        ['Diagnóstico', 'diagnostico-aula14.txt com testes de rede e as oito situações.'],
        ['Explicar', 'Por que a voz é a referência da mixagem?'],
        ['Próxima aula', 'Organizar a composição em blocos: o som entra como bloco também.']
      ]),
      teacher: teacher(['10 min · Confiro nas telas os arquivos e o pico; três estudantes respondem por que a voz é a referência e qual a diferença entre buffering e proxy.'], 'Encerro ligando com as aulas 15 e 16: blocagem e render da mostra.', 'Quem não terminou guarda os ajustes da mesa e exporta o que tiver; o diagnóstico pode ser concluído no começo da próxima aula.')
    }
  ],
  appendDefaultClosing: false
};
