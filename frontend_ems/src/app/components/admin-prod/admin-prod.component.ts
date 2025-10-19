import { Component, OnInit, signal, Signal } from '@angular/core';

import * as XLSX from 'xlsx';
import { Product } from '../../models/product';
import { ProductServiceService } from '../../services/product-service.service';
import { lastValueFrom, timeout } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-prod',
  standalone: false,
  
  templateUrl: './admin-prod.component.html',
  styleUrl: './admin-prod.component.css'
})
export class AdminProdComponent implements OnInit {
  
  products=signal<Product[]>([]);
  
  isLoading=true;
  error: string | null = null;


  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  isDarkMode = false;
 

  constructor(private prodServ:ProductServiceService,private snackBar: MatSnackBar){
    this.prodServ.loadProducts();
  }

  ngOnInit(): void {
    this.prodServ.loadProducts();
   this.products=this.prodServ.productsSignal
    
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

  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.products().sort((a, b) => {
      const aValue = a[column as keyof Product];
      const bValue = b[column as keyof Product];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return this.sortDirection === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.products());
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'products.xlsx');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  activeMenu: number | null = null;

  toggleMenu(productId: number, event: Event) {
    event.stopPropagation();
    this.activeMenu = this.activeMenu === productId ? null : productId;
  }
  
 
  async deleteProduct(productId: number) {
    const products = this.products();
    const product = products.find(p => p.product_id === productId);
    
    if (!product) {
      this.showSnackbar('Product not found in local data', 'error');
      return;
    }
  
    if (!confirm(`Permanently delete ${product.name}?`)) {
      return;
    }
  
    
    this.products.update(prods => prods.filter(p => p.product_id !== productId));
  
    try {
          await lastValueFrom(
        this.prodServ.deleteProduct(productId).pipe(
          timeout(5000) 
        )
      );
      
      this.showSnackbar(`${product.name} deleted successfully`, 'success');
    } catch (error) {
     
      this.products.update(prods => [...prods, product].sort((a, b) => a.product_id - b.product_id));
      
      const errorMessage = error instanceof Error ? error.message : 'Deletion failed';
      this.showSnackbar(errorMessage, 'error');
      
    
    } finally {
      this.closeMenu();
    }
  }
  
 
  
  private showSnackbar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: type === 'success' ? 3000 : 5000,
      panelClass: type === 'success' ? ['bg-green-500'] : ['bg-red-500']
    });
  }
  closeMenu() {
    this.activeMenu = null;
  }
  editProduct(product: Product) {
    console.log('Editing:', product);
    this.closeMenu();
  }

  previewProduct(product: Product) {
    console.log('Previewing:', product);
    this.closeMenu();
  }

}
