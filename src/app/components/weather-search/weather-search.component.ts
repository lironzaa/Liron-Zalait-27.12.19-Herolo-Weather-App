import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { map } from 'rxjs/operators';
import { Autocomplete } from './../../models/weather.model';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }

  keyword: string = 'name';
  autocompleteData: Autocomplete[] = [];

  selectEvent(item) {
    if (item.name === 'Tokyo') {
      console.log(item.name);
    }
  }

  onChangeSearch(searchedQuery: string) {
    /* this.weatherService.getAutocompleteSearch(searchedQuery)
    .subscribe(results => {
      console.log(results);
    }) */
    this.weatherService.getFakeAutocompleteSearch()
      .pipe(map((results: any) => {
        console.log(results);
        return results.map(res => ({
          id: +res.Key,
          name: res.LocalizedName
        }))
      }))
      .subscribe(autocompleteResults => {
        console.log(autocompleteResults);
        this.autocompleteData = autocompleteResults;
      })
  }
}