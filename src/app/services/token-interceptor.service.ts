import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { SignupService } from './signup.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let signupService = this.injector.get(SignupService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ${signupService.getToken()}'
      }
    })
    return next.handle(tokenizedReq)
  }
}
