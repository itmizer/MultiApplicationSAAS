import { Test, TestingModule } from '@nestjs/testing';
import { ListReservationService } from './list-reservation.service';

describe('ListReservationService', () => {
  let service: ListReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListReservationService],
    }).compile();

    service = module.get<ListReservationService>(ListReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
