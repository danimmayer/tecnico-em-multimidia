import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [designPath, audiovisualPath] = process.argv.slice(2);

if (!designPath || !audiovisualPath) {
  console.error('Uso: node scripts/build-course-data.mjs <planejamento-design-web.md> <planejamento-audiovisual.md>');
  process.exit(1);
}

const cleanCell = (value = '') => value
  .replace(/\*\*/g, '')
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const refinePublicCopy = (value, { slug, lessonNumber }) => {
  let text = cleanCell(value)
    .replace(/^Chamada\.\s*/i, '')
    .replace(/\bstyle\.css\b/g, 'styles.css')
    .replace(/\bimersão inicial\b/gi, 'introdução')
    .replace(/\bpré-produção relâmpago\b/gi, 'pré-produção de escopo reduzido')
    .replace(/\bfechamento leve\b/gi, 'fechamento')
    .replace(/\bdesafio autoral\b/gi, 'atividade de produção')
    .replace(/\bencerramento celebrativo\b/gi, 'encerramento com síntese do percurso')
    .replace(/\baprendendo fazendo\b/gi, 'prática orientada')
    .replace(/\bolhar inovador\b/gi, 'análise crítica')
    .replace(/\bKickoff\b/g, 'Início')
    .replace(/\bkickoff\b/gi, 'início')
    .replace(/\bCheck-in\b/g, 'Acompanhamento')
    .replace(/\bcheck-in\b/gi, 'acompanhamento')
    .replace(/\bapresentação relâmpago\b/gi, 'apresentação breve')
    .replace(/quiz gamificado "Rodada Final" no celular/gi, 'revisão em equipes com questões projetadas')
    .replace(/Revisão geral gamificada: quiz em equipes no projetor/g, 'Revisão geral em equipes, com questões no projetor')
    .replace(/\bquiz gamificado\b/gi, 'revisão com questões')
    .replace(/\brevisão gamificada\b/gi, 'revisão em equipes')
    .replace(/\brevisão geral gamificada\b/gi, 'revisão geral em equipes')
    .replace(/\bdisputando ponto a ponto\b/gi, 'respondendo em rodadas')
    .replace(/\bmini-docs\b/gi, 'minidocumentários')
    .replace(/\bmini-doc\b/gi, 'minidocumentário')
    .replace(/\barquivo master\b/gi, 'arquivo mestre (master)');

  if (slug === 'design-web') {
    text = text
      .replace(
        /Codificação junto com o professor: cada aluno digita/,
        'Codificação acompanhada no projetor: cada aluno digita'
      )
      .replace(/\bfornecido pelo professor\b/gi, 'fornecido para a atividade')
      .replace(
        /Conversa de validação com cada grupo: professor confere se o escopo cabe no calendário e ajusta promessas exageradas\./,
        'Validação do escopo de cada grupo em relação ao calendário, com redução de promessas que não cabem no prazo.'
      )
      .replace(
        /Professor circula validando tela a tela\./,
        'Revisão tela a tela durante o acompanhamento dos grupos.'
      )
      .replace(
        /encerramento coletivo da UC com fala do professor:/,
        'encerramento coletivo da UC com síntese do percurso:'
      )
      .replace(/painel coletivo "Da ARPANET ao 5G"/g, 'painel coletivo da linha do tempo da web')
      .replace(/Dinâmica "Bom de Navegar":/g, 'Análise comparativa de navegação:')
      .replace(/Desafio "Da URL à Tela":/g, 'Síntese visual do caminho da URL à tela:')
      .replace(/Desafio em duplas "Clone de Capa":/g, 'Exercício de estrutura de página:')
      .replace(/"Vernissage digital":/g, 'Revisão entre pares dos sites publicados:')
      .replace(/Oficina guiada "Meu site ganhou vida":/g, 'Prática guiada de interação em JavaScript:')
      .replace(/Discussão disparadora "Amo e odeio":/g, 'Análise comparativa de experiências digitais:')
      .replace(/"Redesenho relâmpago":/g, 'Redesenho da etapa mais problemática:')
      .replace(/"Galeria de rafes":/g, 'Revisão dos esboços:')
      .replace(/Revisão cruzada "Troca de Contas":/g, 'Revisão cruzada das peças:')
      .replace(
        /Revisão da Aula 03 \(primeira página em HTML\) com quiz rápido no celular, em ferramenta gratuita de quiz \(ex\.: Kahoot ou Google Formulários\), sobre doctype, head, body e tags básicas; correção comentada na hora\./,
        'Revisão da Aula 03 com oito questões projetadas sobre doctype, head, body e tags básicas; as duplas registram as respostas em papel e a correção é comentada na hora.'
      )
      .replace(
        /planilha gratuita, ex\.: Planilhas Google, ou caderno/,
        'planilha local ou caderno'
      )
      .replace(
        /Comparação de opções gratuitas \(ex\.: GitHub Pages, Netlify\): limites, endereço gerado e facilidade de atualização\./,
        'Comparação entre o Netlify Drop, que publica uma pasta sem login, e o servidor local, observando endereço gerado, exposição pública e atualização.'
      )
      .replace(
        /Passo a passo guiado no projetor: criação da conta na plataforma gratuita escolhida, envio dos arquivos do mini site e primeira visualização do endereço público de cada aluno\./,
        'Passo a passo guiado no projetor: conferência da pasta, envio pelo Netlify Drop sem criação de conta e primeira visualização do endereço público de cada aluno.'
      )
      .replace(
        /Publicação parcial em hospedagem gratuita \(ex\.: GitHub Pages ou Netlify\)/,
        'Publicação parcial pelo Netlify Drop, sem login, ou em hospedagem institucional já preparada,'
      )
      .replace(
        /Tour pela ferramenta gratuita de prototipação \(ex\.: Figma com plano educacional ou Canva\): páginas, frames, biblioteca de elementos e uso de templates como ponto de partida sem copiar a solução pronta\./,
        'Demonstração no LiveCodes: áreas do projeto, componentes reaproveitáveis e uso do site-base como ponto de partida sem copiar uma solução pronta.'
      )
      .replace(
        /em ferramenta gratuita de design \(ex\.: Figma com plano educacional ou Canva\)/g,
        'no caderno de materiais ou no LiveCodes, conforme o grau de fidelidade'
      )
      .replace(
        /na ferramenta gratuita de prototipação \(ex\.: Figma com plano educacional ou Canva\)/g,
        'no caderno de materiais ou no LiveCodes, conforme o grau de fidelidade'
      )
      .replace(
        /ferramenta gratuita de prototipação \(ex\.: Figma com plano educacional ou Canva\)/g,
        'caderno de materiais ou LiveCodes'
      )
      .replace(
        /softwares de design digital \(ex\.: Canva, GIMP\)/g,
        'Photopea no navegador, sem login, ou GIMP instalado'
      )
      .replace(
        /smartphones dos alunos para o quiz/,
        'smartphones dos alunos para testes responsivos'
      )
      .replace(/com gamificação na revisão/gi, 'com revisão em equipes')
      .replace(/Gamificação de aquecimento/gi, 'Revisão breve')
      .replace(
        /Desafio "Quem Sou Eu": página pessoal com no mínimo cinco tags diferentes\./,
        'Exercício com persona fictícia: página de apresentação sem dados pessoais reais, usando no mínimo cinco tags diferentes.'
      )
      .replace(
        /Oficina "Meu Mini Site": transformar a página quem sou eu em um site de três páginas navegáveis/,
        'Transformação da página da persona fictícia em um site de três páginas navegáveis'
      )
      .replace(
        /Análise guiada de interfaces reais no celular dos alunos \(aplicativo de banco, de transporte e de delivery\), identificando bons e maus exemplos\./,
        'Análise guiada de capturas preparadas de cadastro, transporte e compra, sempre com dados fictícios e sem abrir aplicativos ou contas pessoais dos estudantes.'
      )
      .replace(
        /Vivência de sensibilização "Navegue sem ver": em duplas, navegar em um site usando apenas o teclado ou o leitor de tela do celular, com relato das dificuldades encontradas por cada dupla\./,
        'Auditoria de barreiras em uma página de demonstração: navegação por teclado, foco visível, zoom e leitura de tela, sem simular uma deficiência.'
      )
      .replace(
        /já com a ferramenta de análise instalada para coletar dados reais\./,
        'acompanhada de um painel demonstrativo de métricas.'
      )
      .replace(
        /já com a ferramenta de análise \(ex\.: Google Analytics\) configurada, para coletar dados reais de acesso até a próxima aula\./,
        'acompanhada de relatório demonstrativo ou conta institucional autorizada; não são instalados rastreadores pessoais nos sites dos estudantes.'
      )
      .replace(
        /Leitura dos primeiros dados reais coletados pela ferramenta de análise \(ex\.: Google Analytics\) desde a publicação parcial: número de acessos, páginas mais vistas e proporção de visitas por celular\./,
        'Leitura de um conjunto de dados fictício ou institucional autorizado: número de acessos, páginas mais vistas e proporção de visitas por celular.'
      )
      .replace(
        /\bnegócio local real\b/gi,
        'negócio local fictício'
      )
      .replace(
        /\bprimeiros dados reais da ferramenta de análise\b/gi,
        'primeiros dados do relatório fictício ou da conta institucional autorizada'
      )
      .replace(
        /\bleitura de métricas reais\b/gi,
        'leitura de métricas fictícias ou institucionais autorizadas'
      );
  }

  if (slug === 'producao-audiovisual') {
    text = text
      .replace(/\bimparcialidade\b/gi, 'transparência e equilíbrio na representação')
      .replace(
        /elaborar o termo de autorização de uso de imagem que a equipe usará nas gravações da UC/,
        'analisar o modelo institucional de autorização e registrar separadamente exercício, exibição interna, mostra com convidados e publicação online'
      )
      .replace(
        /cenário impossível \(deserto, espaço, filme famoso\)/,
        'cenário criado pela equipe ou composto com material licenciado'
      )
      .replace(
        /Buffering e pré-visualização: como o computador processa os dados do projeto, resolução de preview, render de trecho e arquivos intermediários\./,
        'Pré-visualização no editor: resolução de preview, cache, arquivos proxy e render de trecho. Buffering fica reservado à espera de carregamento durante reprodução em rede.'
      )
      .replace(
        /Edição e tratamento de áudio \(volume, ruído, trilha e mixagem\) e compreensão do processo de buffering e pré-visualização no processamento do projeto\./,
        'Edição e tratamento de áudio, com distinção entre buffering na reprodução em rede e preview, cache, proxy e render de trecho dentro do editor.'
      )
      .replace(
        /diferença entre container e codec \(MP4, MOV, H\.264, H\.265\)/,
        'diferença entre contêineres (MP4 e MOV) e codecs (H.264 e H.265)'
      )
      .replace(
        /Cada dupla renderiza o comercial gravado na aula 09 em três versões: vertical 9:16 para redes sociais, alta qualidade para projeção e otimizada para web; conferência das versões no smartphone e no projetor\./,
        'Cada dupla exporta uma versão para projeção e uma versão otimizada para web. A versão vertical 9:16 só é produzida quando a captação previu área segura para o recorte.'
      )
      .replace(
        /no set a palavra final é do diretor, na ilha é do editor, e o professor só entra como mediador\./,
        'as decisões seguem os papéis combinados, o roteiro, as evidências e as condições de segurança; divergências são registradas e mediadas.'
      )
      .replace(
        /master em alta qualidade para projeção na mostra e versão com codec e resolução adequados para publicação na internet\./,
        'arquivo mestre (master) em MP4\/H.264, 1920 × 1080, taxa de quadros igual à captação e áudio AAC 48 kHz; versão para internet somente quando houver autorização específica.'
      )
      .replace(
        /Socialização dos produtos em mostra aberta/,
        'Socialização dos produtos no escopo autorizado para cada projeto'
      )
      .replace(
        /O professor valida o plano de cada equipe antes de liberar o acesso ao set\./,
        'Validação do plano de cada equipe antes da liberação do acesso ao set.'
      )
      .replace(
        /o professor circula como produtor executivo, cobrando prazos e postura profissional no set\./,
        'o acompanhamento concentra-se em prazos, segurança e postura profissional no set.'
      )
      .replace(/\bsem correção em tempo real pelo professor\b/gi, 'sem correção imediata')
      .replace(/\bpara o professor e a turma\b/gi, 'para a turma')
      .replace(/\bmediação e validação do professor por meio de pitch\b/gi, 'mediação e validação por meio de pitch')
      .replace(/\bcom mediação do professor quando surgem conflitos na equipe\b/gi, 'com mediação registrada quando surgem conflitos na equipe')
      .replace(/\bcom o professor circulando como produtor executivo\b/gi, 'com acompanhamento de prazos, segurança e organização do set')
      .replace(
        /Professor circula em atendimento grupo a grupo, destravando problemas técnicos e de narrativa\./,
        'Atendimento grupo a grupo para resolver problemas técnicos e de narrativa.'
      )
      .replace(/\batendimento individualizado do professor\b/gi, 'atendimento individualizado')
      .replace(
        /Professor atende grupo a grupo com foco no que ainda trava a entrega\./,
        'Atendimento grupo a grupo com foco nos bloqueios da entrega.'
      )
      .replace(
        /criação de elementos em softwares de Design Digital \(GIMP, Canva\) importados para o projeto/g,
        'criação de elementos no Photopea, sem login, ou no GIMP instalado; os arquivos exportados são então importados para o projeto'
      )
      .replace(/\bEntrega técnica dos arquivos ao professor\b/gi, 'Entrega técnica dos arquivos na pasta definida')
      .replace(
        /feedback respeitoso da turma e do professor após cada exibição/,
        'feedback respeitoso dos pares e devolutiva baseada na rubrica após cada exibição'
      )
      .replace(
        /devolutivas individuais do professor sobre o percurso de cada aluno na UC/,
        'devolutivas individuais registradas sobre o percurso de cada aluno na UC'
      )
      .replace(/Atividade "Filmagem de mentira":/g, 'Sequência fotográfica de validação:')
      .replace(/Teste cego "O ouvido não perdoa":/g, 'Comparação cega de captação de áudio:')
      .replace(/oficina "Fala, diretor!":/g, 'ensaio de apresentação:')
      .replace(/dinâmica "Inovação ou melhoria\?"/g, 'análise de inovação e melhoria');
  }

  if (slug === 'design-web' && lessonNumber === '28') {
    text = text.replace(/\buma fala de cinco minutos\b/gi, 'uma defesa de sete minutos');
  }

  return text;
};

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cleanCell);
}

