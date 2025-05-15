import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViagemNoTempoComponent } from './viagem-no-tempo/viagem-no-tempo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viagemTempo', component: ViagemNoTempoComponent },
];
