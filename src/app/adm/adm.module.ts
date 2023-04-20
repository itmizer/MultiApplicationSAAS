import { PrismaService } from '../../database/prisma.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { InvoicesModule } from './invoices/invoices.module';
import { PaymentModule } from './payment/payment.module';
import { CalendarModule } from './calendar/calendar.module';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';

import { CustomersModule } from './customers/customers.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    InvoicesModule,
    PaymentModule,
    CalendarModule,
    CustomersModule,
    ContractModule,
  ],
  providers: [PrismaService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('calendar');
    consumer.apply(TenantMiddleware).forRoutes('customers');
    consumer.apply(TenantMiddleware).forRoutes('staff');
    consumer.apply(TenantMiddleware).forRoutes('contracts');
    consumer.apply(TenantMiddleware).forRoutes('invoices');
  }
}
