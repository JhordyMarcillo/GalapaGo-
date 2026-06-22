import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NormativasComponent } from './normativas';
import { ActivatedRoute } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('NormativasComponent', () => {
  let component: NormativasComponent;
  let fixture: ComponentFixture<NormativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormativasComponent],
      providers: [
        // Proveemos un objeto vacío (mock) para engañar al routerLink
        { provide: ActivatedRoute, useValue: {} } 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NormativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});