import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contract } from '../models/contract';
import { ViewContract } from '../models/view-contract';

interface viewContractResponse {
  suc: boolean,
  mes: string
}

@Injectable({
  providedIn: 'root'
})
export class ViewContractService {
  private readonly API_URL = 'http://localhost:5000/view-contracts/';
  private readonly API_URL_1 = 'http://localhost:5000/view-valid-contract/';
  obj_list: BehaviorSubject<ViewContract[]> = new BehaviorSubject<ViewContract[]>([]);
  obj_list_1: BehaviorSubject<ViewContract[]> = new BehaviorSubject<ViewContract[]>([]);
  constructor(private httpClient: HttpClient) { }

  public selectContracts(USERNAME_ACC): Observable<ViewContract[]> {
    this.httpClient.get<ViewContract[]>(this.API_URL + USERNAME_ACC).subscribe(data => {
    this.obj_list.next(data);
    })
    //console.log(this.obj_list[0])
    //console.log(this.obj_list);
    return this.obj_list.asObservable();
}

public selectValidContracts(USERNAME_ACC): Observable<ViewContract[]> {
  this.httpClient.get<ViewContract[]>(this.API_URL_1 + USERNAME_ACC).subscribe(data => {
  this.obj_list_1.next(data);
  })
  //console.log(this.obj_list[0])
  //console.log(this.obj_list);
  return this.obj_list_1.asObservable();
}
}
