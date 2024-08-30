import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReadImgService } from './read-img.service';
/* import { CreateReadImgDto } from './dto/create-read-img.dto'; */
import { UpdateReadImgDto } from './dto/update-read-img.dto';
import { CreateReadImgDto } from './dto/create-read-img.dto';

@Controller('read-img')
export class ReadImgController {
  constructor(private readonly readImgService: ReadImgService) {}

  @Get()
  findAll() {
    return this.readImgService.findAll();
  }

  @Post()
  create(@Body() createReadImgDto: CreateReadImgDto) {
    return this.readImgService.create(createReadImgDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readImgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadImgDto: UpdateReadImgDto) {
    return this.readImgService.update(+id, updateReadImgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readImgService.remove(+id);
  }
}
