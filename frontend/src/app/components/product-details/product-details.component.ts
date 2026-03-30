import { Component, computed, OnInit, signal, ɵunwrapWritableSignal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product-service.service';
import { CartItem } from '../../models/cart-item';


@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product = signal<Product | null>(null);
  

  // Reactive computation for updated price
  updatedPrice = computed(() => {
    const product = this.product();
    return product
      ? product.unit_price - (product.unit_price * (product.discount / 100))
      : 0; // Default to 0 if product is undefined
  });

  // Signal for quantity
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServiceService
  ) {}


getProductFromLocalStorage(): Product | null {
  const productData = localStorage.getItem('ProductDetails');
  return productData ? JSON.parse(productData) : null;
}

getProduct(productId: number): void {
  this.productService.getProductById(productId).subscribe({
    next: (product) => {
      if (product) {
        this.product.set(product);
        localStorage.setItem('ProductDetails', JSON.stringify(product)); // Update localStorage
      } else {
        // Fallback to localStorage if API returns null
        const storedProduct = this.getProductFromLocalStorage();
        if (storedProduct) {
          this.product.set(storedProduct);
          console.warn('Using product from localStorage as fallback.');
        } else {
          console.error('Product not found in API or localStorage.');
        }
      }
    },
    error: (error) => {
      console.error('Error fetching product from API:', error);
      // Fallback to localStorage if API call fails
      const storedProduct = this.getProductFromLocalStorage();
      if (storedProduct) {
        this.product.set(storedProduct);
        console.warn('Using product from localStorage as fallback.');
      } else {
        console.error('Product not found in API or localStorage.');
      }
    },
  });
}

ngOnInit(): void {
  const productId = Number(this.route.snapshot.paramMap.get('productId'));
  if (isNaN(productId) || productId <= 0) {
    console.error('Invalid productId:', productId);
    return;
  }
  this.getProduct(productId);
  
}
  addToCart() {
      const cart = this.getCartFromLocalStorage(); // Get the cart from localStorage
      const currProd=this.product()!;
      const existingProductIndex = cart.findIndex(item => item.product.product_id === this.product()?.product_id);
  
      if (existingProductIndex === -1) {
        // If the product isn't already in the cart, add it
        cart.push(new CartItem(currProd, this.quantity())); // Assuming CartItem model takes product and quantity
      } else {
        // If the product is already in the cart, update the quantity
        cart[existingProductIndex].quantity += 1; // Increment quantity
      }
  
      // Store updated cart back to localStorage
      this.saveCartToLocalStorage(cart);
  
  
      alert('Product added to cart!');
    }
  
    // Get cart from localStorage
    getCartFromLocalStorage(): CartItem[] {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    }
    
  
    // Save the updated cart to localStorage
    saveCartToLocalStorage(cart: CartItem[]): void {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

  // Methods to update quantity
  increaseQuantity() {
    this.quantity.update((value) => value + 1);
  }

  decreaseQuantity() {
    this.quantity.update((value) => (value > 1 ? value - 1 : value));
  }
  
}



