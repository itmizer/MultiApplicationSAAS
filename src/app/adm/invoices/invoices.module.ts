import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ReservationService } from 'src/app/reservation/service/reservation.service';
import { NotificationService } from 'src/microservice/notification.service';
import { InvoicesGetService } from './services/invoices.service';

@Module({
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    PrismaService,
    ReservationService,
    ReservationService,
    InvoicesGetService,
    NotificationService,
  ],
})
export class InvoicesModule {}
