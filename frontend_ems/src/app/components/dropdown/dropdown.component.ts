import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  active: string | null = null;
  menuItems = ['Home', 'About', 'Services', 'Contact'];

  setActive(item: string): void {
    this.active = item;
  }

}
