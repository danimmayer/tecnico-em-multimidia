/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 09 — Produção de Imagens: Prática Dirigida
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula presencial centrada em fluxo de produção. Usa celular, caderno,
 * Chromebooks/notebooks, câmeras, tripés, softbox, ring lights e materiais simples.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-FLUXO': {
      tipo: 'conhecimento',
      titulo: 'Fluxo de produção fotográfica: pré-produção, produção, pós-produção, curadoria e entrega',
      curto: 'Fluxo de produção'
    },
    'CK-BRIEF': {
      tipo: 'conhecimento',
      titulo: 'Briefing visual, conceito, público, mensagem e restrições de execução em uma produção de imagem',
      curto: 'Briefing visual'
    },
    'CK-CURADORIA': {
      tipo: 'conhecimento',
      titulo: 'Curadoria, contact sheet, critérios de descarte, sequência visual e coerência narrativa',
      curto: 'Curadoria'
    },
    'CT-PREPROD': {
      tipo: 'tecnica',
      titulo: 'Planejar uma produção curta com briefing, moodboard, shot list, papéis, materiais e cronograma',
      curto: 'Pré-produção'
    },
    'CT-CAPTURA': {
      tipo: 'tecnica',
      titulo: 'Produzir imagens em equipe controlando composição, luz, enquadramento, foco e variação de planos',
      curto: 'Captura dirigida'
    },
    'CT-EDICAO': {
      tipo: 'tecnica',
      titulo: 'Selecionar, organizar e aplicar ajustes básicos de edição para preparar uma entrega visual coerente',
      curto: 'Edição e entrega'
    },
    'CT-APRES': {
      tipo: 'tecnica',
      titulo: 'Apresentar uma sequência curta justificando briefing, escolhas técnicas e curadoria',
      curto: 'Apresentação'
    },
    'CS-EQUIPE': {
      tipo: 'socioemocional',
      titulo: 'Trabalhar em equipe com papéis claros, escuta, comunicação objetiva e rodízio de responsabilidades',
      curto: 'Trabalho em equipe'
    },
    'CS-TEMPO': {
      tipo: 'socioemocional',
      titulo: 'Gerenciar tempo de planejamento, captura, seleção, edição e apresentação dentro de uma aula prática',
      curto: 'Gestão do tempo'
    },
    'CS-ORGANIZACAO': {
      tipo: 'socioemocional',
      titulo: 'Organizar set, arquivos e equipamentos com cuidado, segurança e rastreabilidade',
      curto: 'Organização'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Chamada e desafio',
      descricao: 'Chamada, entrega da noite e ponte com composição, luz e semiótica.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Pré-produção guiada',
      descricao: 'Briefing, moodboard, shot list, papéis, set, arquivos e cronograma.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:30',
      titulo: 'Captura e seleção',
      descricao: 'Direção, variação de planos, controle de luz, contact sheet e edição base.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Sprint de produção',
      descricao: 'Produção em equipes, curadoria, montagem da entrega, apresentação curta e bilhete de saída.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Hoje a aula é uma produção dirigida dentro da sala. A meta é integrar câmera, composição e luz em um fluxo completo: briefing, planejamento, captura, seleção, edição leve e apresentação.',
      dica: 'Abra a aula como prática, não como palestra. Peça celular carregado, caderno e, se disponível, câmera, tripé, softbox/ring light e Chromebook ou notebook por grupo.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro blocos. Primeiro definimos o desafio. Depois fazemos pré-produção. Após o intervalo, treinamos captura, direção e seleção. No último bloco, cada equipe produz uma sequência curta e apresenta uma decisão visual.',
      dica: '<strong>Alvo de condução:</strong> chegar ao slide "Chamada Bloco 2" até 19:30. Se atrasar, preserve a entrega final e reduza a conversa da ponte com aulas anteriores.'
    },
    'Entrega da Noite': {
      fala: 'A entrega não é uma pasta cheia de fotos. Cada equipe vai construir uma sequência de três imagens, com um antes e depois de uma delas, e uma justificativa objetiva. Pouca entrega, mas com decisão visível.',
      dica: 'Reforce que três boas imagens contam mais do que trinta arquivos soltos. Isso reduz ansiedade e protege o tempo.'
    },
    'Ponte com as Aulas Anteriores': {
      fala: 'Tudo que vimos até aqui entra em ação. Semiótica ajuda a escolher sentido. Composição organiza atenção. Exposição e luz sustentam a técnica. Hoje o desafio é coordenar tudo dentro de uma produção com tempo real.',
      dica: 'Pergunte rapidamente: composição, luz e semiótica aparecem em que momento do trabalho? Aceite respostas curtas e avance.'
    },
    'Chamada Bloco 2': {
      fala: 'Agora vamos para a pré-produção. Produção boa começa antes da câmera. Um briefing curto, papéis claros e uma lista de fotos evitam improviso perdido.',
      dica: 'Use chamada como transição operacional. Ao final deste bloco, cada equipe precisa ter tema, briefing, shot list e funções.'
    },
    'Briefing de 6 Linhas': {
      fala: 'O briefing precisa caber no caderno. Produto ou assunto, público, mensagem, clima visual, restrições e entrega. Se a equipe não consegue explicar isso em seis linhas, a captura tende a virar tentativa solta.',
      dica: '<strong>Tempo sugerido: 5 min.</strong> Circule pedindo apenas a frase "queremos comunicar que...". Se o grupo travar, dê um assunto concreto e siga.'
    },
    'Moodboard Rápido': {
      fala: 'Agora o briefing vira imagem. A frase "queremos comunicar que..." precisa aparecer em decisões visuais: cor, luz, fundo, textura, ação e corte. O moodboard aqui não é pesquisa solta; é tradução do que o grupo acabou de escrever.',
      dica: '<strong>Tempo sugerido: 6 min.</strong> Peça que cada grupo escolha 2 ou 3 pistas do slide para sustentar o briefing. Se travarem, pergunte: qual pista deixa a mensagem mais clara dentro da sala?'
    },
    'Shot List Mínimo': {
      fala: 'Shot list é a ponte entre ideia e execução. Em vez de entrar no set perguntando o que fazer, a equipe já sabe quais quadros precisa tentar: geral, detalhe, ação, variação de luz e imagem de fechamento.',
      dica: '<strong>Tempo sugerido: 7 min.</strong> Cada grupo sai com cinco quadros. Se algum grupo travar, ofereça: abertura, detalhe, uso, contraste e hero shot.'
    },
    'Papéis e Rodízio': {
      fala: 'Produção em equipe só funciona se as funções aparecem. Uma pessoa fotografa, outra dirige, outra cuida de luz e set, outra registra decisões. O rodízio garante que todos pratiquem e ninguém fique invisível.',
      dica: 'Em trios, una produção e registro. Em quartetos, separe. Evite deixar uma pessoa segurando tudo.'
    },
    'Set e Arquivos': {
      fala: 'Set organizado economiza tempo e evita perda. Antes de fotografar, defina zona de captura, objetos, suporte de câmera, luz, fundo, circulação e nome da pasta. Organização também é parte da imagem profissional.',
      dica: '<strong>Checkpoint antes do intervalo:</strong> tema escolhido, papéis definidos, tripé/softbox reservado quando necessário, pasta/álbum criado e primeiro quadro planejado. Se isso não estiver pronto, o Bloco 3 vira improviso.'
    },
    'Chamada Bloco 3': {
      fala: 'Depois do intervalo, a ideia sai do papel. Vamos treinar como transformar briefing em variações de quadro e como selecionar sem se apegar a foto fraca.',
      dica: '<strong>Retomada curta:</strong> peça de cada grupo apenas tema + primeiro quadro. Não reabra discussão de briefing neste ponto.'
    },
    'Do Briefing ao Frame': {
      fala: 'Antes de fotografar em volume, faça um primeiro frame de teste. Ele mostra se o briefing cabe no espaço, se a luz funciona, se o fundo distrai e se o assunto está claro.',
      dica: '<strong>Demonstração de 3 min:</strong> uma foto ruim proposital, um ajuste de fundo/luz e uma foto melhor. Depois libere grupos.'
    },
    'Direção Sem Constrangimento': {
      fala: 'Direção de cena não precisa expor ninguém. Podemos dirigir objeto, mão, ferramenta, caderno, gesto ou detalhe de ação. O importante é orientar com clareza e respeito: faça, ajuste, mostre, corrija.',
      dica: 'Evite pedir poses improvisadas de alunos. Se houver pessoas nas fotos, use mãos, costas, ação de trabalho ou participação voluntária combinada.'
    },
    'Composição no Set': {
      fala: 'No set, composição vira checklist rápido. Qual é o assunto? O fundo ajuda ou atrapalha? Existe caminho de atenção? O corte fortalece a imagem ou corta algo importante?',
      dica: 'Peça para cada grupo resolver uma distração de fundo antes de continuar a captura.'
    },
    'Luz no Set': {
      fala: 'A luz precisa sustentar o briefing. Se a proposta é limpa, softbox ou ring light ajudam a suavizar. Se é dramática, uma fonte lateral pode criar sombra legível. Se a comparação antes/depois precisa ser precisa, o tripé mantém o quadro constante.',
      dica: 'Reforce que softbox, ring light e luzes disponíveis na sala são ferramentas, não enfeites. A equipe escolhe a fonte principal e só usa tripé quando estabilidade realmente ajudar.'
    },
    'Contact Sheet': {
      fala: 'A seleção começa olhando as fotos juntas. Contact sheet é uma visão comparativa: padrões aparecem, erros repetidos ficam claros e a equipe decide melhor.',
      dica: 'Ferramentas possíveis: galeria em grade, Google Fotos, Drive, Lightroom, Bridge, Canva, Slides ou montagem simples em tela.'
    },
    'Edição Base': {
      fala: 'Edição base não troca a ideia. Ela prepara a foto para comunicar melhor: corte, exposição, contraste, balanço de branco e retirada de distrações simples quando a ferramenta permitir.',
      dica: 'Não deixe a edição virar filtro aleatório. O grupo precisa explicar qual problema visual foi corrigido.'
    },
    'Chamada Bloco 4': {
      fala: 'Último bloco: sprint. Agora cada equipe executa. O objetivo é terminar com três imagens coerentes, uma comparação antes/depois e uma apresentação curta.',
      dica: '<strong>Não alongar este slide.</strong> Confirme briefing, papéis e primeira ação. Depois deixe o tempo correr e circule por bloqueios reais.'
    },
    'Escolha de Briefing': {
      fala: 'Cada equipe escolhe um dos briefings. Eles são pequenos para caber na aula, mas abertos o suficiente para permitir decisão estética.',
      dica: 'Evite temas que exijam figurino, saída da sala ou exposição pessoal. Priorize objetos, gestos, mesas, parede, luz e materiais disponíveis no ambiente.'
    },
    'Rodada de Captura': {
      fala: 'A captura tem limite: cerca de dezoito fotos úteis. Isso força intenção. Façam variação de plano, luz e ponto de vista, mas não fotografem sem decidir o que estão testando. Tripé e softbox ajudam quando a equipe precisa repetir enquadramento ou controlar sombra.',
      dica: '<strong>Chamadas de tempo:</strong> avise 15 min, 10 min e 5 min restantes. Se uma equipe estiver parada, peça só plano geral + detalhe; se houver tremor ou luz confusa, ofereça tripé ou softbox como solução rápida.'
    },
    'Curadoria em Equipe': {
      fala: 'Curadoria é escolher e descartar. Primeiro tire o que falhou tecnicamente. Depois compare mensagem, composição e sequência. A melhor foto isolada nem sempre é a melhor para a narrativa.',
      dica: '<strong>Tempo sugerido: 8 min.</strong> Regra rápida: descartar por foco, fundo, repetição, luz, mensagem ou composição. Sem debate longo por foto.'
    },
    'Montagem da Entrega': {
      fala: 'A entrega pode ser simples: três imagens em uma página, slide, Canva, galeria ou pasta organizada. O formato importa menos do que a sequência estar clara e legível.',
      dica: 'Se a tecnologia falhar, vale mostrar a galeria do celular em ordem e anotar a justificativa no caderno.'
    },
    'Apresentação de 60 Segundos': {
      fala: 'Cada equipe apresenta em um minuto: briefing, três imagens e uma decisão técnica. A fala precisa mostrar processo, não vender uma perfeição inexistente.',
      dica: '<strong>Se o tempo apertar:</strong> apresente 3 grupos e peça que os demais entreguem no caderno/arquivo. Melhor poucas falas claras do que uma rodada apressada.'
    },
    'Bilhete de Saída': {
      fala: 'Para fechar, cada aluno registra uma decisão que mudou a imagem hoje. A frase deve ser concreta: algo de briefing, luz, enquadramento, seleção ou edição.',
      dica: 'Use o bilhete para medir o que ficou. Peça duas leituras voluntárias se houver tempo.'
    },
    'Encerramento': {
      fala: 'Hoje o foco foi transformar o clique isolado em fluxo de produção dentro da sala. Produzir imagem é decidir antes, durante e depois da captura. Na próxima aula, essa produção conversa com aplicações gráficas e edição avaliativa.',
      dica: 'Reforce o gancho da Aula 10: ferramentas e aplicações gráficas entram melhor quando a imagem já nasce com intenção.'
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
      aula: 'Aula 09 — Produção de Imagens: Prática Dirigida',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
