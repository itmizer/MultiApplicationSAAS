import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsUUID,
  IsNumber,
  IsArray,
} from 'class-validator';
export class tpPayment {
  @IsString()
  @ApiProperty({ example: 2, required: true })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 1, required: true })
  type?: string;
}

export class CompanyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  NomeEmpresa: string;

  logomarca: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  razaosocial: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  logradouro: string;

  @ApiProperty()
  bairro: string;
  @ApiProperty()
  cep: string;
  @ApiProperty()
  cidade: string;
  @ApiProperty()
  estado: string;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  logradouroComplemento?: string;
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  status?: string;

  @IsArray()
  @ApiProperty({ type: [tpPayment] })
  typePayment: tpPayment[];
}
