"""Gera cena, camadas de som e ZIP da aula 14. Requer Python 3, numpy, ffmpeg e piper.

Uso:
  python3 scripts/build-audiovisual-14-kit.py --piper /caminho/piper --voz /caminho/pt_BR-faber-medium.onnx
  python3 scripts/build-audiovisual-14-kit.py --so-pacote   # só refaz sons.js, ZIP e manifesto

Use --so-pacote depois de editar mesa.html, buffering.html, AJUDA.html ou os TXT:
as mídias já geradas são mantidas.

A locução é sintetizada com Piper (código MIT) e a voz pt_BR faber, treinada
com dados CC0. Trilha, ambiência e efeitos são sínteses próprias em numpy.
As imagens vêm dos excertos CC BY de Caminandes 3 já incluídos na aula 11.
"""
import argparse
import base64
import hashlib
import json
from pathlib import Path
import subprocess
import tempfile
import wave
import zipfile

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-14'
MEDIA11 = ROOT / 'modelos/producao-audiovisual/aula-11/media'
SR = 48000
DUR = 30.0
N = int(SR * DUR)
FONT = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
rng = np.random.default_rng(14)

# Cena de 30 s: quatro excertos e uma assinatura final.
CLIPS = [
    {'label': 'Paisagem', 'file': '08-paisagem.mp4', 'start': 0, 'end': 7},
    {'label': 'Gelo', 'file': '01-gelo.mp4', 'start': 7, 'end': 13},
    {'label': 'Encontro', 'file': '02-encontro.mp4', 'start': 13, 'end': 19},
    {'label': 'Perseguição', 'file': '07-perseguicao.mp4', 'start': 19, 'end': 25},
    {'label': 'Assinatura', 'file': None, 'start': 25, 'end': 30},
]
# A fala 3 foi "gravada longe do microfone": entra 10 dB abaixo das outras.
FALAS = [
    {'id': 'F1', 'at': 1.0, 'gain_db': 0, 'text': 'No fim do mundo, onde a neve não acaba, mora o Koro.'},
    {'id': 'F2', 'at': 7.7, 'gain_db': 0, 'text': 'Ele só pensa em uma coisa: a última fruta da estação.'},
    {'id': 'F3', 'at': 13.7, 'gain_db': -10, 'text': 'Para chegar lá, vai precisar de um amigo improvável.'},
    {'id': 'F4', 'at': 25.9, 'gain_db': 0, 'text': 'A última fruta. Em breve, na mostra da turma.'},
]
# Mixagem de referência do professor, usada no exemplo-mixado.mp4 e nas notas.
REFERENCIA = {'voz_db': 0, 'falas_db': [0, 0, 10, 0], 'passa_alta': 120, 'presenca_db': 3, 'vaos': True,
              'trilha_db': -9, 'abaixar_db': -12, 'entrada': True, 'saida': True,
              'ambiencia_db': -4, 'efeitos_db': -3, 'master_db': -2}

t = np.arange(N) / SR


def run(*args):
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', *map(str, args)], check=True)


def db(value):
    return 10 ** (value / 20)


def band(x, lo=None, hi=None, slope=1.0):
    """Filtro suave no domínio da frequência: rápido e sem dependências."""
    spectrum = np.fft.rfft(x)
    freqs = np.fft.rfftfreq(len(x), 1 / SR)
    mask = np.ones_like(freqs)
    if lo:
        mask *= 1 / (1 + (lo / np.maximum(freqs, 1e-3)) ** (4 * slope))
    if hi:
        mask *= 1 / (1 + (freqs / hi) ** (4 * slope))
    return np.fft.irfft(spectrum * mask, len(x))


def noise(n, color='white'):
    white = rng.standard_normal(n)
    if color == 'white':
        return white
    spectrum = np.fft.rfft(white)
    freqs = np.maximum(np.fft.rfftfreq(n, 1 / SR), 20)
    spectrum /= np.sqrt(freqs) if color == 'pink' else freqs
    out = np.fft.irfft(spectrum, n)
    return out / np.max(np.abs(out))


def place(track, signal, at, gain=1.0, pan=0.0):
    """Coloca um som mono em uma trilha estéreo (2, N)."""
    start = int(at * SR)
    end = min(N, start + len(signal))
    if end <= start:
        return
    left, right = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    track[0, start:end] += signal[:end - start] * gain * left * np.sqrt(2)
    track[1, start:end] += signal[:end - start] * gain * right * np.sqrt(2)