function parseCourse(filePath, config) {
  const markdown = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  const lessonMatches = [...markdown.matchAll(/^# AULA (\d{2}) - (.+)$/gm)];

  const lessons = lessonMatches.map((match, index) => {
    const sectionStart = match.index + match[0].length;
    const sectionEnd = index + 1 < lessonMatches.length
      ? lessonMatches[index + 1].index
      : markdown.length;
    const section = markdown.slice(sectionStart, sectionEnd).trim();
    const lines = section.split('\n');
    const context = { slug: config.slug, lessonNumber: match[1] };
    const description = refinePublicCopy(lines.find(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('|') && !trimmed.startsWith('**');
    }) || '', context);

    const objectiveHeaderIndex = lines.findIndex(line => line.includes('Objetivos de Conhecimento'));
    const objectives = [];
    const technical = [];
    const socioemotional = [];

    if (objectiveHeaderIndex >= 0) {
      for (let cursor = objectiveHeaderIndex + 1; cursor < lines.length; cursor += 1) {
        const line = lines[cursor].trim();
        if (!line.startsWith('|')) break;
        const cells = parseTableRow(line);
        if (cells[0]) objectives.push(cells[0]);
        if (cells[1]) technical.push(cells[1]);
        if (cells[2]) socioemotional.push(cells[2]);
      }
    }

    const schedule = [];
    const scheduleStart = lines.findIndex(line => line.includes('Roteiro da Noite'));
    if (scheduleStart >= 0) {
      for (let cursor = scheduleStart + 1; cursor < lines.length; cursor += 1) {
        const line = lines[cursor].trim();
        const rowMatch = line.match(/^\|\s*(\d{2}:\d{2}\s*-\s*\d{2}:\d{2})\s*\|\s*(.*?)\s*\|$/);
        if (rowMatch) {
          schedule.push({
            horario: cleanCell(rowMatch[1]),
            atividade: refinePublicCopy(rowMatch[2], context)
          });
        } else if (schedule.length && line && !line.startsWith('|')) {
          break;
        }
      }
    }

    const field = (label) => {
      const line = lines.find(value => value.trim().startsWith(`**${label}:**`));
      return line ? cleanCell(line.replace(`**${label}:**`, '')) : '';
    };

    if (schedule.length !== 4) {
      throw new Error(`${config.title} Aula ${match[1]}: esperados 4 blocos, encontrados ${schedule.length}`);
    }

    return {
      num: match[1],
      title: refinePublicCopy(match[2], context),
      description,
      objectives: [...new Set(objectives)],
      technical: [...new Set(technical)],
      socioemotional: [...new Set(socioemotional)],
      schedule,
      methodology: refinePublicCopy(field('Metodologia'), context),
      resources: refinePublicCopy(field('Recursos'), context),
      observation: field('Obs.')
    };
  });

  if (lessons.length !== config.lessonCount) {
    throw new Error(`${config.title}: esperadas ${config.lessonCount} aulas, encontradas ${lessons.length}`);
  }

  return {
    ...config,
    lessons
  };
}

const courses = {
  'design-web': parseCourse(designPath, {
    slug: 'design-web',
    code: 'UC · Design Web',
    title: 'Design Web',
    workload: '100 h',
    lessonCount: 29,
    module: 'Módulo Específico II',
    teacher: 'Daniel Marcos Mayer',
    period: '2026/2',
    theme: 'web',
    description: 'Comunicação visual, interfaces, prototipação, mídias sociais, acessibilidade e projeto de presença digital, sem programação discente.',
    sourceLabel: path.basename(designPath)
  }),
  'producao-audiovisual': parseCourse(audiovisualPath, {
    slug: 'producao-audiovisual',
    code: 'UC · Produção Audiovisual',
    title: 'Produção Audiovisual',
    workload: '98 h',
    lessonCount: 23,
    module: 'Módulo Específico II',
    teacher: 'Daniel Marcos Mayer',
    period: '2026/2',
    theme: 'av',
    description: 'Da linguagem audiovisual à mostra final: roteiro, captação, edição, render e trabalho de produtora.',
    sourceLabel: path.basename(audiovisualPath)
  })
};

const audiovisualLesson01 = courses['producao-audiovisual'].lessons
  .find((lesson) => lesson.num === '01');

Object.assign(audiovisualLesson01, {
  description: 'Apresentação da UC, combinados de consentimento e primeira leitura da linguagem audiovisual. A noite termina com uma análise guiada, uma comparação entre duas formas de exibição e um vídeo de até 15 segundos gravado em dupla.',
  schedule: [
    {
      horario: '19:00 - 19:30',
      atividade: 'Acolhida, mapa da UC e contrato de gravação. Cada dupla registra uma expectativa para o curso e a turma fecha três regras: ninguém é obrigado a aparecer, toda gravação tem finalidade definida e material de aula não é publicado sem autorização específica.'
    },
    {
      horario: '19:30 - 20:30',
      atividade: 'Leitura guiada de três trechos curtos: longa-metragem, curta-metragem e vídeo de canal. A dupla escolhe um trecho e responde: para quem foi feito, o que quer provocar, qual escolha de imagem e de som chama atenção e como é o ritmo. A conclusão usa uma frase-modelo com algo visto ou ouvido no trecho.'
    },
    {
      horario: '20:30 - 21:30',
      atividade: 'Atividade "Mesmo conteúdo, telas diferentes": comparar duas versões preparadas da mesma mensagem. Preencher um quadro simples sobre tela vertical ou horizontal, duração, enquadramento, texto, som e ritmo; depois registrar três mudanças e explicar por que cada uma ajuda no local em que o vídeo seria exibido.'
    },
    {
      horario: '21:30 - 22:30',
      atividade: 'Prática "Meu primeiro plano": em dupla, definir onde o vídeo seria exibido, para quem e com qual objetivo; escolher uma ação simples com começo e fim; dividir os papéis; confirmar quem pode aparecer; gravar até 15 segundos somente na área e no momento liberados; assistir, refazer no máximo uma vez, nomear o arquivo e salvar na pasta indicada.'
    }
  ],
  methodology: 'Explicação curta, modelagem ao vivo, fichas guiadas, prática em duplas, devolutiva por critérios e desafio opcional para quem concluir antes.',
  resources: 'Três trechos curtos e um par de versões da mesma mensagem salvos localmente, ficha da Aula 01 impressa ou digital, projetor, computadores, smartphones e pasta de entrega preparada.',
  observation: 'Chamada realizada no início de cada bloco. Lanche de 20 min após o 1º bloco. Preservar no Bloco 3 uma margem técnica de até 20 min para organização dos computadores e atividade breve com a mesa digitalizadora. Na gravação, manter duplas fixas, uma área delimitada e deslocamento somente quando chamado; se a margem não for usada, aplicar a extensão no papel.'
});

const audiovisualLesson04 = courses['producao-audiovisual'].lessons
  .find((lesson) => lesson.num === '04');

Object.assign(audiovisualLesson04, {
  description: 'Aula guiada e simples para transformar uma história de seis acontecimentos em um roteiro de seis linhas e em um storyboard de seis quadros, usando somente as instruções projetadas.',
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Explicação curta com um exemplo completo: diferença entre roteiro e storyboard, estrutura de uma cena e três planos simples (geral, médio e detalhe). A turma acompanha apenas pelo projetor; cada um dos 7 grupos recebe uma história pronta.'
    },
    {
      horario: '20:05 - 20:50',
      atividade: 'Atividade 1 em 7 grupos: copiar no caderno a estrutura projetada e completar um roteiro de seis linhas. O próprio slide distribui as histórias, define os papéis, apresenta o modelo de escrita e mostra quando o trabalho está pronto.'
    },
    {
      horario: '20:50 - 21:35',
      atividade: 'Atividade 2 nos mesmos 7 grupos: dividir uma página em seis quadros e transformar cada linha do roteiro em um desenho simples, indicando plano, ação e som. Bonecos de palito, setas e formas simples são aceitos.'
    },
    {
      horario: '21:35 - 22:07',
      atividade: 'Conferência por checklist projetado, correção e apresentação do caderno ao professor. O grupo conclui quando roteiro e storyboard têm seis partes correspondentes, identificação e uma história que pode ser gravada na escola.'
    }
  ],
  methodology: 'Explicação curta, exemplo resolvido e duas atividades guiadas em 7 grupos. Cada atividade permanece projetada em um único slide com passos, modelo e critério de conclusão; a condução não depende de debate.',
  resources: 'Projetor, quadro, caderno ou folhas em branco dos alunos e lápis ou caneta. Nenhum arquivo, ficha preenchível ou material preparado precisa ser acessado ou distribuído.',
  observation: 'Aula das 19:00 às 22:07. Lanche fixo das 19:45 às 20:05. Deixe o slide da atividade parado durante a execução. Chamada apenas na abertura e na retomada; não é necessário exibir vídeo, abrir site, imprimir ou distribuir modelo.'
});

