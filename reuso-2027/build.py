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
PRIVATE_KEYS = {"teacher", "officialTitle", "sourceNote", "presentation"}
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
        presentation = l.get("presentation")
        assert isinstance(presentation, list) and presentation, (label, "Apresentação própria ausente")
        for entry in presentation:
            assert entry.get("title") and entry.get("blocks"), (label, "Slide incompleto")
            text = " ".join([entry["title"]] + [b["label"] + " " + b["text"] for b in entry["blocks"]])
            assert not re.search(r"\b(reuso|fallback|modelar|evidência individual)\b", text, re.I), (label, "Termo interno na projeção", entry["title"])


def presentation_deck(course, lesson, output):
    """Only explicitly authored student-facing content can become a slide."""
    names = {"design-web": "DESIGN WEB", "producao-audiovisual": "PRODUÇÃO AUDIOVISUAL"}
    slides = []
    for index, entry in enumerate(lesson["presentation"]):
        kind = "cover" if index == 0 else entry.get("kind", "")
        assert kind in ("", "cover", "comparison", "steps"), kind
        blocks = "".join('<p class="block">' + (f'<strong>{html.escape(b["label"])}</strong> ' if b["label"] else "") + html.escape(b["text"]) + '</p>' for b in entry["blocks"])
        heading = "h1" if index == 0 else "h2"
        words = len(" ".join(b["text"] for b in entry["blocks"]).split())
        classes = "slide " + kind + (" dense" if words > 65 else "") + (" active" if index == 0 else "")
        title = html.escape(entry["title"])
        slides.append(f'<section class="{classes.strip()}" data-title="{title}" aria-hidden="{str(index != 0).lower()}"><header class="slide-header"><p class="eyebrow">{names[course["slug"]]} · AULA {int(lesson["id"])}</p><{heading}>{title}</{heading}></header><div class="slide-body">{blocks}</div></section>')
    replacements = {"TITLE": f'Aula {int(lesson["id"])} · {html.escape(lesson["title"])}', "SLUG": course["slug"], "ID": lesson["id"], "SLIDES": "\n".join(slides), "STYLE": (HERE / "projection.css").read_text(), "SCRIPT": (HERE / "projection.js").read_text()}
    rendered = (HERE / "projection.html").read_text()
    for key, value in replacements.items():
        rendered = rendered.replace("__" + key + "__", value)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(rendered)
    return {"course": course["slug"], "lesson": lesson["id"], "slides": len(slides)}


def new_slide(soup, title, blocks, identifier):
    section = soup.new_tag("div", attrs={"class": "slide reuso-slide", "data-title": title, "data-bloco": "reuso", "data-reuso": identifier})
    inner = soup.new_tag("div", attrs={"class": "slide-inner"})
    header = soup.new_tag("div", attrs={"class": "slide-header"})
    eyebrow = soup.new_tag("p", attrs={"class": "reuso-eyebrow"})
    eyebrow.string = "FOTOGRAFIA DIGITAL E SEMIÓTICA"
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
#bottomBar{height:58px}#bottomBar button{color:#354437;opacity:1;width:auto;min-width:48px;height:40px;padding:0 12px;font:600 15px system-ui;border:1px solid #9c9583}#bottomBar button:disabled{opacity:.35}#bottomBar .bar-left{font-size:14px}#slideCounter{font-size:16px}#gridOverlay{background:#faf8f0;color:#1b241d}.grid-item{background:#eee8db;color:#1b241d;border-color:#9c9583}
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

