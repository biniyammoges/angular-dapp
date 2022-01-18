import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events$: any;

  constructor(
    private eventsService: EventsService,
    public loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.events$ = route.data.pipe(map((data) => data['events']));
  }

  ngOnInit(): void {}

  imageUrl(path: string) {
    return `${this.eventsService.url}${path}`;
  }
}
