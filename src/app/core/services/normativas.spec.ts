import { TestBed } from '@angular/core/testing';

import { NormativasService } from './normativas';

describe('Normativas', () => {
  let service: NormativasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormativasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
