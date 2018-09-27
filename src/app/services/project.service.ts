import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Project_1 } from '../models/project';

@Injectable()
export class ProjectService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(public httpClient: HttpClient) { }

  public addProject(project){
    return this.httpClient.post<any>(this.API_URL, project).subscribe();
  }
}
