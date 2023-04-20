import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CalendarController],
  providers: [CalendarService, PrismaService],
})
export class CalendarModule {}
