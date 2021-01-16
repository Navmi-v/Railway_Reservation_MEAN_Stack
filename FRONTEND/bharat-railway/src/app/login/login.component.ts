import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserData = { email: '', password: ''}

  isLoginError = false;
  errorMsg1 = '';
 
 

  constructor( private _registerService: RegisterService, private _router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  } 
  loginUser(){
    console.log(this.loginUserData);
    this._registerService.login(this.loginUserData)
    .subscribe(
      res => {console.log('Success', res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/ticket'])}
      ,
      err => { console.log(err)
        this.isLoginError = true;
        console.log(this.isLoginError);
        this.errorMsg1 = err.error;
        this.ngOnInit();
      }
    )
  }

  

}
