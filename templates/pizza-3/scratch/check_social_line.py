with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'mang-xa-hoi' in line:
        print(f"Found 'mang-xa-hoi' at line {i+1}: {line.strip()}")
        # Print lines around it
        for idx in range(max(0, i - 3), min(len(lines), i + 8)):
            print(f"{idx+1}: {lines[idx]}", end="")
        break
