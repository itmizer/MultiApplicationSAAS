import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  isBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsString({ message: 'Campo Nome deverá se Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: 'Cross', required: true })
  name: string;

  @ApiProperty({ example: 'categoria', required: true })
  category: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  Descritivo: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  status: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  valorDiaria: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  TipoAula: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  valor: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  custo: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  tempoServico: string;

  @ApiProperty({ example: 'Descritivo', required: true })
  Reservation: string;
}