def env(n, attack, release):
    out = np.ones(n)
    a, r = max(1, int(attack * SR)), max(1, int(release * SR))
    out[:a] = np.linspace(0, 1, a)
    out[-r:] *= np.linspace(1, 0, r)
    return out


def hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def read_wav(path):
    with wave.open(str(path)) as w:
        data = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
        rate = w.getframerate()
    # Reamostra de 22.050 Hz para 48 kHz por interpolação linear (voz limitada a 11 kHz).
    positions = np.arange(0, len(data) - 1, rate / SR)
    return np.interp(positions, np.arange(len(data)), data)


def write_wav(path, stereo):
    pcm = (np.clip(stereo.T, -1, 1) * 32767).astype('<i2')
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


# ---------- Locução com ruído do ar-condicionado e da rua ----------
def build_voice(piper, model, tmp):
    track = np.zeros((2, N))
    segments = []
    for fala in FALAS:
        path = tmp / f"{fala['id']}.wav"
        subprocess.run([piper, '-m', model, '--length-scale', '1.25', '-f', str(path)],
                       input=fala['text'].encode(), check=True, capture_output=True)
        voice = read_wav(path)
        voice = voice / np.max(np.abs(voice)) * db(-6) * db(fala['gain_db'])
        # Corta o silêncio do sintetizador para marcar o trecho real da fala.
        active = np.nonzero(np.abs(voice) > 0.01)[0]
        voice = voice[max(0, active[0] - 600):active[-1] + 2400]
        place(track, voice, fala['at'])
        segments.append({'id': fala['id'], 'start': round(fala['at'] - 0.15, 2),
                         'end': round(fala['at'] + len(voice) / SR + 0.15, 2), 'text': fala['text']})
    assert segments[-1]['end'] < DUR - 0.2, 'A última fala precisa terminar antes do fim da cena'
    # Ruído contínuo: zumbido de 60 Hz, ronco grave da rua (com um carro passando) e chiado leve.
    hum = 0.022 * np.sin(2 * np.pi * 60 * t) + 0.005 * np.sin(2 * np.pi * 120 * t + 0.4) + 0.002 * np.sin(2 * np.pi * 180 * t)
    car = 1 + 2.2 * np.exp(-((t - 15.6) / 1.6) ** 2)
    rumble = band(noise(N, 'brown'), 25, 160) * 0.05 * car
    hiss = band(noise(N), 5000, None) * 0.0018
    floor = hum + rumble + hiss
    track += floor
    return track, segments


