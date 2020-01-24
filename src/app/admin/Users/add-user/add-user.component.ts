import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  userData = {};
  role: string;
  id;
  authorities;
  countryCodes;
  countryCodeDisable = false;
  matchPassword = false;

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.loginService.getUserById(this.id).subscribe(res => {
        this.userData = res;
        console.log('this.userData = ', this.userData);
        this.userData[`authorityName`] = this.userData[`roles`][0][`name`];
        console.log('userData', this.userData);
      });
    }
    this.loginService
      .getAllAuthorities()
      .toPromise()
      .then(authorities => {
        this.authorities = authorities;
      });
    this.loginService
      .getAllCountryCodes()
      .toPromise()
      .then(countryCodes => {
        this.countryCodes = countryCodes;
      });
  }

  isDisabled() {
    this.countryCodeDisable = true;
  }

  checkPass(Password, confirmPassword) {
    Password === confirmPassword
      ? (this.matchPassword = true)
      : (this.matchPassword = false);
  }

  onSubmit(form: NgForm) {
    // tost notification
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    // assign value
    const reqData = Object.assign({}, this.userData);
    reqData[`roles`] = [
      this.authorities.find(
        authority => authority.name === this.userData[`authorityName`]
      )
    ];

    if (!reqData.hasOwnProperty('id')) {
      // Save User
      reqData[`provider`] = 'local';
      this.loginService.saveUser(reqData).subscribe(
        res => {
          if (res[`errorMessage`]) {
            Toast.fire({
              icon: 'error',
              title: res[`errorMessage`]
            });
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Save User successfully'
            });
            this.router.navigate(['admin/users']);
            form.reset();
          }
        },
        err => {
          Toast.fire({
            icon: 'error',
            title: err.error.error
          });
          console.log('err', err.error.error);
        }
      );
    } else {
      // Update User

      Swal.fire({
        width: '20rem',
        heightAuto: false,
        title: 'Are you sure?',
        text: "You won't to Update User!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update it!'
      }).then(async result => {
        if (result.value) {
          this.loginService.updateUser(reqData).subscribe(
            res => {
              if (res[`errorMessage`]) {
                Toast.fire({
                  icon: 'error',
                  title: res[`errorMessage`]
                });
              } else {
                Toast.fire({
                  icon: 'success',
                  title: 'Update User successfully'
                });
                this.router.navigate(['admin/users']);
                form.reset();
              }
            },
            err => {
              Toast.fire({
                icon: 'error',
                title: err.error.error
              });
            }
          );
        }
      });
    }
  }
}
