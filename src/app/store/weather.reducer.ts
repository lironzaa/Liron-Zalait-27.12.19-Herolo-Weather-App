import * as WeatherActions from './weather.actions';
import { Weather } from '../models/weather.model';

export interface State {
  fetchedCityIndex: number,
  fetchedCityName: string,
  dailyTemperature: number,
  weatherText: string,
  weatherIcon: number,
  isDailyLoading: boolean,
  weatherForecast: Weather[],
  isForecastLoading: boolean
}

const initialState: State = {
  fetchedCityIndex: 215854,
  fetchedCityName: 'Tel Aviv',
  dailyTemperature: null,
  weatherText: '',
  weatherIcon: null,
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
        fetchedCityName: action.payload.fetchedCityName,
        dailyTemperature: action.payload.dailyTemperature,
        weatherText: action.payload.weatherText,
        weatherIcon: action.payload.weatherIcon,
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
    case WeatherActions.REMOVE_DAILY_SPINNER:
      return {
        ...state,
        isDailyLoading: false
      }
    case WeatherActions.REMOVE_FORECAST_SPINNER:
      return {
        ...state,
        isForecastLoading: false
      }
    default:
      return state;
  }
}