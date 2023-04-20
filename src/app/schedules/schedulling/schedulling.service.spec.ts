import { Test, TestingModule } from '@nestjs/testing';
import { SchedullingService } from './schedulling.service';

describe('SchedullingService', () => {
  let service: SchedullingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedullingService],
    }).compile();

    service = module.get<SchedullingService>(SchedullingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
