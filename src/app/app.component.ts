import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from './errors/app-error';
import { UnAuthorizedError } from './errors/unauthorized-error';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getToken() &&
      this.authService.getLoggedInUser().subscribe({
        error: (error: AppError) => {
          if (error instanceof UnAuthorizedError) {
            this.router.navigate(['/']);
          }
        },
      });
  }
}
