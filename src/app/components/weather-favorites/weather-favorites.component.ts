import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-favorites',
  templateUrl: './weather-favorites.component.html',
  styleUrls: ['./weather-favorites.component.css']
})
export class WeatherFavoritesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  favoritesWeather: [] = [];
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('weather').subscribe(
      weatherStateData => {
        this.favoritesWeather = weatherStateData.favoritesWeather;
        console.log(this.favoritesWeather);
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}