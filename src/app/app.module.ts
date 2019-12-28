import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from './store/weather.reducer';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { WeatherFavoritesComponent } from './components/weather-favorites/weather-favorites.component';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { WeatherInfoCardComponent } from './components/weather-info-card/weather-info-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherDashboardComponent,
    WeatherFavoritesComponent,
    WeatherSearchComponent,
    WeatherInfoComponent,
    WeatherInfoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    StoreModule.forRoot({ weather: weatherReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
