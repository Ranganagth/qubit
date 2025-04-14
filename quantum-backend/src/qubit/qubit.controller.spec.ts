import { Test, TestingModule } from '@nestjs/testing';
import { QubitController } from './qubit.controller';

describe('QubitController', () => {
  let controller: QubitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QubitController],
    }).compile();

    controller = module.get<QubitController>(QubitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
