import { PartialType } from '@nestjs/swagger';
import { CreateFixedDto } from './create-fixed.dto';

export class UpdateFixedDto extends PartialType(CreateFixedDto) {}
