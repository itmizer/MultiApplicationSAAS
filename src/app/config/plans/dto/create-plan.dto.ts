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

export class plansService {
  @IsNumber()
  @ApiProperty({ example: 2, required: true })
  idService: number;
}

export class CreatePlanDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsString({ message: 'Campo Nome deverá se Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: 'Cross', required: true })
  name: string;

  @IsString({
    message: 'Campo Descrição é complementar deverá se Formato texto',
  })
  @IsOptional()
  @ApiProperty({ example: 'Cross', required: true })
  description: string;

  // @IsOptional()
  // @IsString({ message: 'Campo  tipo de Periodo é opcional' })
  // @ApiProperty({ example: 'Cross', required: true })
  // typePeriod: string;

  @IsNumber({ maxDecimalPlaces: 0 })
  @ApiProperty({ example: '5', required: true })
  daysOfWeek: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Quantidade de dias é Obrigatório' })
  @ApiProperty({ example: 1, required: true })
  qtdPeriod: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Valor do Plano é Obrigatório' })
  @ApiProperty({ example: 200, required: true })
  amount: number;

  @IsOptional()
  @ApiProperty({ example: 0.0 })
  taxRegistration: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1 })
  gracePeriod: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: false })
  promotional: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: false })
  acumulative: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Ativo', required: true })
  status: string;

  @IsArray()
  @ApiProperty({ type: [plansService] })
  planServices: plansService[];
}
