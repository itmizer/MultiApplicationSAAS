import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MenuAppDto {
  @ApiProperty()
  @IsNumber()
  idPerson: number;

  @IsNumber()
  @ApiProperty()
  tenant_id: number;
  @IsString()
  @ApiProperty()
  profile: string;
  @IsString()
  @ApiProperty()
  role: string;
}
