# Técnico em Multimídia — SENAI

Planejamentos, apresentações e materiais de aula do **Prof. Daniel Marcos
Mayer** para o curso Técnico em Multimídia — SENAI, 2026.

O início reúne três Unidades Curriculares:

- Fundamentos de Fotografia Digital e de Semiótica · 12 aulas;
- Design Web · 29 aulas · 100 h;
- Produção Audiovisual · 23 aulas · 98 h.

Design Web e Produção Audiovisual usam uma estrutura comum de conceito,
atividade, evidência e anotações autorais. As anotações ficam ocultas por padrão
para que nenhuma orientação interna apareça no projetor.

## Execução local

O projeto funciona off-line. Um servidor local evita limitações do navegador ao
abrir os arquivos diretamente.

### Python

```bash
cd tecnico-em-multimidia
python3 -m http.server 8901
```

### Node.js

```bash
cd tecnico-em-multimidia
npx serve -l 8901
```

Endereço: [http://localhost:8901/](http://localhost:8901/)

## Navegação

1. `index.html` apresenta as Unidades Curriculares.
2. Cada página `uc-*.html` reúne a sequência de aulas.
3. Design Web e Produção Audiovisual abrem as apresentações em
   `aula-kit.html`.
4. As páginas de Fotografia usam apresentações individuais.

## Estrutura principal

```text
├── index.html
├── uc-fotografia-digital.html
├── uc-design-web.html
├── uc-producao-audiovisual.html
├── aula-kit.html
├── Aula_01_A_Imagem_Atraves_do_Tempo.html
├── Aula_02_Formacao_da_Imagem_Digital.html
├── Aula_02_Gabarito_Professor.html
├── Aula_03_Semiotica_I_O_Universo_dos_Signos.html
├── Aula_04_Semiotica_II_Leitura_Semiotica_da_Imagem.html
├── Aula_04_Ficha_Leitura_Semiotica.html
├── Aula_04_Banca_Imagens.html
├── Aula_05_A_Camera_Digital.html
├── Aula_06_Linguagem_Fotografica_e_Composicao.html
├── Aula_07_Luz_Exposicao_Triangulo.html
├── Aula_08_Ambiente_Luz_Natural_e_Artificial.html
├── Aula_09_Producao_de_Imagens_Pratica_Dirigida.html
├── Aula_10_Aplicacoes_Graficas_Edicao_e_Avaliacao.html
├── Aula_11_Projeto_Integrador_Ensaio_Fotografico_em_Trios.html
├── Aula_12_Apresentacoes_Finais_Recuperacao_e_Encerramento.html
├── GUIA_RAPIDO_DESIGN_WEB_E_AUDIOVISUAL.md
├── assets/
│   ├── home.css
│   ├── course-kit.css
│   ├── course-data.js
│   ├── course-support.js
│   ├── course-hub.js
│   ├── course-lesson.js
│   ├── pedagogy.css
│   ├── pedagogy.js
│   └── pedagogy-data*.js
├── modelos/
│   ├── design-web/
│   │   ├── site-base/
│   │   └── materiais-de-aula/
│   └── producao-audiovisual/
└── scripts/
    ├── build-course-data.mjs
    └── validate-course-kit.mjs
```

## Design Web e Produção Audiovisual

As apresentações abrem no modo de projeção. A tecla **P** revela ou oculta
minhas anotações. Essas notas usam primeira pessoa e registram preparação,
sequência, evidências e alternativas.

| Tecla | Ação |
|---|---|
| `→` / `←` | Avançar / voltar |
| `P` | Mostrar ou ocultar anotações |
| `G` | Abrir o mapa da aula |
| `D` | Imprimir ou salvar o material projetável |
| `F` | Entrar ou sair da tela cheia |
| `H` | Voltar à Unidade Curricular |
| `/` | Focar a busca no painel da UC |

O PDF das novas UCs preserva apenas o material projetável. As anotações privadas
não são impressas.

### Laboratório de Design Web sem login

O painel e o caderno de preparação de Design Web reúnem cinco caminhos para a
aula:

- **DontPad BR** para distribuir avisos, links e trechos de código em tempo real,
  usando leitura pública e PIN de edição;
- **LiveCodes** para editar HTML, CSS e JavaScript com o resultado ao lado;
- **Netlify Drop** para publicar a pasta ou o ZIP sem cadastro;
- **Photopea** para editar peças visuais no navegador sem conta;
- **projeto inicial local** como entrega oficial e alternativa sem internet.

Nenhum desses canais recebe dados pessoais, senhas, chaves ou avaliações. A
rotina completa está em `GUIA_RAPIDO_DESIGN_WEB_E_AUDIOVISUAL.md`.

## Fotografia Digital e Semiótica

As apresentações dessa UC mantêm o sistema próprio:

| Tecla | Ação |
|---|---|
| `→` / `←` | Avançar / voltar |
| `1` · `2` · `3` | Essencial · Expandir · Bônus |
| `P` | Modo de apresentação com notas |
| `D` | Imprimir ou salvar PDF |
| `F` | Tela cheia |
| `G` | Grade de slides |
| `H` | Voltar à Unidade Curricular |
| `R` | Relatório da aula |
| `C` | Alto contraste |
| `+` / `-` | Escala da fonte |
| `?` | Ajuda |
| `Esc` | Fechar painel, grade ou ajuda |

## Dados das aulas

`assets/course-data.js` é gerado a partir dos dois planejamentos gerais:

```bash
node scripts/build-course-data.mjs \
  /caminho/Planejamento_Geral_UC_Design_Web.md \
  /caminho/Planejamento_Geral_UC_Producao_Audiovisual.md
```

O gerador preserva os 4 blocos de cada encontro. O validador confere quantidade,
capacidades, anexos e expressões proibidas na camada pública:

```bash
node scripts/validate-course-kit.mjs
```

## Organização pedagógica

Cada noite tem quatro blocos. Os planejamentos-fonte registram chamada no início
de cada bloco e lanche de 20 minutos após o primeiro bloco; esse tempo é
administrado dentro do roteiro do encontro.

Design Web usa persona e dados fictícios nos exercícios publicados. Produção
Audiovisual separa autorização para exercício, exibição interna, mostra com
convidados e publicação online.

## Verificação

As novas páginas são validadas em Chromium com Playwright, incluindo navegação,
modo de projeção, anotações, visualização móvel e impressão.

## Licença

Material didático — SENAI / Prof. Daniel Marcos Mayer.
