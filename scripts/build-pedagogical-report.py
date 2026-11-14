"""Build an editable, restrained Word report from a lesson's pedagogical Markdown.

Render the resulting file with the document runtime's render_docx.py and inspect
every page before distributing the PDF. This script only authors the Word file.
"""
import argparse
import re
from pathlib import Path

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor


def inline(paragraph, text):
    for index, part in enumerate(re.split(r"\*\*(.*?)\*\*", text)):
        run = paragraph.add_run(part)
        run.bold = bool(index % 2)


def cell_text(cell, value, header=False):
    cell.text = ""
    paragraph = cell.paragraphs[0]
    paragraph.paragraph_format.space_after = Pt(3)
    paragraph.paragraph_format.space_before = Pt(3)
    paragraph.paragraph_format.line_spacing = 1.08
    inline(paragraph, value)
    for run in paragraph.runs:
        run.font.size = Pt(9)
        if header:
            run.bold = True
    properties = cell._tc.get_or_add_tcPr()
    margins = OxmlElement("w:tcMar")
    for edge in ("top", "left", "bottom", "right"):
        element = OxmlElement("w:" + edge)
        element.set(qn("w:w"), "95")
        element.set(qn("w:type"), "dxa")
        margins.append(element)
    properties.append(margins)
    if header:
        fill = OxmlElement("w:shd")
        fill.set(qn("w:fill"), "EEEEEE")
        properties.append(fill)


def table(document, lines):
    rows = [[part.strip() for part in line.strip().strip("|").split("|")] for line in lines]
    rows = [row for row in rows if not all(re.fullmatch(r"[-: ]+", item) for item in row)]
    count = len(rows[0])
    result = document.add_table(rows=0, cols=count)
    result.autofit = False
    widths = [4.1, 3.9, 4.2, 4.8] if count == 4 else [7.3, 9.7]
    for column, width in zip(result.columns, widths):
        column.width = Cm(width)
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        border = OxmlElement("w:" + edge)
        for key, value in {"val": "single", "sz": "5", "color": "D9D9D9"}.items():
            border.set(qn("w:" + key), value)
        borders.append(border)
    result._tbl.tblPr.append(borders)
    for index, values in enumerate(rows):
        row = result.add_row()
        properties = row._tr.get_or_add_trPr()
        properties.append(OxmlElement("w:cantSplit"))
        if not index:
            repeat = OxmlElement("w:tblHeader")
            properties.append(repeat)
        for cell, value, width in zip(row.cells, values, widths):
            cell.width = Cm(width)
            cell_text(cell, value, not index)
    document.add_paragraph().paragraph_format.space_after = Pt(0)


def build(source, output, label):
    document = Document()
    # The bundled base template may carry a decorative title border.
    for element in list(document.styles.element.iter(qn("w:pBdr"))):
        element.getparent().remove(element)
    section = document.sections[0]
    section.page_width, section.page_height = Cm(21), Cm(29.7)
    section.top_margin = section.bottom_margin = Cm(1.8)
    section.left_margin = section.right_margin = Cm(2)
    section.header_distance = section.footer_distance = Cm(0.8)
    normal = document.styles["Normal"]
    normal.font.name, normal.font.size = "Arial", Pt(10.5)
    normal.font.color.rgb = RGBColor.from_string("202020")
    normal.paragraph_format.line_spacing = 1.13
    normal.paragraph_format.space_after = Pt(7)
    for name, size in [("Title", 21), ("Subtitle", 12), ("Heading 1", 14), ("Heading 2", 12)]:
        style = document.styles[name]
        style.font.name, style.font.size = "Arial", Pt(size)
        style.font.color.rgb = RGBColor.from_string("000000")
        style.font.bold = name != "Subtitle"
        style.font.italic = False
        style.paragraph_format.space_after = Pt(8)
        style.paragraph_format.space_before = Pt(12 if name.startswith("Heading") else 0)
        style.paragraph_format.keep_with_next = True
    footer = section.footer.paragraphs[0]
    footer.add_run(label + "  |  ")
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), "PAGE")
    footer._p.append(field)
    for run in footer.runs:
        run.font.name, run.font.size = "Arial", Pt(8)
        run.font.color.rgb = RGBColor.from_string("666666")
    document.core_properties.title = "Metodologia e alinhamento pedagógico " + label
    document.core_properties.subject = "Apresentação à Coordenação Pedagógica"
    document.core_properties.author = ""
    document.core_properties.keywords = "SENAI, planejamento, metodologia, coordenação pedagógica"
    lines = Path(source).read_text().splitlines()
    pending = []
    def flush():
        if pending:
            inline(document.add_paragraph(), " ".join(pending))
            pending.clear()
    index = 0
    while index < len(lines):
        line = lines[index].strip()
        if line.startswith("|"):
            flush()
            matrix = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                matrix.append(lines[index])
                index += 1
            table(document, matrix)
            continue
        if line.startswith("# "):
            flush()
            document.add_paragraph("Metodologia e alinhamento pedagógico", "Title")
            document.add_paragraph(label, "Subtitle")
            document.add_paragraph("Documento de apresentação à Coordenação Pedagógica", "Subtitle")
        elif line.startswith("## "):
            flush()
            heading = document.add_paragraph(line[3:].replace(":", ""), "Heading 1")
            if line.startswith("## Protagonismo"):
                heading.paragraph_format.page_break_before = True
        elif re.match(r"^\d+\. ", line):
            flush()
            paragraph = document.add_paragraph(style="List Number")
            inline(paragraph, re.sub(r"^\d+\. ", "", line))
        elif line.startswith("- "):
            flush()
            inline(document.add_paragraph(style="List Bullet"), line[2:])
        elif not line:
            flush()
        else:
            pending.append(line)
        index += 1
    flush()
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    document.save(output)
    print(output)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--label", required=True)
    args = parser.parse_args()
    build(args.source, args.output, args.label)
