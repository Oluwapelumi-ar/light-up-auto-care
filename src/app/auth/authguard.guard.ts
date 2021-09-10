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
<<<<<<< HEAD
  userDetails = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem('userDetails')))
  );
=======
  userDetails = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('userDetails'))));
  
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317

  constructor(
    private authService: AuthServiceService,
    private router: Router
<<<<<<< HEAD
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return true;
    if (!this.userDetails?.token) {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
=======
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
>>>>>>> 5a9fd4a0c5104f1689152de31da361baafa15317
  }
}
