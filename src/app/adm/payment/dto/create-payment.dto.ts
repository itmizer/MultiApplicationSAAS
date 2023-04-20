import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Data Inicio Obrigatorio' })
  @ApiProperty({ example: '2022-01-01', required: true })
  dateStart: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Data Inicio Obrigatorio' })
  @ApiProperty({ example: '2022-01-01', required: true })
  dtDue: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Data Inicio Obrigatorio' })
  @ApiProperty({ example: '2022-01-01', required: true })
  dtPayment: Date;
  @Type(() => Number)
  @ApiProperty({ example: 10.0, required: true })
  @IsNumber()
  amount: number;

  @Type(() => Number)
  @ApiProperty({ example: 10.0, required: true })
  @IsNumber()
  amountInvoice: number;

  @Type(() => Number)
  @ApiProperty({ example: 10.0, required: true })
  @IsNumber()
  amountDiscount: number;

  @IsString()
  @ApiProperty({ example: 'Dinheiro', required: true })
  typePayment: string;
}
