"""Empacota o kit leve do aluno da aula 12 para enviar ao Canva no navegador.

Primeiro: gerar telas e exemplos com scripts/build-audiovisual-12-media.py (opcional;
o ZIP só usa as mídias da aula 11 e os textos desta aula).
python3 scripts/build-audiovisual-12-package.py
As cenas são as mesmas da aula 11 e são lidas da pasta da aula 11, sem recompressão
e sem cópia duplicada no repositório.
O ZIP é reproduzível: ordem fixa, data fixa, permissões fixas e nenhum metadado do macOS.
Também atualiza a seção student_kit de kit-manifest.json com tamanhos e MD5.
"""
import hashlib
import json
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / 'modelos/producao-audiovisual/aula-12'
SCENES = ROOT / 'modelos/producao-audiovisual/aula-11/media'
ZIP_NAME = 'Aula12-Canva.zip'
FOLDER = 'Aula12-Canva'
# Ordem fixa dentro do ZIP: primeiro as instruções, depois as mídias, por fim os créditos.
MEDIA = ['08-paisagem.mp4', '02-encontro.mp4', '04-fruta.mp4', 'foto-fruta.jpg']
TEXTS = ['COMECE-AQUI.txt', 'CREDITOS.txt']
FIXED_DATE = (2026, 1, 1, 0, 0, 0)


def student_files():
    """Pares (caminho dentro de Aula12-Canva, arquivo de origem)."""
    files = [('COMECE-AQUI.txt', KIT / 'COMECE-AQUI.txt')]
    files += [(name, SCENES / name) for name in MEDIA]
    files += [('CREDITOS.txt', KIT / 'CREDITOS.txt')]
    missing = [str(path) for _, path in files if not path.is_file() or path.stat().st_size == 0]
    if missing:
        raise SystemExit('Arquivos ausentes ou vazios: ' + ', '.join(missing) + '. Nenhum ZIP foi gerado.')
    credits = (KIT / 'CREDITOS.txt').read_text(encoding='utf-8')
    for required in ['Caminandes 3: Llamigos', 'Blender Foundation', 'creativecommons.org/licenses/by/3.0/']:
        if required not in credits:
            raise SystemExit(f'CREDITOS.txt sem "{required}". Nenhum ZIP foi gerado.')
    return files


def build_student_zip():
    files = student_files()
    assert len(files) == len(MEDIA) + len(TEXTS) == 6
    target = KIT / ZIP_NAME
    # Grava em arquivo temporário e só substitui o ZIP quando tudo deu certo.
    partial = target.with_suffix('.zip.tmp')
    with zipfile.ZipFile(partial, 'w', zipfile.ZIP_STORED) as z:
        for name, path in files:
            entry = zipfile.ZipInfo(f'{FOLDER}/{name}', date_time=FIXED_DATE)
            entry.create_system = 3
            entry.external_attr = 0o100644 << 16
            entry.compress_type = zipfile.ZIP_STORED
            z.writestr(entry, path.read_bytes())
    with zipfile.ZipFile(partial) as z:
        assert z.testzip() is None
        assert z.namelist() == [f'{FOLDER}/{name}' for name, _ in files]
    partial.replace(target)
    return target, files


def md5(path):
    return hashlib.md5(path.read_bytes()).hexdigest()


def update_manifest(target, files):
    path = KIT / 'kit-manifest.json'
    manifest = json.loads(path.read_text(encoding='utf-8')) if path.is_file() else {}
    manifest['student_media'] = MEDIA
    manifest['student_kit'] = {
        'zip': ZIP_NAME,
        'folder': FOLDER,
        'bytes': target.stat().st_size,
        'md5': md5(target),
        'files': [{'name': name, 'bytes': source.stat().st_size, 'md5': md5(source)} for name, source in files],
    }
    path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')


if __name__ == '__main__':
    target, files = build_student_zip()
    update_manifest(target, files)
    print(f'ZIP do aluno: {target.relative_to(ROOT)}; 3 MP4, 1 foto, instruções e créditos; '
          f'{target.stat().st_size / 1e6:.2f} MB; md5 {md5(target)}')
