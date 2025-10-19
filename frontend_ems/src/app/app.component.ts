import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-navbar></app-navbar>
  <router-outlet></router-outlet>`, // Use the <app-navbar> tag
  standalone :false,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  CartCount=signal(0);
  title = 'frontend_ems';
  updateCart(count:number){
    this.CartCount.update((currentCount) => currentCount + count);

  }
}