import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { BookService } from '../../shared/services/book-service';
import { BookDTO, GetAllBooksFromUserResponse } from '../../shared/interfaces/Book/Book';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, TarjetaLibroComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {

  private servicioFavoritos = inject(FavoritosService);
  private servicioLibros = inject(BookService);

  libros: BookDTO[] = [];
  librosFavoritos: BookDTO[] = [];

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.servicioLibros.getAllBooksFromUser().subscribe({
      next: (data: GetAllBooksFromUserResponse) => {

        this.libros = [
          ...(data.uploads ?? []),
          ...(data.rented ?? []),
          ...(data.bought ?? [])
        ];

        this.filtrarFavoritos();
      },
      error: (err) => {
        console.error('Error cargando libros', err);
      }
    });
  }

  filtrarFavoritos(): void {
    this.librosFavoritos = this.libros.filter(libro =>
      this.servicioFavoritos.esFavorito(Number(libro.id))
    );
  }
}