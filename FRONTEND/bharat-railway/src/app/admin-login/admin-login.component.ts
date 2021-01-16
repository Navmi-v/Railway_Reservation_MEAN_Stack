import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginAdminData = { email: '', password: '' }

  isLoginError = false;
  errorMsg1 = '';
 

  constructor(private _adminAuthService: AdminAuthService, private _router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  loginAdmin() {
    console.log(this.loginAdminData);
    this._adminAuthService.loginAdmin(this.loginAdminData)
      .subscribe(
        res => {
          console.log('Success', res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/admin'])
        }
        ,
        err => {
          console.log(err)
          //this._flashMessagesService.show(err.message , { cssClass: 'alert-danger', timeout: 3000 })

          this.isLoginError = true;
          console.log(this.isLoginError);
          this.errorMsg1 = err.error;
          this.ngOnInit();
        }
      )
  }

}
