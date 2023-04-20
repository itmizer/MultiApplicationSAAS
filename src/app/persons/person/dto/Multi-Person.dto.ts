import { PersonDto } from './Person-dto';

import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
export class MultiPerson {
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ApiProperty({ title: 'Listagem de Pessoa' })
  person: PersonDto[];
}
