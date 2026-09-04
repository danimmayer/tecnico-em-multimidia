import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const designPlanningPath = process.argv[2] || '/Users/danielmmayer/Downloads/Planejamento_Geral_UC_Design_Web.md';
const designTeachingPath = process.argv[3] || '/Users/danielmmayer/Downloads/Plano_de_Ensino_UC_Design_Web.md';

const commonObservation = 'Chamada realizada no início de cada bloco. Lanche de 20 min após o 1º bloco (incluído no intervalo entre blocos).';

const revisedLessons = {
  '01': {
    title: 'Primeiro Contato com Design Web',
    description: 'Uma introdução ao design de experiências digitais: o que é, onde aparece e como perceber se uma interface ajuda ou atrapalha pessoas.',
    objectives: ['Internet: história.', 'Interfaces Web e App: conceitos introdutórios.', 'Posturas profissionais: disciplina, cooperação e respeito.'],
    technical: ['Analisar usabilidade e navegabilidade do projeto.'],
    socio: [
      'Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.',
      'Demonstrar postura conciliadora, respeitando diferenças culturais, étnicas, religiosas e de gênero na conduta pessoal e profissional.'
    ],
    blocks: [
      'Boas-vindas e conversa "Quantas telas já ajudaram você hoje?". A turma conhece a proposta da UC, os combinados e a diferença entre usar uma interface e observá-la como designer. Não há apresentação de produto final nem programação.',
      'Viagem visual pela história da web: do primeiro site às experiências móveis atuais. Em duplas, ordenar cartões de quatro épocas e associar cada época a uma mudança no modo de acessar, ler, compartilhar ou comprar.',
      'O que o designer web decide: conteúdo, hierarquia visual, navegação, feedback, adaptação a telas e acessibilidade. Demonstração guiada da mesma tarefa em duas interfaces preparadas.',
      'Desafio "Primeiro olhar de designer": em trios, comparar duas interfaces com uma missão clara, registrar três acertos, três problemas e uma melhoria, compartilhar por critérios e concluir com bilhete de saída.'
    ],
    methodology: 'Acolhida dialogada, exemplos do cotidiano, linha do tempo visual, demonstração comparativa e desafio guiado em trios.',
    resources: 'Slides locais, duas interfaces ou capturas preparadas, cartões da linha do tempo, ficha da Aula 01, papel, canetas, projetor e smartphones ou computadores.'
  },
  '03': {
    title: 'Anatomia Visual de uma Página',
    description: 'Reconhecimento simples da estrutura visual de uma página e criação individual de uma nova página de tema livre, sem escrever código.',
    objectives: ['Criação de código de texto: estrutura do documento, elementos, editores e navegadores.'],
    technical: [
      'Aplicar linguagem html (hypertext markup language) para desenvolvimento de design web.',
      'Selecionar software, aplicativos e plugins necessários para a criação dos projetos de design web.'
    ],
    socio: ['Aplicar os princípios de organização no seu posto trabalho.'],
    blocks: [
      'Retomar a página Mostra Criativa feita na Aula 01, no caderno ou em ferramenta visual. Em um exemplo projetado, localizar título, informações e botão e relacionar essas partes à estrutura simples de uma página. Em seguida, cada aluno escolhe livremente o tema de uma nova página individual.',
      'Cada aluno escolhe Excalidraw, diagrams.net ou LibreOffice Draw/Impress e cria uma nova página com o tema que escolheu. Monta título, frase curta, duas ou três informações e um botão.',
      'Melhorar somente três pontos da nova página: título visto primeiro, informações importantes juntas e botão fácil de encontrar. Sem adicionar outras páginas ou pesquisar imagens.',
      'Até 21:55, outro aluno observa a página por cinco segundos e responde sobre o que ela é, qual informação aparece primeiro e onde clicaria; depois há ajuste e salvamento individuais. Das 21:55 às 22:07, a turma faz uma síntese rápida das melhorias.'
    ],
    times: ['19:00 - 19:45', '20:05 - 20:35', '20:35 - 21:25', '21:25 - 22:07'],
    methodology: 'Retomada de exemplo projetado, reconhecimento simples da estrutura, produção individual com tema livre, melhoria orientada de três pontos e teste rápido por um colega.',
    resources: 'Computadores, projetor e uma ferramenta gratuita à escolha: Excalidraw, diagrams.net ou LibreOffice Draw/Impress. Caderno e caneta são o plano B sem internet. Sem impressão e sem pesquisa de imagens.',
    observation: 'A Aula 02 não aconteceu porque o encontro foi cedido para outra atividade. Esta Aula 03 usa a página Mostra Criativa da Aula 01 como exemplo, mas a nova página tem tema livre. Aula planejada de 19:00 a 22:07, com lanche de 19:45 a 20:05 e chamada no início dos quatro blocos: 19:00, 20:05, 20:35 e 21:25.'
  },
  '04': {
    title: 'Conteúdo, Links e Caminhos',
    description: 'Planejamento de conteúdo e navegação por meio de mapas, cartões e microtextos que orientam o usuário.',
    objectives: ['Criação de código de texto: tags, links e elementos.', 'Ferramentas para gestão eficaz do tempo: planejamento e controle de prazos.'],
    technical: ['Aplicar linguagem html (hypertext markup language) para desenvolvimento de design web.', 'Analisar usabilidade e navegabilidade do projeto.'],
    socio: [
      'Aplicar os fundamentos da gestão do tempo para controle das atividades sob sua responsabilidade.',
      'Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados.'
    ],
    blocks: [
      'Retomada da página individual criada na Aula 03. Jogo "Para onde isso leva?": a turma associa os botões dessas páginas a destinos possíveis e identifica nomes vagos, enganosos ou repetidos.',
      'Mapa de navegação com barbante e cartões: em grupos, organizar início, serviços, galeria, sobre e contato; ligar os caminhos e testar se uma pessoa chega ao objetivo em até três passos.',
      'Oficina de microtexto: escrever títulos, chamadas e botões claros para um negócio fictício. Comparar "clique aqui" com ações específicas como "ver cardápio" e "reservar horário".',
      'Montagem visual de três telas conectadas — início, detalhe e contato — em papel ou ferramenta visual. Cada equipe registra o cronograma de melhoria e testa o caminho com outra equipe.'
    ],
    methodology: 'Jogo de associação, mapa físico de navegação, escrita curta e teste cruzado entre equipes.',
    resources: 'Cartões, barbante, post-its, papel, canetas, projetor e ferramenta visual disponível.'
  },
  '05': {
    title: "Imagens, Texto e Direitos de Uso",
    description: "Escolher imagens que podem ser usadas, escrever o texto que as descreve e montar um painel com crédito e botão.",
    objectives: ["Pesquisa: propriedade intelectual, tipos e fontes.","Criação de código de texto: elementos e alternativas textuais."],
    technical: ["Selecionar a criação de elementos gráficos para o desenvolvimento de design web, interfaces e redes sociais, tendo vista a propriedade.","Identificar padrões, normas e procedimentos para elaboração do projeto de mídias digitais, referentes a propriedade intelectual, acessibilidade, usabilidade e sustentabilidade."],
    socio: ["Reconhecer a pesquisa como fonte de inovação e formação de um espírito empreendedor."],
    blocks: ["Copiar no caderno os quatro dados de uma imagem, jogar Pode usar ou não? com seis situações projetadas e ver o painel pronto do Café da Esquina.","Em duplas, escolher duas imagens permitidas do banco projetado e copiar autor, fonte, licença e para que serve de cada uma.","Escrever uma frase por imagem com o molde objeto + lugar, testar tapando o cartão e ajustar com a dupla vizinha.","Montar o painel no caderno com título, texto, imagem, crédito e botão; conferir o checklist projetado; fechar com uma frase de saída."],
    times: ["19:00 - 19:45","20:05 - 20:50","20:50 - 21:30","21:30 - 22:07"],
    methodology: "Tudo no projetor: modelo, jogo, banco, molde, painel e checklist. A turma só copia, decide e escreve no caderno.",
    resources: "Projetor, caderno e caneta. Todo o material da noite está nos slides: situações, banco de imagens, exemplos e checklist. Sem impressão e sem site externo.",
    observation: "Design Web apenas. Começa às 19:00, lanche das 19:45 às 20:05 e termina às 22:07. Chamada às 19:00, 20:05, 20:50 e 21:30. Nada impresso e nada de Produção Audiovisual."
  },
  '06': {
    title: 'Identidade Visual para Telas',
    description: 'Escolher três palavras de personalidade, montar paleta e par de letras, testar se dá para ler e desenhar o painel de estilo no caderno.',
    objectives: ['Desenvolvimento do Projeto: equilíbrio visual.', 'Criação de código de texto: folha de estilos em cascata como referência de bastidor.'],
    technical: ['Aplicar estilos css (cascading style sheets) para desenvolvimento de design web.', 'Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.'],
    socio: ['Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.'],
    blocks: [
      'Comparar a mesma frase em três estilos projetados, copiar no caderno o kit de identidade com quatro campos, julgar quatro combinações de cor no jogo Dá para ler? e ver o kit pronto do Café da Esquina.',
      'Em duplas, escolher uma das quatro marcas projetadas, escrever três palavras de personalidade e montar a paleta com papel de fundo, texto e destaque.',
      'Escolher o par de letras do banco projetado, escrever o nome da marca imitando a letra do título e testar o contraste entre a cor do texto e a cor do fundo.',
      'Montar o painel de estilo no caderno com marca, palavras, cores, letras, botão e mini-painel; trocar com a dupla vizinha na batalha de identidade; fechar com uma frase de saída.'
    ],
    times: ['19:00 - 19:45', '20:05 - 20:50', '20:50 - 21:30', '21:30 - 22:07'],
    methodology: 'Tudo no projetor: comparação de estilos, kit de quatro campos, jogo de contraste, bancos de marca, cor e letra, painel e checklist. A turma decide, justifica e escreve no caderno.',
    resources: 'Projetor, caderno e caneta. Todo o material da noite está nos slides: estilos comparados, marcas, paletas, pares de letras e checklist. Sem impressão, sem site externo e sem programa de design.',
    observation: 'Design Web apenas. Começa às 19:00, lanche das 19:45 às 20:05 e termina às 22:07. Chamada às 19:00, 20:05, 20:50 e 21:30. Nada impresso e nada de Produção Audiovisual.'
  },
  '07': {
    title: 'Espaço, Proximidade e Alinhamento',
    description: 'Composição gráfica para organizar informação e criar ritmo visual sem depender de comandos técnicos.',
    objectives: ['Desenvolvimento do Projeto: equilíbrio visual e leiaute.'],
    technical: ['Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.', 'Aplicar estilos css (cascading style sheets) para desenvolvimento de design web.'],
    socio: ['Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.'],
    blocks: [
      'Desafio projetado "Ache a bagunça": a turma encontra desalinhamentos, espaços inconsistentes e grupos confusos em uma composição propositalmente ruim.',
      'Demonstração com blocos móveis: margem externa, respiro interno, repetição e eixo de alinhamento são visualizados com cartões coloridos, sem fórmulas ou sintaxe.',
      'Oficina "Conserte a bagunça": duplas reorganizam a peça fornecida em papel ou ferramenta visual usando uma escala pequena, média e grande de espaçamento.',
      'Revisão cruzada com régua visual: cada dupla verifica eixos, proximidade, repetição e legibilidade da composição vizinha; ajustes e registro de antes/depois.'
    ],
    methodology: 'Diagnóstico visual, modelagem com objetos, oficina de composição e revisão por critérios.',
    resources: 'Peças impressas, cartões, réguas, papel, ferramenta visual disponível e projetor.'
  },
  '08': {
    title: 'Grades e Sistemas Visuais',
    description: 'Uso de grades, colunas e componentes para criar famílias coerentes de páginas e postagens.',
    objectives: ['Desenvolvimento do Projeto: leiaute, templates e equilíbrio visual.'],
    technical: ['Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.', 'Aplicar estilos css (cascading style sheets) para desenvolvimento de design web.'],
    socio: ['Demonstrar espírito colaborativo em atividades coletivas.'],
    blocks: [
      'Aquecimento "Que grade existe aqui?": sobreposições transparentes revelam colunas e alinhamentos em portal, streaming, loja e feed de rede social.',
      'Montagem física de grade: grupos recebem uma base de 6 ou 12 colunas e cartões de conteúdo. Precisam montar capa, lista de serviços e chamada principal sem romper os eixos.',
      'Sistema de componentes: criar visualmente um botão, um cartão e um cabeçalho; depois repetir os componentes em duas telas e duas peças sociais mantendo consistência.',
      'Desafio "Uma marca, quatro formatos": adaptar o mesmo sistema para desktop, celular, post quadrado e story. Exposição com justificativa das mudanças.'
    ],
    methodology: 'Leitura de referências, montagem modular, criação de componentes e adaptação multiformato.',
    resources: 'Grades impressas, acetatos, cartões de conteúdo, ferramenta visual e projetor.'
  },
  '09': {
    title: 'Design Responsivo sem Mistério',
    description: 'Adaptação visual de conteúdo para celular, tablet e computador com prioridade e legibilidade.',
    objectives: ['Interfaces Web e App: design responsivo.', 'Plataformas de Desenvolvimento: dispositivos.'],
    technical: ['Aplicar estilos css (cascading style sheets) para desenvolvimento de design web.', 'Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.'],
    socio: ['Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados.'],
    blocks: [
      'Comparação guiada do mesmo serviço em celular e computador. A turma marca o que some, muda de ordem, cresce, empilha ou vira menu.',
      'Jogo "Mala pequena": cada grupo recebe conteúdo demais e precisa escolher o essencial para a primeira tela do celular, justificando cada corte e prioridade.',
      'Oficina "Três telas": adaptar uma composição pronta para celular, tablet e desktop em papel ou ferramenta visual, preservando identidade e ação principal.',
      'Teste em tamanho real: as telas são abertas no smartphone ou impressas em molduras. Colegas verificam leitura, toque, ordem e ausência de cortes; ajustes finais.'
    ],
    methodology: 'Comparação, jogo de priorização, adaptação visual e teste em dispositivos reais.',
    resources: 'Capturas preparadas, molduras impressas, smartphones, ferramenta visual e projetor.'
  },
  '10': {
    title: 'Do Protótipo ao Link',
    description: 'Publicação assistida de uma experiência visual pronta, com conferência de conteúdo, segurança e funcionamento.',
    objectives: ['Internet: hospedagem e publicação.', 'Desenvolvimento do Projeto: publicação e testes de validação.'],
    technical: ['Aplicar a publicação de website para visualização online de projeto de web.', 'Aplicar testes de usabilidade e funcionalidade dos projetos.'],
    socio: ['Demonstrar comportamento íntegro, transparente e responsável, nas relações interpessoais e no desenvolvimento das atividades sob sua responsabilidade.'],
    blocks: [
      'Demonstração "arquivo, protótipo e link": o professor mostra as diferenças entre material local, protótipo compartilhado e página publicada, incluindo exposição pública e cuidado com dados.',
      'Checklist de prontidão: cada dupla confere nome fictício, créditos, ortografia, links simulados, imagens, versão mobile e ausência de dados pessoais no protótipo.',
      'Publicação assistida: o professor ou a plataforma institucional transforma o material aprovado em link usando modelo previamente preparado; os estudantes acompanham o processo sem editar código.',
      'Vernissage digital: os links são testados no computador e no celular. Cada visitante registra uma qualidade e uma melhoria usando linguagem respeitosa.'
    ],
    methodology: 'Demonstração técnica curta, checklist em duplas, publicação assistida e mostra com feedback.',
    resources: 'Protótipos da turma, modelo de publicação preparado, ambiente institucional ou ferramenta autorizada, smartphones e projetor.'
  },
  '11': {
    title: 'Interações e Feedback da Interface',
    description: 'Planejamento de cliques, estados e respostas da interface por storyboard e protótipo, sem programação.',
    objectives: ['Criação de código de texto: introdução ao Javascript como reconhecimento de bastidor.', 'Inovação: conceito, inovação x melhoria.'],
    technical: ['Identificar possibilidades de atualizações e melhorias de projetos web.', 'Aplicar conceitos de design de experiência e interação do usuário.'],
    socio: ['Aplicar os aspectos de inovação em suas atividades profissionais.'],
    blocks: [
      'Demonstração comparativa: uma página sem resposta e outra com feedback de carregamento, sucesso, erro e confirmação. O professor explica que comportamentos podem ser programados, mas a turma trabalhará a decisão de design.',
      'Jogo "O que acontece depois?": grupos recebem ações como tocar, enviar, excluir e favoritar; desenham o estado anterior, a resposta imediata e o resultado final.',
      'Oficina de protótipo: adicionar no mínimo três estados conectados — normal, ação e retorno — usando ferramenta visual. Incluir uma mensagem de erro útil e uma confirmação clara.',
      'Feira de interações: colegas executam duas tarefas sem explicação. Cada equipe registra onde faltou feedback e classifica suas ideias como correção, melhoria ou inovação.'
    ],
    methodology: 'Demonstração de comportamento, storyboard, prototipação visual e teste rápido.',
    resources: 'Capturas ou páginas de demonstração, cartões de ações e estados, ferramenta de prototipação e smartphones.'
  },
  '12': {
    title: 'UX e UI: O Usuário no Centro',
    description: 'Investigação da experiência do usuário e redesenho de uma jornada por observação, mapa e protótipo visual.',
    objectives: ['Interfaces Web e App: user interface e experiência do usuário.', 'Desenvolvimento do Projeto: testes de validação.'],
    technical: ['Aplicar conceitos de design de experiência e interação do usuário.', 'Analisar usabilidade e navegabilidade do projeto.'],
    socio: ['Demonstrar espírito colaborativo em atividades coletivas.'],
    blocks: [
      'Retomada da Aula 11: estados e feedback. Dinâmica "Amo e odeio": a turma observa capturas preparadas de interfaces, sem acessar contas pessoais, e identifica um detalhe que ajuda e outro que atrapalha.',
      'Demonstração dialogada de UI e UX: aparência, consistência, resposta, quantidade de passos e sensação de controle. Duplas classificam exemplos e justificam as decisões.',
      'Mapa de jornada: cada equipe acompanha uma tarefa fictícia — encontrar um serviço, comparar opções e pedir contato — marcando ações, dúvidas, emoções e pontos de atrito.',
      'Clínica de redesign: redesenhar em papel ou ferramenta visual o pior momento da jornada, apresentar em dois minutos e registrar como a mudança facilita a tarefa.'
    ],
    methodology: 'Análise de capturas, classificação colaborativa, mapa de jornada e redesign rápido com apresentação.',
    resources: 'Capturas fictícias preparadas, ficha de jornada, post-its, papel, canetas, ferramenta visual e projetor.'
  },
  '13': {
    title: 'Acessibilidade e Usabilidade',
    description: 'Acessibilidade e usabilidade como compromisso ético, com auditoria e correção visual do protótipo.',
    objectives: ['Interfaces Web e App: acessibilidade.', 'Ética Pessoal e Profissional: empatia e responsabilidade.'],
    technical: [
      'Identificar padrões, normas e procedimentos para elaboração do projeto de mídias digitais, referentes a propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.',
      'Analisar usabilidade e navegabilidade do projeto.'
    ],
    socio: ['Demonstrar postura conciliadora, respeitando diferenças culturais, étnicas, religiosas e de gênero na conduta pessoal e profissional.'],
    blocks: [
      'Retomada de UX e UI. Auditoria guiada de uma interface problemática: foco, contraste, tamanho de texto, área de toque, rótulos, legenda e ordem de leitura.',
      'Estações de acessibilidade: contraste, zoom, navegação por teclado numa página demonstrativa e escrita de texto alternativo. Grupos rodam e registram uma barreira em cada estação.',
      'Oficina "Protótipo para mais pessoas": cada equipe corrige no material visual pelo menos três barreiras e registra capturas de antes e depois.',
      'Teste cruzado e pacto da turma: outra equipe confere as correções. Fechamento sobre responsabilidade do designer com públicos diversos e conexões lentas.'
    ],
    methodology: 'Auditoria orientada, rotação por estações, correção visual e verificação entre pares.',
    resources: 'Página de demonstração, verificadores de contraste, fichas de estação, protótipos e projetor.'
  },
  '23': {
    title: 'Plataformas e Métricas para Decidir',
    description: 'Comparação de plataformas e leitura de dados fictícios para escolher soluções e propor melhorias.',
    objectives: ['Plataformas de Desenvolvimento: definição, categorias e dispositivos.', 'Desenvolvimento do Projeto: ferramentas de análise.'],
    technical: ['Selecionar software, aplicativos e plugins necessários para a criação dos projetos de design web.', 'Identificar possibilidades de atualizações e melhorias de projetos web.'],
    socio: ['Aplicar os aspectos de inovação em suas atividades profissionais.'],
    blocks: [
      'Mapa das plataformas: cartões de construtor visual, CMS, protótipo, template preparado e desenvolvimento sob medida. Grupos associam cada opção a custo, prazo, autonomia e manutenção.',
      'Jogo "Qual ferramenta escolher?": cada equipe recebe três clientes fictícios e recomenda uma categoria de plataforma, defendendo a decisão sem construir em código.',
      'Leitura guiada de painel fictício: acessos, origem, páginas vistas, abandono e conversão. Cada número é transformado em pergunta sobre conteúdo e experiência.',
      'Consultoria de métricas: grupos propõem três melhorias justificadas por dados e apresentam em dois minutos. A turma distingue evidência, hipótese e opinião.'
    ],
    methodology: 'Classificação de ferramentas, estudo de casos, leitura guiada e consultoria em grupos.',
    resources: 'Cartas de plataformas e clientes, painel fictício impresso ou digital, calculadora e projetor.'
  },
  '24': {
    title: 'Projeto Integrador: Presença Digital',
    description: 'Início do projeto final de campanha e presença digital multimídia, do briefing ao conjunto de peças e protótipo.',
    objectives: ['Desenvolvimento do Projeto: briefing, pesquisa e ideação.', 'Trabalho em equipe: papéis e responsabilidades.', 'Ferramentas para gestão eficaz do tempo.'],
    technical: [
      'Identificar padrões, normas e procedimentos para elaboração do projeto de mídias digitais, referentes a propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.',
      'Selecionar a criação de elementos gráficos para o desenvolvimento de design web, interfaces e redes sociais, tendo vista a propriedade.'
    ],
    socio: ['Aplicar os fundamentos da gestão do tempo para controle das atividades sob sua responsabilidade.', 'Demonstrar espírito colaborativo em atividades coletivas.'],
    blocks: [
      'Lançamento do projeto "Presença Digital": briefing, moodboard, identidade, protótipo responsivo, post, story, peça audiovisual curta, teste e apresentação. Formação de grupos de 3 a 4.',
      'Escolha de cliente ou causa fictícia e distribuição de papéis: coordenação, identidade visual, conteúdo e experiência do usuário. Todos participam das decisões; não há função de programação.',
      'Construção do briefing e pesquisa de referências, público, concorrentes, tom, conteúdo e direitos de uso. Definição da mensagem central da campanha.',
      'Cronograma visual das Aulas 25 a 29, com entregas essenciais e opcionais. Validação do escopo e registro de riscos, plano B e pasta de entrega.'
    ],
    methodology: 'Aprendizagem baseada em projeto multimídia com escopo visual, papéis claros e entregas incrementais.',
    resources: 'Formulário de briefing, fichas de papéis, quadro de cronograma, computadores e projetor.'
  },
  '25': {
    title: 'Projeto: Conceito e Protótipo',
    description: 'Desenvolvimento da identidade, wireframes e protótipo responsivo do projeto final.',
    objectives: ['Desenvolvimento do Projeto: conceituação, wireframes e prototipação.', 'Coordenação de equipe: gestão da rotina e tomada de decisão.'],
    technical: [
      'Identificar estrutura técnica para desenvolvimento de wireframes de interfaces gráficas design web, interfaces e redes sociais.',
      'Aplicar desenvolvimento de protótipos de interfaces gráficas para design web.',
      'Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.'
    ],
    socio: ['Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.', 'Intervir em situações de conflito, buscando o consenso e a harmonização entre os membros da equipe.'],
    blocks: [
      'Acompanhamento de dois minutos por grupo e fechamento do escopo: tela inicial e uma tela interna em desktop e mobile, mais peças sociais essenciais.',
      'Definição do conceito visual: paleta, tipografia, linguagem de imagem e três palavras de personalidade. Montagem do style tile do projeto.',
      'Produção de wireframes e protótipo navegável em ferramenta visual, aplicando grade, hierarquia, proximidade, alinhamento e componentes.',
      'Clínica de protótipos: cada grupo recebe uma tarefa real para testar em outro projeto e devolve uma observação objetiva antes da avaliação.'
    ],
    methodology: 'Oficina de projeto com entregas visíveis, clínica entre grupos e decisões registradas.',
    resources: 'Caderno de materiais, ferramenta visual disponível, smartphones, fichas de teste e projetor.'
  },
  '26': {
    title: 'Avaliação e Clínica de Protótipos',
    description: 'Avaliação individual sobre decisões de design, seguida de testes e melhoria do protótipo.',
    objectives: ['Ética Pessoal e Profissional: honestidade e imparcialidade.', 'Desenvolvimento do Projeto: testes de validação e melhoria.'],
    technical: ['Aplicar testes de usabilidade e funcionalidade dos projetos.', 'Analisar usabilidade e navegabilidade do projeto.', 'Aplicar conceitos de design de experiência e interação do usuário.'],
    socio: ['Demonstrar comportamento íntegro, transparente e responsável, nas relações interpessoais e no desenvolvimento das atividades sob sua responsabilidade.', 'Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados.'],
    blocks: [
      'Orientações da avaliação, retomada visual dos critérios e conversa breve sobre ansiedade. A prova exige análise de situações, não memorização de sintaxe.',
      'Prova individual de múltipla escolha sobre briefing, composição, identidade, formatos, responsividade visual, UX, acessibilidade, publicação e métricas.',
      'Rodada de teste de usabilidade: equipes cumprem três tarefas no protótipo de outro grupo e registram caminho, dificuldade, fala do usuário e gravidade.',
      'Devolução das fichas e priorização pela matriz gravidade x esforço. Cada grupo realiza e registra pelo menos duas melhorias visuais ou de conteúdo.'
    ],
    methodology: 'Avaliação contextualizada, teste entre pares e melhoria baseada em evidências.',
    resources: 'Prova impressa, protótipos, fichas de teste, matriz de priorização, smartphones e projetor.'
  },
  '27': {
    title: 'Projeto: Kit de Campanha',
    description: 'Produção integrada de peças gráficas e audiovisual curto para a presença digital do projeto.',
    objectives: ['Desenvolvimento para Mídias sociais: tipos, dimensões, resoluções e customização.', 'Trabalho em equipe: responsabilidades individuais e coletivas.'],
    technical: ['Selecionar a criação de elementos gráficos para o desenvolvimento de design web, interfaces e redes sociais, tendo vista a propriedade.', 'Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento.'],
    socio: ['Demonstrar espírito colaborativo em atividades coletivas.', 'Intervir em situações de conflito, buscando o consenso e a harmonização entre os membros da equipe.'],
    blocks: [
      'Acompanhamento do projeto e conferência da identidade aprovada. Distribuição das tarefas da noite com quadro visível de produção.',
      'Produção de post de feed e story, respeitando dimensões, área segura, hierarquia, contraste, créditos e consistência com o protótipo.',
      'Produção da peça audiovisual vertical de 15 a 30 segundos ou sequência animada equivalente: roteiro curto, captação ou montagem, texto, legenda e áudio autorizado.',
      'Exportação e controle de qualidade: dimensões, nitidez, ortografia, duração, legenda, nome do arquivo e pasta. Revisão cruzada e ajustes prioritários.'
    ],
    methodology: 'Estúdio de campanha com papéis distribuídos, produção paralela e controle de qualidade por checklist.',
    resources: 'Photopea ou software instalado, editor audiovisual disponível, câmeras ou smartphones, iluminação, checklist e projetor.'
  },
  '28': {
    title: 'Projeto: Publicar, Testar e Ensaiar',
    description: 'Organização da presença digital final, publicação assistida, teste cruzado e preparação da apresentação.',
    objectives: ['Desenvolvimento do Projeto: publicação, métricas e testes de validação.', 'Apresentação aplicada: técnicas de apresentação de projetos.'],
    technical: [
      'Aplicar a publicação de website para visualização online de projeto de web.',
      'Aplicar testes de usabilidade e funcionalidade dos projetos.',
      'Identificar possibilidades de atualizações e melhorias de projetos web.'
    ],
    socio: ['Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.', 'Aplicar os fundamentos da gestão do tempo para controle das atividades sob sua responsabilidade.'],
    blocks: [
      'Checklist final do conjunto: briefing, identidade, protótipo, post, story, audiovisual, créditos, acessibilidade e organização de arquivos.',
      'Publicação assistida do protótipo ou página em modelo preparado e ambiente autorizado. As equipes fornecem conteúdo aprovado e validam o resultado; não editam código.',
      'Teste cruzado em computador e celular, com registro de leitura, navegação, cortes, legibilidade e coerência entre as peças. Correções finais e backlog.',
      'Preparação da defesa de sete minutos: problema, público, conceito, peças, protótipo, teste, melhoria e aprendizado. Divisão de falas e ensaio cronometrado.'
    ],
    methodology: 'Checklist, publicação assistida, validação entre grupos e ensaio orientado.',
    resources: 'Modelo de publicação preparado, ambiente autorizado, protótipos, peças finais, smartphones e projetor.'
  },
  '29': {
    title: 'Mostra de Presença Digital',
    description: 'Apresentação dos projetos multimídia, recuperação e organização do portfólio de processo.',
    objectives: ['Apresentação aplicada: defesa de soluções de design.'],
    technical: ['Aplicar conceitos de design de experiência e interação do usuário.', 'Analisar usabilidade e navegabilidade do projeto.'],
    socio: [
      'Demonstrar comportamento íntegro, transparente e responsável, nas relações interpessoais e no desenvolvimento das atividades sob sua responsabilidade.',
      'Demonstrar postura conciliadora, respeitando diferenças culturais, étnicas, religiosas e de gênero na conduta pessoal e profissional.'
    ],
    blocks: [
      'Preparação da mostra: conferência do projetor, links, protótipos, peças e vídeos; ordem de apresentação e organização da banca de colegas.',
      'Apresentações da primeira metade dos grupos: briefing, identidade, kit de campanha, protótipo, teste e melhoria. Perguntas da banca ao final.',
      'Apresentações da segunda metade, votação por critérios — clareza, coerência e inclusão — e síntese coletiva do percurso da UC.',
      'Recuperação contextualizada para quem necessita nova evidência; os demais organizam portfólio com processo, antes/depois, peças, protótipo e reflexão final.'
    ],
    methodology: 'Mostra de projetos com defesa, avaliação por critérios, recuperação direcionada e organização de portfólio.',
    resources: 'Projetor, computadores, protótipos, peças gráficas, vídeos, rubrica e ficha de recuperação.'
  }
};

