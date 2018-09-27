import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {  } from 'rxjs';
import { Absence } from '../models/absence';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard';
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private readonly API_URL = 'http://localhost:5000/absences/';

    constructor(private httpClient: HttpClient) { }
    obj_list: BehaviorSubject<Dashboard[]> = new BehaviorSubject<Dashboard[]>([]);

    public getEvents(): Observable<Dashboard[]> {
        this.httpClient.get<Dashboard[]>(this.API_URL).subscribe(data => {
        this.obj_list.next(data);
        })
        //console.log(this.obj_list[0])
        return this.obj_list.asObservable();
        }

    public getUserEvents(USERNAME_ACC): Observable<Dashboard[]> {
        this.httpClient.get<Dashboard[]>(this.API_URL + USERNAME_ACC).subscribe(data => {
        this.obj_list.next(data);
        })
        //console.log(this.obj_list[0])
        return this.obj_list.asObservable();
    }
}
