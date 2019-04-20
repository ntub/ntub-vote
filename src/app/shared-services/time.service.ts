import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Time } from '../model/time.model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class TimeService {
    apiServer = environment.apiServer;
    constructor(private http: HttpClient) {
    }

    getTime(): Observable<Time> {
        return this.http.get<Time>(`/api/time`);
    }

    async isVoteTime(): Promise<boolean> {
        const result = await this.getTime().toPromise();
        return result.isVoteTime;
    }
}
