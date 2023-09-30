import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { DataViewerComponent } from 'src/app/components/data-viewer/data-viewer.component';
import { ErrorComponent } from 'src/app/components/Auth/error/error.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserComponent,
    // DataViewerComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AngularMaterialModule,
    FontAwesomeModule,
  ],
})
export class AuthModule {}
