import { Routes } from '@angular/router';
import { SimuladorComponent } from './pages/simulador/simulador';
import { NormativasComponent } from './pages/normativas/normativas';
import { GaleriaComponent } from './pages/galeria/galeria';
import { MapaComponent } from './pages/mapa/mapa';
import { RutaComponent } from './pages/ruta/ruta';
import { ChatbotComponent } from './pages/chatbot/chatbot';
import { FrasesComponent } from './pages/frases/frases';
import { InicioComponent } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'simulador', component: SimuladorComponent },
  { path: 'respeto', component: NormativasComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'ruta', component: RutaComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'frases', component: FrasesComponent },
  { path: '', redirectTo: '/mapa', pathMatch: 'full' },
  { path: '**', redirectTo: '/mapa' }
];