import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthService, private jwtInterceptor: JwtInterceptor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtInterceptor.isWhitelistedDomain(req) && !this.jwtInterceptor.isBlacklistedRoute(req)) {
      return next.handle(req).pipe(
        catchError((err) => {
          const errorResponse = err as HttpErrorResponse;
          if (errorResponse.status === 401) {
            return this.authorizationService.refresh().pipe(mergeMap(() => {
              return this.jwtInterceptor.intercept(req, next);
            }));
          }
          return throwError(err);
        }));
    } else {
      // return this.authorizationService.refresh().pipe(mergeMap(() => {
      //   return this.jwtInterceptor.intercept(req, next);
      // }));
      return next.handle(req);
    }
  }
}
