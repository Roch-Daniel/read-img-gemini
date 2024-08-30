import { Module } from '@nestjs/common';
import { ReadImgService } from './read-img.service';
import { ReadImgController } from './read-img.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [PrismaModule, GeminiModule],
  controllers: [ReadImgController],
  providers: [ReadImgService],
})
export class ReadImgModule {}
