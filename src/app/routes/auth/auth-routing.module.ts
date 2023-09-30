import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from 'src/app/services/guards/LoginGuard.guard';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from 'src/app/services/guards/AuthGuard.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Extra Store',
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register - Extra Store',
    canActivate: [LoginGuard],
  },
  {
    path: 'profile',
    component: UserComponent,
    title: 'Profile - Extra Store',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
