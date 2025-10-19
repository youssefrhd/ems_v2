
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root'  // This makes them available application-wide
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn$) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

