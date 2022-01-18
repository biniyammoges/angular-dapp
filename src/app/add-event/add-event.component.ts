import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from '../errors/app-error';
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  form: any;
  imgUrl: any;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private router: Router
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      venue: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      image: [null, Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('venue', this.form.value.venue);
    formData.append('date', this.form.value.date);
    formData.append('time', this.form.value.time);
    formData.append('image', this.form.value.image);
    formData.append('description', this.form.value.description);

    this.eventsService.createEvent(formData).subscribe({
      next: (res: any) => {
        this.router.navigate(['/events', res.id]);
      },
      error: (error: AppError) => {
        if (error instanceof AppError)
          this.form.setErrors({
            unknownError: { msg: error.originalError.error.message },
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
