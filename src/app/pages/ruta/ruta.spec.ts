import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaComponent } from './ruta';

describe('RutaComponent', () => {
  let component: RutaComponent;
  let fixture: ComponentFixture<RutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Dispara el ngOnInit
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el total de acciones correctamente', () => {
    expect(component.totalAcciones).toBeGreaterThan(0);
  });

  it('el porcentaje inicial debe ser 0', () => {
    expect(component.porcentajeTotal).toBe(0);
    expect(component.accionesCompletadas).toBe(0);
  });

  it('debe cambiar el estado de una acción al usar toggleAccion', () => {
    const accionMuestra = component.etapas[0].acciones[0];
    expect(accionMuestra.completada).toBe(false);
    
    component.toggleAccion(accionMuestra);
    
    expect(accionMuestra.completada).toBe(true);
    expect(component.accionesCompletadas).toBe(1);
    expect(component.porcentajeTotal).toBeGreaterThan(0);
  });

  it('debe identificar si una etapa completa está terminada', () => {
    const etapa = component.etapas[0];
    expect(component.esEtapaCompletada(etapa)).toBe(false);

    // Completamos todas las acciones de la primera etapa
    etapa.acciones.forEach(accion => accion.completada = true);

    expect(component.esEtapaCompletada(etapa)).toBe(true);
  });
});