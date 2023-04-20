import { ApiHeader, ApiTags } from '@nestjs/swagger';
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
import { PersonService } from './person.service';
import { PersonDto } from './dto/Person-dto';
import { MultiPerson } from './dto/Multi-Person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Codigo Empresa',
})
@Controller('person')
@ApiTags('Pessoas')
export class PersonsController {
  constructor(private readonly personsService: PersonService) {}

  @Post('')
  createPerson(@Body() personDto: PersonDto) {
    return this.personsService.create(personDto);
  }

  // @Post('create')
  // createMulti(@Body() PersonDto: MultiPerson) {
  //   return this.personsService.createMulti(PersonDto);
  // }

  @Get()
  findAll(@Headers() headers) {
    return this.personsService.findAll(+headers.tenant_id);
  }
  @Get('/all')
  findPersons() {
    return this.personsService.findPersons();
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.personsService.findOne(+id, +headers.tenant_id);
  }
  @Get('config/:id')
  findConfig(@Headers() headers, @Param('id') id: string) {
    return this.personsService.findContract(+id, +headers.tenant_id);
  }

  @Post(':id')
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() personDTO: UpdatePersonDto,
  ) {
    return this.personsService.update(+id, personDTO, +headers.tenant_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}
