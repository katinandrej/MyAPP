import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly API_URL = 'http://localhost:5000/proc-group';
  private readonly API_URL_1 = 'http://localhost:5000/proc-user';

  constructor(private httpClient: HttpClient) { }

  public reportGroup(report) {
    return this.httpClient.post<any>(this.API_URL, report);
  }

  public reportUser(report) {
    return this.httpClient.post<any>(this.API_URL_1, report);
  }
}
