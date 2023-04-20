import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBoxDto {
  @IsNotEmpty({ message: 'Codigo de Pessoa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  idPerson: number;
  @IsNotEmpty({ message: 'Codigo de Empresa é obrigatório' })
  @ApiProperty({ example: 1, required: true })
  tenant_id: number;
  @Type(() => Date)
  @IsNotEmpty({ message: 'data Para Pagamento ' })
  @ApiProperty({ example: '2022-04-01', required: true })
  date: Date;
  @Type(() => Number)
  @IsNotEmpty({ message: 'data Para Pagamento ' })
  @ApiProperty({ example: 1, required: true })
  idHour: number;
}
