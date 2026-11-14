# Aula 16 — Criar e testar páginas

Abra `slides.html` para projetar e `index.html` para a oficina. Ambos funcionam sem internet, sem conta e sem licença individual. No site completo, a aula está em `aula-kit.html?uc=design-web&aula=16`.

## Publicação e acesso

A oficina dos estudantes está em https://oficinas-design-web.vercel.app/aula-16/. Publicar somente `index.html` dessa pasta. A oficina não contém apresentação nem link para os slides.

`slides.html`, `aula-16-offline.zip`, plano docente e relatório institucional ficam fora do site estudantil, disponíveis para uso local do professor. O repositório GitHub é público e contém esses arquivos versionados; a ausência deles no site da oficina não restringe o acesso às cópias do repositório. O ZIP é um **kit docente**, pois inclui a apresentação. Não disponibilizá-lo à turma: os alunos não devem avançar os slides à frente do professor. Um link público sem divulgação não constitui controle de acesso.

O Festival Vira-Luz é um caso fictício. Em dupla, os estudantes fazem seis ideias, escolhem três delas e montam **três versões da página inicial**. Os botões dessas versões abrem a mesma **Página de informações**, que junta horário, detalhes e acesso. Isso é uma entrega, não três sites. Páginas extras são opcionais e não criam critério, conteúdo ou exigência. Depois, uma pessoa faz a tarefa e a dupla registra o que observou para decidir se mantém ou ajusta.

Esta oficina digital é a versão vigente do plano da Aula 16 e deve ser conduzida com as atividades, metodologias e recursos descritos no plano docente. Ela explicita previamente a adaptação do planejamento-base em papel. Se ocorrer impedimento real, use apenas a alternativa prevista e registre o ajuste pelo fluxo institucional aplicável; registrar o desvio não substitui a execução planejada nem permite reescrever o plano depois da aula.

O roteiro reserva 19h–22h ao conteúdo e às evidências, com intervalo de 19h45–20h05. Das 22h às 22h30, há consolidação opcional de conteúdo já trabalhado: comparar uma decisão, ensaiar uma variação em cópia temporária, explicar uma escolha ao par ou retomar uma dúvida. Não há conceito, critério, nota, entrega ou evidência formal nova, nem prejuízo para quem sair às 22h.

Quem concluir a entrega-base antes das 22h pode abrir a **Rodada extra (opcional)**, sem esperar a turma inteira, para comparar duas versões já produzidas na mesma tarefa e anotar o que observou. O docente ajusta o tempo ao andamento real da turma. A comparação não cria wireframe, página, critério ou nota novos; não participar não altera a entrega. Se disponível, o registro técnico `extension` é salvo e exportado apenas como memória do processo.

O banco de continuidade reúne seis desafios de 10 a 15 minutos sobre decisões já feitas na oficina. Há rotas de 30, 60 ou 90 minutos, com progressão **conferir → comparar → defender** e resultado visível em cada etapa. Os desafios podem ser individuais, em dupla ou por alternância de papéis. Para ensaiar uma mudança sem mexer na entrega-base, use uma cópia temporária. A consolidação é opcional e não produz nova nota, entrega ou evidência formal.

O rascunho fica no navegador deste computador, na chave v2 da oficina. Use **Salvar ou reabrir meu trabalho → Baixar cópia do trabalho (JSON)** para levar uma cópia e **Reabrir cópia do trabalho** para continuar em outro computador. Na etapa 6, o botão **Baixar cópia do trabalho (JSON)** também salva a cópia. Dados v2 válidos são preservados ao recarregar; se uma versão incompatível não puder ser aberta, o raw é preservado/baixável para recuperação, sem ser apagado silenciosamente. O relatório HTML é opcional e reúne os registros; não precisa imprimir nem enviar arquivo para concluir a atividade. No computador compartilhado, faça cópia antes de iniciar outro rascunho.

Na missão de visita, **Iniciar teste com visitante** abre a primeira rodada. **Iniciar nova visita** abre outra e mantém o histórico numerado de versão, observação e snapshot; **Salvar anotação e iniciar outra visita** registra a atual antes de abrir a próxima; **Voltar ao começo deste teste** só retorna ao início daquela mesma visita. A oficina pode apontar, por versão, o que revisar, mas não impede o teste por campos incompletos: testar pode revelar a próxima melhoria. Repetir é opcional: a primeira visita observada já atende à entrega-base. O histórico usa e preserva `tests` no formato v2; ele é registro técnico de processo, não nota nem aprovação automática.

Consulte [PLANO-DOCENTE.md](PLANO-DOCENTE.md) para mediação, critérios, instrumentos, inclusão e recuperação, e [ACOMPANHAMENTO-DOCENTE.md](ACOMPANHAMENTO-DOCENTE.md) para o roteiro local de circulação e conferência de recursos. Os quatro critérios, em linguagem da turma, são: (1) as três versões mudam a ordem ou o destaque; (2) as três escolhas atendem ao pedido do Festival; (3) todas as versões abrem a mesma Página de informações, com promessa, informações e retorno claros; (4) manter ou mudar responde ao que a pessoa fez ou disse no teste. Durante a circulação, cada integrante opera um bloco ou botão diferente e explica, em 30–60 segundos, sua razão e o que observou; isto não cria novo campo obrigatório na oficina. A avaliação da aprendizagem exige leitura docente das decisões e evidências; o software verifica presença dos registros.

Fontes de implementação: `scripts/lessons/design-web-16.mjs`, `scripts/lessons/design-web-16-workshop.mjs` e `assets/design-web-16.*`. Regenerar com `node scripts/build-design-web-16.mjs`; validar com `node scripts/validate-design-web-16.mjs`, o teste de navegador e `scripts/validate-design-web-16-storage-browser.cjs`. As verificações de fluxo, exportação e armazenamento são técnicas; não comprovam aprendizagem.

### Revisão visual da apresentação

A apresentação usa três esboços distintos para comparar prioridades, diagramas de conceito e estrutura, etapas conectadas e cartões de evidência. O contraste e a variação de composição apoiam a leitura em projeção. A oficina, os critérios e os horários mantêm o mesmo planejamento; slides continuam locais.
