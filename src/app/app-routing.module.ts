import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuotePageComponent } from './quote/quote-page/quote-page.component';
import { VehicleDashboardComponent } from './Vehicle/vehicle-dashboard/vehicle-dashboard.component';
import { ClientComponent } from './Client-Dashboard/client/client.component';

import { InvoiceComponent } from './invoice/invoice.component';
import { StaffComponent } from './our-staff/staff/staff.component';
import { AuthguardGuard } from './auth/authguard.guard';
import { RoleGuard } from './auth/role.guard';
import { ServiceDashboardComponent } from './Type-of-Services/service-dashboard/service-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthguardGuard] },
  // { path: 'client', component: ClientComponent,canActivate: [AuthguardGuard] },
  // { path: 'vehicle', component: VehicleComponent,canActivate: [AuthguardGuard] },
  // { path: 'services', component: ServicesComponent,canActivate: [AuthguardGuard] },
  {
    path: 'quote',
    component: QuotePageComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'staff', component: StaffComponent, canActivate: [AuthguardGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthguardGuard] },
  {
    path: 'vehicle-dashboard',
    component: VehicleDashboardComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'service-dashboard',
    component: ServiceDashboardComponent,
    canActivate: [AuthguardGuard],
  },
  // { path: 'quote', component: QuotePageComponent,canActivate: [AuthguardGuard] },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [AuthguardGuard],
  },
  { path: 'staff', component: StaffComponent, canActivate: [AuthguardGuard] },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthguardGuard],
})
export class AppRoutingModule {}
