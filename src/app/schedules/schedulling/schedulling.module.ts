import { Module } from '@nestjs/common';
import { SchedullingService } from './schedulling.service';
import { SchedullingController } from './schedulling.controller';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';
import { InvoicesGetService } from 'src/app/adm/invoices/services/invoices.service';
import { ReservationService } from 'src/app/reservation/service/reservation.service';

@Module({
  controllers: [SchedullingController],
  providers: [
    SchedullingService,
    PrismaService,
    NotificationService,
    InvoicesGetService,
    ReservationService,
  ],
})
export class SchedullingModule {}
