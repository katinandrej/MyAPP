import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface contractResponse {
  suc: boolean,
  mes: string
}

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  private readonly API_URL = 'http://localhost:5000/contract';

  constructor(private httpClient: HttpClient) { }

  public addContract(user) {
    return this.httpClient.post<contractResponse>(this.API_URL, user);
  }
}
