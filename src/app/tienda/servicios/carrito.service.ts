import { Injectable, signal, computed } from '@angular/core';
import { Libro, ElementoCarrito } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  // Lista reactiva de elementos en el carrito
  private elementosCarrito = signal<ElementoCarrito[]>([]);

  // Exposición de solo lectura al exterior
  elementos = this.elementosCarrito.asReadonly();

  // Número total de unidades en el carrito
  totalUnidades = computed(() =>
    this.elementosCarrito().reduce((suma, elemento) => suma + elemento.cantidad, 0)
  );

  // Precio total de todos los elementos del carrito
  precioTotal = computed(() =>
    this.elementosCarrito().reduce((suma, elemento) => suma + elemento.libro.precio * elemento.cantidad, 0)
  );

  // Añade un libro o incrementa su cantidad si ya existe
  agregarAlCarrito(libro: Libro): void {
    const actual = this.elementosCarrito();
    const existente = actual.find(elemento => elemento.libro.id === libro.id);
    if (existente) {
      this.elementosCarrito.set(
        actual.map(elemento =>
          elemento.libro.id === libro.id
            ? { ...elemento, cantidad: elemento.cantidad + 1 }
            : elemento
        )
      );
    } else {
      this.elementosCarrito.set([...actual, { libro, cantidad: 1 }]);
    }
  }

  // Elimina completamente un libro del carrito
  eliminarDelCarrito(libroId: number): void {
    this.elementosCarrito.set(
      this.elementosCarrito().filter(elemento => elemento.libro.id !== libroId)
    );
  }

  // Cambia la cantidad de un libro; si llega a 0 lo elimina
  actualizarCantidad(libroId: number, cantidad: number): void {
    if (cantidad <= 0) { this.eliminarDelCarrito(libroId); return; }
    this.elementosCarrito.set(
      this.elementosCarrito().map(elemento =>
        elemento.libro.id === libroId ? { ...elemento, cantidad } : elemento
      )
    );
  }

  // Vacía el carrito por completo
  vaciarCarrito(): void { this.elementosCarrito.set([]); }
}
