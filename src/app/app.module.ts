import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import * as fromApp from './store/app.reducer';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { WeatherFavoritesComponent } from './components/weather-favorites/weather-favorites.component';
import { WeatherSearchComponent } from './components/weather-search/weather-search.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { WeatherInfoCardComponent } from './components/weather-info-card/weather-info-card.component';
import { WeatherFavoriteInfoCardComponent } from './components/weather-favorite-info-card/weather-favorite-info-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherDashboardComponent,
    WeatherFavoritesComponent,
    WeatherSearchComponent,
    WeatherInfoComponent,
    WeatherInfoCardComponent,
    WeatherFavoriteInfoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
