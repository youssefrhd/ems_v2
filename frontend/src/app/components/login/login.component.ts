import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { ProductServiceService } from '../../services/product-service.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  isDarkMode: boolean = false;
  loginError :string | null=null;
  user : User | null =null;
  isLoggedIn: boolean = false; 

  hidePassword = true; 
  faEye = faEye;   faEyeSlash = faEyeSlash;
   password= '';
   email='';
  constructor(private fb : FormBuilder, private authServ:AuthServiceService, private router:Router,private prodServ:ProductServiceService){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]] 
    });

    this.authServ.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  
  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      this.authServ.login(this.email,this.password).subscribe(
        (response) => {
          const redirectPath = response.role === 'admin' 
                    ? '/admin/dashbord' 
                    : '/home';
                  this.router.navigate([redirectPath]);
          console.log('Login successful!', response);
           
        },
        (error) => {
          this.loginError = 'Invalid email or password!'; 
          console.error('Login failed!', error);
        }
      );
    } else {
      this.loginError = 'Please fill out the form correctly.'; // Set error message
      console.log('Form is invalid');
    }
  }
    togglePasswordVisibility(): void {
      this.hidePassword = !this.hidePassword;
    }
  


}
