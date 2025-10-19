import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  /*private emailSubject=new BehaviorSubject<string>('');
   email$=this.emailSubject.asObservable();

  constructor() { }

   setEmail(email :string){
    this.emailSubject.next(email);
  }*/

    private resetEmail: string | null = null;

    setResetEmail(email: string) {
      this.resetEmail = email;
      localStorage.setItem('resetEmail', email); // Store in localStorage too
    }
  
    getResetEmail(): string | null {
      return this.resetEmail || localStorage.getItem('resetEmail'); // Retrieve from service or localStorage
    }
  
    clearResetEmail() {
      this.resetEmail = null;
      localStorage.removeItem('resetEmail'); // Clear localStorage
    }
}
