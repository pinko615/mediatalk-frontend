import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  posts: any;
  searchFriends;

  actualUser: any = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getUserById(localStorage.getItem('id'))
    .subscribe(res => {
      this.actualUser = res;
      console.log(this.actualUser);
    });
  }

  goToLoggedUser(i) {
    console.log(i, this.actualUser['user']['following'][i].name);
    setTimeout(() => this.router.navigate([`user/${this.actualUser['user']['following'][i].name}`]), 1000);
    }

}
