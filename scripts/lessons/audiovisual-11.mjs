// Fonte regenerável da Aula 11. Gerar com node scripts/build-audiovisual.mjs.
export const lesson = {
  title: 'Transições, efeitos e keyframes',
  description: 'Criar um trailer no Shotcut com um kit novo de animação: experimentar passagens, transformar uma foto em movimento e exportar o resultado no próprio computador.',
  objectives: ['Edição de vídeos e sons: corte, transição e efeitos, keyframe.', 'Composição e Render: aplicação de efeitos e transições.'],
  technical: ['Aplicar edição de áudio, vídeo, texto e imagem para compor um produto audiovisual.'],
  socioemotional: ['Demonstrar no desenvolvimento das atividades sob a sua responsabilidade os princípios de profissionalismo.'],
  schedule: [
    {horario: '19:00 - 19:45', atividade: 'Conhecer as cenas e assistir a exemplos, conforme o tempo disponível. Abertura flexível: pode ceder lugar à preparação do Shotcut Portable. Com os postos prontos, antecipar a montagem.'},
    {horario: '20:05 - 21:00', atividade: 'Montar uma sequência curta com três clipes do kit. Criar uma fusão, comparar com a varredura se houver tempo, ajustar uma passagem e escolher onde entrará a foto animada.'},
    {horario: '21:00 - 21:40', atividade: 'Comparar um filtro fixo com uma foto animada por keyframes de tamanho e posição. Aproximar um detalhe e encaixar a imagem na sequência; inverter o movimento como variação.'},
    {horario: '21:40 - 22:10', atividade: 'Exportar em MP4, assistir no computador, corrigir um ponto visível e mostrar o trailer na própria tela. Guardar o projeto junto do kit.'}
  ],
  methodology: 'A abertura antes do lanche é flexível: exemplos e exploração das cenas podem ser abreviados ou inteiramente substituídos pela preparação do Shotcut Portable, se necessária. A prática essencial começa depois do lanche, do zero, com demonstrações breves seguidas de edição no próprio posto. Se os computadores estiverem prontos antes, antecipar a prática. A aprendizagem aparece na tela: experimentar, reproduzir, mudar e comparar. Cada estudante edita quando há computador disponível; em postos compartilhados, os integrantes alternam o mouse entre desafios. Quem termina avança para uma variação de montagem ou movimento.',
  resources: 'Projetor, fones de ouvido, computadores, Shotcut Portable oficial para Windows 11 já extraído na pasta 01-SHOTCUT/Shotcut e pasta 02-ALUNO/Aula11 já pronta para copiar para Documentos no disco local. O Shotcut é gratuito e de código aberto. O kit contém oito clipes de sete segundos e duas fotos de Caminandes 3: Llamigos, com créditos e licença CC BY 3.0. Se necessária, a preparação do Shotcut Portable pode ocupar o primeiro bloco, com apoio do laboratório. Guia-Aula11-Shotcut.pdf para consulta offline. Nenhuma ficha impressa, conta ou upload. Distribuir o programa Portable e o kit por pendrive ou rede local, preferencialmente antes da turma; não solicitar downloads simultâneos aos 20 a 30 alunos.',
  observation: 'Aula das 19:00 às 22:10; lanche das 19:45 às 20:05 e chamada no início de cada bloco. Os estudantes permanecem nos postos; somente o professor circula. Antes do lanche, exemplos e exploração são opcionais: posso abreviar ou pular toda a abertura para copiar e testar o Shotcut Portable. Os tempos dessa abertura são janelas flexíveis; não preciso preenchê-los. Com os postos prontos, antecipo a prática. Levar Aula11-Pendrive com o Shotcut Portable já extraído. Copiar 01-SHOTCUT/Shotcut e 02-ALUNO/Aula11 para Documentos em cada posto; abrir shotcut.exe somente depois da cópia. Se houver bloqueio, solicitar apoio do laboratório. Preparar, se possível, um computador de demonstração com importação e exportação testadas. Depois do lanche, demonstro desde a pasta do kit até a primeira montagem; nenhuma tarefa anterior é pré-requisito. Se a preparação do Shotcut Portable avançar depois das 20:05, usar temporariamente os postos que já funcionam, com revezamento; manter três clipes, uma transição, uma foto animada e a exportação, deixando as variações como extras. Copiar o kit uma vez para cada posto e editar no disco local, inclusive quando a distribuição usar a rede local. Não depender de arquivos das aulas anteriores. Não reservar tempo para recuperar esses arquivos nem exigir caderno, fichas ou justificativas escritas. Em postos compartilhados, alternar a operação a cada desafio. Observar o teste na tela enquanto circula, sem exigir arquivos separados de comprovação. Um projeto .mlt e um MP4 bastam; manter ambos na pasta do kit, pois o .mlt referencia as mídias. Mostrar o resultado no próprio posto, sem upload coletivo. Manter CREDITOS.txt com o trabalho compartilhado. Títulos e máscaras ficam para a aula 12.'
};
const base = 'modelos/producao-audiovisual/aula-11/';
const checks = items => ({type: 'checks', items: items.map(([label, text]) => ({label, text}))});
const commands = (items, result) => ({type: 'commands', commands: items.map(([word, who, text]) => ({word, who, text})), tags: [{label: 'SHOTCUT', kind: 'good'}], result});
const teacher = (steps, watch, rescue) => ({steps, watch, rescue});
const media = clips => ({type: 'media', clips: clips.map(([file, label, text, poster]) => ({src: base + file, label, text, poster: base + poster}))});

