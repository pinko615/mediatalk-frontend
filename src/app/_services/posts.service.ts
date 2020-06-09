import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosts() {
    return this
    .http.get(this.apiUrl + '/posts')
    .pipe(
      map((response: Response) => {
          return response;
      })
  );
  }

  getPostsById(id) {
    console.log(id);
    return this.http.get<any>(this.apiUrl + `/posts/${id}`);
  }

  // createPost(body: any, token) {
  //   console.log(body, token);
  //   return this.http.post<any>(this.apiUrl + '/posts', body,
  //     {
  //       headers: {
  //         Authorization: 'Bearer' + token
  //       }
  //     });
  //   }

  createPost(postFormData: any) {
    console.log(postFormData);
    return this.http.post<any>(this.apiUrl + '/posts', postFormData,
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('user')
      }
    });
  }

    deletePost(id, token) {
      console.log(id, token);
      return this.http.delete<any>(this.apiUrl + `/posts/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    createComment(body) {
      return this.http.post<any>(this.apiUrl + '/addComment', body);
    }

    giveLike(body, post_id) {
      console.log(body, post_id, localStorage.getItem('user'));
      return this.http.post<any>(this.apiUrl + `/posts/addLike/${post_id}`, body,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user')
        }
      });
    }

}
