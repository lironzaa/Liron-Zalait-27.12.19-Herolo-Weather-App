import * as WeatherActions from './weather.actions';

const initialState: State = {
  fetchedCityIndex: 215854
}

export interface State {
  fetchedCityIndex: number
}

export interface AppState {
  weatherState: State;
}

export function weatherReducer(state: State = initialState, action: WeatherActions.WeatherActions) {
  switch (action.type) {
    case WeatherActions.UPDATE_DAILY_WEATHER:
      return {
        ...state,
        dailyWeatherData: [action.payload]
      }
    case WeatherActions.UPDATE_FETCHED_CITY_INDEX:
      return {
        ...state,
        fetchedCityIndex: [action.payload]
      }
    default:
      return state;
  }
}