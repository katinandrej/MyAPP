import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface signupResponse {
  suc: boolean,
  mes: string,
  token: string
}

interface myData {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class SignupService {
  private readonly API_URL = 'http://localhost:5000/signup';

  constructor(private httpClient: HttpClient) { }

  public addUser(user) {
    return this.httpClient.post<signupResponse>(this.API_URL, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
