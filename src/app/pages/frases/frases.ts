import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Frase {
  local: string;
  significado: string;
  ingles: string;
  ejemplo: string;
  categoria: string;
}

@Component({
  selector: 'app-frases',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="frases-wrapper">
      
      <div class="hero-header slide-down">
        <div class="icono-gigante">🗣️</div>
        <h2>Diccionario Cultural Ecuatoriano</h2>
        <p>Aprende las expresiones locales que te ayudarán a conectar con la comunidad de Galápagos y enriquecer tu experiencia de viaje.</p>
      </div>

      <div class="banner-educativo fade-in">
        <div class="banner-contenido">
          <h3>Diversidad Lingüística</h3>
          <p>Ecuador es un país multilingüe. Además del español, se hablan lenguas indígenas milenarias como el Kichwa y el Shuar. ¡Nuestra forma de hablar es una mezcla de toda esta riqueza!</p>
        </div>
        <div class="idiomas-tags">
          <span class="lang-badge">🇪🇨 Español</span>
          <span class="lang-badge">🇺🇸 English</span>
        </div>
      </div>

      <div class="filtros fade-in">
        <button *ngFor="let cat of categorias" 
                [ngClass]="{'activo': categoriaActual === cat}"
                (click)="filtrarPorCategoria(cat)">
          {{ cat }}
        </button>
      </div>

      <div class="grid-frases">
        <div class="tarjeta-frase slide-up" *ngFor="let frase of frasesFiltradas">
          
          <div class="frase-header">
            <h3 class="palabra-local">"{{ frase.local }}"</h3>
            <button class="btn-audio" 
                    title="Escuchar pronunciación" 
                    (click)="reproducirAudio(frase.local)">
              🔊
            </button>
          </div>
          
          <div class="frase-body">
            <p class="significado"><strong>Significado:</strong> {{ frase.significado }}</p>
            <p class="ejemplo"><em>Ejemplo: "{{ frase.ejemplo }}"</em></p>
          </div>
          
          <div class="frase-footer">
            <span class="badge-ingles">🌐 {{ frase.ingles }}</span>
            <span class="badge-categoria">{{ frase.categoria }}</span>
          </div>

        </div>
      </div>

      <div class="empty-state" *ngIf="frasesFiltradas.length === 0">
        <p>No se encontraron frases para esta categoría.</p>
      </div>

    </div>
  `,
  styles: [`
    .frases-wrapper { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    
    .hero-header { text-align: center; margin-bottom: 2.5rem; }
    .icono-gigante { font-size: 3.5rem; margin-bottom: 1rem; }
    .hero-header h2 { color: #1e293b; font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
    .hero-header p { color: #64748b; font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.6; }

    .banner-educativo { background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); color: white; border-radius: 16px; padding: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2.5rem; box-shadow: 0 10px 25px rgba(13, 148, 136, 0.2); }
    .banner-contenido h3 { margin: 0 0 0.5rem 0; font-size: 1.4rem; }
    .banner-contenido p { margin: 0; font-size: 1.05rem; opacity: 0.9; line-height: 1.5; max-width: 700px; }
    .idiomas-tags { display: flex; gap: 0.8rem; }
    .lang-badge { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(5px); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.3); }

    .filtros { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 3rem; }
    .filtros button { background: white; color: #475569; border: 1px solid #cbd5e1; padding: 0.6rem 1.5rem; border-radius: 25px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
    .filtros button:hover { border-color: #0d9488; color: #0d9488; }
    .filtros button.activo { background: #0d9488; color: white; border-color: #0d9488; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.2); }

    .grid-frases { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
    .tarjeta-frase { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; display: flex; flex-direction: column; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .tarjeta-frase:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-color: #e2e8f0; }

    .frase-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.8rem; }
    .palabra-local { color: #0f766e; font-size: 1.4rem; margin: 0; font-weight: 700; }
    
    .btn-audio { background: #f0fdfa; border: 1px solid #ccfbf1; font-size: 1.2rem; cursor: pointer; border-radius: 50%; width: 44px; height: 44px; display: flex; justify-content: center; align-items: center; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .btn-audio:hover { background: #ccfbf1; transform: scale(1.1); box-shadow: 0 4px 10px rgba(13, 148, 136, 0.15); }
    .btn-audio:active { transform: scale(0.95); }

    .frase-body { flex-grow: 1; margin-bottom: 1.5rem; }
    .significado { color: #334155; font-size: 1.05rem; margin: 0 0 0.8rem 0; line-height: 1.5; }
    .ejemplo { color: #64748b; font-size: 0.95rem; margin: 0; background: #f8fafc; padding: 0.8rem; border-radius: 8px; border-left: 3px solid #cbd5e1; }

    .frase-footer { display: flex; justify-content: space-between; align-items: center; }
    .badge-ingles { background: #f1f5f9; color: #475569; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; }
    .badge-categoria { color: #0d9488; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

    .empty-state { text-align: center; color: #64748b; padding: 3rem; font-size: 1.1rem; }

    .slide-down { animation: slideDown 0.4s ease-out forwards; }
    .slide-up { animation: slideUp 0.4s ease-out forwards; }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    
    @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    @media (max-width: 600px) {
      .banner-educativo { flex-direction: column; text-align: center; }
      .idiomas-tags { justify-content: center; }
    }
  `]
})
export class FrasesComponent {
  
  categorias: string[] = ['Todas', 'Saludos', 'Cotidianas', 'Turismo', 'Comida'];
  categoriaActual: string = 'Todas';

  frases: Frase[] = [
    { local: '¡Qué bacán!', significado: '¡Qué genial! o ¡Qué increíble!', ingles: 'How awesome!', ejemplo: '¡Qué bacán está el clima hoy para ir a la playa!', categoria: 'Cotidianas' },
    { local: 'Ñaño / Ñaña', significado: 'Hermano o hermana (usado para amigos muy cercanos).', ingles: 'Brother / Sister', ejemplo: 'Vamos a comer algo, ñaño.', categoria: 'Saludos' },
    { local: 'Mande', significado: '¿Qué pasó?, ¿Dime?, o ¿Perdón? (Muestra de respeto).', ingles: 'Pardon? / Yes?', ejemplo: '—¡Jhordy! —¡Mande, dígame!', categoria: 'Saludos' },
    { local: 'Chiro', significado: 'Estar sin dinero, quebrado.', ingles: 'Broke / Penniless', ejemplo: 'No puedo ir al tour hoy, estoy chiro.', categoria: 'Cotidianas' },
    { local: 'De ley', significado: 'Por supuesto, claro que sí, obligatoriamente.', ingles: 'Of course / Definitely', ejemplo: '—¿Vamos a ver a las tortugas? —¡De ley!', categoria: 'Cotidianas' },
    { local: 'Caleta', significado: 'Casa u hogar.', ingles: 'Home / House', ejemplo: 'Ya estoy cansado, me voy a mi caleta.', categoria: 'Cotidianas' },
    { local: 'Pite', significado: 'Un poquito, una pequeña cantidad.', ingles: 'A little bit', ejemplo: 'Ponle solo un pite de ají a mi comida.', categoria: 'Comida' },
    { local: 'Biela', significado: 'Cerveza.', ingles: 'Beer', ejemplo: 'Hace mucho calor, compremos unas bielas heladas.', categoria: 'Comida' },
    { local: 'Chuchaqui', significado: 'Resaca después de haber bebido alcohol.', ingles: 'Hangover', ejemplo: 'Tengo un chuchaqui terrible, necesito un encebollado.', categoria: 'Comida' },
    { local: 'Sorbete', significado: 'Pajilla o popote (Importante: están prohibidos en Galápagos).', ingles: 'Drinking straw', ejemplo: 'Por favor, un jugo pero sin sorbete.', categoria: 'Turismo' },
    { local: 'Paco', significado: 'Policía o guardia.', ingles: 'Police officer', ejemplo: 'Pregúntale a ese paco dónde queda el muelle.', categoria: 'Turismo' },
    { local: 'Chuta', significado: 'Expresión de sorpresa, lamento o frustración leve.', ingles: 'Shoot! / Wow!', ejemplo: '¡Chuta! Me olvidé el protector solar en el hotel.', categoria: 'Cotidianas' },
    { local: 'Pelado', significado: 'Niño/a, o también se usa para referirse al novio/a.', ingles: 'Kid / Boyfriend / Girlfriend', ejemplo: 'Esos pelados están jugando en la arena.', categoria: 'Cotidianas' },
    { local: 'Pana', significado: 'Amigo cercano.', ingles: 'Buddy / Pal', ejemplo: 'Él es mi pana, hicimos juntos el tour de buceo.', categoria: 'Saludos' }
  ];

  get frasesFiltradas(): Frase[] {
    if (this.categoriaActual === 'Todas') {
      return this.frases;
    }
    return this.frases.filter(frase => frase.categoria === this.categoriaActual);
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActual = categoria;
  }

  reproducirAudio(texto: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      
      utterance.lang = 'es-EC';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tu navegador no soporta la reproducción de audio.");
    }
  }
}