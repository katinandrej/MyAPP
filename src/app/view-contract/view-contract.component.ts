import { Component, OnInit } from '@angular/core';
import { Absence } from '../models/absence';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AbsenceService } from '../services/absence.service';
import { ViewContractService } from '../services/view-contract.service';
import { Contract } from '../models/contract';
import { ViewContract } from '../models/view-contract';

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.css']
})
export class ViewContractComponent implements OnInit {

  admin: boolean = this.loginService.isAdmin;
  isAvailable: boolean = false;
  list: Absence[] = []
  data1 = {};
  USERNAME_ACC: string = "";
  contracts: ViewContract[] = [];
  contracts_valid: ViewContract[] = [];
  user: string = "";

  constructor(private loginService: LoginService, private router: Router, 
    private absenceService: AbsenceService, private viewContractService: ViewContractService) { }

  ngOnInit() {
    this.absenceService.getAbsence().subscribe(absence =>
      this.list = absence);
  }

  selectContracts() {
    this.user = this.USERNAME_ACC;
    this.contracts = [];
    this.viewContractService.selectContracts(this.USERNAME_ACC).subscribe(data => {
      this.isAvailable = true;
      this.contracts = data;
    });
  }


  logout() {
    this.loginService.isLogged = false
    this.router.navigateByUrl("/login")
  }

}
