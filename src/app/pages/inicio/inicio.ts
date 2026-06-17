import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="inicio-wrapper">
      
      <div class="hero-section fade-in">
        <div class="hero-content">
          <span class="icono-flotante">🐢</span>
          <h1>¡Bienvenido a las Islas Galápagos!</h1>
          <p>Descubre un paraíso natural donde la biodiversidad y la cultura se encuentran</p>
          <button class="btn-explorar" routerLink="/mapa">Explora la Experiencia ➔</button>
        </div>
      </div>

      <div class="modulos-grid slide-up">
        
        <div class="modulo-card" routerLink="/mapa">
          <div class="modulo-icon bg-teal">🗺️</div>
          <div class="modulo-texto">
            <h3>Mapa Interactivo</h3>
            <p>Explora cada isla y descubre su cultura, gastronomía y fauna única.</p>
          </div>
        </div>

        <div class="modulo-card" routerLink="/respeto">
          <div class="modulo-icon bg-pink">📖</div>
          <div class="modulo-texto">
            <h3>Aprende la Cultura</h3>
            <p>Conoce las costumbres locales y cómo ser un visitante respetuoso.</p>
          </div>
        </div>

        <div class="modulo-card" routerLink="/simulador">
          <div class="modulo-icon bg-blue">🎮</div>
          <div class="modulo-texto">
            <h3>Simulador</h3>
            <p>Pon a prueba tus conocimientos sobre turismo responsable.</p>
          </div>
        </div>

        <div class="modulo-card" routerLink="/frases">
          <div class="modulo-icon bg-purple">🗣️</div>
          <div class="modulo-texto">
            <h3>Frases Locales</h3>
            <p>Aprende expresiones ecuatorianas para conectar con la comunidad.</p>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .inicio-wrapper { max-width: 1200px; margin: 0 auto; padding: 1rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    
    /* Hero Section (Basado en el diseño azul/verde) */
    .hero-section { background: linear-gradient(135deg, #0d9488 0%, #3b82f6 100%); border-radius: 24px; padding: 4rem 2rem; color: white; text-align: center; margin-bottom: 3rem; box-shadow: 0 10px 30px rgba(13, 148, 136, 0.2); position: relative; overflow: hidden; }
    .hero-content { position: relative; z-index: 2; max-width: 800px; margin: 0 auto; }
    
    .icono-flotante { font-size: 4rem; display: inline-block; margin-bottom: 1rem; animation: float 3s ease-in-out infinite; }
    .hero-content h1 { font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; letter-spacing: -1px; }
    .hero-content p { font-size: 1.25rem; opacity: 0.9; margin: 0 0 2.5rem 0; line-height: 1.6; }
    
    .btn-explorar { background: white; color: #0d9488; border: none; padding: 1rem 2.5rem; border-radius: 30px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .btn-explorar:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.2); }

    /* Cuadrícula de Módulos */
    .modulos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 0 1rem; }
    
    .modulo-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; display: flex; gap: 1.5rem; align-items: center; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
    .modulo-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(0,0,0,0.06); border-color: #cbd5e1; }
    
    .modulo-icon { width: 60px; height: 60px; border-radius: 16px; display: flex; justify-content: center; align-items: center; font-size: 1.8rem; flex-shrink: 0; }
    .bg-teal { background: #ccfbf1; color: #0f766e; }
    .bg-pink { background: #fce7f3; color: #be185d; }
    .bg-blue { background: #dbeafe; color: #1d4ed8; }
    .bg-purple { background: #f3e8ff; color: #7e22ce; }

    .modulo-texto h3 { margin: 0 0 0.4rem 0; color: #1e293b; font-size: 1.2rem; }
    .modulo-texto p { margin: 0; color: #64748b; font-size: 0.95rem; line-height: 1.4; }

    /* Animaciones */
    .fade-in { animation: fadeIn 0.6s ease-out forwards; }
    .slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.2s; opacity: 0; }
    
    @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 768px) {
      .hero-content h1 { font-size: 2.2rem; }
      .hero-section { padding: 3rem 1.5rem; }
      .modulo-card { flex-direction: column; text-align: center; gap: 1rem; }
    }
  `]
})
export class InicioComponent {}