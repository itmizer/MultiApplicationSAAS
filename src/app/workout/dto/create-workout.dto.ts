import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateWorkoutDto {
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;

  @Type(() => Date)
  @IsNotEmpty({ message: 'Data Obrigatória' })
  @ApiProperty({ example: '2022-04-10', required: true })
  date: Date;

  @IsNotEmpty({ message: 'service obrigatório' })
  @ApiProperty({ example: 1, required: true })
  service: number;

  @IsNotEmpty({ message: 'service obrigatório' })
  @ApiProperty({ example: 'Descreva workout', required: true })
  description: string;

  @ApiProperty({ example: null })
  idPerson: number;
}
