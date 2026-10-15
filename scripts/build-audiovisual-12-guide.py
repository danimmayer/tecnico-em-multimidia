"""Gera o guia de consulta offline da aula 12. Requer reportlab; não requer rede.

Primeiro gerar as telas com scripts/build-audiovisual-12-media.py.
"""
from pathlib import Path
import io

from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-12'
OUT = KIT / 'Guia-Aula12-Shotcut.pdf'
for required in ['telas/cena-paisagem.jpg', 'telas/guia-sobre-cena.jpg', 'telas/titulo-alinhado.jpg', 'telas/faixa.jpg',
                 'telas/legenda.jpg', 'telas/mascara-sem.jpg', 'telas/mascara-com.jpg', 'telas/assinatura.jpg']:
    if not (KIT / required).is_file():
        raise SystemExit(f'Tela ausente: {required}. Execute scripts/build-audiovisual-12-media.py antes.')
for name, face in [('Body', 'Helvetica'), ('Bold', 'Helvetica-Bold')]:
    pdfmetrics.registerFont(pdfmetrics.Font(name, face, 'WinAnsiEncoding'))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold')
W, H = 595.28, 841.89
M, CW = 44, W - 88
INK, MUTED, ACCENT, PALE = map(HexColor, ['#10202b', '#4f6270', '#b8651a', '#f6ece0'])
c = canvas.Canvas(str(OUT), pagesize=(W, H), invariant=1)
c.setTitle('Aula 12 | Guia prático do Shotcut')
c.setAuthor('Prof. Daniel Marcos Mayer | SENAI')
page = 0
# Quadros reduzidos mantêm o PDF leve para copiar em vários postos.
SMALL = {}


def small(name):
    if name not in SMALL:
        buffer = io.BytesIO()
        Image.open(KIT / 'telas' / name).resize((640, 360), Image.LANCZOS).save(buffer, 'JPEG', quality=82)
        buffer.seek(0)
        SMALL[name] = ImageReader(buffer)
    return SMALL[name]


def text(value, y, size=12, color=INK, x=M, width=CW, bold=False):
    style = ParagraphStyle('p', fontName='Bold' if bold else 'Body', fontSize=size, leading=size * 1.38, textColor=color)
    p = Paragraph(value, style)
    _, height = p.wrap(width, H)
    assert y - height >= 45, f'Texto fora da página {page}: {value[:50]}'
    p.drawOn(c, x, y - height)
    return y - height


def begin(number, title, subtitle):
    global page
    if page:
        c.showPage()
    page = number
    c.setFillColor(ACCENT); c.rect(M, H - 49, 34, 4, fill=1, stroke=0)
    text('SENAI  /  PRODUÇÃO AUDIOVISUAL  /  AULA 12', H - 30, 9, color=ACCENT)
    text(title, H - 70, 25, bold=True)
    y = text(subtitle, H - 110, 12, color=MUTED)
    c.setStrokeColor(HexColor('#e2d6c8')); c.line(M, 39, W - M, 39)
    c.setFont('Body', 9); c.setFillColor(MUTED)
    c.drawString(M, 24, 'Guia de consulta no computador • Não é necessário imprimir')
    c.drawRightString(W - M, 24, f'{number} / 5')
    return y - 22


def step(n, title, detail, y):
    c.setFillColor(ACCENT); c.circle(M + 11, y - 11, 11, fill=1, stroke=0)
    c.setFillColor(white); c.setFont('Bold', 11); c.drawCentredString(M + 11, y - 15, str(n))
    y = text(title, y + 1, 13, x=M + 35, width=CW - 35, bold=True)
    y = text(detail, y - 5, 11.5, x=M + 35, width=CW - 35)
    return y - 14


def box(label, body, y):
    style = ParagraphStyle('b', fontName='Body', fontSize=11, leading=15.5, textColor=INK)
    p = Paragraph('<b>' + label + '</b><br/>' + body, style)
    _, h = p.wrap(CW - 28, H)
    c.setFillColor(PALE); c.roundRect(M, y - h - 24, CW, h + 24, 7, fill=1, stroke=0)
    p.drawOn(c, M + 14, y - h - 12)
    return y - h - 36


def pictures(names, labels, y):
    gap = 12
    w = (CW - gap * (len(names) - 1)) / len(names)
    h = w * 9 / 16
    for i, (name, label) in enumerate(zip(names, labels)):
        x = M + i * (w + gap)
        c.drawImage(small(name), x, y - h, w, h)
        text(label, y - h - 6, 10, x=x, width=w, bold=True)
    return y - h - 34


