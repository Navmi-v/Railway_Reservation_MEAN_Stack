import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _adminAuthService: AdminAuthService,
    private _router: Router) {}

    canActivate(): boolean{
      if(this._adminAuthService.loggedIn() ){
        return true
      } else {
        this._router.navigate(['/Adminlogin'])
        return false
      }
    }
  
}
