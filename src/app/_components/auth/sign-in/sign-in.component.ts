import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  private warningMessage: string;

  body = {
    email: '',
    password: ''

  };

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }

  onLogIn() {
    this.body.email = this.email;
    this.body.password = this.password;
    console.log(this.body);
    
    this.authService.login(this.body)
    .subscribe(res => {
      localStorage.setItem('user', res['user']['token']);
      localStorage.setItem('id', res['user']['id']);
      this.notification.success('Successfully signed in', 'Enjoy your stay!');
      this.router.navigate(['/']);
    }, error => {
      this.warningMessage = 'Invalid Credentials!';
      console.error(error);
    } );
  }

}
