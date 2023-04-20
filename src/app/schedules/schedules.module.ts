import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';

import { WeekModule } from './week/week.module';
import { FixedModule } from './fixed/fixed.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SchedullingModule } from './schedulling/schedulling.module';

@Module({
  controllers: [SchedulesController],
  providers: [SchedulesService, PrismaService],
  imports: [WeekModule, FixedModule, AppointmentModule, SchedullingModule],
})
export class SchedulesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('schedules');
    consumer.apply(TenantMiddleware).forRoutes('appointment');
    consumer.apply(TenantMiddleware).forRoutes('week');
    consumer.apply(TenantMiddleware).forRoutes('fixed');
  }
}
