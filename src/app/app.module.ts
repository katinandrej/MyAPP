import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AbsenceComponent } from './absence/absence.component';
import { UserReportComponent } from './user-report/user-report.component';
import { LoginService } from './services/login.service';
import { ProjectService } from './services/project.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DashboardService } from './services/dashboard.service';
import { FullCalendarModule } from 'ng-fullcalendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbsenceService } from './services/absence.service';
import { AdminGuard } from './admin.guard';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ContractComponent } from './contract/contract.component';
import { ViewContractComponent } from './view-contract/view-contract.component';

const Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'absence', component: AbsenceComponent, canActivate: [AdminGuard] },
  { path: 'userReport', component: UserReportComponent, canActivate: [AuthGuard] },
  { path: 'password-change', component: PasswordChangeComponent, canActivate: [AdminGuard] },
  { path: 'contract', component: ContractComponent, canActivate: [AdminGuard] },
  { path: 'view-contracts', component: ViewContractComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AdminComponent,
    AbsenceComponent,
    UserReportComponent,
    PasswordChangeComponent,
    ContractComponent,
    ViewContractComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(Routes),
    FormsModule, NgbModalModule.forRoot(), FlatpickrModule.forRoot(),
    CalendarModule.forRoot(), FullCalendarModule, BrowserAnimationsModule
  ],
  providers: [ProjectService, DashboardService ,AuthGuard, AbsenceService, DashboardComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

