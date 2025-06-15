import torch
from backend.diffusion.sds import ScoreDistillationSampler

class DummyDiffusionModel:
    def __init__(self):
        pass

def test_sds_loss():
    diffusion_model = DummyDiffusionModel()
    sds = ScoreDistillationSampler(diffusion_model)
    rendered_images = torch.randn(2, 3, 64, 64)
    text_embeds = torch.randn(2, 512)
    image_embeds = torch.randn(2, 512)
    loss = sds.compute_sds_loss(rendered_images, text_embeds, image_embeds)
    assert loss.requires_grad
    print('SDS loss placeholder OK')

if __name__ == '__main__':
    test_sds_loss() 