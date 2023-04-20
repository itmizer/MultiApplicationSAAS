import { Test, TestingModule } from '@nestjs/testing';
import { SchedullingController } from './schedulling.controller';
import { SchedullingService } from './schedulling.service';

describe('SchedullingController', () => {
  let controller: SchedullingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedullingController],
      providers: [SchedullingService],
    }).compile();

    controller = module.get<SchedullingController>(SchedullingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