const audiovisualLesson05 = courses['producao-audiovisual'].lessons
  .find((lesson) => lesson.num === '05');

Object.assign(audiovisualLesson05, {
  description: 'Aula fechada em si mesma para decidir, antes de qualquer gravação, o que pode ser gravado, usado e exibido: cada grupo recebe um pedido de vídeo pelo slide, responde uma ficha de autorização de oito perguntas e grava duas tomadas curtas de consentimento com câmera e ring light.',
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Explicação curta com um exemplo resolvido: direito de uso de imagem, os quatro destinos possíveis de um vídeo, as licenças de música, imagem e fonte e três cuidados de acessibilidade, usabilidade e sustentabilidade. A turma acompanha apenas pelo projetor e se organiza em 7 grupos, um por câmera.'
    },
    {
      horario: '20:05 - 20:50',
      atividade: 'Atividade 1 em 7 grupos: cada grupo recebe pelo slide um pedido de vídeo e copia no caderno a ficha de oito perguntas projetada, respondendo-a para esse pedido. Uma das perguntas exige procurar no notebook uma música, uma imagem e uma fonte de uso livre e registrar nome, site, licença e crédito de cada uma.'
    },
    {
      horario: '20:50 - 21:35',
      atividade: 'Atividade 2 nos mesmos 7 grupos, com uma câmera e uma ring light para cada um: gravar duas tomadas curtas dentro da sala — a autorização falada, lendo o texto projetado com finalidade, local de exibição, prazo e direito de desistir, e a mesma cena sem mostrar o rosto de ninguém.'
    },
    {
      horario: '21:35 - 22:07',
      atividade: 'Conferência por checklist projetado, correção da ficha, anotação do nome dos dois arquivos, devolução da câmera e da ring light e apresentação do caderno ao professor. O grupo conclui quando a ficha tem as oito respostas, as duas tomadas foram assistidas e o equipamento voltou conferido.'
    }
  ],
  methodology: 'Explicação curta, exemplo resolvido e duas atividades guiadas em 7 grupos: uma no caderno com pesquisa de licenças no notebook e outra de gravação curta com câmera e ring light. Cada atividade permanece projetada em um único slide com passos, modelo e critério de conclusão; a condução não depende de debate.',
  resources: 'Projetor, quadro, caderno ou folhas em branco dos alunos, lápis ou caneta, notebooks dos alunos para a pesquisa de licenças, 7 câmeras com cartão e bateria e 7 ring lights. Nenhuma ficha impressa precisa ser distribuída.',
  observation: 'Aula das 19:00 às 22:07. Lanche fixo das 19:45 às 20:05. Deixe o slide da atividade parado durante a execução. Chamada apenas na abertura e na retomada. As câmeras e as ring lights saem somente às 20:50 e voltam conferidas até as 22:02. As gravações são exercício de aula: depois de conferi-las, apague antes do fim da aula tudo o que foi gravado hoje, teste e repetições incluídos, localizando os arquivos pela faixa de números que cada grupo anotou, do primeiro ao último do dia; não formate o cartão, que pode conter material de outra turma. A ficha do caderno é planejamento e não substitui o modelo de autorização da escola.'
});

