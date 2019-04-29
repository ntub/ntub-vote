import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { TimeService } from '../shared-services/time.service';

@Injectable({
  providedIn: 'root'
})
export class ResultGuard implements CanActivate {
  constructor(private timeService: TimeService, public router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (await this.timeService.isEnd()) {
      console.log('Result Guard');
      this.router.navigate(['/home']);
    }
    return await this.timeService.isEnd();
  }
}
