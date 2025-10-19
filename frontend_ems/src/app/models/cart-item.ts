import { Product } from "./product";

export class CartItem {
    id: number; 
    product: Product;
    quantity: number; 

  constructor(product: Product, quantity: number = 1) {
    this.id = Date.now(); 
    this.product = product;
    this.quantity = quantity;
  }
}
