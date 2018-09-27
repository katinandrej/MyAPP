import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AbsenceService } from '../services/absence.service';
import { Absence } from '../models/absence';
import { ReportService } from '../services/report.service';
import { Report } from '../models/report';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  admin: boolean = this.loginService.isAdmin;
  activeUser: String = this.loginService.activeUser;
  report: Report = {"REPORT_DESCRIPTION": '', 'USER': ''};
  

  constructor(private loginService: LoginService, private router: Router,
     private absenceService: AbsenceService, private reportService: ReportService) { }

  ngOnInit() {
    
  }

  groupReport() {
    this.report.REPORT_DESCRIPTION = 'Group report';
    this.report.USER = this.activeUser;
    this.reportService.reportGroup(this.report).subscribe();
  }

  userReport() {
    this.report.REPORT_DESCRIPTION = 'User report';
    this.report.USER = this.activeUser;
    this.reportService.reportUser(this.report).subscribe();
  }

  logout() {
    this.loginService.isLogged = false
    this.router.navigateByUrl("/login")
  }

}
