// Aula 09 de Design Web: slides, horários e notas. Regenerar com: node scripts/build-design-web-09.mjs
const rescue = 'Se alguém travar, demonstrar um único movimento na oficina e devolver o controle ao aluno no posto.';

export const lesson = {
  title: 'Design Responsivo sem Mistério',
  description: 'A página da Arena Pixel ganha três telas: computador, tablet e celular. Cada estudante reorganiza o mesmo conteúdo na grade de cada tela, decide o que aparece primeiro no celular e confere a leitura com um colega.',
  objectives: [
    'Interfaces Web e App: design responsivo.',
    'Plataformas de Desenvolvimento: dispositivos.'
  ],
  technical: [
    'Aplicar estilos css (cascading style sheets) para desenvolvimento de design web.',
    'Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.'
  ],
  socioemotional: [
    'Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados.'
  ],
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Comparar a mesma página no computador, no tablet e no celular: o que empilha, encurta, sobe ou cresce. Descobrir a grade de cada tela (12, 8 e 4 colunas), escolher o que cabe na primeira tela do celular e abrir a oficina responsiva com o projeto da oficina de grade. Salvar antes do lanche.'
    },
    {
      horario: '20:05 - 21:00',
      atividade: 'Montar a página no tablet a partir da biblioteca de componentes, seguindo o rascunho do cliente, numa grade de 8 colunas: cabeçalho e destaque na largura toda, campeonatos dois a dois, botão depois dos campeonatos e rodapé no fim. Testar a leitura, comparar com um exemplo e exportar tablet.png.'
    },
    {
      horario: '21:00 - 21:40',
      atividade: 'Montar a página no celular com a biblioteca, sem rascunho, seguindo as regras da tela: tudo empilhado numa grade de 4 colunas, menu curto no cabeçalho, destaque e botão antes do fim da primeira tela e os quatro campeonatos em seguida. Exportar celular.png.'
    },
    {
      horario: '21:40 - 22:10',
      atividade: 'Comparar as três telas, testar o celular com o colega do lado em cinco segundos, ajustar, salvar e reabrir o projeto e escrever uma frase sobre a decisão de prioridade. Encerrar às 22:10.'
    }
  ],
  methodology: 'Comparação visual das três telas projetadas, jogo rápido de prioridade para a primeira tela do celular e produção individual na oficina responsiva, uma tela por bloco, com conferência automática, exemplo depois da produção e teste de leitura com o colega do lado, cada um no seu posto.',
  resources: 'Computadores com navegador, projetor, caderno e caneta. Oficina responsiva local e gratuita, sem instalação, cadastro ou dependências externas, que abre o projeto.grade da aula 08. Sem impressão e sem fichas. Baixar a oficina antes do encontro permite uso sem internet.',
  observation: '19:00–22:10, com lanche 19:45–20:05. Chamada no início dos quatro blocos. Trabalho individual no posto; a colaboração acontece no teste com o colega do lado, sem circulação. Quem não tiver o projeto da aula 08 usa a página pronta que a oficina já traz. Se houver computador compartilhado, alternar o operador a cada bloco e manter uma frase por aluno. Sem internet: abrir a oficina previamente baixada. Sem computador: desenhar no caderno um retângulo de tablet com 8 colunas e um de celular com 4 e montar a página com retângulos, seguindo os mesmos critérios. O design responsivo é trabalhado de forma visual; nenhum aluno escreve código.'
};

