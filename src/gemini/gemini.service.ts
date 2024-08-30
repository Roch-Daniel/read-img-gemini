import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Logger } from '@nestjs/common';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private readonly logger = new Logger(GeminiService.name);

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async processImage(
    measure_type: string,
    customer_code: string,
    base64Image: string,
    mimeType: string = 'image/jpeg',
  ): Promise<{
    image_url: string;
    measure_value: number;
    measure_uuid: string;
  }> {
    try {
      this.logger.log('erro');
      if (!['image/jpeg', 'image/png'].includes(mimeType)) {
        throw new BadRequestException(
          'Invalid image format. Only JPEG and PNG are supported',
        );
      }
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const prompt = `I am an assistant that analyzes images and extracts relevant information.

      Here is the image provided in base64:
      \`\`\`base64
      ${base64Image}
      \`\`\`

      The additional information is:
      - Customer code: ${customer_code}
      - Measure type: ${measure_type}

      Analyze the image and respond with the following information:

      - Meter reading
      - Measurement UUID
      - Processed image URL

      Response format: Meter:<meter reading value>|UUID:<UUID>|URL:<URL>

      Remember:
      - Use only numbers for the meter reading.
      - If the UUID is not available, leave the field blank.
      - If the processed image URL is not available, leave the field blank.
    `;

      const result = await model.generateContent([
        prompt,
        { inlineData: { data: base64Image, mimeType: mimeType } },
      ]);

      const response = await result.response;
      const textGemini = await response.text().trim();

      const [measure_value, measure_uuid, image_url] = textGemini
        .split('|')
        .map((result: string) =>
          result.split(':')[1] ? result.split(':')[1] : undefined,
        );

      if (!measure_value || !measure_uuid || !image_url) {
        throw new Error(
          `Failed to extract required values from Gemini response: ${textGemini}`,
        );
      }

      return { image_url, measure_value: Number(measure_value), measure_uuid };
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error);
    }
  }
}
