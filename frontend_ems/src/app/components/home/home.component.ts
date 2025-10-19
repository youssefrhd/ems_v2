import { Component, effect, ElementRef, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product-service.service';
import { CategoryCountDto, CategoryService } from '../../services/CategoryService';
import { CATEGORY_ICONS } from '../../../assets/icons/CATEGORY_ICONS';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy , OnInit{
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  categoryCount=signal<CategoryCountDto[]>([]);


  products=signal<Product[]>([]);
  isLoading=true;
  error: string | null = null;

  duplicatedProducts = signal<any[]>([]);
  private animationFrameId: number | null = null; // Initialize as null
  private scrollSpeed = 1.5;
  private scrollPosition = 0;
  constructor(private prodServ:ProductServiceService,private catServ:CategoryService){


    this.prodServ.loadProducts();
    this.products=this.prodServ.productsSignal
    effect(() => {
      this.duplicatedProducts.set([...this.products(), ...this.products()]);
    });

    this.startAutoScroll();
}
ngOnInit(): void {
 /* this.catServ.getCategoryCounts().subscribe(
    (data)=> {
      this.categoryCount.set(data);
      console.log(data);}
  )*/
 this.loadCategories();
}
getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || 'fa-tag';
}

loadCategories() {
  this.catServ.getCategoryCounts().subscribe({
    next: (data) => {
      console.log('Raw data from API:', data);
      const categoriesWithIcons = data.map(category => ({
        ...category,
        icon: this.catServ.getIconForCategory(category.category)
      }));
      
      this.categoryCount.set(categoriesWithIcons);
    },
    error: (err) => console.error('Error loading categories', err)
  });
}


private startAutoScroll() {
  const scroll = () => {
    this.scrollPosition += this.scrollSpeed;
    
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollLeft = this.scrollPosition;
      
      if (this.scrollPosition >= this.scrollContainer.nativeElement.scrollWidth / 2) {
        this.scrollPosition = 0;
        this.scrollContainer.nativeElement.scrollLeft = 0;
      }
    }
    
    this.animationFrameId = requestAnimationFrame(scroll);
  };
  
  this.animationFrameId = requestAnimationFrame(scroll);
}
  
  
ngOnDestroy() {
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
  }
}
 

  loadProducts() {
    this.isLoading = true;
  
    this.prodServ.fetchProducts().subscribe({
      next: (products) => {
        this.isLoading = false;
        this.products.set(products); 
        localStorage.setItem('products', JSON.stringify(products)); // Store products in localStorage
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Failed to load products';
        console.error(err);
      },
    });
  }


  categories = [
    { name: 'Smartphones', icon: '📱', count: 124 },
    { name: 'Laptops', icon: '💻', count: 89 },
    { name: 'Smart Home', icon: '🏠', count: 67 },
    { name: 'Audio', icon: '🎧', count: 112 },
    { name: 'Wearables', icon: '⌚', count: 56 }
  ];
  
}
