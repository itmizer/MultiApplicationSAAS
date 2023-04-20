import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/Company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() data: CompanyDto) {
    return this.companyService.create(data);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.companyService.findOne(+code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companyService.remove(+id);
  // }
}
