# Aula 09 · roteiro rápido do professor

Aula individual de design responsivo. O aluno parte da página da Arena Pixel montada na aula 08 e monta mais duas telas, tablet (8 colunas) e celular (4 colunas), com os componentes de uma biblioteca lateral. O apoio diminui aos poucos: o tablet tem um rascunho do cliente em blocos; o celular tem só regras. São 20 slides (capa + 19). Não há programação, impressão, cadastro ou instalação.

## Preparação

1. Abra `aula-kit.html?uc=design-web&aula=09` em tela cheia.
2. Abra a oficina pelo slide “Abra a oficina responsiva”. Use “Baixar oficina” e deixe uma cópia (`oficina-aula-09.html`) nos computadores antes da aula.
3. No computador da sala, use Abrir projeto com um `projeto.grade` da aula 08, exporte um PNG, salve `projeto-responsivo.grade` e reabra-o.
4. Use **Notas (P)** para consultar fala, minutos, respostas e alternativas.

| Horário | Condução |
| --- | --- |
| 19:00 às 19:45 | Três telas comparadas; grade de 12, 8 e 4 colunas; só encolher não funciona; jogo da mala pequena; abrir a oficina com o projeto da aula 08. |
| 19:45 às 20:05 | Lanche. Projeto salvo antes da saída. |
| 20:05 às 21:00 | Tablet: cabeçalho e destaque nas 8 colunas, cartões dois a dois, botão na grade. Exportar `tablet.png`. |
| 21:00 às 21:40 | Celular: menu curto, destaque e botão antes do fim da primeira tela, campeonatos empilhados. Exportar `celular.png`. |
| 21:40 às 22:10 | Comparar as três telas, teste de cinco segundos com o colega, salvar e reabrir às 21:58, frase no caderno. |

## Respostas (só nas notas)

- Colunas: 12 no computador, 8 no tablet e 4 no celular. No tablet, cada cartão ocupa 4 de 8 colunas, dois por linha.
- Mala pequena: cabeçalho, destaque e botão. Os campeonatos vêm logo depois, sem sumir.

## A oficina responsiva

É a oficina de grade da aula 08 com três abas. Todos os recursos de edição continuam: carregar imagens, adicionar texto, forma e ícone, personalizar cores, fontes e cantos, camadas e exportação em PNG.

- **Abrir projeto** aceita o `projeto.grade` da aula 08: a página do aluno vira a tela do computador e abastece a biblioteca com as cores e os textos dele.
- **Biblioteca**: no tablet e no celular a tela começa vazia. O aluno arrasta cada componente para a tela ou clica nele, e a peça cai no primeiro espaço livre da grade. Peças usadas ficam marcadas; retirar uma peça da tela devolve à biblioteca.
- **Referência**: no tablet, rascunho do cliente em blocos cinza (ordem e agrupamento, sem medidas). No celular, só as regras. A solução completa aparece apenas nos slides, depois da produção.
- No celular, a linha tracejada marca o **fim da primeira tela**.
- **Esvaziar esta tela** devolve todas as peças à biblioteca; **Comparar as três telas** mostra as três lado a lado.
- A **Conferência** exige grade, margem, nada sobreposto, cartões iguais, todos os componentes da biblioteca, cabeçalho no topo e rodapé no fim. No tablet, botão depois dos campeonatos; no celular, destaque e botão na primeira tela e menu curto.

A oficina da aula 08 e o site publicado dela não mudam.

Entrega: pasta `Aula-09` com `tablet.png`, `celular.png` e `projeto-responsivo.grade`; no caderno, a frase “No celular, coloquei ___ primeiro porque ___.”

## Validação da implementação

`node scripts/build-design-web-09.mjs` regenera esta aula (dados, slides, oficina e ilustrações). `node scripts/validate-course-kit.mjs` confere dados, 170 minutos (45 + 55 + 40 + 30), slides sem código e sem impressão, a oficina sem dependências externas, a abertura de projetos da aula 08 e se cada regra da conferência acusa o erro certo.
