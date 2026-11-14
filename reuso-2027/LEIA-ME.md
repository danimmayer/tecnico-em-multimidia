# Edição de reuso — Técnico em Multimídia

O pacote reúne as 64 aulas existentes no acervo: Design Web (29), Produção Audiovisual (23) e Fotografia Digital e Semiótica (12). As outras UCs do plano de curso não têm acervo nesta revisão. Os originais foram preservados; esta edição é um apoio revisado para nova utilização, sem alteração do SGN e sem relatórios para a coordenação.

## Abrir o pacote docente compilado no Mac

Abra `iniciar.command` e mantenha a janela do Terminal aberta. Exige Python 3 já instalado nesta máquina; funciona sem internet.

Estas instruções se referem ao ZIP docente entregue localmente ao professor, que já contém `alunos/`, `docente/`, `recursos/` e `resources.json`. Ele fica fora do repositório público. Daniel recebeu o pacote e a autoria privada separadamente.

- Professor: <http://127.0.0.1:8870> — roteiro e apresentações. Somente no computador do professor.
- Alunos: <http://127.0.0.1:8871> — atividades, recursos e editor. Não contém roteiros ou apresentações docentes.

Para compartilhar somente a oficina na rede local, execute `python3 serve.py --student-host 0.0.0.0`. O endereço para a turma é o IP local do computador, porta 8871; o servidor docente continua restrito a 127.0.0.1. Não compartilhe o ZIP docente com alunos. Não abra simplesmente o HTML: o navegador precisa do servidor local para ler os dados.

## Abrir um checkout público

No checkout do repositório, abra `reuso-2027/iniciar.command` ou execute `python3 reuso-2027/serve.py`. Essa versão inicia somente a oficina em <http://127.0.0.1:8871>, usando os recursos originais do checkout, sem depender da autoria privada ou de compilação. Não abre a porta docente. Para ministrar com os slides novos, use o pacote docente local. A seção de reconstrução abaixo explica o requisito de autoria para gerar outro pacote completo.

## Preparar e ministrar

Escolha a aula, leia **Condução e slides** e confira os recursos físicos previstos antes da aula. A aba relaciona a proposta com o PEA consultado, seus recursos e os limites de cobertura. Recurso previsto precisa de uso real; qualquer mudança do plano vigente exige o encaminhamento institucional correspondente antes da execução.

Fotografia continua centrada nas apresentações: use **Slides visuais revisados · composição preservada**. As imagens originais e a composição foram mantidas nas cópias; as atividades e os critérios completos estão nos slides. O editor é apoio opcional. As apresentações de Design Web e Audiovisual são abertas somente na área docente.

Nas oficinas, a turma pode editar peças, criar uma versão B, comparar, abrir a prévia repetidamente e exportar/importar o projeto com mídias. Audiovisual também tem montagem local de vídeo curto, máscara, chroma por cor, ajustes de cor, dois pontos de movimento do texto e exportação em formato realmente oferecido pelo navegador. A mesa de som e o simulador de espera existentes são recursos específicos das aulas correspondentes. Não são equivalentes a todos os recursos de um editor profissional.

Conteúdo e evidência essenciais terminam até 22h no roteiro noturno de referência. Cada aula tem seis rodadas específicas e repetíveis para quem concluir cedo. Após 22h, somente consolidação opcional do mesmo objeto, sem nova nota, conteúdo ou entrega. A duração final precisa respeitar a aula registrada: não trate todos os encontros como 3h30.

## Carga horária e limites curriculares

- Design Web: 100h no PEA, com 29 encontros (05, 10 e 20 de 180 minutos; os demais de 210 minutos). A edição mantém a escolha de não exigir programação discente. As capacidades institucionais de aplicar HTML/CSS que aparecem na fonte continuam com cobertura parcial; esta proposta visual não comprova aplicação de código nem aprovação institucional dessa adaptação.
- Audiovisual: 98h, sendo 78h presenciais e 20h não presenciais no calendário consultado. Roteiro de 22 encontros de 210 minutos e fechamento de 60 minutos, mais cinco propostas de tutoria de 240 minutos. A distribuição de atividades nas tutorias é uma proposta de reuso; não atesta realização anterior nem cadastro de nova versão.
- Fotografia: 40h no PEA, 12 encontros de 200 minutos. Há diferença em relação aos intervalos de 210 minutos encontrados no calendário; a edição não resolve regras de intervalo ou frequência por inferência.

## Guardar o trabalho

O projeto fica no navegador do computador utilizado. **Exportar projeto** guarda as versões, os registros e as mídias disponíveis. **Importar projeto** restaura na mesma UC e aula. O HTML exportado é um artefato local, não uma publicação online. A gravação audiovisual gera WebM ou outro formato efetivamente suportado; não renomeia arquivos para simular MP4. Fotos/gravações do estudante não são enviadas ao servidor.

## Reconstruir a edição

O código público em `reuso-2027/` contém somente dados discentes e ferramentas. A autoria completa e o pacote docente ficam fora do repositório. Para recompilar, use Python 3.10+ com as dependências de `requirements-build.txt` e execute `build.py --authoring PASTA_PRIVADA --output PASTA_FORA_DO_REPOSITORIO`. A compilação rejeita autoria incompleta, durações incoerentes, recursos ausentes, mapeamento incompleto de slides e inclusão de fontes privadas.

No site estático, a entrada discente é `/reuso-2027/`, com recursos originais do repositório. No pacote local compilado, o servidor utiliza a lista restrita de recursos. A edição nova não substitui os arquivos antigos nem torna privados os slides que já estavam publicados no repositório.

Os ensaios de fluxo são executados por agentes. Não houve ensaio com estudantes, e a verificação técnica não comprova aprendizagem ou execução em sala.
