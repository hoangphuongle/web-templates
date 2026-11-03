with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'index.js?v=13.0' in line:
        print(f"Found index.js link at line {i+1}: {line.strip()}")
        lines[i] = line.replace("index.js?v=13.0", "index.js?v=14.0")
        break

with open("index.html", "w", encoding="utf-8") as f:
    f.writelines(lines)

print("Done updating index.js version in index.html to v=14.0")
