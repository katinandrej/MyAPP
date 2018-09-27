import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  first_name: String = "";
  last_name: String = "";
  username1: String = "";
  password1: String = "";
  conf_password1: String = "";

  constructor(private router: Router, public signupService: SignupService, public loginService: LoginService) { }

  ngOnInit() {
  }

  data1 ={}

  signup () {
    /*console.log("First name: " + this.first_name + ", last name: " + this.last_name + ", username: " + this.username1 +
      ", password: " + this.password1 + ", confirm password: " + this.conf_password1);
    console.log(this.data);*/
    if (this.conf_password1 == this.password1 && this.password1 != null && this.password1 != "") {
      this.signupService.addUser(this.data1).subscribe(data => {
        console.log(data.suc)
        if (data.suc && data.token) {
          this.router.navigateByUrl("/dashboard")
          alert("Successfully registered!")
          this.loginService.isLogged = true;
        } else {
          alert("Username already exists!")
          this.loginService.isLogged = false;
        }
      })
    } else {
      alert("Passwords don't match!");
    }
  }


}
