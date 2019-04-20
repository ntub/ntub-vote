import { environment } from '../environments/environment';
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './shared-services/refresh-token-interceptor';
import { AuthService } from './shared-services/auth.service';


export function jwtOptionsFactory(authorizationService: AuthService) {
  return {
    tokenGetter: () => {
      return authorizationService.getAccessToken();
    },
    whitelistedDomains: [environment.apiServer],
    blacklistedRoutes: []
  };
}

export const JWTModule = JwtModule.forRoot({
  jwtOptionsProvider: {
    provide: JWT_OPTIONS,
    useFactory: jwtOptionsFactory,
    deps: [AuthService]
  }
});

export const JWTInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: JwtInterceptor,
  multi: true
};

export const RefreshTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshTokenInterceptor,
  multi: true
};
