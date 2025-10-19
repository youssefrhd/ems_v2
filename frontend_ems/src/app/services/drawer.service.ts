import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private isOpenSubject=new BehaviorSubject<boolean>(false);
  public isOpen$=this.isOpenSubject.asObservable();

  constructor() { }
  openDrawer(){
    this.isOpenSubject.next(true);
  }
  closeDrawer(){
    this.isOpenSubject.next(false);
  }
}