function renderLesson(number, lesson) {
  const objectiveRows = Math.max(lesson.objectives.length, lesson.technical.length, lesson.socio.length);
  const rows = Array.from({ length: objectiveRows }, (_, index) =>
    `| ${lesson.objectives[index] || ''} | ${lesson.technical[index] || ''} | ${lesson.socio[index] || ''} |`
  ).join('\n');
  const defaultTimes = ['19:00 - 19:30', '19:30 - 20:30', '20:30 - 21:30', '21:30 - 22:30'];
  const times = lesson.times || defaultTimes;
  const schedule = lesson.blocks.map((activity, index) => {
    return `| ${times[index] || defaultTimes[index]} | Chamada. ${activity} |`;
  }).join('\n');

  return `# AULA ${number} - ${lesson.title}

${lesson.description}

|  |  |  |
| --- | --- | --- |
| **Objetivos de Conhecimento** | **Capacidades Técnicas** | **Capacidades Socioemocionais** |
${rows}

**Roteiro da Noite**

|  |  |
| --- | --- |
| **Horário** | **Atividade** |
${schedule}

**Metodologia:** ${lesson.methodology}

**Recursos:** ${lesson.resources}

**Obs.:** ${lesson.observation || commonObservation}
`;
}

function replaceLesson(markdown, number, replacement) {
  const startMarker = `# AULA ${number} -`;
  const start = markdown.indexOf(startMarker);
  if (start < 0) throw new Error(`Aula ${number} não encontrada no planejamento.`);
  const next = markdown.indexOf('\n# AULA ', start + startMarker.length);
  const matrix = markdown.indexOf('\n**MATRIZ DE COBERTURA', start + startMarker.length);
  const endCandidates = [next, matrix].filter((value) => value >= 0);
  const end = endCandidates.length ? Math.min(...endCandidates) : markdown.length;
  return `${markdown.slice(0, start)}${replacement.trim()}\n${markdown.slice(end)}`;
}

let planning = fs.readFileSync(designPlanningPath, 'utf8').replace(/\r\n/g, '\n');
planning = planning
  .replace(
    'Proporcionar a aquisição de capacidades técnicas relativas a criação de projetos de design web e estruturas para dispositivos móveis, bem como o desenvolvimento de capacidades sociais, organizativas e metodológicas adequadas a diferentes situações profissionais.',
    'Desenvolver projetos de presença digital com foco em comunicação visual, conteúdo, interfaces, prototipação, mídias sociais, acessibilidade e experiência do usuário, reconhecendo os bastidores técnicos sem transformar a UC em formação de programação.'
  );

for (const [number, lesson] of Object.entries(revisedLessons)) {
  planning = replaceLesson(planning, number, renderLesson(number, lesson));
}

planning = planning
  .replace('o que vamos construir até o site publicado do projeto final', 'o percurso até a mostra de presença digital do projeto final')
  .replace('Fundamentos de internet: domínios, provedores e segurança, base para publicar um site de verdade ao longo da UC.', 'Fundamentos de internet: domínios, provedores e segurança para compreender como uma presença digital chega ao público.')
  .replace(/softwares de design digital \(ex\.: Canva, GIMP\)/g, 'Photopea sem login ou software de design instalado')
  .replace(/em ferramenta gratuita de design \(ex\.: Figma com plano educacional ou Canva\)/g, 'no caderno de materiais ou em ferramenta visual disponível no laboratório')
  .replace(/na ferramenta gratuita de prototipação \(ex\.: Figma com plano educacional ou Canva\)/g, 'no caderno de materiais ou em ferramenta visual disponível no laboratório')
  .replace(/ferramenta gratuita de prototipação \(ex\.: Figma com plano educacional ou Canva\)/g, 'caderno de materiais ou ferramenta visual disponível no laboratório')
  .replace(/em ferramenta gratuita de prototipação \(ex\.: Figma com plano educacional ou Canva\)/g, 'no caderno de materiais ou em ferramenta visual disponível no laboratório');

