import { AfterViewInit, Component, DEFAULT_CURRENCY_CODE, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CartServiceService } from '../../services/cart-service.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-checking-out',
  standalone: false,
  
  templateUrl: './checking-out.component.html',
  styleUrl: './checking-out.component.css'
})
export class CheckingOutComponent implements OnInit ,AfterViewInit{

  amount :number=0;
  @ViewChild('paymentRef', {static:true}) paymentRef! :ElementRef;
  constructor(private payServ :PaymentService,private cartServ:CartServiceService , private router: Router,
    private orderServ:OrderService 
  ){}
  ngAfterViewInit(): void {
    this.renderPaypalButton();
  }

  ngOnInit(): void {
    const AmountServ=localStorage.getItem('TotAmount') || '0.00';
    if(AmountServ){
      this.amount=parseFloat(AmountServ);
    }
    
  }

  renderPaypalButton() {
    paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          tagline: true,
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toFixed(2), // Convert to a properly formatted string
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
            const lineItems:CartItem[]=JSON.parse(localStorage.getItem('cart')!);
            
            const orderData = {
              transaction_id: details.id || '',
              total_price: details.purchase_units[0].amount.value,
              lineItems:lineItems,
              payment_method: "PayPal",
              email: details.payer.email_address || '',
              orderDate: new Date(Date.now()),
              shipping_name: details.purchase_units[0].shipping.name.full_name,
              adresse: `${details.purchase_units[0].shipping.address.address_line_1}, 
                                ${details.purchase_units[0].shipping.address.admin_area_2}, 
                                ${details.purchase_units[0].shipping.address.admin_area_1}, 
                                ${details.purchase_units[0].shipping.address.postal_code}, 
                                ${details.purchase_units[0].shipping.address.country_code}`
            };
            if(details.status==='COMPLETED'){
              this.orderServ.saveOrder(orderData).subscribe({
                next: response => console.log("Order saved:", response),
                error: err => console.log("Error:", err)
              });
              this.orderServ.setTransactionId(details.id);
              localStorage.removeItem('cart');
              this.router.navigate(['/success-trans']);
            }
            
          
          });
        },
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          alert('An error occurred during the transaction. Please try again.');
        },
      })
      .render(this.paymentRef.nativeElement);
  }

}
