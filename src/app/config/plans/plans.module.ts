import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PlansController],
  providers: [PlansService, PrismaService],
})
export class PlansModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('plans');
  }
}
