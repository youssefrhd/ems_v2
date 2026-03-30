import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { EmailService } from './email.service';
import { Router } from '@angular/router';
import { UpdatePasswordResponse } from '../models/update-password-response';


@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {
   private apiUrl='http://localhost:8080/api';

  constructor(private http :HttpClient,private emailServ:EmailService , private router:Router) { }

  resetPassword(email :string) : Observable<any>{
    this.emailServ.setResetEmail(email);
     return this.http.post(`${this.apiUrl}/reset-password?email=${email}`,{},{responseType:'text'})
     .pipe(
      catchError(this.handleError)
     )
  }
  

  updatePassword(updatePass: { email: string; password: string }): Observable<UpdatePasswordResponse> {
    return this.http.put<UpdatePasswordResponse>(`${this.apiUrl}/confirm-password`, updatePass).pipe(
      tap((res) => {
        console.log('Server Response:', res);
  
        // Check for a success message
        if (res.message) {
          console.log('Password updated successfully!');
          this.router.navigate(['/login']);
        } else {
          throw new Error('Unexpected response format from the server.');
        }
      }),
      catchError(this.handleError)
    );
  }
  
  
  private handleError(error: HttpErrorResponse) {
    console.error('Full Error:', error);
  
    let errorMessage = 'Something went wrong. Please try again later.';
  
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      errorMessage = `Server says: ${error.error}`;
    } else if (error.error?.message) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `HTTP ${error.status}: ${error.statusText}`;
    }
  
    return throwError(() => new Error(errorMessage));
  }
  
  
}
