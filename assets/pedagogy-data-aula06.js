/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 06 — Linguagem Fotográfica e Composição
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula presencial com celulares, cadernos e notebooks opcionais.
 * O foco é transformar composição em método prático: escolher assunto,
 * organizar quadro, testar cortes em software e defender decisões visuais.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-LINGUAGEM': {
      tipo: 'conhecimento',
      titulo: 'Linguagem fotográfica: enquadramento, plano, ponto de vista, linhas, equilíbrio, ritmo e relação figura-fundo',
      curto: 'Linguagem fotográfica'
    },
    'CK-COMPOSICAO': {
      tipo: 'conhecimento',
      titulo: 'Composição visual aplicada à fotografia: organização dos elementos, hierarquia e intenção comunicativa',
      curto: 'Composição'
    },
    'CT-FOTOGRAFAR': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de fotografia na construção, captura e seleção de imagens',
      curto: 'Prática fotográfica'
    },
    'CT-INFORMATICA': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de informática na utilização de ferramentas digitais de apoio à captura, recorte e apresentação',
      curto: 'Ferramentas digitais'
    },
    'CT-ANALISE': {
      tipo: 'tecnica',
      titulo: 'Aplicar fundamentos de análise e construção da imagem para justificar escolhas visuais',
      curto: 'Análise de imagem'
    },
    'CS-TEMPO': {
      tipo: 'socioemocional',
      titulo: 'Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados',
      curto: 'Gestão do tempo'
    },
    'CS-CONVIVENCIA': {
      tipo: 'socioemocional',
      titulo: 'Demonstrar postura conciliadora, respeitando diferenças culturais, étnicas, religiosas e de gênero na conduta pessoal e profissional',
      curto: 'Convivência'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Chamada e revisão',
      descricao: 'Chamada. Revisão técnica. Introdução à linguagem fotográfica: o quadro como tela e a composição como atenção.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Terços, linhas e fundo',
      descricao: 'Regra dos terços, linhas guia, simetria, padrões, motivo/tema e relação figura-fundo.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:50',
      titulo: 'Ponto de vista e software',
      descricao: 'Plongée, contra-plongée, eye-level, enquadramentos, espaço negativo, recorte, proporção e análise.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:50',
      fim: '22:30',
      titulo: '10 fotos, 10 regras',
      descricao: 'Prática cronometrada com celular, seleção, recorte, justificativa técnica e rodada de crítica respeitosa.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Na aula passada a câmera virou instrumento. Hoje a pergunta muda: depois que a ferramenta funciona, como organizamos o quadro para o olhar entender a imagem?',
      dica: 'Abrir com algo concreto: peça que os alunos olhem a sala e escolham mentalmente um assunto. A composição começa antes do aplicativo.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro movimentos. Primeiro, entendemos o quadro como tela. Depois trabalhamos terços, linhas, simetria, padrões e figura-fundo. No terceiro bloco entram ponto de vista, enquadramentos e software como bancada de teste. No final, fazemos dez fotos com dez regras e defendemos uma escolha.',
      dica: 'O desenho antigo da aula foi aproveitado nos temas e na prática final. Mantive o intervalo no padrão das aulas HTML: depois do ciclo inicial, com retorno às 20h50.'
    },
    'Ponte com a Aula 05': {
      fala: 'Na Aula 05 vimos lente, foco, exposição, arquivo e cuidado. Tudo isso continua. Mas uma foto tecnicamente correta ainda pode ficar confusa se o quadro não deixa claro o assunto.',
      dica: 'Pergunta de aquecimento: em uma foto ruim, o que atrapalha primeiro: técnica, bagunça no fundo ou falta de assunto?'
    },
    'A Pergunta da Composição': {
      fala: 'Compor é responder: para onde o olhar deve ir primeiro, por onde ele deve circular e o que precisa ficar de fora?',
      dica: 'Não tratar composição como lista de regras. Tratar como organização de atenção.'
    },
    'Assunto, Fundo e Hierarquia': {
      fala: 'Toda foto precisa de uma prioridade visual. Assunto é o que carrega a intenção. Fundo é o que ajuda ou atrapalha. Hierarquia é a ordem de leitura.',
      dica: 'Exercício oral: escolher qualquer objeto da sala e dizer qual fundo ajudaria ou atrapalharia.'
    },
    'Mapa do Quadro': {
      fala: 'Antes de falar em regra dos terços, precisamos enxergar forças do quadro: centro, bordas, diagonais, vazios, direção do olhar e peso visual.',
      dica: 'Mostre que pequenas mudanças de posição já alteram a leitura sem trocar câmera nem aplicativo.'
    },
    'Regra dos Terços sem Piloto Automático': {
      fala: 'A grade dos terços é uma ferramenta de deslocamento. Ela ajuda a tirar o assunto do centro quando o centro não é a melhor escolha. Mas não decide por você.',
      dica: 'Evite corrigir como dogma. Pergunte: o deslocamento melhora a leitura? Se não melhora, o centro pode funcionar.'
    },
    'Linhas Guia e Direção': {
      fala: 'Linhas reais ou sugeridas conduzem o olhar. Podem vir de paredes, mesas, sombras, gestos, estrada, olhar de uma pessoa ou sequência de objetos.',
      dica: 'Peça que a turma encontre linhas na sala: mesa, parede, janela, chão, fileiras, braço, fio, sombra.'
    },
    'Simetria e Quebra': {
      fala: 'Simetria dá estabilidade. A quebra dá tensão, surpresa ou ponto de interesse. As duas são escolhas válidas quando têm função.',
      dica: 'Boa hora para comparar composição rígida com composição mais viva. Pergunte qual combina com retrato institucional, produto e bastidor.'
    },
    'Moldura, Camadas e Profundidade': {
      fala: 'Molduras internas e camadas ajudam a dar profundidade: primeiro plano, assunto e fundo. O quadro passa a ter entrada, centro e contexto.',
      dica: 'Use objetos da sala: porta, janela, cadeira, mochila, tela do notebook, mão segurando objeto.'
    },
    'Ponto de Vista e Enquadramentos': {
      fala: 'Mudar altura, distância e plano muda poder, intimidade e informação. Plongée organiza ou diminui; contra-plongée dramatiza; close-up isola detalhe; plano geral contextualiza.',
      dica: 'Use o vocabulário como ferramenta de leitura: plano geral, plano médio, close-up, plongée, contra-plongée, eye-level e holandês. O aluno não precisa decorar todos; precisa reconhecer o efeito.'
    },
    'Peso Visual e Espaço Negativo': {
      fala: 'Peso visual vem de tamanho, contraste, rosto, texto, cor e nitidez. Espaço negativo não é espaço vazio; é área que deixa a imagem respirar.',
      dica: 'Atenção para excesso de elementos. Muitos alunos tentam resolver composição colocando mais coisas.'
    },
    'Corte, Proporção e Plataforma': {
      fala: 'O mesmo clique vira imagens diferentes quando muda o corte. Vertical, quadrado e horizontal reorganizam força, contexto e uso.',
      dica: 'Ponte prática com softwares: recortar não é salvar foto ruim; é escolher leitura e destino.'
    },
    'Bancada Digital de Recorte': {
      fala: 'Agora olhamos o recorte como teste. O software permite experimentar sem apagar o original: deslocar, endireitar, trocar proporção e conferir se o assunto ficou mais claro.',
      dica: 'Se houver notebook, pode usar Photopea, Canva, editor nativo ou Lightroom. Se não houver, o app Fotos/Galeria do celular resolve.'
    },
    'Ferramentas de Composição no Software': {
      fala: 'As ferramentas importantes hoje são simples: grade, recorte, endireitar, perspectiva, espelhar, comparar antes/depois e exportar cópia.',
      dica: 'Não transformar em tutorial longo de app. O software entra como bancada para decisão visual.'
    },
    'Fluxo Prático no Celular ou Notebook': {
      fala: 'O fluxo é: capturar com intenção, duplicar ou preservar original, testar dois cortes, escolher um, exportar e escrever a justificativa.',
      dica: 'Reforce preservação do original. A aula trabalha decisão, não edição destrutiva.'
    },
    'Sequência Narrativa em Três Imagens': {
      fala: 'Composição também vale para sequência. Uma entrega curta pode ter plano geral, plano médio e detalhe. Assim, a leitura ganha contexto, ação e evidência.',
      dica: 'Essa estrutura prepara aulas futuras de produção e projeto integrador.'
    },
    'Sprint de Composição': {
      fala: 'Agora a prática: dez fotos, dez regras. Cada estudante ou dupla aplica uma regra diferente por foto, depois escolhe uma imagem final, testa um corte e defende a decisão compositiva.',
      dica: 'Tempo sugerido: 3 min plano, 14 min captura, 8 min recorte, 4 min seleção e 6 min crítica. Se a turma atrasar, use o modo reduzido de 6 fotos no nível bônus.'
    },
    'Checklist de Crítica': {
      fala: 'A crítica não é gosto solto. Vamos olhar assunto, fundo, linhas, corte, ponto de vista, luz e intenção. Discordar é permitido quando volta para a imagem.',
      dica: 'Combine linguagem de sala: apontar problema e alternativa. Evitar comentário vazio como "gostei" ou "não gostei".'
    },
    'Rodada de Bancada': {
      fala: 'Cada dupla mostra uma imagem e diz a decisão principal. A turma faz uma pergunta ou sugere um segundo corte. A defesa precisa usar evidência visível.',
      dica: 'Controle o tempo. Se a energia cair, reduza apresentações e faça duas leituras coletivas no projetor.'
    },
    'Bilhete de Saída': {
      fala: 'Para fechar, cada estudante registra um antes e depois mental: uma regra que vai testar, um erro que vai evitar e uma ferramenta que vai usar.',
      dica: 'Pode ser entregue no caderno ou apenas usado como preparação para a próxima aula.'
    },
    'Encerramento': {
      fala: 'Composição não é decorar regra. É decidir o que entra, o que sai, o que guia o olhar e por que essa organização comunica melhor.',
      dica: 'Gancho para Aula 07: a composição organiza o quadro; luz e exposição vão controlar a matéria visual desse quadro.'
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
      aula: 'Aula 06 — Linguagem Fotográfica e Composição',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
