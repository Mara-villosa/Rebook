import { Injectable, signal, computed } from '@angular/core';
import { Libro } from '../models/libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  // Lista completa de libros disponibles en la tienda
  private libros: Libro[] = [
    { id:1, titulo:'El nombre del viento', autor:'Patrick Rothfuss', precio:18.99,
      portada:'https://covers.openlibrary.org/b/id/8226191-L.jpg', genero:'Fantasía',
      valoracion:5, descripcion:'La historia de Kvothe, un mago legendario narrada por él mismo.' },
    { id:2, titulo:'Cien años de soledad', autor:'Gabriel García Márquez', precio:14.50,
      portada:'https://covers.openlibrary.org/b/id/8701678-L.jpg', genero:'Realismo Mágico',
      valoracion:5, descripcion:'La saga de la familia Buendía en el mítico pueblo de Macondo.' },
    { id:3, titulo:'1984', autor:'George Orwell', precio:12.99,
      portada:'https://covers.openlibrary.org/b/id/7222246-L.jpg', genero:'Distopía',
      valoracion:5, descripcion:'Una distopía sobre un régimen totalitario que controla la realidad.' },
    { id:4, titulo:'Dune', autor:'Frank Herbert', precio:22.00,
      portada:'https://covers.openlibrary.org/b/id/8231462-L.jpg', genero:'Ciencia Ficción',
      valoracion:5, descripcion:'Una épica galáctica sobre política, religión y ecología en Arrakis.' },
    { id:5, titulo:'El Hobbit', autor:'J.R.R. Tolkien', precio:16.75,
      portada:'https://covers.openlibrary.org/b/id/6979861-L.jpg', genero:'Fantasía',
      valoracion:4, descripcion:'La aventura de Bilbo Bolsón en tierras de dragones y enanos.' },
    { id:6, titulo:'Don Quijote de la Mancha', autor:'Miguel de Cervantes', precio:11.99,
      portada:'https://covers.openlibrary.org/b/id/8474802-L.jpg', genero:'Clásico',
      valoracion:4, descripcion:'Las aventuras del ingenioso hidalgo don Quijote y Sancho Panza.' },
    { id:7, titulo:'Harry Potter y la piedra filosofal', autor:'J.K. Rowling', precio:19.99,
      portada:'https://covers.openlibrary.org/b/id/10110415-L.jpg', genero:'Fantasía',
      valoracion:5, descripcion:'El inicio de la saga del joven mago en el colegio Hogwarts.' },
    { id:8, titulo:'El principito', autor:'Antoine de Saint-Exupéry', precio:9.99,
      portada:'https://covers.openlibrary.org/b/id/8520734-L.jpg', genero:'Clásico',
      valoracion:5, descripcion:'Un cuento filosófico sobre la infancia, la amistad y la vida.' }
  ];

  // Signal con todos los libros (solo lectura desde fuera)
  private todosLosLibros = signal<Libro[]>(this.libros);
  todosLibros = this.todosLosLibros.asReadonly();

  // Lista de géneros disponibles, incluyendo la opción "Todos"
  generos = ['Todos', ...new Set(this.libros.map(libro => libro.genero))];

  // Texto escrito por el usuario en el buscador
  private terminoBusqueda = signal('');

  // Género seleccionado en el desplegable
  private generoSeleccionado = signal('Todos');

  // Lista de libros - sin filtrado, muestra todos los libros
  librosFiltrados = computed(() => this.libros);

  // Actualiza el texto de búsqueda
  establecerBusqueda(termino: string): void { this.terminoBusqueda.set(termino); }

  // Actualiza el género seleccionado
  establecerGenero(genero: string): void { this.generoSeleccionado.set(genero); }

  // Devuelve el signal del término de búsqueda (solo lectura)
  obtenerBusqueda() { return this.terminoBusqueda.asReadonly(); }

  // Devuelve el signal del género seleccionado (solo lectura)
  obtenerGenero() { return this.generoSeleccionado.asReadonly(); }
}
