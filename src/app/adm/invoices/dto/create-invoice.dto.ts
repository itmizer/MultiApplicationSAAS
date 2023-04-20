import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Empresa Obrigatorio' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Pessoa' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Pessoa' })
  @ApiProperty({ example: 1, required: true })
  plan: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Data Inicio Obrigatorio' })
  @ApiProperty({ example: '2022-01-01', required: true })
  dateStart: Date;

  @Type(() => Number)
  @ApiProperty({ example: 10.0, required: true })
  @IsNumber()
  amount: number;

  @IsString()
  @ApiProperty({ example: 'Dinheiro', required: true })
  typePayment: string;
}