/* Sala: texto legível, sem rolagem na tela projetada. */
.slide-inner{padding:34px 56px 72px!important;overflow:visible!important;max-height:100vh;box-sizing:border-box}
.slide-body{overflow:visible!important;gap:20px!important}
.slide .slide-body{font-size:23px;line-height:1.35}
.slide .slide-body :is(p,li,td,th,.desc,.description,.text,.note,.detail,.sub,.label,.val,.iso-meta,.flow-step span,.software-card span,.photo-card .photo-desc,.type-card p,.decision-card p,.view-card p,.shutter-card p,.ap-card p){font-size:22px!important;line-height:1.35!important}
.slide .slide-body :is(figcaption,.img-caption,.photo-credit){font-size:18px!important;line-height:1.3!important}
.slide .slide-body :is(.card,.photo-card,.format-card,.type-card,.view-card,.decision-card,.shutter-card,.ap-card){font-size:22px!important;line-height:1.35}
.slide .slide-body strong{font-size:inherit}
.slide .slide-header{margin-bottom:24px!important}
.slide .t-title{font-size:44px!important;line-height:1.12!important}
.slide .t-subtitle{font-size:24px!important;line-height:1.35!important}
.slide .t-eyebrow{font-size:16px!important}
.title-slide .t-title,.title-slide h1{font-size:56px!important;line-height:1.1!important}
.title-slide .t-subtitle{max-width:950px!important}
.title-slide img{max-height:25vh!important;width:auto!important}
.title-slide .slide-inner{justify-content:center;gap:14px}
.slide .highlight-box{font-size:22px!important;line-height:1.35!important;padding:14px 18px!important}
.slide .photo-card{padding:22px!important}
.slide .p-expand{display:none!important}
.slide .p-semiotic-toggle{font-size:18px!important;padding:10px 14px!important;opacity:1!important}
.slide .photo-panel,.slide .img-frame,.slide .image-frame{background:transparent!important;border:0!important;box-shadow:none!important}
.slide img.reuso-dark-matte{background:#191919!important;border:2px solid #191919}
.slide img.reuso-white-matte{background:white!important;border:1px solid #c9c4b7}
.slide .semiotic-triangle :is(line,path,polyline),.slide .triad-diagram :is(line,path,polyline){stroke:#70541c!important;stroke-width:2!important}
.slide .triad-line{background:#70541c!important;opacity:1!important}
.slide .data-table :is(td,th){padding:12px 16px!important}
.slide.photo-single-column .img-frame{height:220px!important}
.slide.photo-single-column .exif-photo{height:300px!important;max-width:550px;margin:auto}
.slide.photo-single-column .bayer-grid{grid-template-columns:repeat(8,36px);grid-template-rows:repeat(8,36px)}
.slide.photo-single-column .two-col>div{width:100%!important}
.reuso-slide .slide-inner{overflow:visible!important}
.reuso-body p{font-size:28px!important;line-height:1.4!important}
.reuso-image-body p{font-size:22px!important}
.slide .slide-header{flex:0 0 auto!important}
.slide .slide-body :is(.card-body,.photo-name,.photo-period,.translation,.example,.step,.tool,.best,.mode,.flux-name,.flux-sub,.flux-label,.iso-label,.res-dims,.res-use,.dpi-label,.dpi-use,.fmt-name,.fmt-size,.fmt-when,.flow-name,.flow-sub,.sign-type,.sign-relation,.sign-example,.cat-desc,.photo-note,.exif-key,.exif-val){font-size:20px!important;line-height:1.35!important}
.slide .slide-body :is(.read-list,.workflow-board,.critique-grid,.frame-map,.ratio-board,.tool-grid,.ethics-grid,.histo-grid,.type-card,.shutter-card,.ap-card,.decision-card) :is(span,small,h3){font-size:20px!important;line-height:1.35!important}
.slide .slide-body .photo-name{font-size:24px!important}
.slide .slide-body .check-card span{font-size:20px!important;line-height:1.35!important}
.grid-thumb:focus-visible,.grid-close:focus-visible{outline:3px solid #70541c;outline-offset:3px}
.grid-close{font:inherit;border:0}
.slide .slide-body .tl-text{font-size:20px!important;line-height:1.35!important}
.slide .slide-body .tl-year{font-size:19px!important}
.slide .slide-body .quote-attr{font-size:20px!important}
.slide .slide-body .exif-table{max-height:none!important}
.slide .slide-body .exif-row{padding:8px 14px!important}
.slide.photo-paginated .photo-study img,.slide.photo-paginated .layer-board img{max-height:360px!important;width:auto!important;margin:auto}
.slide.photo-paginated :is(.map-layout,.ratio-layout)>div:has(img){max-height:350px}
.slide .pixel-frame{height:290px!important}
.slide .iso-grid{max-height:160px!important}
.slide .iso-card{height:160px!important}
.slide .sensor-sizes{max-height:160px!important}
.slide .slide-body .asset-stage{max-height:310px}
.slide .slide-body .image-led{gap:26px!important}
.slide .reuso-eyebrow{font-size:16px!important}
.slide-inner{padding-top:28px!important;padding-bottom:66px!important}
.slide .slide-header{margin-bottom:18px!important}
.slide .study-photo{height:380px!important;max-width:650px;margin:auto}
.slide .triad-lines :is(path,circle){stroke:#70541c!important;stroke-width:2.5!important}
.slide .triad-lines{opacity:1!important}
.slide .exif-photo{height:270px!important;width:340px!important;max-width:100%;margin:auto!important;flex:none!important}
.slide .exif-photo img{width:100%!important;height:100%!important;object-fit:contain!important}
.slide.photo-paginated .photo-panel{max-height:360px!important;min-height:0!important}
.slide.photo-paginated .photo-panel img{max-height:350px!important;object-fit:contain!important}
.slide .route-card img{max-height:260px!important}
.slide .flow-line{grid-template-columns:repeat(4,minmax(0,1fr))!important}
.slide .flow-step{min-width:0!important}
.slide .flow-step span{font-size:22px!important;line-height:1.35!important}
.slide[data-title="Revisão Aula 01"] .card{padding:20px!important}
.slide[data-title^="O Sensor Digital"] .two-col>div{grid-template-columns:1fr!important}
.slide .sensor-legend{font-size:20px!important;line-height:1.35!important;display:grid;gap:8px}
.slide .sensor-title,.slide .sensor-rect span{font-size:18px!important;line-height:1.2!important}
.slide .sensor-sizes{width:700px;max-width:100%;height:180px!important;max-height:none!important;margin:auto}
.slide .exif-table{display:block!important;background:#eee8db!important;max-width:950px!important}
.slide .exif-row{display:grid!important;grid-template-columns:220px 1fr!important}
.slide .exif-photo{height:290px!important}
.slide .exif-photo img{height:230px!important}
.slide .exif-photo figcaption{position:static!important;display:block!important;color:#fff!important;background:#191919!important;font-size:16px!important;letter-spacing:0!important;text-transform:none!important;min-height:45px}
.slide .iso-tile{height:150px!important;aspect-ratio:auto!important}
.slide .iso-tile .iso-label{top:10px!important;bottom:auto!important;left:10px!important;color:#fff!important}
.slide .iso-tile .iso-meta{bottom:8px!important;left:10px!important;right:10px!important;font-size:18px!important;line-height:1.25!important;color:#fff!important}
.slide .data-table tbody{display:table-row-group!important}
@media screen and (max-width:1100px){.slide-inner{padding:20px 18px 50px!important}.slide .data-table{table-layout:fixed}.slide .data-table tbody{display:table-row-group!important}.slide .data-table td{overflow-wrap:anywhere}.slide:not(.photo-paginated) .image-led,.slide:not(.photo-paginated) .image-led.reverse{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:24px!important}.slide .stack,.slide .check-grid,.slide .check-card{min-width:0!important}.slide .check-card{padding:12px!important;overflow-wrap:anywhere}}
@media print{.slide{position:relative;opacity:1;display:flex;height:auto;min-height:95vh;break-after:page;pointer-events:auto}.slide-inner,.slide-body{overflow:visible}#bottomBar,#progressBar{display:none}}
"""


def photo_paginate(soup):
    """Give original comparisons and visual explanations enough projection space."""
    def divide(slide, selector, size=1):
        target=slide.select_one(selector)
        if not target: return
        children=target.find_all(recursive=False)
        if len(children)<=size:return
        title=slide.get("data-title", "")
        count=(len(children)+size-1)//size
        for part in range(count):
            clone=copy.copy(slide)
            grid=clone.select_one(selector)
            for i,node in enumerate(grid.find_all(recursive=False)):
                if not part*size<=i<(part+1)*size:node.decompose()
            grid["style"]=f"display:grid;grid-template-columns:repeat({min(size,len(children)-part*size)},minmax(0,1fr));gap:22px;width:100%;max-width:1120px;margin:auto"
            clone["data-title"]=f"{title} · {part+1}/{count}"
            clone["class"]=clone.get("class",[])+["photo-paginated"]
            slide.insert_before(clone)
        slide.decompose()
    groups={"Fotógrafos":(".photo-grid",3),"Formatos de Arquivo":(".fmt-grid",2),
        "Tipos de Câmera":(".type-grid",2),"Ponto de Vista e Enquadramentos":(".viewpoint-board",2),
        "Ambiente é Coautor":(".decision-grid",2),"Obturador e Tempo":(".shutter-demo",2),
        "Diafragma e Profundidade":(".aperture-demo",2),"Ferramentas de Composição no Software":(".tool-grid",2),
        "Ética na Edição":(".ethics-grid",2),"Ferramentas Gratuitas":(".software-grid",2),
        "Câmera Obscura":(".two-col",1),"A Kodak":(".two-col",1),"DPI × PPI":(".two-col",1),"Mapa do Quadro":(".map-layout",1),
        "Regra dos Terços sem Piloto Automático":(".photo-study",1),"Linhas Guia e Direção":(".photo-study",1),
        "Moldura, Camadas e Profundidade":(".layer-board",1),"Corte, Proporção e Plataforma":(".ratio-layout",1),
        "O Sensor Digital":(".two-col",1),"Padrão Bayer":(".two-col",1),"Espaço de Cores":(".two-col",1),
        "ISO e Ruído":(".two-col",1),"Metadados EXIF":(".exif-panel",1),
        "Edição Base":(".image-led",1),"Montagem da Entrega":(".image-led",1),"Ajustes Básicos":(".image-led",1),
        "Pesquisa e Moodboard":(".image-led",1),"Shot List Semiótico":(".image-led",1),"Contact Sheet e Seleção":(".image-led",1),"Edição Consistente":(".image-led",1)}
    for slide in list(soup.select(".slide")):
        title=slide.get("data-title", "")
        if title in groups:divide(slide,*groups[title])
        elif title=="Analógico × Digital":divide(slide,"tbody",4)
    for slide in list(soup.select('.slide[data-title^="Metadados EXIF"]')):
        divide(slide,'.exif-table',5)
    for slide in list(soup.select('.slide[data-title^="Mapa do Quadro"]')):
        divide(slide,'.frame-map',3)
    # Separate the sensor photograph from its scale diagram.
    for slide in list(soup.select('.slide[data-title^="O Sensor Digital"]')):
        col=slide.select_one('.two-col>div')
        if col and col.select_one('.sensor-sizes'):divide(slide,'.two-col>div',2)


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
    # Open with the original visual cover. The teaching plan belongs in the teacher area.
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
        caption.string = image.get("caption") or image["title"]
        body.append(caption)
        tail.append(visual)
    presentation = lesson.get("presentation")
    assert isinstance(presentation, list) and presentation, (lesson["id"], "Apresentação explícita obrigatória")
    for i, entry in enumerate(presentation):
        tail.append(new_slide(soup, entry["title"], [(b["label"], b["text"]) for b in entry["blocks"]], f"atividade-{i}"))
    # Keep original illustrations even when their old task text is superseded.
    for i, img in enumerate(removed_images):
        visual = new_slide(soup, "Observe a imagem", [], f"referencias-{i}")
        body = visual.select_one(".slide-body")
        body["class"].append("reuso-image-body")
        img["style"] = "max-height:57vh;max-width:95%;object-fit:contain"
        body.append(img)
        tail.insert(0, visual)
    last = soup.select(".slide")[-1]
    for new in tail:
        last.insert_after(new)
        last = new
    photo_paginate(soup)
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
        if relative == "imagens/Daguerreotipo.jpg" or "You_press_the_button" in relative:
            matte = "white"
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
    for identifier, label in (("prevBtn","← Anterior"),("nextBtn","Próximo →"),("gridBtn","Slides"),("fsBtn","Tela cheia")):
        button=soup.find(id=identifier)
        if button:
            button.string=label
            button["aria-label"]=label
    for identifier in ("pdfBtn","homeBtn"):
        button=soup.find(id=identifier)
        if button: button["style"]="display:none"
    close = soup.select_one(".grid-close")
    assert close, (lesson["id"], "Falta botão de fechar índice")
    close.name = "button"
    close["type"] = "button"
    close["aria-label"] = "Fechar índice de slides"
    navigation = [script for script in soup.find_all("script") if "function buildGrid()" in script.get_text()]
    assert len(navigation) == 1, (lesson["id"], "Navegação dos slides não encontrada")
    script = navigation[0].get_text()
    patches = {
        "document.addEventListener('keydown', function(e) {": "document.addEventListener('keydown', function(e) {\n    if (e.key === ' ' && e.target.closest('button,a,input,select,textarea,[role=\"button\"]')) return;",
        "thumb.className = 'grid-thumb' + (i === currentIndex ? ' current' : '');": """thumb.className = 'grid-thumb' + (i === currentIndex ? ' current' : '');
      thumb.tabIndex = 0;
      thumb.setAttribute('role', 'button');
      thumb.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); e.stopPropagation(); this.click();
        }
      });""",
    }
    for old, new in patches.items():
        assert script.count(old) == 1, (lesson["id"], "Navegação original mudou", old)
        script = script.replace(old, new)
    start = script.index("function toggleGrid()")
    end = script.index("function toggleHelp()", start)
    script = script[:start] + """function toggleGrid() {
    gridOpen = !gridOpen;
    var overlay = document.getElementById('gridOverlay');
    if (gridOpen) {
      buildGrid(); overlay.classList.add('open');
      (overlay.querySelector('.grid-thumb.current') || overlay.querySelector('.grid-thumb')).focus();
    } else {
      overlay.classList.remove('open');
      document.getElementById('gridBtn').focus();
    }
  }
  """ + script[end:]
    navigation[0].string = script
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
    presentation_checks = [presentation_deck(c, l, teacher / f'visuais/{c["slug"]}-{l["id"]}.html') for c in courses if c["slug"] != "fotografia" for l in c["lessons"]]
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
    write_json(package / "verificacao-compilacao.json", {"lessons": 64, "teacherOutsideRepository": True, "photo": photo_checks, "presentations": presentation_checks, "resources": len(paths), "imageBackgrounds": IMAGE_BACKGROUNDS})
    for name in ("serve.py", "iniciar.command", "LEIA-ME.md"):
        shutil.copy2(HERE / name, package / name)
    (package / "iniciar.command").chmod(0o755)
    print(f"64 aulas compiladas: {package}; {len(paths)} recursos; 64 apresentações próprias")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--authoring", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    build(parser.parse_args())
