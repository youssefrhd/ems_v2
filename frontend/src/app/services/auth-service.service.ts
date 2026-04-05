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
  private currentUserSubject = new BehaviorSubject<User | null>(null);
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


  getCurrentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const expirationTime = userInfo.expiresIn;
      if (expirationTime && new Date().getTime() < expirationTime) {
        return true;
      }
    }
    this.logout(); 
    return false;
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      tap((response: any) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
        } else {
          console.error('No response received from the backend:', response); 
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
  
  
  login(email:string,password:string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, {email,password}).pipe(
      tap((response) => {
        if(response.email){
          const user:User={
            email:response.email || email,
            password:response.password || password,
            username:response.username || email,
            expiresIn:response.expiresIn || Date.now().toString(),
            name:response.name || response.username,
            role:response.role || 'client'
            
          }
          this.currentUserSubject.next(response)
          this.isLoggedInSubject.next(true); 
          console.log("logged user : ",JSON.stringify(user));
        }
        localStorage.setItem('userInfo', JSON.stringify(response)); 
        //this.autoLogout(expirationTime);
       
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
