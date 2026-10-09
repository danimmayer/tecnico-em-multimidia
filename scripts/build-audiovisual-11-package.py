"""Empacota a atividade e, opcionalmente, um pendrive offline completo.

Primeiro: gerar mídias, PDF e dados da aula pelos respectivos scripts.
python3 scripts/build-audiovisual-11-package.py
python3 scripts/build-audiovisual-11-package.py --portable /tmp/shotcut-win64-26.9.27.zip --output /tmp/Aula11-Pendrive
A saída completa deve ser uma pasta nova. O binário oficial fica fora do Git.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-11'
PORTABLE_SHA = '1f8c50ce7b125a2f0dcb60777b358e86baf03b8515982612b6adae10a83d93a5'
PORTABLE_URL = 'https://sourceforge.net/projects/shotcut/files/v26.9.27/shotcut-win64-26.9.27.zip/download'

def student_files():
    return sorted((KIT/'media').glob('*.mp4')) + sorted((KIT/'media').glob('foto-*.jpg')) + [KIT/n for n in ['COMECE-AQUI.txt', 'Guia-Aula11-Shotcut.pdf', 'CREDITOS.txt']]

def build_student_zip():
    files = student_files()
    assert len(files) == 13 and all(p.is_file() for p in files)
    with zipfile.ZipFile(KIT/'Aula11-Shotcut.zip', 'w', zipfile.ZIP_STORED) as z:
        for path in files:
            entry = zipfile.ZipInfo(f'Aula11/{path.name}', date_time=(2026, 1, 1, 0, 0, 0))
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            entry.compress_type = zipfile.ZIP_STORED
            z.writestr(entry, path.read_bytes())
    return files

def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')

def build_pendrive(portable, out, files):
    assert not out.exists(), f'A saída já existe: {out}'
    assert hashlib.sha256(portable.read_bytes()).hexdigest() == PORTABLE_SHA, 'Checksum diferente do oficial'
    with zipfile.ZipFile(portable) as z:
        assert z.testzip() is None
        assert 'Shotcut/shotcut.exe' in z.namelist()
        assert all(n.startswith('Shotcut/') and '..' not in Path(n).parts for n in z.namelist())
        z.extractall(out/'01-SHOTCUT')
    student = out/'02-ALUNO/Aula11'
    student.mkdir(parents=True)
    for p in files:
        shutil.copy2(p, student/p.name)
    write(out/'01-SHOTCUT/ORIGEM-E-VERSAO.txt', f'''Shotcut Portable oficial 26.9.27 — Windows 10/11, Intel/AMD x64.
Página oficial: https://shotcut.org/download/
Arquivo: {PORTABLE_URL}
SHA-256 do ZIP original: {PORTABLE_SHA}
Checksum e integridade do ZIP conferidos. Pasta oficial extraída sem alterações.
Copiar Shotcut inteira; abrir shotcut.exe. Licenças originais preservadas.
Preparado em macOS: abertura e exportação no Windows do laboratório ainda precisam ser conferidas.
''')
    slides = out/'03-PROFESSOR/slides'
    slides.mkdir(parents=True)
    html = (ROOT/'aula-kit.html').read_text()
    write(slides/'aula-kit.html', html)
    for name in re.findall(r'(?:src|href)="(assets/[^"?]+)', html):
        target=slides/name
        target.parent.mkdir(exist_ok=True)
        shutil.copy2(ROOT/name, target)
    # Só a aula 11: a navegação offline não aponta para aulas ausentes.
    for filename, var in [('course-data.js','SENAI_COURSES'),('course-support.js','SENAI_TEACHING_SUPPORT')]:
        source=(ROOT/'assets'/filename).read_text()
        data=json.JSONDecoder().raw_decode(source[source.index('{'):])[0]
        course=data['producao-audiovisual']
        if isinstance(course['lessons'], list):
            course['lessons']=[lesson for lesson in course['lessons'] if lesson['num']=='11']
        else:
            course['lessons']={'11':course['lessons']['11']}
        write(slides/'assets'/filename, f'window.{var} = '+json.dumps({'producao-audiovisual':course},ensure_ascii=False)+';\n')
    shutil.copytree(KIT, slides/'modelos/producao-audiovisual/aula-11')
    route='aula-kit.html?uc=producao-audiovisual&amp;aula=11'
    landing=f'''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Aula 11 offline</title><style>body{{font:22px system-ui;margin:60px;line-height:1.7}}a{{color:#17634e}}</style><h1>Aula 11 · Shotcut</h1><p><a href="{route}">Abrir os slides</a></p><p><a href="modelos/producao-audiovisual/aula-11/Guia-Aula11-Shotcut.pdf">Abrir o guia PDF</a></p><p>Use as setas para avançar. O material funciona sem internet.</p></html>'''
    for name in ['index.html','uc-producao-audiovisual.html']:
        write(slides/name,landing)
    write(out/'03-PROFESSOR/ABRIR-SLIDES.html',landing.replace('href="','href="slides/'))
    examples=out/'03-PROFESSOR/EXEMPLOS'
    examples.mkdir()
    for p in KIT.glob('exemplo-*.mp4'):
        shutil.copy2(p, examples/p.name)
    shutil.copy2(KIT/'CREDITOS.txt',examples/'CREDITOS.txt')
    write(out/'00-LEIA-PRIMEIRO.txt', '''AULA 11 — PENDRIVE PRONTO

Copie esta pasta Aula11-Pendrive inteira para o pendrive.

01-SHOTCUT/Shotcut: programa Portable oficial, já extraído.
02-ALUNO/Aula11: atividade, 8 clipes, 2 fotos, guia PDF e créditos.
03-PROFESSOR: slides offline, exemplos e orientação de condução.

EM CADA COMPUTADOR
1. Copie 02-ALUNO/Aula11 para Documentos.
2. Se ainda não houver Shotcut, copie 01-SHOTCUT/Shotcut inteira para Documentos.
3. Aguarde terminar. Abra Documentos/Shotcut/shotcut.exe.
4. Abra Documentos/Aula11/Guia-Aula11-Shotcut.pdf.
O pendrive pode seguir para outro posto depois das cópias.

PARA PROJETAR
Abra 03-PROFESSOR/ABRIR-SLIDES.html no navegador e clique em Abrir os slides.
Preferencialmente copie 03-PROFESSOR para o computador do professor também.
Não é necessário servidor, conta, upload ou acesso à internet.

COMEÇO GUIADO
02-encontro.mp4 → 04-fruta.mp4 → 03-trem.mp4.
Uma fusão entre os primeiros clipes; foto-fruta.jpg ao final com zoom 100% → 125%.
Salvar meu-trailer.mlt e exportar meu-trailer.mp4 dentro de Aula11.
''')
    write(out/'03-PROFESSOR/LEIA-PROFESSOR.txt', '''CONDUÇÃO — AULA 11

Antes do lanche (19:00–19:45): janela flexível. Mostrar exemplos e conhecer
as cenas apenas se houver tempo. Pode usar toda a janela para copiar o
Portable e preparar os postos. Se já estiver tudo pronto, antecipar a montagem.
Lanche: 19:45–20:05.

Depois do lanche: começar do zero, sem depender de arquivos antigos.
20:05–21:00: copiar/abrir, três clipes, uma fusão e reprodução. Varredura opcional.
21:00–21:40: filtro fixo, foto com dois keyframes, reprodução e ajuste.
21:40–22:10: exportar, assistir, corrigir e mostrar no próprio posto.

Demonstre uma ação e espere a turma repetir. Use as páginas 1 a 5 do guia.
Quem terminar tenta outra ordem, inverte o zoom ou cria um terceiro keyframe.
As extensões acontecem no mesmo projeto, sem novos arquivos de comprovação.
A duração de 15 a 30 segundos é referência; o foco é conseguir editar.
Não há ficha, relatório, impressão nem envio coletivo pela internet.
As notas completas ficam no botão Notas dos slides.

Se possível, distribuir as cópias antes da turma; um único pendrive pode
virar fila. Com mais pendrives ou rede local disponível, distribuir uma vez
e editar no disco local. Não abrir projetos dependentes de um pendrive que
será retirado. Não é preciso copiar a pasta do professor para os alunos.

Conferência no laboratório: abrir shotcut.exe, importar um MP4 do kit e
exportar um trecho. A distribuição foi verificada em macOS, não executada
nos computadores Windows. Se houver bloqueio, pedir apoio ao laboratório;
usar temporariamente um posto funcional com revezamento.

Mídias: recortes de Caminandes 3: Llamigos, CC BY 3.0; créditos no kit.
Os quatro exemplos são demonstrações visuais sem áudio.
''')
    entries=[]
    for path in sorted(out.rglob('*')):
        if path.is_file():
            entries.append(hashlib.sha256(path.read_bytes()).hexdigest()+'  '+path.relative_to(out).as_posix())
    write(out/'CONFERENCIA-SHA256.txt','\n'.join(entries)+'\n')
    print(f'Pendrive: {out}; {len(entries)} arquivos; {sum(p.stat().st_size for p in out.rglob("*") if p.is_file())/1e6:.1f} MB')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--portable',type=Path)
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    if bool(args.portable) != bool(args.output):
        parser.error('--portable e --output devem ser usados juntos')
    files=build_student_zip()
    print('ZIP do aluno: 8 MP4, 2 fotos, PDF, instruções e créditos.')
    if args.portable:
        build_pendrive(args.portable.resolve(),args.output.resolve(),files)
