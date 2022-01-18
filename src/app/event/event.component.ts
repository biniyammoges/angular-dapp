import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../events/events.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  event: any;
  isOwner: boolean = false;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.event = data.event;
      if (
        this.authService.currentUser &&
        this.authService.currentUser.id === data.event.user.id
      ) {
        this.isOwner = true;
      }
    });
  }

  imgUrl(path: string) {
    return this.eventsService.url + path;
  }
}
