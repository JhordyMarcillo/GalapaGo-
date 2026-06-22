import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface Mensaje {
  emisor: 'bot' | 'user';
  texto: string;
  hora: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  providers: [DatePipe],
  template: `
    <div class="chatbot-wrapper">
      
      <div class="hero-header slide-down">
        <div class="bot-avatar-gigante">🐢</div>
        <h2>{{ 'Asistente Virtual GalapaGo!' | translate }}</h2>
        <p>{{ 'Resuelve tus dudas sobre turismo responsable, normas del Buen Vivir, fauna y gastronomía en tiempo real.' | translate }}</p>
      </div>

      <div class="chat-container fade-in">
        
        <div class="opciones-rapidas">
          <button class="chip" 
                  *ngFor="let opt of opciones" 
                  [disabled]="isTyping"
                  (click)="enviarOpcion(opt)">
            {{ opt | translate }}
          </button>
        </div>

        <div class="chat-window" #scrollMe>
          
          <div class="mensaje-fila" *ngFor="let msg of mensajes" [ngClass]="msg.emisor">
            <div class="avatar-bot" *ngIf="msg.emisor === 'bot'">🐢</div>
            
            <div class="burbuja-wrapper">
              <div class="burbuja" [ngClass]="msg.emisor">
                <p *ngIf="msg.emisor === 'user'">{{ msg.texto }}</p>
                <p *ngIf="msg.emisor === 'bot'">{{ msg.texto | translate }}</p>
              </div>
              <span class="hora">{{ msg.hora }}</span>
            </div>
          </div>

          <div class="mensaje-fila bot" *ngIf="isTyping">
            <div class="avatar-bot">🐢</div>
            <div class="burbuja bot typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>

        </div>

        <div class="chat-input-area">
          <input type="text" 
                 [(ngModel)]="mensajeActual" 
                 [placeholder]="'Escribe tu pregunta aquí...' | translate" 
                 [disabled]="isTyping"
                 (keyup.enter)="enviarMensaje()">
          
          <button class="btn-enviar" 
                  [disabled]="isTyping || !mensajeActual.trim()" 
                  (click)="enviarMensaje()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .chatbot-wrapper { max-width: 800px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    
    .hero-header { text-align: center; margin-bottom: 2rem; }
    .bot-avatar-gigante { font-size: 3.5rem; background: #ccfbf1; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; border-radius: 50%; margin: 0 auto 1rem auto; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.2); }
    .hero-header h2 { color: #1e293b; font-size: 2.2rem; font-weight: 700; margin-bottom: 0.5rem; }
    .hero-header p { color: #64748b; font-size: 1.05rem; }

    .chat-container { background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08); border: 1px solid rgba(0,0,0,0.05); overflow: hidden; display: flex; flex-direction: column; }
    
    .opciones-rapidas { display: flex; gap: 0.5rem; padding: 1rem 1.5rem; background: #f8fafc; overflow-x: auto; border-bottom: 1px solid #e2e8f0; scrollbar-width: none; }
    .opciones-rapidas::-webkit-scrollbar { display: none; }
    .chip { background: white; border: 1px solid #cbd5e1; color: #475569; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
    .chip:hover:not([disabled]) { border-color: #0d9488; color: #0d9488; background: #f0fdfa; }
    .chip[disabled] { opacity: 0.6; cursor: not-allowed; }

    .chat-window { height: 450px; overflow-y: auto; padding: 1.5rem; background: #f1f5f9; display: flex; flex-direction: column; gap: 1.5rem; scroll-behavior: smooth; }
    
    .mensaje-fila { display: flex; gap: 1rem; align-items: flex-end; width: 100%; }
    .mensaje-fila.user { justify-content: flex-end; }
    
    .avatar-bot { background: #0d9488; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 1.2rem; flex-shrink: 0; box-shadow: 0 2px 5px rgba(13, 148, 136, 0.3); }
    
    .burbuja-wrapper { max-width: 75%; display: flex; flex-direction: column; gap: 0.3rem; }
    .user .burbuja-wrapper { align-items: flex-end; }
    
    .burbuja { padding: 1rem 1.2rem; border-radius: 18px; font-size: 1.05rem; line-height: 1.5; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    .burbuja p { margin: 0; }
    .burbuja.bot { background: white; color: #334155; border-bottom-left-radius: 4px; border: 1px solid #e2e8f0; }
    .burbuja.user { background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); color: white; border-bottom-right-radius: 4px; }
    
    .hora { font-size: 0.75rem; color: #94a3b8; padding: 0 0.5rem; }

    /* Animación Escribiendo */
    .typing-indicator { display: flex; gap: 4px; padding: 1.2rem !important; align-items: center; }
    .typing-indicator span { width: 8px; height: 8px; background: #cbd5e1; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); background: #0d9488; } }

    .chat-input-area { display: flex; gap: 0.8rem; padding: 1.2rem 1.5rem; background: white; border-top: 1px solid #e2e8f0; }
    .chat-input-area input { flex-grow: 1; padding: 1rem 1.5rem; border: 1px solid #cbd5e1; border-radius: 25px; font-size: 1rem; outline: none; transition: border-color 0.2s; background: #f8fafc; }
    .chat-input-area input:focus { border-color: #0d9488; background: white; }
    .chat-input-area input[disabled] { background: #f1f5f9; cursor: not-allowed; }
    
    .btn-enviar { background: #0d9488; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 10px rgba(13, 148, 136, 0.3); }
    .btn-enviar svg { width: 20px; height: 20px; margin-right: 2px; margin-top: 2px; }
    .btn-enviar:hover:not([disabled]) { transform: scale(1.05); background: #0f766e; }
    .btn-enviar[disabled] { background: #cbd5e1; cursor: not-allowed; box-shadow: none; }

    .slide-down { animation: slideDown 0.4s ease-out forwards; }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  opciones = ['🐾 Fauna Mágica', '📜 Reglas del Parque', '🍽️ Comida Típica', '🏛️ Monumentos', '🎭 Cultura Local', '🌐 Traductor'];
  
  mensajes: Mensaje[] = [];
  mensajeActual = '';
  isTyping = false; 

  constructor(private datePipe: DatePipe) {
    this.mensajes.push({ 
      emisor: 'bot', 
      texto: '¡Hola! Soy GalapaBot 🐢. Estoy aquí para guiarte en tu aventura promoviendo el Buen Vivir. ¿Sobre qué te gustaría aprender hoy?', 
      hora: this.obtenerHoraActual() 
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  obtenerHoraActual(): string {
    return this.datePipe.transform(new Date(), 'HH:mm') || '';
  }

  enviarOpcion(opcion: string) {
    this.mensajeActual = opcion;
    this.enviarMensaje();
  }

  async enviarMensaje() {
    if (this.isTyping || !this.mensajeActual.trim()) return;

    const consultaUsuario = this.mensajeActual;
    this.mensajes.push({ emisor: 'user', texto: consultaUsuario, hora: this.obtenerHoraActual() });
    this.mensajeActual = '';
    this.isTyping = true;
    this.scrollToBottom();

    this.isTyping = false;
    this.mensajes.push({ emisor: 'bot', texto: this.obtenerRespuestaBot(consultaUsuario), hora: this.obtenerHoraActual() });
    this.scrollToBottom();
  }

  obtenerRespuestaBot(mensaje: string): string {
    const texto = mensaje.toLowerCase();
    
    if (texto.match(/hola|buenos|buenas|saludos|que tal|q tal|holi/)) {
      return '¡Hola! Qué gusto saludarte. Soy GalapaBot, tu guía interactivo. ¿Te gustaría saber sobre nuestras tortugas, playas, reglas o quizás algo de comida típica?';
    }
    else if (texto.match(/que hay|que hacer|turismo|atracciones|visitar|lugares|islas|playa/)) {
      return 'Galápagos es un paraíso natural de 13 islas principales. Puedes hacer snorkeling con tortugas marinas, visitar volcanes como el Sierra Negra, relajarte en playas de arena blanca como Tortuga Bay, y observar animales prehistóricos. ¡Todo mientras respetamos su ecosistema!';
    }
    else if (texto.match(/fauna|animal|tortuga|iguana|pinguino|lobo|piquero|ave|pájaro/)) {
      return 'Nuestra fauna es única en el mundo. Aquí encontrarás a las famosas Tortugas Gigantes (¡pueden vivir más de 100 años!), Iguanas Marinas que bucean, Piqueros de Patas Azules y adorables Lobos Marinos. La regla de oro es: mantén al menos 2 metros de distancia y NUNCA los alimentes.';
    }
    else if (texto.match(/regla|norma|prohibido|parque|cuidado|responsable|distancia|basura/)) {
      return 'El Parque Nacional Galápagos tiene normas estrictas: 1. Mantén 2 metros de distancia con la fauna. 2. No saques elementos naturales (arena, conchas, rocas). 3. Camina siempre por los senderos autorizados. 4. Llévate toda tu basura de vuelta a la ciudad.';
    }
    else if (texto.match(/comida|gastronom|comer|plato|restaurante|hambre|desayuno|almuerzo/)) {
      return '¡La comida aquí es deliciosa! Tienes que probar el Encebollado de pescado, los Bolones de verde, y los mariscos al carbón. Te recomiendo visitar los quioscos locales en Puerto Ayora o Puerto Baquerizo Moreno para disfrutar de comida auténtica y apoyar a la comunidad.';
    }
    else if (texto.match(/clima|tiempo|calor|frio|lluvia|mes|cuando viajar|mejor epoca/)) {
      return 'Tenemos dos temporadas: de Enero a Mayo es la época cálida (ideal para playa y snorkeling, con lluvias esporádicas). De Junio a Diciembre es la época seca y fría (corriente de Humboldt), ¡perfecta para el buceo y observar vida marina muy activa!';
    }
    else if (texto.match(/traductor|ingles|frase|palabra|significa|diccionario|hablar/)) {
      return 'En Ecuador usamos frases muy interesantes. Por ejemplo, decimos "¡Qué bacán!" para decir que algo es genial, o "Ñaño/a" para referirnos a un amigo muy cercano. Usa nuestro módulo de "Frases Locales" para aprender muchas más.';
    }
    else if (texto.match(/precio|costo|vuelo|llegar|dinero|pagar|tributo/)) {
      return 'Para llegar debes tomar un vuelo desde Ecuador continental. Al llegar, se debe abonar la Tarjeta de Control de Tránsito (TCT) y el tributo de ingreso al Parque Nacional. Estos fondos son vitales para la conservación de nuestro archipiélago.';
    }
    else if (texto.match(/darwin|historia|evolucion|origen|charles/)) {
      return 'Charles Darwin nos visitó en 1835. Sus observaciones de pinzones y tortugas fueron fundamentales para su Teoría de la Evolución. ¡Te invito a visitar la Estación Científica Charles Darwin en la Isla Santa Cruz para aprender más!';
    }
    else if (texto.match(/adios|chao|gracias|hasta luego|nos vemos|bye/)) {
      return '¡Con mucho gusto! Espero haberte ayudado. Disfruta tu estadía en las "Islas Encantadas" y recuerda ser siempre un viajero responsable. ¡Chao!';
    }
    else {
      const fallbacks = [
        '¡Qué pregunta tan interesante! Galápagos tiene tanto por descubrir. Podría contarte sobre nuestros animales endémicos, las reglas para visitar el parque o nuestra deliciosa comida local. ¿Qué prefieres?',
        'No estoy seguro de tener la respuesta exacta a eso. Pero te puedo hablar de las majestuosas Tortugas Gigantes, las rutas turísticas o cómo puedes ayudarnos a conservar las islas.',
        'Mi conocimiento se enfoca en el turismo responsable y la vida en el archipiélago. ¿Te gustaría saber qué lugares visitar o quizás conocer algunas frases ecuatorianas?',
        '¡Vaya, eso suena genial! Si tienes dudas sobre qué hacer en Santa Cruz, Isabela o San Cristóbal, o cómo interactuar con nuestra fauna, ¡solo pregúntame!'
      ];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  }
}