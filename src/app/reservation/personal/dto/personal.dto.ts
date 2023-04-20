import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class PersonalDto {
  @IsNotEmpty({ message: 'Data Obrigatorio' })
  @ApiProperty({ example: '2023-03-07T00:00:00.000Z', required: true })
  @Type(() => Date)
  data: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'Pessoa Obrigatorio' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;
}
