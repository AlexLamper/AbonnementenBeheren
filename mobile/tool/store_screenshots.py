#!/usr/bin/env python3
"""Maakt de App Store-screenshots (iPhone 6.9", 1320x2868) uit de ruwe
schermen van screenshots/store_test.dart.

    cd mobile
    flutter test screenshots/store_test.dart --update-goldens
    python3 tool/store_screenshots.py

Uitvoer: ../store/screenshots/<locale>/iphone69_0N.png en
../store/review/paywall_review.png
"""

import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
MOBILE = os.path.dirname(HERE)
RAW = os.path.join(MOBILE, "screenshots", "store_raw")
OUT = os.path.join(os.path.dirname(MOBILE), "store")
FONT = os.path.join(MOBILE, "assets", "fonts", "SpaceGrotesk-700.ttf")

W, H = 1320, 2868
NAVY = (8, 35, 59)
MINT = (45, 212, 191)
WHITE = (255, 255, 255)

LOCALES = {"nl": "nl-NL", "en": "en-US", "de": "de-DE", "fr": "fr-FR", "es": "es-ES"}

# Ruw scherm -> (wit, mint) kopregels per taal.
SHOTS = [
    ("1", {
        "nl": ("Al je abonnementen.", "Eén helder totaal."),
        "en": ("All your subscriptions.", "One clear total."),
        "de": ("Alle deine Abos.", "Eine klare Summe."),
        "fr": ("Tous tes abonnements.", "Un total clair."),
        "es": ("Todas tus suscripciones.", "Un total claro."),
    }),
    ("2", {
        "nl": ("Zie wat je betaalt,", "per maand en per jaar."),
        "en": ("See what you pay,", "per month and per year."),
        "de": ("Sieh, was du zahlst,", "pro Monat und pro Jahr."),
        "fr": ("Vois ce que tu paies,", "par mois et par an."),
        "es": ("Mira lo que pagas,", "al mes y al año."),
    }),
    ("4", {
        "nl": ("Kies je dienst.", "De prijs staat er al."),
        "en": ("Pick a service.", "The price is already there."),
        "de": ("Dienst wählen.", "Der Preis steht schon da."),
        "fr": ("Choisis un service.", "Le prix est déjà là."),
        "es": ("Elige un servicio.", "El precio ya está ahí."),
    }),
    ("5", {
        "nl": ("Gratis beginnen.", "Onbeperkt met Premium."),
        "en": ("Start for free.", "Unlimited with Premium."),
        "de": ("Kostenlos starten.", "Unbegrenzt mit Premium."),
        "fr": ("Commence gratuitement.", "Illimité avec Premium."),
        "es": ("Empieza gratis.", "Ilimitado con Premium."),
    }),
]


def fit_font(draw, lines, max_w, start=104):
    size = start
    while size > 60:
        f = ImageFont.truetype(FONT, size)
        if all(draw.textlength(t, font=f) <= max_w for t in lines):
            return f
        size -= 4
    return ImageFont.truetype(FONT, size)


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, img.width, img.height], radius, fill=255)
    out = Image.new("RGBA", img.size)
    out.paste(img, (0, 0), mask)
    return out


def compose(raw_path, lines):
    canvas = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(canvas)

    # Zachte mint gloed bovenaan.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([-300, -700, W + 300, 700], fill=(45, 212, 191, 40))
    canvas.paste(glow.filter(ImageFilter.GaussianBlur(160)), (0, 0), glow.filter(ImageFilter.GaussianBlur(160)))

    font = fit_font(draw, lines, W - 160)
    y = 210
    for text, color in zip(lines, (WHITE, MINT)):
        tw = draw.textlength(text, font=font)
        draw.text(((W - tw) / 2, y), text, font=font, fill=color)
        y += int(font.size * 1.12)

    # Scherm: 82% breed, afgeronde hoeken, loopt onderaan door.
    screen = Image.open(raw_path).convert("RGB")
    sw = int(W * 0.82)
    sh = int(screen.height * sw / screen.width)
    screen = rounded(screen.resize((sw, sh), Image.LANCZOS), 70)
    top = y + 90
    x = (W - sw) // 2

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([x, top + 30, x + sw, top + sh + 30], 70, fill=(0, 0, 0, 140))
    shadow = shadow.filter(ImageFilter.GaussianBlur(45))
    canvas.paste(shadow, (0, 0), shadow)

    # Dunne rand zodat het scherm loskomt van de navy achtergrond.
    border = Image.new("RGBA", (sw + 12, sh + 12), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle([0, 0, sw + 11, sh + 11], 76, fill=(255, 255, 255, 38))
    canvas.paste(border, (x - 6, top - 6), border)
    canvas.paste(screen, (x, top), screen)
    return canvas


def main():
    for lang, locale in LOCALES.items():
        out_dir = os.path.join(OUT, "screenshots", locale)
        os.makedirs(out_dir, exist_ok=True)
        for i, (raw, texts) in enumerate(SHOTS, start=1):
            img = compose(os.path.join(RAW, f"{lang}_{raw}.png"), texts[lang])
            path = os.path.join(out_dir, f"iphone69_0{i}.png")
            img.save(path, optimize=True)
            print(path, img.size)

    # Screenshot voor de review van de abonnementen: het ruwe Premium-scherm.
    os.makedirs(os.path.join(OUT, "review"), exist_ok=True)
    Image.open(os.path.join(RAW, "nl_5.png")).convert("RGB").save(
        os.path.join(OUT, "review", "paywall_review.png"), optimize=True
    )


if __name__ == "__main__":
    main()
