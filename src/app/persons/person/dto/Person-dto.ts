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
  IsDate,
} from 'class-validator';
export class PersonDto {
  @IsString({ message: 'Este Campo é Formato texto' })
  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @ApiProperty({ example: 'John Due', required: true })
  name: string;

  @ApiProperty()
  uuid: string;

  @IsNotEmpty({ message: 'Cpf Obrigatório' })
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The birthday of the user',

    format: 'date',
  })
  dataNascimento: Date;

  @ApiProperty()
  token: string;

  @IsNotEmpty({ message: 'Telefone  é obrigatório' })
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  tenant_id?: number;
}
