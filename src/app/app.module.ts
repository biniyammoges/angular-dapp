import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SummaryPipe } from 'src/pipes/summary.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { InterceptorService } from './loader/interceptor.service';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    LoginComponent,
    RegisterComponent,
    EventComponent,
    EditEventComponent,
    AddEventComponent,
    DashboardComponent,
    NotFoundComponent,
    HeaderComponent,
    SummaryPipe,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgProgressModule.withConfig({
      color: 'blue',
      spinner: false,
    }),
    NgProgressHttpModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
