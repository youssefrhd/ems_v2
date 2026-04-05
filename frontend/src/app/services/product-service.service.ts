import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from '../models/product';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
 
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/products';
  productsSignal = signal<Product[]>([]);
  loaded: boolean=false;
  loading=signal(false);
  products=computed(()=>{
    if(!this.loaded){
      this.fetchProducts();
      this.loaded=true;
    }
     return this.productsSignal();
  });

 
/*
  loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.productsSignal.set(JSON.parse(savedProducts));
    } else {
      this.fetchProducts().subscribe(
        (data)=> this.productsSignal.set(data)
      ); 
    }
  }*/

  fetchProducts(): void {
    this.loading.set(true);
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next : (products)=>{
        this.productsSignal.set(products);
        this.loaded=true;
        this.loading.set(false);
      },
      error : (err)=> console.error("Products can not be loaded",err)
    });
  }

 
  setProducts(products: Product[]) {
    this.productsSignal.set(products);
    localStorage.setItem('products', JSON.stringify(products));
  }



 
 public getProductById(productId: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.apiUrl}/searchProduct/${productId}`).pipe(
      map((res) =>
        res
          ? new Product(
              res.product_id,
              res.name,
              res.description || 'No description available',
              res.unit_price,
              res.inStock ?? 0,
              res.photo || 'default-image.jpg',
              res.discount ?? 0
            )
          : null
      ),
      catchError(() => of(null))
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
