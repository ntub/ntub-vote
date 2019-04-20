import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getApi<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  postApi<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
