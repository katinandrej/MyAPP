import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupService } from './services/signup.service';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private signupService: SignupService, private loginService: LoginService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.isLogged == true) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}