const competencyMatrix = `**MATRIZ DE COBERTURA DE COMPETÊNCIAS**

A cobertura preserva as capacidades oficiais da UC, mas muda a forma de evidenciá-las: HTML, CSS e JavaScript são reconhecidos em exemplos preparados e demonstrações do professor; os estudantes aplicam os princípios por decisões de design, protótipos e testes, sem escrever programação.

| Capacidade / objeto oficial | Aulas | Evidência prática sem programação discente |
| --- | --- | --- |
| História e funcionamento da internet, segurança e navegadores | 01–02 | Guia visual, análise de riscos e comparação de experiências web. |
| HTML: estrutura, tags, links e elementos | 03–05 | Raio-X visual de página, mapa de navegação, microtextos e painel de conteúdo; reconhecimento em exemplo pronto, sem sintaxe. |
| CSS: estilo, leiaute e responsividade | 06–09 | Style tile, composição, grade, componentes e telas adaptadas; demonstração de bastidor feita pelo professor. |
| Hospedagem e publicação | 10 e 28 | Checklist, publicação assistida em modelo ou ambiente autorizado e validação do link em dois dispositivos. |
| JavaScript, interação e inovação | 11 | Estados, storyboard e protótipo de feedback; JavaScript é apenas identificado como tecnologia de bastidor. |
| UI, UX, acessibilidade, usabilidade e navegabilidade | 12–13 e 18–20 | Jornada, redesign, auditoria, protótipo navegável e teste com usuários. |
| Briefing, pesquisa, arquitetura, ideação, rafes e wireframes | 14–17 | Briefing, moodboard, sitemap, card sorting, rafes e wireframes desktop/mobile. |
| Mídias sociais, texto, imagem, áudio e vídeo | 21–22 e 27 | Post, story, peça audiovisual curta e kit de campanha coerente. |
| Plataformas, métricas, melhorias e seleção de ferramentas | 23 | Estudo de casos e consultoria com painel fictício. |
| Projeto integrado, trabalho em equipe e gestão do tempo | 24–29 | Presença digital completa, cronograma, testes, apresentação e portfólio de processo. |

**Capacidades socioemocionais:** organização, pesquisa, ética, profissionalismo, colaboração, gestão do tempo, inovação, controle emocional e apresentação são observadas nas dinâmicas de equipe, revisões entre pares, testes e mostra final.
`;

const matrixStart = planning.indexOf('**MATRIZ DE COBERTURA DE COMPETÊNCIAS**');
planning = matrixStart >= 0
  ? `${planning.slice(0, matrixStart).trimEnd()}\n\n${competencyMatrix}`
  : `${planning.trimEnd()}\n\n${competencyMatrix}`;

fs.writeFileSync(designPlanningPath, planning);

const teachingPlan = `# PLANO DE ENSINO - SITUAÇÃO DE APRENDIZAGEM / PLANO DE AULAS

Documento padronizado SESI SENAI (modelo FM-NP-220). UC: Design Web.

## Identificação do Plano de Ensino

- **Unidade:** (conforme cadastro da unidade no SGN)
- **Curso:** Técnico em Multimídia
- **Unidade Curricular:** Design Web
- **Carga Horária da UCR:** 100:00
- **Ano / Semestre:** 2026/2
- **Turno:** Noite
- **Turma:** (conforme cadastro da turma no SGN)
- **N° de Situações de Aprendizagem:** 1
- **Docente:** Daniel Marcos Mayer

## Informações da Unidade Curricular e Curso

**Função**

- F.2: Executar projetos para mídias digitais, seguindo padrões e normas técnicas, referentes à propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.

**Objetivo Geral da Unidade Curricular**

- Desenvolver projetos de presença digital com foco em comunicação visual, conteúdo, interfaces, prototipação, mídias sociais, acessibilidade e experiência do usuário, reconhecendo os bastidores técnicos sem transformar a UC em formação de programação.

## Situação de Aprendizagem: Presença digital, da identidade à experiência publicada

**Estratégia de Aprendizagem Desafiadora:** ( ) Situação-Problema ( ) Estudo de Caso (X) Projeto ( ) Pesquisa Aplicada

### Capacidades Técnicas

- Aplicar procedimentos técnicos de diagramação, proximidade e alinhamento
- Identificar padrões, normas e procedimentos para elaboração do projeto de mídias digitais, referentes a propriedade intelectual, acessibilidade, usabilidade e sustentabilidade
- Identificar estrutura técnica para desenvolvimento de wireframes de interfaces gráficas design web, interfaces e redes sociais
- Aplicar testes de usabilidade e funcionalidade dos projetos
- Selecionar a criação de elementos gráficos para o desenvolvimento de design web, interfaces e redes sociais, tendo vista a propriedade
- Identificar possibilidades de atualizações e melhorias de projetos web
- Aplicar linguagem html (hypertext markup language) para desenvolvimento de design web
- Aplicar a publicação de website para visualização online de projeto de web
- Aplicar conceitos de design de experiência e interação do usuário
- Aplicar desenvolvimento de protótipos de interfaces gráficas para design web
- Aplicar estilos css (cascading style sheets) para desenvolvimento de design web
- Selecionar software, aplicativos e plugins necessários para a criação dos projetos de design web
- Analisar usabilidade e navegabilidade do projeto

### Objetos de Conhecimento

- Ferramentas para gestão eficaz do tempo
- Inovação: conceito, inovação x melhoria, visão inovadora
- Pesquisa: tipos, métodos, fontes e propriedade intelectual
- Ética Pessoal e Profissional
- Coordenação de equipe, controle emocional e trabalho em equipe
- Posturas profissionais e apresentação aplicada
- Desenvolvimento para mídias sociais: formatos, dimensões, resolução e customização de texto, imagem, áudio e vídeo
- Desenvolvimento do Projeto: briefing, pesquisa, tendência, ideação, conceituação, rafes, wireframes, equilíbrio visual, leiaute, responsividade, prototipação, templates, publicação, métricas e testes
- Plataformas de Desenvolvimento: definição, categorias, plataformas e dispositivos
- Interfaces Web e App: UI, UX, acessibilidade, design responsivo, arquitetura de informação e navegação
- Criação de código de texto: reconhecimento de estrutura, tags, links, elementos, folha de estilos, responsividade, editores, navegadores e introdução ao Javascript
- Internet: história, domínios, hospedagem, provedores e segurança

### Princípio Pedagógico para os Conteúdos Técnicos

- HTML, CSS e JavaScript serão apresentados como bastidores reconhecíveis de uma interface, por demonstração, comparação e desconstrução de exemplos prontos.
- Os estudantes não iniciarão páginas em arquivo vazio, não instalarão editor de código, não escreverão sintaxe e não serão avaliados por comandos, seletores, variáveis ou correção de código.
- A aplicação discente ocorrerá por composição visual, hierarquia, estilos, adaptação responsiva, protótipo, conteúdo e validação de um modelo previamente preparado ou de uma plataforma visual autorizada.

### Contextualização

Os estudantes formam um pequeno estúdio multimídia. Um cliente ou causa fictícia precisa construir uma presença digital coerente para computador, celular e redes sociais. A equipe deve pesquisar o público, criar identidade visual e conteúdo, planejar a navegação, prototipar, produzir peças gráficas e audiovisual curto, testar com usuários e apresentar a solução.

### Desafio e Resultados Esperados

- Briefing, pesquisa e moodboard
- Identidade visual e painel de estilo
- Arquitetura de informação e wireframes desktop/mobile
- Protótipo navegável testado
- Post de feed, story e peça audiovisual curta
- Página ou protótipo publicado de forma assistida em modelo preparado ou ambiente autorizado
- Registro de acessibilidade, usabilidade, melhorias e apresentação final

## Plano de Aula A - Cultura web, conteúdo e navegação (Aulas 01 a 05)

**CH alocada:** 17:00

Foco em história e funcionamento da web, segurança, análise de sites, anatomia visual de páginas, conteúdo, caminhos, imagens, direitos de uso e alternativas textuais. A estrutura técnica é reconhecida em demonstração, sem programação discente.

**Estratégias:** exposição dialogada curta, jogos de associação, cartões, mapas, pesquisa, produção visual e testes em duplas.

**Evidências:** guia visual da web, Raio-X de página, mapa de navegação, microtextos e painel de conteúdo licenciado.

## Plano de Aula B - Identidade, composição e responsividade (Aulas 06 a 10)

**CH alocada:** 17:00

Foco em cor, tipografia, contraste, proximidade, alinhamento, grades, sistemas visuais, componentes e adaptação a diferentes telas. CSS e publicação aparecem como bastidores demonstrados; a turma trabalha em ferramenta visual e valida o link publicado de forma assistida.

**Estratégias:** comparação antes/depois, style tile, oficina de composição, grades físicas, adaptação multiformato, checklist e vernissage.

**Evidências:** painel de estilo, composição corrigida, sistema visual, telas responsivas e link validado.

## Plano de Aula C - Interação, UX e acessibilidade (Aulas 11 a 13)

**CH alocada:** 10:30

Foco em estados da interface, feedback, jornada, pontos de atrito, experiência do usuário, contraste, foco, texto alternativo e inclusão. JavaScript é apenas identificado na demonstração do professor.

**Evidências:** storyboard de interação, jornada, redesenho e registro de três correções acessíveis no protótipo.

## Plano de Aula D - Do briefing ao protótipo testado (Aulas 14 a 20)

**CH alocada:** 24:00

Foco em briefing, pesquisa, arquitetura, card sorting, ideação, rafes, wireframes desktop/mobile, protótipo navegável e teste de usabilidade.

**Evidências:** briefing, moodboard, sitemap, rafes, wireframes, protótipo e relatório de teste.

## Plano de Aula E - Mídias sociais, audiovisual, plataformas e métricas (Aulas 21 a 23)

**CH alocada:** 10:30

Foco em formatos e resoluções, identidade de campanha, post, story, vídeo vertical, edição, seleção de plataforma e leitura de métricas fictícias.

**Evidências:** kit de peças, audiovisual curto e consultoria de melhorias fundamentada em dados.

## Plano de Aula F - Projeto integrador de presença digital (Aulas 24 a 29)

**CH alocada:** 21:00

O projeto final integra identidade visual, conteúdo, protótipo responsivo, peças sociais, audiovisual curto, acessibilidade, teste, publicação assistida e apresentação. Não existe função de programador na equipe e o produto não depende de escrita de código.

**Instrumentos de Avaliação**

- Prova contextualizada sobre decisões de design, sem questões de sintaxe
- Portfólio de processo
- Rubrica de 100 pontos: briefing e pesquisa (15), identidade visual (20), peças de campanha (20), protótipo responsivo (20), acessibilidade e teste (15), processo e apresentação (10)
- Apresentação final com defesa
- Recuperação por análise e redesign de presença digital, sem entrega de arquivos de código

## Ambientes, Recursos e Referências

- Sala de aula, Laboratório de Computação Gráfica e biblioteca
- Computadores com softwares de design digital e edição audiovisual, projetor, smartphones, materiais impressos, câmeras e iluminação disponível
- Ferramenta visual instalada ou autorizada, modelo de publicação preparado e ambiente institucional quando disponível
- KRUG, Steve. Não Me Faça Pensar
- WILLIAMS, Robin. Design para Quem Não É Designer
- W3C/WAI. Diretrizes de Acessibilidade para Conteúdo Web
- MDN Web Docs como referência docente para os bastidores técnicos

## Observações

- As 29 aulas permanecem individualizadas no SGN e totalizam 100 horas.
- A recuperação é contínua e paralela, com nova evidência prática baseada em análise, redesign e justificativa.
- Usar clientes, personas e dados fictícios; não inserir dados pessoais, contas, senhas, tokens ou rastreadores dos estudantes.
- Publicação é assistida pelo professor, por modelo previamente preparado ou por ambiente institucional autorizado.
- O detalhamento noite a noite está no documento Planejamento Geral da UC Design Web.
`;

fs.writeFileSync(designTeachingPath, teachingPlan);

const projectCourseDataPath = path.join(projectRoot, 'assets/course-data.js');
const courseContext = { window: {} };
vm.createContext(courseContext);
vm.runInContext(fs.readFileSync(projectCourseDataPath, 'utf8'), courseContext, { filename: 'course-data.js' });

function readCourseSupport() {
  const supportPath = path.join(projectRoot, 'assets/course-support.js');
  const supportContext = { window: {} };
  vm.createContext(supportContext);
  vm.runInContext(fs.readFileSync(supportPath, 'utf8'), supportContext, { filename: 'course-support.js' });
  return { supportPath, support: supportContext.window.SENAI_TEACHING_SUPPORT };
}

function makeSupport(number, lesson) {
  const shortGoal = `Conduzir a Aula ${number} para que a turma produza ${lesson.description.toLocaleLowerCase('pt-BR')}`;
  const plainLanguage = `${lesson.description} O foco é decidir, montar, comparar e testar; os bastidores técnicos aparecem apenas quando ajudam a compreender a função de uma interface.`;
  const say = number === '11'
    ? 'Hoje veremos que uma interface precisa responder às ações. Vocês vão desenhar essas respostas no protótipo; ninguém precisará programá-las.'
    : `Hoje o resultado precisa ficar visível. Primeiro eu mostro o exemplo e os critérios; depois vocês produzem em equipe e conferem a entrega antes de sair.`;

  return {
    teacherGoal: shortGoal,
    plainLanguage,
    say,
    demo: lesson.blocks.slice(0, 3).map((block) => block.replace(/^Revisão[^.]*\.\s*/i, '')),
    studentDeliverable: lesson.blocks[3],
    check: [
      'A entrega visual corresponde ao objetivo e pode ser aberta ou apresentada sem explicação adicional.',
      'O grupo justificou pelo menos duas decisões com critérios da aula.',
      'Arquivos ou folhas estão nomeados e organizados na pasta de entrega.',
      'A revisão final retirou dados pessoais e confirmou legibilidade.'
    ],
    fallback: 'Se a ferramenta ou a internet falhar, realizar a mesma produção em papel A3 com cartões, canetas e a ficha impressa; fotografar ou guardar a folha como evidência.',
    commonProblems: [
      ['A equipe começa sem decidir o objetivo', 'Retomar público, mensagem e ação principal antes de escolher aparência.'],
      ['A produção fica bonita, mas pouco clara', 'Pedir que outro grupo cumpra uma tarefa e registrar onde ele hesita.'],
      ['O tempo termina antes do acabamento', 'Fechar primeiro a entrega essencial e deixar variações como extensão opcional.']
    ]
  };
}

const { supportPath, support } = readCourseSupport();
support['design-web'].courseTips = {
  promise: 'Em cada aula, uso explicação de 10 a 15 minutos, modelo visual, prática em duplas ou equipes, produto visível na mesma noite, critérios de conferência e plano B sem internet.',
  routine: [
    'Antes da turma entrar, deixo abertas as referências, a ferramenta visual e a pasta de entrega.',
    'Apresento o objetivo e mostro um exemplo pronto sem transformar a demonstração em aula de programação.',
    'Divido a produção em passos curtos, com papéis claros e uma verificação intermediária.',
    'Encerro com teste entre pares, registro do que mudou e conferência do arquivo final.',
    'Se a tecnologia falhar, uso a mesma atividade em papel, cartões e fichas impressas.'
  ],
  onlineRoutines: [
    {
      lessons: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '23', '24', '25', '26'],
      text: 'A conexão é apoio para referências e testes. A atividade possui versão local ou impressa e não depende de cadastro pessoal.'
    },
    {
      lessons: ['10', '28', '29'],
      text: 'A publicação é feita de forma assistida em modelo preparado ou ambiente autorizado; a equipe valida o link e mantém a pasta local como evidência.'
    },
    {
      lessons: ['21', '22', '27'],
      text: 'A produção gráfica e audiovisual usa software instalado ou ferramenta visual autorizada, com arquivos editáveis e exportados salvos antes do fim da aula.'
    }
  ],
  rescue: 'Se eu perder o fio da aula, retomo objetivo, exemplo, passos, entrega e critérios; não abro uma explicação técnica paralela.',
  commonProblems: [
    ['A turma pergunta qual comando usar', 'Explico a função visual e retorno à ferramenta ou ao modelo pronto; programação não é requisito da atividade.'],
    ['Parte da turma ainda não começou', 'Repito o primeiro passo no projetor e formo duplas de apoio.'],
    ['A ferramenta visual fica indisponível', 'Ativo o plano B em papel e preservo a mesma entrega e os mesmos critérios.']
  ]
};

for (const [number, lesson] of Object.entries(revisedLessons)) {
  if (number === '03' || number === '05' || number === '06') continue;
  support['design-web'].lessons[number] = makeSupport(number, lesson);
}

