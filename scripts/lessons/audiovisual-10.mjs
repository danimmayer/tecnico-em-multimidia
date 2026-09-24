// Aula 10 de Produção Audiovisual: fonte única dos dados públicos e das anotações.
// Regenerar com: node scripts/build-audiovisual.mjs

import {plans} from './audiovisual-09.mjs';

const cut = plans.map((plan) => ({label: plan.id, seconds: plan.seconds}));

export const lesson = {
  title: 'Ilha de edição: primeiros cortes',
  description: 'O material gravado no set da aula 9 vira vídeo: cada equipe organiza a pasta do projeto, decupa as tomadas escolhidas, monta o corte bruto do comercial de 30 segundos no editor online, posiciona a locução e exporta um MP4 conferido.',
  objectives: [
    'Edição de vídeos e sons: aplicativos, edição de vídeo não-linear, corte.',
    'Composição e Render: importação, decupagem.',
    'Posturas profissionais: disciplina, produtividade.'
  ],
  technical: [
    'Identificar tipos e características de plataformas utilizados no processo de criação de elementos de gráficos para imagens, animações, áudio e vídeo.',
    'Aplicar edição de áudio, vídeo, texto e imagem para compor um produto audiovisual.'
  ],
  socioemotional: [
    'Aplicar os princípios de organização no seu posto trabalho.'
  ],
  schedule: [
    {
      horario: '19:00 - 19:45',
      atividade: 'Organização e decupagem: conhecer o fluxo da edição e as quatro áreas de um editor não linear, dividir as funções da ilha, criar a pasta do projeto (PA_A10_EQ01, com bruto, áudio, projeto e exportação), copiar as tomadas escolhidas na aula 9 e decupar no caderno a entrada e a saída de cada plano, pela tabela projetada.'
    },
    {
      horario: '20:05 - 21:00',
      atividade: 'Corte bruto: importar o material no editor online, colocar P1 a P5 na ordem do roteiro, aparar claquete e respiro pela decupagem, dividir e apagar sobras e salvar o projeto. Somente cortes secos, sem transições.'
    },
    {
      horario: '21:00 - 21:40',
      atividade: 'Som e ritmo: posicionar a locução embaixo do plano 5 na trilha de áudio, equilibrar o volume, conferir com fone do início ao fim e ajustar os planos para o total ficar perto de 30 segundos.'
    },
    {
      horario: '21:40 - 22:10',
      atividade: 'Exportação: gerar o MP4 em 1080p com o nome da equipe na pasta de exportação, abrir o arquivo exportado no reprodutor do computador, conferir duração, imagem e som, sair da conta do editor e registrar a frase individual no caderno.'
    }
  ],
  methodology: 'Demonstração curta no projetor seguida de prática da equipe no próprio computador, em quatro etapas com critério de pronto: organização e decupagem, corte bruto, som e ritmo, exportação conferida. A operação do computador troca a cada bloco para que todos editem. Tabela de decupagem projetada para cópia no caderno.',
  resources: 'Projetor, quadro, caderno, caneta e fones de ouvido. Um computador por equipe, com navegador, acesso ao editor online gratuito da escola e às pastas PA_A09 da aula 9. Os grupos já estão formados e as pastas da aula 9 já estão nos computadores; cartões identificados ficam disponíveis apenas para cópia de quem não copiou. Cinco clipes curtos de demonstração já gravados pelo professor. Nenhum programa precisa ser instalado no Windows. Nenhuma ficha impressa: a decupagem é projetada e copiada no caderno.',
  observation: 'Aula das 19:00 às 22:10. Lanche fixo das 19:45 às 20:05. Chamada no início dos quatro blocos. Cada equipe permanece no próprio posto; somente o professor circula. A operação do computador troca a cada bloco. Testar o acesso ao editor e uma exportação curta em um computador antes da turma entrar. Copiar, nunca mover, os arquivos da aula 9; nada é apagado. Ao final, salvar o projeto e sair da conta do editor. Sem internet ou sem acesso ao editor, a equipe faz a lista de corte completa no caderno (plano, arquivo, entrada, saída e locução) e monta o vídeo no início da aula 11. Sem fone, ouvir em volume baixo, um computador por vez.'
};

