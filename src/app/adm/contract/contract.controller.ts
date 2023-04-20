import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: ContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.contractService.findOne(+id, headers.tenant_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() contractDto: ContractDto) {
    return this.contractService.update(+id, contractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
