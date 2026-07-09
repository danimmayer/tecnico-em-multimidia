/* =======================================================================
 * SENAI · PEDAGOGY DATA · Aula 11 — Projeto Integrador: Ensaio Fotográfico em Trios
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
      "titulo": "Aplicar princípios de fotografia na produção de um ensaio em trio",
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
      "titulo": "Projeto e formação dos grupos",
      "descricao": "Chamada, requisitos, critérios e organização dos 10 trios + 1 quarteto."
    },
    {
      "id": 2,
      "label": "Bloco 2",
      "inicio": "19:30",
      "fim": "20:30",
      "titulo": "Briefing e moodboard",
      "descricao": "Lanche de 20 min no início do bloco; tema, pesquisa, referências e matriz semiótica."
    },
    {
      "id": 3,
      "label": "Bloco 3",
      "inicio": "20:30",
      "fim": "21:30",
      "titulo": "Produção fotográfica",
      "descricao": "Captura nos espaços da instituição com gestão de tempo e circulação do professor."
    },
    {
      "id": 4,
      "label": "Bloco 4",
      "inicio": "21:30",
      "fim": "22:30",
      "titulo": "Curadoria e memorial",
      "descricao": "Seleção, edição base, análise semiótica e preparação da defesa da Aula 12."
    }
  ],
  "NOTES": {
    "Capa": {
      "fala": "Boa noite. Hoje começa o projeto integrador: um ensaio fotográfico em trios. A entrega é prática, presencial e precisa mostrar técnica, intenção visual e análise semiótica.",
      "dica": "Abra como noite de produção. Confirme materiais: celular carregado, caderno, notebooks quando disponíveis, câmera, mesas digitalizadoras e ring lights conforme necessidade."
    },
    "Programação da Noite": {
      "fala": "A noite tem quatro blocos: organizar grupos e critérios, construir briefing e moodboard, produzir as fotos e fechar com curadoria, memorial e preparação da defesa.",
      "dica": "Use a programação como contrato de tempo. A prioridade é terminar a aula com imagens selecionadas e memorial iniciado, não com uma pasta cheia de fotos soltas."
    },
    "Entrega do Projeto": {
      "fala": "A entrega base é enxuta, mas exigente: cinco imagens em sequência, uma prancha de processo e memorial semiótico. Se o grupo tiver material forte, pode ampliar para seis ou sete sem perder unidade.",
      "dica": "A profundidade não está na quantidade. Cobre função na sequência, decisão técnica visível e evidência semiótica em cada imagem final."
    },
    "Contrato de Trio": {
      "fala": "Em trio, as funções são câmera, direção e luz com registro. A cada nova foto, o grupo troca quem fotografa e quem dirige para que todos participem da decisão visual.",
      "dica": "No quarteto, a quarta pessoa assume registro de processo e controle de tempo. Para trios, luz e registro ficam juntos."
    },
    "Chamada Bloco 2": {
      "fala": "Agora o projeto começa no papel. Antes de sair fotografando, cada grupo precisa definir tema, intenção, pistas visuais e como a fotografia vai produzir sentido.",
      "dica": "Mantenha este slide curto. O tempo do bloco precisa ir para briefing, pesquisa e matriz semiótica."
    },
    "Briefing Semiótico": {
      "fala": "O briefing do ensaio precisa dizer o que será fotografado, que leitura a imagem pretende provocar e que evidências visuais vão sustentar essa leitura.",
      "dica": "Circule pedindo a frase central: queremos comunicar que... Se a frase não existe, o grupo ainda não tem tema fotografável."
    },
    "Pesquisa e Moodboard": {
      "fala": "Pesquisa não é copiar imagem de referência. É entender pista visual: cor, luz, textura, distância, gesto, fundo, ritmo e tipo de corte.",
      "dica": "Incentive referências rápidas em celular ou notebook. O moodboard pode ser uma página no caderno, um slide, um Canva ou uma galeria organizada."
    },
    "Matriz de Signos": {
      "fala": "Toda foto do ensaio precisa funcionar em mais de uma camada: parecer algo, apontar para um contexto e carregar uma convenção cultural.",
      "dica": "Traduza a matriz para decisões de captura: qual objeto funciona como ícone, qual rastro funciona como índice, qual cor, gesto ou composição funciona como símbolo."
    },
    "Shot List do Ensaio": {
      "fala": "Shot list evita que o grupo fotografe por ansiedade. Antes de sair, o grupo define uma imagem de abertura, três imagens de prova e uma imagem de fechamento.",
      "dica": "Peça que cada foto da lista tenha função: situar, provar ou fechar. Se uma foto não ajuda a defender o tema, ela sai."
    },
    "Cronograma do Grupo": {
      "fala": "O cronograma precisa caber na noite: referência e lanche, tema, moodboard, shot list, captura, depois curadoria e memorial.",
      "dica": "Use os horários como checkpoints: 19:50 tema fechado, 20:20 lista pronta, 20:30 saída para captura, 21:30 volta para seleção e memorial."
    },
    "Chamada Bloco 3": {
      "fala": "Agora a câmera sai do planejamento. A produção acontece nos espaços permitidos da instituição, com cuidado, circulação segura e postura profissional.",
      "dica": "Antes de liberar, confirme que cada grupo sabe onde vai fotografar, quem está com qual função e como voltará com os arquivos."
    },
    "Set Responsável": {
      "fala": "Produzir dentro da instituição exige cuidado: circulação livre, autorização quando pessoa aparecer, equipamento estável e respeito ao ambiente.",
      "dica": "Se houver risco de deslocamento confuso, limite a captura à sala, corredor próximo ou área previamente combinada. Não incentive improvisos fora de controle."
    },
    "Captura pelos Espaços": {
      "fala": "A instituição vira repertório visual: mesa, textura, luz de janela, corredor, material de desenho, câmera, caderno, mão em ação, reflexo e sombra.",
      "dica": "Sugira temas seguros: processo de estudo, ferramentas, textura, contraste, rotina técnica, detalhe de criação, luz e organização."
    },
    "Direção de Luz e Cena": {
      "fala": "A luz precisa conversar com a leitura semiótica. Luz limpa sugere clareza, lateral sugere volume, contraluz sugere silhueta e tensão, ring light reduz sombra no rosto ou objeto.",
      "dica": "Evite transformar ring light em efeito gratuito. Pergunte sempre: essa luz melhora a mensagem do ensaio?"
    },
    "Checklist de Qualidade": {
      "fala": "Antes de voltar para a sala, cada grupo precisa checar foco, exposição, fundo, variação, consistência e arquivo salvo.",
      "dica": "Faça esta checagem ainda no espaço de captura. Corrigir ali economiza a aula 12."
    },
    "Chamada Bloco 4": {
      "fala": "No último bloco, o trabalho muda: fotografar menos, escolher melhor. Agora o ensaio vira sequência e memorial.",
      "dica": "Se algum grupo ainda não tem material suficiente, peça três imagens essenciais: abertura, detalhe e fechamento. Depois ele complementa se houver tempo."
    },
    "Contact Sheet e Seleção": {
      "fala": "A seleção precisa ser comparativa. Vendo tudo junto, o grupo percebe repetição, falhas e quais imagens conversam melhor.",
      "dica": "Use galeria em grade, Drive, Canva, Slides ou pasta no computador. Não deixe seleção por rolagem infinita no celular."
    },
    "Curadoria Final": {
      "fala": "Curadoria é montar sentido. O ensaio precisa ter começo, desenvolvimento e fechamento, mesmo sem virar história literal.",
      "dica": "Pergunte: se eu trocar a ordem, o sentido melhora ou piora? A resposta ajuda a definir sequência."
    },
    "Memorial Descritivo": {
      "fala": "O memorial é curto, técnico e objetivo. Ele explica tema, intenção, decisões de luz, composição, edição e leitura semiótica.",
      "dica": "Peça escrita simples. Sem texto publicitário e sem confissão pessoal demais. A defesa oral deve nascer desse memorial."
    },
    "Edição Consistente": {
      "fala": "A edição do ensaio precisa parecer uma família: corte, cor, contraste e acabamento devem sustentar a mesma intenção visual.",
      "dica": "Se usarem Snapseed, Lightroom, Canva ou Photopea, peça que anotem que ajuste foi feito e por quê. Isso entra no memorial."
    },
    "Preparação da Defesa": {
      "fala": "Na próxima aula, cada grupo terá pouco tempo. A defesa precisa responder: qual era a intenção, que imagens provam isso e que conceitos sustentam a leitura.",
      "dica": "Ensaiar a fala evita improviso. Um aluno abre, outro explica técnica, outro fecha com semiótica. No quarteto, alguém controla tempo ou apresenta processo."
    },
    "Plano B e Entrega": {
      "fala": "Se a tecnologia falhar, o projeto ainda precisa existir: imagens em galeria organizada, memorial no caderno e ordem definida.",
      "dica": "Peça que cada grupo salve em dois lugares: celular + Drive, ou computador + celular. Arquivo perdido não pode ser a justificativa da Aula 12."
    },
    "Encerramento": {
      "fala": "A aula de hoje termina com material pronto para defender. Na próxima aula, o foco é apresentar, ouvir feedback, fazer a recuperação e encerrar a UC.",
      "dica": "Antes de liberar, confirme que cada grupo tem ordem de imagens, memorial iniciado e quem falará o quê."
    }
  },
  "TIMELINE": [],
  "SEMIOTIC": {},
  "COMPARE": {},
  "META": {
    "uc": "Fundamentos de Fotografia Digital e de Semiótica",
    "aula": "Aula 11 — Projeto Integrador: Ensaio Fotográfico em Trios",
    "professor": "Prof. Daniel Mayer",
    "turma": "Técnico em Multimídia · SENAI",
    "duracaoMin": 210
  }
};
})(window);
