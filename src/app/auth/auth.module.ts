import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchPassword } from './validators/match-password';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    MatchPassword,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class AuthModule { }
