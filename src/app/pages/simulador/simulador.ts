import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Opcion {
  texto: string;
  puntos: number;
}

interface Pregunta {
  titulo: string;
  contexto: string;
  opciones: Opcion[];
  explicacion: string; // Nueva propiedad para la retroalimentación
}

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="simulador-wrapper">
      
      <div class="premium-card text-center slide-in" *ngIf="estado === 'inicio'">
        <div class="icono-gigante">🐢</div>
        <h2 class="titulo-premium">Simulador de Turismo Responsable</h2>
        <p class="subtitulo">Mide tu nivel de concienciación ambiental y descubre cómo tus decisiones impactan en el ecosistema sensible de Galápagos.</p>
        
        <div class="info-badges">
          <span class="badge">⏱️ 5 Minutos</span>
          <span class="badge">🎯 {{ preguntas.length }} Escenarios</span>
        </div>
        
        <button class="btn-premium btn-block" (click)="iniciarSimulador()">Comenzar Simulación</button>
      </div>

      <div class="premium-card slide-in" *ngIf="estado === 'jugando'">
        
        <div class="progreso-header">
          <span class="progreso-texto">Escenario {{ indiceActual + 1 }} de {{ preguntas.length }}</span>
          <span class="progreso-porcentaje">{{ porcentajeProgreso }}%</span>
        </div>
        <div class="progreso-barra-bg">
          <div class="progreso-barra-fill" [style.width.%]="porcentajeProgreso"></div>
        </div>

        <div class="pregunta-container">
          <h3 class="pregunta-titulo">{{ preguntaActual.titulo }}</h3>
          <p class="pregunta-contexto">{{ preguntaActual.contexto }}</p>
          
          <div class="opciones-grid" [ngClass]="{'bloqueado': mostrandoFeedback}">
            <div class="opcion-card" 
                 *ngFor="let op of preguntaActual.opciones; let i = index"
                 [ngClass]="obtenerClaseOpcion(i, op.puntos)"
                 (click)="seleccionarOpcion(i)">
              
              <div class="opcion-radio">
                <div class="radio-inner" *ngIf="indiceOpcionSeleccionada === i"></div>
                <span class="feedback-icon check" *ngIf="mostrandoFeedback && op.puntos === 10">✓</span>
                <span class="feedback-icon cross" *ngIf="mostrandoFeedback && indiceOpcionSeleccionada === i && op.puntos !== 10">✗</span>
              </div>
              <p>{{ op.texto }}</p>
            </div>
          </div>

          <div class="feedback-in-game slide-down" *ngIf="mostrandoFeedback" 
               [ngClass]="esRespuestaCorrecta() ? 'feedback-exito' : 'feedback-error'">
            <h4 class="feedback-titulo">
              {{ esRespuestaCorrecta() ? '¡Respuesta correcta!' : 'Respuesta incorrecta' }}
            </h4>
            <p>{{ preguntaActual.explicacion }}</p>
          </div>
        </div>

        <div class="controles-footer">
          <button class="btn-premium" 
                  [disabled]="indiceOpcionSeleccionada === null"
                  (click)="manejarAccionBoton()">
            <span *ngIf="!mostrandoFeedback">Comprobar Respuesta</span>
            <span *ngIf="mostrandoFeedback">{{ indiceActual === preguntas.length - 1 ? 'Ver Resultados' : 'Siguiente Escenario ➔' }}</span>
          </button>
        </div>
      </div>

      <div class="premium-card text-center fade-in" *ngIf="estado === 'resultados'">
        
        <div class="resultado-header">
          <svg class="circular-chart" viewBox="0 0 36 36">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" [attr.stroke-dasharray]="porcentajeFinal + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" class="percentage">{{ porcentajeFinal }}%</text>
          </svg>
        </div>

        <h2 class="titulo-resultado" [ngClass]="esNivelAlto ? 'texto-exito' : 'texto-alerta'">
          {{ esNivelAlto ? '¡Nivel Alto de Concienciación!' : 'Nivel Básico de Concienciación' }}
        </h2>
        
        <div class="feedback-box" [ngClass]="esNivelAlto ? 'box-exito' : 'box-alerta'">
          <p>{{ feedbackFinal }}</p>
        </div>

        <button class="btn-secundario mt-2" (click)="reiniciar()">Volver a intentar</button>
      </div>

    </div>
  `,
  styles: [`
    /* Contenedor y Estructura Base (Se mantiene) */
    .simulador-wrapper { max-width: 700px; margin: 2rem auto; padding: 0 1rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    .premium-card { background: #ffffff; border-radius: 20px; padding: 2.5rem; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08); border: 1px solid rgba(0,0,0,0.05); }
    .text-center { text-align: center; } .mt-2 { margin-top: 2rem; }
    
    .titulo-premium { color: #1e293b; font-size: 2rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
    .subtitulo { color: #64748b; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
    .icono-gigante { font-size: 4rem; margin-bottom: 1rem; line-height: 1; }
    
    .info-badges { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2.5rem; }
    .badge { background: #f1f5f9; color: #475569; padding: 0.5rem 1.2rem; border-radius: 50px; font-weight: 500; font-size: 0.95rem; }

    .btn-premium { background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%); color: white; border: none; padding: 1rem 2rem; border-radius: 12px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3); }
    .btn-premium:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4); }
    .btn-premium[disabled] { background: #cbd5e1; box-shadow: none; cursor: not-allowed; opacity: 0.7; }
    .btn-block { width: 100%; display: block; }
    .btn-secundario { background: white; color: #475569; border: 2px solid #e2e8f0; padding: 0.8rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    
    .progreso-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.8rem; font-weight: 600; color: #64748b; }
    .progreso-porcentaje { color: #0d9488; font-size: 1.2rem; }
    .progreso-barra-bg { background: #e2e8f0; height: 8px; border-radius: 10px; overflow: hidden; margin-bottom: 2.5rem; }
    .progreso-barra-fill { background: linear-gradient(90deg, #14b8a6, #0d9488); height: 100%; border-radius: 10px; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); }

    .pregunta-titulo { color: #1e293b; font-size: 1.4rem; margin: 0 0 0.8rem 0; }
    .pregunta-contexto { color: #475569; font-size: 1.05rem; line-height: 1.5; margin-bottom: 2rem; }
    
    /* Opciones y validaciones */
    .opciones-grid { display: flex; flex-direction: column; gap: 1rem; }
    .opciones-grid.bloqueado { pointer-events: none; }
    
    .opcion-card { display: flex; align-items: center; gap: 1rem; padding: 1.2rem; border: 2px solid #e2e8f0; border-radius: 12px; cursor: pointer; transition: all 0.2s ease; background: #ffffff; }
    .opcion-card p { margin: 0; color: #334155; font-weight: 500; font-size: 1.05rem; }
    .opcion-card:hover:not(.bloqueado) { border-color: #cbd5e1; background: #f8fafc; }
    
    /* Estados de las tarjetas */
    .opcion-card.seleccionada { border-color: #0d9488; background: #f0fdfa; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.1); }
    .opcion-card.es-correcta { border-color: #10b981; background: #ecfdf5; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15); }
    .opcion-card.es-incorrecta { border-color: #ef4444; background: #fef2f2; }
    .opcion-card.opacada { opacity: 0.5; border-color: #e2e8f0; }
    
    /* Radio Buttons e Iconos */
    .opcion-radio { width: 22px; height: 22px; border: 2px solid #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; position: relative; }
    .seleccionada .opcion-radio { border-color: #0d9488; }
    .radio-inner { width: 12px; height: 12px; background: #0d9488; border-radius: 50%; }
    
    .feedback-icon { font-weight: bold; position: absolute; font-size: 1.2rem; }
    .feedback-icon.check { color: #10b981; }
    .feedback-icon.cross { color: #ef4444; }
    .es-correcta .opcion-radio { border-color: #10b981; background: #10b981; }
    .es-correcta .radio-inner { display: none; }
    .es-correcta .feedback-icon.check { color: white; }

    /* Caja de Explicación In-Game */
    .feedback-in-game { margin-top: 1.5rem; padding: 1.5rem; border-radius: 12px; font-size: 1.05rem; line-height: 1.5; }
    .feedback-in-game .feedback-titulo { margin: 0 0 0.5rem 0; font-size: 1.1rem; font-weight: bold; }
    .feedback-in-game p { margin: 0; }
    .feedback-exito { background: #ecfdf5; border-left: 4px solid #10b981; color: #064e3b; }
    .feedback-error { background: #fef2f2; border-left: 4px solid #ef4444; color: #7f1d1d; }

    .controles-footer { margin-top: 2.5rem; display: flex; justify-content: flex-end; border-top: 1px solid #e2e8f0; padding-top: 1.5rem; }

    /* Resultados Finales (Se mantiene) */
    .resultado-header { display: flex; justify-content: center; margin-bottom: 1.5rem; }
    .circular-chart { display: block; margin: 0 auto; max-width: 150px; max-height: 150px; }
    .circle-bg { fill: none; stroke: #e2e8f0; stroke-width: 3; }
    .circle { fill: none; stroke-width: 3; stroke-linecap: round; animation: progress 1s ease-out forwards; }
    .texto-exito .circle { stroke: #10b981; }
    .texto-alerta .circle { stroke: #f59e0b; }
    .percentage { fill: #1e293b; font-family: sans-serif; font-size: 0.5em; text-anchor: middle; font-weight: bold; }
    
    .titulo-resultado { font-size: 1.8rem; margin-bottom: 1rem; }
    .texto-exito { color: #10b981; }
    .texto-alerta { color: #f59e0b; }
    
    .feedback-box { padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.6; }
    .box-exito { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; }
    .box-alerta { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }

    /* Animaciones */
    .slide-in { animation: slideIn 0.4s ease-out forwards; }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .slide-down { animation: slideDown 0.3s ease-out forwards; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes progress { 0% { stroke-dasharray: 0 100; } }
  `]
})
export class SimuladorComponent {
  estado: string = 'inicio';
  
  indiceActual = 0;
  puntajeTotal = 0;
  indiceOpcionSeleccionada: number | null = null;
  mostrandoFeedback: boolean = false;

  preguntas: Pregunta[] = [
    {
      titulo: 'Encuentro con Tortugas Marinas',
      contexto: 'Estás haciendo snorkeling en Isabela y encuentras una tortuga marina nadando hacia ti.',
      opciones: [
        { texto: 'Nadar hacia ella para tocarla y tomar una selfie.', puntos: 0 },
        { texto: 'Mantenerte estático, guardar 2 metros de distancia y observar.', puntos: 10 },
        { texto: 'Darle un poco de pan o comida para que se acerque más.', puntos: 0 }
      ],
      explicacion: 'Debes mantener una distancia mínima de 2 metros para no generar estrés en la fauna ni alterar su comportamiento natural.'
    },
    {
      titulo: 'Descanso de Lobos Marinos',
      contexto: 'Caminas por el malecón de San Cristóbal y encuentras un lobo marino durmiendo en una banca.',
      opciones: [
        { texto: 'Hacer ruidos para que se despierte y deje la banca libre.', puntos: 0 },
        { texto: 'Acercarte a acariciarlo mientras duerme.', puntos: 0 },
        { texto: 'Cederle el espacio y tomar fotografías desde una distancia prudente.', puntos: 10 }
      ],
      explicacion: 'Los lobos marinos necesitan descansar en las costas. Acercarse demasiado o molestarlos puede provocar reacciones agresivas o alterar su ciclo de descanso.'
    },
    {
      titulo: 'Fotografías a la Comunidad',
      contexto: 'Visitas una comunidad local en Puerto Ayora y ves a un pescador haciendo un trabajo tradicional muy pintoresco.',
      opciones: [
        { texto: 'Tomarle varias fotos con flash inmediatamente antes de que termine.', puntos: 0 },
        { texto: 'Saludar cordialmente y pedirle permiso antes de interactuar o tomar fotos.', puntos: 10 },
        { texto: 'Tomar las fotos de lejos a escondidas para que no se dé cuenta.', puntos: 5 }
      ],
      explicacion: 'El respeto por la cultura local implica no tratar a los residentes como atracciones turísticas. Siempre pide permiso antes de fotografiar a las personas o sus actividades.'
    },
    {
      titulo: 'Manejo de Residuos',
      contexto: 'Terminas tu botella de agua en un sendero donde no hay basureros a la vista.',
      opciones: [
        { texto: 'Guardar la botella en tu mochila y llevarla contigo hasta un punto de reciclaje poblado.', puntos: 10 },
        { texto: 'Dejarla debajo de una roca para no alterar la belleza del paisaje.', puntos: 0 },
        { texto: 'Dejarla en el sendero para que el guía del parque la recoja.', puntos: 0 }
      ],
      explicacion: 'Existe una política estricta de "No dejar rastro". Toda basura que ingreses a un área protegida debe regresar contigo.'
    },
    {
      titulo: 'Uso de los Senderos',
      contexto: 'Estás caminando por un sendero marcado, pero ves un ave muy rara posada sobre un cactus a unos 5 metros fuera del camino.',
      opciones: [
        { texto: 'Salir del sendero unos pasos para verla mejor y volver rápidamente.', puntos: 0 },
        { texto: 'Caminar solo por los senderos autorizados, respetando la flora y fauna desde tu posición.', puntos: 10 },
        { texto: 'Llamar al ave silbando para que vuele hacia el sendero.', puntos: 0 }
      ],
      explicacion: 'Salir de los senderos destruye vegetación sensible, nidos ocultos y fomenta la erosión del suelo volcánico.'
    },
    {
      titulo: 'Recuerdos de la Naturaleza',
      contexto: 'Encuentras una hermosa concha marina y un pequeño fragmento de roca volcánica brillante en la playa.',
      opciones: [
        { texto: 'Llevarte solo la roca pequeña como recuerdo de tu viaje.', puntos: 0 },
        { texto: 'Tomar la concha, ya que hay muchas otras en la playa.', puntos: 0 },
        { texto: 'Dejar todo en su lugar; está estrictamente prohibido extraer cualquier elemento natural.', puntos: 10 }
      ],
      explicacion: 'Extraer conchas, arena, rocas, plantas o partes de animales está penado por la ley para preservar el ecosistema intacto.'
    },
    {
      titulo: 'Comprando Souvenirs',
      contexto: 'Estás buscando recuerdos en un mercado local y un vendedor te ofrece un collar de "coral negro genuino".',
      opciones: [
        { texto: 'Rechazar la compra, ya que el comercio de partes de animales o corales está prohibido.', puntos: 10 },
        { texto: 'Comprarlo pero esconderlo en la maleta al salir del aeropuerto.', puntos: 0 },
        { texto: 'Comprarlo solo si el vendedor te asegura que lo encontró ya muerto en la playa.', puntos: 0 }
      ],
      explicacion: 'Comprar artesanías hechas de coral negro, caparazones o fauna endémica fomenta el tráfico de especies e impacta directamente la biodiversidad.'
    },
    {
      titulo: 'Uso del Flash en Fotografías',
      contexto: 'Es el atardecer y encuentras a una iguana terrestre camuflada. Hay poca luz y tu cámara te sugiere usar flash.',
      opciones: [
        { texto: 'Usar el flash rápidamente para una sola foto y luego apagarlo.', puntos: 0 },
        { texto: 'Desactivar el flash y tratar de tomar la foto con luz natural, sin molestar al animal.', puntos: 10 },
        { texto: 'Usar una linterna directa a los ojos del animal para que la cámara enfoque.', puntos: 0 }
      ],
      explicacion: 'El uso del flash ciega temporalmente a los animales y les causa un gran nivel de estrés, alterando su comportamiento natural.'
    },
    {
      titulo: 'Observación de Aves Anidando',
      contexto: 'Durante tu recorrido observas a un piquero de patas azules anidando en el suelo, justo a un lado del sendero.',
      opciones: [
        { texto: 'Acercarte a centímetros del nido para grabar a los polluelos.', puntos: 0 },
        { texto: 'Pasar caminando en silencio y con cuidado para no interrumpir el proceso de anidación.', puntos: 10 },
        { texto: 'Lanzarle migas de pan para que la madre se mueva y ver mejor los huevos.', puntos: 0 }
      ],
      explicacion: 'Las aves marinas de Galápagos anidan en el suelo y no le temen al humano. Perturbarlas puede hacer que abandonen el nido y a sus crías.'
    },
    {
      titulo: 'Buceo y Corales',
      contexto: 'Estás buceando y la corriente te empuja hacia una formación de coral frágil.',
      opciones: [
        { texto: 'Sujetarte del coral más fuerte para estabilizarte.', puntos: 0 },
        { texto: 'Mantener una flotabilidad neutral y maniobrar con tus aletas sin tocar absolutamente nada.', puntos: 10 },
        { texto: 'Empujarte con los pies apoyándote en las rocas llenas de corales.', puntos: 0 }
      ],
      explicacion: 'Los corales son seres vivos extremadamente delicados. Un solo toque con las manos o aletas puede destruir décadas de crecimiento coralino.'
    }
  ];

  get porcentajeProgreso(): number {
    if (this.estado === 'inicio') return 0;
    return Math.round((this.indiceActual / this.preguntas.length) * 100);
  }

  get preguntaActual(): Pregunta {
    return this.preguntas[this.indiceActual];
  }

  iniciarSimulador() {
    this.estado = 'jugando';
    this.indiceActual = 0;
    this.puntajeTotal = 0;
    this.indiceOpcionSeleccionada = null;
    this.mostrandoFeedback = false;
  }

  seleccionarOpcion(index: number) {
    if (this.mostrandoFeedback) return;
    this.indiceOpcionSeleccionada = index;
  }

  manejarAccionBoton() {
    if (this.indiceOpcionSeleccionada === null) return;

    if (!this.mostrandoFeedback) {
      this.mostrandoFeedback = true;
      const puntos = this.preguntaActual.opciones[this.indiceOpcionSeleccionada].puntos;
      this.puntajeTotal += puntos;
    } else {
      if (this.indiceActual < this.preguntas.length - 1) {
        this.indiceActual++;
        this.indiceOpcionSeleccionada = null;
        this.mostrandoFeedback = false;
      } else {
        this.estado = 'resultados';
      }
    }
  }

  obtenerClaseOpcion(indice: number, puntos: number): string {
    if (!this.mostrandoFeedback) {
      return this.indiceOpcionSeleccionada === indice ? 'seleccionada' : '';
    }
    
    if (puntos === 10) return 'es-correcta';
    if (this.indiceOpcionSeleccionada === indice && puntos !== 10) return 'es-incorrecta';
    return 'opacada';
  }

  esRespuestaCorrecta(): boolean {
    if (this.indiceOpcionSeleccionada === null) return false;
    return this.preguntaActual.opciones[this.indiceOpcionSeleccionada].puntos === 10;
  }

  get porcentajeFinal(): number {
    const maxPuntos = this.preguntas.length * 10;
    return Math.round((this.puntajeTotal / maxPuntos) * 100);
  }

  get esNivelAlto(): boolean {
    return this.porcentajeFinal >= 80;
  }

  get feedbackFinal(): string {
    if (this.esNivelAlto) {
      return '¡Felicitaciones! Comprendes a la perfección las normas de convivencia del archipiélago. Tus acciones garantizan que Galápagos siga siendo un paraíso natural.';
    } else {
      return 'Te recomendamos repasar nuestra sección de normativas. Recuerda que cada pequeña decisión impacta fuertemente en este frágil ecosistema. ¡Inténtalo de nuevo!';
    }
  }

  reiniciar() {
    this.estado = 'inicio';
  }
}