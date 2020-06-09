import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.apiUrl;
  public mail = {
    email: ''
  };

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.apiUrl + '/users')
    .pipe(
      map((response: Response) => {
          return response;
      })
  );
  }

  setEmail(email) {
    this.mail.email = email;
    console.log(this.mail);
  }

  getEmail() {
    return this.mail;
  }

  getUserByEmail(body) {
    console.log(body);
    return this.http.get(this.apiUrl + '/users/email', body);
  }

}
