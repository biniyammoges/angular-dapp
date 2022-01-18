import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get currentUser() {
    return this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  submit(form: NgForm) {
    if (!form.value.keyword) return;

    this.router.navigate(['/search'], {
      queryParams: { keyword: form.value.keyword },
    });
  }
}
