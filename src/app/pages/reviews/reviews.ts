import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface Review {
  id: number;
  nombre: string;
  categoria: string;
  sector: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="reviews-wrapper">
      <section class="header-section">
        <span class="eyebrow">{{ 'Comunidad GalapaGo!' | translate }}</span>
        <h2>{{ 'Opiniones de visitantes' | translate }}</h2>
        <p>{{ 'Comparte y consulta experiencias reales sobre comida, sectores, hotelería, transporte y actividades en Galápagos.' | translate }}</p>
      </section>

      <section class="summary-band">
        <div>
          <strong>{{ promedioGeneral }}</strong>
          <span>{{ 'Promedio general' | translate }}</span>
        </div>
        <div>
          <strong>{{ reviews.length }}</strong>
          <span>{{ 'Opiniones registradas' | translate }}</span>
        </div>
        <div>
          <strong>{{ categoriaMasComentada }}</strong>
          <span>{{ 'Tema más comentado' | translate }}</span>
        </div>
      </section>

      <div class="reviews-layout">
        <form class="review-form" (ngSubmit)="guardarReview()">
          <h3>{{ 'Escribe tu opinión' | translate }}</h3>

          <label>
            {{ 'Nombre' | translate }}
            <input type="text" name="nombre" [(ngModel)]="nuevoReview.nombre" maxlength="40" [placeholder]="'Ej. Pamela' | translate">
          </label>

          <div class="form-row">
            <label>
              {{ 'Categoría' | translate }}
              <select name="categoria" [(ngModel)]="nuevoReview.categoria" required>
                <option *ngFor="let categoria of categorias" [value]="categoria">{{ categoria | translate }}</option>
              </select>
            </label>

            <label>
              {{ 'Isla o sector' | translate }}
              <select name="sector" [(ngModel)]="nuevoReview.sector" required>
                <option *ngFor="let sector of sectores" [value]="sector">{{ sector | translate }}</option>
              </select>
            </label>
          </div>

          <div class="rating-field">
            <span>{{ 'Calificación' | translate }}</span>
            <div class="stars" role="radiogroup" aria-label="Calificación">
              <button
                type="button"
                *ngFor="let estrella of estrellas"
                [class.activa]="estrella <= nuevoReview.calificacion"
                (click)="nuevoReview.calificacion = estrella"
                [attr.aria-label]="estrella + ' estrellas'">
                ★
              </button>
            </div>
          </div>

          <label>
            {{ 'Comentario' | translate }}
            <textarea
              name="comentario"
              [(ngModel)]="nuevoReview.comentario"
              required
              minlength="8"
              maxlength="280"
              [placeholder]="'Cuenta qué recomiendas, qué mejorarías o qué deben saber otros viajeros.' | translate"></textarea>
          </label>

          <button class="btn-primary" type="submit" [disabled]="!formularioValido">
            {{ 'Publicar opinión' | translate }}
          </button>
        </form>

        <section class="reviews-panel">
          <div class="panel-header">
            <h3>{{ 'Reseñas' | translate }}</h3>
            <div class="filters">
              <select [(ngModel)]="filtroCategoria" name="filtroCategoria">
                <option value="Todas">{{ 'Todas' | translate }}</option>
                <option *ngFor="let categoria of categorias" [value]="categoria">{{ categoria | translate }}</option>
              </select>
              <select [(ngModel)]="filtroSector" name="filtroSector">
                <option value="Todos">{{ 'Todos los sectores' | translate }}</option>
                <option *ngFor="let sector of sectores" [value]="sector">{{ sector | translate }}</option>
              </select>
            </div>
          </div>

          <div class="empty-state" *ngIf="reviewsFiltrados.length === 0">
            {{ 'Aún no hay opiniones para estos filtros.' | translate }}
          </div>

          <article class="review-card" *ngFor="let review of reviewsFiltrados">
            <div class="review-top">
              <div>
                <h4>{{ review.nombre }}</h4>
                <p>{{ review.categoria }} · {{ review.sector }}</p>
              </div>
              <span class="rating">{{ pintarEstrellas(review.calificacion) }}</span>
            </div>
            <p class="comment">{{ review.comentario }}</p>
            <time>{{ review.fecha }}</time>
          </article>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .reviews-wrapper { max-width: 1180px; margin: 0 auto; padding: 2rem 1rem; font-family: 'Segoe UI', system-ui, sans-serif; color: #1e293b; }
    .header-section { text-align: center; margin-bottom: 1.5rem; }
    .eyebrow { display: inline-block; color: #0f766e; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; margin-bottom: 0.5rem; }
    .header-section h2 { font-size: 2.4rem; margin: 0 0 0.75rem 0; color: #102a43; }
    .header-section p { max-width: 760px; margin: 0 auto; color: #64748b; line-height: 1.6; font-size: 1.05rem; }

    .summary-band { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #cbd5e1; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin: 2rem 0; }
    .summary-band div { background: white; padding: 1.25rem; text-align: center; }
    .summary-band strong { display: block; font-size: 1.8rem; color: #0f766e; line-height: 1; margin-bottom: 0.35rem; }
    .summary-band span { color: #64748b; font-weight: 600; font-size: 0.9rem; }

    .reviews-layout { display: grid; grid-template-columns: 380px 1fr; gap: 1.5rem; align-items: start; }
    .review-form, .reviews-panel { background: white; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06); }
    .review-form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; position: sticky; top: 92px; }
    .review-form h3, .reviews-panel h3 { margin: 0; color: #0f172a; }
    label { display: flex; flex-direction: column; gap: 0.45rem; color: #334155; font-weight: 700; font-size: 0.92rem; }
    input, select, textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.8rem 0.9rem; font: inherit; background: #f8fafc; color: #1e293b; outline: none; box-sizing: border-box; }
    input:focus, select:focus, textarea:focus { border-color: #0d9488; background: white; box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.12); }
    textarea { min-height: 120px; resize: vertical; line-height: 1.5; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }

    .rating-field { display: flex; justify-content: space-between; align-items: center; gap: 1rem; color: #334155; font-weight: 700; }
    .stars { display: flex; gap: 0.2rem; }
    .stars button { width: 34px; height: 34px; border: none; background: transparent; color: #cbd5e1; font-size: 1.6rem; line-height: 1; cursor: pointer; transition: color 0.2s, transform 0.2s; }
    .stars button:hover, .stars button.activa { color: #f59e0b; transform: translateY(-1px); }
    .btn-primary { border: none; border-radius: 8px; background: #0d9488; color: white; padding: 0.9rem 1.2rem; font-weight: 800; cursor: pointer; transition: background 0.2s, transform 0.2s; }
    .btn-primary:hover:not(:disabled) { background: #0f766e; transform: translateY(-1px); }
    .btn-primary:disabled { background: #cbd5e1; cursor: not-allowed; }

    .reviews-panel { padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
    .panel-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
    .filters { display: flex; gap: 0.75rem; }
    .filters select { min-width: 170px; padding: 0.65rem 0.8rem; }
    .empty-state { border: 1px dashed #cbd5e1; border-radius: 8px; padding: 2rem; text-align: center; color: #64748b; background: #f8fafc; }

    .review-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; background: #ffffff; }
    .review-top { display: flex; justify-content: space-between; gap: 1rem; align-items: start; margin-bottom: 0.75rem; }
    .review-top h4 { margin: 0 0 0.25rem 0; color: #0f172a; }
    .review-top p { margin: 0; color: #64748b; font-size: 0.9rem; }
    .rating { color: #f59e0b; white-space: nowrap; letter-spacing: 0.05em; }
    .comment { margin: 0 0 0.8rem 0; color: #334155; line-height: 1.55; }
    time { color: #94a3b8; font-size: 0.82rem; font-weight: 600; }

    @media (max-width: 860px) {
      .reviews-layout { grid-template-columns: 1fr; }
      .review-form { position: static; }
      .summary-band { grid-template-columns: 1fr; }
    }

    @media (max-width: 560px) {
      .header-section h2 { font-size: 1.9rem; }
      .form-row, .filters { grid-template-columns: 1fr; display: grid; width: 100%; }
      .panel-header { align-items: stretch; }
    }
  `]
})
export class ReviewsComponent implements OnInit {
  private readonly storageKey = 'galapago_reviews';

  categorias = ['Comida', 'Hotelería', 'Sectores', 'Transporte', 'Actividades', 'Cultura local'];
  sectores = ['San Cristóbal', 'Santa Cruz', 'Isabela', 'Floreana', 'Puerto Ayora', 'Puerto Baquerizo Moreno'];
  estrellas = [1, 2, 3, 4, 5];
  reviews: Review[] = [];
  filtroCategoria = 'Todas';
  filtroSector = 'Todos';

  nuevoReview = {
    nombre: '',
    categoria: 'Comida',
    sector: 'San Cristóbal',
    calificacion: 5,
    comentario: ''
  };

  ngOnInit() {
    const guardadas = localStorage.getItem(this.storageKey);
    this.reviews = guardadas ? JSON.parse(guardadas) as Review[] : this.reviewsIniciales();
    this.persistirReviews();
  }

  get formularioValido(): boolean {
    return this.nuevoReview.comentario.trim().length >= 8 && this.nuevoReview.calificacion > 0;
  }

  get reviewsFiltrados(): Review[] {
    return this.reviews.filter(review => {
      const categoriaOk = this.filtroCategoria === 'Todas' || review.categoria === this.filtroCategoria;
      const sectorOk = this.filtroSector === 'Todos' || review.sector === this.filtroSector;
      return categoriaOk && sectorOk;
    });
  }

  get promedioGeneral(): string {
    if (this.reviews.length === 0) return '0.0';
    const total = this.reviews.reduce((suma, review) => suma + review.calificacion, 0);
    return (total / this.reviews.length).toFixed(1);
  }

  get categoriaMasComentada(): string {
    if (this.reviews.length === 0) return 'N/A';
    const conteo = this.reviews.reduce<Record<string, number>>((acc, review) => {
      acc[review.categoria] = (acc[review.categoria] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
  }

  guardarReview() {
    if (!this.formularioValido) return;

    const review: Review = {
      id: Date.now(),
      nombre: this.nuevoReview.nombre.trim() || 'Visitante',
      categoria: this.nuevoReview.categoria,
      sector: this.nuevoReview.sector,
      calificacion: this.nuevoReview.calificacion,
      comentario: this.nuevoReview.comentario.trim(),
      fecha: new Date().toLocaleDateString('es-EC', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    this.reviews = [review, ...this.reviews];
    this.persistirReviews();
    this.nuevoReview = {
      nombre: '',
      categoria: 'Comida',
      sector: 'San Cristóbal',
      calificacion: 5,
      comentario: ''
    };
  }

  pintarEstrellas(calificacion: number): string {
    return '★'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
  }

  private persistirReviews() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reviews));
  }

  private reviewsIniciales(): Review[] {
    return [
      {
        id: 1,
        nombre: 'María Fernanda',
        categoria: 'Comida',
        sector: 'San Cristóbal',
        calificacion: 5,
        comentario: 'Los mariscos en Puerto Baquerizo Moreno fueron frescos y la atención local muy amable. Recomiendo preguntar por platos del día.',
        fecha: '12 jun 2026'
      },
      {
        id: 2,
        nombre: 'Andrés',
        categoria: 'Actividades',
        sector: 'San Cristóbal',
        calificacion: 4,
        comentario: 'El tour a León Dormido vale muchísimo la pena. Conviene reservar con tiempo y llevar protección solar biodegradable.',
        fecha: '08 jun 2026'
      },
      {
        id: 3,
        nombre: 'Camila',
        categoria: 'Hotelería',
        sector: 'Santa Cruz',
        calificacion: 4,
        comentario: 'Me alojé cerca del malecón y fue práctico para caminar, comer y tomar tours temprano. Revisen si incluye agua filtrada.',
        fecha: '02 jun 2026'
      }
    ];
  }
}
