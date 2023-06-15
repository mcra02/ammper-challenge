import { Test, TestingModule } from '@nestjs/testing';
import { BelvoService } from './belvo.service';

describe('BelvoService', () => {
  let service: BelvoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BelvoService],
    }).compile();

    service = module.get<BelvoService>(BelvoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
