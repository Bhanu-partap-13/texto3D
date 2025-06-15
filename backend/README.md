# Backend Setup (Text+Image to 3D)

## 1. Create and Activate Python Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

## 2. Install Requirements

```bash
pip install -r requirements.txt
```

## 3. Run the API

```bash
uvicorn api.main:app --reload
```

---

- All ML code (NeRF, diffusion, etc.) is in this backend folder.
- The API will expose endpoints for text+image to 3D model generation.
- See `requirements.txt` for dependencies. 