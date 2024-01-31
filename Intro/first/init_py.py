# init.py
from rembg import remove
from PIL import Image
import sys

input_path = sys.argv[1]
output_path = sys.argv[2]

print(f"Processing image from {input_path}")

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)

print(f"Image processed successfully. Saved to {output_path}")
