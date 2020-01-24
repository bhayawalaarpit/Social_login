import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  show = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

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
