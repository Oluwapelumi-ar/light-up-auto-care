import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import {HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
=======
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  JsonpInterceptor,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreatePasswordComponent } from './auth/create-password/create-password.component';
>>>>>>> 3d17640cd688c9ef21782e36f8c2b9c781149ee6
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './our-services/services/services.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
<<<<<<< HEAD
import { QuoteComponent } from './quote/quote.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StaffComponent } from './staff/staff.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';


=======
import { ClientComponent } from './client/client.component';
import { VehicleComponent } from './Our-vehicle/vehicle/vehicle.component';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { QuoteComponent } from './quote/quote.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StaffComponent } from './staff/staff.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalComponent } from './client/client-modal/client-modal.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ModalComponent } from './our-services/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
>>>>>>> 3d17640cd688c9ef21782e36f8c2b9c781149ee6

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    HeaderComponent,
    SideMenuComponent,
    ClientComponent,
    VehicleComponent,
    ClientModalComponent,
    FooterComponent,
    ModalComponent,
    QuoteComponent,
    InvoiceComponent,
    StaffComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
