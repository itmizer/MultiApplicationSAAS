import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Data Inicio Obrigatorio' })
  @ApiProperty({ example: '2022-01-01', required: true })
  dtDue: Date;

  @Type(() => Date)
  @ApiProperty({ example: '2022-01-01', required: true })
  dtPayment: Date;

  @IsString()
  @ApiProperty({ example: 'Paga', required: true })
  status: string;

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
}
