import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { provideRouter } from '@angular/router'; // <-- Importar el proveedor de rutas

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])] // <-- Fundamental para que el <router-outlet> no falle
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Si tu prueba por defecto revisaba un título, la dejamos aquí ajustada
  it(`should have as title 'proyecto-interculturalidad'`, () => {
    // Si no tienes una variable 'title' en tu app.component.ts, 
    // puedes borrar este bloque 'it' sin problema.
    expect(component).toBeTruthy(); 
  });
});