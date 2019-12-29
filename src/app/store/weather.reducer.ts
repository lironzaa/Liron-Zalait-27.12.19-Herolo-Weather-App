import * as WeatherActions from './weather.actions';
import { Weather } from '../models/weather.model';

export interface State {
  fetchedCityIndex: number,
  dailyTemperature: number,
  weatherText: string,
  isDailyLoading: boolean,
  weatherForecast: Weather[],
  isForecastLoading: boolean
}

export interface AppState {
  weather: State;
}

const initialState: State = {
  fetchedCityIndex: 215854,
  dailyTemperature: null,
  weatherText: '',
  isDailyLoading: false,
  weatherForecast: [],
  isForecastLoading: false
}

export function weatherReducer(state: State = initialState, action: WeatherActions.WeatherActions) {
  switch (action.type) {
    case WeatherActions.UPDATE_DAILY_WEATHER:
      return {
        ...state,
        fetchedCityIndex: action.payload.fetchedCityIndex,
        dailyTemperature: action.payload.dailyTemperature,
        weatherText: action.payload.weatherText,
        isDailyLoading: false
      }
    case WeatherActions.UPDATE_FORECAST_WEATHER:
      return {
        ...state,
        weatherForecast: action.payload,
        isForecastLoading: false
      }
    case WeatherActions.SHOW_DAILY_SPINNER:
      return {
        ...state,
        isDailyLoading: true
      }
    case WeatherActions.SHOW_FORECAST_SPINNER:
      return {
        ...state,
        isForecastLoading: true
      }
    default:
      return state;
  }
}