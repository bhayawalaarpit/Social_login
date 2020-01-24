import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public location: Location
  ) {}

  userData: any = [];
  role: string;
  id: any;
  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.loginService.getUserById(this.id).subscribe(res => {
        this.userData = res;
        this.role =
          this.userData.roles.length === 2
            ? 'Admin/User'
            : this.userData.roles[0].name === 'ROLE_USER'
            ? 'User'
            : 'Admin';
      });
    }
  }
}
