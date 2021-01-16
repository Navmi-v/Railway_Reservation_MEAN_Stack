import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TicketComponent } from './ticket/ticket.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'Adminlogin', component:AdminLoginComponent},
  {path: 'ticket', component: TicketComponent, canActivate: [AuthGuard]},
 // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//canAdminActivate: [AuthGuard]
