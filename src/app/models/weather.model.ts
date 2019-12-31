export interface WeatherForecast {
  temperature: number;
  date: string;
  weatherIcon: string;
}

export interface FavoritesWeather {
  id: number,
  weatherText: string,
  temperature: number;
  weatherIcon: string;
}