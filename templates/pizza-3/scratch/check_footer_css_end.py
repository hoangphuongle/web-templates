with open("index.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
for i, line in enumerate(lines):
    if "/* ================= ================= =================" in line and "FOOTER SECTION" in lines[i+1]:
        start_idx = i
        break

print("Footer CSS start line:", start_idx+1)

# print lines from start_idx to end or save it to check
with open("scratch/check_footer_css_end.txt", "w", encoding="utf-8") as f_out:
    f_out.write(f"Start CSS line: {start_idx+1}\n\n")
    for idx in range(start_idx, len(lines)):
        f_out.write(f"{idx+1}: {lines[idx]}")

print("Done checking footer CSS.")
