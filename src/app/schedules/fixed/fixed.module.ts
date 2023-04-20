import { Module } from '@nestjs/common';
import { FixedService } from './fixed.service';
import { FixedController } from './fixed.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [FixedController],
  providers: [FixedService, PrismaService],
})
export class FixedModule {}
