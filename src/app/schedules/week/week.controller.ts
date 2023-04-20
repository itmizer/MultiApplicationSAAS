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
import { WeekService } from './week.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { ApiHeader } from '@nestjs/swagger';
import { AppointmentDTO } from './dto/appointment.dto';
import { WeekReservationDto } from './dto/week-reservation.dto';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Post()
  create(@Body() createWeekDto: CreateWeekDto) {
    return this.weekService.create(createWeekDto);
  }

  @Get()
  findAll(@Headers() headers) {
    return this.weekService.findAll(+headers.tenant_id);
  }
  @Get('list')
  findList(@Headers() headers) {
    return this.weekService.findWeek(+headers.tenant_id);
  }
  @Post('reservation')
  findReservation(
    @Headers() headers,
    @Body() reservationDto: WeekReservationDto,
  ) {
    return this.weekService.findWeekReservation(
      +headers.tenant_id,
      reservationDto,
    );
  }
  @Get(':date')
  find(@Headers() headers, @Param('date') date: Date) {
    return this.weekService.find(date, +headers.tenant_id);
  }
  @Get('customer/:date')
  findHours(@Headers() headers, @Param('date') date: Date) {
    return this.weekService.find(date, +headers.tenant_id);
  }

  @Get('person/:id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.weekService.findOne(+id, +headers.tenant_id);
  }
  @Get('hour/:id')
  findhour(@Headers() headers, @Param('id') id: string) {
    return this.weekService.findHour(+id, +headers.tenant_id);
  }
  @Post('appointment')
  createAppointment(@Body() appointmentDTO: AppointmentDTO) {
    return this.weekService.createAppointmentMany(appointmentDTO);
  }
  @Delete('appointment/:id')
  deleteAppointment(@Headers() headers, @Param('id') id: string) {
    return this.weekService.deleteAppointment(+id);
  }
}
