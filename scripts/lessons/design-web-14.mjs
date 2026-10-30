// Fonte da Aula 14 de Design Web; regenerar com node scripts/build-design-web-14.mjs.
const times = ['19:00 - 19:45', '20:05 - 20:50', '20:50 - 21:35', '21:35 - 22:10'];

export const planning = {
  title: 'Briefing e Pesquisa de Projeto',
  description: 'Transforme um pedido vago em briefing: identifique o que não pode faltar, entreviste um cliente fictício com ficha secreta, pesquise concorrentes, referências e tendências e entregue um briefing de uma página validado por outra dupla.',
  objectives: ['Desenvolvimento do Projeto: briefing, pesquisa, tendência.', 'Pesquisa: tipos, métodos.'],
  technical: [
    'Identificar padrões, normas e procedimentos para elaboração do projeto de mídias digitais, referentes a propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.'
  ],
  socio: ['Reconhecer a pesquisa como fonte de inovação e formação de um espírito empreendedor.'],
  blocks: [
    'Revisão da Aula 13: acessibilidade como requisito de projeto. Aquecimento “pedido vago ou briefing?”, leitura comentada de um briefing completo, identificando problema, objetivo, público, conteúdo, referências, prazo, restrições e critério de sucesso, e caça aos furos de um briefing fraco, transformados em perguntas.',
    'Simulação “Cliente e designer”: em duas rodadas, cada integrante faz uma vez o papel de cliente de um negócio fictício sorteado (pizzaria, estúdio de tatuagem, petshop ou escola de dança), com ficha secreta, e o outro conduz a entrevista de briefing. A dupla escolhe qual dos dois briefings seguirá nas próximas aulas.',
    'Tipos e métodos de pesquisa aplicados ao design. Pesquisa orientada para o cliente escolhido: comparação de três concorrentes fictícios no computador e no celular, painel de referências de outros segmentos e avaliação de tendências; resposta a um telefonema do cliente que reduz o escopo.',
    'Consolidação: briefing de uma página com entrevista e pesquisa, acessibilidade como requisito e validação pela dupla vizinha com seis critérios. Apresentação de dois minutos no quarteto, três briefings para a turma e exportação da entrega.'
  ],
  times,
  methodology: 'Leitura comentada, simulação de atendimento com cliente fictício e ficha secreta, pesquisa orientada com material preparado e validação entre pares com critérios observáveis. Clientes, negócios e concorrentes são fictícios; a pesquisa na internet é opcional e sem login.',
  resources: 'Computadores com navegador e a oficina da Aula 14 na Vercel, com kit offline como reserva; projetor com a apresentação na plataforma; caderno e caneta. Sem login, instalação, impressão ou dados pessoais.',
  observation: '19:00–22:10, intervalo 19:45–20:05. Chamada às 19:00, 20:05, 20:50 e 21:35. Duplas no mesmo posto, alternando quem opera. Na Parada 2, quem faz o cliente lê a ficha secreta e quem entrevista não olha. Na Parada 4, cada dupla forma um quarteto com a dupla vizinha; o quarteto é o grupo da Aula 15. A oficina salva o progresso no navegador quando disponível; exportar antes de fechar. Sem internet, usar o kit offline; sem computador, seguir a alternativa em caderno do guia docente.'
};

export const lesson = { ...planning, socioemotional: planning.socio, schedule: times.map((horario, i) => ({ horario, atividade: planning.blocks[i] })) };
delete lesson.blocks; delete lesson.times; delete lesson.socio;

export const workshopUrl = 'https://oficinas-design-web.vercel.app/aula-14/';
const resource = (phase, label = 'Abrir oficina da Aula 14', round) => ({ href: `${workshopUrl}?fase=${phase}${round ? `&rodada=${round}` : ''}`, label });
const card = (title, text) => ({ title, text });
const slide = (block, title, time, minutes, lede, extra, notes) => ({
  block, title, heading: title, time, layout: 'dw8', lede, ...extra,
  teacher: {
    speech: notes.speech,
    steps: [`${minutes} min · ${notes.steps}`],
    watch: notes.watch,
    rescue: notes.rescue || 'Volto ao último registro salvo, demonstro só o próximo passo no projetor e devolvo o controle à dupla.'
  },
  ...(notes.pace ? { pace: notes.pace } : {})
});

