import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  [x: string]: any;
  userDetails = JSON.parse(JSON.stringify(localStorage.getItem("userDetails")));
  constructor(private auth: AuthServiceService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { token } = this.userDetails;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
