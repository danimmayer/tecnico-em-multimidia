/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 08 — Ambiente, Luz Natural e Artificial
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula presencial com celulares, cadernos, notebooks/Chromebooks, câmera
 * fotográfica de apoio e ring lights. Foco: ler e controlar a luz do
 * ambiente antes da edição.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-AMBIENTE': {
      tipo: 'conhecimento',
      titulo: 'Ambiente fotográfico como construção visual: luz, cor, espaço, sombra e fundo como elementos da narrativa da imagem',
      curto: 'Ambiente e narrativa'
    },
    'CK-NATURAL': {
      tipo: 'conhecimento',
      titulo: 'Luz natural: horário, direção, golden hour, blue hour, luz direta, luz difusa e leitura de sombras',
      curto: 'Luz natural'
    },
    'CK-COR': {
      tipo: 'conhecimento',
      titulo: 'Temperatura de cor, escala Kelvin, balanço de branco e correção de dominantes em captura e edição',
      curto: 'Temperatura e WB'
    },
    'CK-ARTIFICIAL': {
      tipo: 'conhecimento',
      titulo: 'Luz artificial: luz contínua, flash, LED, ring light, modificadores e esquemas clássicos de iluminação',
      curto: 'Luz artificial'
    },
    'CT-ILUMINAR': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de iluminação para modificar direção, intensidade, qualidade e cor da luz em uma cena',
      curto: 'Controle de luz'
    },
    'CT-CAPTURA': {
      tipo: 'tecnica',
      titulo: 'Produzir e selecionar imagens fotográficas em diferentes condições de luz usando câmera ou celular',
      curto: 'Captura fotográfica'
    },
    'CT-EDICAO': {
      tipo: 'tecnica',
      titulo: 'Aplicar ajustes básicos de exposição, temperatura e matiz para preservar a intenção de luz da captura',
      curto: 'Ajuste e edição'
    },
    'CS-ORGANIZACAO': {
      tipo: 'socioemocional',
      titulo: 'Aplicar princípios de organização no posto de trabalho, incluindo circulação, cuidado com equipamentos e clareza de função no set',
      curto: 'Organização do set'
    },
    'CS-TEMPO': {
      tipo: 'socioemocional',
      titulo: 'Gerenciar o tempo de captura, seleção, edição e apresentação curta dentro de uma atividade prática',
      curto: 'Gestão do tempo'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Chamada e ponte',
      descricao: 'Chamada. Da exposição para o caráter da luz. Ambiente como coautor da imagem.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Luz natural',
      descricao: 'Horário, direção, golden hour, blue hour, janela, luz direta, luz difusa e leitura de sombras.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'Cor e luz artificial',
      descricao: 'Temperatura Kelvin, balanço de branco, ring light, LED, flash, modificadores e luz mista.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Prática luz e sombra',
      descricao: 'Mesmo objeto em cinco condições de luz. Seleção, ajuste básico e explicação técnica curta.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Na aula passada controlamos quanta luz chega ao sensor com ISO, abertura e velocidade. Hoje vamos controlar o caráter dessa luz: de onde ela vem, que cor tem, como a sombra termina e como o ambiente muda a fotografia antes da edição.',
      dica: 'Comece pedindo que observem a sala sem fotografar: teto, janela, projetor, telas, ring lights e sombras. A aula já começa pela leitura do ambiente.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro movimentos. Primeiro fazemos a ponte com exposição. Depois estudamos luz natural e direção. Após o intervalo, entramos em temperatura de cor, balanço de branco e luz artificial. No último bloco, cada grupo faz uma sequência curta com o mesmo objeto em cinco condições de luz e explica uma decisão técnica.',
      dica: 'Proteja o tempo do Bloco 4. Se o Bloco 2 render discussão demais, deixe golden hour e blue hour no essencial e guarde energia para a prática.'
    },
    'Ponte com a Aula 07': {
      fala: 'Na Aula 07 a pergunta era quanto de luz entra. Hoje a pergunta é que luz é essa. Duas fotos podem ter a mesma exposição e parecer completamente diferentes porque a direção, a cor e a borda da sombra mudam a leitura da imagem.',
      dica: 'Pergunta para a turma: "o que muda numa selfie perto da janela e numa selfie sob lâmpada do teto?" Não faça a prática com rosto; use a pergunta só para ativar repertório.'
    },
    'Ambiente é Coautor': {
      fala: 'Antes da câmera, existe o ambiente. Ele oferece fontes de luz, cores, reflexos, sombras e obstáculos. Um fotógrafo amador costuma olhar só o assunto; um fotógrafo mais consciente lê o espaço e decide como aproveitar ou corrigir a luz que já está ali.',
      dica: 'Peça que apontem três fontes de luz visíveis na sala. Depois pergunte qual delas parece mais quente, mais fria, mais direta e mais difusa.'
    },
    'Chamada Bloco 2': {
      fala: 'Agora vamos para a luz natural. Mesmo em sala, a ideia é entender a lógica: a luz natural muda com horário, direção, nuvem, janela e distância. O controle começa por posicionar o objeto e a câmera.',
      dica: 'Faça a chamada rapidamente e já peça para deixarem o celular carregado/à mão. A prática-relâmpago de direção usa a lanterna do celular.'
    },
    'Mapa da Luz Natural': {
      fala: 'A mesma mesa muda antes de mexermos na câmera. No começo ou fim do dia, a luz baixa aquece e alonga sombras. Perto do meio-dia, a luz fica mais alta, direta e contrastada. Na blue hour, o ambiente esfria e qualquer fonte artificial aparece mais.',
      dica: 'Use a imagem como leitura guiada: peça que descrevam primeiro a sombra, depois a cor, depois a sensação. Evite transformar em regra de horário perfeito.'
    },
    'Golden e Blue Hour': {
      fala: 'Golden hour, meio-dia e blue hour pedem decisões diferentes. Golden hour oferece cor quente e lateralidade. Meio-dia pode criar sombra muito marcada, mas funciona para textura, arquitetura e recortes gráficos. Blue hour abre espaço para contraste entre ambiente frio e luz artificial.',
      dica: 'Reforce que horário não salva foto sozinho. O aluno precisa escolher o que fazer com contraste, direção e cor em cada condição.'
    },
    'Direção da Luz': {
      fala: 'A sombra entrega de onde a luz veio. Luz frontal revela detalhe e achata volume. Luz lateral mostra textura e forma. Contra-luz cria recorte e pode virar silhueta. Luz zenital concentra sombra embaixo e costuma dramatizar.',
      dica: 'Faça a prática-relâmpago com uma lanterna de celular e um objeto na mesa. Sem apontar para rosto. Primeiro peça que localizem a sombra; só depois nomeiem a direção.'
    },
    'Borda da Sombra': {
      fala: 'A qualidade da luz não é força da luz. É como a sombra termina. Se a borda da sombra é nítida, a luz é direta e marcada. Se a transição é gradual, a luz é difusa e suave. Uma fonte grande e próxima suaviza; uma fonte pequena ou distante deixa a sombra mais marcada.',
      dica: 'Use a mão ou um objeto perto da mesa. Aproxime e afaste a lanterna; depois difunda com uma folha branca sem cobrir completamente o aparelho.'
    },
    'Janela como Ferramenta': {
      fala: 'A janela é uma fonte grande. Perto dela, a luz é mais intensa e suave. Longe dela, a luz cai e o ambiente começa a dominar. Um caderno branco pode devolver luz para a sombra e criar preenchimento simples.',
      dica: 'Se a sala não tiver janela útil no momento, simule com ring light ou lanterna rebatida em parede clara. A lógica de fonte grande, distância e reflexão permanece.'
    },
    'Chamada Bloco 3': {
      fala: 'Depois do intervalo, a luz ganha cor. A câmera tenta decidir o que é branco; nós vamos aprender quando confiar no automático e quando assumir controle pela temperatura, matiz e fonte principal.',
      dica: 'Se houver aparelhos diferentes, ótimo: os alunos vão ver que cada celular interpreta o branco de um jeito.'
    },
    'Laboratório de Cor': {
      fala: 'Antes de explicar Kelvin, vamos criar a necessidade do conceito. Cada grupo usa ring light, celulares, câmera e caderno para comparar como o branco muda conforme fonte, direção e aparelho. A meta é perceber o problema antes de nomear a escala.',
      dica: 'Mantenha todos sentados nos próprios grupos. Dê tempo fechado: dois minutos para preparar, dez para capturar, cinco para comparar. Circule só para destravar grupos; não deixe virar exploração livre de equipamento.'
    },
    'Escala Kelvin': {
      fala: 'Kelvin organiza a temperatura de cor. Luz de vela e tungstênio aparece mais quente; luz do dia fica perto de 5500K; sombra e céu aberto aparecem mais frios. O importante é perceber que branco muda conforme a fonte.',
      dica: 'Não aprofunde demais a física. Use a escala como ferramenta prática: menor número aquece visualmente, maior número esfria visualmente.'
    },
    'Balanço de Branco': {
      fala: 'Balanço de branco é a forma como a câmera decide o que deve parecer neutro. O automático é útil, mas pode esfriar uma foto e aquecer a próxima. Em sequência, escolher o branco principal e manter coerência é mais importante que acertar um número decorado.',
      dica: 'Peça que abram câmera ou editor e procurem temperatura/calor, matiz ou balanço de branco. Não precisa que todos tenham o mesmo app; a lógica é escolher o neutro e comparar.'
    },
    'Luz Artificial Disponível': {
      fala: 'Luz artificial dá repetição. Ring light, lanterna do celular, LED e flash permitem repetir uma condição em outro horário. Cada uma tem compromisso: ring light é fácil, mas pode achatar; lanterna cria sombra marcada; flash congela; LED contínuo mostra o resultado antes.',
      dica: 'Mostre fisicamente o ring light se estiver disponível. Faça um movimento simples: eixo frontal, depois lateral. A diferença aparece rápido.'
    },
    'Modificadores e Improvisos': {
      fala: 'Modificar luz é controlar seu caminho. Difusor suaviza, refletor preenche, bandeira bloqueia, snoot concentra. Em sala, caderno branco, folha, cartolina e parede podem funcionar como recursos de iluminação.',
      dica: 'Reforce organização: nada de cabo atravessado, celular no chão ou ring light instável. A qualidade do set também é competência profissional.'
    },
    'Esquemas Clássicos': {
      fala: 'Rembrandt, butterfly, split e loop são nomes para padrões de sombra. Eles ajudam a conversar no set e repetir uma intenção. Não são poses obrigatórias, nem precisam virar retrato; a competência é reconhecer onde a luz está e que sombra ela produz.',
      dica: 'Use objeto, busto, mochila ou garrafa para demonstrar. Evite colocar aluno como modelo improvisado; isso desvia a aula e expõe colegas sem necessidade.'
    },
    'Luz Mista': {
      fala: 'Luz mista aparece quando janela, teto, tela, ring light e celular entram juntos. Às vezes isso enriquece a imagem. Às vezes cria pele estranha, papel azul ou sombra laranja. A solução começa escolhendo qual fonte manda na foto.',
      dica: 'Pergunte: "o que precisa ficar neutro nesta foto?" Produto? Papel? Rosto? Fundo? A resposta define o balanço de branco principal.'
    },
    'Chamada Bloco 4': {
      fala: 'Último bloco: prática. Agora todos vão produzir uma sequência curta. O objetivo não é só fazer a foto mais bonita, mas conseguir explicar o que a luz fez e que ajuste foi necessário.',
      dica: 'Monte grupos pequenos com funções fixas: uma pessoa fotografa, uma ilumina e uma registra no caderno. A câmera e o ring light entram como estação de trabalho, não como item livre.'
    },
    'Cinco Leituras da Mesma Cena': {
      fala: 'Antes da prática, observem cinco variações do mesmo tipo de assunto. A foto não muda porque o objeto ficou mais interessante; muda porque a fonte, a direção, a borda da sombra e a cor da luz mudaram. A tarefa de vocês é reproduzir esse raciocínio com os recursos da sala.',
      dica: 'Passe rápido por cada foto: lateral, frontal, contra-luz, ring light e luz mista. Não deixe virar análise longa; este slide prepara a captura.'
    },
    'Prática Luz e Sombra': {
      fala: 'Escolham um objeto simples e façam cinco condições: frontal natural, lateral natural, contra-luz, lanterna do celular e mistura de fontes. Mantenham o objeto reconhecível. Mudem a luz com intenção e anotem o que mudou.',
      dica: 'Sugira caderno, garrafa, caixa, câmera ou material de desenho como objeto. Faça rodízio por condição e recolha rapidamente a atenção antes de liberar o próximo teste.'
    },
    'Ficha Técnica e Edição': {
      fala: 'Depois da captura, cada grupo escolhe uma foto, não todas. A edição deve provar a leitura da luz: corrigir exposição, temperatura e matiz sem apagar a condição de captura. O antes e depois precisa mostrar decisão, não filtro pronto.',
      dica: 'Se os Chromebooks estiverem disponíveis, podem usar editor online ou app instalado. Se não, o editor nativo do celular já serve. O importante é comparar antes/depois e explicar a correção.'
    },
    'Roteiro de Apresentação': {
      fala: 'A apresentação é curta: fonte, direção, qualidade e correção. Em 45 segundos, o grupo mostra que entendeu por que aquela foto ficou daquele jeito.',
      dica: 'Controle o tempo com firmeza. Quatro ou cinco apresentações já bastam para fechar a aula sem alongar demais.'
    },
    'Bilhete de Saída': {
      fala: 'Antes de encerrar, cada um escreve uma observação de luz. A meta é sair com uma frase concreta sobre sombra, temperatura ou balanço de branco, não com uma definição decorada.',
      dica: 'Se precisar diagnosticar a turma, peça três leituras em voz alta: uma sobre direção, uma sobre borda da sombra e uma sobre cor.'
    },
    'Encerramento': {
      fala: 'Hoje a técnica deixou de ser só número. Luz é direção de sentido: revela, esconde, aquece, esfria, dramatiza, suaviza e organiza a atenção. Na próxima aula, essa leitura entra em produção dirigida com fluxo de trabalho mais completo.',
      dica: 'Gancho para Aula 09: peça que tragam celular carregado e pensem em um objeto simples que possa virar miniensaio ou peça de comunicação visual.'
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
      aula: 'Aula 08 — Ambiente, Luz Natural e Artificial',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
