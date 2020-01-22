import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  baseUrl = environment.apiUrl;
  constructor(private httpclient: HttpClient) {}

  simpleLogin(data): Observable<any[]> {
    return this.httpclient.post<any[]>(this.baseUrl + '/api/login', data);
  }

  create_edit_SocialUser(data): Observable<any[]> {
    return this.httpclient.post<any[]>(this.baseUrl + '/api/users', data);
  }

  saveUser(data): Observable<any[]> {
    return this.httpclient.post<[]>(this.baseUrl + '/management/users', data);
  }

  getAllUsers(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.baseUrl + '/management/users');
  }

  getUserById(id): Observable<any[]> {
    return this.httpclient.get<any[]>(this.baseUrl + '/management/users/' + id);
  }

  getLoginUserDetails(): Observable<any[]> {
    return this.httpclient.get<any[]>(this.baseUrl + '/api/users');
  }

  updateUser(data): Observable<any[]> {
    return this.httpclient.put<any[]>(this.baseUrl + '/management/users', data);
  }

  deleteUserById(id): Observable<any[]> {
    return this.httpclient.delete<any[]>(
      this.baseUrl + '/management/users/' + id
    );
  }

  getAllAuthorities() {
    return this.httpclient.get(this.baseUrl + '/api/authorities');
  }

  getAllCountryCodes() {
    return this.httpclient.get(this.baseUrl + '/api/country-codes');
  }

  // OTP

  generateOtp(data): Observable<any[]> {
    return this.httpclient.post<any[]>(this.baseUrl + '/api/otp/login', data);
  }

  vreifyOtp(data): Observable<any[]> {
    return this.httpclient.post<any[]>(this.baseUrl + '/api/verify/otp', data);
  }

  registerUserViaOtp(data): Observable<any[]> {
    return this.httpclient.post<any[]>(this.baseUrl + '/api/otp/users', data);
  }
}
