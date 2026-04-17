import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  titulo: string;
  autor: string;
  portada: string;
  price: number;
  type: 'buy' | 'rent';
  returnDate?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(item: CartItem) {
    const existing = this.cartItems.find(i => i.id === item.id && i.type === item.type);
    if (existing) existing.quantity += item.quantity;
    else this.cartItems.push({ ...item });

    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(id: number, type: 'buy' | 'rent') {
    this.cartItems = this.cartItems.filter(i => !(i.id === id && i.type === type));
    this.cartSubject.next([...this.cartItems]);
  }

  getCart() {
    return [...this.cartItems];
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}