support['design-web'].lessons['05'] = {
  "appendDefaultClosing": false,
  "teacherGoal": "Conduzir a Aula 05 de Design Web só com projetor e caderno, do 19:00 ao 22:07, sem folha impressa e sem misturar Produção Audiovisual.",
  "plainLanguage": "Uma imagem só entra no painel se a dupla souber quem fez, de onde veio, se pode usar e para que serve. Depois escreve uma frase que diga o que a imagem mostra.",
  "say": "Hoje é Design Web. Vocês copiam o que está no slide, decidem se a imagem pode ser usada e montam o painel no caderno. Não tem folha para preencher e não tem site para abrir.",
  "demo": [
    "Escrevo no quadro os quatro campos e a turma copia o modelo.",
    "Leio as seis situações. A turma diz SIM ou NÃO e uma frase do porquê.",
    "Aponto o painel pronto: título, texto, imagem, crédito e botão.",
    "Troco “foto bonita” pelo molde objeto + lugar."
  ],
  "studentDeliverable": "Uma página de caderno por dupla com duas imagens anotadas, uma frase por imagem e o painel do Café da Esquina.",
  "check": [
    "As duas imagens têm autor, fonte, licença e para que serve.",
    "Os cartões E e F ficaram de fora.",
    "Cada imagem tem uma frase com objeto e lugar.",
    "O painel tem título, texto curto, imagem, crédito e botão.",
    "Nomes da dupla e turma estão no alto da página."
  ],
  "fallback": "Se o projetor falhar, copio no quadro o modelo dos quatro campos, as seis situações, os seis cartões e o checklist. A dupla segue no caderno.",
  "extension": "Se a dupla terminar no tempo, refaz o mesmo painel mais estreito, como para celular. Não começa outra tarefa.",
  "commonProblems": [
    [
      "A dupla pede folha ou link",
      "Aponto o slide e peço cópia no caderno."
    ],
    [
      "A dupla quer abrir a internet",
      "Mantenho o banco projetado. Só valem A, B, C ou D."
    ],
    [
      "A dupla marca E ou F",
      "Peço troca na hora por um cartão permitido."
    ],
    [
      "A frase fica “foto bonita”",
      "Dou o molde: objeto + lugar."
    ],
    [
      "A dupla termina cedo",
      "Peço a versão estreita do mesmo painel."
    ]
  ],
  "presentationSlides": [
    {
      "title": "Mapa da noite",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "19:00–22:07 · lanche 19:45–20:05",
      "heading": "Hoje vocês escolhem imagens que podem usar",
      "lede": "Duplas. Caderno aberto. Tudo o que precisam está neste projetor.",
      "cards": [
        {
          "eyebrow": "19:00–19:45",
          "title": "Aprender a regra",
          "text": "Quatro dados, jogo de SIM ou NÃO e um painel já pronto."
        },
        {
          "eyebrow": "19:45–20:05",
          "title": "Lanche",
          "text": "Volta às 20:05 na mesma dupla."
        },
        {
          "eyebrow": "20:05–20:50",
          "title": "Copiar duas imagens",
          "text": "Escolher A a D e anotar os quatro dados."
        },
        {
          "eyebrow": "20:50–22:07",
          "title": "Frase, painel e conferência",
          "text": "Escrever, montar, conferir e fechar às 22:07."
        }
      ],
      "promptLabel": "Material",
      "prompt": "Caderno e caneta. Sem folha impressa e sem site.",
      "teacher": {
        "steps": [
          "2 min · Faço a chamada das 19:00 e formo as duplas.",
          "1 min · Leio o mapa e fixo: lanche às 19:45, fim às 22:07."
        ],
        "watch": "Cada aluno está numa dupla com caderno na mesa.",
        "rescue": "Atrasado entra na dupla mais próxima e copia o mapa em uma linha."
      }
    },
    {
      "title": "Os quatro dados",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "19:03–19:10",
      "heading": "Copiem este modelo no caderno agora",
      "lede": "Sem estes quatro campos, a imagem não entra no painel.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Autor",
          "text": "Quem fez a imagem."
        },
        {
          "eyebrow": "2",
          "title": "Fonte",
          "text": "De onde ela veio."
        },
        {
          "eyebrow": "3",
          "title": "Licença",
          "text": "O que pode ser feito com ela."
        },
        {
          "eyebrow": "4",
          "title": "Para que serve",
          "text": "Como ela ajuda a promoção de hoje."
        }
      ],
      "bullets": [
        "LINHA PARA COPIAR: Imagem ___ · Autor: ___ · Fonte: ___ · Licença: ___ · Serve para: ___.",
        "Façam duas linhas iguais. Uma para cada imagem de depois do lanche."
      ],
      "teacher": {
        "steps": [
          "4 min · A turma copia o modelo. Eu escrevo a mesma linha no quadro.",
          "2 min · Preencho um exemplo em voz alta: Ana Lima, banco da aula, pode usar se escrever o nome, mostrar o café.",
          "1 min · Uma dupla lê a regra: sem os quatro campos, a imagem fica de fora."
        ],
        "watch": "Todas as duplas têm duas linhas em branco prontas no caderno.",
        "rescue": "Ditado campo a campo. Quem não tem caderno usa uma folha qualquer da mochila ou o bloco do celular, sem dado pessoal."
      }
    },
    {
      "title": "Pode usar ou não?",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "19:10–19:28",
      "heading": "Seis situações. Digam SIM ou NÃO",
      "lede": "Eu leio. Vocês respondem. Depois uma frase curta dizendo por quê.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Foto de vocês",
          "text": "A dupla fotografou o próprio produto fictício. Ninguém de fora aparece."
        },
        {
          "eyebrow": "2",
          "title": "Banco com regra clara",
          "text": "O cartão mostra quem fez e diz que pode usar."
        },
        {
          "eyebrow": "3",
          "title": "Print de rede social",
          "text": "Copiar a foto de outra pessoa sem pedir."
        },
        {
          "eyebrow": "4",
          "title": "Pode usar sem restrição",
          "text": "A fonte diz que pode usar e pede só para anotar de onde veio."
        },
        {
          "eyebrow": "5",
          "title": "Pode usar com o nome",
          "text": "A regra é usar se o nome de quem fez aparecer no painel."
        },
        {
          "eyebrow": "6",
          "title": "Busca sem origem",
          "text": "A imagem apareceu numa busca qualquer, sem autor e sem regra."
        }
      ],
      "bullets": [
        "Para cada situação: respondam em voz alta e escrevam SIM ou NÃO na margem do caderno.",
        "A frase do porquê cita autorização, regra de uso ou falta de crédito."
      ],
      "teacher": {
        "steps": [
          "15 min · Faço as seis situações, cerca de 2 minutos e meio cada: leio, ouço e peço a frase.",
          "3 min · Confirmo as respostas só nas minhas notas e reforço a regra em uma frase."
        ],
        "watch": "Gabarito, só para mim: 1 SIM · 2 SIM · 3 NÃO · 4 SIM · 5 SIM · 6 NÃO. Não projeto isso.",
        "rescue": "Eu resolvo a 1 em voz alta. A turma faz a 2. Seguimos nesse ritmo."
      }
    },
    {
      "title": "Texto que descreve a imagem",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "19:28–19:36",
      "heading": "A frase diz o que a imagem mostra",
      "lede": "Molde da noite: objeto + lugar. Sem “foto bonita”.",
      "cards": [
        {
          "eyebrow": "Fraco",
          "title": "“Foto bonita”",
          "text": "Não diz o que aparece."
        },
        {
          "eyebrow": "Adequado",
          "title": "Xícara de café sobre mesa de madeira",
          "text": "Diz o objeto e o lugar."
        },
        {
          "eyebrow": "Molde",
          "title": "objeto + lugar",
          "text": "Completem em voz alta."
        },
        {
          "eyebrow": "Teste",
          "title": "Tapar o cartão",
          "text": "Se a frase ainda explica, está boa."
        }
      ],
      "bullets": [
        "Esse texto ajuda quem não vê a imagem.",
        "Depois do lanche, cada imagem ganha uma frase neste molde."
      ],
      "teacher": {
        "steps": [
          "4 min · Comparo fraco e adequado e escrevo objeto + lugar no quadro.",
          "4 min · A turma troca “foto bonita” por uma frase adequada em coro."
        ],
        "watch": "A turma consegue repetir o molde sem olhar o slide.",
        "rescue": "Ofereço a frase pronta e peço só trocar o objeto."
      }
    },
    {
      "title": "Exemplo resolvido",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "19:36–19:45",
      "heading": "Este é o painel pronto. Copiem as cinco caixas",
      "lede": "Campanha da noite: Café da Esquina. Promoção de fim de semana.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Título",
          "text": "Café da Esquina."
        },
        {
          "eyebrow": "2",
          "title": "Texto curto",
          "text": "Fim de semana com café e pão quente."
        },
        {
          "eyebrow": "3",
          "title": "Imagem",
          "text": "Xícara de café. Embaixo: Ana Lima · banco da aula · pode usar com o nome."
        },
        {
          "eyebrow": "4",
          "title": "Botão",
          "text": "Reservar mesa."
        }
      ],
      "bullets": [
        "No caderno, desenhem cinco caixas vazias: título, texto, imagem, crédito e botão.",
        "Lanche às 19:45. Volta às 20:05. Não abram site."
      ],
      "teacher": {
        "steps": [
          "5 min · Aponto cada parte e a turma desenha as cinco caixas vazias.",
          "4 min · Aviso o lanche às 19:45 e o que acontece às 20:05."
        ],
        "watch": "Antes de sair, cada caderno tem as cinco caixas desenhadas.",
        "rescue": "Desenho as cinco caixas no quadro e espero a cópia."
      }
    },
    {
      "title": "Lanche",
      "block": 1,
      "pace": "break",
      "kicker": "19:45–20:05 · intervalo",
      "heading": "Lanche · retorno às 20:05",
      "lede": "Na volta, a dupla escolhe duas imagens do banco projetado e preenche as duas linhas do caderno.",
      "promptLabel": "Combinado",
      "prompt": "Voltem às 20:05 na mesma dupla, com caderno e caneta na mesa.",
      "teacher": {
        "steps": [
          "Deixo este slide projetado durante o lanche.",
          "Retomo às 20:05 em ponto com a chamada."
        ],
        "watch": "Ninguém começa o banco antes das 20:05.",
        "rescue": "Turma dispersa: leio só o “pronto quando” da Atividade 1."
      }
    },
    {
      "title": "Atividade 1 · Escolher e anotar",
      "block": 2,
      "layout": "dense-cards",
      "kicker": "20:05–20:50",
      "heading": "Escolham duas imagens e copiem os quatro dados",
      "lede": "Só A, B, C ou D. Um escreve. O outro confere. Tudo está nestes cartões.",
      "cards": [
        {
          "eyebrow": "A · Pode",
          "title": "Xícara de café",
          "text": "Autor Ana Lima · Fonte banco da aula · Licença: pode usar se escrever o nome dela · Serve para mostrar a bebida."
        },
        {
          "eyebrow": "B · Pode",
          "title": "Pão fresco na cesta",
          "text": "Autor João Reis · Fonte banco da aula · Licença: pode usar sem restrição · Serve para mostrar o acompanhamento."
        },
        {
          "eyebrow": "C · Pode",
          "title": "Vitrine iluminada",
          "text": "Autor acervo da aula · Fonte banco da aula · Licença: pode usar sem restrição · Serve para mostrar o ponto de venda."
        },
        {
          "eyebrow": "D · Pode",
          "title": "Mesa de madeira vazia",
          "text": "Autor Marina Costa · Fonte banco da aula · Licença: pode usar se escrever o nome dela · Serve para ambientar o convite."
        },
        {
          "eyebrow": "E · Não",
          "title": "Pessoa real sem autorização",
          "text": "Tem rosto e não tem autorização. Não escolher."
        },
        {
          "eyebrow": "F · Não",
          "title": "Print de rede social",
          "text": "Sem autor, sem regra e sem pedido. Não escolher."
        }
      ],
      "bullets": [
        "COPIEM nas duas linhas do caderno: letra, autor, fonte, licença e para que serve.",
        "PRONTO QUANDO: as duas linhas estão cheias e a dupla vizinha ouviu uma delas."
      ],
      "teacher": {
        "steps": [
          "3 min · Chamada das 20:05. Confirmo duplas e releio: só A a D.",
          "5 min · Copio a imagem A no quadro, campo a campo, e a turma acompanha.",
          "12 min · Primeira imagem da dupla. Circulo apontando campo vazio.",
          "12 min · Segunda imagem da dupla. Quem acabou lê para a vizinha.",
          "8 min · Troca: cada dupla lê uma linha para a vizinha.",
          "5 min · Confiro E e F de fora e aviso a troca de bloco."
        ],
        "watch": "Nenhuma dupla parada. Quem acabou lê ou revisa a segunda linha.",
        "rescue": "Dupla travada recebe A e B e só copia o texto do cartão."
      }
    },
    {
      "title": "Atividade 2 · Texto da imagem",
      "block": 3,
      "layout": "dense-cards",
      "kicker": "20:50–21:30",
      "heading": "Uma frase por imagem, com o molde do quadro",
      "lede": "Molde: objeto + lugar. Exemplo: pão fresco na cesta sobre toalha clara.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Olhem a imagem",
          "text": "Digam o objeto em uma palavra."
        },
        {
          "eyebrow": "2",
          "title": "Completem o molde",
          "text": "objeto + lugar. Sem “foto bonita”."
        },
        {
          "eyebrow": "3",
          "title": "Tapem o cartão",
          "text": "A frase ainda explica o que era?"
        },
        {
          "eyebrow": "4",
          "title": "Troquem",
          "text": "A vizinha ouve e diz se entendeu."
        }
      ],
      "bullets": [
        "FRACO: foto bonita.",
        "ADEQUADO: xícara de café sobre mesa de madeira.",
        "PRONTO QUANDO: as duas imagens têm uma frase testada em voz alta."
      ],
      "teacher": {
        "steps": [
          "3 min · Chamada das 20:50. Reescrevo o molde no quadro.",
          "5 min · A turma transforma “foto bonita” em frase adequada em coro.",
          "10 min · Frase da primeira imagem. Circulo pedindo leitura sem mostrar o cartão.",
          "10 min · Frase da segunda imagem.",
          "7 min · Troca com a vizinha: ouvir e dizer se entendeu.",
          "5 min · Ajuste final e aviso do painel."
        ],
        "watch": "Quem acaba cedo testa a frase da vizinha. Celular não entra.",
        "rescue": "Frase para copiar e só trocar o objeto: ___ sobre mesa de madeira."
      }
    },
    {
      "title": "Atividade 3 · Montar o painel",
      "block": 4,
      "layout": "dense-cards",
      "kicker": "21:30–21:50",
      "heading": "Preencham as cinco caixas do caderno",
      "lede": "Não precisa desenhar bem. Precisa estar completo e legível.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Título",
          "text": "Escrevam: Café da Esquina."
        },
        {
          "eyebrow": "2",
          "title": "Texto curto",
          "text": "Fim de semana com café e pão quente."
        },
        {
          "eyebrow": "3",
          "title": "Imagem",
          "text": "No retângulo: a letra e o nome da imagem escolhida."
        },
        {
          "eyebrow": "4",
          "title": "Crédito",
          "text": "Embaixo: Autor · Fonte · Licença, copiados da linha do caderno."
        },
        {
          "eyebrow": "5",
          "title": "Botão",
          "text": "Escolham um: Reservar mesa · Ver cardápio · Pedir para viagem."
        }
      ],
      "bullets": [
        "Usem uma das duas imagens já anotadas.",
        "PRONTO QUANDO: as cinco caixas estão preenchidas."
      ],
      "teacher": {
        "steps": [
          "3 min · Chamada das 21:30. Mostro as cinco caixas no quadro.",
          "12 min · Preenchimento caixa a caixa. A cada 2 minutos, avanço uma.",
          "5 min · Quem terminou confere crédito e botão. Quem não terminou fecha só as cinco partes."
        ],
        "watch": "Ninguém enfeita antes de completar as cinco caixas.",
        "rescue": "Ditado do exemplo. A dupla só troca imagem e crédito."
      }
    },
    {
      "title": "Conferência da dupla",
      "block": 4,
      "layout": "dense-cards",
      "kicker": "21:50–22:00",
      "heading": "Cinco perguntas. Dedo na linha do caderno",
      "lede": "Um lê. O outro aponta. Só marca SIM se a evidência estiver escrita.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Quatro dados",
          "text": "As duas imagens têm autor, fonte, licença e para que serve?"
        },
        {
          "eyebrow": "2",
          "title": "Imagem permitida",
          "text": "E e F ficaram de fora?"
        },
        {
          "eyebrow": "3",
          "title": "Frase da imagem",
          "text": "Há uma frase de objeto + lugar para cada uma?"
        },
        {
          "eyebrow": "4",
          "title": "Painel",
          "text": "Título, texto, imagem, crédito e botão estão lá?"
        },
        {
          "eyebrow": "5",
          "title": "Nomes",
          "text": "Nomes da dupla e turma estão no alto?"
        }
      ],
      "bullets": [
        "Cada NÃO vira correção na mesma página, agora.",
        "Não apresentem para a turma inteira."
      ],
      "teacher": {
        "steps": [
          "2 min · Explico: pergunta, dedo na linha, SIM ou correção.",
          "6 min · As duplas conferem e corrigem.",
          "2 min · Olho crédito e frase por amostragem."
        ],
        "watch": "Nenhuma dupla sentada sem olhar o caderno.",
        "rescue": "Faço as cinco perguntas em voz alta com um caderno modelo."
      }
    },
    {
      "title": "Fechamento",
      "block": 4,
      "layout": "dense-cards",
      "kicker": "22:00–22:07",
      "heading": "Primeiro a permissão, depois a imagem",
      "lede": "A aula termina às 22:07. Completem a frase e guardem a página.",
      "cards": [
        {
          "eyebrow": "Frase",
          "title": "No caderno",
          "text": "Antes de usar uma imagem, eu anoto ___ e ___."
        },
        {
          "eyebrow": "Evidência",
          "title": "A página de hoje",
          "text": "Fica com a dupla. Não precisa de arquivo nem de folha extra."
        },
        {
          "eyebrow": "Próxima",
          "title": "Aula 06",
          "text": "Identidade visual: cores, letras e personalidade."
        }
      ],
      "teacher": {
        "steps": [
          "4 min · Todos completam a frase no caderno.",
          "3 min · Antecipo a Aula 06 e encerro às 22:07."
        ],
        "watch": "A turma sai com a página pronta e sem tarefa para casa.",
        "rescue": "Frase-modelo: Antes de usar uma imagem, eu anoto autor e licença."
      }
    }
  ]
};

