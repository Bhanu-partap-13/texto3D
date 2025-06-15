import torch
import torch.nn as nn
import torch.nn.functional as F

# No relative imports needed here, this file is standalone

class NeRF(nn.Module):
    def __init__(self, D=8, W=256, input_ch=3, input_ch_dir=3, output_ch=4, skips=[4]):
        super(NeRF, self).__init__()
        self.D = D
        self.W = W
        self.input_ch = input_ch
        self.input_ch_dir = input_ch_dir
        self.skips = skips

        self.pts_linears = nn.ModuleList(
            [nn.Linear(input_ch, W)] + [nn.Linear(W, W) if i not in self.skips else nn.Linear(W + input_ch, W) for i in range(D-1)]
        )

        self.views_linears = nn.ModuleList([nn.Linear(input_ch_dir + W, W // 2)])

        self.feature_linear = nn.Linear(W, W)
        self.alpha_linear = nn.Linear(W, 1)
        self.rgb_linear = nn.Linear(W // 2, 3)

    def forward(self, x):
        input_pts, input_dirs = torch.split(x, [self.input_ch, self.input_ch_dir], dim=-1)
        h = input_pts
        for i, l in enumerate(self.pts_linears):
            h = l(h)
            h = F.relu(h)
            if i in self.skips:
                h = torch.cat([input_pts, h], -1)
        alpha = self.alpha_linear(h)
        feature = self.feature_linear(h)
        h = torch.cat([feature, input_dirs], -1)
        for l in self.views_linears:
            h = l(h)
            h = F.relu(h)
        rgb = self.rgb_linear(h)
        outputs = torch.cat([rgb, alpha], -1)
        return outputs 