def tracks(rows, y):
    """Esquema conceitual da linha do tempo, não uma captura da interface."""
    row_h, label_w = 22, 64
    c.setFillColor(PALE); c.roundRect(M, y - len(rows) * (row_h + 6) - 12, CW, len(rows) * (row_h + 6) + 12, 7, fill=1, stroke=0)
    lane = CW - label_w - 20
    for index, (label, clips) in enumerate(rows):
        top = y - 8 - index * (row_h + 6)
        c.setFillColor(ACCENT); c.setFont('Bold', 10); c.drawRightString(M + label_w, top - 15, label)
        total = sum(seconds for _, seconds, _ in clips)
        x = M + label_w + 10
        for name, seconds, color in clips:
            w = lane * seconds / total
            if color:
                c.setFillColor(HexColor(color)); c.rect(x + 1, top - row_h, w - 2, row_h, fill=1, stroke=0)
                c.setFillColor(INK); c.setFont('Bold', 9); c.drawCentredString(x + w / 2, top - 15, name)
            x += w
    return y - len(rows) * (row_h + 6) - 32


VIDEO, GRAPHIC, GUIDE = '#f2c48a', '#bfe0f2', '#d9f6fd'

y = begin(1, 'Copie. Abra. Organize as camadas.', 'Cenas em V1, textos e grafismos acima, guia de margens no topo.')
y = step(1, 'Copie a atividade e abra o Shotcut.',
         '<b>Pendrive:</b> copie <b>02-ALUNO / Aula12</b> inteira para <b>Documentos</b>. <b>ZIP:</b> clique com o botão direito em <b>Aula12-Shotcut.zip &gt; Extrair tudo</b> e copie Aula12 para Documentos. '
         'Se o posto ainda não tem Shotcut, copie <b>01-SHOTCUT / Shotcut</b> inteira e abra <b>shotcut.exe</b> depois da cópia.', y)
y = step(2, 'Crie três trilhas de vídeo.',
         'Abra <b>Lista de reprodução</b> e <b>Linha do tempo</b>. Aperte <b>Ctrl + I</b> três vezes: aparecem V2, V3 e V4 acima de V1. O que fica em cima cobre o que fica embaixo.', y)
y = tracks([
    ('V4 GUIA', [('grade-guia.png', 16, GUIDE)]),
    ('V3', [('', 4, None), ('Nome', 3, GRAPHIC), ('Legenda', 2, GRAPHIC), ('Foto + máscara', 4, GRAPHIC), ('Créditos', 3, GRAPHIC)]),
    ('V2', [('Título', 4, GRAPHIC), ('Faixa', 3, GRAPHIC), ('', 2, None), ('Palavra', 4, GRAPHIC), ('Pictograma', 3, GRAPHIC)]),
    ('V1 CENA', [('08-paisagem', 4, VIDEO), ('02-encontro', 5, VIDEO), ('foto-fruta', 4, VIDEO), ('Cor', 3, VIDEO)]),
], y)
y = step(3, 'Monte as cenas em V1.',
         'Arraste para a Lista de reprodução <b>08-paisagem.mp4</b>, <b>02-encontro.mp4</b>, <b>foto-fruta.jpg</b> e os PNG da pasta <b>grafismos</b>. Leve as três cenas para V1, lado a lado. Deixe a foto com cerca de 4 segundos.', y)
y = step(4, 'Coloque o guia em V4 e salve.',
         'Arraste <b>grade-guia.png</b> para V4 e puxe sua borda direita até o fim da última cena. Use <b>Arquivo &gt; Salvar como</b>: <b>Documentos / Aula12 / minha-abertura.mlt</b>.', y)
box('Você deve ver', 'As três cenas em V1 e as linhas azuis do guia sobre todas elas. O guia ajuda a alinhar; ele será ocultado antes de exportar.', y)

y = begin(2, 'Crie um título alinhado.', 'O título encosta na margem do texto, no espaço livre da cena.')
y = pictures(['guia-sobre-cena.jpg', 'titulo-alinhado.jpg'], ['Com o guia em V4', 'Resultado sem o guia'], y)
y = step(1, 'Crie o texto.',
         'Abra <b>Abrir outro &gt; Texto</b> (Open Other &gt; Text). Escolha <b>Simples</b>, digite o título e clique em <b>Abrir</b>. Arraste a prévia para <b>V2</b>, no começo da paisagem.', y)
y = step(2, 'Escolha fonte e alinhamento.',
         'Com o texto selecionado, abra <b>Filtros &gt; Texto: simples</b>. Fonte <b>Arial Black</b>, alinhamento horizontal <b>à esquerda</b>, contorno escuro fino.', y)
y = step(3, 'Encoste a borda na linha azul.',
         'Na prévia, arraste o retângulo do texto até a borda esquerda encostar na <b>margem do texto</b>, no céu. Uma segunda linha menor começa na mesma borda, logo abaixo.', y)
y = step(4, 'Faça uma entrada suave.',
         'Passe o mouse no canto superior esquerdo do clipe de texto e puxe o pequeno círculo para dentro. Reproduza desde o início.', y)
text('<b>Não apareceu?</b> Confira se o texto está em V2, acima da cena. Se o diálogo for diferente na sua versão, use <b>Abrir outro &gt; Cor</b> transparente e aplique o filtro <b>Texto: simples</b>.', y, 10.5, color=MUTED)

