"""
Helper script used for the one-off calculette migration.
Safe to delete locally once no longer needed.
"""

from pathlib import Path

index_path = Path("index.html")
text = index_path.read_text(encoding="utf-8")

start = text.index('<form id="calculette"')
end = text.index("</form>", start) + len("</form>")
form_block = text[start:end]

cta_block = (
    '      <div class="cta-simulateur w-full flex flex-col items-center py-12">\n'
    '        <a class="btn btn-primary btn-lg rounded-full tracking-wide font-semibold" href="/simulateur.html">Lancer le simulateur</a>\n'
    '        <p class="text-sm text-base-content/70 mt-3 text-center">Accédez au simulateur complet sur une page dédiée.</p>\n'
    '      </div>\n'
)

index_path.write_text(text[:start] + cta_block + text[end:], encoding="utf-8")

svg_start = text.index('<svg xmlns="http://www.w3.org/2000/svg" height="0" width="0">')
svg_end = text.index("</svg>", svg_start) + len("</svg>")
svg_block = text[svg_start:svg_end]

footer_start = text.index("    <footer")
body_close = text.index("  </body>")
footer_block = text[footer_start:body_close]

loader_block = """      <aside class=\"container-loader flex-row-center-center flex\">\n        <div class=\"loader\"></div>\n        <span class=\"loader-text\">Chargement...</span>\n      </aside>"""

hero_block = """      <section class=\"w-full max-w-4xl text-center space-y-4 py-10\">\n        <h1 class=\"text-4xl font-bold text-secondary\">Simulateur locatif</h1>\n        <p class=\"text-lg text-base-content/70\">Renseignez vos données financières pour obtenir une estimation détaillée de votre projet locatif.</p>\n        <a class=\"btn btn-outline btn-secondary rounded-full font-semibold\" href=\"/index.html\">Retour à l'accueil</a>\n      </section>"""

simulateur_html = f"""<!DOCTYPE html>
<html lang=\"fr\">
  <head>

    <!-- Preload the LCP image with a high fetchpriority so it starts loading with the stylesheet. -->
    <link
  rel=\"preload\"
  as=\"image\"
  href=\"/assets/cabane-lac-1000px.webp\"
  imagesrcset=\"\n    /assets/cabane-lac-500px.webp 500w,\n    /assets/cabane-lac-1000px.webp 1000w,\n    /assets/cabane-lac-2000px.webp 2000w\n  \"\n  imagesizes=\"(max-width: 1000px) 100vw, 1000px\"
/>
    <title>Mon projet locatif, ce qu'il va me coûter en réalité</title>
    <meta name=\"description\" content=\"Calculer ce que va vous couter en réalité, votre projet locatif. En cinq minutes, ce simulateur gratuit, vous permet de calculer les mensualités d'un crédit immobilier, le coût des intérêts et d'établir un bilan après imposition. Cela vous permettra de voir plus clair pour prendre de meilleurs décisions.\">
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">

    <!-- PWA -->
    <link rel=\"manifest\" href=\"/manifest.webmanifest\">
    <meta name=\"theme-color\" content=\"#0ea5e9\">
    
    <!-- iOS (A2HS) -->
    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
    <link rel=\"apple-touch-icon\" href=\"/icons/apple-icon-180.png\">


    <!-- Favicon classique -->
    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicons/favicon-32x32.png\">
    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicons/favicon-16x16.png\">
    <link rel=\"icon\" type=\"image/png\" sizes=\"48x48\" href=\"/favicons/favicon-48x48.png\">
       
    <!-- Feuilles de style-->
    <link rel=\"stylesheet\" href=\"/src/style/main.css\">

    <!--script principal-->
    <script type=\"module\" src=\"/src/js/index-v2.js\"></script>
    
    
  </head>
  <body data-theme=\"winter\" class=\"w-full text-base-content antialiased flex flex-col justify-start items-center\">
{svg_block}
    <div class=\"container-page flex flex-col justify-start items-center gap-10 p-4 lg:px-16\">
{loader_block}
{hero_block}

{form_block}
    </div>

{footer_block}
  </body>
</html>
"""

Path("simulateur.html").write_text(simulateur_html, encoding="utf-8")
