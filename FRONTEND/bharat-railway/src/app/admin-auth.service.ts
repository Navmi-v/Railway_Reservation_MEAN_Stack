import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private _adminlogin = 'http://localhost:4040/admin/login';

  constructor(private _http: HttpClient,
    private _router: Router) { }

  loginAdmin(adminData){
    return this._http.post<any>(this._adminlogin, adminData)
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }
}
