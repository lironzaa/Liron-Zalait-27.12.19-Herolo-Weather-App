import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { map } from 'rxjs/operators';
import { Autocomplete } from './../../models/weather.model';
import { Store } from '@ngrx/store';
import * as fromWeather from './../../store/weather.reducer';
import * as WeatherActions from './../../store/weather.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService,
    private store: Store<fromWeather.AppState>,
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
      .pipe(map((results: any) => {
        console.log(results);
        return results.map(res => ({
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
      })
    console.log(selectedQuery);
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
    console.log(searchedQuery);
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
         }) */
      this.subscription = this.weatherService.getFakeAutocompleteSearch()
        .pipe(map((results: any) => {
          return results.map(res => ({
            id: +res.Key,
            name: res.LocalizedName
          }))
        }))
        .subscribe(autocompleteResults => {
          console.log(autocompleteResults);
          this.autocompleteData = autocompleteResults;
        })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}