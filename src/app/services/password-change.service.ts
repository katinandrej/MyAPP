import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface passwordResponse {
  suc: boolean,
  mes: string
}

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {
  private readonly API_URL = 'http://localhost:5000/password-change';

  constructor(private httpClient: HttpClient) { }

  public changePassword(user) {
    return this.httpClient.post<passwordResponse>(this.API_URL, user);
  }
}
