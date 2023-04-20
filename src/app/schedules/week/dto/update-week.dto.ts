import { PartialType } from '@nestjs/swagger';
import { CreateWeekDto } from './create-week.dto';

export class UpdateWeekDto extends PartialType(CreateWeekDto) {}
