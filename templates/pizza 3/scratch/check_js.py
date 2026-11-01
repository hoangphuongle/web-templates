with open("index.js", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find testimonial related javascript
import re
matches = []
for match in re.finditer(r"testimonial", content, re.IGNORECASE):
    start = max(0, match.start() - 100)
    end = min(len(content), match.end() + 400)
    matches.append(content[start:end])

with open("scratch/check_js_results.txt", "w", encoding="utf-8") as f_out:
    f_out.write("\n\n=== Match ===\n".join(matches[:10]))

print("Done! Found", len(matches), "occurrences in JS.")
