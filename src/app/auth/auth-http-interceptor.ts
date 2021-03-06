import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  [x: string]: any;
  constructor(private auth: AuthServiceService) {
    console.log(this.userDetails)
  }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let userDetails = JSON.parse(JSON.stringify(localStorage.getItem('userDetails')));

    if (userDetails) {

      userDetails = JSON.parse(userDetails);

      const { token } = userDetails;

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token,
          },
        });
      }
    }
    return next.handle(request);

  }
}
