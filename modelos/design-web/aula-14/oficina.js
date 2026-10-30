(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const norm = (text = '') => String(text).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const KEY = 'senai-design-web-14-briefing-v1';
  const MIN_TOPICS = 6, MIN_REFS = 3, MIN_TRENDS = 3, MIN_MATRIX = 15, MIN_QUESTIONS = 3;
  const filled = (value, min = 12) => typeof value === 'string' && value.trim().length >= min;

  /* ---------- Parada 1 · Aquecimento: pedido vago ou briefing? ---------- */
  const WARMUP = [
    ['“Quero um site moderno e bonito.”', false, 'Moderno para quem? Não diz problema, público nem o que a pessoa vai fazer no site.'],
    ['“Pais de alunos precisam ver o horário das turmas pelo celular, sem ligar para a escola.”', true, 'Tem público, tarefa e contexto de uso.'],
    ['“Faz igual ao site da concorrência, só que melhor.”', false, 'Melhor em quê? Uma referência sem motivo não orienta o projeto.'],
    ['“Até 30 de novembro, a página precisa mostrar o cardápio da semana e um botão de pedido por mensagem.”', true, 'Prazo, conteúdo e ação principal ficaram claros.'],
    ['“Coloca bastante animação para chamar atenção.”', false, 'É uma solução sem problema. Animação para quê, e para quem?'],
    ['“Sucesso é dobrar os agendamentos de banho às terças, hoje o dia mais vazio.”', true, 'Critério de sucesso que dá para observar e medir.'],
    ['“Quero que todo mundo goste.”', false, '“Todo mundo” não é público: não ajuda a decidir nada.'],
    ['“Não temos fotos profissionais: as imagens virão do celular do dono, na próxima semana.”', true, 'Conteúdo disponível, conteúdo faltante e prazo para chegar.']
  ];

  /* ---------- Parada 1 · Anatomia de um briefing bem-feito ---------- */
  const PARTS = [
    ['cliente', 'Cliente'], ['problema', 'Problema'], ['objetivo', 'Objetivo'], ['publico', 'Público'], ['conteudo', 'Conteúdo'],
    ['referencias', 'Referências'], ['prazo', 'Prazo'], ['restricoes', 'Restrições e requisitos'], ['sucesso', 'Critério de sucesso']
  ];
  const partName = id => (PARTS.find(([key]) => key === id) || ['', id])[1];
  const GOOD = [
    ['cliente', 'A Pedal Leve é uma oficina de bicicletas com dois mecânicos, aberta há seis anos no centro da cidade.'],
    ['problema', 'Hoje os clientes ligam para perguntar preço e prazo de conserto, e o telefone toca o dia inteiro durante o trabalho.'],
    ['objetivo', 'O site deve permitir que a pessoa descubra o preço dos serviços mais comuns e peça um orçamento por mensagem, com a foto da bicicleta.'],
    ['publico', 'Quem mais usa são pessoas de 20 a 45 anos que usam a bicicleta para ir ao trabalho e acessam pelo celular no intervalo do almoço.'],
    ['conteudo', 'Já existem a tabela de preços e o endereço; faltam fotos da oficina e um texto curto sobre cada serviço.'],
    ['referencias', 'O dono admira o site de uma lavanderia que mostra os preços em cartões grandes, porque se entende em segundos.'],
    ['prazo', 'A primeira versão precisa estar no ar em cinco semanas, antes das férias escolares, quando o movimento aumenta.'],
    ['restricoes', 'Não haverá pagamento pelo site, o orçamento é pequeno e as páginas precisam ser leves para quem usa dados móveis.'],
    ['sucesso', 'Em dois meses, metade dos orçamentos deve chegar por mensagem e as ligações devem cair pela metade.'],
    ['restricoes', 'O site precisa ter contraste suficiente, texto que pode ser ampliado e botões fáceis de tocar.']
  ];

  /* ---------- Parada 1 · Caça aos furos de um briefing fraco ---------- */
  const WEAK_TEXT = 'Salão Bela Vista. Queremos um site moderno, com a nossa cara. Funcionamos de terça a sábado, das 9h às 19h, no bairro Vila Nova. Temos 40 fotos de cortes, feitas por um fotógrafo em agosto. Tem que ficar pronto o quanto antes. Nosso público é todo mundo. Pode usar as cores que achar melhor. O importante é ficar bonito.';
  const WEAK = [
    ['problema', true, 'O texto não diz o que está atrapalhando o salão hoje.'],
    ['objetivo', true, '“Site moderno” não diz o que a pessoa deve conseguir fazer.'],
    ['publico', true, '“Todo mundo” não orienta nenhuma decisão.'],
    ['conteudo', false, 'É a única parte com algo concreto: 40 fotos de agosto. Ainda vale perguntar o que falta (textos, preços), mas não está vazia.'],
    ['referencias', true, '“As cores que achar melhor” não é referência; falta o que o cliente admira e por quê.'],
    ['prazo', true, '“O quanto antes” não é data.'],
    ['restricoes', true, 'Nada sobre orçamento, equipe, regras ou acessibilidade.'],
    ['sucesso', true, '“Ficar bonito” não pode ser observado nem medido.']
  ];
  const FHP = [
    ['O salão abre às 9h.', 'fato'], ['Acho que os clientes preferem agendar por mensagem.', 'hipotese'],
    ['Precisamos descobrir se os clientes mais velhos agendam pelo celular.', 'pergunta'], ['Na última terça, o salão atendeu só três clientes.', 'fato'],
    ['Um site com vídeo deve atrair mais clientes jovens.', 'hipotese'], ['Quem vai atualizar os preços quando mudarem?', 'pergunta']
  ];
  const FHP_LABELS = [['fato', 'Fato'], ['hipotese', 'Hipótese'], ['pergunta', 'Pergunta']];

  /* ---------- Parada 2 · Clientes fictícios com ficha secreta ---------- */
  const TOPICS = [
    ['problema', 'Problema', ['O que está atrapalhando o negócio hoje?', 'Me conta uma situação em que isso aconteceu.']],
    ['objetivo', 'Objetivo', ['Com o site no ar, o que a pessoa deve conseguir fazer?', 'Por que isso é importante agora?']],
    ['publico', 'Público', ['Quem mais procura vocês?', 'Como essas pessoas chegam até vocês?']],
    ['conteudo', 'Conteúdo', ['O que já existe pronto: textos, fotos, preços?', 'O que falta, e quem pode produzir?']],
    ['referencias', 'Referências', ['Que site você acha fácil de usar? Por quê?', 'Tem algum que você não quer parecer?']],
    ['prazo', 'Prazo', ['Para quando precisa estar no ar?', 'O que acontece nessa data?']],
    ['restricoes', 'Restrições', ['O que não pode acontecer?', 'Existe limite de orçamento, de equipe ou de regra?']],
    ['sucesso', 'Sucesso', ['Como vamos saber que deu certo?', 'O que muda depois de um mês?']]
  ];
  const HEURISTICS = [
    ['horario', 'Horário e endereço visíveis'], ['acao', 'Ação principal clara'], ['preco', 'Preço ou orçamento explicado'],
    ['fotos', 'Fotos reais do serviço'], ['celular', 'Funciona bem no celular'], ['contraste', 'Texto fácil de ler']
  ];
  const f = (horario, acao, preco, fotos, celular, contraste) => ({horario, acao, preco, fotos, celular, contraste});
  const CLIENTS = {
    pizzaria: {
      name:'Pizzaria Forno da Vila', person:'Seu Toninho', role:'dono há 15 anos', color:'#b42318', action:'Pedir pizza',
      pedido:'Quero um site moderno, igual ao das grandes redes.',
      acting:'Fale da pizza com orgulho. Responda curto. Só explique mais quando perguntarem “por quê?” ou “como assim?”.',
      topics:{
        problema:'No sábado à noite o telefone não para. Muita gente desiste porque só dá ocupado.',
        objetivo:'Quero mais pedidos sem perder ligação.',
        publico:'Famílias do bairro e o pessoal da faculdade aqui perto.',
        conteudo:'Tenho o cardápio impresso. Fotos, só umas antigas do balcão.',
        referencias:'Gosto do site da sorveteria da praça: dá para ver os sabores rapidinho.',
        prazo:'Precisa estar pronto antes do Festival do Bairro, daqui a seis semanas.',
        restricoes:'Não quero pagamento pelo site: a taxa é alta. Entrego até 3 km.',
        sucesso:'Se o telefone parar de dar ocupado no sábado, já fico feliz.'
      },
      pepitas:[
        ['publico', 'Se perguntarem como os estudantes pedem', 'Os estudantes pedem em grupo e sempre perguntam o preço por fatia e os combos.'],
        ['problema', 'Se perguntarem por que tanta gente liga', 'Metade das ligações é só para saber se ainda tem a pizza do dia, que muda toda quarta-feira.'],
        ['conteudo', 'Se perguntarem quem pode fazer fotos ou textos', 'Meu sobrinho tira boas fotos com o celular e pode fotografar as pizzas na segunda, dia de folga.']
      ],
      call:'Seu Toninho ligou: o Festival do Bairro foi antecipado. O prazo caiu de seis para quatro semanas.',
      gap:'horario',
      rivals:[
        {name:'Pizza Já Express', tagline:'A pizza mais rápida da região', f:f(false, true, true, false, true, true)},
        {name:'Cantina Bella Massa', tagline:'Tradição italiana desde 1998', f:f(false, false, true, true, false, false)},
        {name:'Rei da Fatia', tagline:'Fatias gigantes a qualquer hora', f:f(false, true, false, true, true, true)}
      ]
    },
    tatuagem: {
      name:'Estúdio Traço Fino', person:'Mari', role:'tatuadora há 8 anos', color:'#3f3f46', action:'Enviar sua ideia',
      pedido:'Quero um site com a minha cara, bem escuro e artístico.',
      acting:'Você é artista e fala do seu estilo com paixão. Fica impaciente com pergunta genérica como “o que você quer?”.',
      topics:{
        problema:'Passo horas respondendo as mesmas mensagens: preço, cuidados, se dói.',
        objetivo:'Quero receber pedidos de orçamento já com a ideia da tatuagem explicada.',
        publico:'Gente de 18 a 35 anos que conhece meu trabalho pelas redes sociais.',
        conteudo:'Tenho muitas fotos de tatuagens prontas, mas misturadas, sem organização.',
        referencias:'Gosto de sites de galerias de arte: fundo escuro e imagem grande.',
        prazo:'Sem pressa, mas antes da convenção de tatuagem, em março.',
        restricoes:'Só atendo maiores de 18 anos. Não faço orçamento sem ver uma referência da ideia.',
        sucesso:'Quero receber metade das perguntas repetidas que recebo hoje.'
      },
      pepitas:[
        ['conteudo', 'Se perguntarem como organizar as fotos', 'Trabalho com três estilos: traço fino, aquarela e lettering. Cada cliente procura um só.'],
        ['problema', 'Se perguntarem qual é a dúvida mais repetida', 'A dúvida número 1 é sobre os cuidados depois da tatuagem. Tenho um texto pronto que mando sempre.'],
        ['publico', 'Se perguntarem como as pessoas abrem o site', 'Quase todo mundo chega pelo celular, pelo link do perfil. Se demorar a abrir, desiste.']
      ],
      call:'Mari ligou: o orçamento diminuiu. A primeira versão terá uma única página; o resto fica para depois.',
      gap:'preco',
      rivals:[
        {name:'Ink Rebelde', tagline:'Arte na pele, sem regras', f:f(true, false, false, true, false, false)},
        {name:'Agulha de Ouro', tagline:'Tatuagens finas e delicadas', f:f(false, true, false, true, true, true)},
        {name:'Black Line Studio', tagline:'Preto, sombra e atitude', f:f(true, true, false, false, true, false)}
      ]
    },
    petshop: {
      name:'Petshop Pata Amiga', person:'Dona Rose', role:'veterinária e dona', color:'#0f7b3f', action:'Agendar banho',
      pedido:'Quero um site fofo, cheio de fotos de bichinhos.',
      acting:'Você é carinhosa e conversadeira. Às vezes muda de assunto para falar dos animais; deixe o designer trazer a conversa de volta.',
      topics:{
        problema:'Sexta e sábado o banho e tosa lota, e o meio da semana fica vazio.',
        objetivo:'Quero que as pessoas agendem banho nos dias mais vazios.',
        publico:'Donos de cães e gatos do bairro, muitos deles aposentados.',
        conteudo:'Tenho a tabela de preços e fotos dos pets atendidos, com autorização dos donos.',
        referencias:'O site da clínica do meu irmão tem um calendário que achei prático.',
        prazo:'Gostaria de ter em dois meses.',
        restricoes:'Não tenho quem atualize o site toda semana.',
        sucesso:'Os agendamentos de terça e quarta dobrando.'
      },
      pepitas:[
        ['publico', 'Se perguntarem como os clientes mais velhos usam o celular', 'Muitos clientes idosos reclamam de letra pequena e de botão miúdo no celular.'],
        ['objetivo', 'Se perguntarem por que o meio da semana fica vazio', 'As pessoas não sabem que de terça a quinta tem 15% de desconto e leva e traz grátis.'],
        ['restricoes', 'Se perguntarem sobre entrega ou transporte', 'O carro do leva e traz só atende até 5 km e só de manhã.']
      ],
      call:'Dona Rose ligou: a funcionária que ia escrever os textos saiu. Só dá para publicar com o conteúdo que já existe.',
      gap:'contraste',
      rivals:[
        {name:'Mundo Pet', tagline:'Tudo para o seu melhor amigo', f:f(true, true, true, false, true, false)},
        {name:'Cão & Cia', tagline:'Banho, tosa e carinho', f:f(false, true, false, true, false, false)},
        {name:'Patinhas Felizes', tagline:'Seu pet limpinho e feliz', f:f(true, false, true, true, true, false)}
      ]
    },
    danca: {
      name:'Escola de Dança Compasso', person:'Professor Davi', role:'bailarino e diretor', color:'#6141ce', action:'Agendar aula experimental',
      pedido:'Quero um site animado, que mexa, que dance!',
      acting:'Você é animado e fala rápido. Quando a pergunta é vaga, responde “tudo é importante!”.',
      topics:{
        problema:'A grade de horários é confusa: os pais ligam para saber qual turma serve para o filho.',
        objetivo:'Quero que as pessoas encontrem a turma certa e agendem uma aula experimental.',
        publico:'Crianças a partir de 6 anos, adolescentes e adultos iniciantes.',
        conteudo:'Tenho os horários num papel na recepção e vídeos das apresentações.',
        referencias:'Gosto do site de uma academia que separa as aulas por cor.',
        prazo:'As matrículas abrem em seis semanas.',
        restricoes:'Não posso mostrar o rosto de alunos menores de idade sem autorização dos responsáveis.',
        sucesso:'Trinta aulas experimentais agendadas no primeiro mês.'
      },
      pepitas:[
        ['publico', 'Se perguntarem quem decide a matrícula das crianças', 'Quem decide são os pais, e eles querem saber preço, horário e se a sala é segura.'],
        ['conteudo', 'Se perguntarem como as turmas são organizadas', 'São quatro estilos (balé, jazz, hip-hop e dança de salão) e três níveis; cada combinação tem idade mínima.'],
        ['sucesso', 'Se perguntarem o que acontece depois da aula experimental', 'Quase todo mundo que faz a aula experimental se matricula. O difícil é fazer a pessoa vir.']
      ],
      call:'Professor Davi ligou: a matrícula abre em três semanas, não em seis. Só o essencial para a matrícula entra agora.',
      gap:'acao',
      rivals:[
        {name:'Studio Ritmo', tagline:'Dance com a gente', f:f(true, false, true, true, false, true)},
        {name:'Academia Passo Certo', tagline:'Dança para todas as idades', f:f(false, false, false, true, true, true)},
        {name:'Ballet Encanto', tagline:'Sonhos na ponta dos pés', f:f(true, false, true, false, true, false)}
      ]
    }
  };
  const CLIENT_IDS = Object.keys(CLIENTS);

  /* ---------- Parada 3 · Métodos, referências e tendências ---------- */
  const METHODS = [['entrevista', 'Entrevista com pessoas'], ['concorrentes', 'Análise de concorrentes'], ['referencias', 'Referências'], ['tendencias', 'Tendências']];
  const METHOD_CARDS = [
    ['Entender o problema e o objetivo do dono do negócio.', 'entrevista', 'Pesquisa primária e qualitativa: vocês mesmos ouvem quem vive o problema e entendem o porquê. Foi o que fizeram na Parada 2.'],
    ['Descobrir o que os negócios parecidos da região já mostram no site.', 'concorrentes', 'Pesquisa primária por observação: vocês mesmos olham os sites e comparam o que é básico e o que ninguém faz bem.'],
    ['Encontrar boas formas de mostrar horários, mesmo em outro tipo de negócio.', 'referencias', 'Pesquisa exploratória: buscar boas soluções em outros lugares para copiar a ideia, não a aparência.'],
    ['Saber se pedir e agendar por mensagem está crescendo no comportamento das pessoas.', 'tendencias', 'Pesquisa secundária e quantitativa: usa números que outras pessoas já publicaram. Tendência é mudança que dura, não moda passageira.']
  ];
  const REFS = [
    ['precos', 'Cartões de preço grandes', 'Lavanderia', 'O preço aparece antes da pergunta.'],
    ['agenda', 'Agenda em grade por dia e horário', 'Clínica', 'A pessoa vê os horários livres e escolhe.'],
    ['mensagem', 'Botão de mensagem sempre visível', 'Padaria', 'Pedir ou perguntar fica a um toque.'],
    ['galeria', 'Galeria separada por estilo', 'Estúdio de fotografia', 'Cada visitante vai direto ao que procura.'],
    ['topo', 'Horário e endereço no topo', 'Farmácia', 'A informação mais procurada não exige rolagem.'],
    ['passos', 'Passo a passo em três etapas', 'Oficina mecânica', 'Explica como funciona antes de pedir algo.'],
    ['faq', 'Perguntas frequentes curtas', 'Escola de idiomas', 'Responde as dúvidas repetidas uma vez só.'],
    ['depoimentos', 'Depoimentos curtos de clientes', 'Restaurante', 'Gente parecida conta como foi.'],
    ['filtro', 'Filtro por idade e nível', 'Academia', 'Mostra só as opções que servem para a pessoa.'],
    ['antes-depois', 'Antes e depois lado a lado', 'Salão de beleza', 'O resultado fica evidente sem texto longo.']
  ];
  const TRENDS = [
    ['mensagem', 'Pedido e agendamento por mensagem', 'Para muita gente, mandar mensagem é mais fácil que ligar ou preencher cadastro.'],
    ['video', 'Vídeos curtos na vertical', 'Funcionam no celular, mas pesam: use poucos e com legenda.'],
    ['leve', 'Páginas leves para dados móveis', 'Quem tem pacote limitado agradece. Página leve também carrega mais rápido.'],
    ['escuro', 'Modo escuro', 'Muita gente gosta e economiza bateria em algumas telas. Não substitui o contraste: o texto continua precisando ser legível.'],
    ['movimento', 'Textos gigantes que se movem na tela', 'Chamam atenção, mas atrapalham a leitura. Se usar, deixe pausar.'],
    ['3d', 'Efeitos 3D pesados na página inicial', 'Impressionam no computador e travam celulares simples.']
  ];
  const VERDICTS = [['usar', 'Usar'], ['observar', 'Observar'], ['evitar', 'Evitar']];

  /* ---------- Parada 4 · Acessibilidade e validação ---------- */
  const ACCESS = [
    ['contraste', 'Contraste de pelo menos 4,5:1 nos textos.'], ['ampliar', 'Texto que pode ser ampliado a 200% sem cortar.'],
    ['toque', 'Botões grandes, fáceis de tocar.'], ['teclado', 'Tudo funciona com o teclado.'],
    ['alt', 'Imagens com texto alternativo pela função.'], ['legenda', 'Vídeos com legenda.']
  ];
  const CHECKS = [
    'O objetivo descreve uma ação de quem visita o site.',
    'O público é específico o bastante para orientar decisões.',
    'O conteúdo que existe e o que falta estão separados.',
    'Há pelo menos uma restrição real: prazo, orçamento, equipe ou regra.',
    'O sucesso pode ser observado ou medido.',
    'Referências e pesquisa têm motivo ligado ao cliente.'
  ];
  const CHECK_STATUS = [['sim', 'Sim'], ['quase', 'Quase'], ['nao', 'Não']];
  const DOC_FIELDS = [
    ['resumo', 'Resumo em uma frase', 'A Pedal Leve precisa que ciclistas peçam orçamento por mensagem, para o telefone parar de interromper o conserto.'],
    ['objetivo', 'Objetivo: o que a pessoa consegue fazer no site', 'A pessoa consegue ver o preço do serviço e pedir orçamento com a foto da bicicleta.'],
    ['publico', 'Público', 'Pessoas de 20 a 45 anos que vão de bicicleta ao trabalho e usam o celular no almoço.'],
    ['tem', 'Conteúdo que já existe', 'Tabela de preços e endereço.'],
    ['falta', 'Conteúdo que falta e quem produz', 'Fotos da oficina e textos dos serviços: os mecânicos fotografam na segunda.'],
    ['prazo', 'Prazo', 'Cinco semanas, antes das férias escolares.'],
    ['restricoes', 'Restrições', 'Sem pagamento pelo site; orçamento pequeno; página leve.'],
    ['sucesso', 'Critério de sucesso observável', 'Em dois meses, metade dos orçamentos chega por mensagem.']
  ];

  /* ---------- Estado e normalização do que foi salvo ---------- */
  const emptyRound = () => ({client:'', answers:Object.fromEntries(TOPICS.map(([id]) => [id, ''])), why:0, pepitas:[false, false, false], revealed:false, resumo:'', confirmed:false});
  const initial = () => ({version:1, phase:1, round:1, team:'', warmup:Array(WARMUP.length).fill(''), exports:0, exportedFinal:false, keys:[],
    anatomy:{tags:Array(GOOD.length).fill(''), first:Array(GOOD.length).fill(null)},
    weak:{marks:Array(WEAK.length).fill(''), questions:'', rewrite:''}, fhp:Array(FHP.length).fill(''),
    interview:{draw:[], rounds:[emptyRound(), emptyRound()], chosen:0, motivo:''},
    research:{methods:Array(METHOD_CARDS.length).fill(''), matrix:{}, checked:false, opportunity:'', refs:{}, trends:{}, web:{site:'', learn:''}, call:{open:false, cut:'', change:''}},
    doc:{prefilled:false, ...Object.fromEntries(DOC_FIELDS.map(([id]) => [id, ''])), access:[]},
    review:{peer:'', checks:Array(CHECKS.length).fill(''), suggestion:'', adjust:''}});
  const str = (value, fallback = '') => typeof value === 'string' ? value.slice(0, 2000) : fallback;
  const bool = (value, fallback = false) => typeof value === 'boolean' ? value : fallback;
  const int = (value, min, max, fallback) => Number.isInteger(value) && value >= min && value <= max ? value : fallback;
  const pick = (value, list, fallback) => list.includes(value) ? value : fallback;
  const obj = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const arr = (value, length, map) => Array.from({length}, (_, i) => map(Array.isArray(value) ? value[i] : undefined));
  const PART_IDS = PARTS.map(([id]) => id);
  function normalize(s) {
    const clean = initial();
    clean.phase = int(s.phase, 1, 4, 1); clean.round = int(s.round, 1, 3, 1); clean.team = str(s.team).slice(0, 65);
    clean.warmup = arr(s.warmup, WARMUP.length, v => pick(v, ['briefing', 'vago'], ''));
    clean.exports = int(s.exports, 0, 9999, 0); clean.exportedFinal = bool(s.exportedFinal);
    clean.keys = Array.isArray(s.keys) ? s.keys.filter(k => [2, 3, 4].includes(k)) : [];
    const a = obj(s.anatomy); clean.anatomy = {tags:arr(a.tags, GOOD.length, v => pick(v, PART_IDS, '')), first:arr(a.first, GOOD.length, v => typeof v === 'boolean' ? v : null)};
    const w = obj(s.weak); clean.weak = {marks:arr(w.marks, WEAK.length, v => pick(v, ['claro', 'furo'], '')), questions:str(w.questions), rewrite:str(w.rewrite)};
    clean.fhp = arr(s.fhp, FHP.length, v => pick(v, FHP_LABELS.map(([id]) => id), ''));
    const iv = obj(s.interview);
    const draw = Array.isArray(iv.draw) ? iv.draw.filter(id => CLIENT_IDS.includes(id)) : [];
    clean.interview = {draw:draw.length === 2 && draw[0] !== draw[1] ? draw : [], chosen:int(iv.chosen, 0, 2, 0), motivo:str(iv.motivo),
      rounds:arr(iv.rounds, 2, r => { const o = obj(r), answers = obj(o.answers); return {client:pick(o.client, CLIENT_IDS, ''), answers:Object.fromEntries(TOPICS.map(([id]) => [id, str(answers[id])])), why:int(o.why, 0, 99, 0), pepitas:arr(o.pepitas, 3, v => v === true), revealed:bool(o.revealed), resumo:str(o.resumo), confirmed:bool(o.confirmed)}; })};
    const r = obj(s.research), call = obj(r.call), web = obj(r.web);
    const matrix = {}; for (const [k, v] of Object.entries(obj(r.matrix))) if (/^[0-2]-[a-z]+$/.test(k) && ['sim', 'nao'].includes(v)) matrix[k] = v;
    const refs = {}; for (const [k, v] of Object.entries(obj(r.refs))) if (REFS.some(([id]) => id === k)) refs[k] = str(v);
    const trends = {}; for (const [k, v] of Object.entries(obj(r.trends))) if (TRENDS.some(([id]) => id === k)) { const t = obj(v); trends[k] = {verdict:pick(t.verdict, VERDICTS.map(([id]) => id), ''), why:str(t.why)}; }
    clean.research = {methods:arr(r.methods, METHOD_CARDS.length, v => pick(v, METHODS.map(([id]) => id), '')), matrix, checked:bool(r.checked), opportunity:str(r.opportunity), refs, trends,
      web:{site:str(web.site).slice(0, 120), learn:str(web.learn)}, call:{open:bool(call.open), cut:str(call.cut), change:str(call.change)}};
    const d = obj(s.doc); clean.doc = {prefilled:bool(d.prefilled), ...Object.fromEntries(DOC_FIELDS.map(([id]) => [id, str(d[id])])), access:Array.isArray(d.access) ? [...new Set(d.access.filter(id => ACCESS.some(([key]) => key === id)))] : []};
    const rv = obj(s.review); clean.review = {peer:str(rv.peer).slice(0, 120), checks:arr(rv.checks, CHECKS.length, v => pick(v, CHECK_STATUS.map(([id]) => id), '')), suggestion:str(rv.suggestion), adjust:str(rv.adjust)};
    clean.interview.rounds.forEach((round, i) => { if (clean.interview.draw.length) round.client = clean.interview.draw[i]; else Object.assign(round, emptyRound()); });
    return clean;
  }
  let state = initial(), storageOK = true;
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.version === 1) state = normalize(saved); }
  catch { storageOK = false; }
  const params = new URLSearchParams(location.search);
  const phaseParam = Number(params.get('fase')), roundParam = Number(params.get('rodada'));
  if (phaseParam >= 1 && phaseParam <= 4) state.phase = phaseParam;
  if (roundParam >= 1 && roundParam <= 3) state.round = roundParam;
  // A ficha secreta e o cartão aberto valem só para a tela atual: não são salvos.
  const ui = {hints:{}, warmCard:null, lockedView:false, sentence:null, secret:false, view:{}, checkMsg:'', stretch:{}};

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOK = true; }
    catch { storageOK = false; }
    $('save-status').textContent = storageOK ? 'Salvo neste navegador.' : 'Salvamento bloqueado: exporte antes de fechar.';
    refreshMission();
  }

  /* ---------- Relógio da aula: cada parada abre no seu horário ---------- */
  const at = (h, m) => h * 60 + m;
  const SCHEDULE = [
    {from:at(19, 0), to:at(19, 45), phase:1, label:'Parada 1 · Decifrar'},
    {from:at(19, 45), to:at(20, 5), phase:0, label:'Intervalo'},
    {from:at(20, 5), to:at(20, 25), phase:2, round:1, label:'Rodada 1 · Entrevista'},
    {from:at(20, 25), to:at(20, 40), phase:2, round:2, label:'Rodada 2 · Entrevista'},
    {from:at(20, 40), to:at(20, 50), phase:2, round:3, label:'Escolha do projeto'},
    {from:at(20, 50), to:at(21, 35), phase:3, label:'Parada 3 · Pesquisar'},
    {from:at(21, 35), to:at(22, 10), phase:4, label:'Parada 4 · Consolidar'}
  ];
  // Fora da janela da aula (preparação, revisão em casa) tudo fica aberto.
  const CLASS_WINDOW = [at(18, 30), at(22, 40)];
  const OPENS = {phase:{2:at(20, 5), 3:at(20, 50), 4:at(21, 35)}, round:{1:at(20, 5), 2:at(20, 25), 3:at(20, 40)}, call:at(21, 20)};
  // Palavras ditas pelo professor quando os relógios dos computadores estão errados.
  const KEYS = {2:'escuta', 3:'farol', 4:'acordo'};
  const hourParam = /^\d{1,2}:\d{2}$/.test(params.get('hora') || '') ? params.get('hora') : '';
  const nowMin = () => { if (hourParam) { const [h, m] = hourParam.split(':').map(Number); return at(h, m); } const d = new Date(); return at(d.getHours(), d.getMinutes()); };
  const clock = min => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
  const inClass = () => nowMin() >= CLASS_WINDOW[0] && nowMin() < CLASS_WINDOW[1];
  const keyFrom = p => state.keys.some(k => k >= p);
  const phaseOpen = p => p === 1 || !inClass() || keyFrom(p) || nowMin() >= OPENS.phase[p];
  const roundOpen = r => phaseOpen(2) && (!inClass() || keyFrom(2) || nowMin() >= OPENS.round[r]);
  const callOpen = () => !inClass() || keyFrom(4) || nowMin() >= OPENS.call;
  function updateClock() {
    const bar = $('clockbar'); if (!bar) return;
    const n = nowMin(), slot = inClass() && SCHEDULE.find(s => n >= s.from && n < s.to);
    if (!slot) { bar.hidden = true; bar.dataset.key = ''; return; }
    const here = slot.phase === state.phase && (!slot.round || slot.round === state.round);
    bar.hidden = false;
    const html = `<div class="clockbar-inner"><span class="clock-now">${clock(n)}</span><span>Agora: <strong>${slot.label}</strong> · até ${clock(slot.to)} <span class="clock-left">(${slot.to - n} min)</span></span>${slot.phase && !here ? `<button type="button" class="button" data-jump="${slot.phase}:${slot.round || ''}">Ir para lá</button>` : ''}</div>`;
    // Só reconstrói a faixa quando a etapa muda; a cada minuto troca apenas o texto, sem tirar o foco do botão.
    const key = `${slot.from}:${here}`;
    if (bar.dataset.key === key) { bar.querySelector('.clock-now').textContent = clock(n); bar.querySelector('.clock-left').textContent = `(${slot.to - n} min)`; return; }
    bar.dataset.key = key; bar.innerHTML = html;
  }

  /* ---------- Cálculos de progresso ---------- */
  const warmAnswered = () => state.warmup.filter(Boolean).length;
  const warmRight = () => state.warmup.filter((answer, i) => answer && (answer === 'briefing') === WARMUP[i][1]).length;
  const tagsRight = () => state.anatomy.tags.filter((tag, i) => tag === GOOD[i][0]).length;
  const firstRight = () => state.anatomy.first.filter(v => v === true).length;
  const weakRight = () => state.weak.marks.filter((mark, i) => mark && (mark === 'furo') === WEAK[i][1]).length;
  const questionCount = () => state.weak.questions.split('\n').map(line => line.trim()).filter(line => line.length >= 8 && line.includes('?')).length;
  const fhpRight = () => state.fhp.filter((v, i) => v === FHP[i][1]).length;
  const topicsDone = round => TOPICS.filter(([id]) => filled(round.answers[id], 8)).length;
  const roundDone = i => { const r = state.interview.rounds[i]; return !!r.client && topicsDone(r) >= MIN_TOPICS && r.why >= 1 && r.revealed && filled(r.resumo, 20) && r.confirmed; };
  const chosenIndex = () => state.interview.chosen ? state.interview.chosen - 1 : -1;
  const chosenClientId = () => {
    const i = chosenIndex(), rounds = state.interview.rounds;
    return (i >= 0 && rounds[i].client) || rounds.find(r => r.client)?.client || state.interview.draw[0] || 'pizzaria';
  };
  const chosenClient = () => CLIENTS[chosenClientId()];
  const chosenRound = () => state.interview.rounds[Math.max(0, chosenIndex())];
  const methodsRight = () => state.research.methods.filter((v, i) => v === METHOD_CARDS[i][1]).length;
  const matrixRight = () => { const c = chosenClient(); let n = 0; c.rivals.forEach((rival, i) => HEURISTICS.forEach(([h]) => { const v = state.research.matrix[`${i}-${h}`]; if (v && (v === 'sim') === rival.f[h]) n++; })); return n; };
  const matrixFilled = () => Object.keys(state.research.matrix).length;
  const refsDone = () => Object.values(state.research.refs).filter(note => filled(note, 15)).length;
  const trendsDone = () => Object.values(state.research.trends).filter(t => t.verdict && filled(t.why, 10)).length;
  const callDone = () => state.research.call.open && filled(state.research.call.cut, 10) && filled(state.research.call.change, 10);
  const docDone = () => DOC_FIELDS.filter(([id]) => filled(state.doc[id], 8)).length;
  const reviewDone = () => filled(state.review.peer, 2) && state.review.checks.every(Boolean) && filled(state.review.suggestion, 10);

  /* ---------- Missão, dicas e desafio extra de cada parada ---------- */
  const progress = (label, n, need) => ({label:`${label} (${Math.min(n, need)}/${need})`, done:n >= need});
  function mission(p) {
    if (p === 1) return {items:[progress('Aquecimento', warmAnswered(), WARMUP.length), progress('Partes do briefing identificadas', tagsRight(), GOOD.length), progress('Furos do briefing fraco avaliados', weakRight(), WEAK.length), progress('Perguntas para fechar furos', questionCount(), MIN_QUESTIONS), {label:'Exportar uma cópia', done:state.exports > 0}],
      extra:{title:'Olho de briefing', goals:[progress('Partes certas na primeira tentativa', firstRight(), GOOD.length), progress('Fato, hipótese ou pergunta', fhpRight(), FHP.length), {label:'Pedido do salão reescrito como briefing', done:filled(state.weak.rewrite, 60)}]}};
    if (p === 2) {
      const iv = state.interview, gold = iv.rounds.some(r => r.revealed && r.pepitas.every(Boolean));
      return {items:[{label:'Sortear os dois clientes', done:iv.draw.length === 2}, {label:'Rodada 1 completa', done:roundDone(0)}, {label:'Rodada 2 completa', done:roundDone(1)}, {label:'Projeto escolhido com motivo', done:!!iv.chosen && filled(iv.motivo, 20)}],
        extra:{title:'Entrevista de ouro', goals:[{label:'As três pepitas de um cliente descobertas', done:gold}, progress('Rodadas com dois “por quê?” ou mais', iv.rounds.filter(r => r.why >= 2).length, 2)]}};
    }
    if (p === 3) return {items:[progress('Métodos de pesquisa', methodsRight(), METHOD_CARDS.length), progress('Comparação de concorrentes conferida', state.research.checked ? matrixRight() : 0, MIN_MATRIX), {label:'Oportunidade que ninguém aproveita', done:filled(state.research.opportunity, 20)}, progress('Referências no painel com motivo', refsDone(), MIN_REFS), progress('Tendências avaliadas', trendsDone(), MIN_TRENDS), {label:callOpen() ? 'Telefonema do cliente respondido' : `Telefonema do cliente (às ${clock(OPENS.call)})`, done:callDone()}],
      extra:{title:'Pesquisa completa', goals:[progress('Comparação sem erros', state.research.checked ? matrixRight() : 0, 18), progress('Referências no painel', refsDone(), 6), progress('Todas as tendências', trendsDone(), TRENDS.length), {label:'Achado da internet com o que aprender', done:filled(state.research.web.site, 3) && filled(state.research.web.learn, 15)}]}};
    return {items:[progress('Campos do briefing', docDone(), DOC_FIELDS.length), progress('Requisitos de acessibilidade', state.doc.access.length, 2), {label:'Validação da dupla vizinha', done:reviewDone()}, {label:'Ajuste depois da validação', done:filled(state.review.adjust, 10)}, {label:'Exportar a entrega final', done:state.exportedFinal}],
      extra:{title:'Briefing à prova de cliente', goals:[progress('Critérios marcados “Sim”', state.review.checks.filter(v => v === 'sim').length, CHECKS.length), {label:'“Não entra agora” com três itens', done:state.research.call.cut.split('\n').filter(line => line.trim().length > 2).length >= 3}]}};
  }
  const phaseDone = p => mission(p).items.every(item => item.done);
  const HINTS = {
    1:['Clique numa frase do briefing da Pedal Leve e escolha a parte. O retorno aparece na hora.', 'Duas frases são de restrições e requisitos. Uma delas é a de acessibilidade.', 'No briefing fraco, procure a única parte que traz algo concreto: as 40 fotos. As outras são furos.'],
    r1:['Primeiro sorteiem os dois clientes. Quem faz o cliente lê a ficha secreta e esconde.', 'Use as perguntas de exemplo de cada tema. Pergunte “por quê?” e marque no contador.', 'No fim, quem fez o cliente revela as pepitas que saíram na conversa. Depois, escrevam o resumo e peçam a confirmação.'],
    r2:['Troquem os papéis: quem entrevistou agora é o cliente.', 'Comecem pelo problema, não pelas cores.', 'Pepitas aparecem quando vocês aprofundam: “como assim?”, “por quê?”, “me dá um exemplo?”.'],
    r3:['Comparem os dois resumos.', 'Escolham o projeto com mais informação concreta ou o que a dupla quer desenvolver nas próximas aulas.', 'Escrevam o motivo em uma ou duas frases.'],
    3:['Na comparação, use o botão Celular de cada concorrente: alguns cortam a página.', 'Texto cinza-claro sobre branco é difícil de ler.', 'A oportunidade é a coluna em que nenhum concorrente marca “Sim”.'],
    4:['Os campos vêm preenchidos com a entrevista. Reescreva o objetivo como ação: “A pessoa consegue…”.', 'Sucesso precisa de algo que dá para ver ou contar: um número, um prazo, uma comparação.', 'A dupla vizinha marca os seis critérios na sua tela. Depois, ajustem um ponto.']
  };
  const hintKey = () => state.phase === 2 ? `r${state.round}` : state.phase;
  const goalList = goals => `<ul class="goal-list">${goals.map(goal => `<li class="${goal.done ? 'done' : ''}"><span class="tick" aria-hidden="true">${goal.done ? '✓' : ''}</span>${esc(goal.label)}${goal.done ? '<span class="visually-hidden"> (feito)</span>' : ''}</li>`).join('')}</ul>`;
  function missionHTML() {
    const m = mission(state.phase), done = m.items.filter(item => item.done).length, total = m.items.length;
    const next = m.items.findIndex(item => !item.done), key = hintKey(), level = ui.hints[key] || 0, hints = HINTS[key];
    return `<div class="mission-head"><h3 id="mission-title">Missão</h3><span class="mission-count">${done}/${total}</span></div>
      <div class="meter" aria-hidden="true"><span style="width:${Math.round(done / total * 100)}%"></span></div>
      <ul class="mission-list">${m.items.map((item, i) => `<li class="${item.done ? 'done' : i === next ? 'next' : ''}"><span class="tick" aria-hidden="true">${item.done ? '✓' : i === next ? '→' : ''}</span>${esc(item.label)}${item.done ? '<span class="visually-hidden"> (feito)</span>' : ''}</li>`).join('')}</ul>
      ${next < 0 ? `<div class="extra"><h4>Desafio · ${esc(m.extra.title)}</h4>${goalList(m.extra.goals)}</div>` : ''}
      ${level ? `<ol class="stuck-list">${hints.slice(0, level).map(text => `<li>${esc(text)}</li>`).join('')}${level > hints.length ? '<li>Perguntem à dupla do lado. Depois, levantem a mão.</li>' : ''}</ol>` : ''}
      ${level <= hints.length ? `<button type="button" class="text-button" id="stuck">${level ? 'Outra dica' : 'Estou travado'}</button>` : ''}`;
  }
  function refreshMission() {
    const box = $('mission'); if (box) box.innerHTML = missionHTML();
    updateRail();
  }
  function updateRail() {
    document.querySelectorAll('.phase-rail [data-phase]').forEach(button => {
      const p = Number(button.dataset.phase), open = phaseOpen(p), done = open && phaseDone(p);
      button.classList.toggle('is-done', done); button.classList.toggle('is-locked', !open);
      button.querySelector('.stop').textContent = done ? '✓' : p;
      const stateLabel = button.querySelector('.rail-state'); if (stateLabel) stateLabel.textContent = done ? ' (concluída)' : open ? '' : ' (fechada)';
      const slots = SCHEDULE.filter(s => s.phase === p);
      button.querySelector('small').textContent = open ? `${clock(slots[0].from)}–${clock(slots.at(-1).to)}` : `abre às ${clock(OPENS.phase[p])}`;
    });
  }

  /* ---------- Componentes de interface ---------- */
  const field = (path, label, value, placeholder = '', rows = 3) => `<label class="field">${label}<textarea data-field="${path}" rows="${rows}" maxlength="1200"${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}>${esc(value)}</textarea></label>`;
  const line = (path, label, value, placeholder = '') => `<label class="field">${label}<input type="text" data-field="${path}" maxlength="120" autocomplete="off" value="${esc(value)}"${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}></label>`;
  const top = (n, title, text) => `<section class="stage-top"><div class="stage-copy"><p class="eyebrow">Parada ${n}</p><h2 id="stage-title" tabindex="-1">${title}</h2><p>${text}</p></div><aside class="mission" id="mission" aria-labelledby="mission-title">${missionHTML()}</aside></section>`;
  const nextButton = (target, label) => `<div class="next"><button type="button" class="button primary" data-go="${target}">${label}</button></div>`;
  const keyForm = () => `<div class="key-form"><label for="key-input">Palavra do professor</label><input id="key-input" type="text" autocomplete="off" maxlength="30"><button type="button" class="button" id="key-ok">Liberar</button><p id="key-status" role="status"></p></div>`;
  const radioGroup = (name, legend, options, value, extra = '') => `<fieldset class="radios"><legend>${legend}</legend>${options.map(([id, label]) => `<label><input type="radio" name="${name}" value="${id}"${value === id ? ' checked' : ''}${extra}> ${esc(label)}</label>`).join('')}</fieldset>`;
  function lockedHTML(title, opensAt, back, backLabel) {
    return `<section class="locked"><h2 id="stage-title" tabindex="-1">${title}</h2><p class="locked-time">Abre às <strong>${clock(opensAt)}</strong></p><button type="button" class="button primary" data-go="${back}">${backLabel}</button>${keyForm()}</section>`;
  }

  /* ---------- Aquecimento ---------- */
  function warmupHTML() {
    const pending = state.warmup.findIndex(answer => !answer), i = ui.warmCard ?? pending;
    if (i < 0) return `<div class="warm-done"><strong>Aquecimento</strong><span>${warmRight()} de ${WARMUP.length} certos</span></div>`;
    const [text, isBrief, why] = WARMUP[i], answer = state.warmup[i];
    const right = answer && (answer === 'briefing') === isBrief;
    return `<p class="warm-step">Aquecimento · ${i + 1} de ${WARMUP.length}</p><p class="warm-text">${esc(text)}</p>${answer
      ? `<p class="warm-result ${right ? 'right' : 'wrong'}"><strong>${right ? 'Isso.' : 'Não exatamente.'} ${isBrief ? 'Parece briefing.' : 'Pedido vago.'}</strong> ${esc(why)}</p><button type="button" class="button primary" data-warm-next>${pending < 0 ? 'Fechar aquecimento' : 'Próximo cartão →'}</button>`
      : `<div class="warm-actions"><button type="button" class="button" data-warm="vago">Pedido vago</button><button type="button" class="button" data-warm="briefing">Parece briefing</button></div>`}`;
  }
  const renderWarmup = () => { const box = $('warmup'); if (box) box.innerHTML = warmupHTML(); };

  /* ---------- Parada 1 · Decifrar ---------- */
  function sentenceTagger() {
    const i = ui.sentence;
    if (i === null) return '<p class="fine">Clique numa frase do briefing para dizer qual parte ela cumpre.</p>';
    const tag = state.anatomy.tags[i], right = tag && tag === GOOD[i][0];
    return `<div class="tagger"><p class="tagger-quote">“${esc(GOOD[i][1])}”</p>
      <label class="field">Esta frase é…<select id="part-select"><option value="">Escolha a parte</option>${PARTS.map(([id, label]) => `<option value="${id}"${tag === id ? ' selected' : ''}>${label}</option>`).join('')}</select></label>
      <p class="status-line" id="tag-status" role="status">${tag ? (right ? `<span class="mark ok">Certo</span> ${esc(partName(tag))}.` : '<span class="mark no">Ainda não</span> Releia: o que essa frase garante para o projeto?') : ''}</p></div>`;
  }
  function renderDecode() {
    const tags = state.anatomy.tags;
    return top(1, 'O que um briefing precisa dizer.', 'Briefing é o acordo entre cliente e designer antes de desenhar: problema, público, objetivo, conteúdo, referências, prazo, restrições e como saber se deu certo.') +
      `<section class="warmup" id="warmup" aria-label="Aquecimento">${warmupHTML()}</section>
      <div class="split">
        <section class="desk" aria-labelledby="good-title"><p class="section-label">Briefing comentado</p><h3 id="good-title">Pedal Leve · oficina de bicicletas</h3>
          <ol class="brief-doc">${GOOD.map(([part, text], i) => `<li><button type="button" class="sentence${ui.sentence === i ? ' is-picked' : ''}${tags[i] ? (tags[i] === part ? ' is-right' : ' is-wrong') : ''}" data-sentence="${i}" aria-pressed="${ui.sentence === i}">${esc(text)}${tags[i] ? `<span class="sentence-tag">${esc(partName(tags[i]))}</span>` : ''}</button></li>`).join('')}</ol>
        </section>
        <section class="desk" aria-labelledby="tagger-title"><p class="section-label">Identificar</p><h3 id="tagger-title">Qual parte é esta?</h3><div id="tagger">${sentenceTagger()}</div>
          <p class="counter${tagsRight() === GOOD.length ? ' done' : ''}">Partes certas: <strong>${tagsRight()} de ${GOOD.length}</strong></p></section>
      </div>
      <section class="desk wide" aria-labelledby="weak-title"><p class="section-label">Caça aos furos</p><h3 id="weak-title">Salão Bela Vista</h3>
        <blockquote class="weak-brief">${esc(WEAK_TEXT)}</blockquote>
        <p class="fine">Para cada parte, decidam: o texto traz algo concreto ou é um furo?</p>
        <div class="weak-grid">${WEAK.map(([part, isGap, why], i) => { const mark = state.weak.marks[i], right = mark && (mark === 'furo') === isGap;
          return `<div class="weak-item${mark ? (right ? ' is-right' : ' is-wrong') : ''}">${radioGroup(`weak-${i}`, partName(part), [['claro', 'Tem algo concreto'], ['furo', 'É furo']], mark, ` data-weak="${i}"`)}${mark ? `<p class="weak-why">${right ? '<span class="mark ok">Certo</span>' : '<span class="mark no">Reveja</span>'} ${right ? esc(why) : 'Procure no texto uma informação concreta sobre esta parte.'}</p>` : ''}</div>`; }).join('')}</div>
        ${field('weak.questions', `Perguntas para o cliente fechar os furos (uma por linha, com “?”) · ${questionCount()} de ${MIN_QUESTIONS}`, state.weak.questions, 'O que mais atrapalha o salão hoje?\nPara quando o site precisa estar no ar?', 4)}
      </section>
      <details class="stretch"${ui.stretch[1] ? ' open' : ''}><summary>Desafio extra · fato, hipótese ou pergunta? E o salão reescrito</summary>
        <p class="fine">Num briefing, separar o que é certo do que é suposição evita retrabalho.</p>
        <div class="fhp-grid">${FHP.map(([text, answer], i) => { const v = state.fhp[i]; return `<div class="fhp-item">${radioGroup(`fhp-${i}`, esc(text), FHP_LABELS, v, ` data-fhp="${i}"`)}${v ? `<p class="weak-why">${v === answer ? '<span class="mark ok">Certo</span>' : '<span class="mark no">Reveja</span>'}</p>` : ''}</div>`; }).join('')}</div>
        <p class="fine">Agora reescrevam o pedido do Salão Bela Vista como um bom briefing de três ou quatro frases. Inventem as respostas que faltam, com cuidado para serem realistas.</p>
        ${field('weak.rewrite', 'Briefing reescrito do Salão Bela Vista', state.weak.rewrite, 'O Salão Bela Vista precisa que…', 4)}
      </details>
      <div class="next"><button type="button" class="button" data-export>Exportar uma cópia</button><button type="button" class="button primary" data-go="2">Ir para a Parada 2 →</button></div>`;
  }

  /* ---------- Parada 2 · Entrevistar ---------- */
  const ROUND_NAMES = ['Rodada 1', 'Rodada 2', 'Escolha'];
  function roundTabs() {
    return `<div class="toolbar tabs" role="group" aria-label="Rodadas">${ROUND_NAMES.map((name, i) => { const r = i + 1, open = roundOpen(r), done = r < 3 ? roundDone(i) : !!state.interview.chosen && filled(state.interview.motivo, 20);
      return `<button type="button" data-round="${r}" aria-pressed="${state.round === r}"${open ? '' : ' aria-disabled="true"'}>${done ? '<span class="mark ok">✓</span>' : ''}${name}${open ? '' : ` · ${clock(OPENS.round[r])}`}</button>`; }).join('')}</div>`;
  }
  function secretHTML(c) {
    return `<div class="secret" id="secret" role="region" aria-label="Ficha secreta do cliente">
      <p class="secret-warn">Só quem faz o papel do cliente lê esta ficha. Quem entrevista vira de costas. O cliente pode reabrir a ficha quando esquecer algo.</p>
      <h4>${esc(c.person)} · ${esc(c.name)}</h4><p class="fine">${esc(c.role)}</p>
      <p><strong>Como atuar:</strong> ${esc(c.acting)}</p>
      <dl class="secret-topics">${TOPICS.map(([id, label]) => `<div><dt>${label}</dt><dd>${esc(c.topics[id])}</dd></div>`).join('')}</dl>
      <h5>Pepitas: conte só quando a pergunta chegar perto</h5>
      <ol class="pepitas">${c.pepitas.map(([, trigger, fact]) => `<li><strong>${esc(trigger)}:</strong> ${esc(fact)}</li>`).join('')}</ol>
      <button type="button" class="button primary" id="secret-hide">Esconder a ficha</button></div>`;
  }
  function renderRound(i) {
    const iv = state.interview, r = iv.rounds[i];
    if (iv.draw.length < 2) return `<section class="draw"><h3>Primeiro, o sorteio</h3><p>Cada rodada tem um cliente diferente. Quem faz o cliente lê a ficha secreta; quem entrevista conduz a conversa e registra.</p><button type="button" class="button primary" id="draw">Sortear os dois clientes</button></section>`;
    const c = CLIENTS[r.client];
    const roles = i === 0 ? 'Integrante A entrevista · Integrante B é o cliente' : 'Agora invertam: integrante B entrevista · integrante A é o cliente';
    return `<section class="client-card" style="--client:${c.color}"><p class="eyebrow">${ROUND_NAMES[i]} · ${roles}</p><h3>${esc(c.name)}</h3>
        <p class="client-ask">${esc(c.person)} chega dizendo: <q>${esc(c.pedido)}</q></p>
        ${ui.secret ? secretHTML(c) : `<button type="button" class="button" id="secret-show">Mostrar ficha secreta (só para o cliente)</button>`}</section>
      <section class="desk wide" aria-labelledby="topics-title"><p class="section-label">Entrevista</p><h3 id="topics-title">Registre o que o cliente responde</h3>
        <p class="fine">Perguntas abertas fazem o cliente contar mais. Pelo menos ${MIN_TOPICS} temas de ${TOPICS.length}.</p>
        <div class="topic-grid">${TOPICS.map(([id, label, examples]) => `<div class="topic${filled(r.answers[id], 8) ? ' is-done' : ''}"><label for="t-${i}-${id}"><strong>${label}</strong></label><ul class="examples">${examples.map(q => `<li>${esc(q)}</li>`).join('')}</ul><textarea id="t-${i}-${id}" data-field="interview.rounds.${i}.answers.${id}" rows="3" maxlength="1200">${esc(r.answers[id])}</textarea></div>`).join('')}</div>
        <div class="why-box"><p><strong>Contador de “por quê?”</strong> Cada vez que vocês aprofundaram uma resposta com “por quê?”, “como assim?” ou “me dá um exemplo?”.</p><div class="why-actions"><button type="button" class="mini" data-why="${i}:-1" aria-label="Diminuir contador">−</button><span class="why-count" aria-live="polite">${r.why}</span><button type="button" class="button" data-why="${i}:1">Perguntei por quê</button></div></div>
      </section>
      <section class="desk wide" aria-labelledby="reveal-title"><p class="section-label">Fim da rodada</p><h3 id="reveal-title">Pepitas e confirmação</h3>
        ${r.revealed ? `<p>Pepitas descobertas: <strong>${r.pepitas.filter(Boolean).length} de 3</strong>.</p><ul class="pepita-list">${c.pepitas.map(([, , fact], k) => `<li><label class="check"><input type="checkbox" data-pepita="${i}:${k}"${r.pepitas[k] ? ' checked' : ''}> ${esc(fact)}</label></li>`).join('')}</ul>`
          : `<p class="fine">Quem fez o cliente marca quais pepitas saíram na conversa.</p><button type="button" class="button" data-reveal="${i}">Revelar pepitas</button>`}
        ${field(`interview.rounds.${i}.resumo`, 'Resumo do pedido em uma frase (quem precisa do quê, e por quê)', r.resumo, `${c.person} precisa que…`, 2)}
        <label class="check"><input type="checkbox" data-confirm="${i}"${r.confirmed ? ' checked' : ''}> O cliente leu o resumo e confirmou: “é isso mesmo”.</label>
      </section>`;
  }
  function renderChoice() {
    const iv = state.interview;
    const cards = iv.rounds.map((r, i) => r.client ? `<label class="choice-card${iv.chosen === i + 1 ? ' is-picked' : ''}"><input type="radio" name="chosen" value="${i + 1}"${iv.chosen === i + 1 ? ' checked' : ''}> <span><strong>${esc(CLIENTS[r.client].name)}</strong><span>${esc(r.resumo || 'Resumo ainda não escrito.')}</span><small>${topicsDone(r)} temas · ${r.pepitas.filter(Boolean).length} pepitas · ${r.why} “por quê?”</small></span></label>` : '').join('');
    return `<section class="desk wide" aria-labelledby="choice-title"><p class="section-label">Escolha</p><h3 id="choice-title">Qual briefing a dupla vai desenvolver?</h3>
      <p>O projeto escolhido segue para a pesquisa de hoje e para as próximas aulas: arquitetura de informação, wireframes e protótipo.</p>
      ${cards ? `<div class="choice-grid">${cards}</div>` : '<p class="fine">Façam as rodadas primeiro.</p>'}
      ${field('interview.motivo', 'Por que esse projeto? (mais informação concreta, cliente mais claro, vontade da dupla…)', iv.motivo, '', 3)}</section>`;
  }
  function renderInterview() {
    const r = state.round, open = roundOpen(r);
    return top(2, 'Cliente e designer.', 'Cada integrante faz uma vez o papel de cliente. O cliente só conta o que perguntarem. A dupla que pergunta bem descobre o problema real.') +
      roundTabs() + (open ? (r < 3 ? renderRound(r - 1) : renderChoice()) + (r < 3 ? nextButton(`round-${r + 1}`, `${ROUND_NAMES[r]} →`) : nextButton('3', 'Ir para a Parada 3 →'))
        : `<section class="locked"><h3>${ROUND_NAMES[r - 1]}</h3><p class="locked-time">Abre às <strong>${clock(OPENS.round[r])}</strong></p><button type="button" class="button primary" data-round="${r - 1}">Voltar à ${ROUND_NAMES[r - 2]}</button>${keyForm()}</section>`);
  }

  // Trocar de projeto troca o cliente: o que dependia do cliente anterior recomeça.
  function resetForClient() {
    const d = state.doc, rs = state.research;
    for (const id of ['resumo', 'objetivo', 'publico', 'tem', 'falta', 'prazo', 'restricoes', 'sucesso']) d[id] = '';
    d.prefilled = false; rs.matrix = {}; rs.checked = false; rs.opportunity = ''; rs.call = {open:false, cut:'', change:''};
  }

  /* ---------- Parada 3 · Pesquisar ---------- */
  function mockHTML(rival, client, i) {
    const t = rival.f, phone = ui.view[i] === 'celular';
    const photos = Array.from({length:3}, (_, k) => `<div class="mock-photo${t.fotos ? ' is-real' : ''}"><span>${t.fotos ? `Foto da casa ${k + 1}` : 'Imagem genérica de banco'}</span></div>`).join('');
    const prices = {pizzaria:['Margherita · R$ 42', 'Calabresa · R$ 45', 'Pizza do dia · R$ 39'], tatuagem:['Traço fino', 'Aquarela', 'Lettering'], petshop:['Banho P · R$ 45', 'Banho e tosa · R$ 80', 'Hidratação · R$ 30'], danca:['Mensal · R$ 140', 'Duas aulas · R$ 190', 'Livre · R$ 240']}[chosenClientId()];
    return `<div class="mock-frame${phone ? ' is-phone' : ''}"><div class="mock ${t.celular ? 'is-fluid' : 'is-fixed'} ${t.contraste ? '' : 'is-faint'}" style="--brand:${client.color}" aria-label="Site fictício ${esc(rival.name)}">
      <div class="mock-head"><strong>${esc(rival.name)}</strong><span class="mock-nav">Início · Sobre · Galeria · Contato</span></div>
      <div class="mock-hero"><p class="mock-tag">${esc(rival.tagline)}</p>${t.acao ? `<span class="mock-cta">${esc(client.action)}</span>` : '<p class="mock-text">Seja bem-vindo ao nosso espaço. Aqui você encontra tudo o que precisa, com qualidade e carinho.</p>'}</div>
      ${t.horario ? `<p class="mock-info">${({pizzaria:'Ter a dom · 18h às 23h', tatuagem:'Ter a sáb · 10h às 19h', petshop:'Seg a sáb · 8h às 18h', danca:'Seg a sex · 14h às 21h'})[chosenClientId()]} · Rua das Flores, 120</p>` : ''}
      <div class="mock-photos">${photos}</div>
      ${t.preco ? `<ul class="mock-prices">${prices.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : '<p class="mock-text">Consulte valores.</p>'}
      <p class="mock-text">© ${esc(rival.name)}. Todos os direitos reservados.</p></div></div>`;
  }
  function renderResearch() {
    const c = chosenClient(), rs = state.research;
    const methodsHTML = METHOD_CARDS.map(([text, answer, why], i) => { const v = rs.methods[i]; return `<div class="method${v ? (v === answer ? ' is-right' : ' is-wrong') : ''}">${radioGroup(`method-${i}`, esc(text), METHODS, v, ` data-method="${i}"`)}${v ? `<p class="weak-why">${v === answer ? `<span class="mark ok">Certo</span> ${esc(why)}` : '<span class="mark no">Reveja</span> Qual método responde exatamente a esta pergunta?'}</p>` : ''}</div>`; }).join('');
    const matrixRows = c.rivals.map((rival, i) => `<tr><th scope="row">${esc(rival.name)}</th>${HEURISTICS.map(([h, label]) => { const v = rs.matrix[`${i}-${h}`] || ''; return `<td><select data-matrix="${i}-${h}" aria-label="${esc(rival.name)}: ${esc(label)}"><option value="">—</option><option value="sim"${v === 'sim' ? ' selected' : ''}>Sim</option><option value="nao"${v === 'nao' ? ' selected' : ''}>Não</option></select></td>`; }).join('')}</tr>`).join('');
    return top(3, 'Pesquisar antes de desenhar.', `Pesquisa para o projeto escolhido: <strong>${esc(c.name)}</strong>. Primeiro o método certo, depois concorrentes, referências e tendências.`) +
      researchBody(c, rs, methodsHTML, matrixRows);
  }
  function callHTML() {
    const c = chosenClient(), rs = state.research;
    return !callOpen() ? `<section class="shock-closed is-locked" id="call-box"><h3>Telefonema do cliente</h3><p>O cliente vai ligar às <strong>${clock(OPENS.call)}</strong>. Continuem a pesquisa.</p></section>`
      : !rs.call.open ? `<section class="shock-closed" id="call-box"><h3>Telefonema do cliente</h3><p>O telefone está tocando.</p><button type="button" class="button primary" id="call">Atender o cliente</button></section>`
      : `<section class="shock" id="call-box" aria-labelledby="call-title"><p class="eyebrow">Telefonema</p><h3 id="call-title" tabindex="-1">${esc(c.call)}</h3>
        ${field('research.call.cut', '“Não entra agora”: o que fica para depois? (um item por linha)', rs.call.cut, 'Galeria completa de fotos\nÁrea de depoimentos', 4)}
        ${field('research.call.change', 'O que muda no briefing por causa da ligação?', rs.call.change, '', 2)}</section>`;
  }
  function researchBody(c, rs, methodsHTML, matrixRows) {
    return `<section class="desk wide" aria-labelledby="methods-title"><p class="section-label">Tipos e métodos</p><h3 id="methods-title">Qual método responde a cada pergunta?</h3><p class="fine"><strong>Primária:</strong> vocês coletam. <strong>Secundária:</strong> usa o que outros já publicaram. <strong>Qualitativa:</strong> entende o porquê. <strong>Quantitativa:</strong> conta quantos.</p><div class="method-grid">${methodsHTML}</div></section>
      <section class="desk wide" aria-labelledby="rivals-title"><p class="section-label">Análise de concorrentes</p><h3 id="rivals-title">Três concorrentes fictícios de ${esc(c.name)}</h3>
        <p class="fine">Observe cada site no computador e no celular. Depois, preencha a comparação.</p>
        <div class="rival-grid">${c.rivals.map((rival, i) => `<figure class="rival"><figcaption><strong>${esc(rival.name)}</strong><span class="toolbar tabs" role="group" aria-label="Visualização de ${esc(rival.name)}"><button type="button" data-mock="${i}:computador" aria-pressed="${ui.view[i] !== 'celular'}">Computador</button><button type="button" data-mock="${i}:celular" aria-pressed="${ui.view[i] === 'celular'}">Celular</button></span></figcaption>${mockHTML(rival, c, i)}</figure>`).join('')}</div>
        <div class="matrix-wrap"><table class="matrix"><caption>Comparação · ${matrixFilled()} de 18 marcadas</caption><thead><tr><th scope="col">Concorrente</th>${HEURISTICS.map(([, label]) => `<th scope="col">${esc(label)}</th>`).join('')}</tr></thead><tbody>${matrixRows}</tbody></table></div>
        <div class="toolbar"><button type="button" class="button" id="check-matrix">Conferir comparação</button><p class="status-line" id="matrix-status" role="status">${rs.checked ? `${matrixRight()} de 18 corretas.${matrixRight() < 18 ? ' Olhem de novo o que não bate: o modo celular e o contraste revelam detalhes.' : ' Comparação perfeita.'}` : ''}</p></div>
        ${field('research.opportunity', 'Oportunidade: o que nenhum concorrente faz bem e o seu cliente pode fazer?', rs.opportunity, '', 2)}</section>
      <section class="desk wide" aria-labelledby="refs-title"><p class="section-label">Referências</p><h3 id="refs-title">Boas ideias de outros tipos de negócio</h3>
        <p class="fine">Escolham pelo menos ${MIN_REFS} para o painel e escreva por que servem para ${esc(c.name)}. Copiamos a ideia, não a aparência.</p>
        <div class="ref-grid">${REFS.map(([id, title, from, text]) => { const on = id in rs.refs; return `<div class="ref${on ? ' is-on' : ''}"><div class="ref-art ref-${id}" aria-hidden="true"></div><p class="ref-from">${esc(from)}</p><h4>${esc(title)}</h4><p>${esc(text)}</p><label class="check"><input type="checkbox" data-ref="${id}"${on ? ' checked' : ''}> No painel</label>${on ? `<label class="field">Por que serve para este cliente?<textarea data-ref-note="${id}" rows="2" maxlength="600">${esc(rs.refs[id])}</textarea></label>` : ''}</div>`; }).join('')}</div></section>
      <section class="desk wide" aria-labelledby="trends-title"><p class="section-label">Tendências</p><h3 id="trends-title">Usar, observar ou evitar?</h3>
        <p class="fine">Tendência útil resolve algo para o público do cliente. Moda passageira só enfeita. Avalie pelo menos ${MIN_TRENDS}.</p>
        <div class="trend-grid">${TRENDS.map(([id, title, note]) => { const t = rs.trends[id] || {verdict:'', why:''}; return `<div class="trend">${radioGroup(`trend-${id}`, esc(title), VERDICTS, t.verdict, ` data-trend="${id}"`)}${t.verdict ? `<p class="weak-why">${esc(note)}</p><label class="field">Motivo para este cliente<input type="text" data-trend-why="${id}" maxlength="200" value="${esc(t.why)}"></label>` : ''}</div>`; }).join('')}</div></section>
      ${callHTML()}
      <details class="stretch"${ui.stretch[3] ? ' open' : ''}><summary>Desafio extra · um achado da internet</summary><p class="fine">Pesquise um site real que resolve bem algo parecido. Não precisa de login e não copie imagens: anote só a ideia.</p>
        ${line('research.web.site', 'Nome do site', rs.web.site, 'Ex.: site de uma livraria do bairro')}${field('research.web.learn', 'O que o projeto pode aprender com ele?', rs.web.learn, '', 2)}</details>
      ${nextButton('4', 'Ir para a Parada 4 →')}`;
  }

  /* ---------- Parada 4 · Consolidar ---------- */
  function prefillDoc() {
    const d = state.doc; if (d.prefilled) return;
    const r = chosenRound(), a = r.answers;
    const fills = {resumo:r.resumo, objetivo:a.objetivo, publico:a.publico, tem:a.conteudo, prazo:a.prazo, restricoes:[a.restricoes, state.research.call.change].filter(Boolean).join(' '), sucesso:a.sucesso};
    for (const [id, value] of Object.entries(fills)) if (!d[id] && value) d[id] = value.trim();
    // Só conta como preenchido quando a entrevista já existia: quem abre antes recebe os dados depois.
    d.prefilled = TOPICS.some(([id]) => filled(a[id], 8));
  }
  function briefingPreview() {
    const c = chosenClient(), d = state.doc, rs = state.research;
    const val = id => d[id] && d[id].trim() ? esc(d[id].trim()) : '<em class="missing">A preencher</em>';
    const refs = Object.entries(rs.refs).filter(([, note]) => note.trim());
    const use = TRENDS.filter(([id]) => rs.trends[id]?.verdict === 'usar');
    return `<article class="brief-sheet" aria-label="Prévia do briefing"><p class="eyebrow">Briefing · ${esc(c.name)}</p><h3>${val('resumo')}</h3>
      <dl class="brief-dl">${DOC_FIELDS.slice(1).map(([id, label]) => `<div><dt>${esc(label)}</dt><dd>${val(id)}</dd></div>`).join('')}
        <div><dt>Não entra agora</dt><dd>${rs.call.cut.trim() ? esc(rs.call.cut.trim()).replace(/\n/g, '<br>') : '<em class="missing">A preencher na Parada 3</em>'}</dd></div>
        <div><dt>Acessibilidade</dt><dd>${d.access.length ? d.access.map(id => esc(ACCESS.find(([k]) => k === id)[1])).join('<br>') : '<em class="missing">Escolha ao menos dois requisitos</em>'}</dd></div>
        <div><dt>Concorrentes</dt><dd>${rs.opportunity.trim() ? esc(rs.opportunity.trim()) : '<em class="missing">Oportunidade a preencher</em>'}</dd></div>
        <div><dt>Referências</dt><dd>${refs.length ? refs.map(([id, note]) => `${esc(REFS.find(([k]) => k === id)[1])}: ${esc(note.trim())}`).join('<br>') : '<em class="missing">Painel vazio</em>'}</dd></div>
        <div><dt>Tendências a usar</dt><dd>${use.length ? use.map(([id, title]) => `${esc(title)}${rs.trends[id].why ? `: ${esc(rs.trends[id].why)}` : ''}`).join('<br>') : '<em class="missing">Nenhuma marcada para usar</em>'}</dd></div></dl></article>`;
  }
  function renderConsolidate() {
    prefillDoc();
    const d = state.doc, rv = state.review, c = chosenClient();
    return top(4, 'Um briefing de uma página.', `Junte entrevista e pesquisa num documento que ${esc(c.person)} aprovaria. Depois, a dupla vizinha valida com seis critérios.`) +
      `<div class="split">
        <section class="desk" aria-labelledby="doc-title"><p class="section-label">Documento</p><h3 id="doc-title">Revise e complete</h3>
          ${DOC_FIELDS.map(([id, label, example]) => field(`doc.${id}`, label, d[id], `Ex.: ${example}`, id === 'resumo' || id === 'objetivo' || id === 'sucesso' ? 2 : 2)).join('')}
          <fieldset class="access"><legend>Acessibilidade é requisito do projeto (escolha pelo menos dois)</legend>${ACCESS.map(([id, label]) => `<label class="check"><input type="checkbox" data-access="${id}"${d.access.includes(id) ? ' checked' : ''}> ${esc(label)}</label>`).join('')}</fieldset>
        </section>
        <section class="desk" aria-labelledby="preview-title"><p class="section-label">Prévia</p><h3 id="preview-title" class="visually-hidden">Prévia do briefing</h3><div id="brief-preview">${briefingPreview()}</div></section>
      </div>
      <section class="desk wide" aria-labelledby="review-title"><p class="section-label">Validação</p><h3 id="review-title">A dupla vizinha valida</h3>
        <p>A dupla vizinha lê o briefing na sua tela e marca cada critério. Vocês formam um quarteto, o mesmo grupo da próxima aula.</p>
        ${line('review.peer', 'Apelido da dupla vizinha', rv.peer, 'Ex.: Bia + Leo')}
        <div class="check-grid">${CHECKS.map((text, i) => `<div class="check-item">${radioGroup(`check-${i}`, esc(text), CHECK_STATUS, rv.checks[i], ` data-check="${i}"`)}</div>`).join('')}</div>
        ${field('review.suggestion', 'Sugestão da dupla vizinha', rv.suggestion, '', 2)}
        ${field('review.adjust', 'O que vocês ajustaram depois da validação?', rv.adjust, '', 2)}
      </section>
      <div class="next"><button type="button" class="button primary" data-export>Exportar entrega ↗</button></div>`;
  }

  /* ---------- Renderização geral e eventos ---------- */
  function render(focusId) {
    document.querySelectorAll('.phase-rail [data-phase]').forEach(button => button.dataset.phase === String(state.phase) ? button.setAttribute('aria-current', 'step') : button.removeAttribute('aria-current'));
    ui.lockedView = false;
    if (phaseOpen(state.phase)) $('workspace').innerHTML = [renderDecode, renderInterview, renderResearch, renderConsolidate][state.phase - 1]();
    else {
      const back = [4, 3, 2].find(phaseOpen) || 1;
      ui.lockedView = true;
      $('workspace').innerHTML = lockedHTML(`Parada ${state.phase}`, OPENS.phase[state.phase], String(back), `Voltar à Parada ${back}`);
    }
    if (state.phase === 2 && !roundOpen(state.round)) ui.lockedView = true;
    updateRail(); updateClock();
    if (focusId) $(focusId)?.focus();
  }
  function setUrl() {
    try { const url = new URL(location.href); url.searchParams.set('fase', String(state.phase)); if (state.phase === 2) url.searchParams.set('rodada', String(state.round)); else url.searchParams.delete('rodada'); history.replaceState(null, '', url); } catch { /* arquivo local sem histórico */ }
  }
  function go(phase) {
    state.phase = Number(phase); ui.secret = false; save(); render(); setUrl();
    $('stage-title')?.focus({preventScroll:true}); $('workspace').scrollIntoView({block:'start'});
  }
  function goRound(r) {
    state.round = Number(r); ui.secret = false; save(); render(); setUrl();
    document.querySelector(`[data-round="${state.round}"]`)?.focus();
  }
  function setField(target) {
    const path = target.dataset.field.split('.');
    let owner = state; for (const part of path.slice(0, -1)) owner = owner[part];
    owner[path.at(-1)] = target.value; save();
  }
  const refreshPreview = () => { const box = $('brief-preview'); if (box) box.innerHTML = briefingPreview(); };
  document.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('[data-field]')) { setField(target); if (target.dataset.field === 'weak.questions') { const label = target.closest('label'); if (label) label.firstChild.textContent = `Perguntas para o cliente fechar os furos (uma por linha, com “?”) · ${questionCount()} de ${MIN_QUESTIONS}`; } refreshPreview(); }
    if (target.dataset.refNote) { state.research.refs[target.dataset.refNote] = target.value; save(); }
    if (target.dataset.trendWhy) { state.research.trends[target.dataset.trendWhy].why = target.value; save(); }
    if (target.matches('[data-field^="interview.rounds"]')) { const box = target.closest('.topic'); if (box) box.classList.toggle('is-done', filled(target.value, 8)); }
  });
  document.addEventListener('change', event => {
    const target = event.target;
    if (target.id === 'part-select') {
      const i = ui.sentence; if (i === null) return;
      state.anatomy.tags[i] = target.value;
      if (target.value && state.anatomy.first[i] === null) state.anatomy.first[i] = target.value === GOOD[i][0];
      save(); render('part-select'); return;
    }
    if (target.dataset.weak !== undefined) { state.weak.marks[Number(target.dataset.weak)] = target.value; save(); render(); document.querySelector(`[name="${target.name}"][value="${target.value}"]`)?.focus(); return; }
    if (target.dataset.fhp !== undefined) { state.fhp[Number(target.dataset.fhp)] = target.value; save(); render(); document.querySelector(`[name="${target.name}"][value="${target.value}"]`)?.focus(); return; }
    if (target.dataset.pepita) { const [i, k] = target.dataset.pepita.split(':').map(Number); state.interview.rounds[i].pepitas[k] = target.checked; save(); render(); document.querySelector(`[data-pepita="${i}:${k}"]`)?.focus(); return; }
    if (target.dataset.confirm !== undefined) { state.interview.rounds[Number(target.dataset.confirm)].confirmed = target.checked; save(); return; }
    if (target.name === 'chosen') {
      const next = Number(target.value), switching = state.interview.chosen && state.interview.chosen !== next;
      const started = ['objetivo', 'publico', 'falta', 'sucesso'].some(id => state.doc[id].trim()) || Object.keys(state.research.matrix).length || state.research.opportunity.trim() || state.research.call.cut.trim();
      if (switching && started && !confirm('Trocar de projeto apaga o briefing, a comparação de concorrentes e a resposta ao telefonema do cliente anterior. As entrevistas continuam guardadas. Trocar mesmo?')) { target.checked = false; document.querySelector(`[name="chosen"][value="${state.interview.chosen}"]`).checked = true; return; }
      if (switching) resetForClient();
      state.interview.chosen = next; save(); render(); document.querySelector(`[name="chosen"][value="${target.value}"]`)?.focus(); return; }
    if (target.dataset.method !== undefined) { state.research.methods[Number(target.dataset.method)] = target.value; save(); render(); document.querySelector(`[name="${target.name}"][value="${target.value}"]`)?.focus(); return; }
    if (target.dataset.matrix) { if (target.value) state.research.matrix[target.dataset.matrix] = target.value; else delete state.research.matrix[target.dataset.matrix]; save(); const cap = document.querySelector('.matrix caption'); if (cap) cap.textContent = `Comparação · ${matrixFilled()} de 18 marcadas`; return; }
    if (target.dataset.ref) { const id = target.dataset.ref; if (target.checked) state.research.refs[id] = state.research.refs[id] || ''; else delete state.research.refs[id]; save(); render(); document.querySelector(target.checked ? `[data-ref-note="${id}"]` : `[data-ref="${id}"]`)?.focus(); return; }
    if (target.dataset.trend) { const id = target.dataset.trend, t = state.research.trends[id] || {verdict:'', why:''}; t.verdict = target.value; state.research.trends[id] = t; save(); render(); document.querySelector(`[data-trend-why="${id}"]`)?.focus(); return; }
    if (target.dataset.access) { const id = target.dataset.access, list = state.doc.access; state.doc.access = target.checked ? [...new Set([...list, id])] : list.filter(k => k !== id); save(); refreshPreview(); return; }
    if (target.dataset.check !== undefined) { state.review.checks[Number(target.dataset.check)] = target.value; save(); return; }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.closest('.phase-rail') && button.dataset.phase) { go(button.dataset.phase); return; }
    if (button.dataset.jump) { const [phase, round] = button.dataset.jump.split(':'); if (round) state.round = Number(round); go(phase); return; }
    if (button.dataset.warm) { const i = state.warmup.findIndex(answer => !answer); if (i >= 0) { state.warmup[i] = button.dataset.warm; ui.warmCard = i; save(); renderWarmup(); document.querySelector('[data-warm-next]')?.focus(); } return; }
    if (button.hasAttribute('data-warm-next')) { ui.warmCard = null; renderWarmup(); (document.querySelector('[data-warm]') || document.querySelector('[data-sentence]'))?.focus(); return; }
    if (button.id === 'stuck') { const key = hintKey(); ui.hints[key] = (ui.hints[key] || 0) + 1; refreshMission(); ($('stuck') || document.querySelector('.stuck-list li:last-child'))?.focus?.(); return; }
    if (button.id === 'key-ok') {
      const word = norm($('key-input').value.trim()), found = Object.entries(KEYS).find(([, value]) => value === word);
      if (!found) { $('key-status').textContent = 'Palavra não reconhecida.'; $('key-input').focus(); return; }
      if (!state.keys.includes(Number(found[0]))) state.keys.push(Number(found[0]));
      save(); render(); $('stage-title')?.focus({preventScroll:true}); return;
    }
    if (button.dataset.go) { if (button.dataset.go.startsWith('round-')) { goRound(button.dataset.go.slice(6)); return; } go(button.dataset.go); return; }
    if (button.dataset.round) { if (button.getAttribute('aria-disabled') === 'true' && !roundOpen(Number(button.dataset.round))) { goRound(button.dataset.round); return; } goRound(button.dataset.round); return; }
    if (button.dataset.sentence !== undefined) { ui.sentence = Number(button.dataset.sentence); render('part-select'); return; }
    if (button.id === 'draw') {
      const pool = [...CLIENT_IDS].sort(() => Math.random() - 0.5).slice(0, 2);
      state.interview.draw = pool; state.interview.rounds = pool.map(client => ({...emptyRound(), client})); save(); render(); $('secret-show')?.focus(); return;
    }
    if (button.id === 'secret-show') { ui.secret = true; render(); $('secret')?.querySelector('h4')?.setAttribute('tabindex', '-1'); $('secret')?.querySelector('h4')?.focus(); return; }
    if (button.id === 'secret-hide') { ui.secret = false; render(); $('secret-show')?.focus(); return; }
    if (button.dataset.why) { const [i, delta] = button.dataset.why.split(':').map(Number), r = state.interview.rounds[i]; r.why = Math.max(0, Math.min(99, r.why + delta)); save(); const out = button.parentElement.querySelector('.why-count'); if (out) out.textContent = r.why; return; }
    if (button.dataset.reveal !== undefined) { state.interview.rounds[Number(button.dataset.reveal)].revealed = true; ui.secret = false; save(); render(); document.querySelector(`[data-pepita="${button.dataset.reveal}:0"]`)?.focus(); return; }
    if (button.dataset.mock) { const [i, view] = button.dataset.mock.split(':'); ui.view[i] = view; render(); document.querySelector(`[data-mock="${i}:${view}"]`)?.focus(); return; }
    if (button.id === 'check-matrix') { state.research.checked = true; save(); render('check-matrix'); return; }
    if (button.id === 'call') { state.research.call.open = true; save(); render(); $('call-title')?.focus(); return; }
    if (button.id === 'export' || button.hasAttribute('data-export')) exportReport();
  });
  document.addEventListener('toggle', event => { if (event.target.matches?.('details.stretch')) ui.stretch[state.phase] = event.target.open; }, true);
  document.addEventListener('keydown', event => { if (event.key === 'Enter' && event.target.id === 'key-input') { event.preventDefault(); $('key-ok').click(); } });
  $('team').value = state.team;
  $('team').addEventListener('input', event => { state.team = event.target.value; save(); });

  /* ---------- Exportação: HTML autônomo, sem recursos de rede ---------- */
  function pending() {
    const list = [];
    if (warmAnswered() < WARMUP.length) list.push(`aquecimento (${warmAnswered()} de ${WARMUP.length})`);
    if (tagsRight() < GOOD.length) list.push(`partes do briefing comentado (${tagsRight()} de ${GOOD.length})`);
    if (weakRight() < WEAK.length) list.push(`furos do briefing fraco (${weakRight()} de ${WEAK.length})`);
    if (questionCount() < MIN_QUESTIONS) list.push(`perguntas para fechar os furos (${questionCount()} de ${MIN_QUESTIONS})`);
    [0, 1].forEach(i => { if (!roundDone(i)) list.push(`rodada ${i + 1} da entrevista`); });
    if (!state.interview.chosen || !filled(state.interview.motivo, 20)) list.push('escolha do projeto com motivo');
    if (methodsRight() < METHOD_CARDS.length) list.push(`métodos de pesquisa (${methodsRight()} de ${METHOD_CARDS.length})`);
    if (!state.research.checked || matrixRight() < MIN_MATRIX) list.push('comparação de concorrentes conferida');
    if (!filled(state.research.opportunity, 20)) list.push('oportunidade que ninguém aproveita');
    if (refsDone() < MIN_REFS) list.push(`painel de referências (${refsDone()} de ${MIN_REFS})`);
    if (trendsDone() < MIN_TRENDS) list.push(`tendências avaliadas (${trendsDone()} de ${MIN_TRENDS})`);
    if (!callDone()) list.push('resposta ao telefonema do cliente');
    if (docDone() < DOC_FIELDS.length) list.push(`campos do briefing (${docDone()} de ${DOC_FIELDS.length})`);
    if (state.doc.access.length < 2) list.push('requisitos de acessibilidade');
    if (!reviewDone()) list.push('validação da dupla vizinha');
    if (!filled(state.review.adjust, 10)) list.push('ajuste depois da validação');
    return list;
  }
  function exportReport() {
    const missing = pending();
    state.exports++; if (state.phase === 4 && !missing.length) state.exportedFinal = true;
    const s = state, team = s.team.trim(), dash = '<em>Não registrado.</em>', c = chosenClient(), rs = s.research;
    const text = value => value && value.trim() ? esc(value.trim()) : dash;
    const lines = value => value && value.trim() ? esc(value.trim()).replace(/\n/g, '<br>') : dash;
    const roundHTML = (r, i) => !r.client ? `<p>${dash}</p>` : `<h3 class="r-h3">Rodada ${i + 1} · ${esc(CLIENTS[r.client].name)}${s.interview.chosen === i + 1 ? ' · projeto escolhido' : ''}</h3>
      <table class="r-table"><tbody>${TOPICS.map(([id, label]) => `<tr><th>${label}</th><td>${text(r.answers[id])}</td></tr>`).join('')}</tbody></table>
      <p class="r-small">“Por quê?” perguntados: ${r.why} · Pepitas descobertas: ${r.revealed ? `${r.pepitas.filter(Boolean).length} de 3` : 'não reveladas'} · Resumo confirmado pelo cliente: ${r.confirmed ? 'sim' : 'não'}</p><p><strong>Resumo:</strong> ${text(r.resumo)}</p>`;
    const data = {aula:14, cliente:chosenClientId(), nomeCliente:c.name, dupla:team, briefing:Object.fromEntries(DOC_FIELDS.map(([id]) => [id, s.doc[id].trim()])), naoEntraAgora:rs.call.cut.split('\n').map(item => item.trim()).filter(Boolean), acessibilidade:s.doc.access.map(id => ACCESS.find(([k]) => k === id)[1]), referencias:Object.entries(rs.refs).map(([id, note]) => ({ideia:REFS.find(([k]) => k === id)[1], motivo:note.trim()})), tendencias:Object.entries(rs.trends).map(([id, t]) => ({tendencia:TRENDS.find(([k]) => k === id)[1], decisao:t.verdict, motivo:t.why.trim()})), oportunidade:rs.opportunity.trim()};
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Briefing · ${esc(c.name)} · ${esc(team || 'Aula 14')}</title><style>
body{margin:0;background:#f7f5ef;color:#0b1f33;font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
.r-main{max-width:960px;margin:auto;padding:36px 24px 64px}.r-kicker{font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#0057b8}
.r-h1{margin:6px 0 10px;font-size:48px;line-height:1.05}.r-h2{margin:48px 0 14px;padding-top:20px;font-size:30px;border-top:4px solid #0b1f33}.r-h3{margin:22px 0 8px;font-size:21px}
.r-note{padding:14px 16px;border-left:6px solid ${missing.length ? '#b42318' : '#0f7b3f'};background:#ffffff}.r-list{padding-left:22px}.r-list li{margin:8px 0}
.r-table{width:100%;border-collapse:collapse;background:#ffffff}.r-table th,.r-table td{padding:10px;border:1px solid #c9ccd1;text-align:left;vertical-align:top}.r-table th{background:#e8eef6;width:28%}
.r-sheet{padding:24px;background:#ffffff;border:3px solid #0b1f33}.r-sheet h2{margin:0 0 16px;font-size:26px;line-height:1.25}.r-sheet dl{display:grid;grid-template-columns:200px 1fr;gap:10px 18px;margin:0}.r-sheet dt{font-weight:800}.r-sheet dd{margin:0}
.r-small{font-size:14px;color:#4a5868}.r-seals{display:flex;flex-wrap:wrap;gap:8px}.r-seals span{padding:4px 10px;border:2px solid #c9ccd1;font-weight:800}.r-seals .on{border-color:#0f7b3f;color:#0f7b3f}
@media (max-width:640px){.r-sheet dl{grid-template-columns:1fr}.r-h1{font-size:36px}}@media print{.r-h2{break-before:page}}</style></head><body><main class="r-main">
<p class="r-kicker">SENAI · Design Web · Aula 14</p><h1 class="r-h1">Briefing · ${esc(c.name)}</h1>
<p><strong>${esc(team || 'Identificação não preenchida')}</strong><br>Exportado em ${esc(new Date().toLocaleString('pt-BR'))}</p>
<p class="r-seals">${[1, 2, 3, 4].map(p => `<span class="${phaseDone(p) ? 'on' : ''}">${phaseDone(p) ? '✓' : '○'} Parada ${p}</span>`).join('')}</p>
<p class="r-note">${missing.length ? `Registro parcial. Pendências: ${esc(missing.join('; '))}.` : 'Os registros essenciais estão preenchidos. A qualidade das decisões é avaliada pelos critérios da aula.'}</p>
<section class="r-sheet"><p class="r-kicker">Briefing de uma página</p><h2>${text(s.doc.resumo)}</h2><dl>
${DOC_FIELDS.slice(1).map(([id, label]) => `<dt>${esc(label)}</dt><dd>${text(s.doc[id])}</dd>`).join('')}
<dt>Não entra agora</dt><dd>${lines(rs.call.cut)}</dd>
<dt>Acessibilidade</dt><dd>${data.acessibilidade.length ? data.acessibilidade.map(esc).join('<br>') : dash}</dd>
<dt>Oportunidade</dt><dd>${text(rs.opportunity)}</dd>
<dt>Referências</dt><dd>${data.referencias.length ? data.referencias.map(r => `${esc(r.ideia)}: ${esc(r.motivo) || '<em>sem motivo</em>'}`).join('<br>') : dash}</dd>
<dt>Tendências a usar</dt><dd>${data.tendencias.filter(t => t.decisao === 'usar').map(t => `${esc(t.tendencia)}${t.motivo ? `: ${esc(t.motivo)}` : ''}`).join('<br>') || dash}</dd></dl></section>
<h2 class="r-h2">01 / Decifrar</h2><p>Aquecimento: ${warmRight()} de ${WARMUP.length} certos. Partes do briefing comentado: ${tagsRight()} de ${GOOD.length} (${firstRight()} na primeira tentativa). Furos do briefing fraco: ${weakRight()} de ${WEAK.length}.</p>
<h3 class="r-h3">Perguntas para fechar os furos</h3><p>${lines(s.weak.questions)}</p>${s.weak.rewrite.trim() ? `<h3 class="r-h3">Salão Bela Vista reescrito</h3><p>${lines(s.weak.rewrite)}</p>` : ''}
<h2 class="r-h2">02 / Entrevistas</h2>${s.interview.rounds.map(roundHTML).join('')}
<h3 class="r-h3">Motivo da escolha</h3><p>${text(s.interview.motivo)}</p>
<h2 class="r-h2">03 / Pesquisa</h2><p>Métodos: ${methodsRight()} de ${METHOD_CARDS.length} certos.</p>
<h3 class="r-h3">Concorrentes</h3><table class="r-table"><thead><tr><th>Concorrente</th>${HEURISTICS.map(([, label]) => `<th>${esc(label)}</th>`).join('')}</tr></thead><tbody>${c.rivals.map((rival, i) => `<tr><td>${esc(rival.name)}</td>${HEURISTICS.map(([h]) => `<td>${({sim:'Sim', nao:'Não'})[rs.matrix[`${i}-${h}`]] || '—'}</td>`).join('')}</tr>`).join('')}</tbody></table>
<p class="r-small">${rs.checked ? `Comparação conferida: ${matrixRight()} de 18 corretas.` : 'Comparação não conferida.'}</p><p><strong>Oportunidade:</strong> ${text(rs.opportunity)}</p>
<h3 class="r-h3">Tendências</h3><ul class="r-list">${data.tendencias.map(t => `<li>${esc(t.tendencia)}: ${esc((VERDICTS.find(([k]) => k === t.decisao) || ['', 'sem decisão'])[1])}${t.motivo ? ` · ${esc(t.motivo)}` : ''}</li>`).join('') || '<li>Nenhuma avaliada.</li>'}</ul>
<h3 class="r-h3">Telefonema do cliente</h3><p>${esc(c.call)}</p><p><strong>O que muda:</strong> ${text(rs.call.change)}</p>
${rs.web.site.trim() ? `<h3 class="r-h3">Achado da internet</h3><p><strong>${esc(rs.web.site.trim())}</strong>: ${text(rs.web.learn)}</p>` : ''}
<h2 class="r-h2">04 / Validação</h2><p><strong>Dupla vizinha:</strong> ${text(s.review.peer)}</p>
<table class="r-table"><tbody>${CHECKS.map((label, i) => `<tr><th>${esc(label)}</th><td>${esc((CHECK_STATUS.find(([k]) => k === s.review.checks[i]) || ['', 'não marcado'])[1])}</td></tr>`).join('')}</tbody></table>
<p><strong>Sugestão:</strong> ${text(s.review.suggestion)}</p><p><strong>Ajuste feito:</strong> ${text(s.review.adjust)}</p>
<p class="r-small">Clientes, negócios e concorrentes fictícios, para estudo. Este arquivo guarda os dados do briefing para as próximas aulas.</p>
<script type="application/json" id="briefing-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script></main></body></html>`;
    const blob = new Blob([html], {type:'text/html;charset=utf-8'}), url = URL.createObjectURL(blob), link = document.createElement('a');
    const slug = norm(team || 'dupla').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 45) || 'dupla';
    link.href = url; link.download = `aula-14-briefing-${slug}-${new Date().toTimeString().slice(0, 8).replace(/:/g, '')}.html`;
    document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    save();
    $('save-status').textContent = missing.length ? 'Entrega parcial exportada.' : 'Entrega exportada.';
  }

  render(); save(); setUrl();
  setInterval(() => {
    updateClock(); updateRail();
    if (ui.lockedView && phaseOpen(state.phase) && (state.phase !== 2 || roundOpen(state.round))) render();
    else if (state.phase === 3 && callOpen()) { const waiting = document.querySelector('.shock-closed.is-locked'); if (waiting) { waiting.outerHTML = callHTML(); refreshMission(); } }
  }, 20000);
})();
