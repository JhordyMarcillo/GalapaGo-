import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="navbar">
      <div class="nav-container">
        
        <a routerLink="/inicio" class="brand-logo">
          <span class="logo-icon">🐢</span>
          <span class="logo-text">GalapaGo!</span>
        </a>

        <button class="menu-toggle" (click)="toggleMenu()" [class.open]="menuAbierto">
          <span></span><span></span><span></span>
        </button>

        <nav class="nav-links" [class.abierto]="menuAbierto">
          <a routerLink="/mapa" routerLinkActive="active" (click)="cerrarMenu()">Mapa Cultural</a>
          <a routerLink="/respeto" routerLinkActive="active" (click)="cerrarMenu()">Respeta la Cultura</a>
          <a routerLink="/frases" routerLinkActive="active" (click)="cerrarMenu()">Frases Locales</a>
          <a routerLink="/simulador" routerLinkActive="active" (click)="cerrarMenu()">Simulador</a>
          <a routerLink="/galeria" routerLinkActive="active" (click)="cerrarMenu()">Galería</a>
          <a routerLink="/ruta" routerLinkActive="active" (click)="cerrarMenu()">Ruta del Buen Vivir</a>
          <a routerLink="/chatbot" routerLinkActive="active" (click)="cerrarMenu()">Asistente</a>
          
        </nav>

      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <div class="footer-container">
        
        <div class="footer-seccion brand">
          <div class="brand-logo-footer">
            <span class="logo-icon">🐢</span>
            <span class="logo-text">GalapaGo!</span>
          </div>
          <p>Promoviendo la relación intercultural y el turismo responsable en las Islas Encantadas a través de la filosofía del Buen Vivir.</p>
        </div>

        <div class="footer-seccion links">
          <h4>Explora</h4>
          <a routerLink="/mapa">Mapa Interactivo</a>
          <a routerLink="/respeto">Guía de Normativas</a>
          <a routerLink="/simulador">Simulador de Concienciación</a>
        </div>

        <div class="footer-seccion academico">
          <h4>Proyecto Académico</h4>
          <p>Universidad de las Fuerzas Armadas ESPE</p>
          <p>Ingeniería en Software</p>
          <p>Sede Matriz Sangolquí</p>
        </div>

      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 GalapaGo! - Desarrollado por Pamela Chipe, Carlos Jaya, Cesar Loor y Jhordy Marcillo.</p>
      </div>
    </footer>
  `,
  styles: [`
    /* RESET BÁSICO PARA EL LAYOUT GLOBAL */
    :host { display: flex; flex-direction: column; min-height: 100vh; font-family: 'Segoe UI', system-ui, sans-serif; }
    .main-content { flex: 1; padding-top: 80px; /* Compensa el header fixed */ background-color: #f8fafc; }

    /* NAVBAR */
    .navbar { position: fixed; top: 0; left: 0; width: 100%; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); box-shadow: 0 4px 20px rgba(0,0,0,0.05); z-index: 2000; border-bottom: 1px solid #f1f5f9; }
    .nav-container { max-width: 1300px; margin: 0 auto; padding: 0 1.5rem; height: 70px; display: flex; justify-content: space-between; align-items: center; }
    
    .brand-logo { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
    .logo-icon { font-size: 2rem; line-height: 1; }
    .logo-text { font-size: 1.5rem; font-weight: 800; color: #0f766e; letter-spacing: -0.5px; }

    /* Links de Navegación */
    .nav-links { display: flex; gap: 0.5rem; align-items: center; }
    .nav-links a { text-decoration: none; color: #475569; font-weight: 600; font-size: 0.95rem; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s ease; }
    .nav-links a:hover { background: #f0fdfa; color: #0d9488; }
    .nav-links a.active { background: #0d9488; color: white; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2); }

    /* Controles Desktop */
    .nav-actions-desktop { display: flex; gap: 1rem; align-items: center; }
    .btn-lang { background: transparent; border: 1px solid #cbd5e1; color: #475569; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .btn-lang:hover { border-color: #0d9488; color: #0d9488; }
    .btn-login { background: white; color: #0f766e; border: 2px solid #0f766e; padding: 0.5rem 1.5rem; border-radius: 20px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
    .btn-login:hover { background: #0f766e; color: white; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.2); }

    .nav-actions-mobile { display: none; }

    /* MENU HAMBURGUESA */
    .menu-toggle { display: none; flex-direction: column; gap: 5px; background: transparent; border: none; cursor: pointer; padding: 0.5rem; z-index: 2001; }
    .menu-toggle span { width: 25px; height: 3px; background: #0f766e; border-radius: 3px; transition: all 0.3s ease; }
    .menu-toggle.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .menu-toggle.open span:nth-child(2) { opacity: 0; }
    .menu-toggle.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    /* FOOTER */
    .footer { background: #0f172a; color: #cbd5e1; padding: 4rem 0 0 0; margin-top: auto; border-top: 4px solid #0d9488; }
    .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    
    .brand-logo-footer { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; filter: grayscale(1) brightness(2); }
    .footer-seccion h4 { color: white; font-size: 1.1rem; margin: 0 0 1.5rem 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .footer-seccion p { line-height: 1.6; margin: 0 0 0.8rem 0; color: #94a3b8; }
    
    .footer-seccion.links { display: flex; flex-direction: column; gap: 0.8rem; }
    .footer-seccion.links a { color: #94a3b8; text-decoration: none; transition: color 0.2s; }
    .footer-seccion.links a:hover { color: #2dd4bf; }

    .footer-bottom { background: #020617; padding: 1.5rem; text-align: center; color: #64748b; font-size: 0.9rem; border-top: 1px solid #1e293b; }
    .footer-bottom p { margin: 0; }

    /* RESPONSIVE DESIGN */
    @media (max-width: 1024px) {
      .nav-links { display: none; position: fixed; top: 70px; left: 0; width: 100%; background: white; flex-direction: column; padding: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border-top: 1px solid #f1f5f9; }
      .nav-links.abierto { display: flex; }
      .nav-links a { width: 100%; text-align: center; padding: 1rem; font-size: 1.1rem; }
      .nav-actions-desktop { display: none; }
      .nav-actions-mobile { display: flex; flex-direction: column; gap: 1rem; width: 100%; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
      .menu-toggle { display: flex; }
      .footer-container { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
      .brand-logo-footer { justify-content: center; }
    }
  `]
})
export class AppComponent {
  menuAbierto = false;

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }
}