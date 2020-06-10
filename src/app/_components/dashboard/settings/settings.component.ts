import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  editProfile(body){
    // tslint:disable-next-line: radix
    this.authenticationService.editProfile(body.value, parseInt(localStorage.getItem('id')))
      .subscribe(res => {
        this.notification.success('Perfect!', 'Profile successfully updated');
        console.log(res);
      });
    body.reset();

  }
  editImage(imageInput){
    console.log(imageInput);
    const imageFormData = new FormData();
    if (imageInput.files[0]) {  imageFormData.set('img', imageInput.files[0]); }
  // tslint:disable-next-line: radix
    this.authenticationService.editImageProfile(imageFormData)
    .subscribe(res => {
      this.notification.success('Perfect!', 'Image successfully updated');
      this.router.navigate(['/profile']);
      console.log(res);
    });
}

}
