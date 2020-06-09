import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public email: string = '';
  public name: string = '';
  public password: string = '';
  public warningMessage: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.setUserName(this.name);
    this.userService.setEmail(this.email);

    this.authService.register(this.name, this.email, this.password)
    .subscribe(res => {
      console.log(res);
      localStorage.setItem('user', res['token']);
      localStorage.setItem('id', res['id']);

      // check for errors
      this.warningMessage = '';
      if (Array.isArray(res.email)) {
        this.warningMessage += res.email[0];
      }
      if (Array.isArray(res.name)) {
        this.warningMessage += res.name[0];
      }
      if (Array.isArray(res.password)) {
        this.warningMessage += res.password[0];
      }
      // if not errors - navigate to home
      if (!this.warningMessage) {
        this.router.navigate(['/settings']);
      }
    }, error => {
      this.warningMessage = 'Wrong credentials!';
      console.error(error);
    } );
  }

}
