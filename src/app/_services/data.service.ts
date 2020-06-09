import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPrices() {
    // tslint:disable-next-line: max-line-length
    return this.http.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=30c0b59e02c42b8b3cebaa21b0bc2e5cc4c58ae7be73ed2b4ecde34753e3415d')
    .pipe(
      map((response: Response) => {
          return response;
      })
  );
  }

  getCryptoNews() {
    // tslint:disable-next-line: max-line-length
    return this.http.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=30c0b59e02c42b8b3cebaa21b0bc2e5cc4c58ae7be73ed2b4ecde34753e3415d')
    .pipe(
      map((response: Response) => {
          return response;
      })
  );
  }

}
