import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { QuoteComponent } from './quote/quote.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StaffComponent } from './staff/staff.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServicesComponent,
    HeaderComponent,
    SideMenuComponent,
    QuoteComponent,
    InvoiceComponent,
    StaffComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
