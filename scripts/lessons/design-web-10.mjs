// Aula 10 de Design Web: slides, horários e notas. Regenerar com: node scripts/build-design-web-10.mjs
const rescue = 'Se alguém travar, demonstrar um único movimento e devolver o controle ao aluno no posto.';
const site = 'https://oficinas-design-web.vercel.app/aula-10/';

export const lesson = {
  title: 'Do Protótipo ao Link',
  description: 'A página da Arena Pixel sai da pasta e ganha um endereço. Cada estudante revisa a própria página antes de ela ir para o público, caça problemas numa versão publicada de verdade, no computador e no celular, e mostra o resultado aos colegas.',
  objectives: [
    'Internet: hospedagem e publicação.',
    'Desenvolvimento do Projeto: publicação e testes de validação.'
  ],
  technical: [
    'Aplicar a publicação de website para visualização online de projeto de web.',
    'Aplicar testes de usabilidade e funcionalidade dos projetos.'
  ],
  socioemotional: [
    'Demonstrar comportamento íntegro, transparente e responsável, nas relações interpessoais e no desenvolvimento das atividades sob sua responsabilidade.'
  ],
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Diferenciar arquivo, protótipo e link. Entender endereço, hospedagem e publicação abrindo no celular um link publicado. Jogo "Pode ir para o link?" sobre dados pessoais e imagens, as seis conferências antes de publicar e abertura do projeto responsivo na oficina. Salvar antes do lanche.'
    },
    {
      horario: '20:05 - 21:00',
      atividade: 'Revisar individualmente a própria página da Arena Pixel nas três telas com as seis conferências: nomes, escrita, dados, imagens, botões e celular. Ajustar rodapé e créditos, pedir o olhar do colega do lado e exportar computador.png, tablet.png e celular.png.'
    },
    {
      horario: '21:00 - 21:40',
      atividade: 'Abrir no computador e no celular uma versão de teste da Arena Pixel publicada de verdade e caçar os cinco problemas escondidos. Decidir qual corrigir primeiro e comparar com a versão corrigida.'
    },
    {
      horario: '21:40 - 22:10',
      atividade: 'Planejar o endereço, o título e a descrição do link da própria página. Mostra das telas com o colega do lado (uma qualidade e uma melhoria), salvar e reabrir o projeto e escrever uma frase sobre o que conferir antes de publicar. Encerrar às 22:10.'
    }
  ],
  methodology: 'Comparação projetada entre arquivo, protótipo e link, jogo rápido de decisão sobre o que pode ser público, revisão individual na oficina responsiva com seis conferências, teste de funcionamento de uma página publicada no computador e no celular e mostra com retorno respeitoso do colega do lado, cada um no seu posto.',
  resources: 'Computadores com navegador, projetor, celulares dos alunos, caderno e caneta. Oficina responsiva local e gratuita, que abre o projeto-responsivo.grade da aula 09. Página de teste e página corrigida da Arena Pixel publicadas no site das oficinas. Sem impressão e sem fichas.',
  observation: '19:00–22:10, com lanche 19:45–20:05. Chamada no início dos quatro blocos. Trabalho individual no posto; a colaboração acontece com o colega do lado, sem circulação. Quem não tiver o projeto da aula 09 usa a página pronta que a oficina já traz. Sem celular: abrir o link no computador e estreitar a janela, ou olhar o celular do colega do lado. Sem internet: abrir a página de teste copiada antes no computador da sala. A publicação é apresentada de forma visual; nenhum aluno escreve código nem cria conta em serviço externo.'
};

