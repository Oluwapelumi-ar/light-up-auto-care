import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  userDetails = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userDetails'))));

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ){
    console.log((this.userDetails), 'lgjg');
  }

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return true;
      if(!this.userDetails?.token) {
        window.alert('Access Denied, Login is Required to Access This Page!');
        this.router.navigate(['/login'])
        return false;
      }
      return true;
  }
  
}
