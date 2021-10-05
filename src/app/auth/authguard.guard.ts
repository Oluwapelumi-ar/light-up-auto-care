import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  userDetails = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userDetails'))));

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(!this.userDetails?.token) {
        this.router.navigate(['/login'])
        return false;
      }
      return true;
  }
}
