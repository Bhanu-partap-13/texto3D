from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from typing import List
from PIL import Image
import numpy as np
import tempfile
from backend.nerf.train import train_nerf_from_text_image
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Text+Image to 3D API is running."}

@app.post("/generate-3d-model/")
def generate_3d_model(
    text: str = Form(...),
    images: List[UploadFile] = File(None)
):
    # Save uploaded images to disk and open as PIL
    pil_images = []
    for img in images or []:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmp:
            tmp.write(img.file.read())
            pil_images.append(Image.open(tmp.name).convert('RGB'))
    # Use the first image for now (extend to multi-view later)
    image_pil = pil_images[0] if pil_images else Image.fromarray(np.uint8(np.random.rand(224, 224, 3) * 255))
    # Run training pipeline (dummy run, returns output.obj and output.glb)
    obj_path, glb_path = train_nerf_from_text_image(text, image_pil, device='cpu', steps=3)
    # Return download links
    return {
        "obj_download": "/download/obj",
        "glb_download": "/download/glb"
    }

@app.get("/download/obj")
def download_obj():
    obj_path = os.path.join(os.path.dirname(__file__), '../nerf/output.obj')
    return FileResponse(obj_path, media_type='application/octet-stream', filename='output.obj')

@app.get("/download/glb")
def download_glb():
    glb_path = os.path.join(os.path.dirname(__file__), '../nerf/output.glb')
    return FileResponse(glb_path, media_type='application/octet-stream', filename='output.glb') 