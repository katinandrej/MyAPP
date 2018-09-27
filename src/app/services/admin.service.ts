import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Dashboard } from '../models/dashboard';

interface adminResponse {
  suc: boolean,
  mes: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = 'http://localhost:5000/admin/'

  constructor(private httpClient: HttpClient) { }

  public deleteEvent(id: number) {
    return this.httpClient.delete<adminResponse>(this.API_URL + id);
  }

  public updateEvent(id, event) {
    return this.httpClient.put<adminResponse>(this.API_URL + id, event);
  }

}
