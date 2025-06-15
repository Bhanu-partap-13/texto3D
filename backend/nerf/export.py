import numpy as np
import trimesh
from skimage import measure
# No relative imports needed here, this file is standalone

def export_density_to_mesh(density_field, threshold=0.5, voxel_size=1.0, obj_path='output.obj', glb_path='output.glb'):
    """
    Args:
        density_field: (N, N, N) numpy array of densities
        threshold: float, density threshold for surface
        voxel_size: float, size of each voxel
        obj_path: str, path to save .obj file
        glb_path: str, path to save .glb file
    """
    # Marching cubes to extract mesh
    verts, faces, normals, values = measure.marching_cubes(density_field, level=threshold)
    verts = verts * voxel_size  # scale to world units
    mesh = trimesh.Trimesh(vertices=verts, faces=faces, vertex_normals=normals)
    mesh.export(obj_path)
    mesh.export(glb_path)
    print(f"Exported mesh to {obj_path} and {glb_path}")
    return obj_path, glb_path

if __name__ == '__main__':
    # Example: random density field
    N = 32
    density = np.random.rand(N, N, N)
    export_density_to_mesh(density, threshold=0.5, voxel_size=1.0, obj_path='test.obj', glb_path='test.glb') 