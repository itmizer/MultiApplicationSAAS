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
import { ListReservationService } from './list-reservation.service';
import { CreateListReservationDto } from './dto/create-list-reservation.dto';
import { UpdateListReservationDto } from './dto/update-list-reservation.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@ApiTags('Reservation')
@Controller('reservation')
export class ListReservationController {
  constructor(
    private readonly listReservationService: ListReservationService,
  ) {}

  @Post()
  create(@Body() createListReservationDto: CreateListReservationDto) {
    return this.listReservationService.create(createListReservationDto);
  }

  @Get()
  findAll() {
    return this.listReservationService.findAll();
  }

  @Get('cancel/:date')
  cancel(@Headers() headers, @Param('date') id: number) {
    return this.listReservationService.cancel(+id, +headers.tenant_id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.listReservationService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListReservationDto: UpdateListReservationDto,
  ) {
    return this.listReservationService.update(+id, updateListReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listReservationService.remove(+id);
  }
}
