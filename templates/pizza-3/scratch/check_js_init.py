with open("index.js", "r", encoding="utf-8") as f:
    content = f.read()

import re
matches = []
for match in re.finditer(r"DOMContentLoaded|initTestimonialSlider", content):
    start = max(0, match.start() - 100)
    end = min(len(content), match.end() + 200)
    matches.append(f"Position: {match.start()}\n{content[start:end]}\n")

with open("scratch/check_js_init.txt", "w", encoding="utf-8") as f_out:
    f_out.write("\n\n=== Match ===\n".join(matches))

print("Done! Found", len(matches), "matches.")
