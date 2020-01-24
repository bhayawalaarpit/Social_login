import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../services/login.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.loginService.isLogedIn()) {
    if (localStorage.getItem('Token')) {
      return true;
    } else {
      const url = window.location.href.split('/');
      this.router.navigate([url[3] === 'admin' ? '/admin' : '']);
    }
  }
}
