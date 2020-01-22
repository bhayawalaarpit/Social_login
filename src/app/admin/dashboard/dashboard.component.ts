import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.services';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public user: {};
    show = false;
    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() {
        this.loginService.getLoginUserDetails().subscribe(res => {
            this.user = res;
        });
    }

    signOut() {
        localStorage.clear();
        this.router.navigate(['/admin']);
    }
}
