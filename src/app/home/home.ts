<<<<<<< HEAD
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BackgroundRefreshToken } from '../shared/services/background-refresh-token-service/background-refresh-token';
import { SidebarComponent } from '../layout/sidebar/sidebar';
@Component({
  selector: 'app-home',
  imports: [ SidebarComponent ],
=======
import { Component, OnInit } from '@angular/core';
import { Cart } from '../services/cart';
import { Book } from '../shared/interfaces/Book/Book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
>>>>>>> main
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  books: Book[] = [];
  successMessage = '';

  constructor(private cartService: Cart) {}

  ngOnInit(): void {
    // Aquí tus libros de ejemplo
    this.books = [
      {
        id: '1',
        title: 'Libro 1',
        author: 'Autor 1',
        price: 20,
        condition: 'nuevo',
        addedDate: new Date(),
        category: 'novela'
      },
      {
        id: '2',
        title: 'Libro 2',
        author: 'Autor 2',
        price: 30,
        condition: 'bueno',
        addedDate: new Date(),
        category: 'historia'
      }
    ];
  }

  // Precio de compra
  getBuyPrice(book: Book): number {
    return book.price ?? 0;
  }

  // Precio de alquiler (30% del precio)
  getRentPrice(book: Book): number {
    return Math.round((book.price ?? 0) * 0.3);
  }

  // Función para añadir al carrito
  addToCart(book: Book, type: 'buy' | 'rent') {
    const price = type === 'buy' ? this.getBuyPrice(book) : this.getRentPrice(book);

    this.cartService.addToCart({
      id: parseInt(book.id, 10), // convertir string -> number
      title: book.title,
      price,
      type,
      quantity: 1,
      returnDate: type === 'rent' ? this.getReturnDate() : undefined // solo para alquiler
    });

    // Mensaje flotante de éxito
    this.successMessage = `${book.title} añadido al carrito`;
    setTimeout(() => this.successMessage = '', 2000);
  }

  // Fecha de devolución (7 días)
  getReturnDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString();
  }
}