# ---------- Trilha: biblioteca cortada no meio, começa e termina sem transição ----------
CHORDS = {'Am': [57, 60, 64], 'F': [53, 57, 60], 'C': [48, 52, 55], 'G': [55, 59, 62], 'E': [52, 56, 59]}
PROGRESSION = ['Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'G', 'Am', 'E', 'Am', 'F']
BEAT = 60 / 96
BAR = 4 * BEAT


def pad(freq, seconds):
    n = int(seconds * SR)
    x = np.arange(n) / SR
    out = np.zeros(n)
    for k in range(1, 9):
        for detune in (0.9985, 1.0015):
            out += np.sin(2 * np.pi * freq * detune * k * x + k) / k ** 1.6
    return out * env(n, 0.05, 0.3)


def pluck(freq, seconds=0.7):
    n = int(seconds * SR)
    x = np.arange(n) / SR
    out = sum(np.sin(2 * np.pi * freq * k * x) * np.exp(-x * (4 + 2.5 * k)) / k ** 1.2 for k in range(1, 7))
    return out * env(n, 0.003, 0.05)


def kick(seconds=0.4, top=120):
    n = int(seconds * SR)
    x = np.arange(n) / SR
    phase = 2 * np.pi * np.cumsum(45 + (top - 45) * np.exp(-x / 0.03)) / SR
    return np.sin(phase) * np.exp(-x / 0.12)


def build_music():
    track = np.zeros((2, N))
    shaker = band(noise(int(0.06 * SR)), 6000, None)
    shaker *= np.exp(-np.arange(len(shaker)) / SR / 0.018) / np.max(np.abs(shaker))
    for bar, name in enumerate(PROGRESSION):
        start = bar * BAR
        notes = CHORDS[name]
        for i, note in enumerate(notes):
            place(track, pad(hz(note), BAR + 0.3), start, 0.05, pan=(i - 1) * 0.5)
        place(track, pad(hz(notes[0] - 12), BAR + 0.3), start, 0.05)
        arp = [notes[0], notes[1], notes[2], notes[0] + 12, notes[2], notes[1], notes[2], notes[0] + 12]
        for step, note in enumerate(arp):
            place(track, pluck(hz(note + 12)), start + step * BEAT / 2, 0.08, pan=0.35 if step % 2 else -0.35)
        for beat in range(4):
            place(track, pluck(hz(notes[0] - 24), 0.5) * 1.4, start + beat * BEAT, 0.09)
            place(track, shaker, start + beat * BEAT + BEAT / 2, 0.045, pan=0.2)
            # Na perseguição a batida dobra; fora dela, bumbo nos tempos 1 e 3.
            if 8 <= bar <= 9 or beat in (0, 2):
                place(track, kick(), start + beat * BEAT, 0.42)
    return track / np.max(np.abs(track)) * db(-1)


# ---------- Ambiência: mar distante, depois vento na neve ----------
def build_ambience():
    track = np.zeros((2, N))
    waves_mask = np.clip((8.5 - t) / 2, 0, 1)
    for channel in range(2):
        wind = band(noise(N, 'pink'), 180, 2400)
        wind /= np.max(np.abs(wind))
        gust = 0.55 + 0.3 * np.sin(2 * np.pi * 0.11 * t + channel) + 0.15 * np.sin(2 * np.pi * 0.37 * t + 2 * channel)
        sea = band(noise(N, 'pink'), 60, 700)
        sea /= np.max(np.abs(sea))
        swell = 0.5 + 0.5 * np.sin(2 * np.pi * t / 3.6 + channel * 0.8) ** 2
        track[channel] = wind * gust * 0.16 * (0.6 + 0.4 * (1 - waves_mask)) + sea * swell * 0.22 * waves_mask
    return track


# ---------- Efeitos: passos, brilho, surpresa, deslocamentos e impacto final ----------
def crunch():
    n = int(0.14 * SR)
    grains = (rng.random(n) < 0.08) * rng.standard_normal(n)
    return band(grains, 700, 5200) * np.exp(-np.arange(n) / SR / 0.05) * 3


def sparkle():
    n = int(1.3 * SR)
    x = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * 1320 * r * x) * np.exp(-x * (2.5 + r)) / (1 + i) for i, r in enumerate([1, 2.76, 5.4, 8.93])) * env(n, 0.004, 0.1)


def pop():
    n = int(0.16 * SR)
    x = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(300 + 4200 * x) / SR) * np.exp(-x / 0.05)


def whoosh():
    n = int(0.75 * SR)
    shape = np.sin(np.linspace(0, np.pi, n)) ** 2
    return band(rng.standard_normal(n), 300, 2800) * shape * 0.6


def impact():
    n = int(2.2 * SR)
    x = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(48 + 70 * np.exp(-x / 0.05)) / SR) * np.exp(-x / 0.5)
    crash = band(rng.standard_normal(n), 3500, None) * np.exp(-x / 0.7) * 0.25
    return boom + crash


def build_effects():
    track = np.zeros((2, N))
    for i, at in enumerate([7.3, 7.8, 8.3, 8.8, 9.3]):
        place(track, crunch(), at, 0.5, pan=-0.2 + 0.1 * i)
    place(track, sparkle(), 11.2, 0.22, pan=0.4)
    place(track, pop(), 13.25, 0.3, pan=-0.1)
    for at, pan in [(19.0, -0.6), (21.4, 0.6), (23.6, -0.3)]:
        place(track, whoosh(), at, 0.7, pan=pan)
    for i, at in enumerate(np.arange(19.3, 24.8, 0.24)):
        place(track, crunch(), at, 0.28, pan=0.3 if i % 2 else -0.3)
    place(track, impact(), 25.0, 0.8)
    return track


# ---------- Mixagem de referência (mesma lógica da mesa) ----------
def envelope_voice(segments, falas_db, vaos):
    out = np.full(N, 0.0 if vaos else 1.0)
    for segment, gain in zip(segments, falas_db):
        a, b = int(segment['start'] * SR), int(segment['end'] * SR)
        out[a:b] = db(gain)
    # Rampas de 60 ms evitam estalos nas bordas.
    kernel = np.ones(int(0.06 * SR)) / int(0.06 * SR)
    return np.convolve(out, kernel, mode='same')


