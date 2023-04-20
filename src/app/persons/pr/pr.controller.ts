import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrService } from './pr.service';
import { CreatePrDto } from './dto/create-pr.dto';
import { UpdatePrDto } from './dto/update-pr.dto';

@Controller('pr')
export class PrController {
  constructor(private readonly prService: PrService) {}

  @Post()
  create(@Body() createPrDto: CreatePrDto) {
    return this.prService.create(createPrDto);
  }

  @Get()
  findAll() {
    return this.prService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrDto: UpdatePrDto) {
    return this.prService.update(+id, updatePrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prService.remove(+id);
  }
}
