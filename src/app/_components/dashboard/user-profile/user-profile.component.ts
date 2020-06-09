import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { PostsService } from 'src/app/_services/posts.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  bodyComment = {
    user_id: '',
    post_id: '',
    description: ''
  };
  postComment: string;
  postFile: any;
  postText: string;
  editText: string;
  allPosts = {};
  actualUser = {};
  body = {
    text: '',
    user_id: '',
    file: ''
  };
  data = [];

  bodyLike = {
    post_id: '',
    likeable_id: 1,
    user_id: ''
  };

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getUserById(localStorage.getItem('userActual'))
    .subscribe(res => {
      this.actualUser = res;
      console.log(this.actualUser);
    });
  }

  createPost() {
    console.log(this.postFile);
    console.log(this.postText);
    const token = localStorage.getItem('user');
    this.body.file = 'https://gamepedia.cursecdn.com/seaofthieves_gamepedia/thumb/2/2c/CrescentIsle_2.png/1200px-CrescentIsle_2.png';
    this.body.text = this.postText;
    this.body.user_id = localStorage.getItem('id');
    // // this.postsService.createPost(this.body, token)
    // .subscribe(res => {
    //   this.postText = '';
    //   this.getLoggedUser();
    // });
  }

  deletePost(id) {
    // tslint:disable-next-line: no-unused-expression
    console.log(this.allPosts[id].id);
    const token = localStorage.getItem('user');
    this.postsService.deletePost(this.allPosts[id].id, token)
    .subscribe(res => {
      console.log(res);
      this.getLoggedUser();
    });

  }

  giveLike(post_id) {
    this.bodyLike.user_id = localStorage.getItem('id');
    console.log(this.bodyLike);
    this.postsService.giveLike(this.bodyLike, post_id)
        .subscribe(res => {
          console.log(res);
          this.getLoggedUser();
        });
  }

  createComment(e, post_id) {
    if (e.key === 'Enter') {
      this.bodyComment.user_id = localStorage.getItem('id');
      this.bodyComment.post_id = post_id;
      this.bodyComment.description = this.postComment;
      this.postComment = '';
      this.postsService.createComment(this.bodyComment)
        .subscribe(res => {
          console.log(res);
          this.getLoggedUser();
        });
    }
  }


}
