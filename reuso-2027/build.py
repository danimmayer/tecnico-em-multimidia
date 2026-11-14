#!/usr/bin/env python3
"""Compila autoria privada; apenas dados discentes ficam no repositório."""
import argparse
import copy
import hashlib
import html
import json
import re
import shutil
import subprocess
import unicodedata
from pathlib import Path
from urllib.parse import unquote, urlsplit

from bs4 import BeautifulSoup
from PIL import Image

HERE = Path(__file__).resolve().parent
REPO = HERE.parent
EXPECTED = {"design-web": 29, "producao-audiovisual": 23, "fotografia": 12}
PRIVATE_KEYS = {"teacher", "officialTitle", "sourceNote"}
IMAGE_BACKGROUNDS = {}
TRACKED_PATHS = subprocess.check_output(["git", "ls-files", "-z"], cwd=REPO).decode().split("\0")


def canonical_resource(relative):
    relative = unquote(urlsplit(relative).path).removeprefix("/recursos/")
    if relative in TRACKED_PATHS:
        return relative
    key = unicodedata.normalize("NFC", relative).casefold()
    matches = [p for p in TRACKED_PATHS if unicodedata.normalize("NFC", p).casefold() == key]
    assert len(matches) == 1, ("Nome de recurso ausente ou ambíguo no Git", relative)
    return matches[0]


def image_background(relative):
    if relative in IMAGE_BACKGROUNDS:
        return IMAGE_BACKGROUNDS[relative]
    path = REPO / unquote(relative)
    result = "clear"
    try:
        with Image.open(path) as image:
            thumb = image.convert("RGBA")
            thumb.thumbnail((80, 80))
            pixels = list(thumb.get_flattened_data())
            transparent = any(p[3] < 240 for p in pixels)
            opaque = [p for p in pixels if p[3] > 240]
            if transparent:
                # A white-only transparent diagram needs its intentional dark support.
                if opaque and sum(sum(p[:3])/3 > 200 for p in opaque)/len(opaque) > .8:
                    result = "dark"
            else:
                corners = [thumb.getpixel(p) for p in ((0, 0), (thumb.width-1, 0), (0, thumb.height-1), (thumb.width-1, thumb.height-1))]
                if all(max(p[:3]) < 55 for p in corners):
                    result = "dark"
                elif all(min(p[:3]) > 220 for p in corners):
                    result = "white"
    except (OSError, ValueError):
        pass
    IMAGE_BACKGROUNDS[relative] = result
    return result


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    temporary.replace(path)


def public_data(value):
    if isinstance(value, dict):
        return {k: public_data(v) for k, v in value.items() if k not in PRIVATE_KEYS}
    if isinstance(value, list):
        return [public_data(v) for v in value]
    return value


