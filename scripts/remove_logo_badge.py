from pathlib import Path

from PIL import Image


source = Path("/var/folders/_l/zpc026pn1rbfxtdpkhtp0yk40000gn/T/codex-clipboard-5223a782-11b4-4675-a7ab-3b2df2d5e634.png")
destination = Path("/Users/juca/Projects/pai-bruno/logo-sem-bola.png")

image = Image.open(source).convert("RGBA")
pixels = image.load()
width, height = image.size
result = Image.new("RGBA", image.size, (0, 0, 0, 0))
output = result.load()


def central_region(x: int, y: int) -> bool:
    # Cross, including its upright and horizontal bar.
    if 61 <= x <= 92 and 31 <= y <= 70:
        return True
    if 54 <= x <= 99 and 32 <= y <= 42:
        return True

    # Bowl/cup silhouette.
    if y < 58 or y > 90:
        return False
    top = 55 + max(0, y - 62) // 2
    bottom = 103 - max(0, y - 62) // 2
    return top <= x <= bottom


def is_badge_yellow(r: int, g: int, b: int) -> bool:
    return r > 210 and g > 145 and g < 235 and b < 80 and (r - b) > 150


for y in range(height):
    for x in range(width):
        if not central_region(x, y):
            continue
        r, g, b, a = pixels[x, y]
        if a and not is_badge_yellow(r, g, b):
            output[x, y] = (r, g, b, 255)

alpha = result.getchannel("A")
bounds = alpha.getbbox()
if bounds:
    result = result.crop(bounds)
result.save(destination)
print(destination)
