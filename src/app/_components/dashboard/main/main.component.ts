import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PostsService } from 'src/app/_services/posts.service';
import { UserService } from 'src/app/_services/user.service';
import { DataService } from 'src/app/_services/data.service';
import { WeatherService } from 'src/app/_services/weather.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  p = 1;
  actualUser = '';
  data = [];
  fecha: string;
  postComment: string;
  postComments = [];
  Comments = [];

  postFile: any;
  text: string;
  body = {
    text: '',
    user_id: '',
    file: ''
  };

  bodyComment = {
    user_id: '',
    post_id: '',
    description: ''
  };

  bodyLike = {
    post_id: '',
    likeable_id: 1
  };

  username = '';
  users;
  posts: any;

  // bitcoin
  objectKeys = Object.keys;
  cryptos: any;
  news: any = [];
  sources: any = [];

  // posts


  // weather
  lat;
  lon;
  weather;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private postsService: PostsService,
    private userService: UserService,
    private dataService: DataService,
    private weatherService: WeatherService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getLoggedUser();
    // weather
    this.getLocation();

    // bitcoin
    this.dataService.getPrices()
      .subscribe(res => {
        this.cryptos = res;
        console.log(res);
      });

    this.dataService.getCryptoNews()
      .subscribe(res => {
        console.log(res);
        this.news[0] = res['Data'][0].title;
        this.news[1] = res['Data'][1].title;
        this.news[2] = res['Data'][2].title;
        this.news[3] = res['Data'][3].title;
        this.news[4] = res['Data'][4].title;
        console.log(this.news, this.sources);
      });

    // this.userService.getUsers()
    //   .subscribe(res => {
    //     this.users = res;
    //     console.log(res);
    //   });

    this.getAllPosts();
  }

  getAllPosts() {
    this.postsService.getPosts()
      .subscribe(res => {
        this.posts = res;
        console.log(res);

        for (let i = 0; i < this.posts.length; i++) {
        // tslint:disable-next-line: radix
        if (this.posts[i].user_id === parseInt(localStorage.getItem('id'))) {
          this.actualUser = this.posts[i].user.name;
          console.log(res[i].user_id, localStorage.getItem('id'), this.actualUser);
        }
        this.postComments[i] = this.posts[i]['comments'];
        this.data[i] = moment(this.posts[i].created_at).fromNow();
      }
        this.Comments[0] = this.postComments[0];
        console.log(this.data, this.actualUser);
      });
  }

  // weather

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeather(this.lat, this.lon)
          .subscribe(data => {
            this.weather = data;
            console.log(data);
          });
      });
    }
  }

  // createPost() {
  //   console.log(this.postFile);
  //   console.log(this.postText);
  //   const token = localStorage.getItem('user');
  //   this.body.file = this.postFile;
  //   this.body.text = this.postText;
  //   this.body.user_id = localStorage.getItem('id');
  //   console.log(this.body.user_id);
  //   this.postsService.createPost(this.body, token)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.postText = '';
  //       this.getAllPosts();
  //     });
  // }

  createPost(postForm, imageInput) {
    const postFormData = new FormData();
    if (postForm.value.text) {  postFormData.set('text', postForm.value.text); }
    if (imageInput.files[0]) {  postFormData.set('file', imageInput.files[0]); }
    console.log(postFormData);
    this.postsService.createPost(postFormData)
  .subscribe(
    user => {
      console.log(user);
      // tslint:disable-next-line: no-shadowed-variable
      // const postFormData = new FormData();
      // this.text = '';
      // postFormData.set('text', '');
      // postFormData.set('file', '');
      console.log(postFormData.get('text'), 'hola');
      this.getAllPosts();
  },
   err => console.log(err)
  );
  }

  // goToLoggedUser(id, i) {
  //   setTimeout(() => this.router.navigate([`dashboard/user/${this.posts[i]['user'].name}`]), 1000);
  // localStorage.setItem('userActual', id);
  // }

  goToLoggedUser(id, i) {
    console.log(id, i);
    localStorage.setItem('userActual', id);
    if (localStorage.getItem('id') === localStorage.getItem('userActual')) {
      setTimeout(() => this.router.navigate(['profile']), 1000);
    } else {
      setTimeout(() => this.router.navigate([`user/${this.posts[i]['user'].name}`]), 1000);
    }
  }

  // getLoggedUser() {
  //   this.authService.getUserById(localStorage.getItem('id'))
  //     .subscribe(res => {
  //       this.actualUser = res;
  //       console.log(res);
  //     });
  // }

  createComment(e, post_id) {
    if (e.key === 'Enter') {
      this.bodyComment.user_id = localStorage.getItem('id');
      this.bodyComment.post_id = post_id;
      this.bodyComment.description = this.postComment;
      this.postComment = '';
      this.postsService.createComment(this.bodyComment)
        .subscribe(res => {
          console.log(res);
          this.getAllPosts();
        });
    }
  }

  giveLike(post_id) {
    this.bodyLike.post_id = post_id;
    // tslint:disable-next-line: radix
    this.postsService.giveLike(this.bodyLike, parseInt(localStorage.getItem('id')))
        .subscribe(res => {
          console.log(res);
          this.getAllPosts();
        });
  }

}
