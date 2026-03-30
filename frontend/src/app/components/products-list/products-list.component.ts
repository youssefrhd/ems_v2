import { Component, effect, EventEmitter, inject, Input, OnInit, Output, Signal, signal } from '@angular/core';
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
  products=signal<Product[]>([]);
  
  isLoading=true;
  error: string | null = null;

 constructor(public productService:ProductServiceService,private router:Router,private route:ActivatedRoute){ 
   productService.loadProducts();
   this.products=productService.productsSignal
 }
 ngOnInit(): void {
  this.loadProducts();
  this.productService.loadProducts();
  this.products=this.productService.productsSignal
}

loadProducts() {
  this.isLoading = true;

  this.productService.fetchProducts().subscribe({
    next: (products) => {
      this.isLoading = false;
      this.products.set(products); 
      localStorage.setItem('products', JSON.stringify(products)); 
    },
    error: (err) => {
      this.isLoading = false;
      this.error = 'Failed to load products';
      console.error(err);
    },
  });
}

  viewDetails(productId:number){
     this.productService.getProductById(productId).subscribe(
      (response)=> this.router.navigate(['/product-details',productId]),
      (error)=>console.log("product can not be found !")
     )

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

