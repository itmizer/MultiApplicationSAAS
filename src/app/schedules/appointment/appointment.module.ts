import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaService } from 'src/database/prisma.service';
import { NotificationService } from 'src/microservice/notification.service';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService, NotificationService],
})
export class AppointmentModule {}
