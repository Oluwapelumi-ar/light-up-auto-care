import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { VehicleComponent } from './Our-vehicle/vehicle/vehicle.component';
import { ServicesComponent } from './our-services/services/services.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { QuotePageComponent } from './quote-page/quote-page.component';
import { StaffComponent } from './our-staff/staff/staff.component';
import { AuthguardGuard } from './auth/authguard.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate: [AuthguardGuard] },
  { path: 'client', component: ClientComponent,canActivate: [AuthguardGuard] },
  { path: 'vehicle', component: VehicleComponent,canActivate: [AuthguardGuard] },
  { path: 'services', component: ServicesComponent,canActivate: [AuthguardGuard] },
  { path: 'quote', component: QuotePageComponent,canActivate: [AuthguardGuard] },
  { path: 'invoice', component: InvoiceComponent,canActivate: [AuthguardGuard] },
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
