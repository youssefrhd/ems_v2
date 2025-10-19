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
  otpLength = 6; // Number of OTP fields
  otpFields: { value: string }[] = []; // Array to store OTP field values
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  constructor(private router : Router,private authServ:AuthServiceService){}

  ngAfterViewInit(): void {
    // Initialize OTP fields with empty values
    this.otpFields = Array.from({ length: this.otpLength }, () => ({ value: '' }));
  }

  // Handle input event
  onInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Auto-focus the next input field if a digit is entered
    if (value && index < this.otpLength - 1) {
      this.focusInput(index + 1);
    }
  }

  // Handle keydown event (e.g., backspace)
  onKeyDown(index: number, event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    // Move focus to the previous input field on backspace
    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.focusInput(index - 1);
    }
  }

  // Focus on a specific input field
  focusInput(index: number): void {
    const inputElements = this.otpInputs.toArray();
    if (inputElements[index]) {
      inputElements[index].nativeElement.focus();
    }
  }

  // Get the final OTP value
  getOtpValue(): string {
    return this.otpFields.map(field => field.value).join('');
  }

 
  // Handle form submission
  onSubmit(): void {
    const userLo = localStorage.getItem('user');

    if (userLo) {
      try {
        const userk = JSON.parse(userLo);
        const restoredCode = userk.verificationCode;
        const emailS=userk.email;
        console.log('Final Verification Code:', restoredCode);

        // Collect OTP values from input fields
        const otp = this.otpInputs.map(input => input.nativeElement.value).join('');

        // Validate OTP length
        if (otp.length !== restoredCode.length) {
          alert('Invalid OTP length. Please enter the correct number of digits.');
          return;
        }

        // Compare the entered OTP with the restored code
        if (otp === restoredCode) {
          const body={email:emailS,verificationCode:otp};
          this.authServ.verifyOtp(body).subscribe({
            next:()=>{
              localStorage.removeItem('user')
            },
            error:(err)=> console.log(err)
          })
          
           // Navigate to success page
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