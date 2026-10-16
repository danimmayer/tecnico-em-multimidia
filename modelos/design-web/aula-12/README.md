# Aula 12 · UX e UI

Fonte da aula: `scripts/lessons/design-web-12.mjs`. Oficina: `scripts/lessons/design-web-12-workshop/`, separada em conteúdo, estado/validação, protótipo, interface e estilos. O gerador produz um único `index.html` autônomo para funcionar em HTTPS ou como arquivo local no Chromium, sem bibliotecas, fontes externas ou chamadas de rede.

## Condução

19:00–22:10, intervalo 19:45–20:05; 170 minutos de prática e explicações. Chamada no início dos quatro blocos. Sem programação discente, instalação, conta, dados pessoais, ficha, impressão ou upload coletivo. A persona Lia, a marca e a reserva são fictícias.

1. 19:00–19:25: experimentar inicial e referência; a etapa 1 já está aberta.
2. 19:25–19:45: localizar duas dúvidas e conferir as pistas; salvar antes do lanche.
3. 20:05–20:10: retomada; 20:10–20:40: jornada guiada de cinco momentos.
4. 20:40–21:00: escolher atrito, mudança e previsão.
5. 21:00–21:40: editar a interface pronta, testar e receber o pedido de 14h esgotado.
6. 21:40–22:10: observar colega, registrar uma pista, revisar, salvar e reabrir.

Compartilhar com os estudantes somente o endereço da oficina; a apresentação de condução fica com o professor. As cinco chaves aparecem **nas notas P dos slides correspondentes**, nunca em instruções públicas da oficina. Revelar uma por vez. Concluir uma etapa não libera a seguinte; não há liberação automática por horário. É possível voltar às etapas já liberadas sem perder o trabalho. Quem conclui usa a extensão da etapa atual.

As chaves são um recurso didático em material estático, sem promessa de controle de acesso. Não armazenar avaliações, credenciais ou dados sensíveis. Abrir um projeto preserva as etapas liberadas no arquivo; não é um mecanismo de fiscalização.

A estrutura vem pronta e a própria versão começa com os problemas da inicial. Os estudantes decidem texto, informação antecipada, caminho, resumo e aparência. A correção do horário preserva a escolha. A indisponibilidade mantém uma alternativa de mesmo preço. Uma mudança na interface exige uma nova tentativa antes de registrar a criação como pronta.

## Entrega e recuperação

`aula-12.ux` guarda jornada, hipótese, decisões e tentativas. `meu-prototipo-ux.html` guarda só a interface clicável, sem jornada, respostas ou chaves. Ambos reabrem sem a oficina publicada. O rascunho no navegador é apoio, não substitui o arquivo. Um aviso orienta salvar se o armazenamento local estiver indisponível.

A contagem registra ações nos botões, incluindo voltar/cancelar; o tempo inclui pausas e leitura. Comparações são indícios de uma tarefa, não nota nem prova de usabilidade geral. As emoções da jornada precisam de justificativa oral, sem simulação de deficiência.

Sem internet, abrir `index.html` local. Se a política do navegador bloquear Web Crypto em arquivos locais, usar o servidor local da escola. Sem computador, operar em dupla no mesmo posto, alternando quem controla; as decisões são discutidas oralmente no projetor.

## Gerar e verificar

```sh
node scripts/build-design-web-12.mjs
node scripts/validate-design-web-12.mjs
python3 -m http.server 8901
node scripts/validate-design-web-12-browser.cjs
```

O teste de navegador usa Chromium instalado (`CHROMIUM_PATH` pode substituir `/usr/bin/chromium`). `WORKSHOP_URL` pode apontar para outra cópia servida.

Destino previsto: `https://oficinas-design-web.vercel.app/aula-12/`. A publicação depende do projeto Vercel existente; preservar todas as rotas anteriores. O script `scripts/prepare-design-web-deploy.mjs` prepara uma pasta com as oficinas existentes e a nova aula, sem publicar sozinho.
