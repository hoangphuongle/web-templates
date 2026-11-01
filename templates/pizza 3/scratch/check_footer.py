with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if '<footer class="main-footer"' in line:
        start_idx = i
    if start_idx != -1 and '</footer>' in line:
        end_idx = i
        break

print(f"Footer start line: {start_idx+1}")
print(f"Footer end line: {end_idx+1}")

# Save context to a txt file to inspect
with open("scratch/check_footer.txt", "w", encoding="utf-8") as f_out:
    f_out.write(f"Footer: {start_idx+1} to {end_idx+1}\n\n")
    for idx in range(start_idx, min(len(lines), end_idx + 2)):
        f_out.write(f"{idx+1}: {lines[idx]}")

print("Done! Extracted footer details.")
