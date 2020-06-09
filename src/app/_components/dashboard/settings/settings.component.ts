import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  editProfile(body){
    // tslint:disable-next-line: radix
    this.authenticationService.editProfile(body.value, parseInt(localStorage.getItem('id')))
      .subscribe(res => {
        console.log(res);
      });
  }

}
