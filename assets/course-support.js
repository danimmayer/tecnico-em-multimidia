/* Anotações de aula do Prof. Daniel Marcos Mayer. */
window.SENAI_TEACHING_SUPPORT = {
  "design-web": {
    "courseTips": {
      "promise": "Em sala, parto de um exemplo funcional, explico uma decisão por vez, altero uma linha e reservo tempo para a turma repetir o procedimento.",
      "routine": [
        "Antes da turma entrar, deixo abertos o planejamento, o editor e o navegador.",
        "No código projetado, mantenho a fonte com pelo menos 20 px e salvo após cada mudança.",
        "Primeiro demonstro no projetor; depois interrompo o compartilhamento e libero a prática em duplas.",
        "Na correção, comparo o resultado obtido com o esperado antes de procurar detalhes de sintaxe.",
        "Sem internet, mantenho os exemplos locais e organizo a atividade em duplas."
      ],
      "onlineRoutines": [
        {
          "lessons": ["01", "02", "12", "13", "14", "15", "16", "23"],
          "text": "Quando a conexão contribui, concentro referências e links no DontPad BR em modo somente leitura, sem exigir cadastro da turma."
        },
        {
          "lessons": ["03", "04", "05", "06", "07", "08", "09", "11", "17", "18", "19", "20", "24", "25", "26"],
          "text": "Uso o DontPad BR para distribuir o trecho estável e o LiveCodes para a prévia; ao final, cada dupla mantém os arquivos na pasta local."
        },
        {
          "lessons": ["10", "27", "28", "29"],
          "text": "Registro o link válido no DontPad BR e só envio a pasta ao Netlify Drop depois da conferência local e da retirada de dados pessoais."
        },
        {
          "lessons": ["21", "22"],
          "text": "Abro o Photopea sem login para a peça visual e salvo a versão editável e a exportação na pasta local antes de fechar a aba."
        }
      ],
      "rescue": "Se eu perder o fio da aula, retomo o mapa dos quatro blocos, reafirmo a entrega prevista e sigo a sequência registrada no planejamento.",
      "commonProblems": [
        ["O resultado não muda no navegador", "Confiro se o arquivo foi salvo, se a aba aberta corresponde ao projeto e atualizo a página."],
        ["O código deixa de funcionar depois de várias mudanças", "Retorno à última versão estável e reaplico uma alteração por vez."],
        ["Parte da turma ainda não começou", "Retomo o primeiro passo no projetor e organizo apoio em duplas antes de avançar."]
      ]
    },
    "lessons": {
      "01": {
        "teacherGoal": "Fazer a turma entender que design web é organizar informação para pessoas, e não apenas “deixar bonito”.",
        "plainLanguage": "Um site é uma sequência de decisões: o que aparece primeiro, onde clicar, como ler e como concluir uma tarefa. O designer web torna esse caminho claro.",
        "say": "Hoje ninguém precisa saber código. Vamos começar como usuários: observando o que ajuda e o que atrapalha quando navegamos.",
        "demo": [
          "Abra dois sites conhecidos: um simples de navegar e outro visualmente confuso.",
          "Tente cumprir a mesma missão nos dois, como encontrar contato ou preço.",
          "Penso em voz alta e descrevo o que chamou atenção primeiro e por que a escolha pareceu natural.",
          "Registre no quadro três critérios: clareza, consistência e feedback."
        ],
        "studentDeliverable": "Ficha de análise de navegação com três acertos, três problemas e uma melhoria proposta.",
        "check": [
          "O aluno descreveu uma tarefa real, e não apenas gosto pessoal.",
          "A melhoria proposta resolve o problema observado.",
          "O grupo conseguiu explicar sua análise em até dois minutos."
        ],
        "fallback": "Sem internet, use o Home deste próprio curso e a tela de configurações de um celular como exemplos de navegação.",
        "commonProblems": [
          ["A turma diz apenas “bonito” ou “feio”", "Pergunte: “o que você tentou fazer e onde travou?”"],
          ["A pesquisa ocupa tempo demais", "Defina dois sites e uma única missão para todos."]
        ]
      },
      "02": {
        "teacherGoal": "Explicar o caminho entre digitar um endereço e receber uma página, sem aprofundar redes.",
        "plainLanguage": "O domínio é o nome, o DNS encontra o endereço do servidor, a hospedagem guarda os arquivos e o navegador monta a página recebida. HTTPS protege a conversa durante o caminho.",
        "say": "Pensem em uma entrega: o domínio é o nome no pedido, o DNS encontra o endereço, o servidor prepara o pacote e o navegador abre tudo na sua tela.",
        "demo": [
          "Digite um endereço no navegador e pare antes de pressionar Enter.",
          "Mostre domínio, extensão e cadeado.",
          "Abra as informações da conexão e identifique HTTPS.",
          "Desenhe no quadro: pessoa → navegador → DNS → servidor → navegador."
        ],
        "studentDeliverable": "Mini guia visual “Da URL à tela” com os quatro passos e um cuidado de segurança.",
        "check": [
          "Domínio não foi confundido com hospedagem.",
          "HTTPS foi explicado como proteção da conexão, não como garantia absoluta de honestidade.",
          "O desenho apresenta começo, caminho e resposta."
        ],
        "fallback": "Use cartões de papel com os papéis “navegador”, “DNS” e “servidor”; três alunos encenam o pedido.",
        "commonProblems": [
          ["Confusão entre internet e web", "Explique: internet é a infraestrutura; web é um dos serviços que circulam nela."],
          ["O aluno acha que o cadeado garante que o site é verdadeiro", "Mostre que um golpista também pode usar HTTPS; endereço e conteúdo ainda precisam ser verificados."]
        ]
      },
      "03": {
        "teacherGoal": "Fazer cada aluno criar, salvar e abrir sua primeira página HTML.",
        "plainLanguage": "HTML descreve a estrutura e o significado do conteúdo. As tags funcionam como etiquetas: isto é um título, isto é um parágrafo, isto pertence ao corpo da página.",
        "say": "Não tentem decorar. Copiem comigo, salvem e observem o navegador. Quando entendermos o padrão de abrir e fechar tags, o restante vira consulta.",
        "demo": [
          "Crie uma pasta chamada meu-primeiro-site.",
          "Dentro dela, crie index.html — confirme que não terminou em .txt.",
          "Digite a estrutura mínima, salve e abra no navegador.",
          "Altere o h1, salve novamente e atualize a página para provar o ciclo editar → salvar → atualizar."
        ],
        "studentDeliverable": "Página de apresentação de uma persona fictícia com título, dois parágrafos, subtítulo, lista e comentário no código.",
        "check": [
          "O arquivo se chama index.html.",
          "Existe apenas um h1 e ele descreve a página.",
          "As tags estão fechadas e o conteúdo aparece no body.",
          "O aluno sabe mostrar onde o arquivo foi salvo."
        ],
        "fallback": "Se o editor não estiver instalado, use um editor de texto simples. A aula depende do arquivo .html, não do VS Code.",
        "commonProblems": [
          ["A página exibe o código como texto", "O arquivo foi salvo como .txt; ative a exibição de extensões e renomeie para .html."],
          ["A mudança não aparece", "Salvar no editor e atualizar o navegador; confirme que o arquivo aberto é o mesmo."],
          ["Acentos ficam quebrados", "Confirme <meta charset=\"UTF-8\"> no head."]
        ],
        "code": [
          {
            "label": "index.html · estrutura mínima",
            "language": "html",
            "content": "<!doctype html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Estúdio Aurora</title>\n</head>\n<body>\n  <h1>Estúdio Aurora</h1>\n  <p>Projeto fictício criado para a atividade.</p>\n</body>\n</html>"
          }
        ]
      },
      "04": {
        "teacherGoal": "Transformar uma página isolada em um pequeno site navegável.",
        "plainLanguage": "Links conectam páginas; listas agrupam itens relacionados; imagens precisam de caminho correto e texto alternativo.",
        "say": "Um site começa a existir quando as páginas se conectam. Hoje cada href será uma ponte e cada src será o endereço de um arquivo.",
        "demo": [
          "Duplique index.html para interesses.html e contato.html.",
          "Crie o mesmo nav nas três páginas.",
          "Mostre a diferença entre caminho local e endereço completo.",
          "Insira uma imagem da pasta imagens e quebre o caminho de propósito para ensinar o diagnóstico."
        ],
        "studentDeliverable": "Mini site da persona fictícia com três páginas, menu repetido, uma lista e uma imagem com texto alternativo.",
        "check": [
          "Todos os links funcionam nos dois sentidos.",
          "Os nomes de arquivo não contêm espaços ou acentos.",
          "A imagem está dentro da pasta do projeto.",
          "O alt descreve a informação relevante da imagem."
        ],
        "fallback": "Forneço a pasta modelo local e peço apenas que os alunos troquem textos, imagem e links.",
        "commonProblems": [
          ["Erro 404 ou página não abre", "Compare letra por letra o href com o nome do arquivo, inclusive maiúsculas."],
          ["Imagem não aparece", "Confirme pasta, extensão .jpg/.png/.webp e o caminho relativo."],
          ["Link externo substitui o site", "Use target=\"_blank\" apenas quando fizer sentido e explique que não é obrigatório."]
        ],
        "code": [
          {
            "label": "Menu e imagem",
            "language": "html",
            "content": "<nav aria-label=\"Navegação principal\">\n  <a href=\"index.html\">Início</a>\n  <a href=\"interesses.html\">Interesses</a>\n  <a href=\"contato.html\">Contato</a>\n</nav>\n\n<img src=\"imagens/retrato.jpg\" alt=\"Retrato de Ana em um parque\">\n\n<ul>\n  <li>Fotografia</li>\n  <li>Música</li>\n  <li>Design</li>\n</ul>"
          }
        ]
      },
      "05": {
        "teacherGoal": "Organizar o HTML pelo significado e usar mídia com crédito.",
        "plainLanguage": "HTML semântico diz o papel de cada parte da página. Isso ajuda pessoas, leitores de tela, buscadores e a manutenção do código.",
        "say": "Header não quer dizer “algo lá em cima”; quer dizer “cabeçalho deste contexto”. Escolham a tag pelo significado, não pelo desenho.",
        "demo": [
          "Mostre uma página feita somente com divs e a mesma página com header, nav, main e footer.",
          "Use a árvore de acessibilidade do navegador para comparar.",
          "Pesquise uma imagem em banco gratuito e abra a página da licença.",
          "Insira crédito no rodapé com autor, fonte e link."
        ],
        "studentDeliverable": "Mini site reestruturado semanticamente com pelo menos uma mídia licenciada e crédito completo.",
        "check": [
          "Existe um main único por página.",
          "O nav contém os links principais.",
          "Section possui um título que explica seu tema.",
          "Crédito informa autor e fonte; a licença foi conferida."
        ],
        "fallback": "Use as imagens locais do curso e forneça os dados de crédito já impressos.",
        "commonProblems": [
          ["Usar section para qualquer caixa", "Se o bloco não teria um título próprio, talvez uma div seja suficiente."],
          ["Atribuir “Google Imagens” como fonte", "Google é busca; abro a página original e confiro autoria e licença."],
          ["Misturar visual e significado", "Primeiro escolho a tag pelo papel; o CSS cuidará da aparência."]
        ],
        "code": [
          {
            "label": "Estrutura semântica",
            "language": "html",
            "content": "<header>\n  <h1>Portfólio de Ana</h1>\n  <nav aria-label=\"Principal\">...</nav>\n</header>\n<main>\n  <section aria-labelledby=\"projetos\">\n    <h2 id=\"projetos\">Projetos</h2>\n    <article>\n      <h3>Campanha Horizonte</h3>\n      <p>Identidade visual e peças digitais.</p>\n    </article>\n  </section>\n</main>\n<footer>\n  <p>Imagem: Nome do autor / Fonte / Licença</p>\n</footer>"
          }
        ]
      },
      "06": {
        "teacherGoal": "Vincular uma folha CSS e aplicar cores e tipografia sem perder legibilidade.",
        "plainLanguage": "CSS seleciona elementos e define sua aparência. Uma regra tem seletor, propriedade e valor; a cascata decide qual regra vence.",
        "say": "HTML é o conteúdo com significado. CSS é a roupa. Se a roupa não aparecer, primeiro conferimos se o arquivo foi ligado corretamente.",
        "demo": [
          "Crie styles.css ao lado de index.html.",
          "Vincule com link no head e aplique uma borda temporária no body.",
          "Mostre seletor de elemento, classe e estado :hover.",
          "Troque uma propriedade por vez e atualize o navegador."
        ],
        "studentDeliverable": "Mini site com paleta de três cores, par tipográfico, contraste legível e estados de link.",
        "check": [
          "styles.css está carregado em todas as páginas.",
          "Texto e fundo têm contraste suficiente para leitura.",
          "Tamanhos usam rem para texto principal.",
          "A mesma cor e tipografia se repetem de forma consistente."
        ],
        "fallback": "Entrego o CSS pronto e peço que alterem apenas seis variáveis de cor e tipografia no topo do arquivo.",
        "commonProblems": [
          ["Nenhum estilo aparece", "Confirme href, nome styles.css e se link está dentro do head."],
          ["A classe não funciona", "No HTML, uso class=\"destaque\"; no CSS, uso .destaque."],
          ["Regra é ignorada", "Use o inspetor para ver qual regra venceu; evite resolver tudo com !important."]
        ],
        "code": [
          {
            "label": "index.html · vínculo",
            "language": "html",
            "content": "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Meu site</title>\n  <link rel=\"stylesheet\" href=\"styles.css\">\n</head>"
          },
          {
            "label": "styles.css · começo seguro",
            "language": "css",
            "content": ":root {\n  --fundo: #f7f3ea;\n  --texto: #1f2933;\n  --destaque: #b42318;\n}\n\nbody {\n  margin: 0;\n  background: var(--fundo);\n  color: var(--texto);\n  font-family: Georgia, serif;\n  line-height: 1.6;\n}\n\na { color: var(--destaque); }\na:hover { text-decoration-thickness: 3px; }"
          }
        ]
      },
      "07": {
        "teacherGoal": "Ensinar o modelo de caixa e criar ritmo visual com espaçamento consistente.",
        "plainLanguage": "Todo elemento é uma caixa: conteúdo no centro, padding por dentro, border na borda e margin por fora.",
        "say": "Padding protege o conteúdo por dentro; margin afasta a caixa das vizinhas. Vamos ligar bordas temporárias para enxergar o invisível.",
        "demo": [
          "Aplique outline em todos os elementos para revelar as caixas.",
          "Abra o diagrama do box model no inspetor.",
          "Altere padding e margin e peça que a turma diga onde o espaço apareceu.",
          "Ative box-sizing: border-box e compare a largura final."
        ],
        "studentDeliverable": "Página corrigida com alinhamento comum, escala de espaçamento e cartões visualmente agrupados.",
        "check": [
          "Elementos relacionados estão mais próximos entre si.",
          "As bordas ou eixos principais se alinham.",
          "Espaçamentos repetem uma escala pequena, média e grande.",
          "Não há conteúdo encostado nas bordas da tela."
        ],
        "fallback": "Faça o exercício em papel quadriculado: desenhe content, padding, border e margin com quatro cores.",
        "commonProblems": [
          ["Largura passa de 100%", "Use box-sizing: border-box e evite somar width com padding sem cálculo."],
          ["Tudo parece solto", "Reduza espaço dentro de grupos e aumente entre grupos."],
          ["Centralização com margens aleatórias", "Use um container com max-width e margin-inline: auto."]
        ],
        "code": [
          {
            "label": "Box model previsível",
            "language": "css",
            "content": "*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n.container {\n  width: min(100% - 2rem, 70rem);\n  margin-inline: auto;\n}\n\n.card {\n  padding: 1.5rem;\n  border: 1px solid #d6d3d1;\n  margin-block: 1rem;\n}"
          }
        ]
      },
      "08": {
        "teacherGoal": "Usar Flexbox para alinhar em uma direção e Grid para organizar linhas e colunas.",
        "plainLanguage": "Flexbox resolve distribuição em uma dimensão; Grid controla uma grade em duas dimensões. Ambos começam no elemento pai.",
        "say": "Antes de decorar propriedades, apontem para o pai. É nele que ligamos display flex ou grid; os filhos passam a obedecer ao novo leiaute.",
        "demo": [
          "Monte três caixas sem leiaute e marque quem é pai e quem são filhos.",
          "Ative display:flex, depois gap, justify-content e align-items.",
          "Troque para grid e use repeat(auto-fit, minmax(...)).",
          "Redimensione a janela para mostrar a reorganização automática."
        ],
        "studentDeliverable": "Menu e galeria responsiva: Flexbox no menu e Grid nos cartões.",
        "check": [
          "display foi aplicado ao pai correto.",
          "O espaçamento usa gap em vez de margens improvisadas.",
          "A galeria não cria rolagem horizontal.",
          "O leiaute continua legível com um cartão ou muitos cartões."
        ],
        "fallback": "Use Flexbox Froggy apenas como apoio; se a internet cair, distribua cartões de propriedades para montar comandos no quadro.",
        "commonProblems": [
          ["justify-content parece não fazer nada", "O contêiner não tem espaço livre; aumento largura ou altura e observo o eixo correto."],
          ["Grid aperta demais os cartões", "Use minmax(16rem, 1fr) e auto-fit."],
          ["Aluno aplica flex em cada item", "Volte ao desenho pai → filhos e mova display para o contêiner."]
        ],
        "code": [
          {
            "label": "Flexbox no menu",
            "language": "css",
            "content": ".menu {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  flex-wrap: wrap;\n}"
          },
          {
            "label": "Grid que se adapta",
            "language": "css",
            "content": ".galeria {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1.25rem;\n}"
          }
        ]
      },
      "09": {
        "teacherGoal": "Fazer o site funcionar em tela pequena usando mobile first e poucas media queries.",
        "plainLanguage": "Responsivo não é encolher o desktop. É reorganizar prioridade, largura e interação para cada espaço disponível.",
        "say": "Vamos começar pelo menor espaço, onde a prioridade fica óbvia. Depois adicionamos complexidade quando houver largura suficiente.",
        "demo": [
          "Abra o modo de dispositivo do navegador.",
          "Comece com uma coluna e imagens fluidas.",
          "Adicione uma media query apenas quando o conteúdo pedir.",
          "Teste teclado, zoom e toque — não só a largura."
        ],
        "studentDeliverable": "Mini site sem rolagem horizontal, legível a 320 px e organizado em duas colunas quando houver espaço.",
        "check": [
          "Viewport está configurado.",
          "Imagens usam max-width:100% e height:auto.",
          "Texto não fica minúsculo no celular.",
          "Links e botões têm área confortável de toque.",
          "Nenhum conteúdo depende apenas de hover."
        ],
        "fallback": "Sem celular, use o modo responsivo do navegador e três larguras anotadas: 360, 768 e 1280 px.",
        "commonProblems": [
          ["Rolagem horizontal misteriosa", "No inspetor, procure largura fixa, imagem sem max-width ou elemento posicionado fora da tela."],
          ["Muitas media queries conflitantes", "Volte ao estilo base mobile e mantenha apenas mudanças estruturais."],
          ["Menu não cabe", "Permito flex-wrap ou transformo o menu em pilha; o menu hambúrguer fica para uma etapa posterior."]
        ],
        "code": [
          {
            "label": "Mobile first",
            "language": "css",
            "content": "img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n\n.projetos {\n  display: grid;\n  gap: 1rem;\n}\n\n@media (min-width: 48rem) {\n  .projetos {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}"
          }
        ]
      },
      "10": {
        "teacherGoal": "Publicar um site estático e ensinar um checklist de diagnóstico.",
        "plainLanguage": "Publicar é colocar a mesma pasta HTML/CSS/imagens em um servidor e receber um endereço público. Caminhos e nomes de arquivo passam a diferenciar maiúsculas de minúsculas.",
        "say": "No computador tudo pode parecer certo; no servidor, os nomes precisam combinar exatamente. Antes de publicar, vamos retirar qualquer dado pessoal e conferir a pasta.",
        "demo": [
          "Confirme que index.html está na raiz do projeto.",
          "Revise caminhos relativos e nomes sem espaços.",
          "Abra o Netlify Drop e arraste a pasta ou o arquivo ZIP, sem criar uma conta.",
          "Abra o link em janela anônima e em um celular.",
          "Faça uma mudança pequena, gere uma nova publicação e confirme qual endereço será entregue."
        ],
        "studentDeliverable": "Link público de um site com persona fictícia, conferido em dois dispositivos e registrado com data da publicação.",
        "check": [
          "A página inicial abre sem acrescentar o nome do arquivo.",
          "CSS, imagens e links internos carregam.",
          "O link funciona fora da conta do aluno.",
          "A versão publicada corresponde à última versão local.",
          "Não há nome completo, foto pessoal, telefone, localização, rotina ou outro dado identificável de estudante."
        ],
        "fallback": "Sem internet, simulo a publicação no servidor local e avalio a pasta com o mesmo checklist.",
        "commonProblems": [
          ["Página 404", "index.html não está na raiz ou o serviço aponta para a pasta errada."],
          ["CSS funciona localmente, mas não online", "Compare maiúsculas e minúsculas em href e nome de arquivo."],
          ["A nova publicação gerou outro endereço", "Registro o novo link no mural da aula e mantenho a pasta local como versão principal."]
        ]
      },
      "11": {
        "teacherGoal": "Introduzir JavaScript como resposta a eventos, sem transformar a UC em curso de programação.",
        "plainLanguage": "JavaScript encontra um elemento, escuta algo acontecer e muda a página. Para esta aula: selecionar → ouvir → alterar.",
        "say": "Hoje não vamos aprender a linguagem inteira. Só três movimentos: pegar um elemento, esperar um clique e mudar uma classe.",
        "demo": [
          "Crie botão e parágrafo no HTML.",
          "Carregue script.js com defer.",
          "Selecione pelo id e registre no console.",
          "Adicione o evento de clique e altere texto ou classe.",
          "Mostre o console para localizar erros."
        ],
        "studentDeliverable": "Uma interação funcionando: alternar tema, abrir aviso ou mostrar/esconder conteúdo.",
        "check": [
          "O botão é um elemento button.",
          "O script carrega com defer.",
          "O seletor encontra um elemento existente.",
          "A interação também funciona pelo teclado.",
          "Não há erro vermelho no console."
        ],
        "fallback": "Entregue HTML e CSS prontos. A turma altera apenas três linhas marcadas como PASSO 1, 2 e 3.",
        "commonProblems": [
          ["Cannot read properties of null", "O id não combina ou o script roda antes do HTML; confira o seletor e use defer."],
          ["Clique recarrega a página", "Dentro de formulário, use type=\"button\" quando o botão não envia dados."],
          ["Classe muda, mas nada acontece", "A classe precisa ter regra correspondente no CSS."]
        ],
        "code": [
          {
            "label": "index.html",
            "language": "html",
            "content": "<button id=\"tema\" type=\"button\" aria-pressed=\"false\">\n  Alternar tema\n</button>\n<script src=\"script.js\" defer></script>"
          },
          {
            "label": "script.js",
            "language": "javascript",
            "content": "const botao = document.querySelector('#tema');\n\nbotao.addEventListener('click', () => {\n  const ativo = document.body.classList.toggle('dark-theme');\n  botao.setAttribute('aria-pressed', String(ativo));\n});"
          },
          {
            "label": "styles.css",
            "language": "css",
            "content": "body {\n  background: #f7f3ea;\n  color: #1f2933;\n}\n\nbody.dark-theme {\n  background: #17202a;\n  color: #f7f3ea;\n}"
          }
        ]
      },
      "12": {
        "teacherGoal": "Separar UI de UX e justificar decisões com base na tarefa do usuário.",
        "plainLanguage": "UI é o que a pessoa vê e toca; UX é a experiência completa para alcançar um objetivo. Uma interface bonita pode oferecer uma experiência ruim.",
        "say": "Sempre completem a frase: “A pessoa precisa conseguir...”. Essa tarefa vem antes da cor do botão.",
        "demo": [
          "Escolha uma tela de cadastro conhecida.",
          "Marque elementos de UI: texto, campo, botão, estado.",
          "Percorra a tarefa e identifique dúvidas, espera e feedback.",
          "Refaça no quadro uma etapa com menos esforço."
        ],
        "studentDeliverable": "Mapa de uma tarefa com início, passos, pontos de dúvida e melhoria proposta.",
        "check": [
          "Existe um usuário e uma tarefa definidos.",
          "A análise considera erro, espera e confirmação.",
          "A melhoria reduz esforço ou incerteza.",
          "A justificativa não depende apenas de gosto."
        ],
        "fallback": "Uso capturas preparadas de cadastro, compra ou transporte, sempre com dados fictícios e sem abrir contas pessoais dos estudantes.",
        "commonProblems": [
          ["UX é reduzida a “site bonito”", "Pergunte sobre tempo, erro, confiança e conclusão da tarefa."],
          ["Persona inventada sem evidência", "Trate como hipótese e liste o que precisaria ser pesquisado."],
          ["Solução antes do problema", "Volte à frase da tarefa e ao ponto exato de dificuldade."]
        ]
      },
      "13": {
        "teacherGoal": "Aplicar melhorias básicas de acessibilidade e testar sem depender do mouse.",
        "plainLanguage": "Acessibilidade remove barreiras. HTML correto, contraste, foco visível, texto alternativo e teclado já resolvem muitos problemas.",
        "say": "Não estamos criando um site separado para pessoas com deficiência. Estamos fazendo o mesmo site funcionar para mais gente e em mais situações.",
        "demo": [
          "Navegue apenas com Tab e Shift+Tab.",
          "Mostre o foco visível e a ordem de navegação.",
          "Desative imagens e leia os textos alternativos.",
          "Aumente o zoom para 200% e verifique se o conteúdo continua utilizável.",
          "Compare um label correto com placeholder usado como rótulo."
        ],
        "studentDeliverable": "Auditoria de cinco itens e correção de pelo menos três barreiras no mini site.",
        "check": [
          "Todos os controles recebem foco visível.",
          "Campos possuem label associado.",
          "Imagens informativas têm alt; decorativas usam alt vazio.",
          "Títulos seguem uma hierarquia lógica.",
          "Zoom não esconde conteúdo importante."
        ],
        "fallback": "Sem ferramenta automática, faça o teste manual: teclado, zoom, imagens desligadas, leitura em voz alta e contraste.",
        "commonProblems": [
          ["Remover outline para “ficar bonito”", "Crie um :focus-visible claro em vez de apagar o indicador."],
          ["Alt começa com “imagem de”", "Descreva diretamente a informação ou função relevante."],
          ["Usar div clicável", "Prefira button ou a; eles já carregam comportamento de teclado e semântica."]
        ],
        "code": [
          {
            "label": "Formulário acessível",
            "language": "html",
            "content": "<label for=\"email\">E-mail</label>\n<input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\" required>\n<button type=\"submit\">Enviar cadastro</button>"
          },
          {
            "label": "Foco visível",
            "language": "css",
            "content": ":focus-visible {\n  outline: 3px solid #005fcc;\n  outline-offset: 3px;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    scroll-behavior: auto !important;\n    animation-duration: 0.01ms !important;\n  }\n}"
          }
        ]
      },
      "14": {
        "teacherGoal": "Converter um pedido vago em briefing verificável.",
        "plainLanguage": "Briefing é um acordo sobre problema, público, mensagem, conteúdo, restrições e sucesso. Ele reduz retrabalho antes do desenho.",
        "say": "Quando o cliente diz “quero moderno”, nossa tarefa é transformar isso em perguntas e exemplos observáveis.",
        "demo": [
          "Apresente um pedido vago: “quero um site bonito para minha empresa”.",
          "Conduza perguntas sobre público, objetivo, ação principal, conteúdo, prazo e restrições.",
          "Separe fatos, hipóteses e dúvidas.",
          "Escreva um resumo de uma frase e peça confirmação do “cliente”."
        ],
        "studentDeliverable": "Briefing de uma página com problema, público, objetivo, conteúdo, referências, restrições e critério de sucesso.",
        "check": [
          "Objetivo descreve uma ação do usuário.",
          "Público é específico o suficiente para orientar decisões.",
          "Conteúdo disponível e conteúdo faltante estão separados.",
          "Existe ao menos uma restrição real.",
          "Sucesso pode ser observado ou medido."
        ],
        "fallback": "Use um cliente fictício único para a turma e entregue as respostas em cartões sorteados.",
        "commonProblems": [
          ["Briefing vira lista de cores", "Volte ao problema e à tarefa antes da identidade visual."],
          ["Tudo é tratado como certeza", "Marque cada item com Fato, Hipótese ou Pergunta."],
          ["Escopo cresce sem limite", "Defina uma entrega mínima e uma lista “não entra agora”."]
        ]
      },
      "15": {
        "teacherGoal": "Organizar conteúdo em mapa do site e fluxo de tarefa.",
        "plainLanguage": "Arquitetura da informação decide categorias, nomes e caminhos. Sitemap mostra onde o conteúdo mora; fluxo mostra os passos de uma tarefa.",
        "say": "Sitemap responde “quais páginas existem?”. Fluxo responde “por onde a pessoa passa para conseguir algo?”.",
        "demo": [
          "Distribua cartões com conteúdos de um site fictício.",
          "Agrupe por afinidade e dê nomes que usuários reconheceriam.",
          "Desenhe o sitemap com até três níveis.",
          "Trace o fluxo da tarefa principal e conte os passos."
        ],
        "studentDeliverable": "Sitemap e fluxo principal do projeto, validados por outra dupla.",
        "check": [
          "Rótulos usam linguagem do usuário.",
          "Não há páginas duplicadas com nomes diferentes.",
          "O fluxo tem início, decisão, sucesso e saída de erro.",
          "A navegação principal não está sobrecarregada."
        ],
        "fallback": "Faça tudo com post-its ou pedaços de papel; software não é necessário.",
        "commonProblems": [
          ["Organizar pelo organograma da empresa", "Peça que um usuário externo tente encontrar uma informação."],
          ["Menu com opções demais", "Agrupe itens de baixa prioridade e destaque a tarefa principal."],
          ["Fluxo sem estado de erro", "Pergunte: “e se faltar um dado ou a ação falhar?”"]
        ]
      },
      "16": {
        "teacherGoal": "Gerar alternativas antes de escolher uma solução.",
        "plainLanguage": "Ideação separa quantidade de julgamento. Rafes são esboços rápidos para comparar estruturas, não desenhos bonitos.",
        "say": "Nos primeiros dez minutos, qualidade é quantidade. Desenho feio é permitido; ideia repetida sem variação, não.",
        "demo": [
          "Dobre uma folha em oito quadros.",
          "Defina uma única tela e uma única tarefa.",
          "Cronometre um minuto por variação.",
          "Circule padrões promissores e combine duas ideias em uma proposta."
        ],
        "studentDeliverable": "Oito rafes, seleção justificada de duas alternativas e uma versão combinada.",
        "check": [
          "As opções mudam estrutura, não apenas cor.",
          "A tarefa principal continua visível.",
          "A escolha se relaciona ao briefing.",
          "O grupo registrou o motivo de descartar alternativas."
        ],
        "fallback": "Se a turma travar, imponha variações: menu no topo/lateral, imagem grande/sem imagem, ação fixa/no fluxo.",
        "commonProblems": [
          ["Aluno detalha o primeiro desenho", "Use cronômetro e caneta; proíba borracha nesta etapa."],
          ["Alternativas quase idênticas", "Mude uma regra estrutural em cada quadro."],
          ["Escolha por votação de gosto", "Pontue cada opção contra objetivo, público e conteúdo."]
        ]
      },
      "17": {
        "teacherGoal": "Construir wireframe de baixa fidelidade para uma tela principal.",
        "plainLanguage": "Wireframe define hierarquia, conteúdo e comportamento antes de cor e acabamento. Caixas representam decisões, não decoração.",
        "say": "Se alguém comentar sobre cor, estamos cedo demais. Hoje precisamos provar que a informação está na ordem certa.",
        "demo": [
          "Configure um frame desktop simples.",
          "Crie uma escala curta de espaçamento.",
          "Desenhe cabeçalho, conteúdo principal, ação e rodapé.",
          "Use texto real curto em vez de lorem ipsum.",
          "Transforme componentes repetidos em um padrão."
        ],
        "studentDeliverable": "Wireframe desktop da página principal com conteúdo, hierarquia e estados essenciais.",
        "check": [
          "Título e ação principal aparecem sem esforço.",
          "Textos simulam o tamanho real do conteúdo.",
          "Elementos repetidos mantêm a mesma estrutura.",
          "O wireframe corresponde ao sitemap e ao briefing."
        ],
        "fallback": "Use papel A4 com moldura de navegador impressa e post-its para blocos.",
        "commonProblems": [
          ["Wireframe vira layout final", "Remova cor, imagem detalhada e tipografia decorativa."],
          ["Lorem ipsum esconde problema de conteúdo", "Use títulos e rótulos provisórios próximos do real."],
          ["Tela sem estados", "Inclua vazio, erro ou confirmação quando fizer parte da tarefa."]
        ]
      },
      "18": {
        "teacherGoal": "Adaptar a hierarquia do wireframe para celular sem apenas reduzir tudo.",
        "plainLanguage": "Responsividade é uma decisão de prioridade. No celular, elementos podem empilhar, mudar de ordem, condensar ou desaparecer se forem realmente secundários.",
        "say": "Não diminuam o desktop até caber. Perguntem o que a pessoa precisa ver e tocar primeiro com uma mão.",
        "demo": [
          "Duplique o wireframe desktop para um frame de celular.",
          "Empilhe colunas e ajuste ordem de leitura.",
          "Aumente alvos de toque e reduza densidade.",
          "Marque no protótipo o que muda entre larguras."
        ],
        "studentDeliverable": "Wireframes desktop e celular lado a lado, com anotações das mudanças responsivas.",
        "check": [
          "A ação principal continua acessível.",
          "A ordem visual acompanha a ordem de leitura.",
          "Nenhum texto foi reduzido até ficar ilegível.",
          "Mudanças estruturais estão anotadas para a implementação."
        ],
        "fallback": "Recorte os blocos do wireframe desktop e reorganize fisicamente dentro de uma moldura de celular.",
        "commonProblems": [
          ["Tudo apenas fica menor", "Reorganize colunas e reveja prioridade."],
          ["Menu mobile inventado sem necessidade", "Listo as opções e escolho a solução mais simples que comporte o conteúdo."],
          ["Conteúdo some sem justificativa", "Pergunte se ele é secundário ou se precisa ir para outra etapa."]
        ]
      },
      "19": {
        "teacherGoal": "Ligar telas em um protótipo que permita testar a tarefa principal.",
        "plainLanguage": "Protótipo navegável simula comportamento suficiente para responder perguntas antes do código. Não precisa representar cada link.",
        "say": "Prototipem o caminho crítico, não o site inteiro. O teste precisa começar, passar pelos passos e terminar.",
        "demo": [
          "Defina a tela inicial do protótipo.",
          "Crie áreas clicáveis apenas nos controles necessários.",
          "Conecte o fluxo principal e um estado de erro.",
          "Execute em modo de apresentação sem explicar.",
          "Corrija becos sem saída."
        ],
        "studentDeliverable": "Protótipo navegável do fluxo principal com início, pelo menos uma decisão e conclusão.",
        "check": [
          "A tela inicial está definida.",
          "Controles clicáveis parecem clicáveis.",
          "Existe caminho de volta quando necessário.",
          "O protótipo permite executar a tarefa sem orientação."
        ],
        "fallback": "Faça protótipo de papel: uma pessoa troca as telas enquanto outra interage.",
        "commonProblems": [
          ["Hotspots invisíveis cobrem a tela inteira", "Conecte apenas controles reais e mantenha alvos compatíveis com o desenho."],
          ["Protótipo exige explicação", "Fico em silêncio no teste; se houver bloqueio, registro como evidência."],
          ["Equipe prototipa páginas irrelevantes", "Volte à tarefa principal do briefing."]
        ]
      },
      "20": {
        "teacherGoal": "Conduzir teste simples sem ensinar ou defender o projeto.",
        "plainLanguage": "Teste de usabilidade observa comportamento. O moderador dá a missão, pede pensamento em voz alta e evita orientar.",
        "say": "Nossa pergunta não é “você gostou?”. É “você conseguiu?”. Silêncio, hesitação e caminho errado são dados.",
        "demo": [
          "Apresente uma missão curta sem dizer onde clicar.",
          "Leia um roteiro neutro e peça pensamento em voz alta.",
          "Marque sucesso, dificuldade e frase do participante.",
          "Agrupe problemas por gravidade e frequência.",
          "Escolha três ajustes para a próxima versão."
        ],
        "studentDeliverable": "Registro de três testes com evidências, prioridade dos problemas e plano de correção.",
        "check": [
          "A missão descreve objetivo, não os cliques.",
          "O moderador não conduziu o participante.",
          "Achados incluem comportamento observado.",
          "Correções são priorizadas e ligadas às evidências."
        ],
        "fallback": "Faça teste cruzado entre grupos com protótipo em papel.",
        "commonProblems": [
          ["Perguntar “você gostou?”", "Substitua por tarefa e perguntas sobre o que aconteceu."],
          ["Defender o design durante o teste", "Anote a vontade de explicar; ela costuma indicar falta de clareza."],
          ["Mudar tudo após uma opinião", "Procure padrão, gravidade e relação com a tarefa."]
        ]
      },
      "21": {
        "teacherGoal": "Derivar peças sociais coerentes do sistema visual do projeto.",
        "plainLanguage": "Uma peça social precisa comunicar uma mensagem, respeitar o contexto da plataforma e manter identidade com o site.",
        "say": "Não comecem pelo tamanho do post. Comecem pela mensagem e pela ação que a pessoa deve tomar depois de vê-lo.",
        "demo": [
          "Escolha uma mensagem única e uma chamada para ação.",
          "Crie hierarquia com título, apoio e marca.",
          "Adapte a composição para dois formatos.",
          "Teste leitura a distância e em miniatura.",
          "Registre crédito de imagem quando necessário."
        ],
        "studentDeliverable": "Conjunto de duas peças em formatos diferentes, com mensagem e identidade consistentes.",
        "check": [
          "A mensagem principal é entendida em três segundos.",
          "Texto continua legível em tela pequena.",
          "O visual conversa com o projeto web.",
          "Imagem e fonte têm uso autorizado."
        ],
        "fallback": "Use formas, texto e ícones; fotografia não é obrigatória.",
        "commonProblems": [
          ["Texto demais", "Reduza a peça ao gancho e leve detalhes para legenda ou site."],
          ["Tudo tem o mesmo peso", "Defina primeiro, segundo e terceiro nível de leitura."],
          ["A peça não se conecta ao site", "Reutilize paleta, tipografia, tom e chamada principal."]
        ]
      },
      "22": {
        "teacherGoal": "Planejar e produzir um conteúdo audiovisual curto para o ecossistema web.",
        "plainLanguage": "Vídeo para web precisa de objetivo, gancho inicial, legibilidade sem som e formato adequado à plataforma.",
        "say": "Em vídeo curto, os primeiros segundos prometem por que vale continuar. Gravem pensando no enquadramento final e incluam legenda.",
        "demo": [
          "Transforme a mensagem da peça social em roteiro de três momentos: gancho, conteúdo, ação.",
          "Desenhe três quadros de storyboard.",
          "Grave um plano estável e capte áudio perto da fonte.",
          "Monte cortes simples e legenda legível.",
          "Exporte uma versão curta para teste."
        ],
        "studentDeliverable": "Vídeo curto com roteiro, gancho, legenda e chamada para ação ligada ao projeto.",
        "check": [
          "A mensagem aparece cedo.",
          "O vídeo faz sentido sem áudio.",
          "Formato e duração combinam com o uso previsto.",
          "Imagens, música e pessoas têm autorização."
        ],
        "fallback": "Crie vídeo com imagens estáticas, texto e narração gravada no celular.",
        "commonProblems": [
          ["Áudio distante", "Aproximo o telefone ou microfone e escolho um ambiente menos ruidoso."],
          ["Legenda pequena", "Teste no celular e aumente tamanho/contraste."],
          ["Efeito demais", "Priorize corte, ritmo, áudio e clareza."]
        ]
      },
      "23": {
        "teacherGoal": "Comparar construtor de sites, CMS e código próprio e transformar métricas em decisões de melhoria.",
        "plainLanguage": "Cada forma de construir um site troca facilidade por controle. As métricas registram comportamento no site; só fazem sentido quando respondem a uma pergunta definida antes da leitura.",
        "say": "Hoje vamos comparar três caminhos de desenvolvimento e depois ler um relatório fictício. A pergunta vem antes do número: o que queremos descobrir sobre o uso do site?",
        "demo": [
          "Monte no quadro as colunas facilidade, controle, custo, manutenção e dependência da ferramenta.",
          "Compare a mesma página em construtor, CMS e código próprio sem tratar as ferramentas como equivalentes.",
          "Apresente sessões, usuários, origem, páginas vistas e conversão em um relatório fictício ou institucional.",
          "Relacione cada dado a uma pergunta sobre o site.",
          "Feche com a tabela observação → hipótese → melhoria → nova verificação."
        ],
        "studentDeliverable": "Quadro comparativo das três abordagens e três melhorias justificadas por um relatório de métricas fictício.",
        "check": [
          "As comparações distinguem facilidade, controle, custo e manutenção.",
          "Cada melhoria cita um dado específico do relatório.",
          "Correlação não foi apresentada como causa comprovada.",
          "A atividade não exige conta, rastreamento ou dado pessoal de estudante."
        ],
        "fallback": "Trabalho com capturas e relatório impresso fictício; nenhuma conta de Analytics é necessária.",
        "commonProblems": [
          ["Comparação vira disputa de marca", "Retomo os critérios do projeto e registro vantagens e limites de cada abordagem."],
          ["Número é tratado como explicação", "Separo o que o relatório mostra da hipótese sobre a causa."],
          ["Relatório termina sem decisão", "Completo a sequência dado observado → hipótese → mudança → forma de verificar."]
        ],
        "blocks": [
          {
            "mode": "orientation",
            "action": "Monto o quadro comparativo e retomo os critérios que serão usados pela turma.",
            "evidence": "Critérios de comparação definidos antes da exploração."
          },
          {
            "mode": "production",
            "action": "Acompanho a montagem da mesma página nas três abordagens e registro as diferenças observáveis.",
            "evidence": "Quadro comparativo preenchido com exemplos concretos."
          },
          {
            "mode": "orientation",
            "action": "Apresento o relatório fictício e separo dado observado de hipótese sobre a causa.",
            "evidence": "Perguntas de análise vinculadas aos dados do relatório."
          },
          {
            "mode": "production",
            "action": "Relaciono cada melhoria proposta ao dado que a justifica.",
            "evidence": "Três melhorias justificadas e forma de nova verificação."
          }
        ]
      },
      "24": {
        "teacherGoal": "Iniciar o projeto final com escopo, papéis e critérios de pronto.",
        "plainLanguage": "O projeto integrador reúne briefing, arquitetura, protótipo, código, publicação e defesa. A primeira tarefa é tornar o trabalho controlável.",
        "say": "Projeto grande fica simples quando definimos uma entrega mínima, responsáveis e a próxima evidência concreta.",
        "demo": [
          "Leia o desafio e destaque entregáveis obrigatórios.",
          "Defina a tarefa principal do usuário.",
          "Crie quadro: a fazer, fazendo, revisão, pronto.",
          "Distribua papéis com responsável e apoio.",
          "Marque o primeiro checkpoint da noite."
        ],
        "studentDeliverable": "Canvas do projeto com problema, público, escopo mínimo, papéis, riscos e cronograma.",
        "check": [
          "O escopo cabe nas aulas restantes.",
          "Cada entrega tem responsável.",
          "A tarefa principal está formulada.",
          "Riscos e dependências aparecem antes da execução."
        ],
        "fallback": "Forneça três briefings fechados e permita que as equipes escolham um.",
        "commonProblems": [
          ["Ideia grande demais", "Reduza para uma tarefa principal, uma página inicial e uma página interna."],
          ["Um aluno faz tudo", "Separe dono da tarefa e revisor; rode papéis nos checkpoints."],
          ["Equipe começa pelo logo", "Bloqueie acabamento até briefing e sitemap serem aprovados."]
        ]
      },
      "25": {
        "teacherGoal": "Transformar estrutura em protótipo coerente e testável.",
        "plainLanguage": "Nesta etapa, cada decisão precisa rastrear ao briefing: conteúdo, hierarquia, componente e caminho.",
        "say": "Antes de polir, façam o fluxo funcionar. Cada tela precisa ajudar a pessoa a dar o próximo passo.",
        "demo": [
          "Revise sitemap e conteúdo obrigatório.",
          "Monte componentes básicos antes de duplicar telas.",
          "Conecte o fluxo principal.",
          "Passe o checklist de responsividade e estados.",
          "Faça uma revisão silenciosa entre equipes."
        ],
        "studentDeliverable": "Protótipo navegável revisado, com versões desktop/mobile e componentes consistentes.",
        "check": [
          "Fluxo principal chega ao fim.",
          "Componentes repetidos são consistentes.",
          "Conteúdo real cabe no layout.",
          "Desktop e mobile preservam prioridade."
        ],
        "fallback": "Uso uma biblioteca simples de componentes e limito o protótipo a três telas.",
        "commonProblems": [
          ["Polimento sem fluxo completo", "Defina uma hora-limite para fechar navegação antes de cores."],
          ["Telas desconectadas", "Execute a missão do início ao fim no modo de apresentação."],
          ["Inconsistência", "Escolha um componente mestre e substitua cópias divergentes."]
        ]
      },
      "26": {
        "teacherGoal": "Testar o protótipo, priorizar correções e registrar decisões.",
        "plainLanguage": "A prova do projeto é a tarefa realizada por outra pessoa. Correção prioritária resolve bloqueio antes de detalhe estético.",
        "say": "Hoje vocês não apresentam; observam. O participante não erra o teste — o protótipo revela onde precisa melhorar.",
        "demo": [
          "Prepare missão e folha de observação.",
          "Troque participantes entre equipes.",
          "Registre sucesso, tempo aproximado, hesitação e fala.",
          "Classifique achados: bloqueia, atrapalha, cosmético.",
          "Corrija os dois problemas mais graves e teste novamente."
        ],
        "studentDeliverable": "Relatório curto de teste com evidências, severidade, correções e reteste.",
        "check": [
          "Participantes não eram membros da própria equipe.",
          "Evidências distinguem observação de opinião.",
          "Severidade orientou a ordem de correção.",
          "Ao menos uma correção foi retestada."
        ],
        "fallback": "Faça teste coletivo de uma equipe no projetor e use a turma como observadora.",
        "commonProblems": [
          ["Equipe ajuda o participante", "O moderador lê a missão e só responde “o que você faria se estivesse sozinho?”"],
          ["Lista enorme de detalhes", "Priorize o que impede ou compromete a tarefa."],
          ["Correção sem registro", "Antes/depois e motivo entram no relatório."]
        ],
        "blocks": [
          {
            "mode": "orientation",
            "action": "Retomo o roteiro de estudos, esclareço dúvidas finais e explico tempo e critérios sem antecipar respostas.",
            "evidence": "Avaliação identificada e condições de realização compreendidas.",
            "rescue": "Com tempo reduzido, priorizo as dúvidas recorrentes e preservo integralmente o período da prova."
          },
          {
            "mode": "assessment",
            "action": "Organizo a aplicação individual e acompanho o tempo sem interferir nas respostas.",
            "evidence": "Prova individual identificada e entregue.",
            "rescue": "Sem condições adequadas de aplicação, interrompo e sigo o protocolo institucional; não converto a prova em atividade coletiva."
          },
          {
            "mode": "testing",
            "action": "Organizo o teste cruzado, mantendo autores e participantes em silêncio durante as tarefas.",
            "evidence": "Ficha de observação preenchida com comportamento, dificuldade e resultado."
          },
          {
            "mode": "production",
            "action": "Classifico os achados por gravidade, priorizo as correções e inicio a estrutura HTML.",
            "evidence": "Prioridades registradas e primeira estrutura HTML salva.",
            "rescue": "Se o protótipo estiver atrasado, registro as prioridades e implemento apenas a estrutura inicial do escopo mínimo."
          }
        ]
      },
      "27": {
        "teacherGoal": "Implementar a versão mínima responsiva sem se perder em detalhes.",
        "plainLanguage": "A implementação segue uma ordem segura: estrutura HTML, conteúdo, layout base, componentes e responsividade.",
        "say": "Hoje o objetivo não é perfeição visual; é uma versão completa e navegável. Trabalharemos de cima para baixo e testaremos a cada seção.",
        "demo": [
          "Crie a estrutura de pastas, index.html, styles.css e a pasta de imagens.",
          "Implemente header, main e footer com conteúdo real.",
          "Adicione container e estilos globais.",
          "Construa um componente por vez.",
          "Teste a 360 px antes de avançar.",
          "Faça commit ou cópia de segurança em um ponto estável."
        ],
        "studentDeliverable": "Versão mínima navegável e responsiva, com HTML e CSS organizados.",
        "check": [
          "HTML é semântico e tem conteúdo completo.",
          "CSS começa mobile first.",
          "Não existe rolagem horizontal.",
          "Links e controles HTML funcionam com teclado.",
          "Arquivos e pastas têm nomes previsíveis."
        ],
        "fallback": "Uso o modelo-base fornecido e substituo conteúdo e tokens de estilo; não começo em branco.",
        "commonProblems": [
          ["Equipe tenta implementar todas as telas", "Congele escopo na página e tarefa principais."],
          ["CSS vira remendo", "Volte a tokens, container, componente e media query nessa ordem."],
          ["Versão para de funcionar", "Restauro a última cópia estável e reaplico uma mudança por vez."]
        ],
        "code": [
          {
            "label": "Ordem mínima dos arquivos",
            "language": "text",
            "content": "meu-projeto/\n├── index.html\n├── styles.css\n└── imagens/\n    └── capa.webp"
          }
        ]
      },
      "28": {
        "teacherGoal": "Publicar, testar em ambiente real e preparar uma apresentação objetiva.",
        "plainLanguage": "A versão publicada é o produto verificável. O ensaio deve mostrar problema, solução, evidência de teste e link funcionando.",
        "say": "A entrega não termina no botão publicar. Abram como se fossem avaliadores: janela anônima, celular, teclado e link compartilhado.",
        "demo": [
          "Execute checklist local antes da publicação.",
          "Publique e abra o link em janela anônima.",
          "Teste página inicial, navegação, formulário/ação e responsividade.",
          "Corrija bloqueios e registre limitações conhecidas.",
          "Ensaie a defesa de sete minutos com cronômetro."
        ],
        "studentDeliverable": "Site publicado, checklist assinado, QR/link de acesso e roteiro da defesa.",
        "check": [
          "Link abre sem autenticação.",
          "Site funciona em celular e desktop.",
          "Créditos e acessibilidade básica estão presentes.",
          "Defesa cabe no tempo e mostra evidências.",
          "Limitações são declaradas com honestidade."
        ],
        "fallback": "Se a publicação externa falhar, apresente por servidor local e entregue a pasta validada; registre o motivo técnico.",
        "commonProblems": [
          ["Link depende da conta do autor", "Teste em janela anônima e em outro dispositivo."],
          ["Apresentação vira leitura de telas", "Estruture em problema → decisão → teste → resultado."],
          ["Correções de última hora quebram o site", "Congelo a versão estável e só altero bloqueios comprovados."]
        ]
      },
      "29": {
        "teacherGoal": "Conduzir apresentações justas, recuperação baseada em evidência e fechamento reflexivo.",
        "plainLanguage": "A defesa avalia processo e decisões, não apenas acabamento. O grupo deve mostrar o que construiu, como testou e o que aprendeu.",
        "say": "Vocês não precisam esconder problemas. Expliquem o que foi priorizado, a evidência que guiou a escolha e o que fariam no próximo ciclo.",
        "demo": [
          "Explique critérios e tempo antes da primeira equipe.",
          "Use cronômetro visível e aviso de um minuto.",
          "Após cada defesa, faça uma pergunta sobre usuário e outra sobre decisão técnica.",
          "Registre evidências na rubrica durante a apresentação.",
          "Finalize com retrospectiva: manter, parar, começar."
        ],
        "studentDeliverable": "Defesa do site publicado, autoavaliação e registro de uma melhoria futura.",
        "check": [
          "A tarefa principal foi demonstrada ao vivo.",
          "A equipe relacionou decisões ao briefing e ao teste.",
          "Todos os integrantes participaram.",
          "Créditos, link e arquivos finais foram entregues.",
          "Feedback final indica próximo passo concreto."
        ],
        "fallback": "Se o link cair, use a versão local previamente validada ou gravação curta da navegação.",
        "commonProblems": [
          ["Estouro de tempo", "Interrompo com respeito e peço apenas resultado e aprendizado."],
          ["Demonstração falha", "Avalio as evidências e a versão de segurança; não improviso correção durante a banca."],
          ["Avaliação vira comparação estética", "Volte à rubrica: problema, fluxo, acessibilidade, implementação, teste e defesa."]
        ]
      }
    }
  },
  "producao-audiovisual": {
    "courseTips": {
      "promise": "A condução alterna referência curta, demonstração técnica, prática em equipe e conferência dos arquivos antes de desmontar o set.",
      "routine": [
        "Antes da aula, confiro baterias, cartões e espaço de armazenamento.",
        "Faço um teste de som de dez segundos e escuto com fone.",
        "Defino papéis, rodízio e tempo antes de distribuir os equipamentos.",
        "Copio os arquivos antes de editar ou formatar cartões.",
        "Mantenho uma alternativa viável com smartphone e materiais locais.",
        "Nas aulas de edição, uso DaVinci Resolve como percurso principal e trato o CapCut apenas como alternativa conceitual, sem fingir que os menus são equivalentes."
      ],
      "phases": {
        "fundamentos": {
          "lessons": ["01", "02", "03", "04", "05"],
          "routine": [
            "Antes da aula, separo os trechos curtos, as fichas e os modelos que serão projetados.",
            "Confiro a origem das mídias e o destino autorizado para cada exemplo."
          ],
          "commonProblems": [
            ["O conceito fica abstrato", "Retomo um trecho curto e relaciono uma escolha de imagem ou som ao efeito percebido."],
            ["A proposta não cabe no tempo", "Reduzo a ideia a uma ação filmável, um local disponível e uma entrega de até um minuto."],
            ["Autorização é tratada como detalhe", "Interrompo o planejamento e defino finalidade, público e prazo antes de liberar qualquer gravação."]
          ]
        },
        "captacao": {
          "lessons": ["06", "07", "08", "09"],
          "routine": [
            "Antes da prática, confiro baterias, cartões, espaço de armazenamento e rotas sem cabos soltos.",
            "Gravo um teste curto de imagem e som e só libero o set depois de ouvi-lo com fone."
          ],
          "commonProblems": [
            ["A imagem treme ou perde foco", "Retorno ao apoio de três pontos, travo foco e repito um plano curto antes da sequência."],
            ["A fala fica distante ou encoberta", "Aproximo o microfone, reduzo o ruído do ambiente e refaço o teste com fone."],
            ["O rodízio consome a aula", "Reduzo a lista aos planos essenciais, marco os papéis e uso o smartphone como segunda estação."]
          ]
        },
        "posProducao": {
          "lessons": ["10", "11", "12", "13", "14", "15", "16"],
          "routine": [
            "Antes de abrir o editor, confiro a pasta de origem, a cópia de segurança e o padrão de nomes.",
            "Salvo uma nova versão antes de cada etapa importante e testo a exportação em um trecho curto."
          ],
          "commonProblems": [
            ["O editor não encontra a mídia", "Interrompo a montagem, restauro a estrutura de pastas e religo os arquivos sem mover a origem novamente."],
            ["A prévia trava", "Reduzo a resolução de prévia e uso cache, proxy ou renderização de trecho conforme o gargalo."],
            ["O efeito domina a narrativa", "Retorno aos cortes, à clareza da voz e à continuidade antes de manter qualquer acabamento."]
          ]
        },
        "documentario": {
          "lessons": ["17", "18"],
          "routine": [
            "Antes da entrevista, confiro recorte, perguntas abertas, autorizações e alternativa sem identificação.",
            "Antes da exibição, assisto ao arquivo inteiro e verifico créditos, som e escopo de consentimento."
          ],
          "commonProblems": [
            ["A entrevista rende respostas curtas", "Reformulo a pergunta para começar por como, por que ou conte sobre e aguardo a resposta terminar."],
            ["Faltam imagens para cobrir os cortes", "Gravo ações, detalhes e ambiente ligados ao tema sem forjar acontecimentos."],
            ["O uso previsto excede a autorização", "Restrinjo a exibição ao escopo permitido e registro a pendência antes de qualquer publicação."]
          ]
        },
        "projetoIntegrador": {
          "lessons": ["19", "20", "21", "22", "23"],
          "routine": [
            "No início do bloco, confiro versão, responsável, prazo e próxima evidência de cada equipe.",
            "Antes da entrega ou mostra, testo o arquivo mestre na máquina de exibição e mantenho duas cópias locais."
          ],
          "commonProblems": [
            ["O projeto cresce além do prazo", "Preservo a narrativa central, reduzo cenas e adio acabamentos que não alteram a compreensão."],
            ["O arquivo final não abre ou perde mídia", "Retomo a última versão conferida, gero uma cópia de exibição e testo em outro computador."],
            ["A devolutiva vira comparação de gosto", "Retorno à rubrica e relaciono cada comentário a uma escolha, a um efeito e a uma evidência."]
          ]
        }
      },
      "rescue": "Com falha de equipamento ou software, reduzo a entrega para um plano estável, som compreensível e montagem simples, preservando a aprendizagem central.",
      "commonProblems": [
        ["A fala ficou distante ou encoberta", "Aproximo o microfone, reduzo o ruído do ambiente e repito um teste curto antes da tomada."],
        ["Os arquivos estão espalhados ou sem identificação", "Interrompo a edição, organizo a pasta da equipe e confiro a cópia de segurança."],
        ["O equipamento principal não está disponível", "Reorganizo o rodízio e mantenho a mesma intenção de linguagem com smartphone."],
        ["O efeito chama mais atenção que a história", "Retorno ao corte, à clareza do áudio e à continuidade antes de acrescentar acabamento."]
      ]
    },
    "lessons": {
      "01": {
        "teacherGoal": "Apresentar a UC como uma pequena produtora e criar vocabulário comum.",
        "plainLanguage": "Audiovisual combina imagem, som, tempo e intenção. Cada escolha muda o que o público percebe.",
        "say": "Não precisamos começar com equipamento caro; precisamos começar sabendo o que queremos comunicar.",
        "demo": ["Exiba três trechos curtos sem revelar o gênero.", "Pergunte o que imagem, som e montagem fizeram o público sentir.", "Apresente o mapa da UC do roteiro à mostra."],
        "studentDeliverable": "Ficha de leitura de um trecho audiovisual e plano de 15 segundos gravado em equipe.",
        "check": ["Identificou intenção, imagem, som e público.", "Distinguiu observação de gosto pessoal.", "O plano curto tem começo, ação legível e encerramento.", "O arquivo foi conferido e salvo."],
        "fallback": "Uso comerciais salvos localmente ou gravo um plano curto na própria sala."
      },
      "02": {
        "teacherGoal": "Reconhecer planos, ângulos, movimentos e efeito da montagem.",
        "plainLanguage": "Plano define quanto vemos; ângulo muda a relação; montagem cria sentido pela ordem.",
        "say": "Antes de dizer o nome técnico, descrevam o que entrou no quadro e o efeito produzido.",
        "demo": ["Grave o mesmo sujeito em plano geral, médio e detalhe.", "Monte dois planos em ordens diferentes.", "Compare o sentido criado."],
        "studentDeliverable": "História curta em cinco planos, com plano e intenção anotados.",
        "check": ["Os cinco planos variam de propósito.", "A ordem permite compreender a ação.", "Enquadramentos não cortam informação essencial.", "O arquivo final foi conferido com som."],
        "fallback": "Faça com fotografias sequenciais no lugar de vídeo."
      },
      "03": {
        "teacherGoal": "Distinguir pré-produção, produção e pós-produção.",
        "plainLanguage": "Pré resolve no papel, produção captura e pós organiza/transforma o material.",
        "say": "Um minuto resolvido no papel economiza muitos minutos no set e horas na edição.",
        "demo": ["Entregue tarefas misturadas em cartões.", "A turma classifica nas três etapas.", "Monte um cronograma simples com dependências."],
        "studentDeliverable": "Fluxo de produção e papéis do microcurta.",
        "check": ["Tarefas estão na etapa correta.", "Há responsável e prazo."],
        "fallback": "Use um vídeo fictício de 30 segundos como projeto comum."
      },
      "04": {
        "teacherGoal": "Converter ideia em roteiro filmável e storyboard.",
        "plainLanguage": "Roteiro descreve ação e som; storyboard antecipa enquadramento e continuidade.",
        "say": "Escrevam o que a câmera pode ver e o microfone pode ouvir.",
        "demo": ["Transforme uma ideia abstrata em ação visível.", "Escreva cabeçalho de cena, ação e fala.", "Desenhe três quadros com plano e movimento."],
        "studentDeliverable": "Roteiro de até um minuto e storyboard correspondente.",
        "check": ["É filmável no tempo e recursos disponíveis.", "Storyboard corresponde ao roteiro."],
        "fallback": "Forneço um roteiro incompleto e peço apenas finalização e storyboard."
      },
      "05": {
        "teacherGoal": "Trabalhar direito de imagem, licença e conduta no set.",
        "plainLanguage": "Ter acesso a uma imagem não significa ter autorização para publicá-la.",
        "say": "Antes do REC, confirmamos quem pode aparecer, onde o vídeo será usado e por quanto tempo.",
        "demo": ["Compare quatro destinos possíveis: exercício, exibição interna, mostra com convidados e publicação online.", "Leia um modelo institucional previamente aprovado.", "Simule uma abordagem respeitosa e a possibilidade real de recusa.", "Registre licenças de música, imagem e fonte em uma planilha."],
        "studentDeliverable": "Checklist ético preenchido e recursos licenciados registrados; autorizações usam o modelo institucional da escola.",
        "check": ["Finalidade, público e prazo de uso estão claros.", "Participação é voluntária e documentada.", "Para menores, a escola definiu a necessidade de responsável legal.", "Sem autorização específica, o destino fica restrito ao escopo permitido."],
        "fallback": "Gravo objetos, espaços vazios, mãos sem identificação ou integrantes com autorização válida para o destino previsto."
      },
      "06": {
        "teacherGoal": "Operar câmera ou smartphone com estabilidade, foco e exposição.",
        "plainLanguage": "Imagem utilizável depende de estabilidade, foco no assunto e exposição controlada.",
        "say": "Antes de gravar, parem por três segundos: limpem a lente, confiram foco, enquadramento e som.",
        "demo": ["Mostre apoio de três pontos.", "Trave foco/exposição no smartphone.", "Grave movimento com início e fim estáveis."],
        "studentDeliverable": "Sequência técnica de planos estáveis.",
        "check": ["Assunto está em foco.", "Movimento tem intenção e duração útil."],
        "fallback": "Use pilha de livros como apoio e câmera do celular."
      },
      "07": {
        "teacherGoal": "Montar luz simples que favoreça narrativa e rosto.",
        "plainLanguage": "Direção, qualidade e contraste da luz importam mais que quantidade de equipamentos.",
        "say": "Movam primeiro a luz; só depois adicionem outra.",
        "demo": ["Compare luz frontal, lateral e contraluz.", "Suavize com difusão segura.", "Rebata luz com superfície branca."],
        "studentDeliverable": "Três retratos ou planos com esquemas de luz anotados.",
        "check": ["Rosto está exposto.", "Luz escolhida combina com intenção."],
        "fallback": "Use janela, luminária e cartolina branca."
      },
      "08": {
        "teacherGoal": "Captar som compreensível e gravar o microcurta.",
        "plainLanguage": "O melhor microfone é o que fica próximo da fonte sem entrar no quadro.",
        "say": "Gravem dez segundos e ouçam antes da cena inteira.",
        "demo": ["Compare o microfone perto e longe da fonte.", "Identifique ruídos contínuos e intermitentes do ambiente.", "Faça a claquete e grave trinta segundos de som ambiente, chamado room tone.", "Escute cada tomada com fone antes de desmontar o set."],
        "studentDeliverable": "Material bruto da diária do microcurta, com som conferido e som ambiente gravado.",
        "check": ["A fala é compreensível sem elevar demais o volume.", "O som ambiente foi gravado no mesmo local.", "Arquivos foram nomeados e copiados.", "Existe uma tomada de segurança das falas essenciais."],
        "fallback": "Grave voz separada em local silencioso e use como narração."
      },
      "09": {
        "teacherGoal": "Executar um comercial curto com set organizado.",
        "plainLanguage": "Set eficiente depende de plano de filmagem, papéis e conferência de cada tomada.",
        "say": "Ninguém grava até direção, câmera, luz, som e produção confirmarem que estão prontos.",
        "demo": ["Faça reunião de um minuto.", "Execute chamada de set.", "Revise tomada antes de desmontar a luz."],
        "studentDeliverable": "Material bruto de comercial com plano mestre e detalhes.",
        "check": ["Mensagem e produto aparecem.", "Equipe cumpriu papéis e cronograma."],
        "fallback": "Comercial de objeto disponível na sala, sem atores."
      },
      "10": {
        "teacherGoal": "Importar, organizar e montar primeiros cortes.",
        "plainLanguage": "Edição começa na organização: pastas do projeto e pastas internas do editor, chamadas bins no DaVinci Resolve, vêm antes de seleção, sequência e efeitos.",
        "say": "Primeiro contem a história com cortes secos; transições vêm depois, se forem necessárias.",
        "demo": ["No DaVinci Resolve, crie pastas internas (bins) para vídeo, áudio, imagens e versões.", "Assista e marque as tomadas do comercial.", "Monte o plano geral e os detalhes com cortes secos.", "Salve uma nova versão sem mover os arquivos de origem."],
        "studentDeliverable": "Corte bruto do comercial de 30 segundos.",
        "check": ["O projeto encontra todos os arquivos.", "A mensagem é compreensível sem efeitos.", "A duração respeita o limite do comercial.", "A nova versão não sobrescreveu a anterior."],
        "fallback": "No CapCut, reproduzo os mesmos conceitos de importação, seleção, cortes e versionamento, sem tratar os menus como equivalentes aos do DaVinci Resolve."
      },
      "11": {
        "teacherGoal": "Aplicar transições e keyframes com propósito.",
        "plainLanguage": "Corte é padrão; transição sinaliza relação. Keyframe registra mudança ao longo do tempo.",
        "say": "Se a transição chama mais atenção que a história, provavelmente está sobrando.",
        "demo": ["Compare corte, fusão e transição chamativa.", "Anime posição e opacidade com dois keyframes.", "Ajuste duração."],
        "studentDeliverable": "Sequência com uma transição justificada e animação simples.",
        "check": ["Efeito apoia narrativa.", "Movimento começa e termina suavemente."],
        "fallback": "Trabalhe apenas opacidade e escala em uma imagem."
      },
      "12": {
        "teacherGoal": "Criar grafismos e máscaras legíveis.",
        "plainLanguage": "Texto em vídeo precisa de hierarquia, contraste, tempo de leitura e margem segura. Legenda de acessibilidade também exige sincronização, identificação de falante quando necessária e indicação de sons relevantes.",
        "say": "Pausem o vídeo e testem: o texto é lido antes de o plano mudar?",
        "demo": ["Crie uma tarja de identificação, também chamada lower third.", "Aplique margem segura e confira em tela pequena.", "Revise sincronização, falante e sons relevantes nas legendas.", "Faça uma máscara simples revelar a imagem."],
        "studentDeliverable": "Título, tarja de identificação, legenda revisada e máscara aplicados.",
        "check": ["O texto permanece legível durante todo o tempo de exibição.", "A legenda está sincronizada e revisada.", "Sons necessários para compreensão foram indicados.", "O grafismo mantém alinhamento e identidade."],
        "fallback": "Use fundo sólido e tipografia simples; legibilidade vem primeiro."
      },
      "13": {
        "teacherGoal": "Aplicar chroma key básico e correção de cor coerente.",
        "plainLanguage": "Chroma funciona com fundo uniforme e separado do sujeito; correção busca consistência antes de estilo.",
        "say": "Primeiro neutralizamos e igualamos os planos; depois definimos o tratamento visual.",
        "demo": ["Mostre o fundo uniforme, sem dobras marcadas, com distância segura entre pessoa e tecido.", "Aplique a chave de chroma e limpe as bordas sem recortar partes do sujeito.", "Ajuste exposição e balanço entre dois planos.", "Confira cabos, tripés e luminárias antes de liberar o rodízio."],
        "studentDeliverable": "Composição simples em chroma e dois planos corrigidos.",
        "check": ["Bordas estão aceitáveis.", "Cor de pele/objeto é coerente entre planos."],
        "fallback": "Uso material de chroma preparado com cenário próprio ou licenciado e concentro a atividade no software."
      },
      "14": {
        "teacherGoal": "Equilibrar voz, música e efeitos e distinguir reprodução em rede de processamento dentro do editor.",
        "plainLanguage": "Mixagem cria prioridade. Buffering é a espera para carregar uma reprodução em rede; dentro do editor, travamentos de pré-visualização são tratados com resolução de preview, cache, arquivos proxy ou renderização de trecho.",
        "say": "A voz é a referência. Música e efeitos entram ao redor dela.",
        "demo": ["Ajuste o ganho da voz sem distorção.", "Abaixe a música durante a fala.", "Crie entradas e saídas graduais, chamadas fade.", "Compare buffering de um vídeo online com cache, proxy e render de trecho dentro do editor."],
        "studentDeliverable": "Cena mixada sem distorção e quadro comparativo entre buffering, cache, proxy e render de trecho.",
        "check": ["A fala permanece clara.", "Entradas e saídas de áudio não cortam abruptamente.", "Buffering não foi confundido com cache ou proxy.", "A equipe sabe escolher uma solução para pré-visualização travada."],
        "fallback": "Use apenas voz e uma trilha local curta."
      },
      "15": {
        "teacherGoal": "Organizar a composição, a biblioteca e a vinheta da mostra.",
        "plainLanguage": "Nesta aula, blocagem organiza posição, duração e agrupamento dos elementos na composição. Pastas, nomes de arquivo e bins organizam a mídia; são tarefas relacionadas, mas não são a mesma coisa.",
        "say": "Nomeiem antes de duplicar. Um projeto organizado é mais rápido de corrigir.",
        "demo": ["Agrupe elementos por função na composição.", "Crie padrão de nomes para mídia, trilhas e versões.", "Salve um componente reutilizável na biblioteca.", "Monte a vinheta de dez segundos e salve uma versão incremental."],
        "studentDeliverable": "Vinheta de dez segundos, composição organizada e biblioteca mínima.",
        "check": ["Camadas e arquivos têm nomes claros.", "Elementos repetidos são consistentes.", "A vinheta tem exatamente dez segundos.", "A versão entregue abre sem mídia ausente."],
        "fallback": "Faça organização em pastas do sistema mesmo que o editor não tenha biblioteca."
      },
      "16": {
        "teacherGoal": "Exportar corretamente e exibir o microcurta.",
        "plainLanguage": "Render transforma o projeto em arquivo final. MP4 e MOV são contêineres; H.264 e H.265 são codecs. Resolução, taxa de quadros, áudio e taxa de bits precisam combinar com o destino.",
        "say": "Nunca entreguem um render sem assistir do início ao fim.",
        "demo": ["Separe contêiner, codec, resolução, taxa de quadros e áudio.", "Defina o padrão de nome antes de exportar.", "Renderize um trecho de teste.", "Assista do início ao fim em outro dispositivo."],
        "studentDeliverable": "Microcurta exportado e conferido.",
        "check": ["Imagem e som estão sincronizados.", "Arquivo abre fora do editor."],
        "fallback": "Reduza resolução para garantir entrega estável."
      },
      "17": {
        "teacherGoal": "Planejar e gravar mini-documentário.",
        "plainLanguage": "Documentário organiza pesquisa, ponto de vista, entrevista e imagens de cobertura com transparência, apuração e responsabilidade na representação.",
        "say": "Pergunta aberta convida história; pergunta de sim ou não encerra rápido.",
        "demo": ["Escreva pauta e recorte.", "Treine pergunta aberta.", "Grave entrevista e imagens de cobertura."],
        "studentDeliverable": "Pauta, entrevista e cobertura do minidocumentário.",
        "check": ["O recorte e o ponto de vista estão claros.", "Perguntas não induzem a resposta.", "Há imagem suficiente para cobrir cortes.", "O destino da gravação está dentro da autorização obtida."],
        "fallback": "Faça perfil de um colega ou espaço da escola."
      },
      "18": {
        "teacherGoal": "Aplicar avaliação e mostrar mini-documentários.",
        "plainLanguage": "A avaliação verifica decisões do processo; a mostra compartilha resultados e feedback.",
        "say": "Na defesa, expliquem uma escolha de linguagem e uma decisão técnica.",
        "demo": ["Revise os critérios sem antecipar respostas da prova.", "Organize a aplicação individual e a conferência posterior.", "Feche o corte dos mini-documentários.", "Modele uma devolutiva baseada em escolha e efeito."],
        "studentDeliverable": "Prova e minidocumentário apresentado.",
        "check": ["A avaliação foi identificada e entregue.", "O arquivo abre e tem créditos.", "A equipe relaciona escolha e efeito.", "A exibição respeita o escopo de autorização."],
        "fallback": "Exibo a versão de trabalho apenas no escopo autorizado e registro as pendências.",
        "blocks": [
          {
            "mode": "orientation",
            "action": "Conduzo a revisão por perguntas curtas e explico tempo e critérios da avaliação.",
            "evidence": "Dúvidas finais registradas sem antecipação de respostas.",
            "rescue": "Com tempo reduzido, concentro a revisão nas dúvidas recorrentes e preservo integralmente o período da prova."
          },
          {
            "mode": "assessment",
            "action": "Organizo a prova individual e acompanho o tempo sem interferir nas respostas.",
            "evidence": "Prova individual identificada e entregue.",
            "rescue": "Sem condições adequadas de aplicação, interrompo e sigo o protocolo institucional; não transformo a prova em atividade coletiva."
          },
          {
            "mode": "production",
            "action": "Conduzo a conferência pelo gabarito e libero a conclusão do corte do mini-documentário.",
            "evidence": "Dúvidas anotadas e nova versão do corte salva.",
            "rescue": "Se a edição atrasar, preservo um corte simples, com narrativa compreensível, som audível e créditos."
          },
          {
            "mode": "presentation",
            "action": "Organizo a exibição com tempo definido e uma devolutiva objetiva por equipe.",
            "evidence": "Arquivo exibido, créditos conferidos e devolutiva registrada.",
            "rescue": "Com falha de projeção, recolho os arquivos validados e remarco apenas a exibição, sem alterar a avaliação já realizada."
          }
        ]
      },
      "19": {
        "teacherGoal": "Fechar a pré-produção do projeto final.",
        "plainLanguage": "O dossiê reúne pauta, roteiro, storyboard, cronograma, papéis e autorizações.",
        "say": "Nada vai para o set sem roteiro possível, plano de gravação e consentimento.",
        "demo": ["Reviso os entregáveis.", "Confiro a locação e os riscos.", "Ordeno o plano de filmagem por eficiência."],
        "studentDeliverable": "Dossiê de pré-produção aprovado.",
        "check": ["Escopo cabe nas diárias.", "Papéis, locações e autorizações estão definidos."],
        "fallback": "Reduza para uma locação e até dois participantes."
      },
      "20": {
        "teacherGoal": "Executar gravação principal com controle de set.",
        "plainLanguage": "A diária precisa cobrir roteiro, som, continuidade e segurança dos arquivos.",
        "say": "Antes de mudar cenário, confiram se temos plano mestre, detalhes, som e tomada de segurança.",
        "demo": ["Briefing de segurança.", "Chamada de set.", "Conferência e backup por bloco."],
        "studentDeliverable": "Diária principal conferida, registrada e copiada em dois locais.",
        "check": ["Planos essenciais foram cobertos.", "Som e continuidade foram conferidos antes de desmontar.", "Os arquivos seguem o padrão de nomes.", "Backup existe em local separado."],
        "fallback": "Priorize cenas essenciais e simplifique movimentos."
      },
      "21": {
        "teacherGoal": "Identificar lacunas, regravar e fechar primeiro corte.",
        "plainLanguage": "Primeiro corte revela o que falta; regravação deve resolver problemas concretos.",
        "say": "Não regravem por ansiedade. Listem o problema e o plano exato que o resolve.",
        "demo": ["Assista ao corte sem parar.", "Marque lacunas ligadas a um problema observável.", "Crie uma lista objetiva de planos adicionais ou regravações, chamados pickups.", "Integre os novos planos e revise a continuidade."],
        "studentDeliverable": "Primeiro corte completo e regravações incorporadas.",
        "check": ["História é compreensível.", "Regravações têm justificativa."],
        "fallback": "Resolva lacunas com cobertura, cartela ou narração quando adequado."
      },
      "22": {
        "teacherGoal": "Finalizar cor, áudio, grafismos, créditos e ensaiar.",
        "plainLanguage": "Finalização começa com a montagem travada, chamada picture lock, e termina em um arquivo final de exibição, chamado master. O ensaio verifica tempo, arquivo e participação da equipe.",
        "say": "Congelem a montagem antes de polir. Depois façam cor, áudio, grafismos, créditos e exportação nessa ordem.",
        "demo": ["Confirme o corte fechado (picture lock): nenhuma mudança estrutural depois deste ponto.", "Faça o passe técnico de cor, áudio, grafismos, legendas e créditos.", "Exporte um arquivo de teste em MP4/H.264, 1920×1080, taxa de quadros igual à captação e áudio AAC 48 kHz.", "Ensaie a defesa com cronômetro e participação definida."],
        "studentDeliverable": "Arquivo mestre final (master), cópia de segurança e apresentação ensaiada.",
        "check": ["Créditos e autorizações correspondem ao destino da exibição.", "Legendas foram revisadas.", "O arquivo foi assistido integralmente fora do editor.", "Nome, resolução, taxa de quadros e áudio seguem o padrão combinado."],
        "fallback": "Priorize som claro, cortes limpos e créditos; efeitos são opcionais.",
        "blocks": [
          {
            "mode": "orientation",
            "action": "Confirmo o corte fechado e confiro créditos, autorizações e direitos de uso.",
            "evidence": "Checklist de finalização preenchido antes do refino."
          },
          {
            "mode": "production",
            "action": "Faço o passe técnico de cor, áudio, grafismos, legendas e créditos.",
            "evidence": "Versão final salva com legendas e créditos revisados."
          },
          {
            "mode": "production",
            "action": "Exporto um arquivo de teste e confiro imagem e som fora do editor.",
            "evidence": "Arquivo de teste assistido integralmente em outro reprodutor."
          },
          {
            "mode": "presentation",
            "action": "Conduzo o ensaio cronometrado e registro o ajuste necessário para a mostra.",
            "evidence": "Apresentação ensaiada, arquivo mestre e cópia de segurança conferidos."
          }
        ]
      },
      "23": {
        "teacherGoal": "Conduzir mostra final e avaliação do processo.",
        "plainLanguage": "A mostra celebra o produto e torna visível o processo profissional.",
        "say": "Apresentem objetivo, público, uma decisão criativa, um desafio técnico e o resultado.",
        "demo": ["Teste a sequência de exibição e o áudio com arquivos locais.", "Explique a rubrica e o limite de tempo antes da primeira equipe.", "Controle apresentação, exibição e devolutiva com cronômetro visível.", "Conduza a retrospectiva após todos os arquivos previstos."],
        "studentDeliverable": "Vídeo final exibido, defesa e autoavaliação.",
        "check": ["Arquivo e backup abrem.", "A exibição respeita o escopo de consentimento de cada projeto.", "Apresentação e vídeo cabem no tempo reservado.", "Todos participam e respondem sobre o processo."],
        "fallback": "Uso cópia local e ordem impressa; sem autorização específica para convidados ou internet, mantenho a exibição restrita à turma."
      }
    }
  }
};
