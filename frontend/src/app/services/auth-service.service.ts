import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { response } from 'express';
import { ProductServiceService } from './product-service.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isLoggedInSubject: BehaviorSubject<boolean>;
  isLoggedIn$ : Observable<boolean>

  
  private apiUrl = 'http://localhost:8080/auth'; 

  constructor(private http :HttpClient, private prodServ:ProductServiceService,private router:Router) { 
    const token = localStorage.getItem('token');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
    this.isLoggedIn$ =this.isLoggedInSubject.asObservable();
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }



  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const expirationTime = userInfo.expiresIn;
      if (expirationTime && new Date().getTime() < expirationTime) {
        return true; // Token is valid
      }
    }
    this.logout(); // Token expired or missing, log out the user
    return false;
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      tap((response: any) => {
        //console.log('Backend response:', response); // Debugging line
        if (response) {
          //console.log('Storing user in local storage:', response); // Debugging line
          localStorage.setItem('user', JSON.stringify(response));
        } else {
          console.error('No response received from the backend:', response); // Debugging line
        }
      })
    );
  }

  autoLogout(expirationTime: number): void {
    const timeout = expirationTime - new Date().getTime();
    if (timeout > 0) {
      setTimeout(() => {
        this.logout();
      }, timeout);
    }
  }
  getCurrentUser(): any | null {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
  
  
  login(loginReq: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginReq).pipe(
      tap((response: any) => {
        const expirationTime = response.expiresIn;
        localStorage.setItem('userInfo', JSON.stringify(response)); // Save user info
        localStorage.setItem('token', response.token); // Save token

        this.isLoggedInSubject.next(true); // Update login state
        this.autoLogout(expirationTime);

        
        

       
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        this.isLoggedInSubject.next(false); 
        return throwError(() => error);
      })
    );
  }

 

  verifyOtp(otpVer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, otpVer).pipe(
      tap((response) => {
        alert('Verified Successfully!');
        localStorage.removeItem('user');
        console.log('Verification successful!', response);
        this.router.navigate(['/activation-success']);
      }),
      catchError((error) => {
        console.error('Verifying failed:', error);
        return throwError(() => error);
      })
    );
  }
  

}
