import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsDate,
  IsNumber,
  IsEmpty,
} from 'class-validator';

export class ScheduleDto {
  @IsNotEmpty({ message: 'Data é obrigatório' })
  @ApiProperty({ example: '2023-01-31', required: true })
  date: Date;

  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsNotEmpty({ message: 'Codigo de idPerson é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;

  @IsString()
  @ApiProperty({ example: 1, required: true })
  profile: string;

  @IsString()
  @ApiProperty({ example: 1, required: true })
  role: string;

  @ApiProperty({ example: 1 })
  cargo: string;
}
