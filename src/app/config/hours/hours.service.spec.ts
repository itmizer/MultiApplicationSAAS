import { Test, TestingModule } from '@nestjs/testing';
import { HoursService } from './hours.service';

describe('HoursService', () => {
  let service: HoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoursService],
    }).compile();

    service = module.get<HoursService>(HoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
