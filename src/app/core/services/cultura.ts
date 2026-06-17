import { Injectable } from '@angular/core';

export interface Frase {
  id: number;
  expresion: string;
  significado: string;
  contexto: string;
}

@Injectable({
  providedIn: 'root'
})
export class CulturaService {
  private frases: Frase[] = [
    { id: 1, expresion: '¡Qué bacán!', significado: '¡Qué genial!', contexto: 'Se usa para expresar asombro positivo.' },
    { id: 2, expresion: 'Ñaño/a', significado: 'Hermano/a', contexto: 'Término de cariño para amigos cercanos.' }
  ];

  getFrases(): Frase[] {
    return this.frases;
  }
}