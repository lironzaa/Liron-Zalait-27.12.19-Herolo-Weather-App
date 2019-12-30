import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherFavoritesComponent } from './components/weather-favorites/weather-favorites.component';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WeatherDashboardComponent
  },
  {
    path: 'favorites',
    component: WeatherFavoritesComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }