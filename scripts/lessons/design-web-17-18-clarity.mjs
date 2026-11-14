// Complementos didáticos das Aulas 17 e 18. Capacidades, objetivos e atitudes
// oficiais permanecem no planejamento central e não são redefinidos aqui.
export const lessonPatches = {
  '17': {
    description: 'Transformar uma das três versões iniciais escolhidas na Aula 16 e sua Página de informações em wireframes: desenhos da tela com espaços e tamanhos, para testar a ordem do conteúdo antes de usar cor e acabamento.',
    schedule: [
      {
        horario: '19:00 - 19:45',
        atividade: 'Retomar a versão escolhida na Aula 16. Cada dupla abre seus três esboços iniciais e a Página de informações, aponta qual versão vai desenvolver e diz qual tarefa a pessoa deve conseguir realizar. Apresentação breve: wireframe é um desenho da tela com espaços e tamanhos; ele serve para decidir ordem, conteúdo e ação, não para escolher cores.'
      },
      {
        horario: '20:05 - 20:50',
        atividade: 'Montar o wireframe da página inicial escolhida no computador ou no papel: marcar a área da tela, cabeçalho, destaque, informação principal, botão e rodapé. Usar linhas para texto, caixas para imagens e retângulos para botões. Conferir: o título, a informação prioritária e a ação aparecem na ordem combinada.'
      },
      {
        horario: '20:50 - 21:30',
        atividade: 'Montar a Página de informações que completa a promessa do botão da página inicial. Ligar as duas telas com uma seta e escrever a tarefa do visitante. A dupla alterna quem organiza os blocos e quem confere se o caminho responde ao pedido.'
      },
      {
        horario: '21:30 - 22:00',
        atividade: 'Teste entre pares: um visitante tenta cumprir a tarefa sem explicação; a dupla registra onde ele procurou, o que encontrou e uma decisão de manter ou ajustar. Salvar ou fotografar o wireframe e nomear os dois arquivos. Das 22:00 às 22:30: somente apoio técnico, salvamento e organização do trabalho já concluído.'
      }
    ],
    methodology: 'Oficina de continuidade da Aula 16: escolher uma das três versões iniciais e desenvolver somente essa versão escolhida, junto da Página de informações. Demonstrações curtas mostram a convenção; estudantes constroem, testam uma tarefa e revisam com base no que o visitante fez. O docente observa, pergunta e devolve feedback por critério, sem aprovação automática.',
    resources: 'Projetor, computador com navegador ou papel A4, régua, caneta e os esboços salvos da Aula 16. Alternativa sem internet: papel, post-its e molduras impressas de computador. Casos fictícios; não usar dados pessoais.',
    observation: 'Conteúdo, teste e evidência previstos até 22:00, com intervalo de 19:45 a 20:05. Das 22:00 às 22:30: apoio técnico, salvamento e organização, sem conteúdo, requisito ou evidência avaliativa nova. A execução, a aprendizagem observada, a frequência e registros institucionais dependem do docente.'
  },
  '18': {
    description: 'Adaptar os wireframes da página inicial e da Página de informações para celular, decidindo o que aparece primeiro, o que muda de lugar e como a navegação continua compreensível em uma tela menor.',
    schedule: [
      {
        horario: '19:00 - 19:45',
        atividade: 'Retomar os dois wireframes da Aula 17. Comparar a mesma página no computador e no celular: localizar o que aparece primeiro, o que fica abaixo, o que muda de ordem e qual ação continua fácil de tocar. Responsivo significa reorganizar a tela para que a tarefa continue clara em tamanhos diferentes; não é apenas encolher o desenho.'
      },
      {
        horario: '20:05 - 20:50',
        atividade: 'Desenhar a versão de celular da página inicial. Na área da tela do celular, colocar primeiro título, informação e ação prioritários; empilhar o que ficava lado a lado no computador; decidir como o menu aparece. Anotar ao lado uma mudança e o motivo dela.'
      },
      {
        horario: '20:50 - 21:30',
        atividade: 'Adaptar a Página de informações para celular e conferir o caminho entre as duas telas. A dupla marca o que se mantém, o que muda de ordem e o que pode ficar depois porque é secundário. Alternar quem desenha e quem lê o caminho como visitante.'
      },
      {
        horario: '21:30 - 22:00',
        atividade: 'Teste entre pares no papel ou no computador: outra pessoa tenta encontrar uma informação e concluir a ação principal no wireframe de celular. Registrar onde ela hesitou e ajustar, se a observação justificar. Salvar ou fotografar as quatro telas. Das 22:00 às 22:30: somente apoio técnico, salvamento e organização do trabalho já concluído.'
      }
    ],
    methodology: 'Comparação de uma mesma tarefa em computador e celular, adaptação prática de dois wireframes e teste entre pares. A turma toma decisões de prioridade, ordem e toque; o docente usa perguntas e observação para mediar, sem transformar o preenchimento de itens em comprovação automática de aprendizagem.',
    resources: 'Projetor, computador com navegador ou papel A4, régua, caneta, molduras de computador e celular, e os wireframes da Aula 17. Alternativa sem internet: recortar e reorganizar blocos em uma moldura de celular. Casos fictícios; não usar dados pessoais.',
    observation: 'Conteúdo, teste e evidência previstos até 22:00, com intervalo de 19:45 a 20:05. Das 22:00 às 22:30: apoio técnico, salvamento e organização, sem conteúdo, requisito ou evidência avaliativa nova. A execução, a aprendizagem observada, a frequência e registros institucionais dependem do docente.'
  }
};

