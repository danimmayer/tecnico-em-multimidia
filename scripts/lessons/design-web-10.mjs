// Aula 10 de Design Web: slides, horários e notas. Regenerar com: node scripts/build-design-web-10.mjs
const rescue = 'Se alguém travar, demonstrar um único movimento e devolver o controle ao aluno no posto.';
const site = 'https://oficinas-design-web.vercel.app/aula-10/';

export const lesson = {
  title: 'Do Protótipo ao Link',
  description: 'A página da Arena Pixel sai da pasta e ganha um endereço. Cada estudante caça problemas numa versão publicada de verdade, atende ao recado do cliente nas três telas da própria página e cria o post que anuncia o site no ar.',
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
      atividade: 'Diferenciar arquivo, protótipo e link com a imagem do cartaz na mochila e no mural. Abrir no celular uma página da Arena Pixel publicada sem conferência e caçar cinco problemas, ligando cada um a uma das seis conferências antes de publicar. Abrir o projeto responsivo e salvar antes do lanche.'
    },
    {
      horario: '20:05 - 21:00',
      atividade: 'Atender ao recado do cliente com as seis conferências: corrigir o aviso com erro de escrita, trocar o telefone particular por um contato da empresa e substituir a foto sem autorização por um ícone, nas três telas. Ajustar o rodapé, pedir o olhar do colega do lado e exportar computador.png, tablet.png e celular.png.'
    },
    {
      horario: '21:00 - 21:40',
      atividade: 'Comparar a página de teste com a versão corrigida, escolher o endereço do site e criar na oficina de grade o post quadrado que anuncia o site no ar, com destaque, endereço, botão e a mesma identidade da página. Testar se o colega lê o endereço e exportar post-final.png.'
    },
    {
      horario: '21:40 - 22:10',
      atividade: 'Mostra do kit de lançamento com o colega do lado (celular.png e post-final.png): uma qualidade e uma melhoria. Aplicar a melhoria, salvar e reabrir os dois projetos e escrever uma frase sobre o que conferir antes de publicar. Encerrar às 22:10.'
    }
  ],
  methodology: 'Descoberta pela caça a problemas numa página publicada, no computador e no celular; produção individual em duas oficinas (recado do cliente nas três telas e post de lançamento), com conferência pelas seis regras antes de publicar e mostra com retorno respeitoso do colega do lado, cada um no seu posto.',
  resources: 'Computadores com navegador, projetor, celulares dos alunos, caderno e caneta. Oficina responsiva, que abre o projeto-responsivo.grade da aula 09, e oficina de grade, que abre o projeto.grade da aula 08. Página de teste e página corrigida da Arena Pixel publicadas no site das oficinas. Sem impressão e sem fichas.',
  observation: '19:00–22:10, com lanche 19:45–20:05. Chamada no início dos quatro blocos. Trabalho individual no posto; a colaboração acontece com o colega do lado, sem circulação. Quem não tiver o projeto da aula 09 usa a página pronta que a oficina já traz. Sem celular: abrir o link no computador e estreitar a janela, ou olhar o celular do colega do lado. Sem internet: abrir a página de teste copiada antes no computador da sala. A publicação é apresentada de forma visual; nenhum aluno escreve código nem cria conta em serviço externo.'
};

