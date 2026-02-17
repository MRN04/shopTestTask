import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SizeDto {
  @IsNumber()
  @Min(0)
  width: number;

  @IsNumber()
  @Min(0)
  height: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsNumber()
  @Min(0)
  count: number;

  @ValidateNested()
  @Type(() => SizeDto)
  size: SizeDto;

  @IsString()
  @IsNotEmpty()
  weight: string;
}
