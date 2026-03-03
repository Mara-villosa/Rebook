import { Component, Input } from '@angular/core';
import { Cart } from '../cart';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  @Input() book: any;
  message = '';

  constructor(private cartService: Cart) {}

  //Método en caso de compra
  addComprar() {
      this.cartService.addToCart({
      id: this.book.id,
      title: this.book.title,
      price: this.book.buyPrice,
      type: 'buy',
      quantity: 1
    });

    this.message = 'Libro añadido para compra';
  }

  //Método para añadir en caso de alquiler
  addAquilar() {
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 15);

    this.cartService.addToCart({
      id: this.book.id,
      title: this.book.title,
      price: this.book.rentPrice,
      type: 'rent',
      returnDate: returnDate.toLocaleDateString(),
      quantity: 1
    });

    this.message = 'Libro añadido para alquiler';
  }

}
