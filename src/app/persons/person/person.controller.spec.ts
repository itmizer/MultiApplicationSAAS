import { Test, TestingModule } from '@nestjs/testing';

import { PersonService } from './person.service';
import { PersonsController } from './person.controller';

describe('PersonController', () => {
  let controller: PersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [PersonService],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
