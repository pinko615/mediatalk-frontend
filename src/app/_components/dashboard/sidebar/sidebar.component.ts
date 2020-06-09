import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout(localStorage.getItem('id'))
    .subscribe(res => {
      console.log(res);
      localStorage.removeItem('user');
      localStorage.removeItem('id');
      localStorage.removeItem('userActual');
      this.router.navigate(['/landing']);
    });
  }

}
