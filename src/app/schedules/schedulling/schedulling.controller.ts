import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedullingService } from './schedulling.service';
import { CreateSchedullingDto } from './dto/create-schedulling.dto';
import { UpdateSchedullingDto } from './dto/update-schedulling.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Invoice } from '@prisma/client';

@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Código Empresa',
})
@Controller('schedulling')
@ApiTags('schedules')
export class SchedullingController {
  constructor(private readonly schedullingService: SchedullingService) {}

  @Post()
  create(@Body() createSchedullingDto: CreateSchedullingDto) {
    return this.schedullingService.create(createSchedullingDto);
  }

  @Get()
  findAll() {
    return this.schedullingService.findAll();
  }
}
