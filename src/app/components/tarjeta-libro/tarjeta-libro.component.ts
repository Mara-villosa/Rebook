import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from '../../shared/services/cart';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { BookDTO } from '../../shared/interfaces/Book/Book';

@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-libro.component.html',
  styleUrl: './tarjeta-libro.component.scss'
})
export class TarjetaLibroComponent {

  @Input() libro!: BookDTO; 

  servicioCarrito = inject(Cart);
  servicioFavoritos = inject(FavoritosService);

  estaEnCarritoCompra = false;
  estaEnCarritoAlquiler = false;
  animacionFavorito = false;

  get esFavorito(): boolean {
    return this.servicioFavoritos.esFavorito(this.libro.id);
  }

  alternarFavorito(): void {
    const yaEraFavorito = this.esFavorito;

    this.servicioFavoritos.alternarFavorito(this.libro);

    if (!yaEraFavorito) {
      this.animacionFavorito = true;

      setTimeout(() => {
        this.animacionFavorito = false;
      }, 1000);
    }
  }

  agregarCompra(): void {
    this.servicioCarrito.addToCart({
      id: this.libro.id,
      titulo: this.libro.title,
      autor: this.libro.author,
      portada: this.libro.url,
      price: this.libro.sellPrice,
      type: 'buy',
      quantity: 1
    });

    this.estaEnCarritoCompra = true;

    setTimeout(() => {
      this.estaEnCarritoCompra = false;
    }, 800);
  }

  agregarAlquiler(): void {
    this.servicioCarrito.addToCart({
      id: this.libro.id,
      titulo: this.libro.title,
      autor: this.libro.author,
      portada: this.libro.url,
      price: this.libro.rentPrice * 0.5,
      type: 'rent',
      returnDate: this.calcularFecha(),
      quantity: 1
    });

    this.estaEnCarritoAlquiler = true;

    setTimeout(() => {
      this.estaEnCarritoAlquiler = false;
    }, 800);
  }

  calcularFecha(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toISOString().split('T')[0];
  }
}