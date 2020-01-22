import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminModule } from './admin/admin.module';
import { ComonModule } from './shared/comon/comon.module';
import { UsersModule } from './users/users.module';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { notifierConfig } from './shared/config/notifier.config';
import { Interceptor } from './shared/services/interceptor';
import { LoginService } from './shared/services/login.services';
import { NotificationService } from './shared/services/notification.service';



import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
} from 'angularx-social-login';


const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
            '692369695601-tsf35be54t9qnrlfusqal5hb9i1mqrji.apps.googleusercontent.com'
        )
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('608211639939572')
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SocialLoginModule,
        NotifierModule.withConfig(notifierConfig),
        AdminModule,
        ComonModule,
        UsersModule
    ],
    providers: [
        LoginService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        { provide: AuthServiceConfig, useFactory: provideConfig },
        NotificationService,

    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
