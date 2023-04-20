import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';

import { ScheduleDto } from './dto/schedule.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ScheduleHourDto } from './dto/scheduleHour.dto';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Código Empresa',
})
@Controller('schedules')
@ApiTags('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  find(@Headers() headers, @Body() schedule: ScheduleDto) {
    return this.schedulesService.findHour(schedule);
  }
  @Post('detail')
  findDetail(@Headers() headers, @Body() schedule: ScheduleHourDto) {
    return this.schedulesService.findDetail(schedule, +headers.tenant_id);
  }

  // @Get()
  // findAll(@Headers() headers) {
  //   //return request;
  //   //  console.log(request.headers.tenant_id);

  //   const findTenant = headers.tenant_id;
  //   return this.schedulesService.findAll(+findTenant);
  // }
}
