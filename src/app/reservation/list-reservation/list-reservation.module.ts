import { Module } from '@nestjs/common';
import { ListReservationService } from './list-reservation.service';
import { ListReservationController } from './list-reservation.controller';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';
import { InvoicesGetService } from 'src/app/adm/invoices/services/invoices.service';
import { ReservationService } from '../service/reservation.service';

@Module({
  controllers: [ListReservationController],
  providers: [
    ListReservationService,
    PrismaService,
    NotificationService,
    InvoicesGetService,
    ReservationService,
  ],
})
export class ListReservationModule {}
