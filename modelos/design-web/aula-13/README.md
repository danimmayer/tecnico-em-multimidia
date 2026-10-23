# Aula 13 · Rota acessível

A apresentação do professor fica na plataforma, em `aula-kit.html?uc=design-web&aula=13`. A oficina dos estudantes fica em <https://oficinas-design-web.vercel.app/aula-13/>. Os links da projeção abrem a parada correspondente (`?fase=1` a `?fase=4`) e, na Parada 2, a estação (`?fase=2&estacao=1` a `4`).

## Condução

Noite completa: **19:00–22:10**, intervalo 19:45–20:05, 170 minutos de atividade. São 22 slides (capa e 21 slides de atividade, incluindo o intervalo), com notas do professor e tempos por slide.

| Horário | Parada | Registro |
| --- | --- | --- |
| 19:00–19:45 | Auditar a página da Virada Criativa | Cinco barreiras com critério, medição e pessoa afetada |
| 20:05–20:50 | Quatro estações de 10 min | Contraste, zoom 200%, só teclado e texto alternativo |
| 20:50–21:35 | Protótipo para mais pessoas | Três ou mais correções justificadas, plano de 1 MB, antes e depois |
| 21:35–22:10 | Teste cruzado e pacto | Quatro tarefas sem dicas, um ajuste e três compromissos |

### Autonomia e ritmo

- **Missão:** cada parada mostra uma lista que se completa sozinha, com o próximo passo marcado. O botão “Estou travado” libera três dicas e, depois, manda perguntar à dupla do lado (“3 antes de mim”).
- **Horário:** as paradas e estações abrem no horário do roteiro, e a faixa de relógio leva cada dupla até a etapa da vez. Fora da janela 18:30–22:40, tudo fica aberto. Se os relógios dos computadores estiverem errados, o professor diz a palavra da parada: `rampa`, `legenda` ou `pacto` (também nas notas dos slides). Para conferir um horário, use `?hora=20:14`.
- **Quem termina antes:** a missão cumprida libera um desafio extra conferido pela própria oficina (caça aos nove critérios, um desafio por estação, página sem barreiras e até 0,6 MB, teste perfeito). A próxima parada continua fechada.
- **Aquecimento:** oito cartões “barreira ou não?” com resposta imediata abrem a Parada 1.

A página de demonstração tem barreiras intencionais e vive num Shadow DOM, com estilos e foco isolados da oficina. As medições são feitas no próprio DOM: razão de contraste pela fórmula de luminância das WCAG, tamanho de letra e de alvo, foco ao receber Tab, texto alternativo, rótulos, ordem de leitura e mídia. A “leitura linear” é uma aproximação didática do que um leitor de tela anuncia. Nenhuma atividade simula deficiência.

Na Parada 3, cada correção altera a versão **Depois** de verdade (botões reais, rótulos, ordem do DOM, legendas, textos alternativos) e só conta com justificativa. O choque de conexão lenta exige caber em 1 MB sem perder informação: retirar o vídeo exige transcrição; retirar o mapa exige rota em texto.

Todos os cenários, nomes, endereços e falas são fictícios e retomam a Virada Criativa e os dossiês de Ana e Ravi da Aula 12. Não há login, pesquisa real ou envio de respostas.

## Entrega e uso offline

**Exportar entrega** baixa um HTML autônomo com auditoria, estações, correções, plano de dados, as páginas Antes e Depois incorporadas, teste cruzado e pacto, com as pendências que ainda existirem. O rascunho é salvo neste navegador quando o armazenamento está disponível; o arquivo exportado é a cópia para guardar.

Sem internet, baixar e extrair `kit-aula-13.zip` inteiro e abrir `index.html`. CSS, JavaScript e imagens (SVG embutido) estão na mesma pasta; não há bibliotecas ou fontes remotas.

O `guia-docente.html` (roteiro, barreiras plantadas, palavras das paradas, rubrica e alternativa no caderno) é só do professor: fica no repositório, não entra no kit nem na publicação. Abrir pelo servidor local, em `http://localhost:8901/modelos/design-web/aula-13/guia-docente.html`.

## Fontes e verificação

`scripts/lessons/design-web-13.mjs` é a fonte do planejamento e da projeção. Os arquivos HTML, CSS e JS desta pasta são as fontes da oficina. O gerador atualiza somente a Aula 13 nos dados da plataforma e empacota o kit offline.

```sh
node scripts/build-design-web-13.mjs
node scripts/validate-design-web-13.mjs
node scripts/validate-course-kit.mjs
```

O teste `scripts/validate-design-web-13-browser.cjs` percorre as quatro paradas em Chromium, inclusive exportação, persistência, uso offline e largura de 320 px; `WORKSHOP_URL` e `CHROMIUM_PATH` permitem escolher a cópia servida e o navegador instalado.

Para publicar, executar `node scripts/prepare-design-web-deploy.mjs <pasta-de-saida>` e publicar essa pasta no projeto Vercel existente `oficinas-design-web`. A preparação inclui a raiz e as oficinas anteriores. Ela não publica sozinha.
