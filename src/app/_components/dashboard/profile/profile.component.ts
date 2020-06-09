import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { PostsService } from 'src/app/_services/posts.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  Comments = [];

  postComments = [];

  bodyLike = {
    post_id: '',
    likeable_id: 1,
    user_id: ''
  };

  posts: any;

  constructor(
    private userService: UserService,
    private postsService: PostsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getUserById(localStorage.getItem('id'))
    .subscribe(res => {
      this.actualUser = res;
      for (let i = 0; i < this.actualUser['user'].post.length; i++) {
         this.data[i] = moment(this.actualUser['user'].post[i].created_at).fromNow();
      }
      console.log(this.actualUser['user'].post.length, this.data );
    });
  }

  createPost(postForm, imageInput){
    const postFormData = new FormData();
    if (postForm.value.text) {  postFormData.set('text', postForm.value.text); }
    if (imageInput.files[0]) {  postFormData.set('file', imageInput.files[0]); }
    console.log(postFormData);
    this.postsService.createPost(postFormData)
  .subscribe(
    user => {
      console.log(user);
      // postFormData.set('name', '');
      // postFormData.set('description', '');
      // postFormData.set('image', '');
      this.getLoggedUser();
      postFormData.set('text', '');
  },
   err => console.log(err)
  );
  }

  deletePost(id) {
    // tslint:disable-next-line: no-unused-expression
    console.log(this.actualUser['user'].post[id].id);
    const token = localStorage.getItem('user');
    this.postsService.deletePost(this.actualUser['user'].post[id].id, token)
    .subscribe(res => {
      console.log(res);
      this.getLoggedUser();
    });

  }

  giveLike(post_id) {
    this.bodyLike.post_id = post_id;
    // tslint:disable-next-line: radix
    this.postsService.giveLike(this.bodyLike, parseInt(localStorage.getItem('id')))
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
