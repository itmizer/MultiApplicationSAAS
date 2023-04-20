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
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
@ApiTags('Clientes')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customersService.create(createCustomerDto);
  // }

  @Get()
  findAll(@Headers() headers) {
    return this.customersService.findAll(+headers.tenant_id);
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.customersService.findOne(+headers.tenant_id, +id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(+id);
  // }
}
