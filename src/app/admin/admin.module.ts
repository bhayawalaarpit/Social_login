import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
import { UsersDetailsComponent } from './Users/users-details/users-details.component';
import { ComonModule } from '../shared/comon/comon.module';
import { UserComponent } from './Users/user/user.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AddUserComponent,
        UsersListComponent,
        UsersDetailsComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        ComonModule,
        AdminRoutingModule,
        FormsModule
    ]
})
export class AdminModule { }
