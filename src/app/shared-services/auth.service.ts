import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { from, ReplaySubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { AuthService as SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenField = 'access';
  // private refreshTokenField = 'refresh';

  provider = new auth.GoogleAuthProvider();
  serverURL: string = environment.apiServer;
  token: string;

  constructor(
    public afAuth: AngularFireAuth,
    // tslint:disable-next-line:variable-name
    private _http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.provider.addScope('email');
    this.provider.addScope('profile');
  }

  loginGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    const dataSource = this.socialAuthService.authState.pipe(
      map(user => user.idToken),
      mergeMap(accessToken => {
        return this._http.post(`${this.serverURL}/api/auth/google`, {
          token: accessToken
        });
      })
    );
    const subject = new ReplaySubject<any>(1);
    subject.subscribe(
      result => {
        // tslint:disable-next-line:no-string-literal
        this.setAccessToken(result['token']);
      },
      err => {
        this.handleAuthenticationError(err);
      }
    );
    dataSource.subscribe(subject);
    return subject;
  }

  signOutGoogle(): void {
    this.socialAuthService.signOut();
  }

  login() {
    const dataSource = this.socialAuthService.authState.pipe(
      map(user => {
        console.log(user);
        return user.authToken;
      }),
      mergeMap(accessToken => {
        console.log(accessToken);
        return this._http.post(`${this.serverURL}/api/auth/google`, {
          token: accessToken
        });
      })
    );
    const subject = new ReplaySubject<any>(1);
    subject.subscribe(
      result => {
        console.log('subject');
        // tslint:disable-next-line:no-string-literal
        this.setAccessToken(result['token']);
      },
      err => {
        console.log('subject err');
        this.handleAuthenticationError(err);
      }
    );
    dataSource.subscribe(subject);
    return subject;
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  refresh() {
    const refreshSource = this._http.post(
      `${this.serverURL}/api/auth/refresh`,
      {
        token: this.getAccessToken()
      }
    );
    const subject = new ReplaySubject<any>(1);
    subject.subscribe(
      result => {
        // tslint:disable-next-line:no-string-literal
        this.setAccessToken(result['token']);
      },
      err => {
        this.handleAuthenticationError(err);
      }
    );
    refreshSource.subscribe(subject);
    return subject;
  }

  get isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private handleAuthenticationError(err: any) {
    // Only for authentication error codes
    // this.setAccessToken(null);
    console.log(err);
  }

  private setAccessToken(accessToken: string) {
    if (!accessToken) {
      localStorage.removeItem(this.accessTokenField);
    } else {
      localStorage.setItem(this.accessTokenField, accessToken);
    }
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenField);
  }
}
