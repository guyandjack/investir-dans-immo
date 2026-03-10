import re
from pathlib import Path
css_path = Path('src/style/main.css')
css_text = css_path.read_text()
css_classes = set(re.findall(r'(?<![0-9A-Za-z_-])\.([A-Za-z_-][A-Za-z0-9_-]*)', css_text))
html_counts = {}
for html_path in Path('.').rglob('*.html'):
    text = html_path.read_text(errors='ignore')
    for match in re.finditer(r'class\s*=\s*"([^"]+)"', text):
        for token in match.group(1).split():
            html_counts[token] = html_counts.get(token, 0) + 1
    for match in re.finditer(r"class\s*=\s*'([^']+)'", text):
        for token in match.group(1).split():
            html_counts[token] = html_counts.get(token, 0) + 1
unused = sorted(c for c in css_classes if html_counts.get(c, 0) == 0)
print('Total CSS classes:', len(css_classes))
print('Unused CSS classes:', len(unused))
for cls in unused:
    print(cls)
