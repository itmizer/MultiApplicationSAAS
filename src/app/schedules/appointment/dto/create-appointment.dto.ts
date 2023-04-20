import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AppointmentDto {
  @IsNumber()
  @ApiProperty({ example: 2, required: true })
  dayOfWeek: number;

  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  idHour: number;
}

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;
  @Type(() => Number)
  @IsNotEmpty({ message: 'data Para Pagamento ' })
  @ApiProperty({ example: 1, required: true })
  datePayment: number;

  @IsArray()
  @ApiProperty({ type: [AppointmentDto] })
  PersonAppointment: AppointmentDto[];
}
