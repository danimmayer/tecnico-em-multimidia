"""Gera mídia e ZIP da aula 13. Requer Python 3, ffmpeg e ffprobe.

Sem pacotes Python externos. Personagens e cenários são desenhos geométricos
próprios; a dupla de cor deriva do excerto CC BY já incluído na aula 11.
"""
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-13'
SOURCE = ROOT / 'modelos/producao-audiovisual/aula-11/media/02-encontro.mp4'


def run(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)


def drawing(background, rectangles):
    width, height = 640, 360
    pixels = bytearray(bytes(background) * width * height)
    for x, y, w, h, color in rectangles:
        row = bytes(color) * w
        for line in range(y, y + h):
            start = (line * width + x) * 3
            pixels[start:start + len(row)] = row
    return b'P6\n640 360\n255\n' + pixels


def build():
    if not SOURCE.is_file():
        raise SystemExit(f'Mídia de origem ausente: {SOURCE}')
    KIT.mkdir(parents=True, exist_ok=True)
    (KIT / 'telas').mkdir(exist_ok=True)
    green, navy, white, orange = (0, 220, 0), (20, 33, 61), (237, 239, 235), (252, 163, 17)
    # Robô de formas simples: detalhes pequenos permitem inspecionar o recorte.
    robot = [(315, 58, 10, 28, orange), (267, 85, 106, 72, white),
             (280, 100, 80, 40, navy), (292, 111, 12, 12, orange), (336, 111, 12, 12, orange),
             (307, 157, 26, 13, navy), (270, 170, 100, 100, white),
             (286, 192, 68, 46, orange), (238, 175, 20, 78, navy), (382, 175, 20, 78, navy),
             (232, 253, 32, 18, orange), (376, 253, 32, 18, orange),
             (280, 270, 25, 38, navy), (335, 270, 25, 38, navy),
             (269, 308, 39, 14, orange), (332, 308, 39, 14, orange)]
    scenes = {
        'personagem': drawing(green, robot),
        'cracha': drawing(green, robot + [(298, 201, 44, 28, green)]),
        'estudio': drawing((194, 212, 221), [(0, 275, 640, 85, (114, 138, 155)),
            (30, 30, 170, 210, navy), (44, 44, 142, 182, (52, 88, 110)),
            (435, 45, 145, 165, white), (448, 58, 119, 139, (162, 193, 202)),
            (430, 245, 160, 12, orange), (450, 257, 12, 55, navy), (560, 257, 12, 55, navy)]),
        'noite': drawing((12, 20, 40), [(60, 240, 70, 120, (25, 45, 67)),
            (140, 190, 110, 170, (30, 53, 76)), (410, 210, 90, 150, (25, 45, 67)),
            (510, 160, 70, 200, (30, 53, 76)), (70, 255, 10, 20, orange),
            (160, 215, 14, 22, orange), (200, 215, 14, 22, orange),
            (535, 185, 14, 22, orange), (500, 55, 32, 32, white)])
    }
    with tempfile.TemporaryDirectory(prefix='av13-') as tmp:
        tmp = Path(tmp)
        for name, data in scenes.items():
            (tmp / f'{name}.ppm').write_bytes(data)
        for source, target in [('estudio', 'cenario-estudio.png'), ('noite', 'cenario-noite.png')]:
            run('-i', tmp / f'{source}.ppm', '-vf', 'scale=1280:720:flags=neighbor', '-frames:v', 1, KIT / target)
        for source, target in [('personagem', 'personagem-verde.mp4'), ('cracha', 'personagem-cracha.mp4')]:
            # Um piscar periódico mantém o exercício temporal, sem mudar a cor do fundo.
            run('-loop', 1, '-framerate', 24, '-i', tmp / f'{source}.ppm', '-t', 6,
                '-vf', "drawbox=x=292:y=111:w=56:h=12:color=0x14213d:t=fill:enable='between(mod(t,2),1.8,1.95)',scale=1280:720:flags=neighbor",
                '-c:v', 'libx264', '-crf', 18, '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', KIT / target)
    run('-i', SOURCE, '-t', 6, '-vf', 'fps=24,scale=1280:720', '-an', '-c:v', 'libx264', '-crf', 22,
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', KIT / 'cor-referencia.mp4')
    run('-i', KIT / 'cor-referencia.mp4', '-vf', 'eq=brightness=-0.06:saturation=0.72,colorbalance=bs=0.12:bm=0.08',
        '-an', '-c:v', 'libx264', '-crf', 22, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', KIT / 'cor-alterada.mp4')
    # Quadros ilustrativos do mesmo material que a turma recebe.
    run('-i', KIT / 'personagem-verde.mp4', '-frames:v', 1, KIT / 'telas/chroma-original.jpg')
    for scene, target in [('estudio', 'chroma-composto.jpg'), ('noite', 'chroma-noite.jpg')]:
        run('-i', KIT / f'cenario-{scene}.png', '-i', KIT / 'personagem-verde.mp4',
            '-filter_complex', '[1:v]colorkey=0x00dc00:0.18:0.02[fg];[0:v][fg]overlay=shortest=1',
            '-frames:v', 1, KIT / 'telas' / target)
    for name in ['referencia', 'alterada']:
        run('-ss', 1, '-i', KIT / f'cor-{name}.mp4', '-frames:v', 1, KIT / f'telas/cor-{name}.jpg')
    files = ['COMECE-AQUI.txt', 'AJUDA.html', 'CREDITOS.txt', 'personagem-verde.mp4', 'personagem-cracha.mp4',
             'cenario-estudio.png', 'cenario-noite.png', 'cor-referencia.mp4', 'cor-alterada.mp4']
    for file in files:
        assert (KIT / file).stat().st_size > 0, file
    archive = KIT / 'Aula13-Shotcut.zip'
    partial = archive.with_suffix('.zip.tmp')
    with zipfile.ZipFile(partial, 'w', zipfile.ZIP_STORED) as z:
        for file in files:
            entry = zipfile.ZipInfo(f'Aula13-Shotcut/{file}', (2026, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            z.writestr(entry, (KIT / file).read_bytes())
    with zipfile.ZipFile(partial) as z:
        assert z.testzip() is None
    partial.replace(archive)
    manifest = {'zip': archive.name, 'bytes': archive.stat().st_size, 'files': []}
    for file in files:
        path = KIT / file
        item = {'name': file, 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
        if path.suffix == '.mp4':
            probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', str(path)]))
            video = next(s for s in probe['streams'] if s['codec_type'] == 'video')
            item.update(duration=float(probe['format']['duration']), width=video['width'], height=video['height'], fps=video['r_frame_rate'])
            assert item['duration'] == 6 and item['fps'] == '24/1'
        manifest['files'].append(item)
    (KIT / 'kit-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Kit aula 13: {archive.stat().st_size / 1e6:.2f} MB; 4 MP4 de 6 s, 2 PNG, instruções e créditos.')


if __name__ == '__main__':
    build()
