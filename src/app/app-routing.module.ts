import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginGuard } from './guards/login.guard'
import { ResultGuard } from './guards/result.guard'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { LogoutComponent } from './logout/logout.component'
import { MemberComponent } from './member/member.component'
import { ResultComponent } from './result/result.component'
import { VoteCompleteComponent } from './vote-complete/vote-complete.component'
import { VoteListComponent } from './vote-list/vote-list.component'

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
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
