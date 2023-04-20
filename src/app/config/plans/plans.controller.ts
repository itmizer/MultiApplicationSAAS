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
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Custom header',
})
@ApiTags('Planos')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll(@Headers() headers) {
    return this.plansService.findAll(+headers.tenant_id);
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    return this.plansService.findOne(+id, +headers.tenant_id);
  }

  @Post(':id')
  update(
    @Headers() headers,
    @Param('id') id: string,
    @Body() createPlan: CreatePlanDto,
  ) {
    return this.plansService.update(+id, createPlan, +headers.tenant_id);
  }
  @Get('inactive/:id')
  cancel(@Param('id') id: string, @Headers() headers) {
    return this.plansService.cancel(+id, headers.tenant_id);
  }
  @Get('active/:id')
  active(@Param('id') id: string, @Headers() headers) {
    return this.plansService.active(+id, headers.tenant_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(+id);
  }
}
