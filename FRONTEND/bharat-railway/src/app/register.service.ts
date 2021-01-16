import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

 
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _registerUrl = 'http://localhost:8080/passenger/register';
  private _loginUrl = 'http://localhost:8080/passenger/login';

  constructor(private _http: HttpClient,
    private _router: Router) { }

  register(userData){
    return this._http.post<any>(this._registerUrl, userData);
  }

  login(userData){
    return this._http.post<any>(this._loginUrl, userData)
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
