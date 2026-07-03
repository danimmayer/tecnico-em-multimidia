/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 10 — Aplicações Gráficas, Edição Digital e Avaliação
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula de fechamento técnico da UC. Bloco 1 revisa o percurso e mostra a
 * fotografia em cinema, publicidade e design. Bloco 2 demonstra ferramentas
 * gratuitas de edição, formatos de exportação e ética na edição. Blocos 3 e 4
 * aplicam e corrigem a prova de múltipla escolha (Aulas 01 a 09).
 * Recursos: projetor, computadores, prova impressa e gabarito.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-APLIC': {
      tipo: 'conhecimento',
      titulo: 'Aplicações gráficas da fotografia: cinema, publicidade e design gráfico',
      curto: 'Aplicações gráficas'
    },
    'CK-IMG': {
      tipo: 'conhecimento',
      titulo: 'Formação da imagem digital: linguagem visual e verbal, leitura e análise de imagens e formatos de arquivo',
      curto: 'Imagem e leitura'
    },
    'CT-FERRAMENTAS': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de informática usando ferramentas gratuitas de edição para apoiar as atividades',
      curto: 'Ferramentas de edição'
    },
    'CT-MIDIAS': {
      tipo: 'tecnica',
      titulo: 'Reconhecer as diferentes mídias e suportes para o desenvolvimento das atividades',
      curto: 'Mídias'
    },
    'CT-REFERENCIAS': {
      tipo: 'tecnica',
      titulo: 'Analisar referências e pesquisas visuais para o desenvolvimento das atividades',
      curto: 'Referências'
    },
    'CT-AVALIA': {
      tipo: 'tecnica',
      titulo: 'Sintetizar e aplicar os conteúdos das Aulas 01 a 09 em avaliação individual de múltipla escolha',
      curto: 'Avaliação'
    },
    'CS-INTEGRIDADE': {
      tipo: 'socioemocional',
      titulo: 'Demonstrar comportamento íntegro, transparente e responsável nas relações e nas atividades sob sua responsabilidade',
      curto: 'Integridade'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Revisão e aplicações gráficas',
      descricao: 'Chamada, revisão geral da UC e a fotografia em cinema, publicidade e design gráfico.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:50',
      fim: '20:30',
      titulo: 'Edição com ferramentas gratuitas',
      descricao: 'Ferramentas livres, ajustes básicos, formatos de exportação e ética na edição. Lanche de 20 min após o Bloco 1.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:30',
      fim: '21:30',
      titulo: 'Prova de múltipla escolha',
      descricao: 'Avaliação individual cobrindo todo o conteúdo da UC, das Aulas 01 a 09.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:30',
      fim: '22:30',
      titulo: 'Finalização e correção coletiva',
      descricao: 'Conclusão da prova, correção coletiva e discussão das respostas.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Esta é a última aula técnica da UC. Hoje fechamos o ciclo: vemos onde a fotografia trabalha no mundo real — cinema, publicidade e design — conhecemos ferramentas gratuitas de edição e aplicamos a prova que reúne tudo das Aulas 01 a 09.',
      dica: 'Abra deixando claro que a noite tem dois climas: exposição rápida nos dois primeiros blocos e avaliação individual nos dois últimos. Peça computadores/celulares carregados para a demonstração de edição e confirme prova impressa e gabarito em mãos.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro blocos. Primeiro, revisão e aplicações gráficas. Depois do lanche, ferramentas de edição. No terceiro bloco começa a prova de múltipla escolha. No quarto, finalizamos a prova e corrigimos juntos.',
      dica: '<strong>Alvo de condução:</strong> chegar ao slide "Chamada Bloco 3" pontualmente às 20:30 para preservar uma hora cheia de prova. O lanche entra logo após o Bloco 1 (19:30–19:50). Se a edição atrasar, corte demonstração, não tempo de prova.'
    },
    'Revisão Relâmpago': {
      fala: 'Antes de tudo, uma revisão relâmpago do percurso. Saímos da história e da ética da imagem, passamos pela formação da imagem digital, semiótica, câmera, composição, exposição, luz e produção. A prova de hoje cobre exatamente esse arco.',
      dica: 'Conduza em ritmo de quiz oral: aponte cada eixo e peça uma palavra-chave da turma. Não reabra explicação longa; o objetivo é ativar memória antes da prova.'
    },
    'Aplicações Gráficas': {
      fala: 'A fotografia raramente termina nela mesma. Ela vira matéria-prima de outras mídias: alimenta o cinema, sustenta a publicidade e estrutura o design gráfico. A mesma decisão de luz, enquadramento e semiótica reaparece em cada uma dessas aplicações.',
      dica: 'Reforce a ideia-ponte: tudo que a turma aprendeu sobre composição, luz e signo é o que torna a imagem útil para essas três indústrias. Conecte com a Aula 04 (publicidade) e a Aula 06 (composição).'
    },
    'Fotografia em Cena': {
      fala: 'No cinema e no audiovisual, a fotografia define a atmosfera. Direção de fotografia é luz, cor, enquadramento e movimento a serviço da narrativa. Um contraluz, uma silhueta ou uma cor dominante já contam parte da história antes de qualquer fala.',
      dica: 'Mostre que os mesmos conceitos da Aula 07 e 08 (direção da luz, temperatura de cor, contraste) viram linguagem cinematográfica. Pergunte que sensação a imagem projetada provoca e por quê.'
    },
    'Publicidade e Design': {
      fala: 'Na publicidade, a imagem precisa comunicar e convencer em segundos, combinando foto, texto e marca. No design gráfico e editorial — capas, revistas, álbuns, cartazes — a fotografia se integra a tipografia e layout. Aqui a leitura semiótica e a composição valem ouro.',
      dica: 'Use o anúncio e a capa como exemplos de imagem + texto. Retome ícone, índice e símbolo (Aula 04): o que o anúncio mostra, o que ele indica e o que ele simboliza para o público-alvo.'
    },
    'Chamada Bloco 2': {
      fala: 'Voltando do lanche, vamos para a parte de ferramentas. Edição digital não é truque: é acabamento. Existem ótimas opções gratuitas, no computador e no celular, que dão conta de tudo que precisamos.',
      dica: 'Use a chamada como transição. Tenha pelo menos uma ferramenta aberta para demonstrar ao vivo. Se houver poucos computadores, demonstre no projetor e deixe a turma acompanhar no celular.'
    },
    'Ferramentas Gratuitas': {
      fala: 'Quatro ferramentas gratuitas cobrem quase todo o fluxo. No computador, GIMP para edição completa de imagem e Darktable para revelar RAW e tratar fotos como em um laboratório digital. No celular, Snapseed e Lightroom Mobile para ajustes rápidos e profissionais.',
      dica: 'Deixe claro que nenhuma exige pagamento. GIMP e Darktable são livres/open-source; Snapseed é gratuito do Google; Lightroom Mobile tem versão gratuita suficiente. Mencione Photopea como GIMP no navegador, sem instalar.'
    },
    'Desktop e Celular': {
      fala: 'A escolha da ferramenta depende do destino e do equipamento. Computador dá controle fino, camadas e RAW; celular dá velocidade e publicação imediata. Não existe ferramenta certa única: existe a ferramenta certa para a tarefa.',
      dica: 'Pergunte à turma onde cada uma editaria uma foto para o feed e onde editaria uma foto para impressão A3. A resposta ilustra a lógica de escolher a mídia e a ferramenta.'
    },
    'Ajustes Básicos': {
      fala: 'Os ajustes básicos resolvem a maior parte de uma edição: corte e endireitar, exposição e contraste, balanço de branco e cor, e por fim nitidez e limpeza. Essa ordem evita retrabalho e mantém a imagem natural.',
      dica: 'Demonstre a sequência ao vivo em uma foto: primeiro corte, depois luz, depois cor, depois nitidez. Reforce a régua da Aula 09: se o ajuste não pode ser explicado em uma frase, virou efeito solto.'
    },
    'Formatos de Exportação': {
      fala: 'Exportar é escolher o formato e o tamanho certos para cada destino. JPEG para web e redes, com sRGB; PNG quando precisa de transparência; TIFF ou PDF para impressão de qualidade. E o tamanho muda: a mesma foto exporta pequena para o Instagram e grande, a 300 DPI, para impressão.',
      dica: 'Amarre com a Aula 02 (DPI, espaços de cor, pixels ÷ DPI = polegadas). Reforce: o arquivo original é o arquivo-mãe; cada destino recebe uma versão exportada, nunca o cru.'
    },
    'Ética na Edição': {
      fala: 'Existe uma linha entre corrigir e enganar. Ajustar luz, cor e corte é acabamento legítimo. Inserir, remover ou inverter fatos em contexto jornalístico ou documental é manipulação. Na publicidade há mais liberdade criativa, mas mentir sobre o produto continua sendo problema ético e legal.',
      dica: 'Esta é a capacidade socioemocional da aula: integridade e transparência. Traga um caso simples (foto de produto x foto jornalística) e peça à turma onde fica o limite. Prepare o terreno para a integridade na própria prova.'
    },
    'Chamada Bloco 3': {
      fala: 'Agora começa a avaliação individual. A prova é de múltipla escolha e cobre todo o conteúdo das Aulas 01 a 09. É individual, sem consulta, e vale como fechamento técnico da UC.',
      dica: 'Faça a chamada, distribua a prova impressa e o cartão de respostas. Confirme que cada aluno tem caneta. A partir daqui, fale o mínimo: o protagonismo é da prova.'
    },
    'Como Funciona a Prova': {
      fala: 'A prova é individual e sem consulta. Leia cada questão inteira antes de marcar, elimine as alternativas claramente erradas e escolha a melhor resposta. Cada questão tem uma única alternativa correta. Marque com caneta e revise antes de entregar.',
      dica: 'Combine regras de sala: silêncio, celular guardado, dúvida apenas com o professor. Avise o tempo previsto e que a prova continua no Bloco 4 se necessário. Distribua a versão impressa e o gabarito fica só com você.'
    },
    'O que a Prova Cobre': {
      fala: 'A prova é equilibrada entre os eixos da UC: história e ética, imagem digital, semiótica, câmera e composição, exposição e luz, e produção. Quem acompanhou as nove aulas tem repertório para responder tudo.',
      dica: 'Mostre o mapa de cobertura para reduzir ansiedade: nenhum tema é surpresa. Se algum aluno faltou a aulas, oriente focar nos eixos que domina e tentar todas as questões.'
    },
    'Foco na Prova': {
      fala: 'Dois lembretes finais antes de começar: gerencie o tempo, não trave em uma questão difícil — marque, siga e volte depois. E confie no que você praticou nas aulas. Bom trabalho.',
      dica: 'Reforce a integridade: prova individual mede o que cada um aprendeu e ajuda a planejar o projeto integrador. Dê o sinal de início e circule discretamente pela sala.'
    },
    'Chamada Bloco 4': {
      fala: 'Quem ainda está terminando, conclua com calma. Quem já entregou, vamos nos preparar para a correção coletiva. Corrigir junto é parte do aprendizado: a discussão fixa o conteúdo.',
      dica: 'Recolha as provas que estiverem prontas, faça a chamada do bloco e dê um tempo final curto e firme. Tenha o gabarito à mão para conduzir a correção.'
    },
    'Correção Coletiva': {
      fala: 'Vamos corrigir juntos. Para cada questão: leio o enunciado, peço a resposta da turma, revelo o gabarito e explico por que a correta está certa e por que os distratores enganam. O erro vira oportunidade de revisão.',
      dica: 'Use o gabarito do professor. Conduza pelas questões mais discutidas, não necessariamente todas em ordem. Deixe a turma defender respostas antes de revelar — é onde o aprendizado acontece.'
    },
    'Discussão por Eixos': {
      fala: 'Organizando a discussão por eixos: história e semiótica nos dizem o que a imagem significa; imagem digital e câmera, como ela se forma; composição, exposição e luz, como ela é construída; produção, como tudo vira um trabalho. A prova só amarrou esses fios.',
      dica: 'Aponte os eixos onde a turma errou mais e reforce esses conceitos. Anote os pontos fracos coletivos: eles orientam o reforço antes do projeto integrador.'
    },
    'Autoavaliação': {
      fala: 'Cada aluno revisa a própria prova: onde acertei com segurança, onde chutei, onde errei e por quê. Isso transforma uma nota em mapa de estudo. Não é sobre a nota isolada, é sobre saber o que revisar.',
      dica: 'Peça que cada um identifique um eixo para reforçar. Conecte com o projeto integrador (Aula 11): o ensaio fotográfico vai cobrar justamente esses fundamentos na prática.'
    },
    'Bilhete de Saída': {
      fala: 'Para fechar, cada aluno registra uma frase: um conceito que ficou mais claro hoje e um que ainda quer reforçar. É o nosso bilhete de saída, honesto e individual.',
      dica: 'Use o bilhete como termômetro da turma e como exercício de integridade e autoconhecimento. Peça duas leituras voluntárias se houver tempo.'
    },
    'Encerramento': {
      fala: 'Fechamos a parte técnica da UC. Em dez aulas, saímos da câmara escura e chegamos a produzir, editar e avaliar imagens com intenção. A próxima aula abre o projeto integrador: vocês vão aplicar tudo isso em um ensaio fotográfico em equipe.',
      dica: 'Reforce o gancho da Aula 11 (Projeto Integrador · Ensaio em Trios). Agradeça o percurso e oriente cada aluno a chegar com referências e ideias de tema para o ensaio.'
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
      aula: 'Aula 10 — Aplicações Gráficas, Edição Digital e Avaliação',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
