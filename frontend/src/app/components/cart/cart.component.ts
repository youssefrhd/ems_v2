import { Component, OnInit, Signal, signal } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  totalAmount = signal(0);
  quantity = signal<number>(1);

  cartSignal = signal<CartItem[]>([]); 

  constructor(private cartServ:CartServiceService ,private router:Router ) {}

  ngOnInit(): void {
    this.loadCartFromLocalStorage(); 
    this.calculateTotal(); 
    localStorage.setItem('TotAmount',this.totalAmount().toString());
    
  }

  loadCartFromLocalStorage(): void {
    const cartData = localStorage.getItem('cart'); 
    if (cartData) {
      const cartItems: CartItem[] = JSON.parse(cartData); 
      this.cartSignal.set(cartItems); 
    } else {
      this.cartSignal.set([]); 
    }
  } 
  clearCart(): void {
    localStorage.removeItem('cart'); // Remove cart from localStorage
    this.cartSignal.set([]); 
  }
  removeItem(cartItem: CartItem): void {
    const index = this.cartSignal().findIndex(item => item.product.product_id === cartItem.product.product_id);
    if (index !== -1) {
      this.cartSignal.update(cart => cart.filter((_, i) => i !== index));  // Update the signal
      localStorage.setItem('cart', JSON.stringify(this.cartSignal()));  // Update localStorage
      this.calculateTotal();  
    }
  }

   updateQuantity(cartItem: CartItem, event: Event): void {
    
    const input = event.target as HTMLInputElement;
    const quantityValue = Number(input.value); 
  
    if (quantityValue >= 1) {
      
      cartItem.quantity = quantityValue;
  
      
      this.cartSignal.update(cart => {
       
        const index = cart.findIndex(item => item.product.product_id === cartItem.product.product_id);
        if (index !== -1) {
          
          cart[index] = cartItem;
        }
        return [...cart];  
      });
  
     
      localStorage.setItem('cart', JSON.stringify(this.cartSignal()));
  
      
      this.calculateTotal();
    } else {
      
      alert('Quantity must be greater than or equal to 1');
    }
  }


  calculateTotal(): void {
    const totalValue = this.cartSignal().reduce((acc, item) => {
      return acc + this.updatedPrice(item.product) * item.quantity;
    }, 0);
    this.totalAmount.set(totalValue); 
     
  }

  updatedPrice(product: Product): number {
    return product ? product.unit_price - product.unit_price * (product.discount / 100) : 0;
  }
  get totalPrice(): number {
    const subtotal = this.totalAmount();
    const shippingCharges = 150; // You can replace this with dynamic data
    return subtotal + shippingCharges;
  }
  

  trackByFn(index: number, cartItem: CartItem): any {
    return cartItem.product.product_id; 
}
checkOut(){
  this.router.navigate(['/checking-out'], { queryParams: { amount: this.cartServ.getTotalAmount() } });
}
}
