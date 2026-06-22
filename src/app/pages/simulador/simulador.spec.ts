import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimuladorComponent } from './simulador';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('SimuladorComponent', () => {
  let component: SimuladorComponent;
  let fixture: ComponentFixture<SimuladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SimuladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe iniciar en el estado "inicio"', () => {
    expect(component.estado).toBe('inicio');
    expect(component.porcentajeProgreso).toBe(0);
  });

  it('debe cambiar al estado "jugando" y resetear variables al iniciar', () => {
    component.puntajeTotal = 50; // Simulamos un estado sucio
    component.iniciarSimulador();
    
    expect(component.estado).toBe('jugando');
    expect(component.indiceActual).toBe(0);
    expect(component.puntajeTotal).toBe(0);
    expect(component.mostrandoFeedback).toBe(false);
  });

  it('debe permitir seleccionar una opción si no está mostrando feedback', () => {
    component.iniciarSimulador();
    component.seleccionarOpcion(1);
    expect(component.indiceOpcionSeleccionada).toBe(1);
  });

  it('debe bloquear la selección si está mostrando feedback', () => {
    component.iniciarSimulador();
    component.mostrandoFeedback = true;
    component.seleccionarOpcion(2);
    expect(component.indiceOpcionSeleccionada).toBeNull(); // No debe cambiar
  });

  it('debe calcular correctamente si el nivel final es Alto o Básico', () => {
    // Forzamos un puntaje perfecto (100 puntos si son 10 preguntas)
    component.puntajeTotal = component.preguntas.length * 10;
    expect(component.esNivelAlto).toBe(true);

    // Forzamos un puntaje bajo (0 puntos)
    component.puntajeTotal = 0;
    expect(component.esNivelAlto).toBe(false);
  });
});