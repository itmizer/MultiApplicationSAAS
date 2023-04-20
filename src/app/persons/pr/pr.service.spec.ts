import { Test, TestingModule } from '@nestjs/testing';
import { PrService } from './pr.service';

describe('PrService', () => {
  let service: PrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrService],
    }).compile();

    service = module.get<PrService>(PrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
