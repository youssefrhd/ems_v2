import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-otp-verification',
  standalone:false,
  templateUrl: './otp-verification.component.html', 
  styleUrls: ['./otp-verification.component.css'] 
})
export class OtpVerificationComponent implements AfterViewInit {
  otpLength = 6;
  otpFields: { value: string }[] = []; 
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  constructor(private router : Router,private authServ:AuthServiceService){}

  ngAfterViewInit(): void {
    
    this.otpFields = Array.from({ length: this.otpLength }, () => ({ value: '' }));
  }

  
  onInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && index < this.otpLength - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(index: number, event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusInput(index - 1);
    }
  }

  focusInput(index: number): void {
    const inputElements = this.otpInputs.toArray();
    if (inputElements[index]) {
      inputElements[index].nativeElement.focus();
    }
  }

  getOtpValue(): string {
    return this.otpFields.map(field => field.value).join('');
  }

 
  
  onSubmit(): void {
    const userLo = localStorage.getItem('user');

    if (userLo) {
      try {
        const userk = JSON.parse(userLo);
        const restoredCode = userk.verificationCode;
        const emailS=userk.email;
        console.log('Final Verification Code:', restoredCode);

        const otp = this.otpInputs.map(input => input.nativeElement.value).join('');

        if (otp.length !== restoredCode.length) {
          alert('Invalid OTP length. Please enter the correct number of digits.');
          return;
        }

        if (otp === restoredCode) {
          const body={email:emailS,verificationCode:otp};
          localStorage.removeItem('user');
         this.authServ.verifyOtp(body).subscribe({
            next:()=>{
            
              localStorage.removeItem('user');
              console.log("user removed from the localstorage")
            },
            error:(err)=> console.log(err)
          })
          
        } else {
          alert('Invalid verification code. Please try again.');
        }
      } catch (error) {
        console.error('Failed to parse user object:', error);
      }
    } else {
      console.error('User object not found in localStorage.');
      alert('User data not found. Please try again.');
    }
  }

}