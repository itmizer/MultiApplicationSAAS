import { Test, TestingModule } from '@nestjs/testing';
import { TypePaymentsController } from './type-payments.controller';
import { TypePaymentsService } from './type-payments.service';

describe('TypePaymentsController', () => {
  let controller: TypePaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypePaymentsController],
      providers: [TypePaymentsService],
    }).compile();

    controller = module.get<TypePaymentsController>(TypePaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
