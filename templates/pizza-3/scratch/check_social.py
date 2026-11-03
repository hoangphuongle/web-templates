with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

import re
keywords = ["social", "tiktok", "fanpage", "instagram", "facebook", "theo dõi", "cảm hứng"]
results = []
results.append(f"File Length: {len(content)}")

for kw in keywords:
    count = content.lower().count(kw)
    results.append(f"Keyword '{kw}' count: {count}")
    if count > 0:
        idx = 0
        for match in re.finditer(kw, content.lower()):
            start = max(0, match.start() - 100)
            end = min(len(content), match.end() + 250)
            results.append(f"--- '{kw}':\n{content[start:end]}\n")
            idx += 1
            if idx >= 3:
                break

with open("scratch/check_social_results.txt", "w", encoding="utf-8") as f_out:
    f_out.write("\n".join(results))

print("Done! Results written to scratch/check_social_results.txt")
