import { formatDate } from "@angular/common";

export class Order {
    id:number;
    shippingCost:number;
    deliveringDate:Date;
    
    constructor(){
        this.id=Date.now();
        this.shippingCost=125;
        this.deliveringDate =new Date();
        

    }
}
