import { Test, TestingModule } from '@nestjs/testing';
import { ListReservationController } from './list-reservation.controller';
import { ListReservationService } from './list-reservation.service';

describe('ListReservationController', () => {
  let controller: ListReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListReservationController],
      providers: [ListReservationService],
    }).compile();

    controller = module.get<ListReservationController>(ListReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
