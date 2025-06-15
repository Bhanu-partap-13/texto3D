import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image

# No relative imports needed here, this file is standalone

class CLIPEncoder:
    def __init__(self, device='cpu'):
        self.device = device
        self.model = CLIPModel.from_pretrained('openai/clip-vit-base-patch16').to(device)
        self.processor = CLIPProcessor.from_pretrained('openai/clip-vit-base-patch16')

    def encode_text(self, text):
        inputs = self.processor(text=[text], return_tensors="pt", padding=True).to(self.device)
        with torch.no_grad():
            text_embeds = self.model.get_text_features(**inputs)
        return text_embeds

    def encode_image(self, image: Image.Image):
        inputs = self.processor(images=image, return_tensors="pt").to(self.device)
        with torch.no_grad():
            image_embeds = self.model.get_image_features(**inputs)
        return image_embeds 