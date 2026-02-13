import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly API_URL = 'https://www.arbeitnow.com/api/job-board-api';

  constructor(private http: HttpClient) {}

  getJobs(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.API_URL, { params });
  }
}