support['design-web'].lessons['06'] = {
  "appendDefaultClosing": false,
  "teacherGoal": "Conduzir a Aula 06 de Design Web só com projetor e caderno, do 19:00 ao 22:07, sem folha impressa e sem programa de design.",
  "plainLanguage": "Identidade visual é escolher três palavras e repetir as mesmas cores, letras e formas em tudo. A dupla escolhe, prova que dá para ler e monta o painel no caderno.",
  "say": "Hoje é Design Web. Vocês escolhem uma marca, três palavras, três cores e duas letras, e provam no caderno que dá para ler. Não tem folha para preencher e não tem programa para abrir.",
  "demo": [
    "Mostro a mesma frase em três estilos e a turma diz o que mudou.",
    "Escrevo no quadro os quatro campos do kit e a turma copia.",
    "Leio as quatro combinações de cor. A turma diz SIM ou NÃO e uma frase do porquê.",
    "Aponto o kit pronto do Café da Esquina: palavras, cores, letras e botão."
  ],
  "studentDeliverable": "Uma página de caderno por dupla com marca, três palavras, paleta com papéis, par de letras, botão e mini-painel aplicado.",
  "check": [
    "A marca escolhida tem três palavras de personalidade escritas.",
    "As três cores estão anotadas com papel: fundo, texto e destaque.",
    "O par de letras está escrito à mão, com o nome da marca imitando o título.",
    "O teste do olho apertado foi feito e a troca de cor, se precisou, está anotada.",
    "O painel tem as seis caixas preenchidas e os nomes da dupla no alto da página."
  ],
  "fallback": "Se o projetor falhar, copio no quadro os quatro campos do kit, as quatro marcas, as quatro paletas, os quatro pares de letras e o checklist. A dupla segue no caderno.",
  "extension": "Se a dupla terminar no tempo, refaz o mini-painel trocando fundo claro por escuro e anota o que precisou mudar para continuar legível. Não começa outra tarefa.",
  "commonProblems": [
    [
      "A dupla pede folha ou link",
      "Aponto o slide e peço cópia no caderno."
    ],
    [
      "A dupla quer abrir programa de design",
      "Mantenho o banco projetado. A escolha é escrita à mão."
    ],
    [
      "As três palavras viram “bonito, legal, top”",
      "Peço uma palavra de sentimento e uma de jeito de trabalhar."
    ],
    [
      "A dupla usa a cor de destaque no texto inteiro",
      "Relembro o papel: destaque só no botão e em detalhe pequeno."
    ],
    [
      "A dupla termina cedo",
      "Peço a versão do mini-painel com o fundo trocado."
    ]
  ],
  "presentationSlides": [
    {
      "title": "Mapa da noite",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "Identidade visual",
      "heading": "Hoje vocês dão personalidade a uma marca",
      "lede": "Duplas. Caderno aberto. Tudo o que precisam está neste projetor.",
      "cards": [
        {
          "eyebrow": "19:00–19:45",
          "title": "Aprender o kit",
          "text": "Três estilos comparados, quatro campos e o jogo do contraste."
        },
        {
          "eyebrow": "19:45–20:05",
          "title": "Lanche",
          "text": "Volta às 20:05 na mesma dupla."
        },
        {
          "eyebrow": "20:05–20:50",
          "title": "Marca e cores",
          "text": "Escolher a marca, escrever três palavras e montar a paleta."
        },
        {
          "eyebrow": "20:50–22:07",
          "title": "Letras, painel e batalha",
          "text": "Testar a leitura, montar o painel e trocar com a dupla vizinha."
        }
      ],
      "promptLabel": "Material",
      "prompt": "Caderno e caneta. Sem folha impressa e sem programa de design.",
      "teacher": {
        "steps": [
          "2 min · Faço a chamada das 19:00 e formo as duplas.",
          "1 min · Leio o mapa e fixo: lanche às 19:45, fim às 22:07."
        ],
        "watch": "Cada aluno está numa dupla com caderno na mesa.",
        "rescue": "Atrasado entra na dupla mais próxima e copia o mapa em uma linha."
      }
    },
    {
      "title": "Mesmo conteúdo, três estilos",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "Comparação",
      "heading": "A mesma frase muda de dono conforme o estilo",
      "lede": "O texto é igual nos três. Só mudam cor, letra, forma do canto e espaço.",
      "cards": [
        {
          "eyebrow": "Estilo 1",
          "title": "Sério",
          "text": "Fundo claro, letra fina, canto reto, azul escuro. Parece consultório."
        },
        {
          "eyebrow": "Estilo 2",
          "title": "Alegre",
          "text": "Fundo creme, letra arredondada, canto redondo, rosa forte. Parece confeitaria."
        },
        {
          "eyebrow": "Estilo 3",
          "title": "Noturno",
          "text": "Fundo quase preto, letra grossa maiúscula, canto reto, laranja. Parece estúdio de tatuagem."
        },
        {
          "eyebrow": "Conclusão",
          "title": "O que mudou",
          "text": "Cor, letra, forma e espaço. A frase continua exatamente a mesma."
        }
      ],
      "bullets": [
        "Identidade visual é repetir as mesmas escolhas em todas as telas da marca.",
        "Quem olha decide em segundos se aquilo é para ele."
      ],
      "promptLabel": "Pergunta para a dupla",
      "prompt": "Qual dos três estilos venderia bolo de aniversário? Digam por quê em uma frase.",
      "teacher": {
        "speech": "A aparência não é enfeite: ela diz para quem a marca fala.",
        "steps": [
          "5 min · Descrevo os três estilos e a turma aponta o que mudou.",
          "5 min · Recolho três respostas da pergunta e escrevo no quadro as palavras que aparecerem."
        ],
        "watch": "A turma cita cor, letra ou forma, e não “é mais bonito”.",
        "rescue": "Comparo só o estilo 1 com o estilo 3 e peço uma diferença por vez."
      }
    },
    {
      "title": "O kit de identidade",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "Modelo para copiar",
      "heading": "Copiem este kit no caderno agora",
      "lede": "Quatro campos. Sem eles, o painel de hoje não fecha.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Personalidade",
          "text": "Três palavras que a marca quer transmitir."
        },
        {
          "eyebrow": "2",
          "title": "Cores",
          "text": "Três, com papel: fundo, texto e destaque."
        },
        {
          "eyebrow": "3",
          "title": "Letras",
          "text": "Duas: uma para o título, uma para o texto."
        },
        {
          "eyebrow": "4",
          "title": "Botão",
          "text": "Forma do canto e a frase de ação que ele carrega."
        }
      ],
      "bullets": [
        "LINHA PARA COPIAR: Marca ___ · Palavras ___, ___, ___ · Fundo ___ · Texto ___ · Destaque ___ · Título ___ · Texto ___ · Botão ___.",
        "Deixem a linha pronta e em branco. Ela será preenchida depois do lanche."
      ],
      "teacher": {
        "steps": [
          "4 min · A turma copia a linha. Eu escrevo a mesma linha no quadro.",
          "2 min · Preencho um exemplo em voz alta com uma padaria fictícia.",
          "2 min · Uma dupla lê a regra: sem os quatro campos, o painel não fecha."
        ],
        "watch": "Todas as duplas têm a linha em branco pronta no caderno.",
        "rescue": "Ditado campo a campo. Quem não tem caderno usa folha da mochila, sem dado pessoal."
      }
    },
    {
      "title": "Dá para ler?",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "Jogo do contraste",
      "heading": "Quatro combinações. Digam SIM ou NÃO",
      "lede": "Regra da noite: uma cor bem clara com uma cor bem escura. Duas cores médias juntas somem.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Quase branco sobre quase preto",
          "text": "Texto claríssimo em fundo escuríssimo."
        },
        {
          "eyebrow": "2",
          "title": "Cinza médio sobre cinza claro",
          "text": "Texto e fundo com tons próximos."
        },
        {
          "eyebrow": "3",
          "title": "Azul escuro sobre creme",
          "text": "Texto escuro em fundo bem claro."
        },
        {
          "eyebrow": "4",
          "title": "Amarelo sobre branco",
          "text": "Texto claro em fundo claro."
        }
      ],
      "bullets": [
        "Respondam em voz alta e escrevam SIM ou NÃO na margem do caderno.",
        "TESTE DO OLHO APERTADO: apertem os olhos; se o texto some, a combinação está fraca."
      ],
      "teacher": {
        "steps": [
          "11 min · Faço as quatro combinações, cerca de 3 minutos cada: leio, ouço e peço a frase do porquê.",
          "3 min · Confirmo as respostas só nas minhas notas e reforço a regra em uma frase."
        ],
        "watch": "Gabarito, só para mim: 1 SIM · 2 NÃO · 3 SIM · 4 NÃO. Não projeto isso.",
        "rescue": "Resolvo a 1 em voz alta e a turma faz a 2. Seguimos nesse ritmo."
      }
    },
    {
      "title": "Exemplo resolvido",
      "block": 1,
      "layout": "dense-cards",
      "kicker": "Café da Esquina",
      "heading": "Este é o kit pronto. Copiem as seis caixas vazias",
      "lede": "A marca é a mesma da aula passada. Agora ela ganha personalidade.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Palavras",
          "text": "Acolhedor · simples · quente."
        },
        {
          "eyebrow": "2",
          "title": "Cores",
          "text": "Fundo creme claro · texto marrom escuro · destaque laranja."
        },
        {
          "eyebrow": "3",
          "title": "Letras",
          "text": "Título em letra grossa arredondada. Texto em letra simples, sem enfeite."
        },
        {
          "eyebrow": "4",
          "title": "Botão",
          "text": "Canto redondo, fundo laranja, texto escuro: Reservar mesa."
        }
      ],
      "bullets": [
        "No caderno, desenhem seis caixas vazias: marca, palavras, cores, letras, botão e mini-painel.",
        "Lanche às 19:45. Na volta, essas caixas começam a ser preenchidas."
      ],
      "teacher": {
        "steps": [
          "6 min · Aponto cada parte do kit e a turma desenha as seis caixas vazias.",
          "4 min · Aviso o lanche às 19:45 e o que acontece às 20:05."
        ],
        "watch": "Antes de sair, cada caderno tem as seis caixas desenhadas.",
        "rescue": "Desenho as seis caixas no quadro e espero a cópia."
      }
    },
    {
      "title": "Lanche",
      "block": 1,
      "pace": "break",
      "kicker": "Intervalo",
      "heading": "Lanche · retorno às 20:05",
      "lede": "Na volta, a dupla escolhe uma marca do banco projetado e escreve três palavras de personalidade.",
      "promptLabel": "Combinado",
      "prompt": "Voltem na mesma dupla, com caderno e caneta na mesa.",
      "teacher": {
        "steps": [
          "Deixo este slide projetado durante o lanche.",
          "Retomo às 20:05 em ponto com a chamada."
        ],
        "watch": "Ninguém começa a escolher a marca antes das 20:05.",
        "rescue": "Turma dispersa: leio só o “pronto quando” da Atividade 1."
      }
    },
    {
      "title": "Atividade 1 · Marca e três palavras",
      "block": 2,
      "layout": "dense-cards",
      "kicker": "Personalidade",
      "heading": "Escolham uma marca e digam quem ela é em três palavras",
      "lede": "Uma marca por dupla. As três palavras mandam em todas as escolhas de hoje.",
      "cards": [
        {
          "eyebrow": "A",
          "title": "Agulha Fina · tatuagem",
          "text": "Atende à noite, público jovem. Quer parecer forte e caprichada."
        },
        {
          "eyebrow": "B",
          "title": "Dona Zizi · bolos caseiros",
          "text": "Vende por encomenda no bairro. Quer parecer afetiva e caseira."
        },
        {
          "eyebrow": "C",
          "title": "Roda Livre · bicicletas",
          "text": "Conserta no mesmo dia. Quer parecer prática e resistente."
        },
        {
          "eyebrow": "D",
          "title": "Passo Certo · fisioterapia",
          "text": "Atende idosos e atletas. Quer parecer calma e confiável."
        }
      ],
      "bullets": [
        "ESCREVAM na linha do caderno: a letra da marca e as três palavras separadas por ponto.",
        "Uma palavra diz o sentimento; outra diz o jeito de trabalhar; a terceira é livre.",
        "PRONTO QUANDO: a dupla vizinha ouviu as três palavras e disse se combinam com a marca."
      ],
      "teacher": {
        "steps": [
          "3 min · Chamada das 20:05. Confirmo as duplas e leio as quatro marcas.",
          "5 min · Escrevo três palavras para uma marca no quadro e mostro uma palavra fraca sendo trocada.",
          "7 min · As duplas escolhem e escrevem. Circulo cobrando sentimento e jeito de trabalhar.",
          "5 min · Troca com a dupla vizinha: ouvir as três palavras e dizer se combinam."
        ],
        "watch": "Nenhuma dupla com “bonito, legal, top”. Cada palavra precisa caber na marca escolhida.",
        "rescue": "Dupla travada recebe duas palavras minhas e só escolhe a terceira."
      }
    },
    {
      "title": "Atividade 2 · Paleta com papéis",
      "block": 2,
      "layout": "dense-cards",
      "kicker": "Cores",
      "heading": "Escolham três cores e digam o papel de cada uma",
      "lede": "Fundo, texto e destaque. O destaque só aparece no botão e em detalhes pequenos.",
      "cards": [
        {
          "eyebrow": "P1 · Noite",
          "title": "Escura e forte",
          "text": "Fundo quase preto · texto quase branco · destaque laranja forte."
        },
        {
          "eyebrow": "P2 · Doce",
          "title": "Clara e afetiva",
          "text": "Fundo creme · texto marrom escuro · destaque rosa forte."
        },
        {
          "eyebrow": "P3 · Oficina",
          "title": "Clara e direta",
          "text": "Fundo cinza bem claro · texto azul quase preto · destaque amarelo forte."
        },
        {
          "eyebrow": "P4 · Calma",
          "title": "Clara e serena",
          "text": "Fundo branco esverdeado · texto verde escuro · destaque verde médio."
        }
      ],
      "bullets": [
        "COPIEM a paleta escolhida com o papel de cada cor e escrevam em uma frase por que ela combina com as três palavras.",
        "Marquem o tom de cada caixa com a caneta: risco fino para cor clara, risco cruzado para cor escura.",
        "PRONTO QUANDO: as três cores estão escritas com papel e com a frase de justificativa."
      ],
      "teacher": {
        "steps": [
          "5 min · Leio as quatro paletas e mostro no quadro o risco fino e o risco cruzado.",
          "12 min · As duplas escolhem, copiam e riscam as três caixas de cor.",
          "5 min · Cobro a frase de justificativa ligando cor e palavras.",
          "3 min · Confiro por amostragem se o destaque ficou fora do texto corrido e aviso a troca de bloco."
        ],
        "watch": "Nenhuma dupla usando a cor de destaque como cor de texto.",
        "rescue": "Dupla indecisa recebe a paleta mais próxima das palavras dela e só escreve a justificativa."
      }
    },
    {
      "title": "Atividade 3 · Letras e teste de leitura",
      "block": 3,
      "layout": "dense-cards",
      "kicker": "Tipografia",
      "heading": "Escolham o par de letras e provem que dá para ler",
      "lede": "Uma letra para o título, uma para o texto. Depois, o teste do olho apertado.",
      "cards": [
        {
          "eyebrow": "L1",
          "title": "Grossa e reta",
          "text": "Título em bastão grosso maiúsculo. Texto em letra simples."
        },
        {
          "eyebrow": "L2",
          "title": "Alta e elegante",
          "text": "Título com pezinhos e traço fino. Texto em letra simples."
        },
        {
          "eyebrow": "L3",
          "title": "Redonda e macia",
          "text": "Título arredondado e cheio. Texto em letra simples."
        },
        {
          "eyebrow": "L4",
          "title": "Estreita e forte",
          "text": "Título estreito maiúsculo. Texto em letra simples com pezinhos."
        }
      ],
      "bullets": [
        "ESCREVAM o nome da marca duas vezes, imitando à mão a letra do título escolhido.",
        "TESTE: escrevam a frase da marca com a cor de texto sobre a cor de fundo e apertem os olhos. Se sumir, troquem uma das duas cores.",
        "PRONTO QUANDO: o par está escrito, o teste foi feito e a troca, se precisou, está anotada."
      ],
      "teacher": {
        "steps": [
          "3 min · Chamada das 20:50. Retomo o par de letras do exemplo.",
          "6 min · Escrevo o mesmo nome nos quatro estilos no quadro e a turma diz qual combina com cada marca.",
          "12 min · As duplas escolhem e escrevem o nome duas vezes à mão.",
          "9 min · Teste do olho apertado em todas as duplas. Circulo pedindo a leitura de longe.",
          "6 min · Quem precisou trocar de cor anota a troca ao lado da paleta.",
          "4 min · Amostragem em voz alta: duas duplas contam o que trocaram e por quê."
        ],
        "watch": "Cada dupla fez o teste de leitura, não apenas escolheu por gosto.",
        "rescue": "Escrevo o nome da marca no quadro no estilo escolhido e a dupla copia."
      }
    },
    {
      "title": "Atividade 4 · Painel de estilo",
      "block": 4,
      "layout": "dense-cards",
      "kicker": "Produção",
      "heading": "Preencham as seis caixas do painel",
      "lede": "Não precisa desenhar bem. Precisa estar completo e legível.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Marca e palavras",
          "text": "Nome no alto e as três palavras logo abaixo."
        },
        {
          "eyebrow": "2",
          "title": "Cores",
          "text": "As três caixas riscadas, cada uma com o papel escrito ao lado."
        },
        {
          "eyebrow": "3",
          "title": "Letras e botão",
          "text": "O par escrito à mão e o botão com canto reto ou redondo."
        },
        {
          "eyebrow": "4",
          "title": "Mini-painel",
          "text": "Título, uma frase e o botão, aplicados com as escolhas da dupla."
        }
      ],
      "bullets": [
        "Frases de ação para o botão: ver preços · encomendar · agendar horário.",
        "Usem só as cores e as letras já escolhidas. Nada novo entra agora.",
        "PRONTO QUANDO: as seis caixas estão preenchidas e os nomes da dupla estão no alto da página."
      ],
      "teacher": {
        "steps": [
          "3 min · Chamada das 21:30. Mostro as seis caixas no quadro.",
          "12 min · Preenchimento caixa a caixa. A cada 2 minutos, avanço uma.",
          "5 min · Quem terminou confere botão e mini-painel. Quem não terminou fecha só as seis partes."
        ],
        "watch": "Ninguém enfeita antes de completar as seis caixas.",
        "rescue": "Ditado do exemplo do Café da Esquina. A dupla só troca marca, cores e letras."
      }
    },
    {
      "title": "Batalha de identidade",
      "block": 4,
      "layout": "dense-cards",
      "kicker": "Conferência entre duplas",
      "heading": "Troquem os cadernos e adivinhem as três palavras",
      "lede": "Quem recebe olha só o painel. As palavras ficam tapadas até o fim.",
      "cards": [
        {
          "eyebrow": "1",
          "title": "Tapem",
          "text": "Quem entrega cobre com a mão a caixa das três palavras."
        },
        {
          "eyebrow": "2",
          "title": "Chutem",
          "text": "Quem recebe escreve três palavras que o painel passa."
        },
        {
          "eyebrow": "3",
          "title": "Comparem",
          "text": "Destapem e contem quantas bateram."
        },
        {
          "eyebrow": "4",
          "title": "Devolvam",
          "text": "Um acerto e uma sugestão, escritos no rodapé da página."
        }
      ],
      "bullets": [
        "Duas palavras iguais ou parecidas já mostram que a identidade está clara.",
        "Cada sugestão recebida vira correção na mesma página, agora."
      ],
      "teacher": {
        "steps": [
          "2 min · Explico a troca: tapar, chutar, comparar e devolver.",
          "6 min · As duplas trocam, escrevem e corrigem.",
          "2 min · Ouço dois pares que acertaram as três palavras e pergunto o que entregou a personalidade."
        ],
        "watch": "Nenhuma dupla apenas elogiando: a devolução tem um acerto e uma sugestão escritos.",
        "rescue": "Faço a batalha com um caderno modelo projetado no quadro e a turma chuta junto."
      }
    },
    {
      "title": "Fechamento",
      "block": 4,
      "layout": "dense-cards",
      "kicker": "Saída",
      "heading": "Primeiro as três palavras, depois as cores",
      "lede": "A aula termina às 22:07. Completem a frase e guardem a página.",
      "cards": [
        {
          "eyebrow": "Frase",
          "title": "No caderno",
          "text": "A identidade do meu painel diz ___, ___ e ___ porque ___."
        },
        {
          "eyebrow": "Evidência",
          "title": "A página de hoje",
          "text": "Fica com a dupla. Sem arquivo, sem folha extra e sem tarefa para casa."
        },
        {
          "eyebrow": "Próxima",
          "title": "Aula 07",
          "text": "Espaço, proximidade e alinhamento: organizar a página sem apertar."
        }
      ],
      "teacher": {
        "steps": [
          "4 min · Todos completam a frase no caderno.",
          "3 min · Antecipo a Aula 07 e encerro às 22:07."
        ],
        "watch": "A turma sai com a página pronta e sem tarefa para casa.",
        "rescue": "Frase-modelo: a identidade do meu painel diz calma porque o fundo é claro e o texto é escuro."
      }
    }
  ]
};

