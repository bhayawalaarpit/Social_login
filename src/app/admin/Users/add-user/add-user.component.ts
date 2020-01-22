import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private notification: NotificationService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  userData = {};
  role: string;
  id;
  authorities;
  countryCodes;
  countryCodeDisable = false;

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

  onSubmit(form: NgForm) {
    const reqData = Object.assign({}, this.userData);
    reqData[`roles`] = [
      this.authorities.find(
        authority => authority.name === this.userData[`authorityName`]
      )
    ];
    if (!reqData.hasOwnProperty('id')) {
      reqData[`provider`] = 'local';
      this.loginService.saveUser(reqData).subscribe(
        res => {
          this.notification.showNotification('success', 'User is registred');
          this.router.navigate(['admin/users']);
          form.reset();
        },
        err => {
          this.notification.showNotification('error', err.error.error);
          console.log('err', err.error.error);
        }
      );
    } else {
      this.loginService.updateUser(reqData).subscribe(
        res => {
          this.notification.showNotification(
            'success',
            'User is update successfully'
          );
          this.router.navigate(['admin/users']);
          form.reset();
        },
        err => {
          this.notification.showNotification('error', err.error.error);
        }
      );
    }
  }
}
