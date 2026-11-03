from rembg import remove
from PIL import Image

def process(input_path, output_path):
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)

process('/Users/viralworks/.gemini/antigravity/brain/4c30594f-7f69-4a1f-b63f-dc5c1eff4408/fruit_tea_1778504600991.png', 'fruit_tea_bg_removed.png')
process('/Users/viralworks/.gemini/antigravity/brain/4c30594f-7f69-4a1f-b63f-dc5c1eff4408/milk_tea_1778504623558.png', 'milk_tea_bg_removed.png')
process('/Users/viralworks/.gemini/antigravity/brain/4c30594f-7f69-4a1f-b63f-dc5c1eff4408/coffee_1778504646547.png', 'coffee_bg_removed.png')
process('/Users/viralworks/.gemini/antigravity/brain/4c30594f-7f69-4a1f-b63f-dc5c1eff4408/bottled_drink_1778504675844.png', 'bottled_drink_bg_removed.png')
print("Done")
