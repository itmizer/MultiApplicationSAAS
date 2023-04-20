import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';
export class PersonAuthDto {
  @IsString({ message: 'Este Campo é Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: 'John Due', required: true })
  name: string;

  @IsNotEmpty({ message: 'UUID é Obrigatório' })
  @ApiProperty()
  uuid: string;

  @IsNotEmpty({ message: 'Cpf Obrigatório' })
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  token: string;

  @IsOptional()
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  tenant_id: number;
}
