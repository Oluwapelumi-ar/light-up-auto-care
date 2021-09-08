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
  userDetails = JSON.parse(JSON.stringify(localStorage.getItem('userDetails')));
  constructor(private auth: AuthServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      if (this?.userDetails) {
        this.userDetails = JSON.parse(this.userDetails);
      }
    } catch (error) {}
    const { token } = this?.userDetails || {};
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return next.handle(request);
  }
}
