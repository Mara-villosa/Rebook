import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookDTO } from '../../shared/interfaces/HTTP/Books';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';
import { AuthService } from '../../shared/services/auth-service/auth-service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, TarjetaLibroComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})
export class FavoritosComponent implements OnInit {
  #authService = inject(AuthService);
  private servicioFavoritos = inject(FavoritosService);

  libros: BookDTO[] = [];
  librosFavoritos: BookDTO[] = [];

  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) this.cargarLibros();
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
