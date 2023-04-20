import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ReservationService } from 'src/app/reservation/service/reservation.service';
import { NotificationService } from 'src/microservice/notification.service';

@Module({
  controllers: [ContractController],
  providers: [
    ContractService,
    PrismaService,
    ReservationService,
    NotificationService,
  ],
})
export class ContractModule {}
