import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface Accion {
  texto: string;
  completada: boolean;
}

interface EtapaRuta {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  acciones: Accion[];
}

@Component({
  selector: 'app-ruta',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="ruta-wrapper">
      
      <div class="hero-ruta slide-down">
        <div class="hero-content">
          <h2>{{ 'Tu Ruta Sostenible' | translate }}</h2>
          <p>{{ 'Sigue esta guía paso a paso para asegurar que tu visita a Galápagos genere un impacto positivo en la comunidad y el ecosistema.' | translate }}</p>
        </div>
        
        <div class="progreso-dashboard">
          <div class="circulo-progreso" [style.background]="gradienteProgreso()">
            <div class="inner-circulo">
              <span class="porcentaje">{{ porcentajeTotal }}%</span>
            </div>
          </div>
          <div class="progreso-info">
            <h3>{{ 'Progreso del Viaje' | translate }}</h3>
            <p>{{ accionesCompletadas }} {{ 'de' | translate }} {{ totalAcciones }} {{ 'acciones completadas' | translate }}</p>
          </div>
        </div>
      </div>

      <div class="mensaje-exito pop-in" *ngIf="porcentajeTotal === 100">
        <h3>🎉 {{ '¡Felicidades! Eres un Turista Responsable' | translate }}</h3>
        <p>{{ 'Has completado todas las pautas del Buen Vivir. Estás listo para disfrutar de Galápagos protegiendo su magia.' | translate }}</p>
      </div>

      <div class="timeline-container">
        
        <div class="timeline-etapa fade-in" 
             *ngFor="let etapa of etapas; let i = index"
             [ngClass]="{'etapa-completada': esEtapaCompletada(etapa)}">
          
          <div class="timeline-linea" *ngIf="i !== etapas.length - 1"></div>
          
          <div class="timeline-nodo">
            <span class="icono">{{ etapa.icono }}</span>
            <div class="check-flotante" *ngIf="esEtapaCompletada(etapa)">✓</div>
          </div>
          
          <div class="timeline-card">
            <div class="card-header">
              <h3>{{ 'Paso' | translate }} {{ etapa.id }}: {{ etapa.titulo | translate }}</h3>
              <span class="badge-estado" *ngIf="esEtapaCompletada(etapa)">{{ 'Completado' | translate }}</span>
            </div>
            <p class="descripcion">{{ etapa.descripcion | translate }}</p>
            
            <div class="checklist">
              <label class="check-item" *ngFor="let accion of etapa.acciones">
                <input type="checkbox" 
                       [checked]="accion.completada" 
                       (change)="toggleAccion(accion)">
                <span class="custom-checkbox"></span>
                <span class="texto-accion" [ngClass]="{'tachado': accion.completada}">{{ accion.texto | translate }}</span>
              </label>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  `,
  styles: [`
    .ruta-wrapper { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    
    /* Hero y Progreso */
    .hero-ruta { background: linear-gradient(135deg, #0f766e 0%, #064e3b 100%); border-radius: 20px; padding: 2.5rem; color: white; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 2rem; margin-bottom: 3rem; box-shadow: 0 10px 30px rgba(15, 118, 110, 0.2); }
    .hero-content { flex: 1; min-width: 300px; }
    .hero-content h2 { font-size: 2.2rem; margin: 0 0 1rem 0; }
    .hero-content p { font-size: 1.1rem; line-height: 1.6; opacity: 0.9; margin: 0; }
    
    .progreso-dashboard { background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 16px; display: flex; align-items: center; gap: 1.5rem; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
    .progreso-info h3 { margin: 0 0 0.3rem 0; font-size: 1.1rem; }
    .progreso-info p { margin: 0; font-size: 0.9rem; opacity: 0.8; }
    
    /* Círculo de Progreso Conic Gradient */
    .circulo-progreso { width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center; position: relative; transition: background 0.5s ease; }
    .inner-circulo { width: 66px; height: 66px; border-radius: 50%; background: #0b6051; display: flex; justify-content: center; align-items: center; }
    .porcentaje { font-size: 1.2rem; font-weight: bold; }

    /* Mensaje de Éxito */
    .mensaje-exito { background: #ecfdf5; border: 2px solid #10b981; border-radius: 12px; padding: 1.5rem; text-align: center; color: #064e3b; margin-bottom: 3rem; }
    .mensaje-exito h3 { margin: 0 0 0.5rem 0; color: #059669; }
    .mensaje-exito p { margin: 0; }

    /* Timeline Estructura */
    .timeline-container { position: relative; padding-left: 20px; }
    .timeline-etapa { display: flex; gap: 2rem; position: relative; margin-bottom: 3rem; }
    
    .timeline-linea { position: absolute; left: 24px; top: 60px; bottom: -40px; width: 3px; background: #e2e8f0; z-index: 1; transition: background 0.3s; }
    .etapa-completada .timeline-linea { background: #10b981; }

    /* Nodo / Icono */
    .timeline-nodo { width: 50px; height: 50px; background: white; border: 3px solid #cbd5e1; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 1.5rem; z-index: 2; position: relative; flex-shrink: 0; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .etapa-completada .timeline-nodo { border-color: #10b981; background: #ecfdf5; }
    .check-flotante { position: absolute; bottom: -5px; right: -5px; background: #10b981; color: white; width: 22px; height: 22px; border-radius: 50%; font-size: 0.8rem; font-weight: bold; display: flex; justify-content: center; align-items: center; border: 2px solid white; }

    /* Tarjetas del Timeline */
    .timeline-card { background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 1.5rem 2rem; flex-grow: 1; box-shadow: 0 4px 15px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; }
    .timeline-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
    .etapa-completada .timeline-card { border-left: 4px solid #10b981; }
    
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .card-header h3 { margin: 0; color: #1e293b; font-size: 1.3rem; }
    .badge-estado { background: #d1fae5; color: #059669; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
    .descripcion { color: #64748b; line-height: 1.5; margin-bottom: 1.5rem; }

    /* Checklist Custom */
    .checklist { display: flex; flex-direction: column; gap: 1rem; }
    .check-item { display: flex; align-items: flex-start; gap: 1rem; cursor: pointer; padding: 0.5rem; border-radius: 8px; transition: background 0.2s; }
    .check-item:hover { background: #f8fafc; }
    .check-item input { display: none; }
    
    .custom-checkbox { width: 22px; height: 22px; border: 2px solid #cbd5e1; border-radius: 6px; display: inline-block; position: relative; transition: all 0.2s; flex-shrink: 0; margin-top: 2px; }
    .check-item input:checked + .custom-checkbox { background: #14b8a6; border-color: #14b8a6; }
    .check-item input:checked + .custom-checkbox::after { content: '✓'; position: absolute; color: white; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 14px; font-weight: bold; }
    
    .texto-accion { color: #334155; font-size: 1.05rem; transition: color 0.2s; line-height: 1.4; }
    .texto-accion.tachado { color: #94a3b8; text-decoration: line-through; }

    /* Animaciones */
    .slide-down { animation: slideDown 0.5s ease-out forwards; }
    .fade-in { animation: fadeIn 0.6s ease-out forwards; }
    .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    
    @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

    @media (max-width: 600px) {
      .hero-ruta { flex-direction: column; text-align: center; }
      .timeline-etapa { flex-direction: column; gap: 1rem; }
      .timeline-linea { left: 24px; top: 60px; bottom: -20px; }
      .timeline-container { padding-left: 0; }
    }
  `]
})
export class RutaComponent implements OnInit {
  private readonly STORAGE_KEY = 'galapago_ruta_progreso';
  etapas: EtapaRuta[] = [
    {
      id: 1,
      titulo: 'Preparación y Equipaje',
      descripcion: 'Ser un turista responsable comienza antes de subir al avión. Lo que llevas en tu maleta define tu primer impacto.',
      icono: '🎒',
      acciones: [
        { texto: 'Evitar empacar plásticos de un solo uso (bolsas, sorbetes).', completada: false },
        { texto: 'Llevar un termo o botella de agua reutilizable.', completada: false },
        { texto: 'Empacar protector solar estrictamente biodegradable (sin Oxybenzone).', completada: false }
      ]
    },
    {
      id: 2,
      titulo: 'Control Biológico y Llegada',
      descripcion: 'El ecosistema insular es extremadamente frágil a las especies invasoras y enfermedades externas.',
      icono: '🛬',
      acciones: [
        { texto: 'Completar la tarjeta de control de tránsito (TCT).', completada: false },
        { texto: 'Permitir la inspección de equipaje en ABG sin llevar semillas, frutas o animales.', completada: false },
        { texto: 'Pagar el tributo de ingreso al Parque Nacional (fondos para conservación).', completada: false }
      ]
    },
    {
      id: 3,
      titulo: 'Exploración Terrestre',
      descripcion: 'La convivencia armónica con la fauna silvestre en las zonas pobladas y senderos del parque.',
      icono: '🥾',
      acciones: [
        { texto: 'Aprender y mantener siempre la regla de los 2 metros de distancia.', completada: false },
        { texto: 'Caminar exclusivamente por los senderos marcados con madera o roca.', completada: false },
        { texto: 'Contratar agencias turísticas y guías locales certificados.', completada: false }
      ]
    },
    {
      id: 4,
      titulo: 'Inmersión Marina',
      descripcion: 'Las reglas cambian bajo el agua. El fondo marino requiere un nivel de respeto superior.',
      icono: '🤿',
      acciones: [
        { texto: 'Mantener flotabilidad neutral al hacer snorkel o buceo.', completada: false },
        { texto: 'No tocar formaciones rocosas, corales ni perseguir tortugas o mantarrayas.', completada: false }
      ]
    },
    {
      id: 5,
      titulo: 'Conexión Comunitaria',
      descripcion: 'El Buen Vivir implica respetar la cultura local e impulsar la economía circular de las islas.',
      icono: '🤝',
      acciones: [
        { texto: 'Consumir gastronomía local en los quioscos y mercados.', completada: false },
        { texto: 'Comprar souvenirs artesanales (asegurando que no contengan conchas o coral).', completada: false },
        { texto: 'Manejar correctamente los residuos en los tachos clasificados de los puertos.', completada: false }
      ]
    }
  ];

  totalAcciones = 0;

  ngOnInit() {
    this.calcularTotalAcciones();
    this.cargarProgreso();
  }

  calcularTotalAcciones() {
    this.totalAcciones = this.etapas.reduce((total, etapa) => total + etapa.acciones.length, 0);
  }

  get accionesCompletadas(): number {
    return this.etapas.reduce((total, etapa) => {
      return total + etapa.acciones.filter(a => a.completada).length;
    }, 0);
  }

  get porcentajeTotal(): number {
    if (this.totalAcciones === 0) return 0;
    return Math.round((this.accionesCompletadas / this.totalAcciones) * 100);
  }

  gradienteProgreso(): string {
    const porcentaje = this.porcentajeTotal;
    return `conic-gradient(#14b8a6 ${porcentaje}%, rgba(255,255,255,0.2) ${porcentaje}%)`;
  }

  esEtapaCompletada(etapa: EtapaRuta): boolean {
    return etapa.acciones.every(accion => accion.completada);
  }

  toggleAccion(accion: Accion) {
    accion.completada = !accion.completada;
    this.guardarProgreso();
  }

  private guardarProgreso(): void {
    const progreso = this.etapas.map(etapa =>
      etapa.acciones.map(a => a.completada)
    );
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progreso));
  }

  private cargarProgreso(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const progreso: boolean[][] = JSON.parse(data);
        progreso.forEach((etapaProgreso, i) => {
          if (this.etapas[i]) {
            etapaProgreso.forEach((completada, j) => {
              if (this.etapas[i].acciones[j]) {
                this.etapas[i].acciones[j].completada = completada;
              }
            });
          }
        });
      } catch (e) {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
}