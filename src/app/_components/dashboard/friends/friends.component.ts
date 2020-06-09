import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  searchFriends;

  actualUser = [];

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getUserById(localStorage.getItem('id'))
    .subscribe(res => {
      this.actualUser = res['user'];
      console.log(this.actualUser['following']);
    });
  }

}
