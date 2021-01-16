import { Component } from '@angular/core';
import { RegisterService } from './register.service';
import { AdminAuthService } from './admin-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bharat-railway';

  constructor( public registerService: RegisterService,
     public adminAuthService: AdminAuthService){}
}