def validate(course):
    slug = course["slug"]
    lessons = course["lessons"]
    assert [l["id"] for l in lessons] == [f"{i:02}" for i in range(1, EXPECTED[slug]+1)], slug
    assert course["sourceNote"].strip(), slug
    for l in lessons:
        label = f'{slug}/{l["id"]}'
        for field in ("title", "officialTitle", "objective", "context", "mission", "deliverable", "grouping", "previous", "individualEvidence"):
            assert isinstance(l.get(field), str) and l[field].strip(), (label, field)
        assert 2 <= len(l["concepts"]) <= 4, (label, "concepts")
        assert 3 <= len(l["criteria"]) <= 4, (label, "criteria")
        assert len(l["stages"]) == 6, (label, "stages")
        assert len(l["extensions"]) >= 6, (label, "extensions")
        for entry in l["criteria"]:
            assert all(entry.get(k, "").strip() for k in ("id", "label", "sufficient", "insufficient", "evidence")), label
            assert entry["sufficient"] != entry["insufficient"], label
        for entry in l["stages"]:
            assert all(entry.get(k, "").strip() for k in ("title", "action", "where", "check", "output")), label
        for entry in l["extensions"]:
            assert all(entry.get(k, "").strip() for k in ("title", "action", "output", "check")), label
        expected_minutes = 60 if slug == "producao-audiovisual" and l["id"] == "23" else 160
        assert sum(s["minutes"] for s in l["stages"]) == expected_minutes, (label, "minutes")
        assert l["durationMinutes"] in (60, 180, 200, 210), (label, "durationMinutes")
        for k in ("source", "capacity", "coverage", "planResources", "observe", "checkpoint", "closing", "next"):
            assert l["teacher"].get(k), (label, "teacher", k)
        items = l["workspace"]["items"]
        assert 1 <= len(items) <= 80, (label, "items")
        assert len(set(x["id"] for x in items)) == len(items), label
        assert all(isinstance(x.get("title"), str) and isinstance(x.get("text"), str) for x in items), label
        assert all(not x.get("target") or x["target"] in {p["id"] for p in items} for x in items), (label, "targets")
        if l.get("assessment"):
            assessment = l["assessment"]
            assert isinstance(assessment, dict) and assessment.get("title") and assessment.get("instructions"), (label, "assessment")
            assert assessment.get("items") and all(q.get("id") and q.get("question") and q.get("options") for q in assessment["items"]), (label, "assessment items")
        rubric = l["teacher"].get("integratorRubric")
        if rubric:
            assert len(rubric["capacities"]) == 7, (label, "rubric capacities")
            for capacity in rubric["capacities"]:
                assert capacity["capacity"] and len(capacity["criteria"]) == 3, (label, "rubric criteria")
                assert all(all(c.get(k) for k in ("id", "label", "sufficient", "insufficient", "evidence")) for c in capacity["criteria"]), (label, "rubric evidence")
        if slug == "fotografia":
            assert l["deliveryMode"] == "slides", label


def new_slide(soup, title, blocks, identifier):
    section = soup.new_tag("div", attrs={"class": "slide reuso-slide", "data-title": title, "data-bloco": "reuso", "data-reuso": identifier})
    inner = soup.new_tag("div", attrs={"class": "slide-inner"})
    header = soup.new_tag("div", attrs={"class": "slide-header"})
    eyebrow = soup.new_tag("p", attrs={"class": "reuso-eyebrow"})
    eyebrow.string = "FOTOGRAFIA / EDIÇÃO DE REUSO"
    h2 = soup.new_tag("h2")
    h2.string = title
    header.extend([eyebrow, h2])
    body = soup.new_tag("div", attrs={"class": "slide-body reuso-body"})
    for label, text in blocks:
        p = soup.new_tag("p")
        if label:
            strong = soup.new_tag("strong")
            strong.string = label + " "
            p.append(strong)
        p.append(str(text))
        body.append(p)
    inner.extend([header, body])
    section.append(inner)
    return section