def envelope_music(segments, duck_db, entrada, saida):
    out = np.ones(N)
    if duck_db:
        for segment in segments:
            a, b = int((segment['start'] - 0.3) * SR), int((segment['end'] + 0.4) * SR)
            out[max(0, a):b] = db(duck_db)
        kernel = np.ones(int(0.25 * SR)) / int(0.25 * SR)
        out = np.convolve(out, kernel, mode='same')
    if entrada:
        out *= np.clip(t / 2.0, 0, 1)
    if saida:
        out *= np.clip((DUR - t) / 3.0, 0, 1)
    return out


def reference_mix(stems, segments, tmp):
    ref = REFERENCIA
    voice = stems['voz'] * envelope_voice(segments, ref['falas_db'], ref['vaos'])
    write_wav(tmp / 'voz-env.wav', voice)
    run('-i', tmp / 'voz-env.wav', '-af',
        f"highpass=f={ref['passa_alta']}:p=2,highpass=f={ref['passa_alta']}:p=2,equalizer=f=3000:t=q:w=1:g={ref['presenca_db']}",
        tmp / 'voz-tratada.wav')
    with wave.open(str(tmp / 'voz-tratada.wav')) as w:
        voice = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(float).reshape(-1, 2).T / 32768
    music = stems['trilha'] * envelope_music(segments, ref['abaixar_db'], ref['entrada'], ref['saida'])
    mix = (voice[:, :N] * db(ref['voz_db']) + music * db(ref['trilha_db'])
           + stems['ambiencia'] * db(ref['ambiencia_db']) + stems['efeitos'] * db(ref['efeitos_db'])) * db(ref['master_db'])
    peak = 20 * np.log10(np.max(np.abs(mix)))
    assert peak <= -1, f'Mixagem de referência com pico {peak:.1f} dBFS'
    return mix, voice


def build_media(piper, model):
    KIT.mkdir(parents=True, exist_ok=True)
    for folder in ['trilhas', 'telas']:
        (KIT / folder).mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='av14-') as tmp:
        tmp = Path(tmp)
        voice, segments = build_voice(piper, model, tmp)
        stems = {'voz': voice, 'trilha': build_music(), 'ambiencia': build_ambience(), 'efeitos': build_effects()}
        stems['efeitos'] *= db(-3) / np.max(np.abs(stems['efeitos']))
        stems['ambiencia'] *= db(-12) / np.max(np.abs(stems['ambiencia']))
        for name, stem in stems.items():
            write_wav(tmp / f'{name}.wav', stem)
            bitrate = '96k' if name in ('voz', 'efeitos') else '128k'
            run('-i', tmp / f'{name}.wav', '-c:a', 'libmp3lame', '-b:a', bitrate, '-map_metadata', -1, KIT / 'trilhas' / f'{name}.mp3')

        # Cena muda em 720p/24 fps; a mesa toca o som por cima.
        parts = []
        for index, clip in enumerate(CLIPS):
            part = tmp / f'parte{index}.mp4'
            seconds = clip['end'] - clip['start']
            if clip['file']:
                run('-i', MEDIA11 / clip['file'], '-t', seconds, '-an', '-vf', 'fps=24,scale=1280:720,setsar=1',
                    '-c:v', 'libx264', '-crf', 24, '-pix_fmt', 'yuv420p', part)
            else:
                text = (f"drawtext=fontfile={FONT}:text='A ÚLTIMA FRUTA':fontcolor=0xf7b866:fontsize=86:x=(w-tw)/2:y=h/2-90,"
                        f"drawtext=fontfile={FONT}:text='Em breve na mostra da turma':fontcolor=0xf5efe2:fontsize=40:x=(w-tw)/2:y=h/2+20,"
                        f"drawtext=fontfile={FONT}:text='Imagens de Caminandes 3 · Blender Foundation · CC BY 3.0':fontcolor=0x9fb4c0:fontsize=24:x=(w-tw)/2:y=h-70,"
                        "fade=t=in:st=0:d=0.5")
                run('-f', 'lavfi', '-i', f'color=c=0x10202b:s=1280x720:r=24:d={seconds}', '-vf', text,
                    '-c:v', 'libx264', '-crf', 24, '-pix_fmt', 'yuv420p', part)
            parts.append(part)
        (tmp / 'lista.txt').write_text(''.join(f"file '{part}'\n" for part in parts))
        run('-f', 'concat', '-safe', 0, '-i', tmp / 'lista.txt', '-c', 'copy', '-movflags', '+faststart', KIT / 'cena.mp4')

        mix, treated_voice = reference_mix(stems, segments, tmp)
        write_wav(tmp / 'mix.wav', mix)
        run('-i', KIT / 'cena.mp4', '-i', tmp / 'mix.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
            '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', KIT / 'exemplo-mixado.mp4')

        # Espectrogramas da voz para o slide: antes e depois do tratamento.
        write_wav(tmp / 'voz-depois.wav', treated_voice[:, :N])
        for source, target in [(tmp / 'voz.wav', 'voz-antes.jpg'), (tmp / 'voz-depois.wav', 'voz-depois.jpg')]:
            run('-i', source, '-lavfi', 'aformat=channel_layouts=mono,showspectrumpic=s=1280x560:legend=0:stop=4000:color=fire:scale=log:fscale=log:gain=2',
                '-frames:v', 1, '-update', 1, tmp / 'espectro.png')
            run('-i', tmp / 'espectro.png', '-vf', 'pad=1280:720:0:80:color=0x10202b', '-q:v', 3, KIT / 'telas' / target)
        run('-ss', 2, '-i', KIT / 'cena.mp4', '-frames:v', 1, '-q:v', 3, KIT / 'telas/cena.jpg')
    return segments


