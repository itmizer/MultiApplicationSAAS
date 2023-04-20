import { PartialType } from '@nestjs/swagger';
import { CreateSchedullingDto } from './create-schedulling.dto';

export class UpdateSchedullingDto extends PartialType(CreateSchedullingDto) {}
