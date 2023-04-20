import { PartialType } from '@nestjs/swagger';
import { CreatePersonalDto } from './create-personal.dto';

export class UpdatePersonalDto extends PartialType(CreatePersonalDto) {}
