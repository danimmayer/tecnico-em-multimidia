"""Empacota a atividade da aula 12 e, opcionalmente, um pendrive offline completo.

Primeiro: gerar mídias, PDF e dados da aula pelos respectivos scripts.
python3 scripts/build-audiovisual-12-package.py
python3 scripts/build-audiovisual-12-package.py --portable /tmp/shotcut-win64-26.9.27.zip --output /tmp/Aula12-Pendrive
A saída completa deve ser uma pasta nova. O binário oficial fica fora do Git.
As cenas são as mesmas da aula 11 e são lidas da pasta da aula 11, sem cópia duplicada no repositório.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-12'
SCENES = ROOT / 'modelos/producao-audiovisual/aula-11/media'
PORTABLE_SHA = '1f8c50ce7b125a2f0dcb60777b358e86baf03b8515982612b6adae10a83d93a5'
PORTABLE_URL = 'https://sourceforge.net/projects/shotcut/files/v26.9.27/shotcut-win64-26.9.27.zip/download'


def student_files():
    """Pares (caminho dentro de Aula12, arquivo de origem)."""
    manifest = json.loads((KIT / 'kit-manifest.json').read_text(encoding='utf-8'))
    files = [(name, SCENES / name) for name in manifest['student_media']]
    files += [(f'grafismos/{name}', KIT / 'grafismos' / name) for name in manifest['graphics']]
    files += [(name, KIT / name) for name in ['COMECE-AQUI.txt', 'Guia-Aula12-Shotcut.pdf', 'CREDITOS.txt']]
    missing = [str(path) for _, path in files if not path.is_file()]
    if missing:
        raise SystemExit('Arquivos ausentes: ' + ', '.join(missing))
    return files


def build_student_zip():
    files = student_files()
    assert len(files) == 13
    with zipfile.ZipFile(KIT / 'Aula12-Shotcut.zip', 'w', zipfile.ZIP_STORED) as z:
        for name, path in files:
            entry = zipfile.ZipInfo(f'Aula12/{name}', date_time=(2026, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            entry.compress_type = zipfile.ZIP_STORED
            z.writestr(entry, path.read_bytes())
    return files


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


def build_pendrive(portable, out, files):
    out = out.resolve()
    if out == KIT or KIT in out.parents:
        raise ValueError('Escolha uma pasta de saída fora da pasta de materiais da aula 12.')
    assert not out.exists(), f'A saída já existe: {out}'
    assert hashlib.sha256(portable.read_bytes()).hexdigest() == PORTABLE_SHA, 'Checksum diferente do oficial'
    with zipfile.ZipFile(portable) as z:
        assert z.testzip() is None
        assert 'Shotcut/shotcut.exe' in z.namelist()
        assert all(n.startswith('Shotcut/') and '..' not in Path(n).parts for n in z.namelist())
        z.extractall(out / '01-SHOTCUT')
    student = out / '02-ALUNO/Aula12'
    for name, path in files:
        (student / name).parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, student / name)
    write(out / '01-SHOTCUT/ORIGEM-E-VERSAO.txt', f'''Shotcut Portable oficial 26.9.27 — Windows 10/11, Intel/AMD x64.
Página oficial: https://shotcut.org/download/
Arquivo: {PORTABLE_URL}
SHA-256 do ZIP original: {PORTABLE_SHA}
Checksum e integridade do ZIP conferidos. Pasta oficial extraída sem alterações.
Copiar Shotcut inteira; abrir shotcut.exe. Licenças originais preservadas.
Mesma versão da aula 11: se o posto já tem essa pasta em Documentos, não é preciso copiar de novo.
''')
    slides = out / '03-PROFESSOR/slides'
    slides.mkdir(parents=True)
    html = (ROOT / 'aula-kit.html').read_text()
    write(slides / 'aula-kit.html', html)
    for name in re.findall(r'(?:src|href)="(assets/[^"?]+)', html):
        target = slides / name
        target.parent.mkdir(exist_ok=True)
        shutil.copy2(ROOT / name, target)
    # Só a aula 12: a navegação offline não aponta para aulas ausentes.
    for filename, var in [('course-data.js', 'SENAI_COURSES'), ('course-support.js', 'SENAI_TEACHING_SUPPORT')]:
        source = (ROOT / 'assets' / filename).read_text()
        data = json.JSONDecoder().raw_decode(source[source.index('{'):])[0]
        course = data['producao-audiovisual']
        if isinstance(course['lessons'], list):
            course['lessons'] = [lesson for lesson in course['lessons'] if lesson['num'] == '12']
        else:
            course['lessons'] = {'12': course['lessons']['12']}
        write(slides / 'assets' / filename, f'window.{var} = ' + json.dumps({'producao-audiovisual': course}, ensure_ascii=False) + ';\n')
    # Copia o kit inteiro, inclusive o ZIP para o qual a página do kit aponta.
    shutil.copytree(KIT, slides / 'modelos/producao-audiovisual/aula-12')
    route = 'aula-kit.html?uc=producao-audiovisual&amp;aula=12'
    landing = f'''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Aula 12 offline</title><style>body{{font:22px system-ui;margin:60px;line-height:1.7}}a{{color:#9a4f0f}}</style><h1>Aula 12 · Grafismos, textos e máscaras</h1><p><a href="{route}">Abrir os slides</a></p><p><a href="modelos/producao-audiovisual/aula-12/Guia-Aula12-Shotcut.pdf">Abrir o guia PDF</a></p><p>Use as setas para avançar. O material funciona sem internet.</p></html>'''
    for name in ['index.html', 'uc-producao-audiovisual.html']:
        write(slides / name, landing)
    write(out / '03-PROFESSOR/ABRIR-SLIDES.html', landing.replace('href="', 'href="slides/'))
    examples = out / '03-PROFESSOR/EXEMPLOS'
    examples.mkdir()
    for path in KIT.glob('exemplo-*.mp4'):
        shutil.copy2(path, examples / path.name)
    shutil.copytree(KIT / 'telas', examples / 'telas')
    shutil.copy2(KIT / 'CREDITOS.txt', examples / 'CREDITOS.txt')
    write(out / '00-LEIA-PRIMEIRO.txt', '''AULA 12 — PENDRIVE PRONTO

Copie esta pasta Aula12-Pendrive inteira para o pendrive.

01-SHOTCUT/Shotcut: programa Portable oficial, já extraído (mesma versão da aula 11).
02-ALUNO/Aula12: 3 clipes, 2 fotos, 5 grafismos PNG, guia PDF e créditos.
03-PROFESSOR: slides offline, exemplos e telas de comparação.

EM CADA COMPUTADOR
1. Copie 02-ALUNO/Aula12 para Documentos.
2. Se ainda não houver Shotcut em Documentos, copie 01-SHOTCUT/Shotcut inteira.
3. Aguarde terminar. Abra Documentos/Shotcut/shotcut.exe.
4. Abra Documentos/Aula12/Guia-Aula12-Shotcut.pdf.
O pendrive pode seguir para outro posto depois das cópias.

PARA PROJETAR
Abra 03-PROFESSOR/ABRIR-SLIDES.html no navegador e clique em Abrir os slides.
Não é necessário servidor, conta, upload ou acesso à internet.

COMEÇO GUIADO
V1: 08-paisagem.mp4 → 02-encontro.mp4 → foto-fruta.jpg → tela de cor.
V4: grafismos/grade-guia.png sobre tudo; ocultar antes de exportar.
Título alinhado, faixa com o nome de Oti, legenda, palavra por trás de Koro
e assinatura com créditos. Salvar minha-abertura.mlt e exportar minha-abertura.mp4.
''')
    write(out / '03-PROFESSOR/LEIA-PROFESSOR.txt', '''CONDUÇÃO — AULA 12

Antes do lanche (19:00–19:45): janela flexível. Comparar título solto e
alinhado, funções dos textos e espaço livre das cenas apenas se houver tempo.
Pode usar toda a janela para copiar o Portable e preparar os postos.
Lanche: 19:45–20:05.

Depois do lanche: começar do zero, sem depender do trailer da aula 11.
20:05–21:00: trilhas V1 a V4, guia, título alinhado, faixa de Oti e legenda.
21:00–21:40: foto, palavra e foto de novo; Máscara: forma simples na cópia de cima.
21:40–22:10: assinatura com créditos, ocultar V4, exportar, corrigir e mostrar.

Demonstre uma ação e espere a turma repetir. Use as páginas 1 a 5 do guia.
Quem terminar faz a palavra atravessar com keyframes, cria a faixa de Koro
ou troca o pictograma. Tudo no mesmo projeto, sem novos arquivos.
Não há ficha, relatório, impressão nem envio coletivo pela internet.
As notas completas ficam no botão Notas dos slides.

Conferência no laboratório: abrir shotcut.exe, criar um texto em V2, aplicar
Máscara: forma simples em uma imagem de V3 e exportar um trecho.
Mídias: recortes de Caminandes 3: Llamigos, CC BY 3.0; créditos no kit.
Os exemplos são demonstrações visuais sem áudio.
''')
    entries = []
    for path in sorted(out.rglob('*')):
        if path.is_file():
            entries.append(hashlib.sha256(path.read_bytes()).hexdigest() + '  ' + path.relative_to(out).as_posix())
    write(out / 'CONFERENCIA-SHA256.txt', '\n'.join(entries) + '\n')
    print(f'Pendrive: {out}; {len(entries)} arquivos; {sum(p.stat().st_size for p in out.rglob("*") if p.is_file()) / 1e6:.1f} MB')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--portable', type=Path)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    if bool(args.portable) != bool(args.output):
        parser.error('--portable e --output devem ser usados juntos')
    files = build_student_zip()
    print('ZIP do aluno: 3 MP4, 2 fotos, 5 grafismos, PDF, instruções e créditos.')
    if args.portable:
        build_pendrive(args.portable.resolve(), args.output.resolve(), files)
