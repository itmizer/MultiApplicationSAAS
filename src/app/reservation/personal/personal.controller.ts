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
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { ApiHeader } from '@nestjs/swagger';
import { PersonalDto } from './dto/personal.dto';

@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@Controller('reservation/personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  // @Post()
  // create(@Body() createPersonalDto: CreatePersonalDto) {
  //   return this.personalService.create(createPersonalDto);
  // }

  @Post()
  listDate(@Body() personal: PersonalDto) {
    return this.personalService.listDate(personal);
  }
}
