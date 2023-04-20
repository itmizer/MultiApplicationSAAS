import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, PrismaService],
})
export class ServicesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('services');
  }
}
