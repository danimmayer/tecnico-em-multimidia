// Aula 09 de Produção Audiovisual: fonte única dos dados públicos e das anotações.
// Regenerar com: node scripts/build-audiovisual-09.mjs

export const briefings = [
  ['EQ01', 'Garrafa', 'AQUALTA', 'Quem passa o dia fora', 'Água gelada até o fim do dia.'],
  ['EQ02', 'Fone de ouvido', 'SONARE', 'Quem estuda no ônibus', 'Menos barulho, mais concentração.'],
  ['EQ03', 'Caderno', 'FOLHA FIRME', 'Alunos do curso técnico', 'Folhas que aguentam o ano todo.'],
  ['EQ04', 'Mochila', 'ROTA 7', 'Quem trabalha e estuda', 'Tudo organizado em um só lugar.'],
  ['EQ05', 'Caneta', 'TRAÇO CERTO', 'Quem faz muitas provas', 'Escrita que não falha nem borra.'],
  ['EQ06', 'Caneca', 'PAUSA', 'Equipes de escritório', 'Seu café quente por mais tempo.'],
  ['EQ07', 'Cabo USB', 'CARGA FORTE', 'Quem usa muito o celular', 'Ponta reforçada que não quebra.']
];

export const plans = [
  { id: 'P1', name: 'GANCHO', seconds: 4, frame: 'Plano médio', text: 'Uma situação do dia a dia sem o produto.' },
  { id: 'P2', name: 'PRODUTO', seconds: 5, frame: 'Produto inteiro', text: 'O produto aparece inteiro, de frente.' },
  { id: 'P3', name: 'DETALHE', seconds: 6, frame: 'Plano detalhe', text: 'O ponto forte de perto: tampa, textura, botão.' },
  { id: 'P4', name: 'USO', seconds: 8, frame: 'Primeiro plano', text: 'Mãos ou pessoa usando o produto.' },
  { id: 'P5', name: 'ASSINATURA', seconds: 7, frame: 'Packshot', text: 'Produto ao centro e cartela com a marca.' }
];

export const lesson = {
  title: 'Set de filmagem: comercial em uma noite',
  description: 'A turma trabalha como produtora: cada equipe recebe o briefing de um cliente, planeja um comercial de 30 segundos em cinco planos, grava na ordem de filmagem do set com claquete e boletim de câmera e fecha a noite com o copião organizado para a edição.',
  objectives: [
    'Coordenação de equipe: definição da organização do trabalho e dos níveis de autonomia.',
    'Trabalho em equipe: divisão de papéis e responsabilidades, compromisso com objetivos e metas.',
    'Ferramentas para gestão eficaz do tempo: priorização, controle de prazos.',
    'Captura de vídeos e sons: cenários, enquadramento, iluminação e som aplicados de forma integrada no set.'
  ],
  technical: [
    'Identificar procedimentos técnicos para a produção de curtas-metragem, comerciais e documentários.',
    'Aplicar conceitos de fotografia e filmagem para o desenvolvimento audiovisual.'
  ],
  socioemotional: [
    'Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.',
    'Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados.'
  ],
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Pré-produção: conhecer a ordem do dia e o fluxo de uma produtora, receber o briefing do cliente da equipe, copiar no caderno o roteiro de cinco planos projetado e preencher o que aparece em cada plano, escrever o slogan, definir a ordem de filmagem e as funções do set e copiar o boletim de câmera. Roteiro e slogan aprovados antes do lanche.'
    },
    {
      horario: '20:05 - 21:00',
      atividade: 'Set 1, mesa de produto: aplicar os cinco comandos do set e a claquete de papel, montar a luz de produto uma única vez e gravar os planos 2, 3 e 5 (produto inteiro, detalhe e packshot). Cada tomada é conferida no visor e registrada no boletim como BOA ou REFAZER.'
    },
    {
      horario: '21:00 - 21:40',
      atividade: 'Set 2, mãos ou pessoa: reenquadrar uma vez e gravar os planos 4 e 1 (uso e gancho). Janela de locução com a sala em silêncio: cada equipe, na sua vez, grava o slogan com a marca perto da fonte e confere com fone. Conferência do boletim antes de desmontar.'
    },
    {
      horario: '21:40 - 22:10',
      atividade: 'Copião: copiar o material para a pasta da equipe (PA_A09_EQ01), renomear os arquivos pelo boletim (P2_T1), assistir a tomada BOA de cada plano na ordem do roteiro, marcar a tomada escolhida, devolver o equipamento conferido e registrar a frase individual no caderno.'
    }
  ],
  methodology: 'Simulação de produtora com briefing de cliente, roteiro de cinco planos, ordem de filmagem por montagem de set, funções com decisões definidas, comandos de set, claquete de papel, boletim de câmera, janela de locução em silêncio e copião ao final. Fichas projetadas para cópia no caderno; critério de pronto em cada etapa.',
  resources: 'Projetor, quadro, caderno e caneta. Há 7 câmeras já carregadas, com cartão e bateria, 7 ring lights, fones de ouvido e computadores com reprodutor de vídeo e cabo ou leitor de cartão. Os grupos já estão formados e os 7 objetos dos briefings já separados: garrafa, fone de ouvido, caderno, mochila, caneta, caneca e cabo USB. Nenhum programa precisa ser instalado no Windows. Nenhuma ficha impressa: roteiro e boletim são projetados e copiados no caderno. A edição acontece na aula 10, no editor online gratuito.',
  observation: 'Aula das 19:00 às 22:10. Lanche fixo das 19:45 às 20:05. Chamada no início dos quatro blocos. Cada equipe permanece no próprio posto durante toda a noite; somente o professor circula. Comandos do set em voz baixa; na janela de locução, a sala inteira faz silêncio. Aparecer na câmera é voluntário: mãos em cena resolvem os planos 1 e 4. Exercício interno, sem publicação. Marcas e clientes são fictícios; logotipos reais ficam virados ou cobertos com papel. Copiar antes de apagar qualquer arquivo; não formatar cartão, que pode conter material de outra turma. Sem fone, ouvir em volume baixo, um aparelho por vez. Sem computador livre, a equipe confere as tomadas no visor da câmera e copia na aula 10.'
};

