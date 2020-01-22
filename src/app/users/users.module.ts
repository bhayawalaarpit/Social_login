import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ComonModule } from '../shared/comon/comon.module';
import { CreateUserOtpComponent } from './create-user-otp/create-user-otp.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [DashboardComponent, CreateUserOtpComponent],
    imports: [
        CommonModule,
        ComonModule,
        FormsModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
