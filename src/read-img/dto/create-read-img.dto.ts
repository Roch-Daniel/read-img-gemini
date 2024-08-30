import {
  IsString,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { MeasureType } from 'src/enum/MeasureType';

export class CreateReadImgDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  customer_code: string;

  @IsDateString()
  @IsNotEmpty()
  measure_datetime: string;

  @IsEnum(MeasureType)
  measure_type: MeasureType;

  @IsString()
  @IsOptional()
  image_url: string;

  @IsString()
  @IsOptional()
  measure_uuid: string;

  @IsNumber()
  @IsOptional()
  measure_value: number;
}
