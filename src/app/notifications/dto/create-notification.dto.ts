import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsNumber()
  @ApiProperty()
  idPerson?: number;
  @IsString()
  @ApiProperty()
  body: string;
  @IsString()
  @ApiProperty()
  data?: string;

  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsString()
  @ApiProperty()
  topic?: string;
  @IsNumber()
  @ApiProperty()
  tenant_id: number;

  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsString()
  @ApiProperty()
  type?: string;
  @IsOptional() // Adicione o decorator @IsOptional() para tornar o campo opcional
  @IsString()
  @ApiProperty({
    required: false, // Define o campo como opcional
    description: 'Este é um campo opcional de token',
  })
  token?: string;

  // const body = 'This is a test notification';
}