export const support = {
  appendDefaultClosing: false,
  teacherGoal: 'Cada estudante entrega a página da Arena Pixel revisada nas três telas, sem dado pessoal e sem erro de escrita, encontra os cinco problemas da página de teste publicada e anota endereço, título e descrição para o link da própria página até 22:10.',
  routine: [
    'Antes da aula, abrir no celular e no computador da sala ' + site + ' e ' + site + 'corrigida/ para confirmar que estão no ar.',
    'Manter os alunos no posto; pedir atenção antes de cada demonstração e liberar só a tarefa indicada.'
  ],
  onlineRoutine: 'A página de teste e a corrigida estão publicadas no site das oficinas. Sem internet, abrir as cópias da pasta modelos/design-web/aula-10 no computador da sala e projetar.',
  plainLanguage: 'Publicar é copiar a página pronta para a hospedagem, um computador sempre ligado, e ganhar um endereço que qualquer pessoa abre. Antes disso, tudo o que está na página precisa poder ser público.',
  say: 'Até agora a Arena Pixel só existia na pasta de vocês. Hoje vamos ver o que muda quando ela ganha um endereço que qualquer pessoa abre.',
  demo: [
    'Abrir o site das oficinas no celular e no computador: mesmo endereço, duas telas.',
    'Abrir o projeto responsivo e trocar um texto em Personalizar item.',
    'Abrir a página de teste e tocar no botão Quero participar.'
  ],
  studentDeliverable: 'Pasta Aula-10: computador.png, tablet.png, celular.png e projeto-responsivo.grade revisados. No caderno: os cinco problemas da página de teste, endereço, título e descrição do link e uma frase sobre o que conferir antes de publicar.',
  check: [
    'Nenhum telefone, e-mail ou nome de pessoa real na página.',
    'Textos sem erro de escrita nas três telas.',
    'Rodapé avisa que a empresa é fictícia; imagens são próprias ou têm crédito.',
    'No celular, destaque e botão na primeira tela e nada espremido.',
    'Os cinco problemas da página de teste anotados no caderno.'
  ],
  fallback: 'Sem internet, abrir as cópias da página de teste e da corrigida no computador da sala e projetar; a caça acontece na tela projetada, com respostas no caderno. Sem o projeto da aula 09, revisar a página pronta da oficina. Não distribuir fichas.',
  extension: 'Quem terminar antes das 21:30 faz um desafio extra no caderno: a página de "não encontrada" da Arena Pixel ou a prévia do link para mensagens.',
  commonProblems: [
    ['O aluno não tem o projeto da aula 09', 'Usar a página pronta que a oficina já traz. A revisão é a mesma.'],
    ['A página de teste não abre no celular', 'Conferir o endereço digitado, sem espaço e sem www. Se a rede da escola bloquear, usar a tela projetada.'],
    ['O aluno acha que um número inventado pode ficar', 'Mesmo fictício, telefone com nome de pessoa ensina o hábito errado. Na página, contato é da empresa.'],
    ['Falta tempo', 'Priorizar a caça aos problemas e a revisão do celular. Às 22:00, parar a edição para salvar e escrever a frase.']
  ],
  presentationSlides: [
    {
      title: 'Mapa da noite', block: 1, layout: 'dw8',
      lede: 'A Arena Pixel sai da pasta e ganha um endereço. Antes, ela passa por uma revisão.',
      cards: [
        {title: 'Descobrir', text: '19:00 às 19:45 · arquivo, protótipo e link.'},
        {title: 'Revisar', text: '20:05 às 21:00 · sua página pronta para o público.'},
        {title: 'Testar', text: '21:00 às 21:40 · um link de verdade, no computador e no celular.'},
        {title: 'Mostrar', text: '21:40 às 22:10 · mostra das telas e pasta final.'}
      ],
      promptLabel: 'Pausa', prompt: 'Lanche das 19:45 às 20:05. Encerramento às 22:10.',
      teacher: {
        speech: 'Até agora a Arena Pixel só existia na pasta de vocês. Hoje vamos ver o que muda quando ela ganha um endereço que qualquer pessoa abre.',
        steps: ['3 min · Fazer chamada e apresentar o produto da noite.', '2 min · Combinar posto fixo, voz baixa e mão levantada para pedir ajuda. Celular liberado só quando o slide pedir.'],
        watch: 'Todos sabem que o trabalho é individual e que a página da semana passada é o ponto de partida.', rescue
      }
    },
    {
      title: 'Arquivo, protótipo ou link?', block: 1, layout: 'dw8',
      lede: 'A mesma página pode estar em três situações diferentes.',
      cards: [
        {title: 'Arquivo', text: 'Fica na sua pasta. Só abre quem tem a pasta.'},
        {title: 'Protótipo', text: 'Uma simulação para testar com poucas pessoas. Ainda não é o site.'},
        {title: 'Link', text: 'Um endereço público. Qualquer pessoa abre, em qualquer tela.'}
      ],
      promptLabel: 'Desafio rápido', prompt: 'O celular.png da sua pasta é arquivo, protótipo ou link? E a oficina que você abre pelo navegador?',
      teacher: {
        speech: 'Deixe a turma classificar antes de responder.',
        steps: ['2 min · Ler os três cartões.', '2 min · Ouvir palpites.', '4 min · Conferir: celular.png é arquivo, só abre quem tem a pasta. O projeto aberto na oficina para testar com o colega é protótipo. A oficina em oficinas-design-web.vercel.app é link: abre em qualquer computador ou celular.'],
        watch: 'A turma percebe que a diferença é quem consegue ver.', rescue
      }
    },
    {
      title: 'Um endereço para todo mundo', block: 1, layout: 'dw8',
      lede: 'Três palavras explicam como uma página chega ao celular de qualquer pessoa.',
      cards: [
        {title: 'Endereço', text: 'O nome que a pessoa digita ou toca para chegar à página.'},
        {title: 'Hospedagem', text: 'Um computador sempre ligado que guarda a página e entrega a quem pede.'},
        {title: 'Publicação', text: 'Copiar a página pronta para a hospedagem. A partir daí, ela tem endereço.'}
      ],
      promptLabel: 'Experimente', prompt: 'No celular, digite oficinas-design-web.vercel.app. É o mesmo endereço que abre no computador.',
      teacher: {
        speech: 'As oficinas que eles usam estão publicadas assim: uma pasta copiada para a hospedagem ganhou esse endereço.',
        steps: ['3 min · Explicar as três palavras com o site das oficinas como exemplo.', '5 min · Cada aluno abre o endereço no celular e compara com o computador.'],
        watch: 'Quem não tiver celular olha o do colega do lado ou estreita a janela do navegador.', rescue
      }
    },
    {
      title: 'Pode ir para o link?', block: 1, layout: 'dw8',
      lede: 'Depois de publicado, qualquer pessoa vê, copia e guarda. Decida cada item.',
      bullets: ['O nome fictício Arena Pixel', 'O endereço inventado Rua das Flores, 120', 'O telefone particular de um colega', 'Uma foto de um colega, sem pedir', 'Uma imagem baixada sem saber de quem é', 'Seu e-mail pessoal no rodapé'],
      promptLabel: 'Pense rápido', prompt: 'Sim ou não? Levante a mão para cada item.',
      teacher: {
        speech: 'O jogo é de responsabilidade: o que vai para o link sai do controle de quem publicou.',
        steps: ['2 min · Ler a lista.', '6 min · Votar item por item.', '2 min · Conferir: nome e endereço fictícios podem. Telefone de colega, foto sem permissão e e-mail pessoal não: expõem pessoas reais. Imagem sem dono conhecido também não: só com permissão e crédito.'],
        watch: 'Respostas justificadas por exposição de pessoas e por autoria das imagens.', rescue
      }
    },
    {
      title: 'Antes de publicar', block: 1, layout: 'dw8',
      lede: 'Seis conferências antes de qualquer página ganhar endereço.',
      cards: [
        {title: 'Nomes', text: 'Empresa fictícia ou com autorização.'},
        {title: 'Escrita', text: 'Nenhum erro nos textos.'},
        {title: 'Dados', text: 'Nenhum telefone, e-mail ou nome de pessoa real.'},
        {title: 'Imagens', text: 'Próprias ou com crédito de quem fez.'},
        {title: 'Botões', text: 'Cada botão leva a algum lugar.'},
        {title: 'Celular', text: 'Tudo legível, nada espremido.'}
      ],
      promptLabel: 'Guarde', prompt: 'Essas seis conferências guiam o resto da noite.',
      teacher: {
        speech: 'Leia apontando cada uma; elas voltam na revisão e na caça aos problemas.',
        steps: ['4 min · Ler as seis conferências com um exemplo de cada.'],
        watch: 'A turma relaciona cada conferência ao jogo anterior.', rescue
      }
    },
    {
      title: 'Abra o seu projeto', block: 1, layout: 'dw8',
      lede: 'A revisão acontece na oficina responsiva, nas três abas.',
      cards: [
        {title: '1 · Crie a pasta', text: 'Crie uma pasta Aula-10 para guardar tudo de hoje.'},
        {title: '2 · Abra o projeto', text: 'Clique em Abrir projeto e escolha projeto-responsivo.grade. Sem ele, use a página que já vem pronta.'},
        {title: '3 · Olhe as três telas', text: 'Clique em Comparar as três telas e veja a página inteira.'}
      ],
      resources: [{href: 'modelos/design-web/aula-09/oficina.html', label: 'Abrir a oficina responsiva'}],
      promptLabel: 'Antes do lanche', prompt: 'Clique em Salvar projeto e guarde projeto-responsivo.grade na pasta Aula-10.',
      teacher: {
        speech: 'Abra a oficina pelo link e mostre Abrir projeto. A revisão começa depois do lanche.',
        steps: ['3 min · Demonstrar Abrir projeto e Comparar as três telas.', '6 min · Cada aluno abre o próprio projeto.', '1 min · Todos salvam antes do lanche.'],
        watch: 'Quem não achar o projeto segue com a página pronta; ninguém fica parado procurando arquivo.', rescue
      }
    },
    {
      title: 'Intervalo', block: 1, layout: 'dw8', pace: 'break',
      lede: 'Lanche. Retome no mesmo posto às 20:05.',
      promptLabel: 'Antes de sair', prompt: 'Deixe o projeto salvo. Comida e bebida longe dos computadores.',
      teacher: {speech: 'O intervalo fica fora dos 170 minutos de atividade.', steps: ['20 min · Intervalo das 19:45 às 20:05.'], watch: 'Retomar sem reorganizar a sala.', rescue}
    },
    {
      title: 'Revisor da própria página', block: 2, layout: 'dw8',
      lede: 'Antes de alguém ver, você vê. Leia sua página como se fosse um cliente.',
      cards: [
        {title: '1 · Escrita', text: 'Leia cada texto devagar, palavra por palavra.'},
        {title: '2 · Dados', text: 'Procure telefone, e-mail ou nome de pessoa real.'},
        {title: '3 · Celular', text: 'Botão na primeira tela e nada espremido.'}
      ],
      promptLabel: 'Missão individual', prompt: 'Use as seis conferências nas três abas: Computador, Tablet e Celular.',
      teacher: {
        speech: 'Faça a chamada e demonstre só a troca de um texto em Personalizar item.',
        steps: ['2 min · Fazer chamada.', '3 min · Retomar o projeto aberto antes do lanche.', '3 min · Demonstrar a correção de um texto em Personalizar item.'],
        watch: 'Corrigir texto é edição no painel, não código.', rescue
      }
    },
    {
      title: 'Revise as três telas', block: 2, layout: 'dw8',
      lede: 'Uma aba de cada vez. Corrija, confira e exporte.',
      cards: [
        {title: 'Computador', text: 'Corrija e exporte computador.png.'},
        {title: 'Tablet', text: 'Corrija e exporte tablet.png.'},
        {title: 'Celular', text: 'Corrija e exporte celular.png.'}
      ],
      promptLabel: 'Pronto quando', prompt: 'Seis conferências feitas e conferência da oficina em ✓ nas três abas. Salve o projeto.',
      teacher: {
        speech: 'Circule o olhar pela sala sem sair da frente; atenda quem levantar a mão.',
        steps: ['22 min · Revisão individual das três telas.', '3 min · Exportar os três PNGs e salvar o projeto.'],
        watch: 'Mudanças pequenas e certeiras; não é hora de redesenhar a página.', rescue
      }
    },
    {
      title: 'Rodapé honesto', block: 2, layout: 'dw8',
      lede: 'O rodapé conta quem fez a página e como falar com a empresa.',
      cards: [
        {title: 'Aviso', text: '“Empresa e conteúdo fictícios, para estudo.”'},
        {title: 'Contato', text: 'Contato da empresa, nunca o telefone de uma pessoa.'},
        {title: 'Crédito', text: 'Se usou imagem, um Texto pequeno: “Imagem: nome de quem fez”.'}
      ],
      promptLabel: 'Confira nas três telas', prompt: 'Rodapé e créditos iguais no Computador, no Tablet e no Celular.',
      teacher: {
        speech: 'Crédito é sinal de respeito a quem fez a imagem; aviso de ficção evita que alguém procure a Arena Pixel de verdade.',
        steps: ['2 min · Ler os três cartões.', '8 min · Ajustar rodapé e créditos nas três telas e exportar de novo o que mudou.'],
        watch: 'Quem não usou imagem só confere o aviso no rodapé.', rescue
      }
    },
    {
      title: 'Olho de revisor', block: 2, layout: 'dw8',
      lede: 'Quem fez a página não vê os próprios erros. Peça ajuda ao colega do lado.',
      cards: [
        {title: '1 · Mostre', text: 'Vire a tela para o colega do lado, na aba Celular, sem levantar.'},
        {title: '2 · Ele procura', text: 'Um erro de escrita, um dado pessoal e um item espremido.'},
        {title: '3 · Corrija', text: 'Ajuste o que ele achou e exporte de novo. Depois troquem.'}
      ],
      promptLabel: 'Combinado', prompt: 'Avalie a página, não a pessoa.',
      teacher: {
        speech: 'A conversa é breve, com o colega do lado, sem circulação.',
        steps: ['10 min · Revisão em duplas vizinhas, com troca de papéis.', '2 min · Exportar o que mudou e salvar o projeto.'],
        watch: 'Comentários apontam um lugar da tela, não um gosto pessoal.', rescue
      }
    },
    {
      title: 'A Arena Pixel está no ar', block: 3, layout: 'dw8',
      lede: 'Uma versão de teste da página foi publicada de verdade. Abra no computador e no celular.',
      resources: [{href: site, label: 'Abrir a página de teste'}],
      promptLabel: 'No celular, digite', prompt: 'oficinas-design-web.vercel.app/aula-10',
      teacher: {
        speech: 'Faça a chamada. Avise que alguém publicou essa versão sem conferir nada.',
        steps: ['2 min · Fazer chamada.', '6 min · Cada aluno abre a página no computador e no celular.'],
        watch: 'Todos com a página aberta nas duas telas antes da caça começar.', rescue
      }
    },
    {
      title: 'Caça aos cinco problemas', block: 3, layout: 'dw8',
      lede: 'Alguém publicou sem fazer as seis conferências. Há cinco problemas escondidos.',
      cards: [
        {title: 'Leia', text: 'Todos os textos, do cabeçalho ao rodapé.'},
        {title: 'Toque', text: 'No menu e no botão. Para onde eles levam?'},
        {title: 'Compare', text: 'A mesma página no computador e no celular.'}
      ],
      promptLabel: 'Missão individual', prompt: 'Anote no caderno cada problema e onde ele está.',
      teacher: {
        speech: 'Não entregue respostas durante a caça; só confirme se o aluno está no lugar certo.',
        steps: ['12 min · Caça individual, com anotação no caderno.', '5 min · Conferir: 1) “Xadres rápido” escrito errado; 2) telefone particular do Rafael no rodapé; 3) Quero participar leva a uma página não encontrada; 4) imagem do destaque não carrega; 5) no celular, os quatro cartões ficam lado a lado, espremidos e cortados.'],
        watch: 'Quem achar os cinco cedo procura mais um detalhe que poderia melhorar.', rescue
      }
    },
    {
      title: 'Qual corrigir primeiro?', block: 3, layout: 'dw8',
      lede: 'Alguns problemas incomodam. Outros causam dano a alguém.',
      promptLabel: 'Pense rápido', prompt: 'Dos cinco, qual você corrigiria primeiro? Por quê?',
      teacher: {
        speech: 'Conduza para a ideia de dano: dado pessoal publicado pode ser copiado antes de ser apagado.',
        steps: ['2 min · Ouvir escolhas.', '5 min · Conferir: primeiro o telefone particular, que expõe uma pessoa e pode ser copiado antes de sair do ar. Depois o botão quebrado, que impede a ação principal. Imagem, celular e escrita vêm em seguida.'],
        watch: 'Justificativas que falam de pessoas e da ação principal da página.', rescue
      }
    },
    {
      title: 'A versão corrigida', block: 3, layout: 'dw8',
      lede: 'Mesma página, mesmo conteúdo, seis conferências feitas.',
      resources: [{href: site + 'corrigida/', label: 'Abrir a versão corrigida'}],
      promptLabel: 'Compare no celular', prompt: 'oficinas-design-web.vercel.app/aula-10/corrigida. O que mudou?',
      teacher: {
        speech: 'Peça que comparem as duas versões no celular, lado a lado com o colega se precisar.',
        steps: ['2 min · Abrir a versão corrigida.', '6 min · Comparar e marcar no caderno os cinco problemas resolvidos.'],
        watch: 'A turma reconhece as decisões da semana passada: menu curto, botão largo logo depois do destaque e cartões empilhados.', rescue
      }
    },
    {
      title: 'Desafio extra · Página de “não encontrada”', block: 3, layout: 'dw8', pace: 'extra',
      lede: 'Toda página publicada um dia recebe alguém num endereço errado.',
      cards: [
        {title: 'Mensagem', text: 'Uma frase simpática no tom da Arena Pixel.'},
        {title: 'Saída', text: 'Um botão que leva de volta aos campeonatos.'},
        {title: 'Marca', text: 'Mesmas cores e mesmo cabeçalho da página.'}
      ],
      promptLabel: 'No caderno', prompt: 'Desenhe a tela do celular com retângulos e escreva a mensagem.',
      teacher: {
        speech: 'Desafio opcional para quem terminou antes. Quem ainda está revisando continua revisando.',
        steps: ['10 min · Rascunhar a tela no caderno.'],
        watch: 'A mensagem não culpa o visitante e sempre oferece um caminho de volta.', rescue
      }
    },
    {
      title: 'Desafio extra · Prévia do link', block: 3, layout: 'dw8', pace: 'extra',
      lede: 'Quando alguém manda um link por mensagem, aparece um cartão com imagem, título e descrição.',
      cards: [
        {title: 'Imagem', text: 'Qual PNG da sua pasta mostra melhor a Arena Pixel?'},
        {title: 'Título', text: 'Até seis palavras.'},
        {title: 'Descrição', text: 'Uma frase com o quê, quando e quanto custa.'}
      ],
      promptLabel: 'No caderno', prompt: 'Desenhe o cartão como ele apareceria numa conversa.',
      teacher: {
        speech: 'É o primeiro contato de muita gente com a página; vale caprichar.',
        steps: ['10 min · Rascunhar a prévia no caderno.'],
        watch: 'Título curto e descrição que cabe em duas linhas.', rescue
      }
    },
    {
      title: 'Endereço, título e descrição', block: 4, layout: 'dw8',
      lede: 'Se a sua página fosse publicada hoje, como seria o link dela?',
      cards: [
        {title: 'Endereço', text: 'Minúsculas, sem acento, sem espaço, palavras ligadas por hífen: arena-pixel-campeonatos.'},
        {title: 'Título', text: 'Até seis palavras, com o nome da empresa.'},
        {title: 'Descrição', text: 'Uma frase com o quê, quando e quanto custa.'}
      ],
      promptLabel: 'No caderno', prompt: 'Escreva o endereço, o título e a descrição da sua página.',
      teacher: {
        speech: 'Faça a chamada. Endereço curto é fácil de falar em voz alta e de digitar no celular.',
        steps: ['2 min · Fazer chamada e ler os três cartões.', '6 min · Cada aluno escreve os três itens no caderno.'],
        watch: 'Endereços sem acento e sem espaço; títulos com a marca.', rescue
      }
    },
    {
      title: 'Mostra das telas', block: 4, layout: 'dw8',
      lede: 'Deixe a aba Celular aberta. O colega do lado olha sua página como visitante.',
      cards: [
        {title: '1 · Uma qualidade', text: 'O que está claro, bonito ou fácil de encontrar.'},
        {title: '2 · Uma melhoria', text: 'Uma mudança possível, apontando o lugar na tela.'},
        {title: '3 · Troquem', text: 'Depois é a sua vez de olhar a página do colega.'}
      ],
      promptLabel: 'Com respeito', prompt: '“Gostei de ___. Eu mudaria ___.”',
      teacher: {
        speech: 'Avaliar a página, não a pessoa. A conversa é com o colega do lado, sem circulação.',
        steps: ['10 min · Mostra em duplas vizinhas, com troca de papéis.', '2 min · Ouvir duas qualidades em voz alta.'],
        watch: 'Melhorias formuladas como sugestão, apontando um lugar da tela.', rescue
      }
    },
    {
      title: 'Salve e reabra', block: 4, layout: 'dw8',
      lede: '22:00: pare a edição. Agora é hora de conferir os arquivos.',
      cards: [
        {title: '1 · Imagens', text: 'computador.png, tablet.png e celular.png revisados.'},
        {title: '2 · Projeto', text: 'Salvar projeto → projeto-responsivo.grade.'},
        {title: '3 · Teste', text: 'Abra um PNG. Depois use Abrir projeto e confira as três abas.'}
      ],
      promptLabel: 'Pasta Aula-10', prompt: 'Confira os três PNGs e projeto-responsivo.grade na pasta Aula-10.',
      teacher: {
        speech: 'O navegador pode colocar números nos nomes repetidos. Guarde a versão mais recente.',
        steps: ['5 min · Às 22:00, parar a edição, salvar, reabrir e conferir a pasta.'],
        watch: 'PNG é só imagem: sem o projeto não dá para continuar depois.', rescue
      }
    },
    {
      title: 'Uma frase de designer', block: 4, layout: 'dw8',
      lede: 'No caderno, complete a frase com o que você aprendeu hoje.',
      bullets: ['Exemplo: “Antes de publicar, eu confiro os dados porque o que vai para o link qualquer pessoa copia.”', 'Pasta salva e posto organizado antes de sair.'],
      promptLabel: 'Sua frase', prompt: '“Antes de publicar, eu confiro ___ porque ___.”',
      teacher: {
        speech: 'Ouça duas frases e feche retomando arquivo, protótipo, link e as seis conferências.',
        steps: ['2 min · Escrever a frase no caderno.', '2 min · Ouvir duas respostas.', '1 min · Organizar os postos e encerrar às 22:10.'],
        watch: 'Sem apresentações longas no encerramento.', rescue
      }
    }
  ]
};
