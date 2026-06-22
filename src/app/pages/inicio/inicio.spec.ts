import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio';
import { provideRouter } from '@angular/router'; // <-- Importar el proveedor de rutas
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent],
      providers: [provideRouter([])] // <-- Proveer rutas vacías para engañar a la prueba
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});