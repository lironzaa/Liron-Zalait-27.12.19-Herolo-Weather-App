import { Action } from '@ngrx/store';
import { Weather } from '../models/weather.model';

export const UPDATE_DAILY_WEATHER = 'UPDATE_DAILY_WEATHER';
export const SHOW_DAILY_SPINNER = 'SHOW_DAILY_SPINNER';
export const UPDATE_FORECAST_WEATHER = 'UPDATE_FORECAST_WEATHER';
export const SHOW_FORECAST_SPINNER = 'SHOW_FORECAST_SPINNER';
export const REMOVE_DAILY_SPINNER = 'REMOVE_DAILY_SPINNER';
export const REMOVE_FORECAST_SPINNER = 'REMOVE_FORECAST_SPINNER';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export class UpdateDailyWeather implements Action {
  readonly type = UPDATE_DAILY_WEATHER;
  constructor(public payload: {
    fetchedCityIndex: number,
    fetchedCityName: string,
    dailyTemperature: number,
    weatherText: string,
    weatherIcon: number
  }) { }
}

export class ShowDailySpinner implements Action {
  readonly type = SHOW_DAILY_SPINNER;
}

export class UpdateForecastWeather implements Action {
  readonly type = UPDATE_FORECAST_WEATHER;
  constructor(public payload: { weatherForecast: Weather[] }) { }
}

export class ShowForecastSpinner implements Action {
  readonly type = SHOW_FORECAST_SPINNER;
}

export class RemoveDailySpinner implements Action {
  readonly type = REMOVE_DAILY_SPINNER;
}

export class RemoveForecastSpinner implements Action {
  readonly type = REMOVE_FORECAST_SPINNER;
}

export class AddFavorite implements Action {
  readonly type = ADD_FAVORITE;
  constructor(public payload: { fetchedCityIndex: number }) {
    console.log(payload);
  }
}

export class RemoveFavorite implements Action {
  readonly type = REMOVE_FAVORITE;
}

export type WeatherActions =
  UpdateDailyWeather |
  ShowDailySpinner |
  UpdateForecastWeather |
  ShowForecastSpinner |
  RemoveDailySpinner |
  RemoveForecastSpinner |
  AddFavorite |
  RemoveFavorite;