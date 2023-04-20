import { Test, TestingModule } from '@nestjs/testing';
import { PrController } from './pr.controller';
import { PrService } from './pr.service';

describe('PrController', () => {
  let controller: PrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrController],
      providers: [PrService],
    }).compile();

    controller = module.get<PrController>(PrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
