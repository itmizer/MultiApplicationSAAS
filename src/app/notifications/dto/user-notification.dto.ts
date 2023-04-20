import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserNotificationDto {
  @IsNumber()
  @ApiProperty()
  idPerson: number;
  @IsNumber()
  @ApiProperty()
  tenant_id: number;
  @IsString()
  @ApiProperty()
  profile: string;

  // const body = 'This is a test notification';
}
