# Técnico em Multimídia — SENAI

Apresentações interativas em HTML para o curso **Técnico em Multimídia** — SENAI.
Prof. Daniel Mayer · 2026.

## Como rodar

### 1. Baixar o projeto

```bash
git clone https://github.com/danimmayer/tecnico-em-multimidia.git
cd tecnico-em-multimidia
```

Ou baixe o ZIP: **Code > Download ZIP** no GitHub, extraia e abra a pasta.

### 2. Abrir o Home

**Opção A — Direto no navegador (mais simples)**

Abra `index.html` com duplo clique. Funciona off-line.

**Opção B — Servidor local com Node.js (recomendado)**

Requer [Node.js](https://nodejs.org/) instalado.

```bash
cd tecnico-em-multimidia
npx serve -l 8901
```

Depois abra no navegador: [http://localhost:8901/](http://localhost:8901/)

**Opção C — Servidor local com Python**

```bash
cd tecnico-em-multimidia
python3 -m http.server 8901
```

### 3. Navegação

A partir do **Home** (`index.html`):

- Selecione a **UC** que quer acessar.
- Dentro da UC, selecione a **Aula**.
- Tecle **H** em qualquer página para voltar ao Home do curso (do curso no caso do dashboard da UC; da UC no caso das aulas).

## Estrutura

```
├── index.html                                   # Home · grid de UCs do curso
├── uc-fotografia-digital.html                   # Dashboard · 12 aulas da UC
├── Aula_01_A_Imagem_Atraves_do_Tempo.html       # Aula 01 · apresentação
├── Aula_02_Formacao_da_Imagem_Digital.html      # Aula 02 · apresentação
├── assets/
│   ├── home.css                                 # Design system · dashboards
│   ├── pedagogy.css                             # Design system · apresentações
│   ├── pedagogy.js                              # Engine pedagógico (presenter, relatório, depth)
│   ├── pedagogy-data.js                         # Dados da Aula 01
│   └── pedagogy-data-aula02.js                  # Dados da Aula 02
└── imagens/                                     # Assets visuais
```

## Atalhos de teclado

### Home e dashboards

| Tecla | Ação |
|-------|------|
| `H`   | Voltar ao Home do curso (a partir da UC) |
| `1` — `9` | Abrir aula pelo número (no dashboard da UC) |
| `?`   | Mostrar/esconder ajuda |
| `Esc` | Fechar overlay |

### Nas apresentações

| Tecla | Ação |
|-------|------|
| `→` `Space` | Próximo slide |
| `←` `Backspace` | Slide anterior |
| `Home` | Primeiro slide |
| `End` | Último slide |
| `F` | Tela cheia |
| `G` | Grade de slides |
| `H` | Voltar ao dashboard da UC |
| `D` | Imprimir / Salvar PDF da aula inteira |
| `I` | Painel de informações (em slides de pesquisa) |
| `1` · `2` · `3` | Profundidade: Essencial · Expandir · Bônus |
| `P` | Presenter Mode (notas do professor) |
| `R` | Relatório da aula |
| `C` | Alto contraste |
| `+` / `-` | Escala da fonte |
| `S` | Análise semiótica (em fotos com hotspots) |
| `?` | Mostrar/esconder ajuda |
| `Esc` | Fechar modal / grade / ajuda |

## Gerar PDF da aula

Dentro de qualquer apresentação, tecle **`D`** ou clique no ícone **⬇** na barra inferior. O navegador abre o diálogo de impressão — escolha **"Salvar como PDF"** como destino.

O CSS de impressão já ajusta a aula para:
- Página A4 paisagem, 1 slide por página, sem margens.
- Todas as caixas **Expandir** e **Bônus** ficam visíveis no PDF (o material impresso traz o conteúdo completo das três profundidades).
- Barras, modais e overlays interativos ficam ocultos.
- Cores e fundos são preservados (requer o navegador permitir "imprimir cores e imagens de fundo", ativado por padrão em Chrome e Safari).

Testado em Chrome, Safari, Firefox e Edge. Para melhor resultado, use Chrome ou Edge.

## Padrão pedagógico

Cada aula é uma noite presencial (19:00–22:30) dividida em **4 blocos** com chamada no início de cada bloco e lanche de 20 min após o Bloco 2.

Slides podem ter **três camadas de profundidade**:

1. **Essencial** — conteúdo que todos veem.
2. **Expandir** (tecle `2`) — aprofundamento para turmas engajadas.
3. **Bônus** (tecle `3`) — curiosidades, contexto histórico, conexões.

## Licença

Material didático — SENAI / Prof. Daniel Mayer.
