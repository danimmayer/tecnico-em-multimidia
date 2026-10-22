// Fonte regenerável: node scripts/build-audiovisual.mjs.
export const lesson = {
  title: 'Chroma key e correção de cor',
  description: 'Trocar o fundo de um personagem no Shotcut, preservar suas bordas e aproximar a cor de dois planos. Uma oficina com mídia pronta, comparação antes e depois e entrega local em MP4.',
  objectives: ['Edição de vídeos e sons: chroma key, efeitos e tratamento de vídeo.'],
  technical: ['Aplicar ajustes de cor, chroma key, efeitos visuais e sonoros.'],
  socioemotional: ['Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.'],
  schedule: [
    {horario: '19:00 - 19:45', atividade: 'Ver a troca de fundo acontecer, abrir o kit e conseguir a primeira composição antes do lanche.'},
    {horario: '20:05 - 21:00', atividade: 'Transformar o personagem em apresentador ou gigante, descobrir por que um crachá desaparece e criar duas versões com cenários e enquadramentos diferentes.'},
    {horario: '21:00 - 21:40', atividade: 'Comparar dois planos, corrigir brilho e dominante de cor e criar uma versão com tratamento visual intencional.'},
    {horario: '21:40 - 22:10', atividade: 'Exportar composição e comparação de cor, assistir fora do editor e corrigir um problema apontado pelo colega do lado.'}
  ],
  methodology: 'Oficina individual com demonstrações de até dois minutos, imediatamente seguidas de prática. A primeira troca de fundo aparece no projetor nos cinco minutos iniciais e cada estudante tenta sua primeira composição antes do lanche. Os pedidos são revelados um de cada vez. Cada pedido tem critério de pronto e uma variação visual para quem termina antes. As janelas longas são divididas em pequenas rodadas: criar, mostrar ao vizinho e mudar uma decisão; não passar todo o tempo refinando um filtro. Em postos compartilhados, alternar a operação a cada pedido. A evidência aparece na tela e nos arquivos locais, sem fichas.',
  resources: 'Projetor, computadores com Shotcut já disponível, fones de ouvido e kit Aula13-Shotcut.zip copiado para o disco local. Editor gratuito e de código aberto; sem conta e sem upload. O kit contém dois clipes sintéticos de chroma, dois cenários próprios e dois planos de Caminandes 3 com créditos CC BY 3.0. Nenhuma ficha impressa.',
  observation: 'Aula das 19:00 às 22:10, com lanche das 19:45 às 20:05 e chamada no início de cada bloco. A turma permanece nos postos; somente o professor circula. Preparar o Shotcut e distribuir o ZIP antes da aula por rede local ou pendrive; testar importação, duas trilhas e exportação no computador do laboratório. Não depender de projetos anteriores, tecido verde ou novas gravações. Os exemplos sintéticos isolam o funcionamento da chave; não representam a dificuldade de cabelo, sombras e reflexos de uma captação real. Os pedidos chegam um de cada vez; quem termina melhora o pedido atual. Não esperar todos atingirem perfeição para revelar uma variação: avançar quando a maioria tiver o resultado básico e ajudar os demais nos postos. Demonstrações de até dois minutos; evitar explicações sobre parâmetros antes de uma necessidade visível. Não buscar recorte perfeito no exemplo sintético. A captação entra só como resposta a um problema; o crachá é uma surpresa rápida no projetor, sem exigir troca de clipe em todos os postos. Manter a pasta com mídias, projetos .mlt, MP4 e créditos. Nenhum envio coletivo. Se um posto falhar, trabalhar com o colega do lado; se o editor ficar indisponível em toda a sala, usar as comparações prontas e registrar no caderno a ordem das camadas e os ajustes propostos, retomando a exportação no próximo encontro.'
};

