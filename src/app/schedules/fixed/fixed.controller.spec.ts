import { Test, TestingModule } from '@nestjs/testing';
import { FixedController } from './fixed.controller';
import { FixedService } from './fixed.service';

describe('FixedController', () => {
  let controller: FixedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedController],
      providers: [FixedService],
    }).compile();

    controller = module.get<FixedController>(FixedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
