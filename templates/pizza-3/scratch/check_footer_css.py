with open("index.css", "r", encoding="utf-8") as f:
    content = f.read()

import re
matches = []
for match in re.finditer(r"footer", content, re.IGNORECASE):
    start = max(0, match.start() - 100)
    end = min(len(content), match.end() + 250)
    matches.append(f"Position: {match.start()}\n{content[start:end]}\n")

with open("scratch/check_footer_css.txt", "w", encoding="utf-8") as f_out:
    f_out.write("\n\n=== Match ===\n".join(matches[:15]))

print("Done! Found", len(matches), "occurrences in CSS.")
