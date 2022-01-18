import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class EventsResolver implements Resolve<Event[]> {
  constructor(private events: EventsService) {}

  resolve(): Observable<any> | any {
    return this.events.getAll();
  }
}
