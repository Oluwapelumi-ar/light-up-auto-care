import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { InvoiceComponent } from './invoice/invoice.component';
import { StaffComponent } from './our-staff/staff/staff.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { StaffModalComponent } from './our-staff/staff-modal/staff-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CapitalizePipe } from './capitalize.pipe';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';
import { NgxPaginationModule } from 'ngx-pagination';
import { VehicleDashboardComponent } from './Vehicle/vehicle-dashboard/vehicle-dashboard.component';
import { ServiceDashboardComponent } from './Type-of-Services/service-dashboard/service-dashboard.component';
import { ClientComponent } from './Client-Dashboard/client/client.component';
import { QuotePageComponent } from './quote/quote-page/quote-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    ClientComponent,
    InvoiceComponent,
    StaffComponent,
    // StaffModalComponent,
    CapitalizePipe,
    QuotePageComponent ,
    VehicleDashboardComponent,
    ServiceDashboardComponent,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot(),
    AvatarModule,
    NgxPaginationModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  // entryComponents: [ModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
