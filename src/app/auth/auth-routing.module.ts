import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'createPassword', component: CreatePasswordComponent },
  { path:'',redirectTo:'login',pathMatch:'full'},
  { path:'**', component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
