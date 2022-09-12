import { UserData } from './../../model/UserData';
import { UserApiService } from './../user-api/user-api.service';
import { LoginData } from './../../model/LoginData';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  isAuthenticated: boolean = false;
  constructor(private userApi: UserApiService, private router: Router) { }
  logout() {
    this.router.navigate(['']);
    this.isAuthenticated = false;
  }

}

