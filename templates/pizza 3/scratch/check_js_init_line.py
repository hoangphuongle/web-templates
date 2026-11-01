with open("index.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'document.readyState === "loading"' in line:
        print(f"Found readyState check at line {i+1}: {line.strip()}")
        # print around it
        for idx in range(max(0, i - 2), min(len(lines), i + 12)):
            print(f"{idx+1}: {lines[idx]}", end="")
        break
