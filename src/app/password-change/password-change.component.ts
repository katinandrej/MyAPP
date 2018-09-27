import { Component, OnInit } from '@angular/core';
import { Absence } from '../models/absence';
import { LoginService } from '../services/login.service';
import { AbsenceService } from '../services/absence.service';
import { PasswordChangeService } from '../services/password-change.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  admin: boolean = this.loginService.isAdmin;
  list: Absence[] = []
  password1: String = "";
  conf_password1: String = "";
  data1 ={}

  constructor(private loginService: LoginService, private absenceService: AbsenceService, 
    private passwordChangeService: PasswordChangeService, private router: Router) { }

  ngOnInit() {
    this.absenceService.getAbsence().subscribe(absence =>
      this.list = absence);
  }

  changePassword() {
    if (this.conf_password1 == this.password1 && this.password1 != null && this.password1 != "") {
      this.passwordChangeService.changePassword(this.data1).subscribe(data => {
        if (data.suc) {
          //console.log(this.token)
          this.router.navigateByUrl("/dashboard")
          alert("Successfully changed password!")
        } else {
        alert("Error with changing password!")
        }
      })

    } else {
      alert("Passwords don't match!");
    }
  }

}
