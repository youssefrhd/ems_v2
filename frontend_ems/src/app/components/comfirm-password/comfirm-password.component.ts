import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordServiceService } from '../../services/password-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comfirm-password',
  standalone: false,
  
  templateUrl: './comfirm-password.component.html',
  styleUrl: './comfirm-password.component.css'
})
export class ComfirmPasswordComponent implements OnInit{

  confirmForm! :FormGroup;
  email:string | null='';
  constructor(private fb :FormBuilder , private emailServ:EmailService,private passServ:PasswordServiceService,private router:Router){
     this.confirmForm=this.fb.group({
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',Validators.required],
     },
    {
      validators:this.passwordMatchValidator
    })
  }

  ngOnInit(): void {
    const email=this.emailServ.getResetEmail();
    this.email=email;
    if (email) {
      console.log("Email received:", email);
    } else {
      console.log("No email found!");
    }

  }

   passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmpassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
    onSubmit() {
      if (this.confirmForm.invalid) {
        console.log('Form is invalid!'); 
        return;
      }
    
      const password = this.confirmForm.get('password')?.value;
      const payload : any = { email: this.email, password :password };
    
      this.passServ.updatePassword(payload).subscribe({
        next: () => {
          console.log('Password updated successfully!');
          this.confirmForm.reset();
          localStorage.removeItem('resetEmail');
    
          // Notify and navigate
          alert('Password updated successfully! You can now log in.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error occurred:', err);
          alert('Something went wrong. Please try again.');
        },
      });
    }
}
