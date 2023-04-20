import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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

export class ScheduleHourDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2023-04-10' })
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

  @IsNotEmpty({ message: 'Hora é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  idHour: number;
}
