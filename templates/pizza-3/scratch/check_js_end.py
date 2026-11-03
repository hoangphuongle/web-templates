with open("index.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Total Lines in JS:", len(lines))
# Write last 20 lines to examine
with open("scratch/check_js_end.txt", "w", encoding="utf-8") as f_out:
    for idx in range(max(0, len(lines) - 20), len(lines)):
        f_out.write(f"{idx+1}: {lines[idx]}")

print("Written last lines to scratch/check_js_end.txt")
