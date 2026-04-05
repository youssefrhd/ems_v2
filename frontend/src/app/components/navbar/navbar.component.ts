import { Component, HostListener, inject, Input, OnInit, signal } from '@angular/core';
import { Router ,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { CartItem } from '../../models/cart-item';
import { MatDialog } from '@angular/material/dialog';
import { AdminSpaceComponent } from '../admin-space/admin-space.component';
import { LoginComponent } from '../login/login.component';
import { DrawerService } from '../../services/drawer.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  
})
export class NavbarComponent implements OnInit {
mobileMenuOpen = false;
  userMenuOpen = false;
  notificationsOpen = false;
  currentUser: User | null = null;  
  unreadNotifications = 3;
  
  navItems: NavItem[] = [
    { name: 'DASHBOARD', route: '/dashboard', icon: '' },
    { name: 'CHAT', route: '/chat', icon: '' },
    { name: 'PROFILE', route: '/profile', icon: '' }
  ];
  
  userMenuItems: UserMenuItem[] = [
    { name: 'My Profile', route: '/profile', icon: '👤' },
    { name: 'File Manager', route: '/file-manager', icon: '📁', badge: '12' },
    { name: 'Chat', route: '/chat', icon: '💬', badge: '3' },
    { name: 'Settings', route: '/settings', icon: '⚙️' },
    { name: 'Help & Support', route: '/help', icon: '❓' }
  ];
  
  notifications = [
    { id: 1, title: 'New file shared with you', time: '5 min ago', read: false },
    { id: 2, title: 'Assignment deadline approaching', time: '1 hour ago', read: false },
    { id: 3, title: 'Profile updated successfully', time: '3 hours ago', read: true },
    { id: 4, title: 'New message in study group', time: 'Yesterday', read: true }
  ];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    if (!target.closest('.user-menu-trigger') && !target.closest('.user-menu-dropdown')) {
      this.userMenuOpen = false;
    }
    
    if (!target.closest('.notifications-trigger') && !target.closest('.notifications-dropdown')) {
      this.notificationsOpen = false;
    }
  }

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.authService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
    });
    console.log("User Email :",this.currentUser?.email)

  }

  loadCurrentUser() {
    this.authService.getCurrentUser$().subscribe(user=>{
      this.currentUser=user;
    });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.userMenuOpen = false;
    this.notificationsOpen = false; 
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    this.notificationsOpen = false; 
    this.mobileMenuOpen = false; 
  }

  toggleNotifications() {
    this.notificationsOpen = !this.notificationsOpen;
    this.userMenuOpen = false; 
    this.mobileMenuOpen = false; 
  }

  getUserInitials(): string {
    const name = this.currentUser?.name || 'Student';
    return name
      .split(' ')
      .map((part: string) => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  logout() {
    this.authService.logout();
    this.userMenuOpen = false;
  }

  triggerUpload() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      console.log('Files selected for upload:', files);
      
      this.router.navigate(['/files'], { state: { filesToUpload: files } });
    }
  }
  
}
interface NavItem {
  name: string;
  route: string;
  icon: string;
}

interface UserMenuItem {
  name: string;
  route: string;
  icon: string;
  badge?: string;
}