const base = 'modelos/producao-audiovisual/aula-13/';
const teacher = (minutes, action, watch, rescue) => ({steps: minutes ? [`${minutes} min · ${action}`] : [], watch, rescue});
const checks = items => ({type: 'checks', items: items.map(([label, text]) => ({label, text}))});
const table = (columns, rows) => ({type: 'table', variant: 'data', columns, rows});
const stills = images => ({type: 'stills', images: images.map(([file, label, text]) => ({src: base + 'telas/' + file, label, text}))});
const commands = (items, result) => ({type: 'commands', commands: items.map(([word, who, text]) => ({word, who, text})), tags: [{label: 'TERMINOU ANTES?', kind: 'good'}], result});
const help = {
  'Pedido 1 · Duas trilhas': ['camadas', 'Só aparece verde? Isso é esperado nesta etapa.'],
  'Primeira transformação': ['recorte', 'Fundo preto ou personagem sumindo? Veja como resolver.'],
  'Pedido 2 · Apresentador ou gigante': ['compor', 'Não acha o filtro de tamanho? Consulte o caminho.'],
  'Pedido 4 · Aproximar os planos': ['cor', 'Os dois planos mudaram? Confira qual clipe está selecionado.'],
  'Pedido 5 · Preservar a correção': ['estilo', 'Como salvar outra versão e criar o estilo?']
};
const request = (title, heading, lede, block, items, done, extra, notes) => ({title, kicker: 'Pedido do cliente', heading, lede, block, av9: commands(items, extra), promptLabel: 'Pronto quando', prompt: done, resources: [{href: base + 'AJUDA.html#' + help[title][0], label: help[title][1]}], teacher: notes});

