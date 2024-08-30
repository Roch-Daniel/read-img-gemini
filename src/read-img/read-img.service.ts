import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReadImgDto } from './dto/create-read-img.dto';
import { UpdateReadImgDto } from './dto/update-read-img.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { MeasureType } from 'src/enum/MeasureType';

@Injectable()
export class ReadImgService {
  constructor(
    private prisma: PrismaService,
    private geminiService: GeminiService,
  ) {}

  findAll() {
    return this.prisma.readImg.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.readImg.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateReadImgDto) {
    try {
      const [, typeBase64, code] = data.image.match(/^data:(.+?);base64,(.+)$/);
      const { image_url, measure_value, measure_uuid } =
        await this.geminiService.processImage(
          data.measure_type,
          data.customer_code,
          code,
          typeBase64,
        );

      return await this.prisma.readImg.create({
        data: {
          ...data,
          image_url: image_url,
          measure_value,
          measure_uuid,
          measure_type: MeasureType[data.measure_type],
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, data: UpdateReadImgDto) {
    await this.exists(id);
    return this.prisma.readImg.update({
      data,
      where: {
        id,
      },
    });
  }

  async updateOne(id: number, data: UpdateReadImgDto) {
    await this.exists(id);
    return this.prisma.readImg.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.readImg.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.readImg.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`Id[${id}] Not found`);
    }
  }
}
