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
import { FixedService } from './fixed.service';
import { CreateFixedDto } from './dto/create-fixed.dto';
import { UpdateFixedDto } from './dto/update-fixed.dto';
import { ApiHeader } from '@nestjs/swagger';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@Controller('schedules/fixed')
export class FixedController {
  constructor(private readonly fixedService: FixedService) {}

  // @Post()
  // create(@Body() createFixedDto: CreateFixedDto) {
  //   return this.fixedService.create(createFixedDto);
  // }

  // @Get()
  // findAll() {
  //   return this.fixedService.findAll();
  // }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.fixedService.findOne(+id, +headers.tenant_id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFixedDto: UpdateFixedDto) {
  //   return this.fixedService.update(+id, updateFixedDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fixedService.remove(+id);
  // }
}
