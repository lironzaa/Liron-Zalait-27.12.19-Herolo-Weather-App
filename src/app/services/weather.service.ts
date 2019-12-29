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
    return this.http.get(`${this.apiAutocomplete}/?apikey=${this.weatherAPIKey}&q=${searchedQuery}`);
  }

  getFakeAutocompleteSearch() {
    return this.http.get('http://localhost:4200/assets/autocompleteT.json');
  }

  getDailyWeather(fetchedCityIndex) {
    return this.http.get(`${this.apiDaily}/${fetchedCityIndex}?apikey=${this.weatherAPIKey}`);
  }

  getFakeDailyWeather(fetchedCityIndex) {
    console.log(fetchedCityIndex);
    if (fetchedCityIndex === 215854) {
      return this.http.get('http://localhost:4200/assets/dailyTelAviv.json');
    }
    if (fetchedCityIndex === 226396) {
      return this.http.get('http://localhost:4200/assets/dailyTokyo.json');
    }
  }

  getFiveDaysWeather() {
    return this.http.get(`${this.apiFiveDays}/215854?apikey=${this.weatherAPIKey}`);
  }

  getFakeFiveDaysWeather(fetchedCityIndex) {
    console.log(fetchedCityIndex);
    if (fetchedCityIndex === 215854) {
      return this.http.get('http://localhost:4200/assets/fiveDaysTelAviv.json');
    }
    if (fetchedCityIndex === 226396) {
      return this.http.get('http://localhost:4200/assets/fiveDaysTokyo.json');
    }
  }
}