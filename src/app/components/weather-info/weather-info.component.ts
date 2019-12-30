import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Weather } from './../../models/weather.model';
import { Store } from '@ngrx/store';
import * as WeatherActions from './../../store/weather.actions';
import * as fromApp from './../../store/app.reducer';
import { ToastrService } from 'ngx-toastr';
import { Favorites } from './../../models/favorites.model';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  fetchedCityIndex: number;
  fetchedCityName: string;
  dailyTemperature: number;
  weatherText: string;
  weatherIcon: number;
  isDailyLoading: boolean = false;
  weatherForecast: Weather[];
  isForecastLoading: boolean = false;
  favorites = [];
  isInFavorites: boolean = false;

  constructor(private weatherService: WeatherService,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('weather').subscribe(
      weatherStateData => {
        this.fetchedCityIndex = weatherStateData.fetchedCityIndex;
        this.fetchedCityName = weatherStateData.fetchedCityName;
        this.dailyTemperature = weatherStateData.dailyTemperature;
        this.weatherText = weatherStateData.weatherText;
        this.weatherIcon = weatherStateData.weatherIcon;
        this.isDailyLoading = weatherStateData.isDailyLoading;
        this.weatherForecast = weatherStateData.weatherForecast;
        this.isForecastLoading = weatherStateData.isForecastLoading;
        this.favorites = weatherStateData.favorites;
        this.isInFavorites = weatherStateData.isInFavorites;
      })

    console.log(this.fetchedCityIndex);
    console.log(this.isInFavorites);
    console.log(this.favorites);

    if (this.favorites.includes(this.fetchedCityIndex)) {
      console.log('includes');
      this.isInFavorites = true;
    } else {
      console.log('not includes');
      this.isInFavorites = false;
    }
    console.log(this.isInFavorites);

    this.store.dispatch(new WeatherActions.ShowDailySpinner());
    console.log(this.fetchedCityIndex);
    this.subscription = this.weatherService.getFakeDailyWeather(this.fetchedCityIndex)
      .pipe(map((dailyWeatherData: any) => {
        return dailyWeatherData.map(res => ({
          temperature: res.Temperature.Metric.Value,
          weatherText: res.WeatherText,
          weatherIcon: res.WeatherIcon
        }))
      }))
      .subscribe(dailyWeatherData => {
        this.store.dispatch(new WeatherActions.UpdateDailyWeather({
          fetchedCityIndex: this.fetchedCityIndex,
          fetchedCityName: this.fetchedCityName,
          dailyTemperature: dailyWeatherData[0].temperature,
          weatherText: dailyWeatherData[0].weatherText,
          weatherIcon: dailyWeatherData[0].weatherIcon
        }));
      }, error => {
        this.toastr.error('An error occurred, Please try again later', 'Error!');
        this.store.dispatch(new WeatherActions.RemoveDailySpinner());
      })

    this.store.dispatch(new WeatherActions.ShowForecastSpinner());
    this.subscription = this.weatherService.getFakeFiveDaysWeather(this.fetchedCityIndex)
      .pipe(map((forecastWeatherData: any) => {
        return forecastWeatherData.DailyForecasts.map(res => ({
          temperature: res.Temperature.Minimum.Value,
          date: res.Date,
          weatherIcon: res.Day.Icon < 10 ? (0 + (res.Day.Icon).toString()) : (res.Day.Icon).toString()
        }))
      }))
      .subscribe(forecastWeatherData => {
        this.store.dispatch(new WeatherActions.UpdateForecastWeather(forecastWeatherData));
      }, error => {
        this.toastr.error('An error occurred, Please try again later', 'Error!');
        this.store.dispatch(new WeatherActions.RemoveForecastSpinner());
      })
  }

  AddToFavorites(): void {
    this.store.dispatch(new WeatherActions.AddFavorite({ fetchedCityIndex: this.fetchedCityIndex }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}