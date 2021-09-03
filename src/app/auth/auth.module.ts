import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchPassword } from './validators/match-password';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoginComponent,
    CreatePasswordComponent,
    MatchPassword,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
