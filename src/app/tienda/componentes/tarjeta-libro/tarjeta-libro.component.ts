import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../models/libro.model';
import { CarritoService } from '../../servicios/carrito.service';
import { FavoritosService } from '../../servicios/favoritos.service';

// Componente que representa una tarjeta individual de libro
@Component({
  selector: 'app-tarjeta-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-libro.component.html',
  styleUrl: './tarjeta-libro.component.scss'
})
export class TarjetaLibroComponent {

  // El libro que se pasa desde el componente padre
  libro = input.required<Libro>();

  // Servicios del carrito y de favoritos
  servicioCarrito  = inject(CarritoService);
  servicioFavoritos = inject(FavoritosService);

  // Animaciones independientes para cada botón
  animacionCompra   = false;
  animacionAlquiler = false;

  // Comprueba si este libro está marcado como favorito
  get esFavorito(): boolean {
    return this.servicioFavoritos.esFavorito(this.libro().id);
  }

  // Alterna el estado de favorito del libro
  alternarFavorito(): void {
    this.servicioFavoritos.alternarFavorito(this.libro());
  }

  // Añade el libro al carrito como COMPRA
  agregarCompra(): void {
    this.servicioCarrito.agregarAlCarrito(this.libro(), 'buy');
    this.animacionCompra = true;
    setTimeout(() => this.animacionCompra = false, 600);
  }

  // Añade el libro al carrito como ALQUILER
  agregarAlquiler(): void {
    this.servicioCarrito.agregarAlCarrito(this.libro(), 'rent');
    this.animacionAlquiler = true;
    setTimeout(() => this.animacionAlquiler = false, 600);
  }

  // Genera un array del tamaño de la valoración para pintar las estrellas
  obtenerEstrellas(valoracion: number): number[] {
    return Array(valoracion).fill(0);
  }
}
