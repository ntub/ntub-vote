import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { VoteListComponent } from './vote-list/vote-list.component';
import { VoteCompleteComponent } from './vote-complete/vote-complete.component';
import { LoginGuard } from './guards/login.guard';
import { ResultComponent } from './result/result.component';
import { ResultGuard } from './guards/result.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'member/:id', component: MemberComponent, canActivate: [LoginGuard] },
  {
    path: 'vote-list',
    component: VoteListComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'vote-complete',
    component: VoteCompleteComponent,
    canActivate: [LoginGuard]
  },
  { path: 'result', component: ResultComponent, canActivate: [ResultGuard] },
  { path: 'result1', component: ResultComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
