import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class findWorkoutDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @IsNotEmpty({ message: 'Data Obrigatória' })
  @ApiProperty({ example: '2022-04-10', required: true })
  date: Date;

  @ApiProperty({ example: null })
  idPerson: number;
}
