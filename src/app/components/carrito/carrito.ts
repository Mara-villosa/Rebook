import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart, CartItem } from '../../shared/services/cart';

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
    try {
      this.errorMessage = '';
      this.cartItems = this.cartService.getCart();
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      this.errorMessage = 'Error al cargar el carrito. Inténtalo de nuevo.';
    }
  }

  remove(item: CartItem) {
    try {
      this.errorMessage = '';
      this.cartService.removeFromCart(item.id, item.type);
      this.loadCart();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      this.errorMessage = 'No se pudo eliminar el producto del carrito.';
    }
  }
}