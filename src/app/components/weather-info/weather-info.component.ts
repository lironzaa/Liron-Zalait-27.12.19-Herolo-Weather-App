import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Weather } from './../../models/weather.model';
import { Store } from '@ngrx/store';
import * as WeatherActions from './../../store/weather.actions';
import * as fromWeather from './../../store/weather.reducer';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  forecastWeatherData;
  dailyWeatherData: Weather[];
  weatherState$: Observable<{ fetchedCityIndex: number }>;
  sub: Subscription;
  fetchedCityIndex: number;
  /* fetchedCityIndex: number = 215854; */

  constructor(private weatherService: WeatherService,
    private store: Store<{ weather: { fetchedCityIndex: number } }>) { }

  ngOnInit() {
    /* this.weatherState$ = this.store.select('weather'); */
    this.store.select('weather').subscribe(
      data => {
        this.fetchedCityIndex = data.fetchedCityIndex;
        console.log(this.fetchedCityIndex);
      })
    /*     this.weatherService.getFiveDaysWeather()
          .subscribe(weatherData => {
            console.log(weatherData);
          }) */
    this.weatherService.getFakeFiveDaysWeather()
      .subscribe(forecastWeatherData => {
        this.forecastWeatherData = forecastWeatherData;
      })
    this.weatherService.getFakeDailyWeather()
      .pipe(map((results: any) => {
        console.log(results);
        return results.map(res => ({
          temperature: res.Temperature.Metric.Value,
          weatherText: res.WeatherText
        }))
      }))
      .subscribe(dailyWeatherData => {
        this.dailyWeatherData = dailyWeatherData;
        console.log(this.dailyWeatherData);
      })
  }

  test() {
    this.store.dispatch(new WeatherActions.UpdateFetchedCityIndex(226396));
    this.weatherService.getFakeDailyWeatherTokyo()
      .pipe(map((results: any) => {
        console.log(results);
        return results.map(res => ({
          temperature: res.Temperature.Metric.Value,
          weatherText: res.WeatherText
        }))
      }))
      .subscribe(dailyWeatherData => {
        this.store.dispatch(new WeatherActions.UpdateDailyWeather(dailyWeatherData));
        this.dailyWeatherData = dailyWeatherData;
        console.log(this.dailyWeatherData);
      })
  }
}