export const supportPatches = {
  '17': {
    teacherGoal: 'Apoiar cada dupla a transformar uma única versão inicial escolhida na Aula 16 em dois wireframes de baixa fidelidade: página inicial e Página de informações.',
    plainLanguage: 'Wireframe é um desenho da tela com espaços e tamanhos. Ele mostra onde ficam conteúdo, botão e informações antes de decidir cor, fonte ou acabamento.',
    say: 'Hoje não vamos refazer as três versões. Escolham a versão já decidida e façam duas telas que deixem a tarefa clara: início e Página de informações.',
    demo: [
      'Mostre uma área de tela de computador e nomeie as partes: cabeçalho, destaque, conteúdo, botão e rodapé.',
      'Converta um título, um texto e um botão do esboço em linhas e retângulos, sem escolher cor.',
      'Ligue a ação da página inicial à Página de informações com uma seta.',
      'Leia a tarefa de visitante e aponte onde ela começa e termina.',
      'Mostre como salvar ou fotografar as duas telas.'
    ],
    studentDeliverable: 'Dois wireframes da versão escolhida: página inicial e Página de informações, ligados por uma tarefa e com uma observação de visitante registrada até 22h.',
    check: [
      'A dupla identifica qual das três versões iniciais escolheu e qual tarefa ela atende.',
      'Título, informação prioritária e ação aparecem em uma ordem que o visitante consegue localizar.',
      'O botão da página inicial leva a uma Página de informações coerente com a promessa.',
      'O registro do teste diz o que a pessoa procurou, encontrou ou onde hesitou; a decisão de manter ou ajustar tem motivo.'
    ],
    fallback: 'No papel, desenhe duas molduras de computador, use post-its para blocos e uma seta para o caminho. Fotografar é suficiente para guardar o trabalho.',
    commonProblems: [
      ['Tenta desenvolver as três versões de novo', 'Retome a escolha da Aula 16: hoje aprofunda somente uma versão inicial e a Página de informações.'],
      ['Wireframe vira página decorada', 'Troque cor, foto detalhada e fonte por caixas, linhas, rótulos e tamanhos aproximados.'],
      ['Botão não entrega o que promete', 'Leia o texto do botão e pergunte qual informação a segunda tela precisa oferecer para cumprir a ação.']
    ]
  },
  '18': {
    teacherGoal: 'Apoiar cada dupla a reorganizar os dois wireframes escolhidos para celular, sem apenas diminuir a versão de computador.',
    plainLanguage: 'Responsivo é reorganizar a tela para que a pessoa consiga entender, ler e tocar o que importa no celular. Computador é a tela maior; celular é a tela menor. A área em que desenhamos cada uma é a área da tela.',
    say: 'Não apertem o desenho do computador até caber. Decidam o que aparece primeiro no celular e testem se uma pessoa encontra e toca a ação principal.',
    demo: [
      'Coloque lado a lado uma área de tela de computador e uma de celular.',
      'Empilhe no celular dois blocos que estavam lado a lado no computador.',
      'Mova a informação mais importante para antes da rolagem e mantenha o botão fácil de tocar.',
      'Mostre uma anotação curta: “horário sobe porque a pessoa decide antes de sair”.',
      'Faça uma pessoa tentar encontrar uma informação sem receber explicação.'
    ],
    studentDeliverable: 'Quatro wireframes: página inicial e Página de informações em computador e celular, com mudanças anotadas e uma observação de teste registrada até 22h.',
    check: [
      'A dupla consegue dizer o que mudou entre computador e celular e por quê.',
      'No celular, título, informação prioritária e ação principal aparecem em ordem compreensível.',
      'O caminho entre página inicial e Página de informações continua possível.',
      'A observação do visitante indica uma decisão de manter ou ajustar; não é apenas elogio.'
    ],
    fallback: 'Recorte os blocos do wireframe de computador e organize-os em uma moldura de celular desenhada no papel; anote setas e prioridades.',
    commonProblems: [
      ['Tudo apenas fica menor', 'Pergunte o que a pessoa precisa ver primeiro e empilhe ou mude de ordem os blocos.'],
      ['Informação some sem motivo', 'Decidam se ela é secundária, se vai para a Página de informações ou se precisa continuar visível.'],
      ['Teste vira explicação do autor', 'Peça ao visitante uma tarefa e observe onde ele procura antes de responder perguntas.']
    ]
  }
};