y = begin(3, 'Apresente Oti e escreva o som.', 'O nome fica perto de quem aparece. A legenda fica sozinha no centro inferior.')
y = pictures(['faixa.jpg', 'legenda.jpg'], ['Faixa com nome', 'Legenda depois da faixa'], y)
y = step(1, 'Faixa em V2.',
         'Arraste <b>grafismos / faixa-inferior.png</b> para <b>V2</b>, sobre o encontro, quando Oti aparece. Deixe por cerca de 3 segundos.', y)
y = step(2, 'Nome em V3, alinhado à barra laranja.',
         'Crie outro texto em <b>V3</b>, acima da faixa: <b>OTI</b>, Enter, <b>pinguim-de-magalhães</b>. Fonte <b>Arial</b>, à esquerda. As duas linhas começam logo depois da barra laranja. Faixa e nome entram e saem juntos.', y)
y = step(3, 'Legenda depois do nome.',
         'Ouça o encontro com fones. Em <b>V3</b>, depois do nome, crie um texto com o som entre colchetes, como <b>[vento forte]</b>, ou uma frase curta. Centralizado embaixo, cor de fundo preta semitransparente.', y)
box('Legenda legível', 'No máximo duas linhas • Pelo menos 2 segundos na tela • Fundo ou contorno escuro • Nunca no mesmo lugar e no mesmo instante que a faixa.', y)

y = begin(4, 'Passe a palavra por trás de Koro.', 'A mesma foto duas vezes, com a palavra no meio. A cópia de cima recebe a máscara.')
y = pictures(['mascara-sem.jpg', 'mascara-com.jpg'], ['Sem máscara: por cima', 'Com máscara: por trás'], y)
y = step(1, 'Palavra em V2.',
         'Crie um texto em <b>V2</b>, sobre <b>foto-fruta.jpg</b>: uma palavra curta, Arial Black, bem grande, no céu. A parte de baixo das letras cruza o alto da cabeça.', y)
y = step(2, 'A mesma foto em V3.',
         'Arraste <b>foto-fruta.jpg</b> da Lista de reprodução para <b>V3</b>, exatamente acima da foto de V1. As três camadas começam e terminam juntas. A palavra some: está certo.', y)
y = step(3, 'Máscara na cópia de cima.',
         'Selecione a foto de <b>V3</b>. <b>Filtros &gt; + &gt; Máscara: forma simples</b> (Mask: Simple Shape). Forma <b>Elipse</b>. Mova e redimensione a elipse em volta da cabeça; use <b>Rotação</b> e um pouco de <b>Suavidade</b>.', y)
box('Você deve ver', 'A palavra no céu e a cabeça de Koro na frente das letras. Um corte de céu sobre as letras? Diminua a elipse ou suba a palavra: uma forma simples não acompanha reentrâncias.', y)

y = begin(5, 'Assine, oculte o guia e exporte.', 'Salvar o projeto (.mlt) e gerar o vídeo (.mp4) são ações diferentes.')
c.drawImage(small('assinatura.jpg'), M, y - 101, 180, 101.25)
text('A assinatura agrupa pictograma, título e créditos no centro. Os créditos são parte da licença CC BY das imagens.', y - 8, 12, x=M + 200, width=CW - 200)
y -= 122
y = step(1, 'Crie a assinatura.',
         '<b>Abrir outro &gt; Cor</b>, azul-escuro, cerca de 4 segundos, no fim de <b>V1</b>. Um pictograma de <b>grafismos</b> em <b>V2</b>. Em <b>V3</b>, um texto centralizado: título, <b>Remontagem: seu nome</b> e <b>Imagens: Caminandes 3: Llamigos · Blender Foundation · CC BY 3.0</b>.', y)
y = step(2, 'Oculte o guia.',
         'No cabeçalho da trilha <b>V4</b>, clique no <b>olho</b>. As linhas azuis somem da prévia.', y)
y = step(3, 'Exporte em MP4.',
         'Aperte <b>Ctrl + S</b>. Abra <b>Exportar</b>: <b>Origem / From = Linha do tempo</b>, predefinição <b>H.264 High Profile</b>, <b>1280 x 720</b>. Clique em <b>Exportar arquivo</b> e salve <b>minha-abertura.mp4</b> em Aula12. Acompanhe o painel <b>Trabalhos</b>.', y)
y = box('Pronto quando você consegue mostrar',
        'Título na margem • Nome perto de Oti • Legenda sozinha embaixo • Palavra por trás de Koro • Créditos na assinatura • Nenhuma linha azul no MP4.', y)
y = text('<b>Linhas azuis no vídeo:</b> V4 não foi ocultada. <b>Texto cortado na borda:</b> volte para dentro da margem. <b>Arquivo não encontrado ao reabrir:</b> mantenha a pasta Aula12 inteira.', y, 10.5) - 12
text('Mídias: Caminandes 3: Llamigos (2016), Blender Foundation / Blender Institute, CC BY 3.0; créditos completos em CREDITOS.txt. Grafismos de criação própria. '
     'Referências técnicas: shotcut.org/tutorials/ e forum.shotcut.org/pub/mask-simple-shape. Os nomes dos painéis podem variar com o idioma e a versão.', y, 8.5, color=MUTED)
c.save()
print(OUT)
