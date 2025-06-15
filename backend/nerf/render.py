import torch
import torch.nn.functional as F

# No relative imports needed here, this file is standalone

def volume_render_rays(rgb_sigma, z_vals, dirs):
    """
    Args:
        rgb_sigma: (N_rays, N_samples, 4) - RGB and sigma (density) values from NeRF
        z_vals: (N_rays, N_samples) - Depths along each ray
        dirs: (N_rays, 3) - Ray directions
    Returns:
        rgb_map: (N_rays, 3) - Rendered RGB color for each ray
        depth_map: (N_rays,) - Depth map
        acc_map: (N_rays,) - Accumulated opacity (alpha)
    """
    rgb = torch.sigmoid(rgb_sigma[..., :3])  # (N_rays, N_samples, 3)
    sigma = F.relu(rgb_sigma[..., 3])         # (N_rays, N_samples)

    dists = z_vals[..., 1:] - z_vals[..., :-1]
    dists = torch.cat([dists, 1e10 * torch.ones_like(dists[..., :1])], -1)  # (N_rays, N_samples)
    dists = dists * torch.norm(dirs[..., None, :], dim=-1)

    alpha = 1.0 - torch.exp(-sigma * dists)  # (N_rays, N_samples)
    T = torch.cumprod(torch.cat([torch.ones_like(alpha[..., :1]), 1.0 - alpha + 1e-10], -1), -1)[..., :-1]
    weights = alpha * T  # (N_rays, N_samples)

    rgb_map = torch.sum(weights[..., None] * rgb, -2)  # (N_rays, 3)
    depth_map = torch.sum(weights * z_vals, -1)
    acc_map = torch.sum(weights, -1)
    return rgb_map, depth_map, acc_map 