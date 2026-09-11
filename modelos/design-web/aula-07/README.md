# Aula 07 — roteiro rápido do professor

Aula individual de espaço, proximidade e alinhamento. O aluno organiza uma página fictícia de serviços industriais e atende a uma alteração do cliente. São 18 slides, com demonstração, prática, comparação e revisão. Não há programação, impressão, cadastro ou instalação.

## Preparação

1. Abra `aula-kit.html?uc=design-web&aula=07`. Use tela cheia e confira o enquadramento do projetor em 5:4.
2. Abra o editor pelo slide “Experimente uma mudança”. Use “Baixar editor para uso sem internet” e deixe uma cópia disponível nos computadores antes da aula. O editor é um arquivo único; o projeto é salvo separadamente.
3. Confira a pasta Downloads, exporte um PNG, salve e reabra um projeto no computador da sala. Bloqueios de download do laboratório precisam ser verificados nesse computador.
4. Use **Notas (P)** para consultar fala, minutos, pontos de observação e alternativas. Feche as notas antes de projetar as orientações aos alunos.

## Relógio e indicador inferior

O ponto ao lado do contador de slides compara o relógio do computador com o horário previsto **para o slide atual**. Passe o mouse, clique ou focalize com Tab e pressione Enter para ler o detalhe.

- Verde: dentro da janela prevista; antes da aula, informa início às 19:00.
- Amarelo: etapa adiantada, com a diferença em minutos.
- Vermelho: etapa atrasada, com a diferença em minutos.
- Há tolerância de dois minutos nas transições. O intervalo tem sua própria janela; às 22:10, o último slide sinaliza encerramento. Em outro slide, pede finalização.

O indicador se atualiza ao navegar e a cada segundo. Ele não pausa nem desloca o cronograma. Confira o relógio e o fuso do computador da sala.

| Horário | Condução |
| --- | --- |
| 19:00–19:45 | Apresentar o pedido, comparar exemplos, demonstrar e experimentar o editor. |
| 19:45–20:05 | Lanche. Projeto salvo antes da saída. |
| 20:05–20:50 | Agrupar, alinhar, conferir leitura e exportar versão 1. |
| 20:50–21:30 | Incluir sábado, reorganizar e testar o atendimento. |
| 21:30–22:10 | Revisar, finalizar, salvar, reabrir e justificar uma decisão. |

## Comandos do editor

Selecione o elemento na página ou na lista. Arraste ou use as setas (Shift + seta move dez unidades). Os campos horizontal e vertical ajudam a repetir um eixo: digite o valor e saia do campo com Tab. “Desfazer” recupera a alteração anterior. “Mostrar margens” exibe guias que não aparecem no PNG.

Em **Nome da imagem**, escolha `layout-inicial.png`, `layout-v1.png` ou `layout-final.png` antes de clicar **Exportar PNG**. **Salvar projeto** baixa `projeto.layout`; **Abrir projeto** recupera suas posições. O navegador pode acrescentar números a downloads repetidos: guarde a cópia mais recente. PNG é imagem; não substitui o projeto editável.

## Condução e contingências

- Todos permanecem no posto. Dúvidas com mão levantada; demonstrações com atenção à projeção. Não há rodízio de equipamentos ou apresentação em pé.
- Quem termina prepara outra organização, compara com os mesmos critérios e escolhe a mais legível.
- Se houver atraso, reduza a comparação opcional. Preserve conteúdo completo, sábado junto ao atendimento, margens, salvamento e teste de abertura.
- Sem internet, use o editor previamente baixado. Sem computador ou com bloqueio persistente, projete os exemplos: o aluno registra no caderno duas composições com os mesmos textos, inclui sábado na segunda e justifica uma alteração. Os critérios de leitura permanecem os mesmos.
- Se o download falhar, confira Downloads e tente novamente. Persistindo, registre captura de tela e justificativa; não considere o projeto editável entregue sem verificar o arquivo.

Entrega: pasta `Aula-07` com três PNGs e o projeto; no caderno, uma frase explicando uma decisão. Confira no posto conforme o procedimento habitual da turma. Câmeras e ring lights não são necessários nesta aula.

## Validação da implementação

`node scripts/build-design-web-07.mjs` regenera somente esta aula. `node scripts/validate-course-kit.mjs` verifica coerência das fontes, 170 minutos de atividade, materiais e estados do indicador. A revisão no navegador incluiu os 18 slides em 5:4, ausência de transbordamento e erros de console, setas, posição digitada, desfazer, inclusão de sábado, abertura de projeto e rejeição de arquivo inválido sem perder a composição. Um PNG baixado foi conferido em 960 × 640.

O arquivo independente baixado passou pela conferência de sintaxe e ausência de dependências externas. A ferramenta de navegador bloqueou a abertura de endereço `file://`, portanto essa abertura por duplo clique e as políticas específicas do Windows do laboratório não foram verificadas nesta sessão. A alternativa no caderno permite continuar se o ambiente impedir o uso digital.
