with open("index.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Total Lines in CSS:", len(lines))
# Write last 20 lines to scratch/check_css_end.txt
with open("scratch/check_css_end.txt", "w", encoding="utf-8") as f_out:
    for idx in range(max(0, len(lines) - 20), len(lines)):
        f_out.write(f"{idx+1}: {lines[idx]}")

print("Done checking CSS end lines.")
