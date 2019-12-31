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
    return this.http.get(`${this.apiAutocomplete}?apikey=${this.weatherAPIKey}&q=${searchedQuery}`);
  }


  getDailyWeather(fetchedCityIndex) {
    return this.http.get(`${this.apiDaily}/${fetchedCityIndex}?apikey=${this.weatherAPIKey}`);
  }

  getForecastWeather() {
    return this.http.get(`${this.apiFiveDays}/215854?apikey=${this.weatherAPIKey}`);
  }

  getFakeAutocompleteSearch() {
    return this.http.get('http://localhost:4200/assets/autocompleteT.json');
  }

  getFakeDailyWeather(fetchedCityIndex) {
    if (fetchedCityIndex === 215854) {
      return this.http.get('http://localhost:4200/assets/dailyTelAviv.json');
    } else if (fetchedCityIndex === 226396) {
      return this.http.get('http://localhost:4200/assets/dailyTokyo.json');
    } else if (fetchedCityIndex === 106770) {
      return this.http.get('http://localhost:4200/assets/dailyTaiyuan.json');
    } else if (fetchedCityIndex === 106780) {
      return this.http.get('http://localhost:4200/assets/dailyTianjin.json');
    } else if (fetchedCityIndex === 58491) {
      return this.http.get('http://localhost:4200/assets/dailyTongren.json');
    } else if (fetchedCityIndex === 102324) {
      return this.http.get('http://localhost:4200/assets/dailyTangshan.json');
    }
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