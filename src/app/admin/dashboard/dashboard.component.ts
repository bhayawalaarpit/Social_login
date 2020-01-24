import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user: {};
  show = false;
  constructor(private router: Router, private loginService: LoginService) {}

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
        localStorage.clear();
        this.router.navigate(['/admin']);
      }
    });
  }
}
