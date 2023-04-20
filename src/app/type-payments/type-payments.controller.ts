import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypePaymentsService } from './type-payments.service';
import { CreateTypePaymentDto } from './dto/create-type-payment.dto';
import { UpdateTypePaymentDto } from './dto/update-type-payment.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiTags('Tipos de Pagamentos')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Código Empresa',
})
@Controller('typePayment')
export class TypePaymentsController {
  constructor(private readonly typePaymentsService: TypePaymentsService) {}

  @Post()
  create(@Body() createTypePaymentDto: CreateTypePaymentDto) {
    return this.typePaymentsService.create(createTypePaymentDto);
  }

  @Get()
  findAll(@Headers() headers) {
    return this.typePaymentsService.findAll(+headers.tenant_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.typePaymentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTypePaymentDto: UpdateTypePaymentDto) {
  //   return this.typePaymentsService.update(+id, updateTypePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.typePaymentsService.remove(+id);
  // }
}
