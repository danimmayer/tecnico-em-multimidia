# Aula 14 · Estúdio de briefing

A apresentação do professor fica na plataforma, em `aula-kit.html?uc=design-web&aula=14`. A oficina dos estudantes fica em <https://oficinas-design-web.vercel.app/aula-14/>. Os links da projeção abrem a parada correspondente (`?fase=1` a `?fase=4`) e, na Parada 2, a rodada (`?fase=2&rodada=1` a `3`, sendo 3 a escolha do projeto).

## Condução

Noite completa: **19:00–22:10**, intervalo 19:45–20:05, 170 minutos de atividade. São 21 slides (capa e 20 slides de atividade, incluindo o intervalo), com notas do professor e tempos por slide.

| Horário | Parada | Registro |
| --- | --- | --- |
| 19:00–19:45 | Decifrar um briefing | Partes do briefing da Pedal Leve, furos do Salão Bela Vista e três perguntas abertas |
| 20:05–20:50 | Cliente e designer | Duas entrevistas com ficha secreta, pepitas, resumo confirmado e projeto escolhido |
| 20:50–21:35 | Pesquisar antes de desenhar | Métodos, comparação de três concorrentes, painel de referências, tendências e resposta ao telefonema |
| 21:35–22:10 | Consolidar | Briefing de uma página, acessibilidade como requisito, validação da dupla vizinha e ajuste |

### Autonomia e ritmo

- **Missão:** cada parada mostra uma lista que se completa sozinha, com o próximo passo marcado. O botão “Estou travado” libera três dicas e, depois, manda perguntar à dupla do lado (“3 antes de mim”).
- **Horário:** as paradas abrem no horário do roteiro (Rodada 2 às 20:25, Escolha às 20:40, telefonema do cliente às 21:20), e a faixa de relógio leva cada dupla até a etapa da vez. Fora da janela 18:30–22:40, tudo fica aberto. Se os relógios dos computadores estiverem errados, o professor diz a palavra da parada: `escuta`, `farol` ou `acordo` (também nas notas dos slides). Para conferir um horário, use `?hora=20:14`.
- **Quem termina antes:** a missão cumprida libera um desafio extra conferido pela própria oficina. A próxima parada continua fechada.
- **Aquecimento:** oito cartões “pedido vago ou briefing?” com resposta imediata abrem a Parada 1.

Na Parada 2, a oficina sorteia dois dos quatro clientes fictícios (pizzaria, estúdio de tatuagem, petshop e escola de dança). Quem faz o cliente abre a ficha secreta, com o jeito de falar, as respostas por tema e três “pepitas” que só saem com aprofundamento. Quem entrevista registra as respostas por tema. A Parada 3 usa o cliente escolhido: três concorrentes fictícios com visão de computador e de celular, conferência da comparação sem revelar as respostas, e um telefonema que reduz o escopo. A Parada 4 preenche o briefing com as respostas da entrevista para a dupla revisar.

Clientes, negócios, concorrentes e falas são fictícios. Não há login, pesquisa obrigatória na internet ou envio de respostas.

## Entrega e uso offline

**Exportar entrega** baixa um HTML autônomo com o briefing de uma página na frente e, em anexo, a Parada 1, as entrevistas, a pesquisa e a validação, com as pendências que ainda existirem. O arquivo inclui os dados do briefing em JSON (`#briefing-data`) para as próximas aulas. O rascunho é salvo neste navegador quando o armazenamento está disponível; o arquivo exportado é a cópia para guardar.

Sem internet, baixar e extrair `kit-aula-14.zip` inteiro e abrir `index.html`. CSS e JavaScript estão na mesma pasta; não há bibliotecas, imagens ou fontes remotas.

O `guia-docente.html` (roteiro, gabaritos, fichas dos clientes, palavras das paradas, rubrica e alternativa no caderno) é só do professor: fica no repositório, não entra no kit nem na publicação.

## Fontes e verificação

`scripts/lessons/design-web-14.mjs` é a fonte do planejamento e da projeção. Os arquivos HTML, CSS e JS desta pasta são as fontes da oficina. O gerador atualiza somente a Aula 14 nos dados da plataforma e empacota o kit offline.

```sh
node scripts/build-design-web-14.mjs
node scripts/validate-design-web-14.mjs
node scripts/validate-course-kit.mjs
```

O teste `scripts/validate-design-web-14-browser.cjs` percorre as quatro paradas em Chromium, inclusive exportação, persistência, horários e largura de 320 px; `WORKSHOP_URL` e `CHROMIUM_PATH` permitem escolher a cópia servida e o navegador instalado.

Para publicar, executar `node scripts/prepare-design-web-deploy.mjs <pasta-de-saida>` e publicar essa pasta no projeto Vercel existente `oficinas-design-web`.
