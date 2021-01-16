import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { PasswordValidator } from '../shared/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  get username(){
    return this.registrationForm.get('username');
  }
  get name(){
    return this.registrationForm.get('name');
  }
  get age(){
    return this.registrationForm.get('age');
  }
  get country(){
    return this.registrationForm.get('country');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get contact(){
    return this.registrationForm.get('contact');
  }
  get gender(){
    return this.registrationForm.get('gender');
  }


  constructor(private fb: FormBuilder, private _registerService: RegisterService, private _router: Router){}
  
  registrationForm = this.fb.group({
    username: ['',[Validators.required, Validators.minLength(5)]],
    password:['',[Validators.required]],
    confirmPassword: ['', [Validators.required]],
    name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    age:['', [Validators.required, Validators.min(18)]],
    country: ['', [Validators.required]],
    contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email: ['',[Validators.required, Validators.email]],
  },  {validator: PasswordValidator} )

  onSubmit(){
    console.log(this.registrationForm.value);
    this._registerService.register(this.registrationForm.value)
    .subscribe(
      res => {console.log('Success', res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/ticket'])},
      error => console.log('Error!', error)
    );
  }
}
// , Validators.email  , Validators.pattern('^\d{10)$') , Validators.min(18)