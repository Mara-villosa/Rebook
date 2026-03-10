import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrosService } from '../../servicios/libros.service';
import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';

// Componente que muestra el catálogo completo de libros
@Component({
  selector: 'app-lista-libros',
  standalone: true,
  imports: [CommonModule, TarjetaLibroComponent],
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.scss'
})
export class ListaLibrosComponent {

  // Servicio que gestiona los libros y los filtros
  servicioLibros = inject(LibrosService);

  // Devuelve los libros ya filtrados según búsqueda y género
  get librosFiltrados() {
    return this.servicioLibros.librosFiltrados();
  }
}
