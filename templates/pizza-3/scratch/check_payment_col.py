with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if 'class="footer-col footer-payment-col"' in line:
        start_idx = i
    if start_idx != -1 and end_idx == -1 and '</div>' in line:
        # find the end of this column (it ends with closing div)
        # let's look ahead for the next columns or row end
        if '</div>' in lines[i] and ('</div>' in lines[i+1] or '<!-- Row 2' in lines[i+1] or '</div>' in lines[i+2]):
            end_idx = i

print(f"Payment Col start line: {start_idx+1}")
print(f"Payment Col end line: {end_idx+1}")

with open("scratch/check_payment_col.txt", "w", encoding="utf-8") as f_out:
    for idx in range(start_idx, min(len(lines), start_idx + 18)):
        f_out.write(f"{idx+1}: {lines[idx]}")

print("Done checking payment col lines.")
