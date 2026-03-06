import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../cart';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito implements OnInit {
  cartItems: CartItem[] = [];
  errorMessage = '';

  constructor(private cartService: Cart) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  remove(item: CartItem) {

    if (this.cartItems.length === 0) {
      this.errorMessage = 'El carrito ya está vacío';
      return;
    }

    this.cartService.removeFromCart(item.id, item.type);

    this.cartItems = this.cartService.getCart();

    this.errorMessage = 'Libro eliminado del carrito';

  }

}
