import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';
import { BookService } from '../../shared/services/book-service';
import { GetAllBooksFromUserResponse } from '../../shared/interfaces/Book/Book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarjetaLibroComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  private servicioLibros = inject(BookService);

  uploads: any[] = [];
  rented: any[] = [];
  bought: any[] = [];

  indiceActual = 0;

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    
    this.servicioLibros.getAllBooksFromUser().subscribe({
      next: (data: GetAllBooksFromUserResponse) => {
        this.uploads = data.uploads ?? [];
        this.rented = data.rented ?? [];
        this.bought = data.bought ?? [];
      },
      error: (err) => {
        console.error('Error cargando libros del usuario', err);
      }
    });
  }

  // 👉 ejemplo: todos juntos para carrusel o home
  get libros() {
    return [...this.uploads, ...this.rented, ...this.bought];
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
    return [...this.libros].reverse().slice(0, 8);
  }
}