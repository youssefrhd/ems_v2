import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { response } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private transactionID="";
  order=signal<any>(null);

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8080'

  saveOrder(order:{transaction_id :any,total_price: any,lineItems :CartItem[],payment_method: string,email:any,
    orderDate: Date,
    shipping_name: any,
    adresse: string}) : Observable<any>{
      return this.http.post(`${this.apiUrl}/saveOrder`, order).pipe(
        
        tap(response => {
          const products = JSON.parse(localStorage.getItem('cart')!);
          console.log("Order saved successfully!", response);
          this.order.set(order);
          }),
        catchError(error => {
          console.error("Error while saving order:", error);
          return throwError(() => new Error("Order save failed"));
        })
      );
  }
  setTransactionId(transactionId:string){
    this.transactionID=transactionId;
  }
  getTransactionId(){
    return this.transactionID;
  }
}