export const support = {
  teacherGoal: 'Cada estudante cria uma composição de seis segundos com chroma e uma comparação de doze segundos entre referência e plano corrigido, salvando projetos e MP4 até 22:10.',
  plainLanguage: 'Chroma key torna uma cor transparente para revelar outra trilha. Correção aproxima os planos de uma referência; tratamento cria uma aparência intencional depois da correção.',
  say: 'O cliente quer esse personagem em outro lugar. Vocês vão escolher onde e como ele aparece. Se travarem, o pedido e a ajuda mostram o próximo passo. Eu circulo para ajudar no que continuar bloqueando.',
  demo: ['Extraio o ZIP no disco local e salvo um projeto dentro da pasta.', 'Coloco cenário na V1 e personagem na V2, alinhados no começo.', 'Seleciono o clipe da V2 e aplico Chroma Key: Simple com o conta-gotas.', 'Subo Distance aos poucos e mostro quando uma parte do personagem some.', 'Em outro projeto, comparo referência e plano alterado; ajusto brilho, balanço de branco e saturação com os filtros desligados e ligados.', 'Exporto e abro o MP4 fora do Shotcut.'],
  studentDeliverable: 'Na pasta Aula13-Shotcut: cenario.mlt e cenario.mp4 (6 s), cor.mlt e cor.mp4 (12 s: referência de 6 s seguida do plano corrigido de 6 s). Manter as mídias e CREDITOS.txt junto dos projetos. Mostrar no próprio posto.',
  check: ['Cenário em V1 e personagem em V2, ambos com seis segundos e o mesmo início.', 'O verde foi removido sem apagar mãos, olhos ou corpo.', 'O cenário aparece através da área removida e não há quadro preto no final.', 'Referência e plano corrigido têm brilho e dominante de cor próximos, com detalhe nas áreas claras.', 'O tratamento opcional foi salvo em outra versão, preservando a correção.', 'Os dois MP4 abrem fora do editor e os projetos abrem com as mídias presentes.', 'Os créditos acompanham a entrega.'],
  fallback: 'Um posto sem editor compartilha a operação com o vizinho. Sem editor em toda a sala, projeto as comparações locais, peço a ordem de camadas e os ajustes no caderno e retomo a produção dos arquivos no próximo encontro. Essa análise não substitui a entrega prática.',
  extension: 'Trocar o cenário, comparar o recorte em fundo claro e escuro ou criar um tratamento em cópia do projeto. Oferecer uma nova escolha visual assim que o resultado básico estiver pronto; não exigir repetição do mesmo ajuste enquanto a turma conclui.',
  commonProblems: [
    ['O verde virou preto', 'Confiro se existe imagem na V1, sob o personagem, e se as duas trilhas começam juntas.'],
    ['O cenário cobre o personagem', 'Confiro a ordem: V2 personagem; V1 cenário.'],
    ['O personagem desaparece', 'Desfaço o último ajuste, seleciono o verde com o conta-gotas e reduzo Distance. O crachá verde do segundo clipe desaparece por ter a mesma cor do fundo.'],
    ['Aparece contorno verde', 'Confiro a cor amostrada e aumento Distance em pequenos passos. Em captura real, testo Key Spill: Simple depois da chave, sem apagar detalhes.'],
    ['A correção muda os dois planos', 'Seleciono o clipe alterado, não o cabeçalho da trilha nem a saída do projeto.'],
    ['O branco ficou sem detalhe', 'Reduzo Brightness e comparo o detalhe da neve com a referência.'],
    ['O projeto abre sem mídia', 'Restauro a pasta original e religo os arquivos; o .mlt não contém os vídeos.'],
    ['A prévia está lenta', 'Reduzo a resolução de prévia e testo um trecho exportado antes de mudar os filtros.']
  ],
  presentationSlides: [
    {title: 'Ordem do dia', kicker: 'Aula 13 · Shotcut', heading: 'Um personagem. Outro cenário.', lede: 'Trocar o fundo, preservar o recorte e aproximar a cor dos planos.', block: 1,
      av9: {type: 'day', rows: [
        {time: '19:00–19:45', minutes: 45, title: 'Primeira transformação', text: 'Fazer o fundo mudar antes do lanche.'},
        {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Salvar antes de sair.', pause: true},
        {time: '20:05–21:00', minutes: 55, title: 'Mudar a cena', text: 'Apresentador, gigante e dois cenários.'},
        {time: '21:00–21:40', minutes: 40, title: 'Aproximar a cor', text: 'Referência, correção e tratamento.'},
        {time: '21:40–22:10', minutes: 30, title: 'Exportar e conferir', text: 'Dois MP4 no computador.'}
      ]}, teacher: teacher(2, 'Faço a chamada e apresento a missão em uma frase.', 'Pedidos aparecem um de cada vez.', 'Em posto compartilhado, combino a troca de operador a cada pedido.')},
    {title: 'Antes e depois', kicker: 'A cor vira transparência', heading: 'O fundo sai. O personagem fica.', lede: 'A chave remove uma cor e deixa aparecer a trilha de baixo.', block: 1,
      av9: stills([['chroma-original.jpg', 'ORIGINAL', 'Personagem sobre verde uniforme.'], ['chroma-composto.jpg', 'COMPOSIÇÃO', 'O cenário ocupa a área removida.']]),
      teacher: teacher(3, 'Mostro os quadros e, em um projeto de demonstração previamente preparado, ligo e desligo a chave. A turma vê o cenário aparecer nos cinco minutos iniciais.', 'Material sintético próprio, sem pessoa filmada. Facilita entender as camadas; cabelo real é mais difícil.', 'Se parecer corte de imagem, explico que a mesma decisão se repete em cada quadro.')},
    {title: 'Preparar a captação', kicker: 'Consulta quando surgir uma dúvida', pace: 'extra', heading: 'O recorte começa na gravação', lede: 'Hoje o kit já está gravado. Em uma produção, estas decisões vêm antes.', block: 1,
      av9: checks([['Fundo', 'Uniforme, esticado e iluminado sem manchas.'], ['Distância', 'Pessoa afastada do fundo para reduzir sombras e reflexos.'], ['Roupa', 'Sem a mesma cor escolhida para remover.'], ['Segurança', 'Cabos presos e tripés fora da passagem.']]),
      teacher: teacher(0, '', 'Pulo este slide na sequência principal. Retomo um único cuidado se surgir uma pergunta sobre gravação; não faço uma exposição dos quatro itens.', 'Uso o exemplo do crachá verde que será revelado depois.')},
    {title: 'Preparar o projeto', kicker: 'Kit local', heading: 'Extrair, abrir e salvar', lede: 'A pasta inteira fica no computador até o fim do trabalho.', block: 1,
      av9: commands([['EXTRAIR', 'Aula13-Shotcut.zip', 'Extrair a pasta para Documentos.'], ['ABRIR', 'Shotcut', 'Criar projeto na pasta extraída, com o nome cenario.'], ['FORMATO', 'Configurações → Modo de vídeo', 'HD 720p, 24 quadros por segundo.'], ['IMPORTAR', 'Lista de reprodução', 'Adicionar personagem-verde.mp4 e cenario-estudio.png.']], 'Explore os outros arquivos do kit sem alterar os originais.'),
      resources: [{href: base + 'index.html', label: 'Abrir o kit da aula 13'}],
      teacher: teacher(7, 'Demonstro a extração e a turma abre o projeto. Confiro os postos.', 'Usar o Shotcut já preparado no laboratório. Não editar dentro do ZIP.', 'Se o programa falhar, o estudante opera com o colega do lado.')},
    {title: 'Continuar por conta própria', kicker: 'Ajuda ao alcance', heading: 'Travou? Encontre seu próximo passo.', lede: 'Abram AJUDA.html da pasta extraída e deixem ao lado do Shotcut.', block: 1,
      av9: checks([['Ler', 'O pedido mostra os passos e o critério de pronto.'], ['Tentar', 'Na ajuda, encontre o que aparece na sua tela e teste a solução.'], ['Comparar', 'Se precisar, compare com o colega do lado, sem entregar o mouse.'], ['Pedir apoio', 'Se continuar bloqueado, mostre onde parou e o que tentou.']]),
      resources: [{href: base + 'AJUDA.html', label: 'Abrir ajuda com passos e soluções'}],
      teacher: teacher(3, 'A turma abre a ajuda. Mostro como achar um sintoma e voltar ao editor; não leio a página inteira.', 'A ajuda abre localmente, sem login. Não exijo uma sequência de tentativas para atender: bloqueio de acesso, programa fechado ou arquivo ausente recebe apoio imediato. Perguntas criativas e discussão continuam bem-vindas.', 'Quem não achar o arquivo usa o link do slide; distribuo a pasta completa ao posto.')},
    request('Pedido 1 · Duas trilhas', 'O cenário fica embaixo', 'Preparem as camadas antes de remover a cor.', 1,
      [['V1', 'Linha do tempo', 'Arrastar cenario-estudio.png para a primeira trilha de vídeo.'], ['DURAÇÃO', 'Propriedades', 'Definir seis segundos para o cenário.'], ['V2', 'Menu da linha do tempo', 'Adicionar trilha de vídeo e colocar personagem-verde.mp4 acima.'], ['ALINHAR', 'Começo do projeto', 'Os dois clipes começam em zero e terminam juntos.']],
      'Duas trilhas alinhadas, seis segundos cada. O verde ainda cobre o cenário.', 'Oculte a V2, veja o cenário e volte a mostrar a V2.',
      teacher(20, 'Demonstro as trilhas e acompanho a montagem; a turma salva antes do lanche.', 'V2 cobre V1 até receber transparência. Não colocar os clipes um depois do outro.', 'Se a imagem terminar cedo, ajusto sua duração antes de mexer na chave.')),
    request('Primeira transformação', 'Façam o verde desaparecer', 'Selecionem o personagem na V2 e revelem o cenário.', 1,
      [['FILTRO', 'Filtros → + → Vídeo', 'Buscar Chroma Key: Simple.'], ['ESCOLHER', 'Conta-gotas', 'Clicar no verde, longe do personagem.'], ['AJUSTAR', 'Distance', 'Mover só até o cenário aparecer sem apagar o corpo.'], ['VER', 'Reproduzir', 'Assistir à primeira composição e salvar.']],
      'O personagem aparece inteiro no novo cenário.', 'Desligue e ligue o filtro para mostrar a transformação ao colega.',
      teacher(10, 'Demonstro em até dois minutos e a turma repete no próprio posto.', 'O objetivo antes do lanche é conseguir a primeira mudança visível; não aperfeiçoar bordas.', 'Se um posto atrasar, mostro o resultado no computador vizinho e ajudo a concluir na volta.')),
    {title: 'Lanche', kicker: 'Intervalo', heading: 'Lanche até 20:05', lede: 'Salvem a primeira transformação. Na volta, o cliente muda o pedido.', block: 1, pace: 'break', av9: checks([['Salvar', 'cenario.mlt na pasta do kit.'], ['Voltar', 'Mesmo posto, mesmo projeto.']]), teacher: teacher(20, 'Lanche das 19:45 às 20:05.', 'Comida e bebida longe do computador.', 'Quem não montou as trilhas conclui no início do bloco seguinte.')},
    request('Pedido 2 · Apresentador ou gigante', 'O mesmo personagem pode mudar de papel', 'Escolham: apresentador no estúdio ou gigante sobre a cidade.', 2,
      [['ESCOLHER', 'V1', 'Manter o estúdio ou colocar cenario-noite.png.'], ['MOVER', 'Personagem na V2', 'Adicionar o filtro Size, Position & Rotate.'], ['COMPOR', 'Prévia', 'Mudar tamanho e posição: onde o personagem parece estar?'], ['MOSTRAR', 'Colega do lado', 'Ele identifica apresentador ou gigante sem ouvir sua explicação?']],
      'O tamanho e a posição ajudam o colega a reconhecer a ideia.', 'Faça a versão oposta e compare qual funciona melhor.',
      teacher(12, 'Faço a chamada, demonstro tamanho e posição em até dois minutos e abro duas rodadas: criar e testar com o vizinho.', 'Se alguém ainda não removeu o verde, ajudo no posto enquanto os demais escolhem o papel do personagem. Buscar o filtro por tamanho ou Size.', 'Se distorcer o personagem, restaurar a proporção no filtro antes de continuar.')),
    {title: 'O objeto que some', kicker: 'Surpresa no projetor', heading: 'O crachá sumiu. O que aconteceu?', lede: 'Observem a demonstração e escolham: mudar a roupa, a cor do fundo ou o tamanho do personagem?', block: 2,
      av9: checks([['Observar', 'O corpo fica, mas aparece um furo no peito.'], ['Decidir', 'Qual mudança resolveria isso antes de gravar?']]),
      teacher: teacher(5, 'No meu projeto de demonstração, mostro personagem-cracha.mp4 com a chave ligada. Ouço hipóteses, desligo o filtro para revelar o crachá verde e volto ao clipe principal.', 'Só eu troco o clipe; a turma continua com o próprio projeto. Explico em uma frase: a chave remove a cor, inclusive quando ela está na roupa.', 'Se não houver projeto pronto, abro o clipe original e aponto a mesma cor no crachá e no fundo.')},
    {title: 'Outro cenário, outra ideia', kicker: 'Duas versões', heading: 'O cliente quer uma segunda opção', lede: 'Salvem uma cópia como cenario-opcao2.mlt. Troquem o fundo e repensem tamanho e posição.', block: 2,
      av9: stills([['chroma-composto.jpg', 'FUNDO CLARO', 'Conferir mãos e antena.'], ['chroma-noite.jpg', 'FUNDO ESCURO', 'Procurar linhas verdes e partes apagadas.']]),
      promptLabel: 'Pronto quando', prompt: 'Duas opções com aparência diferente e personagem inteiro. Terminou antes? Crie um título curto para uma delas com Text: Simple.',
      resources: [{href: base + 'AJUDA.html#compor', label: 'Passos para trocar cenário, salvar cópia e inserir título'}],
      teacher: teacher(25, 'Divido a prática em três rodadas: oito minutos para mudar cenário e escala, oito para o colega escolher uma opção e nove para melhorar a escolhida. Circulo entre os postos.', 'Evitar 25 minutos no mesmo controle. Cada rodada muda uma decisão visual. O título é extra e tem passo a passo na ajuda. Não acrescento filtros de limpeza sem necessidade.', 'Se o estudante terminar cedo, proponho um cartaz de ficção científica ou uma chamada de telejornal com o mesmo personagem, mantendo os seis segundos.')},
    {title: 'Escolha do cliente', kicker: 'Comparação com o vizinho', heading: 'Qual versão comunica melhor?', lede: 'Mostrem as duas opções e digam o que cada uma deveria parecer.', block: 2,
      av9: checks([['Escolher', 'O colega aponta a opção em que a ideia aparece mais rápido.'], ['Ajustar', 'Mudem tamanho, posição ou cenário para reforçar a escolha.'], ['Guardar', 'A escolhida fica em cenario.mlt; a alternativa permanece salva.']]),
      teacher: teacher(8, 'Faço a comparação em pares vizinhos, sem apresentações em fila. Cada estudante aplica uma mudança visível.', 'A pergunta é se o papel do personagem ficou claro. Não pedir justificativa escrita ou revisão de todos os parâmetros.', 'Se a turma já decidiu, antecipo o bloco de cor em vez de estender a conversa.')},
    {title: 'Camadas conferidas', kicker: 'Fechar a composição', heading: 'Uma composição de seis segundos', lede: 'Escolham um dos cenários e salvem cenario.mlt.', block: 2,
      av9: {type: 'tracks', tracks: [{label: 'V2', clips: [{label: 'Personagem com chave', seconds: 6, kind: 'graphic'}]}, {label: 'V1', clips: [{label: 'Cenário escolhido', seconds: 6}]}], caption: 'As duas trilhas acontecem ao mesmo tempo.'},
      teacher: teacher(5, 'Confiro alinhamento e salvo com a turma.', 'A duração da composição é seis segundos, não a soma das trilhas.', 'Se houver sobra preta, ajusto as pontas antes da exportação.')},
    {title: 'Correção e tratamento', kicker: 'Dois objetivos diferentes', heading: 'Primeiro aproximar. Depois escolher um estilo.', lede: 'Abram um novo projeto chamado cor, na mesma pasta.', block: 3,
      av9: table(['Etapa', 'Pergunta', 'Decisão'], [['Correção', 'Os planos parecem da mesma cena?', 'Aproximar brilho e neutralidade.'], ['Tratamento', 'Que aparência queremos?', 'Criar um estilo em outra versão.'], ['Referência', 'Com o que comparar?', 'O primeiro plano fica sem filtros.']]),
      teacher: teacher(3, 'Faço a chamada e comparo os objetivos antes de abrir os clipes.', 'Os dois clipes têm a mesma cena por escolha didática: muda só a cor, facilitando comparar.', 'Não confundir corrigir com aumentar saturação de tudo.')},
    {title: 'Comparar a cor', kicker: 'A mesma cena', heading: 'O que mudou na neve?', lede: 'Compare a luminosidade, o azul e a intensidade das cores.', block: 3,
      av9: stills([['cor-referencia.jpg', 'REFERÊNCIA', 'O primeiro plano permanece assim.'], ['cor-alterada.jpg', 'ALTERADA', 'Aproximar este plano da referência.']]),
      teacher: teacher(2, 'Peço que apontem as diferenças antes de aplicar filtros.', 'A segunda cópia está mais escura, menos saturada e com dominante azul.', 'Se a diferença não aparecer no projetor, comparo o focinho e as áreas claras da neve.')},
    request('Pedido 4 · Aproximar os planos', 'A troca de plano precisa parecer contínua', 'Coloquem cor-referencia.mp4 e cor-alterada.mp4 em sequência na V1.', 3,
      [['REFERÊNCIA', 'Primeiro clipe · 6 s', 'Manter sem filtros e observar a neve.'], ['BRILHO', 'Segundo clipe → Filtros', 'Usar Brightness para aproximar a luminosidade, preservando detalhes.'], ['BALANÇO', 'White Balance', 'Ajustar a dominante comparando a neve e o personagem com a referência.'], ['SATURAÇÃO', 'Saturation', 'Aproximar a intensidade das cores; reproduzir a passagem.']],
      'Doze segundos: referência seguida do plano corrigido, com brilho e cor próximos.', 'Desligue os filtros do segundo clipe e confirme o que cada ajuste resolveu.',
      teacher(15, 'Demonstro brilho em até dois minutos e a turma testa; só então mostro o balanço de branco. Saturação entra para quem já aproximou os dois planos.', 'Aplicar filtros no segundo clipe. Neve da referência pode ser levemente azul: buscar continuidade, não branco absoluto. Não há um valor numérico universal.', 'Se piorar, desligo um filtro por vez, comparo e recomeço pelo brilho.')),
    request('Pedido 5 · Preservar a correção', 'Guardem o resultado antes de criar um estilo', 'Salvem cor.mlt. Depois criem uma cópia chamada cor-estilo.mlt.', 3,
      [['SALVAR', 'cor.mlt', 'Preservar a versão corrigida de doze segundos.'], ['COPIAR', 'Arquivo → Salvar como', 'Criar cor-estilo.mlt para experimentar.'], ['ESCOLHER', 'Uma direção visual', 'Frio de inverno, lembrança desbotada ou cor intensa de anúncio.'], ['CRIAR', 'Filtros já usados', 'Usar balanço de branco ou saturação e mostrar ao vizinho: ele reconhece a intenção?']],
      'A correção continua salva e a experiência de estilo está em outra versão.', 'Aplique o mesmo estilo aos dois planos e confira se continuam próximos.',
      teacher(20, 'A turma salva a correção. Em três rodadas, escolhe uma intenção, experimenta com os filtros já usados e pede ao colega que reconheça a proposta. Cada rodada termina com uma mudança na tela.', 'A exportação obrigatória é a versão corrigida. O tratamento pode ser abreviado para garantir a entrega.', 'Se faltar tempo, salvar a correção e comparar oralmente com o exemplo projetado.')),
    {title: 'Exportar', kicker: 'Duas entregas', heading: 'Projeto é editável. MP4 é para assistir.', lede: 'Exportem os dois projetos principais e esperem o término em Trabalhos.', block: 4,
      av9: commands([['CENÁRIO', 'cenario.mlt', 'Exportar o projeto completo como cenario.mp4, seis segundos.'], ['COR', 'cor.mlt', 'Exportar o projeto completo como cor.mp4, doze segundos.'], ['EXPORTAR', 'Exportar → Padrão', 'Fonte: Linha do tempo → Exportar arquivo → escolher a pasta.'], ['ABRIR', 'Pasta local', 'Esperar Trabalhos concluir; abrir os MP4 e assistir até o final.']], 'Compare o último quadro com a prévia do editor; procure sobra preta.'),
      resources: [{href: base + 'AJUDA.html#exportar', label: 'Não saiu MP4 ou só exportou um clipe? Veja a solução.'}],
      teacher: teacher(12, 'Faço a chamada e demonstro a exportação do projeto, não só do clipe selecionado.', 'Antes da aula deixo preparado MP4/H.264, 1280 × 720, 24 fps. Não dou uma explicação de codecs; a turma usa o perfil demonstrado. O kit é silencioso. Conferir Fonte: Linha do tempo e fila de trabalhos concluída.', 'Se a máquina estiver lenta, inicio pelo cenário; registro a exportação pendente da cor sem substituir a prática por captura de tela.')},
    {title: 'Teste com o colega', kicker: 'Do próprio lugar', heading: 'O colega encontra o problema?', lede: 'Mostrem os dois MP4 sem explicar os ajustes antes.', block: 4,
      av9: checks([['Recorte', 'Há furo no corpo ou linha verde na borda?'], ['Continuidade', 'A cor muda demais no corte?'], ['Duração', 'Há sobra preta ou corte antes do final?'], ['Ajuste', 'Corrigir um ponto e exportar de novo.']]),
      teacher: teacher(10, 'O colega do lado aponta um problema verificável; cada um corrige e exporta novamente se necessário.', 'Evitar apenas gostei ou não gostei. Pedir que indiquem o quadro e a região.', 'Se não houver colega disponível, faço o teste no posto.')},
    {title: 'Banco de melhorias', kicker: 'Para quem concluiu', heading: 'Um teste a mais', lede: 'Escolham um teste e preservem os arquivos finais.', block: 4, pace: 'extra',
      av9: checks([['Cenário', 'Comparar novamente fundo claro e escuro.'], ['Cor', 'Rever a passagem com os filtros desligados e ligados.'], ['Organização', 'Fechar e reabrir um projeto para conferir as mídias.']]),
      teacher: teacher(0, '', 'Atividade dentro do tempo dos outros pedidos, sem ampliar a noite.', 'Pulo este slide quando a turma ainda está exportando.')},
    {title: 'Encerramento', kicker: 'Arquivos conferidos', heading: 'O cenário mudou. O personagem ficou.', lede: 'Deixem projetos, mídias, MP4 e créditos na mesma pasta.', block: 4,
      av9: checks([['Composição', 'cenario.mlt + cenario.mp4 · 6 s.'], ['Correção', 'cor.mlt + cor.mp4 · 12 s.'], ['Créditos', 'CREDITOS.txt acompanha os arquivos.'], ['Explicar', 'Qual ajuste mudou mais o resultado?']]),
      teacher: teacher(8, 'Confiro os arquivos nos postos, ouço uma decisão por estudante e encerro às 22:10.', 'O .mlt referencia os arquivos. Para transportar o trabalho, copiar a pasta inteira. Créditos de Caminandes acompanham qualquer compartilhamento.', 'Se houver exportação pendente, registro para retomada; não conto um projeto sem MP4 como entrega concluída.')}
  ],
  appendDefaultClosing: false
};