def package(segments):
    # Dados da mesa: carregados por <script>, funcionam ao abrir mesa.html direto do disco.
    data = {'duration': DUR, 'sampleRate': SR, 'clips': [{k: c[k] for k in ('label', 'start', 'end')} for c in CLIPS],
            'falas': segments, 'stems': {}}
    for name in ['voz', 'trilha', 'ambiencia', 'efeitos']:
        data['stems'][name] = 'data:audio/mpeg;base64,' + base64.b64encode((KIT / 'trilhas' / f'{name}.mp3').read_bytes()).decode()
    (KIT / 'sons.js').write_text('/* Gerado por scripts/build-audiovisual-14-kit.py. */\nwindow.AULA14_SONS = '
                                 + json.dumps(data, ensure_ascii=False) + ';\n', encoding='utf-8')

    files = ['COMECE-AQUI.txt', 'CREDITOS.txt', 'AJUDA.html', 'mesa.html', 'sons.js', 'buffering.html', 'cena.mp4',
             'trilhas/voz.mp3', 'trilhas/trilha.mp3', 'trilhas/ambiencia.mp3', 'trilhas/efeitos.mp3']
    for file in files:
        assert (KIT / file).stat().st_size > 0, file
    archive = KIT / 'Aula14-Som.zip'
    partial = archive.with_suffix('.zip.tmp')
    with zipfile.ZipFile(partial, 'w', zipfile.ZIP_STORED) as z:
        for file in files:
            entry = zipfile.ZipInfo(f'Aula14-Som/{file}', (2026, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            z.writestr(entry, (KIT / file).read_bytes())
    with zipfile.ZipFile(partial) as z:
        assert z.testzip() is None
    partial.replace(archive)
    manifest = {'zip': archive.name, 'bytes': archive.stat().st_size, 'duration': DUR, 'falas': segments,
                'referencia': REFERENCIA, 'files': []}
    for file in files:
        path = KIT / file
        item = {'name': file, 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
        if path.suffix in ('.mp4', '.mp3'):
            probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-of', 'json', str(path)]))
            item['duration'] = round(float(probe['format']['duration']), 2)
        manifest['files'].append(item)
    (KIT / 'kit-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Kit aula 14: {archive.stat().st_size / 1e6:.2f} MB; cena de 30 s, quatro camadas, mesa e laboratório de espera.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--piper')
    parser.add_argument('--voz')
    parser.add_argument('--so-pacote', action='store_true')
    args = parser.parse_args()
    if args.so_pacote:
        package(json.loads((KIT / 'kit-manifest.json').read_text(encoding='utf-8'))['falas'])
    elif args.piper and args.voz:
        package(build_media(args.piper, args.voz))
    else:
        parser.error('informe --piper e --voz, ou use --so-pacote')
