import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
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

  // Añadir libro al carrito
  addToCart(item: CartItem) {
    const existir = this.cartItems.find(
      i => i.id === item.id && i.type === item.type
    );

    if (existir) {
      existir.quantity++;
    } else {
      this.cartItems.push(item);
    }
  }

  // Eliminar libro del carrito
  removeFromCart(id: number, type: 'buy' | 'rent') {
    this.cartItems = this.cartItems.filter(
      item => !(item.id === id && item.type === type)
    );
  }

  // Obtener contenido actual del carrito
  getCart() {
    return this.cartItems;
  }
}