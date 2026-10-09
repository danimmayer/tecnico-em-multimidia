"""Recorta o kit local a partir do original CC BY indicado em CREDITOS.txt.

Uso: python3 scripts/build-audiovisual-11-media.py /caminho/llamigos.webm
Requer ffmpeg. O original fica fora do repositório; não há download em aula.
"""
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-11'
MEDIA = KIT / 'media'
SOURCE = Path(sys.argv[1]).resolve()
MEDIA.mkdir(parents=True, exist_ok=True)

clips = [
    ('01-gelo', 5, 7), ('02-encontro', 20, 7), ('03-trem', 30, 7),
    ('04-fruta', 45, 7), ('05-caverna', 55, 7), ('06-cesta', 72, 7),
    ('07-perseguicao', 87, 7), ('08-paisagem', 110, 7),
]

def run(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)

for name, start, duration in clips:
    run('-ss', start, '-i', SOURCE, '-t', duration,
        '-vf', 'scale=1280:720,fps=24,setsar=1', '-c:v', 'libx264', '-crf', 26,
        '-preset', 'fast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k',
        '-movflags', '+faststart', MEDIA / f'{name}.mp4')
    run('-ss', 2, '-i', MEDIA / f'{name}.mp4', '-frames:v', 1, '-update', 1, MEDIA / f'{name}.jpg')

run('-ss', 50, '-i', SOURCE, '-frames:v', 1, '-update', 1, MEDIA / 'foto-fruta.jpg')
run('-ss', 75, '-i', SOURCE, '-frames:v', 1, '-update', 1, MEDIA / 'foto-cesta.jpg')

# Exemplos sem áudio: permitem comparar apenas a passagem e o movimento.
for transition in ['cut', 'fade', 'wipeleft']:
    filt = ('[0:v]trim=duration=3,setpts=PTS-STARTPTS[a];'
            '[1:v]trim=duration=3,setpts=PTS-STARTPTS[b];')
    filt += '[a][b]concat=n=2:v=1:a=0[v]' if transition == 'cut' else f'[a][b]xfade=transition={transition}:duration=0.6:offset=2.4[v]'
    run('-i', MEDIA / '01-gelo.mp4', '-i', MEDIA / '02-encontro.mp4',
        '-filter_complex', filt, '-map', '[v]', '-an', '-c:v', 'libx264', '-crf', 27,
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', KIT / f'exemplo-{transition}.mp4')

run('-loop', 1, '-i', MEDIA / 'foto-fruta.jpg', '-vf',
    "scale=1920:1080,zoompan=z='1+0.25*on/143':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=144:s=1280x720:fps=24",
    '-frames:v', 144, '-an', '-c:v', 'libx264', '-crf', 24, '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', KIT / 'exemplo-zoom.mp4')

manifest = {'source': 'Caminandes 3: Llamigos (2016)',
            'source_sha256': hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
            'clips': [{'file': f'media/{name}.mp4', 'start': start, 'duration': duration}
                      for name, start, duration in clips]}
(KIT / 'media-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')

print(f'Mídias geradas: {len(clips)} clipes, duas fotos e quatro exemplos.')
print('Depois gere o guia PDF e execute scripts/build-audiovisual-11-package.py.')
