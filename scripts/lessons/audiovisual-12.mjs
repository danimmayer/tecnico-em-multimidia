// Fonte regenerável da Aula 12. Gerar com node scripts/build-audiovisual.mjs.
// A prática acontece no Canva, no navegador, com um kit leve de cenas CC BY.
// Os pedidos do cliente aparecem um de cada vez: a turma não adianta o que ainda não viu,
// e cada pedido traz melhorias para quem termina antes, dentro da mesma peça.
export const lesson = {
  title: 'Grafismos, textos e máscaras',
  description: 'Uma abertura com identidade feita no Canva a partir de cenas prontas: título alinhado, faixa com nome, legenda legível, movimento, assinatura com créditos e uma versão para celular, entregues em MP4.',
  objectives: ['Edição de vídeos e sons: criação de elementos gráficos, máscaras, composição com sequência de imagem.', 'Inovação: conceito, visão inovadora.'],
  technical: [
    'Identificar tipos e características de plataformas utilizados no processo de criação de elementos de gráficos para imagens, animações, áudio e vídeo.',
    'Selecionar elementos audiovisuais como: formas, imagens, grafismos, pictogramas, áudio, animações vídeos, textos para o desenvolvimento de animações gráficas.',
    'Aplicar procedimentos de proximidade e alinhamento para desenvolver projetos audiovisuais.'
  ],
  socioemotional: ['Aplicar os aspectos de inovação em suas atividades profissionais.', 'Reconhecer a pesquisa como fonte de inovação e formação de um espírito empreendedor.'],
  schedule: [
    {horario: '19:00 - 19:45', atividade: 'Ver uma abertura pronta, comparar títulos soltos e alinhados, decidir onde cada texto cabe nas cenas, preparar o vídeo no Canva com as cenas do kit e atender ao primeiro pedido do cliente: o título.'},
    {horario: '20:05 - 21:00', atividade: 'Atender aos pedidos seguintes do cliente, um de cada vez: faixa com o nome do personagem, legenda legível e cores e fonte da marca aplicadas em todos os textos.'},
    {horario: '21:00 - 21:40', atividade: 'Dar movimento aos textos com animações de entrada no mesmo estilo, criar a assinatura final com os créditos das imagens e exportar a primeira versão em MP4.'},
    {horario: '21:40 - 22:10', atividade: 'Criar a versão vertical para celular, reposicionando todos os textos, testar a leitura com o colega do lado em cinco segundos e exportar a segunda versão.'}
  ],
  methodology: 'Produção individual no Canva guiada por pedidos de um cliente fictício, revelados um de cada vez pelos slides. Cada pedido tem demonstração curta, prática no posto, critério de pronto e melhorias para quem termina antes dentro da mesma peça. Comparações projetadas antes da prática; teste de leitura com o colega do lado no fim.',
  resources: 'Projetor, fones de ouvido e computadores com navegador e acesso ao Canva. Kit leve Aula12-Canva.zip, com cerca de 2 MB: três cenas curtas de Caminandes 3: Llamigos e uma foto, com créditos e licença CC BY 3.0. Ícones extras podem vir de PNG transparentes. Nenhum programa precisa ser instalado. Nenhuma ficha impressa.',
  observation: 'Aula das 19:00 às 22:10; lanche das 19:45 às 20:05 e chamada no início de cada bloco. Os estudantes permanecem nos postos; somente o professor circula. Os pedidos aparecem um de cada vez: quem termina um pedido faz as melhorias do próprio slide e espera o próximo, sem avançar sozinho. Distribuir o Aula12-Canva.zip antes da prática, por pendrive, rede local ou mensagem da turma; ele é pequeno e sobe rápido ao Canva. Se o Canva ficar fora do ar, os estudantes desenham no caderno a posição de cada texto nas três cenas e a versão para celular. As imagens são CC BY: os créditos ficam na assinatura final.'
};

