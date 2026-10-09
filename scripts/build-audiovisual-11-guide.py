"""Gera o guia de consulta offline. Requer reportlab; não requer rede."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-11'
OUT = KIT / 'Guia-Aula11-Shotcut.pdf'
for name, face in [('Body', 'Helvetica'), ('Bold', 'Helvetica-Bold')]:
    pdfmetrics.registerFont(pdfmetrics.Font(name, face, 'WinAnsiEncoding'))
pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold')
W, H = 595.28, 841.89
M, CW = 44, W-88
INK, MUTED, ACCENT, PALE = map(HexColor, ['#172725', '#52625e', '#1b725d', '#eaf3ed'])
c = canvas.Canvas(str(OUT), pagesize=(W,H), invariant=1)
c.setTitle('Aula 11 | Guia prático do Shotcut')
c.setAuthor('Prof. Daniel Marcos Mayer | SENAI')
page = 0

def text(value, y, size=12, color=INK, x=M, width=CW, bold=False):
    style = ParagraphStyle('p', fontName='Bold' if bold else 'Body', fontSize=size,
                           leading=size*1.38, textColor=color)
    p=Paragraph(value, style)
    _,height=p.wrap(width, H)
    assert y-height >= 45, f'Texto fora da página {page}: {value[:50]}'
    p.drawOn(c,x,y-height)
    return y-height

def begin(number, title, subtitle):
    global page
    if page: c.showPage()
    page=number
    c.setFillColor(ACCENT); c.rect(M,H-49,34,4,fill=1,stroke=0)
    text('SENAI  /  PRODUÇÃO AUDIOVISUAL  /  AULA 11',H-30,9,color=ACCENT)
    text(title,H-70,25,bold=True)
    y=text(subtitle,H-110,12,color=MUTED)
    c.setStrokeColor(HexColor('#d8e2dd')); c.line(M,39,W-M,39)
    c.setFont('Body',9); c.setFillColor(MUTED)
    c.drawString(M,24,'Guia de consulta no computador • Não é necessário imprimir')
    c.drawRightString(W-M,24,f'{number} / 5')
    return y-24

def step(n, title, detail, y):
    c.setFillColor(ACCENT); c.circle(M+11,y-11,11,fill=1,stroke=0)
    c.setFillColor(white); c.setFont('Bold',11); c.drawCentredString(M+11,y-15,str(n))
    y=text(title,y+1,13,x=M+35,width=CW-35,bold=True)
    y=text(detail,y-5,12,x=M+35,width=CW-35)
    return y-17

def box(label, body, y):
    style=ParagraphStyle('b',fontName='Body',fontSize=11.5,leading=16,textColor=INK)
    p=Paragraph('<b>'+label+'</b><br/>'+body,style); _,h=p.wrap(CW-28,H)
    c.setFillColor(PALE); c.roundRect(M,y-h-24,CW,h+24,7,fill=1,stroke=0)
    p.drawOn(c,M+14,y-h-12)
    return y-h-39

def strip(names, labels, y):
    gap=12; w=(CW-gap*(len(names)-1))/len(names); h=w*9/16
    for i,(name,label) in enumerate(zip(names,labels)):
        x=M+i*(w+gap)
        c.drawImage(str(KIT/'media'/name),x,y-h,w,h,mask='auto')
        text(label,y-h-7,10,x=x,width=w,bold=True)
    return y-h-46

y=begin(1,'Copie. Abra. Comece.','Um caminho guiado: três clipes, uma fusão, uma foto com zoom e um MP4.')
y=box('No pendrive: Aula11-Pendrive',
      '01-SHOTCUT / Shotcut = o programa Portable<br/>'
      '02-ALUNO / Aula11 = seus arquivos e este guia<br/>'
      '03-PROFESSOR = slides offline e exemplos para projeção',y)
y=step(1,'Copie a atividade para o computador.',
       'No pendrive, abra <b>02-ALUNO</b>. Copie a pasta <b>Aula11</b> inteira para <b>Documentos</b>. Abra a cópia em Documentos.',y)
y=step(2,'Copie o programa se o posto ainda não tem Shotcut.',
       'No pendrive, abra <b>01-SHOTCUT</b>. Copie a pasta <b>Shotcut</b> inteira para Documentos. Aguarde terminar. Abra <b>Shotcut &gt; shotcut.exe</b> no computador. Não mova só o .exe.',y)
y=step(3,'Abra este guia na sua cópia de Aula11.',
       'Abra <b>Guia-Aula11-Shotcut.pdf</b>. Deixe o guia disponível para consultar enquanto edita. O Portable já está extraído; não há instalador para executar.',y)
y=box('Você deve ver',
      'Shotcut aberto e a pasta <b>Documentos / Aula11</b> com oito MP4, duas fotos e este PDF. Com as cópias concluídas, o pendrive pode seguir para outro posto.',y)
text('Se houver bloqueio de abertura, chame o professor. Trabalhe na cópia local; a versão do kit é para Windows 11 em computadores Intel/AMD de 64 bits.',y,10.5,color=MUTED)

y=begin(2,'Monte a primeira sequência.','Comece com estes três arquivos. Depois você poderá experimentar outra ordem.')
y=strip(['02-encontro.jpg','04-fruta.jpg','03-trem.jpg'],['1  02-encontro.mp4','2  04-fruta.mp4','3  03-trem.mp4'],y)
y=step(1,'Mostre os painéis de edição.',
       'Na barra superior do Shotcut, abra <b>Lista de reprodução</b> e <b>Linha do tempo</b>. Em inglês: Playlist e Timeline.',y)
y=step(2,'Traga os três MP4 da sua pasta Aula11.',
       'Arraste os arquivos indicados acima para a <b>Lista de reprodução</b>. Arraste um de cada vez da lista para a <b>Linha do tempo</b>, nesta ordem, lado a lado na mesma trilha.',y)
y=step(3,'Assista e corte uma sobra.',
       'Volte ao começo da linha do tempo e aperte <b>Espaço</b> para reproduzir ou pausar. Para encurtar um clipe, puxe sua borda para dentro. Deixe os clipes encostados, sem espaços vazios.',y)
y=step(4,'Salve o projeto.',
       'Use <b>Arquivo &gt; Salvar como</b>. Escolha <b>Documentos / Aula11</b> e o nome <b>meu-trailer.mlt</b>. Use Ctrl + S durante a edição.',y)
box('Você deve ver','Três clipes na linha do tempo, um após o outro. A reprodução passa pelos três. O arquivo .mlt guarda sua edição; o vídeo pronto será exportado na página 5.',y)

y=begin(3,'Misture a troca de cena.','Fusão: a primeira imagem desaparece enquanto a próxima aparece.')
# Esquema conceitual, não uma captura da interface.
c.setFillColor(PALE); c.roundRect(M,y-70,CW,70,7,fill=1,stroke=0)
for x,w,label,col in [(M+16,175,'ENCONTRO','#cadfd4'),(M+191,56,'X','#e0b56d'),(M+247,244,'FRUTA','#b6d3c9')]:
    c.setFillColor(HexColor(col)); c.rect(x,y-49,w,28,fill=1,stroke=0)
    c.setFillColor(INK); c.setFont('Bold',11); c.drawCentredString(x+w/2,y-40,label)
y=text('Esquema da linha do tempo: o bloco X é a transição.',y-79,10,color=MUTED)-23
y=step(1,'Sobreponha um pouco os dois primeiros clipes.',
       'Na mesma trilha, arraste <b>04-fruta.mp4</b> um pouco para a esquerda, sobre o final de <b>02-encontro.mp4</b>. Comece com uma sobreposição curta, perto de meio segundo.',y)
y=step(2,'Procure o bloco com X.',
       'Ele aparece entre os dois clipes. Coloque o cursor antes dessa emenda e aperte Espaço. Veja uma imagem se misturar com a outra.',y)
y=step(3,'Ajuste olhando o resultado.',
       'Se a passagem demorar demais, encurte o bloco X pela borda. Reproduza de novo. Não precisa acertar um número exato de quadros.',y)
y=box('Você deve ver','Uma troca suave entre o encontro e a fruta. Se a imagem troca de repente, confira se existe o bloco X e se você reproduziu desde antes dele.',y)
y=text('Depois que funcionar: experimente uma varredura',y,13,bold=True)-8
text('Selecione o <b>X</b>, abra <b>Propriedades</b> e escolha uma opção de <b>Vídeo / Wipe</b>. Reproduza e compare. Se preferir a fusão, desfaça com Ctrl + Z. Esta variação pode ficar para depois do primeiro trailer.',y,11.5)

y=begin(4,'Faça uma foto se aproximar.','Keyframe é uma marca no tempo que guarda um valor. Vamos usar duas.')
# Foto pequena + dois valores deixam o gesto visual sem ocupar a página toda.
c.drawImage(str(KIT/'media/foto-fruta.jpg'),M,y-88,156,87.75,mask='auto')
text('INÍCIO<br/><b>Zoom 100%</b>',y-12,14,x=M+183,width=125)
text('FINAL<br/><b>Zoom 125%</b>',y-12,14,x=M+343,width=125)
c.setStrokeColor(ACCENT); c.line(M+190,y-73,M+459,y-73)
for x in (M+190,M+459):
    c.setFillColor(ACCENT); p=c.beginPath();p.moveTo(x,y-67);p.lineTo(x+6,y-73);p.lineTo(x,y-79);p.lineTo(x-6,y-73);p.close();c.drawPath(p,fill=1,stroke=0)
y-=112
y=step(1,'Coloque foto-fruta.jpg depois dos três clipes.',
       'Arraste a foto de Aula11 para o final da linha do tempo. Ajuste sua duração para perto de <b>5 segundos</b> pelas bordas. Selecione a foto na linha do tempo.',y)
y=step(2,'Adicione o filtro de enquadramento.',
       'Abra <b>Filtros &gt; + &gt; Vídeo &gt; Tamanho, posição e rotação</b> (Size, Position &amp; Rotate).',y)
y=step(3,'Marque o começo.',
       'No filtro, ative o botão de <b>keyframes</b> de tamanho/posição, ao lado dos controles. No painel de keyframes, leve o cursor ao primeiro quadro da foto e deixe <b>Zoom = 100%</b>.',y)
y=step(4,'Marque o final e reproduza.',
       'Mova o cursor para o último quadro <b>dentro da foto</b>. Mude <b>Zoom para 125%</b>. Confira uma marca no início e outra no final. Volte ao começo da foto e aperte Espaço.',y)
box('Você deve ver','A foto aumentando aos poucos. Se ela ficar grande o tempo todo, você alterou um único instante: volte ao início, deixe 100% e confira o outro marcador no final. Se só aparecerem controles simples, peça ajuda para ativar os keyframes avançados.',y)

y=begin(5,'Exporte e confira o vídeo.','Salvar o projeto (.mlt) e gerar o vídeo (.mp4) são duas ações diferentes.')
y=step(1,'Salve e abra Exportar.',
       'Aperte <b>Ctrl + S</b>. Abra <b>Exportar</b> na barra superior. Em <b>Origem / From</b>, selecione <b>Linha do tempo / Timeline</b>.',y)
y=step(2,'Escolha MP4 e exporte.',
       'Use a predefinição <b>H.264 High Profile</b>. Em <b>Avançado &gt; Vídeo</b>, confira <b>1280 x 720</b> e <b>24 quadros/s</b>. Clique em <b>Exportar arquivo</b> e salve <b>meu-trailer.mp4</b> dentro de Aula11.',y)
y=step(3,'Espere terminar e abra o MP4.',
       'Acompanhe o painel <b>Trabalhos / Jobs</b>. Quando concluir, abra o MP4 pela pasta Aula11 e assista até o final, com fones.',y)
y=box('Pronto quando você consegue mostrar',
      'Os três clipes em sequência • Uma fusão • A foto com zoom visível • O MP4 com imagem e som conferidos. Cerca de 15 a 30 segundos é uma referência, não uma meta rígida.',y)
y=text('Se algo não deu certo',y,13,bold=True)-7
y=text('<b>Tela preta entre clipes:</b> procure um espaço vazio na linha do tempo.<br/>'
       '<b>Só saiu um clipe no MP4:</b> confira Origem = Linha do tempo.<br/>'
       '<b>Arquivo não encontrado ao reabrir:</b> mantenha a pasta Aula11 inteira.<br/>'
       '<b>Já terminou:</b> inverta o zoom (125% para 100%) ou troque a abertura.',y,11.5)-16
y=text('<b>Guarde Aula11 inteira.</b> Projeto, mídias e MP4 ficam juntos. Mostre na própria tela; não há relatório nem envio pela internet.',y,11.5)-16
text('Mídias: Caminandes 3: Llamigos (2016), Blender Foundation / Blender Institute, CC BY 3.0. Recortes para exercício; créditos completos em CREDITOS.txt.<br/>'
     'Referências técnicas: shotcut.org/tutorials/ e forum.shotcut.org/pub/size-position-rotate. Os nomes dos painéis podem variar com o idioma.',y,8.5,color=MUTED)
c.save()
print(OUT)
