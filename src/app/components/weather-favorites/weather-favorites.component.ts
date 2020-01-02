import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import { Subscription } from 'rxjs';
import { DailyWeather } from 'src/app/models/weather.model';
import { fade } from './../../animations/animations';

@Component({
  selector: 'app-weather-favorites',
  templateUrl: './weather-favorites.component.html',
  styleUrls: ['./weather-favorites.component.css'],
  animations: [
    fade
  ]
})
export class WeatherFavoritesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  favoritesDailyWeather: DailyWeather[] = [];
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('weather').subscribe(
      weatherStateData => {
        this.favoritesDailyWeather = weatherStateData.favoritesDailyWeather;
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}