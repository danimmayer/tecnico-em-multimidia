"""Gera os quatro renders da oficina a partir do original CC BY.

Uso: python3 scripts/build-audiovisual-16-media.py /caminho/llamigos.webm
O endereço e a licença do original estão no CREDITOS.txt da oficina.
"""

import argparse
import hashlib
from pathlib import Path
import subprocess


KIT = Path(__file__).resolve().parents[1] / 'modelos/producao-audiovisual/aula-16'
SOURCE_SHA256 = '0fa2c62bc28e5f93ce6fed296efce050b22f0d5d57b568b2c2d4d5345685f1e7'
PROFILES = (
    ('trecho-projecao.mp4', 1080, 12_000),
    ('trecho-1080-compacto.mp4', 1080, 1_000),
    ('trecho-web.mp4', 720, 3_000),
    ('trecho-720-compacto.mp4', 720, 450),
)


def ffmpeg(*args):
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)],
        check=True,
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    source = parser.parse_args().source
    if hashlib.sha256(source.read_bytes()).hexdigest() != SOURCE_SHA256:
        parser.error('Use o arquivo original Caminandes 3: Llamigos indicado nos créditos.')

    KIT.mkdir(parents=True, exist_ok=True)
    for filename, height, bitrate in PROFILES:
        # CBR deixa os quatro orçamentos visíveis tanto no quadro quanto no disco.
        ffmpeg(
            '-ss', 86, '-i', source, '-t', 12, '-map', '0:v:0', '-map', '0:a:0',
            '-vf', f'scale=-2:{height}:flags=lanczos,setsar=1',
            '-c:v', 'libx264', '-preset', 'fast', '-pix_fmt', 'yuv420p',
            '-b:v', f'{bitrate}k', '-minrate', f'{bitrate}k', '-maxrate', f'{bitrate}k',
            '-bufsize', f'{bitrate}k', '-x264-params', 'nal-hrd=cbr',
            '-g', 48, '-threads', 4, '-c:a', 'aac', '-b:a', '128k', '-ar', 48_000,
            '-ac', 2, '-movflags', '+faststart', KIT / filename,
        )
    ffmpeg(
        '-ss', 90, '-i', source, '-frames:v', 1, '-vf', 'scale=960:540',
        '-q:v', 3, '-update', 1, KIT / 'trecho-poster.jpg',
    )


if __name__ == '__main__':
    main()