export const support = {
  teacherGoal: 'Fazer a turma montar e transformar material novo no Shotcut: transições experimentadas, um movimento criado com keyframes e um trailer exportado localmente.',
  plainLanguage: 'Transição muda a passagem entre duas imagens. Filtro altera a imagem selecionada. Keyframe guarda um valor em um instante; dois instantes diferentes permitem criar movimento.',
  say: 'Hoje todos começam com cenas novas. Vocês vão escolher o que mostrar, como trocar de cena e para onde o olhar vai.',
  demo: [
    'Levo programa Portable e kit já baixados. Antes do lanche, mostro exemplos se houver tempo; posso usar toda a abertura para preparar os postos. Depois, demonstro a prática desde o início.',
    'Mostro os mesmos dois clipes com corte, fusão e varredura; a turma repete imediatamente.',
    'Mostro uma foto parada e depois animada, com dois keyframes de tamanho e posição.',
    'Exporto a linha do tempo e abro o MP4 no reprodutor local.'
  ],
  studentDeliverable: 'Um trailer curto, como referência de 15 a 30 segundos, com três clipes do kit e uma foto animada por keyframes. Criar uma fusão no trailer; experimentar a varredura como variação depois que a fusão funcionar. Salvar meu-trailer.mlt e meu-trailer.mp4 na pasta do kit. Mostrar o resultado na própria tela; sem envio pela internet ou relatório.',
  check: [
    'O estudante montou e aparou três clipes do kit; uma abertura diferente é uma variação possível.',
    'Uma fusão aparece no trailer e foi conferida na reprodução; varredura é uma variação opcional.',
    'A foto tem dois keyframes em instantes distintos e movimento visível.',
    'O enquadramento não revela bordas vazias nem perde o detalhe escolhido.',
    'O MP4 reproduz do começo ao fim, com imagem e som conferidos.',
    'O projeto e a exportação estão na pasta do kit; o estudante consegue mostrar o que editou.'
  ],
  fallback: 'O Portable já extraído e o kit local evitam downloads simultâneos. Se houver bloqueio ao abrir o Shotcut, solicitar apoio do laboratório e compartilhar um posto funcional com revezamento enquanto isso. O kit independe de material antigo e da internet. Se um posto falhar, compartilhar temporariamente um computador funcional e alternar o mouse, mantendo a prática de edição. Se a prévia travar, reduzir a resolução de prévia e conferir um trecho exportado. Não substituir a edição por preenchimento de fichas.',
  extension: 'Quem concluir um desafio recebe sua variação imediatamente: encurtar a transição, inverter a varredura, inverter o zoom ou criar um terceiro keyframe. Quem terminar o trailer muda sua abertura com os mesmos clipes e compara a reprodução. As variações acontecem no projeto atual; não exigem arquivos extras nem uploads.',
  commonProblems: [
    ['A preparação do Shotcut Portable ainda não terminou', 'Encurto ou pulo os exemplos da abertura para preparar os postos. Depois do lanche, quem precisar compartilha temporariamente um posto funcional; solicito apoio do laboratório para permissões.'],
    ['Não encontro os arquivos', 'Abro a pasta Aula11 copiada para Documentos; não busco material de aulas anteriores.'],
    ['A transição não aparece', 'Sobreponho dois clipes na mesma trilha e verifico se a opção de criar transições na sobreposição está habilitada.'],
    ['Mudei a transição, mas nada aconteceu', 'Seleciono o bloco com X e abro Propriedades; Filtros do clipe não altera o tipo da transição.'],
    ['A foto fica ampliada o tempo todo', 'Ativo keyframes do filtro e confiro dois marcadores em tempos diferentes, com valores diferentes.'],
    ['A foto pula ou revela uma borda', 'Uso interpolação linear no primeiro teste; confiro o enquadramento nos dois extremos e durante o movimento.'],
    ['O som corta na troca de cena', 'Ouço a emenda com fones e aplico fade de áudio curto quando necessário; os clipes já têm som.'],
    ['Terminei o primeiro corte', 'Entrego a próxima variação visual enquanto acompanho os colegas; não encerro a prática no primeiro MP4.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia', kicker: 'Aula 11 · Shotcut', heading: 'Uma fruta. Dois personagens. Seu trailer.',
      lede: 'Cenas novas, edição no computador e escolhas que aparecem na tela.', block: 1,
      av9: {type: 'day', rows: [
        {time: '19:00–19:45', minutes: 45, title: 'Conhecer as cenas', text: 'Exemplos e exploração, conforme o tempo disponível.'},
        {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Na volta, começa a montagem.', pause: true},
        {time: '20:05–21:00', minutes: 55, title: 'Montar e transformar', text: 'Três clipes e uma fusão; varredura como variação.'},
        {time: '21:00–21:40', minutes: 40, title: 'Fazer a foto se mover', text: 'Tamanho, posição e keyframes.'},
        {time: '21:40–22:10', minutes: 30, title: 'Assistir e melhorar', text: 'Exportar e mostrar na tela.'}
      ]},
      teacher: teacher(['3 min · Faço a chamada e apresento o desafio; organizo o revezamento apenas nos postos compartilhados.'], 'A exigência está na montagem e nas transformações, não em aumentar a duração.', 'Mostro uma cena do kit para tornar o resultado concreto desde a abertura.')
    },
    {
      title: 'Ver o resultado', kicker: 'Uma ideia do que vamos criar', heading: 'Esta foto ganhou movimento',
      lede: 'O enquadramento se aproxima. Para onde seu olhar vai?', block: 1,
      av9: media([['exemplo-zoom.mp4', 'DA CENA AO DETALHE', 'Uma foto do kit, transformada na edição.', 'media/foto-fruta.jpg']]),
      teacher: teacher(['10 min · Janela flexível para mostrar a foto e o exemplo, ouvir impressões e acompanhar a preparação dos postos.'], 'Posso encurtar ou pular este momento inteiro para preparar o Shotcut Portable. A demonstração de como fazer será depois do lanche.', 'Se os postos já funcionam, avanço para a montagem; não alongo a conversa para preencher o tempo.')
    },
    {
      title: 'O que há no pendrive', kicker: 'Pasta Aula11-Pendrive', heading: 'Cada coisa no seu lugar.',
      lede: 'O programa, a atividade e a projeção já estão separados.', block: 1,
      av9: checks([
        ['01-SHOTCUT', 'Pasta Shotcut com o programa Portable já extraído.'],
        ['02-ALUNO', 'Pasta Aula11: oito clipes, duas fotos, guia PDF e créditos.'],
        ['03-PROFESSOR', 'Slides offline, exemplos e orientação para a aula.']
      ]),
      resources: [{href: base + 'index.html', label: 'Ver o kit da aula'}, {href: base + 'Guia-Aula11-Shotcut.pdf', label: 'Abrir guia PDF'}],
      teacher: teacher(['10 min · Janela flexível para apresentar o kit e assistir a alguns clipes, enquanto organizo os postos.'], 'Este panorama é dispensável. Copio o kit por pendrive ou rede local quando possível, mas não exijo importação nem projeto pronto antes do lanche. O Shotcut é gratuito e de código aberto.', 'Se a preparação do Shotcut Portable ocupar o período, pulo este slide. Na volta, mostro a pasta, a importação e o salvamento desde o início.')
    },
    {
      title: 'Conhecer as cenas', kicker: 'Matéria-prima · Caminandes 3', heading: 'Qual cena você colocaria primeiro?',
      lede: 'Assistam aos clipes. Escolham uma abertura e uma imagem para encerrar.', block: 1,
      av9: media([
        ['media/02-encontro.mp4', 'ENCONTRO', 'Quem aparece primeiro?', 'media/02-encontro.jpg'],
        ['media/04-fruta.mp4', 'FRUTA', 'O que chama a atenção?', 'media/04-fruta.jpg'],
        ['media/03-trem.mp4', 'TREM', 'Qual cena vem depois?', 'media/03-trem.jpg']
      ]),
      teacher: teacher(['22 min · Janela flexível para explorar o kit nos postos disponíveis. Assim que estiverem prontos, antecipo a primeira montagem e seus desafios.'], 'Posso ceder todo este tempo à preparação do Shotcut Portable. Não há entrega nem escolha obrigatória antes do lanche. Quem perdeu a abertura começa normalmente depois; quem já avançou continua com as variações. Créditos do Blender estão no kit.', 'Se alguém não souber começar, sugiro encontro → fruta → trem. Não espero o fim da janela para avançar com os postos prontos.')
    },
    {
      title: 'Lanche', kicker: 'Intervalo', heading: 'Lanche até 20:05', lede: 'Na volta, vamos montar a sequência no Shotcut.', block: 1, pace: 'break',
      av9: checks([['Na volta', 'Vamos começar pela pasta do kit e montar no Shotcut.'], ['Se já começou', 'Salvar o projeto com Ctrl + S.']]),
      teacher: teacher(['20 min · Lanche das 19:45 às 20:05.'], 'Não pressupõe montagem feita antes do lanche.', 'Identifico os postos ainda sem editor; retomo depois do lanche em computadores funcionais, com revezamento quando necessário.')
    },
    {
      title: 'Copiar e abrir', kicker: 'Guia PDF · página 1', heading: 'Primeiro, copie para o computador.',
      lede: 'Abra Aula11-Pendrive. O trabalho será feito em Documentos.', block: 2,
      av9: commands([
        ['ATIVIDADE', '02-ALUNO', 'Copiar a pasta Aula11 inteira para Documentos.'],
        ['PROGRAMA', '01-SHOTCUT', 'Copiar a pasta Shotcut inteira, se o posto ainda não tem.'],
        ['ABRIR', 'Cópia em Documentos', 'Abrir Shotcut → shotcut.exe e Aula11 → Guia-Aula11-Shotcut.pdf.']
      ], 'Espere as cópias terminarem. Depois o pendrive pode seguir para o próximo posto.'),
      resource: {href: base + 'Guia-Aula11-Shotcut.pdf', label: 'Abrir guia PDF'},
      teacher: teacher(['2 min · Faço a chamada e localizo as pastas com a turma.', '4 min · Confiro a cópia local e mostro como abrir o programa e o guia.'], 'Se já fizemos isso antes do lanche, apenas confiro e uso o tempo na montagem. Portable já extraído: não há instalador. Preciso da pasta Shotcut completa, não apenas do executável.', 'Se o posto bloquear o programa, aciono o laboratório e organizo revezamento temporário. Não abro a atividade diretamente do pendrive.')
    },
    {
      title: 'Primeira montagem', kicker: 'Guia PDF · página 2', heading: 'Três clipes já bastam para começar.',
      lede: 'Comecem nesta ordem: 02-encontro → 04-fruta → 03-trem.', block: 2,
      av9: commands([
        ['PAINÉIS', 'Barra superior', 'Abrir Lista de reprodução e Linha do tempo.'],
        ['IMPORTAR', 'Documentos → Aula11', 'Arrastar os três MP4 indicados para a Lista de reprodução.'],
        ['MONTAR', 'Linha do tempo', 'Levar três clipes para a mesma trilha e aparar pelas bordas.'],
        ['SALVAR', 'Arquivo → Salvar como', 'Guardar meu-trailer.mlt na pasta Aula11.']
      ], 'Reproduzam a sequência inteira antes de adicionar efeitos.'),
      promptLabel: 'Já começou antes do lanche?', prompt: 'Mude a abertura e compare as duas ordens. Depois escolha onde uma transição pode ajudar.',
      teacher: teacher(['5 min · Demonstro os painéis, os três arquivos indicados, a montagem, um corte e o salvamento.', '11 min · A turma repete a sequência guiada; acompanho os cortes e a continuidade.'], 'Não dependo da abertura. Defino modo de vídeo HD 720p, 24 fps no projeto de demonstração antes da importação; apoio quem precisar ajustar. Quem começou antes continua pelas variações.', 'Começo com três clipes inteiros e aparo um de cada vez. Com preparação do Shotcut Portable pendente, uso um posto funcional com revezamento e apoio do laboratório.')
    },
    {
      title: 'Ver a diferença', kicker: 'Três passagens · os mesmos clipes', heading: 'Agora a troca de cena também faz parte da edição',
      lede: 'Reproduzam os exemplos: troca direta, mistura e uma imagem revelando a outra.', block: 2,
      av9: media([
        ['exemplo-cut.mp4', 'CORTE', 'Uma cena termina; a outra começa.', 'media/01-gelo.jpg'],
        ['exemplo-fade.mp4', 'FUSÃO', 'As duas imagens se misturam.', 'media/01-gelo.jpg'],
        ['exemplo-wipeleft.mp4', 'VARREDURA', 'Uma borda revela a próxima cena.', 'media/01-gelo.jpg']
      ]),
      teacher: teacher(['5 min · Reproduzo os três exemplos, depois demonstro a sobreposição no Shotcut.'], 'Os exemplos são vídeos locais sem áudio para concentrar a atenção na passagem.', 'Reproduzo um por vez, ampliando em tela cheia quando necessário.')
    },
    {
      title: 'Fazer a fusão', kicker: 'Guia PDF · página 3', heading: 'Arrastem um clipe sobre o final do outro',
      lede: 'Arrastem 04-fruta um pouco sobre o final de 02-encontro, na mesma trilha.', block: 2,
      av9: commands([
        ['SOBREPOR', 'Segundo clipe', 'Arrastar um pouco para cima do final do primeiro.'],
        ['LOCALIZAR', 'Bloco com X', 'A sobreposição criou uma transição.'],
        ['REPRODUZIR', 'Antes da emenda', 'Assistir até a segunda cena aparecer inteira.'],
        ['COMPARAR', 'Bordas do X', 'Testar uma fusão curta e outra mais longa.']
      ], 'Comecem com cerca de meio segundo. Depois experimentem dois segundos.'),
      promptLabel: 'Já conseguiu?', prompt: 'Faça a fusão terminar exatamente quando o personagem começa a agir.',
      teacher: teacher(['13 min · A turma cria e altera a fusão; peço para reproduzir a passagem antes de chamar ajuda.'], 'A sobreposição encurta o total do vídeo. Meço a transição pela duração mostrada no editor, sem exigir precisão de quadros.', 'Se não houver X, verifico mesma trilha e criação de transições habilitada. Desfaço uma movimentação que crie lacuna.')
    },
    {
      title: 'Transformar em varredura', kicker: 'Variação · depois que a fusão funcionar', heading: 'A mesma emenda pode revelar a próxima cena',
      lede: 'Selecionem o bloco com X e abram Propriedades.', block: 2,
      av9: commands([
        ['SELECIONAR', 'O bloco com X', 'Clicar na transição, não no clipe ao lado.'],
        ['TROCAR', 'Propriedades → Vídeo', 'Escolher uma varredura, também chamada Wipe.'],
        ['TESTAR', 'Direção e duração', 'Reproduzir e experimentar outra direção.']
      ], 'Conservem a opção que combina melhor com o movimento da cena.'),
      promptLabel: 'Já conseguiu?', prompt: 'Faça a borda da varredura acompanhar a direção em que o personagem se move.',
      teacher: teacher(['7 min · Quem já conseguiu testa a varredura; com os demais, uso este tempo para concluir a fusão. Demonstro a escolha em Propriedades sem exigir que todos façam agora.'], 'A varredura é opcional no primeiro trailer. As traduções variam por versão; identifico a opção por sua prévia. Comparar na tela basta.', 'Desfaço para voltar à fusão e seleciono novamente o X antes de abrir Propriedades.')
    },
    {
      title: 'Integrar as escolhas', kicker: 'Seu trailer ganha forma', heading: 'Uma passagem bem resolvida vale mais que várias ao acaso',
      lede: 'Continuem a montagem. Usem ao menos uma das transições que experimentaram.', block: 2,
      av9: checks([
        ['Sequência', 'Três clipes escolhidos e aparados.'],
        ['Passagem', 'Uma fusão ou varredura que vocês ajustaram.'],
        ['Som', 'Ouvir as emendas com fones; evitar cortes incômodos.'],
        ['Próxima etapa', 'Escolher onde uma foto pode entrar na montagem.']
      ]),
      promptLabel: 'Já conseguiu?', prompt: 'Mude a duração de dois clipes para acelerar o final, preservando o que precisa ser visto.',
      teacher: teacher(['8 min · A turma integra os testes; circulo e peço que mostrem a transição reproduzindo.'], 'Os clipes têm áudio. Se necessário, demonstro Fade de entrada/saída de áudio curto. Não peço trilha externa nem pesquisa de música.', 'Com dificuldade, resolvo uma emenda de cada vez; não exijo efeito em todas as passagens.')
    },
    {
      title: 'Um filtro no clipe', kicker: 'Efeito · enquadramento', heading: 'Façam um detalhe ocupar mais espaço',
      lede: 'Selecionem um clipe. Abram Filtros → + → Tamanho, posição e rotação.', block: 3,
      av9: checks([
        ['Aumentar', 'Experimentar Zoom em 125%.'],
        ['Reposicionar', 'Arrastar a imagem na prévia para destacar um detalhe.'],
        ['Comparar', 'Desligar e ligar o filtro pelo seu marcador.']
      ]),
      promptLabel: 'Perceba', prompt: 'O detalhe fica maior durante o clipe inteiro. Ainda não há animação criada por vocês.',
      teacher: teacher(['2 min · Faço a chamada e demonstro o filtro, também chamado Size, Position & Rotate.', '3 min · A turma amplia um detalhe e compara o filtro ligado e desligado.'], 'Filtro no clipe selecionado, não na trilha inteira. Evito bordas vazias e mantenho o elemento principal visível.', 'Se o filtro sumiu da busca, seleciono filtros de vídeo e limpo o texto de pesquisa.')
    },
    {
      title: 'Uma foto pode se mover', kicker: 'Keyframes · ver antes de fazer', heading: 'A imagem está parada. O enquadramento se aproxima.',
      lede: 'Reproduzam o exemplo. A aproximação foi criada com valores em dois instantes.', block: 3,
      av9: media([['exemplo-zoom.mp4', '100% → 125%', 'Início aberto; final mais próximo.', 'media/foto-fruta.jpg']]),
      teacher: teacher(['5 min · Mostro a foto do kit e o exemplo animado; comparo com o filtro fixo que acabamos de usar.'], 'O exemplo ilustra o movimento; em seguida reproduzo a operação ao vivo no Shotcut.', 'Pauso no começo e no final para tornar a diferença visível.')
    },
    {
      title: 'Criar os keyframes', kicker: 'Guia PDF · página 4', heading: 'Um valor no início. Outro no final.',
      lede: 'Coloquem foto-fruta.jpg depois dos três clipes e ajustem para cerca de 5 segundos.', block: 3,
      av9: commands([
        ['APLICAR', 'Filtros → +', 'Adicionar Tamanho, posição e rotação à foto.'],
        ['ATIVAR', 'Botão de keyframes do filtro', 'Abrir os controles de animação de tamanho e posição.'],
        ['INÍCIO', 'Primeiro quadro da foto', 'Definir Zoom em 100%.'],
        ['FINAL', 'Último quadro da foto', 'Mover o cursor e definir Zoom em 125%.']
      ], 'Reproduzam desde o início da foto e observem a aproximação.'),
      teacher: teacher(['8 min · Demonstro lentamente, esperando a turma repetir cada ação.'], 'Abro o painel Keyframes/Quadros-chave. Se a versão começar com keyframes simples, uso os avançados. Confiro dois marcadores distintos e interpolação linear.', 'Não altero duas vezes o mesmo marcador. O cursor final deve estar dentro da foto; confiro a posição no painel antes de mudar o Zoom.')
    },
    {
      title: 'Escolher o destino do olhar', kicker: 'Desafio de movimento', heading: 'Terminem o movimento perto da fruta ou da cesta',
      lede: 'Primeiro, façam o zoom de 100% para 125% funcionar. Depois ajustem a posição se necessário.', block: 3,
      av9: checks([
        ['Começo', 'A imagem inteira apresenta a cena.'],
        ['Final', 'O detalhe escolhido ganha espaço.'],
        ['Caminho', 'O movimento acontece sem salto nem bordas vazias.']
      ]),
      promptLabel: 'Já conseguiu?', prompt: 'Inverta: comece perto e termine mostrando a cena inteira. Escolha a versão que vai entrar no trailer.',
      teacher: teacher(['14 min · A turma ajusta o movimento. Peço a cada operador mostrar o painel e reproduzir a foto.'], 'A posição também pode mudar nos keyframes. Para destacar o objeto, pode ser necessário aumentar mais que 125%; avalio pela prévia.', 'Reduzo o deslocamento se uma borda aparecer. Com dificuldade, mantenho a foto centralizada e crio primeiro apenas o zoom.')
    },
    {
      title: 'Encaixar o movimento', kicker: 'Montagem · foto e vídeo', heading: 'A foto precisa fazer parte da sequência',
      lede: 'Coloquem a foto animada onde ela ajuda a mostrar o que está acontecendo.', block: 3,
      av9: {type: 'tracks', tracks: [
        {label: 'IDEIA A', clips: [{label: 'Encontro', seconds: 4}, {label: 'Foto → perto', seconds: 5}, {label: 'Ação', seconds: 4}]},
        {label: 'IDEIA B', clips: [{label: 'Ação', seconds: 4}, {label: 'Encontro', seconds: 4}, {label: 'Foto → longe', seconds: 5}]}
      ], caption: 'Exemplos de encaixe. Sua ordem e seus tempos podem ser diferentes.'},
      promptLabel: 'Reprodução completa', prompt: 'Três clipes, uma transição e uma foto animada. Cerca de 15 a 30 segundos como referência. Assista antes de exportar.',
      teacher: teacher(['8 min · A turma posiciona a foto, ajusta a duração e salva; apoio a revisão do som.'], 'Foto não tem áudio. Pode ficar em silêncio; se a quebra incomodar, demonstro uma transição curta com a cena vizinha. Duração é referência, não corrida para preencher segundos.', 'Evito sobrepor a foto após posicionar os keyframes sem conferir o novo começo e final do movimento.')
    },
    {
      title: 'Próximo desafio', kicker: 'Para quem já conseguiu', heading: 'Agora façam o movimento mudar de direção',
      lede: 'Criem um terceiro keyframe no meio da foto. Experimentem e reproduzam.', block: 3, pace: 'extra',
      av9: {type: 'flow', steps: [
        {label: 'COMEÇO', text: 'Mostrar a cena aberta.', mark: '100%'},
        {label: 'MEIO', text: 'Aproximar o detalhe.', mark: '125%'},
        {label: 'FINAL', text: 'Voltar ao enquadramento aberto.', mark: '100%'}
      ]},
      promptLabel: 'Outra possibilidade', prompt: 'Troque a abertura do trailer para esconder a fruta até mais tarde. Compare as duas montagens usando Desfazer e Refazer.',
      teacher: teacher([], 'Ofereço durante a prática, assim que alguém termina; não espero toda a turma. A extensão não adiciona tempo ao cronograma.', 'Se o movimento ficar rápido, aumento a duração da foto e reposiciono os marcadores. Se a variação piorar a montagem, desfaço.')
    },
    {
      title: 'Exportar', kicker: 'Guia PDF · página 5', heading: 'O trailer vira um MP4 no próprio computador',
      lede: 'Salvem o projeto. Abram Exportar: o vídeo pronto terá extensão .mp4.', block: 4,
      av9: {type: 'table', variant: 'data', columns: ['No Shotcut', 'Usar'], rows: [
        ['Origem · From', 'Linha do tempo · Timeline'],
        ['Predefinição', 'H.264 High Profile · MP4'],
        ['Imagem', '1280 × 720 · 24 quadros por segundo'],
        ['Arquivo', 'Aula11/meu-trailer.mp4']
      ]},
      promptLabel: 'Aguardar', prompt: 'O painel Trabalhos mostra o andamento. Abra o MP4 quando a exportação terminar.',
      teacher: teacher(['2 min · Faço a chamada e demonstro a exportação.', '8 min · A turma exporta no disco local; acompanho o painel Trabalhos.'], 'Não confundo salvar .mlt com exportar vídeo. Confiro que From está na linha do tempo inteira.', 'Se a exportação falhar com aceleração de hardware, uso exportação por software no posto validado.')
    },
    {
      title: 'Assistir e corrigir', kicker: 'Último ajuste', heading: 'Encontrem uma coisa que ainda pode melhorar',
      lede: 'Abram o MP4 no reprodutor do computador e assistam até o fim.', block: 4,
      av9: checks([
        ['Passagem', 'Há alguma troca que ficou lenta ou confusa?'],
        ['Movimento', 'O zoom mostra o detalhe sem perder o enquadramento?'],
        ['Som', 'Alguma emenda corta o áudio de um jeito incômodo?'],
        ['Final', 'O vídeo termina onde vocês queriam?']
      ]),
      promptLabel: 'Melhoria visível', prompt: 'Voltem ao Shotcut, ajustem um ponto e exportem novamente. Confiram a nova versão.',
      teacher: teacher(['12 min · Cada posto assiste, faz um ajuste necessário e confere a nova exportação.'], 'Se o resultado já estiver resolvido, proponho uma alternativa de abertura para comparar, sem obrigar a manter uma mudança pior.', 'Corrijo primeiro tela preta, borda vazia ou exportação incompleta; evito recomeçar o trailer.')
    },
    {
      title: 'Mostrar o trailer', kicker: 'Resultado na tela', heading: 'Mostrem a passagem e o movimento que criaram',
      lede: 'Reproduzam o trailer no próprio posto. Apontem a alteração que mais mudou o resultado.', block: 4,
      av9: checks([
        ['Vídeo', 'meu-trailer.mp4 pronto para assistir.'],
        ['Projeto', 'meu-trailer.mlt salvo junto dos clipes.'],
        ['Pasta', 'Guardar Aula11 inteira, incluindo os créditos.']
      ]),
      promptLabel: 'Feito', prompt: 'Vocês montaram a sequência, transformaram uma passagem e criaram movimento com keyframes.',
      teacher: teacher(['8 min · Circulo pelos postos, vejo trechos e ouço uma observação breve de cada operador.'], 'Sem fila de apresentações nem uploads coletivos. Já observo o trabalho durante a prática para conseguir atender 20 a 30 estudantes.', 'Se o tempo apertar, peço a transição e a foto animada diretamente na linha do tempo; confiro o MP4 local sem pedir envio.')
    }
  ],
  appendDefaultClosing: false
};
