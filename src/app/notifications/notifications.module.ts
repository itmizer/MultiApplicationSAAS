import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from 'src/database/prisma.service';

import { TenantMiddleware } from 'src/tenant/tenant.middleware';
import { NotificationService } from 'src/microservice/notification.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaService, NotificationService],
})
export class NotificationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('notification');
  }
}
