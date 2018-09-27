import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AbsenceService } from '../services/absence.service';
import { Absence } from '../models/absence';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  providers: [AbsenceService]
})
export class AbsenceComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private absenceService: AbsenceService) { }

  user_name: String = "";
  start: any = "";
  end: any = "";
  reason: String = "";

  data1: any = {}

  list: Absence[] = []

  ngOnInit() {
    this.absenceService.getAbsence().subscribe(absence =>
      this.list = absence);
      //console.log(this.list);
  }

  add() {
    //console.log("Username: " + this.user_name + ", start date: " + this.start + ", end date: " + this.end + ", reason: " + this.reason)
    //this.data_list =  this.absenceService.getAbsence()
    /*this.absenceService.getAbsence().subscribe(absence =>
        this.list = absence);*/
    this.absenceService.addAbsence(this.data1).subscribe(data => {
      console.log(data.suc);
      if (data.suc) {
        this.router.navigateByUrl("/dashboard")
        alert("Successfully added absence!")
      } else {
      alert("Error with adding absence!")
      }
    })
    //console.log(this.data1);
  }

  logout() {
    this.loginService.isLogged = false
    this.router.navigateByUrl("/login")
  }

}
