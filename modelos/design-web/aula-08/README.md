# Aula 08 · roteiro rápido do professor

Aula individual de grades e sistemas visuais. O aluno descobre as colunas escondidas em telas que já conhece, monta a página da Arena Pixel (casa de games fictícia) numa grade de 12 colunas, atende ao pedido de um campeonato novo e cria um post quadrado da mesma família. São 20 slides (capa + 19). Não há programação, impressão, cadastro ou instalação.

## Preparação

1. Abra `aula-kit.html?uc=design-web&aula=08`. Use tela cheia e confira o enquadramento do projetor.
2. Abra a oficina pelo slide “Experimente a oficina”. Use “Baixar oficina para uso sem internet” e deixe uma cópia (`oficina-aula-08.html`) nos computadores antes da aula. A oficina é um arquivo único; o projeto é salvo separadamente.
3. No computador da sala, exporte e abra um PNG; salve `projeto.grade`, reabra-o e confira Página e Post quadrado. Bloqueios de download do laboratório precisam ser verificados nesse computador.
4. Use **Notas (P)** para consultar fala, minutos, respostas dos desafios e alternativas. Feche as notas antes de projetar.

## Relógio e indicador inferior

O ponto ao lado do contador compara o relógio do computador com o horário previsto para o slide atual, como na Aula 07: verde no ritmo, amarelo adiantado, vermelho atrasado, com tolerância de dois minutos. Clique nele ou focalize com Tab e Enter para ler o detalhe.

| Horário | Condução |
| --- | --- |
| 19:00 às 19:45 | Revelar as colunas em streaming, loja e rede social; coluna, espaço e margem; por que 12; primeiro uso da oficina. |
| 19:45 às 20:05 | Lanche. Projeto salvo antes da saída. |
| 20:05 às 20:30 | Montar a página na grade, apresentar componente e sistema visual, exportar `pagina-v1.png`. |
| 20:30 às 20:50 | Incluir o campeonato novo, deixar quatro cartões iguais de 3 colunas, exportar `pagina-final.png`. |
| 20:50 às 22:10 | Montar o post, criar selo com forma e texto, inserir imagem, personalizar a identidade nas duas peças e testar com o colega. Salvar e reabrir às 21:58. |

A abertura termina às **19:19**: são 19 minutos de descoberta e 26 minutos de demonstração, prática e salvamento antes do lanche. Retome os conceitos durante a prática. Às **21:58**, interrompa a edição: 9 minutos para arquivos e reabertura, seguidos de 3 minutos para a frase e o encerramento.

## Respostas dos desafios (só nas notas)

- Capa do streaming: 2 das 12 colunas. Produto da loja: 3 das 12. Post no celular: as 4 colunas.
- Quatro cartões lado a lado: 3 colunas cada (12 dividido por 4).

## Comandos da oficina

Selecione o item na página ou na lista. Arraste com o mouse: o item gruda na coluna mais próxima. As setas mudam de coluna (esquerda e direita) ou sobem e descem (Shift anda mais). **Mais estreito** e **Mais largo** mudam quantas colunas o item ocupa; cada componente tem uma largura mínima para o texto caber. **Mostrar colunas** liga e desliga as faixas cor-de-rosa, que não aparecem no PNG.

O quadro **Conferência** avisa o que falta: itens fora da grade, itens passando da margem, itens sobrepostos e, na página, cartões com larguras diferentes ou fora da mesma linha e das colunas vizinhas. Depois de incluir o campeonato novo, também exige quatro cartões de 3 colunas. Quando tudo fica em ✓, a peça está pronta para exportar.

**Incluir campeonato novo** acrescenta o cartão Xadrez rápido na página. A aba **Post quadrado** usa uma grade de 6 colunas com os mesmos componentes. Em **Nome da imagem**, escolha o nome antes de clicar **Exportar PNG**. **Salvar projeto** baixa `projeto.grade` com a página e o post; **Abrir projeto** recupera os dois. Arquivo inválido é recusado sem apagar o trabalho aberto.

## Condução e contingências

- Todos permanecem no posto. A colaboração acontece com o colega do lado, que dá palpite do próprio lugar nos testes de leitura e de família.
- A primeira versão prioriza posição e largura; depois, personalizar cores e fontes nas duas peças.
- Os desafios dos slides 19 a 22 acrescentam 40 minutos de prática e geram `pagina-alternativa.png` e `post-alternativa.png`.
- Se houver atraso, reduza a conversa de “Peças que se repetem”. Preserve os quatro cartões iguais, o post e a parada obrigatória às 21:58 para salvar e reabrir.
- Sem internet, use a oficina baixada. Sem computador, o aluno desenha no caderno uma faixa de 12 colunas e monta a página com retângulos; depois, um quadrado de 6 colunas para o post. Os critérios são os mesmos.

Entrega: pasta `Aula-08` com `pagina-v1.png`, `pagina-final.png`, `post-final.png` e `projeto.grade`; no caderno, a frase “Usei a grade para ___ e isso ajudou ___.”

## Validação da implementação

`node scripts/build-design-web-08.mjs` regenera somente esta aula (dados, slides, oficina e ilustrações). `node scripts/validate-course-kit.mjs` confere a paridade das fontes, os 170 minutos (45 + 45 + 40 + 40), o slide de intervalo, as respostas só nas notas, a ausência de código, impressão e travessão nos slides, a oficina sem dependências externas e os exemplos aprovados pela própria conferência da oficina.

## Personalização

Adicione textos, formas, ícones e imagens PNG, JPG ou WebP. Em **Personalizar item**, escolha fonte, cores e alinhamento à esquerda, centralizado ou à direita. Elementos decorativos se movem livremente, mesmo com o encaixe ligado, e ficam fora da conferência. Setas movem 1 px; Shift + seta move 10 px. Salve o projeto para preservar imagens e estilos.
