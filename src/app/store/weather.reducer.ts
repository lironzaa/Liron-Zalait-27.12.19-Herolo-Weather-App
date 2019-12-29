import * as WeatherActions from './weather.actions';

export interface State {
  fetchedCityIndex: number,
  dailyTemperature: number,
  weatherText: string,
  isDailyLoading: boolean
}

export interface AppState {
  weather: State;
}

const initialState: State = {
  fetchedCityIndex: 215854,
  dailyTemperature: null,
  weatherText: '',
  isDailyLoading: false
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
    case WeatherActions.SHOW_SPINNER:
      return {
        ...state,
        isDailyLoading: true
      }
    default:
      return state;
  }
}