export const support = {
  appendDefaultClosing: false,
  teacherGoal: 'Cada estudante entrega o kit de lançamento da Arena Pixel até 22:10: a página com o recado do cliente nas três telas, sem dado pessoal e sem erro de escrita, os cinco problemas da página de teste no caderno e o post que anuncia o site no ar com o endereço escolhido.',
  routine: [
    'Antes da aula, abrir no celular e no computador da sala ' + site + ', a página de entrada da noite, e conferir os três cartões: oficina responsiva, página de teste e versão corrigida.',
    'Manter os alunos no posto; pedir atenção antes de cada demonstração e liberar só a tarefa indicada.'
  ],
  onlineRoutine: 'A página de teste e a corrigida estão publicadas no site das oficinas. Sem internet, abrir as cópias da pasta modelos/design-web/aula-10 no computador da sala e projetar.',
  plainLanguage: 'Publicar é como tirar um cartaz da mochila e pregar num mural da cidade. A hospedagem é o mural, um computador sempre ligado; o endereço diz onde ele fica. Depois de pregado, qualquer pessoa vê e copia, então tudo o que está na página precisa poder ser público.',
  say: 'Até agora a Arena Pixel só existia na pasta de vocês. Hoje vamos ver o que muda quando ela ganha um endereço que qualquer pessoa abre.',
  demo: [
    'Abrir o site das oficinas no celular e no computador: mesmo endereço, duas telas.',
    'Abrir o projeto responsivo, adicionar um Texto e trocar o texto do rodapé em Personalizar item.',
    'Abrir a página de teste e tocar no botão Quero participar.',
    'Na oficina de grade, aba Post, trocar o título do destaque por Site novo no ar.'
  ],
  studentDeliverable: 'Pasta Aula-10: computador.png, tablet.png, celular.png, projeto-responsivo.grade, post-final.png e projeto.grade. No caderno: os cinco problemas da página de teste, o endereço escolhido e uma frase sobre o que conferir antes de publicar.',
  check: [
    'Nenhum telefone, e-mail ou nome de pessoa real na página.',
    'Textos sem erro de escrita nas três telas.',
    'Rodapé avisa que a empresa é fictícia; imagens são próprias ou têm crédito.',
    'No celular, destaque e botão na primeira tela e nada espremido.',
    'Os cinco problemas da página de teste anotados no caderno.',
    'Post com destaque, endereço legível e botão, nas cores da página, exportado como post-final.png.'
  ],
  fallback: 'Sem internet, abrir as cópias da página de teste e da corrigida no computador da sala e projetar; a caça acontece na tela projetada, com respostas no caderno. Sem o projeto da aula 09, revisar a página pronta da oficina. Não distribuir fichas.',
  extension: 'Quem terminar o post antes das 21:30 faz um desafio extra: a versão story do anúncio (post-alternativa.png) ou a página de "não encontrada" da Arena Pixel no caderno.',
  commonProblems: [
    ['O aluno não tem o projeto da aula 09', 'Usar a página pronta que a oficina já traz. A revisão é a mesma.'],
    ['A página de teste não abre no celular', 'Conferir o endereço digitado, sem espaço e sem www. Se a rede da escola bloquear, usar a tela projetada.'],
    ['O aluno acha que um número inventado pode ficar', 'Mesmo fictício, telefone com nome de pessoa ensina o hábito errado. Na página, contato é da empresa.'],
    ['O aluno não tem o projeto.grade da aula 08', 'A oficina de grade já traz um post pronto na aba Post. O exercício é o mesmo.'],
    ['Falta tempo', 'Priorizar o recado no celular e o post. Às 22:00, parar a edição para salvar e escrever a frase.']
  ],
  presentationSlides: [
    {
      title: 'Mapa da noite', block: 1, layout: 'dw8',
      lede: 'Hoje a Arena Pixel ganha um endereço. Você sai com o kit de lançamento do site.',
      cards: [
        {title: 'Caçar', text: '19:00 às 19:45 · os erros de uma página publicada sem conferir.'},
        {title: 'Revisar', text: '20:05 às 21:00 · o recado do cliente nas três telas.'},
        {title: 'Lançar', text: '21:00 às 21:40 · o post que anuncia o site no ar.'},
        {title: 'Mostrar', text: '21:40 às 22:10 · mostra do kit e pasta final.'}
      ],
      promptLabel: 'Pausa', prompt: 'Lanche das 19:45 às 20:05. Encerramento às 22:10.',
      teacher: {
        speech: 'Até agora a Arena Pixel só existia na pasta de vocês. Hoje ela ganha endereço, e vocês preparam tudo o que precisa para lançar o site.',
        steps: ['3 min · Fazer chamada e apresentar o kit de lançamento: página revisada, caça aos problemas e post.', '2 min · Combinar posto fixo, voz baixa e mão levantada para pedir ajuda. Celular liberado só quando o slide pedir.'],
        watch: 'Todos sabem que o trabalho é individual e que a página da semana passada é o ponto de partida.', rescue
      }
    },
    {
      title: 'Arquivo, protótipo ou link?', block: 1, layout: 'dw8',
      lede: 'A mesma página pode estar em três situações diferentes.',
      cards: [
        {title: 'Arquivo', text: 'Fica na sua pasta. Só abre quem tem a pasta.'},
        {title: 'Protótipo', text: 'Parece o site e dá para testar, mas ainda não tem endereço.'},
        {title: 'Link', text: 'Um endereço público. Qualquer pessoa abre, em qualquer tela.'}
      ],
      promptLabel: 'Desafio rápido', prompt: 'O celular.png da sua pasta é arquivo, protótipo ou link? E a página que você montou na oficina?',
      teacher: {
        speech: 'Deixe a turma classificar antes de responder.',
        steps: ['1 min · Ler os três cartões.', '1 min · Ouvir palpites.', '3 min · Conferir: celular.png é arquivo, só abre quem tem a pasta. A página montada na oficina é protótipo: parece o site, dá para testar, mas só existe no seu computador.'],
        watch: 'A turma percebe que a diferença é quem consegue ver.', rescue
      }
    },
    {
      title: 'Da mochila para o mural', block: 1, layout: 'dw8',
      lede: 'Publicar uma página é como tirar um cartaz da mochila e pregar num mural da cidade.',
      cards: [
        {title: 'Na mochila', text: 'A página na sua pasta é um cartaz guardado. Só você vê.'},
        {title: 'No mural', text: 'Hospedagem é o mural: um computador sempre ligado que mostra a página a quem pedir.'},
        {title: 'O endereço', text: 'É onde fica o mural. Qualquer pessoa chega, vê, fotografa e copia o cartaz.'}
      ],
      promptLabel: 'Experimente', prompt: 'No celular, abra oficinas-design-web.vercel.app. É o mesmo endereço que abre no computador.',
      teacher: {
        speech: 'Use o cartaz e o mural. As oficinas que eles usam são um cartaz já pregado: a pasta foi copiada para a hospedagem e ganhou esse endereço.',
        steps: ['3 min · Explicar mochila, mural e endereço com o site das oficinas como exemplo. Fechar com: o que está no mural qualquer um copia, por isso a gente confere antes.', '5 min · Cada aluno abre o endereço no celular e compara com o computador.'],
        watch: 'Quem não tiver celular olha o do colega do lado ou estreita a janela do navegador.', rescue
      }
    },
    {
      title: 'Caça aos cinco problemas', block: 1, layout: 'dw8',
      lede: 'Alguém pregou a Arena Pixel no mural sem conferir nada. Há cinco problemas escondidos.',
      cards: [
        {title: 'Abra', text: 'No site das oficinas, toque em Do protótipo ao link e depois em Página de teste.'},
        {title: 'Leia e toque', text: 'Todos os textos, o menu e o botão. Para onde eles levam?'},
        {title: 'Compare', text: 'A mesma página no computador e no celular.'}
      ],
      resources: [{href: site + 'teste/', label: 'Abrir a página de teste'}],
      promptLabel: 'Missão individual', prompt: 'Anote no caderno cada problema e onde ele está.',
      teacher: {
        speech: 'Não entregue respostas durante a caça; só confirme se o aluno está no lugar certo.',
        steps: ['11 min · Caça individual no computador e no celular, com anotação no caderno.', '4 min · Conferir: 1) “Xadres rápido” escrito errado; 2) telefone particular do Rafael no rodapé; 3) Quero participar leva a uma página não encontrada; 4) imagem do destaque não carrega; 5) no celular, os quatro cartões ficam lado a lado, espremidos e cortados.'],
        watch: 'Menu miúdo e marca quebrada no celular contam dentro do problema 5. Quem achar os cinco cedo procura um sexto detalhe: Horários e Campeonatos levam ao mesmo lugar.', rescue
      }
    },
    {
      title: 'Seis conferências antes de publicar', block: 1, layout: 'dw8',
      lede: 'Cada problema da caça escapou de uma destas conferências.',
      cards: [
        {title: 'Nome', text: 'Empresa fictícia ou com autorização.'},
        {title: 'Escrita', text: 'Nenhum erro nos textos.'},
        {title: 'Dados', text: 'Nenhum telefone, e-mail ou nome de pessoa real.'},
        {title: 'Imagens', text: 'Próprias ou com crédito, e carregando.'},
        {title: 'Botões', text: 'Cada botão leva a algum lugar.'},
        {title: 'Celular', text: 'Tudo legível, nada espremido.'}
      ],
      promptLabel: 'Pense rápido', prompt: 'Dos cinco problemas, qual você corrigiria primeiro? Por quê?',
      teacher: {
        speech: 'Ligue cada problema da caça a uma conferência e conduza para a ideia de dano.',
        steps: ['2 min · Ler as seis conferências apontando o problema da caça que escapou de cada uma.', '3 min · Conferir: primeiro o telefone particular, que expõe uma pessoa e pode ser copiado antes de sair do ar. Depois o botão quebrado, que impede a ação principal.'],
        watch: 'Justificativas que falam de pessoas e da ação principal da página.', rescue
      }
    },
    {
      title: 'Abra o seu projeto', block: 1, layout: 'dw8',
      lede: 'Depois do lanche, você aplica as seis conferências na sua própria página.',
      cards: [
        {title: '1 · Crie a pasta', text: 'Crie uma pasta Aula-10 para guardar tudo de hoje.'},
        {title: '2 · Abra o projeto', text: 'Na oficina responsiva, clique em Abrir projeto e escolha projeto-responsivo.grade. Sem ele, use a página pronta.'},
        {title: '3 · Salve', text: 'Clique em Salvar projeto e guarde na pasta Aula-10.'}
      ],
      resources: [{href: 'modelos/design-web/aula-09/oficina.html', label: 'Abrir a oficina responsiva'}],
      promptLabel: 'Antes do lanche', prompt: 'projeto-responsivo.grade salvo na pasta Aula-10.',
      teacher: {
        speech: 'Abra a oficina pelo link e mostre Abrir projeto. A revisão começa depois do lanche.',
        steps: ['2 min · Demonstrar Abrir projeto.', '5 min · Cada aluno abre o próprio projeto e salva na pasta Aula-10.'],
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
      title: 'O cliente mandou um recado', block: 2, layout: 'dw8',
      lede: 'Ele quer tudo na página ainda hoje. Leia com as seis conferências na cabeça.',
      bullets: ['“Coloca na página: Inscrisões abertas até sexta!”', '“Dúvidas, chama o Rafael no (48) 90000-0000.”', '“Usa aquela foto da galera no campeonato do ano passado. Achei na internet.”'],
      promptLabel: 'Pense rápido', prompt: 'O que entra corrigido e o que não entra?',
      teacher: {
        speech: 'Faça a chamada e leia o recado em voz alta. Deixe a turma achar as armadilhas antes de responder.',
        steps: ['2 min · Fazer chamada e retomar o projeto aberto antes do lanche.', '3 min · Ler o recado e ouvir a turma.', '3 min · Conferir: o aviso entra corrigido, “Inscrições abertas até sexta”. O telefone do Rafael não entra: o contato é da empresa, no rodapé. A foto não entra: mostra pessoas sem autorização e não se sabe de quem é; no lugar, um Ícone troféu.'],
        watch: 'Cada decisão é justificada por uma das seis conferências.', rescue
      }
    },
    {
      title: 'Leve o recado para a página', block: 2, layout: 'dw8',
      lede: 'Inclua só o que pode ser publicado, nas três telas.',
      cards: [
        {title: '1 · Aviso', text: 'Adicione um Texto “Inscrições abertas até sexta” perto do destaque.'},
        {title: '2 · Ícone', text: 'No lugar da foto, um Ícone troféu ao lado do aviso.'},
        {title: '3 · Três telas', text: 'Repita no Tablet e no Celular. No celular, o botão continua antes da linha tracejada.'}
      ],
      promptLabel: 'Pronto quando', prompt: 'Conferência da oficina em ✓ nas três abas. Exporte computador.png, tablet.png e celular.png e salve o projeto.',
      teacher: {
        speech: 'Demonstre só o primeiro Texto na aba Computador. Circule o olhar pela sala sem sair da frente; atenda quem levantar a mão.',
        steps: ['20 min · Incluir aviso e ícone nas três telas.', '5 min · Exportar os três PNGs e salvar o projeto.'],
        watch: 'Texto e ícone ficam fora da conferência da oficina; conferir visualmente que não cobrem destaque nem botão e que a palavra Inscrições está certa.', rescue
      }
    },
    {
      title: 'Rodapé honesto', block: 2, layout: 'dw8',
      lede: 'O contato do recado vai para o rodapé, do jeito certo.',
      cards: [
        {title: 'Contato', text: 'Selecione o rodapé e, em Personalizar item, escreva: “Dúvidas no balcão da Arena · Empresa fictícia”.'},
        {title: 'Nunca', text: 'Telefone, e-mail ou nome de pessoa real.'},
        {title: 'Crédito', text: 'Se usou imagem sua, um Texto pequeno: “Imagem: seu nome”.'}
      ],
      promptLabel: 'Confira nas três telas', prompt: 'Rodapé e créditos iguais no Computador, no Tablet e no Celular.',
      teacher: {
        speech: 'Crédito é sinal de respeito a quem fez a imagem; aviso de ficção evita que alguém procure a Arena Pixel de verdade.',
        steps: ['2 min · Ler os três cartões.', '8 min · Trocar o rodapé nas três telas e exportar de novo o que mudou.'],
        watch: 'O aviso de empresa fictícia continua no rodapé.', rescue
      }
    },
    {
      title: 'Olho de revisor', block: 2, layout: 'dw8',
      lede: 'Quem fez a página não vê os próprios erros. Peça ajuda ao colega do lado.',
      cards: [
        {title: '1 · Mostre', text: 'Vire a tela para o colega do lado, na aba Celular, sem levantar.'},
        {title: '2 · Ele procura', text: 'Erro de escrita, dado pessoal ou algo cobrindo o botão.'},
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
      title: 'A versão corrigida', block: 3, layout: 'dw8',
      lede: 'Mesma página, mesmo conteúdo, seis conferências feitas. Agora ela pode ser anunciada.',
      resources: [{href: site + 'corrigida/', label: 'Abrir a versão corrigida'}],
      promptLabel: 'Compare no celular', prompt: 'No cartão Do protótipo ao link, toque em Versão corrigida. Os cinco problemas sumiram?',
      teacher: {
        speech: 'Faça a chamada. A comparação é rápida: o foco do bloco é o post.',
        steps: ['2 min · Fazer chamada.', '3 min · Abrir a versão corrigida e conferir os cinco problemas resolvidos.'],
        watch: 'A turma reconhece as decisões da semana passada: menu curto, botão largo logo depois do destaque e cartões empilhados.', rescue
      }
    },
    {
      title: 'Um endereço para a Arena Pixel', block: 3, layout: 'dw8',
      lede: 'Antes de anunciar, o site precisa de um endereço fácil de falar e de digitar.',
      cards: [
        {title: 'Regras', text: 'Minúsculas, sem acento, sem espaço, palavras ligadas por hífen.'},
        {title: 'Curto', text: 'Até três palavras. Exemplo: arena-pixel-games.'},
        {title: 'Teste', text: 'Fale o endereço em voz alta. O colega consegue escrever sem perguntar?'}
      ],
      promptLabel: 'No caderno', prompt: 'Escreva duas opções de endereço e marque a melhor.',
      teacher: {
        speech: 'Endereço é parte da marca. O domínio de verdade é decisão do cliente; aqui o aluno escolhe o nome.',
        steps: ['2 min · Ler as regras com um exemplo bom e um ruim (Arena Pixel Campeonatos 2026).', '3 min · Cada aluno escreve duas opções e testa uma com o colega do lado.'],
        watch: 'Endereços sem acento, sem espaço e com a marca.', rescue
      }
    },
    {
      title: 'O post de lançamento', block: 3, layout: 'dw8',
      lede: 'O site está no ar. Agora as pessoas precisam saber. Volte à oficina de grade, aba Post.',
      cards: [
        {title: 'Destaque', text: 'Título “Site novo no ar” e, no subtítulo, o endereço que você escolheu.'},
        {title: 'Botão', text: 'Troque o texto para “Acesse o site”.'},
        {title: 'Identidade', text: 'As mesmas cores, marca e ícones da página. Use o Ícone troféu ou game.'}
      ],
      resources: [{href: 'modelos/design-web/aula-08/oficina.html', label: 'Abrir a oficina de grade'}],
      promptLabel: 'Missão individual', prompt: 'Abra o seu projeto.grade, troque para a aba Post e monte o anúncio.',
      teacher: {
        speech: 'Demonstre só a troca do título do destaque em Personalizar item. O post é da mesma família da página.',
        steps: ['2 min · Abrir a oficina de grade, o projeto.grade da semana retrasada e a aba Post.', '3 min · Conferir juntos: selecionar o destaque e trocar o título em Personalizar item. Sem o projeto, usar o post pronto da oficina.'],
        watch: 'Ninguém começa um post do zero: todos partem do post da família visual da Arena Pixel.', rescue
      }
    },
    {
      title: 'Monte o post', block: 3, layout: 'dw8',
      lede: 'Grade de 6 colunas. O endereço é a informação mais importante depois do título.',
      cards: [
        {title: '1 · Título', text: '“Site novo no ar”, grande, no destaque.'},
        {title: '2 · Endereço', text: 'Legível de longe, sem cortar e sem quebrar no meio.'},
        {title: '3 · Botão e rodapé', text: '“Acesse o site” e o aviso de empresa fictícia.'}
      ],
      promptLabel: 'Pronto quando', prompt: 'Conferência em ✓. Escolha post-final.png, exporte e salve o projeto na pasta Aula-10.',
      teacher: {
        speech: 'Circule o olhar pela sala sem sair da frente; atenda quem levantar a mão.',
        steps: ['20 min · Montagem individual do post, com exportação de post-final.png e salvamento.'],
        watch: 'Quem terminar antes das 21:30 faz o desafio extra; o post principal fica em post-final.png.', rescue
      }
    },
    {
      title: 'O colega lê o endereço?', block: 3, layout: 'dw8',
      lede: 'Mostre o post por três segundos ao colega do lado e esconda.',
      bullets: ['O que está sendo anunciado?', 'Qual é o endereço?', 'Ele conseguiu escrever o endereço no caderno sem perguntar?'],
      promptLabel: 'Corrija uma coisa', prompt: 'Se o colega errou o endereço, aumente, separe ou simplifique. Exporte post-final.png de novo.',
      teacher: {
        speech: 'O teste é o mesmo de um anúncio de verdade: quem passa rápido precisa guardar o endereço.',
        steps: ['5 min · Teste em duplas vizinhas, troca de papéis e ajuste.'],
        watch: 'Erros comuns: endereço pequeno, colado na borda ou com acento.', rescue
      }
    },
    {
      title: 'Desafio extra · Versão story', block: 3, layout: 'dw8', pace: 'extra',
      lede: 'O cliente quer o mesmo anúncio para os stories, onde a pessoa vê por poucos segundos.',
      cards: [
        {title: 'Menos texto', text: 'Só o título, o endereço e o botão.'},
        {title: 'Mais contraste', text: 'Fundo escuro em Cor da prancheta e textos claros.'},
        {title: 'Mesma marca', text: 'Cores e ícone da página.'}
      ],
      promptLabel: 'Guarde as duas versões', prompt: 'Exporte post-alternativa.png sem substituir post-final.png.',
      teacher: {
        speech: 'Desafio opcional para quem terminou o post antes. Salvar o projeto antes de mudar as cores.',
        steps: ['10 min · Criar a versão alternativa e exportar.'],
        watch: 'O endereço continua legível com o fundo escuro.', rescue
      }
    },
    {
      title: 'Desafio extra · Página de “não encontrada”', block: 3, layout: 'dw8', pace: 'extra',
      lede: 'Toda página publicada um dia recebe alguém num endereço errado, como o botão da página de teste.',
      cards: [
        {title: 'Mensagem', text: 'Uma frase simpática no tom da Arena Pixel.'},
        {title: 'Saída', text: 'Um botão que leva de volta aos campeonatos.'},
        {title: 'Marca', text: 'Mesmas cores e mesmo cabeçalho da página.'}
      ],
      promptLabel: 'No caderno', prompt: 'Desenhe a tela do celular com retângulos e escreva a mensagem.',
      teacher: {
        speech: 'Desafio opcional para quem terminou antes.',
        steps: ['10 min · Rascunhar a tela no caderno.'],
        watch: 'A mensagem não culpa o visitante e sempre oferece um caminho de volta.', rescue
      }
    },
    {
      title: 'Mostra do kit de lançamento', block: 4, layout: 'dw8',
      lede: 'Deixe celular.png e post-final.png abertos lado a lado. O colega do lado olha como visitante.',
      cards: [
        {title: '1 · Uma qualidade', text: 'O que está claro, bonito ou fácil de encontrar.'},
        {title: '2 · Uma melhoria', text: 'Uma mudança possível, apontando o lugar na tela.'},
        {title: '3 · Mesma marca?', text: 'O post e a página parecem da mesma empresa?'}
      ],
      promptLabel: 'Com respeito', prompt: '“Gostei de ___. Eu mudaria ___.”',
      teacher: {
        speech: 'Faça a chamada. Avaliar o trabalho, não a pessoa. A conversa é com o colega do lado, sem circulação.',
        steps: ['2 min · Fazer chamada.', '10 min · Mostra em duplas vizinhas, com troca de papéis.'],
        watch: 'Melhorias formuladas como sugestão, apontando um lugar da tela.', rescue
      }
    },
    {
      title: 'Aplique a melhoria', block: 4, layout: 'dw8',
      lede: 'Escolha uma sugestão do colega e faça a mudança.',
      bullets: ['Na página: abra a oficina responsiva e ajuste nas três telas.', 'No post: abra a oficina de grade, aba Post.', 'Exporte de novo só o que mudou.'],
      promptLabel: 'Uma mudança', prompt: 'Uma mudança bem feita vale mais que três pela metade. Às 22:00, pare a edição.',
      teacher: {
        speech: 'Ajuste pequeno e certeiro, não redesenho.',
        steps: ['6 min · Aplicar uma melhoria e exportar de novo.'],
        watch: 'A mudança aparece no PNG exportado.', rescue
      }
    },
    {
      title: 'Salve e reabra', block: 4, layout: 'dw8',
      lede: '22:00: pare a edição. Agora é hora de conferir o kit.',
      cards: [
        {title: '1 · Página', text: 'computador.png, tablet.png, celular.png e projeto-responsivo.grade.'},
        {title: '2 · Post', text: 'post-final.png e projeto.grade.'},
        {title: '3 · Teste', text: 'Abra um PNG e reabra um dos projetos para conferir.'}
      ],
      promptLabel: 'Pasta Aula-10', prompt: 'O kit completo dentro da pasta Aula-10.',
      teacher: {
        speech: 'O navegador pode colocar números nos nomes repetidos. Guarde a versão mais recente.',
        steps: ['7 min · Às 22:00, parar a edição, salvar, reabrir e conferir a pasta.'],
        watch: 'PNG é só imagem: sem o projeto não dá para continuar depois.', rescue
      }
    },
    {
      title: 'Uma frase de designer', block: 4, layout: 'dw8',
      lede: 'No caderno, complete a frase com o que você aprendeu hoje.',
      bullets: ['Exemplo: “Antes de publicar, eu confiro os dados porque o que vai para o mural qualquer pessoa copia.”', 'Pasta salva e posto organizado antes de sair.'],
      promptLabel: 'Sua frase', prompt: '“Antes de publicar, eu confiro ___ porque ___.”',
      teacher: {
        speech: 'Ouça duas frases e feche retomando mochila, mural, as seis conferências e o lançamento.',
        steps: ['2 min · Escrever a frase no caderno.', '2 min · Ouvir duas respostas.', '1 min · Organizar os postos e encerrar às 22:10.'],
        watch: 'Sem apresentações longas no encerramento.', rescue
      }
    }
  ]
};
