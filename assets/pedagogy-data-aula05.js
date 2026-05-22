/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 05 — A Câmera Digital
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * =======================================================================
 * Aula presencial com celulares, cadernos e materiais das aulas anteriores.
 * O objetivo é transformar o equipamento em instrumento consciente: escolher,
 * manusear, configurar, cuidar, planejar e justificar decisões técnicas.
 * ======================================================================= */
(function (global) {
  'use strict';

  const COMPETENCIAS = {
    'CK-CAMERA': {
      tipo: 'conhecimento',
      titulo: 'Câmera fotográfica digital: tipos, manuseio, partes e acessórios',
      curto: 'Câmera digital'
    },
    'CK-SMARTPHONE': {
      tipo: 'conhecimento',
      titulo: 'Smartphone como ferramenta fotográfica: apps, recursos e limitações',
      curto: 'Smartphone'
    },
    'CT-FOTOGRAFAR': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de fotografia na seleção e operação do equipamento',
      curto: 'Aplicação fotográfica'
    },
    'CT-INFORMATICA': {
      tipo: 'tecnica',
      titulo: 'Aplicar princípios de informática na utilização de ferramentas de apoio',
      curto: 'Ferramentas digitais'
    },
    'CS-TEMPO': {
      tipo: 'socioemocional',
      titulo: 'Reconhecer a importância da gestão do tempo como fator de impacto na qualidade dos serviços executados',
      curto: 'Gestão do tempo'
    },
    'CS-RESPONSABILIDADE': {
      tipo: 'socioemocional',
      titulo: 'Aplicar fundamentos da gestão do tempo para controle das atividades sob sua responsabilidade',
      curto: 'Responsabilidade'
    }
  };

  const BLOCOS = [
    {
      id: 1,
      label: 'Bloco 1',
      inicio: '19:00',
      fim: '19:30',
      titulo: 'Chamada e ponte técnica',
      descricao: 'Chamada. Revisão das aulas anteriores. Câmera como sistema de captura: luz, decisão e arquivo.'
    },
    {
      id: 2,
      label: 'Bloco 2',
      inicio: '19:30',
      fim: '20:30',
      titulo: 'Instrumento e componentes',
      descricao: 'Tipos de câmera, anatomia básica, sensor, obturador, diafragma, visor, LCD e acessórios.'
    },
    {
      id: 3,
      label: 'Bloco 3',
      inicio: '20:50',
      fim: '21:50',
      titulo: 'Smartphone e controle',
      descricao: 'Smartphone como ferramenta fotográfica, aplicativos, modo manual, cuidado e manuseio correto.'
    },
    {
      id: 4,
      label: 'Bloco 4',
      inicio: '21:50',
      fim: '22:30',
      titulo: 'Gestão e exercício',
      descricao: 'Planejamento de sessão, checklist, arquivos, backup, prática cronometrada e leitura técnica do resultado.'
    }
  ];

  const NOTES = {
    'Capa': {
      fala: 'Boa noite. Hoje a câmera deixa de ser um objeto misterioso e vira instrumento de trabalho. Não importa se a câmera é DSLR, mirrorless, compacta ou smartphone: toda decisão técnica muda a imagem.',
      dica: 'Ponto de partida: todos chegam com uma câmera no bolso. A diferença da aula está no método, não no preço do equipamento.'
    },
    'Programação da Noite': {
      fala: 'A noite tem quatro movimentos. Primeiro, conectamos com as aulas anteriores. Depois olhamos o instrumento por dentro. No terceiro bloco, trazemos o smartphone e os modos de controle. No final, fazemos uma prática curta com tempo contado.',
      dica: 'Ritmo sugerido: o intervalo entra após o Bloco 2. A prática final precisa permanecer como fechamento aplicado da aula.'
    },
    'Ponte com as Aulas Anteriores': {
      fala: 'Aula 01 mostrou que a câmera muda a cultura visual. Aula 02 mostrou que a imagem digital nasce de sensor, pixel e arquivo. Aulas 03 e 04 mostraram que toda escolha técnica produz sentido. Hoje amarramos isso no equipamento.',
      dica: 'Pergunta de aquecimento: quando uma foto de celular parece profissional? Quando parece improvisada? A resposta deve apontar decisões observáveis.'
    },
    'Mapa do Instrumento': {
      fala: 'Uma câmera não é uma caixa com botão. É um fluxo: lente organiza a luz, diafragma dosifica, obturador mede o tempo, sensor converte, processador interpreta, cartão guarda. Se uma etapa falha, a imagem sofre.',
      dica: 'Mapa de referência para a noite: cada componente técnico volta a esse fluxo de luz, controle, registro e arquivo.'
    },
    'Tipos de Câmera': {
      fala: 'Não existe uma câmera melhor em absoluto. Existe ferramenta adequada para problema, orçamento, tempo, equipe e entrega. A comparação serve para escolher com critério, não para criar hierarquia de status.',
      dica: 'Comparação por cenário: evento à noite, viagem, produto em bancada e conteúdo rápido para redes pedem restrições diferentes.'
    },
    'Qual Câmera Resolve Qual Problema?': {
      fala: 'A escolha técnica começa com perguntas simples: preciso trocar lente? preciso trabalhar rápido? tenho pouca luz? preciso parecer discreto? preciso entregar ainda hoje?',
      dica: 'Microatividade: defender uma escolha em voz alta. O critério central é a justificativa, não a marca.'
    },
    'Anatomia da Câmera': {
      fala: 'Vamos nomear as partes que aparecem em praticamente toda câmera. O aluno não precisa decorar catálogo, mas precisa saber onde cada decisão acontece.',
      dica: 'Roteiro de observação: localizar no equipamento ou no app onde entram lente, foco, exposição, tela e armazenamento.'
    },
    'Sensor: o Chão da Imagem': {
      fala: 'O sensor é onde a luz vira dado. Sensor maior costuma ter melhor desempenho em baixa luz e mais controle de profundidade de campo, mas tamanho não resolve tudo: lente, estabilização e processamento também contam.',
      dica: 'Foco didático: consequência prática antes da ficha técnica. Ruído, recorte, baixa luz e desfoque explicam melhor que números isolados.'
    },
    'Obturador e Tempo': {
      fala: 'O obturador decide por quanto tempo o sensor recebe luz. Tempo curto congela; tempo longo registra movimento. Esse controle não é só técnico: ele muda a sensação da imagem.',
      dica: 'Exemplos rápidos funcionam bem: mão congelada versus mão borrada; esporte, rua, dança e produto ajudam a fixar o conceito.'
    },
    'Diafragma e Profundidade': {
      fala: 'Diafragma controla a passagem de luz e também a profundidade de campo. Abertura grande desfoca mais o fundo; abertura pequena tende a deixar mais planos nítidos.',
      dica: 'No celular, diferencie efeito óptico e computacional. O modo retrato pode ser usado, desde que a turma reconheça o que ele simula.'
    },
    'Visor, LCD e Foco': {
      fala: 'Visor e tela são instrumentos de enquadramento e conferência. Foco não é só tocar na tela: é decidir qual parte da imagem merece nitidez e atenção.',
      dica: 'Demonstração simples: tocar em áreas diferentes da cena no celular mostra foco e exposição mudando juntos.'
    },
    'Acessórios com Função': {
      fala: 'Acessório bom não é enfeite. Ele resolve um problema concreto: estabilidade, energia, armazenamento, limpeza, transporte, controle de luz ou segurança.',
      dica: 'Traga para acessórios possíveis: pano de microfibra, power bank, mini tripé, fone como disparador e cartão confiável.'
    },
    'Smartphone como Câmera': {
      fala: 'O smartphone é uma câmera séria quando o fotógrafo entende suas forças: disponibilidade, estabilização, computação e agilidade. As limitações são sensor pequeno, lente pequena e processamento agressivo.',
      dica: 'Tom da discussão: o celular é ferramenta legítima. A aula deve mostrar potência e limite com o mesmo rigor.'
    },
    'Apps e Controle Manual': {
      fala: 'Apps de câmera e edição ampliam controle, mas não substituem olhar. O app certo ajuda a travar foco, exposição, branco, ISO, velocidade ou organizar um fluxo.',
      dica: 'Critério de acesso: app nativo já serve para a prática. Apps extras entram como opção, não como barreira.'
    },
    'Modo Manual sem Medo': {
      fala: 'Manual não é usar todos os controles de uma vez. Manual é saber qual controle importa agora. Se o problema é movimento, comece pela velocidade. Se é fundo desfocado, comece pela abertura. Se é ruído, olhe ISO e luz.',
      dica: 'Mensagem-chave: automático também pode ser escolha consciente. Profissionalismo é justificar o controle usado.'
    },
    'Checklist de Manuseio': {
      fala: 'Antes de fotografar, faça uma varredura rápida: lente limpa, bateria, espaço, resolução, foco, exposição, enquadramento e backup. Parece simples, mas reduz erro real.',
      dica: 'Rotina curta: lente, bateria, espaço, foco, exposição, enquadramento e backup. A repetição cria hábito de produção.'
    },
    'Gestão de Tempo Fotográfico': {
      fala: 'Tempo mal gerido vira foto ruim: chega tarde, esquece bateria, perde luz, fotografa sem plano, edita correndo. Planejamento é parte técnica do trabalho fotográfico.',
      dica: 'Conexão profissional: prazo, entrega, cliente interno, equipe e retrabalho mostram que tempo também é qualidade.'
    },
    'Arquivos, Backup e Metadados': {
      fala: 'A foto não termina no clique. Ela precisa ser encontrada, preservada e entregue. Nome de pasta, backup e metadados evitam perda e economizam tempo.',
      dica: 'Padrão simples para registrar: AAAA-MM-DD_tema_autor. Organização precisa ser fácil o bastante para virar rotina.'
    },
    'Exercício Cronometrado': {
      fala: 'Agora a turma vai produzir com restrição real de tempo. O objetivo não é fazer a foto perfeita; é provar que planejamento, checklist e decisão técnica melhoram o resultado.',
      dica: 'Divisão do exercício: 3 min plano, 7 min captura, 5 min seleção, 5 min anotação e discussão rápida.'
    },
    'Leitura Técnica do Resultado': {
      fala: 'A avaliação não é "ficou bonita". A pergunta é: que decisão técnica aparece na imagem? O que melhorou? O que atrapalhou? O que seria ajustado no segundo clique?',
      dica: 'Vocabulário esperado: foco, nitidez, ruído, tremido, enquadramento, lente limpa, direção da luz e tempo de decisão.'
    },
    'Plano de Próxima Saída': {
      fala: 'Para fechar, cada estudante registra um plano mínimo para uma saída fotográfica: objetivo, horário, equipamento, checklist e risco principal. Esse plano prepara as próximas aulas.',
      dica: 'Versão curta de fechamento: três linhas no caderno já bastam para registrar objetivo, equipamento e risco principal.'
    },
    'Encerramento': {
      fala: 'A câmera é ferramenta, mas a imagem nasce das escolhas. Quem entende o instrumento erra menos, decide melhor e consegue explicar o que fez.',
      dica: 'Gancho para Aula 06: a técnica abre caminho; a composição organiza o sentido.'
    }
  };

  global.SENAI_PEDAGOGY = {
    COMPETENCIAS: COMPETENCIAS,
    BLOCOS: BLOCOS,
    NOTES: NOTES,
    TIMELINE: [],
    SEMIOTIC: {},
    COMPARE: {},
    META: {
      uc: 'Fundamentos de Fotografia Digital e de Semiótica',
      aula: 'Aula 05 — A Câmera Digital',
      professor: 'Prof. Daniel Mayer',
      turma: 'Técnico em Multimídia · SENAI',
      duracaoMin: 210
    }
  };
})(window);
