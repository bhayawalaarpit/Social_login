import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../shared/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UsersListComponent } from './Users/users-list/users-list.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { UsersDetailsComponent } from './Users/users-details/users-details.component';
import { UserComponent } from './Users/user/user.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'users',
        component: UserComponent,
        children: [
            {
                path: '',
                component: UsersListComponent,
            },
            {
                path: 'add',
                component: AddUserComponent
            },
            {
                path: 'edit/:id',
                component: AddUserComponent
            },
            {
                path: 'view/:id',
                component: UsersDetailsComponent
            }
        ]
    }
    // {
    //     path: 'admin/dashboard',
    //     component: DashboardComponent
    // },
    // { path: 'admin/users', component: UsersListComponent },
    // { path: 'admin/users/add', component: AddUserComponent },
    // { path: 'admin/users/edit/:id', component: AddUserComponent },
    // { path: 'admin/users/view/:id', component: UsersDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
