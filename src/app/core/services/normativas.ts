import { Injectable } from '@angular/core';

export interface Normativa {
  situacion: string;
  queHacer: string;
  queEvitar: string;
}

@Injectable({
  providedIn: 'root'
})
export class NormativasService {
  // Datos extraídos exactamente del diseño de tu prototipo
  private normativas: Normativa[] = [
    {
      situacion: 'Visitar comunidad local',
      queHacer: 'Saludar cordialmente, pedir permiso antes de interactuar.',
      queEvitar: 'Tomar fotos sin permiso, interrumpir actividades cotidianas.'
    },
    {
      situacion: 'En playas protegidas',
      queHacer: 'Seguir senderos marcados, usar protector solar biodegradable.',
      queEvitar: 'Dejar basura, fumar, tocar formaciones rocosas.'
    }
  ];

  getNormativas(): Normativa[] {
    return this.normativas;
  }
}