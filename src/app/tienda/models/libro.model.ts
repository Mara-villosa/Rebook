// Interfaz que define la estructura de un libro
export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  portada: string;
  genero: string;
  valoracion: number;
  descripcion: string;
}

// Interfaz que define un elemento dentro del carrito de compra
export interface ElementoCarrito {
  libro: Libro;
  cantidad: number;
}
