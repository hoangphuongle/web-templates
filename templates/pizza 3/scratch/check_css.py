import re
import sys

# Set output encoding to utf-8 for safe writing
with open("index.css", "r", encoding="utf-8") as f:
    content = f.read()

results = []
results.append(f"CSS Length: {len(content)}")

keywords = ["testimonial", "danh-gia", "review", "client", "slider"]
for kw in keywords:
    count = content.lower().count(kw)
    results.append(f"Keyword '{kw}' count in CSS: {count}")
    if count > 0:
        idx = 0
        for match in re.finditer(kw, content.lower()):
            start = max(0, match.start() - 100)
            end = min(len(content), match.end() + 300)
            results.append(f"--- Occurrence of '{kw}':\n{content[start:end]}\n")
            idx += 1
            if idx >= 5:
                break

with open("scratch/check_css_results.txt", "w", encoding="utf-8") as f_out:
    f_out.write("\n".join(results))

print("Done! Output written to scratch/check_css_results.txt")
