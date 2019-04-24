import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PresidentComponent } from './home/president/president.component';
import { CouncilorComponent } from './home/councilor/councilor.component';
import { RepresentativeComponent } from './home/representative/representative.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { MemberComponent } from './member/member.component';
import { MemberItemComponent } from './member/member-item/member-item.component';
import { VoteCompleteComponent } from './vote-complete/vote-complete.component';
import { VoteListComponent } from './vote-list/vote-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestHttpInterceptor } from './shared-services/response.interceptor';
import { AuthService } from './shared-services/auth.service';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { JWTInterceptorProvider, RefreshTokenInterceptorProvider, JWTModule } from './jwt.config';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    PresidentComponent,
    CouncilorComponent,
    RepresentativeComponent,
    MemberComponent,
    MemberItemComponent,
    VoteCompleteComponent,
    VoteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    JWTModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestHttpInterceptor, multi: true },
    AuthService,
    JwtInterceptor,
    JWTInterceptorProvider,
    RefreshTokenInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
