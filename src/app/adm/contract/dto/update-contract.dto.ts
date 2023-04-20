import { PartialType } from '@nestjs/swagger';
import { ContractDto } from './contract.dto';

export class UpdateContractDto extends PartialType(ContractDto) {}
