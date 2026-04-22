import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { BookDTO, GetAllBooksResponse } from '../../shared/interfaces/HTTP/Books';
import { BookService } from '../../shared/services/book-service';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarjetaLibroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private servicioLibros = inject(BookService);

  libros: BookDTO[] = [];
  indiceActual = 0;

  uploads: any[] = [];
  rented: any[] = [];
  bought: any[] = [];

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.servicioLibros.getAllBooks().subscribe({
      next: (data: GetAllBooksResponse) => {
        this.libros = data.books ?? [];
      },
      error: (err) => {
        console.error('Error cargando libros', err);
      },
    });
  }

  get librosLimitados() {
    return this.libros.slice(0, 6);
  }

  get librosCarrusel() {
    return this.librosLimitados.slice(this.indiceActual, this.indiceActual + 3);
  }

  siguiente() {
    if (this.indiceActual + 3 < this.librosLimitados.length) {
      this.indiceActual++;
    }
  }

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }

  get ultimosLibros() {
    return [...this.libros].reverse().slice(0, 10);
  }
}
