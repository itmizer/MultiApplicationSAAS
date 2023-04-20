import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { findWorkoutDto } from './dto/find-workout.dto';
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Código Empresa',
})
@ApiTags('workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto);
  }
  @Post('find')
  find(@Body() findWorkout: findWorkoutDto) {
    return this.workoutService.find(findWorkout);
  }

  @Get()
  findAll(@Headers() headers) {
    return this.workoutService.findAll(+headers.tenant_id);
  }

  @Get(':date')
  findDate(@Headers() headers, @Param('date') date: Date) {
    return this.workoutService.findDate(+headers.tenant_id, date);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }
}
