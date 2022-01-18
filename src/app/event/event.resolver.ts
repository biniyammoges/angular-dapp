import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root',
})
export class EventResolver implements Resolve<Event> {
  constructor(private events: EventsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | any {
    const id = route.paramMap.get('id') as string;
    return this.events.getOne(id);
  }
}
