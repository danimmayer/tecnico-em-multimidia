// Fonte da Aula 13 de Design Web; regenerar com node scripts/build-design-web-13.mjs.
const times = ['19:00 - 19:45', '20:05 - 20:50', '20:50 - 21:35', '21:35 - 22:10'];

export const planning = {
  title: 'Rota Acessível: acessibilidade e usabilidade',
  description: 'Audite uma página com barreiras, meça contraste, ampliação, teclado e texto alternativo, corrija o protótipo para mais pessoas e confirme as correções com outra dupla.',
  objectives: ['Interfaces Web e App: acessibilidade.', 'Ética Pessoal e Profissional: empatia e responsabilidade.'],
  technical: [
    'Identificar padrões, normas e procedimentos para elaboração do projeto de mídias digitais, referentes a propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.',
    'Analisar usabilidade e navegabilidade do projeto.'
  ],
  socio: ['Demonstrar postura conciliadora, respeitando diferenças culturais, étnicas, religiosas e de gênero na conduta pessoal e profissional.'],
  blocks: [
    'Auditar a página fictícia da Virada Criativa com sete pontos — foco, contraste, tamanho de texto, área de toque, rótulos, legenda e ordem de leitura — e registrar ao menos cinco barreiras com a medição que as comprova e quem é afetado.',
    'Percorrer quatro estações de 10 minutos: contraste, ampliação a 200%, navegação só por teclado e texto alternativo. Em cada estação, medir, experimentar uma alternativa e registrar uma barreira.',
    'Oficina "Protótipo para mais pessoas": corrigir no editor visual pelo menos três barreiras, responder ao corte de dados para conexão lenta e comparar antes e depois com justificativa.',
    'Teste cruzado: outra dupla realiza quatro tarefas na versão corrigida sem receber dicas. Ajustar um ponto observado, firmar o pacto da turma sobre públicos diversos e conexões lentas e exportar a entrega.'
  ],
  times,
  methodology: 'Auditoria orientada por medições, rotação por quatro estações no próprio posto, correção visual sem programação e verificação entre pares com tarefas observáveis. As barreiras são analisadas no produto; ninguém simula uma deficiência.',
  resources: 'Computadores com navegador e a oficina da Aula 13 na Vercel, com kit offline como reserva; projetor com a apresentação na plataforma; teclado em cada posto; caderno e caneta. Sem login, instalação, impressão ou dados pessoais.',
  observation: '19:00–22:10, intervalo 19:45–20:05. Chamada às 19:00, 20:05, 20:50 e 21:35. Duplas no mesmo posto, alternando quem opera. As estações rodam pelo tempo: ao sinal, todas as duplas avançam para a próxima. Página, pessoas e dados são fictícios; os verificadores medem a página de demonstração e não avaliam pessoas. A oficina salva o progresso no navegador quando disponível; exportar antes de fechar. Sem internet, usar o kit offline; sem computador, seguir a alternativa em caderno do guia docente.'
};

export const lesson = { ...planning, socioemotional: planning.socio, schedule: times.map((horario, i) => ({ horario, atividade: planning.blocks[i] })) };
delete lesson.blocks; delete lesson.times; delete lesson.socio;

