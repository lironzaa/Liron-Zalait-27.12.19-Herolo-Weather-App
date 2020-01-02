import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as WeatherActions from './../../store/weather.actions';
import * as fromApp from './../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-favorite-info-card',
  templateUrl: './weather-favorite-info-card.component.html',
  styleUrls: ['./weather-favorite-info-card.component.css']
})
export class WeatherFavoriteInfoCardComponent implements OnDestroy {
  @Input() favoritesDailyWeather;
  selectedIndex: number;
  subscription: Subscription;

  constructor(private router: Router,
    private store: Store<fromApp.AppState>) { }

  navigateToHome(): void {
    this.subscription = this.store.select('weather').subscribe(
      weatherStateData => {
        this.selectedIndex = weatherStateData.favoritesList.indexOf(this.favoritesDailyWeather.fetchedCityIndex);
      })
    this.store.dispatch(new WeatherActions.LoadWeatherFromFavorites({ fetchedCityIndex: this.selectedIndex }));
    this.router.navigate([`/`]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}