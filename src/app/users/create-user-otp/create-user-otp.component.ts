import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  onSubmit(form: NgForm) {
    this.userData = form.value;
    this.userData.role = [
      this.authorities.find(authority => authority.name === form.value.role)
    ];
    this.userData.provider = 'local';
    this.loginService
      .registerUserViaOtp(this.userData)
      .subscribe(otpUserResponse => {
        localStorage.setItem('Token', otpUserResponse[`token`]);
        this.router.navigate(['dashboard']);
        console.log('Login Successfully..!!', otpUserResponse);
      });
  }
}
