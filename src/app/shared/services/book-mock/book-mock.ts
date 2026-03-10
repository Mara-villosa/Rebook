// Hasta que tengamos la API de los libros para ir viendo el frontend

import { Book, Category } from '../../interfaces/Book/Book';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    coverUrl: 'https://via.placeholder.com/120x180?text=Cien+Años',
    price: 15.99,
    condition: 'bueno',
    addedDate: new Date('2026-03-01'),
    category: 'Literatura',
    isRental: false
  },
  {
    id: '2',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    coverUrl: 'https://via.placeholder.com/120x180?text=Principito',
    price: 12.50,
    condition: 'nuevo',
    addedDate: new Date('2026-03-02'),
    category: 'Infantil',
    isRental: true
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://via.placeholder.com/120x180?text=1984',
    price: 14.00,
    condition: 'regular',
    addedDate: new Date('2026-03-03'),
    category: 'Literatura',
    isRental: false
  },
  {
    id: '4',
    title: 'Física Universitaria',
    author: 'Sears y Zemansky',
    coverUrl: 'https://via.placeholder.com/120x180?text=Fisica',
    price: 45.00,
    condition: 'bueno',
    addedDate: new Date('2026-03-04'),
    category: 'Académicos',
    isRental: true
  },
  {
    id: '5',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    coverUrl: 'https://via.placeholder.com/120x180?text=Quijote',
    price: 18.99,
    condition: 'nuevo',
    addedDate: new Date('2026-03-04'),
    category: 'Literatura',
    isRental: false
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Literatura', count: 234, icon: 'fa-book' },
  { id: '2', name: 'Académicos', count: 156, icon: 'fa-graduation-cap' },
  { id: '3', name: 'Infantil', count: 89, icon: 'fa-child' },
  { id: '4', name: 'Ciencia Ficción', count: 67, icon: 'fa-rocket' },
  { id: '5', name: 'Historia', count: 45, icon: 'fa-landmark' }
];