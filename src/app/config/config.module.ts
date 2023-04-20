import { PrismaService } from './../../database/prisma.service';
import { Module } from '@nestjs/common';

import { MenuModule } from './menu/menu.module';
import { PlansModule } from './plans/plans.module';
import { HoursModule } from './hours/hours.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [MenuModule, PlansModule, HoursModule, ServicesModule],
  providers: [PrismaService],
})
export class ConfigModule {}
