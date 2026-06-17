import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Normativa {
  situacion: string;
  queHacer: string;
  queEvitar: string;
}

@Component({
  selector: 'app-normativas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="normativas-wrapper">
      
      <div class="header-text">
        <h2>Respeta Nuestra Cultura</h2>
        <p>Guía práctica para una convivencia respetuosa con nuestra comunidad y naturaleza</p>
      </div>

      <div class="filtros">
        <button class="activo">Todas</button>
        <button>Comunidad</button>
        <button>Naturaleza</button>
        <button>Vida Silvestre</button>
        <button>Playas</button>
      </div>

      <div class="info-box">
        <div class="info-icon">ⓘ</div>
        <div class="info-content">
          <h4>¿Por qué es importante?</h4>
          <p>El respeto por la cultura local y el medio ambiente garantiza que las Islas Galápagos permanezcan como un paraíso natural para las futuras generaciones. Cada acción cuenta.</p>
        </div>
      </div>

      <div class="tabla-contenedor">
        
        <div class="tabla-header">
          <div class="col-sit">Situación</div>
          <div class="col-hacer">Qué Hacer y Que evitar</div>
        </div>
        
        <div class="tabla-body">
          <div class="fila-norma" *ngFor="let norma of normativas">
            <div class="celda-situacion">{{ norma.situacion }}</div>
            
            <div class="celda-acciones">
              <div class="accion hacer">
                <span class="icono-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </span>
                <p>{{ norma.queHacer }}</p>
              </div>
              
              <div class="accion evitar">
                <span class="icono-cross">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                </span>
                <p>{{ norma.queEvitar }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="banner-footer">
        <h3>💚 El Buen Vivir en Práctica</h3>
        <p>Estas normas están basadas en el principio del Buen Vivir: vivir en armonía con la naturaleza y la comunidad.</p>
        <button class="btn-simulador" routerLink="/simulador">Practica en el Simulador</button>
      </div>

    </div>
  `,
  styles: [`
    .normativas-wrapper { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    
    .header-text { text-align: center; margin-bottom: 2rem; }
    .header-text h2 { color: #1a237e; font-size: 2.5rem; margin-bottom: 0.5rem; }
    .header-text p { color: #546e7a; font-size: 1.1rem; }

    /* Filtros e Info Box (Mantenidos igual) */
    .filtros { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; }
    .filtros button { padding: 0.6rem 1.5rem; border: 1px solid #e0e0e0; background: white; border-radius: 25px; cursor: pointer; color: #555; transition: all 0.2s ease; }
    .filtros button.activo { background: #009688; color: white; border-color: #009688; font-weight: 500; }
    .info-box { display: flex; gap: 1rem; background-color: #f5f8ff; border-left: 4px solid #3b82f6; padding: 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; }
    .info-icon { color: #3b82f6; font-size: 1.2rem; font-weight: bold; }
    .info-content h4 { color: #1e3a8a; margin: 0 0 0.5rem 0; font-size: 1.1rem; }
    .info-content p { color: #2563eb; margin: 0; line-height: 1.5; font-size: 0.95rem; }

    /* Nuevo Diseño de Tabla Flexbox */
    .tabla-contenedor { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 3rem; border: 1px solid #f0f0f0; }
    
    .tabla-header { display: flex; background-color: #009688; color: white; padding: 1.2rem 1.5rem; font-weight: 500; }
    .col-sit { flex: 0 0 30%; }
    .col-hacer { flex: 0 0 35%; }
    .col-evitar { flex: 0 0 35%; text-align: right; } /* Alineado a la derecha como en tu imagen */

    .fila-norma { display: flex; border-bottom: 1px solid #f0f0f0; }
    .fila-norma:last-child { border-bottom: none; }
    
    .celda-situacion { flex: 0 0 30%; padding: 1.5rem; font-weight: 500; color: #333; }
    
    .celda-acciones { flex: 1; display: flex; flex-direction: column; }
    
    .accion { display: flex; gap: 1rem; padding: 1.2rem 1.5rem; align-items: flex-start; max-width: 65%; /* Mantiene el texto en la mitad izquierda de la celda */ }
    .accion.hacer { border-bottom: 1px solid #f5f5f5; /* Línea divisoria sutil */ }
    .accion p { margin: 0; color: #424242; line-height: 1.5; font-size: 0.95rem; }
    
    .icono-check svg { width: 20px; height: 20px; color: #10b981; margin-top: 2px; }
    .icono-cross svg { width: 20px; height: 20px; color: #ef4444; margin-top: 2px; }

    /* Banner Footer */
    .banner-footer { background: linear-gradient(135deg, #f50057, #ff4081); border-radius: 12px; padding: 2.5rem; text-align: center; color: white; }
    .banner-footer h3 { font-size: 1.8rem; margin: 0 0 1rem 0; }
    .banner-footer p { font-size: 1.1rem; margin: 0 0 2rem 0; opacity: 0.9; }
    .btn-simulador { background: white; color: #f50057; font-weight: bold; padding: 0.8rem 2rem; border: none; border-radius: 25px; font-size: 1rem; cursor: pointer; transition: transform 0.2s; }
    .btn-simulador:hover { transform: translateY(-2px); }

    /* Responsive */
    @media (max-width: 768px) {
      .tabla-header { display: none; /* Oculta la cabecera en móviles para un diseño de tarjetas */ }
      .fila-norma { flex-direction: column; padding: 1rem; }
      .celda-situacion { padding: 0.5rem 0; font-size: 1.1rem; color: #009688; border-bottom: 2px solid #f0f0f0; }
      .accion { max-width: 100%; padding: 1rem 0; }
    }
  `]
})
export class NormativasComponent {
  normativas: Normativa[] = [
    {
      situacion: 'Visitar comunidad local',
      queHacer: 'Saludar cordialmente, pedir permiso antes de interactuar',
      queEvitar: 'Tomar fotos sin permiso, interrumpir actividades cotidianas'
    },
    {
      situacion: 'En playas protegidas',
      queHacer: 'Seguir senderos marcados, usar protector solar biodegradable',
      queEvitar: 'Dejar basura, fumar, tocar formaciones rocosas'
    },
    {
      situacion: 'Observación de fauna',
      queHacer: 'Mantener distancia mínima de 2 metros, moverte lento y silencioso',
      queEvitar: 'Alimentar animales, usar flash, perseguir o tocar'
    },
    {
      situacion: 'En áreas naturales',
      queHacer: 'Caminar solo por senderos autorizados, respetar la flora',
      queEvitar: 'Tomar plantas o semillas, salir de senderos, hacer ruido excesivo'
    },
    {
      situacion: 'Encuentro con lobos marinos',
      queHacer: 'Ceder espacio, observar desde lejos, seguir indicaciones del guía',
      queEvitar: 'Acercarte a las crías, bloquear su paso al mar, hacer ruidos fuertes'
    },
    {
      situacion: 'En restaurantes locales',
      queHacer: 'Probar comida local, ser respetuoso con el personal, dar propinas',
      queEvitar: 'Desperdiciar comida, comparar con otros lugares, ser impaciente'
    },
    {
      situacion: 'Manejo de residuos',
      queHacer: 'Llevar tu basura, separar residuos, usar botellas reutilizables',
      queEvitar: 'Dejar residuos en naturaleza, usar plásticos de un solo uso'
    },
    {
      situacion: 'Durante snorkeling o buceo',
      queHacer: 'Mantener flotabilidad neutral, observar sin tocar, seguir al guía',
      queEvitar: 'Tocar corales, perseguir tortugas, recolectar conchas'
    }
  ];
}