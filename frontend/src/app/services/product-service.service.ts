import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from '../models/product';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService implements OnInit {
 
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/products';
  productsSignal = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }
  ngOnInit(): void {
    this.fetchProducts()
  }

  loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.productsSignal.set(JSON.parse(savedProducts));
    } else {
      this.fetchProducts().subscribe(
        (data)=> this.productsSignal.set(data)
      ); 
    }
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap((products) => this.setProducts(products))
    );
  }

 
  setProducts(products: Product[]) {
    this.productsSignal.set(products);
    localStorage.setItem('products', JSON.stringify(products));
  }



 
  getProductById(productId: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.apiUrl}/searchProduct/${productId}`).pipe(
      map((response) => {
        if (!response) return null;
  
        return new Product(
          response.product_id, 
          response.name, 
          response.description || 'No description available', 
          response.unit_price, 
          response.inStock ?? 0, 
          response.photo || 'default-image.jpg',   
          response.discount ?? 0 
        );
  
  
      }),
      tap((product) => console.log('Transformed Response:', product)),
      catchError((error) => {
        console.error('Error fetching product:', error);
        return of(null);
      })
    );
  }
  deleteProduct(productId: number): Observable<void> {
    
    console.log(`Attempting to delete product ${productId} at ${this.apiUrl}/deleteProduct?id=${productId}`);
    
    return this.http.delete<void>(`${this.apiUrl}/deleteProduct?id=${productId}`, {
      observe: 'response' 
        }).pipe(
      tap(response => {
        if (response.status === 204) { 
          console.log(`Product ${productId} deleted successfully`);
        }
      }),
      map(() => undefined),
      catchError(error => {
        console.error('Delete error:', error);
        
        let errorMsg = 'Delete failed';
        if (error.status === 404) {
          errorMsg = 'Product not found';
        } else if (error.status === 403) {
          errorMsg = 'Permission denied';
        } else if (error.status === 409) {
          errorMsg = 'Product cannot be deleted (possibly in use)';
        }
        
        return throwError(() => new Error(errorMsg));
      })
    );
  }
  
  
}
