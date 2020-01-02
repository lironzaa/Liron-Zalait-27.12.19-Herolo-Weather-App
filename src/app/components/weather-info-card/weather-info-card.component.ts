import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-info-card',
  templateUrl: './weather-info-card.component.html',
  styleUrls: ['./weather-info-card.component.css']
})
export class WeatherInfoCardComponent {
  @Input() currentWeatherForecast;

  constructor() { }

}