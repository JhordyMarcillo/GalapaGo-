import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrasesComponent } from './frases';

describe('FrasesComponent', () => {
  let component: FrasesComponent;
  let fixture: ComponentFixture<FrasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrasesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe mostrar todas las frases por defecto', () => {
    expect(component.categoriaActual).toBe('Todas');
    expect(component.frasesFiltradas.length).toBe(component.frases.length);
  });

  it('debe filtrar las frases cuando se cambia de categoría', () => {
    component.filtrarPorCategoria('Comida');
    
    expect(component.categoriaActual).toBe('Comida');
    // Verificamos que todas las frases filtradas sean realmente de la categoría Comida
    const todasSonComida = component.frasesFiltradas.every(f => f.categoria === 'Comida');
    expect(todasSonComida).toBe(true);
  });

  it('debe retornar un arreglo vacío si la categoría no existe (empty state)', () => {
    component.filtrarPorCategoria('CategoriaInexistente');
    expect(component.frasesFiltradas.length).toBe(0);
  });
});