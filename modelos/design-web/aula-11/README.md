# Aula 11 · Oficina guiada de interações

Oficina de aquecimento: https://oficinas-design-web.vercel.app/aula-11/
Criador de fluxos: https://oficinas-design-web.vercel.app/aula-11/criador.html
Cópias sem rede: `oficina.html` é o aquecimento; `criador.html` é a criação de fluxos. Apresentação: `aula-kit.html?uc=design-web&aula=11`.

## Retomada depois do intervalo

A revisão responde à dificuldade relatada pela turma: os seis desafios de mensagens podem acabar cedo. Eles são aquecimento, não o trabalho da noite. O projeto antigo continua salvo e não precisa ser repetido.

Antes de atualizar a página, salvar o projeto em arquivo. Até 20:30, quem ainda precisa conclui apenas uma cena pendente; quem já fez os seis prepara uma nova aba para o criador. No slide 13, abrir o Criador de fluxos: escolher um briefing (reserva de estúdio, empréstimo de equipamento ou pedido de lanche), editar as cinco telas fixas — início, escolha, revisão, concluído e ajuda — e ligar os botões para testar o caminho principal.

- 20:05–20:30: fechar somente pendências dos seis desafios e guardar o projeto antigo; não repetir nem gerar novo contador.
- 20:30–20:55: escolher briefing, criar e conectar início, escolha, revisão, concluído e ajuda; testar o caminho principal.
- 20:55–21:15: clicar em **Receber nova exigência**, usar **+ Adicionar tela** para criar a sexta tela de alternativa, conectar a opção indisponível a ela e voltar para Escolha. Testar a opção disponível e a alternativa.
- 21:15–21:20: fechar o teste do colega; se ele parou, corrigir uma rota e testar uma vez.
- 21:20–21:30: abrir diretamente o slide 16; usar **Salvar rascunho** antes de atualizar a página e, na missão **Dê cara de app**, escolher tema Studio, Arcade ou Editorial, nome e raio.
- 21:30–21:45: na missão **Formulário que funciona**, selecionar **Início**, criar um campo com rótulo e dica, marcar obrigatório, testar vazio (que bloqueia o avanço) e preenchido e mostrar `{{resposta}}` na próxima tela; outro campo só entra se ajudar o percurso.
- 21:45–22:00: na missão **Rede caiu**, na tela **Revisão**, abrir **Carregamento e falha dos botões**; no botão de confirmação, marcar **Aguardar**, manter **Vai para → Concluído** e escolher a tela **Erro** em **Destino se falhar**. No Criador, ativar **Simular falha**, confirmar e cancelar a espera; confirmar de novo e aguardar a tela **Erro**. Desligar a falha, voltar por **Tentar de novo → Revisão**, confirmar e concluir. A tela 7 é a rota Erro; a tela 8 só entra se necessária.
- 22:00–22:05: na missão **Speedrun**, usar **Recomeçar teste** (isso não apaga o projeto), resolver em até oito cliques, comparar tentativas, usar **Salvar rascunho** e exportar `meu-prototipo.html`.
- 22:05–22:10: conferir arquivos e organizar o posto.

Entregas obrigatórias: `meu-fluxo.fluxo` e `meu-prototipo.html`. Não exigir relatório: no máximo duas observações orais curtas durante o teste. O fluxo deve ter o caminho principal, uma rota alternativa após a nova exigência, formulário que reage vazio/preenchido, recuperação de falha no Criador e nenhuma tela usada sem saída. O protótipo exportado funciona offline para testar a espera e o caminho normal; a simulação de falha é feita no Criador.

Sem login, programação, impressão, instalação ou upload coletivo. As situações são fictícias. Sem rede, usar a cópia local. Sem computador, desenhar cinco caixas e setas, acrescentar uma sexta caixa de alternativa e pedir que o colega percorra as setas sem dicas.

## Manutenção

Fontes: `scripts/lessons/design-web-11.mjs`, `scripts/lessons/design-web-11-editor.mjs` , `scripts/lessons/design-web-11-flow.mjs`, `scripts/lessons/design-web-11-flow-runtime.mjs` e `scripts/lessons/design-web-11-remix.mjs`.

```sh
node scripts/build-design-web-11.mjs
node scripts/validate-course-kit.mjs
```

O gerador produz `oficina.html` para o aquecimento, `criador.html` para a criação de fluxos e as versões públicas `index.html` e `criador.html` para `/aula-11/` no projeto Vercel `oficinas-design-web`. Preservar as aulas anteriores no deploy.

## Organização da tela

Os seis desafios ficam no topo como aquecimento. A partir do slide 13, o criador abre com três briefings, cinco telas editáveis e conexões definidas pelo estudante. A nova exigência só revela o pedido: cabe ao estudante adicionar a sexta tela, conectar a rota indisponível e testar as duas saídas. No slide 16, as missões permitem definir tema, nome e raio; criar formulário e erro em linha; simular aguardar/falha/retry; e comparar um speedrun de até oito cliques. O criador aceita de cinco a oito telas: as cinco iniciais, a sexta de alternativa, a sétima de erro e uma oitava apenas se necessária. Ele salva um rascunho editável e exporta um protótipo clicável; **Recomeçar teste** reinicia somente a prévia, sem apagar o projeto.
