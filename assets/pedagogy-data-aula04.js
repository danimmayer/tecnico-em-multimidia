/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 04 — Semiótica II: Leitura Semiótica
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula presencial, sem computadores dos alunos. Celular pode entrar como
 * apoio para escolher/ver imagens. O foco é transformar os conceitos da
 * Aula 03 em leitura defendável de fotografia, publicidade e cultura visual.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-SEM-OBJ': {
      tipo: 'conhecimento',
      titulo: 'Semiótica: relação signo-objeto, ícones, índices e símbolos',
      curto: 'Signo-objeto'
    },
    'CK-SEM-INT': {
      tipo: 'conhecimento',
      titulo: 'Semiótica: relação signo-interpretante, rema, dicente e argumento',
      curto: 'Signo-interpretante'
    },
    'CT-ANALISE': {
      tipo: 'tecnica',
      titulo: 'Aplicar fundamentos de análise e construção da imagem',
      curto: 'Leitura da imagem'
    },
    'CT-TEXTO': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios e normas da linguagem na comunicação oral e escrita, na elaboração de textos técnicos',
      curto: 'Texto técnico'
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
      titulo: 'Revisão e aquecimento',
      descricao: 'Chamada. Retomada da tríade signo, objeto e interpretante. Uma imagem para aquecer a leitura.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Ícone, índice e símbolo',
      descricao: 'Relação signo-objeto: semelhança, rastro e código. Diagnóstico oral com evidências.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'Rema, dicente e argumento',
      descricao: 'Relação signo-interpretante: possibilidade, afirmação e tese. Leitura guiada e escrita técnica.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Banca de leitura',
      descricao: 'Grupos analisam imagens, defendem uma leitura e respondem a uma pergunta baseada na imagem.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Na aula anterior a gente montou a base: signo, objeto, interpretante, e as primeiras classificações. Hoje a proposta é mais direta: pegar imagem real e fazer leitura com argumento.',
      dica: 'Abra dizendo que os nomes continuam aparecendo, mas a aula é prática. O objetivo não é decorar Peirce; é olhar uma imagem e conseguir defender uma interpretação.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro movimentos: revisão curta, relação signo-objeto, relação signo-interpretante e uma banca de leitura. A banca é a parte mais importante porque obriga todo mundo a voltar para a imagem.',
      dica: 'Use este slide para estabelecer ritmo. Se a turma estiver cansada, mantenha o bloco 2 objetivo e preserve a atividade final.'
    },
    'Ponte com a Aula 03': {
      fala: 'A tríade continua sendo nosso mapa. O signo é o que aparece; o objeto é aquilo a que ele se refere; o interpretante é o efeito de sentido que se forma. Hoje vamos olhar para duas relações dentro dessa tríade.',
      dica: 'Peça exemplos rápidos: fumaça, placa, foto de perfil, uniforme, logo. Em cada exemplo, pergunte o que aparece, a que se refere e que leitura produz.'
    },
    'Duas Perguntas da Noite': {
      fala: 'A primeira pergunta é sobre relação com o objeto: semelhança, rastro ou código. A segunda pergunta é sobre o tipo de efeito: possibilidade, afirmação ou tese.',
      dica: 'Fale devagar e traduza os termos. Escreva no quadro, se houver: ícone = parece; índice = aponta; símbolo = código. Rema = talvez; dicente = afirma; argumento = convence.'
    },
    'Signo-Objeto': {
      fala: 'Ícone, índice e símbolo não são gavetas para decorar. São modos de funcionamento. Uma mesma imagem pode ter os três ao mesmo tempo; a análise precisa dizer qual evidência sustenta cada camada.',
      dica: 'Faça um exemplo oral com o uniforme do SENAI: ícone se houver foto do uniforme, índice se houver marca de uso, símbolo pela instituição que o uniforme representa.'
    },
    'Ícone': {
      fala: 'Ícone é relação por semelhança. Antes de saber contexto, autoria ou circulação, a gente reconhece rosto, olhar, tecido, cor, postura. Essa é a entrada icônica.',
      dica: 'Peça para a turma descrever apenas o que reconhece visualmente. Segure contexto histórico por enquanto.'
    },
    'Índice': {
      fala: 'Índice é pista. Não depende de achar bonito ou triste; depende de apontar um rastro, uma presença, uma consequência. Na fotografia isso é forte porque há uma relação com algo que esteve diante da câmera.',
      dica: 'Se aparecer leitura muito subjetiva, pergunte: qual marca concreta está sustentando isso?'
    },
    'Símbolo': {
      fala: 'Símbolo depende de código aprendido. Marca, palavra, slogan, cor institucional e formato publicitário funcionam porque a gente aprendeu a ler esses sinais.',
      dica: 'Traga para perto: placa da escola, cor de uniforme, logo de app, emoji, embalagem, time, marca de roupa.'
    },
    'Mini-Diagnóstico': {
      fala: 'Vamos testar rápido. Primeiro a turma responde sem ver o gabarito; depois a gente pressiona 2 para conferir. A justificativa importa mais que a resposta seca.',
      dica: 'Use votação por mão levantada. Se houver divergência, peça que os dois lados apontem evidência na frase.'
    },
    'Fotografia como Signo Complexo': {
      fala: 'Aqui entra a ideia central: fotografia não é só ícone. Ela se parece com algo, aponta para um encontro real com a câmera e, quando circula, pode virar símbolo cultural.',
      dica: 'Pressione S neste slide para mostrar os hotspots. Se a turma estiver respondendo bem, pressione 2 ou 3 para aprofundar; se estiver cansada, fique no essencial.'
    },
    'Signo-Interpretante': {
      fala: 'Agora a pergunta muda. Não é mais como a imagem se liga ao objeto. É que tipo de leitura ela produz: uma possibilidade, uma afirmação ou um argumento.',
      dica: 'Retome exemplos da sala: uma foto pode só sugerir clima, pode afirmar uma situação ou pode tentar convencer alguém de uma ideia.'
    },
    'Rema': {
      fala: 'Rema é possibilidade. Quando alguém diz que uma imagem parece fria, tensa, íntima ou artificial, ainda estamos no campo da sugestão. A resposta precisa apontar a qualidade visual que cria essa possibilidade.',
      dica: 'Corrija linguagem vaga sem cortar o aluno: "boa leitura, mas onde a imagem te dá isso?".'
    },
    'Dicente': {
      fala: 'Dicente se aproxima de uma afirmação. A imagem parece dizer: isto aconteceu, essas pessoas estavam ali, esta situação existiu. Fotografia documental costuma puxar muito para esse lado.',
      dica: 'Diferencie o que está visível do que depende de legenda ou repertório histórico. Isso melhora a precisão.'
    },
    'Argumento': {
      fala: 'Argumento aparece quando os elementos trabalham juntos para conduzir uma conclusão. Publicidade é um exemplo claro: a peça mostra, promete e organiza a leitura para convencer.',
      dica: 'Pergunte: qual conclusão essa peça quer que eu aceite? Depois volte para slogan, produto, composição, público e promessa.'
    },
    'Três Frases Técnicas': {
      fala: 'Essas frases são modelos de escrita. Elas tiram a análise do campo do "eu acho" e colocam no campo da evidência: cor, luz, enquadramento, gesto, marca, texto.',
      dica: 'Peça para a turma transformar uma frase vaga em frase técnica. Exemplo: de "passa uma vibe triste" para "a luz baixa e a paleta fria sugerem isolamento".'
    },
    'Leitura Guiada': {
      fala: 'Agora eu faço uma leitura junto com vocês. Não é para achar a interpretação perfeita; é para mostrar o caminho: descrever, separar evidência e fechar uma leitura.',
      dica: 'Faça perguntas em sequência. O que aparece? O que é semelhança? O que é rastro? Que leitura a composição sugere?'
    },
    'Método de Leitura': {
      fala: 'Este é o roteiro da ficha. Ele impede que a análise pule direto para opinião. Primeiro descreve, depois separa ícone, índice, símbolo, interpretante e só então escreve a síntese.',
      dica: 'Mostre que a ficha não é burocracia. Ela é um apoio para a banca final.'
    },
    'Banca de Leitura': {
      fala: 'Agora a turma trabalha em grupos. Cada grupo monta uma leitura e outro grupo testa essa leitura. A regra da banca é simples: a pergunta precisa obrigar o grupo a voltar para a imagem.',
      dica: 'Forme grupos de 3 a 5. Se houver muitas pessoas, escolha alguns grupos para apresentar e recolha as fichas dos demais.'
    },
    'Ficha de Análise': {
      fala: 'A ficha organiza o raciocínio. Na apresentação, o grupo não precisa ler tudo; precisa defender a leitura com uma evidência principal.',
      dica: 'Circule durante a atividade procurando frases soltas. Quando encontrar, pergunte "qual parte da imagem segura essa frase?".'
    },
    'Rodada de Banca': {
      fala: 'Na banca, discordar é parte do jogo. Um grupo defende, outro pergunta, e o primeiro tem direito de ajustar a leitura. O importante é que tudo volte para a imagem.',
      dica: 'Controle o tempo. Defesa de 90 segundos, pergunta de 30 segundos, resposta de 30 segundos. Se passar disso, a energia cai.'
    },
    'Texto Técnico': {
      fala: 'O produto final é uma síntese curta. A frase precisa mostrar descrição, relação signo-objeto, interpretante e conclusão. Não precisa ser longa; precisa ser defendável.',
      dica: 'Peça para cada grupo sublinhar a principal evidência visual usada na conclusão.'
    },
    'Encerramento': {
      fala: 'Hoje a gente transformou a semiótica em ferramenta de leitura. Na próxima aula, voltamos para câmera e técnica, mas agora com uma ideia importante: escolha técnica também produz sentido.',
      dica: 'Feche com uma pergunta curta para saída: "uma imagem argumenta quando...". Isso ajuda a fixar a ponte para publicidade e produção visual.'
    }
  };

  const SEMIOTIC = {
    'afghan-aula04': {
      hotspots: [
        { x: 47, y: 28, kind: 'Ícone', label: 'I', texto: 'Reconhecemos rosto, olhar, tecido e postura pela semelhança visual.' },
        { x: 56, y: 56, kind: 'Índice', label: 'In', texto: 'A fotografia aponta para um encontro concreto entre pessoa, câmera, lugar e instante.' },
        { x: 72, y: 22, kind: 'Símbolo', label: 'S', texto: 'A circulação pública da imagem faz o retrato carregar sentidos culturais sobre infância, conflito e deslocamento.' }
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
      aula: 'Aula 04 — Semiótica II: Leitura Semiótica da Imagem',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
