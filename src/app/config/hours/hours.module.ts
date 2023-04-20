import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HoursService } from './hours.service';
import { HoursController } from './hours.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';

@Module({
  controllers: [HoursController],
  providers: [HoursService, PrismaService],
})
export class HoursModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('hours');
  }
}
