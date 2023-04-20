import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [StaffController],
  providers: [StaffService, PrismaService],
})
export class StaffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('staff');
  }
}
