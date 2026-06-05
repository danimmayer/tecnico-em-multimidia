/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 07 — Luz, Exposição e o Triângulo de Exposição
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula presencial com câmeras de apoio, celulares (modo manual/pro), cadernos e notebooks.
 * Foco: usar ISO, abertura e velocidade com intenção e leitura técnica.
 * Prática dentro da sala. Histograma como ferramenta de leitura.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-EXPOSICAO': {
      tipo: 'conhecimento',
      titulo: 'Luz, exposição e o triângulo: ISO, abertura e velocidade como controles criativos da quantidade de luz e da estética da imagem',
      curto: 'Exposição e triângulo'
    },
    'CK-LUZ': {
      tipo: 'conhecimento',
      titulo: 'A luz como matéria-prima da fotografia: quantidade, qualidade, cor, direção e como a câmera a "vê" diferente do olho',
      curto: 'Luz e sensor'
    },
    'CK-HISTOGRAMA': {
      tipo: 'conhecimento',
      titulo: 'Histograma como ferramenta objetiva de leitura de exposição: tons, clipping e decisão de compensação',
      curto: 'Leitura de histograma'
    },
    'CT-FOTOGRAFAR': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de fotografia na construção, captura e seleção de imagens',
      curto: 'Prática fotográfica'
    },
    'CT-MATEMATICA': {
      tipo: 'tecnica',
      titulo: 'Aplicar fundamentos de matemática aplicada (paradas de exposição, equivalência, EV) para controlar a exposição de forma intencional',
      curto: 'Matemática da exposição'
    },
    'CT-ANALISE': {
      tipo: 'tecnica',
      titulo: 'Aplicar fundamentos de análise e construção da imagem para justificar escolhas visuais',
      curto: 'Análise de imagem'
    },
    'CS-TEMPO': {
      tipo: 'socioemocional',
      titulo: 'Aplicar os fundamentos da gestão do tempo para controle das atividades sob sua responsabilidade',
      curto: 'Gestão do tempo'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Chamada e introdução',
      descricao: 'Chamada. Revisão. A luz como matéria-prima da fotografia.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'O Triângulo de Exposição',
      descricao: 'ISO (sensibilidade e ruído), abertura do diafragma (f-stops e profundidade de campo).'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'Velocidade e matemática',
      descricao: 'Obturador (congelamento vs blur), stops, EV. Como os três controles trabalham juntos.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Histograma e prática manual',
      descricao: 'Leitura de histograma. Prática de exposição com câmera ou celular em modo manual.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Na aula passada discutimos composição: o que entra no quadro e como o olhar circula. Hoje vamos controlar a exposição: quanta luz entra, por quanto tempo e com qual sensibilidade. ISO, abertura e velocidade deixam de ser números soltos e passam a ser escolhas técnicas.',
      dica: 'Comece pedindo que abram o app de câmera do celular e digam: "quem aqui já mexeu em ISO, f/ ou velocidade manualmente?" Muitos nunca. Isso é o ponto de partida.'
    },
    'Programação da Noite': {
      fala: 'Quatro blocos. Primeiro entendemos a luz como matéria-prima. No segundo, o triângulo organiza abertura, velocidade e ISO. No terceiro, velocidade e stops mostram como compensar parâmetros. No último, usamos histograma e modo manual para praticar com sequência de captura, análise e correção.',
      dica: 'Lembre o lanche de 20 min após o Bloco 2. A prática do Bloco 4 precisa de tempo real de captura + revisão. Não corra o bloco 3.'
    },
    'Ponte com a Aula 06': {
      fala: 'Na Aula 06 vocês organizaram o quadro: assunto, fundo, linhas, corte. Hoje a pergunta muda: quanta luz entra nesse quadro e por quanto tempo? A mesma composição pode ficar congelada, borrada, com fundo desfocado ou com fundo nítido só mudando os três controles.',
      dica: 'Pergunta rápida: "Alguém já tirou foto em movimento e a mão saiu borrada?" Isso geralmente tem relação com velocidade baixa do obturador. Conecte com a decisão técnica da foto.'
    },
    'Chamada Bloco 2': {
      fala: 'Entramos no centro da aula: o triângulo de exposição. ISO, abertura e velocidade. Três controles, uma decisão de exposição.',
      dica: 'Peça que abram o modo Pro/Manual no celular antes de continuar. Quem não achar, o colega ajuda em 30 segundos.'
    },
    'Chamada Bloco 3': {
      fala: 'Depois do lanche, a velocidade vira ferramenta de tempo e a matemática dos stops ajuda a ajustar parâmetros com critério.',
      dica: 'Confirme que a turma voltou no horário. Se atrasou, encurte a teoria de EV e vá para a prática.'
    },
    'Chamada Bloco 4': {
      fala: 'Último bloco: histograma como leitura objetiva e prática em modo manual. É o bloco que precisa de mais tempo de sala.',
      dica: 'Distribua os exercícios por tempo. 12 min captura + 8 min revisão em duplas + 10 min de apresentações no projetor.'
    },
    'Luz como Matéria-Prima': {
      fala: 'A luz não ilumina a foto. A luz é a foto. Sem luz não há imagem. O que a câmera registra é a quantidade de fótons que bateu no sensor durante o tempo que o obturador ficou aberto, amplificado pela sensibilidade ISO e limitado pela abertura do diafragma.',
      dica: 'Analogia simples: abertura controla quanto entra, velocidade controla por quanto tempo, ISO controla a amplificação do sinal. Mude um e observe o que precisa compensar nos outros.'
    },
    'O Triângulo de Exposição': {
      fala: 'Três variáveis. Mudar uma sem tocar nas outras e a foto fica mais clara ou mais escura. Para manter a mesma "quantidade de luz" (exposição), quando você abre uma, fecha outra. Isso se chama compensação recíproca. O triângulo é o mapa dessa relação.',
      dica: 'Desenhe no quadro ou use o diagrama grande. Peça que repitam: "abrir diafragma = mais luz = preciso fechar obturador ou baixar ISO para compensar".'
    },
    'Abertura e Profundidade de Campo': {
      fala: 'Abertura é o buraco. f/1.8 é buraco grande: muita luz entra rápido, mas o foco é uma fatia fina (profundidade rasa). f/16 é buraco minúsculo: pouca luz, mas quase tudo fica nítido da frente até o fundo.',
      dica: 'Mostre os exemplos visuais. Pergunte: quando você quer desfocar o fundo de um retrato, qual f/ você escolhe? E para foto de paisagem com montanhas nítidas?'
    },
    'ISO e Ruído': {
      fala: 'ISO é o "volume" do sensor. ISO 100 é limpo, mas precisa de mais luz. ISO 6400 "ouve" mais, mas traz ruído, granulação, perda de cor e detalhe. No celular o ruído aparece mais rápido que em câmeras grandes.',
      dica: 'Use o par de imagens ISO 100 vs 6400. Aproxime no projetor. Os alunos vão ver o ruído na pele. "Vocês aceitariam esse ruído num trabalho profissional?"'
    },
    'Velocidade do Obturador': {
      fala: 'É o tempo que o sensor fica registrando luz. 1/1000 de segundo congela um gesto rápido. 1/15 já pode tremer na mão. Com velocidade baixa, o movimento aparece como rastro.',
      dica: 'Mostre os dois lados da imagem de movimento. Use exemplo de sala: colega batendo palma sentado. Primeiro congelar, depois deixar o rastro aparecer.'
    },
    'Os Três Juntos': {
      fala: 'Não existe exposição correta em sentido absoluto. Existe uma exposição adequada ao objetivo da foto. Se a prioridade é fundo desfocado e pessoa sem tremido, a abertura e a velocidade vêm primeiro; ISO e compensação entram para manter essa escolha possível.',
      dica: 'Exercício oral rápido, dentro da sala: "Quero fotografar uma caneta sobre a mesa com o fundo desfocado e sem tremido. Quais parâmetros priorizo?"'
    },
    'Matemática dos Stops': {
      fala: 'Cada parada (stop) dobra ou divide a luz por dois. De f/5.6 para f/8 você perde uma parada. De 1/60 para 1/30 você ganha uma parada. De ISO 200 para 400 ganha uma. O medidor da câmera trabalha em terços de parada hoje, mas o raciocínio é o mesmo.',
      dica: 'Use o diagrama de stops. Peça que deem três combinações equivalentes para uma cena imaginária. Isso é o coração da matemática aplicada da aula.'
    },
    'Exercício de Equivalência': {
      fala: 'Agora é a vez deles. Dê 90 segundos. Cada um escreve três linhas no caderno. Depois troquem com o vizinho e critiquem: "essa compensa mesmo?" O erro mais comum é esquecer que quando você abre o diafragma você precisa fechar outro parâmetro.',
      dica: 'Circule e veja os cadernos. Não corrija todos; pegue 2-3 exemplos interessantes e mostre no projetor para a turma discutir.'
    },
    'EV e Compensação': {
      fala: 'O fotômetro da câmera interpreta a cena a partir de uma referência média. Em cenas muito claras, tende a escurecer; em cenas muito escuras, tende a clarear. A compensação de exposição serve para o fotógrafo corrigir essa interpretação.',
      dica: 'Use exemplos da sala: folha branca, mochila preta, parede clara e canto escuro. "Se a foto saiu cinza demais, que teste faço no EV?"'
    },
    'Controles no Celular': {
      fala: 'Abra agora o app de câmera do celular. Procure "Pro", "Manual", "P" ou "More". Toque e veja os três controles aparecerem. Não tenha medo de mexer. Qualquer mudança que você fizer pode ser desfeita no próximo toque.',
      dica: 'Se alguém não encontrar, peça para o colega do lado ajudar. Em 2 minutos todos devem estar com os controles visíveis.'
    },
    'O Histograma': {
      fala: 'O histograma é uma leitura objetiva da foto. Eixo horizontal: do preto puro (sombra) até o branco puro (realce). Altura = quantidade de pixels naquele tom. Se a montanha toca a parede esquerda, há sombras sem detalhe. Se toca a direita, há áreas claras estouradas.',
      dica: 'Use as 4 imagens de exemplo. Peça que descrevam o que veem no histograma antes de ver a foto pequena. Depois invertam: "olha o histo, como deve estar a foto?"'
    },
    'Prática Dominando a Exposição': {
      fala: 'Agora é mão na massa, mas tudo dentro da sala. Cada dupla escolhe uma câmera ou celular em modo manual/pro e faz uma sequência curta usando mesa, caderno, mochila, cadeira, parede e colegas sentados. O objetivo não é fazer a foto mais bonita da sala. É entender o que cada controle muda e conseguir explicar a decisão.',
      dica: 'Reforce antes de começar: sem janela, sem corredor e sem circular pela unidade. Distribua os exercícios por tempo: 12 min captura em sala + 8 min revisão em duplas. Depois 10 min de 4-5 alunos mostrarem no projetor uma foto e explicarem a escolha dos 3 parâmetros.'
    },
    'Como ver histograma no celular': {
      fala: 'O histograma não é luxo de câmera profissional. Lightroom Mobile gratuito, Open Camera no Android e alguns modos Pro nativos mostram o gráfico. Ative agora e não desligue mais.',
      dica: 'Faça um teste ao vivo: tire uma foto escura e outra clara, abra o histograma e compare onde a "montanha" se concentra.'
    },
    'Rodada de Prática': {
      fala: 'Cada um mostra uma foto e explica os três parâmetros em 30–45 segundos: objetivo, parâmetro principal, ajuste feito e o que o histograma mostrou.',
      dica: 'Se sobrar tempo, peça que outro aluno tente reproduzir a foto usando só a descrição dos parâmetros. Isso testa se a explicação foi clara.'
    },
    'Bilhete de Saída': {
      fala: 'Antes de ir, escolha um treino para esta semana: velocidade, abertura ou histograma. Exposição melhora com repetição e comparação.',
      dica: 'Recolha 3 respostas no caderno se precisar diagnosticar a turma na próxima aula.'
    },
    'Encerramento': {
      fala: 'Exposição não é tentativa aleatória. É escolha técnica. Quando o aluno entende os três controles, passa a decidir com mais segurança. O histograma ajuda a verificar se a decisão funcionou.',
      dica: 'Gancho para Aula 08: agora que controlamos quanta luz entra, vamos falar das características da luz: cor, temperatura, direção, luz natural, luz artificial e modificadores.'
    },
    'Gancho Aula 08': {
      fala: 'Na próxima aula a luz deixa de ser só quantidade. Vamos observar temperatura de cor, direção, luz natural, luz artificial e como isso se relaciona com o triângulo que vocês praticaram hoje.',
      dica: 'Peça que tragam o celular carregado e observem, durante a semana, como a mesma cena muda com luz forte, luz fraca, luz quente e luz fria.'
    }
  };

  global.SENAI_PEDAGOGY = {
    COMPETENCIAS: COMPETENCIAS,
    BLOCOS: BLOCOS,
    NOTES: NOTES,
    TIMELINE: [],
    SEMIOTIC: {},
    COMPARE: {},
    META: {
      uc: 'Fundamentos de Fotografia Digital e de Semiótica',
      aula: 'Aula 07 — Luz, Exposição e o Triângulo de Exposição',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
