import { Injectable, signal, computed } from '@angular/core';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

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
    } else {
      copia.add(libro.id);
    }
    this.idsFavoritos.set(copia);
  }

  // Devuelve el conjunto completo de IDs favoritos
  obtenerIdsFavoritos(): Set<number> {
    return this.idsFavoritos();
  }
}
