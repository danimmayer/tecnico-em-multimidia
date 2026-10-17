# Aula 12 · Plantão UX

A apresentação do professor fica na plataforma, em `aula-kit.html?uc=design-web&aula=12`. A oficina dos estudantes fica em <https://oficinas-design-web.vercel.app/aula-12/>. Os links da projeção abrem a fase correspondente na oficina publicada.

## Condução

Roteiro condensado após a interrupção: **20:10–22:10**, 120 minutos, sem novo intervalo. São 19 slides (capa e 18 slides de atividade), com notas do professor e tempos por slide.

| Horário | Desafio | Registro |
| --- | --- | --- |
| 20:10–20:35 | Investigar três fluxos fictícios | Evidência e reparo de microtexto para preço, assinatura e urgência |
| 20:35–21:05 | Descobrir necessidades de Ana e Ravi | Hipótese inicial, três perguntas por pessoa, contradição, revisão e próxima pesquisa |
| 21:05–21:35 | Priorizar sob restrição | Plano A até 10 créditos; Plano B até 6, sem apagar o primeiro |
| 21:35–22:10 | Responder a um imprevisto da Virada Criativa | Aviso com fato, ação, apoio e coleta mínima; exportação conferida |

As quatro fases ficam acessíveis; conduzir uma de cada vez. Os links `?fase=1` a `?fase=4` permitem abrir diretamente o desafio. Em dupla, alternar quem opera. Quem termina pode revisar outro cenário ou aprimorar a própria justificativa. O desafio extra final é opcional e termina às 22:04, reservando seis minutos para exportar e conferir.

A aula trabalha decisões com evidência e restrições, sem repetir a criação de um fluxo de três telas ou o teste entre colegas da Aula 11. Todos os cenários, nomes, preços e falas são fictícios. Não há login, pesquisa real ou envio de respostas.

## Entrega e uso offline

**Exportar entrega** baixa um HTML autônomo com todos os registros e as pendências que ainda existirem. O rascunho é salvo neste navegador quando o armazenamento está disponível; o arquivo exportado é a cópia para guardar. Não há sincronização entre computadores nem importação do HTML para continuar a atividade.

Sem internet, baixar e extrair `kit-aula-12.zip` inteiro e abrir `index.html`. `desafio.html` é uma entrada equivalente, mantida por compatibilidade. CSS e JavaScript estão na mesma pasta; não há bibliotecas ou fontes remotas. Se o navegador bloquear o armazenamento local, ainda é possível trabalhar e exportar sem fechar a página. O `guia-docente.html` contém roteiro, rubrica e alternativa no caderno.

## Fontes e verificação

`scripts/lessons/design-web-12.mjs` é a fonte do planejamento e da projeção. Os arquivos HTML, CSS e JS desta pasta são as fontes da oficina. O gerador atualiza somente a Aula 12 nos dados da plataforma, sincroniza as duas entradas e empacota o kit offline. As outras aulas são preservadas.

```sh
node scripts/build-design-web-12.mjs
node scripts/validate-design-web-12.mjs
node scripts/validate-course-kit.mjs
```

O teste `scripts/validate-design-web-12-browser.cjs` cobre o uso da oficina em Chromium; `WORKSHOP_URL` e `CHROMIUM_PATH` permitem escolher a cópia servida e o navegador instalado.

Para preparar a publicação, executar `node scripts/prepare-design-web-deploy.mjs <pasta-de-saida>` e publicar essa pasta no projeto Vercel existente `oficinas-design-web`. A preparação inclui a raiz e as oficinas anteriores, junto com todos os arquivos da Aula 12. Ela não publica sozinha.
