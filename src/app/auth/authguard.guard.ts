import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
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

  // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(!this.userDetails) {
        window.alert('Access Denied, Login is Required to Access This Page!');
        this.router.navigate(['/login'])
        return false;
      }
      return true;
  }
}