export const workshopUrl = 'https://oficinas-design-web.vercel.app/aula-13/';
const resource = (phase, label = 'Abrir oficina da Aula 13', station) => ({ href: `${workshopUrl}?fase=${phase}${station ? `&estacao=${station}` : ''}`, label });
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
  teacherGoal: 'Ao fim da noite, cada dupla terá exportado um HTML com cinco barreiras medidas, quatro registros de estação, pelo menos três correções justificadas com antes e depois, o plano de dados para conexão lenta, o resultado do teste cruzado e o pacto assinado com o apelido da dupla.',
  routine: [
    'Antes da aula, abro a oficina da Aula 13 na Vercel, faço uma exportação de teste e confiro se cada posto tem teclado funcionando. Deixo o kit offline extraído como reserva.',
    'Faço chamada às 19:00, 20:05, 20:50 e 21:35. Projeto só a parada da vez; as quatro paradas ficam abertas, mas cada bloco termina com o registro da parada preenchido.',
    'Nas estações, cronometro 10 minutos e anuncio a troca. Quem terminou antes faz a extensão da própria estação, sem avançar para a seguinte.',
    'Reforço desde o início: medimos barreiras do produto, não limitações de pessoas. Não proponho vendas nos olhos, óculos embaçados nem imitação de deficiência.'
  ],
  onlineRoutine: 'Os estudantes usam https://oficinas-design-web.vercel.app/aula-13/ e os links diretos ?fase=1 a ?fase=4; esta apresentação fica na plataforma. Se a internet cair, extraio o kit offline e abro index.html por duplo clique. Se o navegador bloquear o armazenamento local, a dupla trabalha sem fechar a página e exporta no fim.',
  plainLanguage: 'Acessibilidade é tirar do caminho as barreiras que impedem alguém de perceber, entender e usar uma página. Usabilidade é conseguir cumprir a tarefa com eficácia, sem esforço desnecessário. Quando uma página falha, a falha é do projeto — e quem projeta pode corrigir.',
  say: 'Lembram do Ravi, que usa zoom de 200% e procurava uma entrada sem degraus? Hoje a página da Virada Criativa chega com barreiras de propósito. Nosso trabalho é encontrar cada uma com uma medição, corrigir sem apagar a marca e provar, com outra dupla testando, que a página ficou melhor para mais pessoas.',
  demo: [
    'Na Parada 1, ligo Inspecionar, clico no texto de data e local e leio a medição: contraste 2,5:1 e letra de 11 px. Registro o critério e quem é afetado.',
    'Pressiono Tab na página de demonstração e mostro que o foco some e que o botão Inscrever nunca é alcançado.',
    'Na estação de contraste, movo o controle até passar de 4,5:1 mantendo o amarelo da marca no botão.',
    'Na Parada 3, aplico uma correção, escrevo quem ganha com ela e alterno entre Antes e Depois.'
  ],
  studentDeliverable: 'Arquivo HTML exportado pela oficina com: cinco barreiras auditadas com medição e pessoa afetada; quatro registros de estação; três ou mais correções justificadas, com as versões antes e depois incorporadas; o plano de dados para conexão lenta; as quatro tarefas do teste cruzado; o ajuste feito e o pacto. A exportação parcial aponta as pendências. Sem computador: quatro páginas no caderno, conforme o guia docente.',
  check: [
    'Cinco barreiras diferentes, cada uma com critério, medição da ferramenta e quem pode ser afetado em qual tarefa.',
    'As quatro estações têm um registro próprio: par de cores e razão de contraste, conteúdo cortado no zoom, percurso do teclado e textos alternativos por função.',
    'Pelo menos três correções aplicadas, cada uma com justificativa, e a página corrigida comparada com a original.',
    'A página corrigida pesa até 1 MB sem perder informação e a dupla explica a escolha.',
    'Outra dupla realizou as quatro tarefas sem dicas; houve um ajuste ligado ao que foi observado.',
    'O pacto tem três compromissos e uma frase própria; a entrega HTML foi exportada e aberta.'
  ],
  fallback: 'Sem internet, abrir o kit offline. Sem computador para a dupla, projetar a página de demonstração e as estações e registrar no caderno: barreira, medição lida no projetor, quem é afetado e a correção proposta em esboço de antes e depois. O teste cruzado vira leitura do esboço por outra dupla, que tenta cumprir as quatro tarefas apontando no papel.',
  extension: 'Quem termina cedo audita a própria oficina com as mesmas ferramentas — teclado, zoom e contraste — e registra uma barreira encontrada ou a evidência de que o critério foi cumprido. Na Parada 3, tenta caber em 0,6 MB sem retirar informação.',
  commonProblems: [
    ['A dupla registra “está feio” como barreira', 'Peço o critério, a medição e a tarefa que fica difícil: “contraste 2,5:1 no horário; quem tem baixa visão não lê a hora da conversa”.'],
    ['Alguém propõe imitar uma deficiência para “sentir na pele”', 'Explico que a atividade avalia o produto. Usamos teclado, zoom e medições porque são formas reais de uso, sem transformar pessoas em fantasia.'],
    ['A correção apaga a identidade visual', 'Lembro que o amarelo da marca pode continuar no fundo do botão; muda-se o texto para azul-escuro e a razão passa de 10:1.'],
    ['O Tab não faz nada', 'Peço um clique dentro da página de demonstração antes de pressionar Tab; em notebooks, confiro se a tecla não está presa a outra função.'],
    ['O tempo aperta no fim', 'Preservo três correções, as quatro tarefas do teste e o pacto. Às 22:05 todos exportam; a extensão é sempre opcional.']
  ],
  presentationSlides: [
    slide(1, 'Uma página para mais pessoas', '19:00 - 19:05', 5,
      'A Virada Criativa publicou a página da conversa “Criar para todo mundo”. Ela é bonita. Mas quem consegue usar?',
      { cards: [card('Hoje', 'Auditar, medir, corrigir e testar a página fictícia da Virada.'), card('Entrega', 'Um HTML exportado com antes, depois e o pacto da turma.')], promptLabel: 'Sua vez', prompt: 'Abra a oficina da Aula 13, escreva o apelido da dupla e combine quem opera primeiro.', resource: resource(1) },
      { speech: 'Faço a chamada e retomo Ana e Ravi, da Aula 12: necessidades reais apareceram nos dossiês. Hoje a página chega com barreiras de propósito para serem encontradas.', steps: 'Chamada, retomada da Aula 12 e abertura da oficina.', watch: 'Todas as duplas com a oficina aberta e o apelido preenchido, sem nomes completos.' }),
    slide(1, 'A barreira está no projeto', '19:05 - 19:10', 5,
      'Uma pessoa não “tem dificuldade com o site”: o site é que criou um obstáculo. E o que foi projetado pode ser corrigido.',
      { cards: [card('Acessibilidade', 'Perceber, entender e operar a página, com ou sem deficiência.'), card('Usabilidade', 'Cumprir a tarefa com eficácia, sem esforço desnecessário.'), card('Responsabilidade', 'Lei Brasileira de Inclusão (Lei 13.146/2015) e WCAG: referências para quem projeta.')], promptLabel: 'Pense', prompt: 'Que tarefa a página da Virada precisa permitir a qualquer visitante?' },
      { speech: 'Apresento o modelo de barreira: o problema está no ambiente. Cito a Lei Brasileira de Inclusão e as diretrizes WCAG como referências, sem transformar a aula em leitura de norma. Deixo claro que ninguém vai imitar deficiência.', steps: 'Conceito curto e pergunta para a turma: descobrir horário, local e se inscrever.', watch: 'A turma fala do produto (“o texto está apagado”), não da pessoa (“ele não enxerga direito”).' }),
    slide(1, 'Sete pontos de auditoria', '19:10 - 19:15', 5,
      'Uma auditoria começa por pontos que podem ser verificados. Gosto pessoal não entra na ficha.',
      { cards: [card('Foco e contraste', 'Dá para ver onde o teclado está? O texto se destaca do fundo?'), card('Texto e toque', 'A letra pode ser lida e ampliada? O alvo cabe um dedo?'), card('Rótulos e legenda', 'Cada campo diz o que pede? O vídeo pode ser entendido sem som?'), card('Ordem de leitura', 'A sequência lida faz sentido igual à sequência vista?')], promptLabel: 'Demonstração', prompt: 'Inspecionar → clicar no elemento → ler a medição → escolher o critério → escrever quem é afetado.', resource: resource(1) },
      { speech: 'Demonstro um registro completo no texto de data e local: contraste 2,5:1 e letra de 11 px. Mostro que a medição vem da ferramenta e que a dupla escreve quem é afetado em qual tarefa.', steps: 'Demonstração de um registro completo, sem resolver os outros.', watch: 'O registro de exemplo fica no projetor; as duplas não copiam o mesmo elemento como primeira barreira.' }),
    slide(1, 'Parada 1 · audite a página da Virada', '19:15 - 19:30', 15,
      'Inspecione elementos da página e registre ao menos cinco barreiras diferentes. Cada registro tem critério, medição e pessoa afetada.',
      { cards: [card('Mínimo', 'Cinco barreiras com critérios ou elementos diferentes.'), card('Evidência', 'A medição aparece sozinha; vocês explicam o efeito na tarefa.')], promptLabel: 'Regra', prompt: 'Se a medição indicar que o critério foi cumprido, procure outra barreira no mesmo elemento ou outro elemento.', resource: resource(1, 'Abrir oficina · Parada 1 · Auditoria') },
      { speech: 'Circulo primeiro por quem ainda não registrou nada. Peço que alternem quem opera a cada barreira.', steps: 'Auditoria em duplas, com troca de operador a cada registro.', watch: 'Registros do tipo “quem tem baixa visão não lê o horário da conversa”, ligados a uma tarefa concreta.' }),
    slide(1, 'Confirme com as ferramentas', '19:30 - 19:40', 10,
      'Quatro ferramentas confirmam o que os olhos sugerem. Use pelo menos duas antes de fechar a auditoria.',
      { cards: [card('Teclado', 'Clique na página e pressione Tab. O rastro mostra por onde o foco passou.'), card('Zoom 200%', 'A página ampliada perde algum trecho?'), card('Sem cor', 'O aviso de erro continua visível sem a cor?'), card('Leitura linear', 'A ordem lida faz sentido? Imagens e campos têm nome?')], promptLabel: 'Pergunta', prompt: 'Qual ferramenta revelou uma barreira que vocês não tinham visto?', resource: resource(1, 'Abrir oficina · Parada 1 · Ferramentas') },
      { speech: 'Explico que a leitura linear é uma aproximação didática do que um leitor de tela anuncia; leitores reais variam. Sem cor serve para conferir se a informação depende só da cor, não para imitar como alguém enxerga.', steps: 'Uso de duas ferramentas e complemento dos registros.', watch: 'O rastro de teclado mostra que o botão Inscrever nunca recebe foco; a leitura linear começa pelo formulário.' }),
    slide(1, 'Salve antes do lanche', '19:40 - 19:45', 5,
      'Confira o contador de barreiras e exporte uma cópia parcial. O trabalho continua neste navegador.',
      { cards: [card('Contador', '5 de 5 barreiras registradas.'), card('Retorno', '20:05, no mesmo posto e com a mesma dupla.')], promptLabel: 'Antes de sair', prompt: 'Exporte a entrega parcial e não feche a aba da oficina.', resource: resource(1) },
      { speech: 'Peço a exportação parcial como segurança. Quem não chegou a cinco registra ao menos três e completa na volta.', steps: 'Conferência do contador e exportação parcial.', watch: 'Arquivo baixado em cada posto antes do intervalo.' }),
    slide(1, 'Intervalo', '19:45 - 20:05', 20,
      'Lanche das 19:45 às 20:05. Na volta, as quatro estações começam juntas.',
      { promptLabel: 'Retorno', prompt: '20:05 · mesmo posto · Estação 1, contraste.' },
      { speech: 'Intervalo fora do tempo de atividade. Deixo o slide da estação 1 pronto para a volta.', steps: 'Intervalo.', watch: 'Abas da oficina abertas nos postos.', pace: 'break' }),
    slide(2, 'Quatro estações, uma barreira em cada', '20:05 - 20:10', 5,
      'As estações rodam pelo relógio: 10 minutos cada. Ao sinal, todas as duplas avançam juntas.',
      { cards: [card('1 · Contraste', 'Medir e ajustar um par de cores.'), card('2 · Zoom', 'Ampliar até 200% e ver o que se perde.'), card('3 · Teclado', 'Inscrever-se sem usar o mouse.'), card('4 · Texto alternativo', 'Descrever imagens pela função que cumprem.')], promptLabel: 'Combinado', prompt: 'Cada estação termina com um registro: o que vocês mediram, quem é afetado e o que mudaria.', resource: resource(2, 'Abrir oficina · Parada 2 · Estações') },
      { speech: 'Faço a chamada e explico a rotação. Quem termina antes faz a extensão da própria estação; não avança.', steps: 'Chamada e regras da rotação.', watch: 'Todas as duplas na Estação 1 ao mesmo tempo.' }),
    slide(2, 'Estação 1 · Contraste', '20:10 - 20:20', 10,
      'Escolha um par de cores da página e ajuste até passar de 4,5:1 para texto comum. A cor da marca pode ficar.',
      { cards: [card('Mínimo AA', '4,5:1 para texto comum; 3:1 para texto grande.'), card('Dica de marca', 'O amarelo do botão pode continuar no fundo; mude o texto.')], promptLabel: 'Registro', prompt: 'Par de cores, razão antes e depois e quem ganha com a mudança.', resource: resource(2, 'Abrir oficina · Estação 1 · Contraste', 1) },
      { speech: 'Mostro que a razão é calculada pela fórmula de luminância das WCAG. O número orienta; a leitura confirma.', steps: 'Medir, ajustar e registrar um par.', watch: 'A dupla não troca todas as cores da marca por preto e branco sem necessidade.' }),
    slide(2, 'Estação 2 · Zoom 200%', '20:20 - 20:30', 10,
      'Amplie o cartão de informações. Num layout de largura fixa, palavras somem da tela. Descubra quais.',
      { cards: [card('Ampliar', 'Leve o controle a 200% e depois a 400%.'), card('Comparar', 'Ative o layout fluido e veja se o texto se reorganiza.')], promptLabel: 'Registro', prompt: 'O que ficou fora da tela com a largura fixa e o que mudou com o layout fluido?', resource: resource(2, 'Abrir oficina · Estação 2 · Zoom', 2) },
      { speech: 'Retomo Ravi: com zoom de 200%, ele perdia o começo das frases. A medição lista as informações cortadas.', steps: 'Ampliar, comparar layouts e registrar.', watch: 'A dupla nomeia o que desaparece na largura fixa — em geral “entrada gratuita” e “intérprete de Libras”, o fim da linha.' }),
    slide(2, 'Estação 3 · Só teclado', '20:30 - 20:40', 10,
      'Inscreva-se na conversa sem tocar no mouse. Tab avança, Shift+Tab volta, Enter ou Espaço acionam.',
      { cards: [card('Versão original', 'Conte as tentativas e veja onde o foco se perde.'), card('Versão com botões reais', 'Repita e compare o número de Tabs.')], promptLabel: 'Registro', prompt: 'Onde o teclado travou, quantos Tabs foram usados e o que resolveu?', resource: resource(2, 'Abrir oficina · Estação 3 · Teclado', 3) },
      { speech: 'Explico que muita gente navega por teclado ou por dispositivos que funcionam como ele. Um “botão” feito de caixa sem função de botão não é alcançado.', steps: 'Duas tentativas por teclado e registro.', watch: 'O mouse fica parado; quem opera troca na segunda tentativa.' }),
    slide(2, 'Estação 4 · Texto alternativo', '20:40 - 20:50', 10,
      'Quatro imagens, quatro funções. Escolha a função antes de escrever: informativa, decorativa, funcional ou complexa.',
      { cards: [card('Informativa', 'Diga o que importa na imagem, sem “imagem de”.'), card('Decorativa', 'Fica vazia para não atrapalhar a leitura.'), card('Funcional', 'Descreva a ação do botão, não o desenho.'), card('Complexa', 'Resumo curto e a informação completa em texto ao lado.')], promptLabel: 'Registro', prompt: 'Qual imagem era mais difícil de descrever e por quê?', resource: resource(2, 'Abrir oficina · Estação 4 · Texto alternativo', 4) },
      { speech: 'Mostro que o mapa da rota não cabe num texto alternativo curto: precisa de um texto equivalente na página. O ornamento fica vazio.', steps: 'Quatro descrições e registro da estação.', watch: 'Textos que começam com “imagem de” ou repetem o nome do arquivo são revistos.' }),
    slide(3, 'Parada 3 · Protótipo para mais pessoas', '20:50 - 20:55', 5,
      'Agora a dupla corrige. Escolha pelo menos três barreiras da auditoria e corrija no editor visual, sem escrever código.',
      { cards: [card('Prioridade', 'Comece pelo que impede a tarefa: inscrição, horário e rota.'), card('Justificativa', 'Cada correção diz quem ganha com ela.')], promptLabel: 'Regra', prompt: 'Uma correção só conta quando tem justificativa.', resource: resource(3, 'Abrir oficina · Parada 3 · Correções') },
      { speech: 'Faço a chamada e demonstro uma correção com justificativa. Mostro a alternância entre Antes e Depois.', steps: 'Chamada e demonstração de uma correção.', watch: 'As duplas escolhem pelo impacto na tarefa, não pela correção mais fácil.' }),
    slide(3, 'Corrija sem apagar a marca', '20:55 - 21:15', 20,
      'Contraste, foco, texto, toque, rótulos, legenda, ordem, imagens e cor do erro: cada painel tem uma decisão e uma justificativa.',
      { cards: [card('Marca', 'Amarelo, azul e a fonte de títulos podem continuar.'), card('Conferência', 'Use Tab e Zoom 200% na versão Depois para checar o efeito.')], promptLabel: 'Meta', prompt: 'Três correções no mínimo; cinco se a dupla estiver no ritmo.', resource: resource(3, 'Abrir oficina · Parada 3 · Corrigir') },
      { speech: 'Circulo pelos postos perguntando: quem ganha com essa correção e em qual tarefa? Na legenda, lembro do intérprete de Libras citado na fala da curadoria.', steps: 'Correções e justificativas em dupla.', watch: 'Correções conferidas na própria página Depois, com teclado e zoom.' }),
    slide(3, 'Choque: conexão lenta no ponto de ônibus', '21:15 - 21:25', 10,
      'Ana abre a página no celular, no ponto de ônibus, com pacote de dados no fim. A página pesa 6 MB. O limite agora é 1 MB.',
      { cards: [card('Corte', 'Até 1 MB, sem perder informação para quem visita.'), card('Tempo', 'A oficina estima o carregamento a 400 kbps.')], promptLabel: 'Decisão', prompt: 'O que vocês tiram, trocam ou adiam? A informação continua disponível?', resource: resource(3, 'Abrir oficina · Parada 3 · Conexão lenta') },
      { speech: 'Explico que conexão lenta e pacote limitado também são barreiras, e que páginas leves gastam menos energia e dados. Remover o vídeo sem transcrição tira informação: a oficina avisa.', steps: 'Abrir o choque, escolher otimizações e justificar.', watch: 'Ninguém atinge 1 MB apagando a fala da curadoria sem oferecer a transcrição.' }),
    slide(3, 'Antes e depois', '21:25 - 21:35', 10,
      'Compare as duas versões lado a lado. A exportação guarda as duas páginas para quem avaliar.',
      { cards: [card('Antes', 'A página original, com as barreiras.'), card('Depois', 'A página com as correções da dupla.')], promptLabel: 'Registro', prompt: 'Em uma frase: qual mudança mais protege o visitante?', resource: resource(3, 'Abrir oficina · Parada 3 · Comparar') },
      { speech: 'Peço que leiam a comparação em voz baixa para a dupla e escrevam a frase-síntese.', steps: 'Comparação e frase-síntese.', watch: 'Contador de correções em três ou mais e justificativas preenchidas.' }),
    slide(4, 'Parada 4 · teste cruzado', '21:35 - 21:38', 3,
      'Troquem de posto com a dupla vizinha. Quem testa usa a página corrigida; quem criou observa em silêncio.',
      { cards: [card('Quem testa', 'Lê a tarefa, tenta e marca o resultado.'), card('Quem criou', 'Não explica, não aponta, não toca no teclado.')], promptLabel: 'Combinado', prompt: 'Teste a página, não a pessoa. O resultado mostra onde a página ainda falha.', resource: resource(4, 'Abrir oficina · Parada 4 · Teste cruzado') },
      { speech: 'Faço a chamada e organizo as trocas de posto em pares de duplas vizinhas.', steps: 'Chamada e troca de postos.', watch: 'Cada posto com uma dupla testadora e a dupla autora observando.' }),
    slide(4, 'Quatro tarefas, sem dicas', '21:38 - 21:50', 12,
      'Horário e local, botão Inscrever pelo teclado, rota sem degraus com zoom 200% e erro do formulário vazio.',
      { cards: [card('Consegui sem ajuda', 'A página deu conta.'), card('Consegui com hesitação', 'Anote onde parou.'), card('Não consegui', 'Anote o que faltou.')], promptLabel: 'Registro', prompt: 'Uma observação por tarefa, escrita por quem testou.', resource: resource(4, 'Abrir oficina · Parada 4 · Tarefas') },
      { speech: 'Observo se as duplas autoras ficam em silêncio. O rastro do teclado registra sozinho se o foco chegou ao botão.', steps: 'Quatro tarefas e observações da dupla testadora.', watch: 'Nenhuma dupla autora explicando a página durante o teste.' }),
    slide(4, 'Devolva e ajuste uma coisa', '21:50 - 21:57', 7,
      'Voltem aos postos. Leiam o que a outra dupla observou e ajustem um ponto na Parada 3.',
      { cards: [card('Ler', 'Onde a outra dupla hesitou ou não conseguiu?'), card('Ajustar', 'Uma mudança ligada a uma observação, registrada aqui.')], promptLabel: 'Regra', prompt: 'O ajuste responde a uma observação do teste, não a uma ideia nova.', resource: resource(4, 'Abrir oficina · Parada 4 · Ajuste') },
      { speech: 'Se o teste não revelou problema, peço que registrem a evidência de sucesso em vez de inventar uma falha.', steps: 'Retorno aos postos e um ajuste.', watch: 'Ajuste ligado a uma tarefa observada.' }),
    slide(4, 'Pacto da turma', '21:57 - 22:05', 8,
      'Quem projeta decide quem consegue entrar. Escolham três compromissos e escrevam uma frase própria.',
      { cards: [card('Públicos diversos', 'Pessoas com deficiência, idosas, com pressa, com pouca familiaridade digital.'), card('Conexões lentas', 'Páginas leves alcançam quem tem pacote limitado e gastam menos energia.'), card('Ofício', 'Acessibilidade entra no projeto desde o rascunho, não no fim.')], promptLabel: 'Fechamento', prompt: 'Três duplas leem a própria frase do pacto em voz alta.', resource: resource(4, 'Abrir oficina · Parada 4 · Pacto') },
      { speech: 'Faço o fechamento sobre responsabilidade do designer com públicos diversos e conexões lentas. Convido três duplas a ler a frase; respeito quem preferir não ler.', steps: 'Pacto, leitura de três frases e fechamento.', watch: 'Frases ligadas a ações concretas de projeto, não a promessas genéricas.' }),
    slide(4, 'Exportar e organizar', '22:05 - 22:10', 5,
      'Exporte a entrega da noite e abra o arquivo baixado. Confira as quatro partes e as páginas antes e depois.',
      { cards: [card('Entrega', 'aula-13-rota-acessivel-<dupla>.html'), card('Próxima aula', 'Briefing e pesquisa: a acessibilidade entra no projeto desde o começo.')], promptLabel: 'Até 22:10', prompt: 'Exportar, abrir, conferir e organizar o posto.', resource: resource(4, 'Abrir oficina · Parada 4 · Exportar') },
      { speech: 'Confiro a exportação nos postos e antecipo que, na Aula 14, acessibilidade será requisito do briefing.', steps: 'Exportação e organização do posto.', watch: 'Arquivo aberto em cada posto antes de sair.', rescue: 'Se o download falhar, uso imprimir ou salvar a página conforme o navegador e registro no caderno as quatro partes; não invento evidência de exportação.' })
  ]
};
