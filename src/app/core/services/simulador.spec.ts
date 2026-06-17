import { TestBed } from '@angular/core/testing';

import { Simulador } from './simulador';

describe('Simulador', () => {
  let service: Simulador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Simulador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
