import { Component, HostListener, Input, OnInit, signal } from '@angular/core';
import { Router ,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { CartItem } from '../../models/cart-item';
import { MatDialog } from '@angular/material/dialog';
import { AdminSpaceComponent } from '../admin-space/admin-space.component';
import { LoginComponent } from '../login/login.component';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class NavbarComponent implements OnInit {
  isLoginPage: boolean = false; 
  routerSubscription!: Subscription;
  isLoggedIn$:any;
  isMenuOpen=false;
 
  CartLength=signal(0);
  isDropdownOpen = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}
keepDropdownOpen(): void {
  this.isDropdownOpen = true;
}

openDropdown() {
  this.isDropdownOpen = true;
}

// Close dropdown on mouse leave
closeDropdown(): void {
  this.isDropdownOpen = false;
}


  constructor(private router :Router, private authServ:AuthServiceService){
    this.isLoggedIn$ = this.authServ.isLoggedIn$; 
  }
  

  ngOnInit(): void {
    
    const length=this.getCartFromLocalStorage().length;
    this.CartLength.set(length);
  }
  isDarkMode: boolean = false;
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  logout(): void {
    this.authServ.logout();
    this.router.navigate(['/home']);
    
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  getCartFromLocalStorage(): CartItem[] {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
      }

      signin() {
        console.log('Login button clicked')
      }
  
  
}
