import { Test, TestingModule } from '@nestjs/testing';
import { QubitService } from './qubit.service';

describe('QubitService', () => {
  let service: QubitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QubitService],
    }).compile();

    service = module.get<QubitService>(QubitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
