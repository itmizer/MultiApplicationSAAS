import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFirebaseDto {
  @IsNumber()
  @ApiProperty({ example: 2, required: true })
  tenant_id: number;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  type: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  project_id: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  private_key_id: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  private_key: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  client_email: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  client_id: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  auth_uri: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  token_uri: string;

  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  auth_provider_x509_cert_url: string;
  @IsString({ message: 'Este Campo é Formato texto' })
  @ApiProperty({ example: '', required: true })
  client_x509_cert_url: string;
}
