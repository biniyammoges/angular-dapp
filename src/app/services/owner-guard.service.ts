import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { EventsService } from '../events/events.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private eventsService: EventsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const user = this.authService.currentUser;
    const eventId: any = route.paramMap.get('id');
    return this.eventsService.getOne(eventId).pipe(
      map((event: any) => {
        if (event.user.id !== user.id) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
