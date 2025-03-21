import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './data.services';
import { CreateLogin } from '../models/create-login.model';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AuthenticationService extends DataService {
  private _baseUrl: string;
  private _isUserLoggedIn$ = new BehaviorSubject<boolean>(false); //TODO: Check proper implementation
  public isLoggedIn$ = this._isUserLoggedIn$.asObservable();
  
  constructor(http: HttpClient, private jwtHelper: JwtHelperService, private storage: StorageService) {     
    super(environment.apiUrl, http);
    this._baseUrl = environment.apiUrl;
  }
  
  get CurrentUser() {
    let token = this.storage.get('token') as string;
    if (!token) {
      return null;
    } 
    let expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    let isExpired = this.jwtHelper.isTokenExpired(token);

    if (isExpired) {
      return null;
    }

    let user = User.mapUserToken(this.jwtHelper.decodeToken(token));
    //TO DO ADD USER INFO TO USER OBJ
    return user;
  }

  createUser(user: CreateLogin) {
    return this.urlCreate('UserManager/CreateUser', user);
  }

  isLoggedIn(): boolean {
    
    let token = this.storage.get('token') as string;

    if (!token) {
      return false;
    } 
    
    let expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    let isExpired = this.jwtHelper.isTokenExpired(token);
    //return this._isUserLoggedIn$.value;  
    this._isUserLoggedIn$.next(!isExpired);

    return !isExpired;
  }

  login(email: string, password: string) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'text/plain' // Set Content-Type to text/plain
    //   }),
    //   responseType: 'text' // Expect plain text response
    // };    
    return this.urlCreate('UserManager/Login', { "Email" : email, "Password": password })
  }
  
  logout() {
    debugger;
    this._isUserLoggedIn$.next(false);
    this.storage.remove('token');    
  }    
}
