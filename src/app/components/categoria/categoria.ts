import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../../shared/services/book-service';
import { CarritoService } from '../../shared/services/carrito-service';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { AddBookToFavRequest, AddBookToCartRequest, BookDTO, RemoveBookFromFavsRequest } from '../../shared/interfaces/HTTP/Books';
import { AuthService } from '../../shared/services/auth-service/auth-service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.scss'],
  imports: [CommonModule],
})
export class CategoriaComponent implements OnInit {
  #authService = inject(AuthService);
  highlightedBookId: number | null = null;

  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  servicioCarrito = inject(CarritoService);
  servicioFavoritos = inject(FavoritosService);

  categoria: string = '';
  libros: BookDTO[] = [];
  allBooks: BookDTO[] = [];
  favoritos: BookDTO[] = [];

  favoritosAnimados = new Set<number>();
  carritoAnimados = new Set<number>();
  alquilerAnimados = new Set<number>();

  animacionFavorito = false;

  @Input() libro?: BookDTO;
  libroSeleccionado: BookDTO | null = null;
  mostrarModal = false;

  ngOnInit(): void {
    if (this.#authService.isAuthenticated()) this.cargarFavoritos();
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('highlight');
      this.highlightedBookId = id ? Number(id) : null;

      if (this.highlightedBookId) {
        setTimeout(() => this.scrollToBook(this.highlightedBookId!), 300);
      }
    });
    this.route.paramMap.subscribe((params) => {
      this.categoria = this.normalizarCategoria(
        (params.get('nombre') || '').toLowerCase()
      );
      this.loadBooks();
    });
  }

  cargarFavoritos(): void {
    this.servicioFavoritos.getFavs().subscribe({
      next: (res) => {
        this.favoritos = res.favourites ?? [];
      },
      error: () => {
        this.favoritos = [];
      },
    });
  }

  scrollToBook(id: number): void {
    const el = document.getElementById('book-' + id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      el.classList.add('highlight');

      setTimeout(() => {
        el.classList.remove('highlight');
      }, 2000);
    }
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.allBooks = res.books ?? [];

        this.libros =
          this.categoria !== 'all'
            ? this.allBooks.filter(
              (book) =>
                this.normalizarCategoria(book.category || '') === this.categoria
            )
            : this.allBooks;
      },
      error: () => {
        this.libros = [];
      },
    });
  }

  normalizarCategoria(valor: string): string {
    return valor
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/cienciaficcion/g, 'ciencia-ficcion')
      .replace(/[^a-z0-9-]/g, '');
  }

  get esFavorito(): boolean {
    return this.favoritos.some((f) => f.id === this.libro?.id);
  }

  //FAVORITOS
  alternarFavorito(libro: BookDTO): void { 
    const request: AddBookToFavRequest = { 
      book_id: String(libro.id), 
    }; 

    this.servicioFavoritos.addToFavs(request).subscribe({ 
      next: () => { 
        this.favoritosAnimados.add(libro.id); 
        setTimeout(() => { 
          this.favoritosAnimados.delete(libro.id); 
        }, 800); 
        this.cargarFavoritos();
      } 
    }); 

  }

  // CARRITO 
  agregarCompra(libro: BookDTO): void {
    const request: AddBookToCartRequest = {
      book_id: String(libro.id),
      is_renting: false,
    };

    this.servicioCarrito.addToCart(request).subscribe({
      next: () => {
        this.carritoAnimados.add(libro.id);

        setTimeout(() => {
          this.carritoAnimados.delete(libro.id);
        }, 800);

        this.servicioCarrito.getCart().subscribe();
      }
    });
  }

  // ALQUILER 
  agregarAlquiler(libro: BookDTO): void {
    const request: AddBookToCartRequest = {
      book_id: String(libro.id),
      is_renting: true,
    };

    this.servicioCarrito.addToCart(request).subscribe({
      next: () => {
        this.alquilerAnimados.add(libro.id);

        setTimeout(() => {
          this.alquilerAnimados.delete(libro.id);
        }, 800);

        this.servicioCarrito.getCart().subscribe();
      }
    });
  }

  esFavoritoAnimado(id: number): boolean {
    return this.favoritosAnimados.has(id);
  }

  esCarritoAnimado(id: number): boolean {
    return this.carritoAnimados.has(id);
  }

  esAlquilerAnimado(id: number): boolean {
    return this.alquilerAnimados.has(id);
  }

  abrirModal(libro: BookDTO) {
    this.libroSeleccionado = libro;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.libroSeleccionado = null;
  }
}