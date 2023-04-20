import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateListReservationDto {
  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  idPerson: number;

  @IsNumber()
  @ApiProperty({ example: 3, required: true })
  tenant_id: number;

  @IsString()
  @ApiProperty({ example: 'CUSTOMER', required: true })
  profile: string;

  @ApiProperty({ example: 'USER', required: true })
  role: string;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ example: '2023-04-10' })
  date: Date;

  @IsNumber()
  @ApiProperty({ example: 2, required: true })
  idHour: number;
}