export const support = {
  appendDefaultClosing: false,
  teacherGoal: 'Ao fim da noite, cada dupla terá exportado um briefing de uma página do cliente escolhido, com as duas entrevistas, a comparação de concorrentes conferida, um painel de pelo menos quatro referências com motivo, quatro tendências avaliadas, a resposta ao corte de escopo, dois requisitos de acessibilidade e a validação da dupla vizinha.',
  routine: [
    'Antes da aula, abro a oficina da Aula 14 na Vercel, faço uma exportação de teste e deixo o kit offline extraído como reserva.',
    'Faço chamada às 19:00, 20:05, 20:50 e 21:35. Cada parada abre sozinha no horário: Parada 2 às 20:05, Parada 3 às 20:50 e Parada 4 às 21:35. Na Parada 2, a Rodada 2 abre às 20:25 e a Escolha às 20:40; o telefonema do cliente toca às 21:20. Se os relógios dos computadores estiverem errados, digo a palavra da parada: escuta, farol ou acordo.',
    'A faixa de relógio mostra a cada dupla onde a turma deveria estar e leva até lá. Quem cumpre a missão antes do horário recebe o desafio extra da própria parada, sem avançar.',
    'Combino no primeiro slide a regra “3 antes de mim”: antes de me chamar, a dupla lê a missão, usa “Estou travado” e pergunta à dupla do lado. Atendo primeiro quem fez os três passos.',
    'Na Parada 2, reforço a regra da ficha secreta: só quem faz o cliente lê; quem entrevista olha para o lado. O cliente responde só ao que for perguntado.'
  ],
  onlineRoutine: 'Os estudantes usam https://oficinas-design-web.vercel.app/aula-14/ e os links diretos ?fase=1 a ?fase=4 (na Parada 2, ?rodada=1 a 3); esta apresentação fica na plataforma. Se a internet cair, extraio o kit offline e abro index.html por duplo clique. Se o navegador bloquear o armazenamento local, a dupla trabalha sem fechar a página e exporta no fim.',
  plainLanguage: 'Briefing é o acordo entre cliente e designer antes de desenhar: qual é o problema, quem vai usar, o que a pessoa precisa conseguir fazer, que conteúdo existe, que referências servem, para quando e com que limites, e como saber se deu certo. Pesquisa é a forma de responder às dúvidas do briefing com evidências, não com gosto pessoal.',
  say: 'Todo cliente chega pedindo “um site moderno”. Hoje vocês vão aprender a transformar esse pedido em perguntas, as perguntas em respostas, e as respostas num briefing que o cliente assina embaixo. Quem pergunta bem descobre o problema real.',
  demo: [
    'Na Parada 1, clico numa frase do briefing da Pedal Leve, escolho a parte e mostro o retorno imediato.',
    'No briefing fraco do Salão Bela Vista, marco um furo e transformo em pergunta: “Para quando o site precisa estar no ar?”.',
    'Na Parada 2, sorteio os clientes no projetor e mostro onde fica a ficha secreta, sem abrir.',
    'Faço duas perguntas de entrevista em voz alta com a turma no papel de cliente e mostro o contador de “por quê?”.',
    'Na Parada 3, abro um concorrente no modo celular e mostro que a página corta.'
  ],
  studentDeliverable: 'Arquivo HTML exportado pela oficina com: o briefing de uma página do cliente escolhido; as perguntas que fecham os furos do briefing fraco; as duas entrevistas com pepitas e resumo confirmado; a comparação de concorrentes conferida e a oportunidade; o painel de referências e as tendências com motivo; a resposta ao telefonema; os requisitos de acessibilidade; a validação da dupla vizinha e o ajuste feito. A exportação parcial aponta as pendências. Sem computador: quatro páginas no caderno, conforme o guia docente.',
  check: [
    'O objetivo descreve uma ação de quem visita o site, não uma qualidade visual.',
    'O público é específico o bastante para orientar decisões.',
    'O conteúdo que existe e o que falta estão separados, com quem produz.',
    'Existe pelo menos uma restrição real e uma lista do que não entra agora.',
    'O sucesso pode ser observado ou medido.',
    'Referências, concorrentes e tendências têm motivo ligado ao cliente, e a acessibilidade aparece como requisito.'
  ],
  fallback: 'Sem internet, abrir o kit offline. Sem computador para a dupla, projetar o briefing comentado e as fichas dos clientes: o cliente recebe a ficha impressa ou lida pelo professor em voz baixa; a dupla registra a entrevista no caderno em oito linhas, uma por tema, e a pesquisa vira a análise dos concorrentes projetados. A validação da dupla vizinha usa os seis critérios escritos no quadro.',
  extension: 'O desafio extra aparece sozinho quando a missão termina e é conferido pela própria oficina: partes certas na primeira tentativa e fato, hipótese ou pergunta na Parada 1; as três pepitas de um cliente e dois “por quê?” por rodada na Parada 2; comparação sem erros, seis referências, todas as tendências e um achado da internet na Parada 3; seis critérios “Sim” e três itens em “não entra agora” na Parada 4. A próxima parada continua fechada até o horário.',
  commonProblems: [
    ['O briefing vira lista de cores e fontes', 'Volto ao problema e à tarefa: “o que a pessoa precisa conseguir fazer?”. Identidade visual vem depois.'],
    ['Quem entrevista lê a ficha secreta', 'Peço que a dupla troque de cliente com a dupla vizinha naquela rodada. A graça está em descobrir conversando.'],
    ['O cliente conta tudo de uma vez', 'Lembro a regra do papel: responder só ao que foi perguntado. As pepitas só saem com “por quê?” ou “me dá um exemplo?”.'],
    ['A dupla faz perguntas fechadas (sim ou não)', 'Mostro a diferença no projetor: “Você quer fotos?” contra “Que conteúdo vocês já têm pronto?”.'],
    ['Tudo é tratado como certeza', 'Peço que marquem fato, hipótese ou pergunta. Hipótese vira item de pesquisa.'],
    ['A comparação de concorrentes não fecha', 'Lembro de abrir cada site no modo celular e reparar no contraste do texto. A oficina diz quantas estão certas, não quais.'],
    ['O escopo cresce sem limite', 'Uso o telefonema do cliente: uma entrega mínima agora e a lista “não entra agora”.'],
    ['O relógio do computador está errado', 'Digo a palavra da parada (escuta, farol ou acordo); a dupla digita na tela de “abre às”.'],
    ['O tempo aperta no fim', 'Preservo o briefing de uma página e a validação. As três apresentações para a turma podem virar uma; às 22:05 todos exportam.']
  ],
  presentationSlides: [
    slide(1, 'Um site para quem?', '19:00 - 19:05', 5,
      'Todo cliente chega pedindo “um site moderno”. Hoje vocês descobrem o que ele precisa de verdade, antes de desenhar qualquer tela.',
      { cards: [card('Hoje', 'Decifrar, entrevistar, pesquisar e consolidar um briefing.'), card('Entrega', 'Um briefing de uma página exportado, que segue para as próximas aulas.')], promptLabel: '3 antes de mim', prompt: 'Antes de chamar o professor: leiam a missão, usem “Estou travado” e perguntem à dupla do lado.', resource: resource(1) },
      { speech: 'Faço a chamada e retomo a Aula 13: acessibilidade entra no projeto desde o começo, e hoje começamos o projeto. Combino o “3 antes de mim” e mostro onde ficam a missão e o botão “Estou travado”. As paradas abrem sozinhas no horário.', steps: 'Chamada, retomada da Aula 13 e abertura da oficina.', watch: 'Todas as duplas com a oficina aberta e o apelido preenchido, sem nomes completos.' }),
    slide(1, 'Aquecimento: pedido vago ou briefing?', '19:05 - 19:10', 5,
      'Oito frases de clientes. Cada resposta mostra na hora por que é pedido vago ou começo de briefing.',
      { cards: [card('Pedido vago', 'Fala de aparência e gosto: “moderno”, “bonito”, “com a minha cara”.'), card('Briefing', 'Fala de pessoas, tarefas, prazos e resultados que dá para ver.')], promptLabel: 'Depois dos cartões', prompt: 'Qual frase parecia boa e era vaga?', resource: resource(1, 'Abrir oficina · Aquecimento') },
      { speech: 'Três minutos de cartões e dois de conversa. A frase “faz igual à concorrência, só que melhor” costuma enganar: referência sem motivo não orienta.', steps: 'Cartões em dupla e conversa sobre a frase mais enganosa.', watch: 'A turma justifica com pessoas e tarefas, não com “gostei” ou “não gostei”.' }),
    slide(1, 'O que não pode faltar', '19:10 - 19:15', 5,
      'Um briefing responde a perguntas que evitam retrabalho. Se uma delas fica sem resposta, alguém vai adivinhar.',
      { cards: [card('Problema e objetivo', 'O que atrapalha hoje? O que a pessoa precisa conseguir fazer no site?'), card('Público e conteúdo', 'Quem usa, como chega? O que já existe e o que falta?'), card('Referências e prazo', 'O que inspira, e por quê? Para quando, e o que acontece nessa data?'), card('Restrições e sucesso', 'O que não pode? Como saber que deu certo?')], promptLabel: 'Demonstração', prompt: 'Clicar numa frase do briefing da Pedal Leve → escolher a parte → ler o retorno.', resource: resource(1) },
      { speech: 'Demonstro uma frase no projetor: a do público. Mostro que acessibilidade aparece como restrição de projeto, ligando à Aula 13.', steps: 'Apresentação das partes e demonstração de uma marcação.', watch: 'Ninguém começa pela frase que demonstrei.' }),
    slide(1, 'Parada 1 · Leia um briefing de verdade', '19:15 - 19:30', 15,
      'O briefing da Pedal Leve tem dez frases. Digam qual parte cada uma cumpre. O retorno aparece na hora.',
      { cards: [card('Meta', 'As dez frases com a parte certa.'), card('Atenção', 'Duas frases são restrições. Uma delas é sobre acessibilidade.')], promptLabel: 'Regra', prompt: 'Errou? Releiam a frase e perguntem: o que ela garante para o projeto?', resource: resource(1, 'Abrir oficina · Parada 1 · Briefing comentado') },
      { speech: 'Circulo primeiro por quem ainda não marcou nada. Peço que alternem quem opera a cada duas frases.', steps: 'Identificação das partes em dupla.', watch: 'A dupla lê a frase em voz alta antes de escolher a parte.' }),
    slide(1, 'Caça aos furos', '19:30 - 19:40', 10,
      'O briefing do Salão Bela Vista parece pronto, mas está cheio de furos. Encontrem cada um e escrevam perguntas para fechá-los.',
      { cards: [card('Avaliar', 'Para cada parte: está claro ou é furo?'), card('Perguntar', 'Três perguntas abertas para o cliente, uma por linha.')], promptLabel: 'Pista', prompt: 'Só uma parte traz informação concreta. Qual?', resource: resource(1, 'Abrir oficina · Parada 1 · Caça aos furos') },
      { speech: 'Mostro a diferença entre pergunta aberta e fechada: “Tem prazo?” contra “Para quando o site precisa estar no ar, e o que acontece nessa data?”.', steps: 'Avaliação dos furos e escrita das perguntas.', watch: 'Perguntas que começam por “o que”, “como”, “para quando”, “por que”.' }),
    slide(1, 'Salve antes do lanche', '19:40 - 19:45', 5,
      'Confiram a missão e exportem uma cópia. O trabalho continua neste navegador.',
      { cards: [card('Missão', 'Exportar uma cópia fecha a Parada 1.'), card('Retorno', '20:05, no mesmo posto e com a mesma dupla.')], promptLabel: 'Antes de sair', prompt: 'Exportem a cópia e não fechem a aba da oficina.', resource: resource(1) },
      { speech: 'Peço a exportação parcial como segurança. Antecipo que, na volta, cada um vai atuar como cliente.', steps: 'Conferência da missão e exportação parcial.', watch: 'Arquivo baixado em cada posto antes do intervalo.' }),
    slide(1, 'Intervalo', '19:45 - 20:05', 20,
      'Lanche das 19:45 às 20:05. Na volta, o cliente chega.',
      { promptLabel: 'Retorno', prompt: '20:05 · mesmo posto · sorteio dos clientes.' },
      { speech: 'Intervalo fora do tempo de atividade. Deixo o slide do sorteio pronto para a volta.', steps: 'Intervalo.', watch: 'Abas da oficina abertas nos postos.', pace: 'break' }),
    slide(2, 'Cliente e designer', '20:05 - 20:10', 5,
      'Duas rodadas. Em cada uma, um integrante é o cliente de um negócio sorteado e o outro conduz a entrevista.',
      { cards: [card('Quem é o cliente', 'Lê a ficha secreta, esconde e responde só ao que for perguntado.'), card('Quem entrevista', 'Não olha a ficha. Pergunta, aprofunda e registra.'), card('Pepitas', 'Cada cliente guarda três informações que só saem com boas perguntas.'), card('Negócios', 'Pizzaria, estúdio de tatuagem, petshop e escola de dança.')], promptLabel: 'Regra de ouro', prompt: 'Ficha secreta é secreta. Quem entrevista olha para o lado.', resource: resource(2, 'Abrir oficina · Parada 2 · Sorteio', 1) },
      { speech: 'Faço a chamada e sorteio um cliente no projetor para mostrar onde fica a ficha, sem abrir. Explico que o cliente é um personagem: pode ser animado, impaciente ou conversador. Se os relógios dos computadores estiverem errados, a palavra que abre esta parada é ESCUTA.', steps: 'Chamada, regras e sorteio.', watch: 'Cada dupla com os dois clientes sorteados e quem faz o cliente lendo a ficha.' }),
    slide(2, 'Rodada 1 · entrevista', '20:10 - 20:25', 15,
      'Integrante A entrevista; integrante B é o cliente. Comecem pelo problema, não pelas cores.',
      { cards: [card('Perguntar', 'Use os exemplos de cada tema. Prefira perguntas abertas.'), card('Aprofundar', 'Depois de cada resposta curta: “por quê?”, “como assim?”, “me dá um exemplo?”.'), card('Registrar', 'Pelo menos seis temas de oito, com as palavras do cliente.'), card('Fechar', 'Revelar as pepitas, escrever o resumo e pedir a confirmação.')], promptLabel: 'Meta', prompt: 'Resumo de uma frase que o cliente confirma: “é isso mesmo”.', resource: resource(2, 'Abrir oficina · Parada 2 · Rodada 1', 1) },
      { speech: 'Circulo ouvindo as entrevistas. Quando escuto pergunta fechada, sugiro a versão aberta em voz baixa. Às 20:22 aviso que faltam três minutos para revelar as pepitas.', steps: 'Entrevista, pepitas e resumo da Rodada 1.', watch: 'Clientes que seguram as pepitas até a pergunta certa e entrevistadores que usam o contador de “por quê?”.' }),
    slide(2, 'Rodada 2 · troquem os papéis', '20:25 - 20:40', 15,
      'Agora o integrante B entrevista e o integrante A é o cliente do segundo negócio sorteado.',
      { cards: [card('Novo cliente', 'Outra ficha, outro jeito de falar, outras pepitas.'), card('Melhore', 'Usem o que funcionou na Rodada 1.')], promptLabel: 'Meta', prompt: 'Seis temas, um “por quê?”, pepitas reveladas e resumo confirmado.', resource: resource(2, 'Abrir oficina · Parada 2 · Rodada 2', 2) },
      { speech: 'Peço que comparem, em voz baixa, uma pergunta que funcionou na rodada anterior. Às 20:37 aviso o fechamento.', steps: 'Entrevista, pepitas e resumo da Rodada 2.', watch: 'O novo entrevistador começa pelo problema e aprofunda pelo menos uma resposta.' }),
    slide(2, 'Pepitas e escolha do projeto', '20:40 - 20:50', 10,
      'Comparem as duas entrevistas e escolham o briefing que a dupla vai desenvolver nas próximas aulas.',
      { cards: [card('Comparar', 'Temas registrados, pepitas descobertas e clareza do resumo.'), card('Escolher', 'Mais informação concreta ou mais vontade da dupla: os dois motivos valem.')], promptLabel: 'Conversa rápida', prompt: 'Qual pergunta fez uma pepita sair?', resource: resource(2, 'Abrir oficina · Parada 2 · Escolha', 3) },
      { speech: 'Peço a três duplas que contem a pergunta que revelou uma pepita. Fecho com a ideia de que boas perguntas valem mais que boas respostas prontas.', steps: 'Comparação, escolha com motivo e conversa sobre perguntas.', watch: 'Cada dupla com um projeto escolhido e motivo escrito.' }),
    slide(3, 'Parada 3 · Pesquisar antes de desenhar', '20:50 - 20:55', 5,
      'A entrevista mostrou o que o cliente quer. A pesquisa mostra o que já existe, o que inspira e para onde o público está indo.',
      { cards: [card('Entrevista', 'Pesquisa com pessoas: entender o problema.'), card('Concorrentes', 'O que negócios parecidos já mostram.'), card('Referências', 'Boas soluções, mesmo de outros segmentos.'), card('Tendências', 'Mudanças de comportamento que duram.')], promptLabel: 'Na oficina', prompt: 'Quatro perguntas: qual método responde a cada uma?', resource: resource(3, 'Abrir oficina · Parada 3 · Métodos') },
      { speech: 'Faço a chamada e explico a diferença entre pesquisa qualitativa, como a entrevista, e quantitativa, que conta quantas pessoas fazem algo. Se os relógios estiverem errados, a palavra desta parada é FAROL.', steps: 'Chamada, métodos e abertura da parada.', watch: 'As quatro perguntas de método respondidas com o retorno lido.' }),
    slide(3, 'Concorrentes: o que já existe', '20:55 - 21:10', 15,
      'Três concorrentes fictícios do cliente escolhido. Observe no computador e no celular e preencha a comparação.',
      { cards: [card('Seis critérios', 'Horário, ação principal, preço, fotos reais, celular e leitura.'), card('Oportunidade', 'O que nenhum concorrente faz bem é a chance do seu cliente.')], promptLabel: 'Conferir', prompt: 'A oficina diz quantas marcações estão certas, não quais. Olhem de novo.', resource: resource(3, 'Abrir oficina · Parada 3 · Concorrentes') },
      { speech: 'Demonstro o botão Celular num concorrente que corta a página e lembro o contraste da Aula 13. Peço que escrevam a oportunidade com as palavras do cliente.', steps: 'Observação, comparação conferida e oportunidade.', watch: 'Duplas abrindo o modo celular antes de marcar “funciona no celular”.' }),
    slide(3, 'Referências de outros mundos', '21:10 - 21:20', 10,
      'Dez boas ideias de outros tipos de negócio. Levem pelo menos quatro para o painel e digam por que servem ao cliente.',
      { cards: [card('Copiar a ideia', 'Uma agenda de clínica pode inspirar a grade de uma escola de dança.'), card('Não a aparência', 'Referência é solução, não cor nem fonte.')], promptLabel: 'Motivo', prompt: '“Serve porque o público do cliente…”', resource: resource(3, 'Abrir oficina · Parada 3 · Referências') },
      { speech: 'Explico que copiar a aparência de outro site pode violar direitos e não resolve o problema do cliente; copiar a ideia, citando a origem, é pesquisa. Peço um motivo ligado ao público ou ao objetivo.', steps: 'Painel de referências com motivo.', watch: 'Motivos que citam o público ou o objetivo do briefing.' }),
    slide(3, 'Tendências e o telefonema', '21:20 - 21:30', 10,
      'Usar, observar ou evitar? E atenção: o cliente está ligando agora. Algo mudou.',
      { cards: [card('Tendência útil', 'Resolve algo para o público do cliente.'), card('Moda passageira', 'Chama atenção, mas não ajuda a tarefa.'), card('Telefonema', 'O escopo diminuiu: o que fica para depois?')], promptLabel: 'Não entra agora', prompt: 'Um item por linha. O que sai agora não some: vai para a próxima versão.', resource: resource(3, 'Abrir oficina · Parada 3 · Tendências e telefonema') },
      { speech: 'O telefonema abre sozinho às 21:20. Explico que todo projeto real muda no meio, e que a lista “não entra agora” protege o prazo sem brigar com o cliente.', steps: 'Tendências avaliadas e resposta ao telefonema.', watch: 'Listas “não entra agora” com itens concretos e uma mudança no briefing.' }),
    slide(3, 'Painel de referências', '21:30 - 21:35', 5,
      'Confiram o painel, as tendências e a resposta ao cliente. A pesquisa vira argumento no briefing.',
      { cards: [card('Painel', 'Quatro ou mais referências com motivo.'), card('Internet', 'Desafio extra: um achado real, sem login e sem copiar imagens.')], promptLabel: 'Pergunta', prompt: 'Qual achado da pesquisa mais mudou a ideia inicial do projeto?', resource: resource(3, 'Abrir oficina · Parada 3 · Painel') },
      { speech: 'Ouço duas respostas rápidas. Lembro que pesquisa é fonte de inovação: a oportunidade nasce do que ninguém faz bem.', steps: 'Conferência da missão e conversa rápida.', watch: 'Missão da Parada 3 completa; quem terminou está no desafio extra.' }),
    slide(4, 'Parada 4 · Um briefing de uma página', '21:35 - 21:45', 10,
      'A oficina já trouxe as respostas da entrevista. Revisem cada campo e escolham dois requisitos de acessibilidade.',
      { cards: [card('Objetivo', 'Escrito como ação: “A pessoa consegue…”.'), card('Sucesso', 'Algo que dá para ver ou contar.'), card('Acessibilidade', 'Requisito do projeto, como combinado no pacto da Aula 13.')], promptLabel: 'Meta', prompt: 'Uma página que o cliente leria e diria: “é exatamente isso”.', resource: resource(4, 'Abrir oficina · Parada 4 · Briefing') },
      { speech: 'Faço a chamada e mostro a prévia mudando enquanto a dupla escreve. Se os relógios estiverem errados, a palavra desta parada é ACORDO.', steps: 'Chamada e revisão do briefing.', watch: 'Objetivos reescritos como ação e sucesso com número ou comparação.' }),
    slide(4, 'Apresentação no quarteto', '21:45 - 21:55', 10,
      'Juntem-se com a dupla vizinha. Cada dupla apresenta o briefing em dois minutos; a outra valida na tela de quem apresentou.',
      { cards: [card('Apresentar', 'Dois minutos: cliente, problema, objetivo e o que a pesquisa mostrou.'), card('Validar', 'Seis critérios: Sim, Quase ou Não, e uma sugestão.'), card('Ajustar', 'Uma mudança ligada à sugestão.'), card('Próxima aula', 'Este quarteto é o grupo da Aula 15.')], promptLabel: 'Combinado', prompt: 'A validação avalia o briefing, não as pessoas.', resource: resource(4, 'Abrir oficina · Parada 4 · Validação') },
      { speech: 'Organizo os quartetos com duplas vizinhas e cronometro dois minutos por apresentação no projetor.', steps: 'Apresentações em quarteto, validação e ajuste.', watch: 'Validações honestas: “Quase” aparece e vira ajuste.' }),
    slide(4, 'Três briefings para a turma', '21:55 - 22:05', 10,
      'Três duplas apresentam o briefing para a turma. A turma confere: o briefing responde às perguntas essenciais?',
      { cards: [card('Quem apresenta', 'Uma dupla de cada cliente, se possível.'), card('Quem ouve', 'Aponta uma pergunta que ficou sem resposta.')], promptLabel: 'Pergunta para a turma', prompt: 'Com este briefing, dá para começar a desenhar sem adivinhar?', resource: resource(4, 'Abrir oficina · Parada 4 · Prévia') },
      { speech: 'Convido três duplas, respeitando quem preferir não apresentar. Fecho valorizando a pesquisa como fonte de ideias novas e de negócio.', steps: 'Três apresentações e comentários da turma.', watch: 'A turma comenta o briefing com os critérios, não com gosto pessoal.' }),
    slide(4, 'Exportar e próxima aula', '22:05 - 22:10', 5,
      'Exportem a entrega e abram o arquivo baixado. O briefing segue para a arquitetura de informação.',
      { cards: [card('Entrega', 'aula-14-briefing-<dupla>.html'), card('Próxima aula', 'Arquitetura de informação: o quarteto organiza o conteúdo do briefing em menus.')], promptLabel: 'Até 22:10', prompt: 'Exportar, abrir, conferir e organizar o posto.', resource: resource(4, 'Abrir oficina · Parada 4 · Exportar') },
      { speech: 'Confiro a exportação nos postos e peço que guardem o arquivo: ele traz os dados do briefing para as próximas aulas.', steps: 'Exportação e organização do posto.', watch: 'Arquivo aberto em cada posto antes de sair.', rescue: 'Se o download falhar, uso imprimir ou salvar a página conforme o navegador e registro no caderno o briefing de uma página; não invento evidência de exportação.' })
  ]
};
