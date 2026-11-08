# Aula 15 · Onde eu encontro isso?

Slides: `aula-kit.html?uc=design-web&aula=15`.
Oficina: https://oficinas-design-web.vercel.app/aula-15/
Cópias locais: `index.html` (oficina) e `slides.html` (apresentação),
autossuficientes, sem dependências ou conexão.

19:00–22:10, com intervalo 19:45–20:05. O Café Aurora prepara agrupamento e
rotulagem; o núcleo autoral é o Festival Vira-Luz. Cada dupla cria duas
primeiras telas a partir do mesmo conteúdo, mudando prioridades para quem
planeja sair e para quem já está chegando. Escreve título e botão, escolhe
três destaques e testa o destino da ação. Um recado posterior informa oficina
lotada e fechamento da entrada principal: a dupla cria o aviso e revê a promessa.
Os colegas testam duas tarefas antes do recado e uma após ele, no mesmo posto.
Estação Girassol, Vértice Skate e Cine Órbita diversificam as referências.
Todos os negócios, dados e valores são fictícios.

Os tempos são estimativas de condução, sem duração mínima imposta ao aluno.
Quem conclui uma etapa pode avançar ao projeto autoral sem aguardar o slide.
Os blocos alternam comparar, organizar, criar, reagir a uma mudança, observar
outra pessoa e revisar. Não há uma rodada longa de buscas repetidas para
preencher o horário. A duração e o envolvimento precisam ser observados em
uma aplicação real com a turma; testes funcionais não comprovam esses pontos.

O caso novo retoma o processo da aula 14 com briefing incluído; nenhum arquivo
anterior é necessário. Não exige papel, conta, pesquisa externa, captura,
relatório, exportação ou transferência. Outra dupla usa o mesmo computador.
Grupos, mapa, teste de árvore, duas primeiras telas, aviso, respostas observadas
e decisão de revisão ficam na oficina. O backup opcional inclui os dois projetos.

O rascunho é salvo no localStorage deste navegador e origem. Não sincroniza
aparelhos e não envia ao professor. Em postos compartilhados, conferir o
rascunho antes de editar. Se o armazenamento falhar, o aviso indica manter a
aba e baixar uma cópia opcional. Reabrir uma cópia ou reiniciar pede confirmação.

O mapa usa uma página e três seções, sem confundir seção com página. O teste
de árvore verifica organização e nomes, sem simular a aparência ou a quantidade
de telas finais. Usa os grupos reais da dupla. Cada tentativa registra tarefa,
caminho, cliques, autor/visitante, resultado e versão. Alterar grupos, nomes ou
ordem deixa testes anteriores no histórico e exige testar a versão atual.
São cinco tarefas: preço, horário habitual, local, retirada e feriado. O novo
recado acrescenta feriado e formas de pagamento. Cliques ajudam a identificar
voltas, sem serem uma norma ou condição automática de aprovação. A primeira
visita é a referência automática; a revisão pode ajustar ou manter a solução
com justificativa, sem exigir que as notas sejam escritas antes da mudança.
A conferência automática não substitui avaliar a coerência dos nomes e grupos.

A continuação **Estúdio Livre** abre diretamente em `#free-studio`, sem exigir
refazer Café Aurora ou Festival Vira-Luz. Uma dupla assume o cliente e a outra
produz um site autoral de três páginas: briefing, textos, menus, botões e
destinos clicáveis. A visita registra o caminho; um novo recado preserva a
versão anterior para comparação e revisão. Os três projetos compartilham o
rascunho e o backup opcional. Rascunhos anteriores recebem o estúdio vazio,
sem perder os conteúdos existentes. A conferência geral só cobra essa extensão
quando ela foi iniciada.

Regenerar: `node scripts/build-design-web-15.mjs`.
Validar: `node scripts/validate-design-web-15.mjs` e
`node scripts/validate-design-web-15-browser.cjs` com `PLAYWRIGHT_MODULE`
apontando para uma instalação existente, se necessário.
O teste do estúdio é `node scripts/validate-design-web-15-studio-browser.cjs`;
ele confere acesso direto, migração, três páginas, navegação, trilha, revisão,
persistência e layout móvel.

Fontes em `scripts/lessons/design-web-15*.mjs`; a saída `index.html` incorpora
CSS e JavaScript. Preservar todas as rotas existentes ao publicar na Vercel.
