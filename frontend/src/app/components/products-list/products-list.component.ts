import { Component, effect, EventEmitter, Inject, inject, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart-item';
import { Observable, of } from 'rxjs';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: false,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  
  @Output() ItemProduct=new EventEmitter<Product>();

  private productService = inject(ProductServiceService); 
  products = this.productService.productsSignal;
  isLoading=signal(true);

  error: string | null = null;

 constructor(private router:Router,private route:ActivatedRoute){ 
   
 }
 ngOnInit(): void {
    this.productService.fetchProducts();
    this.isLoading.set(this.productService.loading());
}
 

  viewDetails(productId:number){
     this.router.navigate(['/product-details',productId]);
  }

  addToCart(product: Product) {
    const cart = this.getCartFromLocalStorage(); 
    const existingProductIndex = cart.findIndex(item => item.product.product_id === product.product_id);

    if (existingProductIndex === -1) {

      cart.push(new CartItem(product, 1)); 
    } else {
     
      cart[existingProductIndex].quantity += 1; 
    }

    
    this.saveCartToLocalStorage(cart);

        this.ItemProduct.emit(product);

    alert('Product added to cart!');
  }

  
  getCartFromLocalStorage(): CartItem[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

    saveCartToLocalStorage(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  
}

