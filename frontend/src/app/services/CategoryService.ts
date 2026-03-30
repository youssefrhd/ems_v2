import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = '/api/categories';

  constructor(private http: HttpClient) {}

  getCategoryCounts(): Observable<CategoryCountDto[]> {
    return this.http.get<CategoryCountDto[]>(`${this.apiUrl}/counts`);
  }

  private iconMap: { [key: string]: string } = {
    'Smartphones': '📱',
    'Laptops': '💻',
    'Audio': '🎧',
    'Home Appliances': '🏠',
    'Cameras': '📷',
    'Smartwatches': '⌚',
    'Gaming Consoles': '🎮',
    'Monitors': '🖥️',
    'Drones': '🚁'
  };

  getIconForCategory(categoryName: string): string {
    return this.iconMap[categoryName] || '📦'; 
  }
}

export interface CategoryCountDto {
  category: string;
  count: number;
  icon:string
}