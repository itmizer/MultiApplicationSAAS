import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsString()
  @ApiProperty()
  token?: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsNumber()
  @ApiProperty()
  tenant_id: number;

  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsNumber()
  @ApiProperty()
  idPerson?: number;

  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsString()
  @ApiProperty()
  topic?: string;

  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsString()
  @ApiProperty()
  code?: number;

  // const body = 'This is a test notification';
}
