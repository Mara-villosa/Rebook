import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookDTO } from '../../shared/interfaces/HTTP/Books';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, TarjetaLibroComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})
export class FavoritosComponent implements OnInit {
  private servicioFavoritos = inject(FavoritosService);

  libros: BookDTO[] = [];
  librosFavoritos: BookDTO[] = [];

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.servicioFavoritos.getFavs().subscribe({
      next: (res: any) => {
        this.librosFavoritos = res.favourites ?? [];
      },
      error: () => {
        this.librosFavoritos = [];
      }
    });
  }
}
