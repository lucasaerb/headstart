#!/usr/bin/env python3
"""Assemble an evidence contact sheet from licensed originals (requires Pillow)."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]


def font(size):
    for path in ("/System/Library/Fonts/Supplemental/Arial.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default(size=size)


def main():
    items = json.loads((ROOT / "media-manifest.json").read_text())
    width, cell_width, cell_height = 1500, 500, 370
    height = 140 + ((len(items) + 2) // 3) * cell_height
    sheet = Image.new("RGB", (width, height), "#f4f5f7")
    draw = ImageDraw.Draw(sheet)
    draw.text((28, 22), "Game research • authentic preview evidence", font=font(30), fill="#152238")
    draw.text((28, 68), "Historical images, not current-build or play attestations. See media-credits.md for each source and license.", font=font(18), fill="#475569")
    for n, item in enumerate(items):
        path = ROOT / item["local_path"]
        if hashlib.sha256(path.read_bytes()).hexdigest() != item["sha256"]:
            raise ValueError(f"Image digest changed: {path}")
        x, y = (n % 3) * cell_width + 18, 122 + (n // 3) * cell_height
        draw.rounded_rectangle((x, y, x + 464, y + 348), radius=8, fill="white")
        with Image.open(path) as source:
            picture = ImageOps.contain(source.convert("RGB"), (444, 249))
            sheet.paste(picture, (x + 10 + (444 - picture.width) // 2, y + 8 + (249 - picture.height) // 2))
        draw.text((x + 12, y + 265), f"{n+1:02d}  {item['title']}", font=font(22), fill="#152238")
        license_text = item["license_expression"].replace(" AND ", " + ")
        if len(license_text) > 48:
            draw.text((x + 12, y + 296), license_text[:48], font=font(14), fill="#475569")
            draw.text((x + 12, y + 316), license_text[48:], font=font(14), fill="#475569")
        else:
            draw.text((x + 12, y + 296), license_text, font=font(15), fill="#475569")
            draw.text((x + 12, y + 321), "Source, credit and reuse terms: media-credits.md", font=font(14), fill="#475569")
    sheet.save(ROOT / "contact-sheet.jpg", quality=92)
    lines = ["# Image credits and scoped display evidence", "",
             "These are authentic historical images with file-specific license evidence. They are not screenshots of the indexed commits or evidence that we played the games. Originals are retained byte-for-byte. The contact sheet scales copies to fit; it does not crop or alter game content. Each constituent image retains its own license; there is no blanket license for third-party imagery.", "",
             "Retain this file, the media manifest, license notices, original images and linked source evidence when distributing the preview bundle. GPL-covered originals and their available game/source references are linked below; follow the listed license obligations for any further redistribution or adaptation. The metadata snapshot records the file-page assertions inspected during research, not a warranty of ownership.", ""]
    for n, item in enumerate(items):
        links = ", ".join(f"[license]({url})" for url in item["license_urls"])
        lines += [f"## {n+1:02d}. {item['title']}", "", f"![{item['alt']}]({item['local_path']})", "",
                  f"Credit: {' '.join(item['credit'].split())}", "", f"License: **{item['license_expression']}**. {links}.", "",
                  f"[Exact file-page evidence]({item['license_evidence_url']}) · [Original image]({item['original_url']}) · [Game source]({item['repo_url']})", "",
                  f"Capture date: {item['capture_date'] or 'unknown'} ({item['capture_date_status']}). Uploaded: {item['uploaded_at']}. Downloaded: {item['downloaded_at']}.", "",
                  f"{item['version_relation']} {item['notes']}", "", f"Changes: {item['modifications']}", "",
                  f"SHA256: `{item['sha256']}`. Dimensions: {item['width']} × {item['height']}.", ""]
    (ROOT / "media-credits.md").write_text("\n".join(lines), encoding="utf-8")
    print(f"Assembled {len(items)} originals into contact-sheet.jpg; wrote media-credits.md")


if __name__ == "__main__":
    main()
