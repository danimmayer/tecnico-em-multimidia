/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 01 — A Imagem Através do Tempo
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * Baseado no Plano de Aula oficial do SENAI.
 * =======================================================================
 * Formato reutilizável: em outra UC, basta trocar os objetos COMPETENCIAS,
 * BLOCOS, NOTES, TIMELINE, SEMIOTIC, COMPARE mantendo a mesma estrutura.
 * ======================================================================= */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* COMPETÊNCIAS · retiradas do Plano de Aula oficial                   */
  /* ------------------------------------------------------------------ */
  const COMPETENCIAS = {
    // Objetivos de Conhecimento
    'CK-HIST': {
      tipo: 'conhecimento',
      titulo: 'História da fotografia e sua evolução técnica e cultural',
      curto: 'História da fotografia'
    },
    'CK-PROF': {
      tipo: 'conhecimento',
      titulo: 'Postura profissional: disciplina, produtividade, cooperação, iniciativa, criatividade',
      curto: 'Postura profissional'
    },
    'CK-ETICA': {
      tipo: 'conhecimento',
      titulo: 'Postura ética: ética, moral, cidadania, direitos humanos, responsabilidade, honestidade, imparcialidade, equidade',
      curto: 'Postura ética'
    },
    // Capacidades Técnicas
    'CT-PESQ': {
      tipo: 'tecnica',
      titulo: 'Analisar as referências das pesquisas para o desenvolvimento das atividades',
      curto: 'Análise de referências'
    },
    'CT-MIDIAS': {
      tipo: 'tecnica',
      titulo: 'Reconhecer as diferentes mídias e tecnologias',
      curto: 'Reconhecer mídias e tecnologias'
    },
    // Capacidades Socioemocionais
    'CS-CONCIL': {
      tipo: 'socioemocional',
      titulo: 'Demonstrar posturas conciliadoras, respeitando diferenças culturais, étnicas, religiosas e de gênero',
      curto: 'Posturas conciliadoras'
    },
    'CS-INTEG': {
      tipo: 'socioemocional',
      titulo: 'Demonstrar comportamento íntegro, transparente e respeitável, com responsabilidade',
      curto: 'Integridade e responsabilidade'
    }
  };

  /* ------------------------------------------------------------------ */
  /* BLOCOS · roteiro da noite do Plano de Aula                          */
  /* ------------------------------------------------------------------ */
  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Apresentação e contrato didático',
      descricao: 'Chamada. Apresentação do professor e dos alunos. Contrato didático e visão geral da UC.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'História da fotografia analógica',
      descricao: 'Aula expositiva dialogada. Principais marcos e fotógrafos.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'A revolução digital',
      descricao: 'Fotografia e sociedade contemporânea. (Lanche 20 min após Bloco 1)'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Ética e primeira foto consciente',
      descricao: 'Ética e postura profissional na era da imagem digital. Atividade: "Minha primeira foto consciente" com smartphone.'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* NOTES · notas de fala por slide (indexado por data-title)           */
  /* ------------------------------------------------------------------ */
  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Esta é a primeira aula da UC de Fundamentos de Fotografia Digital e de Semiótica. Hoje vamos viajar 200 anos no tempo.',
      dica: 'Se o projetor estiver pronto, passe direto para a programação.'
    },
    'Programação da Noite': {
      fala: 'Quatro blocos, intervalo de 20 min depois do primeiro. Chamada no início de cada bloco.',
      dica: 'Aponte o cronômetro no canto superior esquerdo — ele acompanha a noite toda.'
    },
    'O Que é Fotografia?': {
      fala: 'Pergunte antes de mostrar: "se eu pedir para vocês definirem fotografia, o que responderiam?" Anote palavras-chave no quadro.',
      dica: 'Se a turma engrenar, use o Bônus (3) para puxar o debate técnica × arte.'
    },
    'Câmera Obscura': {
      fala: 'Princípio óptico milenar. Vermeer pintou com ela. Ninguém ainda registrava a imagem — só projetava.',
      dica: 'Aponte o Expandir (2) para a timeline expandida (Mozi, Al-Haytham, Kepler).'
    },
    'Pesquisa: Câmera Obscura': {
      fala: '5 minutos de pesquisa individual. No fim, chame alguém para explicar por que a imagem é invertida.',
      dica: 'Abra o QR de coleta (canto superior esquerdo do slide) para receber as respostas por escrito.'
    },
    'Joseph Nicéphore Niépce': {
      fala: '1826. Oito horas de exposição. A primeira foto permanente do mundo.',
      dica: 'Puxe o Bônus (3) para a história triste da sociedade com Daguerre.'
    },
    'O Daguerreótipo': {
      fala: '1839. Virada civilizacional. A Academia Francesa de Ciências libera a patente ao mundo — primeira tecnologia open source da história.',
      dica: 'Expandir (2): química do mercúrio e os riscos à saúde dos primeiros fotógrafos.'
    },
    'Pesquisa: Processos Fotográficos': {
      fala: 'Pesquisem a diferença entre heliografia e daguerreótipo. Alguém vai explicar.',
      dica: 'Se a turma estiver rápida, abra o QR de coleta.'
    },
    'William Henry Fox Talbot': {
      fala: 'O negativo muda tudo. Uma matriz, infinitas cópias. Sem isso, não existe jornal, livro ilustrado, revista.',
      dica: 'Compare direto com daguerreótipo: lá era peça única; aqui é reprodução.'
    },
    'Pesquisa: Negativo/Positivo': {
      fala: 'Últimos 5 min deste bloco. Encerre o Bloco 2 antes do intervalo.',
      dica: 'Lembre da chamada no retorno do lanche.'
    },
    'A Kodak': {
      fala: '"You press the button, we do the rest." A Kodak criou o amador — e 87 anos depois, inventou o digital e engavetou.',
      dica: 'Bônus (3): a ironia da Kodak patenteando o digital e morrendo por causa dele.'
    },
    'Fotografia Colorida': {
      fala: 'Três filtros RGB em 1861. Um físico escocês, não um fotógrafo, inventou a foto colorida.',
      dica: 'Abra o comparador para alternar as 4 tecnologias de cor lado a lado.'
    },
    'Fotógrafos': {
      fala: '10 nomes. Metade brasileiros ou radicados no Brasil. Destaque Claudia Andujar e Pierre Verger.',
      dica: 'Atividade: cada aluno escolhe um e pesquisa a foto mais famosa. Use o QR para coletar.'
    },
    'Fotos Icônicas': {
      fala: '5 imagens que mudaram o mundo. Clique em cada uma para abrir a análise semiótica interativa.',
      dica: 'Aperte S (análise semiótica) nas imagens com hotspots para mostrar ícone/índice/símbolo ao vivo.'
    },
    'Revolução Digital': {
      fala: '1975, câmera de 0,01 megapixel, 3,6 kg, pesando um bebê. Kodak. Arquivaram.',
      dica: 'Faça a ponte para o bloco seguinte: ética e smartphone.'
    },
    'Analógico × Digital': {
      fala: 'Dois paradigmas. Nenhum é superior — são escolhas diferentes com consequências estéticas diferentes.',
      dica: 'Pergunte: quem tem filme em casa? Quem já revelou? Quem conhece alguém que ainda usa?'
    },
    'Era do Smartphone': {
      fala: '1,4 trilhão de fotos por ano. 95% com celular. 1,7 segundo de atenção por post.',
      dica: 'Aqui começa o Bloco 4. Ética entra no próximo slide.'
    },
    'Ética e Imagem': {
      fala: 'Três pilares: consentimento, verdade, autoria. Aqui é o coração da UC — não pule.',
      dica: 'Expandir (2): LGPD e direito de imagem no Brasil. Bônus (3): IA generativa e o problema do deepfake.'
    },
    'Semiótica': {
      fala: 'Peirce. Três tipos de signo. É a ponte direta para a Aula 03.',
      dica: 'Abra o comparador da bandeira vermelha para mostrar as três dimensões coexistindo.'
    },
    'Encerramento': {
      fala: 'Atividade final: "Minha primeira foto consciente". Celular + intenção + um parágrafo explicando.',
      dica: 'Gere o relatório (tecle R) antes de sair — envie em PDF para a coordenação.'
    }
  };

  /* ------------------------------------------------------------------ */
  /* TIMELINE INTERATIVA · mestra da história da imagem                  */
  /* ------------------------------------------------------------------ */
  const TIMELINE = [
    { ano: -384, label: '384 a.C.', titulo: 'Aristóteles',      texto: 'Primeiros registros escritos do fenômeno óptico da câmera obscura.' },
    { ano: 1011, label: '1011',     titulo: 'Ibn al-Haytham',   texto: 'Descreve matematicamente o princípio óptico da câmera obscura.' },
    { ano: 1502, label: '1502',     titulo: 'Leonardo da Vinci',texto: 'Desenhos detalhados da câmera obscura no Códice Atlântico.' },
    { ano: 1826, label: '1826',     titulo: 'Niépce',           texto: 'Heliografia — primeira fotografia permanente, 8h de exposição.' },
    { ano: 1839, label: '1839',     titulo: 'Daguerre',         texto: 'Daguerreótipo. Academia Francesa libera patente. Era da fotografia começa.' },
    { ano: 1841, label: '1841',     titulo: 'Fox Talbot',       texto: 'Calótipo — sistema negativo/positivo. Múltiplas cópias.' },
    { ano: 1861, label: '1861',     titulo: 'Maxwell',          texto: 'Primeira foto colorida com filtros RGB.' },
    { ano: 1888, label: '1888',     titulo: 'Kodak N.º 1',      texto: '"You press the button, we do the rest." Nasce o fotógrafo amador.' },
    { ano: 1935, label: '1935',     titulo: 'Kodachrome',       texto: 'Filme colorido acessível ao grande público.' },
    { ano: 1975, label: '1975',     titulo: 'Câmera digital',   texto: 'Steven Sasson (Kodak) cria a primeira câmera digital. 0,01 MP, 3,6 kg.' },
    { ano: 2007, label: '2007',     titulo: 'iPhone',           texto: 'Começa a era do smartphone como principal dispositivo fotográfico.' },
    { ano: 2022, label: '2022',     titulo: 'IA generativa',    texto: 'DALL·E, Midjourney, Stable Diffusion. A imagem deixa de precisar da luz.' }
  ];

  /* ------------------------------------------------------------------ */
  /* SEMIOTIC · hotspots de análise semiótica sobre fotos icônicas       */
  /* Coordenadas em % (x, y) sobre a imagem.                             */
  /* ------------------------------------------------------------------ */
  const SEMIOTIC = {
    'migrant-mother': {
      titulo: 'Migrant Mother · Dorothea Lange, 1936',
      hotspots: [
        { kind: 'icone',   x: 50, y: 30, label: 'I', texto: 'O rosto parece um rosto humano — relação de semelhança direta. É o nível mais evidente do signo fotográfico.' },
        { kind: 'indice',  x: 32, y: 65, label: 'Í', texto: 'As roupas sujas, as crianças virando o rosto: índices físicos da miséria vivida no momento do registro.' },
        { kind: 'simbolo', x: 70, y: 22, label: 'S', texto: 'A mão no queixo, olhar para o horizonte: convenção cultural de "resiliência maternal". Funciona por acordo social, não por semelhança.' }
      ]
    },
    'afghan-girl': {
      titulo: 'Afghan Girl · Steve McCurry, 1985',
      hotspots: [
        { kind: 'icone',   x: 50, y: 45, label: 'I', texto: 'Os olhos verdes e o rosto jovem — ícone direto de Sharbat Gula.' },
        { kind: 'indice',  x: 28, y: 80, label: 'Í', texto: 'O véu gasto e marcado: índice do deslocamento forçado, do campo de refugiados.' },
        { kind: 'simbolo', x: 72, y: 38, label: 'S', texto: 'O olhar direto e desafiador virou símbolo cultural da dignidade do refugiado. Sentido construído pela capa da National Geographic.' }
      ]
    },
    'serra-pelada': {
      titulo: 'Serra Pelada · Sebastião Salgado, 1986',
      hotspots: [
        { kind: 'icone',   x: 45, y: 40, label: 'I', texto: 'Formas humanas reconhecíveis subindo a encosta — ícone da figura humana em esforço.' },
        { kind: 'indice',  x: 70, y: 55, label: 'Í', texto: 'Lama nos corpos e sacos nos ombros: índice físico da atividade de garimpo manual.' },
        { kind: 'simbolo', x: 28, y: 25, label: 'S', texto: 'A composição em formigueiro evoca cenas bíblicas do Êxodo. Símbolo cultural do trabalho servil e da exploração.' }
      ]
    },
    'falling-soldier': {
      titulo: 'The Falling Soldier · Robert Capa, 1936',
      hotspots: [
        { kind: 'icone',   x: 45, y: 45, label: 'I', texto: 'A silhueta humana caindo — ícone direto da figura do soldado.' },
        { kind: 'indice',  x: 55, y: 60, label: 'Í', texto: 'O momento do impacto: índice físico da violência exercida naquele instante.' },
        { kind: 'simbolo', x: 30, y: 30, label: 'S', texto: 'O braço abandonado com a arma virou símbolo universal da morte em combate. Questiona também a ética (encenada?).' }
      ]
    },
    'gare-saint-lazare': {
      titulo: 'Derrière la Gare Saint-Lazare · Cartier-Bresson, 1932',
      hotspots: [
        { kind: 'icone',   x: 40, y: 60, label: 'I', texto: 'O homem saltando — ícone da figura humana em ação.' },
        { kind: 'indice',  x: 55, y: 75, label: 'Í', texto: 'O reflexo na água: índice físico da poça e do instante exato do salto.' },
        { kind: 'simbolo', x: 25, y: 35, label: 'S', texto: 'A composição virou símbolo do "momento decisivo" — conceito cultural criado pela própria imagem.' }
      ]
    }
  };

  /* ------------------------------------------------------------------ */
  /* COMPARE · pares antes/depois para o comparador                      */
  /* ------------------------------------------------------------------ */
  const COMPARE = {
    'niepce-restored': {
      esquerda: { src: 'imagens/Vista da Janela em Le Gras - ORIGINAL.jpg', label: 'Original 1826' },
      direita:  { src: 'imagens/ai-restoring-Vista da Janela em Le Gras.webp', label: 'Restauração IA' }
    }
  };

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
      aula: 'Aula 01 — A Imagem Através do Tempo',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
