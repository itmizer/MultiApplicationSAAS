import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypePaymentsService } from './type-payments.service';
import { TypePaymentsController } from './type-payments.controller';
import { PrismaService } from 'src/database/prisma.service';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';

@Module({
  controllers: [TypePaymentsController],
  providers: [TypePaymentsService, PrismaService],
})
export class TypePaymentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('typePayment');
  }
}
