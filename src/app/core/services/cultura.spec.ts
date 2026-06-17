import { TestBed } from '@angular/core/testing';

import { CulturaService } from './cultura';

describe('Cultura', () => {
  let service: CulturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
