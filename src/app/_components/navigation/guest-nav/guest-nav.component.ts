import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-guest-nav',
  templateUrl: './guest-nav.component.html',
  styleUrls: ['./guest-nav.component.scss']
})
export class GuestNavComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
