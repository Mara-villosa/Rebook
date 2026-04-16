import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TarjetaLibroComponent } from '../tarjeta-libro/tarjeta-libro.component';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { LibrosService } from '../../shared/services/libros.service';

// Componente que muestra la página de libros favoritos
@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, TarjetaLibroComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent {

  // Servicios necesarios
  servicioFavoritos = inject(FavoritosService);
  servicioLibros    = inject(LibrosService);

  // Lista reactiva de libros marcados como favoritos
  librosFavoritos = computed(() => {
    const idsFavoritos = this.servicioFavoritos.obtenerIdsFavoritos();
    return this.servicioLibros.todosLibros().filter(libro => idsFavoritos.has(libro.id));
  });
}
