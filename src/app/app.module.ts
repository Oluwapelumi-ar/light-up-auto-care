import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services/services.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
