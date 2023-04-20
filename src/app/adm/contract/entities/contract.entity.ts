import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Contract {
  id: number;

  idPerson: number;
  plan: number;
  tenant_id: number;
  idAssign?: string;

  dateStart: Date;

  amount: number;
  amountTrade?: number;
  dateEnd?: Date;
  typeDoc?: string;

  typePayment: string;
  updatedAt: Date;
}