const setPlans = (ids) => plans.filter((plan) => ids.includes(plan.id));

export const support = {
  teacherGoal: 'Levar as 7 equipes a trabalhar como produtora em uma noite: briefing, roteiro de cinco planos aprovado, gravação por ordem de filmagem com funções definidas, locução gravada em silêncio e copião organizado na pasta da equipe, pronto para a edição da aula 10.',
  plainLanguage: 'Comercial de produto é planejado antes de ligar a câmera: o briefing define a mensagem, o roteiro define os planos e a ordem de filmagem define o que se grava primeiro.',
  say: 'Hoje vocês trabalham como uma produtora de vídeo: cliente, prazo e entrega. Ninguém edita hoje; hoje é dia de set.',
  demo: [
    'Leia a ordem do dia e o fluxo da produtora, do briefing à edição.',
    'Mostre a estrutura de cinco planos com o exemplo falado da garrafa AQUALTA.',
    'Demonstre no posto 1 os cinco comandos do set com a claquete de papel, em voz baixa.',
    'Conduza a janela de locução acendendo o número de cada equipe no slide.'
  ],
  studentDeliverable: 'Por equipe: pasta PA_A09_EQ0X com os cinco planos e a locução, pelo menos uma tomada BOA de cada, arquivos renomeados por plano e tomada, e o boletim no caderno com a tomada escolhida. Por integrante: a frase da função no caderno.',
  check: [
    'Os cinco planos do roteiro têm pelo menos uma tomada BOA.',
    'O produto aparece com a marca fictícia e nenhum logotipo real em quadro.',
    'Toda tomada de imagem começa com a claquete de papel e tem dois segundos de respiro.',
    'A locução do slogan foi gravada perto da fonte e conferida com fone.',
    'A pasta da equipe está no computador, com arquivos renomeados e o boletim indicando a tomada escolhida de cada plano.'
  ],
  fallback: 'Sem o objeto do briefing, a equipe usa qualquer objeto do posto e mantém público e mensagem. Sem transferência, o cartão fica identificado e as tomadas são conferidas no visor; a cópia acontece no início da aula 10.',
  commonProblems: [
    ['A equipe demora no roteiro', 'Mostro o exemplo da AQUALTA e peço que troquem somente o produto; o slogan pode ser a mensagem do briefing.'],
    ['A equipe grava fora da ordem de filmagem', 'Retomo o slide da ordem de filmagem: terminar o set 1 antes de mexer na luz.'],
    ['Tomada sem claquete', 'Grava-se a claquete logo em seguida e anota-se no boletim; não é preciso refazer a cena.'],
    ['Ninguém quer aparecer', 'Mãos em cena resolvem o gancho e o uso; o rosto não é obrigatório.'],
    ['Barulho na janela de locução', 'Pauso a janela, repito "silêncio, gravando" e devolvo a vez à mesma equipe.'],
    ['O computador não reconhece o cartão', 'Troco o cabo ou o leitor; sem cópia, o cartão fica identificado e a equipe confere no visor.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia',
      kicker: 'Ordem do dia · 7 equipes, 7 sets',
      heading: 'Hoje a turma é uma produtora',
      lede: 'Cada equipe atende um cliente e grava um comercial de 30 segundos. Estes são os prazos da noite.',
      block: 1,
      av9: {
        type: 'day',
        rows: [
          { time: '19:00–19:45', minutes: 45, title: 'Pré-produção', text: 'Briefing, roteiro de cinco planos e funções.' },
          { time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Mesmo posto na volta.', pause: true },
          { time: '20:05–21:00', minutes: 55, title: 'Set 1 · mesa de produto', text: 'Planos 2, 3 e 5.' },
          { time: '21:00–21:40', minutes: 40, title: 'Set 2 · mãos ou pessoa', text: 'Planos 4 e 1 e locução.' },
          { time: '21:40–22:10', minutes: 30, title: 'Copião', text: 'Pasta, nomes, conferência e devolução.' }
        ]
      },
      promptLabel: 'Entrega da noite',
      prompt: 'Os cinco planos e a locução gravados, o boletim preenchido e a pasta da equipe conferida.',
      teacher: {
        speech: 'Hoje vocês trabalham como uma produtora de vídeo: cliente, prazo e entrega. Ninguém edita hoje; hoje é dia de set.',
        steps: [
          '4 min · Faço a chamada e confirmo 7 equipes, 7 câmeras carregadas, 7 ring lights, fones e os 7 objetos dos briefings. Leio a ordem do dia e a entrega.'
        ],
        watch: 'Equipamento e objeto já estão em cada posto; ninguém busca material durante a aula.',
        rescue: 'Com falta de integrante, a equipe menor acumula funções; não refaço equipes.'
      }
    },
    {
      title: 'Fluxo da produtora',
      kicker: 'Como um comercial é produzido',
      heading: 'Do pedido do cliente ao vídeo entregue',
      lede: 'Toda produtora segue estas etapas, do comercial de TV ao vídeo de treinamento de uma indústria.',
      block: 1,
      av9: {
        type: 'flow',
        steps: [
          { label: 'BRIEFING', text: 'O cliente diz o que quer.', mark: 'Hoje' },
          { label: 'ROTEIRO', text: 'O que aparece em cada plano.', mark: 'Hoje' },
          { label: 'ORDEM DE FILMAGEM', text: 'O que se grava primeiro.', mark: 'Hoje' },
          { label: 'SET', text: 'Gravação com funções.', mark: 'Hoje' },
          { label: 'COPIÃO', text: 'A equipe confere o material.', mark: 'Hoje' },
          { label: 'EDIÇÃO', text: 'Montagem e entrega.', mark: 'Aula 10', later: true }
        ]
      },
      promptLabel: 'Pergunta para a turma',
      prompt: 'Onde vocês viram, esta semana, um vídeo de produto de até 30 segundos?',
      teacher: {
        steps: [
          '3 min · Leio as seis etapas e ouço dois exemplos da turma: anúncio antes de vídeo, televisão, tela de loja ou vídeo de fábrica.'
        ],
        watch: 'Exemplos reais e próximos; a etapa de edição fica marcada para a aula 10.',
        rescue: 'Sem exemplos da turma, cito o vídeo de produto em loja virtual e o vídeo institucional de uma empresa da região.'
      }
    },
    {
      title: 'Cinco planos, 30 segundos',
      kicker: 'Estrutura do comercial',
      heading: 'Um comercial de 30 segundos em cinco planos',
      lede: 'Esta sequência é comum em anúncios de produto. Todas as equipes usam a mesma.',
      block: 1,
      av9: { type: 'plans', plans },
      promptLabel: 'Termo técnico',
      prompt: 'Packshot é o plano final com o produto limpo, centralizado e bem iluminado. É a imagem que o cliente mais confere.',
      teacher: {
        steps: [
          '2 min · Apresento os cinco planos e a soma de 30 segundos.',
          '4 min · Leio o exemplo da garrafa AQUALTA: P1, mochila aberta e mão procurando algo para beber; P2, a garrafa entra inteira na mesa; P3, detalhe da tampa fechando; P4, mão enche o copo; P5, garrafa ao centro e cartela “AQUALTA”.'
        ],
        watch: 'A turma entende que cada plano tem uma função e um tempo; não é preciso decorar os nomes.',
        rescue: 'Se surgir dúvida sobre enquadramento, mostro com a câmera do posto 1 a diferença entre produto inteiro e detalhe.'
      }
    },
    {
      title: 'Briefing do cliente',
      kicker: 'Briefing · um cliente por equipe',
      heading: 'Cada equipe atende um cliente',
      lede: 'O briefing é o pedido do cliente: o produto, para quem é e a mensagem que não pode faltar.',
      block: 1,
      av9: {
        type: 'table',
        variant: 'brief',
        columns: ['Equipe', 'Produto', 'Marca', 'Público', 'Mensagem obrigatória'],
        rows: briefings
      },
      promptLabel: 'Regra do cliente',
      prompt: 'Marcas e clientes são fictícios. Logotipo real fica virado para trás ou coberto com papel.',
      teacher: {
        steps: [
          '3 min · Leio a tabela de EQ01 a EQ07; cada equipe confirma o objeto no próprio posto.',
          '2 min · Explico a regra do logotipo e mostro como cobrir com uma tira de papel.'
        ],
        watch: 'Não há sorteio nem troca de cliente: a equipe atende a linha com o seu número.',
        rescue: 'Sem o objeto do briefing, a equipe usa qualquer objeto do posto e mantém público e mensagem.'
      }
    },
    {
      title: 'Roteiro no caderno',
      kicker: 'Ficha projetada · copiar no caderno',
      heading: 'Roteiro de cinco planos',
      lede: 'Copiem a tabela e preencham “O que aparece” com o produto da equipe.',
      block: 1,
      av9: {
        type: 'table',
        variant: 'copy',
        columns: ['Plano', 'Tempo', 'Enquadramento', 'O que aparece'],
        rows: plans.map((plan) => [`${plan.id} ${plan.name}`, `${plan.seconds} s`, plan.frame, '']),
        footer: ['Equipe: EQ0__', 'Marca: ________', 'Slogan, até 6 palavras: ______________']
      },
      promptLabel: 'Parem e confiram',
      prompt: 'PRONTO QUANDO: cinco linhas preenchidas, slogan escrito e cartela da marca feita numa folha, em letras grandes.',
      teacher: {
        steps: [
          '2 min · Mostro onde fica cada coluna e lembro o exemplo da AQUALTA.',
          '10 min · As equipes escrevem no próprio posto; atendo primeiro quem ainda não começou.'
        ],
        watch: 'Uma linha curta por plano, com ação filmável na própria mesa.',
        rescue: 'Equipe travada segue a lógica do exemplo da AQUALTA e troca apenas o produto; o slogan pode ser a mensagem do briefing.'
      }
    },
    {
      title: 'Ordem de filmagem',
      kicker: 'Plano de filmagem',
      heading: 'No set, não se grava na ordem do roteiro',
      lede: 'A equipe grava por montagem de luz e câmera. Mexer no set uma vez só economiza tempo.',
      block: 1,
      av9: {
        type: 'sets',
        sets: [
          { label: 'SET 1', title: 'Mesa de produto', when: 'Bloco 2', plans: setPlans(['P2', 'P3', 'P5']), note: 'Câmera apoiada, ring light fixa, produto limpo.' },
          { label: 'SET 2', title: 'Mãos ou pessoa', when: 'Bloco 3', plans: setPlans(['P4', 'P1']), note: 'Reenquadrar uma vez; luz nas mãos ou no rosto.' },
          { label: 'LOC', title: 'Locução', when: 'Bloco 3', plans: [], note: 'Slogan e marca gravados perto da boca, com a sala em silêncio.' }
        ]
      },
      promptLabel: 'Copiar no caderno',
      prompt: 'SET 1: P2, P3, P5 · SET 2: P4, P1 · LOCUÇÃO',
      teacher: {
        steps: [
          '4 min · Explico por que o set 1 vem primeiro: a luz de produto é montada uma única vez. As equipes copiam a ordem abaixo do roteiro.'
        ],
        watch: 'A turma percebe que a ordem de gravação é diferente da ordem de exibição.',
        rescue: 'Se a equipe perguntar como a ordem volta ao normal, respondo que é a edição que coloca P1 a P5 em sequência.'
      }
    },
    {
      title: 'Funções no set',
      kicker: 'Equipe de set',
      heading: 'Cada função tem uma decisão',
      lede: 'Escrevam no caderno o nome de quem assume cada função. A função vale a noite toda.',
      block: 1,
      av9: {
        type: 'roles',
        roles: [
          { label: 'DIREÇÃO', decides: 'Decide se a tomada é BOA.', text: 'Fala os comandos e aprova o enquadramento.' },
          { label: 'CÂMERA', decides: 'Decide foco e quadro.', text: 'Enquadra e grava. Só ela toca na câmera.' },
          { label: 'LUZ E ARTE', decides: 'Decide o que entra em quadro.', text: 'Posiciona produto e ring light; esconde logotipos reais.' },
          { label: 'SOM E BOLETIM', decides: 'Decide se o som serve.', text: 'Mostra a claquete, ouve com fone e anota cada tomada.' }
        ]
      },
      promptLabel: 'Equipes de 3 ou 5',
      prompt: 'Com 3 pessoas, direção também cuida de luz e arte. Com 5, a quinta pessoa é PRODUÇÃO: controla o horário e faz as mãos em cena.',
      teacher: {
        steps: [
          '3 min · As equipes registram nomes e funções no caderno.',
          '1 min · Confirmo: aparecer na câmera é voluntário; mãos em cena resolvem os planos 1 e 4.'
        ],
        watch: 'Cada função tem uma decisão própria; a direção não opera a câmera.',
        rescue: 'Se duas pessoas quiserem a mesma função, a outra assume a direção no set 2 e as funções trocam uma única vez.'
      }
    },
    {
      title: 'Boletim de câmera',
      kicker: 'Ficha projetada · copiar no caderno',
      heading: 'O boletim registra cada tomada',
      lede: 'Copiem o cabeçalho e deixem dez linhas livres. No set, quem cuida do boletim preenche uma linha por tomada.',
      block: 1,
      av9: {
        type: 'table',
        variant: 'copy',
        columns: ['Plano', 'Tomada', 'Nº do arquivo', 'Resultado', 'Motivo'],
        rows: [
          ['P2', 'T1', '0142', 'REFAZER', 'marca de lado'],
          ['P2', 'T2', '0143', 'BOA', ''],
          ['', '', '', '', ''],
          ['', '', '', '', '']
        ],
        exampleRows: 2
      },
      promptLabel: 'Aprovação do cliente',
      prompt: 'Antes do lanche, o professor passa no posto e aprova roteiro e slogan com um visto no caderno.',
      teacher: {
        steps: [
          '7 min · Enquanto copiam o boletim, passo de EQ01 a EQ07 e aprovo roteiro e slogan com visto no caderno, cerca de 1 min por equipe.'
        ],
        watch: 'Aprovo o que é filmável na mesa em até 8 segundos por plano; peço ajuste apenas no que não cabe.',
        rescue: 'Equipe sem visto até 19:45 ajusta no retorno do lanche, em 2 minutos, antes de ligar a câmera.'
      }
    },
    {
      title: 'Lanche',
      kicker: 'Intervalo',
      heading: 'Lanche até 20:05',
      lede: 'Voltem ao mesmo posto. O set 1 começa assim que a chamada terminar.',
      block: 1,
      pace: 'break',
      av9: {
        type: 'checks',
        items: [
          { label: 'Câmera', text: 'Desligada, com tampa, longe da borda da mesa.' },
          { label: 'Caderno', text: 'Aberto no roteiro, com o boletim copiado.' }
        ]
      },
      teacher: {
        steps: [
          '20 min · Lanche das 19:45 às 20:05.'
        ],
        watch: 'Comida e bebida longe de câmeras e computadores.',
        rescue: 'Mantenho os objetos nos postos; nada é guardado.'
      }
    },
    {
      title: 'Comandos do set',
      kicker: 'Protocolo de gravação',
      heading: 'Cinco comandos, sempre na mesma ordem',
      lede: 'Voz baixa e firme. Os comandos evitam que alguém fale ou se mexa durante a tomada.',
      block: 2,
      av9: {
        type: 'commands',
        commands: [
          { word: 'POSIÇÕES', who: 'Direção', text: 'Todos no lugar.' },
          { word: 'GRAVANDO', who: 'Câmera', text: 'Botão apertado.' },
          { word: 'CLAQUETE', who: 'Som e boletim', text: 'Folha em quadro.' },
          { word: 'AÇÃO', who: 'Direção', text: 'A cena acontece.' },
          { word: 'CORTA', who: 'Direção', text: 'Após dois segundos.' }
        ],
        result: 'Depois do corte, a direção diz BOA ou REFAZER e o boletim anota.'
      },
      teacher: {
        steps: [
          '2 min · Faço a chamada e abro o set 1.',
          '5 min · Demonstro o ciclo completo no posto 1 com a EQ01, em voz baixa; a turma observa do próprio lugar.'
        ],
        watch: 'A demonstração usa o volume de voz esperado para a noite inteira.',
        rescue: 'Se a sala não enxerga o posto 1, repito o ciclo com a câmera voltada para a turma, sem gravar.'
      }
    },
    {
      title: 'Claquete de papel',
      kicker: 'Identificação da tomada',
      heading: 'Toda tomada começa com a claquete',
      lede: 'Uma folha do caderno, com letras grandes, aparece no começo de cada arquivo. Na edição, ela diz o que é cada tomada.',
      block: 2,
      av9: {
        type: 'slate',
        team: 'EQ03',
        plan: 'P2',
        take: 'T1',
        rules: [
          'Letras grossas, ocupando a folha.',
          'Folha em quadro por 2 segundos e sai.',
          'Nova tomada: risque e escreva o novo número.',
          'Dois segundos parados antes da ação e depois do corte: é o respiro da edição.'
        ]
      },
      teacher: {
        steps: [
          '3 min · Mostro uma claquete pronta e peço que cada equipe escreva a sua para o primeiro plano do set 1.'
        ],
        watch: 'Claquete silenciosa: não há batida nem fala, e o som da sala não é afetado.',
        rescue: 'Tomada gravada sem claquete: grave a claquete logo em seguida e anote no boletim.'
      }
    },
    {
      title: 'Set 1 · mesa de produto',
      kicker: 'Bloco de gravação 1',
      heading: 'Gravem P2, P3 e P5 sem desmontar a mesa',
      lede: 'Luz de produto da aula 7: ring light na diagonal e folha branca do outro lado. Montem uma vez e gravem os três planos.',
      block: 2,
      av9: {
        type: 'shoot',
        plans: [
          { ...plans[1], criterion: 'Inteiro, de frente, marca legível.' },
          { ...plans[2], criterion: 'O ponto forte ocupa o quadro, em foco.' },
          { ...plans[4], criterion: 'Produto ao centro, cartela da marca ao lado.' }
        ],
        good: ['Foco no produto', 'Câmera firme', 'Sem logotipo real', 'Respiro de 2 s'],
        extra: { id: 'P3B', name: 'DETALHE 2', text: 'Terminou? Grave outro detalhe do produto. A edição ganha uma opção.' }
      },
      promptLabel: 'Parem e confiram',
      prompt: 'PRONTO QUANDO: P2, P3 e P5 têm pelo menos uma tomada BOA anotada no boletim.',
      teacher: {
        steps: [
          '3 min · Leio os três planos e os quatro itens de tomada BOA.',
          '37 min · Circulo de EQ01 a EQ07 e confiro uma tomada no visor de cada posto; atendo primeiro quem ainda não gravou.',
          '5 min · Às 20:55, paro a sala: cada equipe confere no boletim se os três planos têm tomada BOA.'
        ],
        watch: 'Duas tomadas por plano bastam; refaz-se o que falhou em um item, não por gosto.',
        rescue: 'Equipe atrasada grava P2 e P5 primeiro; o detalhe P3 entra no início do set 2.'
      }
    },
    {
      title: 'Set 2 · mãos ou pessoa',
      kicker: 'Bloco de gravação 2',
      heading: 'Reenquadrem uma vez e gravem P4 e P1',
      lede: 'Ring light de frente para as mãos ou o rosto. Aparecer é voluntário: mãos resolvem os dois planos.',
      block: 3,
      av9: {
        type: 'shoot',
        plans: [
          { ...plans[3], criterion: 'O produto em uso, mãos dentro do quadro.' },
          { ...plans[0], criterion: 'A situação sem o produto, fácil de entender.' }
        ],
        extra: { id: 'C1', name: 'COBERTURA', text: 'Terminou? Grave o produto por outro ângulo. A edição ganha uma opção.' }
      },
      promptLabel: 'Parem e confiram',
      prompt: 'PRONTO QUANDO: P4 e P1 têm pelo menos uma tomada BOA anotada no boletim.',
      teacher: {
        steps: [
          '2 min · Faço a chamada e apresento o set 2.',
          '20 min · Circulo pelos postos priorizando equipes sem P4; equipes adiantadas gravam a cobertura C1.'
        ],
        watch: 'Quem aparece é voluntário; a câmera enquadra mãos quando ninguém quer aparecer.',
        rescue: 'Com pouco tempo, P4 tem prioridade; o gancho P1 pode ser feito com mãos e objeto em 4 segundos.'
      }
    },
    {
      title: 'Janela de locução',
      kicker: 'Silêncio na sala',
      heading: 'Uma equipe grava, a sala faz silêncio',
      lede: 'Cada equipe grava o slogan com a marca quando o número dela acender.',
      block: 3,
      av9: {
        type: 'onair',
        teams: briefings.map(([team]) => team),
        rules: [
          'Câmera a um palmo da boca, lente virada para a mesa.',
          'Antes do slogan, falar: “EQ0_, locução, tomada 1”.',
          'Duas tomadas, LOC_T1 e LOC_T2, conferidas com fone.',
          'Quem espera confere as tomadas no visor, com fone.'
        ]
      },
      teacher: {
        steps: [
          '12 min · Clico no número da equipe, digo “silêncio, gravando” e espero as duas tomadas; cerca de 1 min 30 s por equipe, de EQ01 a EQ07.'
        ],
        watch: 'O número aceso no projetor organiza a vez de cada equipe sem chamada em voz alta.',
        rescue: 'Com barulho, pauso a janela e devolvo a vez à mesma equipe; equipe ausente grava por último.'
      }
    },
    {
      title: 'Antes de desmontar',
      kicker: 'Conferência do set',
      heading: 'O set só desmonta com o boletim completo',
      lede: 'Confiram no caderno, linha por linha. O que faltar é gravado agora.',
      block: 3,
      av9: {
        type: 'checks',
        items: [
          { label: 'Planos', text: 'P1 a P5 com pelo menos uma tomada BOA.' },
          { label: 'Locução', text: 'LOC gravada e ouvida com fone.' },
          { label: 'Claquete', text: 'Toda tomada começa identificada.' },
          { label: 'Boletim', text: 'Número do arquivo em cada linha.' }
        ]
      },
      teacher: {
        steps: [
          '6 min · Cada equipe confere os quatro itens no próprio posto; passo nas equipes com pendência.'
        ],
        watch: 'Pendência encontrada é gravada na hora, no próprio posto.',
        rescue: 'Sem tempo para regravar, a pendência fica escrita no boletim como primeira tarefa da aula 10.'
      }
    },
    {
      title: 'Descarregar e nomear',
      kicker: 'Pasta da equipe',
      heading: 'O material bruto vai para a pasta da equipe',
      lede: 'Copiem pelo cabo ou leitor, renomeiem pelo boletim e abram cada arquivo copiado.',
      block: 4,
      av9: {
        type: 'folder',
        folder: 'PA_A09_EQ03',
        files: ['P1_T1', 'P1_T2', 'P2_T1', 'P2_T2', 'P3_T1', 'P4_T1', 'P4_T2', 'P5_T1', 'LOC_T1', 'LOC_T2'],
        steps: [
          'Copiar do cartão para a pasta da equipe.',
          'Renomear com plano e tomada do boletim; a extensão da câmera continua igual.',
          'Abrir cada arquivo copiado antes de devolver o cartão.'
        ]
      },
      promptLabel: 'Regra da cópia',
      prompt: 'Nada é apagado do cartão. Ele pode ter material de outra turma.',
      teacher: {
        steps: [
          '2 min · Faço a chamada e mostro o padrão da pasta e dos nomes.',
          '10 min · As equipes copiam e renomeiam no computador do posto; confiro a primeira pasta pronta.'
        ],
        watch: 'O nome do arquivo repete o boletim: quem abrir a pasta na aula 10 encontra cada plano sem assistir tudo.',
        rescue: 'Sem computador livre, a equipe confere no visor da câmera, identifica o cartão e copia no início da aula 10.'
      }
    },
    {
      title: 'Copião',
      kicker: 'Sessão de copião',
      heading: 'Assistam o comercial na ordem do roteiro',
      lede: 'Na indústria, a equipe assiste ao material do dia antes de ir embora. Isso se chama copião.',
      block: 4,
      av9: {
        type: 'dailies',
        order: ['P1', 'P2', 'P3', 'P4', 'P5', 'LOC'],
        steps: [
          'Abram a tomada BOA de cada plano, nesta ordem, no reprodutor do computador.',
          'Marquem no boletim a tomada ESCOLHIDA de cada plano.',
          'Somem os segundos úteis: o comercial fecha perto de 30?'
        ]
      },
      promptLabel: 'Pergunta da equipe',
      prompt: 'Se o comercial fosse entregue amanhã, qual plano vocês gravariam de novo? Por quê?',
      teacher: {
        steps: [
          '8 min · As equipes assistem na ordem P1 a P5 e marcam a tomada escolhida; passo em três postos e ouço a resposta da pergunta.'
        ],
        watch: 'O copião é conferência, não edição: ninguém corta nem monta hoje.',
        rescue: 'Sem cópia no computador, o copião é feito no visor da câmera, na mesma ordem.'
      }
    },
    {
      title: 'Encerramento',
      kicker: 'Devolução e registro',
      heading: 'Fechem a diária até 22:10',
      lede: 'Confiram na própria mesa e deixem o equipamento pronto para recolhimento.',
      block: 4,
      av9: {
        type: 'checks',
        items: [
          { label: '1 · Arquivos', text: 'Pasta aberta e conferida. Sem cópia, cartão identificado e guardado.' },
          { label: '2 · Equipamento', text: 'Câmera desligada, com tampa e cartão. Ring light desligada, cabo enrolado.' },
          { label: '3 · Registro', text: 'Cada integrante escreve: “Na função ___, a decisão que tomei foi ___.”' },
          { label: '4 · Aula 10', text: 'Este material vira o comercial editado.' }
        ]
      },
      teacher: {
        steps: [
          '4 min · Confiro as 7 pastas ou os cartões identificados. Não apago nada e não formato cartões.',
          '4 min · Recolho nos postos 7 câmeras e 7 ring lights, conferindo tampa, cartão, bateria e cabo.',
          '2 min · Ouço duas frases, anuncio a edição da aula 10 e encerro às 22:10.'
        ],
        watch: 'Material de outras turmas é preservado; nenhum cartão sai sem identificação.',
        rescue: 'Com atraso, priorizo guardar arquivos e recolher equipamentos; a frase pode ser dita em voz alta.'
      }
    }
  ],
  appendDefaultClosing: false
};