PHOTO_STYLE = """
/* Tema de projeção: fundos e textos revistos, mídia original intocada. */
:root{--accent:#70541c;--accent-dim:#70541c;--accent-bg:#eee7d6;--dark:#faf8f0;--dark-2:#f4f0e5;--dark-card:#eee8db;--dark-card-2:#e7dfcd;--cream:#1b241d;--cream-muted:#354437;--muted:#4f594e;--border:#b9b2a0;--green:#285b3a;--red:#8a3030;--blue:#315674;--amber:#7b4d08}
body,.slide{background:#faf8f0;color:#1b241d}
.slide-header h1,.slide-header h2,h1,h2,h3,h4{color:#1b241d}
.slide .t-eyebrow{color:var(--accent)!important}
.slide-body{overflow:auto;min-height:0;scrollbar-width:thin}
.slide-inner{padding-bottom:62px}
.slide p,.slide li{color:inherit}
.slide [style*="color:#fff"],.slide [style*="color: #fff"],.slide [style*="color:white"]{color:#1b241d!important}
.slide [style*="background:#1"],.slide [style*="background: #1"],.slide [style*="background:#2"],.slide [style*="background: #2"]{background:#e9e3d5!important;color:#1b241d}
.slide img.reuso-dark-matte{background:#191919!important}
.slide img.reuso-clear-matte{background:transparent!important}
.slide img.reuso-white-matte{background:#fff!important}
.slide img{max-width:100%;object-fit:contain}
#bottomBar{background:#f4f0e5;color:#354437;border-color:#b9b2a0}
#bottomBar .bar-left img{filter:brightness(.25);opacity:1}
#bottomBar button{color:#354437;opacity:1}
.p-semiotic-toggle{background:#eee7d6!important;color:#4b3812!important;border-color:#70541c!important}
.reuso-body{justify-content:flex-start;gap:18px;max-width:1100px;padding-top:18px}
.reuso-body p{font:clamp(22px,2.1vw,30px)/1.45 'Segoe UI',system-ui,sans-serif;max-width:72ch;margin:0}
.reuso-body strong{color:#70541c}
.reuso-eyebrow{font:700 13px/1.4 system-ui;letter-spacing:.13em;color:#70541c;margin-bottom:12px}
.reuso-slide h2{font-size:clamp(30px,4vw,52px);line-height:1.15}
.reuso-slide .slide-inner{overflow:auto}
.reuso-image-body{align-items:center;justify-content:center;gap:12px}
.reuso-image-body img{display:block;max-height:57vh;max-width:95%;flex:0 1 auto;min-height:0}
.reuso-image-body p{font-size:18px;line-height:1.35}
.slide[data-title="O Sensor Digital"] .img-frame{height:110px!important}
.slide[data-title="O Sensor Digital"] .two-col>div:last-child{gap:8px!important}
.sensor-rect span{background:#faf8f0!important;color:#1b241d!important}
.slide[data-title="Padrão Bayer"] .styled li{margin-bottom:10px;line-height:1.35}
.slide[data-title="Padrão Bayer"] .highlight-box{padding:10px 16px;line-height:1.35}
.slide[data-title="Padrão Bayer"] .bayer-grid{grid-template-columns:repeat(8,28px);grid-template-rows:repeat(8,28px)}
.slide[data-title="Padrão Bayer"] .bayer-rgb{height:190px;width:224px}
.slide[data-title="O Pixel"] .pixel-frame{height:340px}
.slide[data-title="Metadados EXIF"] .exif-photo{height:330px}
.slide[data-title="Metadados EXIF"] .exif-photo figcaption{color:#fff!important;background:#191919}
.slide[data-title="Metadados EXIF"] .exif-table{background:#eee8db!important}
.slide[data-title="O Triângulo de Exposição"] .slide-body{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center}
.slide[data-title="O Triângulo de Exposição"] .triangle-hero{margin:0!important}
.slide[data-title="O Triângulo de Exposição"] .triangle-hero img{width:100%;height:auto;max-height:440px;object-fit:contain}
.slide[data-title="O Triângulo de Exposição"] .two-col{display:flex;flex-direction:column;gap:18px;height:auto}
.p-expand .p-expand-body{display:none}.p-expand.reuso-open .p-expand-body{display:block}.p-expand-head{cursor:pointer}
@media(max-width:800px){.slide-inner{padding:30px 24px 65px}.reuso-body p{font-size:20px}.slide[data-title="O Triângulo de Exposição"] .slide-body{display:flex;flex-direction:column}}
@media print{.slide{position:relative;opacity:1;display:flex;height:auto;min-height:95vh;break-after:page;pointer-events:auto}.slide-inner,.slide-body{overflow:visible}#bottomBar,#progressBar{display:none}}
"""


