/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 03 — Semiótica I: O Universo dos Signos
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * Baseado no 00_Planejamento_Geral_UC.docx e no PPTX original.
 * =======================================================================
 * Aula de fundamento conceitual, com exemplos visuais e exercício coletivo.
 * Foco oficial: signo, primeiridade, secundidade, terceiridade,
 * quali-signos, sin-signos e legi-signos. Ícone/índice/símbolo aparece
 * apenas como ponte para a Aula 04.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-SEM': {
      tipo: 'conhecimento',
      titulo: 'Semiótica: signo em si, primeiridade, secundidade, terceiridade, quali-signos, sin-signos e legi-signos',
      curto: 'Universo dos signos'
    },
    'CT-ANAL': {
      tipo: 'tecnica',
      titulo: 'Reconhecer os fundamentos da análise e da construção da imagem',
      curto: 'Análise da imagem'
    },
    'CT-CRI': {
      tipo: 'tecnica',
      titulo: 'Identificar princípios e ferramentas utilizados nos processos criativos',
      curto: 'Processos criativos'
    },
    'CS-PRO': {
      tipo: 'socioemocional',
      titulo: 'Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo',
      curto: 'Profissionalismo'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Abertura e pergunta-matriz',
      descricao: 'Chamada. Revisão da imagem digital. Introdução: o que é um signo?'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Peirce e as três categorias',
      descricao: 'Signo, objeto, interpretante. Primeiridade, secundidade e terceiridade.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'Signo em si: quali, sin e legi',
      descricao: 'Classificar qualidades, ocorrências singulares e regras. Ponte controlada para ícone/índice/símbolo.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Leitura guiada e atividade coletiva',
      descricao: 'Método de análise em quatro passos. Exercício em grupos. Socialização e fechamento.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Nas duas primeiras aulas a gente olhou para a fotografia pelo lado técnico: história, sensor, pixel, arquivo. Hoje a pergunta muda: em que momento uma foto começa a dizer alguma coisa?',
      dica: 'Abra devagar. Avise que os nomes são estranhos no começo, mas a utilidade é prática: olhar uma imagem e conseguir explicar a própria leitura.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro passos. Primeiro a gente entende o que é signo. Depois entra em Peirce. Em seguida vê quali, sin e legi. No final, vocês aplicam isso em imagem.',
      dica: 'Avise o horário do intervalo. A aula tem conteúdo suficiente se houver conversa com a turma; se passar os slides sem perguntas, ela fica curta. Use os exemplos orais.'
    },
    'Ponte com a Aula 02': {
      fala: 'Na Aula 02 vimos a câmera transformando luz em informação. Só que arquivo ainda não é sentido. Uma foto pode ser tecnicamente perfeita e dizer pouco; outra pode ser simples e ficar na cabeça por anos.',
      dica: 'Use a sequência luz, sensor, arquivo, interpretação. A aula começa quando chega na palavra interpretação.'
    },
    'A Pergunta da Semiótica': {
      fala: 'Semiótica pergunta como alguma coisa passa a ficar no lugar de outra para alguém. Pode ser um logo, uma sirene, uma foto de perfil, uma aliança, uma curtida, uma cor.',
      dica: 'Peça exemplos rápidos da sala. Se vierem exemplos banais, melhor: a aula fica menos abstrata.'
    },
    'O Que é um Signo': {
      fala: 'Para Peirce, signo é algo que representa alguma coisa para alguém, sob algum aspecto. A frase é curta, mas traz três peças: o que aparece, aquilo a que se refere e o efeito que fica em quem interpreta.',
      dica: 'Não deixe virar filosofia solta. Volte para o ícone de bateria: desenho na tela, carga real do aparelho e decisão do usuário.'
    },
    'A Tríade de Peirce': {
      fala: 'Peirce não trata signo como objeto isolado. Ele olha para uma relação: algo aparece, aponta para alguma coisa e deixa um efeito de sentido.',
      dica: 'Se precisar, desenhe no quadro. Alterne exemplos: foto de pessoa querida, placa de saída, fumaça, logo do SENAI.'
    },
    'Peirce em um Minuto': {
      fala: 'Peirce foi filósofo, lógico e cientista. A parte que interessa para nós é simples: ele queria entender como o pensamento funciona por signos, não só por palavras.',
      dica: 'Fique pouco na biografia. O ganho é mostrar por que Peirce conversa bem com fotografia, design e interface.'
    },
    'As Três Categorias': {
      fala: 'Primeiridade é qualidade sentida. Secundidade é encontro com o fato. Terceiridade é regra, hábito, mediação. A gente vai usar isso como lente para imagem.',
      dica: 'Repita a fórmula curta: sentir, encontrar, interpretar. Ela ajuda sem virar decoreba.'
    },
    'Primeiridade': {
      fala: 'Primeiridade é o primeiro impacto: vermelho, frio, brilho, textura, medo, leveza. Ainda não tem explicação; tem qualidade chegando.',
      dica: 'Use o slide como experiência. Pergunte: antes de saber o que é, como isso chega em você?'
    },
    'Secundidade': {
      fala: 'Secundidade é encontro com um fato: algo marca, interrompe, deixa rastro. Na fotografia isso é forte, porque a imagem aponta para algo que esteve diante da câmera.',
      dica: 'Use sombra, cicatriz, pegada, suor, vidro quebrado. São exemplos que a turma entende rápido.'
    },
    'Terceiridade': {
      fala: 'Terceiridade é regra e hábito. É o que faz uma placa, uma interface, uma marca ou uma bandeira serem lidas quase sem esforço.',
      dica: 'Mostre que ninguém nasce lendo botão, logo, campanha ou sinalização. A gente aprende esses códigos.'
    },
    'Mini-Diagnóstico': {
      fala: 'Agora vamos testar as três categorias. Em alguns casos pode haver discussão, mas a resposta precisa ser defendida pelo exemplo.',
      dica: 'Deixe a turma votar antes de pressionar 2. Use as respostas para corrigir vocabulário: qualidade, fato, regra.'
    },
    'Signo em Si': {
      fala: 'Agora a pergunta muda. Não vamos olhar primeiro para o objeto representado, mas para o próprio signo: ele entra como qualidade, ocorrência ou regra?',
      dica: 'Diga os nomes difíceis e traduza na hora: qualidade, ocorrência única, regra ou tipo. Este bloco precisa de exemplos da sala para não ficar abstrato demais.'
    },
    'Quali-Signo': {
      fala: 'Quali-signo é uma qualidade que já pode significar alguma coisa: um vermelho específico, uma textura áspera, uma luz azulada, um som grave.',
      dica: 'Lembre que a qualidade precisa aparecer em algum suporte, mas o foco da análise está na qualidade.'
    },
    'Sin-Signo': {
      fala: 'Sin-signo é ocorrência singular: esta foto, esta pegada, esta postagem, este cartaz impresso, esta luz piscando agora.',
      dica: 'Compare com arquivo: não é a ideia de fotografia, é este JPEG aberto neste celular, neste contexto.'
    },
    'Legi-Signo': {
      fala: 'Legi-signo é regra que pode se repetir: a palavra stop, a forma de uma placa, o padrão de uma marca, uma regra de interface.',
      dica: 'Insista na diferença: a placa física é ocorrência; a regra que ela repete é o legi-signo.'
    },
    'A Mesma Coisa, Três Leituras': {
      fala: 'O mesmo objeto visual pode entrar nas três leituras. Vermelho como qualidade, esta placa como ocorrência, a regra do pare como convenção.',
      dica: 'Este slide evita a armadilha de tratar categoria como gaveta fechada. Se sobrar tempo no Bloco 3, peça outro exemplo: uniforme, logo, crachá, embalagem ou tela de celular.'
    },
    'Fotografia como Signo Complexo': {
      fala: 'A fotografia é densa: ela se parece com algo, aponta para algo que esteve diante da câmera e ainda ganha sentido quando circula. Hoje isso fica só como ponte.',
      dica: 'Acione a análise semiótica no slide se houver tempo. Não aprofunde demais ícone, índice e símbolo; deixe o gancho.'
    },
    'Método de Leitura em 4 Passos': {
      fala: 'Para não se perder na análise: primeiro descreva, depois olhe as qualidades, depois procure rastros e ocorrências, e só então entre nas convenções.',
      dica: 'Peça frases curtas. Se aparecer "passa uma vibe", pergunte: qual cor, luz, enquadramento ou contexto faz isso?'
    },
    'Atividade em Grupos': {
      fala: 'Em grupos, escolham uma imagem do slide ou uma foto do celular. A tarefa é simples: apontar qualidade, ocorrência e regra sem inventar coisa fora da imagem.',
      dica: 'Forme grupos pequenos e circule. Use o cronômetro do painel Expandir. Peça pelo menos um exemplo de quali, um de sin e um de legi.'
    },
    'Socialização': {
      fala: 'Cada grupo apresenta em um minuto. Não é sobre achar a interpretação perfeita; é sobre mostrar como chegou nela.',
      dica: 'Controle o tempo. Se a turma acabar rápido, use a atividade-reserva do painel Bônus com objetos da sala.'
    },
    'Encerramento': {
      fala: 'Hoje a gente saiu da fotografia como arquivo e entrou na fotografia como signo. Na próxima aula vamos para ícone, índice e símbolo, já com leitura de imagem.',
      dica: 'Antes de liberar, peça uma frase rápida: "um signo é..." ou "agora vou olhar imagens prestando atenção em...".'
    }
  };

  const SEMIOTIC = {
    'foto-complexa': {
      hotspots: [
        { x: 30, y: 28, kind: 'Ícone', label: 'I', texto: 'A imagem funciona por semelhança: reconhecemos rosto, olhar, tecido, postura e enquadramento.' },
        { x: 55, y: 54, kind: 'Índice', label: 'In', texto: 'A foto também aponta para uma presença diante da câmera, em um instante histórico específico.' },
        { x: 70, y: 24, kind: 'Símbolo', label: 'S', texto: 'Depois de circular muito, o retrato passou a carregar sentidos culturais ligados a infância, conflito e deslocamento.' }
      ]
    },
    'migrant-mother': {
      hotspots: [
        { x: 42, y: 30, kind: 'Ícone', label: 'I', texto: 'O retrato permite reconhecer visualmente Florence Owens Thompson e as crianças pela semelhança.' },
        { x: 35, y: 62, kind: 'Índice', label: 'In', texto: 'Expressões, roupa e contato corporal aparecem como rastros de cansaço, pobreza e incerteza.' },
        { x: 61, y: 36, kind: 'Símbolo', label: 'S', texto: 'Com a circulação histórica, a foto passou a carregar a memória da Grande Depressão e da dignidade em situação de crise.' }
      ]
    }
  };

  const COMPARE = {};

  global.SENAI_PEDAGOGY = {
    COMPETENCIAS: COMPETENCIAS,
    BLOCOS: BLOCOS,
    NOTES: NOTES,
    TIMELINE: [],
    SEMIOTIC: SEMIOTIC,
    COMPARE: COMPARE,
    META: {
      uc: 'Fundamentos de Fotografia Digital e de Semiótica',
      aula: 'Aula 03 — Semiótica I: O Universo dos Signos',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