Object.assign(support['design-web'].lessons['01'], {
  teacherGoal: 'Apresentar Design Web a partir do cotidiano da turma e terminar a noite com um primeiro diagnóstico de interface baseado em critérios, sem programação e sem antecipar entregas futuras.',
  plainLanguage: 'Design Web é planejar como conteúdo, aparência e interação trabalham juntos para ajudar uma pessoa a cumprir uma tarefa em uma tela.',
  say: 'Hoje não vamos programar nem começar um produto. Vamos descobrir o que o Design Web observa e aprender a olhar para uma tela com critérios, não apenas com gosto pessoal.',
  studentDeliverable: 'Uma tela da Mostra Criativa por grupo, feita no caderno ou em editor de desenho, com quatro respostas curtas e um bilhete de saída individual.',
  demo: [
    'Projeto as informações obrigatórias da Mostra Criativa para todos trabalharem com o mesmo conteúdo.',
    'No quadro, desenho três retângulos: título, informações do evento e botão.',
    'Mostro como tamanho e posição criam hierarquia sem exigir desenho elaborado.',
    'Acrescento o feedback “Presença confirmada!” e libero os dez grupos para criar no caderno, Excalidraw ou editor de desenho disponível.'
  ],
  check: [
    'A tela mostra Mostra Criativa, sexta-feira, 19h, auditório e o botão “Confirmar presença”.',
    'Título, informações e ação possuem uma ordem visual compreensível.',
    'O grupo respondeu clareza, hierarquia, caminho e feedback em frases curtas.',
    'Cada estudante concluiu a frase “Design Web serve para...” com palavras próprias.'
  ],
  fallback: 'Sem computador e sem impressão, a atividade inteira acontece no caderno. Se faltar caderno, um integrante registra no bloco de notas do celular, sem dados pessoais.',
  extension: 'Criar uma segunda versão da mesma tela para celular, mantendo as informações e o botão legíveis.',
  commonProblems: [
    ['A turma responde apenas “bonito” ou “feio”', 'Pergunto qual tarefa a pessoa tentou cumprir, onde olhou primeiro e em que ponto hesitou.'],
    ['A história da web vira palestra longa', 'Limito a quatro viradas visuais e peço que as duplas ordenem os cartões.'],
    ['Os grupos tentam desenhar com perfeição e travam', 'Reforço que bastam retângulos, setas e palavras; a meta é organizar, não decorar.']
  ],
  review: {
    title: 'Primeiro diagnóstico de interface',
    kicker: 'Critério, não gosto pessoal',
    intro: 'Uma boa análise explica a tarefa, mostra a evidência e propõe uma mudança relacionada ao problema.'
  },
  blocks: [
    {
      mode: 'orientation',
      label: 'Bem-vindos: Design Web já faz parte do seu dia',
      focus: 'Reconhecer interfaces digitais como escolhas feitas para pessoas.',
      evidence: 'Cada estudante citou uma tela usada hoje e a tarefa que tentou cumprir.',
      teacherSteps: [
        '5 min · Faço a chamada e acolho a turma.',
        '8 min · Explico a UC em linguagem simples e afirmo que não haverá programação literal.',
        '10 min · Recolho exemplos de telas usadas hoje e anoto a tarefa, não o aplicativo.',
        '7 min · Fecho com conteúdo, visual e interação como três partes do Design Web.'
      ],
      studentSteps: ['Pense em uma tela usada hoje.', 'Diga qual tarefa tentou cumprir.', 'Aponte algo que ajudou ou atrapalhou.'],
      rescue: 'Se ninguém responder, projeto três situações: pedir comida, encontrar um vídeo e consultar um horário.'
    },
    {
      mode: 'orientation',
      label: 'Uma viagem rápida pela web',
      focus: 'Relacionar mudanças tecnológicas a mudanças na experiência das pessoas.',
      evidence: 'Dupla ordenou quatro épocas e explicou uma mudança de uso.',
      teacherSteps: [
        '10 min · Apresento quatro viradas: começo da web, popularização, web social e mobile.',
        '10 min · Mostro uma imagem de referência por época e destaco o comportamento do usuário.',
        '25 min · Duplas ordenam cartões e associam cada época a uma mudança.',
        '10 min · Comparo respostas e monto a linha do tempo no quadro.',
        '5 min · Registro a ideia-chave: a web muda quando pessoas, dispositivos e necessidades mudam.'
      ],
      studentSteps: ['Leia os quatro cartões.', 'Ordene do mais antigo ao atual.', 'Associe uma mudança de comportamento.', 'Prepare uma explicação de 30 segundos.'],
      rescue: 'Sem cartões, escrevo no quadro 1991, anos 2000, anos 2010 e hoje; as duplas copiam e completam.'
    },
    {
      mode: 'orientation',
      label: 'O que o designer decide em uma tela',
      focus: 'Distinguir conteúdo, visual, navegação, feedback, responsividade e acessibilidade.',
      evidence: 'Turma identificou pelo menos três decisões de design e compreendeu as quatro perguntas da atividade.',
      teacherSteps: [
        '10 min · Apresento as seis decisões com exemplos concretos.',
        '15 min · Aplico clareza, hierarquia, caminho e feedback ao próprio slide projetado.',
        '15 min · A turma transforma comentários de gosto em observações concretas.',
        '10 min · Desenho no quadro os três blocos que serão usados na atividade do caderno.',
        '10 min · Leio as informações da Mostra Criativa e tiro dúvidas antes do desafio.'
      ],
      studentSteps: ['Observe antes de opinar.', 'Diga qual elemento chamou atenção primeiro.', 'Explique onde colocaria a ação principal.', 'Imagine a resposta da tela depois do clique.'],
      rescue: 'Uso o slide 08 como exemplo e pergunto: o que aparece primeiro, o que precisa ser feito e como saber que terminou?'
    },
    {
      mode: 'testing',
      label: 'Desafio no caderno: Mostra Criativa',
      focus: 'Organizar conteúdo e ação em uma tela simples, justificando quatro decisões.',
      evidence: 'Uma página ou arquivo por grupo com a tela desenhada e quatro respostas curtas.',
      teacherSteps: [
        '3 min · Mantenho os dez grupos e cada um escolhe caderno, Excalidraw ou outro editor de desenho.',
        '2 min · Leio o conteúdo obrigatório e desenho os três blocos no quadro.',
        '12 min · Os grupos desenham a tela usando retângulos, setas e palavras.',
        '5 min · Conferem clareza, hierarquia, caminho e feedback.',
        '10 min · Cada grupo apresenta uma decisão em até 30 segundos.',
        '5 min · Cada estudante escreve o bilhete de saída.',
        '3 min · Confiro as páginas e antecipo apenas o tema da Aula 02.'
      ],
      studentSteps: ['Escolha caderno ou editor de desenho.', 'Copie as informações obrigatórias.', 'Desenhe uma tela simples.', 'Responda às quatro perguntas.', 'Escolha uma decisão para explicar.', 'Conclua o bilhete de saída.'],
      extension: 'Se terminar antes, adapte a mesma tela para um celular mais estreito.',
      rescue: 'Sem caderno, um integrante registra no bloco de notas do celular; a ideia da tela pode ser descrita em palavras.'
    }
  ],
  studentSheet: {
    title: 'Atividade sem impressão',
    intro: 'Cada grupo pode usar caderno, Excalidraw ou outro editor de desenho para reunir a tela e a conferência.',
    sections: [
      { title: 'Conteúdo', items: ['Mostra Criativa.', 'Sexta-feira · 19h · auditório.', 'Botão Confirmar presença.'] },
      { title: 'Conferência', items: ['Clareza.', 'Hierarquia.', 'Caminho.', 'Feedback.'] },
      { title: 'Entrega', items: ['Tela desenhada.', 'Quatro respostas curtas.', 'Número do grupo.'] }
    ]
  },
  presentationSlides: [
    {
      title: 'Design Web já apareceu no seu dia', block: 1, kicker: 'Comece pelo cotidiano', heading: 'Quantas telas já ajudaram você hoje?',
      lede: 'Antes de falar em sites, pense nas tarefas: conversar, assistir, comprar, localizar, estudar, ouvir ou pedir ajuda.',
      cards: [
        { eyebrow: 'Situação 01', title: 'Encontrar', text: 'Um horário, endereço, preço, vídeo ou informação.' },
        { eyebrow: 'Situação 02', title: 'Escolher', text: 'Entre produtos, músicas, rotas, opções ou conteúdos.' },
        { eyebrow: 'Situação 03', title: 'Concluir', text: 'Enviar, reservar, comprar, confirmar, publicar ou pedir contato.' }
      ],
      prompt: 'Pergunta para a turma: qual tela você usou e o que tentou fazer nela?',
      teacher: { speech: 'Começo pelas tarefas, não pelas marcas dos aplicativos. Isso mostra que Design Web trata de caminhos e decisões que já fazem parte do cotidiano.', steps: ['Peço três exemplos.', 'Escrevo apenas a tarefa no quadro.', 'Pergunto o que ajudou ou atrapalhou.'], watch: 'A turma fala sobre tarefas, não apenas nomes de aplicativos.', rescue: 'Projeto os exemplos encontrar um vídeo, consultar um horário e pedir comida.' }
    },
    {
      title: 'O que é Design Web', block: 1, kicker: 'Definição simples', heading: 'Conteúdo + visual + interação',
      lede: 'Design Web organiza informação e ações em telas para que pessoas entendam, encontrem e façam algo com menos esforço.',
      cards: [
        { eyebrow: 'Conteúdo', title: 'O que precisa aparecer?', text: 'Textos, imagens, informações, prioridades e linguagem.' },
        { eyebrow: 'Visual', title: 'O que chama atenção?', text: 'Cor, tipografia, tamanho, espaço, contraste e organização.' },
        { eyebrow: 'Interação', title: 'Como a pessoa avança?', text: 'Menus, botões, caminhos, respostas, erros e confirmações.' }
      ],
      prompt: 'Se uma dessas partes falhar, a tarefa fica mais difícil — mesmo que a tela seja bonita.',
      teacher: { speech: 'Esta é a definição que vamos usar durante toda a UC. Programação pode implementar uma interface, mas nosso foco será planejar, comunicar, prototipar e testar.', steps: ['Leio a definição.', 'Dou um exemplo de cada parte.', 'Peço um exemplo da turma.'], watch: 'A turma consegue diferenciar conteúdo, visual e interação.', rescue: 'Uso um cardápio impresso: texto é conteúdo, diagramação é visual e a ordem do pedido representa interação.' }
    },
    {
      title: 'Design não é apenas aparência', block: 1, kicker: 'Mude o olhar', heading: 'Bonito não basta. Precisa funcionar para alguém.',
      lede: 'Uma decisão de design sempre responde a três perguntas: quem precisa usar, o que precisa fazer e em qual situação.',
      cards: [
        { eyebrow: 'Pessoa', title: 'Para quem?', text: 'Idade, repertório, necessidade, limitação e expectativa.' },
        { eyebrow: 'Tarefa', title: 'Fazer o quê?', text: 'Encontrar, comparar, compreender, decidir ou concluir.' },
        { eyebrow: 'Contexto', title: 'Em qual condição?', text: 'Celular, pressa, sol, ruído, conexão lenta ou tela grande.' }
      ],
      prompt: 'Troque “eu gostei” por “isso ajuda a pessoa a...”',
      teacher: { speech: 'Não proíbo opiniões; ensino a sustentá-las. O passo seguinte de qualquer gosto é explicar o efeito na tarefa.', steps: ['Mostro a frase-modelo.', 'Transformo um comentário de gosto em critério.', 'Peço uma tentativa da turma.'], watch: 'Alguém usa pessoa, tarefa ou contexto para justificar uma opinião.', rescue: 'Modelo: “o texto maior ajuda quem lê no celular e está longe da tela”.' }
    },
    {
      title: 'O percurso da UC', block: 1, kicker: 'O que vamos aprender', heading: 'Uma aprendizagem visual, prática e colaborativa',
      lede: 'A UC começa pelo olhar, passa pela criação visual e termina na capacidade de explicar e testar decisões.',
      bullets: ['Observar pessoas, pesquisar e organizar conteúdo', 'Criar identidade, composição e peças para diferentes telas', 'Prototipar, testar, melhorar e apresentar decisões'],
      prompt: 'Os bastidores técnicos aparecem apenas em demonstrações preparadas pelo professor.',
      teacher: { speech: 'Apresento o caminho sem prometer um site codificado. O resultado mais importante é saber tomar decisões visuais e justificar por que elas ajudam o público.', steps: ['Leio os seis movimentos.', 'Dou um exemplo rápido de cada.', 'Explico como serão as evidências.'], watch: 'A turma entende que haverá prática visual, protótipos, peças e testes.', rescue: 'Resumir em três verbos: observar, criar e testar.' }
    },
    {
      title: 'Uma viagem rápida pela web', block: 2, kicker: 'Quatro viradas', heading: 'A web mudou — e o jeito de usar também',
      lede: 'Não é uma lista para decorar. É uma forma de perceber como telas, conexões e comportamentos transformam o design.',
      cards: [
        { eyebrow: '1991', title: 'Publicar e conectar', text: 'Páginas simples ligadas por links; o desafio era acessar e encontrar informação.' },
        { eyebrow: 'Anos 2000', title: 'Pesquisar e comprar', text: 'Banda larga, buscadores, portais e comércio digital tornam a web cotidiana.' },
        { eyebrow: 'Anos 2010', title: 'Tocar e compartilhar', text: 'Smartphones e redes sociais colocam a experiência na palma da mão.' },
        { eyebrow: 'Hoje', title: 'Adaptar e incluir', text: 'Múltiplas telas, vídeo, serviços e acessibilidade exigem experiências flexíveis.' }
      ],
      teacher: { speech: 'Não aprofundo tecnologia. Em cada época mostro uma imagem, digo o que as pessoas passaram a fazer e pergunto o que o design precisou mudar.', steps: ['Mostro uma época por vez.', 'Destaco comportamento.', 'Conecto com uma tela atual.'], watch: 'A turma liga época, comportamento e decisão de design.', rescue: 'Escrevo as quatro épocas no quadro e uso gestos: ler, pesquisar, tocar e adaptar.' }
    },
    {
      title: 'Linha do tempo viva', block: 2, kicker: 'Atividade em 10 grupos', heading: 'Ordene, associe e explique',
      lede: 'Cada grupo trabalha com o mesmo conjunto: quatro cartões de época e quatro cartões de mudança de comportamento.',
      bullets: ['Ordene as épocas do mais antigo ao atual.', 'Associe uma mudança a cada época.', 'Escolha uma associação e prepare uma explicação de 30 segundos.', 'Compare com a linha do tempo montada no quadro.'],
      prompt: 'Não vale apenas acertar a ordem: é preciso explicar o que mudou para quem usa.',
      teacher: { speech: 'Circulo ouvindo explicações. Se o grupo decorar datas mas não explicar comportamento, pergunto: “o que uma pessoa passou a conseguir fazer?”', steps: ['Confirmo os 10 grupos.', 'Marco 12 minutos.', 'Peço uma fala por grupo.', 'Monto a resposta coletiva.'], watch: 'Cada grupo explica uma mudança de comportamento.', rescue: 'Sem impressão, os grupos copiam as quatro épocas e criam as associações no caderno.' }
    },
    {
      title: 'Os oito cartões', block: 2, layout: 'dense-cards', kicker: 'Atividade · linha do tempo', heading: 'Todos os grupos copiam os mesmos cartões',
      lede: 'Escrevam cada item separadamente. Os cartões estão propositalmente fora de ordem.',
      cards: [
        { eyebrow: 'Época A', title: 'Anos 2010', text: 'Smartphones e redes sociais.' },
        { eyebrow: 'Época B', title: '1991', text: 'Começo da Web pública.' },
        { eyebrow: 'Época C', title: 'Hoje', text: 'Múltiplas telas, serviços digitais e acessibilidade.' },
        { eyebrow: 'Época D', title: 'Anos 2000', text: 'Banda larga, buscadores, portais e lojas virtuais.' },
        { eyebrow: 'Comportamento 1', title: 'Tocar e compartilhar', text: 'Usar o celular para tocar, rolar, fotografar e compartilhar.' },
        { eyebrow: 'Comportamento 2', title: 'Ler e navegar', text: 'Acessar páginas simples, ler informações e seguir links.' },
        { eyebrow: 'Comportamento 3', title: 'Adaptar e incluir', text: 'Esperar experiências rápidas, adaptáveis e inclusivas em diferentes telas.' },
        { eyebrow: 'Comportamento 4', title: 'Pesquisar e comprar', text: 'Comparar produtos, comprar e usar serviços pela internet.' }
      ],
      prompt: 'Missão: ordenar as quatro épocas e formar quatro pares com os comportamentos.',
      teacher: {
        speech: 'Deixo este slide projetado enquanto os dez grupos copiam. Não revelo os pares antes da socialização.',
        steps: ['Confirmo que todos recebem os oito cartões.', 'Dou 3 minutos para copiar.', 'Dou 7 minutos para ordenar e associar.', 'Peço uma explicação de 30 segundos por associação.', 'Gabarito reservado: B–2 (1991 ↔ Ler e navegar); D–4 (Anos 2000 ↔ Pesquisar e comprar); A–1 (Anos 2010 ↔ Tocar e compartilhar); C–3 (Hoje ↔ Adaptar e incluir).'],
        watch: 'Cada grupo tem quatro cartões de época e quatro de comportamento.',
        rescue: 'No caderno, usar duas colunas e ligar as correspondências.'
      }
    },
    {
      title: 'O que o designer decide', block: 3, kicker: 'Seis lentes', heading: 'Cada detalhe responde a uma necessidade',
      cards: [
        { eyebrow: '01', title: 'Conteúdo', text: 'O que entra, o que sai e o que vem primeiro.' },
        { eyebrow: '02', title: 'Hierarquia', text: 'Para onde os olhos vão e o que parece mais importante.' },
        { eyebrow: '03', title: 'Navegação', text: 'Como a pessoa sabe onde está e para onde pode ir.' },
        { eyebrow: '04', title: 'Feedback', text: 'Como a tela confirma, avisa, carrega ou explica um erro.' },
        { eyebrow: '05', title: 'Responsividade', text: 'Como o conteúdo se adapta a celular, tablet e computador.' },
        { eyebrow: '06', title: 'Acessibilidade', text: 'Como mais pessoas conseguem perceber, compreender e operar.' }
      ],
      prompt: 'O designer não adivinha: observa, escolhe, testa e melhora.',
      teacher: { speech: 'Passo rapidamente pelas seis lentes e digo que cada uma voltará com mais profundidade. Hoje basta aprender a reconhecê-las.', steps: ['Apresento duas lentes por vez.', 'Dou um exemplo concreto.', 'Peço que a turma localize uma lente na tela atual.'], watch: 'A turma identifica pelo menos três decisões.', rescue: 'Reduzo para conteúdo, visual e caminho.' }
    },
    {
      title: 'Quatro perguntas para observar', block: 3, kicker: 'Ferramenta de análise', heading: 'Antes de opinar, faça estas perguntas',
      cards: [
        { eyebrow: 'Clareza', title: 'Entendi o que esta tela oferece?', text: 'Título, linguagem e ação principal são reconhecíveis?' },
        { eyebrow: 'Hierarquia', title: 'Para onde olho primeiro?', text: 'Tamanho, contraste e espaço indicam prioridade?' },
        { eyebrow: 'Caminho', title: 'Sei onde clicar e o que vem depois?', text: 'Rótulos e passos diminuem a dúvida?' },
        { eyebrow: 'Feedback', title: 'A tela respondeu à minha ação?', text: 'Existe confirmação, carregamento, aviso ou orientação de erro?' }
      ],
      teacher: { speech: 'Estas quatro perguntas substituem “bonito ou feio”. Elas ficam projetadas durante a demonstração e a atividade.', steps: ['Leio uma pergunta.', 'Aplico na primeira tela.', 'Peço evidência observável.'], watch: 'Comentários da turma começam com uma pergunta ou critério.', rescue: 'Usar somente clareza e caminho na primeira rodada.' }
    },
    {
      title: 'Demonstração guiada', block: 3, kicker: 'Eu mostro primeiro', heading: 'Mesma missão, duas experiências',
      lede: 'Missão demonstrativa: encontrar o horário de atendimento e uma forma de contato.',
      bullets: ['Digo em voz alta o que procuro.', 'Aponto para onde meus olhos foram primeiro.', 'Conto passos e momentos de dúvida.', 'Identifico a resposta da tela.', 'Registro uma evidência, sem dizer apenas “gostei”.'],
      prompt: 'Frase-modelo: “Na tela A, eu consegui/hesitei porque...”',
      teacher: { speech: 'Faço a tarefa devagar e penso em voz alta. Não explico a interface antes do teste, porque quero mostrar a experiência real de quem chega sem instrução.', steps: ['Executo na tela A.', 'Registro uma evidência.', 'Repito na tela B.', 'Comparo pelos quatro critérios.'], watch: 'A turma percebe a diferença entre descrever a tela e avaliar a experiência.', rescue: 'Uso duas capturas e simulo o clique apontando.' }
    },
    {
      title: 'Desafio em trio', block: 4, kicker: 'Primeiro olhar de designer', heading: 'Uma missão, três papéis',
      lede: 'Todos analisam as mesmas duas interfaces. Depois os papéis podem trocar.',
      cards: [
        { eyebrow: 'Pessoa 01', title: 'Navegador', text: 'Executa a missão e fala o que procura, entende ou não entende.' },
        { eyebrow: 'Pessoa 02', title: 'Observador', text: 'Anota cliques, hesitações, retornos e sinais de feedback.' },
        { eyebrow: 'Pessoa 03', title: 'Relator', text: 'Organiza 3 acertos, 3 problemas e 1 melhoria na ficha.' }
      ],
      bullets: ['Executem a mesma missão nas duas telas.', 'Não orientem o navegador durante a tentativa.', 'Registrem evidências antes de propor mudanças.', 'Escolham um problema que realmente afete a tarefa.'],
      teacher: { speech: 'O observador não ajuda durante o teste. A dúvida é uma evidência importante, não um erro do colega.', steps: ['Formo trios.', 'Distribuo papéis.', 'Leio a missão.', 'Marco 25 minutos.', 'Aviso quando faltarem 10 e 5 minutos.'], watch: 'A ficha registra comportamento observável e uma melhoria relacionada.', rescue: 'Em duplas, uma pessoa navega e a outra observa; depois trocam.' }
    },
    {
      title: 'Desafio sem impressão', block: 4, layout: 'dense-cards', kicker: '10 grupos · 20 minutos · caderno ou software', heading: 'Criem uma tela para a Mostra Criativa',
      lede: 'Conteúdo obrigatório: sexta-feira · 19h · auditório · botão “Confirmar presença”.',
      cards: [
        { eyebrow: '1. Clareza', title: 'Entende em 3 segundos?', text: 'O nome do evento e as informações principais precisam ser encontrados rapidamente.' },
        { eyebrow: '2. Hierarquia', title: 'O que aparece primeiro?', text: 'Escolham a informação mais importante e deem mais destaque a ela.' },
        { eyebrow: '3. Caminho', title: 'Onde a pessoa clicaria?', text: 'Desenhem um botão claro com o texto “Confirmar presença”.' },
        { eyebrow: '4. Feedback', title: 'O que acontece depois?', text: 'Escrevam a resposta da tela: “Presença confirmada!”' }
      ],
      promptLabel: 'Tempo e entrega',
      prompt: 'Caderno ou software: 12 min para criar + 5 min para conferir + 3 min para preparar. Uma entrega por grupo.',
      resource: { href: 'https://excalidraw.com/', label: 'Abrir Excalidraw (opcional)' },
      teacher: { speech: 'Não precisa imprimir nem desenhar bonito. Cada grupo escolhe caderno, Excalidraw ou outro editor já disponível. Todos os dados estão projetados.', steps: ['Mantenho os 10 grupos.', 'Cada grupo escolhe caderno ou software.', 'Marco 12 minutos para criar.', 'Dou 5 minutos para conferir as quatro perguntas.', 'Dou 3 minutos para escolher uma decisão para explicar.'], watch: 'A entrega tem título, data, horário, local, botão, feedback e quatro respostas curtas.', rescue: 'Se o software ou a internet falhar, o grupo continua no caderno. Se travar na composição, desenho três blocos no quadro: título, informações e botão.' }
    },
    {
      title: 'Como apresentar a tela', block: 4, kicker: '30 segundos por grupo', heading: 'Mostrem uma decisão — não contem tudo',
      lede: 'Cada grupo escolhe somente uma decisão para explicar com clareza.',
      cards: [
        { eyebrow: '1. Conteúdo', title: '“Criamos...”', text: 'Mostrem rapidamente onde estão título, data, horário e local.' },
        { eyebrow: '2. Decisão', title: '“Destacamos...”', text: 'Expliquem o que deve ser percebido primeiro e por quê.' },
        { eyebrow: '3. Ação', title: '“Depois do clique...”', text: 'Mostrem o botão e a mensagem “Presença confirmada!”' }
      ],
      prompt: 'Frase-modelo: “Destacamos o título porque a pessoa precisa entender o evento antes de confirmar.”',
      teacher: { speech: 'Cronometro 30 segundos por grupo. Não peço que expliquem o desenho inteiro; uma decisão bem justificada é suficiente.', steps: ['Dou 2 minutos de preparação.', 'Ouço os grupos por até 30 segundos.', 'Faço um reforço curto ligado ao critério.', 'Fecho comparando soluções diferentes para o mesmo conteúdo.'], watch: 'Cada fala nomeia uma decisão e explica como ela ajuda.', rescue: 'Sem tempo, peço que três grupos mostrem a página e leio uma decisão de cada.' }
    },
    {
      title: 'Seu primeiro olhar de designer', block: 4, kicker: 'Síntese da primeira aula', heading: 'Observar antes de criar',
      lede: 'Design Web não começa na ferramenta. Começa entendendo pessoas, tarefas, conteúdo e caminhos.',
      bullets: ['Interface é um conjunto de decisões.', 'Bonito não basta: a experiência precisa ajudar alguém.', 'História e tecnologia mudam o comportamento.', 'Critérios tornam a opinião explicável.', 'Testar revela problemas que o criador não percebe sozinho.'],
      prompt: 'Bilhete de saída: complete “Design Web serve para...” e cite um critério aprendido hoje.',
      teacher: { speech: 'Fecho retomando as palavras que apareceram no quadro. Não antecipo um produto; deixo apenas a curiosidade sobre como a web leva uma experiência até a tela.', steps: ['Dou 2 minutos de silêncio.', 'Recolho o bilhete.', 'Ouço duas respostas.', 'Apresento o tema da Aula 02 em uma frase.'], watch: 'Cada estudante formula uma definição própria e cita um critério.', rescue: 'Bilhete oral em uma rodada rápida.' }
    }
  ]
});

