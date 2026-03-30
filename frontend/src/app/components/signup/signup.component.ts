import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../models/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  signupForm!: FormGroup;
  registredUser=signal<User| null>(null);

  hidePassword = true; // Toggle for hiding/showing password
    faEye = faEye; // FontAwesome eye icon
    faEyeSlash = faEyeSlash;

  constructor(private fb: FormBuilder , private authServ:AuthServiceService , private router:Router) {
    this.signupForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }
 

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    const user :User = {
      username:this.signupForm.get('userName')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    };
    this.authServ.signup(user).subscribe({
      next: (response) => {
        alert('Signed up !');
        const userString = localStorage.getItem('user');
        console.log('Raw data from local storage:', userString); // Debugging line
        
        if (userString) {
          try {
            const user = JSON.parse(userString);
            console.log('Parsed user object:', user); // Debugging line
          } catch (error) {
            console.error('Failed to parse user object:', error); // Debugging line
          }
        } else {
          console.log('No user data found in local storage.'); // Debugging line
        }
        this.router.navigate(['/verification']); 
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
