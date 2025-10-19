import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  public itemsSignal = signal<CartItem[]>([]);
  public cartItems = computed(() => this.itemsSignal());
  public subTotalS=signal<number> (0.00);
  private apiUrl = 'http://localhost:8080/api/Cart';
  amount=signal(0);

  constructor(private http: HttpClient) {
    
  }

  // Load items from the backend and update the signal
  loadItems(): void {
    this.http.get<CartItem[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Cart items fetched:', data);  // Log the data to ensure it's correct
        this.itemsSignal.set(data); // Set the signal with the fetched data
      },
      error: (err) => {
        console.error('Failed to fetch cart items:', err);
      },
    });
  }
  setTotalAmount(amount:number){
    this.amount.set(amount);
  }
  getTotalAmount(){
    return this.amount();
  }

  saveOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  
}
