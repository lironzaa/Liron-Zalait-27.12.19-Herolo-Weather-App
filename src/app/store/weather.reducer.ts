import * as WeatherActions from './weather.actions';
import { WeatherForecast } from '../models/weather.model';

export interface State {
  fetchedCityIndex: number,
  fetchedCityName: string,
  dailyTemperature: number,
  weatherText: string,
  weatherIcon: string,
  isDailyLoading: boolean,
  weatherForecast: WeatherForecast[],
  isForecastLoading: boolean,
  favoritesList: number[],
  isInFavorites: boolean
}

const initialState: State = {
  fetchedCityIndex: null,
  fetchedCityName: '',
  dailyTemperature: null,
  weatherText: '',
  weatherIcon: '',
  isDailyLoading: false,
  weatherForecast: [],
  isForecastLoading: false,
  favoritesList: [],
  isInFavorites: false
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
    case WeatherActions.ADD_FAVORITE:
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.payload.fetchedCityIndex],
        isInFavorites: true
      }
    case WeatherActions.REMOVE_FAVORITE:
      return {
        ...state,
        favoritesList: state.favoritesList.filter(favoriteItem => {
          return favoriteItem !== action.payload.fetchedCityIndex
        }),
        isInFavorites: false
      }
    case WeatherActions.CHECK_IS_IN_FAVORITES:
      return {
        ...state,
        isInFavorites: state.favoritesList.includes(action.payload.fetchedCityIndex)
      }
    default:
      return state;
  }
}