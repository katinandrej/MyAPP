import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../services/absence.service';
import { Router } from '@angular/router';
import { Contract } from '../models/contract';
import { Absence } from '../models/absence';
import { ContractService } from '../services/contract.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  data1 ={}
  list: Absence[] = []
  admin: boolean = this.loginService.isAdmin;

  constructor(private absenceService: AbsenceService, private router: Router,
      private loginService: LoginService, private contractService: ContractService) { }

  ngOnInit() {
    this.absenceService.getAbsence().subscribe(absence =>
      this.list = absence);
  }

  addContract() {
    this.contractService.addContract(this.data1).subscribe(data => {
      if (data.suc) {
        this.router.navigateByUrl("/dashboard")
        alert("Successfully added contract!")
      } else {
        alert("Error with adding!")
      }
    })
  }

}
