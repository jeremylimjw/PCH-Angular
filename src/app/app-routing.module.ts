import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { RegisterComponent } from './register/register.component';
import { AntiAuthGuard } from './guards/anti-auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent, canActivate: [AntiAuthGuard]},
  { path: "register", component: RegisterComponent, canActivate: [AntiAuthGuard]},
  { path: "new", component: CreateAppointmentComponent, canActivate: [AuthGuard]},
  { path: "appointments", component: ManageAppointmentsComponent, canActivate: [AuthGuard]},
  { path: "account", component: ManageAccountComponent, canActivate: [AuthGuard]},
  { path: "welcome", component: WelcomeComponent, canActivate: [AntiAuthGuard]},
  { path: 'appointment', component: ViewAppointmentComponent, canActivate: [AuthGuard] },
  { path: '**',  redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
