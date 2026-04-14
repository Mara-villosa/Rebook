import { Injectable, signal, computed } from '@angular/core';
import { Libro, ElementoCarrito } from '../../shared/models/libro.model';
import { Cart } from '../../shared/services/cart';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private cart: Cart) {}

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

  // Añade un libro al carrito indicando si es compra o alquiler
  agregarAlCarrito(libro: Libro, tipo: 'buy' | 'rent' = 'buy'): void {
    // Fecha de devolución para alquileres (7 días)
    const fechaDevolucion = tipo === 'rent' ? this.calcularFechaDevolucion() : undefined;

    // Añadir al Cart compartido de la compañera
    this.cart.addToCart({
      id: libro.id,
      title: libro.titulo,
      price: tipo === 'rent' ? libro.precio * 0.5 : libro.precio,
      type: tipo,
      quantity: 1,
      returnDate: fechaDevolucion
    });

    // Actualizar también el signal local
    const actual = this.elementosCarrito();
    const existente = actual.find(e => e.libro.id === libro.id);
    if (existente) {
      this.elementosCarrito.set(
        actual.map(e =>
          e.libro.id === libro.id ? { ...e, cantidad: e.cantidad + 1 } : e
        )
      );
    } else {
      this.elementosCarrito.set([...actual, { libro, cantidad: 1 }]);
    }
  }

  // Elimina completamente un libro del carrito
  eliminarDelCarrito(libroId: number): void {
    this.cart.removeFromCart(libroId, 'buy');
    this.elementosCarrito.set(
      this.elementosCarrito().filter(e => e.libro.id !== libroId)
    );
  }

  // Cambia la cantidad de un libro; si llega a 0 lo elimina
  actualizarCantidad(libroId: number, cantidad: number): void {
    if (cantidad <= 0) { this.eliminarDelCarrito(libroId); return; }
    this.elementosCarrito.set(
      this.elementosCarrito().map(e =>
        e.libro.id === libroId ? { ...e, cantidad } : e
      )
    );
  }

  // Vacía el carrito por completo
  vaciarCarrito(): void { this.elementosCarrito.set([]); }

  // Calcula la fecha de devolución (7 días desde hoy)
  private calcularFechaDevolucion(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toLocaleDateString();
  }
}
