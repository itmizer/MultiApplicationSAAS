import { PersonDto } from './Person-dto';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  ValidationOptions,
  IsString,
  IsBase64,
} from 'class-validator';

export class UpdatePersonDto extends PartialType(PersonDto) {
  @ApiProperty()
  @IsString()
  foto: string;

  sexo: string;
}
