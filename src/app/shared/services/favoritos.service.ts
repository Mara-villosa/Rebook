import { Injectable } from '@angular/core';
import { BookDTO } from '../../shared/interfaces/Book/Book';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private STORAGE_KEY = 'favoritos';

  private idsFavoritos = new Set<number>();
  private favoritos: BookDTO[] = [];

  constructor() {
    this.cargarDesdeStorage();
  }

  // ---- Helpers ----

  private guardarEnStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favoritos));
  }

  private cargarDesdeStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (data) {
      this.favoritos = JSON.parse(data);
      this.idsFavoritos = new Set(this.favoritos.map(f => f.id));
    }
  }

  // ---- API pública ----

  esFavorito(libroId: number): boolean {
    return this.idsFavoritos.has(libroId);
  }

  alternarFavorito(libro: BookDTO): void {
    if (this.idsFavoritos.has(libro.id)) {
      this.idsFavoritos.delete(libro.id);
      this.favoritos = this.favoritos.filter(f => f.id !== libro.id);
    } else {
      this.idsFavoritos.add(libro.id);
      this.favoritos.push(libro);
    }

    this.guardarEnStorage();
  }

  obtenerFavoritos(): BookDTO[] {
    return this.favoritos;
  }

  obtenerIdsFavoritos(): number[] {
    return Array.from(this.idsFavoritos);
  }

  limpiarFavoritos(): void {
    this.favoritos = [];
    this.idsFavoritos.clear();
    localStorage.removeItem(this.STORAGE_KEY);
  }

  totalFavoritos(): number {
    return this.idsFavoritos.size;
  }
}