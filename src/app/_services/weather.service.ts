import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = 'b3a4650474a8837e4ffcc4807eb45ec1';

  constructor(private http: HttpClient) { }

  getWeather(lat, lon) {
    // tslint:disable-next-line: prefer-const
    let params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);
      return this.http.get(this.url, { params } );
    }

}
