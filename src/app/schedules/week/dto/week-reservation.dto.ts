import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class WeekReservationDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsNotEmpty({ message: 'pessoa' })
  @ApiProperty({ example: 2, required: true })
  idPerson: number;

  @IsNotEmpty({ message: 'profile' })
  @ApiProperty({ example: 2, required: true })
  profile: String;

  @ApiProperty({ example: 1, required: true })
  cargo: String;

  @ApiProperty({ example: 1, required: true })
  role: String;
}
