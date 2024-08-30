import { PartialType } from '@nestjs/mapped-types';
import { CreateReadImgDto } from './create-read-img.dto';

export class UpdateReadImgDto extends PartialType(CreateReadImgDto) {}
