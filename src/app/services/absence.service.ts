import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { Absence } from "../models/absence"



interface absenceResponse {
  suc: boolean,
  mes: string
}

@Injectable()
export class AbsenceService {

  private readonly API_URL = 'http://localhost:5000/absence';
  private readonly API_URL_1 = 'http://localhost:5000/absencepost';
  obj_list: BehaviorSubject<Absence[]> = new BehaviorSubject<Absence[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAbsence(): Observable<Absence[]> {
     this.httpClient.get<Absence[]>(this.API_URL).subscribe(data => {
      this.obj_list.next(data);
      //console.log(this.obj_list);
      //console.log(data[0])
      //console.log(data.length)
    })
    //console.log(this.obj_list[0])
    return this.obj_list.asObservable();
  }

  public addAbsence(absence) {
    //console.log(absence);
    //console.log(this.API_URL_1)
    return this.httpClient.post<absenceResponse>(this.API_URL_1, absence);
  }
}
