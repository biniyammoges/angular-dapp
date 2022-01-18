import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardResolver } from './dashboard/dashboard.resolver';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventComponent } from './event/event.component';
import { EventResolver } from './event/event.resolver';
import { EventsComponent } from './events/events.component';
import { EventsResolver } from './events/events.resolver';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './services/auth-guard.service';
import { OwnerGuard } from './services/owner-guard.service';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    canActivate: [AuthGuard],
    resolve: {
      events: EventsResolver,
    },
  },
  {
    path: 'events/new',
    component: AddEventComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'events/:id',
    component: EventComponent,
    canActivate: [AuthGuard],
    resolve: {
      event: EventResolver,
    },
  },
  {
    path: 'events/:id/edit',
    component: EditEventComponent,
    canActivate: [AuthGuard, OwnerGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      events: DashboardResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/edit/:id',
    component: EditEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
