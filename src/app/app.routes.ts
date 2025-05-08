import { Routes } from '@angular/router';
import { StadisticsComponent } from './modules/stadistics/components/stadistics/stadistics.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'stadistics', component: StadisticsComponent}
];
