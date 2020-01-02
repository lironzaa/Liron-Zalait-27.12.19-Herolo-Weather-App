import * as WeatherActions from './weather.actions';
import { WeatherForecast, DailyWeather } from '../models/weather.model';

export interface State {
  currentDailyWeather: DailyWeather,
  isDailyLoading: boolean,
  currentWeatherForecast: WeatherForecast[],
  isForecastLoading: boolean,
  favoritesList: number[],
  isInFavorites: boolean,
  favoritesWeather: []
}

const initialState: State = {
  currentDailyWeather: {
    fetchedCityIndex: null,
    fetchedCityName: '',
    dailyTemperature: null,
    weatherText: '',
    weatherIcon: ''
  },
  isDailyLoading: false,
  currentWeatherForecast: [],
  isForecastLoading: false,
  favoritesList: [],
  isInFavorites: false,
  favoritesWeather: []
}

export function weatherReducer(state: State = initialState, action: WeatherActions.WeatherActions) {
  switch (action.type) {
    case WeatherActions.UPDATE_DAILY_WEATHER:
      return {
        ...state,
        currentDailyWeather: action.payload,
        isDailyLoading: false
      }
    case WeatherActions.UPDATE_FORECAST_WEATHER:
      return {
        ...state,
        currentWeatherForecast: action.payload,
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
        favoritesList: [...state.favoritesList, action.payload.id],
        isInFavorites: true,
        favoritesWeather: [...state.favoritesWeather, action.payload]
      }
    case WeatherActions.REMOVE_FAVORITE:
      return {
        ...state,
        favoritesList: state.favoritesList.filter(favoriteItem => {
          return favoriteItem !== action.payload.fetchedCityIndex
        }),
        isInFavorites: false,
        favoritesWeather: state.favoritesWeather.filter((favoriteWeatherItem: any) => {
          return favoriteWeatherItem.id !== action.payload.fetchedCityIndex
        })
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