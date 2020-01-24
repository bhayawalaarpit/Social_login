import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user-otp',
  templateUrl: './create-user-otp.component.html',
  styleUrls: ['./create-user-otp.component.css']
})
export class CreateUserOtpComponent implements OnInit {
  authorities;
  countryCodes;
  userData;
  userEmail;
  userMobile;
  userCountryCode;
  countryCodeDisable = false;
  matchPassword = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('Email');
    this.userMobile = localStorage.getItem('Mobile');
    this.userCountryCode = localStorage.getItem('Country Code');

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
    this.userMobile
      ? (this.countryCodeDisable = true)
      : (this.countryCodeDisable = false);
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

    this.userData = form.value;
    this.userData.role = [
      this.authorities.find(authority => authority.name === form.value.role)
    ];
    this.userData.provider = 'local';
    this.loginService
      .registerUserViaOtp(this.userData)
      .subscribe(otpUserResponse => {
        if (otpUserResponse[`errorMessage`]) {
          Toast.fire({
            icon: 'error',
            title: otpUserResponse[`errorMessage`]
          });
        } else {
          localStorage.setItem('Token', otpUserResponse[`token`]);
          Toast.fire({
            icon: 'success',
            title: 'Save User successfully'
          });
          this.router.navigate(['dashboard']);
          form.reset();
        }
      });
  }
}