const base = 'modelos/producao-audiovisual/aula-12/';
const checks = items => ({type: 'checks', items: items.map(([label, text]) => ({label, text}))});
const commands = (items, result) => ({type: 'commands', commands: items.map(([word, who, text]) => ({word, who, text})), tags: [{label: 'TERMINOU ANTES?', kind: 'good'}], result});
const teacher = (steps, watch, rescue) => ({steps, watch, rescue});
const media = clips => ({type: 'media', clips: clips.map(([file, label, text, poster]) => ({src: base + file, label, text, poster: base + poster}))});
const stills = images => ({type: 'stills', images: images.map(([file, label, text]) => ({src: base + file, label, text}))});

export const support = {
  teacherGoal: 'Cada estudante entrega no Canva uma abertura com título alinhado, faixa com nome, legenda legível, animações no mesmo estilo e assinatura com créditos, mais uma versão vertical para celular, exportadas em MP4 até 22:10.',
  plainLanguage: 'Alinhar é fazer elementos compartilharem uma mesma borda. Agrupar por proximidade é deixar perto o que pertence junto. Cada texto da tela tem um trabalho: apresentar, identificar, traduzir o som ou assinar.',
  say: 'Hoje vocês são o estúdio e eu sou o cliente. Os pedidos chegam um de cada vez. Quem terminar antes melhora o que já fez; ninguém fica parado e ninguém pula pedido.',
  demo: [
    'Mostro a abertura de exemplo e o título solto ao lado do alinhado.',
    'No Canva, crio um vídeo, envio as cenas do kit e coloco cada cena como fundo de uma página.',
    'Demonstro um texto alinhado pela guia rosa, uma faixa agrupada e uma legenda com fundo.',
    'Aplico a mesma animação de entrada nos textos e exporto em MP4.',
    'Crio a versão vertical e mostro como copiar e reposicionar os textos.'
  ],
  studentDeliverable: 'Duas versões em MP4 baixadas do Canva: abertura horizontal (1920 × 1080) e versão para celular (1080 × 1920), com título, faixa com nome, legenda, animações e assinatura com os créditos das imagens. Mostrar na própria tela, sem envio pela internet.',
  check: [
    'O título está alinhado a uma borda, dentro da margem, com subtítulo perto dele.',
    'A faixa apresenta Oti perto dele, sem cobrir o rosto, com nome e descrição alinhados.',
    'A legenda está no centro inferior, com fundo, e não aparece junto da faixa.',
    'Os textos usam as mesmas cores, fonte e estilo de animação.',
    'A assinatura final traz quem fez e os créditos de Caminandes 3 com a licença CC BY.',
    'As duas versões foram exportadas em MP4 e reproduzem do começo ao fim.'
  ],
  fallback: 'Se o envio das cenas demorar, cada estudante sobe primeiro só a paisagem e começa o título; as outras cenas sobem durante a prática. Se o Canva ficar fora do ar, desenhar no caderno a posição de cada texto nas três cenas e na versão para celular, com os mesmos critérios.',
  extension: 'Cada pedido traz no próprio slide duas melhorias para quem termina antes. Quem concluir tudo usa o banco de melhorias: faixa de Koro do lado oposto, versão quadrada para o feed ou um pictograma na assinatura.',
  commonProblems: [
    ['A turma quer avançar sozinha', 'Lembro que o próximo pedido vem do cliente. Quem terminou faz as melhorias do slide atual e confere com a lista de pronto.'],
    ['O envio das cenas está lento', 'Peço para enviar uma cena de cada vez, começando pela paisagem. O kit inteiro tem cerca de 2 MB.'],
    ['A cena não ocupa a tela inteira', 'Clique com o botão direito no vídeo e escolha Definir vídeo como plano de fundo.'],
    ['A faixa e o nome se separam ao mover', 'Selecione os dois com Shift e agrupe com Ctrl + G.'],
    ['A legenda some na neve', 'Em Efeitos, ativar Fundo no texto, com cor escura.'],
    ['Faltou tempo para a versão vertical', 'Priorizo título e assinatura na vertical; faixa e legenda entram se houver tempo.'],
    ['O recurso escolhido é do plano pago', 'Troco por um parecido da conta gratuita; animações, fontes e formas gratuitas resolvem todos os pedidos.'],
    ['O Canva pede para redimensionar', 'Redimensionar é pago. Crio um design novo de celular e copio os textos com Ctrl + C e Ctrl + V.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia', kicker: 'Aula 12 · Canva', heading: 'Hoje vocês são o estúdio. Eu sou o cliente.',
      lede: 'Os pedidos chegam um de cada vez. Cada pedido tem um ponto de pronto.', block: 1,
      av9: {type: 'day', rows: [
        {time: '19:00–19:45', minutes: 45, title: 'Preparar e primeiro pedido', text: 'Exemplo, cenas no Canva e título.'},
        {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Projeto salvo antes de sair.', pause: true},
        {time: '20:05–21:00', minutes: 55, title: 'Pedidos do cliente', text: 'Um de cada vez.'},
        {time: '21:00–21:40', minutes: 40, title: 'Movimento e assinatura', text: 'Primeira versão em MP4.'},
        {time: '21:40–22:10', minutes: 30, title: 'Versão para celular', text: 'Segunda versão em MP4.'}
      ]},
      promptLabel: 'Regra da noite', prompt: 'Terminou antes? Melhore o que já fez. O próximo pedido só chega pelo slide.',
      teacher: teacher(['3 min · Faço a chamada e explico a regra dos pedidos.'], 'A turma entende que não há como adiantar o que ainda não apareceu.', 'Se alguém perguntar o que vem depois, respondo que o cliente ainda não pediu.')
    },
    {
      title: 'Ver o resultado', kicker: 'Uma ideia do que vamos criar', heading: 'Uma abertura em que cada texto tem um trabalho',
      lede: 'Assistam e contem quantos textos aparecem. Onde o vídeo deixou espaço para as palavras?', block: 1,
      av9: media([['exemplo-abertura.mp4', 'EXEMPLO', 'Título, faixa com nome, legenda e assinatura.', 'telas/titulo-alinhado.jpg']]),
      promptLabel: 'Repare', prompt: 'Nenhum texto cobre um rosto.',
      teacher: teacher(['4 min · Reproduzo o exemplo duas vezes e ouço o que a turma percebeu.'], 'O exemplo é silencioso para concentrar a atenção nos textos.', 'Se ninguém responder, pauso no título e pergunto onde ele está.')
    },
    {
      title: 'Alinhar e agrupar', kicker: 'Mesma cena · mesmas palavras', heading: 'Qual título vocês leem primeiro?',
      lede: 'As palavras são idênticas. Mudaram apenas a posição e a distância entre elas.', block: 1,
      av9: stills([
        ['telas/titulo-solto.jpg', 'SOLTO', 'Cada linha começa em um lugar; a segunda se afasta e sai da margem.'],
        ['telas/titulo-alinhado.jpg', 'ALINHADO', 'As duas linhas começam na mesma borda e ficam juntas.']
      ]),
      promptLabel: 'Pensem', prompt: 'O que pertence junto fica perto. O que fica perto parece um bloco só.',
      teacher: teacher(['6 min · Comparo as duas versões, peço que apontem a borda comum e relaciono com faixas de telejornal.'], 'Proximidade agrupa; alinhamento cria uma borda invisível que o olho segue.', 'Se a conversa travar, cubro uma das versões com a mão e peço que leiam a outra.')
    },
    {
      title: 'Cada texto tem um trabalho', kicker: 'Antes de digitar', heading: 'Cada texto tem um lugar e um tempo',
      lede: 'Quatro tipos de texto vão aparecer nos pedidos de hoje.', block: 1,
      av9: {type: 'table', variant: 'data', columns: ['Texto', 'Trabalho', 'Lugar', 'Na tela'], rows: [
        ['Título', 'Apresentar o vídeo.', 'Área livre, dentro da margem.', 'Tempo de ler duas vezes.'],
        ['Faixa com nome', 'Identificar quem aparece.', 'Perto da pessoa, sem cobrir o rosto.', 'Enquanto ela está em cena.'],
        ['Legenda', 'Escrever o que se ouve.', 'Centro inferior, até duas linhas.', 'Pelo menos dois segundos.'],
        ['Assinatura', 'Dizer quem fez e de onde vêm as imagens.', 'Centro, com espaço em volta.', 'No final.']
      ]},
      teacher: teacher(['5 min · Leio uma linha por vez e peço um exemplo de cada tipo em vídeos que a turma conhece.'], 'Legenda acessível também descreve sons entre colchetes, como [vento forte].', 'Se o tempo apertar, leio só título e faixa; os outros aparecem nos pedidos.')
    },
    {
      title: 'Onde cabe o texto?', kicker: 'As cenas de hoje', heading: 'Procurem o espaço livre em cada imagem',
      lede: 'Céu, mar e neve lisa recebem texto. Rostos e ações ficam livres.', block: 1,
      av9: stills([
        ['telas/cena-paisagem.jpg', 'PAISAGEM', 'Onde entra o título?'],
        ['telas/cena-encontro.jpg', 'ENCONTRO', 'Onde o nome de Oti fica perto dele?'],
        ['telas/cena-foto.jpg', 'FRUTA', 'Onde cabe a legenda?']
      ]),
      teacher: teacher(['5 min · A turma aponta as áreas livres de cada cena.'], 'Não há resposta única: céu à esquerda na paisagem, neve à direita de Oti no encontro.', 'Se ninguém arriscar, aponto o céu da paisagem e peço um espaço parecido nas outras.')
    },
    {
      title: 'Preparar o Canva', kicker: 'Antes do primeiro pedido', heading: 'As cenas entram no Canva',
      lede: 'Abram a pasta Aula12-Canva no computador.', block: 1,
      av9: {type: 'commands', commands: [
        {word: 'CRIAR', who: 'Canva', text: 'Criar design → Vídeo (1920 × 1080).'},
        {word: 'ENVIAR', who: 'Uploads', text: 'Enviar os três vídeos e a foto da pasta Aula12-Canva.'},
        {word: 'CENAS', who: 'Uma por página', text: 'Paisagem, encontro e fruta, cada uma como fundo da página.'},
        {word: 'SALVAR', who: 'Nome do projeto', text: 'Aula 12 · seu nome.'}
      ], tags: [{label: 'FUNDO', kind: 'good'}], result: 'Botão direito no vídeo → Definir vídeo como plano de fundo.'},
      resources: [{href: base + 'index.html', label: 'Ver o kit da aula'}],
      teacher: teacher(['2 min · Mostro onde está o kit e crio o vídeo no Canva.', '10 min · A turma envia as cenas e monta as três páginas; atendo primeiro quem ainda não entrou no Canva.'], 'O kit tem cerca de 2 MB. Se o envio estiver lento, cada um começa pela paisagem.', 'Quem não conseguir entrar no Canva acompanha um colega do lado até o acesso voltar, sem trocar de lugar.')
    },
    {
      title: 'Pedido 1 · Título', kicker: 'Pedido do cliente', heading: 'Um título na paisagem: A última fruta',
      lede: 'Subtítulo: Um trailer com Koro e Oti.', block: 1,
      av9: commands([
        ['TEXTO', 'Texto → Adicionar um título', 'Digitar A ÚLTIMA FRUTA na página da paisagem.'],
        ['SUBTÍTULO', 'Novo texto menor', 'Um trailer com Koro e Oti, logo abaixo do título.'],
        ['ALINHAR', 'Guia rosa', 'As duas linhas começam na mesma borda, no céu.'],
        ['MARGEM', 'Longe da borda', 'Nada encosta na beira da tela.']
      ], `Teste outra fonte para o título e compare qual se lê melhor de longe.`),
      promptLabel: 'Pronto quando', prompt: 'Título e subtítulo alinhados na mesma borda, dentro da margem, sem cobrir Koro.',
      teacher: teacher(['2 min · Demonstro o título, o subtítulo e a guia rosa de alinhamento.', '8 min · A turma cria o título e salva o projeto antes do lanche.'], 'A guia rosa aparece quando a borda de um texto encontra a de outro.', 'Se alguém já terminou, peço uma segunda fonte para comparar, sem passar para a faixa.')
    },
    {
      title: 'Lanche', kicker: 'Intervalo', heading: 'Lanche até 20:05', lede: 'O projeto fica salvo no Canva. Na volta, chega o próximo pedido.', block: 1, pace: 'break',
      av9: checks([['Projeto', 'Salvo com o nome Aula 12 · seu nome.'], ['Na volta', 'Mesma página, mesmo posto.']]),
      teacher: teacher(['20 min · Lanche das 19:45 às 20:05.'], 'Comida e bebida longe dos computadores.', 'Quem ainda não fez o título faz no começo do pedido 2.')
    },
    {
      title: 'Pedido 2 · Faixa com nome', kicker: 'Pedido do cliente', heading: 'Apresentem Oti na cena do encontro',
      lede: 'Nome: OTI. Descrição: pinguim-de-magalhães.', block: 2,
      av9: commands([
        ['FAIXA', 'Elementos → Formas', 'Um retângulo escuro na parte de baixo, perto de Oti.'],
        ['TEXTO', 'Dois textos', 'OTI maior e pinguim-de-magalhães menor, dentro da faixa.'],
        ['ALINHAR', 'Mesma borda', 'Nome e descrição começam na mesma linha vertical.'],
        ['AGRUPAR', 'Shift + clique → Ctrl + G', 'Faixa e textos viram um bloco só.']
      ], `Acrescente uma barra fina colorida na ponta da faixa e confira se o rosto de Oti continua livre.`),
      promptLabel: 'Pronto quando', prompt: 'Faixa perto de Oti, sem cobrir o rosto, com nome e descrição alinhados e agrupados.',
      teacher: teacher(['2 min · Faço a chamada e apresento o pedido.', '3 min · Demonstro o retângulo, os dois textos e o agrupamento.', '15 min · A turma monta a faixa; circulo pedindo que mostrem a borda comum.'], 'Agrupar evita que a faixa e o texto se separem ao mover.', 'Se a faixa cobrir Oti, diminuo a faixa antes de mover o texto.')
    },
    {
      title: 'Pedido 3 · Legenda', kicker: 'Pedido do cliente', heading: 'Uma legenda que se lê na neve',
      lede: 'Ouçam o encontro com fones e escrevam o som principal entre colchetes ou uma frase curta.', block: 2,
      av9: stills([
        ['telas/colisao.jpg', 'DISPUTA', 'Legenda e faixa no mesmo lugar, ao mesmo tempo.'],
        ['telas/legenda.jpg', 'LEGÍVEL', 'Centro inferior, fundo escuro, sem disputar com a faixa.']
      ]),
      promptLabel: 'Pronto quando', prompt: 'Legenda centralizada embaixo, com fundo escuro em Efeitos → Fundo, até duas linhas, sem encostar na faixa. Terminou antes? Escreva uma legenda também para a cena da fruta.',
      teacher: teacher(['3 min · Mostro a disputa e a solução, e onde fica Efeitos → Fundo no texto.', '12 min · A turma cria a legenda; quem terminar escreve uma segunda legenda para a cena da fruta.'], 'Descrição de som entre colchetes é recurso de acessibilidade.', 'Se a legenda colidir com a faixa, subo a faixa ou separo os dois no tempo.')
    },
    {
      title: 'Pedido 4 · Cores da marca', kicker: 'Pedido do cliente', heading: 'O cliente mandou a identidade da marca',
      lede: 'Todos os textos e a faixa passam a usar estas cores e uma só família de fonte.', block: 2,
      av9: {type: 'table', variant: 'data', columns: ['Uso', 'Cor'], rows: [
        ['Título e nome', 'Branco · #FFFFFF'],
        ['Faixa e fundo da legenda', 'Azul-noite · #14213D'],
        ['Destaque', 'Laranja · #FCA311'],
        ['Fonte', 'Uma só família em todos os textos']
      ]},
      promptLabel: 'Pronto quando', prompt: 'Título, faixa e legenda com as cores da marca e a mesma fonte. Terminou antes? Use o laranja só em um detalhe por cena.',
      teacher: teacher(['2 min · Leio o pedido como cliente.', '13 min · A turma aplica as cores digitando o código no seletor de cor do Canva.'], 'Repetir cor e fonte é o que faz as peças parecerem da mesma marca. Sugerir fontes da conta gratuita.', 'Se alguém não achar o código de cor, mostro no projetor onde digitar o #.')
    },
    {
      title: 'Conferência do cliente', kicker: 'Antes do próximo pedido', heading: 'O cliente olha a tela de longe',
      lede: 'Afastem-se um pouco, sem levantar, e confiram.', block: 2,
      av9: checks([
        ['Título', 'Alinhado e dentro da margem?'],
        ['Faixa', 'Perto de Oti, sem cobrir o rosto?'],
        ['Legenda', 'Lê-se na neve, longe da faixa?'],
        ['Marca', 'Mesmas cores e fonte em tudo?']
      ]),
      promptLabel: 'Corrijam um ponto', prompt: 'Escolham o item mais fraco e ajustem agora.',
      teacher: teacher(['5 min · Cada um confere os quatro itens e corrige um.'], 'A conferência fecha o bloco antes do movimento.', 'Quem estiver atrasado usa esses minutos para terminar a legenda.')
    },
    {
      title: 'Pedido 5 · Movimento', kicker: 'Pedido do cliente', heading: 'Os textos entram em cena',
      lede: 'O cliente quer movimento, mas no mesmo estilo em todos os textos.', block: 3,
      av9: commands([
        ['ANIMAR', 'Selecionar o texto → Animar', 'Escolher uma animação de entrada simples.'],
        ['MESMO ESTILO', 'Título, faixa e legenda', 'A mesma animação nos três.'],
        ['TEMPO', 'Botão direito → Mostrar tempo', 'A legenda entra depois que a faixa sai.'],
        ['ASSISTIR', 'Reproduzir', 'Cada texto fica tempo de ser lido duas vezes.']
      ], `Teste uma animação de saída e compare com a versão sem saída.`),
      promptLabel: 'Pronto quando', prompt: 'Três textos com a mesma animação de entrada e tempo de leitura.',
      teacher: teacher(['2 min · Faço a chamada e apresento o pedido.', '3 min · Demonstro Animar e Mostrar tempo.', '15 min · A turma anima os textos; peço que mostrem o tempo de leitura.'], 'Uma animação só em todos os textos é decisão de identidade. Indicar só animações da conta gratuita; nem todos têm o plano pago.', 'Se a animação ficar rápida demais, aumento o tempo do texto na página.')
    },
    {
      title: 'Pedido 6 · Assinatura', kicker: 'Pedido do cliente', heading: 'Quem fez. De onde vêm as imagens.',
      lede: 'Uma página nova no fim, com fundo azul-noite e tudo agrupado no centro.', block: 3,
      av9: commands([
        ['PÁGINA', 'Adicionar página', 'No fim do vídeo, cerca de 4 segundos, fundo #14213D.'],
        ['TÍTULO', 'Texto centralizado', 'A ÚLTIMA FRUTA.'],
        ['CRÉDITOS', 'Texto menor', 'Remontagem: seu nome. Imagens: Caminandes 3: Llamigos, Blender Foundation, editadas. Licença CC BY 3.0.'],
        ['AGRUPAR', 'Perto e centralizado', 'Título e créditos formam um bloco só.']
      ], `Acrescente um ícone ou PNG transparente, sem cobrir os créditos.`),
      resource: {href: base + 'telas/assinatura.jpg', label: 'Ver assinatura de exemplo'},
      promptLabel: 'Pronto quando', prompt: 'Título e créditos centralizados e agrupados, com o endereço da licença: creativecommons.org/licenses/by/3.0',
      teacher: teacher(['3 min · Mostro a assinatura de exemplo e explico a licença CC BY.', '12 min · A turma cria a assinatura; confiro os créditos.'], 'Caminandes 3: Llamigos está sob CC BY 3.0: o crédito precisa de obra, autor, licença com o endereço e aviso de que as imagens foram editadas, porque o MP4 pode circular sem a pasta do kit.', 'Se faltar tempo, fica só título e créditos.')
    },
    {
      title: 'Exportar a versão 1', kicker: 'Primeira entrega', heading: 'Baixem a abertura em MP4',
      lede: 'Compartilhar → Baixar → Vídeo MP4.', block: 3,
      av9: checks([
        ['Formato', 'Vídeo MP4.'],
        ['Nome', 'abertura-horizontal.'],
        ['Conferir', 'Abrir o arquivo baixado e assistir até o fim.']
      ]),
      promptLabel: 'Enquanto baixa', prompt: 'Não fechem a aba do Canva até o download terminar.',
      teacher: teacher(['5 min · A turma exporta e abre o MP4 baixado.'], 'O download pode levar alguns minutos; a aba precisa ficar aberta.', 'Se o download falhar, tento de novo em 720p.')
    },
    {
      title: 'Pedido 7 · Versão para celular', kicker: 'Pedido do cliente', heading: 'Agora a abertura precisa caber no celular',
      lede: 'Vídeo vertical, 1080 × 1920. Os mesmos textos, reorganizados.', block: 4,
      av9: commands([
        ['CRIAR', 'Novo design', 'Vídeo para celular, 1080 × 1920.'],
        ['CENAS', 'Uploads', 'As mesmas cenas como fundo; ajustar o enquadramento.'],
        ['COPIAR', 'Ctrl + C → Ctrl + V', 'Trazer título, faixa, legenda e assinatura.'],
        ['REPOSICIONAR', 'Dentro da margem', 'Tudo legível, longe das bordas de cima e de baixo.']
      ], `Confira se a legenda não ficou atrás dos botões da tela do celular, perto da borda de baixo.`),
      promptLabel: 'Pronto quando', prompt: 'Título, faixa, legenda e assinatura reposicionados no formato vertical, sem cobrir rostos.',
      teacher: teacher(['2 min · Faço a chamada e apresento o pedido.', '3 min · Demonstro o novo design e a cópia dos textos.', '17 min · A turma reposiciona tudo na vertical.'], 'No celular, as bordas de cima e de baixo ficam cobertas pela interface. Redimensionar é recurso pago: criar um design novo e copiar os textos.', 'Sem tempo para tudo, priorizo título e assinatura.')
    },
    {
      title: 'Teste de cinco segundos', kicker: 'Colega do lado', heading: 'O colega entende em cinco segundos?',
      lede: 'Mostrem a versão vertical sem explicar. O colega responde do próprio lugar.', block: 4,
      av9: checks([
        ['Pergunta 1', 'Qual é o nome do vídeo?'],
        ['Pergunta 2', 'Quem é o personagem apresentado?'],
        ['Ajuste', 'Corrija o que o colega não encontrou e baixe o MP4 vertical.']
      ]),
      promptLabel: 'Segunda entrega', prompt: 'Baixem a versão vertical em MP4 com o nome abertura-celular.',
      teacher: teacher(['5 min · Teste em duplas vizinhas, ajuste e exportação.'], 'A pergunta é se encontrou, não se gostou.', 'Quem estiver sem colega ao lado testa comigo.')
    },
    {
      title: 'Banco de melhorias', kicker: 'Para quem concluiu tudo', heading: 'Ainda há tempo? O cliente aceita extras.',
      lede: 'Escolham um. Cada extra é uma nova versão, sem apagar as entregas.', block: 4, pace: 'extra',
      av9: checks([
        ['Faixa de Koro', 'Apresentar Koro do lado oposto da tela, no mesmo estilo.'],
        ['Versão para o feed', 'Uma versão quadrada, 1080 × 1080.'],
        ['Pictograma', 'Um ícone ou PNG transparente na assinatura, na cor de destaque.']
      ]),
      teacher: teacher([], 'Mostro para quem concluiu tudo, a qualquer momento do bloco. Os extras não alteram o horário das outras etapas.', 'Se ninguém concluiu, pulo este slide.')
    },
    {
      title: 'Encerramento', kicker: 'Duas entregas', heading: 'Duas versões, uma marca',
      lede: 'Mostrem as duas versões na própria tela.', block: 4,
      av9: checks([
        ['Horizontal', 'abertura-horizontal.mp4 baixado e assistido.'],
        ['Celular', 'abertura-celular.mp4 baixado e assistido.'],
        ['Canva', 'Projeto salvo com o seu nome.']
      ]),
      promptLabel: 'Feito', prompt: 'Vocês alinharam, agruparam, animaram e adaptaram a mesma abertura para dois formatos.',
      teacher: teacher(['3 min · Vejo trechos nos postos, ouço uma observação e encerro às 22:10.'], 'Sem fila de apresentações nem envio coletivo.', 'Se o tempo apertar, confiro só se os dois MP4 existem.')
    }
  ],
  appendDefaultClosing: false
};
