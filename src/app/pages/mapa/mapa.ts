import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

// Definimos la estructura exacta para llenar el modal según tu diseño
interface InfoIsla {
  nombre: string;
  lat: number;
  lng: number;
  desc: string;
  costumbres: string[];
  comida: string[];
  fauna: { icono: string; texto: string }[];
  frases: { frase: string; significado: string }[];
  reglas: string[];
  monumentos: string[];
  festividades: string[];
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, TranslatePipe],
  template: `
    <div class="mapa-wrapper">
      <div class="texto-introductorio">
        <h2>{{ 'Explora el Archipiélago' | translate }}</h2>
        <p>{{ 'Las Islas Galápagos son un paraíso de biodiversidad y cultura. Navega por nuestro mapa interactivo y selecciona cualquiera de las islas principales para descubrir sus costumbres, gastronomía local, fauna endémica y las normativas necesarias para proteger su ecosistema durante tu visita.' | translate }}</p>
      </div>
      
      <google-map height="500px" width="100%" [options]="mapOptions">
        <map-marker 
          *ngFor="let punto of puntosDeInteres"
          [position]="{lat: punto.lat, lng: punto.lng}"
          [title]="punto.nombre | translate"
          (mapClick)="abrirModal(punto)"
        ></map-marker>
      </google-map>

      <div class="modal-overlay" *ngIf="islaSeleccionada" (click)="cerrarModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          
          <div class="modal-header">
            <h2>{{ islaSeleccionada.nombre | translate }}</h2>
            <button class="btn-cerrar" (click)="cerrarModal()">✕</button>
          </div>

          <div class="modal-body">
            
            <div class="seccion" *ngIf="islaSeleccionada.costumbres.length > 0">
              <h3>{{ 'Costumbres' | translate }}</h3>
              <ul class="lista-costumbres">
                <li *ngFor="let costumbre of islaSeleccionada.costumbres">{{ costumbre | translate }}</li>
              </ul>
            </div>

            <div class="seccion" *ngIf="islaSeleccionada.comida.length > 0">
              <h3>{{ 'Comida Típica' | translate }}</h3>
              <div class="grid-badges">
                <div class="badge badge-comida" *ngFor="let platillo of islaSeleccionada.comida">
                  {{ platillo | translate }}
                </div>
              </div>
            </div>

            <div class="seccion" *ngIf="islaSeleccionada.fauna.length > 0">
              <h3>{{ 'Fauna' | translate }}</h3>
              <div class="grid-badges">
                <div class="badge badge-fauna" *ngFor="let f of islaSeleccionada.fauna">
                  <span>{{ f.icono }}</span> {{ f.texto | translate }}
                </div>
              </div>
            </div>

            <div class="seccion" *ngIf="islaSeleccionada.frases.length > 0">
              <h3>{{ 'Frases Locales' | translate }}</h3>
              <div class="card-frase" *ngFor="let f of islaSeleccionada.frases">
                <h4>"{{ f.frase }}"</h4>
                <p>{{ f.significado | translate }}</p>
              </div>
            </div>

            <div class="seccion" *ngIf="islaSeleccionada.reglas.length > 0">
              <h3>{{ 'Reglas Ambientales' | translate }}</h3>
              <div class="grid-lista">
                <div class="badge badge-reglas" *ngFor="let regla of islaSeleccionada.reglas">
                  ✓ {{ regla | translate }}
                </div>
              </div>
            </div>

            <div class="seccion" *ngIf="islaSeleccionada.monumentos.length > 0">
              <h3>{{ 'Monumentos' | translate }}</h3>
              <div class="grid-lista">
                <div class="badge badge-monumentos" *ngFor="let monumento of islaSeleccionada.monumentos">
                  {{ monumento | translate }}
                </div>
              </div>
            </div>

            <div class="seccion" *ngIf="islaSeleccionada.festividades.length > 0">
              <h3>{{ 'Festividades' | translate }}</h3>
              <div class="grid-lista">
                <div class="badge badge-festividades" *ngFor="let fiesta of islaSeleccionada.festividades">
                  {{ fiesta | translate }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mapa-wrapper { max-width: 1000px; margin: 0 auto; padding: 1rem; position: relative; }
    
    .texto-introductorio { margin-bottom: 2rem; text-align: center; }
    .texto-introductorio h2 { color: #00796b; font-size: 2rem; margin-bottom: 0.5rem; }
    .texto-introductorio p { color: #555; font-size: 1.1rem; line-height: 1.6; }
    
    #map { height: 500px; width: 100%; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 1; }

    /* Estilos del Modal */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; width: 90%; max-width: 600px; max-height: 90vh; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: slideUp 0.3s ease-out; }
    
    .modal-header { background: #00bfa5; color: white; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; font-size: 1.5rem; }
    .btn-cerrar { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
    
    .modal-body { padding: 1.5rem; overflow-y: auto; background: #fff; }
    .seccion { margin-bottom: 1.5rem; }
    .seccion h3 { color: #1a237e; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
    
    /* Costumbres */
    .lista-costumbres { padding-left: 1.5rem; margin: 0; color: #333; }
    .lista-costumbres li { margin-bottom: 0.5rem; }
    .lista-costumbres li::marker { color: #00bfa5; }

    /* Badges y Grids */
    .grid-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .grid-lista { display: flex; flex-direction: column; gap: 0.5rem; }
    
    .badge { padding: 0.8rem 1rem; border-radius: 6px; font-size: 0.95rem; text-align: center; border: 1px solid transparent; }
    
    .badge-comida { background: #fff8e1; border-color: #ffecb3; color: #3e2723; }
    .badge-fauna { background: #e8f5e9; border-color: #c8e6c9; color: #1b5e20; text-align: left; display: flex; align-items: center; gap: 0.5rem; }
    .badge-reglas { background: #f1f8e9; border-color: #dcedc8; color: #33691e; text-align: left; }
    .badge-monumentos { background: #fffde7; border-color: #fff59d; color: #f57f17; text-align: left; }
    .badge-festividades { background: #fce4ec; border-color: #f8bbd0; color: #880e4f; text-align: left; }

    /* Frases */
    .card-frase { background: #f3e5f5; border: 1px solid #e1bee7; padding: 1rem; border-radius: 6px; margin-bottom: 0.8rem; }
    .card-frase h4 { margin: 0 0 0.3rem 0; color: #6a1b9a; font-size: 1rem; }
    .card-frase p { margin: 0; color: #4a148c; font-size: 0.9rem; }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 600px) {
      .grid-badges { grid-template-columns: 1fr; }
    }
  `]
})
export class MapaComponent {
  islaSeleccionada: InfoIsla | null = null;

