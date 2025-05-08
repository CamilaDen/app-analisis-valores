import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StatisticsComponent } from './modules/statistics/components/statistics/statistics.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'statistics', component: StatisticsComponent}
];
