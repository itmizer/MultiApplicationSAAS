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
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
@ApiTags('calendar')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  // @Post()
  // create(@Body() createCalendarDto: CreateCalendarDto) {
  //   return this.calendarService.create(createCalendarDto);
  // }

  @Get('')
  findAll(@Headers() headers) {
    return this.calendarService.findAll(+headers.tenant_id);
  }
  @Get(':date')
  active(@Param('date') date: string, @Headers() headers) {
    return this.calendarService.update(+headers.tenant_id, new Date(date));
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCalendarDto: UpdateCalendarDto,
  // ) {
  //   return this.calendarService.update(+id, updateCalendarDto);
  // }
}