export const support = {
  appendDefaultClosing: false,
  teacherGoal: 'Cada estudante entrega a página da Arena Pixel organizada no tablet (8 colunas) e no celular (4 colunas), com destaque e botão na primeira tela do celular, e o projeto responsivo reaberto até 22:10.',
  routine: [
    'Antes da aula, baixar a oficina responsiva em cada computador; no computador da sala, abrir um projeto.grade da aula 08, exportar um PNG, salvar projeto-responsivo.grade e reabri-lo.',
    'Manter os alunos no posto; pedir atenção antes de cada demonstração e liberar só a tela indicada.'
  ],
  onlineRoutine: 'A oficina não usa serviços externos. Uma cópia baixada do HTML abre o mesmo recurso sem internet, por duplo clique.',
  plainLanguage: 'Design responsivo é organizar o mesmo conteúdo para cada tela. A marca, os textos e os campeonatos não mudam; muda a grade, a ordem e o tamanho. No celular, o mais importante aparece antes de rolar.',
  say: 'A página que vocês montaram na aula passada só existe no computador. Hoje ela vai caber no tablet e no celular sem perder nada importante.',
  demo: [
    'Comparar as três telas projetadas e nomear o que mudou.',
    'Abrir o projeto da aula 08 na oficina responsiva e trocar de aba.',
    'Levar o cabeçalho para a largura toda no tablet.',
    'Encurtar o menu do cabeçalho no celular e conferir a primeira tela.'
  ],
  studentDeliverable: 'Pasta Aula-09: tablet.png, celular.png e projeto-responsivo.grade. Quem avançar exporta também tablet-alternativa.png ou celular-alternativa.png. No caderno, uma frase sobre a prioridade no celular. Alternativa: tablet e celular desenhados no caderno com retângulos.',
  check: [
    'Tablet e celular com todos os itens na grade, dentro da margem e sem sobreposição.',
    'Os quatro campeonatos aparecem nas três telas, com cartões da mesma largura.',
    'No celular, destaque e botão aparecem antes do fim da primeira tela.',
    'O menu do celular ficou curto e legível.',
    'Os PNGs e o projeto responsivo foram salvos e reabertos.'
  ],
  fallback: 'Abrir a cópia da oficina baixada antes da aula. Sem o projeto da aula 08, usar a página pronta da oficina. Se o computador falhar, desenhar no caderno um retângulo de tablet com 8 colunas e um de celular com 4 e montar a página com retângulos (cabeçalho, destaque, quatro cartões e botão). Os critérios são os mesmos. Não distribuir fichas.',
  extension: 'Quem terminar o celular antes das 21:33 cria uma versão alternativa: muda a ordem dos campeonatos por dia ou acrescenta um selo com forma, texto e ícone, e exporta celular-alternativa.png sem substituir celular.png.',
  commonProblems: [
    ['O aluno não tem o projeto da aula 08', 'Usar a página pronta que a oficina já traz na aba Computador. O exercício é o mesmo.'],
    ['O aluno quer esconder campeonatos no celular', 'Explicar que o cliente quer os quatro anunciados; no celular eles vêm depois do botão, não somem.'],
    ['Falta tempo', 'Priorizar o celular, que é o centro da aula. Às 21:58, parar a edição para salvar, reabrir e escrever a frase.']
  ],
  presentationSlides: [
    {
      title: 'Mapa da noite', block: 1, layout: 'dw8',
      lede: 'Uma página da Arena Pixel, três telas. Nada de conteúdo novo: só organização.',
      cards: [
        {title: 'Descobrir', text: '19:00 às 19:45 · o que muda de uma tela para outra.'},
        {title: 'Tablet', text: '20:05 às 21:00 · grade de 8 colunas.'},
        {title: 'Celular', text: '21:00 às 21:40 · grade de 4 colunas e primeira tela.'},
        {title: 'Testar', text: '21:40 às 22:10 · três telas lado a lado e teste com o colega.'}
      ],
      promptLabel: 'Pausa', prompt: 'Lanche das 19:45 às 20:05. Encerramento às 22:10.',
      teacher: {
        speech: 'A página que vocês montaram na aula passada só existe no computador. Hoje ela vai caber no tablet e no celular sem perder nada importante.',
        steps: ['3 min · Fazer chamada e apresentar o produto da noite.', '2 min · Combinar posto fixo, voz baixa e mão levantada para pedir ajuda.'],
        watch: 'Todos sabem que o trabalho é individual e que a página da aula 08 é o ponto de partida.', rescue
      }
    },
    {
      title: 'A mesma página em três telas', block: 1, layout: 'dw8',
      lede: 'Computador, tablet e celular mostram a Arena Pixel. Compare as três.',
      visual: 'tres-telas', visualAlt: ['A página da Arena Pixel no computador, no tablet e no celular'],
      promptLabel: 'Observe', prompt: 'O que mudou de lugar ou de tamanho do computador para o celular?',
      teacher: {
        speech: 'Deixe a turma nomear as mudanças antes de apresentar os termos.',
        steps: ['1 min · Observar as três telas.', '2 min · Ouvir respostas: os cartões ficaram um embaixo do outro, o menu virou a palavra Menu, o botão subiu e ficou largo.'],
        watch: 'Respostas que apontam um elemento concreto: cartão, menu, botão, destaque.', rescue
      }
    },
    {
      title: 'Cada tela tem sua grade', block: 1, layout: 'dw8',
      lede: 'As faixas cor-de-rosa voltam. A quantidade de colunas muda com a largura da tela.',
      visual: 'tres-telas-grade', visualAlt: ['As três telas com as colunas marcadas: 12 no computador, 8 no tablet e 4 no celular'],
      promptLabel: 'Desafio rápido', prompt: 'Quantas colunas tem cada tela? No tablet, quantas colunas ocupa um cartão?',
      teacher: {
        speech: 'Peça que contem do lugar, sem levantar.',
        steps: ['1 min · Mostrar as colunas e dar tempo para contar.', '1 min · Ouvir palpites.', '2 min · Conferir: 12 colunas no computador, 8 no tablet e 4 no celular. No tablet, cada cartão ocupa 4 de 8 colunas, dois por linha.'],
        watch: 'A turma relaciona tela mais estreita com menos colunas.', rescue
      }
    },
    {
      title: 'O que muda de uma tela para outra', block: 1, layout: 'dw8',
      lede: 'Quatro decisões aparecem em quase todo site que funciona bem no celular.',
      cards: [
        {title: 'Empilha', text: 'O que estava lado a lado passa a ficar um embaixo do outro.'},
        {title: 'Encurta', text: 'O menu comprido vira uma palavra curta, como Menu.'},
        {title: 'Sobe', text: 'O mais importante aparece antes de rolar a tela.'},
        {title: 'Cresce', text: 'O botão ocupa a largura toda para o dedo acertar.'}
      ],
      promptLabel: 'Resumo', prompt: 'Design responsivo é o mesmo conteúdo organizado para cada tela.',
      teacher: {
        speech: 'Volte às três telas do slide anterior para mostrar cada decisão.',
        steps: ['3 min · Ler as quatro decisões apontando cada uma nas telas.', '1 min · Pedir um exemplo de app que a turma usa em que o menu vira uma palavra ou um ícone.'],
        watch: 'Exemplos de apps de banco, loja ou rede social são bem-vindos; ninguém abre o celular.', rescue
      }
    },
    {
      title: 'Só encolher não funciona', block: 1, layout: 'dw8',
      lede: 'À esquerda, a página do computador apenas encolhida. À direita, organizada para o celular.',
      visual: 'so-encolher', visualAlt: ['A página do computador encolhida no celular, com textos minúsculos, ao lado da versão organizada para o celular'],
      promptLabel: 'Observe', prompt: 'Na versão da esquerda, dá para ler os campeonatos e tocar no botão?',
      teacher: {
        speech: 'É o que acontece quando ninguém decide a organização. Na oficina, cada tela é montada com as peças da biblioteca.',
        steps: ['1 min · Comparar as duas versões.', '2 min · Ouvir: letras pequenas demais, botão pequeno, menu cortado.'],
        watch: 'A turma percebe que encolher não é adaptar.', rescue
      }
    },
    {
      title: 'Mala pequena', block: 1, layout: 'dw8',
      lede: 'A primeira tela do celular é uma mala pequena. Nem tudo cabe antes de rolar.',
      bullets: ['Cabeçalho com a marca', 'Destaque com os dias do evento', 'Quatro cartões de campeonato', 'Botão Quero participar', 'Rodapé'],
      promptLabel: 'Pense rápido', prompt: 'Se só três itens aparecem antes de rolar, quais você escolhe?',
      teacher: {
        speech: 'O jogo é de prioridade: o que o cliente precisa que a pessoa veja primeiro?',
        steps: ['2 min · Ler a lista e ouvir escolhas.', '2 min · Conferir: cabeçalho, destaque e botão. Os campeonatos vêm logo depois, sem sumir; o rodapé fica no fim.'],
        watch: 'Escolhas justificadas pela ação principal: participar.', rescue
      }
    },
    {
      title: 'Abra a oficina responsiva', block: 1, layout: 'dw8',
      lede: 'A oficina tem três abas: Computador, Tablet e Celular.',
      cards: [
        {title: '1 · Crie a pasta', text: 'Crie uma pasta Aula-09 para guardar tudo de hoje.'},
        {title: '2 · Abra o seu projeto', text: 'Clique em Abrir projeto e escolha o projeto.grade da oficina de grade. Sem ele, use a página que já vem pronta.'},
        {title: '3 · Troque de aba', text: 'No Computador está a sua página. No Tablet e no Celular, a tela começa vazia, com a biblioteca na lateral.'}
      ],
      resources: [{href: 'modelos/design-web/aula-09/oficina.html', label: 'Abrir a oficina responsiva'}],
      promptLabel: 'Antes do lanche', prompt: 'Clique em Salvar projeto e guarde projeto-responsivo.grade na pasta Aula-09.',
      teacher: {
        speech: 'Abra a oficina pelo link e mostre Abrir projeto com um projeto.grade da aula 08. Ninguém digita número nem código.',
        steps: ['5 min · Demonstrar Abrir projeto, as três abas e Comparar as três telas.', '15 min · Cada aluno abre o próprio projeto, troca de aba e experimenta arrastar um item no tablet.', '2 min · Todos salvam projeto-responsivo.grade antes do lanche.'],
        watch: 'Quem não achar o projeto da aula 08 segue com a página pronta; ninguém fica parado procurando arquivo.', rescue
      }
    },
    {
      title: 'Intervalo', block: 1, layout: 'dw8', pace: 'break',
      lede: 'Lanche. Retome no mesmo posto às 20:05.',
      promptLabel: 'Antes de sair', prompt: 'Deixe o projeto salvo. Comida e bebida longe dos computadores.',
      teacher: {speech: 'O intervalo fica fora dos 170 minutos de atividade.', steps: ['20 min · Intervalo das 19:45 às 20:05.'], watch: 'Retomar sem reorganizar a sala.', rescue}
    },
    {
      title: 'O tablet', block: 2, layout: 'dw8',
      lede: 'Grade de 8 colunas. A tela começa vazia: as peças estão na biblioteca, na lateral.',
      cards: [
        {title: 'Biblioteca', text: 'Arraste cada componente para a tela ou clique nele.'},
        {title: 'Rascunho do cliente', text: 'Siga a ordem e o agrupamento do rascunho, acima da biblioteca.'},
        {title: 'Grade', text: 'Encaixe cada peça nas 8 colunas com Mais estreito e Mais largo.'}
      ],
      promptLabel: 'Missão individual', prompt: 'Abra a aba Tablet. Não mude textos nem cores: só posição e largura.',
      teacher: {
        speech: 'Faça a chamada e demonstre só o cabeçalho. O resto é com eles.',
        steps: ['2 min · Fazer chamada e retomar o projeto.', '3 min · Apresentar a biblioteca e o rascunho do cliente.', '3 min · Demonstrar arrastar o cabeçalho da biblioteca para a tela e conferir que ocupa as 8 colunas.'],
        watch: 'Cada aluno está na aba Tablet antes de começar.', rescue
      }
    },
    {
      title: 'Monte o tablet', block: 2, layout: 'dw8',
      lede: 'Continue na aba Tablet até a biblioteca ficar vazia e a conferência toda em ✓.',
      cards: [
        {title: '1 · Topo', text: 'Cabeçalho e destaque ocupando as 8 colunas.'},
        {title: '2 · Campeonatos', text: 'Cartões de 4 colunas, dois em cada linha, como no rascunho.'},
        {title: '3 · Botão e rodapé', text: 'Botão depois dos campeonatos e rodapé no fim da página.'}
      ],
      promptLabel: 'Pronto quando', prompt: 'Conferência em ✓. Escolha tablet.png, exporte e salve o projeto.',
      teacher: {
        speech: 'Circule o olhar pela sala sem sair da frente; atenda quem levantar a mão.',
        steps: ['30 min · Montagem individual do tablet.', '2 min · Exportar tablet.png e salvar o projeto.'],
        watch: 'O rascunho mostra ordem e agrupamento; tamanhos e espaços são decisão do aluno dentro da grade.', rescue
      }
    },
    {
      title: 'Teste do tablet', block: 2, layout: 'dw8',
      lede: 'Afaste-se um pouco da tela, sem levantar, e responda para você mesmo.',
      bullets: ['Dá para ler os campeonatos sem aproximar o rosto?', 'Os quatro cartões parecem irmãos?', 'O botão aparece logo depois dos cartões?'],
      promptLabel: 'Corrija uma coisa', prompt: 'Mudou algo? Exporte tablet.png de novo e salve o projeto.',
      teacher: {
        speech: 'O teste é visual e rápido: corrigir uma coisa e salvar.',
        steps: ['3 min · Fazer as três perguntas.', '3 min · Corrigir e exportar de novo.'],
        watch: 'O PNG exportado tem os quatro campeonatos.', rescue
      }
    },
    {
      title: 'Um tablet possível', block: 2, layout: 'dw8',
      lede: 'Uma organização possível do tablet, depois de você montar o seu.',
      visual: 'tablet-exemplo', visualAlt: ['Tablet da Arena Pixel com cabeçalho e destaque na largura toda, cartões dois a dois e botão na grade de 8 colunas'],
      promptLabel: 'Compare com o seu', prompt: 'Outra organização também vale, se passar na conferência.',
      teacher: {
        speech: 'Mostre o exemplo só depois que a turma montou o próprio tablet.',
        steps: ['2 min · Mostrar o exemplo.', '7 min · Cada aluno compara, ajusta um detalhe e salva; quem terminou personaliza o tablet e exporta tablet-alternativa.png.'],
        watch: 'O exemplo é uma solução possível, não a única resposta.', rescue
      }
    },
    {
      title: 'O celular', block: 3, layout: 'dw8',
      lede: 'Grade de 4 colunas e sem rascunho: siga as regras ao lado da tela. A linha tracejada marca o fim da primeira tela.',
      cards: [
        {title: 'Empilhe', text: 'Tudo ocupa as 4 colunas, um item embaixo do outro.'},
        {title: 'Encurte', text: 'No cabeçalho, troque o menu comprido por Menu.'},
        {title: 'Priorize', text: 'Destaque e botão antes da linha tracejada.'}
      ],
      promptLabel: 'Missão individual', prompt: 'Abra a aba Celular. A ordem decide o que aparece primeiro.',
      teacher: {
        speech: 'Faça a chamada e demonstre só a troca do menu no painel Personalizar item.',
        steps: ['2 min · Fazer chamada.', '3 min · Apresentar as três decisões do celular.', '3 min · Selecionar o cabeçalho e trocar o subtítulo por Menu em Personalizar item.'],
        watch: 'A troca do menu é edição de texto no painel, não código.', rescue
      }
    },
    {
      title: 'Monte o celular', block: 3, layout: 'dw8',
      lede: 'Siga a ordem da mala pequena.',
      cards: [
        {title: '1 · Topo', text: 'Cabeçalho com Menu, na largura toda.'},
        {title: '2 · Primeira tela', text: 'Destaque e botão antes da linha tracejada.'},
        {title: '3 · Depois de rolar', text: 'Os quatro campeonatos, um embaixo do outro, e o rodapé no fim.'}
      ],
      promptLabel: 'Pronto quando', prompt: 'Conferência em ✓. Escolha celular.png, exporte e salve o projeto.',
      teacher: {
        speech: 'Lembre que os campeonatos não somem: vêm depois do botão.',
        steps: ['25 min · Montagem individual do celular, com exportação de celular.png e salvamento.'],
        watch: 'Quem terminar antes das 21:33 cria celular-alternativa.png, com outra ordem dos campeonatos ou um selo, sem substituir celular.png.', rescue
      }
    },
    {
      title: 'Um celular possível', block: 3, layout: 'dw8',
      lede: 'Uma organização possível do celular, depois de você montar o seu.',
      visual: 'celular-exemplo', visualAlt: ['Celular da Arena Pixel com menu curto, destaque e botão antes do fim da primeira tela e os quatro campeonatos empilhados'],
      promptLabel: 'Compare com o seu', prompt: 'O seu botão aparece sem rolar a tela?',
      teacher: {
        speech: 'Mostre o exemplo e peça que cada um confira a linha tracejada na própria tela.',
        steps: ['2 min · Mostrar o exemplo.', '5 min · Cada aluno confere a primeira tela, corrige e exporta celular.png de novo.'],
        watch: 'Destaque e botão acima da linha é a regra; o resto da ordem é decisão do aluno.', rescue
      }
    },
    {
      title: 'Três telas, uma marca', block: 4, layout: 'dw8',
      lede: 'Clique em Comparar as três telas na oficina.',
      bullets: ['Os textos, as cores e os campeonatos são os mesmos nas três telas?', 'O que mudou foi só a organização?', 'Alguma tela ficou com letras pequenas demais?'],
      promptLabel: 'Olhe as três juntas', prompt: 'Corrija o que parecer de outra marca e exporte de novo.',
      teacher: {
        speech: 'Faça a chamada. A comparação é individual, na própria tela.',
        steps: ['2 min · Fazer chamada.', '6 min · Cada aluno compara as três telas e corrige um detalhe.'],
        watch: 'Mesma identidade nas três telas; se alguém personalizou uma, repete nas outras.', rescue
      }
    },
    {
      title: 'O colega encontra em cinco segundos?', block: 4, layout: 'dw8',
      lede: 'Mostre a aba Celular sem explicar. O colega do lado responde do próprio lugar.',
      cards: [
        {title: '1 · Mostre e pergunte', text: 'Cinco segundos para olhar. Qual é o evento? Onde se toca para participar?'},
        {title: '2 · Ouça a evidência', text: 'Peça que aponte o que ficou difícil de encontrar. Depois troquem os papéis.'},
        {title: '3 · Melhore uma coisa', text: 'Ajuste ordem, tamanho ou espaço e exporte celular.png de novo.'}
      ],
      promptLabel: 'Conclua com uma decisão', prompt: '“Mudei ___ porque meu colega não encontrou ___.” Às 21:58, pare a edição.',
      teacher: {
        speech: 'A conversa é breve, com o colega do lado, sem circulação. Avaliar se encontrou, não se gostou.',
        steps: ['10 min · Teste em duplas vizinhas, troca de papéis e ajuste.'],
        watch: 'A pergunta é sobre encontrar a informação e a ação, não sobre gosto.', rescue
      }
    },
    {
      title: 'Salve e reabra', block: 4, layout: 'dw8',
      lede: '21:58: pare a edição. Agora é hora de salvar e conferir os arquivos.',
      cards: [
        {title: '1 · Imagens', text: 'tablet.png e celular.png; as alternativas, se você fez.'},
        {title: '2 · Projeto', text: 'Salvar projeto → projeto-responsivo.grade.'},
        {title: '3 · Teste', text: 'Abra um PNG. Depois use Abrir projeto e confira as três abas.'}
      ],
      promptLabel: 'Pasta Aula-09', prompt: 'Confira tablet.png, celular.png e projeto-responsivo.grade na pasta Aula-09.',
      teacher: {
        speech: 'O navegador pode colocar números nos nomes repetidos. Guarde a versão mais recente.',
        steps: ['4 min · Às 21:58, parar a edição, exportar o que faltar e salvar o projeto.', '3 min · Abrir um PNG, reabrir o projeto e conferir as três abas.'],
        watch: 'PNG é só imagem: sem o projeto não dá para continuar depois.', rescue
      }
    },
    {
      title: 'Uma frase de designer', block: 4, layout: 'dw8',
      lede: 'No caderno, complete a frase com uma decisão que você tomou hoje.',
      bullets: ['Exemplo: “No celular, coloquei o botão antes dos campeonatos porque é a ação que o cliente quer.”', 'Pasta salva e posto organizado antes de sair.'],
      promptLabel: 'Sua frase', prompt: '“No celular, coloquei ___ primeiro porque ___.”',
      teacher: {
        speech: 'Ouça duas frases e feche retomando grade por tela, prioridade e primeira tela.',
        steps: ['2 min · Escrever a frase no caderno.', '2 min · Ouvir duas respostas.', '1 min · Organizar os postos e encerrar às 22:10.'],
        watch: 'Sem apresentações longas no encerramento.', rescue
      }
    }
  ]
};
