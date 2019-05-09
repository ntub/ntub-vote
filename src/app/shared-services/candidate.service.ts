import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Candidate, CandidateResult } from '../model/candidate.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  apiServer = environment.apiServer;
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiServer}/api/candidates`);
  }

  getCandidate(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiServer}/api/candidates/${id}`);
  }

  getCandidateResult(): Observable<CandidateResult[]> {
    return this.http.get<CandidateResult[]>(
      `${this.apiServer}/api/candidates/result`
    );
  }
}
