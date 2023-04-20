import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Codigo Empresa',
})
@ApiTags('Reservation')
@Controller('reservation/box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post()
  create(@Body() createBoxDto: CreateBoxDto) {
    return this.boxService.create(createBoxDto);
  }

  // @Get()
  // findAll() {
  //   return this.boxService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.boxService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
  //   return this.boxService.update(+id, updateBoxDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boxService.remove(+id);
  // }
}
