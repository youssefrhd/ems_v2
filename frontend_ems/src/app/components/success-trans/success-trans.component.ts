import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-success-trans',
  standalone: false,
  
  templateUrl: './success-trans.component.html',
  styleUrl: './success-trans.component.css'
})
export class SuccessTransComponent implements OnInit{
  tansactionID="";
  order:any=null;
  constructor(private orderServ :OrderService){}

  ngOnInit(): void {
    this.tansactionID=this.orderServ.getTransactionId();
    this.order=this.orderServ.order();
  }
}
