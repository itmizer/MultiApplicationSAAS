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

export class AppointmentDTO {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsNotEmpty({ message: 'Codigo Horário' })
  @ApiProperty({ example: 2, required: true })
  idHour: number;

  @IsNotEmpty({ message: 'Dia da semana' })
  @ApiProperty({ example: 2, required: true })
  dayOfWeek: number;

  @IsNotEmpty({ message: 'idPerson' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;

  // Company: CompanyDto;
  // HourWeek: CreateHourWeekDto;
}
