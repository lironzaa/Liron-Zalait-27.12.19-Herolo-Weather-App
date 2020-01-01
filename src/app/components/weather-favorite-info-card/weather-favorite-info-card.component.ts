import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-favorite-info-card',
  templateUrl: './weather-favorite-info-card.component.html',
  styleUrls: ['./weather-favorite-info-card.component.css']
})
export class WeatherFavoriteInfoCardComponent {
  @Input() favoritesWeather;

  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate([`/`]);
  }
}