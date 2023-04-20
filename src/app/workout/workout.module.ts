import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';
import { PrismaService } from 'src/database/prisma.service';
import { InvoicesGetService } from '../adm/invoices/services/invoices.service';
import { NotificationService } from 'src/microservice/notification.service';

@Module({
  controllers: [WorkoutController],
  providers: [
    WorkoutService,
    PrismaService,
    InvoicesGetService,
    NotificationService,
  ],
})
export class WorkoutModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('workout');
  }
}