export const support = {
  teacherGoal: 'Levar as 7 equipes do material bruto da aula 9 a um corte bruto de 30 segundos exportado em MP4: pasta organizada, decupagem no caderno, cinco planos em cortes secos, locução posicionada e arquivo conferido fora do editor.',
  plainLanguage: 'Editar começa por organizar e decupar: com a entrada e a saída de cada plano anotadas, o corte bruto é só colocar os planos na ordem e aparar o que sobra.',
  say: 'Hoje o material do set vira vídeo. Nada de efeito: cinco planos, cortes secos, locução no lugar e um MP4 que abre.',
  demo: [
    'Mostre as quatro áreas do editor online: mídia, visualizador, linha do tempo e exportar.',
    'Demonstre as cinco ações da linha do tempo com os clipes de demonstração.',
    'Mostre como aparar a claquete e o respiro usando a decupagem.',
    'Exporte um MP4 curto e abra o arquivo fora do editor.'
  ],
  studentDeliverable: 'Por equipe: pasta PA_A10_EQ0X com o projeto salvo e o MP4 do corte bruto de cerca de 30 segundos, com os cinco planos na ordem, sem claquete e com a locução no plano 5. Por integrante: a frase da decisão de corte no caderno.',
  check: [
    'A decupagem no caderno tem entrada e saída dos cinco planos.',
    'Os cinco planos estão na ordem do roteiro, em cortes secos, sem claquete e sem tela preta.',
    'A locução aparece no plano 5 e se entende com fone.',
    'O corte total fica perto de 30 segundos.',
    'O MP4 abre fora do editor e está na pasta de exportação, junto do projeto salvo.'
  ],
  fallback: 'Sem internet ou sem acesso ao editor, a equipe completa a lista de corte no caderno (plano, arquivo, entrada, saída e locução) e monta o vídeo no início da aula 11. Sem material da aula 9 no computador, a equipe copia do cartão identificado no início do bloco 1.',
  commonProblems: [
    ['O editor pede acesso ou não abre', 'Uso o computador testado antes da aula para demonstrar; a equipe afetada segue na decupagem e na lista de corte no caderno.'],
    ['O arquivo não importa', 'Confiro se foi copiado para 01_BRUTO e se abre no reprodutor; arrasto de novo a partir da pasta.'],
    ['A claquete aparece no vídeo', 'Volto à decupagem e aparo a entrada do plano até o segundo anotado.'],
    ['Tela preta entre os planos', 'Aproximo os clipes na linha do tempo até encostarem.'],
    ['A exportação demora', 'A equipe confere a lista de encerramento enquanto espera; a aba do editor não é fechada.'],
    ['O total passa de 35 segundos', 'Corto primeiro o gancho e o uso, que são os planos mais longos, sem cortar o packshot.']
  ],
  presentationSlides: [
    {
      title: 'Ordem do dia',
      kicker: 'Ordem do dia · ilha de edição',
      heading: 'Hoje o material do set vira vídeo',
      lede: 'Cada equipe edita o comercial que gravou na aula 9. Estes são os prazos da noite.',
      block: 1,
      av9: {
        type: 'day',
        rows: [
          {time: '19:00–19:45', minutes: 45, title: 'Organizar e decupar', text: 'Pasta do projeto e decupagem no caderno.'},
          {time: '19:45–20:05', minutes: 20, title: 'Lanche', text: 'Projeto salvo antes de sair.', pause: true},
          {time: '20:05–21:00', minutes: 55, title: 'Corte bruto', text: 'P1 a P5 na linha do tempo.'},
          {time: '21:00–21:40', minutes: 40, title: 'Som e 30 segundos', text: 'Locução e ritmo.'},
          {time: '21:40–22:10', minutes: 30, title: 'Exportar e conferir', text: 'MP4 na pasta da equipe.'}
        ]
      },
      promptLabel: 'Entrega da noite',
      prompt: 'O corte bruto de cerca de 30 segundos exportado em MP4 e o projeto salvo na pasta da equipe.',
      teacher: {
        speech: 'Hoje o material do set vira vídeo. Nada de efeito: cinco planos, cortes secos, locução no lugar e um MP4 que abre.',
        steps: [
          '3 min · Faço a chamada, confirmo um computador por equipe com a pasta PA_A09 e leio a ordem do dia.'
        ],
        watch: 'Cada equipe sabe onde está o material da aula 9 antes de começar.',
        rescue: 'Equipe sem pasta da aula 9 recebe o cartão identificado e copia agora, no próprio posto.'
      }
    },
    {
      title: 'Fluxo da edição',
      kicker: 'Da diária ao vídeo',
      heading: 'O caminho do material bruto até o vídeo',
      lede: 'Toda produtora edita nesta ordem. Hoje a turma faz as quatro etapas do meio.',
      block: 1,
      av9: {
        type: 'flow',
        steps: [
          {label: 'MATERIAL BRUTO', text: 'Tomadas gravadas no set.', mark: 'Aula 9', later: true},
          {label: 'DECUPAGEM', text: 'Entrada e saída de cada plano.', mark: 'Hoje'},
          {label: 'CORTE BRUTO', text: 'Planos na ordem, cortes secos.', mark: 'Hoje'},
          {label: 'SOM', text: 'Locução e volume.', mark: 'Hoje'},
          {label: 'EXPORTAÇÃO', text: 'Arquivo MP4 conferido.', mark: 'Hoje'},
          {label: 'ACABAMENTO', text: 'Transições e textos.', mark: 'Aula 11', later: true}
        ]
      },
      promptLabel: 'Termo técnico',
      prompt: 'Corte bruto é a primeira montagem: os planos na ordem, com cortes secos. Transições e textos vêm depois.',
      teacher: {
        steps: [
          '3 min · Leio as seis etapas e explico por que transições ficam para a aula 11: primeiro o conteúdo precisa funcionar.'
        ],
        watch: 'A turma entende que o objetivo de hoje é um vídeo simples e completo.',
        rescue: 'Se alguém pedir efeitos, registro o pedido para a aula 11 e volto ao corte bruto.'
      }
    },
    {
      title: 'Funções na ilha',
      kicker: 'Equipe de edição',
      heading: 'Quatro funções, um computador',
      lede: 'Escrevam no caderno quem assume cada função. A operação troca a cada bloco: todos editam.',
      block: 1,
      av9: {
        type: 'roles',
        roles: [
          {label: 'OPERAÇÃO', decides: 'Decide o ponto do corte.', text: 'Usa mouse e teclado. Troca a cada bloco.'},
          {label: 'DECUPAGEM', decides: 'Decide a tomada usada.', text: 'Lê o boletim da aula 9 e a tabela de decupagem.'},
          {label: 'TEMPO', decides: 'Decide se o plano cabe.', text: 'Cronometra cada plano e o total.'},
          {label: 'CONFERÊNCIA', decides: 'Decide se está pronto.', text: 'Confere a lista antes de salvar e exportar.'}
        ]
      },
      promptLabel: 'Equipes de 3 ou 5',
      prompt: 'Com 3 pessoas, tempo e conferência ficam juntos. Com 5, duas pessoas se revezam na operação.',
      teacher: {
        steps: [
          '3 min · As equipes registram as funções e a ordem de revezamento da operação nos quatro blocos.'
        ],
        watch: 'Quem opera no bloco 1 não opera no bloco 2.',
        rescue: 'Equipe sem acordo segue a ordem alfabética dos nomes na operação.'
      }
    },
    {
      title: 'A tela do editor',
      kicker: 'Editor não linear',
      heading: 'Todo editor tem as mesmas quatro áreas',
      lede: 'O nome dos botões muda de um programa para outro; a função de cada área, não.',
      block: 1,
      av9: {
        type: 'editor',
        areas: [
          {label: 'MÍDIA', text: 'Arquivos importados para o projeto.'},
          {label: 'VISUALIZADOR', text: 'Onde se assiste ao que está montado.'},
          {label: 'LINHA DO TEMPO', text: 'Onde os planos são colocados em ordem.'},
          {label: 'EXPORTAR', text: 'Gera o arquivo final de vídeo.'}
        ]
      },
      promptLabel: 'Editor da aula',
      prompt: 'Editor online gratuito, aberto no navegador. Nada é instalado no computador.',
      teacher: {
        steps: [
          '5 min · Abro o editor no projetor, crio um projeto com o nome PA_A10_DEMO e aponto as quatro áreas; as equipes abrem o editor e criam o projeto com o nome da equipe.'
        ],
        watch: 'Todas as equipes têm o editor aberto e um projeto criado antes da decupagem.',
        rescue: 'Equipe sem acesso ao editor segue na decupagem; resolvo o acesso durante o bloco sem parar a sala.'
      }
    },
    {
      title: 'Pasta do projeto',
      kicker: 'Organização da ilha',
      heading: 'Primeiro a pasta, depois o editor',
      lede: 'Em uma produtora, todo projeto tem a mesma estrutura. Quem abrir a pasta encontra tudo.',
      block: 1,
      av9: {
        type: 'folder',
        folder: 'PA_A10_EQ03',
        files: ['01_BRUTO', '02_AUDIO', '03_PROJETO', '04_EXPORT'],
        steps: [
          'Criar a pasta da equipe com as quatro subpastas.',
          'Copiar para 01_BRUTO a tomada escolhida de cada plano; a locução vai para 02_AUDIO.',
          'Copiar, nunca mover: a pasta da aula 9 fica intacta.'
        ]
      },
      promptLabel: 'Regra da ilha',
      prompt: 'Nada é apagado. O material da aula 9 é o original do cliente.',
      teacher: {
        steps: [
          '2 min · Mostro a estrutura no projetor.',
          '6 min · As equipes criam as pastas e copiam as tomadas escolhidas pelo boletim da aula 9.'
        ],
        watch: 'A pasta da aula 9 continua completa depois da cópia.',
        rescue: 'Equipe sem tomada escolhida no boletim usa a última tomada BOA de cada plano.'
      }
    },
    {
      title: 'Decupagem no caderno',
      kicker: 'Ficha projetada · copiar no caderno',
      heading: 'Decupagem: onde cada plano começa e termina',
      lede: 'Assistam a tomada de cada plano e anotem o segundo em que a ação começa e termina, sem claquete e sem respiro.',
      block: 1,
      av9: {
        type: 'table',
        variant: 'copy',
        columns: ['Plano', 'Arquivo', 'Entra em', 'Sai em', 'Duração'],
        rows: [
          ['P2', 'P2_T2', '0:04', '0:09', '5 s'],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', '']
        ],
        exampleRows: 1,
        footer: ['Uma linha por plano: P1 a P5', 'Locução: LOC_T_ · entra em ____']
      },
      promptLabel: 'Parem e confiram',
      prompt: 'PRONTO QUANDO: cinco linhas com entrada, saída e duração, e a locução escolhida anotada.',
      teacher: {
        steps: [
          '2 min · Mostro no reprodutor como ler o segundo exato de entrada e saída de uma tomada.',
          '21 min · As equipes decupam no próprio computador; atendo primeiro quem ainda não começou.'
        ],
        watch: 'A duração de cada plano fica próxima do tempo do roteiro da aula 9.',
        rescue: 'Plano mais curto que o previsto é mantido como está; o ajuste fino acontece no bloco 3.'
      }
    },
    {
      title: 'Lanche',
      kicker: 'Intervalo',
      heading: 'Lanche até 20:05',
      lede: 'Voltem ao mesmo posto. A troca de operação acontece na volta.',
      block: 1,
      pace: 'break',
      av9: {
        type: 'checks',
        items: [
          {label: 'Projeto', text: 'Salvo com o nome da equipe.'},
          {label: 'Caderno', text: 'Aberto na decupagem.'}
        ]
      },
      teacher: {
        steps: [
          '20 min · Lanche das 19:45 às 20:05.'
        ],
        watch: 'Comida e bebida longe dos computadores.',
        rescue: 'Aba do editor aberta; nada é fechado no intervalo.'
      }
    },
    {
      title: 'Cinco ações na linha do tempo',
      kicker: 'Demonstração',
      heading: 'Cinco ações montam o corte bruto',
      lede: 'Qualquer editor faz estas cinco ações. Vejam uma vez no projetor e repitam no posto.',
      block: 2,
      av9: {
        type: 'commands',
        commands: [
          {word: 'IMPORTAR', who: 'Arrastar da pasta', text: '01_BRUTO e 02_AUDIO para a mídia.'},
          {word: 'ORDENAR', who: 'Arrastar', text: 'P1 a P5 da esquerda para a direita.'},
          {word: 'APARAR', who: 'Borda do clipe', text: 'Até a entrada e a saída anotadas.'},
          {word: 'DIVIDIR', who: 'Tesoura', text: 'Cortar no ponto e apagar a sobra.'},
          {word: 'SALVAR', who: 'Nome do projeto', text: 'Equipe e versão: v01.'}
        ],
        tags: [{label: 'CORTE SECO', kind: 'good'}],
        result: 'Um plano termina e o próximo começa. Nenhuma transição hoje.'
      },
      teacher: {
        steps: [
          '2 min · Faço a chamada e confirmo a troca de operação.',
          '10 min · Demonstro as cinco ações com os clipes de demonstração, uma de cada vez; depois de cada ação, as equipes repetem com o próprio material.'
        ],
        watch: 'A demonstração acontece em passos curtos, com a turma repetindo no posto.',
        rescue: 'Se o editor da equipe mostrar botões diferentes, aponto a área equivalente sem trocar de programa.'
      }
    },
    {
      title: 'Aparar pela decupagem',
      kicker: 'Aparar',
      heading: 'Na linha do tempo fica só a ação',
      lede: 'A claquete e os respiros foram gravados para a edição encontrar e cortar. Eles não aparecem no vídeo.',
      block: 2,
      av9: {
        type: 'tracks',
        tracks: [
          {label: 'P2_T2', clips: [
            {label: 'CLAQUETE', seconds: 2, kind: 'cut'},
            {label: 'RESPIRO', seconds: 2, kind: 'cut'},
            {label: 'AÇÃO', seconds: 5},
            {label: 'RESPIRO', seconds: 2, kind: 'cut'}
          ]}
        ],
        caption: 'Área listrada: aparada. Fica só a ação anotada na decupagem, de 0:04 a 0:09.'
      },
      teacher: {
        steps: [
          '3 min · Mostro o P2_T2 de exemplo sendo aparado de 0:04 a 0:09 e confiro o resultado no visualizador.'
        ],
        watch: 'Nenhum quadro da claquete aparece no início do plano.',
        rescue: 'Se aparar pela borda for difícil, uso a divisão com a tesoura no segundo anotado e apago a parte da claquete.'
      }
    },
    {
      title: 'Monte o corte bruto',
      kicker: 'Prática da equipe',
      heading: 'Cinco planos, na ordem, encostados',
      lede: 'Sigam a decupagem do caderno. Este é o tamanho de cada plano no roteiro.',
      block: 2,
      av9: {
        type: 'tracks',
        tracks: [{label: 'VÍDEO', clips: cut}],
        caption: 'Tempo do roteiro da aula 9. Pequenas diferenças são normais.',
        total: true
      },
      promptLabel: 'Parem e confiram',
      prompt: 'PRONTO QUANDO: P1 a P5 na ordem, sem claquete, sem tela preta entre os planos e projeto salvo como v01.',
      teacher: {
        steps: [
          '2 min · Leio o critério de pronto.',
          '33 min · Circulo de EQ01 a EQ07; em cada posto, assisto ao início do P1 e a uma emenda entre planos.',
          '5 min · Às 20:55, paro a sala: cada equipe salva o projeto e confere o critério de pronto.'
        ],
        watch: 'Cortes secos e planos encostados; efeitos e transições ficam para a aula 11.',
        rescue: 'Equipe atrasada monta P2, P3 e P5 primeiro, que são os planos de produto, e completa P1 e P4 no bloco 3.'
      }
    },
    {
      title: 'Locução na trilha de áudio',
      kicker: 'Som',
      heading: 'A locução entra embaixo do plano 5',
      lede: 'O vídeo fica na trilha de cima e a locução na trilha de baixo. Ela começa junto com o packshot.',
      block: 3,
      av9: {
        type: 'tracks',
        tracks: [
          {label: 'VÍDEO', clips: cut},
          {label: 'ÁUDIO', clips: [{seconds: 23, kind: 'empty'}, {label: 'LOC', seconds: 7, kind: 'audio'}]}
        ],
        caption: 'O som gravado com cada plano continua junto do vídeo, com volume baixo.'
      },
      teacher: {
        steps: [
          '2 min · Faço a chamada e confirmo a nova troca de operação.',
          '5 min · Demonstro como arrastar a locução para a trilha de áudio, alinhar com o início do P5 e baixar o volume do som dos planos.'
        ],
        watch: 'A locução começa no primeiro quadro do packshot.',
        rescue: 'Se a locução passar do fim do P5, aumento o P5 até ela terminar; o total pode passar um pouco de 30 segundos.'
      }
    },
    {
      title: 'Som que se entende',
      kicker: 'Conferência com fone',
      heading: 'Quatro ajustes de som',
      lede: 'Ouçam o corte inteiro com fone depois de cada ajuste.',
      block: 3,
      av9: {
        type: 'checks',
        items: [
          {label: 'Volume', text: 'A locução fica mais alta que o som dos planos.'},
          {label: 'Conversa', text: 'Plano com conversa da sala fica sem som.'},
          {label: 'Sincronia', text: 'A marca aparece quando é falada.'},
          {label: 'Início e fim', text: 'Nenhum som cortado no meio de uma palavra.'}
        ]
      },
      teacher: {
        steps: [
          '3 min · Leio os quatro ajustes e mostro onde fica o volume de um clipe no editor.'
        ],
        watch: 'A conferência é feita com fone, não pelo alto-falante do computador.',
        rescue: 'Sem fone, a equipe ouve em volume baixo, uma equipe por vez, com o rosto perto do computador.'
      }
    },
    {
      title: 'Ritmo: 30 segundos',
      kicker: 'Prática da equipe',
      heading: 'O corte fecha perto de 30 segundos',
      lede: 'Quem cuida do tempo lê a duração total na linha do tempo e compara cada plano com o roteiro.',
      block: 3,
      av9: {
        type: 'checks',
        items: [
          {label: 'Total', text: 'Entre 28 e 32 segundos.'},
          {label: 'Planos', text: 'Nenhum plano muito maior que o tempo do roteiro.'},
          {label: 'Emendas', text: 'Sem tela preta e sem salto dentro de um plano.'},
          {label: 'Versão', text: 'Projeto salvo como v02, sem apagar a v01.'}
        ]
      },
      promptLabel: 'Parem e confiram',
      prompt: 'PRONTO QUANDO: locução no P5, som conferido com fone, total perto de 30 segundos e projeto salvo como v02.',
      teacher: {
        steps: [
          '25 min · Circulo pelos postos e assisto a cada corte com fone, do início ao fim, uma vez.',
          '5 min · Às 21:35, paro a sala: cada equipe salva a v02 e lê o total para mim em voz baixa.'
        ],
        watch: 'Salvar uma nova versão preserva o trabalho do bloco anterior.',
        rescue: 'Corte acima de 35 segundos: reduzo primeiro o gancho e o uso, nunca o packshot.'
      }
    },
    {
      title: 'Exportar',
      kicker: 'Exportação',
      heading: 'Um arquivo MP4 com o nome da equipe',
      lede: 'Usem estas escolhas na janela de exportação. Enquanto o arquivo é gerado, a aba do editor fica aberta.',
      block: 4,
      av9: {
        type: 'table',
        variant: 'data',
        columns: ['Item', 'Escolha'],
        rows: [
          ['Formato', 'MP4'],
          ['Resolução', '1080p'],
          ['Nome do arquivo', 'PA_A10_EQ03_corte_v02'],
          ['Pasta', '04_EXPORT']
        ]
      },
      promptLabel: 'Durante a exportação',
      prompt: 'Não fechem a aba do editor até o arquivo aparecer em 04_EXPORT.',
      teacher: {
        steps: [
          '2 min · Faço a chamada e mostro a janela de exportação no projetor.',
          '8 min · As equipes exportam; atendo quem tiver erro de exportação.'
        ],
        watch: 'O arquivo vai para 04_EXPORT, não para a pasta de downloads.',
        rescue: 'Se o arquivo cair na pasta de downloads, a equipe copia para 04_EXPORT e renomeia.'
      }
    },
    {
      title: 'Conferir o MP4',
      kicker: 'Conferência fora do editor',
      heading: 'O vídeo só está pronto quando abre fora do editor',
      lede: 'Abram o MP4 exportado no reprodutor do computador e assistam do início ao fim.',
      block: 4,
      av9: {
        type: 'checks',
        items: [
          {label: 'Abre', text: 'O MP4 abre no reprodutor do computador.'},
          {label: 'Duração', text: 'Perto de 30 segundos.'},
          {label: 'Som', text: 'Locução clara no plano 5.'},
          {label: 'Pasta', text: 'MP4 em 04_EXPORT e projeto salvo.'}
        ]
      },
      teacher: {
        steps: [
          '8 min · As equipes conferem os quatro itens; passo em cada posto e assisto aos primeiros segundos do MP4.'
        ],
        watch: 'A conferência é feita no arquivo exportado, não na linha do tempo.',
        rescue: 'MP4 com problema: a equipe corrige no projeto e exporta de novo com o nome v03.'
      }
    },
    {
      title: 'Encerramento',
      kicker: 'Fechamento da ilha',
      heading: 'Fechem a ilha até 22:10',
      lede: 'Confiram na própria mesa antes de levantar.',
      block: 4,
      av9: {
        type: 'checks',
        items: [
          {label: '1 · Arquivos', text: 'Projeto salvo e MP4 conferido na pasta da equipe.'},
          {label: '2 · Computador', text: 'Sair da conta do editor e fechar o navegador.'},
          {label: '3 · Registro', text: 'Cada integrante escreve: “No corte, a decisão que tomei foi ___.”'},
          {label: '4 · Aula 11', text: 'O corte bruto ganha transições e acabamento.'}
        ]
      },
      teacher: {
        steps: [
          '4 min · Confiro as 7 pastas com projeto e MP4.',
          '4 min · Confiro em cada posto a saída da conta do editor.',
          '4 min · Ouço duas frases, anuncio a aula 11 e encerro às 22:10.'
        ],
        watch: 'Nenhuma conta fica aberta nos computadores da escola.',
        rescue: 'Com atraso, priorizo salvar, conferir o MP4 e sair da conta; a frase pode ser dita em voz alta.'
      }
    }
  ],
  appendDefaultClosing: false
};
