import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateListReservationDto } from './create-list-reservation.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateListReservationDto extends PartialType(
  CreateListReservationDto,
) {
  @IsString()
  @ApiProperty({ example: 'Concluido', required: true })
  status: string;
  // @IsNumber()
  // @ApiProperty({ example: 'Concluido', required: true })
  // idReservation: number;
}
