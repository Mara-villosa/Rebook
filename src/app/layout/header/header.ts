import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth-service';
import { FavoritosService } from '../../shared/services/favoritos.service';
import { UserService } from '../../shared/services/user-service/user-service';
import { BookService } from '../../shared/services/book-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private bookService = inject(BookService); 

  isAuthenticated = this.authService.authState;
  currentUser: any = null;

  isMenuOpen = false;
  isCategoriesOpen = false;
  isAccountOpen = false;
  isPanelFavoritosOpen = false;
  isDrawerCategoriesOpen = false;
  isDrawerAccountOpen = false;

  searchTerm: string = '';
  searchResults: any[] = [];
  allBooks: any[] = [];
  private debounceTimer: any;

  favoritos: any[] = [];

  // alerta global
  mostrarAlertaAcceso = false;
  mensajeAcceso = '';

  constructor(public favoritosService: FavoritosService) {
    effect(() => {
      const auth = this.isAuthenticated();

      if (auth) {
        this.loadUser();
        this.loadFavoritos();
      } else {
        this.currentUser = null;
        this.favoritos = [];
        this.isPanelFavoritosOpen = false;
      }
    });
  }

  // 🔥 CARGA LIBROS PARA EL BUSCADOR
  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.allBooks = res.books ?? [];
      },
      error: () => {
        this.allBooks = [];
      },
    });
  }

  // 🔥 BUSCADOR EN TIEMPO REAL
  onSearchChange(): void {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      const term = this.normalizar(this.searchTerm);

      if (!term) {
        this.searchResults = [];
        return;
      }

      this.searchResults = this.allBooks
        .filter((book) => {
          const title = this.normalizar(book.title || '');
          const author = this.normalizar(book.author || '');

          return title.includes(term) || author.includes(term);
        })
        .slice(0, 5); // máximo 5 resultados
    }, 300);
  }

  // 🔥 ENTER / BOTÓN BUSCAR
  onSearchSubmit(event: Event): void {
    event.preventDefault();

    if (this.searchTerm.trim()) {
      this.router.navigate(['/busqueda'], {
        queryParams: { q: this.searchTerm },
      });

      this.searchResults = [];
    }
  }

  // CLICK EN RESULTADO
 goToBook(libro: any): void {
  this.router.navigate(['/categoria', libro.category], {
    queryParams: { highlight: libro.id }
  });

  this.searchResults = [];
  this.searchTerm = '';
}

  // NORMALIZACIÓN (acentos, mayúsculas, etc.)
  normalizar(valor: string): string {
    return valor
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  loadUser(): void {
    this.userService.getUserData().subscribe({
      next: (user) => (this.currentUser = user),
      error: () => (this.currentUser = null),
    });
  }

  loadFavoritos(): void {
    this.favoritosService.getFavs().subscribe({
      next: (res: any) => {
        this.favoritos = res.favourites ?? [];
      },
      error: () => {
        this.favoritos = [];
      },
    });
  }

  recargarFavoritos(): void {
    this.loadFavoritos();
  }

  checkAuth(event: Event, route: string): void {
    event.preventDefault();

    if (!this.isAuthenticated()) {
      this.mostrarMensajeAcceso('Debes iniciar sesión');
      return;
    }
    this.router.navigate([route]);
  }

  accederZonaPrivada(route: string): void {
    if (!this.isAuthenticated()) {
      this.mostrarMensajeAcceso('Debes iniciar sesión');
      return;
    }
    this.router.navigate([route]);
  }

  private mostrarMensajeAcceso(msg: string): void {
    this.mensajeAcceso = msg;
    this.mostrarAlertaAcceso = true;

    setTimeout(() => {
      this.mostrarAlertaAcceso = false;
    }, 2500);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.isDrawerCategoriesOpen = false;
    }
  }

  toggleCategories(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isCategoriesOpen = !this.isCategoriesOpen;
    this.isAccountOpen = false;
  }

  toggleAccount(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.isAccountOpen = !this.isAccountOpen;
    this.isCategoriesOpen = false;
  }

  togglePanelFavoritos(): void {
    if (!this.isAuthenticated()) {
      this.mostrarMensajeAcceso('Debes iniciar sesión para ver favoritos');
      return;
    }

    this.isPanelFavoritosOpen = !this.isPanelFavoritosOpen;

    if (this.isPanelFavoritosOpen) {
      this.loadFavoritos();
    }
  }

  toggleDrawerCategories(): void {
    this.isDrawerCategoriesOpen = !this.isDrawerCategoriesOpen;
  }

  toggleDrawerAccount(): void {
    this.isDrawerAccountOpen = !this.isDrawerAccountOpen;
  }

  cerrarPanelFavoritos(): void {
    this.isPanelFavoritosOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    this.isAccountOpen = false;
    this.isPanelFavoritosOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown')) {
      this.isCategoriesOpen = false;
      this.isAccountOpen = false;
    }
  }
}