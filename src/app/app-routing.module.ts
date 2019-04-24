import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { VoteListComponent } from './vote-list/vote-list.component';
import { VoteCompleteComponent } from './vote-complete/vote-complete.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'member/:id', component: MemberComponent, canActivate: [LoginGuard] },
  { path: 'vote-list', component: VoteListComponent, canActivate: [LoginGuard] },
  { path: 'vote-complete', component: VoteCompleteComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
