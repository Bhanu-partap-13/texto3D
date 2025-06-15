from backend.diffusion.clip_encoder import CLIPEncoder
from PIL import Image
import torch
import numpy as np

def test_clip_encoder():
    encoder = CLIPEncoder()
    # Test text encoding
    text = "A photo of a cat"
    text_embeds = encoder.encode_text(text)
    assert text_embeds.shape[1] == 512
    print('Text embedding shape:', text_embeds.shape)
    # Test image encoding with a dummy image
    image = Image.fromarray(np.uint8(np.random.rand(224, 224, 3) * 255))
    image_embeds = encoder.encode_image(image)
    assert image_embeds.shape[1] == 512
    print('Image embedding shape:', image_embeds.shape)
    print('CLIPEncoder test OK')

if __name__ == '__main__':
    test_clip_encoder() 