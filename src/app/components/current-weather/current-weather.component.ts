import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLinkActive} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {GeneralWeatherResponse} from "../../models/GeneralWeatherResponse";
import {WeatherSharedDataService} from "../../services/weather-shared-data.service";
import {WeatherApiService} from "../../services/weatherApi.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit{
  locationData$!: Observable<GeneralWeatherResponse>;
  cityName!: string;
  weatherDescription!: string;
  @Input() city!: Observable<string>;


  constructor(private weatherSharedDataService: WeatherSharedDataService, private router: Router) {
  }


  ngOnInit() {
    this.city.subscribe(cityName => {
      this.cityName = cityName;
      console.log('cityName ' + this.cityName);
      this.locationData$ = this.weatherSharedDataService.getWeatherByCityName(this.cityName);
      this.locationData$.subscribe(data => data.weather.map(data => this.weatherDescription = data.description));
      localStorage.setItem('currentCity', this.cityName);

      // Retrieve current city from localStorage
      const storedCurrentCity = localStorage.getItem('currentCity');
      if (storedCurrentCity) {
        this.cityName = storedCurrentCity;
        console.log('cityName ' + this.cityName);
      }
    });
  }

  getFavoritesUrl(){
    return this.router.url === '/favorites'
  }

}
