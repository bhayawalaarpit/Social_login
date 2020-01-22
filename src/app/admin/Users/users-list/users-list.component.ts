import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.services';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    constructor(private router: Router, private loginService: LoginService) { }

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
        await this.loginService.deleteUserById(id).subscribe(
            res => {
                console.log('Res =>', res);
            },
            err => console.log('Error =>', err)
        );
        this.router.navigate(['admin/dashboard']);
    }

}
