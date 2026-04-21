/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 02 — Formação da Imagem Digital
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * Baseado no 00_Planejamento_Geral_UC.docx e no PPTX original.
 * =======================================================================
 * Mesma estrutura de pedagogy-data.js (Aula 01) — trocar apenas os dados.
 * Aula 100% projeção (sem computador para alunos). Dinâmicas via QR e
 * exercícios coletivos no quadro branco.
 * ======================================================================= */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* COMPETÊNCIAS · retiradas do Plano de Aula oficial                   */
  /* ------------------------------------------------------------------ */
  const COMPETENCIAS = {
    // Objetivos de Conhecimento
    'CK-IMG': {
      tipo: 'conhecimento',
      titulo: 'Formação da imagem digital: resolução, profundidade de cor, sensor de imagem, memória e formatos de arquivos',
      curto: 'Formação da imagem digital'
    },
    'CK-ORG': {
      tipo: 'conhecimento',
      titulo: 'Organização do local de trabalho: espaço, atividades, materiais e tempo',
      curto: 'Organização do trabalho'
    },
    // Capacidades Técnicas
    'CT-ANAL': {
      tipo: 'tecnica',
      titulo: 'Aplicar fundamentos de análise e construção da imagem',
      curto: 'Análise e construção da imagem'
    },
    'CT-INFO': {
      tipo: 'tecnica',
      titulo: 'Aplicar os princípios de informática na utilização de ferramentas para o auxílio nas atividades',
      curto: 'Princípios de informática'
    },
    'CT-MAT': {
      tipo: 'tecnica',
      titulo: 'Aplicar fundamentos de matemática aplicada',
      curto: 'Matemática aplicada'
    },
    // Capacidades Socioemocionais
    'CS-ORG': {
      tipo: 'socioemocional',
      titulo: 'Aplicar os princípios de organização no seu posto de trabalho',
      curto: 'Organização no trabalho'
    }
  };

  /* ------------------------------------------------------------------ */
  /* BLOCOS · roteiro da noite · chamada no início de cada bloco         */
  /* ------------------------------------------------------------------ */
  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Abertura e ponte com a Aula 01',
      descricao: 'Chamada. Revisão rápida da Aula 01. Pergunta-gatilho: "Como a luz vira dado?"'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Captura: sensor, padrão Bayer, pixel e resolução',
      descricao: 'Da luz ao pixel. Sensor CMOS × CCD. Mosaico Bayer. Megapixels, DPI × PPI.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'Cor, profundidade e formatos de arquivo',
      descricao: 'Profundidade de bits, espaços de cor, balanço de branco, ISO e formatos. (Lanche 20 min após o Bloco 2)'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Workspace, matemática da imagem e EXIF',
      descricao: 'Organização de pastas. Cálculo coletivo de resolução. Análise de EXIF. Pipeline completo. Encerramento.'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* NOTES · notas de fala por slide (indexado por data-title)           */
  /* ------------------------------------------------------------------ */
  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Na Aula 01 vimos 200 anos de fotografia. Hoje vamos entender o que acontece dentro do celular de vocês quando o botão da câmera é apertado.',
      dica: 'Abra com uma foto tirada do próprio celular, projetada na tela. Pergunte aos alunos: "o que vocês acham que está acontecendo aqui dentro quando a foto é tirada?"'
    },
    'Programação da Noite': {
      fala: 'Quatro blocos. Chamada no início de cada um. Lanche de 20 minutos depois do Bloco 2.',
      dica: 'Hoje o aluno não usa computador. Apenas projeção em sala e, no máximo, celular para votar nas enquetes por QR code. Deixe isso claro logo no início.'
    },
    'Revisão Aula 01': {
      fala: 'Três pontos da Aula 01 que voltam hoje. O primeiro é a câmera obscura, princípio óptico que está na base de toda câmera. O segundo é a ética da imagem. O terceiro é a semiótica: ícone, índice e símbolo.',
      dica: 'Use a imagem de cada card para apoiar. Pergunte: "quem se lembra de quantas horas de exposição levou a foto do Niépce?". A resposta é 8 horas. Use a pergunta para introduzir o salto do analógico para o digital.'
    },
    'Como Nasce uma Imagem Digital': {
      fala: 'Fluxo em cinco etapas: luz, lente, sensor, conversor A/D e arquivo. Cada etapa tem escolhas técnicas que afetam a imagem final.',
      dica: 'Percorra o diagrama devagar, apontando cada caixa. Depois volte à foto de abertura e diga: "tudo isso aconteceu em 1/60 de segundo, no instante em que vocês apertaram o botão".'
    },
    'O Sensor Digital': {
      fala: 'O sensor é uma matriz de milhões de fotossítios. Cada um funciona como um balde que coleta fótons durante a exposição. Mais fótons geram mais sinal, que se traduz em pixel mais claro.',
      dica: 'Use a analogia da chuva. Cada fotossítio é um balde. O obturador da câmera abre e fecha como uma janela. No fim da exposição, o sensor mede quanta água há em cada balde. Esse número determina o brilho do pixel.'
    },
    'CMOS × CCD': {
      fala: 'O CCD foi padrão até cerca de 2005. O CMOS venceu por ser mais barato, consumir menos energia e ler mais rápido. Tanto celulares quanto câmeras profissionais modernas usam CMOS.',
      dica: 'Use o painel Expandir (2) para explorar vantagens e desvantagens. Use o Bônus (3) se houver tempo, para contar a história do CCD, de Willard Boyle e do Nobel de Física de 2009.'
    },
    'Padrão Bayer': {
      fala: 'O sensor não enxerga cor, só intensidade de luz. O mosaico Bayer coloca um filtro de cor sobre cada fotossítio: 50% verde (porque o olho humano é mais sensível ao verde), 25% vermelho e 25% azul.',
      dica: 'Aponte a matriz à direita do slide. Depois aponte a segunda imagem, que mostra a mesma cena após o demosaicing. Ligue o Expandir (2) para detalhar o cálculo das cores vizinhas.'
    },
    'O Pixel': {
      fala: 'Pixel vem de "picture element", ou elemento de imagem. É a menor unidade endereçável de uma foto digital. Uma cor sólida, uma posição.',
      dica: 'Percorra os três estágios de zoom no slide. Pergunte em qual deles os alunos começam a enxergar os quadrados individuais. A transição do zoom 800% para 3200% costuma impressionar.'
    },
    'Resolução': {
      fala: 'Resolução é uma multiplicação simples: largura por altura. Uma imagem de 4000 por 3000 pixels tem 12 milhões de pixels, ou 12 megapixels. Mais megapixels não significa mais qualidade.',
      dica: 'Pergunte à turma: "entre um celular de 50 MP e uma câmera profissional de 24 MP, qual entrega melhor qualidade?". Use a resposta para puxar o tema do tamanho do pixel e do tamanho do sensor.'
    },
    'DPI × PPI': {
      fala: 'PPI é a densidade de pixels em uma tela. DPI é a densidade de pontos em uma impressão. Na prática o mercado usa "DPI" para os dois. O que muda é a distância de visualização.',
      dica: 'Valores de referência: web a 72 PPI, impressão doméstica a 150 DPI, impressão profissional a 300 DPI, outdoor visto a 5 metros a 72 DPI.'
    },
    'Quiz de Resolução': {
      fala: 'Três perguntas de múltipla escolha. A turma vota pelo QR ou à mão levantada. A resposta correta aparece no slide após o voto.',
      dica: 'Se a turma estiver tímida, use a mão levantada. O objetivo é praticar os cálculos antes do exercício formal do Bloco 4.'
    },
    'Profundidade de Bits': {
      fala: 'Imagem em 8 bits tem 256 níveis por canal, o que resulta em 16,7 milhões de cores. Em 16 bits são 65.536 níveis por canal, ou 281 trilhões de cores. A diferença aparece principalmente na edição.',
      dica: 'Mostre o gradiente 8 bits contra o gradiente 16 bits. No 8 bits, as faixas são visíveis. No 16 bits, a transição é limpa. Explique que o RAW sempre salva em 12, 14 ou 16 bits.'
    },
    'Espaço de Cores': {
      fala: 'sRGB é o padrão universal para web, celulares e impressão doméstica. Adobe RGB é maior e serve para impressão profissional. ProPhoto é o maior dos três e só faz sentido em fluxo RAW.',
      dica: 'Regra prática a ser repetida: "na dúvida, use sRGB". Adobe RGB só para gráfica. ProPhoto nunca deve ser exportado para a web.'
    },
    'Balanço de Branco': {
      fala: 'Cada fonte de luz tem uma temperatura de cor diferente, medida em graus Kelvin. Vela cerca de 2.000 K. Lâmpada quente cerca de 3.000 K. Sol ao meio-dia 5.500 K. Nublado 6.500 K. Sombra 7.500 K.',
      dica: 'Percorra a faixa de cores no slide. Se possível, mostre a mesma foto em diferentes balanços de branco. Pergunte: "em quantos Kelvin vocês acham que está o pôr do sol?". A resposta fica em torno de 2.500 a 3.500 K.'
    },
    'ISO e Ruído': {
      fala: 'O ISO amplifica o sinal captado pelo sensor. Junto com o sinal, o ruído também é amplificado. ISO baixo entrega qualidade máxima. ISO alto é recurso de emergência para salvar uma foto em pouca luz.',
      dica: 'Compare os quatro tiles de ISO no slide (100, 400, 1.600 e 6.400). Peça para os alunos apontarem onde começam a ver granulação. No 6.400 o ruído é evidente.'
    },
    'Formatos de Arquivo': {
      fala: 'RAW é o negativo digital, guarda todos os dados brutos. JPEG é a foto processada e comprimida. PNG é lossless e aceita transparência. TIFF é o formato profissional para impressão.',
      dica: 'Use a tabela de decisão do slide. Regra rápida: "para editar, RAW. Para entregar, JPEG. Para gráfico com transparência, PNG. Para gráfica profissional, TIFF".'
    },
    'Workspace Digital': {
      fala: 'A organização de arquivos é um hábito que evita perda de trabalho. Use pastas por data no formato AAAA-MM-DD, junto com o nome do projeto. Padronize o nome dos arquivos.',
      dica: 'Projete a árvore de pastas no slide e explique cada subpasta. Pergunte: "quem aqui já perdeu uma foto importante?". Praticamente todos vão levantar a mão.'
    },
    'Matemática da Imagem': {
      fala: 'Três problemas para resolver em conjunto no quadro. Apenas papel e caneta, sem calculadora. A fórmula básica é uma só: pixels divididos por DPI resultam em polegadas.',
      dica: 'A atividade é coletiva. Chame alunos ao quadro. Se ninguém se voluntariar, resolva explicando passo a passo. Lembre de converter polegadas para centímetros multiplicando por 2,54.'
    },
    'Metadados EXIF': {
      fala: 'Cada foto carrega um currículo invisível: modelo da câmera, lente, ISO, abertura, velocidade, GPS e data. Tudo isso fica no metadado EXIF, que significa Exchangeable Image File Format.',
      dica: 'Projete três fotos anônimas com o EXIF aberto em cada uma. Peça para os alunos reconstruírem a cena. Era dia ou noite? Foi tirada na mão ou no tripé? Ambiente claro ou escuro?'
    },
    'Pipeline Completo': {
      fala: 'Síntese visual da noite: do fóton ao arquivo, em oito etapas. Cada etapa apresenta escolhas que afetam as seguintes.',
      dica: 'Percorra o diagrama nomeando cada etapa em uma frase. No final, retome a foto de abertura e diga: "agora vocês sabem o que aconteceu ali dentro".'
    },
    'Encerramento': {
      fala: 'Resumo em quatro pontos. Próxima aula: Semiótica I, o universo dos signos. Peça para os alunos pesquisarem quem foi Charles Sanders Peirce antes da próxima aula.',
      dica: 'Gere o relatório pressionando a tecla R. Confirme a chamada do Bloco 4. Libere a turma apenas depois do resumo, que é a parte que fixa o conteúdo.'
    }
  };

  /* ------------------------------------------------------------------ */
  /* TIMELINE · marcos da imagem digital                                 */
  /* ------------------------------------------------------------------ */
  const TIMELINE = [
    { ano: 1957, label: '1957', titulo: 'Primeira imagem digital',   texto: 'Russell Kirsch escaneia a foto de seu filho (176×176 px). A primeira imagem digital da história.' },
    { ano: 1969, label: '1969', titulo: 'CCD · Bell Labs',            texto: 'Willard Boyle e George Smith inventam o Charge-Coupled Device. Nobel de Física em 2009.' },
    { ano: 1975, label: '1975', titulo: 'Sasson (Kodak)',             texto: 'Primeira câmera digital: 0,01 MP, 3,6 kg. Guardada pela Kodak, que não quis canibalizar o filme.' },
    { ano: 1976, label: '1976', titulo: 'Mosaico Bayer',              texto: 'Bryce Bayer (Kodak) patenteia o filtro RGB que até hoje domina todos os sensores de câmera.' },
    { ano: 1981, label: '1981', titulo: 'Sony Mavica',                texto: 'Primeira câmera "fotográfica" eletrônica comercial. Ainda analógica, gravava em disquete.' },
    { ano: 1991, label: '1991', titulo: 'Kodak DCS-100',              texto: 'Primeira DSLR digital profissional. 1,3 MP, US$ 13.000. Era um Nikon F3 modificado.' },
    { ano: 1994, label: '1994', titulo: 'Apple QuickTake',            texto: 'Primeira câmera digital de consumo. 0,3 MP. Fotos brancas e borradas, mas abriu a estrada da revolução.' },
    { ano: 2000, label: '2000', titulo: 'Sharp J-SH04',               texto: 'Primeiro celular com câmera. 0,11 MP. Lançado apenas no Japão. Ninguém imaginava o impacto mundial que viria.' },
    { ano: 2007, label: '2007', titulo: 'iPhone 1 · 2 MP',            texto: 'O smartphone começa a substituir a câmera compacta. 1 MP, sem autofoco, sem flash. Vantagem: sempre conectado à internet.' },
    { ano: 2012, label: '2012', titulo: 'RAW no smartphone',          texto: 'Nokia 808 PureView inaugura a captura RAW em celular. 41 MP. Vanguarda que não virou padrão na época.' },
    { ano: 2019, label: '2019', titulo: 'Fotografia computacional',   texto: 'iPhone 11 e Pixel 4 consolidam o HDR+ e o Deep Fusion. A foto passa a ser o resultado de múltiplas exposições combinadas por IA.' },
    { ano: 2024, label: '2024', titulo: 'Sensores de 1 polegada',     texto: 'Celulares topo de linha recebem sensores grandes (Sony Xperia, Xiaomi 14 Ultra). A diferença para câmeras profissionais diminui.' }
  ];

  /* ------------------------------------------------------------------ */
  /* SEMIOTIC · não se aplica (Aula 02 é técnica)                        */
  /* ------------------------------------------------------------------ */
  const SEMIOTIC = {};

  /* ------------------------------------------------------------------ */
  /* COMPARE · pares antes/depois                                        */
  /* ------------------------------------------------------------------ */
  const COMPARE = {};

  /* ------------------------------------------------------------------ */
  /* Export                                                              */
  /* ------------------------------------------------------------------ */
  global.SENAI_PEDAGOGY = {
    COMPETENCIAS: COMPETENCIAS,
    BLOCOS: BLOCOS,
    NOTES: NOTES,
    TIMELINE: TIMELINE,
    SEMIOTIC: SEMIOTIC,
    COMPARE: COMPARE,
    META: {
      uc: 'Fundamentos de Fotografia Digital e de Semiótica',
      aula: 'Aula 02 — Formação da Imagem Digital',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
