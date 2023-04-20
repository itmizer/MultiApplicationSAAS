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

export class CreateScheduleDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsString({ message: 'Este Campo é Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: 'Cross 08', required: true })
  name: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: '08:00', required: true })
  hourStart: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: '09:00', required: true })
  hourEnd: string;

  @ApiProperty({ example: '10', required: true })
  @IsNotEmpty()
  @IsString()
  vacancy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ativo', required: true })
  status: string;

  @IsEmpty()
  @ApiProperty({ example: 'Coletivo / Individual' })
  tipoReservation: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Cross / Musculação / acessorios ' })
  typeHour?: string;

  @IsEmpty()
  @ApiProperty({ example: null })
  @IsEmpty()
  creditBonus: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  service: number;

  // Company: CompanyDto;
  // HourWeek: CreateHourWeekDto;
}
