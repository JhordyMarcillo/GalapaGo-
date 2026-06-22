import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService, Language } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Necesario para que reaccione al cambio de idioma sin cambiar la referencia de la variable
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private currentText = '';
  private currentLang: Language = 'es';
  private translatedText = '';
  private langSubscription: Subscription;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    // Escuchar cambios de idioma
    this.langSubscription = this.translationService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
      this.updateTranslation();
    });
  }

  transform(value: string): string {
    if (!value) return value;

    // Si el texto de entrada cambió, actualizamos
    if (this.currentText !== value) {
      this.currentText = value;
      this.updateTranslation();
    }

    return this.translatedText || value; // Muestra el original mientras carga
  }

  private updateTranslation() {
    if (!this.currentText) return;

    if (this.currentLang === 'es') {
      this.translatedText = this.currentText;
      this.cdr.markForCheck();
      return;
    }

    // Usar el servicio para traducir
    this.translationService.translate(this.currentText, this.currentLang).subscribe(res => {
      this.translatedText = res;
      this.cdr.markForCheck(); // Fuerza a Angular a repintar este componente con el nuevo texto
    });
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
