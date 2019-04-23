import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { VoteListComponent } from './vote-list/vote-list.component';
import { VoteCompleteComponent } from './vote-complete/vote-complete.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'member/:id', component: MemberComponent },
  { path: 'vote-list', component: VoteListComponent },
  { path: 'vote-complete', component: VoteCompleteComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
