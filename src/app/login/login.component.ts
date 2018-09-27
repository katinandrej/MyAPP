import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = "";
  password: String = "";
  data1: any = {}
  token: String = "";
  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    //console.log("Username: " + this.username + ", Password: " + this.password);
    this.loginService.loginUser(this.data1).subscribe(data => {
      //console.log(data.suc)
      this.token = data.token;
      this.loginService.isAdmin = data.admin;
      this.loginService.activeUser = data.uname;
      if (data.suc && data.token !== null) {
        //console.log(this.token)
        this.router.navigateByUrl("/dashboard")
        this.loginService.isLogged = true;
        alert("Successfully logged in!")
      } else {
      alert("Error with logging!")
      this.loginService.isLogged = false;
      }
    })
    //this.router.navigateByUrl("/dashboard")
  }

}