def photo_deck(lesson, output, revision):
    originals = sorted(REPO.glob(f'Aula_{lesson["id"]}_*.html'))
    originals = [p for p in originals if not any(x in p.name for x in ("Gabarito", "Ficha", "Banca"))]
    assert len(originals) == 1, originals
    original = originals[0]
    soup = BeautifulSoup(original.read_text(), "html.parser")
    original_images = [canonical_resource(img["src"]) for img in soup.select(".slide img[src]") if img["src"]]
    slides = soup.select(".slide")
    assert slides, original
    first = slides[0]
    parent = first.parent
    # Unmatched or missing mapping must fail rather than silently retaining stale activities.
    mapping = revision.get(lesson["id"], lesson["teacher"].get("slideRevision", {}))
    replace_titles = set(mapping.get("replaceTitles", []))
    assert replace_titles, f'Falta revisão dos slides originais de Fotografia {lesson["id"]}'
    found = {s.get("data-title") for s in slides}
    assert replace_titles <= found, (lesson["id"], replace_titles - found)
    source_html = original.read_text()
    for correction in mapping.get("theoryReplacements", []):
        old, new = correction["old"], correction["new"]
        assert old in source_html, (lesson["id"], "Correção teórica não encontrada", old)
        source_html = source_html.replace(old, new)
    soup = BeautifulSoup(source_html, "html.parser")
    slides = soup.select(".slide")
    parent = slides[0].parent
    removed_images = []
    for slide in slides:
        slide["class"] = [c for c in slide.get("class", []) if c != "active"]
        if slide.get("data-title") in replace_titles:
            removed_images.extend(copy.copy(img) for img in slide.select("img"))
            slide.decompose()
    retained = soup.select(".slide")
    anchor = retained[0] if retained else None
    intro = [
        new_slide(soup, lesson["title"], [("Situação:", lesson["context"]), ("Desafio:", lesson["mission"])], "missao"),
        new_slide(soup, "O que produzir", [("Entrega:", lesson["deliverable"]), ("Organização:", lesson["grouping"])], "entrega"),
        new_slide(soup, lesson["stages"][0]["title"], [("Faça:", lesson["stages"][0]["action"]), ("Onde:", lesson["stages"][0]["where"]), ("Confira:", lesson["stages"][0]["check"])], "diagnostico"),
        new_slide(soup, "Como vamos trabalhar", [("Até 19h45:", "retomada, exemplo e planejamento. Teoria visual por perguntas e comparações, sem leitura corrida dos slides."), ("19h45–20h05:", "intervalo de referência."), ("20h05–22h:", "produção, comparação, melhoria e evidência individual."), ("22h–22h20:", "somente consolidação opcional do que já foi trabalhado. Sem conteúdo, critério, nota ou entrega novos.")], "tempo"),
    ]
    for new in intro:
        if anchor:
            anchor.insert_before(new)
        else:
            parent.append(new)
    tail = []
    # Include activity references absent from the original presentation as well.
    for i, image in enumerate(lesson.get("gallery", [])):
        if image["path"] in original_images:
            continue
        visual = new_slide(soup, image["title"], [], f"image-activite-{i}")
        body = visual.select_one(".slide-body")
        body["class"].append("reuso-image-body")
        body.append(soup.new_tag("img", src=image["path"], alt=image["title"]))
        caption = soup.new_tag("p")
        caption.string = "Referência para a atividade: " + Path(image["path"]).name
        body.append(caption)
        tail.append(visual)
    # Every supplied example is also projected: the external editor is optional.
    seeds = lesson["workspace"]["items"]
    for i in range(0, len(seeds), 2):
        tail.append(new_slide(soup, lesson["workspace"]["title"], [(item["title"] + ":", item["text"]) for item in seeds[i:i+2]], f"insumos-{i}"))
    seed_texts = {item["text"] for item in seeds}
    cases = [c for c in lesson.get("cases", []) if c.get("text") not in seed_texts]
    for i in range(0, len(cases), 2):
        tail.append(new_slide(soup, "Situações para analisar", [(c["title"] + ":", c["text"]) for c in cases[i:i+2]], f"casos-{i}"))
    assessment = lesson.get("assessment")
    if assessment:
        tail.append(new_slide(soup, assessment["title"], [("Como fazer:", assessment["instructions"])], "avaliacao-instrucoes"))
        for item in assessment["items"]:
            tail.append(new_slide(soup, "Questão " + item["id"], [("", item["question"])] + [("", option) for option in item["options"]], "questao-" + item["id"]))
    for c in lesson["criteria"]:
        tail.append(new_slide(soup, c["label"], [("Atende:", c["sufficient"]), ("Ainda precisa melhorar:", c["insufficient"]), ("Confira no trabalho:", c["evidence"])], c["id"]))
    tail.append(new_slide(soup, lesson["starter"]["title"], [("Primeiro passo:", lesson["starter"]["instruction"]), ("Depois:", "continue pelas etapas seguintes; o exemplo não resolve a entrega inteira.")], "exemplo"))
    model = lesson["stages"][1]
    tail.append(new_slide(soup, model["title"], [("Faça:", model["action"]), ("Onde:", model["where"]), ("Confira:", model["check"]), ("Resultado:", model["output"])], model["id"]))
    for s in lesson["stages"][2:]:
        tail.append(new_slide(soup, s["title"], [("Faça:", s["action"]), ("Onde:", s["where"]), ("Confira:", s["check"]), ("Resultado:", s["output"])], s["id"]))
    tail.append(new_slide(soup, "Cada pessoa mostra sua parte", [("Demonstre:", lesson["individualEvidence"])], "individual"))
    tail.append(new_slide(soup, "Uma ajuda para retomar", [("Faça:", lesson["recovery"]["action"]), ("Confira:", lesson["recovery"]["check"])], "recuperacao"))
    for i, x in enumerate(lesson["extensions"]):
        tail.append(new_slide(soup, x["title"], [("Rodada de 10–15 min:", x["action"]), ("Resultado:", x["output"]), ("Confira:", x["check"]), ("Repita:", "mude a restrição indicada e compare novamente; após 22h, apenas consolidação opcional.")], f"reserva-{i}"))
    for key, title in (("offline", "Sem internet"), ("solo", "Sem dupla"), ("equipment", "Sem o equipamento previsto")):
        tail.append(new_slide(soup, title, [("Alternativa:", lesson["fallback"][key])], "alternativa-" + key))
    tail.append(new_slide(soup, "Guardar, explicar e encerrar", [("Guarde:", lesson["deliverable"]), ("Explique:", lesson["individualEvidence"]), ("Até 22h:", "conclua a entrega essencial e a devolutiva. Depois desse horário, retome ou varie o mesmo trabalho sem nova avaliação.")], "encerramento"))
    # Keep original illustrations even when their old task text is superseded.
    for i, img in enumerate(removed_images):
        visual = new_slide(soup, "Referências visuais preservadas", [], f"referencias-{i}")
        body = visual.select_one(".slide-body")
        body["class"].append("reuso-image-body")
        img["style"] = "max-height:57vh;max-width:95%;object-fit:contain"
        body.append(img)
        tail.insert(0, visual)
    last = soup.select(".slide")[-1]
    for new in tail:
        last.insert_after(new)
        last = new
    for img in soup.select("img[src]"):
        src = img["src"]
        if not src:
            del img["src"]
            continue
        if urlsplit(src).scheme or src.startswith("data:"):
            continue
        relative = canonical_resource(src)
        img["src"] = "/recursos/" + relative
        matte = image_background(relative)
        if relative in mapping.get("darkMattePaths", []):
            matte = "dark"
        if relative in mapping.get("clearMattePaths", []):
            matte = "clear"
        if img.find_parent(id="bottomBar"):
            matte = "clear"
        IMAGE_BACKGROUNDS[relative] = matte
        img["class"] = img.get("class", []) + [f"reuso-{matte}-matte"]
    # Inline colors from dark originals cannot override the projection palette.
    for tag in soup.select(".slide [style]"):
        if tag.name in ("img", "svg", "path"):
            continue
        inline = tag.get("style", "")
        inline = re.sub(r"(?<![-\w])color\s*:[^;]+;?", "color:inherit;", inline)
        inline = re.sub(r"(?<![-\w])background(?:-color)?\s*:\s*(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))\s*;?", "background:var(--dark-card);", inline)
        tag["style"] = inline
    for tag in soup.select("[href],script[src],link[href]"):
        attr = "src" if tag.name == "script" else "href"
        val = tag.get(attr, "")
        if val.startswith("assets/pedagogy"):
            source = REPO / urlsplit(val).path
            if tag.name == "link":
                tag.name = "style"
                tag.attrs = {}
                tag.string = source.read_text()
            else:
                script = source.read_text()
                if source.name == "pedagogy.js":
                    start = script.index("  function init() {")
                    end = script.index("  // Expose", start)
                    script = script[:start] + """  function init() {
    initSemiotic(); initCompares(); initTimelines();
    document.querySelectorAll('.p-expand-head').forEach(head => {
      head.tabIndex=0;head.setAttribute('role','button');head.setAttribute('aria-expanded','false');
      const toggle=()=>{const open=head.parentElement.classList.toggle('reuso-open');head.setAttribute('aria-expanded',String(open));};
      head.addEventListener('click',toggle);head.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
    });
  }

""" + script[end:]
                tag.attrs = {}
                tag.string = script
        elif val.startswith(("assets/", "imagens/")):
            tag[attr] = "/recursos/" + val
        elif val.startswith("Aula_") and tag.name == "a":
            tag.name = "span"
            tag.attrs.pop("href", None)
    style = soup.new_tag("style")
    style.string = PHOTO_STYLE
    soup.head.append(style)
    soup.select(".slide")[0]["class"].append("active")
    projected = [img.get("src", "").removeprefix("/recursos/") for img in soup.select(".slide img")]
    assert all(projected.count(src) >= original_images.count(src) for src in original_images), (lesson["id"], "Imagem original removida")
    output.parent.mkdir(parents=True, exist_ok=True)
    rendered = re.sub(r'''(?<=["'])imagens/''', '/recursos/imagens/', str(soup))
    output.write_text(rendered.replace('uc-fotografia-digital.html', '/?uc=fotografia'))
    return {"lesson": lesson["id"], "original": original.name, "sha256": hashlib.sha256(original.read_bytes()).hexdigest(), "originalImages": len(original_images), "slides": len(soup.select(".slide")), "replaced": sorted(replace_titles)}


