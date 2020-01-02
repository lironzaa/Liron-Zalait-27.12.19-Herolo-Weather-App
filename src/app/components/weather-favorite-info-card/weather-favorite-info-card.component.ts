import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as WeatherActions from './../../store/weather.actions';
import * as fromApp from './../../store/app.reducer';

@Component({
  selector: 'app-weather-favorite-info-card',
  templateUrl: './weather-favorite-info-card.component.html',
  styleUrls: ['./weather-favorite-info-card.component.css']
})
export class WeatherFavoriteInfoCardComponent {
  @Input() favoritesDailyWeather;
  selectedIndex: number;

  constructor(private router: Router,
    private store: Store<fromApp.AppState>, ) { }

  navigateToHome() {
    this.store.select('weather').subscribe(
      weatherStateData => {
        this.selectedIndex = weatherStateData.favoritesList.indexOf(this.favoritesDailyWeather.fetchedCityIndex);
      })
    this.store.dispatch(new WeatherActions.LoadWeatherFromFavorites({ fetchedCityIndex: this.selectedIndex }));
    this.router.navigate([`/`]);
  }
}