  mapOptions: google.maps.MapOptions = {
    center: { lat: -0.5, lng: -90.5 },
    zoom: 7,
    mapTypeId: 'hybrid', // Vista satelital con etiquetas
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false
  };

  puntosDeInteres: InfoIsla[] = [
    { 
      nombre: 'Santa Cruz', 
      lat: -0.6301, 
      lng: -90.3638, 
      desc: '',
      costumbres: ['Centro cultural y comercial del archipiélago', 'Comunidad pesquera tradicional', 'Puerto Ayora: punto de encuentro multicultural'],
      comida: ['Encebollado de pescado', 'Ceviche de langosta', 'Bolones de verde', 'Tigrillo'],
      fauna: [{icono: '🐢', texto: 'Tortugas gigantes en El Chato'}, {icono: '🦎', texto: 'Iguanas terrestres'}, {icono: '🦭', texto: 'Lobos marinos en la bahía'}],
      frases: [{frase: '¡Qué chévere!', significado: '¡Qué genial!'}, {frase: 'Ñaño/ñaña', significado: 'Hermano/hermana (cariñoso)'}],
      reglas: ['Mantén distancia de 2 metros con la fauna', 'No alimentes a los animales', 'Camina solo por senderos marcados'],
      monumentos: ['Estación Científica Charles Darwin', 'Las Grietas - formación volcánica'],
      festividades: ['Fiestas de Puerto Ayora (Febrero)', 'Día de Galápagos (12 de Febrero)']
    },
    { 
      nombre: 'Isabela', 
      lat: -0.8293, 
      lng: -91.1000, 
      desc: '',
      costumbres: ['Vida tranquila y conectada a la naturaleza', 'Tradición cafetalera en las partes altas'],
      comida: ['Mariscos al carbón', 'Corviche'],
      fauna: [{icono: '🐧', texto: 'Pingüinos de Galápagos'}, {icono: '🦅', texto: 'Halcones de Galápagos'}],
      frases: [{frase: 'Caleta', significado: 'Casa u hogar'}],
      reglas: ['Prohibido extraer arena o conchas', 'Usa protector solar biodegradable'],
      monumentos: ['Muro de las Lágrimas', 'Volcán Sierra Negra'],
      festividades: ['Cantonización de Isabela (Marzo)']
    },
    { 
      nombre: 'San Cristóbal', 
      lat: -0.8995, 
      lng: -89.4900, 
      desc: '',
      costumbres: ['Capital provincial administrativa', 'Cultura surfera y pesquera'],
      comida: ['Empanadas de mariscos', 'Ceviche canchalagua'],
      fauna: [{icono: '🦭', texto: 'Colonia extensa de Lobos Marinos'}, {icono: '🐦', texto: 'Piqueros de patas azules'}],
      frases: [{frase: 'Chiro', significado: 'Sin dinero'}],
      reglas: ['Mantén la limpieza en el malecón', 'No uses flash al tomar fotografías'],
      monumentos: ['León Dormido (Kicker Rock)', 'Centro de Interpretación'],
      festividades: ['Cantonización de San Cristóbal (Febrero)']
    },
    { 
      nombre: 'Floreana', 
      lat: -1.2988, 
      lng: -90.4352, 
      desc: '',
      costumbres: ['Historias de los primeros colonos', 'Intercambio de correo tradicional'],
      comida: ['Pescado encocado'],
      fauna: [{icono: '🦩', texto: 'Flamencos rosados'}, {icono: '🐢', texto: 'Tortugas marinas'}],
      frases: [{frase: 'De ley', significado: 'Por supuesto / Claro que sí'}],
      reglas: ['Respeta las áreas de anidación', 'No introduzcas alimentos externos'],
      monumentos: ['Post Office Bay', 'Asilo de la Paz'],
      festividades: ['Descubrimiento de las islas (Marzo)']
    },
    { 
      nombre: 'Fernandina', 
      lat: -0.3725, 
      lng: -91.5517, 
      desc: '',
      costumbres: ['Isla prístina sin asentamientos humanos fijos', 'Conservación estricta'],
      comida: [], 
      fauna: [{icono: '🦎', texto: 'Grandes colonias de Iguanas Marinas'}, {icono: '🐦', texto: 'Cormoranes no voladores'}],
      frases: [],
      reglas: ['Visita permitida solo con guía certificado', 'Control estricto de cuarentena'],
      monumentos: ['Punta Espinosa'],
      festividades: []
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  abrirModal(isla: InfoIsla) {
    this.islaSeleccionada = isla;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.islaSeleccionada = null;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.islaSeleccionada) {
      this.cerrarModal();
    }
  }
}