import { PrismaService } from '../../database/prisma.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantMiddleware } from 'src/tenant/tenant.middleware';

import { PersonalModule } from './personal/personal.module';
import { ListReservationModule } from './list-reservation/list-reservation.module';
import { BoxModule } from './box/box.module';

@Module({
  imports: [PersonalModule, ListReservationModule, BoxModule],
  providers: [PrismaService],
})
export class ReservationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('reservation');
  }
}
