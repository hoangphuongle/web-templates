with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if 'class="footer-dark-main"' in line:
        start_idx = i
    if start_idx != -1 and end_idx == -1 and '</footer>' in line:
        end_idx = i
        break

print(f"footer-dark-main start line: {start_idx+1}")
print(f"footer-dark-main end line: {end_idx+1}")

with open("scratch/check_footer_dark_main.txt", "w", encoding="utf-8") as f_out:
    for idx in range(start_idx, end_idx + 1):
        f_out.write(f"{idx+1}: {lines[idx]}")

print("Done checking footer dark main lines.")
