import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token: string;
  private headers: HttpHeaders;
  private readonly apiUrl = environment.apiUrl;
  private readonly baseUrl = environment.baseUrl;
  public username = '';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Accept');
  }

  login(body: any) {
    console.log(body);
    return this.http.post<any>(this.apiUrl + '/users/login', body);
  }

register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/users/register', { email: email, name: username, 
            password: password }, { headers: this.headers } )
        .pipe(
            map((response: Response) => {
                // register successful if there's a jwt token in the response
                this.token = response['token'];
                let email = response['email'];
                if (this.token) {
                    // store email and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user',
                        JSON.stringify({ token: this.token }));
                }
                return response;
            })
        );
}

logout(id) {
    return this.http.get<any>(this.apiUrl + `/users/logout/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user')
        }
      }
      );
    }


    // clear token remove user from local storage to log user out

// sendPasswordResetEmail(email: string): Observable<any>  {
//     let url = this.baseUrl+'/reset-password';
//     return this.http.post(this.apiUrl+'/password-reset-email', 
//             { email: email, url:  url }, { headers: this.headers } )
//         .pipe(
//             map((response: Response) => {
//                 return response;
//             })
//         );
// }

// resetPassword(newPassword: string, confirmedPassword: string, token: string): Observable<any> {
//     return this.http.post(this.apiUrl+'/reset-password', { password: newPassword, 
//             confirm_password: confirmedPassword, token: token }, { headers: this.headers } )
//         .pipe(
//             map((response: Response) => {
//                 return response;
//             })
//         );
// }

isLogged() {
    return !!localStorage.getItem('user');
}

getUserName() {
    return this.username;

}

setUserName(username) {
    this.username = username;
}

getUserById(id) {
    return this.http.get(this.apiUrl + `/users/${id}`);
}

// editProfile(body: any, token, id) {
//     console.log(body, token, id);
//     return this.http.put<any>(this.apiUrl + `/users/update/${id}`, body,
//       {
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem('user')
//         }
//       }
//       );
//     }

editProfile(body: any, id){
    console.log(body, id, localStorage.getItem('user'));
    return this.http.put<any>(this.apiUrl + `/users/update/${id}`, body, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('user')
      }
    });
  }

}
