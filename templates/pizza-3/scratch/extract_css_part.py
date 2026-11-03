with open("index.css", "r", encoding="utf-8") as f:
    content = f.read()

# Find the start of testimonials section comment
import re
match = re.search(r"/\*\s*={3,}\s*PHẢN HỒI ĐÁNH GIÁ", content)
if match:
    start_pos = match.start()
    # Print next 3000 characters
    print("Found testimonials section at pos:", start_pos)
    sub = content[start_pos : start_pos + 6000]
    with open("scratch/extracted_css_part.txt", "w", encoding="utf-8") as f_out:
        f_out.write(sub)
    print("Done! Extracted to scratch/extracted_css_part.txt")
else:
    print("Not found testimonials section comment")
