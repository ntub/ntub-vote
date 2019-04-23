import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { VotePool, VotePoolDetail, SendVote } from '../model/vote-pool.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VotePoolService {
  apiServer = environment.apiServer;
  constructor(private http: HttpClient) { }

  getVotePools(): Observable<VotePool[]> {
      return this.http.get<VotePool[]>('/api/vote-pools');
  }

  getVotePool(id: number): Observable<VotePoolDetail> {
      return this.http.get<VotePoolDetail>(`/api/vote-pools/${id}`);
  }

  createVote(vote: SendVote): Observable<any> {
    return this.http.post<any>('/api/votes', {
      candidate: vote.id,
      is_agree: vote.isAgree
    });
  }
}
