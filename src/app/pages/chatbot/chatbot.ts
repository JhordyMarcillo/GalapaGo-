import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Mensaje {
  emisor: 'bot' | 'user';
  texto: string;
  hora: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  template: `
    <div class="chatbot-wrapper">
      
      <div class="hero-header slide-down">
        <div class="bot-avatar-gigante">🐢</div>
        <h2>Asistente Virtual GalapaGo!</h2>
        <p>Resuelve tus dudas sobre turismo responsable, normas del Buen Vivir, fauna y gastronomía en tiempo real.</p>
      </div>

      <div class="chat-container fade-in">
        
        <div class="opciones-rapidas">
          <button class="chip" 
                  *ngFor="let opt of opciones" 
                  [disabled]="isTyping"
                  (click)="enviarOpcion(opt)">
            {{ opt }}
          </button>
        </div>

        <div class="chat-window" #scrollMe>
          
          <div class="mensaje-fila" *ngFor="let msg of mensajes" [ngClass]="msg.emisor">
            <div class="avatar-bot" *ngIf="msg.emisor === 'bot'">🐢</div>
            
            <div class="burbuja-wrapper">
              <div class="burbuja" [ngClass]="msg.emisor">
                <p>{{ msg.texto }}</p>
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
                 placeholder="Escribe tu pregunta aquí..." 
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

  opciones = ['🐾 Fauna Mágica', '📜 Reglas del Parque', '🍽️ Comida Típica', '🏛️ Monumentos', '🎭 Cultura Local', '💡 Qué empacar'];
  
  mensajes: Mensaje[] = [];
  mensajeActual = '';
  isTyping = false; // Bandera de seguridad principal

  constructor(private datePipe: DatePipe) {
    // Mensaje inicial de bienvenida
    this.mensajes.push({ 
      emisor: 'bot', 
      texto: '¡Hola! Soy GalapaBot 🐢. Estoy aquí para guiarte en tu aventura promoviendo el Buen Vivir. ¿Sobre qué te gustaría aprender hoy?', 
      hora: this.obtenerHoraActual() 
    });
  }

  // Se ejecuta después de cada cambio en la vista para bajar el scroll
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

  enviarMensaje() {
    if (this.isTyping || !this.mensajeActual.trim()) return;

    // 1. Bloqueamos input y agregamos mensaje del usuario
    const consultaUsuario = this.mensajeActual;
    this.mensajes.push({ emisor: 'user', texto: consultaUsuario, hora: this.obtenerHoraActual() });
    this.mensajeActual = '';
    this.isTyping = true; // Activa la animación "Escribiendo..."

    // 2. Simulamos el tiempo de respuesta del servidor (1.5 segundos)
    setTimeout(() => {
      const respuesta = this.generarRespuestaBot(consultaUsuario.toLowerCase());
      
      this.isTyping = false; // Oculta animación
      this.mensajes.push({ emisor: 'bot', texto: respuesta, hora: this.obtenerHoraActual() });
    }, 1500);
  }

  // Motor de respuestas lógico (Basado en el ERS y reglas oficiales)
  generarRespuestaBot(consulta: string): string {
    if (consulta.includes('fauna') || consulta.includes('animal') || consulta.includes('tortuga') || consulta.includes('lobo') || consulta.includes('iguana')) {
      return 'En Galápagos encontrarás especies endémicas increíbles. La regla de oro es: mantén siempre una distancia mínima de 2 metros con cualquier animal y por ningún motivo intentes alimentarlos o tocarlos.';
    } 
    else if (consulta.includes('regla') || consulta.includes('norma') || consulta.includes('prohibido') || consulta.includes('basura')) {
      return 'El Buen Vivir exige respetar el entorno. No introduzcas alimentos externos, usa solo protector solar biodegradable, llévate toda tu basura de regreso y no extraigas arena, rocas ni conchas de las playas.';
    }
    else if (consulta.includes('comida') || consulta.includes('gastronomia') || consulta.includes('comer') || consulta.includes('plato')) {
      return '¡La comida es deliciosa! Te recomiendo probar el Ceviche de Canchalagua en San Cristóbal, o un rico Encebollado de pescado en Santa Cruz. Recuerda siempre consumir en los mercados locales para apoyar a la comunidad.';
    }
    else if (consulta.includes('monumento') || consulta.includes('lugar') || consulta.includes('visitar') || consulta.includes('isla')) {
      return 'Tienes lugares fantásticos como la Estación Científica Charles Darwin en Santa Cruz, el Muro de las Lágrimas en Isabela, o el León Dormido (Kicker Rock) en San Cristóbal.';
    }
    else if (consulta.includes('cultura') || consulta.includes('frase') || consulta.includes('saludo')) {
      return 'Los locales son muy amables. Puedes decir "¡Qué bacán!" para expresar que algo es genial, o llamar "Ñaño" a un buen amigo. Visita la sección de Frases Locales para escuchar la pronunciación.';
    }
    else if (consulta.includes('empacar') || consulta.includes('ropa') || consulta.includes('llevar')) {
      return 'Trae ropa ligera, zapatos cómodos para caminatas sobre rocas volcánicas, tu propia botella de agua reutilizable (para no generar plástico) y protector solar amigable con los arrecifes.';
    }
    else {
      // Respuesta de fallback si no entiende
      return 'Es una excelente pregunta. Te recomiendo visitar nuestro Mapa Interactivo o realizar la Ruta del Buen Vivir en el menú superior para descubrir todos los detalles precisos sobre tu consulta.';
    }
  }
}