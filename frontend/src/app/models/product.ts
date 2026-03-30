export class Product {
reviews: any;
    constructor(
      public product_id: number,
      public name: string,
      public description: string,
      public unit_price: number,
      public inStock :number,
      public photo :string,
      public discount:number
    ) {}
      
    }

  