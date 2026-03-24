import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito implements OnInit {

  cartItems: CartItem[] = [];
  errorMessage = '';

  constructor(private cartService: Cart) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.id, item.type);
    this.loadCart(); // 🔑 refresca la vista después de eliminar
  }
}