import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';

import { LoginService } from '../services/login.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authDat: any[];
  public isAdmin = false;
  public currentUrl = '';
  public generateOTPwith = '';
  enterOTP = false;
  countryCodes;
  requestCount = 0;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.currentUrl === '/admin'
      ? (this.isAdmin = true)
      : (this.isAdmin = false);

    this.loginService
      .getAllCountryCodes()
      .toPromise()
      .then(countryCodes => {
        this.countryCodes = countryCodes;
      });
  }

  // Simple Login
  async onLogin(form: NgForm) {
    this.loginService.simpleLogin(form.value).subscribe(
      res => {
        localStorage.setItem('Token', res[`token`]);
        this.Toast.fire({
          icon: 'success',
          title: 'Login successfully'
        });
        this.router.navigate([this.isAdmin ? 'admin/dashboard' : 'dashboard']);
      },
      err => {
        this.Toast.fire({
          icon: 'error',
          title: err.error.error
        });
      }
    );
  }

  // Login With Google
  async signInWithGoogle() {
    await this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(res => {
        const userData = {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          imageUrl: res.photoUrl,
          provider: res.provider
        };
        this.loginService.create_edit_SocialUser(userData).subscribe(
          response => {
            localStorage.setItem('Token', response[`token`]);
            this.Toast.fire({
              icon: 'success',
              title: 'Login via Google successfully'
            });
            this.router.navigate(['dashboard']);
          },
          error => {
            this.Toast.fire({
              icon: 'error',
              title: error.error.error
            });
          }
        );
      })
      .catch(err => console.warn('Error =>', err));
  }

  // Login wiith Facebook
  async signInWithFB() {
    await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      res => {
        const userData = {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          imageUrl: res.photoUrl,
          provider: res.provider
        };
        this.loginService
          .create_edit_SocialUser(userData)
          .subscribe(response => {
            localStorage.setItem('Token', response[`token`]);
            this.Toast.fire({
              icon: 'success',
              title: 'Login via Facebook successfully'
            });
            this.router.navigate(['dashboard']);
          });
      },
      err => {
        this.Toast.fire({
          icon: 'error',
          title: err.error.error
        });
      }
    );
  }

  // Login with OTP
  async signInViaOTP(form: NgForm) {
    const otpdata = {
      emailOrMobileNumber: form.value.emailOrMobile,
      countryCodeId: form.value.countryCode
    };
    if (!this.enterOTP) {
      this.loginService.generateOtp(otpdata).subscribe(resOTP => {
        this.Toast.fire({
          icon: 'success',
          title: resOTP[`message`]
        });
        resOTP[`message`] === 'OTP Sent Successfully'
          ? (this.enterOTP = true)
          : (this.enterOTP = this.enterOTP);
      });
    } else {
      otpdata[`otp`] = form.value.otp;
      this.loginService.vreifyOtp(otpdata).subscribe(resVerifyOtp => {
        if (resVerifyOtp[`registered`] && resVerifyOtp[`verified`]) {
          localStorage.setItem('Token', resVerifyOtp[`token`]);
          this.Toast.fire({
            icon: 'success',
            title: resVerifyOtp[`message`]
          });

          this.router.navigate(['dashboard']);
        } else if (!resVerifyOtp[`registered`] && resVerifyOtp[`verified`]) {
          this.Toast.fire({
            icon: 'info',
            title: resVerifyOtp[`message`] + ' \nNow first Register as User'
          });

          if (this.generateOTPwith === 'mobile') {
            localStorage.setItem('Mobile', otpdata.emailOrMobileNumber);
            localStorage.setItem('Country Code', otpdata.countryCodeId);
          } else if (this.generateOTPwith === 'email') {
            localStorage.setItem('Email', otpdata.emailOrMobileNumber);
          }

          this.router.navigate(['registeredUser-otp']);
        } else {
          this.requestCount += 1;

          this.Toast.fire({
            icon: 'error',
            title: resVerifyOtp[`message`] || resVerifyOtp[`error-message`]
          });

          if (this.requestCount >= 3) {
            this.Toast.fire({
              icon: 'warning',
              title: resVerifyOtp[`message`]
            });

            this.generateOTPwith = '';
          }
        }
      });
    }
  }
}
