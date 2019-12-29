import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class WeatherInfoComponent implements OnInit, OnDestroy {
  weatherState$: Observable<fromWeather.State>;
  subscription: Subscription;
  fetchedCityIndex: number;
  dailyTemperature: number;
  weatherText: string;
  isDailyLoading: boolean = false;
  weatherForecast: Weather[];
  isForecastLoading: boolean = false;

  constructor(private weatherService: WeatherService,
    private store: Store<fromWeather.AppState>) { }

  ngOnInit(): void {
    /*     this.weatherService.getFiveDaysWeather()
          .subscribe(weatherData => {
            console.log(weatherData);
          }) */
    this.subscription = this.store.select('weather').subscribe(
      weatherStateData => {
        this.fetchedCityIndex = weatherStateData.fetchedCityIndex;
        this.dailyTemperature = weatherStateData.dailyTemperature;
        this.weatherText = weatherStateData.weatherText;
        this.isDailyLoading = weatherStateData.isDailyLoading;
        this.weatherForecast = weatherStateData.weatherForecast;
        this.isForecastLoading = weatherStateData.isForecastLoading;
      })

    this.store.dispatch(new WeatherActions.ShowDailySpinner());
    this.weatherService.getFakeDailyWeather(this.fetchedCityIndex)
      .pipe(map((results: any) => {
        return results.map(res => ({
          temperature: res.Temperature.Metric.Value,
          weatherText: res.WeatherText
        }))
      }))
      .subscribe(dailyWeatherData => {
        this.store.dispatch(new WeatherActions.UpdateDailyWeather({ fetchedCityIndex: this.fetchedCityIndex, dailyTemperature: dailyWeatherData[0].temperature, weatherText: dailyWeatherData[0].weatherText }));
      })

    this.store.dispatch(new WeatherActions.ShowForecastSpinner());
    this.weatherService.getFakeFiveDaysWeather()
      .pipe(map((results: any) => {
        return results.DailyForecasts.map(res => ({
          temperature: res.Temperature.Minimum.Value,
          date: res.Date
        }))
      }))
      .subscribe(forecastWeatherData => {
        console.log(forecastWeatherData);
        this.store.dispatch(new WeatherActions.UpdateForecastWeather(forecastWeatherData));
      })
  }

  test(): void {
    this.store.dispatch(new WeatherActions.ShowDailySpinner());
    this.weatherService.getFakeDailyWeather(226396)
      .pipe(map((results: any) => {
        return results.map(res => ({
          temperature: res.Temperature.Metric.Value,
          weatherText: res.WeatherText
        }))
      }))
      .subscribe(dailyWeatherData => {
        this.store.dispatch(new WeatherActions.UpdateDailyWeather({ fetchedCityIndex: 226396, dailyTemperature: dailyWeatherData[0].temperature, weatherText: dailyWeatherData[0].weatherText }));
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}