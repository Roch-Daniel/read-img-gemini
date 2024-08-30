import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async processImage(
    base64Image: string,
    mimeType: string = 'image/jpeg',
  ): Promise<{
    image_url: string;
    measure_value: number;
    measure_uuid: string;
  }> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
      });
      const prompt =
        'What is the meter reading in this image? Please respond with only the numeric value, include the unique UUID if available, and return the processed image URL if any.';

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image, mimeType: mimeType } },
      ]);

      const response = await result.response;
      const text = await response.text();

      const measure_value = parseFloat(text.replace(/[^0-9.]/g, ''));
      const measure_uuid = this.extractUUID(text);
      const image_url = this.extractImageUrl(text);

      if (isNaN(measure_value) || !measure_uuid || !image_url) {
        throw new Error(
          `Failed to extract required values from Gemini response: ${text}`,
        );
      }

      return { image_url, measure_value, measure_uuid };
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error);
    }
  }

  private extractUUID(text: string): string {
    const uuidRegex =
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    const match = text.match(uuidRegex);
    return match ? match[0] : null;
  }

  private extractImageUrl(text: string): string {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  }
}
