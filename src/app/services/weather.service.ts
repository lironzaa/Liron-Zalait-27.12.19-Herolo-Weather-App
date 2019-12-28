import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherAPIKey = environment.weatherAPIKey;
  private apiDaily = environment.apiDaily;
  private apiAutocomplete = environment.apiAutocomplete;
  private apiFiveDays = environment.apiFiveDays;

  constructor(private http: HttpClient) { }

  getAutocompleteSearch(searchedQuery) {
    return this.http.get(`${this.apiAutocomplete}/?apikey=${this.weatherAPIKey}&q=${searchedQuery}`)
  }

  getFakeAutocompleteSearch() {
    return this.http.get('http://localhost:4200/assets/autocompleteT.json')
  }

  getDailyWeather(fetchedCity) {
    return this.http.get(`${this.apiDaily}/${fetchedCity}?apikey=${this.weatherAPIKey}`)
  }

  getFakeDailyWeather() {
    return this.http.get('http://localhost:4200/assets/dailyTelAviv.json')
  }

  getFakeDailyWeatherTokyo() {
    return this.http.get('http://localhost:4200/assets/dailyTokyo.json')
  }

  getFiveDaysWeather() {
    return this.http.get(`${this.apiFiveDays}/215854?apikey=${this.weatherAPIKey}`)
  }

  getFakeFiveDaysWeather() {
    return this.http.get('http://localhost:4200/assets/fiveDays.json')
  }

}