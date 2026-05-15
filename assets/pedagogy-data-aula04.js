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
      fim: '21:50',
      titulo: 'Rema, dicente e argumento',
      descricao: 'Relação signo-interpretante: possibilidade, afirmação e tese. Frases técnicas e leitura guiada ao vivo.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:50',
      fim: '22:30',
      titulo: 'Banca de leitura',
      descricao: 'Grupos analisam imagens, defendem uma leitura e respondem a uma pergunta da banca.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Na aula passada montamos a base: signo, objeto, interpretante. Hoje a proposta é mais direta: pegar imagem real e fazer leitura com argumento.',
      dica: 'Aula prática. Não é decorar Peirce; é olhar imagem e defender uma interpretação.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro movimentos: revisão curta, relação signo-objeto, relação signo-interpretante e a banca de leitura. A banca é a parte mais importante.',
      dica: 'Avise o ritmo: bloco 2 e 3 são teoria curta; bloco 4 é a banca, e ela não pode ser cortada.'
    },
    'Ponte com a Aula 03': {
      fala: 'A tríade continua sendo nosso mapa. O signo é o que aparece; o objeto é aquilo a que ele se refere; o interpretante é o efeito de sentido. Hoje a lente muda: vamos olhar para duas relações dentro dessa tríade.',
      dica: 'Frase de antecipação: quali, sin e legi olharam para o signo em si; agora olhamos a relação com o objeto e com o leitor. Não é repetição, é troca de lente.'
    },
    'Duas Perguntas da Noite': {
      fala: 'Primeira pergunta: como a imagem se liga ao objeto. Semelhança, rastro ou código. Segunda pergunta: que tipo de efeito ela produz. Possibilidade, afirmação ou tese.',
      dica: 'Traduza no quadro: ícone = parece; índice = aponta; símbolo = código. Rema = talvez; dicente = afirma; argumento = convence.'
    },
    'Signo-Objeto': {
      fala: 'Ícone, índice e símbolo não são gavetas. São modos de funcionamento. Uma mesma imagem tem os três ao mesmo tempo; a análise precisa dizer qual evidência sustenta cada camada.',
      dica: 'Exemplo oral com o uniforme do SENAI: ícone (parece com), índice (marca de uso, suor), símbolo (instituição que representa).'
    },
    'Ícone': {
      fala: 'Ícone é relação por semelhança. Antes de saber contexto, autoria ou circulação, a gente reconhece rosto, olhar, tecido, cor, postura. Essa é a entrada icônica.',
      dica: 'Só descrição visual. Segura contexto histórico por enquanto.'
    },
    'Índice': {
      fala: 'Índice é pista. Não depende de achar bonito ou triste; depende de apontar um rastro, uma presença, uma consequência. Na fotografia isso é forte porque há relação com algo que esteve diante da câmera.',
      dica: 'Se aparecer leitura subjetiva: cadê a marca concreta na imagem?'
    },
    'Símbolo': {
      fala: 'Símbolo depende de código aprendido. O logotipo da Kodak é um caso limpo: sem rosto, sem cena, sem semelhança com nada. Quem reconhece lê marca, qualidade, indústria fotográfica. Quem nunca viu, não lê.',
      dica: 'Contraexemplo: quem aqui não conhece esse logo? Reforce com referências próximas: placa da escola, cor de uniforme, logo de app, emoji, embalagem.'
    },
    'Mini-Diagnóstico': {
      fala: 'Teste rápido. A turma responde sem ver o gabarito; depois pressiono 2. O que importa é a justificativa, não a resposta seca.',
      dica: 'Mão levantada. Quando discordarem, os dois lados defendem com evidência da frase.'
    },
    'Fotografia como Signo Complexo': {
      fala: 'Aqui está a ideia central: fotografia não é só ícone. Se parece com algo, aponta para um encontro real com a câmera e, quando circula, vira símbolo cultural.',
      dica: 'Tecla S abre os hotspots. Se a turma engatar, vai para 2 ou 3. Se estiver cansada, fica no essencial.'
    },
    'Signo-Interpretante': {
      fala: 'Agora a pergunta muda. Não é como a imagem se liga ao objeto. É que tipo de leitura ela produz: possibilidade, afirmação ou argumento.',
      dica: 'Retome com exemplos: foto que só sugere clima, foto que afirma uma situação, peça que tenta convencer.'
    },
    'Rema': {
      fala: 'Rema é possibilidade. Quando alguém diz que a imagem parece fria, tensa, íntima ou artificial, ainda estamos na sugestão. A resposta forte aponta a qualidade visual que cria essa possibilidade.',
      dica: 'Corrija sem cortar: boa leitura, mas onde a imagem te dá isso?'
    },
    'Dicente': {
      fala: 'Dicente se aproxima de uma afirmação. A imagem parece dizer: isto aconteceu, essas pessoas estavam ali, esta situação existiu. Fotografia documental puxa para esse lado.',
      dica: 'Separa o que está visível do que vem da legenda ou do repertório histórico.'
    },
    'Argumento': {
      fala: 'Argumento aparece quando os elementos trabalham juntos para conduzir uma conclusão. O anúncio antigo da Kodak organiza marca, ilustração, preço e slogan para defender uma tese: fotografar pode ser fácil. Não estamos vendo um produto; estamos sendo conduzidos a uma ideia.',
      dica: 'Qual conclusão a peça quer que eu aceite? Depois volta para slogan, produto, composição, público, promessa. Compare com o símbolo: o logo sozinho é código; a peça inteira é argumento.'
    },
    'Três Frases Técnicas': {
      fala: 'Essas frases são modelos de escrita. Tiram a análise do "eu acho" e colocam na evidência: cor, luz, enquadramento, gesto, marca, texto.',
      dica: 'Vaga vira técnica em voz alta. "Passa uma vibe triste" vira "a luz baixa e a paleta fria sugerem isolamento".'
    },
    'Leitura Guiada': {
      fala: 'Agora eu faço uma leitura junto com vocês, usando o Cartier-Bresson. Não é para achar a interpretação perfeita. É para mostrar o caminho em quatro passos: o que reconheço, o que aponta, que código cultural ajuda a ler, que efeito de leitura aparece.',
      dica: 'Sequência de quatro: eu reconheço (ícone), isso aponta para (índice), o código diz (símbolo), a imagem sugere/afirma/argumenta (interpretante). Se a turma estiver rápida, alguém troca uma das frases por outra evidência visível.'
    },
    'Método de Leitura': {
      fala: 'Esse é o roteiro da ficha. Ele impede que a análise pule direto para opinião. Primeiro descreve, depois separa ícone, índice, símbolo, interpretante; só então escreve a síntese.',
      dica: 'A ficha não é burocracia. É a estrutura da defesa na banca.'
    },
    'Banca de Leitura': {
      fala: 'Agora a turma trabalha em grupos. Cada grupo monta uma leitura, outro grupo testa. A regra é simples: a pergunta precisa obrigar o grupo a voltar para a imagem. O bloco tem 40 minutos, então o tempo aperta.',
      dica: '6 grupos de 5 a 6 alunos (já formados na Aula 03). 6 envelopes numerados, uma imagem cada. Cronômetro: 2 min para entregar envelope e ficha; 12 min para descrição e ficha; 3 min para fechar a tese; 18 min para 6 bancas; 5 min para síntese final no quadro.'
    },
    'Ficha de Análise': {
      fala: 'A ficha organiza o raciocínio. Na apresentação, o grupo não lê tudo; defende a leitura com uma evidência principal.',
      dica: 'Circule procurando frases soltas. Quando achar: qual parte da imagem segura essa frase?'
    },
    'Rodada de Banca': {
      fala: 'Na banca, discordar é parte do jogo. Um grupo defende, outro pergunta, o primeiro pode ajustar a leitura. Tudo volta para a imagem. Não precisa convencer todo mundo; precisa sustentar a interpretação com evidência.',
      dica: 'Cronômetro alto e visível: 90s defesa, 30s pergunta, 30s resposta. Se passar, a energia cai.'
    },
    'Texto Técnico': {
      fala: 'O produto final é uma síntese curta. A frase precisa mostrar descrição, relação signo-objeto, interpretante e conclusão. Não precisa ser longa; precisa ser defendável.',
      dica: 'Cada grupo sublinha a evidência visual principal da conclusão.'
    },
    'Encerramento': {
      fala: 'Hoje transformamos a semiótica em ferramenta de leitura. Na próxima aula voltamos para câmera e técnica, mas com uma ideia que fica: escolha técnica também produz sentido.',
      dica: 'Pergunta de saída: "uma imagem argumenta quando...". Fixa a ponte para publicidade e produção visual.'
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
