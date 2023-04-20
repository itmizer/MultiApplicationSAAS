import { Test, TestingModule } from '@nestjs/testing';
import { TypePaymentsService } from './type-payments.service';

describe('TypePaymentsService', () => {
  let service: TypePaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypePaymentsService],
    }).compile();

    service = module.get<TypePaymentsService>(TypePaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
