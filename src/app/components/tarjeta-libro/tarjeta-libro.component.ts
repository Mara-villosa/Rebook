import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AddBookToCartRequest,
  AddBookToFavRequest,
  BookDTO,
  RemoveBookFromFavsRequest,
} from '../../shared/interfaces/HTTP/Books';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { CarritoService } from '../../shared/services/carrito-service';
import { FavoritosService } from '../../shared/services/favoritos.service';


@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-libro.component.html',
  styleUrl: './tarjeta-libro.component.scss',
})
export class TarjetaLibroComponent implements OnInit {
  #authService = inject(AuthService);
  @Input() libro?: BookDTO;

  servicioCarrito = inject(CarritoService);
  servicioFavoritos = inject(FavoritosService);

  favoritos: BookDTO[] = [];

  estaEnCarritoCompra = false;
  estaEnCarritoAlquiler = false;
  animacionFavorito = false;

  mostrarModal = false;

  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) this.cargarFavoritos();
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

    const request: AddBookToFavRequest = {
      book_id: String(this.libro.id),
    };

    if (this.esFavorito) {
      const removeRequest: RemoveBookFromFavsRequest = {
        book_id: String(this.libro.id),
      };

      this.servicioFavoritos.removeFromFavs(removeRequest).subscribe({
        next: () => this.cargarFavoritos(),
        error: (err) => console.error('Error quitando favorito', err),
      });
    } else {
      this.servicioFavoritos.addToFavs(request).subscribe({
        next: () => {
          this.animacionFavorito = true;

          setTimeout(() => {
            this.animacionFavorito = false;
          }, 1000);

          this.cargarFavoritos();
        },
        error: (err) => console.error('Error añadiendo favorito', err),
      });
    }
  }

  agregarCompra(): void {
    if (!this.libro) return;

    const request: AddBookToCartRequest = {
      book_id: String(this.libro.id),
      is_renting: false,
    };

    this.servicioCarrito.addToCart(request).subscribe({
      next: () => {
        this.estaEnCarritoCompra = true;
        setTimeout(() => (this.estaEnCarritoCompra = false), 800);
      },
      error: (err) => console.error('Error carrito compra', err),
    });
  }

  agregarAlquiler(): void {
    if (!this.libro) return;

    const request: AddBookToCartRequest = {
      book_id: String(this.libro.id),
      is_renting: true,
    };

    this.servicioCarrito.addToCart(request).subscribe({
      next: () => {
        this.estaEnCarritoAlquiler = true;
        setTimeout(() => (this.estaEnCarritoAlquiler = false), 800);
      },
      error: (err) => console.error('Error carrito alquiler', err),
    });
  }

  calcularFecha(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toISOString().split('T')[0];
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
