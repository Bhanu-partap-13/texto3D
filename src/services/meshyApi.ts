const BACKEND_BASE_URL = "http://localhost:8000";

export interface TaskResponse {
  obj_download: string;
  glb_download: string;
}

class BackendApiService {
  async generate3DModel(text: string, imageFile?: File): Promise<TaskResponse> {
    const formData = new FormData();
    formData.append("text", text);
    if (imageFile) {
      formData.append("images", imageFile);
    }
    const response = await fetch(`${BACKEND_BASE_URL}/generate-3d-model/`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Generation failed");
    }
    return response.json();
  }
}

export const backendApi = new BackendApiService();