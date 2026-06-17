import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// 1. Cambiamos 'App' por 'AppComponent' y actualizamos la ruta del archivo
import { AppComponent } from './app/app';

// 2. Pasamos AppComponent a la función de inicialización
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));