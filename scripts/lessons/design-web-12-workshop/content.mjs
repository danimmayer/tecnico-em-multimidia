// Textos e critérios por etapa. As chaves de liberação ficam só nas notas de condução.
export const phases = [
  {title:'Sentir a diferença', tag:'Observar', intro:'Lia quer reservar um estúdio por 30 minutos, sábado às 14h. Ela precisa saber o preço antes de confirmar.', task:'Faça a reserva nas duas versões. Observe a tarefa inteira, além da aparência.', extra:'Repita escolhendo 15h. Compare o que cada versão informa antes da confirmação.'},
  {title:'Encontrar o atrito', tag:'Investigar', intro:'Um problema de experiência precisa de uma pista observável.', task:'Escolha dois momentos em que Lia pode hesitar. Relacione a tela, a dúvida e o efeito.', extra:'Teste sua hipótese na versão inicial. O problema aparece mesmo ou era só uma preferência sua?'},
  {title:'Montar a jornada', tag:'Mapear', intro:'A jornada mostra o que a pessoa faz, pensa e sente para chegar ao resultado.', task:'Complete cinco momentos da reserva. Use a tarefa de Lia para escolher as respostas.', extra:'Mude uma emoção e explique oralmente ao colega qual informação da tela sustenta sua escolha.'},
  {title:'Escolher uma mudança', tag:'Decidir', intro:'Melhorar tudo de uma vez esconde o que fez diferença.', task:'Escolha o maior atrito e uma mudança que possa ser testada. Faça uma previsão.', extra:'Compare uma segunda hipótese oralmente. Qual delas ajuda Lia a decidir com menos dúvida?'},
  {title:'Redesenhar e experimentar', tag:'Criar', intro:'A estrutura está pronta. Você decide as palavras, as informações e o caminho.', task:'Edite uma decisão por vez e teste na prévia. Preserve uma forma de voltar e corrigir.', extra:'Cliente: o horário de 14h esgotou. Ative o novo pedido, ofereça 15h e teste os dois horários.'},
  {title:'Testar e revisar', tag:'Validar', intro:'O colega tenta a tarefa sem ouvir instruções de quem criou a tela.', task:'Observe uma tentativa, registre o que aconteceu e ajuste uma decisão. Depois salve os dois arquivos.', extra:'Refaça o teste com outro horário e com Tab e Enter. Menos cliques só ajuda se a pessoa continua entendendo a reserva.'}
];
export const journey = [
  {label:'Encontrar',action:['Abrir a página do estúdio','Confirmar o pagamento'],doubt:['É este o serviço que procuro?','A reserva já terminou?']},
  {label:'Comparar',action:['Conferir duração e preço','Fechar o navegador'],doubt:['Quanto custa meia hora?','Qual é a senha da minha conta?']},
  {label:'Escolher',action:['Selecionar sábado e horário','Enviar uma foto pessoal'],doubt:['14h ainda está disponível?','Qual filtro combina com a foto?']},
  {label:'Revisar',action:['Conferir horário e valor','Escolher a fonte do site'],doubt:['Posso corrigir antes de confirmar?','O logotipo é bonito?']},
  {label:'Concluir',action:['Ler a confirmação','Refazer toda a reserva'],doubt:['Deu certo? Qual horário ficou?','Onde escolho outra cor?']}
];
export const frictions = [
  ['action','Botão “Continuar” sem contexto','Não sei o que vou fazer','Posso abrir o caminho errado'],
  ['price','Preço só no último passo','Cabe no meu orçamento?','Posso abandonar depois de preencher'],
  ['route','Uma tela só para continuar','Por que preciso passar por aqui?','Faço uma ação sem decidir nada'],
  ['summary','Revisão sem horário e valor','Estou confirmando o quê?','Posso confirmar uma escolha errada']
];
export const defaultDesign = {name:'Estúdio Aurora',cta:'Reservar estúdio',price:true,direct:true,summary:true,theme:'violet',soldOut:false};
