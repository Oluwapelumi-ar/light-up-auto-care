import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  userDetails = JSON.parse(
    JSON.parse(JSON.stringify(localStorage.getItem('userDetails')))
  );

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if(this.userDetails.role == 'admin') {

    //   return true;
    // }else {
    //   window.alert('Only admins can access this page');
    //   this.router.navigate(['/home'])
    //   return false;
    // }
    return true;
  }
}
