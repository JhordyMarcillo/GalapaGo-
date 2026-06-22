import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
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
