"""Gera grafismos, telas e exemplos da aula 12 a partir das mídias da aula 11.

Uso: python3 scripts/build-audiovisual-12-media.py
Requer ffmpeg, Pillow e as fontes Inter Display Black e Liberation Sans
(Liberation tem as mesmas medidas da Arial disponível no Windows do laboratório).
Os grafismos são criação própria; os quadros vêm de Caminandes 3: Llamigos, CC BY 3.0.
"""
import json
from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'modelos/producao-audiovisual/aula-11/media'
KIT = ROOT / 'modelos/producao-audiovisual/aula-12'
ART = KIT / 'grafismos'
SCREENS = KIT / 'telas'
W, H, FPS = 1280, 720, 24
FONTS = {
    'black': '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf',
    'bold': '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    'regular': '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
}
for path in [*FONTS.values(), SOURCE / '08-paisagem.mp4', SOURCE / '02-encontro.mp4', SOURCE / 'foto-fruta.jpg']:
    if not Path(path).is_file():
        raise SystemExit(f'Arquivo necessário ausente: {path}. Nenhuma mídia foi alterada.')

NAVY = (16, 32, 43)
ORANGE = (240, 146, 48)
GUIDE = (54, 224, 255)
WHITE = (255, 255, 255)
# Margem do texto: 10% da imagem em cada lado, a área segura para títulos.
LEFT, RIGHT, TOP, BOTTOM = 128, 1152, 72, 648


def font(kind, size):
    return ImageFont.truetype(FONTS[kind], size)


def canvas():
    return Image.new('RGBA', (W, H), (0, 0, 0, 0))


def save_png(image, name):
    ART.mkdir(parents=True, exist_ok=True)
    image.save(ART / name, optimize=True)


def frame_at(clip, seconds):
    raw = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-ss', str(seconds), '-i', str(SOURCE / clip),
                          '-frames:v', '1', '-vf', f'scale={W}:{H}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         check=True, capture_output=True).stdout
    return Image.frombytes('RGB', (W, H), raw).convert('RGBA')


def clip_frames(clip, start, duration):
    raw = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-ss', str(start), '-i', str(SOURCE / clip),
                          '-t', str(duration), '-vf', f'scale={W}:{H},fps={FPS}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         check=True, capture_output=True).stdout
    size = W * H * 3
    frames = [Image.frombytes('RGB', (W, H), raw[i:i + size]).convert('RGBA') for i in range(0, len(raw) - size + 1, size)]
    return frames[:round(duration * FPS)]


def photo():
    return Image.open(SOURCE / 'foto-fruta.jpg').convert('RGBA').resize((W, H), Image.LANCZOS)


def text(draw, xy, value, kind, size, fill=WHITE, anchor='la'):
    draw.text(xy, value, font=font(kind, size), fill=fill, anchor=anchor)


def shadowed(base, painter, blur=6, alpha=150):
    """Texto claro sobre imagem clara precisa de contorno suave para continuar legível."""
    layer = canvas()
    painter(ImageDraw.Draw(layer), WHITE)
    shadow = canvas()
    painter(ImageDraw.Draw(shadow), (0, 0, 0, alpha))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(Image.alpha_composite(base, shadow), layer)


def with_opacity(image, amount):
    if amount >= 1:
        return image
    faded = image.copy()
    faded.putalpha(faded.getchannel('A').point(lambda value: round(value * max(0, amount))))
    return faded


# ---------------------------------------------------------------- Grafismos