const supportOutput = `/* Anotações de aula do Prof. Daniel Marcos Mayer. */\nwindow.SENAI_TEACHING_SUPPORT = ${JSON.stringify(support, null, 2)};\n`;
fs.writeFileSync(supportPath, supportOutput);

const workbookPath = path.join(projectRoot, 'modelos/design-web/materiais-de-aula/index.html');
let workbook = fs.readFileSync(workbookPath, 'utf8');

function replaceArticle(html, id, article) {
  const expression = new RegExp(`<article\\b[^>]*\\bid="${id}"[\\s\\S]*?<\\/article>`);
  if (!expression.test(html)) throw new Error(`Material ${id} não encontrado.`);
  return html.replace(expression, article.trim());
}

function examArticle(version, questions) {
  const lower = version.toLowerCase();
  const questionMarkup = questions.map((question, index) => {
    const q = index + 1;
    const alternatives = question.options.map((option, optionIndex) => {
      const letter = String.fromCharCode(65 + optionIndex);
      return `<label for="exam-${lower}-q${q}-${letter.toLowerCase()}"><input id="exam-${lower}-q${q}-${letter.toLowerCase()}" name="exam-${lower}-q${q}" data-save type="radio"><b>${letter}</b><span>${option}</span></label>`;
    }).join('');
    return `<fieldset class="exam-question"><legend><span>${q}</span>${question.text}</legend><div class="exam-options">${alternatives}</div></fieldset>`;
  }).join('\n');

  return `<article class="sheet exam-sheet" id="prova-${lower}" data-sheet="prova-${lower}" aria-labelledby="prova-${lower}-title">
    <header class="sheet__header"><div><p class="sheet__number">Avaliação contextualizada</p><h2 id="prova-${lower}-title">Prova ${version}</h2><p>Decisões de design, conteúdo, experiência, acessibilidade e presença digital. Não há questões de sintaxe.</p></div><span class="time-chip">10 questões</span></header>
    <div class="exam-identification"><label>Nome <input aria-label="Nome do estudante"></label><label>Turma <input aria-label="Turma"></label><label>Data <input aria-label="Data"></label></div>
    <section class="exam-rules"><h3>Uma alternativa por questão</h3><p>Leia a situação, identifique o problema de comunicação e escolha a decisão mais adequada.</p></section>
    ${questionMarkup}
    <footer class="sheet__footer">Design Web · Prof. Daniel Marcos Mayer · Prova ${version}</footer>
  </article>`;
}

const examA = [
  { text: 'Um card de evento tem título, data e botão com o mesmo tamanho e peso. Qual ajuste melhora a hierarquia?', options: ['Diminuir todo o conteúdo igualmente.', 'Destacar o título, manter a data secundária e dar contraste ao botão.', 'Usar cinco famílias tipográficas.', 'Centralizar todos os textos sem avaliar o conteúdo.'], answer: 'B' },
  { text: 'No celular, o texto principal aparece depois de três imagens decorativas. O que priorizar?', options: ['Manter a ordem do desktop.', 'Ocultar o texto.', 'Colocar mensagem e ação principal antes das imagens secundárias.', 'Reduzir tudo até caber na mesma linha.'], answer: 'C' },
  { text: 'Uma equipe encontrou uma foto numa busca, mas não localizou autoria nem licença. O que deve fazer?', options: ['Usar porque apareceu na busca.', 'Publicar e citar o buscador.', 'Escolher uma fonte autorizada e registrar autor, origem e licença.', 'Aplicar filtro para transformar a imagem.'], answer: 'C' },
  { text: 'Usuários não percebem se um formulário foi concluído. Qual solução de interação é mais adequada?', options: ['Retirar o botão.', 'Mostrar confirmação clara e indicar o próximo passo.', 'Trocar a cor do fundo sem mensagem.', 'Abrir outra página sem aviso.'], answer: 'B' },
  { text: 'Qual evidência indica um problema real de usabilidade?', options: ['O designer não gosta da cor.', 'Três usuários travam na mesma tarefa e o observador registra o ponto.', 'A equipe prefere outro aplicativo.', 'A tendência do mês usa outro estilo.'], answer: 'B' },
  { text: 'Um post fica legível no computador, mas o texto é minúsculo no celular. Qual revisão é prioritária?', options: ['Aumentar legibilidade e testar no tamanho real.', 'Exportar com mais efeitos.', 'Adicionar mais texto.', 'Trocar a ordem dos arquivos.'], answer: 'A' },
  { text: 'Um relatório mostra muitos acessos e poucas pessoas chegando ao contato. O dado permite concluir o quê?', options: ['A causa exata já está provada.', 'Existe um sinal no caminho que precisa ser investigado por teste ou observação.', 'O projeto deve trocar a marca.', 'A solução é instalar mais métricas pessoais.'], answer: 'B' },
  { text: 'Qual conjunto forma uma presença digital multimídia coerente?', options: ['Peças com estilos diferentes e sem público definido.', 'Logo isolado e um texto longo.', 'Identidade, protótipo, post, story e vídeo alinhados ao mesmo briefing.', 'Somente uma página publicada.'], answer: 'C' },
  { text: 'Em uma equipe, duas propostas visuais entram em conflito. Qual conduta profissional é adequada?', options: ['Escolher a proposta do integrante mais velho.', 'Votar sem apresentar critérios.', 'Comparar as propostas com briefing, público e teste e registrar a decisão.', 'Produzir as duas até o fim.'], answer: 'C' },
  { text: 'Antes de publicar um protótipo, qual verificação é indispensável?', options: ['Inserir dados pessoais para parecer real.', 'Conferir créditos, links, legibilidade, versão mobile e ausência de dados pessoais.', 'Apagar o registro de testes.', 'Usar conta pessoal de analytics.'], answer: 'B' }
];

