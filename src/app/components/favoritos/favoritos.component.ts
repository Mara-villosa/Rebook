import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookDTO, GetAllBooksFromUserResponse } from '../../shared/interfaces/HTTP/Books';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { BookService } from '../../shared/services/book-service';
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
  #authService = inject(AuthService);
  private servicioFavoritos = inject(FavoritosService);
  private servicioLibros = inject(BookService);

  libros: BookDTO[] = [];
  librosFavoritos: BookDTO[] = [];

  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) this.cargarLibros();
  }

  cargarLibros(): void {
    this.servicioLibros.getAllBooksFromUser().subscribe({
      next: (data: GetAllBooksFromUserResponse) => {
        this.libros = [...(data.uploads ?? []), ...(data.rented ?? []), ...(data.bought ?? [])];
      },
      error: (err) => {
        console.error('Error cargando libros', err);
      },
    });
  }
}
