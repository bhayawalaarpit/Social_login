import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    show = false;
    constructor(
        private loginService: LoginService,
        private router: Router
    ) { }

    ngOnInit() { }

    signOut() {
        localStorage.clear();
        this.router.navigate(['/admin']);
    }

}
