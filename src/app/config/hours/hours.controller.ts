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
import { HoursService } from './hours.service';
import { NewHourWeekDto } from './dto/new-hour-week.dto';
import { UpdateHourWeekDto } from './dto/update-hour-week.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@ApiTags('hours')
@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  create(@Body() createHourDto: NewHourWeekDto) {
    return this.hoursService.create(createHourDto);
  }

  @Get()
  findAll(@Headers() headers) {
    const findTenant = headers.tenant_id;
    return this.hoursService.findAll(+findTenant);
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.hoursService.findOne(+id, +headers.tenant_id);
  }

  @Post(':id')
  pudate(@Param('id') id: string, @Body() updateHourDTO: UpdateHourWeekDto) {
    return this.hoursService.update(+id, updateHourDTO);
  }
  @Get('cancel/:id')
  inactive(@Headers() headers, @Param('id') id: string) {
    return this.hoursService.cancel(+id, +headers.tenant_id);
  }
  @Get('active/:id')
  active(@Headers() headers, @Param('id') id: string) {
    return this.hoursService.active(+id, +headers.tenant_id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.hoursService.remove(+id);
  }
}
