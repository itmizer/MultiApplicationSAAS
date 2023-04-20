import { Module } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';
import { PrismaService } from 'src/database/prisma.service';
import { InvoicesGetService } from 'src/app/adm/invoices/services/invoices.service';
import { ReservationService } from '../service/reservation.service';
import { NotificationService } from 'src/microservice/notification.service';

@Module({
  controllers: [BoxController],
  providers: [
    BoxService,
    PrismaService,
    InvoicesGetService,
    ReservationService,
    NotificationService,
  ],
})
export class BoxModule {}
