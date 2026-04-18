import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AddBookToFavRequest,
  BookDTO,
  RemoveBookFromFavsRequest,
} from '../../shared/interfaces/HTTP/Books';
import { Cart } from '../../shared/services/cart';
import { FavoritosService } from '../../shared/services/favoritos.service';

@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-libro.component.html',
  styleUrl: './tarjeta-libro.component.scss',
})
export class TarjetaLibroComponent implements OnInit {
  @Input() libro?: BookDTO;

  servicioCarrito = inject(Cart);
  servicioFavoritos = inject(FavoritosService);

  favoritos: BookDTO[] = [];

  estaEnCarritoCompra = false;
  estaEnCarritoAlquiler = false;
  animacionFavorito = false;

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.servicioFavoritos.getFavs().subscribe({
      next: (res) => {
        this.favoritos = res.favourites ?? [];
      },
      error: () => {
        this.favoritos = [];
      },
    });
  }

  get esFavorito(): boolean {
    return this.favoritos.some((f) => f.id === this.libro?.id);
  }

  alternarFavorito(): void {
    if (!this.libro) return;

    const bookId = String(this.libro.id);

    if (this.esFavorito) {
      const request: RemoveBookFromFavsRequest = {
        book_id: bookId,
      };

      this.servicioFavoritos.removeFromFavs(request).subscribe(() => {
        this.favoritos = this.favoritos.filter((f) => f.id !== this.libro!.id);
      });
    } else {
      const request: AddBookToFavRequest = {
        book_id: bookId,
      };

      this.servicioFavoritos.addToFavs(request).subscribe(() => {
        this.favoritos.push(this.libro!);

        this.animacionFavorito = true;
        setTimeout(() => (this.animacionFavorito = false), 1000);
      });
    }
  }

  agregarCompra(): void {
    if (!this.libro) return;

    this.servicioCarrito.addToCart({
      id: this.libro.id,
      titulo: this.libro.title,
      autor: this.libro.author,
      portada: this.libro.url,
      price: this.libro.sellPrice,
      type: 'buy',
      quantity: 1,
    });

    this.estaEnCarritoCompra = true;
    setTimeout(() => (this.estaEnCarritoCompra = false), 800);
  }

  agregarAlquiler(): void {
    if (!this.libro) return;

    this.servicioCarrito.addToCart({
      id: this.libro.id,
      titulo: this.libro.title,
      autor: this.libro.author,
      portada: this.libro.url,
      price: this.libro.rentPrice * 0.5,
      type: 'rent',
      returnDate: this.calcularFecha(),
      quantity: 1,
    });

    this.estaEnCarritoAlquiler = true;
    setTimeout(() => (this.estaEnCarritoAlquiler = false), 800);
  }

  calcularFecha(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toISOString().split('T')[0];
  }
}
