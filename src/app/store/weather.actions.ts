import { Action } from '@ngrx/store';
import { Weather } from '../models/weather.model';

export const UPDATE_DAILY_WEATHER = 'UPDATE_DAILY_WEATHER';
export const UPDATE_FETCHED_CITY_INDEX = 'UPDATE_FETCHED_CITY_INDEX';

export class UpdateDailyWeather implements Action {
  readonly type = UPDATE_DAILY_WEATHER;
  constructor(public payload: Weather) {
    console.log(payload);
  }
}

export class UpdateFetchedCityIndex implements Action {
  readonly type = UPDATE_FETCHED_CITY_INDEX;
  constructor(public payload: number) {

  }
}

export type WeatherActions = UpdateDailyWeather | UpdateFetchedCityIndex;