def guide_png():
    image = canvas()
    d = ImageDraw.Draw(image)
    soft, strong = GUIDE + (110,), GUIDE + (230,)
    for x in (W // 3, 2 * W // 3):
        for y in range(0, H, 18):
            d.line([(x, y), (x, y + 9)], fill=soft, width=2)
    for y in (H // 3, 2 * H // 3):
        for x in range(0, W, 18):
            d.line([(x, y), (x + 9, y)], fill=soft, width=2)
    d.rectangle([64, 36, 1216, 684], outline=soft, width=2)
    d.rectangle([LEFT, TOP, RIGHT, BOTTOM], outline=strong, width=3)
    d.line([(W // 2 - 18, H // 2), (W // 2 + 18, H // 2)], fill=strong, width=2)
    d.line([(W // 2, H // 2 - 18), (W // 2, H // 2 + 18)], fill=strong, width=2)
    label = font('bold', 18)
    d.text((LEFT + 10, TOP + 8), 'MARGEM DO TEXTO', font=label, fill=strong)
    d.text((70, 42), 'BORDA DE SEGURANÇA', font=label, fill=soft)
    d.text((LEFT + 10, BOTTOM - 28), 'GUIA · OCULTAR ANTES DE EXPORTAR', font=label, fill=strong)
    save_png(image, 'grade-guia.png')


LOWER = (712, 532, RIGHT, 628)  # Faixa encostada na margem direita do texto.


def lower_third_png():
    image = canvas()
    d = ImageDraw.Draw(image)
    x0, y0, x1, y1 = LOWER
    d.rectangle([x0, y0, x1, y1], fill=NAVY + (215,))
    d.rectangle([x0, y0, x0 + 10, y1], fill=ORANGE + (255,))
    save_png(image, 'faixa-inferior.png')


BADGE = (W // 2, 214, 74)  # centro x, centro y, raio


def pictogram_png(name, painter):
    scale = 4
    big = Image.new('RGBA', (W * scale, H * scale), (0, 0, 0, 0))
    d = ImageDraw.Draw(big)
    cx, cy, r = (value * scale for value in BADGE)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=WHITE, width=5 * scale)
    painter(d, cx, cy, r, scale)
    save_png(big.resize((W, H), Image.LANCZOS), name)


def paint_fruit(d, cx, cy, r, s):
    d.ellipse([cx - 32 * s, cy - 18 * s, cx + 32 * s, cy + 46 * s], fill=ORANGE)
    d.ellipse([cx - 18 * s, cy - 4 * s, cx - 4 * s, cy + 10 * s], fill=(255, 214, 160))
    d.line([(cx, cy - 18 * s), (cx + 6 * s, cy - 40 * s)], fill=WHITE, width=5 * s)
    d.ellipse([cx + 6 * s, cy - 50 * s, cx + 34 * s, cy - 32 * s], fill=WHITE)


def paint_flake(d, cx, cy, r, s):
    import math
    for step in range(6):
        angle = math.pi / 3 * step
        dx, dy = math.cos(angle), math.sin(angle)
        tip = (cx + 46 * s * dx, cy + 46 * s * dy)
        d.line([(cx, cy), tip], fill=WHITE, width=6 * s)
        for side in (-1, 1):
            branch = angle + side * math.pi / 4
            base = (cx + 26 * s * dx, cy + 26 * s * dy)
            d.line([base, (base[0] + 16 * s * math.cos(branch), base[1] + 16 * s * math.sin(branch))], fill=WHITE, width=5 * s)


def paint_heart(d, cx, cy, r, s):
    d.ellipse([cx - 40 * s, cy - 32 * s, cx + 2 * s, cy + 10 * s], fill=ORANGE)
    d.ellipse([cx - 2 * s, cy - 32 * s, cx + 40 * s, cy + 10 * s], fill=ORANGE)
    d.polygon([(cx - 38 * s, cy - 2 * s), (cx + 38 * s, cy - 2 * s), (cx, cy + 42 * s)], fill=ORANGE)


# ---------------------------------------------------------------- Composições de referência

TITLE = 'A ÚLTIMA FRUTA'


def title_aligned(d, fill):
    d.text((LEFT, 118), TITLE, font=font('black', 84), fill=fill)
    d.text((LEFT + 4, 216), 'Um trailer com Koro e Oti', font=font('bold', 34), fill=fill)


def title_loose(d, fill):
    d.text((470, 96), TITLE, font=font('black', 84), fill=fill)
    d.text((930, 330), 'Um trailer com Koro e Oti', font=font('bold', 34), fill=fill)


def lower_layer():
    layer = Image.open(ART / 'faixa-inferior.png').copy()
    d = ImageDraw.Draw(layer)
    x0, y0, _, _ = LOWER
    d.text((x0 + 34, y0 + 14), 'OTI', font=font('bold', 34), fill=WHITE)
    d.text((x0 + 34, y0 + 54), 'pinguim-de-magalhães', font=font('regular', 28), fill=WHITE)
    return layer


CAPTION = 'No inverno, sobrou uma fruta.'


def caption_layer():
    layer = canvas()
    d = ImageDraw.Draw(layer)
    face = font('bold', 36)
    left, top, right, bottom = d.textbbox((W // 2, 0), CAPTION, font=face, anchor='ma')
    pad, y = 14, 590
    d.rectangle([left - pad, y - pad + top, right + pad, y + bottom + pad], fill=(0, 0, 0, 175))
    d.text((W // 2, y), CAPTION, font=face, fill=WHITE, anchor='ma')
    return layer


BEHIND = 'LLAMIGOS'
# Elipse ajustada ao contorno superior da cabeça (centro x, centro y, raio x, raio y), girada 18°.
MASK_ELLIPSE = (470, 500, 340, 330)
MASK_ROTATION = 18


def behind_text(offset=0):
    layer = canvas()
    d = ImageDraw.Draw(layer)
    d.text((W // 2 + offset, 14), BEHIND, font=font('black', 196), fill=WHITE, anchor='ma')
    shadow = layer.copy()
    shadow.putalpha(shadow.getchannel('A').point(lambda value: value * 120 // 255))
    shadow = Image.composite(Image.new('RGBA', (W, H), (0, 0, 0, 120)), canvas(), shadow.getchannel('A')).filter(ImageFilter.GaussianBlur(5))
    return Image.alpha_composite(shadow, layer)


def head_mask():
    """Elipse suavizada, como uma máscara de forma com borda suave."""
    mask = Image.new('L', (W, H), 0)
    cx, cy, rx, ry = MASK_ELLIPSE
    ImageDraw.Draw(mask).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)
    return mask.rotate(-MASK_ROTATION, resample=Image.BICUBIC, center=(cx, cy)).filter(ImageFilter.GaussianBlur(6))


def behind_frame(base, offset=0, masked=True, opacity=1.0):
    image = Image.alpha_composite(base, with_opacity(behind_text(offset), opacity))
    if masked:
        image.paste(base, (0, 0), head_mask())
    return image


# Recorte da foto na moldura circular: o mesmo gesto do pedido 6 no Canva.
FRAME = (W // 2, 196, 96)  # centro x, centro y, raio
FRAME_FOCUS = (760, 420)  # focinho e fruta, em coordenadas da foto 1280 × 720


def framed_photo():
    cx, cy, r = FRAME
    fx, fy = FRAME_FOCUS
    side = 2 * r
    crop = photo().crop((fx - 240, fy - 240, fx + 240, fy + 240)).resize((side, side), Image.LANCZOS)
    scale = 4
    mask = Image.new('L', (side * scale, side * scale), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, side * scale - 1, side * scale - 1], fill=255)
    layer = canvas()
    layer.paste(crop, (cx - r, cy - r), mask.resize((side, side), Image.LANCZOS))
    ring = Image.new('RGBA', (W * scale, H * scale), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse([(cx - r) * scale, (cy - r) * scale, (cx + r) * scale, (cy + r) * scale], outline=WHITE, width=4 * scale)
    return Image.alpha_composite(layer, ring.resize((W, H), Image.LANCZOS))


def end_card():
    image = Image.new('RGBA', (W, H), NAVY + (255,))
    image = Image.alpha_composite(image, framed_photo())
    d = ImageDraw.Draw(image)
    d.text((W // 2, 322), TITLE, font=font('black', 72), fill=WHITE, anchor='ma')
    d.text((W // 2, 430), 'Remontagem: Turma de Multimídia · SENAI 2026', font=font('bold', 28), fill=WHITE, anchor='ma')
    # Crédito completo: o MP4 pode circular sem CREDITOS.txt.
    d.text((W // 2, 474), 'Imagens: Caminandes 3: Llamigos, Blender Foundation, editadas · CC BY 3.0', font=font('regular', 24), fill=(200, 214, 222), anchor='ma')
    d.text((W // 2, 510), 'creativecommons.org/licenses/by/3.0', font=font('regular', 24), fill=(200, 214, 222), anchor='ma')
    return image


def ramp(t, start, length=0.5):
    return max(0.0, min(1.0, (t - start) / length))


def window(t, start, end, fade=0.4):
    return min(ramp(t, start, fade), 1 - ramp(t, end - fade, fade))


def encode(frames, name):
    process = subprocess.Popen(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
                                '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-an', '-c:v', 'libx264', '-crf', '24',
                                '-preset', 'fast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(KIT / name)],
                               stdin=subprocess.PIPE)
    count = 0
    for frame in frames:
        process.stdin.write(frame.convert('RGB').tobytes())
        count += 1
    process.stdin.close()
    if process.wait():
        raise SystemExit(f'Falha ao gerar {name}')
    return count


def opening_frames():
    title = shadowed(canvas(), title_aligned)
    lower = lower_layer()
    caption = caption_layer()
    for index, frame in enumerate(clip_frames('08-paisagem.mp4', 0.4, 4.4)):
        yield Image.alpha_composite(frame, with_opacity(title, ramp(index / FPS, 0.5)))
    for index, frame in enumerate(clip_frames('02-encontro.mp4', 1.6, 5.0)):
        t = index / FPS
        frame = Image.alpha_composite(frame, with_opacity(lower, window(t, 0.3, 2.9)))
        yield Image.alpha_composite(frame, with_opacity(caption, window(t, 3.0, 5.0, 0.2)))
    base = photo()
    for index in range(round(4.2 * FPS)):
        yield behind_frame(base, opacity=ramp(index / FPS, 0.3, 0.6))
    card = end_card()
    for index in range(round(3.6 * FPS)):
        yield card


def mask_frames():
    base = photo()
    total = round(5 * FPS)
    for index in range(total):
        # O texto atravessa a cabeça da esquerda para a direita, sempre por trás.
        yield behind_frame(base, offset=round(-260 + 520 * index / (total - 1)))


def build():
    KIT.mkdir(parents=True, exist_ok=True)
    SCREENS.mkdir(parents=True, exist_ok=True)
    guide_png()
    lower_third_png()
    pictogram_png('picto-fruta.png', paint_fruit)
    pictogram_png('picto-floco.png', paint_flake)
    pictogram_png('picto-coracao.png', paint_heart)

    landscape = frame_at('08-paisagem.mp4', 3.0)
    meeting = frame_at('02-encontro.mp4', 2.6)
    still = photo()
    shots = {
        'titulo-solto.jpg': shadowed(landscape, title_loose),
        'titulo-alinhado.jpg': shadowed(landscape, title_aligned),
        'faixa.jpg': Image.alpha_composite(meeting, lower_layer()),
        'legenda.jpg': Image.alpha_composite(meeting, caption_layer()),
        'colisao.jpg': Image.alpha_composite(Image.alpha_composite(meeting, lower_layer()), caption_layer()),
        'mascara-sem.jpg': behind_frame(still, masked=False),
        'mascara-com.jpg': behind_frame(still),
        'guia-sobre-cena.jpg': Image.alpha_composite(shadowed(landscape, title_aligned), Image.open(ART / 'grade-guia.png')),
        'assinatura.jpg': end_card(),
        'cena-paisagem.jpg': landscape,
        'cena-encontro.jpg': meeting,
        'cena-foto.jpg': still,
    }
    for name, image in shots.items():
        image.convert('RGB').save(SCREENS / name, quality=86, optimize=True)

    frames = {'exemplo-abertura.mp4': encode(opening_frames(), 'exemplo-abertura.mp4'),
              'exemplo-mascara.mp4': encode(mask_frames(), 'exemplo-mascara.mp4')}
    # Preserva a seção student_kit, escrita por scripts/build-audiovisual-12-package.py.
    previous = KIT / 'kit-manifest.json'
    manifest = json.loads(previous.read_text(encoding='utf-8')) if previous.is_file() else {}
    manifest |= {
        'source': 'Caminandes 3: Llamigos (2016) · mídias da aula 11',
        'student_media': ['08-paisagem.mp4', '02-encontro.mp4', '04-fruta.mp4', 'foto-fruta.jpg'],
        'graphics': sorted(path.name for path in ART.glob('*.png')),
        'examples': {name: round(count / FPS, 2) for name, count in frames.items()},
        'screens': sorted(shots),
    }
    (KIT / 'kit-manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Aula 12: {len(manifest["graphics"])} grafismos, {len(shots)} telas e {len(frames)} exemplos.')
    print('Depois execute scripts/build-audiovisual-12-package.py para gerar o ZIP do aluno.')


if __name__ == '__main__':
    build()
