const TEXT_TO_IMAGE_API_KEY = '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';
const TEXT_TO_IMAGE_BASE_URL = 'https://api.novelai.net/ai/generate-image'; // Replace with actual endpoint if different

export interface TextToImageResponse {
  imageUrl: string;
}

class TextToImageApiService {
  async generateImage(prompt: string): Promise<TextToImageResponse> {
    const response = await fetch(TEXT_TO_IMAGE_BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TEXT_TO_IMAGE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Adjust the following line based on actual API response structure
    return { imageUrl: data.imageUrl || data.url || data.result };
  }
}

export const textToImageApi = new TextToImageApiService(); 