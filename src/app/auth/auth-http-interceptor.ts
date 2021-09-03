import { Injectable, Injector } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    [x: string]: any;
    constructor(){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
          setHeaders: {
            // Authorization: `Bearer ${this.auth.getToken()}`
            
          }
        });
        return next.handle(request);
      }
}
