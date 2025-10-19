import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordServiceService } from '../../services/password-service.service';
import { response } from 'express';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  email='';
  forgotPasswordForm: FormGroup;
  isDarkTheme = false; // Default to light theme
  resetMessage:string | null=null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passServ:PasswordServiceService,
    private emailServ:EmailService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.email=this.forgotPasswordForm?.value;
  }
  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.forgotPasswordForm && this.forgotPasswordForm.valid) {
      const email=this.forgotPasswordForm.get('email')?.value;
      this.passServ.resetPassword(email).subscribe({
       next:(response)=>{
        this.resetMessage=response;
      },
      error:(err)=>{
        this.resetMessage='Failed to send the reset link. Please try again later.';
        console.error('Error :',err);
      }
    })
      
    } else {
      this.resetMessage="Invalid Email, please enter a valid Email !"
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

}
