import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RecursoGaleria {
  titulo: string;
  descripcion: string;
  etiqueta: string;
  imagenes: string[]; // Ahora es un arreglo para soportar el slider
}

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="galeria-wrapper">
      
      <div class="header-text text-center">
        <h2>Galería Visual de Galápagos</h2>
        <p>Sumérgete en la belleza natural y cultural del archipiélago.</p>
      </div>

      <div class="grid-galeria">
        <div class="tarjeta-premium" *ngFor="let item of recursos" (click)="abrirModal(item)">
          <div class="imagen-contenedor">
            <img [src]="item.imagenes[0]" [alt]="item.titulo" loading="lazy">
            <span class="badge-etiqueta">{{ item.etiqueta }}</span>
            <div class="capa-hover">
              <span class="icono-ampliar">⤢ Ver Galería</span>
            </div>
          </div>
          <div class="contenido-tarjeta">
            <h3>{{ item.titulo }}</h3>
            <p>{{ item.descripcion }}</p>
          </div>
        </div>
      </div>

      <div class="modal-overlay" *ngIf="itemActivo" (click)="cerrarModal()">
        <div class="modal-content slide-up" (click)="$event.stopPropagation()">
          
          <button class="btn-cerrar" (click)="cerrarModal()">✕</button>

          <div class="slider-contenedor">
            <img [src]="itemActivo.imagenes[imagenActivaIndex]" class="imagen-slider" [alt]="itemActivo.titulo">
            
            <button class="btn-nav prev" *ngIf="itemActivo.imagenes.length > 1" (click)="anteriorImagen($event)">❮</button>
            <button class="btn-nav next" *ngIf="itemActivo.imagenes.length > 1" (click)="siguienteImagen($event)">❯</button>

            <div class="indicadores" *ngIf="itemActivo.imagenes.length > 1">
              <span class="punto" 
                    *ngFor="let img of itemActivo.imagenes; let i = index" 
                    [ngClass]="{'activo': i === imagenActivaIndex}"
                    (click)="seleccionarImagen(i, $event)">
              </span>
            </div>
          </div>

          <div class="modal-info">
            <span class="badge-etiqueta-modal">{{ itemActivo.etiqueta }}</span>
            <h2>{{ itemActivo.titulo }}</h2>
            <p>{{ itemActivo.descripcion }}</p>
          </div>

        </div>
      </div>

    </div>
  `,
  styles: [`
    .galeria-wrapper { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    .text-center { text-align: center; margin-bottom: 3rem; }
    .header-text h2 { color: #1e293b; font-size: 2.5rem; margin-bottom: 0.5rem; }
    .header-text p { color: #64748b; font-size: 1.1rem; }

    /* Cuadrícula (Grid) */
    .grid-galeria { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
    
    /* Tarjetas de Galería */
    .tarjeta-premium { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); cursor: pointer; transition: all 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; }
    .tarjeta-premium:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0,0,0,0.1); }
    
    .imagen-contenedor { position: relative; height: 220px; overflow: hidden; }
    .imagen-contenedor img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .tarjeta-premium:hover .imagen-contenedor img { transform: scale(1.1); }
    
    .badge-etiqueta { position: absolute; top: 1rem; left: 1rem; background: rgba(255,255,255,0.9); color: #0f766e; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; backdrop-filter: blur(4px); box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    
    /* Capa oscura que aparece en Hover */
    .capa-hover { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 118, 110, 0.4); display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease; }
    .tarjeta-premium:hover .capa-hover { opacity: 1; }
    .icono-ampliar { color: white; font-weight: bold; font-size: 1.1rem; border: 2px solid white; padding: 0.6rem 1.2rem; border-radius: 30px; }

    .contenido-tarjeta { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
    .contenido-tarjeta h3 { margin: 0 0 0.5rem 0; color: #1e293b; font-size: 1.2rem; }
    .contenido-tarjeta p { margin: 0; color: #64748b; font-size: 0.95rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    /* Modal / Lightbox */
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(5px); }
    .modal-content { background: white; width: 90%; max-width: 800px; border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.25); display: flex; flex-direction: column; max-height: 90vh; }
    
    .btn-cerrar { position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; z-index: 10; display: flex; justify-content: center; align-items: center; transition: background 0.2s; }
    .btn-cerrar:hover { background: rgba(0,0,0,0.8); }

    /* Estilos del Slider dentro del Modal */
    .slider-contenedor { position: relative; height: 400px; background: #0f172a; display: flex; align-items: center; justify-content: center; }
    .imagen-slider { width: 100%; height: 100%; object-fit: cover; animation: fadeIn 0.4s ease-in-out; }
    
    .btn-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.7); color: #1e293b; border: none; width: 44px; height: 44px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .btn-nav:hover { background: white; transform: translateY(-50%) scale(1.1); }
    .prev { left: 1rem; } .next { right: 1rem; }

    .indicadores { position: absolute; bottom: 1rem; display: flex; gap: 0.5rem; }
    .punto { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .punto.activo { background: white; transform: scale(1.3); }

    .modal-info { padding: 2rem; background: white; overflow-y: auto; }
    .badge-etiqueta-modal { background: #e0f2fe; color: #0369a1; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold; margin-bottom: 1rem; display: inline-block; }
    .modal-info h2 { margin: 0 0 1rem 0; color: #1e293b; font-size: 1.8rem; }
    .modal-info p { color: #475569; line-height: 1.6; font-size: 1.05rem; margin-bottom: 1rem; }
    .contador-fotos { color: #94a3b8 !important; font-size: 0.9rem !important; font-weight: 500; }

    /* Animaciones */
    .slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes fadeIn { from { opacity: 0.5; } to { opacity: 1; } }

    @media (max-width: 600px) {
      .slider-contenedor { height: 250px; }
      .modal-info h2 { font-size: 1.4rem; }
      .btn-nav { width: 36px; height: 36px; font-size: 1.2rem; }
    }
  `]
})
export class GaleriaComponent {
  // Enlaces de imágenes de alta calidad (Unsplash) para demostrar el slider
  recursos: RecursoGaleria[] = [
    {
      titulo: 'Tortugas Gigantes',
      etiqueta: 'Vida Silvestre',
      descripcion: 'Símbolo indiscutible de las islas. Estas majestuosas criaturas pueden vivir más de 100 años y pesan hasta 400 kg. Se las puede observar caminando lentamente en las zonas altas de Santa Cruz e Isabela.',
      imagenes: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp3rqkz2pBP8XOzD_7KiPRzMQ8BFjm7xslXA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBnRYdTEZYQ5NMDCTKPxMZFDXydxOogtvkKA&s'
      ]
    },
    {
      titulo: 'Iguanas Marinas',
      etiqueta: 'Especies Únicas',
      descripcion: 'La única especie de iguana en el mundo que ha aprendido a nadar y bucear para alimentarse de algas marinas. Su color oscuro les ayuda a absorber el calor del sol después de bucear en aguas frías.',
      imagenes: [
        'https://upload.wikimedia.org/wikipedia/commons/f/ff/Marine-Iguana-Espanola.jpg',
        'https://cdn0.ecologiaverde.com/es/posts/6/0/1/iguana_marina_caracteristicas_alimentacion_y_donde_vive_4106_1200.jpg'
      ]
    },
    {
      titulo: 'Piqueros de Patas Azules',
      etiqueta: 'Aves',
      descripcion: 'Famosos por sus vibrantes patas azules, las cuales juegan un papel crucial en su danza de apareamiento. Son excelentes pescadores y suelen anidar directamente en el suelo.',
      imagenes: [
        'https://multimedia20stg.blob.core.windows.net/especiesreduced/20090616_07780.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGibpOlpDhxlcosfiV6dWf_CeqNKw4EV51g&s'
      ]
    },
    {
      titulo: 'Lobos Marinos',
      etiqueta: 'Vida Silvestre',
      descripcion: 'Animales extremadamente sociales, juguetones y curiosos. Es muy común encontrarlos descansando en las playas, malecones y muelles compartiendo el espacio con los locales.',
      imagenes: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqzUD4KIQFTkol8ZrEhyzNNCeAJ13sfvw-qg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspgFdZMh1yqKaF5lUKgJT4R_WSMYci9VZ6w&s'
      ]
    },
    {
      titulo: 'Paisajes Volcánicos',
      etiqueta: 'Naturaleza',
      descripcion: 'El archipiélago es de origen volcánico. Islas como Bartolomé ofrecen paisajes lunares espectaculares, con conos de lava negra, roja y verde que contrastan con el océano azul.',
      imagenes: [
        'https://happygringo.com/wp-content/uploads/2021/01/volcan-chico.jpg',
        'https://i0.wp.com/ecuadorgalapagosinfo.com/wp-content/uploads/2020/01/leon-dormido-2.jpg?resize=800%2C600&ssl=1'
      ]
    },
    {
      titulo: 'Piqueros de Nazca',
      etiqueta: 'Vida Silvestre',
      descripcion: 'Animales extremadamente sociales, juguetones y curiosos. Es muy común encontrarlos descansando en las playas, malecones y muelles compartiendo el espacio con los locales.',
      imagenes: [
        'https://datazone.darwinfoundation.org/images/checklist/NazcaBoobyHembraMachoDAnchundiaIslaDaphneMajor.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I8Tq91oWQAF3YULd0AAAOMA0XZl6TKgjWw&s'
      ]
    },
    {
      titulo: 'Albatros Ondeante',
      etiqueta: 'Vida Silvestre',
      descripcion: 'Animales extremadamente sociales, juguetones y curiosos. Es muy común encontrarlos descansando en las playas, malecones y muelles compartiendo el espacio con los locales.',
      imagenes: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFeqAT9qovtStBclV7TnRg-LFmbieuwGufg&s',
        'https://thumbs.dreamstime.com/b/albatross-phoebastria-irrorata-ondeando-en-las-gal%C3%A1pagos-un-ondeado-volando-208543476.jpg'
      ]
    },
  ];

  // Estado del Modal y el Slider
  itemActivo: RecursoGaleria | null = null;
  imagenActivaIndex: number = 0;

  abrirModal(item: RecursoGaleria) {
    this.itemActivo = item;
    this.imagenActivaIndex = 0; // Siempre inicia en la primera imagen del animal seleccionado
    document.body.style.overflow = 'hidden'; // Evita que la página del fondo haga scroll
  }

  cerrarModal() {
    this.itemActivo = null;
    document.body.style.overflow = 'auto'; // Restaura el scroll
  }

  // Controles del Slider
  siguienteImagen(event: Event) {
    event.stopPropagation(); // Evita que se cierre el modal al hacer click en el botón
    if (this.itemActivo) {
      this.imagenActivaIndex = (this.imagenActivaIndex + 1) % this.itemActivo.imagenes.length;
    }
  }

  anteriorImagen(event: Event) {
    event.stopPropagation();
    if (this.itemActivo) {
      this.imagenActivaIndex = (this.imagenActivaIndex - 1 + this.itemActivo.imagenes.length) % this.itemActivo.imagenes.length;
    }
  }

  seleccionarImagen(index: number, event: Event) {
    event.stopPropagation();
    this.imagenActivaIndex = index;
  }
}