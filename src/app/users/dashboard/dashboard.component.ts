import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}
  public user: {};

  ngOnInit() {
    this.loginService.getLoginUserDetails().subscribe(res => {
      this.user = res;
    });
  }

  signOut() {
    Swal.fire({
      width: '20rem',
      heightAuto: false,
      title: 'Are you sure?',
      text: "You won't to Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async result => {
      if (result.value) {
        this.authService
          .signOut(true)
          .then(x => (this.user = null))
          .catch(e => console.log(e));
        localStorage.clear();
        this.router.navigate(['']);
      }
    });
  }
}