def build(args):
    courses = [json.loads((args.authoring / (s + ".json")).read_text()) for s in EXPECTED]
    for course in courses:
        validate(course)
    package = args.output
    assert package.resolve() != REPO.resolve() and not package.resolve().is_relative_to(REPO), "Pacote docente deve ficar fora do repositório"
    student = package / "alunos"
    teacher = package / "docente"
    for root in (student, teacher):
        root.mkdir(parents=True, exist_ok=True)
        for name in ("index.html", "app.js", "app.css", "media.js"):
            shutil.copy2(HERE / name, root / name)
        index = root / "index.html"
        index.write_text(index.read_text().replace('data-resource-root="/"', 'data-resource-root="/recursos/"'))
    (teacher / "index.html").write_text((teacher / "index.html").read_text().replace('data-role="student"', 'data-role="teacher"'))
    catalog = {"schema": 1, "edition": "2027", "courses": [{"slug": c["slug"], "title": c["title"], "count": len(c["lessons"])} for c in courses]}
    for root in (HERE, student, teacher):
        write_json(root / "data/catalog.json", catalog)
    for c in courses:
        write_json(HERE / f'data/{c["slug"]}.json', public_data(c))
        write_json(student / f'data/{c["slug"]}.json', public_data(c))
        write_json(teacher / f'data/{c["slug"]}.json', c)
    photo = next(c for c in courses if c["slug"] == "fotografia")
    mapping_path = args.authoring / "fotografia-slides.json"
    revision = json.loads(mapping_path.read_text()) if mapping_path.exists() else {}
    if isinstance(revision.get("lessons"), list):
        revision = {l["id"]: l for l in revision["lessons"]}
    photo_checks = [photo_deck(l, teacher / f'visuais/fotografia-{l["id"]}.html', revision) for l in photo["lessons"]]
    for l in photo["lessons"]:
        for image in l.get("gallery", []):
            image["matte"] = image_background(image["path"])
    # Repeat after visual classification so student galleries use the same support.
    for root, data in ((HERE, public_data(photo)), (student, public_data(photo)), (teacher, photo)):
        write_json(root / "data/fotografia.json", data)
    # Resource allowlist is assembled from named student tools, media and photo decks.
    paths = set()
    for c in courses:
        for l in c["lessons"]:
            for r in l["resources"] + l.get("gallery", []) + l.get("media", []):
                if r.get("path"):
                    paths.add(unquote(urlsplit(r["path"]).path))
    for p in (teacher / "visuais").glob("*.html"):
        soup = BeautifulSoup(p.read_text(), "html.parser")
        for tag in soup.select("[src],[href]"):
            for attr in ("src", "href"):
                val = tag.get(attr, "")
                if val.startswith("/recursos/"):
                    paths.add(val.removeprefix("/recursos/"))
    # Include local lab dependencies, never slide decks, teacher kits or institutional sources.
    paths = {canonical_resource(p) for p in paths}
    pending = list(paths)
    while pending:
        relative = pending.pop()
        source = (REPO / unquote(urlsplit(relative).path)).resolve()
        assert source.is_relative_to(REPO) and source.is_file(), ("Recurso ausente", relative)
        assert not source.name.startswith("Aula_") and source.suffix.lower() not in (".doc", ".docx"), ("Recurso privado", source)
        if source.suffix.lower() not in (".html", ".css", ".js"):
            continue
        text = source.read_text()
        links = re.findall(r'''(?:src|href)\s*=\s*["']([^"']+)|url\(["']?([^)'"\s]+)|["']((?:\.{0,2}/)?(?:trilhas|telas|grafismos)/[^"']+)["']''', text)
        for match in links:
            link = next((x for x in match if x), "")
            if not link or link.startswith(("#", "/", "data:")) or urlsplit(link).scheme:
                continue
            target = (source.parent / unquote(urlsplit(link).path)).resolve()
            if not target.is_relative_to(REPO) or not target.is_file():
                continue
            rel = canonical_resource(str(target.relative_to(REPO)))
            if target.suffix.lower() not in (".png", ".jpg", ".jpeg", ".webp", ".svg", ".mp3", ".wav", ".ogg", ".mp4", ".webm", ".css", ".js", ".html", ".txt", ".pdf"):
                continue
            if target.name.startswith("Aula_") or rel == "aula-kit.html" or "slides" in target.name.lower():
                continue
            if rel not in paths:
                paths.add(rel)
                pending.append(rel)
    for rel in paths:
        source = REPO / rel
        dest = package / "recursos" / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, dest)
    write_json(package / "resources.json", sorted(paths))
    write_json(HERE / "data/resources.json", sorted(paths))
    write_json(package / "verificacao-compilacao.json", {"lessons": 64, "teacherOutsideRepository": True, "photo": photo_checks, "resources": len(paths), "imageBackgrounds": IMAGE_BACKGROUNDS})
    for name in ("serve.py", "iniciar.command", "LEIA-ME.md"):
        shutil.copy2(HERE / name, package / name)
    (package / "iniciar.command").chmod(0o755)
    print(f"64 aulas compiladas: {package}; {len(paths)} recursos; 12 apresentações visuais preservadas")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--authoring", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    build(parser.parse_args())
