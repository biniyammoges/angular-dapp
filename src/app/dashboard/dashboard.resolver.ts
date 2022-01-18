import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../events/event.model';
import { EventsService } from '../events/events.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<Event[]> {
  constructor(private events: EventsService) {}

  resolve(): Observable<any> | Promise<Event[]> {
    return this.events.getMyEvents();
  }
}
