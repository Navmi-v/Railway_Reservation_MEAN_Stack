import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { RegisterService } from './register.service';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req,next){
    let registerService = this.injector.get(RegisterService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${registerService.getToken}` //${registerService.getToken}
      }
    })
    return next.handle(tokenizedReq)
  }

  // interceptAdmin(req,next){
  //   let adminAuthService = this.injector.get(AdminAuthService)
  //   let tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${adminAuthService.getAdminToken}`
  //     }
  //   })
  //   return next.handle(tokenizedReq)
  // }
}
