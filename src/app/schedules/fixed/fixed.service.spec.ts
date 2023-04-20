import { Test, TestingModule } from '@nestjs/testing';
import { FixedService } from './fixed.service';

describe('FixedService', () => {
  let service: FixedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedService],
    }).compile();

    service = module.get<FixedService>(FixedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
