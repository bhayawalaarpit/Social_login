import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  signOut() {
    if (localStorage.getItem('Token')) {
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
          this.router.navigate(['']);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
