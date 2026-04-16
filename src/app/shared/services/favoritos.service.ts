import { Injectable, signal, computed } from '@angular/core';
import { Libro } from '../../shared/models/libro.model';
import { FavoritesService } from '../../shared/services/favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private favoritesService: FavoritesService) {}

  // Conjunto de IDs de libros marcados como favoritos
  private idsFavoritos = signal<Set<number>>(new Set());

  // Número total de favoritos
  totalFavoritos = computed(() => this.idsFavoritos().size);

  // Devuelve true si un libro está en favoritos
  esFavorito(libroId: number): boolean {
    return this.idsFavoritos().has(libroId);
  }

  // Añade o quita un libro de favoritos según su estado actual
  alternarFavorito(libro: Libro): void {
    const copia = new Set(this.idsFavoritos());
    if (copia.has(libro.id)) {
      copia.delete(libro.id);
      // Quitar también del servicio de la compañera
      this.favoritesService.toggleFavorite({ id: libro.id });
    } else {
      copia.add(libro.id);
      // Añadir al servicio de la compañera con los datos del libro
      this.favoritesService.toggleFavorite({
        id: libro.id,
        title: libro.titulo,
        author: libro.autor,
        price: libro.precio,
        imageUrl: libro.portada
      });
    }
    this.idsFavoritos.set(copia);
  }

  // Devuelve el conjunto completo de IDs favoritos
  obtenerIdsFavoritos(): Set<number> {
    return this.idsFavoritos();
  }

  // Devuelve los libros favoritos completos (desde el servicio compartido)
  obtenerFavoritos(): any[] {
    return this.favoritesService.favorites;
  }
}
