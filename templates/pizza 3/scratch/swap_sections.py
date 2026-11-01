with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Locate the sections using comments
import re

news_pattern = r"(<!--\s*={3,}\s*TIN TỨC MỚI NHẤT.*?</section>)"
social_pattern = r"(<!--\s*={3,}\s*KÊNH TRUYỀN THÔNG MẠNG XÃ HỘI.*?</section>)"

news_match = re.search(news_pattern, content, re.DOTALL)
social_match = re.search(social_pattern, content, re.DOTALL)

if news_match and social_match:
    news_block = news_match.group(1)
    social_block = social_match.group(1)
    
    print("Found both blocks!")
    print("News Block Length:", len(news_block))
    print("Social Block Length:", len(social_block))
    
    # We will replace both blocks in their new order
    # Let's find the container block starting from the first to the end of the second
    start_pos = min(news_match.start(), social_match.start())
    end_pos = max(news_match.end(), social_match.end())
    
    # The middle separator (whitespace, comments)
    middle = content[min(news_match.end(), social_match.end()) : max(news_match.start(), social_match.start())]
    
    # Swap blocks
    new_combined = social_block + middle + news_block
    
    # Replace in file
    new_content = content[:start_pos] + new_combined + content[end_pos:]
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Swap completed successfully!")
else:
    print("Error: Could not locate blocks using regex")
