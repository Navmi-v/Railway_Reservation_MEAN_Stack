import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './register.service';
import { TrainsService } from './trains.service';
import { TicketComponent } from './ticket/ticket.component';
import { TicketService } from './ticket.service';
import { AdminService } from './admin.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { AdminAuthService } from './admin-auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { AdminGuard } from './admin.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NgxPayPalModule } from 'ngx-paypal';
import { WindowRefService } from './window-ref.service';




@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AdminComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TicketComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FlashMessagesModule.forRoot(),
    NgxPayPalModule
  ],
  providers: [
    RegisterService,
    TrainsService,
    TicketService,
    AdminService,
    AdminAuthService,
    AuthGuard,
    AdminGuard,
    WindowRefService
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
