import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Contract } from '../entities/contract.entity';

export class ContractDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty({ message: 'Pessoa Obrigatorio' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;
  @IsNumber()
  @IsNotEmpty({ message: 'Plano Obrigatorio' })
  @ApiProperty({ example: 1, required: true })
  plan: number;
  @IsNumber()
  @IsNotEmpty({ message: 'Empresa Obrigatorio' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Data Inicio Obrigatorio' })
  @ApiProperty({ example: '2022-01-01', required: true })
  dateStart: Date;

  @ApiProperty({ example: 10.0, required: true })
  @IsNumber()
  amount: number;

  @IsString()
  @ApiProperty({ example: 'Dinheiro', required: true })
  typePayment: string;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 'Dinheiro', required: true })
  taxRegistration: number;

  @IsNumber()
  @ApiProperty({ example: 'Dinheiro', required: true })
  period: number;
}
