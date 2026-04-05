import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-space',
  standalone: false,
  
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css'
})
export class AdminSpaceComponent implements OnInit{

   loginForm!:FormGroup;
    loginError :string | null=null;
  
    isLoggedIn: boolean = false; 
password='';
email='';

  constructor(private fb:FormBuilder,private authServ:AuthServiceService,private router:Router) {}
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]], 
        password: ['', [Validators.required]] 
      });
  
      this.authServ.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
    }

    onSubmit() {
      if (this.loginForm.valid) {
        this.authServ.login(this.email,this.password).subscribe({
          next: (response) => {
            const redirectPath = response.role === 'admin' 
                    ? '/dashbord' 
                    : '/home';
                  this.router.navigate([redirectPath]);
          },
          error: (error) => {
            this.loginError = 'Invalid credentials';
          }
        });
      }
    }
  
 
}
