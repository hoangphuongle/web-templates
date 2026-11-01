with open("index.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

news_start = -1
news_end = -1
social_start = -1
social_end = -1

for i, line in enumerate(lines):
    if 'class="news-section"' in line or 'id="tin-tuc"' in line:
        news_start = i
    if news_start != -1 and news_end == -1 and '</section>' in line:
        # We need to make sure this is the end of the news section.
        # It ends right before the social-promo-section start.
        if 'social-promo-section' in lines[i+1] or 'KÊNH TRUYỀN THÔNG MẠNG XÃ HỘI' in lines[i+1] or 'KÊNH TRUYỀN THÔNG MẠNG XÃ HỘI' in lines[i+2]:
            news_end = i

    if 'class="social-promo-section"' in line or 'id="mang-xa-hoi"' in line:
        social_start = i
    if social_start != -1 and social_end == -1 and '</section>' in line:
        if '</main>' in lines[i+1] or '</main>' in lines[i+2]:
            social_end = i

print(f"News Start Line: {news_start+1}, End Line: {news_end+1}")
print(f"Social Start Line: {social_start+1}, End Line: {social_end+1}")

# Write to txt file to verify
with open("scratch/check_sections_swap.txt", "w", encoding="utf-8") as f_out:
    f_out.write(f"News: {news_start+1} to {news_end+1}\n")
    f_out.write(f"Social: {social_start+1} to {social_end+1}\n")
