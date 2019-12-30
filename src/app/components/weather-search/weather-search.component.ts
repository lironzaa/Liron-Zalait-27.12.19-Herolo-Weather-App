import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as WeatherActions from './../../store/weather.actions';
import * as fromApp from './../../store/app.reducer';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Autocomplete } from './../../models/autocomplete.model';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  keyword: string = 'name';
  autocompleteData: Autocomplete[] = [];
  public placeholder: string = 'Search for a city';
  isSearchValid: boolean = true;
  subscription: Subscription;

  onSelectEvent(selectedQuery): void {
    this.store.dispatch(new WeatherActions.ShowDailySpinner());
    this.subscription = this.weatherService.getFakeDailyWeather(226396)
      .pipe(map((dailyWeatherData: any) => {
        console.log(dailyWeatherData);
        return dailyWeatherData.map(res => ({
          temperature: res.Temperature.Metric.Value,
          weatherText: res.WeatherText,
          weatherIcon: res.WeatherIcon
        }))
      }))
      .subscribe(dailyWeatherData => {
        this.store.dispatch(new WeatherActions.UpdateDailyWeather({
          fetchedCityIndex: selectedQuery.id,
          fetchedCityName: selectedQuery.name,
          dailyTemperature: dailyWeatherData[0].temperature,
          weatherText: dailyWeatherData[0].weatherText,
          weatherIcon: dailyWeatherData[0].weatherIcon
        }));
      }, error => {
        this.toastr.error('An error occurred, Please try again later', 'Error!');
        this.store.dispatch(new WeatherActions.RemoveDailySpinner());
      })
    /*     this.subscription = this.weatherService.getDailyWeather(selectedQuery.id)
          .pipe(map((dailyWeatherData: any) => {
            console.log(dailyWeatherData);
            return dailyWeatherData.map(res => ({
              temperature: res.Temperature.Metric.Value,
              weatherText: res.WeatherText,
              weatherIcon: res.WeatherIcon
            }))
          }))
          .subscribe(dailyWeatherData => {
            this.store.dispatch(new WeatherActions.UpdateDailyWeather({
              fetchedCityIndex: selectedQuery.id,
              fetchedCityName: selectedQuery.name,
              dailyTemperature: dailyWeatherData[0].temperature,
              weatherText: dailyWeatherData[0].weatherText,
              weatherIcon: dailyWeatherData[0].weatherIcon
            }));
          }) */
    this.store.dispatch(new WeatherActions.ShowForecastSpinner());
    this.subscription = this.weatherService.getFakeFiveDaysWeather(226396)
      .pipe(map((forecastWeatherData: any) => {
        return forecastWeatherData.DailyForecasts.map(res => ({
          temperature: res.Temperature.Minimum.Value,
          date: res.Date,
          weatherIcon: res.Day.Icon < 10 ? (0 + (res.Day.Icon).toString()) : (res.Day.Icon).toString()
        }))
      }))
      .subscribe(forecastWeatherData => {
        console.log(forecastWeatherData);
        this.store.dispatch(new WeatherActions.UpdateForecastWeather(forecastWeatherData));
      }, error => {
        this.toastr.error(error.message, 'An error occurred, Please try again later');
      })
    /* this.subscription = this.weatherService.getForecastWeather()
      .subscribe(forecastWeatherData => {
        console.log(forecastWeatherData);
      }, error => {
        this.toastr.error('An error occurred, Please try again later', 'Error!');
        this.store.dispatch(new WeatherActions.RemoveForecastSpinner());
      }) */
  }

  allowEnglishLettersOnKeyUp(event: any): void {
    const pattern = /^[A-Za-z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      this.isSearchValid = false;
      event.preventDefault();
    } else {
      this.isSearchValid = true;
    }
  }

  onChangeSearch(searchedQuery: string): void {
    if (searchedQuery !== '') {
      /*  this.weatherService.getAutocompleteSearch(searchedQuery)
         .pipe(map((autocompleteResults: any) => {
           console.log(autocompleteResults);
           return autocompleteResults.map(res => ({
             id: +res.Key,
             name: res.LocalizedName
           }))
         }))
         .subscribe(autocompleteResults => {
           console.log(autocompleteResults);
           this.autocompleteData = autocompleteResults;
         }, error => {
        this.toastr.error(error.message, 'An error occurred, Please try again later');
      }) */
      this.subscription = this.weatherService.getFakeAutocompleteSearch()
        .pipe(map((results: any) => {
          return results.map(res => ({
            id: +res.Key,
            name: res.LocalizedName
          }))
        }))
        .subscribe(autocompleteResults => {
          this.autocompleteData = autocompleteResults;
        }, error => {
          this.toastr.error('An error occurred, Please try again later', 'Error!');
        })
    }
  }

  onAutocompleteCleared() {
    this.autocompleteData = [];
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}