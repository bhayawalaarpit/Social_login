import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  userList: any = [];
  async ngOnInit() {
    await this.loginService.getAllUsers().subscribe(
      res => {
        this.userList = res;
      },
      err => console.warn('Error', err)
    );
  }

  async deleteUser(id) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    Swal.fire({
      width: '20rem',
      heightAuto: false,
      title: 'Are you sure?',
      text: "You won't to Delete User!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.value) {
        await this.loginService.deleteUserById(id).subscribe(
          res => {
            console.log('Res =>', res);
            // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            Toast.fire({
              icon: 'success',
              title: 'User has been deleted.'
            });
            this.router.navigate(['admin/dashboard']);
          },
          err => console.log('Error =>', err)
        );
      }
    });
  }
}
