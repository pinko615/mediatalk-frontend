import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss']
})
export class AuthNavComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) { }

  actualUser = {};

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

}
