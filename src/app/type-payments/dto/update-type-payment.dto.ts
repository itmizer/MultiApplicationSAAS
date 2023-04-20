import { PartialType } from '@nestjs/swagger';
import { CreateTypePaymentDto } from './create-type-payment.dto';

export class UpdateTypePaymentDto extends PartialType(CreateTypePaymentDto) {}
