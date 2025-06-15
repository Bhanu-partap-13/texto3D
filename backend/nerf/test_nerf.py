import torch
from backend.nerf.model import NeRF
from backend.nerf.render import volume_render_rays

def test_nerf_forward():
    nerf = NeRF()
    N_rays = 2
    N_samples = 8
    input_ch = 3
    input_ch_dir = 3
    # Random input: (N_rays*N_samples, input_ch + input_ch_dir)
    x = torch.randn(N_rays * N_samples, input_ch + input_ch_dir)
    out = nerf(x)
    assert out.shape == (N_rays * N_samples, 4)
    print('NeRF forward pass OK')

def test_volume_render():
    N_rays = 2
    N_samples = 8
    rgb_sigma = torch.randn(N_rays, N_samples, 4)
    z_vals = torch.linspace(0, 1, N_samples).expand(N_rays, N_samples)
    dirs = torch.randn(N_rays, 3)
    rgb_map, depth_map, acc_map = volume_render_rays(rgb_sigma, z_vals, dirs)
    assert rgb_map.shape == (N_rays, 3)
    assert depth_map.shape == (N_rays,)
    assert acc_map.shape == (N_rays,)
    print('Volume rendering OK')

if __name__ == '__main__':
    test_nerf_forward()
    test_volume_render() 