import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor  {
    constructor(private router:Router){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const expirationTime = localStorage.getItem('tokenExpiration');
    
        // Check if the token has expired
        if (token && expirationTime && Date.now() > +expirationTime) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          // Redirect to login page or handle expired token
          this.router.navigate(['/login']);
          return next.handle(req);
        }
        if (token) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(cloned);
        }

        return next.handle(req);
      }
}