const examB = [
  { text: 'Uma página tem quatro botões idênticos disputando atenção. Qual decisão melhora o caminho?', options: ['Definir uma ação principal e reduzir a ênfase das secundárias.', 'Aumentar todos os botões.', 'Usar uma cor diferente em cada botão.', 'Retirar os rótulos.'], answer: 'A' },
  { text: 'Na adaptação para story, parte do texto fica coberta pelos controles da plataforma. O que fazer?', options: ['Manter porque o arquivo está no tamanho correto.', 'Mover informações essenciais para a área segura e testar no celular.', 'Diminuir a resolução.', 'Adicionar mais texto ao rodapé.'], answer: 'B' },
  { text: 'Uma imagem comunica horário e local de um evento. Qual alternativa textual é mais adequada?', options: ['imagem123.jpg', 'Imagem bonita.', 'Cartaz do evento com data, horário e local informados de forma equivalente.', 'Não precisa de alternativa porque há cores.'], answer: 'C' },
  { text: 'Qual atividade demonstra arquitetura de informação?', options: ['Escolher um filtro de fotografia.', 'Organizar conteúdos em categorias e testar se alguém encontra uma informação.', 'Exportar um vídeo.', 'Aumentar o contraste de um título.'], answer: 'B' },
  { text: 'Um teste mostra que pessoas tentam tocar numa imagem que não é interativa. Qual melhoria é coerente?', options: ['Ignorar porque o protótipo está correto.', 'Tornar a ação clara ou retirar a aparência de elemento clicável.', 'Adicionar uma animação aleatória.', 'Esconder a imagem no desktop.'], answer: 'B' },
  { text: 'Qual combinação tende a melhorar acessibilidade visual?', options: ['Baixo contraste e texto condensado.', 'Texto legível, contraste verificado e hierarquia consistente.', 'Informação apenas pela cor.', 'Botões pequenos e próximos.'], answer: 'B' },
  { text: 'Uma plataforma visual resolve o projeto no prazo, mas limita personalização. Qual decisão é profissional?', options: ['Descartar sem análise.', 'Comparar prazo, autonomia, manutenção e necessidade do cliente.', 'Escolher sempre desenvolvimento sob medida.', 'Usar a ferramenta mais popular.'], answer: 'B' },
  { text: 'Qual entrega melhor comprova processo de design?', options: ['Somente a peça final.', 'Briefing, referências, alternativas, teste, melhoria e solução final.', 'Uma pasta sem nomes padronizados.', 'Capturas sem explicação.'], answer: 'B' },
  { text: 'Uma métrica cai depois de uma mudança visual. Qual próximo passo é mais adequado?', options: ['Reverter sem investigar.', 'Formular hipótese, observar usuários e comparar evidências.', 'Adicionar um rastreador pessoal.', 'Trocar toda a identidade.'], answer: 'B' },
  { text: 'Na apresentação final, o que torna a defesa convincente?', options: ['Listar ferramentas usadas.', 'Mostrar problema, público, decisões, teste, melhoria e coerência entre as peças.', 'Ler todo o briefing.', 'Exibir apenas o vídeo.'], answer: 'B' }
];

const answersA = examA.map((question, index) => `<li><strong>${index + 1} · ${question.answer}.</strong> ${question.text}</li>`).join('');
const answersB = examB.map((question, index) => `<li><strong>${index + 1} · ${question.answer}.</strong> ${question.text}</li>`).join('');

workbook = workbook
  .replace('01 · CSS', '01 · Estilo visual')
  .replace('01 · Cartão Pixel Perfeito', '01 · Raio-X de estilo')
  .replace('Escrever, testar e compartilhar durante a aula', 'Criar, testar e compartilhar sem programação')
  .replace(/<p>Os serviços abaixo são apoios temporários\.[\s\S]*?<\/p>\s*<\/div>\s*<div class="lab-note__links">[\s\S]*?<\/div>\s*<p class="lab-note__rule">[\s\S]*?<\/p>/,
    `<p>As ferramentas são apoios para composição, imagem, protótipo e publicação assistida. A entrega oficial é a pasta local com briefing, referências, arquivos editáveis, exportações e registro de teste.</p>
      </div>
      <div class="lab-note__links">
        <a href="https://www.photopea.com/" target="_blank" rel="noopener noreferrer"><strong>Photopea</strong><span>Composição e edição de imagem sem login</span></a>
        <a href="#wireframe"><strong>Caderno local</strong><span>Wireframe, protótipo, teste e avaliação no navegador</span></a>
      </div>
      <p class="lab-note__rule"><strong>Regra de uso:</strong> trabalhar com clientes e dados fictícios, salvar editável e exportação na pasta local e não inserir senha, token ou dado pessoal.</p>`);

workbook = replaceArticle(workbook, 'pixel', `<article class="sheet" id="pixel" data-sheet="pixel" aria-labelledby="pixel-title">
  <header class="sheet__header"><div><p class="sheet__number">Atividade 01 · Identidade visual</p><h2 id="pixel-title">Raio-X de estilo</h2><p>Comparar escolhas visuais e construir um painel de estilo coerente.</p></div><span class="time-chip">45–60 min</span></header>
  <section class="activity-brief"><div><p class="kicker">Missão</p><h3>Uma marca, três personalidades</h3><p>Observe as referências projetadas e registre o que muda em cor, tipografia, forma, espaçamento, imagem e tom. Depois crie uma direção visual para o cliente fictício.</p></div></section>
  <div class="form-grid">
    <label class="field"><span>Cliente fictício e público</span><textarea data-save rows="3"></textarea></label>
    <label class="field"><span>Três palavras de personalidade</span><textarea data-save rows="3"></textarea></label>
    <label class="field"><span>Paleta e função de cada cor</span><textarea data-save rows="4"></textarea></label>
    <label class="field"><span>Tipografia e hierarquia</span><textarea data-save rows="4"></textarea></label>
    <label class="field field--full"><span>Componentes: botão, cartão, título e imagem</span><textarea data-save rows="5"></textarea></label>
    <label class="field field--full"><span>Como o painel atende contraste e legibilidade?</span><textarea data-save rows="3"></textarea></label>
  </div>
  <section class="worksheet"><h3>Conferência por outra equipe</h3><label><input data-save type="checkbox"> A personalidade pode ser percebida sem explicação.</label><label><input data-save type="checkbox"> As cores têm contraste suficiente.</label><label><input data-save type="checkbox"> Títulos, textos e ações formam hierarquia clara.</label></section>
  <footer class="sheet__footer">Design Web · Prof. Daniel Marcos Mayer</footer>
</article>`);

workbook = replaceArticle(workbook, 'estudos', `<article class="sheet" id="estudos" data-sheet="estudos" aria-labelledby="estudos-title">
  <header class="sheet__header"><div><p class="sheet__number">Atividade 08 · Preparação para avaliação</p><h2 id="estudos-title">Roteiro de estudos</h2><p>Revisão por situações de design: observar, decidir, justificar e conferir.</p></div><span class="time-chip">4 ciclos</span></header>
  <div class="study-cycles">
    <section><span>01</span><h3>Comunicação visual</h3><p>Hierarquia, cor, tipografia, contraste, proximidade, alinhamento e grade.</p><label><input data-save type="checkbox"> revisão concluída</label></section>
    <section><span>02</span><h3>Conteúdo e campanha</h3><p>Briefing, público, direitos de uso, formatos, post, story e audiovisual.</p><label><input data-save type="checkbox"> revisão concluída</label></section>
    <section><span>03</span><h3>UX e acesso</h3><p>Fluxo, feedback, responsividade visual, acessibilidade e teste.</p><label><input data-save type="checkbox"> revisão concluída</label></section>
    <section><span>04</span><h3>Projeto</h3><p>Pesquisa, wireframe, protótipo, publicação assistida, métrica e apresentação.</p><label><input data-save type="checkbox"> revisão concluída</label></section>
  </div>
  <section class="worksheet"><h3>Mini-simulado aberto</h3><ol class="question-list">
    <li><label>Como criar hierarquia entre título, texto e botão?<textarea data-save rows="2"></textarea></label></li>
    <li><label>Por que testar uma peça no celular em tamanho real?<textarea data-save rows="2"></textarea></label></li>
    <li><label>Qual a diferença entre evidência, hipótese e opinião?<textarea data-save rows="2"></textarea></label></li>
    <li><label>Indique quatro verificações antes de publicar.<textarea data-save rows="3"></textarea></label></li>
  </ol></section>
  <footer class="sheet__footer">Design Web · Prof. Daniel Marcos Mayer</footer>
</article>`);

workbook = replaceArticle(workbook, 'prova-a', examArticle('A', examA));
workbook = replaceArticle(workbook, 'prova-b', examArticle('B', examB));
workbook = replaceArticle(workbook, 'gabarito', `<article class="sheet sheet--wide answer-document" id="gabarito" data-sheet="gabarito" aria-labelledby="gabarito-title">
  <header class="sheet__header"><div><p class="sheet__number">Documento de correção</p><h2 id="gabarito-title">Gabarito comentado</h2><p>As justificativas devem retomar critérios de comunicação, inclusão e processo.</p></div><span class="time-chip">Provas A e B</span></header>
  <section><h3>Prova A</h3><ol>${answersA}</ol></section>
  <section><h3>Prova B</h3><ol>${answersB}</ol></section>
  <footer class="sheet__footer">Design Web · Prof. Daniel Marcos Mayer · Gabarito</footer>
</article>`);

workbook = replaceArticle(workbook, 'rubrica', `<article class="sheet sheet--wide" id="rubrica" data-sheet="rubrica" aria-labelledby="rubrica-title">
  <header class="sheet__header"><div><p class="sheet__number">Projeto integrador</p><h2 id="rubrica-title">Rubrica de presença digital</h2><p>Processo, coerência visual, experiência e comunicação multimídia.</p></div><span class="time-chip">100 pontos</span></header>
  <div class="rubric-scale"><span><strong>4</strong> consistente</span><span><strong>3</strong> adequado</span><span><strong>2</strong> parcial</span><span><strong>1</strong> inicial</span><span><strong>0</strong> não apresentado</span></div>
  <div class="table-wrap"><table class="data-table rubric-table"><caption>Critérios e evidências do projeto</caption><thead><tr><th>Critério</th><th>Peso</th><th>4 · consistente</th><th>3 · adequado</th><th>2 · parcial</th><th>1 · inicial</th><th>Nível</th></tr></thead><tbody>
    <tr><th>Briefing e pesquisa</th><td>15</td><td>Público, problema, referências e objetivo articulados.</td><td>Base clara com pequenas lacunas.</td><td>Pesquisa genérica.</td><td>Problema ou público indefinido.</td><td><select data-save data-rubric data-weight="15"><option value="">—</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option></select></td></tr>
    <tr><th>Identidade visual</th><td>20</td><td>Sistema coerente, legível e adequado ao público.</td><td>Identidade funcional.</td><td>Inconsistências visíveis.</td><td>Escolhas sem direção comum.</td><td><select data-save data-rubric data-weight="20"><option value="">—</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option></select></td></tr>
    <tr><th>Peças de campanha</th><td>20</td><td>Post, story e audiovisual coerentes e tecnicamente conferidos.</td><td>Conjunto completo com ajustes menores.</td><td>Peças incompletas ou pouco coerentes.</td><td>Conjunto não comunica a campanha.</td><td><select data-save data-rubric data-weight="20"><option value="">—</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option></select></td></tr>
    <tr><th>Protótipo responsivo</th><td>20</td><td>Hierarquia e navegação claras em desktop e mobile.</td><td>Fluxo funcional com ajustes menores.</td><td>Quebras ou caminhos confusos.</td><td>Telas desconectadas ou incompletas.</td><td><select data-save data-rubric data-weight="20"><option value="">—</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option></select></td></tr>
    <tr><th>Acessibilidade e teste</th><td>15</td><td>Barreiras verificadas e teste conduz a melhorias registradas.</td><td>Critérios principais atendidos.</td><td>Teste ou correção parcial.</td><td>Não há evidência de verificação.</td><td><select data-save data-rubric data-weight="15"><option value="">—</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option></select></td></tr>
    <tr><th>Processo e apresentação</th><td>10</td><td>Arquivos organizados e decisões defendidas com evidências.</td><td>Entrega clara e organizada.</td><td>Faltam registros ou clareza.</td><td>Entrega desorganizada.</td><td><select data-save data-rubric data-weight="10"><option value="">—</option><option>4</option><option>3</option><option>2</option><option>1</option><option>0</option></select></td></tr>
  </tbody></table></div>
  <div class="score-box" aria-live="polite"><span>Pontuação calculada</span><strong id="rubricScore">— / 100</strong><small>pontos = nível ÷ 4 × peso</small></div>
  <footer class="sheet__footer">Design Web · Prof. Daniel Marcos Mayer</footer>
</article>`);

workbook = replaceArticle(workbook, 'recuperacao', `<article class="sheet" id="recuperacao" data-sheet="recuperacao" aria-labelledby="recuperacao-title">
  <header class="sheet__header"><div><p class="sheet__number">Atividade 13 · Recuperação da aprendizagem</p><h2 id="recuperacao-title">Clínica de redesign</h2><p>Nova evidência por análise, correção e justificativa — sem programação.</p></div><span class="time-chip">Percurso individual</span></header>
  <aside class="scenario"><h3>Presença digital · Feira Inventário</h3><p>O estudante recebe briefing, peças e protótipo com problemas de hierarquia, contraste, coerência, adaptação mobile e navegação.</p></aside>
  <ol class="recovery-path">
    <li><div class="recovery-path__number">1</div><div><h3>Diagnosticar</h3><p>Marcar cinco problemas usando critérios da UC e priorizar três.</p><label><input data-save type="checkbox"> evidência conferida</label></div></li>
    <li><div class="recovery-path__number">2</div><div><h3>Redesenhar</h3><p>Corrigir uma tela mobile e uma peça social, preservando conteúdo essencial.</p><label><input data-save type="checkbox"> evidência conferida</label></div></li>
    <li><div class="recovery-path__number">3</div><div><h3>Testar</h3><p>Aplicar uma tarefa curta com colega e registrar dificuldade e ajuste.</p><label><input data-save type="checkbox"> evidência conferida</label></div></li>
    <li><div class="recovery-path__number">4</div><div><h3>Justificar</h3><p>Apresentar antes/depois e relacionar cada mudança ao público e ao teste.</p><label><input data-save type="checkbox"> evidência conferida</label></div></li>
  </ol>
  <section class="delivery-check"><h3>Composição da entrega</h3><label><input data-save type="checkbox"> diagnóstico anotado</label><label><input data-save type="checkbox"> tela mobile redesenhada</label><label><input data-save type="checkbox"> peça social redesenhada</label><label><input data-save type="checkbox"> ficha de teste</label><label><input data-save type="checkbox"> reflexão antes/depois</label></section>
  <footer class="sheet__footer">Design Web · Prof. Daniel Marcos Mayer</footer>
</article>`);

fs.writeFileSync(workbookPath, workbook);

const workbookReadmePath = path.join(projectRoot, 'modelos/design-web/materiais-de-aula/README.md');
const workbookReadme = `# Materiais de aula — Design Web

Caderno local e imprimível da UC Design Web, com foco em presença digital, comunicação visual, prototipação, mídias sociais, acessibilidade e avaliação.

## Princípio pedagógico

- não há programação discente;
- exemplos técnicos servem apenas à demonstração e ao reconhecimento de bastidores;
- cada aula combina explicação curta, exemplo, prática com resultado visível, critérios e plano B;
- a entrega oficial permanece na pasta local, sem dados pessoais.

## Materiais

1. Raio-X de estilo
2. Conserte a composição
3. Briefing
4. Sitemap e fluxo
5. Wireframe desktop/mobile
6. Teste de usabilidade
7. Métricas fictícias
8. Roteiro de estudos
9. Prova A
10. Prova B
11. Gabarito
12. Rubrica de presença digital
13. Clínica de redesign para recuperação

As provas não cobram sintaxe. A rubrica distribui 100 pontos entre briefing e pesquisa, identidade visual, peças de campanha, protótipo responsivo, acessibilidade e teste, processo e apresentação.
`;
fs.writeFileSync(workbookReadmePath, workbookReadme);

const siteBaseReadmePath = path.join(projectRoot, 'modelos/design-web/site-base/README.md');
fs.writeFileSync(siteBaseReadmePath, `# Modelo demonstrativo · Design Web

Este site é um recurso preparado para demonstração docente e publicação assistida.

Os estudantes não precisam abrir ou editar os arquivos técnicos. A equipe entrega briefing, identidade, textos, imagens autorizadas, protótipo e peças de campanha; o professor ou um ambiente institucional incorpora o conteúdo aprovado ao modelo e publica o link.

Uso previsto:

- comparar estrutura, aparência e comportamento de uma interface;
- demonstrar, sem prática de programação, a função de HTML, CSS e JavaScript;
- validar hierarquia, responsividade, navegação e acessibilidade;
- apoiar a publicação assistida nas Aulas 10 e 28.

Clientes e dados são fictícios. Não inserir nome, foto, telefone, localização, senha, token ou rastreador pessoal.
`);

const ucPagePath = path.join(projectRoot, 'uc-design-web.html');
let ucPage = fs.readFileSync(ucPagePath, 'utf8');
ucPage = ucPage.replace(
  /<meta name="description" content="[^"]*">/,
  '<meta name="description" content="Planejamento de 29 aulas de Design Web com foco em comunicação visual, prototipação, mídias sociais, acessibilidade e presença digital.">'
);
fs.writeFileSync(ucPagePath, ucPage);

console.log(`Reformulação sem programação aplicada a ${designPlanningPath}, ${designTeachingPath} e aos materiais locais.`);
