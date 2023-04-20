import { PartialType } from '@nestjs/swagger';
import { CreatePrDto } from './create-pr.dto';

export class UpdatePrDto extends PartialType(CreatePrDto) {}
