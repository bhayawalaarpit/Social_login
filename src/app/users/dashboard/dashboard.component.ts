import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(
        private loginService: LoginService,
        private router: Router,
        private authService: AuthService
    ) { }
    public user: {};

    ngOnInit() {
        this.loginService.getLoginUserDetails().subscribe(res => {
            this.user = res;
        });
    }

    async signOut() {
        await this.authService
            .signOut(true)
            .then(x => (this.user = null))
            .catch(e => console.log(e));
        localStorage.clear();
        this.router.navigate(['']);
    }
}
