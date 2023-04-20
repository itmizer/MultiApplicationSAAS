import { Module } from '@nestjs/common';
import { PrService } from './pr.service';
import { PrController } from './pr.controller';

@Module({
  controllers: [PrController],
  providers: [PrService],
})
export class PrModule {}
