import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../errors/app-error';
import { EventsService } from '../events/events.service';
import { AuthService } from '../services/auth.service';
import { DatePipe, formatDate } from '@angular/common';
import { ForbiddenError } from '../errors/forbidden-error';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  form: any;
  imgUrl: any;
  event: any = {};
  id: any = null;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      name: ['', [Validators.minLength(3)]],
      venue: ['', [Validators.minLength(3)]],
      date: [''],
      time: [''],
      image: [null],
      description: ['', [Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    this.eventsService.getOne(this.id).subscribe({
      next: (res: any) => {
        this.event = res;
        if (res.user.id !== this.authService.currentUser.id)
          this.router.navigate(['/']);
        this.imgUrl = `${this.authService.url}${res.image}`;
      },
    });
  }

  dateFormat() {
    return formatDate(this.event.date, '0:mm/dd/yyyy', 'en-US');
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('venue', this.form.value.venue);
    formData.append('date', this.form.value.date);
    formData.append('time', this.form.value.time);
    this.image && formData.append('image', this.form.value.image);
    formData.append('description', this.form.value.description);

    this.eventsService.updateEvent(this.id, formData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/events', res.id]);
      },
      error: (error: AppError) => {
        if (error instanceof ForbiddenError) return this.router.navigate(['/']);
        return this.form.setErrors({
          serverError: { msg: error.originalError.error.message },
        });
      },
    });
  }

  removePreview() {
    this.form.patchValue({
      image: null,
    });
    this.imgUrl = null;
  }

  onImageSelect(e: any) {
    if (e.target.files) {
      const file = e.target.files[0];
      this.form.get('image').setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }

  get name() {
    return this.form.get('name');
  }

  get venue() {
    return this.form.get('venue');
  }

  get date() {
    return this.form.get('date');
  }

  get time() {
    return this.form.get('time');
  }

  get image() {
    return this.form.get('image');
  }

  get description() {
    return this.form.get('description');
  }
}
