import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { VehicleComponent } from './Our-vehicle/vehicle/vehicle.component';
import { ServicesComponent } from './our-services/services/services.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QuoteComponent } from './quote/quote.component';
import { StaffComponent } from './our-staff/staff/staff.component';
import { AuthguardGuard } from './auth/authguard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'client', component: ClientComponent},
  { path: 'vehicle', component: VehicleComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'quote', component: QuoteComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: 'staff', component: StaffComponent,canActivate: [AuthguardGuard] },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthguardGuard]
})
export class AppRoutingModule {}
