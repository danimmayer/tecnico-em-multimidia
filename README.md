# Tecnico em Multimidia — SENAI

Apresentacoes interativas em HTML para o curso **Tecnico em Multimidia** — SENAI.

## Como rodar

### 1. Baixar o projeto

```bash
git clone https://github.com/danimmayer/tecnico-em-multimidia.git
cd tecnico-em-multimidia
```

Ou baixe o ZIP: **Code > Download ZIP** no GitHub, extraia e abra a pasta.

### 2. Abrir a apresentacao

**Opcao A — Direto no navegador (mais simples)**

Abra o arquivo `Aula_01_A_Imagem_Atraves_do_Tempo.html` com duplo clique. Ele abre direto no navegador.

**Opcao B — Servidor local com Node.js (recomendado)**

Requer [Node.js](https://nodejs.org/) instalado. Para instalar:

```bash
# Mac (com Homebrew)
brew install node

# Windows (com winget)
winget install OpenJS.NodeJS

# Ou baixe direto: https://nodejs.org/
```

Depois, dentro da pasta do projeto, rode:

```bash
cd tecnico-em-multimidia
npx serve -l 8901
```

Depois abra no navegador: [http://localhost:8901/Aula_01_A_Imagem_Atraves_do_Tempo.html](http://localhost:8901/Aula_01_A_Imagem_Atraves_do_Tempo.html)

**Opcao C — Servidor local com Python**

Requer Python 3 instalado (ja vem no Mac e na maioria das distros Linux).

```bash
cd tecnico-em-multimidia
python3 -m http.server 8901
```

Depois abra no navegador: [http://localhost:8901/Aula_01_A_Imagem_Atraves_do_Tempo.html](http://localhost:8901/Aula_01_A_Imagem_Atraves_do_Tempo.html)

### 3. Apresentar

- Pressione **F** para tela cheia
- Use as setas **← →** ou **Space** para navegar entre slides
- Pressione **G** para ver a grade de todos os slides
- Pressione **?** para ver todos os atalhos

## Atalhos de teclado

| Tecla | Acao |
|-------|------|
| `→` `Space` | Proximo slide |
| `←` `Backspace` | Slide anterior |
| `Home` | Primeiro slide |
| `End` | Ultimo slide |
| `F` | Tela cheia |
| `G` | Grade de slides |
| `I` | Painel de informacoes (slides de pesquisa) |
| `?` | Ajuda |
| `Esc` | Fechar modal/grade/ajuda |

## Estrutura

```
├── Aula_01_A_Imagem_Atraves_do_Tempo.html   # Apresentacao
└── imagens/                                   # Imagens utilizadas
    └── fotografos/                            # Fotos iconicas
```

## Licenca

Material didatico — SENAI / Prof. Daniel Mayer.