const audiovisualLesson06 = courses['producao-audiovisual'].lessons
  .find((lesson) => lesson.num === '06');

Object.assign(audiovisualLesson06, {
  description: 'Noite de operação no posto fixo: cada um dos 7 grupos planeja e grava, com câmera e ring light, dois caminhos do olhar em oito segundos — um por troca de foco e outro por movimento — e compara no computador a intenção escrita antes com a leitura de quem não viu o plano.',
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Ver como quem opera decide para onde o público olha: o que entra no quadro, o que fica nítido e o que só aparece depois. Aprender a ligar, apoiar e guardar a câmera, a usar a ring light no posto, a travar e puxar o foco entre dois objetos e a fazer um movimento só, com começo e fim parados.'
    },
    {
      horario: '20:05 - 20:55',
      atividade: 'Atividade 1 nos 7 grupos, cada um na própria mesa: copiar o quadro, anotar antes da gravação onde o olhar deve começar e terminar em cada revelação e gravar três tomadas de 8 segundos — a base parada, uma troca de foco e um movimento —, revezando quem opera e quem fica sem ver o plano como olho novo. Ninguém troca de mesa.'
    },
    {
      horario: '20:55 - 21:40',
      atividade: 'Atividade 2 na mesma mesa: passar os arquivos para o computador, esconder a intenção, assistir cada revelação uma vez no navegador sem instalar nada e registrar onde o olhar do olho novo começou, em que segundo mudou e onde terminou; depois comparar a leitura com a seta planejada e anotar uma correção concreta quando não coincidirem.'
    },
    {
      horario: '21:40 - 22:10',
      atividade: 'Conferência pelo checklist projetado, exibição de uma revelação ao professor sem mostrar a intenção, comparação do caminho do olhar relatado com a seta planejada, devolução da câmera e da ring light e apresentação do caderno. O grupo conclui quando as três tomadas foram assistidas, as duas intenções têm leitura e decisão e o equipamento voltou conferido.'
    }
  ],
  methodology: 'Explicação curta, demonstração numa mesa só e duas atividades guiadas em 7 grupos no posto fixo: planejamento e gravação de três tomadas de oito segundos que trabalham quadro, foco e movimento, seguidos da comparação entre o caminho do olhar pretendido e o percebido por um integrante que não viu o plano. Cada atividade permanece projetada em um único slide com passos e critério de conclusão.',
  resources: 'Projetor, quadro, caderno ou folhas em branco dos alunos, lápis ou caneta, vários objetos por mesa entre os que os próprios alunos já têm, 7 câmeras com cartão e bateria, 7 ring lights e computadores do laboratório com navegador. Nenhum programa precisa ser instalado no Windows. Nenhuma ficha impressa precisa ser distribuída.',
  observation: 'Aula das 19:00 às 22:10. Lanche fixo das 19:45 às 20:05. Deixe o slide da atividade parado durante a execução. Chamada apenas na abertura e na retomada. Cada grupo permanece na mesa marcada; câmeras e ring lights saem somente às 20:05, vão até a mesa do grupo e voltam conferidas até as 22:05. A função de olho novo muda a cada revelação: quem vai testar não vê a intenção escrita nem a gravação e só fala depois de assistir no computador; o grupo mostra o plano somente depois de registrar a leitura. Depois de conferir, apague no cartão apenas o que foi gravado hoje, teste e repetições incluídos, pela faixa de números anotada; não formate o cartão. Sem editor online ou sem internet, o grupo assiste cada MP4 numa aba do navegador ou no Visualizador de Fotos do Windows.'
});

const audiovisualLesson07 = courses['producao-audiovisual'].lessons
  .find((lesson) => lesson.num === '07');

if (audiovisualLesson07?.schedule?.[0]) {
  audiovisualLesson07.schedule[0].atividade = audiovisualLesson07.schedule[0].atividade
    .replace('operação de câmera e circuito de planos-alvo', 'operação de câmera, foco e revelação');
}

const output = `/* Arquivo gerado por scripts/build-course-data.mjs. */\nwindow.SENAI_COURSES = ${JSON.stringify(courses, null, 2)};\n`;
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const outputPath = path.join(projectRoot, 'assets/course-data.js');
fs.writeFileSync(outputPath, output);
console.log(`Gerado ${outputPath}: ${courses['design-web'].lessons.length + courses['producao-audiovisual'].lessons.length} aulas.`);
