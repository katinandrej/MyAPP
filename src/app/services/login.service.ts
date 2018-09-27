import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface loginResponse {
  suc: boolean,
  uname: string,
  mes: string,
  token: string,
  admin: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_URL = 'http://localhost:5000/login';

  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  public activeUser: String = "";

  constructor(private httpClient: HttpClient) { }

  public loginUser(user) {
    return this.httpClient.post<loginResponse>(this.API_URL, user);
  }
}
