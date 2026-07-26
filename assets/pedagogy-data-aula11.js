/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 11 — Projeto Integrador: Ensaio Fotográfico em Equipes
 * UC: Fundamentos de Fotografia Digital e de Semiótica
 * ======================================================================= */
(function (global) {
  'use strict';

  global.SENAI_PEDAGOGY = {
  "COMPETENCIAS": {
    "CK-PROJETO": {
      "tipo": "conhecimento",
      "titulo": "Câmera fotográfica digital: linguagem fotográfica, produção de imagens e intervenção gráfica",
      "curto": "Projeto fotográfico"
    },
    "CK-APLIC": {
      "tipo": "conhecimento",
      "titulo": "Aplicações gráficas: fotografia, cinema, publicidade e design gráfico",
      "curto": "Aplicações"
    },
    "CK-SEMIOTICA": {
      "tipo": "conhecimento",
      "titulo": "Semiótica: signo aplicado à análise e à construção de imagens",
      "curto": "Semiótica aplicada"
    },
    "CT-FOTO": {
      "tipo": "tecnica",
      "titulo": "Aplicar princípios de fotografia na produção de um ensaio em equipe",
      "curto": "Produção fotográfica"
    },
    "CT-ANALISE": {
      "tipo": "tecnica",
      "titulo": "Aplicar fundamentos de análise e construção da imagem no memorial descritivo",
      "curto": "Análise de imagem"
    },
    "CT-TEXTO": {
      "tipo": "tecnica",
      "titulo": "Aplicar princípios e normas da linguagem oral e escrita na elaboração de texto técnico e defesa oral",
      "curto": "Comunicação técnica"
    },
    "CS-TEMPO": {
      "tipo": "socioemocional",
      "titulo": "Aplicar fundamentos de gestão do tempo para controlar atividades sob sua responsabilidade",
      "curto": "Gestão do tempo"
    },
    "CS-PROF": {
      "tipo": "socioemocional",
      "titulo": "Demonstrar profissionalismo, disciplina, cooperação, iniciativa e criatividade",
      "curto": "Postura profissional"
    }
  },
  "BLOCOS": [
    {
      "id": 1,
      "label": "Bloco 1",
      "inicio": "19:00",
      "fim": "19:30",
      "titulo": "Projeto e formação das equipes",
      "descricao": "Chamada, requisitos, critérios e organização de até 7 equipes para aproximadamente 30 alunos."
    },
    {
      "id": 2,
      "label": "Bloco 2",
      "inicio": "19:30",
      "fim": "20:30",
      "titulo": "Pré-produção e liberação",
      "descricao": "Lanche de 20 min no início; missão, briefing, referências, shot list e cartão de liberação."
    },
    {
      "id": 3,
      "label": "Bloco 3",
      "inicio": "20:30",
      "fim": "21:30",
      "titulo": "Captura e avaliação",
      "descricao": "Sprint de captura até 20:50, check-in, avaliação conduzida por outra profissional das 21:00 às 21:20 e correção curta."
    },
    {
      "id": 4,
      "label": "Bloco 4",
      "inicio": "21:30",
      "fim": "22:30",
      "titulo": "Curadoria, memorial e defesa",
      "descricao": "Seleção, edição base, memorial, ensaio da apresentação e backup para a Aula 12."
    }
  ],
  "NOTES": {
    "Capa": {
      "fala": "Hoje o conteúdo vira projeto. Cada equipe vai sair com uma missão visual, produzir um ensaio de cinco imagens e voltar com decisões que consiga explicar.",
      "dica": "Abra como uma noite de produção. Confirme celulares carregados, cadernos e quais notebooks, mesas digitalizadoras, câmera e ring lights poderão ser usados."
    },
    "Programação da Noite": {
      "fala": "A avaliação das nove divide a produção. Por isso a captura acontece em sprint: saída às oito e meia, alarme às oito e quarenta e cinco e todos de volta às oito e cinquenta.",
      "dica": "Mostre este cronograma antes de formar as equipes. O retorno das 20:50 é o compromisso central da noite."
    },
    "Entrega do Projeto": {
      "fala": "A entrega tem cinco imagens em ordem, uma prova de processo, memorial curto e fala dividida. É pouco volume, mas cada parte precisa sustentar a defesa.",
      "dica": "Mantenha cinco como número final. A profundidade vem da função de cada imagem, das variações capturadas e do critério de seleção."
    },
    "Contrato de Equipe": {
      "fala": "As funções-base são câmera, direção, luz com set e produção com tempo. Com cinco ou mais integrantes, registro de processo e backup viram uma função separada.",
      "dica": "Forme até 7 equipes conforme a quantidade real de câmeras. No meio do sprint, câmera e direção trocam; os demais mantêm continuidade e segurança do set."
    },
    "Chamada Bloco 2": {
      "fala": "O lanche abre o bloco. Às sete e cinquenta, cada equipe escolhe uma missão e transforma a ideia em briefing, referências e lista de cinco fotos.",
      "dica": "Mantenha a chamada curta. Marque 19:50 como início real da pré-produção e 20:20 como início da liberação das equipes prontas."
    },
    "Missões de Ensaio": {
      "fala": "As missões evitam o tema genérico. Processo acompanha transformação; luz compara efeitos de sentido; rastros conta presença sem depender de retrato direto.",
      "dica": "Dê três minutos para escolher. Tema livre é aceito se tiver pergunta visual, zona definida e cinco fotos possíveis no tempo."
    },
    "Briefing Semiótico": {
      "fala": "O briefing responde quatro coisas: qual pergunta guia o ensaio, o que queremos fazer perceber, quais evidências vão provar e quais são os limites de produção.",
      "dica": "Use oito minutos. Se a equipe responder com conceitos abstratos, peça objetos, gestos, rastros, luzes ou enquadramentos observáveis."
    },
    "Pesquisa e Moodboard": {
      "fala": "Pesquisa não é copiar imagem de referência. É entender pista visual: cor, luz, textura, distância, gesto, fundo, ritmo e tipo de corte.",
      "dica": "Incentive referências rápidas em celular ou notebook. O moodboard pode ser uma página no caderno, um slide, um Canva ou uma galeria organizada."
    },
    "Shot List Semiótico": {
      "fala": "A lista já distribui a semiótica na sequência: uma imagem abre, uma mostra por semelhança, uma revela rastro, uma usa convenção e uma fecha a leitura.",
      "dica": "Cada item recebe três tentativas com mudança real. Isso produz cerca de quinze arquivos e dá margem para escolher cinco sem fotografar demais."
    },
    "Cartão de Liberação": {
      "fala": "Antes de sair, a equipe registra zona, pergunta, cinco fotos, câmera identificada e aparelho que receberá os arquivos. Também configura um alarme para oito e quarenta e cinco.",
      "dica": "Peça que fotografem o cartão no celular e mostrem para liberação. Anote no quadro equipe, câmera e zona; isso basta para localizar e conferir até sete equipes."
    },
    "Chamada Bloco 3": {
      "fala": "Começa o sprint. São vinte minutos de captura, com alarme às oito e quarenta e cinco e retorno de todos às oito e cinquenta.",
      "dica": "Deixe este slide projetado durante a saída. Só libere quem mostrou o cartão."
    },
    "Zonas de Produção": {
      "fala": "A base em sala usa os materiais disponíveis; o perímetro usa linhas, sombras e rastros próximos. Campo ampliado só existe com autorização e retorno viável.",
      "dica": "Distribua as equipes entre base e perímetro conforme espaço e equipamento. Evite mandar todos para o mesmo corredor ou ponto de luz."
    },
    "Set Responsável": {
      "fala": "Produzir dentro da instituição exige cuidado: circulação livre, autorização quando pessoa aparecer, equipamento estável e respeito ao ambiente.",
      "dica": "Se houver risco de deslocamento confuso, limite a captura à sala, corredor próximo ou área previamente combinada. Não incentive improvisos fora de controle."
    },
    "Sprint de Captura": {
      "fala": "O sprint tem cinco momentos: montar, produzir variações, comparar a grade, corrigir a lacuna e voltar. A comparação acontece ainda no set.",
      "dica": "Circule por zona e faça uma pergunta por equipe: qual função da sequência vocês estão fotografando agora?"
    },
    "Check-in 20:50": {
      "fala": "Às oito e cinquenta a equipe precisa estar completa, com câmera devolvida e oito candidatas visíveis. Isso comprova que o projeto pode seguir depois da avaliação.",
      "dica": "Faça conferência rápida pela tela, não por conversa longa: equipe completa, câmera devolvida, oito candidatas, cinco funções cobertas e no máximo uma lacuna."
    },
    "Avaliação 21:00": {
      "fala": "Agora o projeto pausa. A avaliação será conduzida pela profissional responsável e dura em torno de vinte minutos.",
      "dica": "Mantenha este slide na tela até a profissional assumir. Siga as orientações dela quanto a celulares, materiais e organização da sala."
    },
    "Retomada 21:20": {
      "fala": "Na volta, a equipe escolhe uma rota. Quem cobriu as cinco funções começa a seleção; quem tem uma lacuna faz uma única correção próxima e volta até nove e meia.",
      "dica": "Não autorize novo tema nem nova saída longa. Se a avaliação avançar além de 21:20, cancele a rota âmbar e encaminhe todos diretamente para a seleção."
    },
    "Chamada Bloco 4": {
      "fala": "Às nove e meia termina a captura. O trabalho agora é comparar, selecionar, editar, escrever e ensaiar a apresentação.",
      "dica": "A partir daqui ninguém sai de novo. Use o tempo restante para fechar produto e backup."
    },
    "Contact Sheet e Seleção": {
      "fala": "A seleção precisa ser comparativa. Vendo tudo junto, a equipe percebe repetição, falhas e quais imagens conversam melhor.",
      "dica": "Use galeria em grade, Drive, Canva, Slides ou pasta no computador. Não deixe seleção por rolagem infinita no celular."
    },
    "Curadoria Final": {
      "fala": "A curadoria acontece em três passes: corte técnico, prova semiótica e ordem. Uma boa foto isolada pode sair se repetir a função de outra.",
      "dica": "Use o teste de retirar uma imagem. Se a sequência não perde informação nem ritmo, a foto está repetindo função."
    },
    "Memorial Descritivo": {
      "fala": "O memorial registra pergunta, intenção, técnica, signos, curadoria e uma mudança de processo. São tópicos curtos que alimentam a defesa.",
      "dica": "Limite cada tópico a duas ou três frases. Peça evidência concreta: onde o signo aparece, que luz foi usada e por que a ordem funciona."
    },
    "Edição Consistente": {
      "fala": "A edição do ensaio precisa parecer uma família: corte, cor, contraste e acabamento devem sustentar a mesma intenção visual.",
      "dica": "Se usarem Snapseed, Lightroom, Canva ou Photopea, peça que anotem que ajuste foi feito e por quê. Isso entra no memorial."
    },
    "Preparação da Defesa": {
      "fala": "Na próxima aula, cada equipe terá pouco tempo. A defesa precisa responder: qual era a intenção, que imagens provam isso e que conceitos sustentam a leitura.",
      "dica": "Divida a fala conforme a equipe: abertura e intenção, sequência, técnica, semiótica e processo. Se houver quatro integrantes, técnica e processo podem ficar juntos."
    },
    "Plano B e Entrega": {
      "fala": "O check-out exige arquivos um a cinco, prova de processo, memorial, dois backups e divisão da fala. Outra pessoa precisa conseguir abrir o projeto.",
      "dica": "Faça o check-out a partir das 22:20. Confira uma equipe por vez com a mesma lista de seis itens."
    },
    "Encerramento": {
      "fala": "A missão termina com cinco imagens e uma intenção comprovável. Na próxima aula, a equipe apresenta processo, técnica, sequência e leitura semiótica.",
      "dica": "Antes de liberar, confirme o check-out. Não abra nova rodada de revisão coletiva neste momento."
    }
  },
  "TIMELINE": [],
  "SEMIOTIC": {},
  "COMPARE": {},
  "META": {
    "uc": "Fundamentos de Fotografia Digital e de Semiótica",
    "aula": "Aula 11 — Projeto Integrador: Ensaio Fotográfico em Equipes",
    "professor": "Prof. Daniel Mayer",
    "turma": "Técnico em Multimídia · SENAI",
    "duracaoMin": 210
  }
};
})(window);
