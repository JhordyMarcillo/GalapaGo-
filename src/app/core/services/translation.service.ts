import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<Language>('es');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  
  // Cache de traducciones para no gastar llamadas a la API innecesariamente
  // Estructura: cache['en']['Hola Mundo'] = 'Hello World'
  private cache: Record<string, Record<string, string>> = {
    es: {},
    en: {}
  };

  private readonly API_URL = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('galapago_lang') as Language;
    if (savedLang === 'es' || savedLang === 'en') {
      this.currentLanguageSubject.next(savedLang);
    }
  }

  get currentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(lang: Language) {
    if (this.currentLanguage !== lang) {
      localStorage.setItem('galapago_lang', lang);
      this.currentLanguageSubject.next(lang);
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLanguage === 'es' ? 'en' : 'es');
  }

  translate(text: string, targetLang: Language): Observable<string> {
    if (!text || !text.trim()) return of(text);
    if (targetLang === 'es') return of(text); // Nuestra app está en español nativo

    // 1. Revisar caché
    if (this.cache[targetLang] && this.cache[targetLang][text]) {
      return of(this.cache[targetLang][text]);
    }

    // 2. Llamada a la API de Google Translate
    const url = `${this.API_URL}?key=${environment.googleTranslateApiKey}`;
    const body = {
      q: text,
      source: 'es',
      target: targetLang,
      format: 'html' // Mantiene el formato HTML intacto si lo hay
    };

    return this.http.post<any>(url, body).pipe(
      map(res => {
        const translatedText = res.data.translations[0].translatedText;
        
        // Decodificar entidades HTML si la API las devuelve (ej: &#39; -> ')
        const textarea = document.createElement('textarea');
        textarea.innerHTML = translatedText;
        const result = textarea.value;

        // Guardar en caché
        if (!this.cache[targetLang]) {
          this.cache[targetLang] = {};
        }
        this.cache[targetLang][text] = result;

        return result;
      }),
      catchError(error => {
        console.error('Error traduciendo con Google Translate API:', error);
        return of(text); // Fallback: devuelve el texto original en español si falla
      })
    );
  }
}
