import { Action } from '@ngrx/store';

export const UPDATE_DAILY_WEATHER = 'UPDATE_DAILY_WEATHER';
export const SHOW_SPINNER = 'SHOW_SPINNER';

export class UpdateDailyWeather implements Action {
  readonly type = UPDATE_DAILY_WEATHER;
  constructor(public payload: {
    fetchedCityIndex: number,
    dailyTemperature: number,
    weatherText: string
  }) {
    console.log(payload);
  }
}

export class ShowSpinner implements Action {
  readonly type = SHOW_SPINNER;
}

export type WeatherActions = UpdateDailyWeather | ShowSpinner;