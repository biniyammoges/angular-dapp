import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  events: any;
  keyword: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((res: any) => {
          this.keyword = res.params.keyword;
          if (!this.keyword) return this.router.navigate(['/']);

          return this.eventsService.getAll(this.keyword);
        })
      )
      .subscribe((events) => (this.events = events));
  }

  imgUrl(path: string) {
    return `${this.eventsService.url}${path}`;
  }
}
